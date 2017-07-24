import React from 'react';
import PropTypes   from 'prop-types';
import Link from '../Link';
import history from '../../history';
import NumericInput from 'react-numeric-input';
import PopupModel from '../PopupModal';
import cx from 'classnames';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import moment from 'moment';
import {connect} from 'react-redux';
import {
	doResendOrderMailByOrderIdByTicketId,
	doResendOrderMailByOrderId,
} from '../../routes/admin/ticket/action';
let total = 0;
class TicketRow extends React.Component { // eslint-disable-line
	static propTypes = {
		className: PropTypes.string,
		headerText: PropTypes.string,
		descText: PropTypes.string,
		linkTitle: PropTypes.string,
		linkText: PropTypes.string,
		linkTarget: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			"dialogMessage": "",
			"dialogTitle": "",
			"showDialog": false,
			"ticket": {}
		};
		this.toggleTicketSettings = this.toggleTicketSettings.bind(this);
		this.toggleDialog = this.toggleDialog.bind(this);
		this.throwError = this.throwError.bind(this);
		this.onError = this.onError.bind(this);
		this.isTable = this.isTable.bind(this);
		this.isHideTicketType = this.isHideTicketType.bind(this);
	}

	toggleTicketSettings = (event) => {
		// e.target.
		/*let divs = document.querySelectorAll('.order-panel-header .dropdown-toggle');
		[].forEach.call(divs, function (div) {
			// do whatever
			div.classList.remove('open');
		});*/
		if(event.target.parentElement.closest(".ticket-row.open")){
			event.target.parentElement.closest(".ticket-row").classList.remove('open');
		}
		else{
			event.target.parentElement.closest(".ticket-row").classList.add('open');
		}
	};

	toggleDialog = () => {
		this.setState({
			showDialog: !this.state.showDialog
		})
	};
	throwError = (title, message) => {
		this.setState({
			dialogTitle: title || "Not found",
			dialogMessage: message || "Your order details not found. Please try again later."
		});
		setTimeout(() => {
			this.toggleDialog();
		}, 10);
	};
	onError = (error) => {
		let resendMailError = error && error.response && error.response.data;
		this.throwError("Error", resendMailError && resendMailError.errorMessage);
	};
	isTable = ()=>{

	};

	isHideTicketType = ()=>{

	};
	componentDidMount(){
		console.log(this.props.ticket);
		let self = this;
		setTimeout(()=>{
			self.setState({
				ticket : this.props.ticket
			})
		}, 100)
	}

	render() {
		return (
			<div className="ticket-row">
				{this.state.ticket ? 	<div className="flex-row">
					<div className="flex-col dots-sign-column">
						<i className="fa fa-ellipsis-v edit-item fa-lg"/><i
						className="fa fa-ellipsis-v edit-item fa-lg"/>
					</div>
					<div className="flex-col ticket-name-column">
						<input type="text" className="form-control ticket-name" name="ticketTypeName"
									 maxLength={255} defaultValue={this.state.ticket.name}/>
					</div>
					<div className="flex-col ticket-quantity-column">
						<NumericInput name="numberOfTickets" className="form-control ticket-quantity" step={1} precision={0}  min={0} value={this.state.ticket.numberOfTicket}/>

					</div>
					<div className="flex-col ticket-price-column">
						<div className="input-group">
							<span className="input-group-addon">$</span>
							<NumericInput name="price" className="form-control ticket-price" step={1} precision={0}  min={0} value={this.state.ticket.price}/>
						</div>
						<div className="tiny">
							Buyer price: <br /><span className="blue buyer-price">$<span
							className="price-fees">0.00</span></span>
						</div>
					</div>
					<div className="flex-col ticket-actions-column">
						<ul className="list-inline">
							<li onClick={this.toggleTicketSettings}><i className="fa fa-2x fa-cog edit-item"/></li>
						</ul>
					</div>
				</div> : "" }
				<div className="data-wrap">
					<div className="data">
						<div className="ticket-data">
							Settings for <span className="ticket-type"/>
							<hr />
							<div className="row">
								<div className="col-md-8">
									<div className="form-group">
										<label>Ticket Description</label>
										<textarea maxLength={255} rows={3} className="form-control description"
															placeholder="Item description" name="ticketTypeDescription"
															defaultValue={""}/>
										<div className="checkbox-nice">
											<input className="showDescription" type="checkbox" name="enableTicketDescription"
														 id="enableTicketDescription--1" onChange={()=>{  }}/>
											<label htmlFor="enableTicketDescription--1">Show ticket description on event
												page</label>
										</div>
									</div>
									<div className="form-group">
										<label>Fees</label>
										<select className="form-control pass-to-buyer" defaultValue={this.state.ticket.passfeetobuyer}>
											<option value={true}>Pass fees on to ticket buyer</option>
											<option value={false}>Absorb fees</option>
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
														<input type="text" className="form-control datepicker startDate white-bg"
																	 name="startDate" defaultValue="07/24/2017" readOnly="readonly"/>
													</div>
													<div className="col-md-4">
														<input type="text" className="form-control timepicker startTime white-bg"
																	 name="startTime" defaultValue="03:01" readOnly="readonly"/>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group mrg-b-0">
												<label>Ticket sales ends</label>
												<div className="row">
													<div className="col-md-8">
														<input type="text" className="form-control datepicker endDate white-bg"
																	 name="endDate" defaultValue="06/23/2017" readOnly="readonly"/>
													</div>
													<div className="col-md-4">
														<input type="text" className="form-control timepicker endTime white-bg"
																	 name="endTime" defaultValue="15:38" readOnly="readonly"/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="row ticket-size-div">
										<div className="col-md-6">
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label>Ticket Visibility</label>
														<div className="checkbox-nice">
															<input type="checkbox" name="table" className="hideType"
																		 id="hideType--1"/>
															<label htmlFor="hideType--1">&nbsp;Hide this ticket type.</label>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="max-ticket-label">&nbsp;Tickets allowed per order</label>
												<div className="row">
													<div className="col-md-6">
														<NumericInput name="minTicketsPerBuyer" className="form-control minTicket" step={1} precision={0}  min={0} value={this.state.ticket.minTicketsPerBuyer}/>

													</div>
													<div className="col-md-6">
														<NumericInput name="maxTicketsPerBuyer" className="form-control maxTicket" step={1} precision={0}  min={0} value={this.state.ticket.maxTicketsPerBuyer}/>

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
															<input type="checkbox" name="table" className="hideTable"
																		 id="hideTable--1"/>
															<label htmlFor="hideTable--1">Table</label>
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
														<input type="number"
																	 className="form-control maxTable numberOfTicketPerTable"
																	 name="numberOfTicketPerTable" defaultValue={0}/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<a href="javascript:void(0)" className="btn btn-danger btn-block delete-type"><i
												className="fa fa-trash"/> Delete This Ticket Type</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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
const mapDispatchToProps = {};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)((TicketRow));