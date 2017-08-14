/**
 * @Author: Dharmesh Rajodiya <dev1>
 * @Date:   2017-07-25 06:46:02
 * @Last modified by:   dev1
 * @Last modified time: 2017-07-25 09:10:43
 */

import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import moment from "moment";
import {connect} from "react-redux";
import DatetimeRangePicker from "react-bootstrap-datetimerangepicker";
import PopupModel from "../../../../components/PopupModal";
import TicketRow from "../../../../components/TicketRow";
import history from "../../../../history";
import s from "./CreateTicket.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import {doTicketTypes, doDeleteTicketTypes} from "../action";
import GoogleMap from "../../../../components/GoogleMaps";

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
			dialogConfirmationMessage: "Are you sure?",
			dialogConfirmationTitle: "Confirmation",
			showConfirmationDialog: false,
			startDate: moment(),
			endDate: moment().add(1, "days"),
			hasInvalidDate: false,
			hasError: false,
			isToggleTimeZone: false,
			isInvalidDate: [],
			isLoading: false,
			isSuccess: false
		};
		this.doTicketTypes = this.doTicketTypes.bind(this);
		this.addNewTicket = this.addNewTicket.bind(this);
		this.toggleDialog = this.toggleDialog.bind(this);
		this.toggleConfirmationDialog = this.toggleConfirmationDialog.bind(this);
		this.throwError = this.throwError.bind(this);
		this.onError = this.onError.bind(this);
		this.updateEventData = this.updateEventData.bind(this);
		this.deleteTicketTypes = this.deleteTicketTypes.bind(this);
		this.askDeleteTicketTypes = this.askDeleteTicketTypes.bind(this);
		this.hasInvalidDate = this.hasInvalidDate.bind(this);
		this.toggleTimeZone = this.toggleTimeZone.bind(this);
		this.checkError = this.checkError.bind(this);
		this.setEventTitle = this.setEventTitle.bind(this);
		this.setEventAddress = this.setEventAddress.bind(this);
		this.setTimeZone = this.setTimeZone.bind(this);
		this.showLoading = this.showLoading.bind(this);
		this.showSuccessMessage = this.showSuccessMessage.bind(this);
	}
	componentWillMount() {
		this.doTicketTypes();
	}
	setEventTitle = (event) => {
		if (event && event.target) {
			if (event.target.value) {
				event.target.value = event.target.value.trim();
			}
			let eventData = this.state.eventData;
			eventData.eventTitle = event.target.value;
			this.setState({
				eventData: eventData
			});
		}
	};
	setEventAddress = (event) => {
		if (event && event.target && event.target.value) {
			event.target.value = event.target.value.trim();
		}
		if (event && event.target) {
			let eventData = this.state.eventData;
			eventData.eventAddress = event.target.value;
			this.setState({
				eventData: eventData
			});
		}
		else if (event) {
			let eventData = this.state.eventData;
			eventData.eventAddress = event;
			this.setState({ eventData });
		}
	};
	hasInvalidDate = (hasInvalidDate, key) => {
		let isInvalidDate = this.state.isInvalidDate;
		if(!isInvalidDate[key]){
			isInvalidDate[key] = false;
		}
		isInvalidDate[key] = hasInvalidDate;
		isInvalidDate.map(item=>{
			if(item){
				hasInvalidDate = item;
			}
		});
		this.setState({
			hasInvalidDate: hasInvalidDate,
			isInvalidDate: isInvalidDate,
		});
	};
	doTicketTypes = () => {
		this.props.doTicketTypes().then(resp => {
			this.setState({
				eventData: resp && resp.data
			})
		}).catch(error => {
			this.onError(error);
		});
	};
	toggleTimeZone = () => {
		this.setState({
			isToggleTimeZone: !this.state.isToggleTimeZone
		})
	};
	toggleConfirmationDialog = () => {
		this.setState({
			showConfirmationDialog: !this.state.showConfirmationDialog
		})
	};
	toggleDialog = () => {
		this.setState({
			showDialog: !this.state.showDialog
		})
	};
	checkError = () => {
		this.setState({
			hasError : false
		});
		let validator = document.querySelectorAll(".form-control.required");
		[].forEach.call(validator, item => {
			item.parentElement.classList.remove("has-error");
			if(!item.value){
				this.setState({
					hasError : true
				});
				item.parentElement.classList.add("has-error");
			}
		});
	};
	throwError = (title, message) => {
		this.setState({
			dialogTitle: title || "Not found",
			dialogMessage: message || "Oops! Something went wrong, Try again later"
		});
		setTimeout(() => {
			this.toggleDialog();
		}, 10);
	};

	showLoading = ()=>{
		this.setState({
			isLoading: true
		});
	};
	showSuccessMessage = ()=>{
		debugger;
		this.setState({
			isLoading: false,
			isSuccess: true
		}, ()=>{
			setTimeout(()=>{
				this.setState({
					isSuccess: false
				})
			}, 4000)
		});
	};
	onError = (error) => {
		let resendMailError = error && error.response && error.response.data;
		this.setState({
			isLoading: false
		});
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
			"endDate": moment().add(1, "days"),
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
		this.checkError();
		let selfInst = this;
		setTimeout(()=>{
			if(selfInst.state.hasInvalidDate && !selfInst.state.hasError){
				let eventData = selfInst.state.eventData;
				delete eventData.availableTimeZone;
				delete eventData.ticketingFee;
				selfInst.showLoading();
				eventData.eventAddress = eventData.eventAddress ? eventData.eventAddress : "" ;
				selfInst.props.doTicketTypes("post", eventData).then(resp => {
					//selfInst.throwError("Success", "Event Data save successfully");
					selfInst.showSuccessMessage();
				}).catch(error => {
					let eventDataError = error && error.response && error.response.data;
					selfInst.onError(error);
				});
			}
			else {
				selfInst.throwError("Error", "Please correct all error");
			}
		}, 100);


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
	askDeleteTicketTypes = (key) => {
		this.setState({
			deleteTicketKey: key,
			dialogConfirmationMessage: "Are you sure you want to delete this ticketType?"
		});
		this.toggleConfirmationDialog();

	};
	deleteTicketTypes= (key)=>{
		if(key){
			let eventData = this.state.eventData;
			if(!eventData.ticketTypes){
				eventData.ticketTypes = [];
			}
			if(!eventData.ticketTypes[key]){
				eventData.ticketTypes[key] = {};
			}
			if( !eventData.ticketTypes[key].typeId){
				eventData.ticketTypes.splice (key, 1);
				this.setState({
					eventData: eventData
				});
			}
			else {
				this.props.doDeleteTicketTypes(eventData.ticketTypes[key].typeId).then(resp=>{
					this.throwError("Success", eventData.ticketTypes[key].name + " deleted successfully");
					eventData.ticketTypes.splice (key, 1);
					this.setState({
						eventData: eventData,
						deleteTicketKey: undefined,
						isLoading: false
					});
				}).catch(error=>{
					this.onError(error);
				});
			}
		}
		else {
			this.throwError("Not found", " deleted successfully");
		}
	};
	setTimeZone = ()=>{
		let elm = document.getElementById("timezone-selector");
		let eventData = this.state.eventData;
		if(elm.value){
			eventData.timezoneId = elm.value;
			this.setState({
				eventData: eventData
			});
			this.toggleTimeZone();
		}
	};
	render() {
		let start = this.state.eventData &&  this.state.eventData.eventStartDate ? moment(this.state.eventData.eventStartDate).format("YYYY-MM-DD HH:mm:ss") : this.state.startDate.format("YYYY-MM-DD HH:mm:ss");
		let end = this.state.eventData &&  this.state.eventData.eventEndDate ? moment(this.state.eventData.eventEndDate).format("YYYY-MM-DD HH:mm:ss") : this.state.endDate.format("YYYY-MM-DD HH:mm:ss");
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
									<button className="btn btn-info btn-block saveSetting" type="submit" onClick={this.updateEventData}
													data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">
										Save Settings
									</button>
								</div>
							</h1>
						</div>
						<div className="main-box no-header">
							<div className="main-box-body clearfix">
								<div className={("ajax-wrap")}>
									<div className={("ajax-msg-box text-center text-danger", this.state.hasInvalidDate && "hide")}>
										<span className="fa fa-spinner fa-pulse fa-fw" style={{display: "none"}} />
										<span className="resp-message">Please correct the errors below</span>
									</div>
									{ this.state.isLoading ?
										<div className="ajax-msg-box text-center">
											<span className="fa fa-spinner fa-pulse fa-fw"/>
											<span className="resp-message">Please wait...</span>
										</div> : ""
									}
									{ this.state.isSuccess ?
										<div className="ajax-msg-box text-center text-success">
											<span className="resp-message">Setting saved...</span>
										</div> : ""
									}
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
												<input type="text" className="form-control required" name="eventTitle" id="eventTitle"
															 placeholder="Give it a short distinct name"
															 onChange={this.setEventTitle}
															 defaultValue={this.state.eventData && this.state.eventData.eventTitle} required={true}/>
											</div>
											<div className="form-group">
												<label>Location<span className="red"/></label>
												<input type="text" className="form-control required" defaultValue={this.state.eventData.eventAddress}
															 name="eventAddress" id="eventAddress" placeholder="Specify where it's held"
															 onChange={this.setEventAddress}
															 autoComplete="off" required={true}/>
											</div>
											<div className="row">
												<div className="col-md-12">
													<div className="form-group mrg-b-0">
														<label>Event Starts and End duration<span className="red"/></label>
														{this.state.eventData && this.state.eventData.eventStartDate && <DatetimeRangePicker
															timePicker
															showDropdowns
                              locale={locale}
                              startDate={this.state.eventData.eventStartDate && this.state.eventData.eventStartDate._isAMomentObject ? this.state.eventData.eventStartDate : moment(this.state.eventData.eventStartDate)}
															endDate={this.state.eventData.eventEndDate && this.state.eventData.eventEndDate._isAMomentObject ? this.state.eventData.eventEndDate : moment(this.state.eventData.eventEndDate)}
															onApply={this.handleDateRangeApply}
                            >
                              <div className={ cx("form-group", !this.state.hasInvalidDate && "has-error") }>
                                <input type="text" className={("form-control required")} value={label} required={true}/>
                              </div>
                            </DatetimeRangePicker> }
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<div className>
														<a onClick={this.toggleTimeZone} className="small blue timezone-settings">Timezone &amp; date
															settings (<span className="active-timezone">{this.state.eventData.timezoneId || "America/New_York"}</span>)</a>
														<div className={cx("timezone-selector mrg-t-lg", !this.state.isToggleTimeZone && "hide")}>
															<div className="form-group ">
																<label htmlFor="timezone">Select Timezone</label>
																<div className="form-inline">
																	<select name="timezone" className="form-control" id="timezone-selector" defaultValue={this.state.eventData.timezoneId || "America/New_York"} >
																		{this.state.eventData && this.state.eventData.availableTimeZone ? this.state.eventData.availableTimeZone.map(item =>
																			<option value={item.name} key={item.name}>{item.name}</option>) : <option value="America/New_York" selected={true}>"America/New_York"</option>}

																	</select>
																	<a className="btn btn-sm btn-wire" onClick={this.setTimeZone}> OK </a>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<GoogleMap eventAddress={this.state.eventData.eventAddress} setEventAddress={this.setEventAddress} height={250}/>
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
												this.state.eventData.ticketTypes ? this.state.eventData.ticketTypes.map((item, key) =>
													<TicketRow key={key} index={key}
																		 ticket={item}
																		 eventEndDate={this.state.eventData.eventEndDate}
																		 eventStartDate={this.state.eventData.eventStartDate}
																		 updateTicketState={this.updateTicketState}
																		 deleteTicketTypes={this.askDeleteTicketTypes}
																		 hasInvalidDate={this.hasInvalidDate}
													/>) : ""}
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

				<PopupModel
					id="popupConfirmation"
					showModal={this.state.showConfirmationDialog}
					headerText={<p>{this.state.dialogConfirmationTitle}</p>}
					onCloseFunc={this.toggleConfirmationDialog}
					modelFooter={<div>
						<button className="btn btn-danger" onClick={() => {
							this.toggleConfirmationDialog()
						}}>No
						</button>
						<button className="btn btn-green" onClick={() => {
							this.deleteTicketTypes(this.state.deleteTicketKey), this.toggleConfirmationDialog()
						}}>Yes
						</button>
					</div>}
				>
					<div>{this.state.dialogConfirmationMessage}</div>
				</PopupModel>

			</div>
		);
	}
}
const mapDispatchToProps = {
	doTicketTypes: (method, data) => doTicketTypes(method, data),
	doDeleteTicketTypes: (id) => doDeleteTicketTypes(id),
};

const mapStateToProps = (state) => ({
	currencySymbol : (state.host && state.host.currencySymbol) || "$"
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(CreateTicket));
