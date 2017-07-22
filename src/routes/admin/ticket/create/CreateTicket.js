
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import {connect} from 'react-redux';
import PopupModel from '../../../../components/PopupModal';
import history from '../../../../history';
import s from './CreateTicket.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {doGetTicketTypes} from '../action';

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
			eventData: {},
			orderLimit: 10,
			orderOffset: 0,
			dialogMessage : "",
			dialogTitle : "",
			showDialog : false
		};
		this.doGetTicketTypes = this.doGetTicketTypes.bind();
		this.toggleDialog = this.toggleDialog.bind(this);
		this.throwError = this.throwError.bind(this);
		this.onError = this.onError.bind(this);
	}

	componentWillMount(){
	  this.doGetTicketTypes();
  }

	doGetTicketTypes = ()=>{
    this.props.doGetTicketTypes().then(resp => {
      this.setState({
				eventData : resp && resp.data
      })
    }).catch(error => {
      this.onError(error);
    });
  };
	toggleDialog = ()=>{
		this.setState({
			showDialog: !this.state.showDialog
		})
	};
	throwError = (title, message)=>{
		this.setState({
			dialogTitle : title || "Not found",
			dialogMessage : message || "Your order details not found. Please try again later."
		});
		setTimeout(()=>{
			this.toggleDialog();
		},10);
	};

	onError = (error)=>{
		let resendMailError = error && error.response && error.response.data;
		this.throwError("Error", resendMailError && resendMailError.errorMessage);
	};


	render() {
    return (
      <div id="content-wrapper" className="admin-content-wrapper">
        { this.state.eventData ? <div className="row">
          <div className="col-sm-12">
            <div className="clearfix">
              <h1>
                Create Event Registration
                <div className="pull-right">
                  <button className="btn btn-info btn-block saveSetting" type="submit" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">
                    Save Settings
                  </button>
                </div>
              </h1>
            </div>
            <div className="main-box no-header">
              <div className="main-box-body clearfix">
                <div className="ajax-wrap">
                  <div className="ajax-msg-box text-center" style={{display: 'none'}}>
                    <span className="fa fa-spinner fa-pulse fa-fw" />
                    <span className="resp-message" />
                  </div>
                </div>
                <p>
                  Use this page to create your event. Here, you can set
                  your event date, and create different ticket types to sell
                  to your event guests. Using the options below to create
                  different ticket types, prices, selling dates, and number of
                  tickets available at each desired level.
                </p>
                <form method="POST" className="create-event form mrg-t-lg">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Event Title<span className="red">*</span></label>
                        <input type="text" className="form-control" name="eventTitle" id="eventTitle" placeholder="Give it a short distinct name" defaultValue={this.state.eventData.eventTitle} />
                      </div>
                      <div className="form-group">
                        <label>Location<span className="red" /></label>
                        <input type="text" className="form-control" defaultValue={this.state.eventData.eventAddress} name="eventAddress" id="eventAddress" placeholder="Specify where it's held" autoComplete="off" />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mrg-b-0">
                            <label>Starts<span className="red" /></label>
                            <div className="row">
                              <div className="col-md-6">
                                <input type="text" className="form-control white-bg" name="eventStartDate" id="eventStartDate" defaultValue={this.state.eventData.eventStartDate}/>
                              </div>
                              <div className="col-md-4">
                                <input type="text" className="form-control white-bg" name="eventStartTime" id="eventStartTime" defaultValue={this.state.eventData.eventStartDate} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mrg-b-0">
                            <label>Ends<span className="red" /></label>
                            <div className="row">
                              <div className="col-md-6">
                                <input type="text" className="form-control white-bg" name="eventEndDate" id="eventEndDate" defaultValue={this.state.eventData.eventStartDate}/>
                              </div>
                              <div className="col-md-4">
                                <input type="text" className="form-control white-bg" name="eventEndTime" id="eventEndTime" defaultValue={this.state.eventData.eventStartDate}/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className>
                            <a href="javascript:void(0)" className="small blue timezone-settings">Timezone &amp; date settings (<span className="active-timezone">America/New_York</span>)</a>
                            <div className="timezone-selector mrg-t-lg" style={{display: 'none'}}>
                              <div className="form-group ">
                                <label htmlFor="timezone">Select Timezone</label>
                                <div className="form-inline">
                                  <select name="timezone" className="form-control" id="timezone-selector">
                                    {this.state.eventData && this.state.eventData.availableTimeZone ? this.state.eventData.availableTimeZone.map(item=><option value={item.name} key={item.name} >{item.name}</option>) : ""}

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
                      <button type="button" className="btn btn-info btn-add-ticket-type">Add
                        Ticket Type</button>
                    </div>
                    <div className="col-md-6 text-right hide">
                      <button type="button" className="btn btn-info">
                        Ticket Type</button>
                    </div>
                  </div>
                  <div className="table tickets-table">
                    <div className="table-header">
                      <div className="flex-row">
                        <div className="flex-col dots-sign-column" />
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
                      <div className="ticket-row dummy">
                        <div className="flex-row">
                          <div className="flex-col dots-sign-column">
                            <i className="fa fa-ellipsis-v edit-item fa-lg" /><i className="fa fa-ellipsis-v edit-item fa-lg" />
                          </div>
                          <div className="flex-col ticket-name-column">
                            <input type="hidden" name="id" defaultValue={0} />
                            <input type="text" className="form-control ticket-name" name="ticketTypeName" maxLength={255} defaultValue />
                          </div>
                          <div className="flex-col ticket-quantity-column">
                            <input type="number" className="form-control ticket-quantity" name="numberOfTickets" defaultValue />
                          </div>
                          <div className="flex-col ticket-price-column">
                            <div className="input-group">
                              <span className="input-group-addon">$</span>
                              <input type="number" className="form-control ticket-price" name="price" defaultValue={0} />
                            </div>
                            <div className="tiny">
                              Buyer price: <br /><span className="blue buyer-price">$<span className="price-fees">0.00</span></span>
                            </div>
                          </div>
                          <div className="flex-col ticket-actions-column">
                            <ul className="list-inline">
                              <li><i className="fa fa-2x fa-cog edit-item" /></li>
                            </ul>
                          </div>
                        </div>
                        <div className="data-wrap">
                          <div className="data">
                            <div className="ticket-data">
                              Settings for <span className="ticket-type" />
                              <hr />
                              <div className="row">
                                <div className="col-md-8">
                                  <div className="form-group">
                                    <label>Ticket Description</label>
                                    <textarea maxLength={255} rows={3} className="form-control description" placeholder="Item description" name="ticketTypeDescription" defaultValue={""} />
                                    <div className="checkbox-nice">
                                      <input className="showDescription" type="checkbox" name="enableTicketDescription" />
                                      <label>Show ticket description on event page</label>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label>Fees</label>
                                    <select className="form-control pass-to-buyer">
                                      <option value="true">Pass fees on to ticket buyer</option>
                                      <option value="false">Absorb fees</option>
                                    </select>
                                    <div className="small">
                                      Buyer Total: $<span className="buyer-price-fees">0.00</span>
                                    </div>
                                  </div>
                                  <div className="row mrg-b-lg">
                                    <div className="col-md-6">
                                      <div className="form-group mrg-b-0">
                                        <label>Ticket sales start</label>
                                        <div className="row">
                                          <div className="col-md-8">
                                            <input type="text" className="form-control datepicker startDate white-bg" name="startDate" defaultValue="06/24/2017" readOnly="readonly" />
                                          </div>
                                          <div className="col-md-4">
                                            <input type="text" className="form-control timepicker startTime white-bg" name="startTime" defaultValue="09:59" readOnly="readonly" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group mrg-b-0">
                                        <label>Ticket sales ends</label>
                                        <div className="row">
                                          <div className="col-md-8">
                                            <input type="text" className="form-control datepicker endDate white-bg" name="endDate" defaultValue="02/02/2017" readOnly="readonly" />
                                          </div>
                                          <div className="col-md-4">
                                            <input type="text" className="form-control timepicker endTime white-bg" name="endTime" defaultValue="03:19" readOnly="readonly" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row ticket-size-div">
                                    <div className="col-md-6">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>Ticket Visibility</label>
                                            <div className="checkbox-nice">
                                              <input type="checkbox" className="hideType" name="hidden" />
                                              <label>Hide this ticket type.</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label className="max-ticket-label">Tickets allowed per order</label>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <input type="number" className="form-control minTicket" name="minTicketsPerBuyer" defaultValue={1} />
                                          </div>
                                          <div className="col-md-6">
                                            <input type="number" className="form-control maxTicket" name="maxTicketsPerBuyer" defaultValue={10} />
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <div className="small text-uppercase">minimum</div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="small text-uppercase">maximum</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row ticket-table">
                                    <div className="col-md-6">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>Table</label>
                                            <div className="checkbox-nice">
                                              <input type="checkbox" name="table" className="hideTable" />
                                              <label>Table</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 number-of-ticket-per-table hide">
                                      <div className="form-group">
                                        <label>Number of tickets per table</label>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <input type="number" className="form-control maxTable numberOfTicketPerTable" name="numberOfTicketPerTable" defaultValue={0} />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <a href="javascript:void(0)" className="btn btn-danger btn-block delete-type"><i className="fa fa-trash" /> Delete This Ticket Type</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <input type="hidden" name defaultValue />
                        </div>
                      </div>
                      <div className="ticket-row ">
                        <div className="flex-row">
                          <div className="flex-col dots-sign-column">
                            <i className="fa fa-ellipsis-v edit-item fa-lg" /><i className="fa fa-ellipsis-v edit-item fa-lg" />
                          </div>
                          <div className="flex-col ticket-name-column">
                            <input type="hidden" name="id" defaultValue={14} className="type-id" />
                            <input type="text" className="form-control ticket-name" name="ticketTypeName" maxLength={255} defaultValue="First Ticket" />
                          </div>
                          <div className="flex-col ticket-quantity-column">
                            <input type="text" className="form-control ticket-quantity" name="numberOfTickets" defaultValue={100} />
                          </div>
                          <div className="flex-col ticket-price-column">
                            <div className="input-group">
                              <span className="input-group-addon">$</span>
                              <input type="number" className="form-control ticket-price" name="price" defaultValue={100.00} />
                            </div>
                            <div className="tiny">
                              Buyer price: <br /><span className="blue buyer-price">$<span className="price-fees">11.74</span></span>
                            </div>
                          </div>
                          <div className="flex-col ticket-actions-column">
                            <ul className="list-inline">
                              <li><i className="fa fa-2x fa-cog edit-item" /></li>
                            </ul>
                          </div>
                        </div>
                        <div className="data-wrap">
                          <div className="data">
                            <div className="ticket-data">
                              Settings for <span className="ticket-type" />
                              <hr />
                              <div className="row">
                                <div className="col-md-8">
                                  <div className="form-group">
                                    <label>Ticket Description</label>
                                    <textarea maxLength={255} rows={3} className="form-control description" placeholder="Item description" name="ticketTypeDescription" defaultValue={""} />
                                    <div className="checkbox-nice">
                                      <input className="showDescription" type="checkbox" name="enableTicketDescription" id="enableTicketDescription-14" />
                                      <label htmlFor="enableTicketDescription-14">Show ticket description on event page</label>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label>Fees</label>
                                    <select className="form-control pass-to-buyer">
                                      <option value="true" selected="selected">Pass fees on to ticket buyer</option>
                                      <option value="false">Absorb fees</option>
                                    </select>
                                    <div className="small">
                                      Buyer Total: $<span className="buyer-price-fees">11.74</span>
                                    </div>
                                  </div>
                                  <div className="row mrg-b-lg">
                                    <div className="col-md-6">
                                      <div className="form-group mrg-b-0">
                                        <label>Ticket sales start</label>
                                        <div className="row">
                                          <div className="col-md-8">
                                            <input type="text" className="form-control datepicker startDate white-bg" name="startDate" defaultValue="01/02/2017" readOnly="readonly" />
                                          </div>
                                          <div className="col-md-4">
                                            <input type="text" className="form-control timepicker startTime white-bg" name="startTime" defaultValue="23:21" readOnly="readonly" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group mrg-b-0">
                                        <label>Ticket sales ends</label>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <input type="text" className="form-control datepicker endDate white-bg" name="endDate" defaultValue="02/02/2017" readOnly="readonly" />
                                          </div>
                                          <div className="col-md-6">
                                            <input type="text" className="form-control timepicker endTime white-bg" name="endTime" defaultValue="03:19" readOnly="readonly" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>Ticket Visibility</label>
                                            <div className="checkbox-nice">
                                              <input type="checkbox" className="hideType" name="hidden" id="hidden-14" />
                                              <label htmlFor="hidden-14">Hide this ticket type.</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label>Tickets allowed per order</label>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <input type="number" className="form-control minTicket" name="minTicketsPerBuyer" id="minTicket" defaultValue={0} />
                                          </div>
                                          <div className="col-md-6">
                                            <input type="number" className="form-control maxTicket" name="maxTicketsPerBuyer" id="maxTicket" defaultValue={10} />
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <div className="small text-uppercase">minimum</div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="small text-uppercase">maximum</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row ticket-table">
                                    <div className="col-md-6">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>Table</label>
                                            <div className="checkbox-nice">
                                              <input type="checkbox" className="hideTable" name="hidden" id="table-14" disabled="disabled" />
                                              <label htmlFor="table-14">Table</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 number-of-ticket-per-table hide">
                                      <div className="form-group">
                                        <label>Number of tickets per table</label>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <input type="number" className="form-control maxTable numberOfTicketPerTable" name="numberOfTicketPerTable" defaultValue={0} disabled="disabled" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <a href="javascript:void(0)" className="btn btn-danger btn-block delete-type" data-tickets-purchased="false" data-ticketing-id={14}><i className="fa fa-trash" /> Delete This Ticket Type</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <input type="hidden" name defaultValue />
                        </div>
                      </div>
                      <div className="ticket-row">
                        <div className="flex-row">
                          <div className="flex-col dots-sign-column">
                            <i className="fa fa-ellipsis-v edit-item fa-lg" /><i className="fa fa-ellipsis-v edit-item fa-lg" />
                          </div>
                          <div className="flex-col ticket-name-column">
                            <input type="hidden" name="id" defaultValue={15} className="type-id" />
                            <input type="text" className="form-control ticket-name" name="ticketTypeName" maxLength={255} defaultValue="Late" />
                          </div>
                          <div className="flex-col ticket-quantity-column">
                            <input type="text" className="form-control ticket-quantity" name="numberOfTickets" defaultValue={10} />
                          </div>
                          <div className="flex-col ticket-price-column">
                            <div className="input-group">
                              <span className="input-group-addon">$</span>
                              <input type="number" className="form-control ticket-price" name="price" defaultValue={1000.00} />
                            </div>
                            <div className="tiny">
                              Buyer price: <br /><span className="blue buyer-price">$<span className="price-fees">10448.75</span></span>
                            </div>
                          </div>
                          <div className="flex-col ticket-actions-column">
                            <ul className="list-inline">
                              <li><i className="fa fa-2x fa-cog edit-item" /></li>
                            </ul>
                          </div>
                        </div>
                        <div className="data-wrap">
                          <div className="data">
                            <div className="ticket-data">
                              Settings for <span className="ticket-type" />
                              <hr />
                              <div className="row">
                                <div className="col-md-8">
                                  <div className="form-group">
                                    <label>Ticket Description</label>
                                    <textarea maxLength={255} rows={3} className="form-control description" placeholder="Item description" name="ticketTypeDescription" data-gramm="true" data-txt_gramm_id="8e4d6ece-23a0-64c7-c800-3a5418ddd99f" data-gramm_id="8e4d6ece-23a0-64c7-c800-3a5418ddd99f" spellCheck="false" data-gramm_editor="true" style={{zIndex: 'auto', position: 'relative', lineHeight: '18.5714px', fontSize: 13, transition: 'none', background: 'transparent !important'}} defaultValue={""} />
                                    <div className="checkbox-nice">
                                      <input className="showDescription" type="checkbox" name="enableTicketDescription" id="enableTicketDescription-15" />
                                      <label htmlFor="enableTicketDescription-15">Show ticket description on event page</label>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label>Fees</label>
                                    <select className="form-control pass-to-buyer">
                                      <option value="true" selected="selected">Pass fees on to ticket buyer</option>
                                      <option value="false">Absorb fees</option>
                                    </select>
                                    <div className="small">
                                      Buyer Total: $<span className="buyer-price-fees">10448.75</span>
                                    </div>
                                  </div>
                                  <div className="row mrg-b-lg has-error">
                                    <div className="col-md-6">
                                      <div className="form-group mrg-b-0">
                                        <label>Ticket sales start</label>
                                        <div className="row">
                                          <div className="col-md-8">
                                            <input type="text" className="form-control datepicker startDate white-bg" name="startDate" defaultValue="01/02/2017" readOnly="readonly" />
                                          </div>
                                          <div className="col-md-4">
                                            <input type="text" className="form-control timepicker startTime white-bg" name="startTime" defaultValue="23:35" readOnly="readonly" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group mrg-b-0">
                                        <label>Ticket sales ends</label>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <input type="text" className="form-control datepicker endDate white-bg" name="endDate" defaultValue="02/02/2017" readOnly="readonly" />
                                          </div>
                                          <div className="col-md-6">
                                            <input type="text" className="form-control timepicker endTime white-bg" name="endTime" defaultValue="03:19" readOnly="readonly" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>Ticket Visibility</label>
                                            <div className="checkbox-nice">
                                              <input type="checkbox" className="hideType" name="hidden" id="hidden-15" />
                                              <label htmlFor="hidden-15">Hide this ticket type.</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label>Tickets allowed per order</label>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <input type="number" className="form-control minTicket" name="minTicketsPerBuyer" id="minTicket" defaultValue={0} />
                                          </div>
                                          <div className="col-md-6">
                                            <input type="number" className="form-control maxTicket" name="maxTicketsPerBuyer" id="maxTicket" defaultValue={10} />
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <div className="small text-uppercase">minimum</div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="small text-uppercase">maximum</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row ticket-table">
                                    <div className="col-md-6">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>Table</label>
                                            <div className="checkbox-nice">
                                              <input type="checkbox" className="hideTable" name="hidden" id="table-15" />
                                              <label htmlFor="table-15">Table</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 number-of-ticket-per-table">
                                      <div className="form-group">
                                        <label>Number of tickets per table</label>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <input type="number" className="form-control maxTable numberOfTicketPerTable" name="numberOfTicketPerTable" defaultValue={0} />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <a href="javascript:void(0)" className="btn btn-danger btn-block delete-type" data-tickets-purchased="false" data-ticketing-id={15}><i className="fa fa-trash" /> Delete This Ticket Type</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <input type="hidden" name defaultValue />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-info saveSetting" type="submit" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">&nbsp;
                    &nbsp; &nbsp; Save Settings &nbsp; &nbsp; &nbsp;</button>
                </form>
              </div>
            </div>
          </div>
        </div>  : "" }
        <PopupModel
          id="popupDialog"
          showModal={this.state.showDialog && this.state.dialogMessage && this.state.dialogMessage.length > 0}
          headerText={<p>{this.state.dialogTitle}</p>}
          onCloseFunc={this.toggleDialog}
          modelFooter = {<div>
            <button className="btn btn-green" onClick={()=>{this.toggleDialog()}}>Close</button></div>}
        >
          <div>{this.state.dialogMessage}</div>
        </PopupModel>
      </div>
    );
  }
}
const mapDispatchToProps = {
	doGetTicketTypes: (method, data) => doGetTicketTypes(method, data),
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(CreateTicket));
