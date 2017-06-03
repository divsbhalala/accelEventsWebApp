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
import s from './Auction.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {doGetEventData,doGetSettings } from './../action/index';
import  history from './../../../history';
// general styles
//import 'react-responsive-carousel/lib/styles/main.css';

// carousel styles
//import 'react-responsive-carousel/lib/styles/carousel.css';
import  EventAside from './../../../components/EventAside/EventAside';

import  {doGetAuctionItemByCode} from './../action/index';
import  { Carousel } from 'react-responsive-carousel';
    class Auction extends React.Component {
    static propTypes = {
        title: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            settings:null,
            showBookingTicketPopup: false,
            showMapPopup: true,
            isLogin:false,

            isValidData:false,
            email:null,
            password:null,
            error:null,
            emailFeedBack:false,
            passwordFeedBack:false,
            auctionData:null,

            isValidBidData:false,

            firstName:null,
            lastName:null,
            cardNumber:null,
            cardHolder:null,
            amount:null,
            cvv:null,
            errorReg:null,

            firstNameFeedBack:false,
            lastNameFeedBack:false,
            cardNumberFeedBack:false,
            cardHolderFeedBack:false,
            amountFeedBack:false,
            cvvFeedBack:false,

            errorMsgfirstName:null,
            errorMsglastName:null,
            errorMsgcardNumber:null,
            errorMsgcardHolder:null,
            errorMsgamount:null,
            errorMsgNumber:null,
            errorMsgcvv:null,
            errorMsgEmail:null,
        };
   }

    onFormClick=(e)=>{
        e.preventDefault();

        if(this.email.value == ''){
            this.setState({
                email:false
            });
        }

        if(this.password.value == ''){
            this.setState({
                password:false
            });
        }
        if(this.state.isValidData){
            // this.props.doLogin(this.email.value, this.password.value ).then((resp)=>{
            //     if(!resp.error){
            //         history.push('/');
            //         this.setState({error:""});
            //     }
            //     else{
            //         this.setState({error:"Invalid Email or password"});
            //     }
            //
            // });
        }

    };

    emailValidateHandler= (e)=>{

        this.setState({
            emailFeedBack:true
        });
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(this.email.value == ''){
            this.setState({
                email:false,
                errorMsgEmail:"Email is required.",
            });
        }
        else{
            this.setState({
                email:re.test(this.email.value),
                errorMsgEmail:"Invalid Email.",
            });
        }
        this.setState({isValidData: !!(this.email.value && this.password.value)});

    };
    passwordValidateHandler= (e)=>{

        this.setState({
            passwordFeedBack:true
        });

        if(this.password.value == ''){

            this.setState({
                password:false
            });
        }else{
            this.setState({
                password:true
            });
        }
        this.setState({isValidData: !!(this.email.value && this.password.value)});

    };

    onBidFormClick=(e)=>{
        e.preventDefault();


        if(this.state.isValidBidData){
            // this.props.doLogin(this.email.value, this.password.value ).then((resp)=>{
            //     if(!resp.error){
            //         history.push('/');
            //         this.setState({error:""});
            //     }
            //     else{
            //         this.setState({error:"Invalid Email or password"});
            //     }
            //
            // });
        }

    };

    firstNameValidateHandler= (e)=>{

        this.setState({
            firstNameFeedBack:true
        });

        if(this.firstName.value == ''){

            this.setState({
                firstName:false
            });
        }else{
            this.setState({
                firstName:true
            });
        }
        this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});

    };
    lastNameValidateHandler= (e)=>{

        this.setState({
            lastNameFeedBack:true
        });

        if(this.lastName.value == ''){

            this.setState({
                lastName:false
            });
        }else{
            this.setState({
                lastName:true
            });
        }
        this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});

    };
    cardHolderValidateHandler= (e)=>{

        this.setState({
            cardHolderFeedBack:true
        });

        if(this.cardHolder.value == ''){

            this.setState({
                cardHolder:false,
                errorMsgcardHolder:"The card holder name is required and can't be empty",
            });
        }else if (!( this.cardHolder.value.length >= 6  && this.cardHolder.value.length <= 70 )){
            this.setState({
                cardHolder:false,
                errorMsgcardHolder:"The card holder name must be more than 6 and less than 70 characters long " ,
            });
        }else{
            this.setState({
                cardHolder:true
            });
        }
        this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});

    };
    cardNumberValidateHandler= (e)=>{

        this.setState({
            cardNumberFeedBack:true
        });

        if(this.cardNumber.value == ''){

            this.setState({
                cardNumber:false,
                errorMsgcardNumber:"Enter Card Number ",
            });
        }else if(this.cardNumber.value.length !== 16  ){
            this.setState({
                cardNumber:false,
                errorMsgcardNumber:" Please enter a Valid Card Number " ,
            });
        }else{
            this.setState({
                cardNumber:true
            });
        }
        this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});

    };
    amountValidateHandler= (e)=>{

        this.setState({
            amountFeedBack:true
        });

        if(this.amount.value == '' ){
            this.setState({
                amount:false,
                errorMsgNumber:"Bid Amount can't be empty",
            });
        }else if( this.state.auctionData.currentBid + 25 >  this.amount.value ){
            this.setState({
                amount:false,
                errorMsgNumber:"Bids for this item must be placed in increments of at least $25. Please enter a value of at least " + this.state.auctionData.currentBid,
            });
        }else{
            this.setState({
                amount:true
            });
        }
        this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});

    };
        cvvValidateHandler= (e)=>{

            this.setState({
                cvvFeedBack:true
            });

            if(this.cvv.value == ''){

                this.setState({
                    cvv:false,
                    errorMsgcvv:"The CVV is required and can't be empty",
                });
            }else if ( !( 3 <=  this.cvv.value.length && 4 >=  this.cvv.value.length )){
                this.setState({
                    cvv:false,
                    errorMsgcvv:"The CVV must be more than 4 and less than 3 characters long",
                });
            }else {
                this.setState({
                    cvv:true
                });
            }
            this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});
        };

    componentWillMount(){
        this.props.doGetEventData(this.props.params && this.props.params.params);
        this.props.doGetSettings(this.props.params && this.props.params.params, 'auction').then(resp=> {
            this.setState({
                settings: resp && resp.data
            });
        }).catch(error=>{
           // history.push('/404');
        });
        this.props.doGetAuctionItemByCode(this.props.params && this.props.params.params,this.props.itemCode)
            .then(resp=>{
                if(resp && resp.data){
                    this.setState({
                        auctionData: resp.data
                    })
                }
            }).catch(error=>{
            console.log(error)
        });

    }
    render() {
        var form_login=<div>
            <h4>Login or signup below</h4>
            <form className="ajax-form validated fv-form fv-form-bootstrap"
                        autoComplete="off" method="POST"
                        data-validate-function="validateAuctionBidForm"
                        data-onsuccess="handleLoginSignupSubmit"
                        data-validation-fields="getAuctionLoginValidationFields"
                        action="/AccelEventsWebApp/events/jkazarian8/loginsignup"
                        noValidate="novalidate"
                        onSubmit={this.onFormClick} >

            <div className="ajax-msg-box text-center mrg-b-lg"
                 style={{display: 'none'}}><span
                className="fa fa-spinner fa-pulse fa-fw"/> <span
                className="resp-message"/></div>
            <div className={cx("form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
                <label className="control-label">Email Address</label>
                <div className="input-group">
                    <div className="input-group-addon">
                        <i className="fa fa-envelope" aria-hidden="true"/>
                    </div>
                    <input type="email" className="form-control login-email"
                           name="email" data-fv-field="email"
                           ref={ref => { this.email = ref; }}
                           onKeyUp={this.emailValidateHandler}
                    />
                    { this.state.emailFeedBack && this.state.email && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.emailFeedBack && !this.state.email && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.emailFeedBack && !this.state.email &&  <small className="help-block"  data-fv-result="NOT_VALIDATED" >{this.state.errorMsgEmail}</small>}
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="form-group expiration-date has-feedback">
                        <label className="control-label">Cell Number</label>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <i className="fa fa-phone"  aria-hidden="true"/></div>
                            <select className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth">
                                <option selected value="10">+1 USA</option>
                                <option value="02">+91 IND</option>
                            </select>
                            <input type="tel" className="int-tel-field "
                                   data-country="CA" autoComplete="off"
                                   data-fv-field="intTelField"
                                   placeholder="204-234-5678"/>
                        </div>
                    </div>
                </div>
            </div>

            <div  className={cx("form-group", this.state.passwordFeedBack && 'has-feedback', this.state.passwordFeedBack && this.state.password && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
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
                           ref={ref => { this.password = ref; }}
                           onKeyUp={this.passwordValidateHandler}
                    />
                    { this.state.passwordFeedBack && this.state.password &&  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.passwordFeedBack && !this.state.password &&  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}

                </div>
                { this.state.passwordFeedBack && !this.state.password &&  <small className="help-block" data-fv-result="NOT_VALIDATED" >Password can't be empty.</small>}

            </div>
            <button className={cx("btn btn-primary text-uppercase",  !this.state.isValidData && 'disabled')} role="button" type="submit" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Getting Started..">
                SUBMIT
            </button>
        </form>
            </div>;
        var form_bid = <form className="ajax-form validated fv-form fv-form-bootstrap" method="post"
                          action="/AccelEventsWebApp/events/148/C/FAN/bid" data-has-cc-info="true"
                          data-show-cc-confirm="true" data-confirm-message="getCauseStripeConfirmMessage"
                          data-validate-function="validateCauseBidForm" data-onsuccess="handleCauseBidSubmit"
                          data-validation-fields="getCauseBidValidationFields" noValidate="novalidate"
                          onSubmit={this.onBidFormClick} >
            <button type="submit" className="fv-hidden-submit"
                    style={{display: 'none', width: 0, height: 0}}/>
            <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
                className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
            <div className={cx("form-group", this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}>
                <label className="control-label">First Name</label>
                <div className="input-group">
                    <div className="input-group-addon">
                        <i className="fa fa-user" aria-hidden="true"/>
                    </div>
                    <input type="text" className="form-control" name="firstname" data-fv-field="firstName"
                           ref={ref => { this.firstName = ref; }}
                           onKeyUp={this.firstNameValidateHandler} />
                    { this.state.firstNameFeedBack && this.state.email && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.firstNameFeedBack && !this.state.email && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.firstNameFeedBack && !this.state.firstName &&  <small className="help-block" data-fv-result="NOT_VALIDATED" >Firstname is required.</small>}
            </div>
            <div className={cx("form-group", this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}>
                <label className="control-label">Last Name</label>
                <div className="input-group">
                    <div className="input-group-addon">
                        <i className="fa fa-user" aria-hidden="true"/>
                    </div>
                    <input type="text" className="form-control" name="lastname" data-fv-field="lastName"
                           ref={ref => { this.lastName = ref; }}
                           onKeyUp={this.lastNameValidateHandler} />
                    { this.state.lastNameFeedBack && this.state.lastName && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.lastNameFeedBack && !this.state.lastName && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.lastNameFeedBack && !this.state.lastName &&  <small className="help-block"  data-fv-result="NOT_VALIDATED" >Lastname is required.</small>}
            </div>
            <div  className={cx("form-group", this.state.amountFeedBack && 'has-feedback', this.state.amountFeedBack && this.state.amount && 'has-success', this.state.amountFeedBack && (!this.state.amount) && 'has-error')}>
                <div className="row">
                    <div className="col-md-6">
                        <label className="control-label">Bid Amount</label>
                        <div className="input-group">
                            <div className="input-group-addon">$</div>
                            <input type="number" className="form-control" name="itembid" id="itembid"
                                   placeholder="Amount"  step required="required"
                                   data-isprocessingfeestopurchaser="false" data-fv-field="itembid"
                                   ref={ref => { this.amount = ref; }}
                                   onKeyUp={this.amountValidateHandler} />
                            { this.state.amountFeedBack && this.state.amount && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                            { this.state.amountFeedBack && !this.state.amount && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                        </div>
                        { this.state.amountFeedBack && !this.state.amount &&  <small className="help-block" data-fv-result="NOT_VALIDATED" >{this.state.errorMsgNumber}</small>}


                    </div>
                </div>
            </div>

            <style
                dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n"}}/>
            <div className="stripe-form">
                <div className="stripe-card-info">
                    <div className={cx("form-group", this.state.cardHolderFeedBack && 'has-feedback', this.state.cardHolderFeedBack && this.state.cardHolder && 'has-success', this.state.cardHolderFeedBack && (!this.state.cardHolder) && 'has-error')}>
                        <label className="control-label">Card Holder Name</label>
                        <div className="input-group">
                            <div className="input-group-addon"><i className="fa fa-user" aria-hidden="true"/></div>
                            <input type="text" className="form-control" id="cardname" data-stripe="name"
                                   placeholder="Name on the card" data-fv-field="cardholdername"
                                   ref={ref => { this.cardHolder = ref; }}
                                   onKeyUp={this.cardHolderValidateHandler} />
                            { this.state.cardHolderFeedBack && this.state.cardHolder && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                            { this.state.cardHolderFeedBack && !this.state.cardHolder && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                        </div>
                        { this.state.cardHolderFeedBack && !this.state.cardHolder &&  <small className="help-block" data-fv-result="NOT_VALIDATED" >{this.state.errorMsgcardHolder}</small>}

                    </div>
                    <div className={cx("form-group", this.state.cardNumberFeedBack && 'has-feedback', this.state.cardNumberFeedBack && this.state.cardNumber && 'has-success', this.state.cardNumberFeedBack && (!this.state.cardNumber) && 'has-error')}>
                        <label className="control-label">Credit Card Number</label>
                        <div className="input-group">
                            <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true"/>
                            </div>
                            <input type="number" className="form-control" id="cardnumber"
                                   placeholder="8888-8888-8888-8888" maxLength={16} data-stripe="number"
                                   required="required" data-fv-field="cardnumber"
                                   ref={ref => { this.cardNumber = ref; }}
                                   onKeyUp={this.cardNumberValidateHandler} />
                            { this.state.cardNumberFeedBack && this.state.cardNumber && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                            { this.state.cardNumberFeedBack && !this.state.cardNumber && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                        </div>
                        { this.state.cardNumberFeedBack && !this.state.cardNumber &&  <small className="help-block" data-fv-result="NOT_VALIDATED" >{this.state.errorMsgcardNumber}.</small>}


                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group expiration-date has-feedback">
                                <label className="control-label">Expiration Date</label>
                                <div className="input-group">
                                    <div className="input-group-addon"><i className="fa fa-calendar"
                                                                          aria-hidden="true"/></div>
                                    <select className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth">
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
                                    <select className data-stripe="exp_year" id="exp-year" data-fv-field="expYear">
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
                            <div className={cx("input-group", this.state.cvvFeedBack && 'has-feedback', this.state.cvvFeedBack && this.state.cvv && 'has-success', this.state.cvvFeedBack && (!this.state.cvv) && 'has-error')}>
                                <label className="control-label">CVV Number</label>
                                <div className="input-group">
                                    <input type="number" className="form-control" maxLength={4} size={4}
                                           data-stripe="cvc" id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"
                                           ref={ref => { this.cvv = ref; }}
                                           onKeyUp={this.cvvValidateHandler} />
                                    { this.state.cvvFeedBack && this.state.cvv && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                                    { this.state.cvvFeedBack && !this.state.cvv && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                                </div>
                                { this.state.cvvFeedBack && !this.state.cvv &&  <small className="help-block" data-fv-result="NOT_VALIDATED" >{ this.state.errorMsgcvv  }</small>}

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
            </div>

            <button className={cx("btn btn-primary text-uppercase",  !this.state.isValidBidData && 'disabled')} role="button" type="submit" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Getting Started..">
                Submit Pledge
            </button>

            <a role="button" className="btn btn-success"
               href="/event/jkazarian8">Go back to All Items</a>
        </form>;
        var form_bid_close =<div className="col-sm-6">
                        <div className="curr-bid-number">$<span className="current-bid">{this.state.auctionData && this.state.auctionData.currentBid}</span></div>
                        <div className="curr-bid-text">Current Bid</div>
                    </div>;
        var div_bid_close =<div className="alert alert-success text-center">Item Has Been Purchased for $<span className="current-bid">400</span></div>
        var bid_active=this.state.auctionData && this.state.auctionData.purchased;

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div id="content-wrapper">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-4">
                                <EventAside activeTab={'Auction'} eventData={this.props.eventData} settings={this.state.settings} eventTicketData={this.props.eventTicketData}
                                             showMapPopup={this.showMapPopup} activeCategory={false} />
                               </div>
                            <div className="col-lg-9 col-md-8 col-sm-8">
                                <div className="main-box clearfix">
                                    <h1 className="text-center mrg-t-lg" id="item-name">{this.state.auctionData && this.state.auctionData.name}</h1>
                                    <div className="row mrg-t-lg">
                                        <div className="col-md-6">
                                            <div className="pad-l-md pad-r-md">
                                                <div className="item-image">
                                                    {console.log('--image',this.state.auctionData && this.state.auctionData.images)}
                                                    <Carousel axis="horizontal" showThumbs={false} showArrows={true} dynamicHeight emulateTouch>
                                                        {this.state.auctionData &&
                                                        this.state.auctionData.images.map((item,index)=>
                                                            <ImageList key={index}  item={item} />
                                                        )
                                                        }
                                                    </Carousel>

                                                </div>
                                            </div>
                                            <div className="mrg-t-lg pad-l-md pad-r-md">
                                                {this.state.auctionData && this.state.auctionData.description}
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{paddingRight: 16}}>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <div className="curr-bid-number">$<span
                                                        className="current-bid">{this.state.auctionData && this.state.auctionData.currentBid}</span></div>
                                                    <div className="curr-bid-text">Current Bid</div>
                                                </div>
                                                {this.state.auctionData &&  this.state.auctionData.buyItNowPrice > 0 &&  <div className="col-sm-4">
                                                    <div className="curr-bid-number">$<span
                                                        className="current-bid">{this.state.auctionData.buyItNowPrice}</span></div>
                                                    <div className="curr-bid-text">BUY NOW PRICE</div>
                                                </div>}
                                                {this.state.auctionData &&  this.state.auctionData.marketValue > 0 &&  <div className="col-sm-4">
                                                    <div className="curr-bid-number">$<span
                                                        className="current-bid">{this.state.auctionData.marketValue}</span></div>
                                                    <div className="curr-bid-text">MARKET VALUE </div>
                                                </div>}
                                                {/*{ bid_active ? form_bid_close :'' }*/}
                                            </div>
                                            { bid_active ? div_bid_close :'' }
                                            { !bid_active ?  this.state.isLogin ? form_bid : form_login :'' }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class ImageList extends React.Component {
    render() {
        return (
        <div>
            <img src={this.props.item.imageUrl ? 'http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/'+this.props.item.imageUrl : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg" } />
        </div>

        );}
}

const mapDispatchToProps = {
    doGetEventData : (eventUrl) => doGetEventData(eventUrl),
    doGetAuctionItemByCode : (eventUrl, itemCode) => doGetAuctionItemByCode(eventUrl, itemCode),
    doGetSettings : (eventUrl, type) => doGetSettings(eventUrl, type),
};
const mapStateToProps = (state) => ({
    eventData:state.event && state.event.data,
    eventTicketData:state.event && state.event.ticket_data,
    auction_data:state.event && state.event.auction_data,

});

export default  connect(mapStateToProps,mapDispatchToProps)(withStyles(s)(Auction));
