/**
 * @Author: Dharmesh Rajodiya <dev1>
 * @Date:   2017-07-25 06:46:02
 * @Last modified by:   dev1
 * @Last modified time: 2017-07-25 09:10:43
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import {connect} from 'react-redux';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import PopupModel from '../../../../components/PopupModal';
import TicketRow from '../../../../components/TicketRow';
import history from '../../../../history';
import s from './CreateTicket.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {doTicketTypes} from '../action';

class CreateTicket extends React.Component {
	static propTypes = {
		title: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			isModuleActive: true,
			isLoaded: false,
			auctionPageLoading: true,
			orderData: [],
			eventData: null,
			orderLimit: 10,
			orderOffset: 0,
			dialogMessage: "",
			dialogTitle: "",
			showDialog: false,
			startDate: moment(),
			endDate: moment().add(1, 'days'),
		};
		this.doTicketTypes = this.doTicketTypes.bind(this);
		this.addNewTicket = this.addNewTicket.bind(this);
		this.toggleDialog = this.toggleDialog.bind(this);
		this.throwError = this.throwError.bind(this);
		this.onError = this.onError.bind(this);
		this.updateEventData = this.updateEventData.bind(this);
		this.deleteTicketTypes = this.deleteTicketTypes.bind(this);
	}

	componentWillMount() {
		this.doTicketTypes();
	}

	doTicketTypes = () => {
		this.props.doTicketTypes().then(resp => {
			this.setState({
				eventData: resp && resp.data
			})
		}).catch(error => {
			this.onError(error);
		});
	};
	toggleDialog = () => {
		this.setState({
			showDialog: !this.state.showDialog
		})
	};
	throwError = (title, message) => {
		this.setState({
			dialogTitle: title || "Not found",
			dialogMessage: message || "Opps! Something went wrong, Try again later"
		});
		setTimeout(() => {
			this.toggleDialog();
		}, 10);
	};
	onError = (error) => {
		let resendMailError = error && error.response && error.response.data;
		this.throwError("Error", resendMailError && resendMailError.errorMessage);
	};
	addNewTicket = ()=>{
		let eventData = this.state.eventData;
		if(!eventData.ticketTypes){
			eventData.ticketTypes = [];
		}
		eventData.ticketTypes.push({
			"chnageToTabel": false,
			"enableTicketDescription": false,
			"endDate": moment().add(1, 'days'),
			"hidden": false,
			"isTable": false,
			"maxTickerPerBuyer": 1,
			"minTickerPerBuyer": 0,
			"name": "",
			"numberOfTicket": 0,
			"passfeetobuyer": false,
			"price": 0,
			"startDate": moment(),
			"ticketTypeDescription": "",
			"ticketsPerTable": 0,
			"typeId": 0
		});

		this.setState({
			eventData: eventData
		})

	};
	updateEventData = (event)=>{
		event.preventDefault();
		let eventData = this.state.eventData;
		delete eventData.availableTimeZone;
		delete eventData.ticketingFee;
		eventData.eventAddress = eventData.eventAddress ? eventData.eventAddress : "" ;
		this.props.doTicketTypes('post', eventData).then(resp => {
			console.log("resp", resp);
		}).catch(error => {
			this.onError(error);
		});
		return false;
	};

	handleDateRangeApply = (event, picker)=> {
		let ticket= this.state.eventData;
		ticket.eventEndDate = picker.endDate;
		ticket.eventStartDate = picker.startDate;
		this.setState({
			eventData: ticket
		});
		this.updateTicketState(ticket, this.props.index);
	};

	updateTicketState = (data, key)=>{
		console.log(data, key);
		let eventData = this.state.eventData;
		if(!eventData.ticketTypes){
			eventData.ticketTypes = [];
		}
		if(!eventData.ticketTypes[key]){
			eventData.ticketTypes[key] = {};
		}
		eventData.ticketTypes[key]=data;
		this.setState({
			eventData: eventData
		})
	};

	deleteTicketTypes= (key)=>{
		let eventData = this.state.eventData;
		if(!eventData.ticketTypes){
			eventData.ticketTypes = [];
		}
		if(!eventData.ticketTypes[key]){
			eventData.ticketTypes[key] = {};
		}
		eventData.ticketTypes.splice (key, 1);
		this.setState({
			eventData: eventData
		})

	};
	render() {
		let start = this.state.startDate.format('YYYY-MM-DD HH:mm:ss');
		let end = this.state.endDate.format('YYYY-MM-DD HH:mm:ss');
		let label = start + ' - ' + end;
		if (start === end) {
			label = start;
		}

		let locale = {
			format: 'YYYY-MM-DD HH:mm:ss',
			separator: ' - ',
			applyLabel: 'Apply',
			cancelLabel: 'Cancel',
			weekLabel: 'W',
			customRangeLabel: 'Custom Range',
			daysOfWeek: moment.weekdaysMin(),
			monthNames: moment.monthsShort(),
			firstDay: moment.localeData().firstDayOfWeek(),
		};

		return (
			<div id="content-wrapper" className="admin-content-wrapper">
				<style
					dangerouslySetInnerHTML={{__html: ".fa-ellipsis-v+.fa-ellipsis-v{margin-left:2px}.flex-col.dots-sign-column{max-width:12px}.flex-col.ticket-quantity-column{max-width:122px;text-align:center}.flex-col.ticket-price-column{max-width:130px;text-align:center}.flex-col.ticket-actions-column{max-width:100px}.data-wrap{margin-left:-5px;z-index:9;margin-right:-5px}.ticket-actions-column ul.list-inline{margin:0;display:inline-block;border-top:2px solid;border-left:2px solid;border-right:2px solid;border-top-left-radius:4px;border-top-right-radius:4px;border-color:#e7eaf0;background-color:#F8F8FA;padding:5px 5px 27px;z-index:10;position:absolute}.data{background-color:#f8f8f8;padding:10px 16px;border-top:2px solid;border-bottom:2px solid;border-color:#e7eaf0;z-index:1}.tiny{font-size:11px}span.blue{color:#04c}.table.tickets-table{border:2px solid #e7eaf0;padding:5px;border-radius:4px}.table.tickets-table .table-header{background-color:#eff2f5;margin:-5px -5px 5px;padding:5px}hr{margin-top:5px;border-width:2px}.fa-ellipsis-v{margin-top:12px;display:inline-block}.ticket-row .flex-row{padding-top:12px}.ticket-row .data-wrap{height:2px;overflow:hidden;transition:.3s all ease-in}.ticket-row ul.list-inline{cursor:pointer;border-width:0;background-color:transparent}.ticket-row.open .data-wrap{height:auto;overflow:hidden}.ticket-row.open ul.list-inline{border-width:2px;background-color:#f8f8f8}.info-fields-table{background-color:#f8f8f8;padding:5px;max-width:640px;margin:auto}.attendee-information-container{padding:0 40px}.attendee-information-container .form-group{padding-left:20px;position:relative}.form-control{border-width:1px}.all-orders{padding:0 30px}.all-orders .order-panel .order-panel-header{font-size:2em;color:#1abc9c;margin-bottom:5px}.all-orders .order-panel .order-panel-header .order-number{float:left}.all-orders .order-panel .order-panel-header .order-actions{float:right}.all-orders .order-panel .order-panel-header:after,.all-orders .order-panel .order-panel-header:before{content:\" \";display:table;clear:both}.order-ticket-details{margin-top:20px}.order-ticket-details thead{background:#777;color:#FFF}.order-ticket-details thead tr th{padding-top:15px;padding-bottom:15px}.ajax-msg-box{padding:10px;font-size:1.3em}.ajax-msg-box.text-success{background:#b7f2b8}.ajax-msg-box.text-danger{background:#f2b7b8}.form.create-event h5,.form.create-event label{font-weight:700;text-transform:uppercase}.order-panel-body .dropdown{min-width:200px;display:inline-block}.order-actions .dropdown .btn.dropdown-toggle,.order-panel-body .dropdown .btn.dropdown-toggle{background:#FFF;border:1px solid #BFBFBF;color:#000;border-radius:0}.discount-codes-table td:last-child{width:1px}.embed-event-code{border:1px solid #eee;padding:20px 30px;position:relative;word-wrap:break-word}.embed-event-code+button{position:absolute;top:0;right:0;margin:0;font-size:10px;width:50px;word-wrap:break-word;white-space:normal;background-color:#ececec;color:#000;border:0;border-radius:0;transition:.3s all ease-in}.embed-event-code+button:hover{background-color:#555;color:#FFF}"}}/>
				{ this.state.eventData ? <div className="row">
					<div className="col-sm-12">
						<div className="clearfix">
							<h1>
								Create Event Registration
								<div className="pull-right">
									<button className="btn btn-info btn-block saveSetting" type="submit"
													data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">
										Save Settings
									</button>
								</div>
							</h1>
						</div>
						<div className="main-box no-header">
							<div className="main-box-body clearfix">
								<div className="ajax-wrap">
									<div className="ajax-msg-box text-center" style={{display: 'none'}}>
										<span className="fa fa-spinner fa-pulse fa-fw"/>
										<span className="resp-message"/>
									</div>
								</div>
								<p>
									Use this page to create your event. Here, you can set
									your event date, and create different ticket types to sell
									to your event guests. Using the options below to create
									different ticket types, prices, selling dates, and number of
									tickets available at each desired level.
								</p>
								<form method="POST" className="create-event form mrg-t-lg" onSubmit={this.updateEventData}>
									<div className="row">
										<div className="col-md-6">
											<div className="form-group">
												<label>Event Title<span className="red">*</span></label>
												<input type="text" className="form-control" name="eventTitle" id="eventTitle"
															 placeholder="Give it a short distinct name"
															 defaultValue={this.state.eventData && this.state.eventData.eventTitle}/>
											</div>
											<div className="form-group">
												<label>Location<span className="red"/></label>
												<input type="text" className="form-control" defaultValue={this.state.eventData.eventAddress}
															 name="eventAddress" id="eventAddress" placeholder="Specify where it's held"
															 autoComplete="off"/>
											</div>
											<div className="row">
												<div className="col-md-12">
													<div className="form-group mrg-b-0">
														<label>Event Starts and End duration<span className="red"/></label>
                            <DatetimeRangePicker
                              timePicker
                              timePicker24Hour
                              showDropdowns
                              timePickerSeconds
                              locale={locale}
                              startDate={this.state.startDate}
                              endDate={this.state.endDate}
                              onApply={this.handleDateRangeApply}
                            >
                              <div className="form-group">
                                <input type="text" className="form-control" value={label}/>
                              </div>
                            </DatetimeRangePicker>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<div className>
														<a href="javascript:void(0)" className="small blue timezone-settings">Timezone &amp; date
															settings (<span className="active-timezone">America/New_York</span>)</a>
														<div className="timezone-selector mrg-t-lg" style={{display: 'none'}}>
															<div className="form-group ">
																<label htmlFor="timezone">Select Timezone</label>
																<div className="form-inline">
																	<select name="timezone" className="form-control" id="timezone-selector">
																		{this.state.eventData && this.state.eventData.availableTimeZone ? this.state.eventData.availableTimeZone.map(item =>
																			<option value={item.name} key={item.name}>{item.name}</option>) : ""}

																	</select>
																	<a className="btn btn-sm btn-wire" href="javascript:void(0)"> OK </a>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<div id="eventAddress-map" style={{height: 250, position: 'relative', overflow: 'hidden'}}>
													TODO: embed map with event location
												</div>
											</div>
										</div>
									</div>
									<h5>Add Ticket Types</h5>
									<p>Enter different ticket types, each with its own
										price, dates sold, and amount available. For example, you
										may sell Early Bird, General Admission, and Last Minute
										tickets for your event.</p>
									<div className="row mrg-t-md mrg-b-md">
										<div className="col-md-6 text-left">
											<button type="button" className="btn btn-info btn-add-ticket-type" onClick={this.addNewTicket}>Add
												Ticket Type
											</button>
										</div>
										<div className="col-md-6 text-right hide">
											<button type="button" className="btn btn-info">
												Ticket Type
											</button>
										</div>
									</div>
									<div className="table tickets-table">
										<div className="table-header">
											<div className="flex-row">
												<div className="flex-col dots-sign-column"/>
												<div className="flex-col ticket-name-column">
													<span>Ticket name</span>
												</div>
												<div className="flex-col ticket-quantity-column">
													<span>Quantity available</span>
												</div>
												<div className="flex-col ticket-price-column">
													<span>Price</span>
												</div>
												<div className="flex-col ticket-actions-column">
													<span>Actions</span>
												</div>
											</div>
										</div>
										<div className="table-body event-tickets">
											{
												this.state.eventData.ticketTypes ? this.state.eventData.ticketTypes.map((item, key) => <TicketRow key={key} index={key} ticket={item} updateTicketState={this.updateTicketState} deleteTicketTypes={this.deleteTicketTypes} />) : ""}
										</div>
									</div>


									<button className="btn btn-info saveSetting" type="submit"
													data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">&nbsp;
										&nbsp; &nbsp; Save Settings &nbsp; &nbsp; &nbsp;</button>
								</form>
							</div>
						</div>
					</div>
				</div> : "" }
				<PopupModel
					id="popupDialog"
					showModal={this.state.showDialog && this.state.dialogMessage && this.state.dialogMessage.length > 0}
					headerText={<p>{this.state.dialogTitle}</p>}
					onCloseFunc={this.toggleDialog}
					modelFooter={<div>
						<button className="btn btn-green" onClick={() => {
							this.toggleDialog()
						}}>Close
						</button>
					</div>}
				>
					<div>{this.state.dialogMessage}</div>
				</PopupModel>
			</div>
		);
	}
}
const mapDispatchToProps = {
	doTicketTypes: (method, data) => doTicketTypes(method, data),
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(CreateTicket));
