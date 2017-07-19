
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './byRaffleTickets.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {confirmRaffleCheckout, getRaffleCheckout} from './../action/index';
import { doValidateMobileNumber} from './../../event/action/index';

import Button from 'react-bootstrap-button-loader';
import Link from '../../../components/Link';
import IntlTelInput from 'react-intl-tel-input';
import PopupModel from './../../../components/PopupModal/index';

class ByRaffleTickets extends React.Component {
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

      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
      amountFeedBack: false,
      cvvFeedBack: false,
      phoneNumberFeedBack: false,

      errorMsgcardNumber: null,
      errorMsgcardHolder: null,
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
      raffleTicket:false
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
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    }else{
      this.props.doValidateMobileNumber(number).then(resp => {
        this.setState({
          phoneNumber: !resp,
          errorMsgPhoneNumber: "Invalid phone number",
        },function afterTitleChange () {
          this.checkIsValidBidData()
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
  raffleTicketValidateHandler = (e) => {
    this.setState({
      raffleTicketFeedBack: true,
      raffleTicketValue: this.raffleTicket.value.trim(),
    });
    if (this.raffleTicket.value.trim() == '') {
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
  showPopup = () => {
    this.setState({
      showMapPopup: true
    })
  };
  hidePopup = () => {
    this.setState({
      showMapPopup: false,
    })
   };

  showConfirmBid = () =>{
    this.setState({
      isVisibleConfirmBid:true,
    })
  };
  onFormClick = (e) => {
    this.setState({
      loading:true
    });
    e.preventDefault();
    if (!this.state.settings.moduleActivated || this.state.settings.moduleEnded){
      this.setState({
        showPopup: true,
        loading:false,
        errorMsgCard: " Pledges are no longer being accepted for this auction." ,
        popupHeader:"Failed",
      })
    }else {
      if( this.state.settings.authenticated  &&   !this.state.settings.creditCardRequired ) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsgCard: " You are placing a bid of $"+ this.state.amountValue  +" for " + this.state.auctionData.name ,
          popupHeader:"Confirm",
        })
      } else {
        if (this.state.cardNumber && this.state.cardHolder && this.state.amount && this.state.cvv) {
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
                errorMsgCard: response.error.message,
                popupHeader:"Failed"
              });
            } else {
              this.setState({
                loading:false,
                showPopup: true,
                errorMsgCard: " Your card ending in " + this.state.cardNumberValue.slice( - 4)  + " will be charged $ "+  this.state.amountValue  + " for  " +  this.state.auctionData.name ,
                popupHeader:"Success",
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
  confirmRaffleCheckout = (confirmBidDto) =>{
    this.props.confirmRaffleCheckout(this.props.params &&  this.props.params.params ,raffleCheckoutDto).then(resp => {

    }).catch((error) => {

    })
  };
  componentDidMount(){
    this.changePhone = this.phoneNumberValidateHandler.bind(this, 'phone');
    this.props.confirmRaffleCheckout(this.props.params &&  this.props.params.params , this.props.params &&  this.props.params.userId).then(resp => {
      console.log(resp)
      this.setState({settings:resp,phone:resp.userInfo.phonenumber})
    }).catch((error) => {

    })
  };

  render() {
    return (
      <div className="container">
        {this.state.setting &&  <div className="row">
          <div className="col-lg-8 col-md-10 col-lg-offset-2 col-md-offset-1 mrg-t-lg">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-box clearfix">
                  <header className="main-box-header clearfix">
                    <h1>Buy Raffle Tickets</h1>
                  </header>
                  <div className="main-box-body clearfix">
                    <div className={cx(" payment-area collapse",'in')}  >
                      <form className="ajax-form validated fv-form fv-form-bootstrap" data-onsuccess="handleBidConfirmSuccess" noValidate="novalidate">
                        <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}} />
                        <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}>
                          <span className="fa fa-spinner fa-pulse fa-fw" /> <span className="resp-message" />
                        </div>
                        <div className="amount-to-pay">Your Bid: $ <span className="total-amount">0</span></div>
                        <input type="hidden" name="amount" defaultValue={0} className="total-amount-hidden" />

                        { <div>
                          <div
                            className={cx("form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
                            <label className="control-label">Email Address</label>
                            <div className="input-group">
                              <div className="input-group-addon">
                                <i className="fa fa-envelope" aria-hidden="true"/>
                              </div>
                              <input type="email" className="form-control login-email" name="email" placeholder="Email" value={this.state.settings.userInfo.email}
                                     data-fv-field="email"
                                     ref={ref => {
                                       this.email = ref;
                                     }}
                                     disabled={true}
                                     onKeyUp={this.emailValidateHandler}/>
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
                        { <div className="row">
                          <div className="col-md-8">
                            <div
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
                                />
                                { this.state.phoneNumberFeedBack && this.state.phoneNumber &&
                                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                                { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                              </div>
                              { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                              <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgPhoneNumber}</small>}
                            </div>
                          </div>
                        </div> }
                        <div className="form-group has-feedback">
                          <label className="control-label">Number of tickets</label>
                          <select className="form-control" name="pkg" id="ticketpkgs" data-fv-field="ticketpkgs" ref={ref => {
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
                        { //this.state.setting.creditCardRequired
                         1 && <div>
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
          showModal={this.state.showMapPopup}
          headerText= {<h4>{this.state.popupHeader}</h4>}
          modelBody='<div><h1>Location</h1></div>'
          onCloseFunc={this.hidePopup} >
          <div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>
            { this.state && this.state.errorMsg }
            <div className="modal-footer">
              {/*{this.state.popupHeader == "Success" ? <button className="btn btn-success" onClick={this.submiteFundForm} >Confirm</button> : ""}*/}
              {this.state.popupHeader == "Confirm" ? <Button className="btn btn-success" loading={this.state.loading} onClick={this.confirmRaffleCheckout} >Confirm</Button> : ""}
              <button className="btn badge-danger" onClick={this.hidePopup}>Close</button>
            </div>
          </div>
        </PopupModel>
      </div>

    );
  }
}

const mapDispatchToProps = {
  confirmRaffleCheckout : (eventurl, raffleCheckoutDto)  => confirmRaffleCheckout(eventurl,raffleCheckoutDto),
  getRaffleCheckout : (eventurl, userId)  => getRaffleCheckout(eventurl, userId),
  doValidateMobileNumber: (mobileNumber) => doValidateMobileNumber(mobileNumber),
};
const mapStateToProps = (state) => ({});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(ByRaffleTickets));

