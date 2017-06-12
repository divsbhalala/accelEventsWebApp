/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Checkout.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import history from './../../history';
import Moment from 'react-moment';
import moment from 'moment';

import EventAside from './../../components/EventAside/EventAside';
import PopupModel from './../../components/PopupModal';
import Timer from './../../components/Timer';

import {
	doGetEventData,
	doGetOrderById,
	doGetSettings,
} from './../event/action/index';
class Checkout extends React.Component {
	static propTypes = {
		title: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			cardHolder: false,
			settings: {},
			isValidData: false,
			firstName: false,
			firstNameFeedBack: false,
			firstNameFeedBackMsg: null,
			lastName: false,
			lastNameFeedBack: false,
			lastNameFeedBackMsg: null,
			email: false,
			emailFeedBack: false,
			emailFeedBackMsg: null,
			password: false,
			passwordFeedBack: false,
			passwordFeedBackMsg: null,
			cardHolderName: false,
			cardHolderNameFeedBack: false,
			cardHolderNameFeedBackMsg: null,
			cardExpMonth: false,
			cardExpYear: false,
			cardExpFeedBackMsg: null,
			cardCVV: false,
			cardCVVFeedBack: false,
			cardCVVFeedBackMsg: null,
			cardNumber: false,
			cardNumberFeedBack: false,
			cardNumberFeedBackMsg: null,
			addressLine1: false,
			addressLine2: false,
			state: false,
			zipCode: false,
			zipCodeFeedBack: false,
		};

	}
	componentWillMount() {
		this.props.doGetEventData(this.props.params && this.props.params.params);
		//this.props.doGetEventTicketSetting(this.props.params && this.props.params.params);
		this.props.doGetSettings(this.props.params && this.props.params.params, 'ticketing').then(resp => {
			this.setState({
				settings: resp && resp.data
			});
		}).catch(error => {
			//history.push('/404');
		});

		this.props.doGetOrderById(this.props.params && this.props.params.params, this.props.params && this.props.params.orderId).then(resp => {
			console.log('res', resp)
		}).catch(error => {
			//history.push('/404');
		});
	}
	emailValidateHandler = (e) => {

		this.setState({
			emailFeedBack: true
		});
		if (this.email.value == ' ') {
			this.email.value = '';
		}

		if (!this.email.value) {
			this.setState({
				email: false
			});
		}
		else {
			this.setState({
				email: true
			});
		}
		this.setState({isValidData: !!(this.email.value && this.password.value)});

	};
	firstNameValidateHandler = (e) => {

		this.setState({
			firstNameFeedBack: true
		});
		if (this.firstName.value == ' ') {
			this.firstName.value = '';
		}
		if (!this.firstName.value) {
			this.setState({
				firstName: false
			});
		}
		else {
			this.setState({
				firstName: true
			});
		}
		this.setState({isValidData: !!(this.firstName.value && this.password.value)});

	};
	lastNameValidateHandler = (e) => {

		this.setState({
			lastNameFeedBack: true
		});
		if(this.lastName.value ==' '){
			this.lastName.value='';
		}
		if (!this.lastName.value) {
			this.setState({
				lastName: false
			});
		}
		else {
			this.setState({
				lastName: true
			});
		}
		this.setState({isValidData: !!(this.firstName.value && this.lastName.value && this.password.value)});

	};
	cardHolderNameValidateHandler = (e) => {

		this.setState({
			cardHolderNameFeedBack: true
		});
		if (this.cardHolderName.value == ' ') {
			this.cardHolderName.value = '';
		}

		if (!this.cardHolderName.value) {
			this.setState({
				cardHolderName: false,
				cardHolderNameFeedBackMsg: "The card holder name is required and can't be empty"
			});
		}
		else  if(this.cardHolderName.value && (this.cardHolderName.value.length <= 6 || this.cardHolderName.value.length > 70)){
			this.setState({
				cardHolderName: false,
				cardHolderNameFeedBackMsg: "TThe card holder name must be more than 6 and less than 70 characters long"
			});
		}
		else {
			this.setState({
				cardHolderName: true,
				cardHolderNameFeedBackMsg: null
			});
		}
	};
	cardNumberValidateHandler = (e) => {

		this.setState({
			cardNumberFeedBack: true
		});

		if (this.cardNumber.value == ' ') {
			this.cardNumber.value = '';
		}

		if (!this.cardNumber.value) {
			this.setState({
				cardNumber: false,
				cardNumberFeedBackMsg:"The credit card number is required and can't be empty",
			});
		}
		else if(this.cardNumber.value && this.cardNumber.value.length !=16){
			this.setState({
				cardNumber: false,
				cardNumberFeedBackMsg:"Invalid credit card number",
			});
		}
		else {
			this.setState({
				cardNumber: true,
				cardNumberFeedBackMsg:null
			});
		}
		this.setState({isValidData: !!(this.cardNumber.value && this.cardHolderName.value && this.password.value)});

	};
	cardCVVValidateHandler = (e) => {

		this.setState({
			cardCVVFeedBack: true
		});

		if (this.cardCVV.value == ' ') {
			this.cardCVV.value = '';
		}

		if (!this.cardCVV.value) {
			this.setState({
				cardCVV: false,
				cardCVVFeedBackMsg:"The CVV is required and can't be empty",
			});
		}
		else if(this.cardCVV.value && !(this.cardCVV.value.length >=3 && this.cardCVV.value.length <=4)){
			this.setState({
				cardCVV: false,
				cardCVVFeedBackMsg:"The CVV must be more than 4 and less than 3 characters long",
			});
		}
		else {
			this.setState({
				cardCVV: true,
				cardCVVFeedBackMsg:null
			});
		}
		this.setState({isValidData: !!(this.cardCVV.value && this.cardHolderName.value && this.password.value)});

	};
	cardExpMonthValidateHandler = (e) => {


		if (!this.cardExpMonth.value) {
			this.setState({
				cardExpMonth: false
			});
		}
		else {
			this.setState({
				cardExpMonth: true
			});
		}
		this.setState({isValidData: !!(this.cardExpMonth.value && this.cardHolderName.value && this.password.value)});

	};
	cardExpYearValidateHandler = (e) => {


		if (!this.cardExpYear.value) {
			this.setState({
				cardExpYear: false
			});
		}
		else {
			this.setState({
				cardExpYear: true
			});
		}
		this.setState({isValidData: !!(this.cardExpYear.value && this.cardHolderName.value && this.password.value)});

	};
	passwordValidateHandler = (e) => {

		this.setState({
			passwordFeedBack: true
		});

		if (!this.password.value) {

			this.setState({
				password: false
			});
		} else {
			this.setState({
				password: true
			});
		}
		this.setState({isValidData: !!(this.email.value && this.password.value)});

	};
	render() {
		let makeItem = function (i) {
			let item = [];
			for (let j = 0; j <= i; j++) {
				item.push(<option value={j} key={i + Math.random()}>{j}</option>)
			}
			return item;
		};
		return (
			<div className="row">
				<div className="col-lg-12">
					<div id="content-wrapper">
						<div className="row">
							<div className="col-lg-3 col-md-4 col-sm-4">
								<EventAside
									eventData={this.props.eventData}
									authenticated={this.props.authenticated}
									settings={this.state.settings}
									activeTab="The Event"
								/>
							</div>
							<div className="col-lg-9 col-md-8 col-sm-8 ">
								<div className="main-box clearfix">
									<Timer />
									<form className="validated fv-form fv-form-bootstrap" noValidate="novalidate">
										<div className="row">
											<div className="col-md-10 col-md-offset-1">
												<h3 className="type-name">second ticket type with longer name test</h3>
												<div className="project-box gray-box card">
													<div className="project-box-header gray-bg">
														<div className="name text-center">
															<a href="#">Order Summary</a>
														</div>
													</div>
													<div className="project-box-content">
														<div className>
															<table className="table table-hover" id="ticket-type-data">
																<thead>
																<tr>
																	<th><span>Ticket Type</span></th>
																	<th><span>Price</span></th>
																	<th><span>Fee</span></th>
																	<th className="text-center"><span>Quantity</span></th>
																	<th width={1}>
																		<nobr>Subtotal</nobr>
																	</th>
																</tr>
																</thead>
																<tbody className="ticket-table-body">
																<tr className="tickettype-amount">
																	<td className="text-left">
																		second ticket type with longer name test
																	</td>
																	<td className="text-left ticket-amount" data-ticket-id={43}>
																		$50.00
																	</td>
																	<td className="text-left ticket-amount-fee" data-ticket-id={43}>
																		$3.19
																	</td>
																	<td className="text-center">
																		<span className="qty">2</span>
																	</td>
																	<td width={1}>
																		$106.38
																	</td>
																</tr>
																<tr className="total-price-tr">
																	<td colSpan={4} className="text-right">
																		<strong>Order Total:</strong>
																	</td>
																	<td colSpan={1}>
																		$<span className="total-price">106.38</span>
																	</td>
																</tr>
																</tbody>
															</table>
														</div>
													</div>
												</div>
												<div className="project-box gray-box card">
													<div className="project-box-header gray-bg">
														<div className="name text-center">
															<a href="#">Ticket Information</a>
														</div>
													</div>
													<div className="project-box-content">
														<div className="red pull-right">* Required information</div>
														<h4 className="text-left"><strong>Ticket Buyer</strong></h4>
														<div className="form-group mrg-t-md">
															<div className="row">
																<div className="col-md-4 text-right">
																	<strong className="text-right"><strong>Name: </strong></strong>
																</div>
																<div className="col-md-6 text-left">
																	asdfasdfasdf User
																</div>
															</div>
														</div>
														<div className="form-group">
															<div className="row">
																<div className="col-md-4 text-right">
																	<strong className="text-right"><strong>Email: </strong></strong>
																</div>
																<div className="col-md-6 text-left">
																	admin@admin.com
																</div>
															</div>
														</div>
														<div className="buyerInformation">
															<div className="custom-attribute">
																<div className="form-group mrg-t-md">
																	<div className="row">
																		<div className="col-md-4 text-right">
																			<label className="text-right">First Name<span className="red">*</span></label>
																		</div>
																		<div
																			className={cx("col-md-6 text-left", this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}>
																			<div className="form-group ">
																				<input type="text" className="form-control" name="First Name"
																							 ref={ref => {
																								 this.firstName = ref;
																							 }}
																							 onKeyUp={this.firstNameValidateHandler}
																							 required="required"/>
																				{ this.state.firstNameFeedBack && this.state.firstName &&
																				<i
																					className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
																				{ this.state.firstNameFeedBack && !this.state.firstName &&
																				<i
																					className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
																				{ this.state.firstNameFeedBack && !this.state.firstName &&
																				<small className="help-block">The First Name is required.</small> }
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="custom-attribute">
																<div className="form-group mrg-t-md">
																	<div className="row">
																		<div className="col-md-4 text-right">
																			<label className="text-right">Last Name<span className="red">*</span></label>
																		</div>
																		<div
																			className={cx("col-md-6 text-left", this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}>
																			<div className="form-group">
																				<input type="text" className="form-control" name="Last Name"
																							 ref={ref => {
																								 this.lastName = ref;
																							 }}
																							 onKeyUp={this.lastNameValidateHandler}
																							 required="required"/>
																				{ this.state.lastNameFeedBack && this.state.lastName &&
																				<i
																					className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
																				{ this.state.lastNameFeedBack && !this.state.lastName &&
																				<i
																					className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
																				{ this.state.lastNameFeedBack && !this.state.lastName &&
																				<small className="help-block">The Last Name is required.</small>}
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="custom-attribute">
																<div className="form-group mrg-t-md">
																	<div className="row">
																		<div className="col-md-4 text-right">
																			<label className="text-right">Email<span className="red">*</span></label>
																		</div>
																		<div
																			className={cx("col-md-6 text-left", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
																			<div className="form-group">
																				<input type="email" className="form-control" name="Email"
																							 ref={ref => {
																								 this.email = ref;
																							 }}
																							 onKeyUp={this.emailValidateHandler}/>
																				{ this.state.emailFeedBack && this.state.email &&
																				<i
																					className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
																				{ this.state.emailFeedBack && !this.state.email &&
																				<i
																					className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
																				{ this.state.emailFeedBack && !this.state.email &&
																				<small className="help-block">The Email is required.</small> }
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="custom-attribute">
																<div className="form-group mrg-t-md has-feedback has-success">
																	<div className="row">
																		<div className="col-md-4 text-right">
																			<label className="text-right">Password<span className="red">*</span></label>
																		</div>
																		<div
																			className={cx("col-md-6 text-left", this.state.passwordFeedBack && 'has-feedback', this.state.passwordFeedBack && this.state.password && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
																			<input type="password" className="form-control" name="password"
																						 ref={ref => {
																							 this.password = ref;
																						 }}
																						 onKeyUp={this.passwordValidateHandler}
																						 required="required"/>
																			{ this.state.passwordFeedBack && this.state.password &&
																			<i
																				className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
																			{ this.state.passwordFeedBack && !this.state.password &&
																			<i
																				className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
																			{ this.state.passwordFeedBack && !this.state.password &&
																			<small className="help-block">This value is not valid</small> }
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<div className="buyerInformation">
														</div>
														<div className="buyerQuestion">
														</div>
														<div className="form-group mrg-t-md">
															<div className="row">
																<div className="col-md-4 text-right">
																	<label className="text-right"><strong>Discount Coupon: </strong></label>
																</div>
																<div className="col-md-4 text-left">
																	<input type="text" className="form-control" name="discountcoupon" id="discountcoupon"
																				 placeholder="Discount coupon"/>
																</div>
																<div className="col-md-2">
																	<span className="input-group-btn">
																		<button type="button" className="btn btn-primary" id="discoupon">Apply</button>
																	</span>
																</div>
															</div>
														</div>
														<input type="hidden" defaultValue="false" id="hasHolderAttributes"/>
														<div id="ccDetails" className>
															<h4 className="text-left"><strong>Payment <span className="small">(Your card info is not stored on Accelevents servers)</span></strong>
															</h4>
															<div className="text-left">
																<style
																	dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n"}}/>
																<div className="stripe-form">
																	<div className="stripe-card-info">
																		<div className="form-group">
																			<div className="row">
																				<div className="col-md-4 text-right">
																					<label className="control-label">Card Holder Name</label>
																				</div>
																				<div
																					className={cx("col-md-6 text-left", this.state.cardHolderNameFeedBack && 'has-feedback', this.state.cardHolderNameFeedBack && this.state.cardHolderName && 'has-success', this.state.cardHolderNameFeedBack && (!this.state.cardHolderName) && 'has-error')}>
																					<div className="input-group">
																						<div className="input-group-addon">
																							<i className="fa fa-user" aria-hidden="true"/>
																						</div>
																						<input type="text" className="form-control" id="cardname"
																									 placeholder="Name on the card"
																									 ref={ref => {
																										 this.cardHolderName = ref;
																									 }}
																									 onKeyUp={this.cardHolderNameValidateHandler}/>
																					</div>
																					{ this.state.cardHolderNameFeedBack && this.state.cardHolderName &&
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
																					{ this.state.cardHolderNameFeedBack && !this.state.cardHolderName &&
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
																					{ this.state.cardHolderNameFeedBack && !this.state.cardHolderName &&
																					<small className="help-block">{this.state.cardHolderNameFeedBackMsg || "The card holder name is required and can't be empty" }</small>}
																				</div>
																			</div>
																		</div>
																		<div className="form-group has-feedback">
																			<div className="row">
																				<div className="col-md-4 text-right">
																					<label className="control-label">Credit Card Number</label>
																				</div>
																				<div
																					className={cx("col-md-6 text-left", this.state.cardNumberFeedBack && 'has-feedback', this.state.cardNumberFeedBack && this.state.cardNumber && 'has-success', this.state.cardNumberFeedBack && (!this.state.cardNumber) && 'has-error')}>
																					<div className="input-group">
																						<div className="input-group-addon">
																							<i className="fa fa-credit-card" aria-hidden="true"/>
																						</div>
																						<input type="number" className="form-control" id="cardnumber"
																									 placeholder="8888-8888-8888-8888" maxLength={16}
																									 ref={ref => {
																										 this.cardNumber = ref;
																									 }}
																									 onKeyUp={this.cardNumberValidateHandler}
																									 required="required" data-fv-field="cardnumber"/>
																					</div>
																					{ this.state.cardNumberFeedBack && this.state.cardNumber &&
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
																					{ this.state.cardNumberFeedBack && !this.state.cardNumber &&
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
																					{ this.state.cardNumberFeedBack && !this.state.cardNumber &&
																					<small className="help-block" >{this.state.cardNumberFeedBackMsg || "The credit card number is required and can't be empty "}</small>}
																				</div>
																			</div>
																		</div>
																		<div className="form-group expiration-date has-feedback">
																			<div className="row">
																				<div className="col-md-4 text-right">
																					<label className="control-label">Expiration Date</label>
																				</div>
																				<div className="col-md-8 text-left">
																					<div className="input-group">
																						<div className="input-group-addon">
																							<i className="fa fa-calendar" aria-hidden="true"/></div>
																						<select className data-stripe="exp_month" id="exp-month"
																										data-fv-field="expMonth">
																							<option selected value={1}>Jan (01)</option>
																							<option value={2}>Feb (02)</option>
																							<option value={3}>Mar (03)</option>
																							<option value={4}>Apr (04)</option>
																							<option value={5}>May (05)</option>
																							<option value={6}>Jun (06)</option>
																							<option value={7}>Jul (07)</option>
																							<option value={8}>Aug (08)</option>
																							<option value={9}>Sep (09)</option>
																							<option value={10}>Oct (10)</option>
																							<option value={11}>Nov (11)</option>
																							<option value={12}>Dec (12)</option>
																							ref={ref => {
																							this.cardExpMonth = ref;
																						}}
																							onKeyUp={this.cardExpMonthValidateHandler}
																						</select>
																						<select className data-stripe="exp_year" id="exp-year"
																										data-fv-field="expYear">
																							<option value={2016}>2016</option>
																							<option value={2017}>2017</option>
																							<option value={2018}>2018</option>
																							<option value={2019}>2019</option>
																							<option value={2020}>2020</option>
																							<option value={2021}>2021</option>
																							<option value={2022}>2022</option>
																							<option value={2023}>2023</option>
																							<option value={2024}>2024</option>
																							<option value={2025}>2025</option>
																							<option value={2026}>2026</option>
																							<option value={2027}>2027</option>
																							<option value={2028}>2028</option>
																							<option value={2029}>2029</option>
																							<option value={2030}>2030</option>
																							<option value={2031}>2031</option>
																							<option value={2032}>2032</option>
																							<option value={2033}>2033</option>
																							<option value={2034}>2034</option>
																							<option value={2035}>2035</option>
																							<option value={2036}>2036</option>
																							<option value={2037}>2037</option>
																							<option value={2038}>2038</option>
																							<option value={2039}>2039</option>
																							<option value={2040}>2040</option>
																							<option value={2041}>2041</option>
																							<option value={2042}>2042</option>
																							<option value={2043}>2043</option>
																							<option value={2044}>2044</option>
																							<option value={2045}>2045</option>
																							<option value={2046}>2046</option>
																							<option value={2047}>2047</option>
																							<option value={2048}>2048</option>
																							<option value={2049}>2049</option>
																							<option value={2050}>2050</option>
																							ref={ref => {
																							this.cardExpYear = ref;
																						}}
																							onKeyUp={this.cardExpYearValidateHandler}
																						</select>
																					</div>
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group"
																						data-fv-icon-for="expMonth"/>
																					<div className="small text-danger js-error card_error exp_year exp_month"/>
																					{ null && <small className="help-block" data-fv-validator="notEmpty"
																								 data-fv-for="expMonth" data-fv-result="NOT_VALIDATED"
																					>The expiration month is required
																					</small>}
																					{ null && <small className="help-block" data-fv-validator="digits"
																								 data-fv-for="expMonth" data-fv-result="NOT_VALIDATED"
																					>The expiration month can contain digits only
																					</small>}
																					{ null && <small className="help-block" data-fv-validator="callback"
																								 data-fv-for="expMonth" data-fv-result="NOT_VALIDATED"
																					>Your card is Expired
																					</small>}
																					{ null && <small className="help-block" data-fv-validator="notEmpty"
																								 data-fv-for="expYear" data-fv-result="NOT_VALIDATED"
																					>The expiration year is required
																					</small>}
																					{ null && <small className="help-block" data-fv-validator="digits" data-fv-for="expYear"
																								 data-fv-result="NOT_VALIDATED">The expiration
																						year can contain digits only
																					</small>}
																				</div>
																			</div>
																		</div>
																		<div className="form-group">
																			<div className="row">
																				<div className="col-md-4 text-right">
																					<label className="control-label">CVV Number</label>
																				</div>
																				<div
																					className={cx("col-md-8 text-left", this.state.cardNumberFeedBack && 'has-feedback', this.state.cardNumberFeedBack && this.state.cardNumber && 'has-success', this.state.cardNumberFeedBack && (!this.state.cardNumber) && 'has-error')}>
																					<div className="input-group">
																						<input type="number" className="form-control"
																						       maxLength={4}
																						       size={4}
																									 data-stripe="cvc"
																									 ref={ref => {
																										 this.cardCVV = ref;
																									 }}
																									 onKeyUp={this.cardCVVValidateHandler}
																									 id="cvv" placeholder="CVC/CVV" />
																					</div>
																					<i className="form-control-feedback fv-bootstrap-icon-input-group"
																						 data-fv-icon-for="cvv"/>
																					{ this.state.cardCVVFeedBack && this.state.cardCVV &&
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
																					{ this.state.cardCVVFeedBack && !this.state.cardCVV &&
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
																					{ this.state.cardCVVFeedBack && !this.state.cardCVV &&
																					<small className="help-block" >{this.state.cardCVVFeedBackMsg || "The CVV is required and can't be empty"}</small>}
																				</div>
																			</div>
																		</div>
																	</div>
																	<div className="form-group">
																		<div className="row">
																			<div className="col-md-4 text-right">
																				<label className="control-label">Address Line 1</label>
																			</div>
																			<div className="col-md-6 text-left">
																				<div className="input-group">
																					<div className="input-group-addon">
																						<i className="fa fa-home" aria-hidden="true"/>
																					</div>
																					<input type="text" className="form-control" data-stripe="address_line1"
																								 name="address_1"/>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div className="form-group">
																		<div className="row">
																			<div className="col-md-4 text-right">
																				<label className="control-label">Address Line 2</label>
																			</div>
																			<div className="col-md-6 text-left">
																				<div className="input-group">
																					<div className="input-group-addon">
																						<i className="fa fa-road" aria-hidden="true"/>
																					</div>
																					<input type="text" className="form-control" data-stripe="address_line2"
																								 name="address_2"/>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div className="form-group">
																		<div className="row">
																			<div className="col-md-4 text-right">
																				<label className="control-label">City</label>
																			</div>
																			<div className="col-md-6 text-left">
																				<div className="input-group">
																					<div className="input-group-addon">
																						<i className="fa fa-globe" aria-hidden="true"/></div>
																					<input type="text" className="form-control" data-stripe="address_city"
																								 name="address_city"/>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div className="form-group">
																		<div className="row">
																			<div className="col-md-4 text-right">
																				<label className="control-label">State</label>
																			</div>
																			<div className="col-md-6 text-left">
																				<div className="input-group">
																					<div className="input-group-addon">
																						<i className="fa fa-map-o" aria-hidden="true"/></div>
																					<select className="form-control" data-stripe="address_state"
																									data-attribute-type="text" name="address_state">
																						<option value={-1}>State</option>
																						<option value="AL">ALABAMA</option>
																						<option value="AK">ALASKA</option>
																						<option value="AZ">ARIZONA</option>
																						<option value="AR">ARKANSAS</option>
																						<option value="CA">CALIFORNIA</option>
																						<option value="CO">COLORADO</option>
																						<option value="CT">CONNECTICUT</option>
																						<option value="DE">DELAWARE</option>
																						<option value="FL">FLORIDA</option>
																						<option value="GA">GEORGIA</option>
																						<option value="HI">HAWAII</option>
																						<option value="ID">IDAHO</option>
																						<option value="IL">ILLINOIS</option>
																						<option value="IN">INDIANA</option>
																						<option value="IA">IOWA</option>
																						<option value="KS">KANSAS</option>
																						<option value="KY">KENTUCKY</option>
																						<option value="LA">LOUISIANA</option>
																						<option value="ME">MAINE</option>
																						<option value="MD">MARYLAND</option>
																						<option value="MA">MASSACHUSETTS</option>
																						<option value="MI">MICHIGAN</option>
																						<option value="MN">MINNESOTA</option>
																						<option value="MS">MISSISSIPPI</option>
																						<option value="MO">MISSOURI</option>
																						<option value="MT">MONTANA</option>
																						<option value="NE">NEBRASKA</option>
																						<option value="NV">NEVADA</option>
																						<option value="NH">NEW HAMPSHIRE</option>
																						<option value="NJ">NEW JERSEY</option>
																						<option value="NM">NEW MEXICO</option>
																						<option value="NY">NEW YORK</option>
																						<option value="NC">NORTH CAROLINA</option>
																						<option value="ND">NORTH DAKOTA</option>
																						<option value="OH">OHIO</option>
																						<option value="OK">OKLAHOMA</option>
																						<option value="OR">OREGON</option>
																						<option value="PA">PENNSYLVANIA</option>
																						<option value="RI">RHODE ISLAND</option>
																						<option value="SC">SOUTH CAROLINA</option>
																						<option value="SD">SOUTH DAKOTA</option>
																						<option value="TN">TENNESSEE</option>
																						<option value="TX">TEXAS</option>
																						<option value="UT">UTAH</option>
																						<option value="VT">VERMONT</option>
																						<option value="VA">VIRGINIA</option>
																						<option value="WA">WASHINGTON</option>
																						<option value="WV">WEST VIRGINIA</option>
																						<option value="WI">WISCONSIN</option>
																						<option value="WY">WYOMING</option>
																					</select>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div className="form-group has-feedback">
																		<div className="row">
																			<div className="col-md-4 text-right">
																				<label className="control-label">Zip Code</label>
																			</div>
																			<div className="col-md-6 text-left">
																				<div className="input-group">
																					<div className="input-group-addon">
																						<i className="fa fa-map-marker" aria-hidden="true"/>
																					</div>
																					<input type="number" className="form-control" size={6}
																								 data-stripe="address_zip" name="address_zip"
																								 data-fv-field="address_zip"/>
																				</div>
																				<i className="form-control-feedback fv-bootstrap-icon-input-group"
																					 data-fv-icon-for="address_zip"/>
																				<small className="help-block" data-fv-validator="integer"
																							 data-fv-for="address_zip" data-fv-result="NOT_VALIDATED"
																				>This value is not valid
																				</small>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<hr />
														<div className="mrg-t-lg text-center">
															<button className="btn pay-now btn-success">
																&nbsp; &nbsp; &nbsp; &nbsp; Pay Now &nbsp; &nbsp; &nbsp; &nbsp;
															</button>
														</div>
													</div>
												</div>
												<div className="mrg-t-lg mrg-b-lg text-center">
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = {
	doGetEventData: (eventUrl) => doGetEventData(eventUrl),
	doGetOrderById: (eventUrl, orderId) => doGetOrderById(eventUrl, orderId),
	doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
};
const mapStateToProps = (state) => ({
	eventData: state.event && state.event.data,
	user: state.session.user,
	authenticated: state.session.authenticated,
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Checkout));
//export default (withStyles(s)(Event));
