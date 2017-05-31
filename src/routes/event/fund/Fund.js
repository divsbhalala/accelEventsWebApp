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
import s from './fund.css';
import cx from 'classNames';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

import {onFormSubmit, doLogin, storeLoginData, storeToken} from './action/index';

import  history from './../../../history';
import PopupModel from './../../../components/PopupModal/index';
import  EventAside from './../../../components/EventAside/EventAside';

import  {doGetFundANeedItemByCode} from './../action/index';

class Fund extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      tab: 'The Event',
      showBookingTicketPopup: false,
      showMapPopup: false,
        isValidData:false,
        error:null,

        email:null,
        firstName:null,
        lastName:null,
        cardNumber:null,
        cardHolder:null,
        amount:null,

        emailFeedBack:false,
        firstNameFeedBack:false,
        lastNameFeedBack:false,
        cardNumberFeedBack:false,
        cardHolderFeedBack:false,
        amountFeedBack:false,
    }
    this.showSlider = this.showSlider.bind(this);
    this.hideSlider = this.hideSlider.bind(this);
      this.showMapPopup = this.showMapPopup.bind(this);
      this.hideMapPopup = this.hideMapPopup.bind(this);
  }
    showMapPopup= (e)=>{
        e.preventDefault();
        this.setState({
            showMapPopup:true
        })
    }

    hideMapPopup=()=>{
        this.setState({
            showMapPopup:false
        })
    }
  showSlider = (e) => {
    e.preventDefault();
    this.setState({
      showBookingTicketPopup: true
    })
  }

  hideSlider = () => {
    this.setState({
      showBookingTicketPopup: true
    })
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
                email:false
            });
        }
        else{
            this.setState({
                email:re.test(this.email.value)
            });
        }
        this.setState({isValidData: !!(this.email.value && this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value)});

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
        this.setState({isValidData: !!(this.email.value && this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value)});

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
        this.setState({isValidData: !!(this.email.value && this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value)});

    };
    cardHolderValidateHandler= (e)=>{

        this.setState({
            cardHolderFeedBack:true
        });

        if(this.cardHolder.value == ''){

            this.setState({
                cardHolder:false
            });
        }else{
            this.setState({
                cardHolder:true
            });
        }
        this.setState({isValidData: !!(this.email.value && this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value)});

    };
    cardNumberValidateHandler= (e)=>{

        this.setState({
            cardNumberFeedBack:true
        });

        if(this.cardNumber.value == ''){

            this.setState({
                cardNumber:false
            });
        }else{
            this.setState({
                cardNumber:true
            });
        }
        this.setState({isValidData: !!(this.email.value && this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value)});

    };
    amountValidateHandler= (e)=>{

        this.setState({
            amountFeedBack:true
        });

        if(this.amount.value == ''){

            this.setState({
                amount:false
            });
        }else{
            this.setState({
                amount:true
            });
        }
        this.setState({isValidData: !!(this.email.value && this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value)});

    };
    componentWillMount(){
        this.props.doGetFundANeedItemByCode(this.props.params && this.props.params.params,this.props.itemCode)
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
      console.log('<--',this.state.auctionData);
    return (
      <div className="row">
        <div className="col-lg-12">
          <div id="content-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">
                <EventAside activeTab={'Fund a Need'} showSlider={this.showSlider}
                            showMapPopup={this.showMapPopup}/>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8">
                <div className="main-box clearfix">
                  <h1 className="text-center mrg-t-lg" id="item-name">{this.state.auctionData && this.state.auctionData.name}</h1>
                  <div className="row mrg-t-lg">
                    <div className="col-md-6">
                      <div className="pad-l-md pad-r-md">
                        <div className="item-image">
                          <div className="item-image-inner" style={{
                            backgroundImage: 'url("http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/8921aa81-cc4e-4d9b-a19a-2d5f07fc0aa5_lighthouse.jpg")',
                            width: '',
                            transform: 'rotate(0deg)'
                          }}/>
                        </div>
                      </div>
                      <div className="mrg-t-lg pad-l-md pad-r-md">
                      </div>
                    </div>
                    <div className="col-md-6" style={{paddingRight: 16}}>
                      <div className="row">
                        <div className="text-danger text-center bold"> Please activate this module to start accepting
                          pledges.
                        </div>
                        <div className="col-sm-6 col-md-6">
                          <h3 className="item-label ">Pledge Amount</h3>
                          <h4 className="item-bid-price">
                            $ <span className="item-bid-price"> {this.state.auctionData && this.state.auctionData.pledge_price} </span>
                          </h4>
                        </div>
                      </div>
                      <form className="ajax-form validated fv-form fv-form-bootstrap" method="post"
                            action="/AccelEventsWebApp/events/148/C/FAN/bid" data-has-cc-info="true"
                            data-show-cc-confirm="true" data-confirm-message="getCauseStripeConfirmMessage"
                            data-validate-function="validateCauseBidForm" data-onsuccess="handleCauseBidSubmit"
                            data-validation-fields="getCauseBidValidationFields" noValidate="novalidate"
                            onSubmit={this.onFormClick} >
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
                            { this.state.firstNameFeedBack && !this.state.firstName &&  <small className="help-block" data-fv-validator="emailAddress"  data-fv-for="email" data-fv-result="NOT_VALIDATED" >Enter First Name.</small>}
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
                            { this.state.lastNameFeedBack && !this.state.lastName &&  <small className="help-block" data-fv-validator="lastName"  data-fv-for="lastName" data-fv-result="NOT_VALIDATED" >Enter Valid Name.</small>}
                        </div>
                        <h4><a role="button" href="#login-user" data-toggle="modal" data-form="login">Log in</a> or Sign
                          up below</h4>
                          <div className={cx("form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
                          <label className="control-label">Email Address</label>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <i className="fa fa-envelope" aria-hidden="true"/>
                            </div>
                            <input type="email" className="form-control login-email" name="email"
                                   data-fv-field="email"
                                   ref={ref => { this.email = ref; }}
                                   onKeyUp={this.emailValidateHandler} />
                              { this.state.emailFeedBack && this.state.email && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                              { this.state.emailFeedBack && !this.state.email && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                          </div>
                            { this.state.emailFeedBack && !this.state.email &&  <small className="help-block" data-fv-validator="emailAddress"  data-fv-for="email" data-fv-result="NOT_VALIDATED" >Invalid Email.</small>}
                        </div>
                        <style
                          dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n"}}/>
                        <div className="stripe-form">
                          <div className="stripe-card-info">
                              <div className={cx("form-group", this.state.cardHolderFeedBack && 'has-feedback', this.state.cardHolderFeedBack && this.state.email && 'has-success', this.state.cardHolderFeedBack && (!this.state.cardHolder) && 'has-error')}>
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
                                  { this.state.cardHolderFeedBack && !this.state.cardHolder &&  <small className="help-block" data-fv-validator="emailAddress"  data-fv-for="email" data-fv-result="NOT_VALIDATED" >Invalid cardHolder.</small>}

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
                                  { this.state.cardNumberFeedBack && !this.state.cardNumber &&  <small className="help-block" data-fv-validator="emailAddress"  data-fv-for="email" data-fv-result="NOT_VALIDATED" >Invalid cardNumber.</small>}


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
                                  <i className="form-control-feedback fv-bootstrap-icon-input-group"
                                     data-fv-icon-for="expYear" style={{display: 'none'}}/><i
                                  className="form-control-feedback fv-bootstrap-icon-input-group"
                                  data-fv-icon-for="expMonth" style={{display: 'none'}}/>
                                  <div className="small text-danger js-error card_error exp_year exp_month"/>
                                  <small className="help-block" data-fv-validator="notEmpty" data-fv-for="expMonth"
                                         data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration month is required
                                  </small>
                                  <small className="help-block" data-fv-validator="digits" data-fv-for="expMonth"
                                         data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration month can contain digits only
                                  </small>
                                  <small className="help-block" data-fv-validator="callback" data-fv-for="expMonth"
                                         data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Your card is Expired
                                  </small>
                                  <small className="help-block" data-fv-validator="notEmpty" data-fv-for="expYear"
                                         data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration year is required
                                  </small>
                                  <small className="help-block" data-fv-validator="digits" data-fv-for="expYear"
                                         data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration year can contain digits only
                                  </small>
                                  <small className="help-block" data-fv-validator="callback" data-fv-for="expYear"
                                         data-fv-result="NOT_VALIDATED" style={{display: 'none'}}></small>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group has-feedback">
                                  <label className="control-label">CVV Number</label>
                                  <div className="input-group">
                                    <input type="number" className="form-control" maxLength={4} size={4}
                                           data-stripe="cvc" id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"/>
                                  </div>
                                  <i className="form-control-feedback fv-bootstrap-icon-input-group"
                                     data-fv-icon-for="cvv" style={{display: 'none'}}/>
                                  <div className="small text-danger js-error card_error cvc"/>
                                  <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cvv"
                                         data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV is required and can't be empty
                                  </small>
                                  <small className="help-block" data-fv-validator="stringLength" data-fv-for="cvv"
                                         data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV must be more than 4 and less than 3 characters long
                                  </small>
                                  <small className="help-block" data-fv-validator="integer" data-fv-for="cvv"
                                         data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not  valid
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group has-feedback">
                          <div className="row">
                            <div className="col-md-6">
                                <div className={cx("input-group", this.state.amountFeedBack && 'has-feedback', this.state.amountFeedBack && this.state.amount && 'has-success', this.state.amountFeedBack && (!this.state.amount) && 'has-error')}>
                                <div className="input-group-addon">$</div>
                                <input type="number" className="form-control" name="itembid" id="itembid"
                                       placeholder="Pledge Amount" min={300} step required="required"
                                       data-isprocessingfeestopurchaser="false" data-fv-field="itembid"
                                       ref={ref => { this.amount = ref; }}
                                       onKeyUp={this.amountValidateHandler} />
                                    { this.state.amountFeedBack && this.state.amount && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                                    { this.state.amountFeedBack && !this.state.amount && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                                </div>
                                { this.state.amountFeedBack && !this.state.amount &&  <small className="help-block" data-fv-validator="emailAddress"  data-fv-for="email" data-fv-result="NOT_VALIDATED" >Invalid Aamount.</small>}


                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="checkbox-nice">
                            <input type="checkbox" id="uptodate" name="uptodate" defaultChecked/> <label
                            htmlFor="uptodate">Stay up to date with Accelevents</label>
                          </div>
                        </div>
                        {/*<a role="button" className="btn btn-primary " data-toggle="modal" href="#"*/}
                           {/*onclick="Utils.alert('Need Completed', 'Pledges are no longer being accepted for this Need.');">*/}
                          {/*Submit Pledge</a>*/}
                          <button className={cx("btn btn-primary text-uppercase",  !this.state.isValidData && 'disabled')} role="button" type="submit" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Getting Started..">
                              Submit Pledge
                          </button>

                          <a role="button" className="btn btn-success"
                           href="/AccelEventsWebApp/events/jkazarian8#causeauction">Go back to All Items</a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          <PopupModel
              id="mapPopup"
              showModal={this.state.showMapPopup}
              headerText="Event Location"
              modelBody='<div><h1>Location</h1></div>'
              onCloseFunc={this.hideMapPopup}
          />
      </div>
    );
  }
}


const mapDispatchToProps = {
    doGetFundANeedItemByCode : (eventUrl, itemCode) => doGetFundANeedItemByCode(eventUrl, itemCode),
};
const mapStateToProps = (state) => ({
    auction_data:state.event && state.event.auction_data,

});

export default  connect(mapStateToProps,mapDispatchToProps)(withStyles(s)(Fund));
