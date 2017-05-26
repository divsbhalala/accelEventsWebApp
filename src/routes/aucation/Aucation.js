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
import s from './Aucation.css';
import cx from 'classNames';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

import  EventAside from './../../components/EventAside/EventAside';

class Aucation extends React.Component {
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
                                <EventAside activeTab={'Raffle'} showBookingPopup={this.showBookingPopup}
                                            showMapPopup={this.showMapPopup}/>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-8">
                                <div className="main-box clearfix">
                                    <h1 className="text-center mrg-t-lg" id="item-name">Louis Vuitton Sunglasses</h1>
                                    <div className="row mrg-t-lg">
                                        <div className="col-md-6">
                                            <div className="pad-l-md pad-r-md">
                                                <div className="item-image">
                                                    <div className="item-image-inner"
                                                         style={{backgroundImage: 'url("http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg")'}}/>
                                                </div>
                                            </div>
                                            <div className="mrg-t-lg pad-l-md pad-r-md">Trendy Louis Vuitton Sunglasses
                                                - Like New
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{paddingRight: 16}}>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="curr-bid-number">$<span
                                                        className="current-bid">425</span></div>
                                                    <div className="curr-bid-text">Current Bid</div>
                                                </div>
                                            </div>
                                            <h4>Login or signup below</h4>
                                            <form className="ajax-form validated fv-form fv-form-bootstrap"
                                                  autoComplete="off" method="POST"
                                                  data-validate-function="validateAuctionBidForm"
                                                  data-onsuccess="handleLoginSignupSubmit"
                                                  data-validation-fields="getAuctionLoginValidationFields"
                                                  action="/AccelEventsWebApp/events/jkazarian8/loginsignup"
                                                  noValidate="novalidate">
                                                <button type="submit" className="fv-hidden-submit"
                                                        style={{display: 'none', width: 0, height: 0}}/>
                                                <div className="ajax-msg-box text-center mrg-b-lg"
                                                     style={{display: 'none'}}><span
                                                    className="fa fa-spinner fa-pulse fa-fw"/> <span
                                                    className="resp-message"/></div>
                                                <div className="form-group has-feedback">
                                                    <label className="control-label">Email Address</label>
                                                    <div className="input-group">
                                                        <div className="input-group-addon">
                                                            <i className="fa fa-envelope" aria-hidden="true"/>
                                                        </div>
                                                        <input type="email" className="form-control login-email"
                                                               name="email" data-fv-field="email"/>
                                                    </div>
                                                    <i className="form-control-feedback fv-bootstrap-icon-input-group"
                                                       data-fv-icon-for="email" style={{display: 'none'}}/>
                                                    <small className="help-block" data-fv-validator="notEmpty"
                                                           data-fv-for="email" data-fv-result="NOT_VALIDATED"
                                                           style={{display: 'none'}}>Email is required.
                                                    </small>
                                                    <small className="help-block" data-fv-validator="emailAddress"
                                                           data-fv-for="email" data-fv-result="NOT_VALIDATED"
                                                           style={{display: 'none'}}>Invalid Email.
                                                    </small>
                                                </div>
                                                <div className="form-group has-feedback">
                                                    <label className="control-label">Cell Number</label>
                                                    <div className="input-group">
                                                        <div className="input-group-addon">
                                                            <i className="fa fa-phone" aria-hidden="true"/>
                                                        </div>
                                                        <div className="intl-tel-input allow-dropdown separate-dial-code iti-sdc-2">
                                                            <div className="flag-container">
                                                                <div className="selected-flag" tabIndex={0}
                                                                     title="Canada: +1">
                                                                    <div className="iti-flag ca"/>
                                                                    <div className="selected-dial-code">+1</div>
                                                                    <div className="iti-arrow"/>
                                                                </div>
                                                                <ul className="country-list hide">
                                                                    <li className="country preferred" data-dial-code={1}
                                                                        data-country-code="us">
                                                                        <div className="flag-box">
                                                                            <div className="iti-flag us"/>
                                                                        </div>
                                                                        <span  className="country-name">United States</span>
                                                                        <span className="dial-code">+1</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <input type="tel" className="int-tel-field form-control"
                                                                   data-country="CA" autoComplete="off"
                                                                   data-fv-field="intTelField"
                                                                   placeholder="204-234-5678"/>
                                                        </div>
                                                        <input type="hidden" name="countryCode"
                                                               defaultValue="CA"/>
                                                        <input type="hidden"  name="phoneNumber"  defaultValue/>
                                                    </div>
                                                    <i className="form-control-feedback fv-bootstrap-icon-input-group"
                                                       data-fv-icon-for="intTelField" style={{display: 'none'}}/>
                                                    <small className="help-block" data-fv-validator="notEmpty"
                                                           data-fv-for="intTelField" data-fv-result="NOT_VALIDATED"
                                                           style={{display: 'none'}}>Phone number is required
                                                    </small>
                                                    <small className="help-block" data-fv-validator="intlPhoneField"
                                                           data-fv-for="intTelField" data-fv-result="NOT_VALIDATED"
                                                           style={{display: 'none'}}>Invalid phone number
                                                    </small>
                                                </div>
                                                <div className="form-group has-feedback">
                                                    <label className="control-label login-password">Enter or Create
                                                        Password</label>
                                                    <div className="input-group">
                                                        <div className="input-group-addon">
                                                            <i className="fa fa-key" aria-hidden="true"/>
                                                        </div>
                                                        <input type="password" className="form-control" name="password"
                                                               autoComplete="new-password"
                                                               placeholder="Enter or create a password"
                                                               data-fv-field="paswd"/>
                                                </div>
                                                    <i className="form-control-feedback fv-bootstrap-icon-input-group"
                                                       data-fv-icon-for="paswd" style={{display: 'none'}}/>
                                                    <a className="pull-right small forgot-password hide"
                                                       href="/AccelEventsWebApp/u/password-reset">Forgot password?</a>
                                                    <small className="help-block" data-fv-validator="notEmpty"
                                                           data-fv-for="paswd" data-fv-result="NOT_VALIDATED"
                                                           style={{display: 'none'}}>Password can't be empty
                                                    </small>
                                                </div>
                                                <button type="submit" className="btn btn-primary "> Submit</button>
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
export default (withStyles(s)(Aucation));
