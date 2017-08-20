import {connect} from 'react-redux';
import React from 'react';
import PropTypes   from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TicketCheckout.css';
import Link from '../Link';
import cx from 'classnames';
import Moment from 'react-moment';
import IntlTelInput from './../IntTelInput';
import NumericInput from 'react-numeric-input';
import history from './../../history';
import moment from 'moment';
import PopupModel from './../PopupModal';
import BuyRaffleTicketsModal from './../../components/BuyRaffleTicketsModal'
import Timer from './../Timer';
import TimeOut from './../TimeOut';
import Button from 'react-bootstrap-button-loader';

import {
	doGetEventData,
	doGetOrderById,
	doGetSettings,
	doSignUp,
	couponCode,
  doValidateMobileNumber
} from './../../routes/event/action/index';
import {createCardToken, orderTicket} from './../../routes/checkout/action/index';
let countDownInterval = null;
let isEventEnd = false;
let Total = 0;
let attendee = {};
let questions = {};
let buyerInformationFields = {};
let buyerQuestions = {};
let eventUrl;
let orderId;
let validData = true;
let dataTimeout = null;
let ticketInst = null;
class TicketCheckout extends React.Component {
	static propTypes = {
		activeTab: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
      loading: false,
			attendee: [],
			questions: [],
			buyerInformationFields: [],
			buyerQuestions: [],
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
			isInvalidDate: false,
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
			discount: null,
			coupon: null,
			showMapPopup: false,
			validData: true,
			popupAlertHeader: null,
			errorMsg: null,
			buyer_email:{},
			buyer_name:{}
		};
		this.ticketCheckout = this.ticketCheckout.bind(this);
		this.ticketTimeOut = this.ticketTimeOut.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.doCheckout = this.doCheckout.bind(this);
		this.hideTicketPurchaseSuccessPopup = this.hideTicketPurchaseSuccessPopup.bind(this);
		this.showTicketPurchaseSuccessPopup = this.showTicketPurchaseSuccessPopup.bind(this);
		this.getDiscount = this.getDiscount.bind(this);
		// this.phoneNumberValidateHandler = this.phoneNumberValidateHandler.bind(this);
		this.setAttendeesAddressValue = this.setAttendeesAddressValue.bind(this);
		this.isValidFormData = this.isValidFormData.bind(this);
    ticketInst = this;
		this.nameChanged = this.nameChanged.bind(this);
		this.emailChanged = this.emailChanged.bind(this);
		// this.setBuyerAddressValue = this.setBuyerAddressValue.bind(this);
	}

	componentWillMount() {
		eventUrl = this.props.eventUrl;
		orderId = this.props.orderId;
		/*this.props.doGetEventData(eventUrl);
		 this.props.doGetSettings(eventUrl, 'ticketing').then(resp => {
		 this.setState({
		 settings: resp && resp.data
		 });
		 }).catch(error => {
		 //history.push('/404');
		 });*/
		this.setState({
			orderData: this.props.orderData
		});
		this.props.doGetOrderById(eventUrl, orderId).then(resp => {
			if (resp && resp.errorCode) {
				this.setState({
					isTimeout: true
				});
				if(this.props.setOrderExpierd){
					this.props.setOrderExpierd(true);
				}
			}
			this.setState({
				isLoaded: true
			})
		});
	}
	componentDidMount(){
		//this.isValidFormData();
		this.isValidFormData();
	}
  componentWillUnmount(){
    if(dataTimeout){
      clearTimeout(dataTimeout);
      dataTimeout = null;
    }
	}

	isValidFormData = ()=>{
    ticketInst = this;
    validData = document.getElementsByClassName("has-error").length === 0;
		this.setState({
			validData: validData
		});
    dataTimeout = setTimeout(()=>{
      ticketInst.isValidFormData();
		}, 1000);
	};

	emailChanged = (e) =>{
		let b_email = this.state.buyer_email;
		b_email.feedback = true;
		if (this.email.value.trim() === ' ') {
			this.email.value = '';
		}

		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	    if (this.email.value.trim() == '' || !re.test(this.email.value)) {
	    	b_email.value = false;
	    	b_email.error = true;
	      this.setState({
	        buyer_email: b_email
	      });
	    }
	    else {
	      b_email.value = this.email.value.trim();
	      b_email.error = false;
	      this.setState({
	        buyer_email: b_email
	      });
	    }
	}

	nameChanged = (e) =>{
		let b_name = this.state.buyer_name;
		b_name.feedback = true;
		if (this.name.value.trim() === ' ') {
			this.name.value = '';
		}

		if (!this.name.value) {
			b_name.value = false;
			b_name.error = true;
			this.setState({
				buyer_name: b_name
			});
		}
		else {
			b_name.value = this.name.value;
			b_name.error = false;
			this.setState({
				buyer_name: b_name
			});
		}

	}

	emailValidateHandler = (e) => {

		this.setState({
			emailFeedBack: true
		});
		if (this.email.value.trim() === ' ') {
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
		// this.isValidFormData();
	};
	couponValidateHandler = (e) => {
		this.setState({
			coupon: this.coupon.value
		});
		// this.isValidFormData();
	};
	addressZipValidateHandler = (e) => {
		if ([69, 187, 188, 189, 190].includes(e.keyCode)) {
			e.preventDefault();
		}
	};
	cardHolderNameDownValidateHandler = (e) => {
		if (this.cardHolderName && !this.cardHolderName.value) {
			if (e.keyCode === 32) {
				e.preventDefault();
			}
		}
	};
	cardHolderNameBlurValidateHandler = () => {
		if (this.cardHolderName && this.cardHolderName.value) {
			// this.cardHolderName.value = this.cardHolderName.value && this.cardHolderName.value.trim();
			let nameLen = this.cardHolderName.value.length;
			if (this.cardHolderName.value && this.cardHolderName.value[nameLen - 1] === ' ') {
				this.setState({
					cardHolderName: false,
					cardHolderNameFeedBackMsg: "The card holder name can't end with a space"
				});
			}
		}
		// this.isValidFormData();
	};
	cardHolderNameValidateHandler = (e) => {
	//	this.cardHolderName.value = this.cardHolderName.value && this.cardHolderName.value.trim();
		this.setState({
			cardHolderNameFeedBack: true
		});
		// if (this.cardHolderName.value && this.cardHolderName.value.trim() === ' ') {
		// 	this.cardHolderName.value = '';
		// }

		if (!this.cardHolderName.value.trim()) {
			this.setState({
				cardHolderName: false,
				cardHolderNameFeedBackMsg: "The card holder name is required and can't be empty"
			});
		}
		else if (this.cardHolderName.value && (this.cardHolderName.value.length <= 6 || this.cardHolderName.value.length > 70)) {
			this.setState({
				cardHolderName: false,
        cardHolderNameFeedBackMsg: "The card holder name must be more than 6 and less than 70 characters long"
			});
    } else if(this.cardHolderName.value.charAt(0) === ' ' || this.cardHolderName.value.charAt(this.cardHolderName.value.length-1) === ' '){
      this.setState({
        cardHolderName: false,
        cardHolderNameFeedBackMsg: "The card holder name can not start or end with white space",
      });
    } else {
			this.setState({
        cardHolderName: true,
				cardHolderNameFeedBackMsg: null,
				// isValidCardData: this.cardHolderName.value&& this.cardNumber.value&& this.cardCVV.value&& this.cardExpMonth.value&& this.cardExpYear.value
			});
		}
		// this.isValidFormData();
	};
	cardNumberValidateHandler = (e) => {
		this.cardNumber.value = this.cardNumber.value && this.cardNumber.value.trim();
		this.cardNumber.value = this.cardNumber.value.substr(0, 16);
		this.setState({
			cardNumberFeedBack: true
		});

		if (this.cardNumber.value && this.cardNumber.value.trim() === ' ') {
			this.cardNumber.value = '';
		}

		if (!this.cardNumber.value.trim()) {
			this.setState({
				cardNumber: false,
				cardNumberFeedBackMsg: "The credit card number is required and can't be empty",
			});
		}
		else if (this.cardNumber.value && this.cardNumber.value.length !== 16 && this.cardNumber.value.length !== 15) {
			this.setState({
				cardNumber: false,
				cardNumberFeedBackMsg: "Invalid credit card number",
			});
		}
		else {
			this.setState({
				cardNumber: true,
				cardNumberFeedBackMsg: null,
				// isValidCardData: this.cardHolderName.value&& this.cardNumber.value&& this.cardCVV.value&& this.cardExpMonth.value&& this.cardExpYear.value

			});
		}
		// this.isValidFormData();
	};
	cardCVVValidateHandler = (e) => {
		this.cardCVV.value = this.cardCVV.value && this.cardCVV.value.trim();
		this.setState({
			cardCVVFeedBack: true
		});

		if (this.cardCVV.value && this.cardCVV.value.trim() === ' ') {
			this.cardCVV.value = '';
		}

		if (!this.cardCVV.value.trim()) {
			this.setState({
				cardCVV: false,
				cardCVVFeedBackMsg: "The CVV is required and can't be empty",
			});
		}
		else if (this.cardCVV.value && (this.cardCVV.value.length < 3 || this.cardCVV.value.length > 4)) {
			this.setState({
				cardCVV: false,
				cardCVVFeedBackMsg: "The CVV must be more than 4 and less than 3 characters long",
			});
		}
		else {
			this.setState({
				cardCVV: true,
				cardCVVFeedBackMsg: null,
				// isValidCardData: this.cardHolderName.value&& this.cardNumber.value&& this.cardCVV.value&& this.cardExpMonth.value&& this.cardExpYear.value

			});
		}
		// this.isValidFormData();

	};
	cardExpMonthValidateHandler = (e) => {
		this.cardExpMonth.value = this.cardExpMonth.value && this.cardExpMonth.value.trim();
		if (!this.cardExpMonth.value) {
			this.setState({
				cardExpMonth: false,
				isInvalidDate: true
			});
		}
		else {
			if ((this.cardExpMonth.value && this.cardExpYear.value && (parseInt(this.cardExpYear.value.toString() + (this.cardExpMonth.value.toString().length === 1 ? ('0' + this.cardExpMonth.value.toString()) : this.cardExpMonth.value.toString())) >= parseInt((new Date()).getUTCFullYear().toString() + (((new Date()).getMonth().toString().length === 1 ? '0' + (new Date()).getMonth().toString() : (new Date()).getMonth().toString())))))) {
				this.setState({
					isInvalidDate: false,
					cardExpMonth: true,
				});
			} else {
				this.setState({
					cardExpMonth: true,
					isInvalidDate: true
				});
			}
		}
		// this.isValidFormData();
	};
	cardExpYearValidateHandler = (e) => {
		this.cardExpYear.value = this.cardExpYear.value && this.cardExpYear.value.trim();
		if (!this.cardExpYear.value) {
			this.setState({
				cardExpYear: false,
				isInvalidDate: true
			});
		}
		else {
			if ((this.cardExpMonth.value && this.cardExpYear.value && (parseInt(this.cardExpYear.value.toString() + (this.cardExpMonth.value.toString().length === 1 ? ('0' + this.cardExpMonth.value.toString()) : this.cardExpMonth.value.toString())) >= parseInt((new Date()).getUTCFullYear().toString() + (((new Date()).getMonth().toString().length === 1 ? '0' + (new Date()).getMonth().toString() : (new Date()).getMonth().toString())))))) {
				this.setState({
					isInvalidDate: false,
					cardExpYear: true,
				});
			} else {
				this.setState({
					cardExpYear: true,
					isInvalidDate: true
				});
			}
		}
		// this.isValidFormData();
	};
	passwordValidateHandler = (e) => {
		this.password.value = this.password.value && this.password.value.trim();
		this.setState({
			passwordFeedBack: true
		});

		if (!this.password.value.trim()) {

			this.setState({
				password: false
			});
		} else {
			this.setState({
				password: true
			});
		}
		// this.isValidFormData();

	};
	ticketCheckout = (e) => {
		e.preventDefault();
		validData = false;
		this.setState({
			isFormSubmited: true,
      loading: true,
		});
		let eventUrl = this.props.eventUrl;
		let orderData = this.props.orderData;
		let purchaserDetail = orderData && orderData.purchaserDetail;
		let ticketAttribute = orderData && orderData.ticketAttribute;
		if (ticketAttribute.buyerInformationFields) {
			ticketAttribute.buyerInformationFields.map((item, index) => {
				if (!buyerInformationFields[index]) {
					buyerInformationFields[index] = {};
				}
				if (!buyerInformationFields[index][item.name]) {
					buyerInformationFields[index][item.name] = {};
				}
				if (item.mandatory && item.name && /address/i.test(item.name)) {
					if (!buyerInformationFields[index][item.name + " 1"]) {
						buyerInformationFields[index][item.name + " 1"] = {};
					}
					if (!buyerInformationFields[index][item.name + " 2"]) {
						buyerInformationFields[index][item.name + " 2"] = {};
					}
					if (!buyerInformationFields[index][item.name + " City"]) {
						buyerInformationFields[index][item.name + " City"] = {};
					}
					if (!buyerInformationFields[index][item.name + " State"]) {
						buyerInformationFields[index][item.name + " State"] = {};
					}
					if (!buyerInformationFields[index][item.name + " Zip Code"]) {
						buyerInformationFields[index][item.name + " Zip Code"] = {};
					}
					buyerInformationFields[index][item.name + " 1"]['error'] = !buyerInformationFields[index][item.name + " 1"].value;
					buyerInformationFields[index][item.name + " 2"]['error'] = !buyerInformationFields[index][item.name + " 2"].value;
					buyerInformationFields[index][item.name + " City"]['error'] = !buyerInformationFields[index][item.name + " City"].value;
					buyerInformationFields[index][item.name + " State"]['error'] = !buyerInformationFields[index][item.name + " State"].value;
					buyerInformationFields[index][item.name + " Zip Code"]['error'] = !buyerInformationFields[index][item.name + " Zip Code"].value;

				}
				else if (item.mandatory && !buyerInformationFields[index][item.name].value) {
					buyerInformationFields[index][item.name]['error'] = true;
				}
			});
			this.setState({
				errorBuyer: buyerInformationFields,
			});
		}
		if (ticketAttribute.buyerQuestions) {
			ticketAttribute.buyerQuestions.map((item, index) => {
				if (!buyerQuestions[index]) {
					buyerQuestions[index] = {};
				}
				if (!buyerQuestions[index][item.name]) {
					buyerQuestions[index][item.name] = {};
				}
				if (item.mandatory && item.name && /address/i.test(item.name)) {
					if (!buyerQuestions[index][item.name + " 1"]) {
						buyerQuestions[index][item.name + " 1"] = {};
					}
					if (!buyerQuestions[index][item.name + " 2"]) {
						buyerQuestions[index][item.name + " 2"] = {};
					}
					if (!buyerQuestions[index][item.name + " City"]) {
						buyerQuestions[index][item.name + " City"] = {};
					}
					if (!buyerQuestions[index][item.name + " State"]) {
						buyerQuestions[index][item.name + " State"] = {};
					}
					if (!buyerQuestions[index][item.name + " Zip Code"]) {
						buyerQuestions[index][item.name + " Zip Code"] = {};
					}
					buyerQuestions[index][item.name + " 1"]['error'] = !buyerQuestions[index][item.name + " 1"].value;
					buyerQuestions[index][item.name + " 2"]['error'] = !buyerQuestions[index][item.name + " 2"].value;
					buyerQuestions[index][item.name + " City"]['error'] = !buyerQuestions[index][item.name + " City"].value;
					buyerQuestions[index][item.name + " State"]['error'] = !buyerQuestions[index][item.name + " State"].value;
					buyerQuestions[index][item.name + " Zip Code"]['error'] = !buyerQuestions[index][item.name + " Zip Code"].value;

				}
				else if (item.mandatory && !buyerQuestions[index][item.name].value) {
					buyerQuestions[index][item.name]['error'] = true;
				}
			});
			this.setState({
				errorBuyerQuestions: buyerQuestions,
			});
		}
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
						if (field.mandatory && field.name && /address/i.test(field.name)) {
							if (!attendee[index][key][field.name + " 1"]) {
								attendee[index][key][field.name + " 1"]['error'] = {};
							}
							if (!attendee[index][key][field.name + " 2"]) {
								attendee[index][key][field.name + " 2"]['error'] = {};
							}
							if (!attendee[index][key][field.name + " City"]) {
								attendee[index][key][field.name + " City"]['error'] = {};
							}
							if (!attendee[index][key][field.name + " State"]) {
								attendee[index][key][field.name + " State"]['error'] = {};
							}
							if (!attendee[index][key][field.name + " Zip Code"]) {
								attendee[index][key][field.name + " Zip Code"]['error'] = {};
							}
							attendee[index][key][field.name + " 1"]['error'] = !attendee[index][key][field.name + " 1"].value;
							attendee[index][key][field.name + " 2"]['error'] = !attendee[index][key][field.name + " 2"].value;
							attendee[index][key][field.name + " City"]['error'] = !attendee[index][key][field.name + " City"].value;
							attendee[index][key][field.name + " State"]['error'] = !attendee[index][key][field.name + " State"].value;
							attendee[index][key][field.name + " Zip Code"]['error'] = !attendee[index][key][field.name + " Zip Code"].value;
						}
						else if (field.mandatory && !attendee[index][key][field.name].value) {
							attendee[index][key][field.name]['error'] = true;
						}
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
					})
				}

			});
			this.setState({
				errorAttendee: attendee,
			});
		}

		setTimeout(() => {
			let emailIndex = _.findIndex(this.props.orderData.ticketAttribute.buyerInformationFields, function (item) {
				return item.type === 'email';
			});
			// validData = document.getElementsByClassName("has-error").length === 0;
			this.isValidFormData();
			if (validData && this.state.buyer_email.value && this.state.buyer_name.value) {
				if (!this.props.authenticated) {
					let requestData;
					if (emailIndex > -1 && buyerInformationFields[emailIndex] && buyerInformationFields[emailIndex]['Email'] && buyerInformationFields[emailIndex]['Email'].error === false) {
						let Email = buyerInformationFields[emailIndex]['Email'];
						requestData = {
							email: buyerInformationFields[emailIndex]['Email'].value,
							password: this.password && this.password.value
						};
						this.props.doSignUp(eventUrl, requestData).then(resp => {
							if (resp && !resp.errorCode) {
								this.doCheckout(ticketAttribute, orderData);
							}
							else {
								this.setState({
									showFormError: true,
									formError: resp.errorMessage,
                  loading: false,
								});
							}
						}).catch(error => {
							this.setState({
								showFormError: true,
								formError: "Oops! Error while processing"
							});

						})
					}
					else {
						this.setState({
							showFormError: true,
							formError: "Invalid Email Address"
						});
					}

				}
				else {
					this.doCheckout(ticketAttribute, orderData);
				}
			}
			else {
				/*debugger;
				this.setState({
					showFormError: true,
					formError: "Invalid Data"
				});*/
				this.setState({loading: false,});
			}

		}, 100);

		return false;
	};
	doCheckout = (ticketAttribute, orderData) => {
		if (
			this.cardNumber.value &&
			this.cardExpMonth.value &&
			this.cardExpYear.value &&
			this.cardExpMonth.value &&
			this.cardCVV.value) {
			this.props.createCardToken(this.props.eventData && this.props.eventData.stripeKey, this.cardNumber.value, this.cardExpMonth.value, this.cardExpYear.value, this.cardCVV.value).then(resp => {
				if (resp && resp.data && resp.data.id) {
					let request = {
						"clientDate": moment().format('DD/MM/YYYY hh:mm:ss'),
						"hasholderattributes": ticketAttribute.hasHolderAttributes,
						"purchaser": {},
						"stripeToken": resp.data.id
					};

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
					request.holder = [
						{
							"attributes": holder,
							"questions": holderQuestions,
							"tableid": 0,
							"tickettypeid": 0
						}
					];

					if (ticketAttribute) {
						/*if (ticketAttribute.buyerQuestions) {
							request.purchaser.questions = [];
						}*/
						if (ticketAttribute.buyerQuestions) {
							let index = _.find(ticketAttribute.buyerQuestions, function (item) {
								return item.type === 'email';
							});
							request.purchaser.attributes = [];
							if (index > -1) {
								request.purchaser.attributes = request.purchaser.attributes.concat({
									"Email": orderData && orderData.purchaserDetail && orderData.purchaserDetail.email
								})
							}
							let  infoFields = request.purchaser.attributes;
							let buyerQuestionsArray = Object.keys(buyerQuestions).map(function(k) { return buyerQuestions[k] });
							if (buyerQuestionsArray) {
								buyerQuestionsArray.map((item, itemKey) => {
									let keys = _.keys(item);
									keys.map(keyItem => {
										if (item[keyItem].key) {
											infoFields.push({
												key: item[keyItem].key,
												value: item[keyItem].value,
											})
										}
									})
								})
							}
							request.purchaser.questions = infoFields;

						}
						if (ticketAttribute.buyerInformationFields) {
							let index = _.find(ticketAttribute.buyerInformationFields, function (item) {
								return item.type === 'email';
							});
							request.purchaser.attributes = [];
							if (index > -1) {
								request.purchaser.attributes = request.purchaser.attributes.concat({
									// "Email": orderData && orderData.purchaserDetail && orderData.purchaserDetail.email
									"Email" : this.state.buyer_email && this.state.buyer_email.value
								})
							}
							let  infoFields = request.purchaser.attributes;
							let buyerInformationFieldsArray = Object.keys(buyerInformationFields).map(function(k) { return buyerInformationFields[k] });
							if (buyerInformationFieldsArray) {
								buyerInformationFieldsArray.map((item, itemKey) => {
									let keys = _.keys(item);
									keys.map(keyItem => {
										if (item[keyItem].key) {
											infoFields.push({
												key: item[keyItem].key,
												value: item[keyItem].value,
											})
										}
									})
								})
							}
							request.purchaser.attributes = infoFields;

						}
					}
					let eventUrl = this.props.eventUrl;
					let orderId = this.props.orderId;
					this.props.orderTicket(eventUrl, orderId, request).then(resp => {
						if (resp && resp.data && resp.data.message === 'Success') {
							this.showTicketPurchaseSuccessPopup();
						}
						else {
							this.setState({
								showFormError: true,
								formError: "Oops! Error while checkout"
							});
						}
					}).catch(error => {
						let respError = error && error.response && error.response.data && error.response.data.errorMessage;
						this.setState({
							showFormError: true,
							formError: respError || "Oops! Error while checkout"
						});
					})

				}
				else {
					/*this.setState({
						showFormError: true,
						formError: "Invalid"
					});*/

				}

			}).catch((error, status, msg) => {
				let respError = error && error.response && error.response.data && error.response.data.error && error.response.data.error;
				if (respError) {
					if (respError.param === 'exp_year') {
						this.setState({
							cardExpYear: false,
						});
					}
					if (respError.param === 'exp_month') {
						this.setState({
							cardExpMonth: false,
						});
					}
					if (respError.param === 'number') {
						this.setState({
							cardNumber: false,
						});
					}
				}
				this.setState({
					showFormError: true,
					formError: (respError && respError.message) || "Invalid Data"
				});
				// alert('Opps! Error while getting card token ');
			})
		}
	};
	ticketTimeOut = () => {
		this.setState({isTimeout: true});
		if(this.props.setOrderExpierd){
			this.props.setOrderExpierd(true);
		}
	};
	validateEmail = (email) => {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	phoneNumberValidateHandler(isValid, value, name, countryData, number, ext, field, key, itemKey, event) {
		let object = attendee || {};
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
		event = document.getElementById(field.name + key + itemKey);
		if (field.mandatory) {
			if (!value) {
				object[key][itemKey][field.name]['error'] = true;
				event.parentElement.classList.add('has-error');
				event.parentElement.classList.remove('has-success');
			}
			else {
				object[key][itemKey][field.name]['error'] = false;
			}
		}
		event.parentElement.classList.add('has-feedback');
		if (value && field && field.type === 'email') {
			object[key][itemKey][field.name]['error'] = !this.validateEmail(value);
			if (this.validateEmail(value)) {
				event.parentElement.classList.remove('has-error');
				event.parentElement.classList.add('has-success');
			}
			else {
				event.parentElement.classList.add('has-error');
				event.parentElement.classList.remove('has-success');
			}
		}
		else if (value && event.parentElement) {
			event.parentElement.classList.add('has-success');
			event.parentElement.classList.remove('has-error');
		}
    this.props.doValidateMobileNumber(name.dialCode+''+value).then(resp => {
      if(resp)
      {object[key][field.name]['error'] = true;
        event.parentElement.classList.add('has-error');
        event.parentElement.classList.remove('has-success');
      }else
      { event.parentElement.classList.remove('has-error');
        event.parentElement.classList.add('has-success');
      }
    });
		attendee = object;
		// this.isValidFormData();
	};

	buyerPhoneNumberValidateHandler(isValid, value, name, countryData, number, ext, field, key, event) {
		let object = buyerInformationFields || {};
		if (!object[key]) {
			object[key] = [];
		}
		if (!object[key][field.name]) {
			object[key][field.name] = {};
		}
		object[key][field.name] = {
			"key": field.name,
			"value": value
		};
		event = document.getElementById(field.name + key);
		if (field.mandatory) {
			if (!value) {
				object[key][field.name]['error'] = true;
				event.parentElement.classList.add('has-error');
				event.parentElement.classList.remove('has-success');
			}
			else {
				object[key][field.name]['error'] = false;
			}
		}
		event.parentElement.classList.add('has-feedback');
		if (value && field && field.type === 'email') {
			object[key][field.name]['error'] = !this.validateEmail(value);
			if (this.validateEmail(value)) {
				event.parentElement.classList.remove('has-error');
				event.parentElement.classList.add('has-success');
			}
			else {
				event.parentElement.classList.add('has-error');
				event.parentElement.classList.remove('has-success');
			}
		}
		else if (value && event.parentElement) {
			event.parentElement.classList.add('has-success');
			event.parentElement.classList.remove('has-error');
		}
       this.props.doValidateMobileNumber(countryData).then(resp => {
			if(resp)
			 {object[key][field.name]['error'] = true;
         event.parentElement.classList.add('has-error');
         event.parentElement.classList.remove('has-success');
			 }else
			 { event.parentElement.classList.remove('has-error');
         event.parentElement.classList.add('has-success');
			 }
    });
		buyerInformationFields = object;
		// this.isValidFormData();
	};
	buyerQuestionsPhoneNumberValidateHandler(isValid, value, name, countryData, number, ext, field, key, event) {
		let object = buyerQuestions || {};
		if (!object[key]) {
			object[key] = [];
		}
		if (!object[key][field.name]) {
			object[key][field.name] = {};
		}
		object[key][field.name] = {
			"key": field.name,
			"value": value
		};
		event = document.getElementById(field.name + key);
		if (field.mandatory) {
			if (!value) {
				object[key][field.name]['error'] = true;
				event.parentElement.classList.add('has-error');
				event.parentElement.classList.remove('has-success');
			}
			else {
				object[key][field.name]['error'] = false;
			}
		}
		event.parentElement.classList.add('has-feedback');
		if (value && field && field.type === 'email') {
			object[key][field.name]['error'] = !this.validateEmail(value);
			if (this.validateEmail(value)) {
				event.parentElement.classList.remove('has-error');
				event.parentElement.classList.add('has-success');
			}
			else {
				event.parentElement.classList.add('has-error');
				event.parentElement.classList.remove('has-success');
			}
		}
		else if (value && event.parentElement) {
			event.parentElement.classList.add('has-success');
			event.parentElement.classList.remove('has-error');
		}
    this.props.doValidateMobileNumber(name.dialCode+''+value).then(resp => {
			if(resp)
			 {object[key][field.name]['error'] = true;
         event.parentElement.classList.add('has-error');
         event.parentElement.classList.remove('has-success');
			 }else
			 { event.parentElement.classList.remove('has-error');
         event.parentElement.classList.add('has-success');
			 }
    });
    buyerQuestions = object;
		// this.isValidFormData();
	};

	setAttendeesAddressValue = (field, name, key, itemKey, event) => {
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
		if (!object[key][itemKey][name]) {
			object[key][itemKey][name] = {};
		}
		object[key][itemKey][name] = {
			"key": name,
			"value": value
		};
		if (field.mandatory) {
			if (!event.target.value) {
				object[key][itemKey][name]['error'] = true;
				event.target.parentElement.classList.add('has-error');
				event.target.parentElement.classList.remove('has-success');
			}
			else {
				object[key][itemKey][name]['error'] = false;
			}
		}
		event.target.parentElement.classList.add('has-feedback');
		if (value && field && field.type === 'email') {
			object[key][itemKey][name]['error'] = !this.validateEmail(value);
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
		// this.isValidFormData();
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
		// this.isValidFormData();
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
		// this.isValidFormData();
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
		buyerInformationFields = object;
		// this.isValidFormData();

	};
	buyerQuestionsInformationFieldsHandler = (field, key, event) => {
		let object = buyerQuestions || {};
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
		buyerQuestions = object;
		// this.isValidFormData();

	};
	setBuyerAddressValue = (field, name, key, event) => {
		//If the input fields were directly within this
		//this component, we could use this.refs.[FIELD].value
		//Instead, we want to save the data for when the form is submitted
		let object = buyerInformationFields || {};
		let value = event.target.value;
		if (!object[key]) {
			object[key] = [];
		}
		if (!object[key][name]) {
			object[key][name] = {};
		}
		object[key][name] = {
			"key": name,
			"value": value
		};
		if (field.mandatory) {
			if (!event.target.value) {
				object[key][name]['error'] = true;
				event.target.parentElement.classList.add('has-error');
				event.target.parentElement.classList.remove('has-success');
			}
			else {
				object[key][name]['error'] = false;
			}
		}
		event.target.parentElement.classList.add('has-feedback');
		if (value && field && field.type === 'email') {
			object[key][name]['error'] = !this.validateEmail(value);
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
		buyerInformationFields = object;
		// this.isValidFormData();
	};
	setBuyerQuestionAddressValue = (field, name, key, event) => {
		//If the input fields were directly within this
		//this component, we could use this.refs.[FIELD].value
		//Instead, we want to save the data for when the form is submitted
		let object = buyerQuestions || {};
		let value = event.target.value;
		if (!object[key]) {
			object[key] = [];
		}
		if (!object[key][name]) {
			object[key][name] = {};
		}
		object[key][name] = {
			"key": name,
			"value": value
		};
		if (field.mandatory) {
			if (!event.target.value) {
				object[key][name]['error'] = true;
				event.target.parentElement.classList.add('has-error');
				event.target.parentElement.classList.remove('has-success');
			}
			else {
				object[key][name]['error'] = false;
			}
		}
		event.target.parentElement.classList.add('has-feedback');
		if (value && field && field.type === 'email') {
			object[key][name]['error'] = !this.validateEmail(value);
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
		buyerQuestions = object;
		// this.isValidFormData();
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
	getDiscount = (e) => {
		let eventUrl = this.props.eventUrl;
		let orderId = this.props.orderId;
		this.props.couponCode(eventUrl, orderId, this.state.coupon).then(resp => {
			if (resp && !resp.errorMessage) {
				this.setState({
					popupAlertHeader: "Success",
					showMapPopup: true,
					errorMsg: 'Coupon Applied Successfully',
					totalPrice: resp.totalPrice,
					discount: resp.discountAmount,
				})
			}
			else {
				this.setState({
					popupAlertHeader: "Error",
					showMapPopup: true,
					errorMsg: resp.errorMessage
				})
			}
		})
	};
	showMapPopup = (e) => {
		e.preventDefault();
		this.setState({
			showMapPopup: true,
      loading: false,
		})
	};
	hideMapPopup = () => {
		this.setState({
			showMapPopup: false,
      loading: false,
		})
	};
	hideSuccessAlertPopup = () => {
		this.setState({
			ticketPurchaseSuccessPopup: false,
      loading: false,
		});
		if(this.props.isVoluneer){
			history.push('/events/' + eventUrl + '/volunteer');
		}
		else {
			history.push('/events/' + eventUrl)
		}
	};
	getSelectOptions = (itemValue) => {
		if (!itemValue || !itemValue.length) {
			return [];
		}
		let itemValueString = itemValue.toString();
		let splitedValue;
		try {
			splitedValue = itemValueString.split('</dafultvalue><dafultvalue>').join("],[").split('<dafultvalues>').join('[').split('<dafultvalue>').join('[').split('</dafultvalue>').join(']').split('</dafultvalues>').join(']').split('<label>').join('"').split('</label>').join('"').split('<value>').join(',"').split('</value>').join('"');
			if (splitedValue) return JSON.parse(splitedValue);
			else return [];
		} catch (err) {
			if (splitedValue) return JSON.parse(splitedValue);
			else return [];
		}
	};
	hideFormErrorPopup = () => {
		this.setState({
			showFormError: false,
      loading: false,
		});
	};
  numberOnly(e) {
    const re = /[/0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

	render() {
		return (
			(this.state.isLoaded) ?
				(!this.state.isTimeout) ?
					<div>
						<div className={( this.props.isVoluneer ? "col-md-12" : "col-lg-9 col-md-8 col-sm-8 ")}>
							<div className={( this.props.isVoluneer && "main-box", " clearfix" )}>
								<Timer
									className="time-left"
									time={this.props.orderData && this.props.orderData.ticketAttribute && this.props.orderData.ticketAttribute.remainingSeconds}
									onEnd={this.ticketTimeOut}/>
								<form className="validated fv-form fv-form-bootstrap" noValidate="novalidate"
											onSubmit={this.ticketCheckout}>
									<div className="row">
										<div className={( this.props.isVoluneer ? "col-md-12" : "col-md-10 col-md-offset-1")}>
										{
											this.props.orderData && this.props.orderData.ticketAttribute && this.props.orderData.ticketAttribute.orderData && this.props.orderData.ticketAttribute.orderData.length && this.props.orderData.ticketAttribute.orderData.map((ticket, key) =>
											<div key={key} ><h3 className="type-name">{ticket.ticketTypeName}</h3>
											<div className="type-desc">{ticket.ticketTypeDescription}</div></div>
										)
									}

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
																		{this.props.currencySymbol}{parseFloat(item.price).toFixed(2)}
																	</td>
																	<td className="text-left ticket-amount-fee">
																		{this.props.currencySymbol}{  parseFloat(parseFloat(item.priceWithFee).toFixed(2) - parseFloat(item.price).toFixed(2)).toFixed(2)}
																	</td>
																	<td className="text-center">
																		<span className="qty">{item.numberofticket}</span>
																	</td>
																	<td width={1}>
																		{this.props.currencySymbol}{parseFloat(item.priceWithFee * item.numberofticket).toFixed(2)}
																	</td>
																</tr>
															)
															}
															{ this.state.discount && <tr className="total-price-tr">
																<td colSpan={4} className="text-right">
																	<strong>Discount:</strong>
																</td>
																<td colSpan={1}>
																	{this.props.currencySymbol}<span
																	className="total-price">{parseFloat(this.state.discount).toFixed(2)}</span>
																</td>
															</tr>}
															<tr className="total-price-tr">
																<td colSpan={4} className="text-right">
																	<strong>Order Total:</strong>
																</td>
																<td colSpan={1}>
																	{this.props.currencySymbol}<span
																	className="total-price">{ this.state.totalPrice ? this.state.totalPrice : parseFloat(this.props.orderData.ticketAttribute.totalPrice).toFixed(2)}</span>
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
													{ this.props.orderData && this.props.orderData.purchaserDetail &&


													<div className="buyerInformation">
														<div className="custom-attribute" key="full_name">
															<div className={cx("form-group mrg-t-md")}>
																<div className="row">
																	<div className="col-md-4 text-right">
																		<label className="text-right">Full Name
																		<span className="red">*</span></label>
																	</div>

																	<div className={cx("form-group col-md-6 ",
																		this.state.buyer_name && 'has-feedback',
																		this.state.buyer_name && this.state.buyer_name.error && 'has-error',
																		this.state.buyer_name && this.state.buyer_name.value && 'has-success'
																	)}>
																		<input
																			type="text"
																			className="form-control"
																			name="full_name"
																			placeholder="Full Name"
																			ref={ref => {
																				 this.name = ref;
																			 }}
																			onChange={this.nameChanged.bind(this)}
																			required="true"
																			defaultValue={this.state.buyer_name.value}
																		/> 
																	</div>

																</div>
															</div>
														</div>


														<div className="custom-attribute" key="email">
															<div className={cx("form-group mrg-t-md")}>
																<div className="row">
																	<div className="col-md-4 text-right">
																		<label className="text-right">Email
																		<span className="red">*</span></label>
																	</div>
																	<div className={cx("form-group col-md-6",
																			this.state.buyer_email && 'has-feedback',
																			this.state.buyer_email && this.state.buyer_email.error && 'has-error',
																			this.state.buyer_email && this.state.buyer_email.value && 'has-success'
																		)}>
																			<input
																				type="email"
																				className="form-control"
																				name="email"
																				ref={ref => {
																					 this.email = ref;
																				 }}
																				placeholder="Email"
																				onChange={this.emailChanged.bind(this)}
																				required="true"
																				defaultValue={this.state.buyer_email.value}
																			/> 
																	</div>
																</div>
															</div>
														</div>
													</div>}

													{ this.props.orderData && this.props.orderData.ticketAttribute &&
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
																			{!/address/i.test(item.name) && !/phone/i.test(item.name) ? <div
																				className={cx("col-md-6 text-left")}>
																				<div className={cx("form-group ",
																					this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name] && 'has-feedback',
																					this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name] && this.state.errorBuyer[key][item.name].error && 'has-error',
																					this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name] && this.state.errorBuyer[key][item.name].value && 'has-success'
																				)}>
																					{item.type !== 'dropdown' ?
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
																						/> : ""

																					}

																					{
																						item.type === 'dropdown' && item.value ?
																							<select className="form-control"
																											name={item.name}
																											placeholder={item.name}
																											onChange={this.buyerInformationFieldsHandler.bind(this, item, key)}
																											required={item.mandatory}>
																								<option value="">Please Select</option>
																								{
																									this.getSelectOptions(item.value).map((oitem, okey) =>
																										<option key={oitem[0]} value={oitem[0]}>{oitem[1]}
																										</option>
																									)
																								}
																							</select> : ""
																					}
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																					<small
																						className="help-block">{ "The " + item.name + " is invalid."}</small>
																				</div>
																			</div> : ""}
																			{ /phone/i.test(item.name) ? <div className="col-md-6 text-left">
																				<div className={cx("form-group",
																					this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name] && 'has-feedback',
																					this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name] && this.state.errorBuyer[key][item.name].error && 'has-error',
																					this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name] && this.state.errorBuyer[key][item.name].value && 'has-success'
																				)}>

																					<IntlTelInput
																						css={['intl-tel-input', 'form-control intl-tel']}
																						utilsScript="./libphonenumber.js"
																						fieldName={item.name}
																						fieldId={item.name + key}
																						separateDialCode
																						defaultCountry={this.props.country || ""}
																						placeholder={item.name}
																						value={item.value ||
																						(this.state.errorBuyer &&
																							this.state.errorBuyer[key] &&
																							this.state.errorBuyer[key][item.name] &&
																							this.state.errorBuyer[key][item.name].value
																						)
																						}
																						onPhoneNumberChange={(name, isValid, value, countryData, number, ext) => {
																							this.buyerPhoneNumberValidateHandler(name, isValid, value, countryData, number, ext, item, key, this)
																						}}
																						 onPhoneNumberBlur={(name, isValid, value, countryData, number, ext) => {
																						 	this.buyerPhoneNumberValidateHandler(name, isValid, value, countryData, number, ext, item, key, this)
																						}}
																					/>

																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																					<small
																						className="help-block">{ "The " + item.name + " is invalid."}</small>
																				</div>
																			</div> : ""}
																			{ /address/i.test(item.name) ? <div className="col-md-6 text-left">
																				<div className={cx("address-field")}>
																					<div className={cx("mrg-b-xs form-group",
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " 1"] && 'has-feedback',
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " 1"] && this.state.errorBuyer[key][item.name + " 1"].error && 'has-error',
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " 1"] && this.state.errorBuyer[key][item.name + " 1"].value && 'has-success'
																					)}>
																						<input data-attribute-type="text"
																									 type="text"
																									 className="form-control"
																									 placeholder="Address 1"
																									 name={item.name + " 1"}
																									 defaultValue={item.value ||
																									 (
																									 this.state.errorBuyer &&
																									 this.state.errorBuyer[key] &&
																									 this.state.errorBuyer[key][item.name] &&
																									 this.state.errorBuyer[key][item.name].value
																									 &&
																									 this.state.attendee[key][item.name + " 1"]) || (this.state.errorAttendee && this.state.errorAttendee[key] && this.state.errorAttendee[key][item.name + " 1"] && this.state.errorAttendee[key][item.name + " 1"].value
																									 )
																									 }
																									 required={ item.mandatory}
																									 onChange={this.setBuyerAddressValue.bind(this, item, item.name + " 1", key)}
																						/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																						<small
																							className="help-block">{ "The " + item.name + " 1 is invalid."}</small>
																					</div>
																					<div className={cx("mrg-b-xs form-group",
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " 2"] && 'has-feedback',
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " 2"] && this.state.errorBuyer[key][item.name + " 2"].error && 'has-error',
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " 2"] && this.state.errorBuyer[key][item.name + " 2"].value && 'has-success'
																					)}>
																						<input data-attribute-type="text"
																									 type="text"
																									 className="form-control"
																									 placeholder="Address 2"
																									 name={item.name + " 2"}
																									 defaultValue={item.value ||
																									 (this.state.errorBuyer &&
																										 this.state.errorBuyer[key] &&
																										 this.state.errorBuyer[key][item.name + " 2"] &&
																										 this.state.errorBuyer[key][item.name + " 2"].value
																									 )
																									 }
																									 onChange={this.setBuyerAddressValue.bind(this, item, item.name + " 2", key)}
																						/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																						<small
																							className="help-block">{ "The " + item.name + " 2 is invalid."}</small>
																					</div>
																					<div className={cx("mrg-b-xs form-group",
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " City"] && 'has-feedback',
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " City"] && this.state.errorBuyer[key][item.name + " City"].error && 'has-error',
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " City"] && this.state.errorBuyer[key][item.name + " City"].value && 'has-success'
																					)}>
																						<input data-attribute-type="text"
																									 type="text"
																									 className="form-control"
																									 placeholder="City"
																									 name={item.name + " City"}
																									 defaultValue={item.value ||
																									 (this.state.errorBuyer &&
																										 this.state.errorBuyer[key] &&
																										 this.state.errorBuyer[key][item.name + " City"] &&
																										 this.state.errorBuyer[key][item.name + " City"].value
																									 )
																									 }
																									 required={ item.mandatory}
																									 onChange={this.setBuyerAddressValue.bind(this, item, item.name + " City", key)}
																						/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																						<small
																							className="help-block">{ "The " + item.name + " City is invalid."}</small>
																					</div>
																					<div className={cx("mrg-b-xs form-group",
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " State"] && 'has-feedback',
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " State"] && this.state.errorBuyer[key][item.name + " State"].error && 'has-error',
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " State"] && this.state.errorBuyer[key][item.name + " State"].value && 'has-success'
																					)}>
																						<select className="form-control" required={ item.mandatory}
																										name={item.name + " State"}
																										onChange={this.setBuyerAddressValue.bind(this, item, item.name + " State", key)}
																						>
																							<option value="">State</option>
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
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																						<small
																							className="help-block">{ "The " + item.name + " State is invalid."}</small>
																					</div>
																					<div className={cx("mrg-b-xs form-group",
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " Zip Code"] && 'has-feedback',
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " Zip Code"] && this.state.errorBuyer[key][item.name + " Zip Code"].error && 'has-error',
																						this.state.errorBuyer && this.state.errorBuyer[key] && this.state.errorBuyer[key][item.name + " Zip Code"] && this.state.errorBuyer[key][item.name + " Zip Code"].value && 'has-success'
																					)}>
																						<input type="number"
																									 className="form-control"
																									 placeholder="Zip Code"
																									 name={item.name + " Zip Code"}
																									 defaultValue={item.value ||
																									 (this.state.errorBuyer &&
																										 this.state.errorBuyer[key] &&
																										 this.state.errorBuyer[key][item.name + " Zip Code"] &&
																										 this.state.errorBuyer[key][item.name + " Zip Code"].value
																									 )
																									 }
																									 required={ item.mandatory}
																									 onChange={this.setBuyerAddressValue.bind(this, item, item.name + " Zip Code", key)}
																						/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																						<small
																							className="help-block">{ "The " + item.name + " Zip Code is invalid."}</small>
																					</div>
																				</div>
																			</div> : ""}
																		</div>
																	</div>
																</div>)
														}
														{  _.find(this.props.orderData.ticketAttribute.buyerInformationFields, function (item) {
															return item.type === 'email';
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

													{ this.props.orderData && this.props.orderData.ticketAttribute &&
													this.props.orderData.ticketAttribute.buyerQuestions && this.props.orderData.ticketAttribute.buyerQuestions.length &&
													<div className="buyerQuestion">
														{
															this.props.orderData.ticketAttribute.buyerQuestions.map((item, key) =>
																<div className="custom-attribute" key={item.name}>
																	<div className={cx("form-group mrg-t-md")}>
																		<div className="row">
																			<div className="col-md-4 text-right">
																				<label className="text-right">{item.name} { item.mandatory &&
																				<span className="red">*</span>}</label>
																			</div>
																			{!/address/i.test(item.name) && !/phone/i.test(item.name) ? <div
																				className={cx("col-md-6 text-left")}>
																				<div className={cx("form-group ",
																					this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name] && 'has-feedback',
																					this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name] && this.state.errorBuyerQuestions[key][item.name].error && 'has-error',
																					this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name] && this.state.errorBuyerQuestions[key][item.name].value && 'has-success'
																				)}>
																					{item.type !== 'dropdown' ?
																						<input
																							type={item.type}
																							className="form-control"
																							name={item.mandatory}
																							placeholder={item.name}
																							onChange={this.buyerQuestionsInformationFieldsHandler.bind(this, item, key)}
																							required={item.mandatory}
																							defaultValue={item.value ||
																							(
																								this.state.errorBuyerQuestions &&
																								this.state.errorBuyerQuestions[key] &&
																								this.state.errorBuyerQuestions[key][item.name] &&
																								this.state.errorBuyerQuestions[key][item.name].value
																							)
																							}
																						/> : ""

																					}

																					{
																						item.type === 'dropdown' && item.value ?
																							<select className="form-control"
																											name={item.name}
																											placeholder={item.name}
																											onChange={this.buyerQuestionsInformationFieldsHandler.bind(this, item, key)}
																											required={item.mandatory}>
																								<option value="">Please Select</option>
																								{
																									this.getSelectOptions(item.value).map((oitem, okey) =>
																										<option key={oitem[0]} value={oitem[0]}>{oitem[1]}
																										</option>
																									)
																								}
																							</select> : ""
																					}
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																					<small
																						className="help-block">{ "The " + item.name + " is invalid."}</small>
																				</div>
																			</div> : ""}
																			{ /phone/i.test(item.name) ? <div className="col-md-6 text-left">
																				<div className={cx("form-group",
																					this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name] && 'has-feedback',
																					this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name] && this.state.errorBuyerQuestions[key][item.name].error && 'has-error',
																					this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name] && this.state.errorBuyerQuestions[key][item.name].value && 'has-success'
																				)}>

																					<IntlTelInput
																						css={['intl-tel-input', 'form-control intl-tel']}
																						utilsScript="./libphonenumber.js"
																						fieldName={item.name}
																						fieldId={item.name + key}
																						separateDialCode
																						defaultCountry={this.props.country || ""}
																						placeholder={item.name}
																						value={item.value ||
																						(this.state.errorBuyerQuestions &&
																							this.state.errorBuyerQuestions[key] &&
																							this.state.errorBuyerQuestions[key][item.name] &&
																							this.state.errorBuyerQuestions[key][item.name].value
																						)
																						}
																						onPhoneNumberChange={(name, isValid, value, countryData, number, ext) => {
																							this.buyerQuestionsPhoneNumberValidateHandler(name, isValid, value, countryData, number, ext, item, key, this)
																						}}
																						onPhoneNumberBlur={(name, isValid, value, countryData, number, ext) => {
																							this.buyerPhoneNumberValidateHandler(name, isValid, value, countryData, number, ext, item, key, this)
																						 }}
																					/>

																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																					<i
																						className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																					<small
																						className="help-block">{ "The " + item.name + " is invalid."}</small>
																				</div>
																			</div> : ""}
																			{ /address/i.test(item.name) ? <div className="col-md-6 text-left">
																				<div className={cx("address-field")}>
																					<div className={cx("mrg-b-xs form-group",
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " 1"] && 'has-feedback',
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " 1"] && this.state.errorBuyerQuestions[key][item.name + " 1"].error && 'has-error',
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " 1"] && this.state.errorBuyerQuestions[key][item.name + " 1"].value && 'has-success'
																					)}>
																						<input data-attribute-type="text"
																									 type="text"
																									 className="form-control"
																									 placeholder="Address 1"
																									 name={item.name + " 1"}
																									 defaultValue={item.value ||
																									 (
																									 this.state.errorBuyerQuestions &&
																									 this.state.errorBuyerQuestions[key] &&
																									 this.state.errorBuyerQuestions[key][item.name] &&
																									 this.state.errorBuyerQuestions[key][item.name].value
																									 &&
																									 this.state.buyerQuestions[key][item.name + " 1"]) || (this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " 1"] && this.state.errorBuyerQuestions[key][item.name + " 1"].value
																									 )
																									 }
																									 required={ item.mandatory}
																									 onChange={this.setBuyerQuestionAddressValue.bind(this, item, item.name + " 1", key)}
																						/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																						<small
																							className="help-block">{ "The " + item.name + " 1 is invalid."}</small>
																					</div>
																					<div className={cx("mrg-b-xs form-group",
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " 2"] && 'has-feedback',
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " 2"] && this.state.errorBuyerQuestions[key][item.name + " 2"].error && 'has-error',
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " 2"] && this.state.errorBuyerQuestions[key][item.name + " 2"].value && 'has-success'
																					)}>
																						<input data-attribute-type="text"
																									 type="text"
																									 className="form-control"
																									 placeholder="Address 2"
																									 name={item.name + " 2"}
																									 defaultValue={item.value ||
																									 (this.state.errorBuyerQuestions &&
																										 this.state.errorBuyerQuestions[key] &&
																										 this.state.errorBuyerQuestions[key][item.name + " 2"] &&
																										 this.state.errorBuyerQuestions[key][item.name + " 2"].value
																									 )
																									 }
																									 onChange={this.setBuyerQuestionAddressValue.bind(this, item, item.name + " 2", key)}
																						/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																						<small
																							className="help-block">{ "The " + item.name + " 2 is invalid."}</small>
																					</div>
																					<div className={cx("mrg-b-xs form-group",
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " City"] && 'has-feedback',
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " City"] && this.state.errorBuyerQuestions[key][item.name + " City"].error && 'has-error',
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " City"] && this.state.errorBuyerQuestions[key][item.name + " City"].value && 'has-success'
																					)}>
																						<input data-attribute-type="text"
																									 type="text"
																									 className="form-control"
																									 placeholder="City"
																									 name={item.name + " City"}
																									 defaultValue={item.value ||
																									 (this.state.errorBuyerQuestions &&
																										 this.state.errorBuyerQuestions[key] &&
																										 this.state.errorBuyerQuestions[key][item.name + " City"] &&
																										 this.state.errorBuyerQuestions[key][item.name + " City"].value
																									 )
																									 }
																									 required={ item.mandatory}
																									 onChange={this.setBuyerQuestionAddressValue.bind(this, item, item.name + " City", key)}
																						/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																						<small
																							className="help-block">{ "The " + item.name + " City is invalid."}</small>
																					</div>
																					<div className={cx("mrg-b-xs form-group",
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " State"] && 'has-feedback',
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " State"] && this.state.errorBuyerQuestions[key][item.name + " State"].error && 'has-error',
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " State"] && this.state.errorBuyerQuestions[key][item.name + " State"].value && 'has-success'
																					)}>
																						<select className="form-control" required={ item.mandatory}
																										name={item.name + " State"}
																										onChange={this.setBuyerAddressValue.bind(this, item, item.name + " State", key)}
																						>
																							<option value="">State</option>
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
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																						<small
																							className="help-block">{ "The " + item.name + " State is invalid."}</small>
																					</div>
																					<div className={cx("mrg-b-xs form-group",
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " Zip Code"] && 'has-feedback',
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " Zip Code"] && this.state.errorBuyerQuestions[key][item.name + " Zip Code"].error && 'has-error',
																						this.state.errorBuyerQuestions && this.state.errorBuyerQuestions[key] && this.state.errorBuyerQuestions[key][item.name + " Zip Code"] && this.state.errorBuyerQuestions[key][item.name + " Zip Code"].value && 'has-success'
																					)}>
																						<input type="number"
																									 className="form-control"
																									 placeholder="Zip Code"
																									 name={item.name + " Zip Code"}
																									 defaultValue={item.value ||
																									 (this.state.errorBuyerQuestions &&
																										 this.state.errorBuyerQuestions[key] &&
																										 this.state.errorBuyerQuestions[key][item.name + " Zip Code"] &&
																										 this.state.errorBuyerQuestions[key][item.name + " Zip Code"].value
																									 )
																									 }
																									 required={ item.mandatory}
																									 onChange={this.setBuyerQuestionAddressValue.bind(this, item, item.name + " Zip Code", key)}
																						/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																						<i
																							className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																						<small
																							className="help-block">{ "The " + item.name + " Zip Code is invalid."}</small>
																					</div>
																				</div>
																			</div> : ""}
																		</div>
																	</div>
																</div>)
														}
													</div> }
													{ this.props.orderData && this.props.orderData.discountCoupon &&
													<div className="form-group mrg-t-md">
														<div className="row">
															<div className="col-md-4 text-right">
																<label className="text-right"><strong>Discount Coupon: </strong></label>
															</div>
															<div className="col-md-4 text-left">
																<input type="text" className="form-control" name="discountcoupon"
																			 id="discountcoupon"
																			 placeholder="Discount coupon"
																			 ref={ref => {
																				 this.coupon = ref;
																			 }}
																			 onChange={this.couponValidateHandler}
																/>
															</div>
															<div className="col-md-2">
																			<span className="input-group-btn">
																				<button type="button" className="btn btn-primary" id="discoupon"
																								onClick={this.getDiscount}>Apply</button>
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
																								 onKeyUp={this.cardHolderNameValidateHandler}
																								 onChange={this.cardHolderNameDownValidateHandler}
																								 onBlur={this.cardHolderNameBlurValidateHandler}/>
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
                                                 onKeyPress={(e) => this.numberOnly(e)}
																								 onKeyUp={this.cardNumberValidateHandler}
																								 onChange={this.cardNumberValidateHandler}
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
																		(((this.state.cardExpYear && this.state.cardExpMonth) || this.state.isFormSubmited) && ((this.state.cardExpYear && this.state.cardExpMonth)) && !this.state.isInvalidDate) && 'has-success',
																		(((this.state.cardExpYear && this.state.cardExpMonth) || this.state.isFormSubmited) && (!(this.state.cardExpYear && this.state.cardExpMonth)) || this.state.isInvalidDate) && 'has-error')
																	}>
																		<div className="row">
																			<div className="col-md-4 text-right">
																				<label className="">Expiration Date</label>
																			</div>
																			<div className={cx("col-md-8 text-left")}>
																				<div className={cx("input-group",
																					((this.state.cardExpYear && this.state.cardExpMonth) || this.state.isFormSubmited) && 'has-feedback',
																					(((this.state.cardExpYear && this.state.cardExpMonth) || this.state.isFormSubmited) && ((this.state.cardExpYear && this.state.cardExpMonth)) && !this.state.isInvalidDate) && 'has-success',
																					(((this.state.cardExpYear && this.state.cardExpMonth) || this.state.isFormSubmited) && (!(this.state.cardExpYear && this.state.cardExpMonth)) || this.state.isInvalidDate) && 'has-error')
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
																						<option value={1}>Jan (01)</option>
																						<option value={2}>Feb (02)</option>
																						<option value={3}>Mar (03)</option>
																						<option value={4}>Apr (04)</option>
																						<option value={5}>May (05)</option>
																						<option value={6}>Jun (06)</option>
																						<option value={7}>Jul (07)</option>
																						<option value={8}>Aug (08)</option>
																						<option value={9}>Sep (09)</option>F
																						<option value={10}>Oct (10)</option>
																						<option value={11}>Nov (11)</option>
																						<option value={12}>Dec (12)</option>

																					</select>
																					<select className data-stripe="exp_year" id="exp-year"
																									data-fv-field="expYear"
																									ref={ref => {
																										this.cardExpYear = ref;
																									}}
																									onChange={this.cardExpYearValidateHandler}SSS																					>
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
                                                 onKeyPress={(e) => this.numberOnly(e)}
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
																				<input  className="form-control" size={6}
																							 data-stripe="address_zip" name="address_zip"
																							 data-fv-field="address_zip" ref={ref => {
																					this.address_zip = ref;
																				}}  onKeyDown={this.addressZipValidateHandler}/>
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
																						{!/address/i.test(attrib.name) && !/phone/i.test(attrib.name) ?
																							<div className="col-md-6 text-left">
																								<div className={cx("form-group",
																									this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name] && (this.state.errorAttendee[itemKey][key][attrib.name].key || this.state.errorAttendee[itemKey][key][attrib.name].error) && 'has-feedback',
																									this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name] && this.state.errorAttendee[itemKey][key][attrib.name].error && 'has-error',
																									this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name] && this.state.errorAttendee[itemKey][key][attrib.name].value && 'has-success',
																								)}>
																									{attrib.type !== 'dropdown' ?
																										<input type="text"
																													 placeholder={attrib.name}
																													 className="form-control"
																													 name={attrib.name}
																													 required={ attrib.mandatory}
																													 defaultValue={attrib.value ||
																													 (this.state.attendee &&
																													 this.state.attendee[itemKey] &&
																													 this.state.attendee[itemKey][key] &&
																													 this.state.attendee[itemKey][key][attrib.name]) || (this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name] && this.state.errorAttendee[itemKey][key][attrib.name].value
																													 )
																													 }
																													 onChange={this.setAttendeesValue.bind(this, attrib, itemKey, key)}

																										/> : ""
																									}

																									{
																										attrib.type === 'dropdown' && attrib.value ?
																											<select className="form-control"
																															name={attrib.name}
																															placeholder={attrib.name}
																															onChange={this.setAttendeesValue.bind(this, attrib, itemKey, key)}
																															required={attrib.mandatory}>
																												<option value="">Please Select</option>
																												{
																													this.getSelectOptions(attrib.value).map((oitem, okey) =>
																														<option key={oitem[0]} value={oitem[0]}>{oitem[1]}
																														</option>
																													)
																												}
																											</select> : ""
																									}

																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																									<small
																										className="help-block">{ "The " + attrib.name + " is invalid."}</small>
																								</div>
																							</div> : ""}
																						{/phone/i.test(attrib.name) ? <div className="col-md-6 text-left">
																							<div className={cx("form-group",
																								this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name] && (this.state.errorAttendee[itemKey][key][attrib.name].key || this.state.errorAttendee[itemKey][key][attrib.name].error) && 'has-feedback',
																								this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name] && this.state.errorAttendee[itemKey][key][attrib.name].error && 'has-error',
																								this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name] && this.state.errorAttendee[itemKey][key][attrib.name].value && 'has-success',
																							)}>

																								<IntlTelInput
																									css={['intl-tel-input', 'form-control intl-tel']}
																									utilsScript="./libphonenumber.js"
																									fieldName={attrib.name}
																									fieldId={attrib.name + itemKey + key}
																									separateDialCode
																									defaultCountry={this.props.country || ""}
																									placeholder={attrib.name}
																									value={attrib.value ||
																									(this.state.attendee &&
																									this.state.attendee[itemKey] &&
																									this.state.attendee[itemKey][key] &&
																									this.state.attendee[itemKey][key][attrib.name]) || (
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name] && this.state.errorAttendee[itemKey][key][attrib.name].value
																									)
																									}
																									onPhoneNumberChange={(name, isValid, value, countryData, number, ext) => {
																										this.phoneNumberValidateHandler(name, isValid, value, countryData, number, ext, attrib, itemKey, key, this)
																									}}
																									onPhoneNumberBlur={(name, isValid, value, countryData, number, ext) => {
																										this.phoneNumberValidateHandler(name, isValid, value, countryData, number, ext, attrib, itemKey, key, this)
																									}}
																								/>


																								<i
																									className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																								<i
																									className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																								<small
																									className="help-block">{ "The " + attrib.name + " is invalid."}</small>
																							</div>
																						</div> : ""}
																						{ /address/i.test(attrib.name) ? <div className="col-md-6 text-left">
																							<div className="address-field">
																								<div
																									className={cx("mrg-b-xs form-group",
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " 1"] && (this.state.errorAttendee[itemKey][key][attrib.name + " 1"].key || this.state.errorAttendee[itemKey][key][attrib.name + " 1"].error) && 'has-feedback',
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " 1"] && this.state.errorAttendee[itemKey][key][attrib.name + " 1"].error && 'has-error',
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " 1"] && this.state.errorAttendee[itemKey][key][attrib.name + " 1"].value && 'has-success',
																									)}>
																									<input data-attribute-type="text"
																												 type="text"
																												 className="form-control"
																												 placeholder="Address 1"
																												 name={attrib.name + " 1"}
																												 defaultValue={attrib.value ||
																												 (this.state.attendee &&
																												 this.state.attendee[itemKey] &&
																												 this.state.attendee[itemKey][key] &&
																												 this.state.attendee[itemKey][key][attrib.name + " 1"]) || (this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " 1"] && this.state.errorAttendee[itemKey][key][attrib.name + " 1"].value
																												 )
																												 }
																												 required={ attrib.mandatory}
																												 onChange={this.setAttendeesAddressValue.bind(this, attrib, attrib.name + " 1", itemKey, key)}
																									/>
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																									<small
																										className="help-block">{ "The " + attrib.name + " 1 is invalid."}</small>
																								</div>
																								<div
																									className={cx("mrg-b-xs form-group",
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " 2"] && (this.state.errorAttendee[itemKey][key][attrib.name + " 2"].key || this.state.errorAttendee[itemKey][key][attrib.name + " 2"].error) && 'has-feedback',
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " 2"] && this.state.errorAttendee[itemKey][key][attrib.name + " 2"].error && 'has-error',
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " 2"] && this.state.errorAttendee[itemKey][key][attrib.name + " 2"].value && 'has-success',
																									)}>
																									<input data-attribute-type="text"
																												 type="text"
																												 className="form-control"
																												 placeholder="Address 2"
																												 name={attrib.name + " 2"}
																												 defaultValue={attrib.value ||
																												 (this.state.attendee &&
																												 this.state.attendee[itemKey] &&
																												 this.state.attendee[itemKey][key] &&
																												 this.state.attendee[itemKey][key][attrib.name + " 2"]) || (this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " 2"] && this.state.errorAttendee[itemKey][key][attrib.name + " 2"].value
																												 )
																												 }
																												 onChange={this.setAttendeesAddressValue.bind(this, attrib, attrib.name + " 2", itemKey, key)}
																									/>
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																									<small
																										className="help-block">{ "The " + attrib.name + " 2 is invalid."}</small>
																								</div>
																								<div
																									className={cx("mrg-b-xs form-group",
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " City"] && (this.state.errorAttendee[itemKey][key][attrib.name + " City"].key || this.state.errorAttendee[itemKey][key][attrib.name + " City"].error) && 'has-feedback',
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " City"] && this.state.errorAttendee[itemKey][key][attrib.name + " City"].error && 'has-error',
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " City"] && this.state.errorAttendee[itemKey][key][attrib.name + " City"].value && 'has-success',
																									)}>
																									<input data-attribute-type="text"
																												 type="text"
																												 className="form-control"
																												 placeholder="City"
																												 name={attrib.name + " City"}
																												 defaultValue={attrib.value ||
																												 (this.state.attendee &&
																												 this.state.attendee[itemKey] &&
																												 this.state.attendee[itemKey][key] &&
																												 this.state.attendee[itemKey][key][attrib.name + " City"]) || (this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " City"] && this.state.errorAttendee[itemKey][key][attrib.name + " City"].value
																												 )
																												 }
																												 required={ attrib.mandatory}
																												 onChange={this.setAttendeesAddressValue.bind(this, attrib, attrib.name + " City", itemKey, key)}
																									/>
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																									<small
																										className="help-block">{ "The " + attrib.name + " City is invalid."}</small>
																								</div>
																								<div
																									className={cx("mrg-b-xs form-group",
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " State"] && (this.state.errorAttendee[itemKey][key][attrib.name + " State"].key || this.state.errorAttendee[itemKey][key][attrib.name + " State"].error) && 'has-feedback',
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " State"] && this.state.errorAttendee[itemKey][key][attrib.name + " State"].error && 'has-error',
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " State"] && this.state.errorAttendee[itemKey][key][attrib.name + " State"].value && 'has-success',
																									)}>
																									<select className="form-control" required={ attrib.mandatory}
																													name={attrib.name + " State"}>
																										<option value="">State</option>
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
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																									<small
																										className="help-block">{ "The " + attrib.name + " State is invalid."}</small>
																								</div>
																								<div
																									className={cx("mrg-b-xs form-group",
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " Zip Code"] && (this.state.errorAttendee[itemKey][key][attrib.name + " Zip Code"].key || this.state.errorAttendee[itemKey][key][attrib.name + " Zip Code"].error) && 'has-feedback',
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " Zip Code"] && this.state.errorAttendee[itemKey][key][attrib.name + " Zip Code"].error && 'has-error',
																										this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " Zip Code"] && this.state.errorAttendee[itemKey][key][attrib.name + " Zip Code"].value && 'has-success',
																									)}>
																									<input type="number"
																												 className="form-control"
																												 placeholder="Zip Code"
																												 name={attrib.name + " Zip Code"}
																												 defaultValue={attrib.value ||
																												 (this.state.attendee &&
																												 this.state.attendee[itemKey] &&
																												 this.state.attendee[itemKey][key] &&
																												 this.state.attendee[itemKey][key][attrib.name + " Zip Code"]) || (this.state.errorAttendee && this.state.errorAttendee[itemKey] && this.state.errorAttendee[itemKey][key] && this.state.errorAttendee[itemKey][key][attrib.name + " Zip Code"] && this.state.errorAttendee[itemKey][key][attrib.name + " Zip Code"].value
																												 )
																												 }
																												 required={ attrib.mandatory}
																												 onChange={this.setAttendeesAddressValue.bind(this, attrib, attrib.name + " Zip Code", itemKey, key)}
																									/>
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																									<small
																										className="help-block">{ "The " + attrib.name + " Zip Code is invalid."}</small>
																								</div>
																							</div>
																						</div> : ""}
																					</div>
																				</div>
																			</div>
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

																									{
																										attrib.type !== 'dropdown' &&
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

																									}

																									{
																										attrib.type === 'dropdown' && attrib.value &&
																										<select className="form-control"
																														name={attrib.name}
																														placeholder={attrib.name}
																														onChange={this.setQuestionsValue.bind(this, attrib, itemKey, key)}
																														required={attrib.mandatory}>
																											{
																												this.getSelectOptions(attrib.value ||
																													(this.state.questions &&
																													this.state.questions[itemKey] &&
																													this.state.questions[itemKey][key] &&
																													this.state.questions[itemKey][key][attrib.name]) || (
																														this.state.errorQuestions && this.state.errorQuestions[itemKey] && this.state.errorQuestions[itemKey][key] && this.state.errorQuestions[itemKey][key][attrib.name] && this.state.errorQuestions[itemKey][key][attrib.name].value
																													)).map((oitem, okey) =>
																													<option key={oitem[0]} value={oitem[0]}>{oitem[1]}
																													</option>
																												)
																											}
																										</select>
																									}

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
																			</div>
																		) : ""
																}
															</div>
															<hr />
														</div>)
														: ''
													}
													<div className="mrg-t-lg text-center">{this.state.validData}
														{ this.state.validData ? <Button type='submit' className="btn pay-now btn-success" loading={this.state.loading}>
															&nbsp; &nbsp; &nbsp; &nbsp; Pay Now &nbsp; &nbsp; &nbsp; &nbsp;
														</Button>  : <Button className="btn pay-now btn-success" disabled>
															&nbsp; &nbsp; &nbsp; &nbsp; Pay Now &nbsp; &nbsp; &nbsp; &nbsp;
														</Button> }
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
						<PopupModel
							id="alertPopup"
							showModal={this.state.showMapPopup}
							headerText={<p>{this.state.popupAlertHeader}</p>}
							modelBody=''
							onCloseFunc={this.hidePopup}>
							<div className="ticket-type-container">
								{ this.state && this.state.errorMsg }
								<div className="modal-footer">
									<button className="btn btn-green" onClick={this.hideMapPopup}>Close</button>
								</div>
							</div>
						</PopupModel>
						<PopupModel
							id="ticketPurchaseSuccessPopup"
							showModal={ this.state.ticketPurchaseSuccessPopup}
							headerText={<p>Success</p>}
							modelBody={<p>Thank you for supporting the event. Please check your inbox for your tickets.</p>}
							onCloseFunc={this.hideSuccessAlertPopup}>
							<div className="ticket-type-container">
								<p>Thank you for supporting the event. Please check your inbox for your tickets.</p>
								<div className="modal-footer">
									<button className="btn btn-green" onClick={this.hideSuccessAlertPopup}>Close
									</button>
								</div>
							</div>
						</PopupModel>
						<PopupModel
							id="showFormErroralertPopup"
							showModal={ this.state.showFormError}
							headerText={<p>Faild</p>}
							modelBody={<p>{ this.state.formError || "Invalid Data"}</p>}
							onCloseFunc={this.hideFormErrorPopup}>
							<div className="ticket-type-container">
								<p>{ this.state.formError || "Invalid Data"}</p>
								<div className="modal-footer">
									<button className="btn btn-green" onClick={this.hideFormErrorPopup}>Close</button>
								</div>
							</div>
						</PopupModel>
					</div> : <TimeOut eventUrl={this.props.eventUrl}/>
				: <div />
		);
	}
}
const mapDispatchToProps = {
	doGetEventData: (eventUrl) => doGetEventData(eventUrl),
	doGetOrderById: (eventUrl, orderId) => doGetOrderById(eventUrl, orderId),
	doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
	createCardToken: (stripeKey, cardNumber, expMonth, expYear, cvc) => createCardToken(stripeKey, cardNumber, expMonth, expYear, cvc),
	orderTicket: (eventurl, orderid, ticketBookingDto) => orderTicket(eventurl, orderid, ticketBookingDto),
	couponCode: (eventurl, orderid, couponcode) => couponCode(eventurl, orderid, couponcode),
	doSignUp: (eventurl, userData) => doSignUp(eventurl, userData),
  doValidateMobileNumber: (mobileNumber) => doValidateMobileNumber(mobileNumber),
};

const mapStateToProps = (state) => ({
	eventData: state.event && state.event.data,
	user: state.session.user,
	authenticated: state.session.authenticated,
	orderData: state.event && state.event.order_data,
	country: state.location && state.location.data && state.location.data.country && state.location.data.country.toLowerCase(),
	currencySymbol: (state.event && state.event.currencySymbol) || "cell"
});
export default connect(mapStateToProps, mapDispatchToProps)(TicketCheckout);
