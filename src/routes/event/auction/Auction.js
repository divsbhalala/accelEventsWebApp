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
import s from './Auction.css';
import cx from 'classNames';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {onFormSubmit, doLogin, storeLoginData, storeToken} from './action/index';

import  history from './../../../history';

import  EventAside from './../../../components/EventAside/EventAside';

import  {doGetAuctionItemByCode} from './../action/index';

class Auction extends React.Component {
    static propTypes = {
        title: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            tab: 'The Event',
            showBookingTicketPopup: false,
            showMapPopup: true,
            isValidData:false,
            email:null,
            password:null,
            error:null,
            emailFeedBack:false,
            passwordFeedBack:false,
            auctionData:null,
        };
        this.showSlider = this.showSlider.bind(this);
        this.hideSlider = this.hideSlider.bind(this);
    }

    showSlider = (e) => {
        e.preventDefault();
        this.setState({
            showBookingTicketPopup: true
        })
    };

    hideSlider = () => {
        this.setState({
            showBookingTicketPopup: true
        })
    };
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
    componentWillMount(){
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
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div id="content-wrapper">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-4">
                                <EventAside activeTab={'Raffle'} showSlider={this.showSlider}
                                            showMapPopup={this.showMapPopup}/>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-8">
                                <div className="main-box clearfix">
                                    <h1 className="text-center mrg-t-lg" id="item-name">{this.state.auctionData && this.state.auctionData.name}</h1>
                                    <div className="row mrg-t-lg">
                                        <div className="col-md-6">
                                            <div className="pad-l-md pad-r-md">
                                                <div className="item-image">
                                                    <div className="item-image-inner"
                                                         style={{backgroundImage: 'url("http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg")'}}/>
                                                </div>
                                            </div>
                                            <div className="mrg-t-lg pad-l-md pad-r-md">
                                                {this.state.auctionData && this.state.auctionData.description}
                                            </div>
                                        </div>
                                        <div className="col-md-6" style={{paddingRight: 16}}>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="curr-bid-number">$<span
                                                        className="current-bid">{this.state.auctionData && this.state.auctionData.currentBid}</span></div>
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
                                                    { this.state.emailFeedBack && !this.state.email &&  <small className="help-block" data-fv-validator="emailAddress"  data-fv-for="email" data-fv-result="NOT_VALIDATED" >Invalid Email.</small>}
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
                                                    { this.state.passwordFeedBack && !this.state.password &&  <small className="help-block" data-fv-validator="emailAddress"  data-fv-for="email" data-fv-result="NOT_VALIDATED" >Password can't be empty.</small>}

                                                </div>
                                                <button className={cx("btn btn-primary text-uppercase",  !this.state.isValidData && 'disabled')} role="button" type="submit" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Getting Started..">
                                                    SUBMIT
                                                </button>
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

const mapDispatchToProps = {
    doGetAuctionItemByCode : (eventUrl, itemCode) => doGetAuctionItemByCode(eventUrl, itemCode),
};
const mapStateToProps = (state) => ({
    auction_data:state.event && state.event.auction_data,

});

export default  connect(mapStateToProps,mapDispatchToProps)(withStyles(s)(Auction));
