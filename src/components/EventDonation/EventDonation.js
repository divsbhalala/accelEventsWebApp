
import React from 'react';
import   PropTypes   from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EventDonation.css';
import PopupModel from './../PopupModal';
import Link from '../Link';
import {connect} from 'react-redux';
import cx from 'classnames';
import {doSignUp,submitAuctionBid,giveDonate} from './../../routes/event/action/index';
var svgTag = '<svg fill-rule="evenodd" style={{width: "auto !important"}} xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" overflow="visible" width="32px" height="32px" viewBox="0 0 24 24"> <defs> </defs> <g id="Document" fill="none" stroke="black" font-family="Times New Roman" font-size="16" transform="scale(1 -1)"> <g id="Spread" transform="translate(0 -24)"> <g id="Layer 1"> <g id="Group" stroke="none" fill="#FFFFFF"> <path d="M 7.106,12.949 C 6.985,12.949 6.696,13.063 6.55,13.204 L 1.926,18.216 C 0.551,19.548 0.689,23.031 4.017,23.031 C 5.471,23.031 6.39,21.459 7.106,20.557 C 7.82,21.459 8.74,23.031 10.195,23.031 C 13.522,23.031 13.66,19.548 12.285,18.216 L 7.661,13.204 C 7.515,13.063 7.227,12.949 7.106,12.949 Z" marker-start="none" marker-end="none"></path> <path d="M 7.598,3.304 L 1.894,9.436 C 1.088,10.614 2.41,11.789 3.5,10.762 L 5.872,8.504 C 5.456,6.881 7.115,5.385 8.371,5.385 L 10.462,5.385 C 12.135,5.385 14.181,7.579 15.136,7.579 C 13.446,7.579 12.033,6.728 11.027,6.728 L 8.43,6.728 C 7.056,6.728 6.931,8.787 8.43,8.787 L 11.019,8.787 C 13.544,8.787 13.746,10.848 15.888,10.848 C 17.104,10.848 19.406,8.723 20.846,7.673 C 21.026,7.541 21.218,7.306 21.062,7.03 L 19.213,3.723 C 19.122,3.58 18.806,3.467 18.551,3.662 L 16.99,4.76 C 16.791,4.896 16.56,4.897 16.22,4.784 L 10.651,2.848 C 9.711,2.596 8.446,2.333 7.598,3.304 Z M 6.661,1.912 C 6.658,1.915 6.65,1.922 6.648,1.925 L 6.442,2.134 L 0.738,8.264 C 0.663,8.338 0.595,8.419 0.536,8.507 C -0.297,9.723 -0.148,11.268 0.917,12.177 C 1.994,13.096 3.552,12.974 4.632,11.956 L 6.761,9.93 L 6.84,9.991 C 6.849,9.997 6.859,10.004 6.868,10.01 C 7.309,10.282 7.844,10.433 8.43,10.433 L 11.019,10.433 C 11.7,10.433 12.01,10.648 12.559,11.094 C 13.124,11.554 14.137,12.494 15.888,12.494 C 17.082,12.494 18.316,11.703 18.976,11.263 C 19.879,10.662 22.374,8.597 23.29,7.958 C 24.117,7.354 24.138,7.041 23.775,6.332 L 21.389,1.9 C 20.586,0.63 19.452,0.963 18.622,1.589 L 16.64,2.968 C 16.495,3.069 16.28,3.087 16.114,3.029 L 11.2,1.297 C 11.164,1.284 11.115,1.268 11.077,1.258 C 10.597,1.129 9.831,0.937 9.016,0.973 C 8.251,1.007 7.393,1.247 6.661,1.912 Z" marker-start="none" marker-end="none"></path> </g> </g> </g> </g> </svg>';

class EventDonation extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    headerText: PropTypes.string,
    itemCode: PropTypes.string,
    descText: PropTypes.string,
    linkTitle: PropTypes.string,
    linkText: PropTypes.string,
    linkTarget: PropTypes.string,
    actionTitle: PropTypes.string,
    actionClassName: PropTypes.string,
    imageUrl: PropTypes.string,
    data: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      donationRate: 15,
      showDonationPopup: false,

      isValidData: false,
      isError: false,
      email: null,
      password: null,
      error: null,
      emailFeedBack: false,
      passwordFeedBack: false,
      auctionData: null,

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

      errorReg: null,
      errorMsg: null,
      errorMsgfirstName: null,
      errorMsglastName: null,
      errorMsgcardNumber: null,
      errorMsgcardHolder: null,
      errorMsgamount: null,
      errorMsgNumber: null,
      errorMsgcvv: null,
      errorMsgEmail: null,
      errorMsgPhoneNumber: null,
      showPopup: false,
      stripeToken:null,
    }
    this.showDonationPopup = this.showDonationPopup.bind(this);
    this.hideDonationPopup = this.hideDonationPopup.bind(this);
  }
  emailValidateHandler = (e) => {
    this.setState({
      emailFeedBack: true,
      emailValue:this.email.value,
    });
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.email.value == '') {
      this.setState({
        email: false,
        errorMsgEmail: "Email is required.",
      });
    }
    else {
      this.setState({
        email: re.test(this.email.value),
        errorMsgEmail: "Invalid Email.",
      });
    }
    this.setState({isValidData: !!(this.email.value)});
  };
  firstNameValidateHandler = (e) => {
    this.setState({
      firstNameFeedBack: true,
      firstNameValue: this.firstName.value,
    });
    if (this.firstName.value == '') {

      this.setState({
        firstName: false
      });
    } else {
      this.setState({
        firstName: true
      });
    }
  };
  lastNameValidateHandler = (e) => {
    this.setState({
      lastNameFeedBack: true,
      lastNameValue: this.lastName.value,
    });
    if (this.lastName.value == '') {
      this.setState({
        lastName: false
      });
    } else {
      this.setState({
        lastName: true
      });
    }
  };
  cardHolderValidateHandler = (e) => {

    this.setState({
      cardHolderFeedBack: true
    });

    if (this.cardHolder.value == '') {

      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name is required and can't be empty",
      });
    } else if (!( this.cardHolder.value.length >= 6 && this.cardHolder.value.length <= 70 )) {
      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name must be more than 6 and less than 70 characters long ",
      });
    } else {
      this.setState({
        cardHolder: true
      });
    }


  };
  cardNumberValidateHandler = (e) => {
    this.setState({
      cardNumberFeedBack: true
    });
    if (this.cardNumber.value == '') {
      this.setState({
        cardNumber: false,
        errorMsgcardNumber: "Enter Card Number ",
      });
    } else if (this.cardNumber.value.length !== 15 && this.cardNumber.value.length !== 16) {
      this.setState({
        cardNumber: false,
        errorMsgcardNumber: " Please enter a Valid Card Number ",
      });
    } else {
      this.setState({
        cardNumber: true
      });
    }
  };
  amountValidateHandler = (e) => {
    this.setState({
      amountFeedBack: true,
      amountValue:this.amount.value,
      donationRate:this.amount.value,
    });
    let bid = 0;
    bid = this.state.itemData && this.state.itemData.currentBid + 20 ;

    if (this.amount.value == '') {
      this.setState({
        amount: false,
        errorMsgAmount: "Bid Amount can't be empty",
      });
    } else if (bid > this.amount.value) {
      this.setState({
        amount: false,
        errorMsgAmount: "This bid is below the minimum bid amount. Bids must be placed in $"+bid+" increments. " + "   Bids for this item must be placed in increments of at least $20",
      });
    } else {
      this.setState({
        amount: true
      });
    }
  };
  cvvValidateHandler = (e) => {

    this.setState({
      cvvFeedBack: true
    });

    if (this.cvv.value == '') {

      this.setState({
        cvv: false,
        errorMsgcvv: "The CVV is required and can't be empty",
      });
    } else if (!( 3 <= this.cvv.value.length && 4 >= this.cvv.value.length )) {
      this.setState({
        cvv: false,
        errorMsgcvv: "The CVV must be more than 4 and less than 3 characters long",
      });
    } else {
      this.setState({
        cvv: true
      });
    }

  };
  passwordValidateHandler = (e) => {

    this.setState({
      passwordFeedBack: true,
      passwordValue:this.password.value,
    });

    if (this.password.value == '') {

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
  phoneNumberValidateHandler = (e) => {

    this.setState({
      phoneNumberFeedBack: true,
      phoneNumberValue:this.phoneNumber.value,
    });

    if (this.phoneNumber.value == '') {

      this.setState({
        phoneNumber: false,
        errorMsgPhoneNumber: "phoneNumber is Require",
      });
    }  else {
      this.setState({
        phoneNumber: true
      });
    }
    // this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});
  };
  onBidFormClick = (e) => {
    e.preventDefault();
    console.log(this.state)
    var self = this;
    this.setState({isValidBidData: (this.state.cardNumber && this.state.cardHolder && this.state.amount && this.state.cvv)});
    if (this.state.isValidBidData) {
      const card = {
        number: this.cardNumber.value,
        cvc: this.cvv.value,
        exp_month: this.expMonth.value,
        exp_year: this.expYear.value,
      }
      Stripe.createToken(card, function (status, response) {
        if (response.error) {
          self.setState({
            showPopup: true,
            errorMsgCard: response.error.message,
            popupHeader:"Failed"
          });
        } else {
          self.setState({
            showPopup: true,
            errorMsgCard: " Your card ending in " +  self.state.cardNumberValue[self.state.cardNumberValue.length - 4] + " will be charged $ "+  self.state.amountValue  + " for  " +  self.state.auctionData.name ,
            popupHeader:"Success",
            stripeToken: response.id,
          })
        }
      });
    }
  };
  handleRadioChange = (event) => {
    this.setState({
      donationRate: event.currentTarget.value
    })
  };
  componentWillMount() {
    Stripe.setPublishableKey('pk_test_VEOlEYJwVFMr7eSmMRhApnJs');
  }
  showDonationPopup = () => {

    this.setState({
      showDonationPopup: true,
      amountValue:this.state.donationRate
    })
  };
  hideDonationPopup = () => {
    this.setState({
      showDonationPopup: false
    })
  };
  submitDonatebid = (e) => {
    e.preventDefault();
    var self = this
    if(!this.props.authenticated){
      let userData={
        "countryCode": "IN",
        "email": this.state.emailValue,
        "password": this.state.passwordValue,
        "phoneNumber": this.state.phoneNumberValue
      }
      this.props.doSignUp(this.props.eventUrl,userData ).then((resp)=>{
        var self = this;
        if(!resp.error){
              const card = {
                number: this.cardNumber.value,
                cvc: this.cvv.value,
                exp_month: this.expMonth.value,
                exp_year: this.expYear.value,
              }
              Stripe.createToken(card, function (status, response) {
                if (response.error) {
                  self.setState({
                    errorMsg: response.error.message,
                    isError:true,
                  });
                } else {
                  const user = {
                    stripeToken : response.id,
                    amount: self.state.amountValue,
                  }
                  self.props.giveDonate(self.props.eventUrl, user)
                    .then(resp => {
                      console.log(resp)
                      if (resp && resp.message) {
                        self.setState({
                          errorMsg: resp.message,
                          isError:false,
                        });
                      }else{
                        self.setState({
                          errorMsg: resp.errorMessage,
                          isError:true,
                        });
                      }
                    });
                }
              });
        } else{
          this.setState({error:"Invalid Email or password"});
        }
      });
    }
   else if(this.props.authenticated &&  this.props.user && this.props.user.linkedCard && this.props.user.linkedCard.stripeCards.length == 0 ){
      const card = {
        number: this.cardNumber.value,
        cvc: this.cvv.value,
        exp_month: this.expMonth.value,
        exp_year: this.expYear.value,
      }
      Stripe.createToken(card, function (status, response) {
        if (response.error) {
          self.setState({
            errorMsg: response.error.message,
            isError:true,
          });
        } else {
          const user = {
            stripeToken : response.id,
            amount: self.state.amountValue,
            email:self.props.user.email,
            paymenttype:"CC",
          }
          self.props.giveDonate(self.props.eventUrl, user)
            .then(resp => {
              console.log(resp)
              if (resp && resp.message) {
                self.setState({
                  errorMsg: resp.message,
                  isError:false,
                });
              }else{
                self.setState({
                  errorMsg: resp.errorMessage,
                  isError:true,
                });
              }
            });
        }
      });
    }
   else{
      const user = {
        amount: self.state.amountValue,
        email:self.props.user.email,
        paymenttype:"CC",
      }
      this.props.giveDonate(this.props.eventUrl, user)
        .then(resp => {
          console.log(resp)
          if (resp && resp.message) {
            this.setState({
              errorMsg: resp.message,
              isError:false,
            });
          }else{
            this.setState({
              errorMsg: resp.errorMessage,
              isError:true,
            });
          }
        });
    }
    this.setState({
      showDonationPopup:false
    })
  }

  render() {
    return (
      <div id="donationfrom" className={cx("col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10")}>
        { this.state.isError && this.state.errorMsg && <p className="alert alert-dismissable fade in alert-danger">{this.state.errorMsg}</p> }
        { !this.state.isError && this.state.errorMsg && <p className="alert alert-dismissable fade in alert-success">{this.state.errorMsg}</p> }

        <div className={cx("form-group")}>
          <div className={cx("btn-group")} data-toggle="buttons">

            <label className={cx("btn", this.state.donationRate == 5 ? 'active' : '')}>
              <input type="radio" autoComplete="off" name="donate5" className={cx("default-amount")} defaultValue="5"
                     onChange={this.handleRadioChange}/>
              <span className={cx("fa fa-usd")}></span>
              5
            </label>

            <label className={cx("btn", this.state.donationRate == 15 ? 'active' : '')}>
              <input type="radio" autoComplete="off" name="donate15" className={cx("default-amount")} defaultValue="15"
                     onChange={this.handleRadioChange}/>
              <span className={cx("fa fa-usd")}></span>
              15
            </label>

            <label className={cx("btn", this.state.donationRate == 30 ? 'active' : '')}>
              <input type="radio" autoComplete="off" name="donate30" className={cx("default-amount")} defaultValue="30"
                     onChange={this.handleRadioChange}/>
              <span className={cx("fa fa-usd")}></span>
              30
            </label>

            <label className={cx("btn", this.state.donationRate == 50 ? 'active' : '')}>
              <input type="radio" autoComplete="off" name="donate50" className={cx("default-amount")} defaultValue="50"
                     onChange={this.handleRadioChange}/>
              <span className={cx("fa fa-usd")}></span>
              50
            </label>
          </div>
        </div>
        <div className={cx("form-group")}>
          <div className={cx("input-group")}>
            <div className={cx("input-group-addon")}>
              $
            </div>
            <input type="number" className={cx("form-control")} name="amount" value={this.state.donationRate}
                   onChange={this.handleRadioChange}/>
          </div>
        </div>
        <input type="hidden" name="" value=""/>
        {/*Do NOT use name="submit" or id="submit" for the Submit button*/ }
        <a role="button" className={cx("btn open-donate-modal")} onClick={this.showDonationPopup}>
          <img src="/images/hand.svg"/>
          Donate
        </a>
        <PopupModel
          id="mapPopup"
          showModal={this.state.showDonationPopup}
          headerText="Submit Donation"
          onCloseFunc={this.hideDonationPopup}
        >
          <div className="main-box-body clearfix">
            <div className="payment-area collapse in">
              <form className="ajax-form validated fv-form fv-form-bootstrap" data-has-cc-info="true"
                    data-show-cc-confirm="true" data-confirm-message="getDonateConfirmMessage" id="donate-payment-form"
                    data-validate-function="validateDonateForm" data-onsuccess="handleDonateSuccess" method="post"
                    data-validation-fields="getDonateModalValidationFields" action="/AccelEventsWebApp/events/12/D"
                    noValidate="novalidate"
                    onSubmit={this.submitDonatebid}>
                <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
                <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
                  className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/>
                </div>
                { !this.props.authenticated || ( this.props.authenticated && this.props.user.firstName == null ) ?  <div
                  className={cx("form-group", this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}>
                  <label className="control-label">First Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true"/>
                    </div>
                    <input type="text" className="form-control" name="firstname" data-fv-field="firstName"
                           ref={ref => {
                             this.firstName = ref;
                           }}
                           onKeyUp={this.firstNameValidateHandler}/>
                    { this.state.firstNameFeedBack && this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                    { this.state.firstNameFeedBack && !this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                  </div>
                  { this.state.firstNameFeedBack && !this.state.firstName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">Firstname is required.</small>}
                </div> :""}
                { !this.props.authenticated || ( this.props.authenticated && this.props.user.lastName == null ) ?  <div
                  className={cx("form-group", this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}>
                  <label className="control-label">Last Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true"/>
                    </div>
                    <input type="text" className="form-control" name="lastname" data-fv-field="lastName"
                           ref={ref => {
                             this.lastName = ref;
                           }}
                           onKeyUp={this.lastNameValidateHandler}/>
                    { this.state.lastNameFeedBack && this.state.lastName &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                    { this.state.lastNameFeedBack && !this.state.lastName &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                  </div>
                  { this.state.lastNameFeedBack && !this.state.lastName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">Lastname is required.</small>}
                </div> :''}
                { !this.props.authenticated &&
                  <div
                 className={cx("form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
                 <label className="control-label">Email Address</label>
                 <div className="input-group">
                   <div className="input-group-addon">
                     <i className="fa fa-envelope" aria-hidden="true"/>
                   </div>
                   <input type="email" className="form-control login-email"
                          name="email" data-fv-field="email"
                          ref={ref => {
                            this.email = ref;
                          }}
                          onKeyUp={this.emailValidateHandler}
                   />
                   { this.state.emailFeedBack && this.state.email &&
                   <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                   { this.state.emailFeedBack && !this.state.email &&
                   <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                 </div>
                 { this.state.emailFeedBack && !this.state.email &&
                 <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
               </div> }
                { !this.props.authenticated && <div className="row">
                  <div className="col-md-8">
                    <div className="form-group expiration-date has-feedback">
                      <label className="control-label">Cell Number</label>
                      <div className="input-group">
                        <div className="input-group-addon">
                          <i className="fa fa-phone" aria-hidden="true"/></div>
                        <select className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth">
                          <option selected value="10">+1 USA</option>
                          <option value="02">+91 IND</option>
                        </select>
                        <input type="tel" className="int-tel-field "
                               data-country="CA" autoComplete="off"
                               data-fv-field="intTelField"
                               placeholder="204-234-5678"
                               ref={ref => {this.phoneNumber = ref}} onKeyUp={this.phoneNumberValidateHandler} />
                      </div>
                    </div>
                  </div>

                </div> }
                { !this.props.authenticated && <div
                  className={cx("form-group", this.state.passwordFeedBack && 'has-feedback', this.state.passwordFeedBack && this.state.password && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
                  <label className="control-label login-password">Enter or Create
                    Password</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-key" aria-hidden="true"/>
                    </div>
                    <input type="password" className="form-control" name="password"
                           autoComplete="new-password"
                           placeholder="Enter or create a password"
                           data-fv-field="paswd"
                           ref={ref => {
                             this.password = ref;
                           }}
                           onKeyUp={this.passwordValidateHandler}
                    />
                    { this.state.passwordFeedBack && this.state.password &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                    { this.state.passwordFeedBack && !this.state.password &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}

                  </div>
                  { this.state.passwordFeedBack && !this.state.password &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">Password can't be empty.</small>}

                </div>}

                <div
                  className={cx("form-group", this.state.amountFeedBack && 'has-feedback', this.state.amountFeedBack && this.state.amount && 'has-success', this.state.amountFeedBack && (!this.state.amount) && 'has-error')}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group">
                        <div className="input-group-addon">$</div>

                        <input type="number" className={cx("form-control")} name="amount" value={this.state.donationRate}
                               onChange={this.handleRadioChange}/>
                        { this.state.amountFeedBack && this.state.amount &&
                        <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                        { this.state.amountFeedBack && !this.state.amount &&
                        <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                      </div>
                      { this.state.amountFeedBack && !this.state.amount &&
                      <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgAmount}</small>}
                    </div>
                  </div>
                </div>
                { !this.props.authenticated || ( this.props.authenticated && ( this.props.user && this.props.user.linkedCard && this.props.user.linkedCard.stripeCards.length == 0 )) ?
                  <div>
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
                          <label className="control-label">Credit Card Number</label>
                          <div className="input-group">
                            <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true"/>
                            </div>
                            <input type="number" className="form-control field-card_number" id="cardnumber"
                                   placeholder="8888-8888-8888-8888" maxLength={16} data-stripe="number"
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
                            <div className="form-group expiration-date has-feedback">
                              <label className="control-label">Expiration Date</label>
                              <div className="input-group">
                                <div className="input-group-addon field-exp_month"><i className="fa fa-calendar"
                                                                                      aria-hidden="true"/></div>
                                <select className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth" ref={ref => {
                                  this.expMonth = ref;
                                }}>
                                  <option selected value="10">Jan (01)</option>
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
                                        }}>
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
                    <div className="form-group">
                      <div className="checkbox-nice">
                        <input type="checkbox" id="uptodate" name="uptodate" defaultChecked/> <label
                        htmlFor="uptodate">Stay up to date with Accelevents</label>
                      </div>
                    </div></div> : "" }

                <button type="submit" className="btn btn-green">Pay Now</button>
              </form>
            </div>
          </div>
        </PopupModel>
      </div>
    );
  }
}
const mapDispatchToProps = {
  doSignUp: (eventUrl, userData) => doSignUp(eventUrl, userData),
  submitAuctionBid: (eventUrl, userData) => submitAuctionBid(eventUrl, userData),
  giveDonate: (eventUrl, userData) => giveDonate(eventUrl, userData),
};
const mapStateToProps = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated,
});

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(s)(EventDonation));
