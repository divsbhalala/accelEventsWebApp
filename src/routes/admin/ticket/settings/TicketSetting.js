import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './TicketSetting.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ToggleSwitch from '../../../../components/Widget/ToggleSwitch';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import {doGetTicketingSettings,
	doPostTicketingSettings,
	doGetTicketingCouponCodes,
	doTicketTypes,
	doCreateCouponCode,
	doUpdateCouponCode,
	doDeleteCouponCode,
} from '../action';
import moment from 'moment';
import {connect} from 'react-redux';
import PopupModel from './../../../../components/PopupModal';
import DatetimeRangePicker from "react-bootstrap-datetimerangepicker";

let ticketInst;
class TicketSetting extends React.Component {
	static propTypes = {
		title: PropTypes.string,
	};

	constructor(props) {
		super(props);
		ticketInst = this;
		this.state = {
			settings: [],
			tab : "Order Form",
			subTab: "Ticket Buyer",
			couponCodes: [],
			isShowCouponModel: false,
			activeScreen : 1,
			ticketData: [],
			selectedTicketTypes: [],
			couponAmount : 0,
			couponUses : 0,
			couponCode : '',
			couponEndDate : '',
			couponStartDate : '',
			discountType : '',
			couponEventTicketTypeId : '',
			couponCouponUsesType : 'Unlimited',
			isCouponEdit: false,
			editingRow: {},
			showDeleteConfirmation: false,
			message: '',
			couponToDelete: '',
			errorMessage:'',
			isError:false,
			startDate: moment(),
			endDate: moment().add(1, "days"),
		};
		this.setActiveScreen = this.setActiveScreen.bind(this);
		this.setActiveTab = this.setActiveTab.bind(this);
		this.saveSettings = this.saveSettings.bind(this);
		this.toggleCouponCodePopup = this.toggleCouponCodePopup.bind(this);
		this.toggleTicketTypes = this.toggleTicketTypes.bind(this);
		this.toggleAllTicketsType = this.toggleAllTicketsType.bind(this);
		this.validateAmountFixed = this.validateAmountFixed.bind(this);
		this.validateAmountPercent = this.validateAmountPercent.bind(this);
		this.resetCouponForm = this.resetCouponForm.bind(this);
		this.getCouponCodes = this.getCouponCodes.bind(this);
		this.doOpenEditPopup = this.doOpenEditPopup.bind(this);
		this.confirmDeleteCode = this.confirmDeleteCode.bind(this);
		this.toggleDeleteConfirmationPopup = this.toggleDeleteConfirmationPopup.bind(this);
		this.doDeleteCouponCode = this.doDeleteCouponCode.bind(this);
	};
	toggleCouponCodePopup = (e) => {
		if(!this.state.isShowCouponModel){
			this.props.doTicketTypes().then(resp=>{
				this.setState({
					ticketData: resp && resp.data
				})
			}).catch(error=>{

			})
		}
		else {
			this.setState({
				isCouponEdit: false
			})
		}
		this.setState({
			isShowCouponModel: !this.state.isShowCouponModel
		})
	};
	componentWillMount() {
		this.props.doGetTicketingSettings("settings").then(resp => {
			this.setState({
				settings: resp && resp.data
			})
		}).catch(error => {

		});
	};
	createOrUpdateCoupon = () =>{
		if(this.state.couponCode && this.state.couponEndDate && this.state.couponStartDate && this.state.couponAmount > -1 ){
			let data = {
				"amount": parseInt(this.state.couponAmount),
				"couponCode": this.state.couponCode,
				"couponEndDate":  moment().format(),//this.state.couponEndDate,
				"couponStartDate": moment().format(),//this.state.couponStartDate,
				"discountType": this.state.discountType || "PERCENTAGE",
				"eventTicketTypeId": this.state.selectedTicketTypes.join(",") || "",
				"uses": this.state.couponUses || 0
			};
			this.props.doCreateCouponCode(data, this.state.isCouponEdit ? this.state.editingRow.code : null).then(resp=>{
				console.log('resp', resp);
			  this.setState({errorMessage:"",isError:false})//resp.data.message
				this.resetCouponForm();
				this.toggleCouponCodePopup();
				this.getCouponCodes();

			}).catch(error=>{
				console.log(error)
			})
		}
		else {
			this.setState({errorMessage:"Please fill All information",isError:true})
		}
	};
	getCouponCodes = () =>{
		this.props.doGetTicketingCouponCodes().then(resp=>{
			this.setState({
				couponCodes: resp && resp.data
			});
			this.state.selectedTicketTypes.map(item=>{
				document.querySelector('#check-'+item).checked = true;
			});
		}).catch(error=>{

		})
	};
	setActiveTab = (tab, type)=>{
		if(type === 'tab'){
			if(tab === 'Discount Codes'){
				this.getCouponCodes();
			}
			this.setState({
				tab : tab
			})
		}
		else{
			this.setState({
				subTab: tab
			})
		}
	};
	saveSettings = (e)=>{
		e.preventDefault();
		this.props.doPostTicketingSettings('settings', this.state.settings).then(resp=>{
			console.log('resp', resp);
			alert("Saved")
		}).catch(error=>{
			console.log('error', error);
			alert("error in saved")
		})

	};
	copyToClipBoard = ()=>{

	};
	setActiveScreen = (ScreenNo)=>{
		this.setState({
			activeScreen: ScreenNo
		})
	};
	toggleTicketTypes = (typeId) =>{
		let selectedTicketTypes = this.state.selectedTicketTypes;
		let index = selectedTicketTypes.indexOf( typeId) ;
		if(index > -1){
			selectedTicketTypes.splice(index, 1);
		} else {
			selectedTicketTypes.push(typeId);
		}

		this.setState({
			selectedTicketTypes : selectedTicketTypes
		});
		document.querySelector('#checkAll').checked = this.state.ticketData && selectedTicketTypes && this.state.ticketData.ticketTypes && selectedTicketTypes.length >= this.state.ticketData.ticketTypes.length;
	};
	toggleAllTicketsType = (e)=>{
		if(this.selectAllTicket.checked){
			this.setState({
				selectedTicketTypes :_.map( this.state.ticketData.ticketTypes, 'typeId')
			});
			_.map( this.state.ticketData.ticketTypes, 'typeId').map(item=>{
				document.querySelector('#check-'+item).checked = true;
			});
		}
		else{
			_.map( this.state.ticketData.ticketTypes, 'typeId').map(item=>{
				document.querySelector('#check-'+item).checked = false;
			});
			this.setState({
				selectedTicketTypes : []
			});
		}
		// let element = angular.element(e.target);
		// e.target.attr("checked", true)
	};
	validateAmountFixed = ()=>{
		let isnumber = this.amountFixed.value;
		if(!isNaN(isnumber)){
			this.setState({
				discountType: "FLAT",
				couponAmount : this.amountFixed.value && this.amountFixed.value.trim()
			})
		}
		else {
			this.amountFixed.value = '';
			// $("#amount-percent").attr("disabled", false);
		}
	};
	validateAmountPercent = ()=>{
		let isnumber = this.amountPercent.value;
		if(!isNaN(isnumber)){
			this.setState({
				discountType: "PERCENTAGE",
				couponAmount : this.amountPercent.value && this.amountPercent.value.trim()
			})
		}
		else {
			this.amountPercent.value = '';
			// $("#amount-fixed").attr("disabled", false);
		}
	};
	changeCouponUses = ()=>{
		let isnumber = this.couponUses.value;
		if(!isNaN(isnumber)){
			this.setState({
				couponUses : this.couponUses.value && parseInt(this.couponUses.value.trim())
			})
		}
		else {
			this.amountFixed.value = '';
			// $("#amount-percent").attr("disabled", false);
		}
	};
	resetCouponForm = ()=>{
		this.setState({
			activeScreen : 1,
			ticketData: [],
			selectedTicketTypes: [],
			couponAmount : 0,
			couponUses : 0,
			couponCode : '',
			couponEndDate : '',
			couponStartDate : '',
			discountType : '',
			couponEventTicketTypeId : '',
			couponCouponUsesType : 'Unlimited',
		})
	};
	changeUsesType = (event) => {
		if(event.target && event.target.value){
			if(event.target.value && event.target.value.trim()){
				this.setState({
					couponCouponUsesType :event.target.value.trim()
				})

			}
			else{
				event.target.parentElement.classList.add('has-error');
			}
		}
		else{
			event.target.parentElement.classList.add('has-error');
		}
	};
	changeCouponName = (event) => {
		if(event.target && event.target.value){
			if(event.target.value && event.target.value.trim()){
				this.setState({
					couponCode :event.target.value.trim()
				})

			}
			else{
				event.target.parentElement.classList.add('has-error');
			}
		}
		else{
			event.target.parentElement.classList.add('has-error');
		}
	};
	changeCouponStartDate = (event) => {
		if(this.couponStartDate && this.couponStartDate.value){
			if(this.couponStartDate.value && this.couponStartDate.value.trim()){
				this.setState({
					couponStartDate : this.couponStartDate.value.trim()
				})

			}
			else{
				event.target.parentElement.classList.add('has-error');
			}
		}
		else{
			event.target.parentElement.classList.add('has-error');
		}
	};
	changeCouponEndDate = (event) => {
		if(this.couponEndDate && this.couponEndDate.value){
			if(this.couponEndDate.value && this.couponEndDate.value.trim()){
				this.setState({
					couponEndDate : this.couponEndDate.value.trim()
				})

			}
			else{
				event.target.parentElement.classList.add('has-error');
			}
		}
		else{
			event.target.parentElement.classList.add('has-error');
		}
	};
	doOpenEditPopup = (row)=>{
		this.setState({
			isCouponEdit: true,
			activeScreen: row.eventTicketTypeId ? 2 : 3,
			couponAmount: row.amount,
			couponCode: row.code,
			couponEndDate: moment(row.endDate).format("L"),
			couponStartDate: moment(row.startDate).format("L"),
			couponUses: row.maximumUseOfCoupon,
			discountType: row.discountType,
			couponEventTicketTypeId: row.eventTicketTypeId || "",
			selectedTicketTypes: row.eventTicketTypeId ? row.eventTicketTypeId.split(',').map(function(x){return parseInt(x)}) : "",
			editingRow : row
		});
		this.toggleCouponCodePopup();
	};
	doDeleteCouponCode = (code) => {
		this.props.doDeleteCouponCode(code).then(resp =>{
			alert('Record Deleted');
			this.getCouponCodes();
			this.toggleDeleteConfirmationPopup();
		}).catch(error=>{
			alert("Error while deleting Record")
		})

	};
	confirmDeleteCode = (code)=>{
		this.setState({
			couponToDelete: code
		});
		this.toggleDeleteConfirmationPopup();
	};
	toggleDeleteConfirmationPopup = ()=>{
		this.setState({
			message: !this.state.showDeleteConfirmation ? "Are you sure you want to Delete Coupon?" : "",
			showDeleteConfirmation: !this.state.showDeleteConfirmation
		});
	};
	render() {
		let start = this.state.startDate.format("YYYY-MM-DD HH:mm:ss");
		let end =this.state.endDate.format("YYYY-MM-DD HH:mm:ss");
		// let end = this.state.endDate.format("YYYY-MM-DD HH:mm:ss");
		let label = start + " - " + end;
		if (start === end) {
			label = start;
		}

		let locale = {
			format: "YYYY-MM-DD HH:mm:ss",
			separator: " - ",
			applyLabel: "Apply",
			cancelLabel: "Cancel",
			weekLabel: "W",
			customRangeLabel: "Custom Range",
			daysOfWeek: moment.weekdaysMin(),
			monthNames: moment.monthsShort(),
			firstDay: moment.localeData().firstDayOfWeek(),
		};
		const options = {
			page: 1,  // which page you want to show as default
			sizePerPageList: [{
				text: '5', value: 5
			}, {
				text: '10', value: 10
			}, {
				text: 'All', value: 100
			}], // you can change the dropdown list for size per page
			sizePerPage: 10,  // which size per page you want to locate as default
			pageStartIndex: 0, // where to start counting the pages
			paginationSize: 10,  // the pagination bar size.
			prePage: 'Prev', // Previous page button text
			nextPage: 'Next', // Next page button text
			// firstPage: 'First', // First page button text
			// lastPage: 'Last', // Last page button text
			// paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
			paginationPosition: 'bottom',  // default is bottom, top and both is all available
			// hideSizePerPage: true > You can hide the dropdown for sizePerPage
			// alwaysShowAllBtns: true // Always show next and previous button
			// withFirstAndLast: false > Hide the going to First and Last page button
			defaultSortName: 'amount',
		};
		function formatStartEndDate(cell, row){
			return '<p><label>Start: &nbsp;&nbsp;</label>'+ moment(row.startDate).format('L')+'</p><p> <label>End:&nbsp;&nbsp;</label>'+ moment(row.endDate).format('L')+'</p>';
		}
		function couponUsageCount(cell, row){
			let sysmbol = row.maximumUseOfCoupon;
			if(sysmbol === -1){
				sysmbol = '&#8734;';
			}
			return '<label>' + row.couponUsed + '/'+sysmbol+'</label>';
		}
		function formatActionButtons(cell, row ){
			return (<div className="dropdown discount-codes-dropdown">
				<button className="btn btn-wire dropdown-toggle" onClick={toggleDropDown}
								type="button" data-toggle="dropdown" aria-expanded="false">    Select Action    <span className="caret"></span>  </button>
				<ul className="dropdown-menu">
					<li><a className="edit-item" onClick={()=>{ticketInst.doOpenEditPopup(row)}}>Edit</a></li>
					<li><a className="delete-item" onClick={()=>{ticketInst.confirmDeleteCode(row.code)}}>Delete</a></li>
				</ul>
			</div>);
		}
		function toggleDropDown(event){
			let divs = document.querySelectorAll('div.discount-codes-dropdown');
			[].forEach.call(divs, function(div) {
				// do whatever
				div.classList.remove('open');
			});
			event.target.parentElement.classList.add('open');
		}
		return (
			<div id="content-wrapper" className="admin-content-wrapper  volunteer">
				<style dangerouslySetInnerHTML={{__html: ".fa-ellipsis-v+.fa-ellipsis-v{margin-left:2px}.flex-col.dots-sign-column{max-width:12px}.flex-col.ticket-quantity-column{max-width:122px;text-align:center}.flex-col.ticket-price-column{max-width:130px;text-align:center}.flex-col.ticket-actions-column{max-width:100px}.data-wrap{margin-left:-5px;z-index:9;margin-right:-5px}.ticket-actions-column ul.list-inline{margin:0;display:inline-block;border-top:2px solid;border-left:2px solid;border-right:2px solid;border-top-left-radius:4px;border-top-right-radius:4px;border-color:#e7eaf0;background-color:#F8F8FA;padding:5px 5px 27px;z-index:10;position:absolute}.data{background-color:#f8f8f8;padding:10px 16px;border-top:2px solid;border-bottom:2px solid;border-color:#e7eaf0;z-index:1}.tiny{font-size:11px}span.blue{color:#04c}.table.tickets-table{border:2px solid #e7eaf0;padding:5px;border-radius:4px}.table.tickets-table .table-header{background-color:#eff2f5;margin:-5px -5px 5px;padding:5px}hr{margin-top:5px;border-width:2px}.fa-ellipsis-v{margin-top:12px;display:inline-block}.ticket-row .flex-row{padding-top:12px}.ticket-row .data-wrap{height:2px;overflow:hidden;transition:.3s all ease-in}.ticket-row ul.list-inline{cursor:pointer;border-width:0;background-color:transparent}.ticket-row.open .data-wrap{height:auto;overflow:hidden}.ticket-row.open ul.list-inline{border-width:2px;background-color:#f8f8f8}.info-fields-table{background-color:#f8f8f8;padding:5px;max-width:640px;margin:auto}.attendee-information-container{padding:0 40px}.attendee-information-container .form-group{padding-left:20px;position:relative}.form-control{border-width:1px}.all-orders{padding:0 30px}.all-orders .order-panel .order-panel-header{font-size:2em;color:#1abc9c;margin-bottom:5px}.all-orders .order-panel .order-panel-header .order-number{float:left}.all-orders .order-panel .order-panel-header .order-actions{float:right}.all-orders .order-panel .order-panel-header:after,.all-orders .order-panel .order-panel-header:before{content:\" \";display:table;clear:both}.order-ticket-details{margin-top:20px}.order-ticket-details thead{background:#777;color:#FFF}.order-ticket-details thead tr th{padding-top:15px;padding-bottom:15px}.ajax-msg-box{padding:10px;font-size:1.3em}.ajax-msg-box.text-success{background:#b7f2b8}.ajax-msg-box.text-danger{background:#f2b7b8}.form.create-event h5,.form.create-event label{font-weight:700;text-transform:uppercase}.order-panel-body .dropdown{min-width:200px;display:inline-block}.order-actions .dropdown .btn.dropdown-toggle,.order-panel-body .dropdown .btn.dropdown-toggle{background:#FFF;border:1px solid #BFBFBF;color:#000;border-radius:0}.discount-codes-table td:last-child{width:1px}.embed-event-code{border:1px solid #eee;padding:20px 30px;position:relative;word-wrap:break-word}.embed-event-code+button{position:absolute;top:0;right:0;margin:0;font-size:10px;width:50px;word-wrap:break-word;white-space:normal;background-color:#ececec;color:#000;border:0;border-radius:0;transition:.3s all ease-in}.embed-event-code+button:hover{background-color:#555;color:#FFF}"}}/>
				<div className="row">
					<div className="col-sm-12">
						<div className="row" style={{opacity: 1}}>
							<div className="col-lg-12">
								<div className="row">
									<div className="col-lg-12">
										<div id className="clearfix">
											<h1>
												Event Registration Settings
												<div className="pull-right">
													<button className="btn btn-info btn-block saveSettings" type="submit"
																	data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">Save
														Settings
													</button>
												</div>
											</h1>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12">
										<div className="main-box no-header">
											<div className="ajax-wrap">
												<div className="ajax-msg-box text-center" style={{display: 'none'}}>
													<span className="fa fa-spinner fa-pulse fa-fw"/>
													<span className="resp-message"/>
												</div>
											</div>
											<div className="tabs-wrapper profile-tabs">
												<Tabs onSelect={ (index, label) => {
													this.setActiveTab(label, 'tab')
												} } selected={this.state.tab} id="uncontrolled-tab-example">
													<Tab eventKey={1} label="Order Form">
														<div className="">
															<div className="tab-pane" id="order-form">
																<div className=" tab-content attendee-information-container">
																	<h4>Attendee Information:</h4>
																	<div className="form-group">
																		<div className="radio">
																			<input type="radio" name="buyer-only" id="buyer-only"
																						 onChange={()=>{
																						 	let settings = this.state.settings;
																							 settings.holderAttribute =  !settings.holderAttribute;
																							 this.setState({
																								 settings: settings
																							 });
																						 }}
																						 defaultChecked={!(this.state.settings && this.state.settings.holderAttribute)}/>
																			<label htmlFor="buyer-only">
																				<strong>Buyer Only</strong> (collect information from just the person purchasing
																				tickets)
																			</label>
																		</div>
																	</div>
																	<div className="form-group">
																		<div className="radio">
																			<input type="radio"
																						 name="buyer-only"
																						 id="each-attendee"
																						 onChange={()=>{
																							 let settings = this.state.settings;
																							 settings.holderAttribute =  !settings.holderAttribute;
																							 this.setState({
																								 settings: settings
																							 });
																						 }}
																						 defaultChecked={this.state.settings && this.state.settings.holderAttribute}/>
																			<label htmlFor="each-attendee">
																				<strong>Each Attendee</strong> (collect information from each person attending
																				the event)
																			</label>
																		</div>
																	</div>
																</div>
																<Tabs defaultActiveKey={2}
																			onSelect={ (index, label) => {
																				this.setActiveTab(label)
																			} }
																			selected={this.state.subTab} id="uncontrolled-tab-example">
																	<Tab eventKey={10} label="Ticket Buyer">
																		<div className=" info-fields-table">

																			<div className="text">Purchaser Information to collect</div>
																			<table className="table user-list table-hover">
																				<thead>
																				<tr>
																					<th><span>Field</span></th>
																					<th><span>Include</span></th>
																					<th><span>Require</span></th>
																					<th className="hide"><span>Attribute Order</span></th>
																				</tr>
																				</thead>
																				<tbody>
																				{
																					this.state.settings && this.state.settings.attributes ?
																						this.state.settings.attributes.map((item, key) =>
																							<tr key={Math.random()}>
																								<td>{item.fieldName}</td>
																								<td>
																									<ToggleSwitch name={"include"+item.fieldName} id={"include"+item.fieldName}
																																defaultValue={ item.enabledForTicketPurchaser}
																																className="success" onChange={() => {
																										this.state.settings.attributes[key].enabledForTicketPurchaser = !this.state.settings.attributes[key].enabledForTicketPurchaser
																									}}/>

																								</td>
																								<td>
																									<ToggleSwitch name={ "required"+item.fieldName} id={"required"+item.fieldName}
																																defaultValue={item && item.requiredForTicketPurchaserd ? true : false}
																																className="success" onChange={() => {
																										this.state.settings.attributes[key].requiredForTicketPurchaserd = !this.state.settings.attributes[key].requiredForTicketPurchaserd
																									}}/>
																								</td>
																								<td className="hide">
																									<div className="edit">
																										<input type="text" name="attributeOrder[Prefix]"
																													 className="form-control"
																													 defaultValue={1000} id="attributeOrder-Prefix"/>
																									</div>
																								</td>
																							</tr>)
																						: ""
																				}
																				</tbody>
																			</table>
																		</div>
																	</Tab>
																	<Tab eventKey={11} label="Ticket Holder" disabled={!(this.state.settings && this.state.settings.holderAttribute)}>
																		<div className=" info-fields-table">

																			<div className="text">Ticket Holder Information to collect</div>
																			<table className="table user-list table-hover">
																				<thead>
																				<tr>
																					<th><span>Field</span></th>
																					<th><span>Include</span></th>
																					<th><span>Require</span></th>
																					<th className="hide"><span>Attribute Order</span></th>
																				</tr>
																				</thead>
																				<tbody>
																				{
																					this.state.settings && this.state.settings.attributes ?
																						this.state.settings.attributes.map((item, key) =>
																							<tr key={Math.random()}>
																								<td>{item.fieldName}</td>
																								<td>
																									<ToggleSwitch name={"include"+item.fieldName} id={"include"+item.fieldName}
																																defaultValue={ item.enabledForTicketHolder}
																																className="success" onChange={() => {
																										this.state.settings.attributes[key].enabledForTicketHolder = !this.state.settings.attributes[key].enabledForTicketHolder
																									}}/>

																								</td>
																								<td>
																									<ToggleSwitch name={ "required"+item.fieldName} id={"required"+item.fieldName}
																																defaultValue={item.requiredForTicketHolder}
																																className="success" onChange={() => {
																										this.state.settings.attributes[key].requiredForTicketHolder = !this.state.settings.attributes[key].requiredForTicketHolder
																									}}/>
																								</td>
																								<td className="hide">
																									<div className="edit">
																										<input type="text" name="attributeOrder[Prefix]"
																													 className="form-control"
																													 defaultValue={1000} id="attributeOrder-Prefix"/>
																									</div>
																								</td>
																							</tr>)
																						: ""
																				}
																				</tbody>
																			</table>
																		</div>
																	</Tab>
																</Tabs>
																<div className="attendee-information-container">
																	<h4>Embed ticketing in my website</h4>
																	<div className="form-group">
																		<div className="embed-event-code noselect" onClick={this.copyToClipBoard}>
																			&lt;iframe
																			src="http://www.stagingaccel.com:8080/AccelEventsWebApp/events/jfbnd/embed"
																			style="min-height: 400px; min-width: 500px; border: 1px solid #eee;"&gt;&lt;
																			/iframe&gt;
																		</div>
																		<button className="btn mrg-t-lg" type="button" onClick={this.copyToClipBoard}>Copy Code</button>
																	</div>
																</div>
																<div className="form-group operations-row text-center">
																	<button className="btn btn-info mrg-t-lg saveSettings" onClick={this.saveSettings}
																					data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">
																		Save
																		Settings
																	</button>
																</div>
															</div>
														</div>
													</Tab>
													<Tab eventKey={2} label="Discount Codes">
														<div id="discount-codes">
															<h4>Discount Codes</h4>
															<div className="discount-codes-container">
																<a data-toggle="modal" data-target="#new-code" className="btn btn-wire" onClick={this.toggleCouponCodePopup}>
																		<span className="fa-stack">
																			<i className="fa fa-circle-thin fa-stack-2x"/>
																			<i className="fa fa-plus fa-stack-1x"/>
																		</span>
																	New Code
																</a>
																<div className=" discount-codes-table-container">
																	<div className="text">Event Specific Codes</div>
																	<BootstrapTable data={this.state.couponCodes} striped hover search  pagination={ true }  options={ options }
																									fetchInfo={{dataTotalSize: 30}}
																									remote>
																		<TableHeaderColumn dataSort  isKey={true} dataField='code'>NAME</TableHeaderColumn>
																		<TableHeaderColumn dataSort  dataField='amount'>AMOUNT</TableHeaderColumn>
																		<TableHeaderColumn  dataFormat={couponUsageCount}>USES</TableHeaderColumn>
																		<TableHeaderColumn  dataFormat={formatStartEndDate} >STARS-ENDS</TableHeaderColumn>
																		<TableHeaderColumn  dataFormat={formatActionButtons} ></TableHeaderColumn>
																	</BootstrapTable>
																</div>
															</div>
														</div>
													</Tab>
												</Tabs>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			<div id="new-code">
				<PopupModel
					id="new-code"
					showModal={this.state.isShowCouponModel}
					headerText={
						<p>
							<a href="javascript:void(0)" onClick={()=>{this.setActiveScreen( this.state.isCouponEdit ? this.state.couponEventTicketTypeId ? 2 : 3 : 1)}} className={cx("screen-changer back-btn", this.state.activeScreen === 1 && "hide")} style={{display: 'block'}} data-screen="init">
								<i className="fa fa-angle-left" />
							</a>
							Discount & Access Code
						</p>}
					onCloseFunc={this.toggleCouponCodePopup}
				>
					<form>
						<input type="hidden" name="id" id="dicount-id" />
						<div className="create-coupon-wizard screen-container">
							<div className={cx("screen screen-1", this.state.activeScreen !== 1 && "hide")} data-screen-name="init" data-screen-title="Discount & Access Code" style={{display: 'block'}}>
								<h4 className="text-center">What Tickets should it apply to?</h4>
								<ul className="list-unstyled">
									<li>
										<a className="screen-changer" onClick={()=>{this.setActiveScreen(3)}} data-screen="configure-code">
											All tickets in the current event
										</a>
									</li>
									<li>
										<a className="screen-changer" onClick={()=>{this.setActiveScreen(2)}} data-screen="select-ticket-types">
											Select specific tickets from the current event
										</a>
									</li>
								</ul>
							</div>
							<div className={cx("screen screen-2", this.state.activeScreen !== 2 && "hide")} data-screen-name="select-ticket-types" data-screen-title="Select Tickets">
								<ul className="top-nav">
									<li className="heading"> Tickets </li>
									<li> selected <span className="selected-count">{this.state.selectedTicketTypes && this.state.selectedTicketTypes.length}</span> </li>
								</ul>
								<div className="all-tickets">
									<div className><span className="text-uppercase">Ticket Results </span> <span className="selected-count">{ this.state.selectedTicketTypes && this.state.selectedTicketTypes.length}</span>  of {this.state.ticketData && this.state.ticketData.ticketTypes && this.state.ticketData.ticketTypes.length} </div>
									<div className="event-details clearfix">
										<div className="event-name">
											<strong>{this.state.ticketData && this.state.ticketData.eventTitle ? this.state.ticketData.eventTitle : ""}  {this.state.ticketData && this.state.ticketData.eventAddress ? "at " + this.state.ticketData.eventAddress : ""}</strong>
											{this.state.ticketData && this.state.ticketData.ticketTypes && this.state.ticketData.ticketTypes.length ?<div className="checkbox-nice">
												<input type="checkbox" id="checkAll"
															 defaultChecked={ this.state.selectedTicketTypes && this.state.selectedTicketTypes.length && this.state.ticketData.ticketTypes.length == this.state.selectedTicketTypes.length}
															 ref={ref => {
																 this.selectAllTicket = ref;
															 }}
													onChange={this.toggleAllTicketsType}
												/>
												<label htmlFor="checkAll" />
											</div> : "" }
										</div>
										<div className="small event-time">
											August 31, 2017 11:50 PM
										</div>
									</div>
									<ul className="list-unstyled">
										{this.state.ticketData && this.state.ticketData.ticketTypes ? this.state.ticketData.ticketTypes.map(item => <li  key={item.typeId}>
											<div className="ticketType-name">
												{ item.name}
												<div className="checkbox-nice pull-right">
													<input type="checkbox" id={"check-" + item.typeId}
																 className="checked-ticket"
																 data-tickettype-id={item.typeId}

																 onChange={()=>{
																 	this.toggleTicketTypes(item.typeId);
																 }}
																 defaultChecked={this.state.selectedTicketTypes && this.state.selectedTicketTypes.indexOf(item.typeId) > -1} />
													<label htmlFor={"check-" + item.typeId} />
												</div>
											</div>
											<div className="small ticketType-price">
												{this.props.currencySymbol}{item.price}
											</div>
										</li>) : <li className="text-center"> No ticket found for this event</li>}
									</ul>
								</div>
								<div className="text-right">
									<a className="btn btn-info screen-changer" onClick={()=>{this.setActiveScreen(3)}} data-screen="configure-code">
										Continue
									</a>
								</div>
							</div>
							<div className={cx("screen screen-3", this.state.activeScreen !== 3 && "hide")} data-screen-name="configure-code" data-screen-title="Configure Your Discount Code">
								<div className="configure-form">
									<div className="form-group">
										<label>Discount Code Name</label>
                    {this.state.errorMessage && <div className={cx("alert",this.state.isError ? "alert-danger":"alert-success")}>{this.state.errorMessage}</div>}
										<div className="input-group mrg-b-md" style={{width: '100%'}}>
											<input type="text"
														 className="form-control"
														 name="name"
														 id="name"
														 ref={ref => {
															 this.couponCode = ref;
														 }}
														 defaultValue={this.state.couponCode}
														 onChange={this.changeCouponName}
														 readOnly={this.state.isCouponEdit}
											/>
										</div>=<div className="help-text">E.g. Members, Child, Senior, Military etc. Presented as a sub-option to attendees when selecting a ticket</div>
									</div>
									<div className="form-group">
										<label>Discount Amount</label>
										<div className="form-inline">
											<div className="input-group">
												<span className="input-group-addon">{this.props.currencySymbol}</span>
												<input type="text" className="form-control" id="amount-fixed"
															 ref={ref => {
																 this.amountFixed = ref;
															 }}
															 defaultValue={ this.state.discountType === "FLAT" ?  this.state.couponAmount : ""}
															 onChange={this.validateAmountFixed}
															 readOnly={this.state.isCouponEdit ||(this.state.discountType !== "FLAT" && this.state.couponAmount ) }
												/>
											</div>
											or
											<div className="input-group">
												<input type="text" className="form-control" id="amount-percent"
															 ref={ref => {
																 this.amountPercent = ref;
															 }}
															 defaultValue={this.state.discountType === "PERCENTAGE" ?  this.state.couponAmount : ""}
															 onChange={this.validateAmountPercent}
															 readOnly={this.state.isCouponEdit || (this.state.discountType !== "PERCENTAGE" && this.state.couponAmount )}
												/>
												<span className="input-group-addon">%</span>
											</div>
										</div>
									</div>
									<div className="form-group">
										<label>Uses</label>
										<div className="form-inline">
											<div className="input-group">
												<select className="form-control" id="uses-dropdown" name="uses-dropdown" onChange={this.changeUsesType} defaultValue={this.state.couponCouponUsesType}>
													<option value="Unlimited">Unlimited</option>
													<option value="Limited">Limited</option>
												</select>
											</div>
											<div className={cx("input-group uses-input", this.state.couponCouponUsesType !== 'Limited' && "hide")} >
												<input type="number" className="form-control"
															 name="uses"
															 id="uses"
															 placeholder="Usage limit"
															 ref={ref => {
																 this.couponUses = ref;
															 }}
															 defaultValue={this.state.couponUses}
															 onChange={this.changeCouponUses}
												/>
											</div>
										</div>
									</div>
									<div className="form-group">
										<label>Coupon Duration Starts-Ends</label>
										<div className="col-md-12">
											<DatetimeRangePicker
												timePicker
												showDropdowns
												locale={locale}
												startDate={this.state.startDate && this.state.startDate._isAMomentObject ? this.state.startDate : moment(this.state.startDate)}
												endDate={this.state.endDate && this.state.endDate._isAMomentObject ? this.state.endDate : moment(this.state.endDate)}
												onApply={this.handleDateRangeApply}
											>
												<div className={ cx("form-group bg-white", !this.state.hasInvalidDate && "has-error") }>
													<input type="text" className={("form-control required")} value={label} required={true}/>
												</div>
											</DatetimeRangePicker>
										</div>
									</div>
									<div className="form-group">
										<label>Starts</label>
										<div className="form-inline">
											<div className="input-group">
											{/*	<DateField
													dateFormat="YYYY-MM-DD hh:mm:ss"
													date={date}
													onChange={onChange}
												/>*/}
												<input type="text" className="datepicker form-control white-bg"
															 name="couponStartDate" id="couponStartDate"
															 ref={(input) => {
																 this.couponStartDate = input;
															 }}
															 defaultValue={this.state.couponStartDate}
															 onChange={this.changeCouponStartDate}
															 placeholder="Start Date"  />
											</div>
											<div className="input-group">
												<input type="text"
															 className="datepicker form-control white-bg"
															 name="couponEndDate"
															 ref={(input) => {
																 this.couponEndDate = input;
															 }}
															 defaultValue={this.state.couponEndDate}
															 onChange={this.changeCouponEndDate}
															 id="couponEndDate" placeholder="End Date"  />
											</div>
										</div>
									</div>
								</div>
								<div className="text-right">
									<a className="btn btn-info create-code-continue" onClick={this.createOrUpdateCoupon}>
										Continue
									</a>
								</div>
							</div>
						</div>
					</form>

				</PopupModel>

			</div>
				<PopupModel
					id="mapPopup"
					showModal={this.state.showDeleteConfirmation}
					headerText={<p>Confirm</p>}
					onCloseFunc={this.toggleDeleteConfirmationPopup}
					modelFooter = {<div>
						<button className="btn btn-success" onClick={()=>{this.doDeleteCouponCode(this.state.couponToDelete)}}>Confirm</button>
						<button className="btn btn-green" onClick={()=>{this.toggleDeleteConfirmationPopup()}}>Close</button></div>}
				>
					<center>{ this.state.message }</center>
				</PopupModel>
			</div>
		);
	}
}

const mapDispatchToProps = {
	doGetTicketingSettings: (type) => doGetTicketingSettings(type),
	doPostTicketingSettings: (type, data) => doPostTicketingSettings(type, data),
	doGetTicketingCouponCodes: () => doGetTicketingCouponCodes(),
	doTicketTypes: () => doTicketTypes(),
	doCreateCouponCode: (data, code) => doCreateCouponCode(data, code),
	doDeleteCouponCode: (data) => doDeleteCouponCode(data),
	doUpdateCouponCode: (code, data) => doUpdateCouponCode(code, data),
};

const mapStateToProps = (state) => ({
	currencySymbol : (state.host && state.host.currencySymbol) || "$"
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(TicketSetting));
