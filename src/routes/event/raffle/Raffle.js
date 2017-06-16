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
import s from './Raffle.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {doGetRaffleItemByCode,
  doGetEventData,
  doGetSettings,
  submitRaffleTickets,
  doSignUp} from './../action/index';
import  history from './../../../history';

import  EventAside from './../../../components/EventAside/EventAside';
import  {Carousel} from 'react-responsive-carousel';
import PopupModel from './../../../components/PopupModal';
class Raffle extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      tab: 'The Event',
      showBookingTicketPopup: false,
      showMapPopup: true,


      firstNameFeedBack: false,
      lastNameFeedBack: false,
      showAlertPopup : false,
      showDonationPopup : false,

      errorMsgCard:null,


      isValidData: false,
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

      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
      amountFeedBack: false,
      cvvFeedBack: false,
      phoneNumberFeedBack: false,

      errorReg: null,
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
      submittedTickets:null,
      showDonationPopup:false,
    }

  }
  onFormClick = (e) => {
    e.preventDefault();

    if (this.state.isValidData) {
    }

  };
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
    this.setState({isValidData: !!(this.email.value && this.password.value)});

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
  firstNameValidateHandler = (e) => {
    this.setState({
      firstNameFeedBack: true,
      firstNameValue:this.firstName.value
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
   // this.setState({isValidBidData: !!(this.state.firstNameFeedBack && this.state.lastNameFeedBack && this.state.cardNumberFeedBack && this.state.cardHolderFeedBack && this.state.amountFeedBack && this.state.cvvFeedBack)});

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
  //  this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});

  };
  cardHolderValidateHandler = (e) => {

    this.setState({
      cardHolderFeedBack: true,
      cardHolderValue:this.cardHolder.value,
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
    //this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});

  };
  cardNumberValidateHandler = (e) => {
    this.setState({
      cardNumberFeedBack: true,
      cardNumberValue:this.cardNumber.value,
    });
    if (this.cardNumber.value == '') {
      this.setState({
        cardNumber: false,
        errorMsgcardNumber: "Enter Card Number ",
      });
    } else if (this.cardNumber.value.length !== 16 && this.cardNumber.value.length !== 15) {
      this.setState({
        cardNumber: false,
        errorMsgcardNumber: " Please enter a Valid Card Number ",
      });
    } else {
      this.setState({
        cardNumber: true
      });
    }
  //  this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});
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
    //this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});
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

  raffleTicketValidateHandler = (e) => {
    this.setState({
      raffleTicketFeedBack: true,
      raffleTicketValue: this.raffleTicket.value,
    });
    if (this.raffleTicket.value == '') {
      this.setState({
        raffleTicket: false,
        errorMsgRaffleTicket: "Raffle Ticket required and can't be empty",
      });
    }  else {
      this.setState({
        raffleTicket: true
      });
    }
  };

  componentWillMount() {
    Stripe.setPublishableKey('pk_test_VEOlEYJwVFMr7eSmMRhApnJs');
    this.props.doGetEventData(this.props.params && this.props.params.params);
    this.props.doGetSettings(this.props.params && this.props.params.params, 'raffle').then(resp => {
      this.setState({
        settings: resp && resp.data
      });
    }).catch(error => {
      history.push('/404');
    });
    this.props.doGetRaffleItemByCode(this.props.params && this.props.params.params, this.props.itemCode)
      .then(resp => {
        if (resp && resp.data) {
          this.setState({
            raffleData: resp.data
          })
        }
      }).catch(error => {
      console.log(error)
    });
  }
  buyRaffleTicket = (e) => {
    e.preventDefault();

    var self = this;
    this.setState({isValidBidData: (this.state.cardNumber && this.state.cardHolder  && this.state.cvv)});
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
            showAlertPopup: true,
            errorMsgCard: response.error.message,
            popupAlertHeader:"Failed"
          });
        } else {
          self.setState({
            showAlertPopup: true,
            errorMsgCard: " Your card ending in " + self.state.cardNumberValue.slice( - 4)  + " will be charged  for  " +  self.state.auctionData.name ,
            popupAlertHeader:"Success",
            stripeToken: response.id,
          })
        }
      });
    }
  };
  byTicket = () => {
    if (!this.props.authenticated) {

      let userData={
        "countryCode": "IN",
        "email": this.state.emailValue,
        "password": this.state.passwordValue,
        "phoneNumber": this.state.phoneNumberValue
      }
      this.props.doSignUp(this.props.params && this.props.params.params,userData ).then((resp)=>{
        if(!resp.error){
          this.submiteByTicket();
        }
        else{
          this.setState({error:"Invalid Email or password"});
        }
      });
    }else{
      this.submiteByTicket();
    }
  }
  submiteByTicket = () => {
    if( this.props.authenticated &&  this.props.user && this.props.user.linkedCard && this.props.user.linkedCard.stripeCards.length > 0 ){
      const user = {
        itemCode: this.state.raffleData.code,
        submittedTickets: this.state.raffleTicketValue,
      }
      this.props.submitRaffleTickets(this.props.params && this.props.params.params, user)
        .then(resp => {
          if (resp && resp.data) {
            this.setState({
              showPopup: true,
              errorMsgCard: "Tickets Purchase Success ",
              popupHeader:"Success"
            })
          }else{
            this.setState({
              showPopup: true,
              errorMsgCard: resp.errorMessage,
              popupHeader:"Failed"
            });
          }
          console.log("------",resp)
        });
    }else{
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
              errorMsgCard: " Your card ending in " + self.state.cardNumberValue.slice( - 4)  + " will be charged $ for  " +  self.state.raffleData.name ,
              popupHeader:"Success",
              stripeToken: response.id,
            })
            self.byBid();
          }
        });
      }
    }
  }
  byBid = () => {
    const user = {
      itemCode: this.state.raffleData.code,
      submittedTickets: this.state.raffleTicketValue,
      stripeToken:this.state.stripeToken,
    }
    this.props.submitRaffleTickets(this.props.params && this.props.params.params, user)
      .then(resp => {
        if (resp && resp.data) {
          this.setState({
            showPopup: true,
            errorMsgCard: "Tickets Purchase Success ",
            popupHeader:"Success"
          })
        }else{
          this.setState({
            showPopup: true,
            errorMsgCard: resp.errorMessage,
            popupHeader:"Failed"
          });
        }
        console.log("------",resp)
      });
  }
  showAlertPopup = () => {
    this.setState({
      showPopup: true,
      showAlertPopup: true,

    })
  };
  hideAlertPopup = () => {
    this.setState({
    //  showPopup: false,
      showAlertPopup: false,
    })
    this.reRender();
  };
  hideDonationPopup = () => {
    this.setState({
      showDonationPopup: false,
    })
  };
  showDonatePopup = () => {
    this.setState({
      showDonationPopup: true,
    })
  };

  reRender = ()=>{
    window.location.reload();
  }
  //submitTickets
  render() {
    let form_login = <form className="ajax-form validated fv-form fv-form-bootstrap" method="post"
                           action="/AccelEventsWebApp/events/148/C/FAN/bid" data-has-cc-info="true"
                           data-show-cc-confirm="true" data-confirm-message="getCauseStripeConfirmMessage"
                           data-validate-function="validateCauseBidForm" data-onsuccess="handleCauseBidSubmit"
                           data-validation-fields="getCauseBidValidationFields" noValidate="novalidate"
                           onSubmit={this.onFormClick}>

      <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
        className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
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
      </div> : ""}
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
      </div> : '' }

      <div className="form-group has-feedback">
        <label className="control-label"> You have <span className="available-tickets">0</span> tickets
          remaining.</label>
        <div className="row">
          <div className="col-md-5 col-lg-5">
            <div className="input-group">
              <div className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true"/></div>
              <input type="number" className="form-control" name="itembid"  required="required"
                     data-isprocessingfeestopurchaser="false" data-fv-field="itembid"/>
            </div>
            <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="itembid"
               style={{display: 'none'}}/>
            <small className="help-block" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Number of Tickets
              should be greater than zero.
            </small>
            <small className="help-block" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Digits Only
              Accepted.
            </small>
            <small className="help-block" data-fv-validator="callback" data-fv-for="itembid"
                   data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Tickets should be more than 0 and less than
            </small>
            <small className="help-block" data-fv-validator="integer" data-fv-for="itembid"
                   data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
            </small>
          </div>
        </div>
      </div>
      <div className="row btn-row">
        <div className="col-md-5 col-lg-5">
          <button className={cx("btn btn-primary text-uppercase", s.btnFull, !this.state.isValidData && 'disabled')}
                  role="button" type="submit"
                  data-loading-text="<i class='fa fa-spinner fa-spin'></i> Getting Started..">
            Submit Tickets
          </button>

        </div>
        <div className="col-md-6 col-lg-5">
        <a role="button" className="btn btn-success btn-block" href={this.props.params && "/event/" + this.props.params.params }>
            Go back to All Items</a>
        </div>
      </div>
      <div className="row mrg-t-md">
        <div className="col-md-5 col-lg-10">
          <a role="button" className="btn btn-primary btn-block" data-toggle="modal" href="#info-modal"
             onClick={this.showDonatePopup} >Get Tickets</a>
        </div>
      </div>
    </form>;
    let form_normal = <div >
      {this.state.raffleData && this.state.raffleData.active &&
      <div className="text-danger text-center bold"> Please activate this module to start accepting
        pledges.
      </div>}
      <a role="button" className="btn btn-success btn-block" href="#login-user" data-toggle="modal" data-form="login">Login</a>
      <a role="button" className="btn btn-primary btn-block" data-toggle="modal" href="#info-modal"
         onClick={this.showDonatePopup} >Get Tickets</a>
      <a role="button" className="btn btn-success"
         href={this.props.params && "/event" + this.props.params.params } >Go back to All Items</a>
    </div>;

    return (
      <div className="row">
        <div className="col-lg-12">

          <div id="content-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">
                <EventAside activeTab={'Raffle'} eventData={this.props.eventData} settings={this.state.settings}
                            eventTicketData={this.props.eventTicketData}
                            activeCategory={false}/>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8">
                <div className="main-box clearfix">
                  <h1 className="text-center mrg-t-lg"
                      id="item-name">{this.state.raffleData && this.state.raffleData.name}</h1>
                  <div className="row mrg-t-lg">
                    <div className="col-md-6">
                      <div className="pad-l-md pad-r-md">
                        <div className="item-image">
                          <Carousel axis="horizontal" showThumbs={false} showArrows={true} dynamicHeight emulateTouch>
                            {this.state.raffleData && this.state.raffleData.images.length > 0 ?
                              this.state.raffleData.images.map((item, index) =>
                                <ImageList key={index} item={item}/>
                              ) : <div className="item-image-inner" style={{
                                backgroundImage: 'url("http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg")',
                                width: '',
                                transform: 'rotate(0deg)'
                              }}/>
                            }
                          </Carousel>
                        </div>
                      </div>
                      <div className="mrg-t-lg pad-l-md pad-r-md" dangerouslySetInnerHTML={ {__html: this.state.raffleData && this.state.raffleData.description } } >

                      </div>
                    </div>
                    <div className="col-md-6">
                      { this.props.authenticated ? form_login : form_normal  }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PopupModel
          id="mapPopup"
          showModal={this.state.showDonationPopup}
          headerText="Buy Raffle Ticket"
          onCloseFunc={this.hideDonationPopup}
        >
          <div className="main-box-body clearfix">
            <div className="payment-area collapse in">
              <form className="ajax-form validated fv-form fv-form-bootstrap" data-has-cc-info="true"
                    data-show-cc-confirm="true" data-confirm-message="getDonateConfirmMessage" id="donate-payment-form"
                    data-validate-function="validateDonateForm" data-onsuccess="handleDonateSuccess" method="post"
                    data-validation-fields="getDonateModalValidationFields" action="/AccelEventsWebApp/events/12/D"
                    noValidate="novalidate"
              onSubmit={this.buyRaffleTicket}>
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
                </div>}
                { !this.props.authenticated &&
                  <div className="form-group has-feedback">
                  <label className="control-label">Cell Number</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-phone" aria-hidden="true"/>
                    </div>
                    <div className="intl-tel-input allow-dropdown separate-dial-code iti-sdc-2">
                      <div className="flag-container">
                        <div className="selected-flag" tabIndex={0} title="United States: +1">
                          <div className="iti-flag us"/>
                          <div className="selected-dial-code">+1</div>
                          <div className="iti-arrow"/>
                        </div>
                      </div>
                      <input type="tel" className="int-tel-field form-control" data-country="US" maxLength={10}
                             autoComplete="off" data-fv-field="intTelField" placeholder="201-555-0123"
                             ref={ref => {this.phoneNumber = ref}} onKeyUp={this.phoneNumberValidateHandler} />
                    </div>
                    <input type="hidden" name="countryCode" defaultValue="US"/><input type="hidden" name="phoneNumber"
                                                                                      defaultValue/>
                  </div>
                  <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="intTelField"
                     style={{display: 'none'}}/>

                </div> }
                { !this.props.authenticated &&
                <div
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
                <div className="form-group has-feedback">
                  <label className="control-label">Number of tickets</label>
                  <select className="form-control" name="pkg" id="ticketpkgs" data-fv-field="ticketpkgs"  ref={ref => {
                    this.raffleTicket = ref;
                  }} onChange={this.raffleTicketValidateHandler}>
                    <option value data-ticket={0} data-price={0}> -- Select Tickets --</option>
                    <option value={847} data-ticket={1} data-price={5}>
                      1 Ticket For $ 5
                    </option>
                    <option value={848} data-ticket={2} data-price={10}>
                      2 Ticket For $ 10
                    </option>
                    <option value={849} data-ticket={6} data-price={20}>
                      6 Ticket For $ 20
                    </option>
                    <option value={850} data-ticket={15} data-price={40}>
                      15 Ticket For $ 40
                    </option>
                    <option value={851} data-ticket={20} data-price={50}>
                      20 Ticket For $ 50
                    </option>
                    <option value={852} data-ticket={50} data-price={100}>
                      50 Ticket For $ 100
                    </option>
                  </select>

                  { this.state.raffleTicketFeedBack && !this.state.raffleTicket &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED"> Raffle Ticket required.</small>}
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
                                  <option value="2016">2016</option>
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

                <button type="submit" className="btn btn-green" onClick={this.byTicket} >Pay Now</button>
              </form>
            </div>
          </div>
        </PopupModel>
        <PopupModel
          id="alertPopup"
          showModal={this.state.showAlertPopup}
          headerText={this.state.popupAlertHeader}
          modelBody=''
          onCloseFunc={this.hidePopup}>
          <div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>
            { this.state && this.state.errorMsgCard }
            <div className="modal-footer">
              {this.state.popupHeader == "Success" ? <button className="btn btn-success" onClick={this.byTicket} >Confirm</button> : ""}
              {this.state.popupHeader == "Confirm" ? <button className="btn btn-success" onClick={this.byTicket} >Confirm</button> : ""}
              <button className="btn badge-danger" onClick={this.hidePopup}>Close</button>
            </div>
          </div>
        </PopupModel>
      </div>
    );
  }
}
class ImageList extends React.Component {
  render() {
    return (
      <div>
        <img height={250}
             src={this.props.item.imageUrl ? 'http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/' + this.props.item.imageUrl : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg" }/>
      </div>

    );
  }
}

const mapDispatchToProps = {
  doGetEventData: (eventUrl) => doGetEventData(eventUrl),
  doGetRaffleItemByCode: (eventUrl, itemCode) => doGetRaffleItemByCode(eventUrl, itemCode),
  doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
  submitRaffleTickets: (eventUrl, userData) => submitRaffleTickets(eventUrl, userData),
  doSignUp: (eventUrl, userData) => doSignUp(eventUrl, userData),
};
const mapStateToProps = (state) => ({
  raffle_data: state.event && state.event.raffle_data,
  eventData: state.event && state.event.data,
  eventTicketData: state.event && state.event.ticket_data,
  user: state.session.user,
  authenticated: state.session.authenticated,
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Raffle));
