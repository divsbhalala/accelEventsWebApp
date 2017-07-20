
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import Link from '../../../../components/Link';
import {doGetTicketingSettings,
	doGetRefundByOrderId
} from '../action';
import {connect} from 'react-redux';

class TicketRefund extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
	constructor(props) {
		super(props);

		this.state = {
			orderData: {}
		};
		this.validateForm = this.validateForm.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
	}

	validateEmail = (email) => {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	validateForm = (field, event)=>{
		let value = event.target.value;
		event.target.parentElement.classList.add('has-feedback');
		if (value && field === 'email') {
			// object[key][field.name]['error'] = !this.validateEmail(value);
			if (this.validateEmail(value)) {
				event.target.parentElement.classList.remove('has-error');
				event.target.parentElement.classList.add('has-success');
			}
			else {
				event.target.parentElement.classList.add('has-error');
				event.target.parentElement.classList.remove('has-success');
			}
		}
		else if (value && event.target.parentElement) {
			event.target.parentElement.classList.add('has-success');
			event.target.parentElement.classList.remove('has-error');
		}
		else {
			event.target.parentElement.classList.remove('has-success');
			event.target.parentElement.classList.add('has-error');
		}
	};

	componentWillMount(){
		this.props.doGetRefundByOrderId('get', this.props.ticketId).then(resp=>{
			console.log("item", resp);
			this.setState({
				orderData: resp && resp.data
			});
			console.log(resp && resp.data)
		}).catch(error=>{
			console.log("error", error);
		})
	}
  render() {
    return (
			<div id="content-wrapper">
				<div className="row" style={{opacity: 1}}>
					<div className="col-lg-12">
						<div className="row">
							<div className="col-lg-12">
								<div id className="clearfix">
									<div className>
										<h1>Issue Refund</h1>
									</div>
								</div>
							</div>
						</div>
						{ this.state.orderData &&  <div className="row" >
							<div className="col-lg-12">
								<div className="main-box no-header">
									<div className="main-box-body clearfix">
										<p>When you issue a refund, Accelevents refunds the fees, including partial fees for partial payment refunds</p>
										<div className="refund-user-info">
											<table className="table table-slim">
												<tbody>
												<tr>
													<td>Order #</td>
													<td className="text-right">{this.props.ticketId}</td>
												</tr>
												<tr>
													<td>Purchase By</td>
													<td className="text-right">{this.state.orderData.purchaser && this.state.orderData.purchaser.firstName}</td>
												</tr>
												<tr>
													<td />
													<td className="text-right"><a href={this.state.orderData.purchaser && this.state.orderData.purchaser.email}>{this.state.orderData.purchaser && this.state.orderData.purchaser.email}</a></td>
												</tr>
												<tr>
													<td>Purchase Date</td>
													<td className="text-right">{ moment(this.state.orderData.purchaseDate).format('llll')}</td>
												</tr>
												<tr>
													<td>Original Payment</td>
													<td className="text-right">${this.state.orderData.amount}</td>
												</tr>
												<tr>
													<td>Status</td>
													<td className="text-right">{this.state.orderData.status}</td>
												</tr>
												</tbody>
											</table>
										</div>
										<p>To issue a refund, enter the refund amount for each attendee. If you want to issue a partial refund without removing an
											attendee from your event, leave the refund quantity value 0 and enter a refund amount.</p>
										<form method="POST" className="form">
											<table className="table order-ticket-details">
												<thead>
												<tr>
													<th>ATTENDEE</th>
													<th>TICKET</th>
													<th>QTY</th>
													<th>PAID</th>
													<th>REFUND QTY</th>
													<th>REFUND AMOUNT</th>
												</tr>
												</thead>
												<tbody>
												{ this.state.orderData.attendee ? this.state.orderData.attendee.map( (item, key)=><tr className="refund-data" key={key}>
													<td>{item.firstName}</td>
													<td>{item.ticketType }<input type="hidden" className="event-ticket-id" name="eventticketingid" defaultValue={166} /></td>
													<td>{item.qty}</td>
													<td>${item.paid}</td>
													<td>
														<select className="form-control ticket-qty" style={{maxWidth: 80}}>
															<option value={0} selected="selected">0</option>
															<option value={1} selected="selected">1</option>
														</select>
													</td>
													{/*  eventticketingid */}
													<td>
														<div className="input-group">
															<span className="input-group-addon">$</span>
															<input type="number" max={this.state.orderData.refundedAmount} className="form-control ticket-refund-amount" data-paid-amount="105.36" data-ticket-price={this.state.orderData.ticketPrice} name="refundamount" defaultValue={this.state.orderData.refundedAmount} data-allow-decimals="true" min={0.00} step="0.01" />
														</div>
													</td>
												</tr>) : ""}
												</tbody>
											</table>
											<input type="hidden" name defaultValue />
											<button className="btn btn-info saveSetting" type="submit" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Refund">&nbsp;
												&nbsp; &nbsp; Refund &nbsp; &nbsp; &nbsp;</button>
											<a className="btn btn-info back-to-order" href="/admin/event-ticketing-orders">&nbsp; &nbsp; &nbsp; Back &nbsp; &nbsp; &nbsp;</a> <span className="amount-to-display" style={{color: 'red'}} />
										</form>
									</div>
								</div>
							</div>
						</div> }
					</div>
				</div>
			</div>
		);
  }
}
const mapDispatchToProps = {
	doGetRefundByOrderId: (method, orderId, data) => doGetRefundByOrderId(method, orderId, data),
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(TicketRefund);