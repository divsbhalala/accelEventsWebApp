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
import s from './Raffle.css';
import cx from 'classNames';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

import  EventAside from './../../components/EventAside/EventAside';

class Fund extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      tab: 'The Event',
      showBookingTicketPopup: false,
      showMapPopup: true,
    }
    this.showBookingPopup = this.showBookingPopup.bind(this);
    this.hideBookingPopup = this.hideBookingPopup.bind(this);
  }

  showBookingPopup = (e) => {
    e.preventDefault();
    this.setState({
      showBookingTicketPopup: true
    })
  }

  hideBookingPopup = () => {
    this.setState({
      showBookingTicketPopup: true
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className={cx("header-img", "text-center")}>
              <img
                src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/0-1900x300/d631f896-be71-4e95-9d29-9ce501f7a4b8_fall_formal_2015.png"
                className={cx("img-responsive", "img-banner")} style={{width: "100%"}}/>
            </div>
          </div>
          <div id="content-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">
                <EventAside activeTab={'Fund a Need'} showBookingPopup={this.showBookingPopup}
                            showMapPopup={this.showMapPopup}/>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8">
                <div className="main-box clearfix">
                  <h1 className="text-center mrg-t-lg" id="item-name">My Fund a Need Item</h1>
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
                            $ <span className="item-bid-price"> 300 </span>
                          </h4>
                        </div>
                      </div>
                      <form className="ajax-form validated fv-form fv-form-bootstrap" method="post"
                            action="/AccelEventsWebApp/events/148/C/FAN/bid" data-has-cc-info="true"
                            data-show-cc-confirm="true" data-confirm-message="getCauseStripeConfirmMessage"
                            data-validate-function="validateCauseBidForm" data-onsuccess="handleCauseBidSubmit"
                            data-validation-fields="getCauseBidValidationFields" noValidate="novalidate">
                        <button type="submit" className="fv-hidden-submit"
                                style={{display: 'none', width: 0, height: 0}}/>
                        <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
                          className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
                        <div className="form-group has-feedback">
                          <label className="control-label">First Name</label>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <i className="fa fa-user" aria-hidden="true"/>
                            </div>
                            <input type="text" className="form-control" name="firstname" data-fv-field="firstName"/>
                          </div>
                          <i className="form-control-feedback fv-bootstrap-icon-input-group"
                             data-fv-icon-for="firstName" style={{display: 'none'}}/>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="firstName"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Firstname is required.
                          </small>
                        </div>
                        <div className="form-group has-feedback">
                          <label className="control-label">Last Name</label>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <i className="fa fa-user" aria-hidden="true"/>
                            </div>
                            <input type="text" className="form-control" name="lastname" data-fv-field="lastName"/>
                          </div>
                          <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="lastName"
                             style={{display: 'none'}}/>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="lastName"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Lastname is required.
                          </small>
                        </div>
                        <h4><a role="button" href="#login-user" data-toggle="modal" data-form="login">Log in</a> or Sign
                          up below</h4>
                        <div className="form-group has-feedback">
                          <label className="control-label">Email Address</label>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <i className="fa fa-envelope" aria-hidden="true"/>
                            </div>
                            <input type="email" className="form-control login-email" name="email"
                                   data-fv-field="email"/>
                          </div>
                          <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="email"
                             style={{display: 'none'}}/>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="email"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Email is required.
                          </small>
                          <small className="help-block" data-fv-validator="emailAddress" data-fv-for="email"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Invalid Email.
                          </small>
                        </div>
                        <style
                          dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n"}}/>
                        <div className="stripe-form">
                          <div className="stripe-card-info">
                            <div className="form-group has-feedback">
                              <label className="control-label">Card Holder Name</label>
                              <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-user" aria-hidden="true"/></div>
                                <input type="text" className="form-control" id="cardname" data-stripe="name"
                                       placeholder="Name on the card" data-fv-field="cardholdername"/>
                              </div>
                              <i className="form-control-feedback fv-bootstrap-icon-input-group"
                                 data-fv-icon-for="cardholdername" style={{display: 'none'}}/>
                              <div className="small text-danger js-error card_error name"/>
                              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cardholdername"
                                     data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name is
                                required and can't be empty
                              </small>
                              <small className="help-block" data-fv-validator="stringLength"
                                     data-fv-for="cardholdername" data-fv-result="NOT_VALIDATED"
                                     style={{display: 'none'}}>The card holder name must be more than 6 and less than 70
                                characters long
                              </small>
                              <small className="help-block" data-fv-validator="callback" data-fv-for="cardholdername"
                                     data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name can
                                not start or end with white space
                              </small>
                            </div>
                            <div className="form-group has-feedback">
                              <label className="control-label">Credit Card Number</label>
                              <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true"/>
                                </div>
                                <input type="number" className="form-control" id="cardnumber"
                                       placeholder="8888-8888-8888-8888" maxLength={16} data-stripe="number"
                                       required="required" data-fv-field="cardnumber"/>
                              </div>
                              <i className="form-control-feedback fv-bootstrap-icon-input-group"
                                 data-fv-icon-for="cardnumber" style={{display: 'none'}}/>
                              <div className="small text-danger js-error card_error number"/>
                              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cardnumber"
                                     data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number is
                                required and can't be empty
                              </small>
                              <small className="help-block" data-fv-validator="creditCard" data-fv-for="cardnumber"
                                     data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number is
                                invalid
                              </small>
                              <small className="help-block" data-fv-validator="integer" data-fv-for="cardnumber"
                                     data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                              </small>
                              <small className="help-block" data-fv-validator="stringLength" data-fv-for="cardnumber"
                                     data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                              </small>
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
                              <div className="input-group">
                                <div className="input-group-addon">$</div>
                                <input type="number" className="form-control" name="itembid" id="itembid"
                                       placeholder="Pledge Amount" min={300} step required="required"
                                       data-isprocessingfeestopurchaser="false" data-fv-field="itembid"/>
                              </div>
                              <i className="form-control-feedback fv-bootstrap-icon-input-group"
                                 data-fv-icon-for="itembid" style={{display: 'none'}}/>
                              <div className="itembid-help-text help-text" style={{display: 'none'}}>
                                You will be charged the pledge amount plus $<span className="stripe-price">0</span> in
                                credit card transaction fees.
                              </div>
                              <small className="help-block" data-fv-validator="callback" data-fv-for="itembid"
                                     data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Pledge Amount can't be
                                empty
                              </small>
                              <small className="help-block" data-fv-validator="digits" data-fv-for="itembid"
                                     data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Digits Only Accepted.
                              </small>
                              <small className="help-block" data-fv-validator="greaterThan" data-fv-for="itembid"
                                     data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Submitted pledge amount
                                should be greater than or equal to the stated pledge amount.
                              </small>
                              <small className="help-block" data-fv-validator="integer" data-fv-for="itembid"
                                     data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                              </small>
                              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="itembid"
                                     data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="checkbox-nice">
                            <input type="checkbox" id="uptodate" name="uptodate" defaultChecked/> <label
                            htmlFor="uptodate">Stay up to date with Accelevents</label>
                          </div>
                        </div>
                        <a role="button" className="btn btn-primary " data-toggle="modal" href="#"
                           onclick="Utils.alert('Need Completed', 'Pledges are no longer being accepted for this Need.');">
                          Submit Pledge</a>
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
      </div>
    );
  }
}


//export default withStyles(s)(Event);
export default (withStyles(s)(Fund));
