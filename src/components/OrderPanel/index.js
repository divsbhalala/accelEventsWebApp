import React from 'react';
import PropTypes   from 'prop-types';
import Link from '../Link';
import history from '../../history';
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
		this.state = {
			"dialogMessage" : "",
			"dialogTitle" : "",
			"showDialog" : false
		};
		this.openDropDown = this.openDropDown.bind(this);
		this.toggleDialog = this.toggleDialog.bind(this);
		this.throwError = this.throwError.bind(this);
		this.onError = this.onError.bind(this);
		this.doResendOrderMailByOrderId = this.doResendOrderMailByOrderId.bind(this);
		this.doResendOrderMailByOrderIdByTicketId = this.doResendOrderMailByOrderIdByTicketId.bind(this);
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

	doResendOrderMailByOrderId = (orderId)=>{
		if(!orderId){
			this.props.doResendOrderMailByOrderId(orderId).then(resp=>{
				this.throwError("Resend Successful", "Email has been successfully sent.");
			}).catch(error=>{
				this.onError(error);
			})
		}
		else {
			this.throwError("Not found", "Your order details not found. Please try again later.");
		}
	};

	doResendOrderMailByOrderIdByTicketId = (orderId, ticketId)=>{
		if(!orderId || !ticketId){
			if(orderId){
				this.props.doResendOrderMailByOrderId(orderId, ticketId).then(resp=>{
					this.throwError("Resend Successful", "Email has been successfully sent.");
				}).catch(error=>{
					this.onError(error);
				})
			}
			else {
				this.throwError("Not found", "Your order details not found. Please try again later.");
			}
		}
		else {
			this.throwError("Not found", "Your order details not found. Please try again later.");
		}
	};

	render() {
		return (
			<div className="order-panel">
				<div className="order-panel-header">
					<div className="order-number">
						Order #{this.props.order.id} - {this.props.currencySymbol}{this.props.order.totalAmount}<br />
						<strong>{this.props.order.status}</strong>
					</div>
					{this.props.order.status && this.props.order.status.toLowerCase() !== "refunded" ?
					<div className="order-actions">
						<DropdownButton bsSize={"sm"} title={"Actions"}  id={`dropdown-basic`}>
							<MenuItem eventKey="1"onClick={()=>{history.push("/admin/event-ticketing-orders/get-refund/" + this.props.order.id)}} >Refund</MenuItem>
							<MenuItem eventKey="2" className="resend-order-email" onClick={()=>{ this.doResendOrderMailByOrderIdByTicketId(this.props.order.id)}}>Resend Email</MenuItem>
						</DropdownButton>
					</div> : "" }
				</div>
				<div className="order-panel-body">
					{this.props.order.purchaser ? <p> Purchased by {this.props.order.purchaser.firstName}&nbsp;{this.props.order.purchaser.lastName}  ({this.props.order.purchaser.email}) on {moment().format('MMM Do YYYY [at] hh:mm A')} {this.props.order.purchaser.timezoneId}</p>  : ""}
					{ this.props.order.orderType && this.props.order.orderType === 'CARD' && this.props.order.lastFour && this.props.order.cardType ? <div className="small"> {this.props.order.cardType} <span className="text-uppercase">Visa</span> - XXXX XXXX
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
								<td>{this.props.currencySymbol}{item.paidAmount} {<p className="hide">{ total += item.paidAmount}</p>}</td>
								<td width="1px" className="text-center">
									{this.props.order.status && this.props.order.status.toLowerCase() === "refunded" ?
										this.props.order.status : 	<DropdownButton bsSize={"sm"} title={"Actions"}  id={`dropdown-basic`}>
											<MenuItem eventKey="1" onClick={()=>{history.push("/admin/event-ticketing-orders/get-refund/" + this.props.order.id + "/" + item.eventTicketingId )}}>Refund</MenuItem>
											<MenuItem eventKey="2" className="resend-attendee-email"  onClick={()=>{ this.doResendOrderMailByOrderIdByTicketId(this.props.order.id, item.id)}}
																data-attendeeid={item.id}>Resend Email</MenuItem>
											<MenuItem eventKey="1" onClick={()=>{history.push("/admin/event-ticketing-orders/edit-holder-data/" + item.eventTicketingId)}}>
												Edit
											</MenuItem>
										</DropdownButton>

									}

								</td>
							</tr>)
						}
						<tr>
							<td colSpan={3} className="text-right">Total</td>
							<td>{this.props.currencySymbol}{total} {<p className="hide">{ total  = 0}</p>}</td>
							<td />
						</tr>
						</tbody>
					</table>
				</div>
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
	doResendOrderMailByOrderId: (orderId) => doResendOrderMailByOrderId(orderId),
	doResendOrderMailByOrderIdByTicketId: (orderId, ticketId) => doResendOrderMailByOrderIdByTicketId(orderId, ticketId),
};

const mapStateToProps = (state) => ({
	currencySymbol : (state.host && state.host.currencySymbol) || "$"
});
export default connect(mapStateToProps, mapDispatchToProps)((OrderPenal));