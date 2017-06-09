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
import {Tabs, Tab} from 'react-bootstrap-tabs';
import s from './Volunteer.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import  history from './../../../history';

import PopupModel from './../../../components/PopupModal/index';
import  EventAside from './../../../components/EventAside/EventAside';

import  {
  getItemStatusByCode,
  getUserByEmail,
  getAuctionItemStatusByCode,
  getAttendees,
  setAttendees
} from './../action/index';

class Volunteer extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      activeViews: 'select-action',
      isValidData: false,
      error: null,
      isLogin: false,
      itemCode:null,
      itemStatusMsg:null,
      itemData:null,

      firstName: null,
      lastName: null,
      cardNumber: null,
      cardHolder: null,
      amount: null,
      cvv: null,
      month: null,
      year: null,
      expMonth:null,
      expYear:null,

      errorReg: null,

      firstNameFeedBack: false,
      lastNameFeedBack: false,
      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
      amountFeedBack: false,
      cvvFeedBack: false,

      errorMsgfirstName: null,
      errorMsglastName: null,
      errorMsgcardNumber: null,
      errorMsgcardHolder: null,
      errorMsgamount: null,
      errorMsgNumber: null,
      errorMsgcvv: null,
      errorMsgEmail: null,

      auctionItemCode:null,
      userData:null,
      attendees:null,
      itemBarcodeCode:null,
    }
    this.setActiveView = this.setActiveView.bind(this);
    this.getAttendeesList = this.getAttendeesList.bind(this);
  }
  setActiveView = (view) => {
    if(view == "event-ticketing"){
      this.getAttendeesList();
    }
    this.setState({
      activeViews: view,
      isValidData: false,
      error: null,
      isLogin: false,
      itemCode:null,
      itemStatusMsg:null,
      itemData:null,

      firstName: null,
      lastName: null,
      cardNumber: null,
      cardHolder: null,
      amount: null,
      cvv: null,
      month: null,
      year: null,
      expMonth:null,
      expYear:null,

      errorReg: null,

      firstNameFeedBack: false,
      lastNameFeedBack: false,
      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
      amountFeedBack: false,
      cvvFeedBack: false,

      errorMsgfirstName: null,
      errorMsglastName: null,
      errorMsgcardNumber: null,
      errorMsgcardHolder: null,
      errorMsgamount: null,
      errorMsgNumber: null,
      errorMsgcvv: null,
      errorMsgEmail: null,

      auctionItemCode:null,
      userData:null,
      attendees:null,
      attendeesFilter:null,
    })
  };
  itemCodeValidateHandler = (e) => {
    console.log("->->",this.itemCode.value)
    if (this.itemCode.value.length == 3) {
      this.props.getItemStatusByCode(this.props.params && this.props.params.params, this.itemCode.value)
        .then(resp => {
          if (resp && resp.data) {
            this.setState({
              itemStatusMsg: resp.data
            })
          }
        }).catch(error => {
        this.setState({
          itemStatusMsg: null
        })
       console.log(error)
      });
    }
  };
  setAttendeesHandler = (view,index) => {
    console.log('e:',view);
    let status = view.status == "Checked In" ? 'false' :'true'
    let statusValue = view.status == "Checked In" ? 'Booked' :'Checked In'
      this.props.setAttendees(this.props.params && this.props.params.params, view.barcode,status)
        .then(resp => {
          if (resp && resp.data) {
            const attendees = [...this.state.attendees];
            console.log('attendees[index]',attendees,index);
            // attendees[index].status = statusValue;
            // this.setState({ attendees });
          }
        }).catch(error => {
        this.setState({
          itemStatusMsg: null
        })
       console.log(error)
      });
  };
  attendeesFilterHandler = (e) => {
     console.log(this.attendeesFilter.value)
    this.setState({
      attendeesFilter:this.attendeesFilter.value,
    })
   };
  getAuctionItem = (e) => {
    if (this.itemCode.value.length == 3) {
      this.props.getAuctionItemStatusByCode(this.props.params && this.props.params.params, this.itemCode.value)
        .then(resp => {
          if (resp && resp.data) {
            this.setState({
              itemData: resp.data,
              itemStatusMsg: null,
            })
          }
        }).catch(error => {
        this.setState({
          itemStatusMsg: 0
        })
       console.log(error)
      });
    }
  };
  getAttendeesList() {
      this.props.getAttendees(this.props.params && this.props.params.params)
        .then(resp => {
          if (resp && resp.data) {
            this.setState({
              attendees: resp.data,
            })
          }
        }).catch(error => {
       console.log(error)
      });
  };
  checkAuctionUser = (e) => {
    if(this.state.isValidData){
      var  modeltype='auction';
      if(this.state.activeViews == 'select-action'){modeltype='auction'}
      if(this.state.activeViews == 'sell-raffle-tickets'){modeltype='raffle'}
      if(this.state.activeViews == 'submit-raffle-tickets'){modeltype='raffle'}
      this.props.getUserByEmail(this.props.params && this.props.params.params, this.email.value,modeltype)
        .then(resp => {
          if (resp && resp.data) {
            this.setState({
              userData:resp.data,
              errorMsgEmail: null
            })
          }
        }).catch(error => {
        this.setState({
          userData:null,
          email: false,
          errorMsgEmail: "User Does Not Exists. Account Will be created."
        })
        console.log(error);
      });
    }
  };
  emailValidateHandler = (e) => {
    this.setState({
      emailFeedBack: true
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
      firstNameFeedBack: true
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
      lastNameFeedBack: true
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
    } else if (this.cardNumber.value.length !== 16) {
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
    let bid = 0;
    bid = this.state.itemData && this.state.itemData.currentBid + 20 ;
    this.setState({
      amountFeedBack: true
    });
    if (this.amount.value == '') {
      this.setState({
        amount: false,
        errorMsgNumber: "Bid Amount can't be empty",
      });
    } else if (bid > this.amount.value) {
      this.setState({
        amount: false,
        errorMsgNumber: "Bids for this item must be placed in increments of at least $25. Please enter a value of at least " ,
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
  render() {
       return (
      <div>
        {console.log("user : ",this.state.userData)}
        <views>
          { this.state.activeViews === 'select-action' &&
            <view name="select-action" className={cx(this.state.activeViews === 'select-action' && s.active)}>
            <h4 className="text-center"><strong>Select an Action</strong></h4>
            <div className>
              {/* <button class="btn btn-block btn-info mrg-t-lg mrg-b-lg" data-switch-view="attendees-checkin">Check in attendees</button> */}
              <button className="btn btn-block btn-success mrg-t-lg mrg-b-lg" onClick={() => {
                this.setActiveView('check-item-status')
              }}>Check
                Item Status
              </button>
              <button className="btn btn-block btn-info mrg-t-lg mrg-b-lg" onClick={() => {
                this.setActiveView('submit-auction-bids')
              }}>Submit
                Silent Auction Bid
              </button>
              <button className="btn btn-block btn-success mrg-t-lg mrg-b-lg" onClick={() => {
                this.setActiveView('submit-pledge')
              }}>Submit
                Pledge
              </button>
              <button className="btn btn-block btn-info mrg-t-lg mrg-b-lg" onClick={() => {
                this.setActiveView('sell-raffle-tickets')
              }}>Sell
                Raffle Tickets
              </button>
              <button className="btn btn-block btn-success mrg-t-lg mrg-b-lg" onClick={() => {
                this.setActiveView('submit-raffle-tickets')
              }}>
                Submit Raffle Tickets
              </button>
              <button className="btn btn-block btn-info mrg-t-lg mrg-b-lg" onClick={() => {
                this.setActiveView('purchase-event-tickets')
              }}>
                Sell Event Tickets
              </button>
              <button className="btn btn-block btn-info mrg-t-lg mrg-b-lg" onClick={() => {
                this.setActiveView('event-ticketing')
              }}>Check in
                Attendees
              </button>
            </div>
            <button className="btn btn-block btn-success mrg-t-lg mrg-b-lg" onClick={() => {
              this.setActiveView('donate')
            }} data-switch-view="donate">Donate
            </button>
            <p className="text-center help-text mrg-t-lg">You can change options from the menu at any time</p>
          </view> }
          { this.state.activeViews === 'check-item-status' &&
            <view name="check-item-status" className={cx(this.state.activeViews === 'check-item-status' && s.active)}>
            <h4 className="text-center"><strong>Check Item Status</strong></h4>
            <div className="form-group">
              <input type="text" maxLength={3} name="itemCode" id="checkItemStatus" placeholder="Item Code"
                     autoComplete="off" className="form-control mrg-t-lg alpha-only" ref={ref => {
                this.itemCode = ref;
              }}
                     onKeyUp={this.itemCodeValidateHandler} />
            </div>
            <div className="form-group text-center">
              <h5 id="infoMessage" className={ this.state.itemStatusMsg ? this.state.itemStatusMsg.message :'text-danger'} > { this.state.itemStatusMsg ? this.state.itemStatusMsg.message : 'Invalid Item Code' } </h5>
            </div>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={() => {
                this.setActiveView('select-action')
              }}>Back
              </button>
            </div>
          </view> }
          { this.state.activeViews === 'submit-auction-bids' &&
            <view name="submit-auction-bids"
                    className={cx(this.state.activeViews === 'submit-auction-bids' && s.active)}>
            <h4 className="text-center"><strong>Submit Silent Auction Bid</strong></h4>
            <form className="ajax-form validated fv-form fv-form-bootstrap" method="POST"
                  action="/AccelEventsWebApp/events/jkazarian8/volunteer/submit-bids"
                  data-validation-fields="getBidValidationFields" data-onsuccess="handleSubmitBidSuccess"
                  data-validate-function="validateForm" data-has-cc-info="true" data-show-cc-confirm="false"
                  data-confirm-message="getBidStripeConfirmMessage" data-switch-view="select-action"
                  data-view-name="submit-auction-bids" noValidate="novalidate">
              <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
              <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
                className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
              <div className="form-group has-feedback">
                <input type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                       className="form-control mrg-t-lg bidder-email" data-fv-field="email" ref={ref => {
                  this.email = ref;
                }}
                       onKeyUp={this.emailValidateHandler}
                       onBlur={this.checkAuctionUser}
                />
                { this.state.emailFeedBack && this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                { this.state.emailFeedBack && !this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}

                { this.state.emailFeedBack && !this.state.email &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
              </div>

              { !this.state.userData &&
              <div>
                <div
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
                </div>
                <div
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
                </div>
              </div> }
              { this.state.userData && !this.state.userData.firstName &&
              <div
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
              </div> }
              { this.state.userData && !this.state.userData.lastName &&
              <div
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
              </div>  }

              <div className="form-group">
                {this.state.userData && this.state.userData.firstName &&
                <div className="text-xs" style={{display: 'block'}}>Name: <span
                  className="bidder-name">{this.state.userData.firstName}</span></div> }
                {this.state.userData && this.state.userData.email &&
                <div className="text-xs" style={{display: 'block'}}>Email Id : <span
                  className="bidder-email">{this.state.userData.email}</span></div> }
                {this.state.userData && this.state.userData.phonenumber &&
                <div className="text-xs" style={{display: 'block'}}>Cell Number : <span
                  className="bidder-cell valueCustom">{this.state.userData.phonenumber}</span></div> }
              </div>

              <div id="payment-type-selection" className="form-group text-center">
                <input className="cc-radio" type="radio" name="paymenttype" autoComplete="off" defaultValue="cc"
                       defaultChecked="checked"/> Credit Card &nbsp; &nbsp; &nbsp; &nbsp;
                <span className="cash-radio hide"><input type="radio" name="paymenttype" autoComplete="off"
                                                         defaultValue="cash"/> Cash</span>
              </div>
              <div className="form-group has-feedback">
                <input type="text" maxLength={3} name="itemCodee" placeholder="Item Code" autoComplete="off"
                       className="form-control mrg-t-lg alpha-only"
                       ref={ref => {
                         this.itemCode = ref;
                       }}
                       onKeyUp={this.getAuctionItem}/>
              </div>
              <h5 id="infoMessage"
                  className='text-danger'> { this.state.itemStatusMsg == 0 && 'Invalid Item Code' } </h5>
              { this.state.itemData &&
              <div className="form-group">
                <div className="text-xs">Item Name : <span className="item-name"/> {this.state.itemData.itemName} </div>
                <div className="text-xs">Current Bid: <span
                  className="currency-symbol">$</span> {this.state.itemData.currentBid}<span
                  className="current-bid"/></div>
                <div className="text-xs" style={{display: 'none'}}>Starting Bid: <span
                  className="currency-symbol">$</span> {this.state.itemData.itemName}<span className="starting-bid"/>
                </div>
                <div className="text-xs">Bid Increment: <span
                  className="currency-symbol">$</span> {this.state.itemData.bidIncrement}<span
                  className="bid-increment"/></div>
                <div className="text-xs">Buy It Now Price: <span
                  className="currency-symbol">$</span> {this.state.itemData.buyItNow}<span
                  className="buy-it-now"/></div>
              </div> }
              <div className="form-group has-feedback">
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input type="number" name="amount" placeholder="Amount" autoComplete="off" className="form-control"
                         ref={ref => {
                           this.amount = ref;
                         }}
                         onKeyUp={this.amountValidateHandler}/>
                  { this.state.amountFeedBack && this.state.amount &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                  { this.state.amountFeedBack && !this.state.amount &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                </div>
                { this.state.amountFeedBack && !this.state.amount &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgNumber}</small>}
              </div>
              <div className="cc-info">
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
                      <small className="help-block"
                             data-fv-result="NOT_VALIDATED">{this.state.errorMsgcardHolder}</small>}

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
                      <small className="help-block"
                             data-fv-result="NOT_VALIDATED">{this.state.errorMsgcardNumber}.</small>}
                    </div>
                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group expiration-date has-feedback">
                          <label className="control-label">Expiration Date</label>
                          <div className="input-group">
                            <div className="input-group-addon"><i className="fa fa-calendar" aria-hidden="true"/></div>
                            <select className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth">
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
                            <select className data-stripe="exp_year" id="exp-year" data-fv-field="expYear">
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
                            <i
                              className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                          </div>
                          { this.state.cvvFeedBack && !this.state.cvv &&
                          <small className="help-block"
                                 data-fv-result="NOT_VALIDATED">{ this.state.errorMsgcvv  }</small>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <button className="btn btn-block btn-success submit">Submit</button>
              </div>
            </form>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={() => {
                this.setActiveView('select-action')
              }}>Back
              </button>
            </div>
          </view>  }
          { this.state.activeViews === 'submit-pledge' &&
            <view name="submit-pledge" className={cx(this.state.activeViews === 'submit-pledge' && s.active)}>
            <h4 className="text-center"><strong>Submit Pledge</strong></h4>
            <form className="ajax-form validated fv-form fv-form-bootstrap" method="POST"
                  action="/AccelEventsWebApp/events/jkazarian8/volunteer/submit-pledge"
                  data-validation-fields="getPledgeValidationFields" data-onsuccess="handleBidSuccess"
                  data-validate-function="validateForm" data-switch-view="select-action" data-view-name="submit-pledge"
                  noValidate="novalidate">
              <div className="form-group has-feedback">
                <input type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                       className="form-control mrg-t-lg bidder-email" data-fv-field="email"ref={ref => {
                  this.email = ref;
                }}
                       onKeyUp={this.emailValidateHandler}
                       onBlur={this.checkAuctionUser}
                />
                { this.state.emailFeedBack && this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                { this.state.emailFeedBack && !this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}

                { this.state.emailFeedBack && !this.state.email &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
              </div>
              <div className="form-group has-feedback">
                <div className="intl-tel-input allow-dropdown separate-dial-code iti-sdc-2">

                  <input type="tel" placeholder="Bidder Cell Number" autoComplete="off"
                         className="int-tel-field bidder-cell form-control mrg-t-lg" data-country="CA"
                         data-fv-field="intTelField"/><i className="form-control-feedback"
                                                         data-fv-icon-for="intTelField" style={{display: 'none'}}/>
                </div>
                <input type="hidden" name="countryCode" defaultValue="CA"/><input type="hidden" name="phoneNumber"
                                                                                  defaultValue/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="intTelField"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Phone number is required
                </small>
                <small className="help-block" data-fv-validator="intlPhoneField" data-fv-for="intTelField"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Invalid phone number
                </small>
              </div>
              { !this.state.userData  &&
              <div><div
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
              </div>
                <div
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
                </div> </div> }
              { this.state.userData  && !this.state.userData.firstName  &&
              <div
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
              </div> }
              { this.state.userData  && !this.state.userData.lastName  &&
              <div
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
              </div>  }

              <div className="form-group">
                {this.state.userData  && this.state.userData.firstName &&  <div className="text-xs" style={{display: 'block'}}>Name: <span className="bidder-name">{this.state.userData.firstName}</span></div> }
                {this.state.userData  && this.state.userData.email &&  <div className="text-xs" style={{display: 'block'}}>Email Id : <span className="bidder-email">{this.state.userData.email}</span></div> }
                {this.state.userData  && this.state.userData.phonenumber &&  <div className="text-xs" style={{display: 'block'}}>Cell Number : <span className="bidder-cell valueCustom" >{this.state.userData.phonenumber}</span></div> }
              </div>
              <div className="form-group has-feedback">
                <input type="text" maxLength={3} name="itemCodee" placeholder="Item Code" autoComplete="off"
                       className="form-control mrg-t-lg alpha-only"
                       ref={ref => {
                         this.itemCode = ref;
                       }}
                       onKeyUp={this.getAuctionItem} />
              </div>
              <h5 id="infoMessage" className='text-danger' > { this.state.itemStatusMsg == 0 && 'Invalid Item Code' } </h5>
              { this.state.itemData &&
              <div className="form-group">
                <div className="text-xs">Item Name : <span className="item-name"/> {this.state.itemData.itemName} </div>
                <div className="text-xs">Minimum Price: <span className="currency-symbol">$</span> {this.state.itemData.buyItNow}<span
                  className="buy-it-now"/></div>
              </div> }
              <div id="payment-type-selection" className="form-group text-center">
                <input type="radio" name="paymenttype" autoComplete="off" defaultValue="cc" defaultChecked="checked"/>
                Credit Card &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="radio" name="paymenttype" autoComplete="off" defaultValue="cash"/> Cash
              </div>
              <div className="form-group has-feedback">
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input type="number" name="amount" placeholder="Amount" autoComplete="off" className="form-control"
                         ref={ref => {
                           this.amount = ref;
                         }}
                         onKeyUp={this.amountValidateHandler}/>
                  { this.state.amountFeedBack && this.state.amount &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                  { this.state.amountFeedBack && !this.state.amount &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                </div>
                { this.state.amountFeedBack && !this.state.amount &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgNumber}</small>}
              </div>
              <div className="cc-info">
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
                            <div className="input-group-addon"><i className="fa fa-calendar" aria-hidden="true"/></div>
                            <select className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth">
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
                            <select className data-stripe="exp_year" id="exp-year" data-fv-field="expYear">
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
              </div>
              <div className="form-group">
                <button className="btn btn-block btn-success submit">Submit</button>
              </div>
            </form>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={() => {
                this.setActiveView('select-action')
              }}>Back
              </button>
            </div>
          </view> }
          { this.state.activeViews === 'sell-raffle-tickets' &&
            <view name="sell-raffle-tickets" className={cx(this.state.activeViews === 'sell-raffle-tickets' && s.active)}>
            <h4 className="text-center"><strong>Sell Raffle Tickets</strong></h4>
            <form className="ajax-form validated fv-form fv-form-bootstrap" method="POST"
                  action="/AccelEventsWebApp/events/jkazarian8/volunteer/sell-tickets"
                  data-validation-fields="getRafflePurchaseValidationFields" data-onsuccess="handleBidSuccess"
                  data-validate-function="validateForm" data-switch-view="select-action"
                  data-view-name="sell-raffle-tickets" noValidate="novalidate">
              <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
              <div className="form-group has-feedback">
                <input type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                       className="form-control mrg-t-lg bidder-email" data-fv-field="email" ref={ref => {
                  this.email = ref;
                }}
                       onKeyUp={this.emailValidateHandler}
                       onBlur={this.checkAuctionUser}
                />
                { this.state.emailFeedBack && this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                { this.state.emailFeedBack && !this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}

                { this.state.emailFeedBack && !this.state.email &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
              </div>

              { !this.state.userData &&
              <div>
                <div
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
                </div>
                <div
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
                </div>
              </div> }
              { this.state.userData && !this.state.userData.firstName &&
              <div
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
              </div> }
              { this.state.userData && !this.state.userData.lastName &&
              <div
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
              </div>  }

              <div className="form-group">
                {this.state.userData && this.state.userData.firstName &&
                <div className="text-xs" style={{display: 'block'}}>Name: <span
                  className="bidder-name">{this.state.userData.firstName}</span></div> }
                {this.state.userData && this.state.userData.email &&
                <div className="text-xs" style={{display: 'block'}}>Email Id : <span
                  className="bidder-email">{this.state.userData.email}</span></div> }
                {this.state.userData && this.state.userData.phonenumber &&
                <div className="text-xs" style={{display: 'block'}}>Cell Number : <span
                  className="bidder-cell valueCustom">{this.state.userData.phonenumber}</span></div> }
                  {this.state.userData && this.state.userData.phonenumber &&
                <div className="text-xs" style={{display: 'block'}}>Available Tickets : <span
                  className="bidder-cell valueCustom">{this.state.userData.availableTickets}</span></div> }
              </div>
              <div id="payment-type-selection" className="form-group text-center">
                <input type="radio" name="paymenttype" autoComplete="off" defaultValue="cc" defaultChecked="checked"/>
                Credit Card &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="radio" name="paymenttype" autoComplete="off" defaultValue="cash"/> Cash
              </div>
              <div className="form-group has-feedback">
                <label className="control-label">Number of tickets</label>
                <select className="form-control" name="pkg" id="ticketpkgs" data-fv-field="ticketpkgs">
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
                </select><i className="form-control-feedback" data-fv-icon-for="ticketpkgs" style={{display: 'none'}}/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="ticketpkgs"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Please select tickets to buy.
                </small>
              </div>
              <div className="cc-info">
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
                            <div className="input-group-addon"><i className="fa fa-calendar" aria-hidden="true"/></div>
                            <select className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth">
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
                            <select className data-stripe="exp_year" id="exp-year" data-fv-field="expYear">
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
              </div>
              <div className="form-group">
                <button className="btn btn-block btn-success submit">Submit</button>
              </div>
            </form>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={() => {
                this.setActiveView('select-action')
              }}>Back
              </button>
            </div>
          </view>}
          { this.state.activeViews === 'submit-raffle-tickets' &&
            <view name="submit-raffle-tickets"
                className={cx(this.state.activeViews === 'submit-raffle-tickets' && s.active)}>
            <h4 className="text-center"><strong>Submit Raffle Tickets</strong></h4>
            <form className="ajax-form validated fv-form fv-form-bootstrap"
                  action="/AccelEventsWebApp/events/jkazarian8/volunteer/submit-tickets" method="POST"
                  data-validation-fields="getRaffleSubmitValidationFields" data-onsuccess="handleBidSuccess"
                  data-validate-function="validateForm" data-switch-view="select-action"
                  data-view-name="submit-raffle-tickets" noValidate="novalidate">
              <div className="form-group has-feedback">
                <input type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                       className="form-control mrg-t-lg bidder-email" data-fv-field="email" ref={ref => {
                  this.email = ref;
                }}
                       onKeyUp={this.emailValidateHandler}
                       onBlur={this.checkAuctionUser}
                />
                { this.state.emailFeedBack && this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                { this.state.emailFeedBack && !this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}

                { this.state.emailFeedBack && !this.state.email &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
              </div>

              { !this.state.userData &&
              <div>
                <div
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
                </div>
                <div
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
                </div>
              </div> }
              { this.state.userData && !this.state.userData.firstName &&
              <div
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
              </div> }
              { this.state.userData && !this.state.userData.lastName &&
              <div
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
              </div>  }

              <div className="form-group">
                {this.state.userData && this.state.userData.firstName &&
                <div className="text-xs" style={{display: 'block'}}>Name: <span
                  className="bidder-name">{this.state.userData.firstName}</span></div> }
                {this.state.userData && this.state.userData.email &&
                <div className="text-xs" style={{display: 'block'}}>Email Id : <span
                  className="bidder-email">{this.state.userData.email}</span></div> }
                {this.state.userData && this.state.userData.phonenumber &&
                <div className="text-xs" style={{display: 'block'}}>Cell Number : <span
                  className="bidder-cell valueCustom">{this.state.userData.phonenumber}</span></div> }
                {this.state.userData && this.state.userData.phonenumber &&
                <div className="text-xs" style={{display: 'block'}}>Available Tickets : <span
                  className="bidder-cell valueCustom">{this.state.userData.availableTickets}</span></div> }
              </div>
              <div className="form-group has-feedback">
                <input type="text" maxLength={3} name="itemCodee" placeholder="Item Code" autoComplete="off"
                       className="form-control mrg-t-lg alpha-only"
                       ref={ref => {
                         this.itemCode = ref;
                       }}
                       onKeyUp={this.getAuctionItem} />
              </div>
              <h5 id="infoMessage" className='text-danger' > { this.state.itemStatusMsg == 0 && 'Invalid Item Code' } </h5>
              { this.state.itemData &&
              <div className="form-group">
                <div className="text-xs">Item Name : <span className="item-name"/> {this.state.itemData.itemName} </div>
                <div className="text-xs"># Of Tickets Submitted: <span className="currency-symbol">$</span> {this.state.itemData.buyItNow}<span
                  className="buy-it-now"/></div>
              </div> }

              <div className="form-group has-feedback">
                <input type="number" name="tickets" placeholder="Number Of Ticket" autoComplete="off"
                       className="form-control" data-fv-field="tickets"/><i className="form-control-feedback"
                                                                            data-fv-icon-for="tickets"
                                                                            style={{display: 'none'}}/>
              </div>
              <div className="form-group">
                <button className="btn btn-block btn-success submit">Submit</button>
              </div>
            </form>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={() => {
                this.setActiveView('select-action')
              }}>Back
              </button>
            </div>
          </view>}
          { this.state.activeViews === 'purchase-event-tickets' &&
            <view name="purchase-event-tickets"
                className={cx(this.state.activeViews === 'purchase-event-tickets' && s.active)}>
            <h4 className="text-center"><strong>Sell Event Tickets</strong></h4>
            <div className="order-form">
              <form className="ajax-form validated fv-form fv-form-bootstrap" method="POST"
                    action="/AccelEventsWebApp/events/jkazarian8/volunteer/orderTicket"
                    data-content-type="application/json; charset=UTF-8" data-prepare-data="prepareEventCheckoutData"
                    data-validation-fields="getEventCheckoutValidationFields"
                    data-onsuccess="handleEventCheckoutSuccess" data-validate-function="validateForm"
                    data-switch-view="select-action" data-view-name="purchase-event-tickets" noValidate="novalidate">
                <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
                <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
                  className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
                <div id="buy-event-tickets">
                  <div className="select-event-tickets">
                    <label className="center-block text-center mrg-t-lg">Select payment option</label>
                    <div className="form-group text-center has-feedback">
                      <input type="radio" name="paymenttype" autoComplete="off" defaultValue="card"
                             data-fv-field="paymentType"/> Credit Card &nbsp; &nbsp; &nbsp; &nbsp;
                      <input type="radio" name="paymenttype" autoComplete="off" defaultValue="cash"
                             data-fv-field="paymentType"/><i className="form-control-feedback"
                                                             data-fv-icon-for="paymentType" style={{display: 'none'}}/>
                      Cash
                      <small className="help-block" data-fv-validator="notEmpty" data-fv-for="paymentType"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Payment type is required
                      </small>
                    </div>
                    <div className="ticket-type-container">
                      <input type="hidden" defaultValue={44} name="tickettypeid"/>
                      <div className="sale-card">
                        <div className="flex-row">
                          <div className="flex-col">
                            <div className="type-name"><strong>First ticket type</strong> (<span
                              className="type-cost txt-sm gray">
                                $100.00
                              </span>)
                              <div className="pull-right">
                                SOLD OUT
                              </div>
                            </div>
                            <div className="sale-text txt-sm text-uppercase">Sale Ended on Apr 12, 2017</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="status-bar clearfix mrg-t-lg">
                      <div className="pull-left">
                        <span>
                          QTY:<span className="qty">0</span>
                        </span>
                        <span className="total-price">FREE</span>
                      </div>
                      <div className="pull-right">
                        <button type="submit" className="btn btn-success">Proceed to checkout</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="order-info" style={{display: 'none'}}>
                <div className="content"/>
              </div>
            </div>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={() => {
                this.setActiveView('select-action')
              }}>Back
              </button>
            </div>
          </view> }
          { this.state.activeViews === 'ticket-checkout-tickets' &&
            <view name="ticket-checkout-tickets"
                className={cx(this.state.activeViews === 'ticket-checkout-tickets' && s.active)}>
            <div className="tickts"/>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={() => {
                this.setActiveView('select-action')
              }}>Back
              </button>
            </div>
          </view>}
          { this.state.activeViews === 'event-ticketing' &&
            <view name="event-ticketing" className={cx(this.state.activeViews === 'event-ticketing' && s.active)}>
            <h4 className="text-center"><strong>Check in attendees</strong></h4>
            <input type="text" className="filter-attendee form-control" placeholder="Search..."
                   ref={ref => {
                     this.attendeesFilter = ref;
                   }}
                   onKeyUp={this.attendeesFilterHandler} />
            <ul className="list-group attendees-list">
              {console.log(this.state.attendees && this.state.attendees.attendees)}
              {this.state.attendees  ?
              this.state.attendees.attendees.filter(({firstname,lastname}) => (firstname + " " + lastname).includes(this.state.attendeesFilter) || null === this.state.attendeesFilter || "" === this.state.attendeesFilter  ).map((item, index) =>
                <AttendeesList key={index} items={item}  setAttendeesClickHandler={this.setAttendeesHandler} />
              ) : "Loading  ...."
            }
            </ul>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={() => {
                this.setActiveView('select-action')
              }}>Back
              </button>
            </div>
          </view> }
          { this.state.activeViews === 'donate' &&
            <view name="donate" className={cx(this.state.activeViews === 'donate' && s.active)}>
            <h4 className="text-center"><strong>Donate</strong></h4>
            <form className="ajax-form validated fv-form fv-form-bootstrap" method="POST"
                  action="/AccelEventsWebApp/events/jkazarian8/volunteer/donate"
                  data-validation-fields="getDonateValidationFields" data-onsuccess="handleBidSuccess"
                  data-validate-function="validateForm" data-switch-view="select-action" data-view-name="donate"
                  noValidate="novalidate">
              <div className="form-group has-feedback">
                <input type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                       className="form-control mrg-t-lg bidder-email" data-fv-field="email" ref={ref => {
                  this.email = ref;
                }}
                       onKeyUp={this.emailValidateHandler}
                       onBlur={this.checkAuctionUser}
                />
                { this.state.emailFeedBack && this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                { this.state.emailFeedBack && !this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}

                { this.state.emailFeedBack && !this.state.email &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
              </div>

              { !this.state.userData &&
              <div>
                <div
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
                </div>
                <div
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
                </div>
              </div> }
              { this.state.userData && !this.state.userData.firstName &&
              <div
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
              </div> }
              { this.state.userData && !this.state.userData.lastName &&
              <div
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
              </div>  }

              <div className="form-group">
                {this.state.userData && this.state.userData.firstName &&
                <div className="text-xs" style={{display: 'block'}}>Name: <span
                  className="bidder-name">{this.state.userData.firstName}</span></div> }
                {this.state.userData && this.state.userData.email &&
                <div className="text-xs" style={{display: 'block'}}>Email Id : <span
                  className="bidder-email">{this.state.userData.email}</span></div> }
                {this.state.userData && this.state.userData.phonenumber &&
                <div className="text-xs" style={{display: 'block'}}>Cell Number : <span
                  className="bidder-cell valueCustom">{this.state.userData.phonenumber}</span></div> }
              </div>
              <div className="form-group has-feedback">
                <div className="intl-tel-input allow-dropdown separate-dial-code iti-sdc-2">
                  <div className="flag-container">
                    <div className="selected-flag" tabIndex={0} title="Canada: +1">
                      <div className="iti-flag ca"/>
                      <div className="selected-dial-code">+1</div>
                      <div className="iti-arrow"/>
                    </div>

                  </div>
                  <input type="tel" placeholder="Bidder Cell Number" autoComplete="off"
                         className="int-tel-field bidder-cell form-control mrg-t-lg" data-country="CA"
                         data-fv-field="intTelField"/><i className="form-control-feedback"
                                                         data-fv-icon-for="intTelField" style={{display: 'none'}}/>
                </div>
                <input type="hidden" name="countryCode" defaultValue="CA"/><input type="hidden" name="phoneNumber"
                                                                                  defaultValue/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="intTelField"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Phone number is required
                </small>
                <small className="help-block" data-fv-validator="intlPhoneField" data-fv-for="intTelField"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Invalid phone number
                </small>
              </div>
              <div id="payment-type-selection" className="form-group text-center">
                <input type="radio" name="paymenttype" autoComplete="off" defaultValue="cc" defaultChecked="checked"/>
                Credit Card &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="radio" name="paymenttype" autoComplete="off" defaultValue="cash"/> Cash
              </div>
              <div className="form-group has-feedback">
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input type="number" name="amount" placeholder="Amount" autoComplete="off" className="form-control"
                         data-fv-field="amount"/>
                </div>
                <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="amount"
                   style={{display: 'none'}}/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="amount"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Please enter amount you want to donate.
                </small>
                <small className="help-block" data-fv-validator="digits" data-fv-for="amount"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Digits Only Accepted.
                </small>
                <small className="help-block" data-fv-validator="integer" data-fv-for="amount"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                </small>
              </div>
              <div className="cc-info">
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
                            <div className="input-group-addon"><i className="fa fa-calendar" aria-hidden="true"/></div>
                            <select className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth">
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
                            <select className data-stripe="exp_year" id="exp-year" data-fv-field="expYear">
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
              </div>
              <div className="form-group">
                <button className="btn btn-block btn-success submit">Submit</button>
              </div>
            </form>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={() => {
                this.setActiveView('select-action')
              }}>Back
              </button>
            </div>
          </view>}
        </views>
      </div>
    );
  }
}
class AttendeesList extends React.Component {
  render() {
    return (
      <li className="list-group-item checked-in" data-barcode="43def9df-e531-4d29-a367-4cc72539b27d" onClick ={ ()=>{this.props.setAttendeesClickHandler(this.props.items,this.props.key)}}
          data-filter="jon kaz ` checked in"> <span className="name">{this.props.items.firstname + " " + this.props.items.lastname + this.props.key}</span><span
        className={cx("status pull-right btn ", this.props.items.status == "Checked In" ? "btn-success" : 'btn-warning')}  >{this.props.items.status == "Checked In" ? "Checked In" : "Registered"  }</span>
      </li>
    );
  }
}
const mapDispatchToProps = {
  getItemStatusByCode: (eventUrl, itemCode) => getItemStatusByCode(eventUrl, itemCode),
  getAttendees: (eventUrl) => getAttendees(eventUrl),
  getUserByEmail: (eventUrl, itemCode,modeltype) => getUserByEmail(eventUrl, itemCode,modeltype),
  setAttendees: (eventUrl, barcode,status) => setAttendees(eventUrl, barcode,status),
  getAuctionItemStatusByCode: (eventUrl, itemCode) => getAuctionItemStatusByCode(eventUrl, itemCode),
};
const mapStateToProps = (state) => ({});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Volunteer));
