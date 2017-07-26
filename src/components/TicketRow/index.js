import React from 'react';
import PropTypes   from 'prop-types';
import Link from '../Link';
import history from '../../history';
import NumericInput from 'react-numeric-input';
import cx from 'classnames';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';
import {connect} from 'react-redux';
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
			"ticket": undefined,
			"startDate": moment(),
			"endDate": moment().add(1, 'days'),
			"eventEndDate": undefined,
			"eventStartDate": undefined,
			"isDateError": false,

		};
		this.toggleTicketSettings = this.toggleTicketSettings.bind(this);
		this.isTable = this.isTable.bind(this);
		this.isEnableTicketDescription = this.isEnableTicketDescription.bind(this);
		this.isHideTicketType = this.isHideTicketType.bind(this);
		this.setPassToBuyer = this.setPassToBuyer.bind(this);
		this.updateTicketState = this.updateTicketState.bind(this);
		this.setNumberOfTicket = this.setNumberOfTicket.bind(this);
		this.setMaxTicketsPerBuyer = this.setMaxTicketsPerBuyer.bind(this);
		this.setMinTicketsPerBuyer = this.setMinTicketsPerBuyer.bind(this);
		this.deleteTicketTypes = this.deleteTicketTypes.bind(this);
		this.changeTicketName = this.changeTicketName.bind(this);
	}

	updateTicketState = (data, key) => {
		setTimeout(() => {
			this.props.updateTicketState(data, key);
		}, 100)
	};
	deleteTicketTypes = () => {
		setTimeout(() => {
			this.props.deleteTicketTypes(this.props.index);
		}, 100)
	};
	toggleTicketSettings = (event) => {
		// e.target.
		/*let divs = document.querySelectorAll('.order-panel-header .dropdown-toggle');
		 [].forEach.call(divs, function (div) {
		 // do whatever
		 div.classList.remove('open');
		 });*/
		if (event.target.parentElement.closest(".ticket-row.open")) {
			event.target.parentElement.closest(".ticket-row").classList.remove('open');
		}
		else {
			event.target.parentElement.closest(".ticket-row").classList.add('open');
		}
	};
	changeTicketName = (event) => {
		if (event && event.target) {
			if (event.target.value) {
				event.target.value = event.target.value.trim();
			}
			let ticket = this.state.ticket;
			ticket.name = event.target.value;
			this.setState({
				ticket: ticket
			});
			this.updateTicketState(ticket, this.props.index);

		}
	};
	isEnableTicketDescription = (event) => {
		if (event && event.target) {
			let ticket = this.state.ticket;
			ticket.isTenableTicketDescriptionable = event.target.checked;
			this.setState({
				ticket: ticket
			});
			this.updateTicketState(ticket, this.props.index);

		}
	};
	isTable = (event) => {
		if (event && event.target) {
			let ticket = this.state.ticket;
			ticket.isTable = event.target.checked;
			this.setState({
				ticket: ticket
			});
			this.updateTicketState(ticket, this.props.index);
		}
	};
	isHideTicketType = (event) => {
		if (event && event.target) {
			let ticket = this.state.ticket;
			ticket.hidden = event.target.checked;
			this.setState({
				ticket: ticket
			});
			this.updateTicketState(ticket, this.props.index);
		}
	};
	setPassToBuyer = (event) => {
		if (event && event.target) {
			let ticket = this.state.ticket;
			ticket.passfeetobuyer = event.target.value;
			this.setState({
				ticket: ticket
			});
			this.updateTicketState(ticket, this.props.index);
		}
	};
	handleDateRangeApply = (event, picker) => {
		let ticket = this.state.ticket;
		ticket.startDate = picker.startDate;
		ticket.endDate = picker.endDate;
		console.log("picker", picker);
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate,
			ticket: ticket
		});
		this.updateTicketState(ticket, this.props.index);
	};
	updateBidPrice = (value) => {
		let ticket = this.state.ticket;
		ticket.price = value;
		this.setState({
			ticket: ticket
		});
		this.updateTicketState(ticket, this.props.index);
	};
	setNumberOfTicket = (value) => {
		let ticket = this.state.ticket;
		ticket.numberOfTicket = value;
		this.setState({
			ticket: ticket
		});
		this.updateTicketState(ticket, this.props.index);
	};
	setMaxTicketsPerBuyer = (value) => {
		let ticket = this.state.ticket;
		ticket.maxTickerPerBuyer = value;
		this.setState({
			ticket: ticket
		});
		setTimeout(() => {
			this.updateTicketState(ticket, this.props.index);
		}, 100)
	};
	setMinTicketsPerBuyer = (value) => {
		let ticket = this.state.ticket;
		ticket.minTickerPerBuyer = value;
		this.setState({
			ticket: ticket
		});
		setTimeout(() => {
			this.updateTicketState(ticket, this.props.index);
		}, 100)
	};

	componentDidMount() {
		let self = this;
		setTimeout(() => {
			self.setState({
				ticket: this.props.ticket,
				eventEndDate: moment(this.props.eventEndDate),
				eventStartDate: moment(this.props.eventStartDate),
				endDate: this.props.ticket && this.props.ticket.endDate ? moment(this.props.ticket.endDate) : moment().add(1, 'days'),
				startDate: this.props.ticket && this.props.ticket.startDate ? moment(this.props.ticket.startDate) : moment(),
			})
		}, 100);
	}

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
			<div className="ticket-row">
				{this.state.ticket ? <div className="flex-row">
					<div className="flex-col dots-sign-column">
						<i className="fa fa-ellipsis-v edit-item fa-lg"/><i
						className="fa fa-ellipsis-v edit-item fa-lg"/>
					</div>
					<div className="flex-col ticket-name-column">
						<input type="text" className="form-control ticket-name" name="ticketTypeName"
									 maxLength={255} defaultValue={this.state.ticket.name}/>
					</div>
					<div className="flex-col ticket-quantity-column">
						<NumericInput name="numberOfTickets" className="form-control ticket-quantity" step={1} precision={0} min={0}
													value={this.state.ticket.numberOfTicket} onChange={this.setNumberOfTicket}/>

					</div>
					<div className="flex-col ticket-price-column">
						<div className="input-group">
							<span className="input-group-addon">$</span>
							<NumericInput name="price" className="form-control ticket-price" step={1} precision={0} min={0}
														value={this.state.ticket.price} onChange={this.updateBidPrice}/>
						</div>
						<div className="tiny">
							Buyer price: <br /><span className="blue buyer-price">$<span
							className="price-fees">{this.state.ticket.price}</span></span>
						</div>
					</div>
					<div className="flex-col ticket-actions-column">
						<ul className="list-inline">
							<li onClick={this.toggleTicketSettings}><i className="fa fa-2x fa-cog edit-item"/></li>
						</ul>
					</div>
				</div> : "" }
				{ this.state.ticket ? <div className="data-wrap">
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
															defaultValue={this.state.ticket.ticketTypeDescription}/>
										<div className="checkbox-nice">
											<input className="showDescription" type="checkbox" name="enableTicketDescription"
														 defaultChecked={this.state.ticket.enableTicketDescription}
														 id={"enableTicketDescription--" + this.props.index}
														 onChange={this.isEnableTicketDescription}/>
											<label htmlFor={"enableTicketDescription--" + this.props.index}>Show ticket description on event
												page</label>
										</div>
									</div>
									<div className="form-group">
										<label>Fees</label>
										<select className="form-control pass-to-buyer" defaultValue={this.state.ticket.passfeetobuyer}
														onChange={this.setPassToBuyer}>
											<option value={true}>Pass fees on to ticket buyer</option>
											<option value={false}>Absorb fees</option>
										</select>
										<div className="small">
											Buyer Total: $<span className="buyer-price-fees">{this.state.ticket.price}</span>
										</div>
									</div>
									<div className="row mrg-b-lg">
										<div className="col-md-12">
											<div className="form-group mrg-b-0">
												<label>Ticket sales start and end duration</label>
												<div className="row">
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
									</div>
									<div className="row ticket-size-div">
										<div className="col-md-6">
											<div className="row">
												<div className="col-md-12">
													<div className="form-group">
														<label>Ticket Visibility</label>
														<div className="checkbox-nice">
															<input type="checkbox" name="table" className="hideType" onClick={this.isHideTicketType}
																		 id={"hideType--" + this.props.index}/>
															<label htmlFor={"hideType--" + this.props.index}>&nbsp;Hide this ticket type.</label>
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
														<NumericInput name="minTicketsPerBuyer" className="form-control minTicket" step={1}
																					precision={0} min={0} value={this.state.ticket.minTickerPerBuyer}
																					onChange={this.setMinTicketsPerBuyer}/>

													</div>
													<div className="col-md-6">
														<NumericInput name="maxTicketsPerBuyer" className="form-control maxTicket" step={1}
																					precision={0} min={this.state.ticket.minTickerPerBuyer}
																					value={this.state.ticket.maxTickerPerBuyer}
																					onChange={this.setMaxTicketsPerBuyer}/>

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
																		 id={"hideTable--" + this.props.index} onChange={this.isTable}/>
															<label htmlFor={"hideTable--" + this.props.index}>Table</label>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div
											className={cx("col-md-6 number-of-ticket-per-table", !(this.state.ticket && this.state.ticket.isTable) && "hide")}>
											<div className="form-group">
												<label>Number of tickets per table</label>
												<div className="row">
													<div className="col-md-6">
														<NumericInput name="numberOfTicketPerTable" className="form-control maxTable" step={1}
																					precision={0} min={0}
																					defaultValue={this.state.ticket.numberOfTicketPerTable}/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<a onClick={this.deleteTicketTypes} className="btn btn-danger btn-block delete-type"><i
												className="fa fa-trash"/> Delete This Ticket Type</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> : "" }
			</div>
		);
	}
}
const mapDispatchToProps = {};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)((TicketRow));