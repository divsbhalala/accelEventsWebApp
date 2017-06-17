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
import SweetAlert from 'react-bootstrap-sweetalert';

import EventAside from './../../components/EventAside/EventAside';
import PopupModel from './../../components/PopupModal';
import Timer from './../../components/Timer';
import TimeOut from './../../components/TimeOut';

import {
	doGetEventData,
	doGetOrderById,
	doGetSettings,
	doSignUp,
} from './../event/action/index';
import {createCardToken, orderTicket} from './action/index';
let Total = 0;
let attendee = {};
let questions = {};
let buyerInformationFields = {};
let eventUrl;
class Checkout extends React.Component {
	static propTypes = {
		title: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			attendee: [],
			questions: [],
			buyerInformationFields: [],
			errorBuyer: [],
			errorAttendee: [],
			ticketPurchaseSuccessPopup: false,
			isFormSubmited: false,
			formError: null,
			showFormError: false,
			totalPrice: 0,
			focusOn: null,
			orderData: {},
			cardHolder: false,
			isLoaded: false,
			isTimeout: false,
			settings: {},
			isValidData: false,
			isValidCardData: false,
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
		this.ticketCheckout = this.ticketCheckout.bind(this);
		this.ticketTimeOut = this.ticketTimeOut.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.doCheckout = this.doCheckout.bind(this);
		this.hideTicketPurchaseSuccessPopup = this.hideTicketPurchaseSuccessPopup.bind(this);
		this.showTicketPurchaseSuccessPopup = this.showTicketPurchaseSuccessPopup.bind(this);

	}

	componentWillMount() {
		eventUrl = this.props.params && this.props.params.params;
		this.props.doGetEventData(eventUrl);
		this.props.doGetSettings(eventUrl, 'ticketing').then(resp => {
			this.setState({
				settings: resp && resp.data
			});
		}).catch(error => {
			//history.push('/404');
		});
		this.setState({
			orderData: this.props.orderData
		});
		this.props.doGetOrderById(eventUrl, this.props.params && this.props.params.orderId).then(resp => {
			if (resp && resp.errorCode) {
				this.setState({
					isTimeout: true
				})
			}
			this.setState({
				isLoaded: true
			})
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
		else if (this.cardHolderName.value && (this.cardHolderName.value.length <= 6 || this.cardHolderName.value.length > 70)) {
			this.setState({
				cardHolderName: false,
				cardHolderNameFeedBackMsg: "TThe card holder name must be more than 6 and less than 70 characters long"
			});
		}
		else {
			this.setState({
				cardHolderName: true,
				cardHolderNameFeedBackMsg: null,
				// isValidCardData: this.cardHolderName.value && this.cardNumber.value && this.cardCVV.value && this.cardExpMonth.value && this.cardExpYear.value
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
				cardNumberFeedBackMsg: "The credit card number is required and can't be empty",
			});
		}
		else if (this.cardNumber.value && this.cardNumber.value.length != 16) {
			this.setState({
				cardNumber: false,
				cardNumberFeedBackMsg: "Invalid credit card number",
			});
		}
		else {
			this.setState({
				cardNumber: true,
				cardNumberFeedBackMsg: null,
				// isValidCardData: this.cardHolderName.value && this.cardNumber.value && this.cardCVV.value && this.cardExpMonth.value && this.cardExpYear.value

			});
		}
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
				cardCVVFeedBackMsg: "The CVV is required and can't be empty",
			});
		}
		else if (this.cardCVV.value && !(this.cardCVV.value.length >= 3 && this.cardCVV.value.length <= 4)) {
			this.setState({
				cardCVV: false,
				cardCVVFeedBackMsg: "The CVV must be more than 4 and less than 3 characters long",
			});
		}
		else {
			this.setState({
				cardCVV: true,
				cardCVVFeedBackMsg: null,
				// isValidCardData: this.cardHolderName.value && this.cardNumber.value && this.cardCVV.value && this.cardExpMonth.value && this.cardExpYear.value

			});
		}

	};
	cardExpMonthValidateHandler = (e) => {


		if (!this.cardExpMonth.value) {
			this.setState({
				cardExpMonth: false
			});
		}
		else {
			this.setState({
				cardExpMonth: true,
				// isValidCardData: this.cardHolderName.value && this.cardNumber.value && this.cardCVV.value && this.cardExpMonth.value && this.cardExpYear.value

			});
		}
	};
	cardExpYearValidateHandler = (e) => {


		if (!this.cardExpYear.value) {
			this.setState({
				cardExpYear: false
			});
		}
		else {
			this.setState({
				cardExpYear: true,
				// isValidCardData: this.cardHolderName.value && this.cardNumber.value && this.cardCVV.value && this.cardExpMonth.value && this.cardExpYear.value

			});
		}
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

	};
	ticketCheckout = (e) => {
		e.preventDefault();
		let validData = false;
		this.setState({
			isFormSubmited: true
		});
		let eventUrl = this.props.params && this.props.params.params;
		let orderData = this.props.orderData;
		let purchaserDetail = orderData && orderData.purchaserDetail;
		let ticketAttribute = orderData && orderData.ticketAttribute;
		let hasHolderAttributes = ticketAttribute && ticketAttribute.hasHolderAttributes;
		if (ticketAttribute.buyerInformationFields && !purchaserDetail) {
			ticketAttribute.buyerInformationFields.map((item, index) => {
				if (!buyerInformationFields[index]) {
					buyerInformationFields[index] = {};
				}
				if (!buyerInformationFields[index][item.name]) {
					buyerInformationFields[index][item.name] = {};
				}
				if (item.mandatory && !buyerInformationFields[index][item.name].value) {
					buyerInformationFields[index][item.name]['error'] = true;
				}
			});
			this.setState({
				errorBuyer: buyerInformationFields
			});
			console.log('buyerInformationFields', buyerInformationFields)
		}
		if (hasHolderAttributes) {
			if (ticketAttribute && ticketAttribute.attendees) {
				ticketAttribute.attendees.map((item, index) => {
					if (!attendee[index]) {
						attendee[index] = {};
					}
					if (item.attributes) {
						item.attributes.map((field, key) => {
							if (!attendee[index][key]) {
								attendee[index][key] = {};
							}
							if (!attendee[index][key][field.name]) {
								attendee[index][key][field.name] = {};
							}
							if (field.mandatory && !attendee[index][key][field.name].value) {
								attendee[index][key][field.name]['error'] = true;
							}
							console.log(attendee[index][key], field)
						})
					}
					if (item.questions && questions && questions.length) {
						item.questions.map((field, key) => {
							if (!questions[index][key]) {
								questions[index][key] = {};
							}
							if (!questions[index][key][field.name]) {
								questions[index][key][field.name] = {};
							}
							if (field.mandatory && !questions[index][key][field.name].value) {
								questions[index][key][field.name]['error'] = true;
							}
							console.log(questions[index][key], field)
						})
					}

				});
				this.setState({
					errorAttendee: attendee
				});
				console.log('a', attendee)
			}
		}

		setTimeout(() => {
			let emailIndex = _.findIndex(this.props.orderData.ticketAttribute.buyerInformationFields, function (item) {
				return item.type == 'email';
			});
			console.log(emailIndex, buyerInformationFields, buyerInformationFields[emailIndex]);
			validData = document.getElementsByClassName("has-error").length == 0;
			if (validData) {
				if (!this.props.authenticated) {
					let requestData;
					if (emailIndex > -1 && buyerInformationFields[emailIndex] && buyerInformationFields[emailIndex]['Email'] && buyerInformationFields[emailIndex]['Email'].error == false) {
						let Email = buyerInformationFields[emailIndex]['Email'];
						requestData = {
							email: buyerInformationFields[emailIndex]['Email'].value,
							password: this.password && this.password.value
						};
						this.props.doSignUp(eventUrl, requestData).then(resp => {
							console.log(resp);
							if (resp && !resp.errorCode) {
								this.doCheckout(ticketAttribute, orderData);
							}
							else {
								alert('Error in user Signup');
							}
						}).catch(error => {
							alert('Error in user Signup');
							this.setState({
								showFormError : true,
								formError : "Oops! Error while processing"
							});

						})
					}
					else {
						this.setState({
							showFormError : true,
							formError : "Invalid Email Address"
						});
					}

				}
				else {
					this.doCheckout(ticketAttribute, orderData);
				}
			}
			else {
				this.setState({
					showFormError : true,
					formError : "Invalid Data"
				});
			}

		}, 100);

		return false;
	};

	doCheckout = (ticketAttribute, orderData) => {
		if (this.cardNumber.value &&
			this.cardExpMonth.value &&
			this.cardExpYear.value &&
			this.cardExpMonth.value &&
			this.cardCVV.value) {
			this.props.createCardToken(this.props.eventData && this.props.eventData.stripeKey, this.cardNumber.value, this.cardExpMonth.value, this.cardExpYear.value, this.cardCVV.value).then(resp => {
				console.log('resp', resp);
				if (resp && resp.data && resp.data.id) {
					let request = {
						"clientDate": moment().format('DD/MM/YYYY hh:mm:ss'),
						"hasholderattributes": ticketAttribute.hasHolderAttributes,
						"purchaser": {},
						"stripeToken": resp.data.id
					};

					if (request.hasholderattributes) {
						let holder = [];
						let holderQuestions = [];
						if (attendee && attendee[0]) {
							attendee[0].map((item, itemKey) => {
								let keys = _.keys(item);
								keys.map(keyItem => {
									if (item[keyItem].key) {
										holder.push({
											key: item[keyItem].key,
											value: item[keyItem].value,
										})
									}
								})
							})
						}
						if (questions && questions[0]) {
							questions[0].map((item, itemKey) => {
								let keys = _.keys(item);
								keys.map(keyItem => {
									if (item[keyItem].key) {
										holderQuestions.push({
											key: item[keyItem].key,
											value: item[keyItem].value,
										})
									}
								})
							})
						}
						console.log('holder', holder);
						request.holder = [
							{
								"attributes": holder,
								"questions": holderQuestions,
								"tableid": 0,
								"tickettypeid": 0
							}
						];
					}

					if (ticketAttribute) {
						if (ticketAttribute.buyerQuestions) {
							request.purchaser.questions = [];
						}
						if (ticketAttribute.buyerInformationFields) {
							let index = _.find(ticketAttribute.buyerInformationFields, function (item) {
								return item.type == 'email';
							});
							if (index > -1) {
								request.purchaser.attributes = [];
								request.purchaser.attributes = request.purchaser.attributes.concat({
									"Email": orderData && orderData.purchaserDetail && orderData.purchaserDetail.email
								})
							}
						}
					}
					let eventUrl = this.props.params && this.props.params.params;
					let orderId = this.props.params && this.props.params.orderId;
					console.log(JSON.stringify(request));
					this.props.orderTicket(eventUrl, orderId, request).then(resp => {
						console.log('res of request', resp);
						debugger;
						if (resp && resp.data && resp.data.message == 'Success') {
							this.showTicketPurchaseSuccessPopup();
						}
						else {
							console.log('error of request', error);
							this.setState({
								showFormError : true,
								formError : "Oops! Error while checkout"
							});
						}
					}).catch(error => {
						debugger;
						console.log('error of request', error);
						this.setState({
							showFormError : true,
							formError : "Oops! Error while checkout"
						});
					})

				}
				else {
					alert('Invalid Data');
					this.setState({
						showFormError : true,
						formError : "Invalid"
					});

				}

			}).catch((error) => {
				this.setState({
					cardExpYear: false
				});
				console.log('error', error && error.response && error.response.data && error.response.data.error && error.response.data.error.message );
				debugger;
				this.setState({
					showFormError : true,
					formError : (error && error.response && error.response.data && error.response.data.error && error.response.data.error.message) || "Invalid Data"
				});
				// alert('Opps! Error while getting card token ');
			})
		}
	};
	ticketTimeOut = () => {
		this.setState({isTimeout: true})
	};
	validateEmail = (email) => {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	setAttendeesValue = (field, key, itemKey, event) => {
		//If the input fields were directly within this
		//this component, we could use this.refs.[FIELD].value
		//Instead, we want to save the data for when the form is submitted
		let object = attendee || {};
		let value = event.target.value;
		if (!object[key]) {
			object[key] = [];
		}
		if (!object[key][itemKey]) {
			object[key][itemKey] = {};
		}
		if (!object[key][itemKey][field.name]) {
			object[key][itemKey][field.name] = {};
		}
		object[key][itemKey][field.name] = {
			"key": field.name,
			"value": value
		};
		if (field.mandatory) {
			if (!event.target.value) {
				object[key][itemKey][field.name]['error'] = true;
				event.target.parentElement.classList.add('has-error');
				event.target.parentElement.classList.remove('has-success');
			}
			else {
				object[key][itemKey][field.name]['error'] = false;
			}
		}
		event.target.parentElement.classList.add('has-feedback');
		if (value && field && field.type === 'email') {
			object[key][itemKey][field.name]['error'] = !this.validateEmail(value);
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
		attendee = object;
	};
	setQuestionsValue = (field, key, itemKey, event) => {
		//If the input fields were directly within this
		//this component, we could use this.refs.[FIELD].value
		//Instead, we want to save the data for when the form is submitted
		let object = questions || {};
		let value = event.target.value;
		if (!object[key]) {
			object[key] = [];
		}
		if (!object[key][itemKey]) {
			object[key][itemKey] = {};
		}
		if (!object[key][itemKey][field.name]) {
			object[key][itemKey][field.name] = {};
		}
		object[key][itemKey][field.name] = {
			"key": field.name,
			"value": value
		};
		if (field.mandatory) {
			if (!event.target.value) {
				object[key][itemKey][field.name]['error'] = true;
				event.target.parentElement.classList.add('has-error');
				event.target.parentElement.classList.remove('has-success');
			}
			else {
				object[key][itemKey][field.name]['error'] = false;
			}
		}
		event.target.parentElement.classList.add('has-feedback');
		if (value && field && field.type === 'email') {
			object[key][itemKey][field.name]['error'] = !this.validateEmail(value);
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
		questions = object;
	};
	buyerInformationFieldsHandler = (field, key, event) => {
		let object = buyerInformationFields || {};
		if (!object[key]) {
			object[key] = {}
		}
		if (!object[key][field.name]) {
			object[key][field.name] = {};
		}
		let value = event.target.value;
		object[key][field.name] = {
			key: field.name,
			value: value
		};
		object[key][field.name]['error'] = false;
		if (field.mandatory) {
			if (!value) {
				object[key][field.name]['error'] = true;
				event.target.parentElement.classList.add('has-error');
				event.target.parentElement.classList.remove('has-success');

			}
		}
		event.target.parentElement.classList.add('has-feedback');
		if (value && field.name && field.type === 'email') {
			object[key][field.name]['error'] = !this.validateEmail(value);
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
	};

	hideFormError = () => {
		this.setState({
			showFormError: false
		})
	};
	hideTicketPurchaseSuccessPopup = () => {
		this.setState({
			ticketPurchaseSuccessPopup: false
		})
	};
	showTicketPurchaseSuccessPopup = () => {
		this.setState({
			ticketPurchaseSuccessPopup: true
		})
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
			(this.state.isLoaded) ?
				(!this.state.isTimeout) ?
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
											<Timer
												time={this.props.orderData && this.props.orderData.ticketAttribute && this.props.orderData.ticketAttribute.remainingSeconds}
												onEnd={this.ticketTimeOut}/>
											<form className="validated fv-form fv-form-bootstrap" noValidate="novalidate"
														onSubmit={this.ticketCheckout}>
												<div className="row">
													<div className="col-md-10 col-md-offset-1">
														<h3 className="type-name">second ticket type with longer name test</h3>
														{this.props.orderData && this.props.orderData.ticketAttribute && this.props.orderData.ticketAttribute.orderData &&
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
																		{ this.props.orderData.ticketAttribute.orderData.map(item =>
																			<tr className="tickettype-amount" key={Math.random()}>
																				<td className="text-left">
																					{item.ticketTypeName}
																				</td>
																				<td className="text-left ticket-amount">
																					${parseFloat(item.price).toFixed(2)}
																				</td>
																				<td className="text-left ticket-amount-fee">
																					${  parseFloat(parseFloat(item.priceWithFee).toFixed(2) - parseFloat(item.price).toFixed(2)).toFixed(2)}
																				</td>
																				<td className="text-center">
																					<span className="qty">{item.numberofticket}</span>
																				</td>
																				<td width={1}>
																					${parseFloat(item.priceWithFee * item.numberofticket).toFixed(2)}
																				</td>
																			</tr>
																		)
																		}
																		<tr className="total-price-tr">
																			<td colSpan={4} className="text-right">
																				<strong>Order Total:</strong>
																			</td>
																			<td colSpan={1}>
																				$<span
																				className="total-price">{parseFloat(this.props.orderData.ticketAttribute.totalPrice).toFixed(2)}</span>
																			</td>
																		</tr>
																		</tbody>
																	</table>
																</div>
															</div>
														</div>}
														<div className="project-box gray-box card">
															<div className="project-box-header gray-bg">
																<div className="name text-center">
																	<a href="#">Ticket Information</a>
																</div>
															</div>
															<div className="project-box-content">
																<div className="red pull-right">* Required information</div>
																<h4 className="text-left"><strong>Ticket Buyer</strong></h4>

																{ this.props.orderData && this.props.orderData.ticketAttribute && !this.props.orderData.purchaserDetail &&
																this.props.orderData.ticketAttribute.buyerInformationFields && this.props.orderData.ticketAttribute.buyerInformationFields.length &&
																<div className="buyerInformation">
																	{
																		this.props.orderData.ticketAttribute.buyerInformationFields.map((item, key) =>
																			<div className="custom-attribute" key={item.name}>
																				<div className={cx("form-group mrg-t-md")}>
																					<div className="row">
																						<div className="col-md-4 text-right">
																							<label className="text-right">{item.name} { item.mandatory &&
																							<span className="red">*</span>}</label>
																						</div>
																						<div
																							className={cx("col-md-6 text-left")}>
																							<div className={cx("form-group ",
																								this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name] && 'has-feedback',
																								this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name] && this.state.errorBuyer[key][item.name].error && 'has-error',
																								this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name] && this.state.errorBuyer[key][item.name].value && 'has-success'
																							)}>
																								<input
																									type={item.type}
																									className="form-control"
																									name={item.mandatory}
																									placeholder={item.name}
																									onChange={this.buyerInformationFieldsHandler.bind(this, item, key)}
																									required={item.mandatory}
																									defaultValue={item.value ||
																									(
																										this.state.errorBuyer &&
																										this.state.errorBuyer[key] &&
																										this.state.errorBuyer[key][item.name] &&
																										this.state.errorBuyer[key][item.name].value
																									)
																									}
																								/>
																								<i
																									className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																								<i
																									className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																								<small
																									className="help-block">{ "The " + item.name + " is invalid."}</small>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>)
																	}
																	{  _.find(this.props.orderData.ticketAttribute.buyerInformationFields, function (item) {
																		return item.type == 'email';
																	}) && <div className="custom-attribute">
																		<div className="form-group mrg-t-md">
																			<div className="row">
																				<div className="col-md-4 text-right">
																					<label className="text-right">Password<span className="red">*</span></label>
																				</div>
																				<div
																					className={cx("col-md-6 form-group text-left", (this.state.passwordFeedBack || this.state.isFormSubmited) && 'has-feedback', (this.state.passwordFeedBack || this.state.isFormSubmited ) && this.state.password && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
																					<input type="password" className="form-control" name="password"
																								 ref={ref => {
																									 this.password = ref;
																								 }}
																								 onKeyUp={this.passwordValidateHandler}
																								 required="required"/>
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																					<small className="help-block">This value is not valid</small>
																				</div>
																			</div>
																		</div>
																	</div> }
																</div> }

																{ this.props.orderData && this.props.orderData.purchaserDetail &&
																<div className="buyerInformation">
																	<div className="form-group mrg-t-md">
																		<div className="row">
																			<div className="col-md-4 text-right">
																				<strong className="text-right"><strong>Name: </strong></strong>
																			</div>
																			<div className="col-md-6 text-left">
																				{this.props.orderData.purchaserDetail.firstName} {this.props.orderData.purchaserDetail.lastName}
																			</div>
																		</div>
																	</div>
																	<div className="form-group">
																		<div className="row">
																			<div className="col-md-4 text-right">
																				<strong className="text-right"><strong>Email: </strong></strong>
																			</div>
																			<div className="col-md-6 text-left">
																				{this.props.orderData.purchaserDetail.email}
																			</div>
																		</div>
																	</div>
																</div>}
																<div className="buyerQuestion">
																</div>
																{ this.props.orderData && this.props.orderData.discountCoupon &&
																<div className="form-group mrg-t-md">
																	<div className="row">
																		<div className="col-md-4 text-right">
																			<label className="text-right"><strong>Discount Coupon: </strong></label>
																		</div>
																		<div className="col-md-4 text-left">
																			<input type="text" className="form-control" name="discountcoupon"
																						 id="discountcoupon"
																						 placeholder="Discount coupon"/>
																		</div>
																		<div className="col-md-2">
																	<span className="input-group-btn">
																		<button type="button" className="btn btn-primary" id="discoupon">Apply</button>
																	</span>
																		</div>
																	</div>
																</div>}
																<input type="hidden" defaultValue="false" id="hasHolderAttributes"/>
																<div id="ccDetails" className>
																	<h4 className="text-left"><strong>Payment <span className="small">(Your card info is not stored on Accelevents servers)</span></strong>
																	</h4>
																	<div className="text-left">
																		<style
																			dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n"}}/>
																		<div className="stripe-form">
																			<div className="stripe-card-info">
																				<div className={cx("form-group",
																					(this.state.cardHolderNameFeedBack || this.state.isFormSubmited) && 'has-feedback',
																					(this.state.cardHolderNameFeedBack || this.state.isFormSubmited) && this.state.cardHolderName && 'has-success',
																					(this.state.cardHolderNameFeedBack || this.state.isFormSubmited) && (!this.state.cardHolderName) && 'has-error')
																				}>
																					<div className="row">
																						<div className="col-md-4 text-right">
																							<label className="">Card Holder Name</label>
																						</div>
																						<div
																							className={cx("col-md-6 text-left")}>
																							<div className={cx("input-group",
																								(this.state.cardHolderNameFeedBack || this.state.isFormSubmited) && 'has-feedback',
																								(this.state.cardHolderNameFeedBack || this.state.isFormSubmited) && this.state.cardHolderName && 'has-success',
																								(this.state.cardHolderNameFeedBack || this.state.isFormSubmited) && (!this.state.cardHolderName) && 'has-error')
																							}>
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
																							{ (this.state.cardHolderNameFeedBack || this.state.isFormSubmited) && this.state.cardHolderName &&
																							<i
																								className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
																							{ (this.state.cardHolderNameFeedBack || this.state.isFormSubmited) && !this.state.cardHolderName &&
																							<i
																								className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
																							{ (this.state.cardHolderNameFeedBack || this.state.isFormSubmited) && !this.state.cardHolderName &&
																							<small
																								className="help-block">{this.state.cardHolderNameFeedBackMsg || "The card holder name is required and can't be empty" }</small>}
																						</div>
																					</div>
																				</div>
																				<div className={cx("form-group",
																					(this.state.cardNumberFeedBack || this.state.isFormSubmited) && 'has-feedback',
																					(this.state.cardNumberFeedBack || this.state.isFormSubmited) && this.state.cardNumber && 'has-success',
																					(this.state.cardNumberFeedBack || this.state.isFormSubmited) && (!this.state.cardNumber) && 'has-error')
																				}>
																					<div className="row">
																						<div className="col-md-4 text-right">
																							<label className="">Credit Card Number</label>
																						</div>
																						<div
																							className={cx("col-md-6 text-left")}>
																							<div className={cx("input-group",
																								(this.state.cardNumberFeedBack || this.state.isFormSubmited) && 'has-feedback',
																								(this.state.cardNumberFeedBack || this.state.isFormSubmited) && this.state.cardNumber && 'has-success',
																								(this.state.cardNumberFeedBack || this.state.isFormSubmited) && (!this.state.cardNumber) && 'has-error')
																							}>
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
																							{ (this.state.cardNumberFeedBack || this.state.isFormSubmited) && this.state.cardNumber &&
																							<i
																								className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
																							{ (this.state.cardNumberFeedBack || this.state.isFormSubmited) && !this.state.cardNumber &&
																							<i
																								className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
																							{ (this.state.cardNumberFeedBack || this.state.isFormSubmited) && !this.state.cardNumber &&
																							<small
																								className="help-block">{this.state.cardNumberFeedBackMsg || "The credit card number is required and can't be empty "}</small>}
																						</div>
																					</div>
																				</div>
																				<div className={cx("form-group expiration-date",
																					((this.state.cardExpYear && this.state.cardExpMonth) || this.state.isFormSubmited) && 'has-feedback',
																					((this.state.cardExpYear && this.state.cardExpMonth) || this.state.isFormSubmited) && ((this.state.cardExpYear && this.state.cardExpMonth)) && 'has-success',
																					((this.state.cardExpYear && this.state.cardExpMonth) || this.state.isFormSubmited) && (!(this.state.cardExpYear && this.state.cardExpMonth)) && 'has-error')
																				}>
																					<div className="row">
																						<div className="col-md-4 text-right">
																							<label className="">Expiration Date</label>
																						</div>
																						<div className={cx("col-md-8 text-left")}>
																							<div className={cx("input-group",
																								((this.state.cardExpYear && this.state.cardExpMonth) || this.state.isFormSubmited) && 'has-feedback',
																								((this.state.cardExpYear && this.state.cardExpMonth) || this.state.isFormSubmited) && ((this.state.cardExpYear && this.state.cardExpMonth)) && 'has-success',
																								((this.state.cardExpYear && this.state.cardExpMonth) || this.state.isFormSubmited) && (!(this.state.cardExpYear && this.state.cardExpMonth)) && 'has-error')
																							}>
																								<div className="input-group-addon">
																									<i className="fa fa-calendar" aria-hidden="true"/></div>
																								<select className data-stripe="exp_month"
																												id="exp-month"
																												data-fv-field="expMonth"
																												ref={ref => {
																													this.cardExpMonth = ref;
																												}}
																												onChange={this.cardExpMonthValidateHandler}
																								>
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

																								</select>
																								<select className data-stripe="exp_year" id="exp-year"
																												data-fv-field="expYear"
																												ref={ref => {
																													this.cardExpYear = ref;
																												}}
																												onChange={this.cardExpYearValidateHandler}
																								>
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

																								</select>
																							</div>
																							<i
																								className="form-control-feedback fv-bootstrap-icon-input-group"
																								data-fv-icon-for="expMonth"/>
																							{ ((this.state.cardExpYear && this.state.cardExpMonth) || this.state.isFormSubmited) &&
																							<small className="help-block">Invalid card Expiration date </small>}
																							{ null &&
																							<small className="help-block">The expiration month can contain digits only
																							</small>}
																							{ null && <small className="help-block">Your card is Expired
																							</small>}
																							{ null && <small className="help-block">The expiration year is required
																							</small>}
																							{ null &&
																							<small className="help-block">The expiration year can contain digits only
																							</small>}
																						</div>
																					</div>
																				</div>
																				<div className={cx("form-group",
																					(this.state.cardCVVFeedBack || this.state.isFormSubmited) && 'has-feedback',
																					(this.state.cardCVVFeedBack || this.state.isFormSubmited) && this.state.cardCVV && 'has-success',
																					(this.state.cardCVVFeedBack || this.state.isFormSubmited) && (!this.state.cardCVV) && 'has-error'
																				)}>
																					<div className="row">
																						<div className="col-md-4 text-right">
																							<label className="">CVV Number</label>
																						</div>
																						<div
																							className={cx("col-md-8 text-left",
																								(this.state.cardCVVFeedBack || this.state.isFormSubmited) && 'has-feedback',
																								(this.state.cardCVVFeedBack || this.state.isFormSubmited) && this.state.cardCVV && 'has-success',
																								(this.state.cardCVVFeedBack || this.state.isFormSubmited) && (!this.state.cardCVV) && 'has-error')
																							}>
																							<div className="input-group">
																								<input type="number" className="form-control"
																											 maxLength={4}
																											 size={4}
																											 data-stripe="cvc"
																											 ref={ref => {
																												 this.cardCVV = ref;
																											 }}
																											 onChange={this.cardCVVValidateHandler}
																											 id="cvv" placeholder="CVC/CVV"/>
																							</div>
																							<i className="form-control-feedback fv-bootstrap-icon-input-group"
																								 data-fv-icon-for="cvv"/>
																							{ (this.state.cardCVVFeedBack || this.state.isFormSubmited) && this.state.cardCVV &&
																							<i
																								className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
																							{ (this.state.cardCVVFeedBack || this.state.isFormSubmited) && !this.state.cardCVV &&
																							<i
																								className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
																							{ (this.state.cardCVVFeedBack || this.state.isFormSubmited) && !this.state.cardCVV &&
																							<small
																								className="help-block">{this.state.cardCVVFeedBackMsg || "The CVV is required and can't be empty"}</small>}
																						</div>
																					</div>
																				</div>
																			</div>
																			<div className="form-group">
																				<div className="row">
																					<div className="col-md-4 text-right">
																						<label className="">Address Line 1</label>
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
																						<label className="">Address Line 2</label>
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
																						<label className="">City</label>
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
																						<label className="">State</label>
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
																						<label className="">Zip Code</label>
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
																{ this.props.orderData && this.props.orderData.ticketAttribute && this.props.orderData.ticketAttribute.attendees ?
																	this.props.orderData.ticketAttribute.attendees.map((item, itemKey) => <div
																		className="attendee-data" key={Math.random()}>
																		<h4 className="text-left">
																			<strong>{item.header} - Ticket Holder Name</strong>
																		</h4>
																		{
																			item.attributes ?
																				item.attributes.map((attrib, key) =>
																					<div className="holder-attribute" key={Math.random()}>
																						<div className="custom-attribute">
																							<div className={cx("form-group mrg-t-md")}>
																								<div className="row">
																									<div className="col-md-4 text-right">
																										<label className="text-right">{attrib.name}
																											{ attrib.mandatory && <span className="red">*</span>}
																										</label>
																									</div>
																									<div className="col-md-6 text-left">
																										<div className={cx("form-group",
																											this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name] && (this.state.errorAttendee[itemKey][key][attrib.name].key || this.state.errorAttendee[itemKey][key][attrib.name].error) && 'has-feedback',
																											this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name] && this.state.errorAttendee[itemKey][key][attrib.name].error && 'has-error',
																											this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name] && this.state.errorAttendee[itemKey][key][attrib.name].value && 'has-success',
																										)}>
																											<input type="text"
																														 placeholder={attrib.name}
																														 className="form-control"
																														 name={attrib.name}
																														 required={ attrib.mandatory}
																														 defaultValue={attrib.value ||
																														 (this.state.attendee &&
																														 this.state.attendee[itemKey] &&
																														 this.state.attendee[itemKey][key] &&
																														 this.state.attendee[itemKey][key][attrib.name]) || (
																															 this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name] && this.state.errorAttendee[itemKey][key][attrib.name].value
																														 )
																														 }
																														 onChange={this.setAttendeesValue.bind(this, attrib, itemKey, key)}
																											/>
																											<i
																												className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																											<i
																												className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																											<small
																												className="help-block">{ "The " + attrib.name + " is invalid."}</small>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																						<input type="hidden" name="tableId" defaultValue={0}/>
																					</div>
																				) : ""
																		}
																		<div className="holder-question">
																			<input type="hidden" name="tableId" defaultValue={0}/>
																			{
																				item.questions ?
																					item.questions.map((attrib, key) =>
																						<div className="holder-attribute" key={Math.random()}>
																							<div className="custom-attribute">
																								<div className={cx("form-group mrg-t-md")}>
																									<div className="row">
																										<div className="col-md-4 text-right">
																											<label className="text-right">{attrib.name}
																												{ attrib.mandatory && <span className="red">*</span>}
																											</label>
																										</div>
																										<div className="col-md-6 text-left">
																											<div className={cx("form-group",
																												this.state.errorQuestions && this.state.errorQuestions[itemKey] && this.state.errorQuestions[itemKey][key] && this.state.errorQuestions[itemKey][key][attrib.name] && (this.state.errorQuestions[itemKey][key][attrib.name].key || this.state.errorQuestions[itemKey][key][attrib.name].error) && 'has-feedback',
																												this.state.errorQuestions && this.state.errorQuestions[itemKey] && this.state.errorQuestions[itemKey][key] && this.state.errorQuestions[itemKey][key][attrib.name] && this.state.errorQuestions[itemKey][key][attrib.name].error && 'has-error',
																												this.state.errorQuestions && this.state.errorQuestions[itemKey] && this.state.errorQuestions[itemKey][key] && this.state.errorQuestions[itemKey][key][attrib.name] && this.state.errorQuestions[itemKey][key][attrib.name].value && 'has-success',
																											)}>
																												<input type="text"
																															 placeholder={attrib.name}
																															 className="form-control"
																															 name={attrib.name}
																															 required={ attrib.mandatory}
																															 defaultValue={attrib.value ||
																															 (this.state.questions &&
																															 this.state.questions[itemKey] &&
																															 this.state.questions[itemKey][key] &&
																															 this.state.questions[itemKey][key][attrib.name]) || (
																																 this.state.errorQuestions && this.state.errorQuestions[itemKey] && this.state.errorQuestions[itemKey][key] && this.state.errorQuestions[itemKey][key][attrib.name] && this.state.errorQuestions[itemKey][key][attrib.name].value
																															 )
																															 }
																															 onChange={this.setQuestionsValue.bind(this, attrib, itemKey, key)}
																												/>
																												<i
																													className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																												<i
																													className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																												<small
																													className="help-block">{ "The " + attrib.name + " is invalid."}</small>
																											</div>
																										</div>
																									</div>
																								</div>
																							</div>
																							<input type="hidden" name="tableId" defaultValue={0}/>
																						</div>
																					) : ""
																			}
																		</div>
																		<hr />
																	</div>)
																	: ''
																}
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
						{ this.state.ticketPurchaseSuccessPopup &&
						<SweetAlert title="Thank you for supporting the event. Please check your inbox for your tickets."
												onConfirm={() => {
													history.push('/event/' + eventUrl)
												}}/> }
						{ this.state.showFormError && <SweetAlert
							warning
							confirmBtnText="Continue"
							confirmBtnBsStyle="danger"
							title={ this.state.formError || "Invalid Data"}
							onConfirm={this.hideFormError}
						>
						</SweetAlert> }
					</div> : <TimeOut eventUrl={eventUrl}/>
				: <div></div>
		);
	}
}

const mapDispatchToProps = {
	doGetEventData: (eventUrl) => doGetEventData(eventUrl),
	doGetOrderById: (eventUrl, orderId) => doGetOrderById(eventUrl, orderId),
	doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
	createCardToken: (stripeKey, cardNumber, expMonth, expYear, cvc) => createCardToken(stripeKey, cardNumber, expMonth, expYear, cvc),
	orderTicket: (eventurl, orderid, ticketBookingDto) => orderTicket(eventurl, orderid, ticketBookingDto),
	doSignUp: (eventurl, userData) => doSignUp(eventurl, userData),
};
const mapStateToProps = (state) => ({
	eventData: state.event && state.event.data,
	user: state.session.user,
	authenticated: state.session.authenticated,
	orderData: state.event && state.event.order_data,
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Checkout));
//export default (withStyles(s)(Event));
