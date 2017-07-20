import React from 'react';
import   PropTypes   from 'prop-types';
import Link from '../Link';
import cx from 'classnames';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import moment from 'moment';
import {connect} from 'react-redux';
let total = 0;
class OrderPenal extends React.Component { // eslint-disable-line
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
		this.openDropDown = this.openDropDown.bind(this);
	}
	openDropDown = (event)=>{
			// e.target.
		let divs = document.querySelectorAll('.order-panel-header .dropdown-toggle');
		[].forEach.call(divs, function(div) {
			// do whatever
			div.classList.remove('open');
		});
		event.target.parentElement.classList.add('open');
	};
	render() {
		return (
			<div className="order-panel">
				<div className="order-panel-header">
					<div className="order-number">
						Order #{this.props.order.id} - ${this.props.order.totalAmount}<br />
						<strong>{this.props.order.status}</strong>
					</div>
					<div className="order-actions">
						<DropdownButton bsSize={"sm"} title={"Actions"}  id={`dropdown-basic`}>
							<MenuItem eventKey="1"><Link to={"/admin/event-ticketing-orders/get-refund/" + this.props.order.id }>Refund</Link></MenuItem>
							<MenuItem eventKey="2" className="resend-order-email" data-orderid={this.props.order.id}>Resend Email</MenuItem>
						</DropdownButton>
					</div>
				</div>
				<div className="order-panel-body">
					{this.props.order.purchaser ? <p> Purchased by {this.props.order.purchaser.firstName}&nbsp;{this.props.order.purchaser.lastName}  ({this.props.order.purchaser.email}) on {moment().format('MMM Do YYYY [at] hh:mm A')} {this.props.order.purchaser.timezoneId}</p>  : ""}
					{ this.props.order.orderType && this.props.order.orderType == 'CARD' && this.props.order.lastFour && this.props.order.cardType ? <div className="small"> {this.props.order.cardType} <span className="text-uppercase">Visa</span> - XXXX XXXX
						XXXX
						{this.props.order.lastFour}
					</div> : "" }
					<table className="table order-ticket-details">
						<thead>
						<tr>
							<th>Attendee</th>
							<th>QTY</th>
							<th>Tickets</th>
							<th>paid</th>
							<th width="1px" className="text-center">Actions</th>
						</tr>
						</thead>
						<tbody>
						{
							this.props.order.attendee.map((item, key)=>	<tr key={key}>

								<td>{item.firstName} {item.lastName}</td>
								<td>{item.qty}</td>
								<td>{item.ticketType}</td>
								<td>{this.props.order.currency || "$"}{item.paidAmount} {<p className="hide">{ total += item.paidAmount}</p>}</td>
								<td width="1px" className="text-center">
									<DropdownButton bsSize={"sm"} title={"Actions"}  id={`dropdown-basic`}>
										<MenuItem eventKey="1"><Link to={"/admin/event-ticketing-orders/get-refund/" + this.props.order.id + "/" + item.eventTicketingId}>Refund</Link></MenuItem>
										<MenuItem eventKey="2" className="resend-attendee-email" data-orderid={this.props.order.id}
															data-attendeeid={item.id}>Resend Email</MenuItem>
										<MenuItem eventKey="1">
											<Link to={"/admin/event-ticketing-orders/edit-holder-data/" + item.eventTicketingId}>Edit</Link>
										</MenuItem>
									</DropdownButton>
								</td>
							</tr>)
						}
						<tr>
							<td colSpan={3} className="text-right">Total</td>
							<td>${total} {<p className="hide">{ total  = 0}</p>}</td>
							<td />
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = {};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)((OrderPenal));