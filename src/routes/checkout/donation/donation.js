
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './donation.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {confirmDonationCheckout,getdDonationCheckout} from './../action/index';
import { doValidateMobileNumber} from './../../event/action/index';

import Button from 'react-bootstrap-button-loader';
import Link from '../../../components/Link';
import IntlTelInput from './../../../components/IntTelInput/main';
import PopupModel from './../../../components/PopupModal/index';
import {getCardToken} from './../../checkout/action/index';
class Donation extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isVisibleConfirmBid : false,

      isValidData: false,
      email: null,
      password: null,
      error: null,
      emailFeedBack: false,
      passwordFeedBack: false,

      isValidBidData: false,

      firstName: null,
      lastName: null,
      cardNumber: null,
      cardHolder: null,
      amount: null,
      cvv: null,
      month: null,
      year: null,
      expMonth: null,
      expYear: null,
      phoneNumber: null,
      popupHeader:null,

      firstNameValue: null,
      lastNameValue: null,
      cardNumberValue: null,
      cardHolderValue: null,
      amountValue: null,
      cvvValue: null,
      monthValue: null,
      yearValue: null,
      expMonthValue: null,
      expYearValue: null,
      emailValue: null,
      passwordValue:null,
      phoneNumberValue:null,
      errorMsgCard:null,

      firstNameFeedBack: false,
      lastNameFeedBack: false,
      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
      amountFeedBack: false,
      cvvFeedBack: false,
      phoneNumberFeedBack: false,

      errorMsgcardNumber: null,
      errorMsgcardHolder: null,
      errorMsgfirstName: null,
      errorMsglastName: null,
      errorMsgamount: null,
      errorMsgNumber: null,
      errorMsgcvv: null,
      errorMsgEmail: null,
      errorMsgPhoneNumber: null,
      showPopup: false,
      stripeToken:null,
      loading:false,
      countryPhone:null,
      phone:null,
      settings: {},
      isError:false,
      raffleTicketFeedBack:false,
      raffleTicketValue:null,
      raffleTicket:false,
    }
  }
  emailValidateHandler = (e) => {
    this.setState({
      emailFeedBack: true,
      emailValue:this.email.value.trim(),
    });
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.email.value.trim() == '') {
      this.setState({
        email: false,
        errorMsgEmail: "Email is required.",
      });
    }
    else {
      this.setState({
        email: re.test(this.email.value.trim()),
        errorMsgEmail: "Invalid Email.",
      });
    }
  };
  cvvValidateHandler = (e) => {
    this.cvv.value=this.cvv.value.substr(0,4);
    this.setState({
      cvvFeedBack: true
    });

    if (this.cvv.value.trim() == '') {

      this.setState({
        cvv: false,
        errorMsgcvv: "The CVV is required and can't be empty",
      });
    } else if (!( 3 <= this.cvv.value.trim().length && 4 >= this.cvv.value.trim().length )) {
      this.setState({
        cvv: false,
        errorMsgcvv: "The CVV must be more than 4 and less than 3 characters long",
      });
    } else {
      this.setState({
        cvv: true
      });
    }
    // this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});
  };
  cardHolderValidateHandler = (e) => {
    this.setState({
      cardHolderFeedBack: true,
      cardHolderValue:this.cardHolder.value.trim(),
    });

    if (this.cardHolder.value.trim() == '') {

      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name is required and can't be empty",
      });
    } else if (!( this.cardHolder.value.trim().length >= 6 && this.cardHolder.value.trim().length <= 70 )) {
      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name must be more than 6 and less than 70 characters long ",
      });
    } else if(this.cardHolder.value.charAt(0) === ' ' || this.cardHolder.value.charAt(this.cardHolder.value.length-1) === ' '){
      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name can not start or end with white space",
      });
    } else {
      this.setState({
        cardHolder: true
      });
    }
    //  this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});

  };
  cardNumberValidateHandler = (e) => {
    this.cardNumber.value=this.cardNumber.value.substr(0,16);
    this.setState({
      cardNumberFeedBack: true,
      cardNumberValue:this.cardNumber.value.trim(),
    });
    if (this.cardNumber.value.trim() == '') {
      this.setState({
        cardNumber: false,
        errorMsgcardNumber: "Enter Card Number ",
      });
    } else if (this.cardNumber.value.trim().length !== 16 && this.cardNumber.value.trim().length !== 15) {
      this.setState({
        cardNumber: false,
        errorMsgcardNumber: " Please enter a Valid Card Number ",
      });
    } else {
      this.setState({
        cardNumber: true
      });
    }
    //   this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});

  };
  phoneNumberValidateHandler(name, isValid, value, countryData, number, ext) {
    this.setState({
      phone: value,
      countryPhone:countryData.iso2,
      phoneNumberFeedBack: true,
      errorMsgPhoneNumber :"",
    },function afterTitleChange () {
      this.checkIsValidBidData()
    });
    if (value == '') {
      this.setState({
        phoneNumber: false,
        errorMsgPhoneNumber: "phoneNumber is Require",
      });
    }else{
      this.props.doValidateMobileNumber(number).then(resp => {
        this.setState({
          phoneNumber: !resp,
          errorMsgPhoneNumber: "Invalid phone number",
        });
      })
    }
    this.setState({
      phone: value,
    });
  };
  expMonthValidateHandler = (e) => {
    this.setState({
      expMonthFeedBack: true,
      expMonthValue:this.expMonth.value.trim(),
    });
    if (this.expMonth.value.trim() == '') {
      this.setState({
        expMonth: false,
        errorMsgExpMonth: "Expire Month is Require",
      });
    }  else {
      this.setState({
        expMonth: true
      });
    }
    // this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});
  };
  expYearValidateHandler = (e) => {
    this.setState({
      expYearFeedBack: true,
      expYearValue:this.expYear.value.trim(),
    });
    if (this.expYear.value.trim() == '') {
      this.setState({
        expYear: false,
        errorMsgexpYear: "Expire Year is Require",
      });
    }  else {
      this.setState({
        expYear: true
      });
    }
    // this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});
  };
  amountValidateHandler = (e) => {
    this.setState({
      amountFeedBack: true,
      amountValue:this.amount.value,
    });
    if (this.amount.value == '') {
      this.setState({
        amount: false,
        errorMsgAmount: " Amount can't be empty",
      });
    } else if (0 >= this.amount.value) {
      this.setState({
        amount: false,
        errorMsgAmount: " Amount can't be 0 ",
      });
    } else {
      this.setState({
        amount: true
      });
    }
  };
  showPopup = () => {
    this.setState({
      showPopup: true
    })
  };
  hidePopup = () => {
    this.setState({
      showPopup: false,
    })
    if(this.state.popupHeader == "Success"){
      window.location = "/event";
    }
  };

  onFormClick = (e) => {
    this.setState({loading:true });
    e.preventDefault();
    if (0){
      this.setState({
        showPopup: true,
        loading:false,
        errorMsgCard: " Pledges are no longer being accepted for this auction." ,
        popupHeader:"Failed",
      })
    }else {
      if( 0 && !this.state.settings.creditCardRequired ) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: " Your card ending in " + this.state.settings.linkedCard.stripeCards[0].last4   + " will be charged  $ "+  this.props.params.amount  ,
          popupHeader:"Confirm",
        })
      } else {
        if (this.state.cardNumber && this.state.cardHolder  && this.state.cvv) {
          const card = {
            number: this.cardNumber.value.trim(),
            cvc: this.cvv.value.trim(),
            exp_month: this.expMonth.value.trim(),
            exp_year: this.expYear.value.trim(),
          };
          this.props.getCardToken(this.state.settings.stripeKey, this.cardNumber.value.trim(), this.expMonth.value.trim(), this.expYear.value.trim(), this.cvv.value.trim()).then(response=>{
            if (response.error) {
              this.setState({
                loading:false,
                showPopup: true,
                errorMsg: response.error.message,
                popupHeader:"Failed"
              });
            } else {
              this.setState({
                loading:false,
                showPopup: true,
                errorMsg: " Your card ending in " + this.state.cardNumberValue.slice( - 4)  + " will be charged $ "+  this.props.params.amount  ,
                popupHeader:"Confirm",
                stripeToken: response.id,})
            }
          });
        }else{
          this.setState({
            loading:false,
          });
        }
      }
    }
  };
  confirmDonationCheckout = () =>{
    this.setState({loading:true });
    let confirmBidDto ={
      "amount": this.props.params.amount,
      "firstname": this.state.firstNameValue,
      "lastname": this.state.lastNameValue,
      "stripeToken": this.state.stripeToken
    }
    this.props.confirmDonationCheckout(this.props.params &&  this.props.params.params ,confirmBidDto).then(resp => {
      if (resp.errorMessage) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.errorMessage ,
          popupHeader:"Failed"
        });
      } else {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.message ,
          popupHeader:"Success",
        })
      }
    })
  };
  componentDidMount(){
    this.changePhone = this.phoneNumberValidateHandler.bind(this, 'phone');
    this.props.getdDonationCheckout(this.props.params &&  this.props.params.params , this.props.params &&  this.props.params.userId).then(resp => {
      this.setState({
        settings:resp.data,
        phone:resp.data.userInfo.phonenumber,
        countryPhone: resp.data.userInfo.countryCode,
        emailValue:resp.data.userInfo.email,
        firstNameValue:resp.data.userInfo.firstName,
        lastNameValue:resp.data.userInfo.lastName,
      })
    }).catch((error) => {
    })
  };

  render() {
    return (
      <div className="container">
        {this.state.settings &&  <div className="row">
          <div className="col-lg-8 col-md-10 col-lg-offset-2 col-md-offset-1 mrg-t-lg">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-box clearfix">
                  <header className="main-box-header clearfix">
                    <h1>Submit Donation</h1>
                  </header>
                  <div className="main-box-body clearfix">
                    <div className={cx(" payment-area collapse",'in')}  >
                      <form className="ajax-form validated fv-form fv-form-bootstrap" data-onsuccess="handleBidConfirmSuccess" noValidate="novalidate">
                        <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}} />
                        <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}>
                          <span className="fa fa-spinner fa-pulse fa-fw" /> <span className="resp-message" />
                        </div>
                        <div
                          className={cx("form-group", this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}>
                          <label className="control-label">First Name</label>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <i className="fa fa-user" aria-hidden="true"/>
                            </div>
                            <input type="text" className="form-control" name="firstname" placeholder="First Name"
                                   ref={ref => {
                                     this.firstName = ref;
                                   }}
                                   value={this.state.settings.userInfo && this.state.settings.userInfo.firstName}
                                   disabled={this.state.settings.userInfo && this.state.settings.userInfo.firstName ? true :false}
                                   onKeyUp={this.firstNameValidateHandler}/>
                            { this.state.firstNameFeedBack && this.state.email &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                            { this.state.firstNameFeedBack && !this.state.email &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                          </div>
                          { this.state.firstNameFeedBack && !this.state.firstName &&
                          <small className="help-block">First Name is required.</small>}
                        </div>
                        <div
                          className={cx("form-group", this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}>
                          <label className="control-label">Last Name</label>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <i className="fa fa-user" aria-hidden="true"/>
                            </div>
                            <input type="text" className="form-control" name="lastname" placeholder="Last Name"
                                   ref={ref => {
                                     this.lastName = ref;
                                   }}
                                   value={this.state.settings.userInfo && this.state.settings.userInfo.lastName}
                                   disabled={this.state.settings.userInfo && this.state.settings.userInfo.lastName ? true :false}
                                   onKeyUp={this.lastNameValidateHandler}/>
                            { this.state.lastNameFeedBack && this.state.lastName &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                            { this.state.lastNameFeedBack && !this.state.lastName &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                          </div>
                          { this.state.lastNameFeedBack && !this.state.lastName &&
                          <small className="help-block">Last Name is required.</small>}
                        </div>
                        { <div>
                          <div
                            className={cx("form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
                            <label className="control-label">Email Address</label>
                            <div className="input-group">
                              <div className="input-group-addon">
                                <i className="fa fa-envelope" aria-hidden="true"/>
                              </div>
                              <input type="email" className="form-control login-email" name="email" placeholder="Email"
                                     data-fv-field="email"
                                     ref={ref => {
                                       this.email = ref;
                                     }}
                                     value={this.state.settings.userInfo && this.state.settings.userInfo.email}
                                     disabled={this.state.settings.userInfo && this.state.settings.userInfo.email}
                                     onKeyUp={this.emailValidateHandler} />
                              { this.state.emailFeedBack && this.state.email &&
                              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                              { this.state.emailFeedBack && !this.state.email &&
                              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                            </div>
                            { this.state.emailFeedBack && !this.state.email &&
                            <small className="help-block" data-fv-validator="emailAddress" data-fv-for="email"
                                   data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
                          </div>
                        </div> }
                          <div
                          className={cx("form-group", this.state.amountFeedBack && 'has-feedback', this.state.amountFeedBack && this.state.amount && 'has-success', this.state.amountFeedBack && (!this.state.amount) && 'has-error')}>
                          <div className="row">
                              <label className="control-label">Bid Amount</label>
                              <div className="input-group">
                                <div className="input-group-addon">$</div>
                                <input type="number" className="form-control" name="itembid" id="itembid"
                                       placeholder="Amount" step required="required"
                                       ref={ref => {
                                         this.amount = ref;
                                       }}
                                       value={this.props.params.amount}
                                       disabled={true}
                                       onKeyUp={this.amountValidateHandler}/>
                                { this.state.amountFeedBack && this.state.amount &&
                                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                                { this.state.amountFeedBack && !this.state.amount &&
                                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                              </div>
                              { this.state.amountFeedBack && !this.state.amount &&
                              <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgAmount}</small>}
                            </div>
                        </div>
                        { <div
                          className={cx("form-group", this.state.phoneNumberFeedBack && 'has-feedback', this.state.phoneNumberFeedBack && this.state.phoneNumber && 'has-success', this.state.phoneNumberFeedBack && (!this.state.phoneNumber) && 'has-error')}>
                          <label className="control-label">Cell Number</label>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <i className="fa fa-phone" aria-hidden="true"/>
                            </div>
                            <IntlTelInput
                              css={['intl-tel-input', 'form-control intl-tel']}
                              utilsScript="./libphonenumber.js"
                              separateDialCode={true}
                              value={ this.state.phone || "" }
                              maxLength={16} data-stripe="number"
                              onPhoneNumberChange={this.changePhone}
                              disabled={this.state.settings.userInfo && this.state.settings.userInfo.phonenumber}
                            />
                            { this.state.phoneNumberFeedBack && this.state.phoneNumber &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                            { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                          </div>
                          { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                          <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgPhoneNumber}</small>}
                        </div> }
                        { this.state.settings.creditCardRequired  && <div>
                          <style
                            dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n"}}/>
                          <div className="stripe-form">
                            <div className="stripe-card-info">
                              <div
                                className={cx("form-group", this.state.cardHolderFeedBack && 'has-feedback', this.state.cardHolderFeedBack && this.state.cardHolder && 'has-success', this.state.cardHolderFeedBack && (!this.state.cardHolder) && 'has-error')}>
                                <label className="control-label">Card Holder Name</label>
                                <div className="input-group">
                                  <div className="input-group-addon"><i className="fa fa-user" aria-hidden="true"/></div>
                                  <input type="text" className="form-control" id="cardname" data-stripe="name"
                                         placeholder="Name on the card" data-fv-field="cardholdername"
                                         ref={ref => {
                                           this.cardHolder = ref;
                                         }}
                                         onKeyUp={this.cardHolderValidateHandler}/>
                                  { this.state.cardHolderFeedBack && this.state.cardHolder &&
                                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                                  { this.state.cardHolderFeedBack && !this.state.cardHolder &&
                                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                                </div>
                                { this.state.cardHolderFeedBack && !this.state.cardHolder &&
                                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgcardHolder}</small>}

                              </div>
                              <div
                                className={cx("form-group", this.state.cardNumberFeedBack && 'has-feedback', this.state.cardNumberFeedBack && this.state.cardNumber && 'has-success', this.state.cardNumberFeedBack && (!this.state.cardNumber) && 'has-error')}>
                                <label className="control-label">Credit Card Number </label>
                                <div className="input-group">
                                  <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true"/>
                                  </div>
                                  <input type="number" className="form-control field-card_number" id="cardnumber"
                                         placeholder="8888-8888-8888-8888"  maxLength="16" data-stripe="number"
                                         required="required" data-fv-field="cardnumber"
                                         ref={ref => {
                                           this.cardNumber = ref;
                                         }}
                                         onKeyUp={this.cardNumberValidateHandler}/>
                                  { this.state.cardNumberFeedBack && this.state.cardNumber &&
                                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                                  { this.state.cardNumberFeedBack && !this.state.cardNumber &&
                                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                                </div>
                                { this.state.cardNumberFeedBack && !this.state.cardNumber &&
                                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgcardNumber}.</small>}
                              </div>
                              <div className="row">
                                <div className="col-md-8">
                                  <div
                                    className={cx("form-group", this.state.expMonthFeedBack && 'has-feedback', this.state.expMonthFeedBack && this.state.expMonth && 'has-success', this.state.expMonthFeedBack && (!this.state.expMonth) && 'has-error')}>
                                    <label className="control-label">Expiration Date</label>
                                    <div className="input-group">
                                      <div className="input-group-addon field-exp_month"><i className="fa fa-calendar"
                                                                                            aria-hidden="true"/></div>
                                      <select className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth" ref={ref => {
                                        this.expMonth = ref;
                                      }}  onChange={this.expMonthValidateHandler} >
                                        <option defaultValue value="01">Jan (01)</option>
                                        <option value="02">Feb (02)</option>
                                        <option value="03">Mar (03)</option>
                                        <option value="04">Apr (04)</option>
                                        <option value="05">May (05)</option>
                                        <option value="06">Jun (06)</option>
                                        <option value="07">Jul (07)</option>
                                        <option value="08">Aug (08)</option>
                                        <option value="09">Sep (09)</option>
                                        <option value="10">Oct (10)</option>
                                        <option value="11">Nov (11)</option>
                                        <option value="12">Dec (12)</option>
                                      </select>
                                      <select className data-stripe="exp_year field-exp_year" id="exp-year" data-fv-field="expYear"
                                              ref={ref => {
                                                this.expYear = ref;
                                              }} onChange={this.expYearValidateHandler} >
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                        <option value="2029">2029</option>
                                        <option value="2030">2030</option>
                                        <option value="2031">2031</option>
                                        <option value="2032">2032</option>
                                        <option value="2033">2033</option>
                                        <option value="2034">2034</option>
                                        <option value="2035">2035</option>
                                        <option value="2036">2036</option>
                                        <option value="2037">2037</option>
                                        <option value="2038">2038</option>
                                        <option value="2039">2039</option>
                                        <option value="2040">2040</option>
                                        <option value="2041">2041</option>
                                        <option value="2042">2042</option>
                                        <option value="2043">2043</option>
                                        <option value="2044">2044</option>
                                        <option value="2045">2045</option>
                                        <option value="2046">2046</option>
                                        <option value="2047">2047</option>
                                        <option value="2048">2048</option>
                                        <option value="2049">2049</option>
                                        <option value="2050">2050</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div
                                    className={cx("input-group", this.state.cvvFeedBack && 'has-feedback', this.state.cvvFeedBack && this.state.cvv && 'has-success', this.state.cvvFeedBack && (!this.state.cvv) && 'has-error')}>
                                    <label className="control-label">CVV Number</label>
                                    <div className="input-group">
                                      <input type="number" className="form-control field-cvv" maxLength={4} size={4}
                                             data-stripe="cvc" id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"
                                             ref={ref => {
                                               this.cvv = ref;
                                             }}
                                             onKeyUp={this.cvvValidateHandler}/>
                                      { this.state.cvvFeedBack && this.state.cvv &&
                                      <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                                      { this.state.cvvFeedBack && !this.state.cvv &&
                                      <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                                    </div>
                                    { this.state.cvvFeedBack && !this.state.cvv &&
                                    <small className="help-block" data-fv-result="NOT_VALIDATED">{ this.state.errorMsgcvv  }</small>}

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> }
                        <style dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n" }} />
                        <div className="stripe-form">
                        </div>
                        <Button  loading={this.state.loading} type="submit" className="btn btn-success paynow" onClick={this.onFormClick}>Confirm Bid</Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> }
        <PopupModel
          id="mapPopup"
          showModal={this.state.showPopup}
          headerText= {<p>{this.state.popupHeader}</p>}
          modelBody='<div><h1>Location</h1></div>'
          onCloseFunc={this.hidePopup} >
          <div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>
            { this.state && this.state.errorMsg }
            <div className="modal-footer">
              {this.state.popupHeader == "Confirm" ? <Button  className="btn btn-success" loading={this.state.loading} onClick={this.confirmDonationCheckout} >Confirm</Button> : ""}
              <button  className="btn btn-danger" onClick={this.hidePopup}>Close</button>
            </div>
          </div>
        </PopupModel>
      </div>

    );
  }
}

const mapDispatchToProps = {
  confirmDonationCheckout : (eventurl, confirmBidDto)  => confirmDonationCheckout(eventurl,confirmBidDto),
  getdDonationCheckout : (eventurl, userId)  => getdDonationCheckout(eventurl, userId),
  doValidateMobileNumber: (mobileNumber) => doValidateMobileNumber(mobileNumber),
  getCardToken: (stripeKey, cardNumber, expMonth, expYear, cvc) => getCardToken(stripeKey, cardNumber, expMonth, expYear, cvc),
};
const mapStateToProps = (state) => ({});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Donation));

