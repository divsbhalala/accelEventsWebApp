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


class Volunteer extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      activeViews:'select-action',
      isValidData: false,
      error: null,
      isLogin: false,
    }
    this.setActiveView = this.setActiveView.bind(this);


  }

  setActiveView=(view)=>{
    console.log('v', view);
    this.setState({
      activeViews:view
    })
  }

  render() {

    return (
      <div>
        <views>
          <view name="select-action" className={cx(this.state.activeViews === 'select-action' && s.active)}>
            <h4 className="text-center"><strong>Select an Action</strong></h4>
            <div className>
              {/* <button class="btn btn-block btn-info mrg-t-lg mrg-b-lg" data-switch-view="attendees-checkin">Check in attendees</button> */}
              <button className="btn btn-block btn-success mrg-t-lg mrg-b-lg" onClick={()=>{this.setActiveView('check-item-status')}}>Check
                Item Status
              </button>
              <button className="btn btn-block btn-info mrg-t-lg mrg-b-lg" onClick={()=>{this.setActiveView('submit-auction-bids')}}>Submit
                Silent Auction Bid
              </button>
              <button className="btn btn-block btn-success mrg-t-lg mrg-b-lg" onClick={()=>{this.setActiveView('submit-pledge')}}>Submit
                Pledge
              </button>
              <button className="btn btn-block btn-info mrg-t-lg mrg-b-lg" onClick={()=>{this.setActiveView('sell-raffle-tickets')}}>Sell
                Raffle Tickets
              </button>
              <button className="btn btn-block btn-success mrg-t-lg mrg-b-lg" onClick={()=>{this.setActiveView('submit-raffle-tickets')}}>
                Submit Raffle Tickets
              </button>
              <button className="btn btn-block btn-info mrg-t-lg mrg-b-lg" onClick={()=>{this.setActiveView('purchase-event-tickets')}}>
                Sell Event Tickets
              </button>
              <button className="btn btn-block btn-info mrg-t-lg mrg-b-lg" onClick={()=>{this.setActiveView('event-ticketing')}}>Check in
                Attendees
              </button>
            </div>
            <button className="btn btn-block btn-success mrg-t-lg mrg-b-lg" onClick={()=>{this.setActiveView('donate')}} data-switch-view="donate">Donate</button>
            <p className="text-center help-text mrg-t-lg">You can change options from the menu at any time</p>
          </view>
          <view name="check-item-status" className={cx(this.state.activeViews === 'check-item-status' && s.active)}>
            <h4 className="text-center"><strong>Check Item Status</strong></h4>
            <div className="form-group">
              <input type="text" maxLength={3} name="itemCode" id="checkItemStatus" placeholder="Item Code"
                     autoComplete="off" className="form-control mrg-t-lg alpha-only"/>
            </div>
            <div className="form-group text-center">
              <h5 id="infoMessage"></h5>
            </div>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={()=>{this.setActiveView('select-action')}}>Back</button>
            </div>
          </view>
          <view name="submit-auction-bids" className={cx(this.state.activeViews === 'submit-auction-bids' && s.active)}>
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
                       className="form-control mrg-t-lg bidder-email" data-fv-field="email"/><i
                className="form-control-feedback" data-fv-icon-for="email" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="email"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Bidder email can't be empty
                </small>
                <small className="help-block" data-fv-validator="emailAddress" data-fv-for="email"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Invalid bidder email id
                </small>
              </div>
              <div className="form-group has-feedback">
                <div className="intl-tel-input allow-dropdown separate-dial-code iti-sdc-2">
                  <div className="flag-container">
                    <div className="selected-flag" tabIndex={0} title="Canada: +1">
                      <div className="iti-flag ca"/>
                      <div className="selected-dial-code">+1</div>
                      <div className="iti-arrow"/>
                    </div>
                    <ul className="country-list hide">
                      <li className="country preferred" data-dial-code={1} data-country-code="us">
                        <div className="flag-box">
                          <div className="iti-flag us"/>
                        </div>
                        <span className="country-name">United States</span><span className="dial-code">+1</span></li>
                      <li className="country preferred active" data-dial-code={1} data-country-code="ca">
                        <div className="flag-box">
                          <div className="iti-flag ca"/>
                        </div>
                        <span className="country-name">Canada</span><span className="dial-code">+1</span></li>
                      <li className="country preferred" data-dial-code={61} data-country-code="au">
                        <div className="flag-box">
                          <div className="iti-flag au"/>
                        </div>
                        <span className="country-name">Australia</span><span className="dial-code">+61</span></li>
                      <li className="country preferred" data-dial-code={91} data-country-code="in">
                        <div className="flag-box">
                          <div className="iti-flag in"/>
                        </div>
                        <span className="country-name">India (भारत)</span><span className="dial-code">+91</span></li>
                      <li className="divider"/>
                      <li className="country" data-dial-code={93} data-country-code="af">
                        <div className="flag-box">
                          <div className="iti-flag af"/>
                        </div>
                        <span className="country-name">Afghanistan (‫افغانستان‬‎)</span><span
                        className="dial-code">+93</span></li>
                      <li className="country" data-dial-code={355} data-country-code="al">
                        <div className="flag-box">
                          <div className="iti-flag al"/>
                        </div>
                        <span className="country-name">Albania (Shqipëri)</span><span className="dial-code">+355</span>
                      </li>
                      <li className="country" data-dial-code={213} data-country-code="dz">
                        <div className="flag-box">
                          <div className="iti-flag dz"/>
                        </div>
                        <span className="country-name">Algeria (‫الجزائر‬‎)</span><span
                        className="dial-code">+213</span></li>
                      <li className="country" data-dial-code={1684} data-country-code="as">
                        <div className="flag-box">
                          <div className="iti-flag as"/>
                        </div>
                        <span className="country-name">American Samoa</span><span className="dial-code">+1684</span>
                      </li>
                      <li className="country" data-dial-code={376} data-country-code="ad">
                        <div className="flag-box">
                          <div className="iti-flag ad"/>
                        </div>
                        <span className="country-name">Andorra</span><span className="dial-code">+376</span></li>
                      <li className="country" data-dial-code={244} data-country-code="ao">
                        <div className="flag-box">
                          <div className="iti-flag ao"/>
                        </div>
                        <span className="country-name">Angola</span><span className="dial-code">+244</span></li>
                      <li className="country" data-dial-code={1264} data-country-code="ai">
                        <div className="flag-box">
                          <div className="iti-flag ai"/>
                        </div>
                        <span className="country-name">Anguilla</span><span className="dial-code">+1264</span></li>
                      <li className="country" data-dial-code={1268} data-country-code="ag">
                        <div className="flag-box">
                          <div className="iti-flag ag"/>
                        </div>
                        <span className="country-name">Antigua and Barbuda</span><span
                        className="dial-code">+1268</span></li>
                      <li className="country" data-dial-code={54} data-country-code="ar">
                        <div className="flag-box">
                          <div className="iti-flag ar"/>
                        </div>
                        <span className="country-name">Argentina</span><span className="dial-code">+54</span></li>
                      <li className="country" data-dial-code={374} data-country-code="am">
                        <div className="flag-box">
                          <div className="iti-flag am"/>
                        </div>
                        <span className="country-name">Armenia (Հայաստան)</span><span className="dial-code">+374</span>
                      </li>
                      <li className="country" data-dial-code={297} data-country-code="aw">
                        <div className="flag-box">
                          <div className="iti-flag aw"/>
                        </div>
                        <span className="country-name">Aruba</span><span className="dial-code">+297</span></li>
                      <li className="country" data-dial-code={61} data-country-code="au">
                        <div className="flag-box">
                          <div className="iti-flag au"/>
                        </div>
                        <span className="country-name">Australia</span><span className="dial-code">+61</span></li>
                      <li className="country" data-dial-code={43} data-country-code="at">
                        <div className="flag-box">
                          <div className="iti-flag at"/>
                        </div>
                        <span className="country-name">Austria (Österreich)</span><span className="dial-code">+43</span>
                      </li>
                      <li className="country" data-dial-code={994} data-country-code="az">
                        <div className="flag-box">
                          <div className="iti-flag az"/>
                        </div>
                        <span className="country-name">Azerbaijan (Azərbaycan)</span><span
                        className="dial-code">+994</span></li>
                      <li className="country" data-dial-code={1242} data-country-code="bs">
                        <div className="flag-box">
                          <div className="iti-flag bs"/>
                        </div>
                        <span className="country-name">Bahamas</span><span className="dial-code">+1242</span></li>
                      <li className="country" data-dial-code={973} data-country-code="bh">
                        <div className="flag-box">
                          <div className="iti-flag bh"/>
                        </div>
                        <span className="country-name">Bahrain (‫البحرين‬‎)</span><span
                        className="dial-code">+973</span></li>
                      <li className="country" data-dial-code={880} data-country-code="bd">
                        <div className="flag-box">
                          <div className="iti-flag bd"/>
                        </div>
                        <span className="country-name">Bangladesh (বাংলাদেশ)</span><span
                        className="dial-code">+880</span></li>
                      <li className="country" data-dial-code={1246} data-country-code="bb">
                        <div className="flag-box">
                          <div className="iti-flag bb"/>
                        </div>
                        <span className="country-name">Barbados</span><span className="dial-code">+1246</span></li>
                      <li className="country" data-dial-code={375} data-country-code="by">
                        <div className="flag-box">
                          <div className="iti-flag by"/>
                        </div>
                        <span className="country-name">Belarus (Беларусь)</span><span className="dial-code">+375</span>
                      </li>
                      <li className="country" data-dial-code={32} data-country-code="be">
                        <div className="flag-box">
                          <div className="iti-flag be"/>
                        </div>
                        <span className="country-name">Belgium (België)</span><span className="dial-code">+32</span>
                      </li>
                      <li className="country" data-dial-code={501} data-country-code="bz">
                        <div className="flag-box">
                          <div className="iti-flag bz"/>
                        </div>
                        <span className="country-name">Belize</span><span className="dial-code">+501</span></li>
                      <li className="country" data-dial-code={229} data-country-code="bj">
                        <div className="flag-box">
                          <div className="iti-flag bj"/>
                        </div>
                        <span className="country-name">Benin (Bénin)</span><span className="dial-code">+229</span></li>
                      <li className="country" data-dial-code={1441} data-country-code="bm">
                        <div className="flag-box">
                          <div className="iti-flag bm"/>
                        </div>
                        <span className="country-name">Bermuda</span><span className="dial-code">+1441</span></li>
                      <li className="country" data-dial-code={975} data-country-code="bt">
                        <div className="flag-box">
                          <div className="iti-flag bt"/>
                        </div>
                        <span className="country-name">Bhutan (འབྲུག)</span><span className="dial-code">+975</span></li>
                      <li className="country" data-dial-code={591} data-country-code="bo">
                        <div className="flag-box">
                          <div className="iti-flag bo"/>
                        </div>
                        <span className="country-name">Bolivia</span><span className="dial-code">+591</span></li>
                      <li className="country" data-dial-code={387} data-country-code="ba">
                        <div className="flag-box">
                          <div className="iti-flag ba"/>
                        </div>
                        <span className="country-name">Bosnia and Herzegovina (Босна и Херцеговина)</span><span
                        className="dial-code">+387</span></li>
                      <li className="country" data-dial-code={267} data-country-code="bw">
                        <div className="flag-box">
                          <div className="iti-flag bw"/>
                        </div>
                        <span className="country-name">Botswana</span><span className="dial-code">+267</span></li>
                      <li className="country" data-dial-code={55} data-country-code="br">
                        <div className="flag-box">
                          <div className="iti-flag br"/>
                        </div>
                        <span className="country-name">Brazil (Brasil)</span><span className="dial-code">+55</span></li>
                      <li className="country" data-dial-code={246} data-country-code="io">
                        <div className="flag-box">
                          <div className="iti-flag io"/>
                        </div>
                        <span className="country-name">British Indian Ocean Territory</span><span className="dial-code">+246</span>
                      </li>
                      <li className="country" data-dial-code={1284} data-country-code="vg">
                        <div className="flag-box">
                          <div className="iti-flag vg"/>
                        </div>
                        <span className="country-name">British Virgin Islands</span><span
                        className="dial-code">+1284</span></li>
                      <li className="country" data-dial-code={673} data-country-code="bn">
                        <div className="flag-box">
                          <div className="iti-flag bn"/>
                        </div>
                        <span className="country-name">Brunei</span><span className="dial-code">+673</span></li>
                      <li className="country" data-dial-code={359} data-country-code="bg">
                        <div className="flag-box">
                          <div className="iti-flag bg"/>
                        </div>
                        <span className="country-name">Bulgaria (България)</span><span className="dial-code">+359</span>
                      </li>
                      <li className="country" data-dial-code={226} data-country-code="bf">
                        <div className="flag-box">
                          <div className="iti-flag bf"/>
                        </div>
                        <span className="country-name">Burkina Faso</span><span className="dial-code">+226</span></li>
                      <li className="country" data-dial-code={257} data-country-code="bi">
                        <div className="flag-box">
                          <div className="iti-flag bi"/>
                        </div>
                        <span className="country-name">Burundi (Uburundi)</span><span className="dial-code">+257</span>
                      </li>
                      <li className="country" data-dial-code={855} data-country-code="kh">
                        <div className="flag-box">
                          <div className="iti-flag kh"/>
                        </div>
                        <span className="country-name">Cambodia (កម្ពុជា)</span><span className="dial-code">+855</span>
                      </li>
                      <li className="country" data-dial-code={237} data-country-code="cm">
                        <div className="flag-box">
                          <div className="iti-flag cm"/>
                        </div>
                        <span className="country-name">Cameroon (Cameroun)</span><span className="dial-code">+237</span>
                      </li>
                      <li className="country" data-dial-code={1} data-country-code="ca">
                        <div className="flag-box">
                          <div className="iti-flag ca"/>
                        </div>
                        <span className="country-name">Canada</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={238} data-country-code="cv">
                        <div className="flag-box">
                          <div className="iti-flag cv"/>
                        </div>
                        <span className="country-name">Cape Verde (Kabu Verdi)</span><span
                        className="dial-code">+238</span></li>
                      <li className="country" data-dial-code={599} data-country-code="bq">
                        <div className="flag-box">
                          <div className="iti-flag bq"/>
                        </div>
                        <span className="country-name">Caribbean Netherlands</span><span
                        className="dial-code">+599</span></li>
                      <li className="country" data-dial-code={1345} data-country-code="ky">
                        <div className="flag-box">
                          <div className="iti-flag ky"/>
                        </div>
                        <span className="country-name">Cayman Islands</span><span className="dial-code">+1345</span>
                      </li>
                      <li className="country" data-dial-code={236} data-country-code="cf">
                        <div className="flag-box">
                          <div className="iti-flag cf"/>
                        </div>
                        <span className="country-name">Central African Republic (République centrafricaine)</span><span
                        className="dial-code">+236</span></li>
                      <li className="country" data-dial-code={235} data-country-code="td">
                        <div className="flag-box">
                          <div className="iti-flag td"/>
                        </div>
                        <span className="country-name">Chad (Tchad)</span><span className="dial-code">+235</span></li>
                      <li className="country" data-dial-code={56} data-country-code="cl">
                        <div className="flag-box">
                          <div className="iti-flag cl"/>
                        </div>
                        <span className="country-name">Chile</span><span className="dial-code">+56</span></li>
                      <li className="country" data-dial-code={86} data-country-code="cn">
                        <div className="flag-box">
                          <div className="iti-flag cn"/>
                        </div>
                        <span className="country-name">China (中国)</span><span className="dial-code">+86</span></li>
                      <li className="country" data-dial-code={61} data-country-code="cx">
                        <div className="flag-box">
                          <div className="iti-flag cx"/>
                        </div>
                        <span className="country-name">Christmas Island</span><span className="dial-code">+61</span>
                      </li>
                      <li className="country" data-dial-code={61} data-country-code="cc">
                        <div className="flag-box">
                          <div className="iti-flag cc"/>
                        </div>
                        <span className="country-name">Cocos (Keeling) Islands</span><span
                        className="dial-code">+61</span></li>
                      <li className="country" data-dial-code={57} data-country-code="co">
                        <div className="flag-box">
                          <div className="iti-flag co"/>
                        </div>
                        <span className="country-name">Colombia</span><span className="dial-code">+57</span></li>
                      <li className="country" data-dial-code={269} data-country-code="km">
                        <div className="flag-box">
                          <div className="iti-flag km"/>
                        </div>
                        <span className="country-name">Comoros (‫جزر القمر‬‎)</span><span
                        className="dial-code">+269</span></li>
                      <li className="country" data-dial-code={243} data-country-code="cd">
                        <div className="flag-box">
                          <div className="iti-flag cd"/>
                        </div>
                        <span className="country-name">Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)</span><span
                        className="dial-code">+243</span></li>
                      <li className="country" data-dial-code={242} data-country-code="cg">
                        <div className="flag-box">
                          <div className="iti-flag cg"/>
                        </div>
                        <span className="country-name">Congo (Republic) (Congo-Brazzaville)</span><span
                        className="dial-code">+242</span></li>
                      <li className="country" data-dial-code={682} data-country-code="ck">
                        <div className="flag-box">
                          <div className="iti-flag ck"/>
                        </div>
                        <span className="country-name">Cook Islands</span><span className="dial-code">+682</span></li>
                      <li className="country" data-dial-code={506} data-country-code="cr">
                        <div className="flag-box">
                          <div className="iti-flag cr"/>
                        </div>
                        <span className="country-name">Costa Rica</span><span className="dial-code">+506</span></li>
                      <li className="country" data-dial-code={225} data-country-code="ci">
                        <div className="flag-box">
                          <div className="iti-flag ci"/>
                        </div>
                        <span className="country-name">Côte d’Ivoire</span><span className="dial-code">+225</span></li>
                      <li className="country" data-dial-code={385} data-country-code="hr">
                        <div className="flag-box">
                          <div className="iti-flag hr"/>
                        </div>
                        <span className="country-name">Croatia (Hrvatska)</span><span className="dial-code">+385</span>
                      </li>
                      <li className="country" data-dial-code={53} data-country-code="cu">
                        <div className="flag-box">
                          <div className="iti-flag cu"/>
                        </div>
                        <span className="country-name">Cuba</span><span className="dial-code">+53</span></li>
                      <li className="country" data-dial-code={599} data-country-code="cw">
                        <div className="flag-box">
                          <div className="iti-flag cw"/>
                        </div>
                        <span className="country-name">Curaçao</span><span className="dial-code">+599</span></li>
                      <li className="country" data-dial-code={357} data-country-code="cy">
                        <div className="flag-box">
                          <div className="iti-flag cy"/>
                        </div>
                        <span className="country-name">Cyprus (Κύπρος)</span><span className="dial-code">+357</span>
                      </li>
                      <li className="country" data-dial-code={420} data-country-code="cz">
                        <div className="flag-box">
                          <div className="iti-flag cz"/>
                        </div>
                        <span className="country-name">Czech Republic (Česká republika)</span><span
                        className="dial-code">+420</span></li>
                      <li className="country" data-dial-code={45} data-country-code="dk">
                        <div className="flag-box">
                          <div className="iti-flag dk"/>
                        </div>
                        <span className="country-name">Denmark (Danmark)</span><span className="dial-code">+45</span>
                      </li>
                      <li className="country" data-dial-code={253} data-country-code="dj">
                        <div className="flag-box">
                          <div className="iti-flag dj"/>
                        </div>
                        <span className="country-name">Djibouti</span><span className="dial-code">+253</span></li>
                      <li className="country" data-dial-code={1767} data-country-code="dm">
                        <div className="flag-box">
                          <div className="iti-flag dm"/>
                        </div>
                        <span className="country-name">Dominica</span><span className="dial-code">+1767</span></li>
                      <li className="country" data-dial-code={1} data-country-code="do">
                        <div className="flag-box">
                          <div className="iti-flag do"/>
                        </div>
                        <span className="country-name">Dominican Republic (República Dominicana)</span><span
                        className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={593} data-country-code="ec">
                        <div className="flag-box">
                          <div className="iti-flag ec"/>
                        </div>
                        <span className="country-name">Ecuador</span><span className="dial-code">+593</span></li>
                      <li className="country" data-dial-code={20} data-country-code="eg">
                        <div className="flag-box">
                          <div className="iti-flag eg"/>
                        </div>
                        <span className="country-name">Egypt (‫مصر‬‎)</span><span className="dial-code">+20</span></li>
                      <li className="country" data-dial-code={503} data-country-code="sv">
                        <div className="flag-box">
                          <div className="iti-flag sv"/>
                        </div>
                        <span className="country-name">El Salvador</span><span className="dial-code">+503</span></li>
                      <li className="country" data-dial-code={240} data-country-code="gq">
                        <div className="flag-box">
                          <div className="iti-flag gq"/>
                        </div>
                        <span className="country-name">Equatorial Guinea (Guinea Ecuatorial)</span><span
                        className="dial-code">+240</span></li>
                      <li className="country" data-dial-code={291} data-country-code="er">
                        <div className="flag-box">
                          <div className="iti-flag er"/>
                        </div>
                        <span className="country-name">Eritrea</span><span className="dial-code">+291</span></li>
                      <li className="country" data-dial-code={372} data-country-code="ee">
                        <div className="flag-box">
                          <div className="iti-flag ee"/>
                        </div>
                        <span className="country-name">Estonia (Eesti)</span><span className="dial-code">+372</span>
                      </li>
                      <li className="country" data-dial-code={251} data-country-code="et">
                        <div className="flag-box">
                          <div className="iti-flag et"/>
                        </div>
                        <span className="country-name">Ethiopia</span><span className="dial-code">+251</span></li>
                      <li className="country" data-dial-code={500} data-country-code="fk">
                        <div className="flag-box">
                          <div className="iti-flag fk"/>
                        </div>
                        <span className="country-name">Falkland Islands (Islas Malvinas)</span><span
                        className="dial-code">+500</span></li>
                      <li className="country" data-dial-code={298} data-country-code="fo">
                        <div className="flag-box">
                          <div className="iti-flag fo"/>
                        </div>
                        <span className="country-name">Faroe Islands (Føroyar)</span><span
                        className="dial-code">+298</span></li>
                      <li className="country" data-dial-code={679} data-country-code="fj">
                        <div className="flag-box">
                          <div className="iti-flag fj"/>
                        </div>
                        <span className="country-name">Fiji</span><span className="dial-code">+679</span></li>
                      <li className="country" data-dial-code={358} data-country-code="fi">
                        <div className="flag-box">
                          <div className="iti-flag fi"/>
                        </div>
                        <span className="country-name">Finland (Suomi)</span><span className="dial-code">+358</span>
                      </li>
                      <li className="country" data-dial-code={33} data-country-code="fr">
                        <div className="flag-box">
                          <div className="iti-flag fr"/>
                        </div>
                        <span className="country-name">France</span><span className="dial-code">+33</span></li>
                      <li className="country" data-dial-code={594} data-country-code="gf">
                        <div className="flag-box">
                          <div className="iti-flag gf"/>
                        </div>
                        <span className="country-name">French Guiana (Guyane française)</span><span
                        className="dial-code">+594</span></li>
                      <li className="country" data-dial-code={689} data-country-code="pf">
                        <div className="flag-box">
                          <div className="iti-flag pf"/>
                        </div>
                        <span className="country-name">French Polynesia (Polynésie française)</span><span
                        className="dial-code">+689</span></li>
                      <li className="country" data-dial-code={241} data-country-code="ga">
                        <div className="flag-box">
                          <div className="iti-flag ga"/>
                        </div>
                        <span className="country-name">Gabon</span><span className="dial-code">+241</span></li>
                      <li className="country" data-dial-code={220} data-country-code="gm">
                        <div className="flag-box">
                          <div className="iti-flag gm"/>
                        </div>
                        <span className="country-name">Gambia</span><span className="dial-code">+220</span></li>
                      <li className="country" data-dial-code={995} data-country-code="ge">
                        <div className="flag-box">
                          <div className="iti-flag ge"/>
                        </div>
                        <span className="country-name">Georgia (საქართველო)</span><span
                        className="dial-code">+995</span></li>
                      <li className="country" data-dial-code={49} data-country-code="de">
                        <div className="flag-box">
                          <div className="iti-flag de"/>
                        </div>
                        <span className="country-name">Germany (Deutschland)</span><span
                        className="dial-code">+49</span></li>
                      <li className="country" data-dial-code={233} data-country-code="gh">
                        <div className="flag-box">
                          <div className="iti-flag gh"/>
                        </div>
                        <span className="country-name">Ghana (Gaana)</span><span className="dial-code">+233</span></li>
                      <li className="country" data-dial-code={350} data-country-code="gi">
                        <div className="flag-box">
                          <div className="iti-flag gi"/>
                        </div>
                        <span className="country-name">Gibraltar</span><span className="dial-code">+350</span></li>
                      <li className="country" data-dial-code={30} data-country-code="gr">
                        <div className="flag-box">
                          <div className="iti-flag gr"/>
                        </div>
                        <span className="country-name">Greece (Ελλάδα)</span><span className="dial-code">+30</span></li>
                      <li className="country" data-dial-code={299} data-country-code="gl">
                        <div className="flag-box">
                          <div className="iti-flag gl"/>
                        </div>
                        <span className="country-name">Greenland (Kalaallit Nunaat)</span><span className="dial-code">+299</span>
                      </li>
                      <li className="country" data-dial-code={1473} data-country-code="gd">
                        <div className="flag-box">
                          <div className="iti-flag gd"/>
                        </div>
                        <span className="country-name">Grenada</span><span className="dial-code">+1473</span></li>
                      <li className="country" data-dial-code={590} data-country-code="gp">
                        <div className="flag-box">
                          <div className="iti-flag gp"/>
                        </div>
                        <span className="country-name">Guadeloupe</span><span className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={1671} data-country-code="gu">
                        <div className="flag-box">
                          <div className="iti-flag gu"/>
                        </div>
                        <span className="country-name">Guam</span><span className="dial-code">+1671</span></li>
                      <li className="country" data-dial-code={502} data-country-code="gt">
                        <div className="flag-box">
                          <div className="iti-flag gt"/>
                        </div>
                        <span className="country-name">Guatemala</span><span className="dial-code">+502</span></li>
                      <li className="country" data-dial-code={44} data-country-code="gg">
                        <div className="flag-box">
                          <div className="iti-flag gg"/>
                        </div>
                        <span className="country-name">Guernsey</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={224} data-country-code="gn">
                        <div className="flag-box">
                          <div className="iti-flag gn"/>
                        </div>
                        <span className="country-name">Guinea (Guinée)</span><span className="dial-code">+224</span>
                      </li>
                      <li className="country" data-dial-code={245} data-country-code="gw">
                        <div className="flag-box">
                          <div className="iti-flag gw"/>
                        </div>
                        <span className="country-name">Guinea-Bissau (Guiné Bissau)</span><span className="dial-code">+245</span>
                      </li>
                      <li className="country" data-dial-code={592} data-country-code="gy">
                        <div className="flag-box">
                          <div className="iti-flag gy"/>
                        </div>
                        <span className="country-name">Guyana</span><span className="dial-code">+592</span></li>
                      <li className="country" data-dial-code={509} data-country-code="ht">
                        <div className="flag-box">
                          <div className="iti-flag ht"/>
                        </div>
                        <span className="country-name">Haiti</span><span className="dial-code">+509</span></li>
                      <li className="country" data-dial-code={504} data-country-code="hn">
                        <div className="flag-box">
                          <div className="iti-flag hn"/>
                        </div>
                        <span className="country-name">Honduras</span><span className="dial-code">+504</span></li>
                      <li className="country" data-dial-code={852} data-country-code="hk">
                        <div className="flag-box">
                          <div className="iti-flag hk"/>
                        </div>
                        <span className="country-name">Hong Kong (香港)</span><span className="dial-code">+852</span></li>
                      <li className="country" data-dial-code={36} data-country-code="hu">
                        <div className="flag-box">
                          <div className="iti-flag hu"/>
                        </div>
                        <span className="country-name">Hungary (Magyarország)</span><span
                        className="dial-code">+36</span></li>
                      <li className="country" data-dial-code={354} data-country-code="is">
                        <div className="flag-box">
                          <div className="iti-flag is"/>
                        </div>
                        <span className="country-name">Iceland (Ísland)</span><span className="dial-code">+354</span>
                      </li>
                      <li className="country" data-dial-code={91} data-country-code="in">
                        <div className="flag-box">
                          <div className="iti-flag in"/>
                        </div>
                        <span className="country-name">India (भारत)</span><span className="dial-code">+91</span></li>
                      <li className="country" data-dial-code={62} data-country-code="id">
                        <div className="flag-box">
                          <div className="iti-flag id"/>
                        </div>
                        <span className="country-name">Indonesia</span><span className="dial-code">+62</span></li>
                      <li className="country" data-dial-code={98} data-country-code="ir">
                        <div className="flag-box">
                          <div className="iti-flag ir"/>
                        </div>
                        <span className="country-name">Iran (‫ایران‬‎)</span><span className="dial-code">+98</span></li>
                      <li className="country" data-dial-code={964} data-country-code="iq">
                        <div className="flag-box">
                          <div className="iti-flag iq"/>
                        </div>
                        <span className="country-name">Iraq (‫العراق‬‎)</span><span className="dial-code">+964</span>
                      </li>
                      <li className="country" data-dial-code={353} data-country-code="ie">
                        <div className="flag-box">
                          <div className="iti-flag ie"/>
                        </div>
                        <span className="country-name">Ireland</span><span className="dial-code">+353</span></li>
                      <li className="country" data-dial-code={44} data-country-code="im">
                        <div className="flag-box">
                          <div className="iti-flag im"/>
                        </div>
                        <span className="country-name">Isle of Man</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={972} data-country-code="il">
                        <div className="flag-box">
                          <div className="iti-flag il"/>
                        </div>
                        <span className="country-name">Israel (‫ישראל‬‎)</span><span className="dial-code">+972</span>
                      </li>
                      <li className="country" data-dial-code={39} data-country-code="it">
                        <div className="flag-box">
                          <div className="iti-flag it"/>
                        </div>
                        <span className="country-name">Italy (Italia)</span><span className="dial-code">+39</span></li>
                      <li className="country" data-dial-code={1876} data-country-code="jm">
                        <div className="flag-box">
                          <div className="iti-flag jm"/>
                        </div>
                        <span className="country-name">Jamaica</span><span className="dial-code">+1876</span></li>
                      <li className="country" data-dial-code={81} data-country-code="jp">
                        <div className="flag-box">
                          <div className="iti-flag jp"/>
                        </div>
                        <span className="country-name">Japan (日本)</span><span className="dial-code">+81</span></li>
                      <li className="country" data-dial-code={44} data-country-code="je">
                        <div className="flag-box">
                          <div className="iti-flag je"/>
                        </div>
                        <span className="country-name">Jersey</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={962} data-country-code="jo">
                        <div className="flag-box">
                          <div className="iti-flag jo"/>
                        </div>
                        <span className="country-name">Jordan (‫الأردن‬‎)</span><span className="dial-code">+962</span>
                      </li>
                      <li className="country" data-dial-code={7} data-country-code="kz">
                        <div className="flag-box">
                          <div className="iti-flag kz"/>
                        </div>
                        <span className="country-name">Kazakhstan (Казахстан)</span><span
                        className="dial-code">+7</span></li>
                      <li className="country" data-dial-code={254} data-country-code="ke">
                        <div className="flag-box">
                          <div className="iti-flag ke"/>
                        </div>
                        <span className="country-name">Kenya</span><span className="dial-code">+254</span></li>
                      <li className="country" data-dial-code={686} data-country-code="ki">
                        <div className="flag-box">
                          <div className="iti-flag ki"/>
                        </div>
                        <span className="country-name">Kiribati</span><span className="dial-code">+686</span></li>
                      <li className="country" data-dial-code={383} data-country-code="xk">
                        <div className="flag-box">
                          <div className="iti-flag xk"/>
                        </div>
                        <span className="country-name">Kosovo</span><span className="dial-code">+383</span></li>
                      <li className="country" data-dial-code={965} data-country-code="kw">
                        <div className="flag-box">
                          <div className="iti-flag kw"/>
                        </div>
                        <span className="country-name">Kuwait (‫الكويت‬‎)</span><span className="dial-code">+965</span>
                      </li>
                      <li className="country" data-dial-code={996} data-country-code="kg">
                        <div className="flag-box">
                          <div className="iti-flag kg"/>
                        </div>
                        <span className="country-name">Kyrgyzstan (Кыргызстан)</span><span
                        className="dial-code">+996</span></li>
                      <li className="country" data-dial-code={856} data-country-code="la">
                        <div className="flag-box">
                          <div className="iti-flag la"/>
                        </div>
                        <span className="country-name">Laos (ລາວ)</span><span className="dial-code">+856</span></li>
                      <li className="country" data-dial-code={371} data-country-code="lv">
                        <div className="flag-box">
                          <div className="iti-flag lv"/>
                        </div>
                        <span className="country-name">Latvia (Latvija)</span><span className="dial-code">+371</span>
                      </li>
                      <li className="country" data-dial-code={961} data-country-code="lb">
                        <div className="flag-box">
                          <div className="iti-flag lb"/>
                        </div>
                        <span className="country-name">Lebanon (‫لبنان‬‎)</span><span className="dial-code">+961</span>
                      </li>
                      <li className="country" data-dial-code={266} data-country-code="ls">
                        <div className="flag-box">
                          <div className="iti-flag ls"/>
                        </div>
                        <span className="country-name">Lesotho</span><span className="dial-code">+266</span></li>
                      <li className="country" data-dial-code={231} data-country-code="lr">
                        <div className="flag-box">
                          <div className="iti-flag lr"/>
                        </div>
                        <span className="country-name">Liberia</span><span className="dial-code">+231</span></li>
                      <li className="country" data-dial-code={218} data-country-code="ly">
                        <div className="flag-box">
                          <div className="iti-flag ly"/>
                        </div>
                        <span className="country-name">Libya (‫ليبيا‬‎)</span><span className="dial-code">+218</span>
                      </li>
                      <li className="country" data-dial-code={423} data-country-code="li">
                        <div className="flag-box">
                          <div className="iti-flag li"/>
                        </div>
                        <span className="country-name">Liechtenstein</span><span className="dial-code">+423</span></li>
                      <li className="country" data-dial-code={370} data-country-code="lt">
                        <div className="flag-box">
                          <div className="iti-flag lt"/>
                        </div>
                        <span className="country-name">Lithuania (Lietuva)</span><span className="dial-code">+370</span>
                      </li>
                      <li className="country" data-dial-code={352} data-country-code="lu">
                        <div className="flag-box">
                          <div className="iti-flag lu"/>
                        </div>
                        <span className="country-name">Luxembourg</span><span className="dial-code">+352</span></li>
                      <li className="country" data-dial-code={853} data-country-code="mo">
                        <div className="flag-box">
                          <div className="iti-flag mo"/>
                        </div>
                        <span className="country-name">Macau (澳門)</span><span className="dial-code">+853</span></li>
                      <li className="country" data-dial-code={389} data-country-code="mk">
                        <div className="flag-box">
                          <div className="iti-flag mk"/>
                        </div>
                        <span className="country-name">Macedonia (FYROM) (Македонија)</span><span className="dial-code">+389</span>
                      </li>
                      <li className="country" data-dial-code={261} data-country-code="mg">
                        <div className="flag-box">
                          <div className="iti-flag mg"/>
                        </div>
                        <span className="country-name">Madagascar (Madagasikara)</span><span
                        className="dial-code">+261</span></li>
                      <li className="country" data-dial-code={265} data-country-code="mw">
                        <div className="flag-box">
                          <div className="iti-flag mw"/>
                        </div>
                        <span className="country-name">Malawi</span><span className="dial-code">+265</span></li>
                      <li className="country" data-dial-code={60} data-country-code="my">
                        <div className="flag-box">
                          <div className="iti-flag my"/>
                        </div>
                        <span className="country-name">Malaysia</span><span className="dial-code">+60</span></li>
                      <li className="country" data-dial-code={960} data-country-code="mv">
                        <div className="flag-box">
                          <div className="iti-flag mv"/>
                        </div>
                        <span className="country-name">Maldives</span><span className="dial-code">+960</span></li>
                      <li className="country" data-dial-code={223} data-country-code="ml">
                        <div className="flag-box">
                          <div className="iti-flag ml"/>
                        </div>
                        <span className="country-name">Mali</span><span className="dial-code">+223</span></li>
                      <li className="country" data-dial-code={356} data-country-code="mt">
                        <div className="flag-box">
                          <div className="iti-flag mt"/>
                        </div>
                        <span className="country-name">Malta</span><span className="dial-code">+356</span></li>
                      <li className="country" data-dial-code={692} data-country-code="mh">
                        <div className="flag-box">
                          <div className="iti-flag mh"/>
                        </div>
                        <span className="country-name">Marshall Islands</span><span className="dial-code">+692</span>
                      </li>
                      <li className="country" data-dial-code={596} data-country-code="mq">
                        <div className="flag-box">
                          <div className="iti-flag mq"/>
                        </div>
                        <span className="country-name">Martinique</span><span className="dial-code">+596</span></li>
                      <li className="country" data-dial-code={222} data-country-code="mr">
                        <div className="flag-box">
                          <div className="iti-flag mr"/>
                        </div>
                        <span className="country-name">Mauritania (‫موريتانيا‬‎)</span><span
                        className="dial-code">+222</span></li>
                      <li className="country" data-dial-code={230} data-country-code="mu">
                        <div className="flag-box">
                          <div className="iti-flag mu"/>
                        </div>
                        <span className="country-name">Mauritius (Moris)</span><span className="dial-code">+230</span>
                      </li>
                      <li className="country" data-dial-code={262} data-country-code="yt">
                        <div className="flag-box">
                          <div className="iti-flag yt"/>
                        </div>
                        <span className="country-name">Mayotte</span><span className="dial-code">+262</span></li>
                      <li className="country" data-dial-code={52} data-country-code="mx">
                        <div className="flag-box">
                          <div className="iti-flag mx"/>
                        </div>
                        <span className="country-name">Mexico (México)</span><span className="dial-code">+52</span></li>
                      <li className="country" data-dial-code={691} data-country-code="fm">
                        <div className="flag-box">
                          <div className="iti-flag fm"/>
                        </div>
                        <span className="country-name">Micronesia</span><span className="dial-code">+691</span></li>
                      <li className="country" data-dial-code={373} data-country-code="md">
                        <div className="flag-box">
                          <div className="iti-flag md"/>
                        </div>
                        <span className="country-name">Moldova (Republica Moldova)</span><span className="dial-code">+373</span>
                      </li>
                      <li className="country" data-dial-code={377} data-country-code="mc">
                        <div className="flag-box">
                          <div className="iti-flag mc"/>
                        </div>
                        <span className="country-name">Monaco</span><span className="dial-code">+377</span></li>
                      <li className="country" data-dial-code={976} data-country-code="mn">
                        <div className="flag-box">
                          <div className="iti-flag mn"/>
                        </div>
                        <span className="country-name">Mongolia (Монгол)</span><span className="dial-code">+976</span>
                      </li>
                      <li className="country" data-dial-code={382} data-country-code="me">
                        <div className="flag-box">
                          <div className="iti-flag me"/>
                        </div>
                        <span className="country-name">Montenegro (Crna Gora)</span><span
                        className="dial-code">+382</span></li>
                      <li className="country" data-dial-code={1664} data-country-code="ms">
                        <div className="flag-box">
                          <div className="iti-flag ms"/>
                        </div>
                        <span className="country-name">Montserrat</span><span className="dial-code">+1664</span></li>
                      <li className="country" data-dial-code={212} data-country-code="ma">
                        <div className="flag-box">
                          <div className="iti-flag ma"/>
                        </div>
                        <span className="country-name">Morocco (‫المغرب‬‎)</span><span className="dial-code">+212</span>
                      </li>
                      <li className="country" data-dial-code={258} data-country-code="mz">
                        <div className="flag-box">
                          <div className="iti-flag mz"/>
                        </div>
                        <span className="country-name">Mozambique (Moçambique)</span><span
                        className="dial-code">+258</span></li>
                      <li className="country" data-dial-code={95} data-country-code="mm">
                        <div className="flag-box">
                          <div className="iti-flag mm"/>
                        </div>
                        <span className="country-name">Myanmar (Burma) (မြန်မာ)</span><span
                        className="dial-code">+95</span></li>
                      <li className="country" data-dial-code={264} data-country-code="na">
                        <div className="flag-box">
                          <div className="iti-flag na"/>
                        </div>
                        <span className="country-name">Namibia (Namibië)</span><span className="dial-code">+264</span>
                      </li>
                      <li className="country" data-dial-code={674} data-country-code="nr">
                        <div className="flag-box">
                          <div className="iti-flag nr"/>
                        </div>
                        <span className="country-name">Nauru</span><span className="dial-code">+674</span></li>
                      <li className="country" data-dial-code={977} data-country-code="np">
                        <div className="flag-box">
                          <div className="iti-flag np"/>
                        </div>
                        <span className="country-name">Nepal (नेपाल)</span><span className="dial-code">+977</span></li>
                      <li className="country" data-dial-code={31} data-country-code="nl">
                        <div className="flag-box">
                          <div className="iti-flag nl"/>
                        </div>
                        <span className="country-name">Netherlands (Nederland)</span><span
                        className="dial-code">+31</span></li>
                      <li className="country" data-dial-code={687} data-country-code="nc">
                        <div className="flag-box">
                          <div className="iti-flag nc"/>
                        </div>
                        <span className="country-name">New Caledonia (Nouvelle-Calédonie)</span><span
                        className="dial-code">+687</span></li>
                      <li className="country" data-dial-code={64} data-country-code="nz">
                        <div className="flag-box">
                          <div className="iti-flag nz"/>
                        </div>
                        <span className="country-name">New Zealand</span><span className="dial-code">+64</span></li>
                      <li className="country" data-dial-code={505} data-country-code="ni">
                        <div className="flag-box">
                          <div className="iti-flag ni"/>
                        </div>
                        <span className="country-name">Nicaragua</span><span className="dial-code">+505</span></li>
                      <li className="country" data-dial-code={227} data-country-code="ne">
                        <div className="flag-box">
                          <div className="iti-flag ne"/>
                        </div>
                        <span className="country-name">Niger (Nijar)</span><span className="dial-code">+227</span></li>
                      <li className="country" data-dial-code={234} data-country-code="ng">
                        <div className="flag-box">
                          <div className="iti-flag ng"/>
                        </div>
                        <span className="country-name">Nigeria</span><span className="dial-code">+234</span></li>
                      <li className="country" data-dial-code={683} data-country-code="nu">
                        <div className="flag-box">
                          <div className="iti-flag nu"/>
                        </div>
                        <span className="country-name">Niue</span><span className="dial-code">+683</span></li>
                      <li className="country" data-dial-code={672} data-country-code="nf">
                        <div className="flag-box">
                          <div className="iti-flag nf"/>
                        </div>
                        <span className="country-name">Norfolk Island</span><span className="dial-code">+672</span></li>
                      <li className="country" data-dial-code={850} data-country-code="kp">
                        <div className="flag-box">
                          <div className="iti-flag kp"/>
                        </div>
                        <span className="country-name">North Korea (조선 민주주의 인민 공화국)</span><span className="dial-code">+850</span>
                      </li>
                      <li className="country" data-dial-code={1670} data-country-code="mp">
                        <div className="flag-box">
                          <div className="iti-flag mp"/>
                        </div>
                        <span className="country-name">Northern Mariana Islands</span><span
                        className="dial-code">+1670</span></li>
                      <li className="country" data-dial-code={47} data-country-code="no">
                        <div className="flag-box">
                          <div className="iti-flag no"/>
                        </div>
                        <span className="country-name">Norway (Norge)</span><span className="dial-code">+47</span></li>
                      <li className="country" data-dial-code={968} data-country-code="om">
                        <div className="flag-box">
                          <div className="iti-flag om"/>
                        </div>
                        <span className="country-name">Oman (‫عُمان‬‎)</span><span className="dial-code">+968</span>
                      </li>
                      <li className="country" data-dial-code={92} data-country-code="pk">
                        <div className="flag-box">
                          <div className="iti-flag pk"/>
                        </div>
                        <span className="country-name">Pakistan (‫پاکستان‬‎)</span><span
                        className="dial-code">+92</span></li>
                      <li className="country" data-dial-code={680} data-country-code="pw">
                        <div className="flag-box">
                          <div className="iti-flag pw"/>
                        </div>
                        <span className="country-name">Palau</span><span className="dial-code">+680</span></li>
                      <li className="country" data-dial-code={970} data-country-code="ps">
                        <div className="flag-box">
                          <div className="iti-flag ps"/>
                        </div>
                        <span className="country-name">Palestine (‫فلسطين‬‎)</span><span
                        className="dial-code">+970</span></li>
                      <li className="country" data-dial-code={507} data-country-code="pa">
                        <div className="flag-box">
                          <div className="iti-flag pa"/>
                        </div>
                        <span className="country-name">Panama (Panamá)</span><span className="dial-code">+507</span>
                      </li>
                      <li className="country" data-dial-code={675} data-country-code="pg">
                        <div className="flag-box">
                          <div className="iti-flag pg"/>
                        </div>
                        <span className="country-name">Papua New Guinea</span><span className="dial-code">+675</span>
                      </li>
                      <li className="country" data-dial-code={595} data-country-code="py">
                        <div className="flag-box">
                          <div className="iti-flag py"/>
                        </div>
                        <span className="country-name">Paraguay</span><span className="dial-code">+595</span></li>
                      <li className="country" data-dial-code={51} data-country-code="pe">
                        <div className="flag-box">
                          <div className="iti-flag pe"/>
                        </div>
                        <span className="country-name">Peru (Perú)</span><span className="dial-code">+51</span></li>
                      <li className="country" data-dial-code={63} data-country-code="ph">
                        <div className="flag-box">
                          <div className="iti-flag ph"/>
                        </div>
                        <span className="country-name">Philippines</span><span className="dial-code">+63</span></li>
                      <li className="country" data-dial-code={48} data-country-code="pl">
                        <div className="flag-box">
                          <div className="iti-flag pl"/>
                        </div>
                        <span className="country-name">Poland (Polska)</span><span className="dial-code">+48</span></li>
                      <li className="country" data-dial-code={351} data-country-code="pt">
                        <div className="flag-box">
                          <div className="iti-flag pt"/>
                        </div>
                        <span className="country-name">Portugal</span><span className="dial-code">+351</span></li>
                      <li className="country" data-dial-code={1} data-country-code="pr">
                        <div className="flag-box">
                          <div className="iti-flag pr"/>
                        </div>
                        <span className="country-name">Puerto Rico</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={974} data-country-code="qa">
                        <div className="flag-box">
                          <div className="iti-flag qa"/>
                        </div>
                        <span className="country-name">Qatar (‫قطر‬‎)</span><span className="dial-code">+974</span></li>
                      <li className="country" data-dial-code={262} data-country-code="re">
                        <div className="flag-box">
                          <div className="iti-flag re"/>
                        </div>
                        <span className="country-name">Réunion (La Réunion)</span><span
                        className="dial-code">+262</span></li>
                      <li className="country" data-dial-code={40} data-country-code="ro">
                        <div className="flag-box">
                          <div className="iti-flag ro"/>
                        </div>
                        <span className="country-name">Romania (România)</span><span className="dial-code">+40</span>
                      </li>
                      <li className="country" data-dial-code={7} data-country-code="ru">
                        <div className="flag-box">
                          <div className="iti-flag ru"/>
                        </div>
                        <span className="country-name">Russia (Россия)</span><span className="dial-code">+7</span></li>
                      <li className="country" data-dial-code={250} data-country-code="rw">
                        <div className="flag-box">
                          <div className="iti-flag rw"/>
                        </div>
                        <span className="country-name">Rwanda</span><span className="dial-code">+250</span></li>
                      <li className="country" data-dial-code={590} data-country-code="bl">
                        <div className="flag-box">
                          <div className="iti-flag bl"/>
                        </div>
                        <span className="country-name">Saint Barthélemy (Saint-Barthélemy)</span><span
                        className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={290} data-country-code="sh">
                        <div className="flag-box">
                          <div className="iti-flag sh"/>
                        </div>
                        <span className="country-name">Saint Helena</span><span className="dial-code">+290</span></li>
                      <li className="country" data-dial-code={1869} data-country-code="kn">
                        <div className="flag-box">
                          <div className="iti-flag kn"/>
                        </div>
                        <span className="country-name">Saint Kitts and Nevis</span><span
                        className="dial-code">+1869</span></li>
                      <li className="country" data-dial-code={1758} data-country-code="lc">
                        <div className="flag-box">
                          <div className="iti-flag lc"/>
                        </div>
                        <span className="country-name">Saint Lucia</span><span className="dial-code">+1758</span></li>
                      <li className="country" data-dial-code={590} data-country-code="mf">
                        <div className="flag-box">
                          <div className="iti-flag mf"/>
                        </div>
                        <span className="country-name">Saint Martin (Saint-Martin (partie française))</span><span
                        className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={508} data-country-code="pm">
                        <div className="flag-box">
                          <div className="iti-flag pm"/>
                        </div>
                        <span className="country-name">Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)</span><span
                        className="dial-code">+508</span></li>
                      <li className="country" data-dial-code={1784} data-country-code="vc">
                        <div className="flag-box">
                          <div className="iti-flag vc"/>
                        </div>
                        <span className="country-name">Saint Vincent and the Grenadines</span><span
                        className="dial-code">+1784</span></li>
                      <li className="country" data-dial-code={685} data-country-code="ws">
                        <div className="flag-box">
                          <div className="iti-flag ws"/>
                        </div>
                        <span className="country-name">Samoa</span><span className="dial-code">+685</span></li>
                      <li className="country" data-dial-code={378} data-country-code="sm">
                        <div className="flag-box">
                          <div className="iti-flag sm"/>
                        </div>
                        <span className="country-name">San Marino</span><span className="dial-code">+378</span></li>
                      <li className="country" data-dial-code={239} data-country-code="st">
                        <div className="flag-box">
                          <div className="iti-flag st"/>
                        </div>
                        <span className="country-name">São Tomé and Príncipe (São Tomé e Príncipe)</span><span
                        className="dial-code">+239</span></li>
                      <li className="country" data-dial-code={966} data-country-code="sa">
                        <div className="flag-box">
                          <div className="iti-flag sa"/>
                        </div>
                        <span className="country-name">Saudi Arabia (‫المملكة العربية السعودية‬‎)</span><span
                        className="dial-code">+966</span></li>
                      <li className="country" data-dial-code={221} data-country-code="sn">
                        <div className="flag-box">
                          <div className="iti-flag sn"/>
                        </div>
                        <span className="country-name">Senegal (Sénégal)</span><span className="dial-code">+221</span>
                      </li>
                      <li className="country" data-dial-code={381} data-country-code="rs">
                        <div className="flag-box">
                          <div className="iti-flag rs"/>
                        </div>
                        <span className="country-name">Serbia (Србија)</span><span className="dial-code">+381</span>
                      </li>
                      <li className="country" data-dial-code={248} data-country-code="sc">
                        <div className="flag-box">
                          <div className="iti-flag sc"/>
                        </div>
                        <span className="country-name">Seychelles</span><span className="dial-code">+248</span></li>
                      <li className="country" data-dial-code={232} data-country-code="sl">
                        <div className="flag-box">
                          <div className="iti-flag sl"/>
                        </div>
                        <span className="country-name">Sierra Leone</span><span className="dial-code">+232</span></li>
                      <li className="country" data-dial-code={65} data-country-code="sg">
                        <div className="flag-box">
                          <div className="iti-flag sg"/>
                        </div>
                        <span className="country-name">Singapore</span><span className="dial-code">+65</span></li>
                      <li className="country" data-dial-code={1721} data-country-code="sx">
                        <div className="flag-box">
                          <div className="iti-flag sx"/>
                        </div>
                        <span className="country-name">Sint Maarten</span><span className="dial-code">+1721</span></li>
                      <li className="country" data-dial-code={421} data-country-code="sk">
                        <div className="flag-box">
                          <div className="iti-flag sk"/>
                        </div>
                        <span className="country-name">Slovakia (Slovensko)</span><span
                        className="dial-code">+421</span></li>
                      <li className="country" data-dial-code={386} data-country-code="si">
                        <div className="flag-box">
                          <div className="iti-flag si"/>
                        </div>
                        <span className="country-name">Slovenia (Slovenija)</span><span
                        className="dial-code">+386</span></li>
                      <li className="country" data-dial-code={677} data-country-code="sb">
                        <div className="flag-box">
                          <div className="iti-flag sb"/>
                        </div>
                        <span className="country-name">Solomon Islands</span><span className="dial-code">+677</span>
                      </li>
                      <li className="country" data-dial-code={252} data-country-code="so">
                        <div className="flag-box">
                          <div className="iti-flag so"/>
                        </div>
                        <span className="country-name">Somalia (Soomaaliya)</span><span
                        className="dial-code">+252</span></li>
                      <li className="country" data-dial-code={27} data-country-code="za">
                        <div className="flag-box">
                          <div className="iti-flag za"/>
                        </div>
                        <span className="country-name">South Africa</span><span className="dial-code">+27</span></li>
                      <li className="country" data-dial-code={82} data-country-code="kr">
                        <div className="flag-box">
                          <div className="iti-flag kr"/>
                        </div>
                        <span className="country-name">South Korea (대한민국)</span><span className="dial-code">+82</span>
                      </li>
                      <li className="country" data-dial-code={211} data-country-code="ss">
                        <div className="flag-box">
                          <div className="iti-flag ss"/>
                        </div>
                        <span className="country-name">South Sudan (‫جنوب السودان‬‎)</span><span className="dial-code">+211</span>
                      </li>
                      <li className="country" data-dial-code={34} data-country-code="es">
                        <div className="flag-box">
                          <div className="iti-flag es"/>
                        </div>
                        <span className="country-name">Spain (España)</span><span className="dial-code">+34</span></li>
                      <li className="country" data-dial-code={94} data-country-code="lk">
                        <div className="flag-box">
                          <div className="iti-flag lk"/>
                        </div>
                        <span className="country-name">Sri Lanka (ශ්‍රී ලංකාව)</span><span
                        className="dial-code">+94</span></li>
                      <li className="country" data-dial-code={249} data-country-code="sd">
                        <div className="flag-box">
                          <div className="iti-flag sd"/>
                        </div>
                        <span className="country-name">Sudan (‫السودان‬‎)</span><span className="dial-code">+249</span>
                      </li>
                      <li className="country" data-dial-code={597} data-country-code="sr">
                        <div className="flag-box">
                          <div className="iti-flag sr"/>
                        </div>
                        <span className="country-name">Suriname</span><span className="dial-code">+597</span></li>
                      <li className="country" data-dial-code={47} data-country-code="sj">
                        <div className="flag-box">
                          <div className="iti-flag sj"/>
                        </div>
                        <span className="country-name">Svalbard and Jan Mayen</span><span
                        className="dial-code">+47</span></li>
                      <li className="country" data-dial-code={268} data-country-code="sz">
                        <div className="flag-box">
                          <div className="iti-flag sz"/>
                        </div>
                        <span className="country-name">Swaziland</span><span className="dial-code">+268</span></li>
                      <li className="country" data-dial-code={46} data-country-code="se">
                        <div className="flag-box">
                          <div className="iti-flag se"/>
                        </div>
                        <span className="country-name">Sweden (Sverige)</span><span className="dial-code">+46</span>
                      </li>
                      <li className="country" data-dial-code={41} data-country-code="ch">
                        <div className="flag-box">
                          <div className="iti-flag ch"/>
                        </div>
                        <span className="country-name">Switzerland (Schweiz)</span><span
                        className="dial-code">+41</span></li>
                      <li className="country" data-dial-code={963} data-country-code="sy">
                        <div className="flag-box">
                          <div className="iti-flag sy"/>
                        </div>
                        <span className="country-name">Syria (‫سوريا‬‎)</span><span className="dial-code">+963</span>
                      </li>
                      <li className="country" data-dial-code={886} data-country-code="tw">
                        <div className="flag-box">
                          <div className="iti-flag tw"/>
                        </div>
                        <span className="country-name">Taiwan (台灣)</span><span className="dial-code">+886</span></li>
                      <li className="country" data-dial-code={992} data-country-code="tj">
                        <div className="flag-box">
                          <div className="iti-flag tj"/>
                        </div>
                        <span className="country-name">Tajikistan</span><span className="dial-code">+992</span></li>
                      <li className="country" data-dial-code={255} data-country-code="tz">
                        <div className="flag-box">
                          <div className="iti-flag tz"/>
                        </div>
                        <span className="country-name">Tanzania</span><span className="dial-code">+255</span></li>
                      <li className="country" data-dial-code={66} data-country-code="th">
                        <div className="flag-box">
                          <div className="iti-flag th"/>
                        </div>
                        <span className="country-name">Thailand (ไทย)</span><span className="dial-code">+66</span></li>
                      <li className="country" data-dial-code={670} data-country-code="tl">
                        <div className="flag-box">
                          <div className="iti-flag tl"/>
                        </div>
                        <span className="country-name">Timor-Leste</span><span className="dial-code">+670</span></li>
                      <li className="country" data-dial-code={228} data-country-code="tg">
                        <div className="flag-box">
                          <div className="iti-flag tg"/>
                        </div>
                        <span className="country-name">Togo</span><span className="dial-code">+228</span></li>
                      <li className="country" data-dial-code={690} data-country-code="tk">
                        <div className="flag-box">
                          <div className="iti-flag tk"/>
                        </div>
                        <span className="country-name">Tokelau</span><span className="dial-code">+690</span></li>
                      <li className="country" data-dial-code={676} data-country-code="to">
                        <div className="flag-box">
                          <div className="iti-flag to"/>
                        </div>
                        <span className="country-name">Tonga</span><span className="dial-code">+676</span></li>
                      <li className="country" data-dial-code={1868} data-country-code="tt">
                        <div className="flag-box">
                          <div className="iti-flag tt"/>
                        </div>
                        <span className="country-name">Trinidad and Tobago</span><span
                        className="dial-code">+1868</span></li>
                      <li className="country" data-dial-code={216} data-country-code="tn">
                        <div className="flag-box">
                          <div className="iti-flag tn"/>
                        </div>
                        <span className="country-name">Tunisia (‫تونس‬‎)</span><span className="dial-code">+216</span>
                      </li>
                      <li className="country" data-dial-code={90} data-country-code="tr">
                        <div className="flag-box">
                          <div className="iti-flag tr"/>
                        </div>
                        <span className="country-name">Turkey (Türkiye)</span><span className="dial-code">+90</span>
                      </li>
                      <li className="country" data-dial-code={993} data-country-code="tm">
                        <div className="flag-box">
                          <div className="iti-flag tm"/>
                        </div>
                        <span className="country-name">Turkmenistan</span><span className="dial-code">+993</span></li>
                      <li className="country" data-dial-code={1649} data-country-code="tc">
                        <div className="flag-box">
                          <div className="iti-flag tc"/>
                        </div>
                        <span className="country-name">Turks and Caicos Islands</span><span
                        className="dial-code">+1649</span></li>
                      <li className="country" data-dial-code={688} data-country-code="tv">
                        <div className="flag-box">
                          <div className="iti-flag tv"/>
                        </div>
                        <span className="country-name">Tuvalu</span><span className="dial-code">+688</span></li>
                      <li className="country" data-dial-code={1340} data-country-code="vi">
                        <div className="flag-box">
                          <div className="iti-flag vi"/>
                        </div>
                        <span className="country-name">U.S. Virgin Islands</span><span
                        className="dial-code">+1340</span></li>
                      <li className="country" data-dial-code={256} data-country-code="ug">
                        <div className="flag-box">
                          <div className="iti-flag ug"/>
                        </div>
                        <span className="country-name">Uganda</span><span className="dial-code">+256</span></li>
                      <li className="country" data-dial-code={380} data-country-code="ua">
                        <div className="flag-box">
                          <div className="iti-flag ua"/>
                        </div>
                        <span className="country-name">Ukraine (Україна)</span><span className="dial-code">+380</span>
                      </li>
                      <li className="country" data-dial-code={971} data-country-code="ae">
                        <div className="flag-box">
                          <div className="iti-flag ae"/>
                        </div>
                        <span className="country-name">United Arab Emirates (‫الإمارات العربية المتحدة‬‎)</span><span
                        className="dial-code">+971</span></li>
                      <li className="country" data-dial-code={44} data-country-code="gb">
                        <div className="flag-box">
                          <div className="iti-flag gb"/>
                        </div>
                        <span className="country-name">United Kingdom</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={1} data-country-code="us">
                        <div className="flag-box">
                          <div className="iti-flag us"/>
                        </div>
                        <span className="country-name">United States</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={598} data-country-code="uy">
                        <div className="flag-box">
                          <div className="iti-flag uy"/>
                        </div>
                        <span className="country-name">Uruguay</span><span className="dial-code">+598</span></li>
                      <li className="country" data-dial-code={998} data-country-code="uz">
                        <div className="flag-box">
                          <div className="iti-flag uz"/>
                        </div>
                        <span className="country-name">Uzbekistan (Oʻzbekiston)</span><span
                        className="dial-code">+998</span></li>
                      <li className="country" data-dial-code={678} data-country-code="vu">
                        <div className="flag-box">
                          <div className="iti-flag vu"/>
                        </div>
                        <span className="country-name">Vanuatu</span><span className="dial-code">+678</span></li>
                      <li className="country" data-dial-code={39} data-country-code="va">
                        <div className="flag-box">
                          <div className="iti-flag va"/>
                        </div>
                        <span className="country-name">Vatican City (Città del Vaticano)</span><span
                        className="dial-code">+39</span></li>
                      <li className="country" data-dial-code={58} data-country-code="ve">
                        <div className="flag-box">
                          <div className="iti-flag ve"/>
                        </div>
                        <span className="country-name">Venezuela</span><span className="dial-code">+58</span></li>
                      <li className="country" data-dial-code={84} data-country-code="vn">
                        <div className="flag-box">
                          <div className="iti-flag vn"/>
                        </div>
                        <span className="country-name">Vietnam (Việt Nam)</span><span className="dial-code">+84</span>
                      </li>
                      <li className="country" data-dial-code={681} data-country-code="wf">
                        <div className="flag-box">
                          <div className="iti-flag wf"/>
                        </div>
                        <span className="country-name">Wallis and Futuna</span><span className="dial-code">+681</span>
                      </li>
                      <li className="country" data-dial-code={212} data-country-code="eh">
                        <div className="flag-box">
                          <div className="iti-flag eh"/>
                        </div>
                        <span className="country-name">Western Sahara (‫الصحراء الغربية‬‎)</span><span
                        className="dial-code">+212</span></li>
                      <li className="country" data-dial-code={967} data-country-code="ye">
                        <div className="flag-box">
                          <div className="iti-flag ye"/>
                        </div>
                        <span className="country-name">Yemen (‫اليمن‬‎)</span><span className="dial-code">+967</span>
                      </li>
                      <li className="country" data-dial-code={260} data-country-code="zm">
                        <div className="flag-box">
                          <div className="iti-flag zm"/>
                        </div>
                        <span className="country-name">Zambia</span><span className="dial-code">+260</span></li>
                      <li className="country" data-dial-code={263} data-country-code="zw">
                        <div className="flag-box">
                          <div className="iti-flag zw"/>
                        </div>
                        <span className="country-name">Zimbabwe</span><span className="dial-code">+263</span></li>
                      <li className="country" data-dial-code={358} data-country-code="ax">
                        <div className="flag-box">
                          <div className="iti-flag ax"/>
                        </div>
                        <span className="country-name">Åland Islands</span><span className="dial-code">+358</span></li>
                    </ul>
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
              <div className="form-group form-first-name hidden has-feedback">
                <input type="text" name="firstname" placeholder="First Name" autoComplete="off"
                       className="form-control mrg-t-lg first-name" data-fv-field="firstName"/><i
                className="form-control-feedback" data-fv-icon-for="firstName" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="firstName"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Firstname is required.
                </small>
              </div>
              <div className="form-group form-last-name hidden has-feedback">
                <input type="text" name="lastname" placeholder="Last Name" autoComplete="off"
                       className="form-control mrg-t-lg last-name" data-fv-field="lastName"/><i
                className="form-control-feedback" data-fv-icon-for="lastName" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="lastName"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Lastname is required.
                </small>
              </div>
              <div className="form-group">
                <div className="text-xs">Name: <span className="bidder-name"/></div>
                <div className="text-xs">Email Id : <span className="bidder-email"/></div>
                <div className="text-xs">Cell Number : <span className="bidder-cell"/></div>
              </div>
              <div id="payment-type-selection" className="form-group text-center">
                <input className="cc-radio" type="radio" name="paymenttype" autoComplete="off" defaultValue="cc"
                       defaultChecked="checked"/> Credit Card &nbsp; &nbsp; &nbsp; &nbsp;
                <span className="cash-radio hide"><input type="radio" name="paymenttype" autoComplete="off"
                                                         defaultValue="cash"/> Cash</span>
              </div>
              <div className="form-group has-feedback">
                <input type="text" maxLength={3} name="itemCode" placeholder="Item Code" autoComplete="off"
                       className="form-control mrg-t-lg alpha-only" data-fv-field="itemCode"/><i
                className="form-control-feedback" data-fv-icon-for="itemCode" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="stringLength" data-fv-for="itemCode"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                </small>
              </div>
              <div className="form-group">
                <div className="text-xs">Item Name : <span className="item-name"/></div>
                <div className="text-xs">Current Bid: <span className="currency-symbol">$</span><span
                  className="current-bid"/></div>
                <div className="text-xs" style={{display: 'none'}}>Starting Bid: <span
                  className="currency-symbol">$</span><span className="starting-bid"/></div>
                <div className="text-xs">Bid Increment: <span className="currency-symbol">$</span><span
                  className="bid-increment"/></div>
                <div className="text-xs">Buy It Now Price: <span className="currency-symbol">$</span><span
                  className="buy-it-now"/></div>
              </div>
              <div className="form-group has-feedback">
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input type="number" name="amount" placeholder="Amount" autoComplete="off" className="form-control"
                         min={0} data-nextbid={0} data-fv-field="amount"/>
                </div>
                <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="amount"
                   style={{display: 'none'}}/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="amount"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Bid Amount can't be empty
                </small>
                <small className="help-block" data-fv-validator="digits" data-fv-for="amount"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Digits Only Accepted.
                </small>
                <small className="help-block" data-fv-validator="greaterThan" data-fv-for="amount"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This bid is below the minimum bid
                  amount. Bids must be placed in $%s increments.
                </small>
                <small className="help-block" data-fv-validator="callback" data-fv-for="amount"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                </small>
                <small className="help-block" data-fv-validator="integer" data-fv-for="amount"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                </small>
              </div>
              <div className="cc-info">
                <style
                  dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n" }}/>
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
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name is required
                        and can't be empty
                      </small>
                      <small className="help-block" data-fv-validator="stringLength" data-fv-for="cardholdername"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name must be more
                        than 6 and less than 70 characters long
                      </small>
                      <small className="help-block" data-fv-validator="callback" data-fv-for="cardholdername"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name can not start
                        or end with white space
                      </small>
                    </div>
                    <div className="form-group has-feedback">
                      <label className="control-label">Credit Card Number</label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true"/></div>
                        <input type="number" className="form-control" id="cardnumber" placeholder="8888-8888-8888-8888"
                               maxLength={16} data-stripe="number" required="required" data-fv-field="cardnumber"/>
                      </div>
                      <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="cardnumber"
                         style={{display: 'none'}}/>
                      <div className="small text-danger js-error card_error number"/>
                      <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cardnumber"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number is required
                        and can't be empty
                      </small>
                      <small className="help-block" data-fv-validator="creditCard" data-fv-for="cardnumber"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number is invalid
                      </small>
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
                          <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="expYear"
                             style={{display: 'none'}}/><i
                          className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="expMonth"
                          style={{display: 'none'}}/>
                          <div className="small text-danger js-error card_error exp_year exp_month"/>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="expMonth"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration month is
                            required
                          </small>
                          <small className="help-block" data-fv-validator="digits" data-fv-for="expMonth"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration month can
                            contain digits only
                          </small>
                          <small className="help-block" data-fv-validator="callback" data-fv-for="expMonth"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Your card is Expired
                          </small>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="expYear"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration year is
                            required
                          </small>
                          <small className="help-block" data-fv-validator="digits" data-fv-for="expYear"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration year can
                            contain digits only
                          </small>
                          <small className="help-block" data-fv-validator="callback" data-fv-for="expYear"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}></small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group has-feedback">
                          <label className="control-label">CVV Number</label>
                          <div className="input-group">
                            <input type="number" className="form-control" maxLength={4} size={4} data-stripe="cvc"
                                   id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"/>
                          </div>
                          <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="cvv"
                             style={{display: 'none'}}/>
                          <div className="small text-danger js-error card_error cvc"/>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cvv"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV is required and can't
                            be empty
                          </small>
                          <small className="help-block" data-fv-validator="stringLength" data-fv-for="cvv"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV must be more than 4
                            and less than 3 characters long
                          </small>
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
              <button className="btn btn-white" onClick={()=>{this.setActiveView('select-action')}}>Back</button>
            </div>
          </view>
          <view name="submit-pledge" className={cx(this.state.activeViews === 'submit-pledge' && s.active)}>
            <h4 className="text-center"><strong>Submit Pledge</strong></h4>
            <form className="ajax-form validated fv-form fv-form-bootstrap" method="POST"
                  action="/AccelEventsWebApp/events/jkazarian8/volunteer/submit-pledge"
                  data-validation-fields="getPledgeValidationFields" data-onsuccess="handleBidSuccess"
                  data-validate-function="validateForm" data-switch-view="select-action" data-view-name="submit-pledge"
                  noValidate="novalidate">
              <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
              <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
                className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
              <div className="form-group has-feedback">
                <input type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                       className="form-control mrg-t-lg bidder-email" data-fv-field="email"/><i
                className="form-control-feedback" data-fv-icon-for="email" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="email"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Bidder email can't be empty
                </small>
                <small className="help-block" data-fv-validator="emailAddress" data-fv-for="email"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Invalid bidder email id
                </small>
              </div>
              <div className="form-group has-feedback">
                <div className="intl-tel-input allow-dropdown separate-dial-code iti-sdc-2">
                  <div className="flag-container">
                    <div className="selected-flag" tabIndex={0} title="Canada: +1">
                      <div className="iti-flag ca"/>
                      <div className="selected-dial-code">+1</div>
                      <div className="iti-arrow"/>
                    </div>
                    <ul className="country-list hide">
                      <li className="country preferred" data-dial-code={1} data-country-code="us">
                        <div className="flag-box">
                          <div className="iti-flag us"/>
                        </div>
                        <span className="country-name">United States</span><span className="dial-code">+1</span></li>
                      <li className="country preferred active" data-dial-code={1} data-country-code="ca">
                        <div className="flag-box">
                          <div className="iti-flag ca"/>
                        </div>
                        <span className="country-name">Canada</span><span className="dial-code">+1</span></li>
                      <li className="country preferred" data-dial-code={61} data-country-code="au">
                        <div className="flag-box">
                          <div className="iti-flag au"/>
                        </div>
                        <span className="country-name">Australia</span><span className="dial-code">+61</span></li>
                      <li className="country preferred" data-dial-code={91} data-country-code="in">
                        <div className="flag-box">
                          <div className="iti-flag in"/>
                        </div>
                        <span className="country-name">India (भारत)</span><span className="dial-code">+91</span></li>
                      <li className="divider"/>
                      <li className="country" data-dial-code={93} data-country-code="af">
                        <div className="flag-box">
                          <div className="iti-flag af"/>
                        </div>
                        <span className="country-name">Afghanistan (‫افغانستان‬‎)</span><span
                        className="dial-code">+93</span></li>
                      <li className="country" data-dial-code={355} data-country-code="al">
                        <div className="flag-box">
                          <div className="iti-flag al"/>
                        </div>
                        <span className="country-name">Albania (Shqipëri)</span><span className="dial-code">+355</span>
                      </li>
                      <li className="country" data-dial-code={213} data-country-code="dz">
                        <div className="flag-box">
                          <div className="iti-flag dz"/>
                        </div>
                        <span className="country-name">Algeria (‫الجزائر‬‎)</span><span
                        className="dial-code">+213</span></li>
                      <li className="country" data-dial-code={1684} data-country-code="as">
                        <div className="flag-box">
                          <div className="iti-flag as"/>
                        </div>
                        <span className="country-name">American Samoa</span><span className="dial-code">+1684</span>
                      </li>
                      <li className="country" data-dial-code={376} data-country-code="ad">
                        <div className="flag-box">
                          <div className="iti-flag ad"/>
                        </div>
                        <span className="country-name">Andorra</span><span className="dial-code">+376</span></li>
                      <li className="country" data-dial-code={244} data-country-code="ao">
                        <div className="flag-box">
                          <div className="iti-flag ao"/>
                        </div>
                        <span className="country-name">Angola</span><span className="dial-code">+244</span></li>
                      <li className="country" data-dial-code={1264} data-country-code="ai">
                        <div className="flag-box">
                          <div className="iti-flag ai"/>
                        </div>
                        <span className="country-name">Anguilla</span><span className="dial-code">+1264</span></li>
                      <li className="country" data-dial-code={1268} data-country-code="ag">
                        <div className="flag-box">
                          <div className="iti-flag ag"/>
                        </div>
                        <span className="country-name">Antigua and Barbuda</span><span
                        className="dial-code">+1268</span></li>
                      <li className="country" data-dial-code={54} data-country-code="ar">
                        <div className="flag-box">
                          <div className="iti-flag ar"/>
                        </div>
                        <span className="country-name">Argentina</span><span className="dial-code">+54</span></li>
                      <li className="country" data-dial-code={374} data-country-code="am">
                        <div className="flag-box">
                          <div className="iti-flag am"/>
                        </div>
                        <span className="country-name">Armenia (Հայաստան)</span><span className="dial-code">+374</span>
                      </li>
                      <li className="country" data-dial-code={297} data-country-code="aw">
                        <div className="flag-box">
                          <div className="iti-flag aw"/>
                        </div>
                        <span className="country-name">Aruba</span><span className="dial-code">+297</span></li>
                      <li className="country" data-dial-code={61} data-country-code="au">
                        <div className="flag-box">
                          <div className="iti-flag au"/>
                        </div>
                        <span className="country-name">Australia</span><span className="dial-code">+61</span></li>
                      <li className="country" data-dial-code={43} data-country-code="at">
                        <div className="flag-box">
                          <div className="iti-flag at"/>
                        </div>
                        <span className="country-name">Austria (Österreich)</span><span className="dial-code">+43</span>
                      </li>
                      <li className="country" data-dial-code={994} data-country-code="az">
                        <div className="flag-box">
                          <div className="iti-flag az"/>
                        </div>
                        <span className="country-name">Azerbaijan (Azərbaycan)</span><span
                        className="dial-code">+994</span></li>
                      <li className="country" data-dial-code={1242} data-country-code="bs">
                        <div className="flag-box">
                          <div className="iti-flag bs"/>
                        </div>
                        <span className="country-name">Bahamas</span><span className="dial-code">+1242</span></li>
                      <li className="country" data-dial-code={973} data-country-code="bh">
                        <div className="flag-box">
                          <div className="iti-flag bh"/>
                        </div>
                        <span className="country-name">Bahrain (‫البحرين‬‎)</span><span
                        className="dial-code">+973</span></li>
                      <li className="country" data-dial-code={880} data-country-code="bd">
                        <div className="flag-box">
                          <div className="iti-flag bd"/>
                        </div>
                        <span className="country-name">Bangladesh (বাংলাদেশ)</span><span
                        className="dial-code">+880</span></li>
                      <li className="country" data-dial-code={1246} data-country-code="bb">
                        <div className="flag-box">
                          <div className="iti-flag bb"/>
                        </div>
                        <span className="country-name">Barbados</span><span className="dial-code">+1246</span></li>
                      <li className="country" data-dial-code={375} data-country-code="by">
                        <div className="flag-box">
                          <div className="iti-flag by"/>
                        </div>
                        <span className="country-name">Belarus (Беларусь)</span><span className="dial-code">+375</span>
                      </li>
                      <li className="country" data-dial-code={32} data-country-code="be">
                        <div className="flag-box">
                          <div className="iti-flag be"/>
                        </div>
                        <span className="country-name">Belgium (België)</span><span className="dial-code">+32</span>
                      </li>
                      <li className="country" data-dial-code={501} data-country-code="bz">
                        <div className="flag-box">
                          <div className="iti-flag bz"/>
                        </div>
                        <span className="country-name">Belize</span><span className="dial-code">+501</span></li>
                      <li className="country" data-dial-code={229} data-country-code="bj">
                        <div className="flag-box">
                          <div className="iti-flag bj"/>
                        </div>
                        <span className="country-name">Benin (Bénin)</span><span className="dial-code">+229</span></li>
                      <li className="country" data-dial-code={1441} data-country-code="bm">
                        <div className="flag-box">
                          <div className="iti-flag bm"/>
                        </div>
                        <span className="country-name">Bermuda</span><span className="dial-code">+1441</span></li>
                      <li className="country" data-dial-code={975} data-country-code="bt">
                        <div className="flag-box">
                          <div className="iti-flag bt"/>
                        </div>
                        <span className="country-name">Bhutan (འབྲུག)</span><span className="dial-code">+975</span></li>
                      <li className="country" data-dial-code={591} data-country-code="bo">
                        <div className="flag-box">
                          <div className="iti-flag bo"/>
                        </div>
                        <span className="country-name">Bolivia</span><span className="dial-code">+591</span></li>
                      <li className="country" data-dial-code={387} data-country-code="ba">
                        <div className="flag-box">
                          <div className="iti-flag ba"/>
                        </div>
                        <span className="country-name">Bosnia and Herzegovina (Босна и Херцеговина)</span><span
                        className="dial-code">+387</span></li>
                      <li className="country" data-dial-code={267} data-country-code="bw">
                        <div className="flag-box">
                          <div className="iti-flag bw"/>
                        </div>
                        <span className="country-name">Botswana</span><span className="dial-code">+267</span></li>
                      <li className="country" data-dial-code={55} data-country-code="br">
                        <div className="flag-box">
                          <div className="iti-flag br"/>
                        </div>
                        <span className="country-name">Brazil (Brasil)</span><span className="dial-code">+55</span></li>
                      <li className="country" data-dial-code={246} data-country-code="io">
                        <div className="flag-box">
                          <div className="iti-flag io"/>
                        </div>
                        <span className="country-name">British Indian Ocean Territory</span><span className="dial-code">+246</span>
                      </li>
                      <li className="country" data-dial-code={1284} data-country-code="vg">
                        <div className="flag-box">
                          <div className="iti-flag vg"/>
                        </div>
                        <span className="country-name">British Virgin Islands</span><span
                        className="dial-code">+1284</span></li>
                      <li className="country" data-dial-code={673} data-country-code="bn">
                        <div className="flag-box">
                          <div className="iti-flag bn"/>
                        </div>
                        <span className="country-name">Brunei</span><span className="dial-code">+673</span></li>
                      <li className="country" data-dial-code={359} data-country-code="bg">
                        <div className="flag-box">
                          <div className="iti-flag bg"/>
                        </div>
                        <span className="country-name">Bulgaria (България)</span><span className="dial-code">+359</span>
                      </li>
                      <li className="country" data-dial-code={226} data-country-code="bf">
                        <div className="flag-box">
                          <div className="iti-flag bf"/>
                        </div>
                        <span className="country-name">Burkina Faso</span><span className="dial-code">+226</span></li>
                      <li className="country" data-dial-code={257} data-country-code="bi">
                        <div className="flag-box">
                          <div className="iti-flag bi"/>
                        </div>
                        <span className="country-name">Burundi (Uburundi)</span><span className="dial-code">+257</span>
                      </li>
                      <li className="country" data-dial-code={855} data-country-code="kh">
                        <div className="flag-box">
                          <div className="iti-flag kh"/>
                        </div>
                        <span className="country-name">Cambodia (កម្ពុជា)</span><span className="dial-code">+855</span>
                      </li>
                      <li className="country" data-dial-code={237} data-country-code="cm">
                        <div className="flag-box">
                          <div className="iti-flag cm"/>
                        </div>
                        <span className="country-name">Cameroon (Cameroun)</span><span className="dial-code">+237</span>
                      </li>
                      <li className="country" data-dial-code={1} data-country-code="ca">
                        <div className="flag-box">
                          <div className="iti-flag ca"/>
                        </div>
                        <span className="country-name">Canada</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={238} data-country-code="cv">
                        <div className="flag-box">
                          <div className="iti-flag cv"/>
                        </div>
                        <span className="country-name">Cape Verde (Kabu Verdi)</span><span
                        className="dial-code">+238</span></li>
                      <li className="country" data-dial-code={599} data-country-code="bq">
                        <div className="flag-box">
                          <div className="iti-flag bq"/>
                        </div>
                        <span className="country-name">Caribbean Netherlands</span><span
                        className="dial-code">+599</span></li>
                      <li className="country" data-dial-code={1345} data-country-code="ky">
                        <div className="flag-box">
                          <div className="iti-flag ky"/>
                        </div>
                        <span className="country-name">Cayman Islands</span><span className="dial-code">+1345</span>
                      </li>
                      <li className="country" data-dial-code={236} data-country-code="cf">
                        <div className="flag-box">
                          <div className="iti-flag cf"/>
                        </div>
                        <span className="country-name">Central African Republic (République centrafricaine)</span><span
                        className="dial-code">+236</span></li>
                      <li className="country" data-dial-code={235} data-country-code="td">
                        <div className="flag-box">
                          <div className="iti-flag td"/>
                        </div>
                        <span className="country-name">Chad (Tchad)</span><span className="dial-code">+235</span></li>
                      <li className="country" data-dial-code={56} data-country-code="cl">
                        <div className="flag-box">
                          <div className="iti-flag cl"/>
                        </div>
                        <span className="country-name">Chile</span><span className="dial-code">+56</span></li>
                      <li className="country" data-dial-code={86} data-country-code="cn">
                        <div className="flag-box">
                          <div className="iti-flag cn"/>
                        </div>
                        <span className="country-name">China (中国)</span><span className="dial-code">+86</span></li>
                      <li className="country" data-dial-code={61} data-country-code="cx">
                        <div className="flag-box">
                          <div className="iti-flag cx"/>
                        </div>
                        <span className="country-name">Christmas Island</span><span className="dial-code">+61</span>
                      </li>
                      <li className="country" data-dial-code={61} data-country-code="cc">
                        <div className="flag-box">
                          <div className="iti-flag cc"/>
                        </div>
                        <span className="country-name">Cocos (Keeling) Islands</span><span
                        className="dial-code">+61</span></li>
                      <li className="country" data-dial-code={57} data-country-code="co">
                        <div className="flag-box">
                          <div className="iti-flag co"/>
                        </div>
                        <span className="country-name">Colombia</span><span className="dial-code">+57</span></li>
                      <li className="country" data-dial-code={269} data-country-code="km">
                        <div className="flag-box">
                          <div className="iti-flag km"/>
                        </div>
                        <span className="country-name">Comoros (‫جزر القمر‬‎)</span><span
                        className="dial-code">+269</span></li>
                      <li className="country" data-dial-code={243} data-country-code="cd">
                        <div className="flag-box">
                          <div className="iti-flag cd"/>
                        </div>
                        <span className="country-name">Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)</span><span
                        className="dial-code">+243</span></li>
                      <li className="country" data-dial-code={242} data-country-code="cg">
                        <div className="flag-box">
                          <div className="iti-flag cg"/>
                        </div>
                        <span className="country-name">Congo (Republic) (Congo-Brazzaville)</span><span
                        className="dial-code">+242</span></li>
                      <li className="country" data-dial-code={682} data-country-code="ck">
                        <div className="flag-box">
                          <div className="iti-flag ck"/>
                        </div>
                        <span className="country-name">Cook Islands</span><span className="dial-code">+682</span></li>
                      <li className="country" data-dial-code={506} data-country-code="cr">
                        <div className="flag-box">
                          <div className="iti-flag cr"/>
                        </div>
                        <span className="country-name">Costa Rica</span><span className="dial-code">+506</span></li>
                      <li className="country" data-dial-code={225} data-country-code="ci">
                        <div className="flag-box">
                          <div className="iti-flag ci"/>
                        </div>
                        <span className="country-name">Côte d’Ivoire</span><span className="dial-code">+225</span></li>
                      <li className="country" data-dial-code={385} data-country-code="hr">
                        <div className="flag-box">
                          <div className="iti-flag hr"/>
                        </div>
                        <span className="country-name">Croatia (Hrvatska)</span><span className="dial-code">+385</span>
                      </li>
                      <li className="country" data-dial-code={53} data-country-code="cu">
                        <div className="flag-box">
                          <div className="iti-flag cu"/>
                        </div>
                        <span className="country-name">Cuba</span><span className="dial-code">+53</span></li>
                      <li className="country" data-dial-code={599} data-country-code="cw">
                        <div className="flag-box">
                          <div className="iti-flag cw"/>
                        </div>
                        <span className="country-name">Curaçao</span><span className="dial-code">+599</span></li>
                      <li className="country" data-dial-code={357} data-country-code="cy">
                        <div className="flag-box">
                          <div className="iti-flag cy"/>
                        </div>
                        <span className="country-name">Cyprus (Κύπρος)</span><span className="dial-code">+357</span>
                      </li>
                      <li className="country" data-dial-code={420} data-country-code="cz">
                        <div className="flag-box">
                          <div className="iti-flag cz"/>
                        </div>
                        <span className="country-name">Czech Republic (Česká republika)</span><span
                        className="dial-code">+420</span></li>
                      <li className="country" data-dial-code={45} data-country-code="dk">
                        <div className="flag-box">
                          <div className="iti-flag dk"/>
                        </div>
                        <span className="country-name">Denmark (Danmark)</span><span className="dial-code">+45</span>
                      </li>
                      <li className="country" data-dial-code={253} data-country-code="dj">
                        <div className="flag-box">
                          <div className="iti-flag dj"/>
                        </div>
                        <span className="country-name">Djibouti</span><span className="dial-code">+253</span></li>
                      <li className="country" data-dial-code={1767} data-country-code="dm">
                        <div className="flag-box">
                          <div className="iti-flag dm"/>
                        </div>
                        <span className="country-name">Dominica</span><span className="dial-code">+1767</span></li>
                      <li className="country" data-dial-code={1} data-country-code="do">
                        <div className="flag-box">
                          <div className="iti-flag do"/>
                        </div>
                        <span className="country-name">Dominican Republic (República Dominicana)</span><span
                        className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={593} data-country-code="ec">
                        <div className="flag-box">
                          <div className="iti-flag ec"/>
                        </div>
                        <span className="country-name">Ecuador</span><span className="dial-code">+593</span></li>
                      <li className="country" data-dial-code={20} data-country-code="eg">
                        <div className="flag-box">
                          <div className="iti-flag eg"/>
                        </div>
                        <span className="country-name">Egypt (‫مصر‬‎)</span><span className="dial-code">+20</span></li>
                      <li className="country" data-dial-code={503} data-country-code="sv">
                        <div className="flag-box">
                          <div className="iti-flag sv"/>
                        </div>
                        <span className="country-name">El Salvador</span><span className="dial-code">+503</span></li>
                      <li className="country" data-dial-code={240} data-country-code="gq">
                        <div className="flag-box">
                          <div className="iti-flag gq"/>
                        </div>
                        <span className="country-name">Equatorial Guinea (Guinea Ecuatorial)</span><span
                        className="dial-code">+240</span></li>
                      <li className="country" data-dial-code={291} data-country-code="er">
                        <div className="flag-box">
                          <div className="iti-flag er"/>
                        </div>
                        <span className="country-name">Eritrea</span><span className="dial-code">+291</span></li>
                      <li className="country" data-dial-code={372} data-country-code="ee">
                        <div className="flag-box">
                          <div className="iti-flag ee"/>
                        </div>
                        <span className="country-name">Estonia (Eesti)</span><span className="dial-code">+372</span>
                      </li>
                      <li className="country" data-dial-code={251} data-country-code="et">
                        <div className="flag-box">
                          <div className="iti-flag et"/>
                        </div>
                        <span className="country-name">Ethiopia</span><span className="dial-code">+251</span></li>
                      <li className="country" data-dial-code={500} data-country-code="fk">
                        <div className="flag-box">
                          <div className="iti-flag fk"/>
                        </div>
                        <span className="country-name">Falkland Islands (Islas Malvinas)</span><span
                        className="dial-code">+500</span></li>
                      <li className="country" data-dial-code={298} data-country-code="fo">
                        <div className="flag-box">
                          <div className="iti-flag fo"/>
                        </div>
                        <span className="country-name">Faroe Islands (Føroyar)</span><span
                        className="dial-code">+298</span></li>
                      <li className="country" data-dial-code={679} data-country-code="fj">
                        <div className="flag-box">
                          <div className="iti-flag fj"/>
                        </div>
                        <span className="country-name">Fiji</span><span className="dial-code">+679</span></li>
                      <li className="country" data-dial-code={358} data-country-code="fi">
                        <div className="flag-box">
                          <div className="iti-flag fi"/>
                        </div>
                        <span className="country-name">Finland (Suomi)</span><span className="dial-code">+358</span>
                      </li>
                      <li className="country" data-dial-code={33} data-country-code="fr">
                        <div className="flag-box">
                          <div className="iti-flag fr"/>
                        </div>
                        <span className="country-name">France</span><span className="dial-code">+33</span></li>
                      <li className="country" data-dial-code={594} data-country-code="gf">
                        <div className="flag-box">
                          <div className="iti-flag gf"/>
                        </div>
                        <span className="country-name">French Guiana (Guyane française)</span><span
                        className="dial-code">+594</span></li>
                      <li className="country" data-dial-code={689} data-country-code="pf">
                        <div className="flag-box">
                          <div className="iti-flag pf"/>
                        </div>
                        <span className="country-name">French Polynesia (Polynésie française)</span><span
                        className="dial-code">+689</span></li>
                      <li className="country" data-dial-code={241} data-country-code="ga">
                        <div className="flag-box">
                          <div className="iti-flag ga"/>
                        </div>
                        <span className="country-name">Gabon</span><span className="dial-code">+241</span></li>
                      <li className="country" data-dial-code={220} data-country-code="gm">
                        <div className="flag-box">
                          <div className="iti-flag gm"/>
                        </div>
                        <span className="country-name">Gambia</span><span className="dial-code">+220</span></li>
                      <li className="country" data-dial-code={995} data-country-code="ge">
                        <div className="flag-box">
                          <div className="iti-flag ge"/>
                        </div>
                        <span className="country-name">Georgia (საქართველო)</span><span
                        className="dial-code">+995</span></li>
                      <li className="country" data-dial-code={49} data-country-code="de">
                        <div className="flag-box">
                          <div className="iti-flag de"/>
                        </div>
                        <span className="country-name">Germany (Deutschland)</span><span
                        className="dial-code">+49</span></li>
                      <li className="country" data-dial-code={233} data-country-code="gh">
                        <div className="flag-box">
                          <div className="iti-flag gh"/>
                        </div>
                        <span className="country-name">Ghana (Gaana)</span><span className="dial-code">+233</span></li>
                      <li className="country" data-dial-code={350} data-country-code="gi">
                        <div className="flag-box">
                          <div className="iti-flag gi"/>
                        </div>
                        <span className="country-name">Gibraltar</span><span className="dial-code">+350</span></li>
                      <li className="country" data-dial-code={30} data-country-code="gr">
                        <div className="flag-box">
                          <div className="iti-flag gr"/>
                        </div>
                        <span className="country-name">Greece (Ελλάδα)</span><span className="dial-code">+30</span></li>
                      <li className="country" data-dial-code={299} data-country-code="gl">
                        <div className="flag-box">
                          <div className="iti-flag gl"/>
                        </div>
                        <span className="country-name">Greenland (Kalaallit Nunaat)</span><span className="dial-code">+299</span>
                      </li>
                      <li className="country" data-dial-code={1473} data-country-code="gd">
                        <div className="flag-box">
                          <div className="iti-flag gd"/>
                        </div>
                        <span className="country-name">Grenada</span><span className="dial-code">+1473</span></li>
                      <li className="country" data-dial-code={590} data-country-code="gp">
                        <div className="flag-box">
                          <div className="iti-flag gp"/>
                        </div>
                        <span className="country-name">Guadeloupe</span><span className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={1671} data-country-code="gu">
                        <div className="flag-box">
                          <div className="iti-flag gu"/>
                        </div>
                        <span className="country-name">Guam</span><span className="dial-code">+1671</span></li>
                      <li className="country" data-dial-code={502} data-country-code="gt">
                        <div className="flag-box">
                          <div className="iti-flag gt"/>
                        </div>
                        <span className="country-name">Guatemala</span><span className="dial-code">+502</span></li>
                      <li className="country" data-dial-code={44} data-country-code="gg">
                        <div className="flag-box">
                          <div className="iti-flag gg"/>
                        </div>
                        <span className="country-name">Guernsey</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={224} data-country-code="gn">
                        <div className="flag-box">
                          <div className="iti-flag gn"/>
                        </div>
                        <span className="country-name">Guinea (Guinée)</span><span className="dial-code">+224</span>
                      </li>
                      <li className="country" data-dial-code={245} data-country-code="gw">
                        <div className="flag-box">
                          <div className="iti-flag gw"/>
                        </div>
                        <span className="country-name">Guinea-Bissau (Guiné Bissau)</span><span className="dial-code">+245</span>
                      </li>
                      <li className="country" data-dial-code={592} data-country-code="gy">
                        <div className="flag-box">
                          <div className="iti-flag gy"/>
                        </div>
                        <span className="country-name">Guyana</span><span className="dial-code">+592</span></li>
                      <li className="country" data-dial-code={509} data-country-code="ht">
                        <div className="flag-box">
                          <div className="iti-flag ht"/>
                        </div>
                        <span className="country-name">Haiti</span><span className="dial-code">+509</span></li>
                      <li className="country" data-dial-code={504} data-country-code="hn">
                        <div className="flag-box">
                          <div className="iti-flag hn"/>
                        </div>
                        <span className="country-name">Honduras</span><span className="dial-code">+504</span></li>
                      <li className="country" data-dial-code={852} data-country-code="hk">
                        <div className="flag-box">
                          <div className="iti-flag hk"/>
                        </div>
                        <span className="country-name">Hong Kong (香港)</span><span className="dial-code">+852</span></li>
                      <li className="country" data-dial-code={36} data-country-code="hu">
                        <div className="flag-box">
                          <div className="iti-flag hu"/>
                        </div>
                        <span className="country-name">Hungary (Magyarország)</span><span
                        className="dial-code">+36</span></li>
                      <li className="country" data-dial-code={354} data-country-code="is">
                        <div className="flag-box">
                          <div className="iti-flag is"/>
                        </div>
                        <span className="country-name">Iceland (Ísland)</span><span className="dial-code">+354</span>
                      </li>
                      <li className="country" data-dial-code={91} data-country-code="in">
                        <div className="flag-box">
                          <div className="iti-flag in"/>
                        </div>
                        <span className="country-name">India (भारत)</span><span className="dial-code">+91</span></li>
                      <li className="country" data-dial-code={62} data-country-code="id">
                        <div className="flag-box">
                          <div className="iti-flag id"/>
                        </div>
                        <span className="country-name">Indonesia</span><span className="dial-code">+62</span></li>
                      <li className="country" data-dial-code={98} data-country-code="ir">
                        <div className="flag-box">
                          <div className="iti-flag ir"/>
                        </div>
                        <span className="country-name">Iran (‫ایران‬‎)</span><span className="dial-code">+98</span></li>
                      <li className="country" data-dial-code={964} data-country-code="iq">
                        <div className="flag-box">
                          <div className="iti-flag iq"/>
                        </div>
                        <span className="country-name">Iraq (‫العراق‬‎)</span><span className="dial-code">+964</span>
                      </li>
                      <li className="country" data-dial-code={353} data-country-code="ie">
                        <div className="flag-box">
                          <div className="iti-flag ie"/>
                        </div>
                        <span className="country-name">Ireland</span><span className="dial-code">+353</span></li>
                      <li className="country" data-dial-code={44} data-country-code="im">
                        <div className="flag-box">
                          <div className="iti-flag im"/>
                        </div>
                        <span className="country-name">Isle of Man</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={972} data-country-code="il">
                        <div className="flag-box">
                          <div className="iti-flag il"/>
                        </div>
                        <span className="country-name">Israel (‫ישראל‬‎)</span><span className="dial-code">+972</span>
                      </li>
                      <li className="country" data-dial-code={39} data-country-code="it">
                        <div className="flag-box">
                          <div className="iti-flag it"/>
                        </div>
                        <span className="country-name">Italy (Italia)</span><span className="dial-code">+39</span></li>
                      <li className="country" data-dial-code={1876} data-country-code="jm">
                        <div className="flag-box">
                          <div className="iti-flag jm"/>
                        </div>
                        <span className="country-name">Jamaica</span><span className="dial-code">+1876</span></li>
                      <li className="country" data-dial-code={81} data-country-code="jp">
                        <div className="flag-box">
                          <div className="iti-flag jp"/>
                        </div>
                        <span className="country-name">Japan (日本)</span><span className="dial-code">+81</span></li>
                      <li className="country" data-dial-code={44} data-country-code="je">
                        <div className="flag-box">
                          <div className="iti-flag je"/>
                        </div>
                        <span className="country-name">Jersey</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={962} data-country-code="jo">
                        <div className="flag-box">
                          <div className="iti-flag jo"/>
                        </div>
                        <span className="country-name">Jordan (‫الأردن‬‎)</span><span className="dial-code">+962</span>
                      </li>
                      <li className="country" data-dial-code={7} data-country-code="kz">
                        <div className="flag-box">
                          <div className="iti-flag kz"/>
                        </div>
                        <span className="country-name">Kazakhstan (Казахстан)</span><span
                        className="dial-code">+7</span></li>
                      <li className="country" data-dial-code={254} data-country-code="ke">
                        <div className="flag-box">
                          <div className="iti-flag ke"/>
                        </div>
                        <span className="country-name">Kenya</span><span className="dial-code">+254</span></li>
                      <li className="country" data-dial-code={686} data-country-code="ki">
                        <div className="flag-box">
                          <div className="iti-flag ki"/>
                        </div>
                        <span className="country-name">Kiribati</span><span className="dial-code">+686</span></li>
                      <li className="country" data-dial-code={383} data-country-code="xk">
                        <div className="flag-box">
                          <div className="iti-flag xk"/>
                        </div>
                        <span className="country-name">Kosovo</span><span className="dial-code">+383</span></li>
                      <li className="country" data-dial-code={965} data-country-code="kw">
                        <div className="flag-box">
                          <div className="iti-flag kw"/>
                        </div>
                        <span className="country-name">Kuwait (‫الكويت‬‎)</span><span className="dial-code">+965</span>
                      </li>
                      <li className="country" data-dial-code={996} data-country-code="kg">
                        <div className="flag-box">
                          <div className="iti-flag kg"/>
                        </div>
                        <span className="country-name">Kyrgyzstan (Кыргызстан)</span><span
                        className="dial-code">+996</span></li>
                      <li className="country" data-dial-code={856} data-country-code="la">
                        <div className="flag-box">
                          <div className="iti-flag la"/>
                        </div>
                        <span className="country-name">Laos (ລາວ)</span><span className="dial-code">+856</span></li>
                      <li className="country" data-dial-code={371} data-country-code="lv">
                        <div className="flag-box">
                          <div className="iti-flag lv"/>
                        </div>
                        <span className="country-name">Latvia (Latvija)</span><span className="dial-code">+371</span>
                      </li>
                      <li className="country" data-dial-code={961} data-country-code="lb">
                        <div className="flag-box">
                          <div className="iti-flag lb"/>
                        </div>
                        <span className="country-name">Lebanon (‫لبنان‬‎)</span><span className="dial-code">+961</span>
                      </li>
                      <li className="country" data-dial-code={266} data-country-code="ls">
                        <div className="flag-box">
                          <div className="iti-flag ls"/>
                        </div>
                        <span className="country-name">Lesotho</span><span className="dial-code">+266</span></li>
                      <li className="country" data-dial-code={231} data-country-code="lr">
                        <div className="flag-box">
                          <div className="iti-flag lr"/>
                        </div>
                        <span className="country-name">Liberia</span><span className="dial-code">+231</span></li>
                      <li className="country" data-dial-code={218} data-country-code="ly">
                        <div className="flag-box">
                          <div className="iti-flag ly"/>
                        </div>
                        <span className="country-name">Libya (‫ليبيا‬‎)</span><span className="dial-code">+218</span>
                      </li>
                      <li className="country" data-dial-code={423} data-country-code="li">
                        <div className="flag-box">
                          <div className="iti-flag li"/>
                        </div>
                        <span className="country-name">Liechtenstein</span><span className="dial-code">+423</span></li>
                      <li className="country" data-dial-code={370} data-country-code="lt">
                        <div className="flag-box">
                          <div className="iti-flag lt"/>
                        </div>
                        <span className="country-name">Lithuania (Lietuva)</span><span className="dial-code">+370</span>
                      </li>
                      <li className="country" data-dial-code={352} data-country-code="lu">
                        <div className="flag-box">
                          <div className="iti-flag lu"/>
                        </div>
                        <span className="country-name">Luxembourg</span><span className="dial-code">+352</span></li>
                      <li className="country" data-dial-code={853} data-country-code="mo">
                        <div className="flag-box">
                          <div className="iti-flag mo"/>
                        </div>
                        <span className="country-name">Macau (澳門)</span><span className="dial-code">+853</span></li>
                      <li className="country" data-dial-code={389} data-country-code="mk">
                        <div className="flag-box">
                          <div className="iti-flag mk"/>
                        </div>
                        <span className="country-name">Macedonia (FYROM) (Македонија)</span><span className="dial-code">+389</span>
                      </li>
                      <li className="country" data-dial-code={261} data-country-code="mg">
                        <div className="flag-box">
                          <div className="iti-flag mg"/>
                        </div>
                        <span className="country-name">Madagascar (Madagasikara)</span><span
                        className="dial-code">+261</span></li>
                      <li className="country" data-dial-code={265} data-country-code="mw">
                        <div className="flag-box">
                          <div className="iti-flag mw"/>
                        </div>
                        <span className="country-name">Malawi</span><span className="dial-code">+265</span></li>
                      <li className="country" data-dial-code={60} data-country-code="my">
                        <div className="flag-box">
                          <div className="iti-flag my"/>
                        </div>
                        <span className="country-name">Malaysia</span><span className="dial-code">+60</span></li>
                      <li className="country" data-dial-code={960} data-country-code="mv">
                        <div className="flag-box">
                          <div className="iti-flag mv"/>
                        </div>
                        <span className="country-name">Maldives</span><span className="dial-code">+960</span></li>
                      <li className="country" data-dial-code={223} data-country-code="ml">
                        <div className="flag-box">
                          <div className="iti-flag ml"/>
                        </div>
                        <span className="country-name">Mali</span><span className="dial-code">+223</span></li>
                      <li className="country" data-dial-code={356} data-country-code="mt">
                        <div className="flag-box">
                          <div className="iti-flag mt"/>
                        </div>
                        <span className="country-name">Malta</span><span className="dial-code">+356</span></li>
                      <li className="country" data-dial-code={692} data-country-code="mh">
                        <div className="flag-box">
                          <div className="iti-flag mh"/>
                        </div>
                        <span className="country-name">Marshall Islands</span><span className="dial-code">+692</span>
                      </li>
                      <li className="country" data-dial-code={596} data-country-code="mq">
                        <div className="flag-box">
                          <div className="iti-flag mq"/>
                        </div>
                        <span className="country-name">Martinique</span><span className="dial-code">+596</span></li>
                      <li className="country" data-dial-code={222} data-country-code="mr">
                        <div className="flag-box">
                          <div className="iti-flag mr"/>
                        </div>
                        <span className="country-name">Mauritania (‫موريتانيا‬‎)</span><span
                        className="dial-code">+222</span></li>
                      <li className="country" data-dial-code={230} data-country-code="mu">
                        <div className="flag-box">
                          <div className="iti-flag mu"/>
                        </div>
                        <span className="country-name">Mauritius (Moris)</span><span className="dial-code">+230</span>
                      </li>
                      <li className="country" data-dial-code={262} data-country-code="yt">
                        <div className="flag-box">
                          <div className="iti-flag yt"/>
                        </div>
                        <span className="country-name">Mayotte</span><span className="dial-code">+262</span></li>
                      <li className="country" data-dial-code={52} data-country-code="mx">
                        <div className="flag-box">
                          <div className="iti-flag mx"/>
                        </div>
                        <span className="country-name">Mexico (México)</span><span className="dial-code">+52</span></li>
                      <li className="country" data-dial-code={691} data-country-code="fm">
                        <div className="flag-box">
                          <div className="iti-flag fm"/>
                        </div>
                        <span className="country-name">Micronesia</span><span className="dial-code">+691</span></li>
                      <li className="country" data-dial-code={373} data-country-code="md">
                        <div className="flag-box">
                          <div className="iti-flag md"/>
                        </div>
                        <span className="country-name">Moldova (Republica Moldova)</span><span className="dial-code">+373</span>
                      </li>
                      <li className="country" data-dial-code={377} data-country-code="mc">
                        <div className="flag-box">
                          <div className="iti-flag mc"/>
                        </div>
                        <span className="country-name">Monaco</span><span className="dial-code">+377</span></li>
                      <li className="country" data-dial-code={976} data-country-code="mn">
                        <div className="flag-box">
                          <div className="iti-flag mn"/>
                        </div>
                        <span className="country-name">Mongolia (Монгол)</span><span className="dial-code">+976</span>
                      </li>
                      <li className="country" data-dial-code={382} data-country-code="me">
                        <div className="flag-box">
                          <div className="iti-flag me"/>
                        </div>
                        <span className="country-name">Montenegro (Crna Gora)</span><span
                        className="dial-code">+382</span></li>
                      <li className="country" data-dial-code={1664} data-country-code="ms">
                        <div className="flag-box">
                          <div className="iti-flag ms"/>
                        </div>
                        <span className="country-name">Montserrat</span><span className="dial-code">+1664</span></li>
                      <li className="country" data-dial-code={212} data-country-code="ma">
                        <div className="flag-box">
                          <div className="iti-flag ma"/>
                        </div>
                        <span className="country-name">Morocco (‫المغرب‬‎)</span><span className="dial-code">+212</span>
                      </li>
                      <li className="country" data-dial-code={258} data-country-code="mz">
                        <div className="flag-box">
                          <div className="iti-flag mz"/>
                        </div>
                        <span className="country-name">Mozambique (Moçambique)</span><span
                        className="dial-code">+258</span></li>
                      <li className="country" data-dial-code={95} data-country-code="mm">
                        <div className="flag-box">
                          <div className="iti-flag mm"/>
                        </div>
                        <span className="country-name">Myanmar (Burma) (မြန်မာ)</span><span
                        className="dial-code">+95</span></li>
                      <li className="country" data-dial-code={264} data-country-code="na">
                        <div className="flag-box">
                          <div className="iti-flag na"/>
                        </div>
                        <span className="country-name">Namibia (Namibië)</span><span className="dial-code">+264</span>
                      </li>
                      <li className="country" data-dial-code={674} data-country-code="nr">
                        <div className="flag-box">
                          <div className="iti-flag nr"/>
                        </div>
                        <span className="country-name">Nauru</span><span className="dial-code">+674</span></li>
                      <li className="country" data-dial-code={977} data-country-code="np">
                        <div className="flag-box">
                          <div className="iti-flag np"/>
                        </div>
                        <span className="country-name">Nepal (नेपाल)</span><span className="dial-code">+977</span></li>
                      <li className="country" data-dial-code={31} data-country-code="nl">
                        <div className="flag-box">
                          <div className="iti-flag nl"/>
                        </div>
                        <span className="country-name">Netherlands (Nederland)</span><span
                        className="dial-code">+31</span></li>
                      <li className="country" data-dial-code={687} data-country-code="nc">
                        <div className="flag-box">
                          <div className="iti-flag nc"/>
                        </div>
                        <span className="country-name">New Caledonia (Nouvelle-Calédonie)</span><span
                        className="dial-code">+687</span></li>
                      <li className="country" data-dial-code={64} data-country-code="nz">
                        <div className="flag-box">
                          <div className="iti-flag nz"/>
                        </div>
                        <span className="country-name">New Zealand</span><span className="dial-code">+64</span></li>
                      <li className="country" data-dial-code={505} data-country-code="ni">
                        <div className="flag-box">
                          <div className="iti-flag ni"/>
                        </div>
                        <span className="country-name">Nicaragua</span><span className="dial-code">+505</span></li>
                      <li className="country" data-dial-code={227} data-country-code="ne">
                        <div className="flag-box">
                          <div className="iti-flag ne"/>
                        </div>
                        <span className="country-name">Niger (Nijar)</span><span className="dial-code">+227</span></li>
                      <li className="country" data-dial-code={234} data-country-code="ng">
                        <div className="flag-box">
                          <div className="iti-flag ng"/>
                        </div>
                        <span className="country-name">Nigeria</span><span className="dial-code">+234</span></li>
                      <li className="country" data-dial-code={683} data-country-code="nu">
                        <div className="flag-box">
                          <div className="iti-flag nu"/>
                        </div>
                        <span className="country-name">Niue</span><span className="dial-code">+683</span></li>
                      <li className="country" data-dial-code={672} data-country-code="nf">
                        <div className="flag-box">
                          <div className="iti-flag nf"/>
                        </div>
                        <span className="country-name">Norfolk Island</span><span className="dial-code">+672</span></li>
                      <li className="country" data-dial-code={850} data-country-code="kp">
                        <div className="flag-box">
                          <div className="iti-flag kp"/>
                        </div>
                        <span className="country-name">North Korea (조선 민주주의 인민 공화국)</span><span className="dial-code">+850</span>
                      </li>
                      <li className="country" data-dial-code={1670} data-country-code="mp">
                        <div className="flag-box">
                          <div className="iti-flag mp"/>
                        </div>
                        <span className="country-name">Northern Mariana Islands</span><span
                        className="dial-code">+1670</span></li>
                      <li className="country" data-dial-code={47} data-country-code="no">
                        <div className="flag-box">
                          <div className="iti-flag no"/>
                        </div>
                        <span className="country-name">Norway (Norge)</span><span className="dial-code">+47</span></li>
                      <li className="country" data-dial-code={968} data-country-code="om">
                        <div className="flag-box">
                          <div className="iti-flag om"/>
                        </div>
                        <span className="country-name">Oman (‫عُمان‬‎)</span><span className="dial-code">+968</span>
                      </li>
                      <li className="country" data-dial-code={92} data-country-code="pk">
                        <div className="flag-box">
                          <div className="iti-flag pk"/>
                        </div>
                        <span className="country-name">Pakistan (‫پاکستان‬‎)</span><span
                        className="dial-code">+92</span></li>
                      <li className="country" data-dial-code={680} data-country-code="pw">
                        <div className="flag-box">
                          <div className="iti-flag pw"/>
                        </div>
                        <span className="country-name">Palau</span><span className="dial-code">+680</span></li>
                      <li className="country" data-dial-code={970} data-country-code="ps">
                        <div className="flag-box">
                          <div className="iti-flag ps"/>
                        </div>
                        <span className="country-name">Palestine (‫فلسطين‬‎)</span><span
                        className="dial-code">+970</span></li>
                      <li className="country" data-dial-code={507} data-country-code="pa">
                        <div className="flag-box">
                          <div className="iti-flag pa"/>
                        </div>
                        <span className="country-name">Panama (Panamá)</span><span className="dial-code">+507</span>
                      </li>
                      <li className="country" data-dial-code={675} data-country-code="pg">
                        <div className="flag-box">
                          <div className="iti-flag pg"/>
                        </div>
                        <span className="country-name">Papua New Guinea</span><span className="dial-code">+675</span>
                      </li>
                      <li className="country" data-dial-code={595} data-country-code="py">
                        <div className="flag-box">
                          <div className="iti-flag py"/>
                        </div>
                        <span className="country-name">Paraguay</span><span className="dial-code">+595</span></li>
                      <li className="country" data-dial-code={51} data-country-code="pe">
                        <div className="flag-box">
                          <div className="iti-flag pe"/>
                        </div>
                        <span className="country-name">Peru (Perú)</span><span className="dial-code">+51</span></li>
                      <li className="country" data-dial-code={63} data-country-code="ph">
                        <div className="flag-box">
                          <div className="iti-flag ph"/>
                        </div>
                        <span className="country-name">Philippines</span><span className="dial-code">+63</span></li>
                      <li className="country" data-dial-code={48} data-country-code="pl">
                        <div className="flag-box">
                          <div className="iti-flag pl"/>
                        </div>
                        <span className="country-name">Poland (Polska)</span><span className="dial-code">+48</span></li>
                      <li className="country" data-dial-code={351} data-country-code="pt">
                        <div className="flag-box">
                          <div className="iti-flag pt"/>
                        </div>
                        <span className="country-name">Portugal</span><span className="dial-code">+351</span></li>
                      <li className="country" data-dial-code={1} data-country-code="pr">
                        <div className="flag-box">
                          <div className="iti-flag pr"/>
                        </div>
                        <span className="country-name">Puerto Rico</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={974} data-country-code="qa">
                        <div className="flag-box">
                          <div className="iti-flag qa"/>
                        </div>
                        <span className="country-name">Qatar (‫قطر‬‎)</span><span className="dial-code">+974</span></li>
                      <li className="country" data-dial-code={262} data-country-code="re">
                        <div className="flag-box">
                          <div className="iti-flag re"/>
                        </div>
                        <span className="country-name">Réunion (La Réunion)</span><span
                        className="dial-code">+262</span></li>
                      <li className="country" data-dial-code={40} data-country-code="ro">
                        <div className="flag-box">
                          <div className="iti-flag ro"/>
                        </div>
                        <span className="country-name">Romania (România)</span><span className="dial-code">+40</span>
                      </li>
                      <li className="country" data-dial-code={7} data-country-code="ru">
                        <div className="flag-box">
                          <div className="iti-flag ru"/>
                        </div>
                        <span className="country-name">Russia (Россия)</span><span className="dial-code">+7</span></li>
                      <li className="country" data-dial-code={250} data-country-code="rw">
                        <div className="flag-box">
                          <div className="iti-flag rw"/>
                        </div>
                        <span className="country-name">Rwanda</span><span className="dial-code">+250</span></li>
                      <li className="country" data-dial-code={590} data-country-code="bl">
                        <div className="flag-box">
                          <div className="iti-flag bl"/>
                        </div>
                        <span className="country-name">Saint Barthélemy (Saint-Barthélemy)</span><span
                        className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={290} data-country-code="sh">
                        <div className="flag-box">
                          <div className="iti-flag sh"/>
                        </div>
                        <span className="country-name">Saint Helena</span><span className="dial-code">+290</span></li>
                      <li className="country" data-dial-code={1869} data-country-code="kn">
                        <div className="flag-box">
                          <div className="iti-flag kn"/>
                        </div>
                        <span className="country-name">Saint Kitts and Nevis</span><span
                        className="dial-code">+1869</span></li>
                      <li className="country" data-dial-code={1758} data-country-code="lc">
                        <div className="flag-box">
                          <div className="iti-flag lc"/>
                        </div>
                        <span className="country-name">Saint Lucia</span><span className="dial-code">+1758</span></li>
                      <li className="country" data-dial-code={590} data-country-code="mf">
                        <div className="flag-box">
                          <div className="iti-flag mf"/>
                        </div>
                        <span className="country-name">Saint Martin (Saint-Martin (partie française))</span><span
                        className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={508} data-country-code="pm">
                        <div className="flag-box">
                          <div className="iti-flag pm"/>
                        </div>
                        <span className="country-name">Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)</span><span
                        className="dial-code">+508</span></li>
                      <li className="country" data-dial-code={1784} data-country-code="vc">
                        <div className="flag-box">
                          <div className="iti-flag vc"/>
                        </div>
                        <span className="country-name">Saint Vincent and the Grenadines</span><span
                        className="dial-code">+1784</span></li>
                      <li className="country" data-dial-code={685} data-country-code="ws">
                        <div className="flag-box">
                          <div className="iti-flag ws"/>
                        </div>
                        <span className="country-name">Samoa</span><span className="dial-code">+685</span></li>
                      <li className="country" data-dial-code={378} data-country-code="sm">
                        <div className="flag-box">
                          <div className="iti-flag sm"/>
                        </div>
                        <span className="country-name">San Marino</span><span className="dial-code">+378</span></li>
                      <li className="country" data-dial-code={239} data-country-code="st">
                        <div className="flag-box">
                          <div className="iti-flag st"/>
                        </div>
                        <span className="country-name">São Tomé and Príncipe (São Tomé e Príncipe)</span><span
                        className="dial-code">+239</span></li>
                      <li className="country" data-dial-code={966} data-country-code="sa">
                        <div className="flag-box">
                          <div className="iti-flag sa"/>
                        </div>
                        <span className="country-name">Saudi Arabia (‫المملكة العربية السعودية‬‎)</span><span
                        className="dial-code">+966</span></li>
                      <li className="country" data-dial-code={221} data-country-code="sn">
                        <div className="flag-box">
                          <div className="iti-flag sn"/>
                        </div>
                        <span className="country-name">Senegal (Sénégal)</span><span className="dial-code">+221</span>
                      </li>
                      <li className="country" data-dial-code={381} data-country-code="rs">
                        <div className="flag-box">
                          <div className="iti-flag rs"/>
                        </div>
                        <span className="country-name">Serbia (Србија)</span><span className="dial-code">+381</span>
                      </li>
                      <li className="country" data-dial-code={248} data-country-code="sc">
                        <div className="flag-box">
                          <div className="iti-flag sc"/>
                        </div>
                        <span className="country-name">Seychelles</span><span className="dial-code">+248</span></li>
                      <li className="country" data-dial-code={232} data-country-code="sl">
                        <div className="flag-box">
                          <div className="iti-flag sl"/>
                        </div>
                        <span className="country-name">Sierra Leone</span><span className="dial-code">+232</span></li>
                      <li className="country" data-dial-code={65} data-country-code="sg">
                        <div className="flag-box">
                          <div className="iti-flag sg"/>
                        </div>
                        <span className="country-name">Singapore</span><span className="dial-code">+65</span></li>
                      <li className="country" data-dial-code={1721} data-country-code="sx">
                        <div className="flag-box">
                          <div className="iti-flag sx"/>
                        </div>
                        <span className="country-name">Sint Maarten</span><span className="dial-code">+1721</span></li>
                      <li className="country" data-dial-code={421} data-country-code="sk">
                        <div className="flag-box">
                          <div className="iti-flag sk"/>
                        </div>
                        <span className="country-name">Slovakia (Slovensko)</span><span
                        className="dial-code">+421</span></li>
                      <li className="country" data-dial-code={386} data-country-code="si">
                        <div className="flag-box">
                          <div className="iti-flag si"/>
                        </div>
                        <span className="country-name">Slovenia (Slovenija)</span><span
                        className="dial-code">+386</span></li>
                      <li className="country" data-dial-code={677} data-country-code="sb">
                        <div className="flag-box">
                          <div className="iti-flag sb"/>
                        </div>
                        <span className="country-name">Solomon Islands</span><span className="dial-code">+677</span>
                      </li>
                      <li className="country" data-dial-code={252} data-country-code="so">
                        <div className="flag-box">
                          <div className="iti-flag so"/>
                        </div>
                        <span className="country-name">Somalia (Soomaaliya)</span><span
                        className="dial-code">+252</span></li>
                      <li className="country" data-dial-code={27} data-country-code="za">
                        <div className="flag-box">
                          <div className="iti-flag za"/>
                        </div>
                        <span className="country-name">South Africa</span><span className="dial-code">+27</span></li>
                      <li className="country" data-dial-code={82} data-country-code="kr">
                        <div className="flag-box">
                          <div className="iti-flag kr"/>
                        </div>
                        <span className="country-name">South Korea (대한민국)</span><span className="dial-code">+82</span>
                      </li>
                      <li className="country" data-dial-code={211} data-country-code="ss">
                        <div className="flag-box">
                          <div className="iti-flag ss"/>
                        </div>
                        <span className="country-name">South Sudan (‫جنوب السودان‬‎)</span><span className="dial-code">+211</span>
                      </li>
                      <li className="country" data-dial-code={34} data-country-code="es">
                        <div className="flag-box">
                          <div className="iti-flag es"/>
                        </div>
                        <span className="country-name">Spain (España)</span><span className="dial-code">+34</span></li>
                      <li className="country" data-dial-code={94} data-country-code="lk">
                        <div className="flag-box">
                          <div className="iti-flag lk"/>
                        </div>
                        <span className="country-name">Sri Lanka (ශ්‍රී ලංකාව)</span><span
                        className="dial-code">+94</span></li>
                      <li className="country" data-dial-code={249} data-country-code="sd">
                        <div className="flag-box">
                          <div className="iti-flag sd"/>
                        </div>
                        <span className="country-name">Sudan (‫السودان‬‎)</span><span className="dial-code">+249</span>
                      </li>
                      <li className="country" data-dial-code={597} data-country-code="sr">
                        <div className="flag-box">
                          <div className="iti-flag sr"/>
                        </div>
                        <span className="country-name">Suriname</span><span className="dial-code">+597</span></li>
                      <li className="country" data-dial-code={47} data-country-code="sj">
                        <div className="flag-box">
                          <div className="iti-flag sj"/>
                        </div>
                        <span className="country-name">Svalbard and Jan Mayen</span><span
                        className="dial-code">+47</span></li>
                      <li className="country" data-dial-code={268} data-country-code="sz">
                        <div className="flag-box">
                          <div className="iti-flag sz"/>
                        </div>
                        <span className="country-name">Swaziland</span><span className="dial-code">+268</span></li>
                      <li className="country" data-dial-code={46} data-country-code="se">
                        <div className="flag-box">
                          <div className="iti-flag se"/>
                        </div>
                        <span className="country-name">Sweden (Sverige)</span><span className="dial-code">+46</span>
                      </li>
                      <li className="country" data-dial-code={41} data-country-code="ch">
                        <div className="flag-box">
                          <div className="iti-flag ch"/>
                        </div>
                        <span className="country-name">Switzerland (Schweiz)</span><span
                        className="dial-code">+41</span></li>
                      <li className="country" data-dial-code={963} data-country-code="sy">
                        <div className="flag-box">
                          <div className="iti-flag sy"/>
                        </div>
                        <span className="country-name">Syria (‫سوريا‬‎)</span><span className="dial-code">+963</span>
                      </li>
                      <li className="country" data-dial-code={886} data-country-code="tw">
                        <div className="flag-box">
                          <div className="iti-flag tw"/>
                        </div>
                        <span className="country-name">Taiwan (台灣)</span><span className="dial-code">+886</span></li>
                      <li className="country" data-dial-code={992} data-country-code="tj">
                        <div className="flag-box">
                          <div className="iti-flag tj"/>
                        </div>
                        <span className="country-name">Tajikistan</span><span className="dial-code">+992</span></li>
                      <li className="country" data-dial-code={255} data-country-code="tz">
                        <div className="flag-box">
                          <div className="iti-flag tz"/>
                        </div>
                        <span className="country-name">Tanzania</span><span className="dial-code">+255</span></li>
                      <li className="country" data-dial-code={66} data-country-code="th">
                        <div className="flag-box">
                          <div className="iti-flag th"/>
                        </div>
                        <span className="country-name">Thailand (ไทย)</span><span className="dial-code">+66</span></li>
                      <li className="country" data-dial-code={670} data-country-code="tl">
                        <div className="flag-box">
                          <div className="iti-flag tl"/>
                        </div>
                        <span className="country-name">Timor-Leste</span><span className="dial-code">+670</span></li>
                      <li className="country" data-dial-code={228} data-country-code="tg">
                        <div className="flag-box">
                          <div className="iti-flag tg"/>
                        </div>
                        <span className="country-name">Togo</span><span className="dial-code">+228</span></li>
                      <li className="country" data-dial-code={690} data-country-code="tk">
                        <div className="flag-box">
                          <div className="iti-flag tk"/>
                        </div>
                        <span className="country-name">Tokelau</span><span className="dial-code">+690</span></li>
                      <li className="country" data-dial-code={676} data-country-code="to">
                        <div className="flag-box">
                          <div className="iti-flag to"/>
                        </div>
                        <span className="country-name">Tonga</span><span className="dial-code">+676</span></li>
                      <li className="country" data-dial-code={1868} data-country-code="tt">
                        <div className="flag-box">
                          <div className="iti-flag tt"/>
                        </div>
                        <span className="country-name">Trinidad and Tobago</span><span
                        className="dial-code">+1868</span></li>
                      <li className="country" data-dial-code={216} data-country-code="tn">
                        <div className="flag-box">
                          <div className="iti-flag tn"/>
                        </div>
                        <span className="country-name">Tunisia (‫تونس‬‎)</span><span className="dial-code">+216</span>
                      </li>
                      <li className="country" data-dial-code={90} data-country-code="tr">
                        <div className="flag-box">
                          <div className="iti-flag tr"/>
                        </div>
                        <span className="country-name">Turkey (Türkiye)</span><span className="dial-code">+90</span>
                      </li>
                      <li className="country" data-dial-code={993} data-country-code="tm">
                        <div className="flag-box">
                          <div className="iti-flag tm"/>
                        </div>
                        <span className="country-name">Turkmenistan</span><span className="dial-code">+993</span></li>
                      <li className="country" data-dial-code={1649} data-country-code="tc">
                        <div className="flag-box">
                          <div className="iti-flag tc"/>
                        </div>
                        <span className="country-name">Turks and Caicos Islands</span><span
                        className="dial-code">+1649</span></li>
                      <li className="country" data-dial-code={688} data-country-code="tv">
                        <div className="flag-box">
                          <div className="iti-flag tv"/>
                        </div>
                        <span className="country-name">Tuvalu</span><span className="dial-code">+688</span></li>
                      <li className="country" data-dial-code={1340} data-country-code="vi">
                        <div className="flag-box">
                          <div className="iti-flag vi"/>
                        </div>
                        <span className="country-name">U.S. Virgin Islands</span><span
                        className="dial-code">+1340</span></li>
                      <li className="country" data-dial-code={256} data-country-code="ug">
                        <div className="flag-box">
                          <div className="iti-flag ug"/>
                        </div>
                        <span className="country-name">Uganda</span><span className="dial-code">+256</span></li>
                      <li className="country" data-dial-code={380} data-country-code="ua">
                        <div className="flag-box">
                          <div className="iti-flag ua"/>
                        </div>
                        <span className="country-name">Ukraine (Україна)</span><span className="dial-code">+380</span>
                      </li>
                      <li className="country" data-dial-code={971} data-country-code="ae">
                        <div className="flag-box">
                          <div className="iti-flag ae"/>
                        </div>
                        <span className="country-name">United Arab Emirates (‫الإمارات العربية المتحدة‬‎)</span><span
                        className="dial-code">+971</span></li>
                      <li className="country" data-dial-code={44} data-country-code="gb">
                        <div className="flag-box">
                          <div className="iti-flag gb"/>
                        </div>
                        <span className="country-name">United Kingdom</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={1} data-country-code="us">
                        <div className="flag-box">
                          <div className="iti-flag us"/>
                        </div>
                        <span className="country-name">United States</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={598} data-country-code="uy">
                        <div className="flag-box">
                          <div className="iti-flag uy"/>
                        </div>
                        <span className="country-name">Uruguay</span><span className="dial-code">+598</span></li>
                      <li className="country" data-dial-code={998} data-country-code="uz">
                        <div className="flag-box">
                          <div className="iti-flag uz"/>
                        </div>
                        <span className="country-name">Uzbekistan (Oʻzbekiston)</span><span
                        className="dial-code">+998</span></li>
                      <li className="country" data-dial-code={678} data-country-code="vu">
                        <div className="flag-box">
                          <div className="iti-flag vu"/>
                        </div>
                        <span className="country-name">Vanuatu</span><span className="dial-code">+678</span></li>
                      <li className="country" data-dial-code={39} data-country-code="va">
                        <div className="flag-box">
                          <div className="iti-flag va"/>
                        </div>
                        <span className="country-name">Vatican City (Città del Vaticano)</span><span
                        className="dial-code">+39</span></li>
                      <li className="country" data-dial-code={58} data-country-code="ve">
                        <div className="flag-box">
                          <div className="iti-flag ve"/>
                        </div>
                        <span className="country-name">Venezuela</span><span className="dial-code">+58</span></li>
                      <li className="country" data-dial-code={84} data-country-code="vn">
                        <div className="flag-box">
                          <div className="iti-flag vn"/>
                        </div>
                        <span className="country-name">Vietnam (Việt Nam)</span><span className="dial-code">+84</span>
                      </li>
                      <li className="country" data-dial-code={681} data-country-code="wf">
                        <div className="flag-box">
                          <div className="iti-flag wf"/>
                        </div>
                        <span className="country-name">Wallis and Futuna</span><span className="dial-code">+681</span>
                      </li>
                      <li className="country" data-dial-code={212} data-country-code="eh">
                        <div className="flag-box">
                          <div className="iti-flag eh"/>
                        </div>
                        <span className="country-name">Western Sahara (‫الصحراء الغربية‬‎)</span><span
                        className="dial-code">+212</span></li>
                      <li className="country" data-dial-code={967} data-country-code="ye">
                        <div className="flag-box">
                          <div className="iti-flag ye"/>
                        </div>
                        <span className="country-name">Yemen (‫اليمن‬‎)</span><span className="dial-code">+967</span>
                      </li>
                      <li className="country" data-dial-code={260} data-country-code="zm">
                        <div className="flag-box">
                          <div className="iti-flag zm"/>
                        </div>
                        <span className="country-name">Zambia</span><span className="dial-code">+260</span></li>
                      <li className="country" data-dial-code={263} data-country-code="zw">
                        <div className="flag-box">
                          <div className="iti-flag zw"/>
                        </div>
                        <span className="country-name">Zimbabwe</span><span className="dial-code">+263</span></li>
                      <li className="country" data-dial-code={358} data-country-code="ax">
                        <div className="flag-box">
                          <div className="iti-flag ax"/>
                        </div>
                        <span className="country-name">Åland Islands</span><span className="dial-code">+358</span></li>
                    </ul>
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
              <div className="form-group form-first-name hidden has-feedback">
                <input type="text" name="firstname" placeholder="First Name" autoComplete="off"
                       className="form-control mrg-t-lg first-name" data-fv-field="firstName"/><i
                className="form-control-feedback" data-fv-icon-for="firstName" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="firstName"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Firstname is required.
                </small>
              </div>
              <div className="form-group form-last-name hidden has-feedback">
                <input type="text" name="lastname" placeholder="Last Name" autoComplete="off"
                       className="form-control mrg-t-lg last-name" data-fv-field="lastName"/><i
                className="form-control-feedback" data-fv-icon-for="lastName" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="lastName"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Lastname is required.
                </small>
              </div>
              <div className="form-group">
                <div className="text-xs">Name: <span className="bidder-name"/></div>
                <div className="text-xs">Email Id : <span className="bidder-email"/></div>
                <div className="text-xs">Cell Number : <span className="bidder-cell"/></div>
              </div>
              <div className="form-group has-feedback">
                <input type="text" maxLength={3} name="itemCode" placeholder="Item Code" autoComplete="off"
                       className="form-control mrg-t-lg alpha-only" data-fv-field="itemCode"/><i
                className="form-control-feedback" data-fv-icon-for="itemCode" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="stringLength" data-fv-for="itemCode"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                </small>
              </div>
              <div className="form-group">
                <div className="text-xs">Item Name : <span className="item-name"/></div>
                <div className="text-xs">Minimum Price: <span className="currency-symbol">$</span><span
                  className="minimum-price"/></div>
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
                         min={0} data-nextbid={0} data-fv-field="amount"/>
                </div>
                <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="amount"
                   style={{display: 'none'}}/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="amount"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Please enter tickets you want to submit.
                </small>
                <small className="help-block" data-fv-validator="digits" data-fv-for="amount"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Digits Only Accepted.
                </small>
                <small className="help-block" data-fv-validator="greaterThan" data-fv-for="amount"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                </small>
                <small className="help-block" data-fv-validator="integer" data-fv-for="amount"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                </small>
              </div>
              <div className="cc-info">
                <style
                  dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n" }}/>
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
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name is required
                        and can't be empty
                      </small>
                      <small className="help-block" data-fv-validator="stringLength" data-fv-for="cardholdername"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name must be more
                        than 6 and less than 70 characters long
                      </small>
                      <small className="help-block" data-fv-validator="callback" data-fv-for="cardholdername"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name can not start
                        or end with white space
                      </small>
                    </div>
                    <div className="form-group has-feedback">
                      <label className="control-label">Credit Card Number</label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true"/></div>
                        <input type="number" className="form-control" id="cardnumber" placeholder="8888-8888-8888-8888"
                               maxLength={16} data-stripe="number" required="required" data-fv-field="cardnumber"/>
                      </div>
                      <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="cardnumber"
                         style={{display: 'none'}}/>
                      <div className="small text-danger js-error card_error number"/>
                      <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cardnumber"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number is required
                        and can't be empty
                      </small>
                      <small className="help-block" data-fv-validator="creditCard" data-fv-for="cardnumber"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number is invalid
                      </small>
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
                          <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="expYear"
                             style={{display: 'none'}}/><i
                          className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="expMonth"
                          style={{display: 'none'}}/>
                          <div className="small text-danger js-error card_error exp_year exp_month"/>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="expMonth"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration month is
                            required
                          </small>
                          <small className="help-block" data-fv-validator="digits" data-fv-for="expMonth"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration month can
                            contain digits only
                          </small>
                          <small className="help-block" data-fv-validator="callback" data-fv-for="expMonth"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Your card is Expired
                          </small>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="expYear"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration year is
                            required
                          </small>
                          <small className="help-block" data-fv-validator="digits" data-fv-for="expYear"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration year can
                            contain digits only
                          </small>
                          <small className="help-block" data-fv-validator="callback" data-fv-for="expYear"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}></small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group has-feedback">
                          <label className="control-label">CVV Number</label>
                          <div className="input-group">
                            <input type="number" className="form-control" maxLength={4} size={4} data-stripe="cvc"
                                   id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"/>
                          </div>
                          <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="cvv"
                             style={{display: 'none'}}/>
                          <div className="small text-danger js-error card_error cvc"/>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cvv"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV is required and can't
                            be empty
                          </small>
                          <small className="help-block" data-fv-validator="stringLength" data-fv-for="cvv"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV must be more than 4
                            and less than 3 characters long
                          </small>
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
              <button className="btn btn-white" onClick={()=>{this.setActiveView('select-action')}}>Back</button>
            </div>
          </view>
          <view name="sell-raffle-tickets" className={cx(this.state.activeViews === 'sell-raffle-tickets' && s.active)}>
            <h4 className="text-center"><strong>Sell Raffle Tickets</strong></h4>
            <form className="ajax-form validated fv-form fv-form-bootstrap" method="POST"
                  action="/AccelEventsWebApp/events/jkazarian8/volunteer/sell-tickets"
                  data-validation-fields="getRafflePurchaseValidationFields" data-onsuccess="handleBidSuccess"
                  data-validate-function="validateForm" data-switch-view="select-action"
                  data-view-name="sell-raffle-tickets" noValidate="novalidate">
              <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
              <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
                className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
              <div className="form-group has-feedback">
                <input type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                       className="form-control mrg-t-lg bidder-email" data-fv-field="email"/><i
                className="form-control-feedback" data-fv-icon-for="email" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="email"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Bidder email can't be empty
                </small>
                <small className="help-block" data-fv-validator="emailAddress" data-fv-for="email"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Invalid bidder email id
                </small>
              </div>
              <div className="form-group has-feedback">
                <div className="intl-tel-input allow-dropdown separate-dial-code iti-sdc-2">
                  <div className="flag-container">
                    <div className="selected-flag" tabIndex={0} title="Canada: +1">
                      <div className="iti-flag ca"/>
                      <div className="selected-dial-code">+1</div>
                      <div className="iti-arrow"/>
                    </div>
                    <ul className="country-list hide">
                      <li className="country preferred" data-dial-code={1} data-country-code="us">
                        <div className="flag-box">
                          <div className="iti-flag us"/>
                        </div>
                        <span className="country-name">United States</span><span className="dial-code">+1</span></li>
                      <li className="country preferred active" data-dial-code={1} data-country-code="ca">
                        <div className="flag-box">
                          <div className="iti-flag ca"/>
                        </div>
                        <span className="country-name">Canada</span><span className="dial-code">+1</span></li>
                      <li className="country preferred" data-dial-code={61} data-country-code="au">
                        <div className="flag-box">
                          <div className="iti-flag au"/>
                        </div>
                        <span className="country-name">Australia</span><span className="dial-code">+61</span></li>
                      <li className="country preferred" data-dial-code={91} data-country-code="in">
                        <div className="flag-box">
                          <div className="iti-flag in"/>
                        </div>
                        <span className="country-name">India (भारत)</span><span className="dial-code">+91</span></li>
                      <li className="divider"/>
                      <li className="country" data-dial-code={93} data-country-code="af">
                        <div className="flag-box">
                          <div className="iti-flag af"/>
                        </div>
                        <span className="country-name">Afghanistan (‫افغانستان‬‎)</span><span
                        className="dial-code">+93</span></li>
                      <li className="country" data-dial-code={355} data-country-code="al">
                        <div className="flag-box">
                          <div className="iti-flag al"/>
                        </div>
                        <span className="country-name">Albania (Shqipëri)</span><span className="dial-code">+355</span>
                      </li>
                      <li className="country" data-dial-code={213} data-country-code="dz">
                        <div className="flag-box">
                          <div className="iti-flag dz"/>
                        </div>
                        <span className="country-name">Algeria (‫الجزائر‬‎)</span><span
                        className="dial-code">+213</span></li>
                      <li className="country" data-dial-code={1684} data-country-code="as">
                        <div className="flag-box">
                          <div className="iti-flag as"/>
                        </div>
                        <span className="country-name">American Samoa</span><span className="dial-code">+1684</span>
                      </li>
                      <li className="country" data-dial-code={376} data-country-code="ad">
                        <div className="flag-box">
                          <div className="iti-flag ad"/>
                        </div>
                        <span className="country-name">Andorra</span><span className="dial-code">+376</span></li>
                      <li className="country" data-dial-code={244} data-country-code="ao">
                        <div className="flag-box">
                          <div className="iti-flag ao"/>
                        </div>
                        <span className="country-name">Angola</span><span className="dial-code">+244</span></li>
                      <li className="country" data-dial-code={1264} data-country-code="ai">
                        <div className="flag-box">
                          <div className="iti-flag ai"/>
                        </div>
                        <span className="country-name">Anguilla</span><span className="dial-code">+1264</span></li>
                      <li className="country" data-dial-code={1268} data-country-code="ag">
                        <div className="flag-box">
                          <div className="iti-flag ag"/>
                        </div>
                        <span className="country-name">Antigua and Barbuda</span><span
                        className="dial-code">+1268</span></li>
                      <li className="country" data-dial-code={54} data-country-code="ar">
                        <div className="flag-box">
                          <div className="iti-flag ar"/>
                        </div>
                        <span className="country-name">Argentina</span><span className="dial-code">+54</span></li>
                      <li className="country" data-dial-code={374} data-country-code="am">
                        <div className="flag-box">
                          <div className="iti-flag am"/>
                        </div>
                        <span className="country-name">Armenia (Հայաստան)</span><span className="dial-code">+374</span>
                      </li>
                      <li className="country" data-dial-code={297} data-country-code="aw">
                        <div className="flag-box">
                          <div className="iti-flag aw"/>
                        </div>
                        <span className="country-name">Aruba</span><span className="dial-code">+297</span></li>
                      <li className="country" data-dial-code={61} data-country-code="au">
                        <div className="flag-box">
                          <div className="iti-flag au"/>
                        </div>
                        <span className="country-name">Australia</span><span className="dial-code">+61</span></li>
                      <li className="country" data-dial-code={43} data-country-code="at">
                        <div className="flag-box">
                          <div className="iti-flag at"/>
                        </div>
                        <span className="country-name">Austria (Österreich)</span><span className="dial-code">+43</span>
                      </li>
                      <li className="country" data-dial-code={994} data-country-code="az">
                        <div className="flag-box">
                          <div className="iti-flag az"/>
                        </div>
                        <span className="country-name">Azerbaijan (Azərbaycan)</span><span
                        className="dial-code">+994</span></li>
                      <li className="country" data-dial-code={1242} data-country-code="bs">
                        <div className="flag-box">
                          <div className="iti-flag bs"/>
                        </div>
                        <span className="country-name">Bahamas</span><span className="dial-code">+1242</span></li>
                      <li className="country" data-dial-code={973} data-country-code="bh">
                        <div className="flag-box">
                          <div className="iti-flag bh"/>
                        </div>
                        <span className="country-name">Bahrain (‫البحرين‬‎)</span><span
                        className="dial-code">+973</span></li>
                      <li className="country" data-dial-code={880} data-country-code="bd">
                        <div className="flag-box">
                          <div className="iti-flag bd"/>
                        </div>
                        <span className="country-name">Bangladesh (বাংলাদেশ)</span><span
                        className="dial-code">+880</span></li>
                      <li className="country" data-dial-code={1246} data-country-code="bb">
                        <div className="flag-box">
                          <div className="iti-flag bb"/>
                        </div>
                        <span className="country-name">Barbados</span><span className="dial-code">+1246</span></li>
                      <li className="country" data-dial-code={375} data-country-code="by">
                        <div className="flag-box">
                          <div className="iti-flag by"/>
                        </div>
                        <span className="country-name">Belarus (Беларусь)</span><span className="dial-code">+375</span>
                      </li>
                      <li className="country" data-dial-code={32} data-country-code="be">
                        <div className="flag-box">
                          <div className="iti-flag be"/>
                        </div>
                        <span className="country-name">Belgium (België)</span><span className="dial-code">+32</span>
                      </li>
                      <li className="country" data-dial-code={501} data-country-code="bz">
                        <div className="flag-box">
                          <div className="iti-flag bz"/>
                        </div>
                        <span className="country-name">Belize</span><span className="dial-code">+501</span></li>
                      <li className="country" data-dial-code={229} data-country-code="bj">
                        <div className="flag-box">
                          <div className="iti-flag bj"/>
                        </div>
                        <span className="country-name">Benin (Bénin)</span><span className="dial-code">+229</span></li>
                      <li className="country" data-dial-code={1441} data-country-code="bm">
                        <div className="flag-box">
                          <div className="iti-flag bm"/>
                        </div>
                        <span className="country-name">Bermuda</span><span className="dial-code">+1441</span></li>
                      <li className="country" data-dial-code={975} data-country-code="bt">
                        <div className="flag-box">
                          <div className="iti-flag bt"/>
                        </div>
                        <span className="country-name">Bhutan (འབྲུག)</span><span className="dial-code">+975</span></li>
                      <li className="country" data-dial-code={591} data-country-code="bo">
                        <div className="flag-box">
                          <div className="iti-flag bo"/>
                        </div>
                        <span className="country-name">Bolivia</span><span className="dial-code">+591</span></li>
                      <li className="country" data-dial-code={387} data-country-code="ba">
                        <div className="flag-box">
                          <div className="iti-flag ba"/>
                        </div>
                        <span className="country-name">Bosnia and Herzegovina (Босна и Херцеговина)</span><span
                        className="dial-code">+387</span></li>
                      <li className="country" data-dial-code={267} data-country-code="bw">
                        <div className="flag-box">
                          <div className="iti-flag bw"/>
                        </div>
                        <span className="country-name">Botswana</span><span className="dial-code">+267</span></li>
                      <li className="country" data-dial-code={55} data-country-code="br">
                        <div className="flag-box">
                          <div className="iti-flag br"/>
                        </div>
                        <span className="country-name">Brazil (Brasil)</span><span className="dial-code">+55</span></li>
                      <li className="country" data-dial-code={246} data-country-code="io">
                        <div className="flag-box">
                          <div className="iti-flag io"/>
                        </div>
                        <span className="country-name">British Indian Ocean Territory</span><span className="dial-code">+246</span>
                      </li>
                      <li className="country" data-dial-code={1284} data-country-code="vg">
                        <div className="flag-box">
                          <div className="iti-flag vg"/>
                        </div>
                        <span className="country-name">British Virgin Islands</span><span
                        className="dial-code">+1284</span></li>
                      <li className="country" data-dial-code={673} data-country-code="bn">
                        <div className="flag-box">
                          <div className="iti-flag bn"/>
                        </div>
                        <span className="country-name">Brunei</span><span className="dial-code">+673</span></li>
                      <li className="country" data-dial-code={359} data-country-code="bg">
                        <div className="flag-box">
                          <div className="iti-flag bg"/>
                        </div>
                        <span className="country-name">Bulgaria (България)</span><span className="dial-code">+359</span>
                      </li>
                      <li className="country" data-dial-code={226} data-country-code="bf">
                        <div className="flag-box">
                          <div className="iti-flag bf"/>
                        </div>
                        <span className="country-name">Burkina Faso</span><span className="dial-code">+226</span></li>
                      <li className="country" data-dial-code={257} data-country-code="bi">
                        <div className="flag-box">
                          <div className="iti-flag bi"/>
                        </div>
                        <span className="country-name">Burundi (Uburundi)</span><span className="dial-code">+257</span>
                      </li>
                      <li className="country" data-dial-code={855} data-country-code="kh">
                        <div className="flag-box">
                          <div className="iti-flag kh"/>
                        </div>
                        <span className="country-name">Cambodia (កម្ពុជា)</span><span className="dial-code">+855</span>
                      </li>
                      <li className="country" data-dial-code={237} data-country-code="cm">
                        <div className="flag-box">
                          <div className="iti-flag cm"/>
                        </div>
                        <span className="country-name">Cameroon (Cameroun)</span><span className="dial-code">+237</span>
                      </li>
                      <li className="country" data-dial-code={1} data-country-code="ca">
                        <div className="flag-box">
                          <div className="iti-flag ca"/>
                        </div>
                        <span className="country-name">Canada</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={238} data-country-code="cv">
                        <div className="flag-box">
                          <div className="iti-flag cv"/>
                        </div>
                        <span className="country-name">Cape Verde (Kabu Verdi)</span><span
                        className="dial-code">+238</span></li>
                      <li className="country" data-dial-code={599} data-country-code="bq">
                        <div className="flag-box">
                          <div className="iti-flag bq"/>
                        </div>
                        <span className="country-name">Caribbean Netherlands</span><span
                        className="dial-code">+599</span></li>
                      <li className="country" data-dial-code={1345} data-country-code="ky">
                        <div className="flag-box">
                          <div className="iti-flag ky"/>
                        </div>
                        <span className="country-name">Cayman Islands</span><span className="dial-code">+1345</span>
                      </li>
                      <li className="country" data-dial-code={236} data-country-code="cf">
                        <div className="flag-box">
                          <div className="iti-flag cf"/>
                        </div>
                        <span className="country-name">Central African Republic (République centrafricaine)</span><span
                        className="dial-code">+236</span></li>
                      <li className="country" data-dial-code={235} data-country-code="td">
                        <div className="flag-box">
                          <div className="iti-flag td"/>
                        </div>
                        <span className="country-name">Chad (Tchad)</span><span className="dial-code">+235</span></li>
                      <li className="country" data-dial-code={56} data-country-code="cl">
                        <div className="flag-box">
                          <div className="iti-flag cl"/>
                        </div>
                        <span className="country-name">Chile</span><span className="dial-code">+56</span></li>
                      <li className="country" data-dial-code={86} data-country-code="cn">
                        <div className="flag-box">
                          <div className="iti-flag cn"/>
                        </div>
                        <span className="country-name">China (中国)</span><span className="dial-code">+86</span></li>
                      <li className="country" data-dial-code={61} data-country-code="cx">
                        <div className="flag-box">
                          <div className="iti-flag cx"/>
                        </div>
                        <span className="country-name">Christmas Island</span><span className="dial-code">+61</span>
                      </li>
                      <li className="country" data-dial-code={61} data-country-code="cc">
                        <div className="flag-box">
                          <div className="iti-flag cc"/>
                        </div>
                        <span className="country-name">Cocos (Keeling) Islands</span><span
                        className="dial-code">+61</span></li>
                      <li className="country" data-dial-code={57} data-country-code="co">
                        <div className="flag-box">
                          <div className="iti-flag co"/>
                        </div>
                        <span className="country-name">Colombia</span><span className="dial-code">+57</span></li>
                      <li className="country" data-dial-code={269} data-country-code="km">
                        <div className="flag-box">
                          <div className="iti-flag km"/>
                        </div>
                        <span className="country-name">Comoros (‫جزر القمر‬‎)</span><span
                        className="dial-code">+269</span></li>
                      <li className="country" data-dial-code={243} data-country-code="cd">
                        <div className="flag-box">
                          <div className="iti-flag cd"/>
                        </div>
                        <span className="country-name">Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)</span><span
                        className="dial-code">+243</span></li>
                      <li className="country" data-dial-code={242} data-country-code="cg">
                        <div className="flag-box">
                          <div className="iti-flag cg"/>
                        </div>
                        <span className="country-name">Congo (Republic) (Congo-Brazzaville)</span><span
                        className="dial-code">+242</span></li>
                      <li className="country" data-dial-code={682} data-country-code="ck">
                        <div className="flag-box">
                          <div className="iti-flag ck"/>
                        </div>
                        <span className="country-name">Cook Islands</span><span className="dial-code">+682</span></li>
                      <li className="country" data-dial-code={506} data-country-code="cr">
                        <div className="flag-box">
                          <div className="iti-flag cr"/>
                        </div>
                        <span className="country-name">Costa Rica</span><span className="dial-code">+506</span></li>
                      <li className="country" data-dial-code={225} data-country-code="ci">
                        <div className="flag-box">
                          <div className="iti-flag ci"/>
                        </div>
                        <span className="country-name">Côte d’Ivoire</span><span className="dial-code">+225</span></li>
                      <li className="country" data-dial-code={385} data-country-code="hr">
                        <div className="flag-box">
                          <div className="iti-flag hr"/>
                        </div>
                        <span className="country-name">Croatia (Hrvatska)</span><span className="dial-code">+385</span>
                      </li>
                      <li className="country" data-dial-code={53} data-country-code="cu">
                        <div className="flag-box">
                          <div className="iti-flag cu"/>
                        </div>
                        <span className="country-name">Cuba</span><span className="dial-code">+53</span></li>
                      <li className="country" data-dial-code={599} data-country-code="cw">
                        <div className="flag-box">
                          <div className="iti-flag cw"/>
                        </div>
                        <span className="country-name">Curaçao</span><span className="dial-code">+599</span></li>
                      <li className="country" data-dial-code={357} data-country-code="cy">
                        <div className="flag-box">
                          <div className="iti-flag cy"/>
                        </div>
                        <span className="country-name">Cyprus (Κύπρος)</span><span className="dial-code">+357</span>
                      </li>
                      <li className="country" data-dial-code={420} data-country-code="cz">
                        <div className="flag-box">
                          <div className="iti-flag cz"/>
                        </div>
                        <span className="country-name">Czech Republic (Česká republika)</span><span
                        className="dial-code">+420</span></li>
                      <li className="country" data-dial-code={45} data-country-code="dk">
                        <div className="flag-box">
                          <div className="iti-flag dk"/>
                        </div>
                        <span className="country-name">Denmark (Danmark)</span><span className="dial-code">+45</span>
                      </li>
                      <li className="country" data-dial-code={253} data-country-code="dj">
                        <div className="flag-box">
                          <div className="iti-flag dj"/>
                        </div>
                        <span className="country-name">Djibouti</span><span className="dial-code">+253</span></li>
                      <li className="country" data-dial-code={1767} data-country-code="dm">
                        <div className="flag-box">
                          <div className="iti-flag dm"/>
                        </div>
                        <span className="country-name">Dominica</span><span className="dial-code">+1767</span></li>
                      <li className="country" data-dial-code={1} data-country-code="do">
                        <div className="flag-box">
                          <div className="iti-flag do"/>
                        </div>
                        <span className="country-name">Dominican Republic (República Dominicana)</span><span
                        className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={593} data-country-code="ec">
                        <div className="flag-box">
                          <div className="iti-flag ec"/>
                        </div>
                        <span className="country-name">Ecuador</span><span className="dial-code">+593</span></li>
                      <li className="country" data-dial-code={20} data-country-code="eg">
                        <div className="flag-box">
                          <div className="iti-flag eg"/>
                        </div>
                        <span className="country-name">Egypt (‫مصر‬‎)</span><span className="dial-code">+20</span></li>
                      <li className="country" data-dial-code={503} data-country-code="sv">
                        <div className="flag-box">
                          <div className="iti-flag sv"/>
                        </div>
                        <span className="country-name">El Salvador</span><span className="dial-code">+503</span></li>
                      <li className="country" data-dial-code={240} data-country-code="gq">
                        <div className="flag-box">
                          <div className="iti-flag gq"/>
                        </div>
                        <span className="country-name">Equatorial Guinea (Guinea Ecuatorial)</span><span
                        className="dial-code">+240</span></li>
                      <li className="country" data-dial-code={291} data-country-code="er">
                        <div className="flag-box">
                          <div className="iti-flag er"/>
                        </div>
                        <span className="country-name">Eritrea</span><span className="dial-code">+291</span></li>
                      <li className="country" data-dial-code={372} data-country-code="ee">
                        <div className="flag-box">
                          <div className="iti-flag ee"/>
                        </div>
                        <span className="country-name">Estonia (Eesti)</span><span className="dial-code">+372</span>
                      </li>
                      <li className="country" data-dial-code={251} data-country-code="et">
                        <div className="flag-box">
                          <div className="iti-flag et"/>
                        </div>
                        <span className="country-name">Ethiopia</span><span className="dial-code">+251</span></li>
                      <li className="country" data-dial-code={500} data-country-code="fk">
                        <div className="flag-box">
                          <div className="iti-flag fk"/>
                        </div>
                        <span className="country-name">Falkland Islands (Islas Malvinas)</span><span
                        className="dial-code">+500</span></li>
                      <li className="country" data-dial-code={298} data-country-code="fo">
                        <div className="flag-box">
                          <div className="iti-flag fo"/>
                        </div>
                        <span className="country-name">Faroe Islands (Føroyar)</span><span
                        className="dial-code">+298</span></li>
                      <li className="country" data-dial-code={679} data-country-code="fj">
                        <div className="flag-box">
                          <div className="iti-flag fj"/>
                        </div>
                        <span className="country-name">Fiji</span><span className="dial-code">+679</span></li>
                      <li className="country" data-dial-code={358} data-country-code="fi">
                        <div className="flag-box">
                          <div className="iti-flag fi"/>
                        </div>
                        <span className="country-name">Finland (Suomi)</span><span className="dial-code">+358</span>
                      </li>
                      <li className="country" data-dial-code={33} data-country-code="fr">
                        <div className="flag-box">
                          <div className="iti-flag fr"/>
                        </div>
                        <span className="country-name">France</span><span className="dial-code">+33</span></li>
                      <li className="country" data-dial-code={594} data-country-code="gf">
                        <div className="flag-box">
                          <div className="iti-flag gf"/>
                        </div>
                        <span className="country-name">French Guiana (Guyane française)</span><span
                        className="dial-code">+594</span></li>
                      <li className="country" data-dial-code={689} data-country-code="pf">
                        <div className="flag-box">
                          <div className="iti-flag pf"/>
                        </div>
                        <span className="country-name">French Polynesia (Polynésie française)</span><span
                        className="dial-code">+689</span></li>
                      <li className="country" data-dial-code={241} data-country-code="ga">
                        <div className="flag-box">
                          <div className="iti-flag ga"/>
                        </div>
                        <span className="country-name">Gabon</span><span className="dial-code">+241</span></li>
                      <li className="country" data-dial-code={220} data-country-code="gm">
                        <div className="flag-box">
                          <div className="iti-flag gm"/>
                        </div>
                        <span className="country-name">Gambia</span><span className="dial-code">+220</span></li>
                      <li className="country" data-dial-code={995} data-country-code="ge">
                        <div className="flag-box">
                          <div className="iti-flag ge"/>
                        </div>
                        <span className="country-name">Georgia (საქართველო)</span><span
                        className="dial-code">+995</span></li>
                      <li className="country" data-dial-code={49} data-country-code="de">
                        <div className="flag-box">
                          <div className="iti-flag de"/>
                        </div>
                        <span className="country-name">Germany (Deutschland)</span><span
                        className="dial-code">+49</span></li>
                      <li className="country" data-dial-code={233} data-country-code="gh">
                        <div className="flag-box">
                          <div className="iti-flag gh"/>
                        </div>
                        <span className="country-name">Ghana (Gaana)</span><span className="dial-code">+233</span></li>
                      <li className="country" data-dial-code={350} data-country-code="gi">
                        <div className="flag-box">
                          <div className="iti-flag gi"/>
                        </div>
                        <span className="country-name">Gibraltar</span><span className="dial-code">+350</span></li>
                      <li className="country" data-dial-code={30} data-country-code="gr">
                        <div className="flag-box">
                          <div className="iti-flag gr"/>
                        </div>
                        <span className="country-name">Greece (Ελλάδα)</span><span className="dial-code">+30</span></li>
                      <li className="country" data-dial-code={299} data-country-code="gl">
                        <div className="flag-box">
                          <div className="iti-flag gl"/>
                        </div>
                        <span className="country-name">Greenland (Kalaallit Nunaat)</span><span className="dial-code">+299</span>
                      </li>
                      <li className="country" data-dial-code={1473} data-country-code="gd">
                        <div className="flag-box">
                          <div className="iti-flag gd"/>
                        </div>
                        <span className="country-name">Grenada</span><span className="dial-code">+1473</span></li>
                      <li className="country" data-dial-code={590} data-country-code="gp">
                        <div className="flag-box">
                          <div className="iti-flag gp"/>
                        </div>
                        <span className="country-name">Guadeloupe</span><span className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={1671} data-country-code="gu">
                        <div className="flag-box">
                          <div className="iti-flag gu"/>
                        </div>
                        <span className="country-name">Guam</span><span className="dial-code">+1671</span></li>
                      <li className="country" data-dial-code={502} data-country-code="gt">
                        <div className="flag-box">
                          <div className="iti-flag gt"/>
                        </div>
                        <span className="country-name">Guatemala</span><span className="dial-code">+502</span></li>
                      <li className="country" data-dial-code={44} data-country-code="gg">
                        <div className="flag-box">
                          <div className="iti-flag gg"/>
                        </div>
                        <span className="country-name">Guernsey</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={224} data-country-code="gn">
                        <div className="flag-box">
                          <div className="iti-flag gn"/>
                        </div>
                        <span className="country-name">Guinea (Guinée)</span><span className="dial-code">+224</span>
                      </li>
                      <li className="country" data-dial-code={245} data-country-code="gw">
                        <div className="flag-box">
                          <div className="iti-flag gw"/>
                        </div>
                        <span className="country-name">Guinea-Bissau (Guiné Bissau)</span><span className="dial-code">+245</span>
                      </li>
                      <li className="country" data-dial-code={592} data-country-code="gy">
                        <div className="flag-box">
                          <div className="iti-flag gy"/>
                        </div>
                        <span className="country-name">Guyana</span><span className="dial-code">+592</span></li>
                      <li className="country" data-dial-code={509} data-country-code="ht">
                        <div className="flag-box">
                          <div className="iti-flag ht"/>
                        </div>
                        <span className="country-name">Haiti</span><span className="dial-code">+509</span></li>
                      <li className="country" data-dial-code={504} data-country-code="hn">
                        <div className="flag-box">
                          <div className="iti-flag hn"/>
                        </div>
                        <span className="country-name">Honduras</span><span className="dial-code">+504</span></li>
                      <li className="country" data-dial-code={852} data-country-code="hk">
                        <div className="flag-box">
                          <div className="iti-flag hk"/>
                        </div>
                        <span className="country-name">Hong Kong (香港)</span><span className="dial-code">+852</span></li>
                      <li className="country" data-dial-code={36} data-country-code="hu">
                        <div className="flag-box">
                          <div className="iti-flag hu"/>
                        </div>
                        <span className="country-name">Hungary (Magyarország)</span><span
                        className="dial-code">+36</span></li>
                      <li className="country" data-dial-code={354} data-country-code="is">
                        <div className="flag-box">
                          <div className="iti-flag is"/>
                        </div>
                        <span className="country-name">Iceland (Ísland)</span><span className="dial-code">+354</span>
                      </li>
                      <li className="country" data-dial-code={91} data-country-code="in">
                        <div className="flag-box">
                          <div className="iti-flag in"/>
                        </div>
                        <span className="country-name">India (भारत)</span><span className="dial-code">+91</span></li>
                      <li className="country" data-dial-code={62} data-country-code="id">
                        <div className="flag-box">
                          <div className="iti-flag id"/>
                        </div>
                        <span className="country-name">Indonesia</span><span className="dial-code">+62</span></li>
                      <li className="country" data-dial-code={98} data-country-code="ir">
                        <div className="flag-box">
                          <div className="iti-flag ir"/>
                        </div>
                        <span className="country-name">Iran (‫ایران‬‎)</span><span className="dial-code">+98</span></li>
                      <li className="country" data-dial-code={964} data-country-code="iq">
                        <div className="flag-box">
                          <div className="iti-flag iq"/>
                        </div>
                        <span className="country-name">Iraq (‫العراق‬‎)</span><span className="dial-code">+964</span>
                      </li>
                      <li className="country" data-dial-code={353} data-country-code="ie">
                        <div className="flag-box">
                          <div className="iti-flag ie"/>
                        </div>
                        <span className="country-name">Ireland</span><span className="dial-code">+353</span></li>
                      <li className="country" data-dial-code={44} data-country-code="im">
                        <div className="flag-box">
                          <div className="iti-flag im"/>
                        </div>
                        <span className="country-name">Isle of Man</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={972} data-country-code="il">
                        <div className="flag-box">
                          <div className="iti-flag il"/>
                        </div>
                        <span className="country-name">Israel (‫ישראל‬‎)</span><span className="dial-code">+972</span>
                      </li>
                      <li className="country" data-dial-code={39} data-country-code="it">
                        <div className="flag-box">
                          <div className="iti-flag it"/>
                        </div>
                        <span className="country-name">Italy (Italia)</span><span className="dial-code">+39</span></li>
                      <li className="country" data-dial-code={1876} data-country-code="jm">
                        <div className="flag-box">
                          <div className="iti-flag jm"/>
                        </div>
                        <span className="country-name">Jamaica</span><span className="dial-code">+1876</span></li>
                      <li className="country" data-dial-code={81} data-country-code="jp">
                        <div className="flag-box">
                          <div className="iti-flag jp"/>
                        </div>
                        <span className="country-name">Japan (日本)</span><span className="dial-code">+81</span></li>
                      <li className="country" data-dial-code={44} data-country-code="je">
                        <div className="flag-box">
                          <div className="iti-flag je"/>
                        </div>
                        <span className="country-name">Jersey</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={962} data-country-code="jo">
                        <div className="flag-box">
                          <div className="iti-flag jo"/>
                        </div>
                        <span className="country-name">Jordan (‫الأردن‬‎)</span><span className="dial-code">+962</span>
                      </li>
                      <li className="country" data-dial-code={7} data-country-code="kz">
                        <div className="flag-box">
                          <div className="iti-flag kz"/>
                        </div>
                        <span className="country-name">Kazakhstan (Казахстан)</span><span
                        className="dial-code">+7</span></li>
                      <li className="country" data-dial-code={254} data-country-code="ke">
                        <div className="flag-box">
                          <div className="iti-flag ke"/>
                        </div>
                        <span className="country-name">Kenya</span><span className="dial-code">+254</span></li>
                      <li className="country" data-dial-code={686} data-country-code="ki">
                        <div className="flag-box">
                          <div className="iti-flag ki"/>
                        </div>
                        <span className="country-name">Kiribati</span><span className="dial-code">+686</span></li>
                      <li className="country" data-dial-code={383} data-country-code="xk">
                        <div className="flag-box">
                          <div className="iti-flag xk"/>
                        </div>
                        <span className="country-name">Kosovo</span><span className="dial-code">+383</span></li>
                      <li className="country" data-dial-code={965} data-country-code="kw">
                        <div className="flag-box">
                          <div className="iti-flag kw"/>
                        </div>
                        <span className="country-name">Kuwait (‫الكويت‬‎)</span><span className="dial-code">+965</span>
                      </li>
                      <li className="country" data-dial-code={996} data-country-code="kg">
                        <div className="flag-box">
                          <div className="iti-flag kg"/>
                        </div>
                        <span className="country-name">Kyrgyzstan (Кыргызстан)</span><span
                        className="dial-code">+996</span></li>
                      <li className="country" data-dial-code={856} data-country-code="la">
                        <div className="flag-box">
                          <div className="iti-flag la"/>
                        </div>
                        <span className="country-name">Laos (ລາວ)</span><span className="dial-code">+856</span></li>
                      <li className="country" data-dial-code={371} data-country-code="lv">
                        <div className="flag-box">
                          <div className="iti-flag lv"/>
                        </div>
                        <span className="country-name">Latvia (Latvija)</span><span className="dial-code">+371</span>
                      </li>
                      <li className="country" data-dial-code={961} data-country-code="lb">
                        <div className="flag-box">
                          <div className="iti-flag lb"/>
                        </div>
                        <span className="country-name">Lebanon (‫لبنان‬‎)</span><span className="dial-code">+961</span>
                      </li>
                      <li className="country" data-dial-code={266} data-country-code="ls">
                        <div className="flag-box">
                          <div className="iti-flag ls"/>
                        </div>
                        <span className="country-name">Lesotho</span><span className="dial-code">+266</span></li>
                      <li className="country" data-dial-code={231} data-country-code="lr">
                        <div className="flag-box">
                          <div className="iti-flag lr"/>
                        </div>
                        <span className="country-name">Liberia</span><span className="dial-code">+231</span></li>
                      <li className="country" data-dial-code={218} data-country-code="ly">
                        <div className="flag-box">
                          <div className="iti-flag ly"/>
                        </div>
                        <span className="country-name">Libya (‫ليبيا‬‎)</span><span className="dial-code">+218</span>
                      </li>
                      <li className="country" data-dial-code={423} data-country-code="li">
                        <div className="flag-box">
                          <div className="iti-flag li"/>
                        </div>
                        <span className="country-name">Liechtenstein</span><span className="dial-code">+423</span></li>
                      <li className="country" data-dial-code={370} data-country-code="lt">
                        <div className="flag-box">
                          <div className="iti-flag lt"/>
                        </div>
                        <span className="country-name">Lithuania (Lietuva)</span><span className="dial-code">+370</span>
                      </li>
                      <li className="country" data-dial-code={352} data-country-code="lu">
                        <div className="flag-box">
                          <div className="iti-flag lu"/>
                        </div>
                        <span className="country-name">Luxembourg</span><span className="dial-code">+352</span></li>
                      <li className="country" data-dial-code={853} data-country-code="mo">
                        <div className="flag-box">
                          <div className="iti-flag mo"/>
                        </div>
                        <span className="country-name">Macau (澳門)</span><span className="dial-code">+853</span></li>
                      <li className="country" data-dial-code={389} data-country-code="mk">
                        <div className="flag-box">
                          <div className="iti-flag mk"/>
                        </div>
                        <span className="country-name">Macedonia (FYROM) (Македонија)</span><span className="dial-code">+389</span>
                      </li>
                      <li className="country" data-dial-code={261} data-country-code="mg">
                        <div className="flag-box">
                          <div className="iti-flag mg"/>
                        </div>
                        <span className="country-name">Madagascar (Madagasikara)</span><span
                        className="dial-code">+261</span></li>
                      <li className="country" data-dial-code={265} data-country-code="mw">
                        <div className="flag-box">
                          <div className="iti-flag mw"/>
                        </div>
                        <span className="country-name">Malawi</span><span className="dial-code">+265</span></li>
                      <li className="country" data-dial-code={60} data-country-code="my">
                        <div className="flag-box">
                          <div className="iti-flag my"/>
                        </div>
                        <span className="country-name">Malaysia</span><span className="dial-code">+60</span></li>
                      <li className="country" data-dial-code={960} data-country-code="mv">
                        <div className="flag-box">
                          <div className="iti-flag mv"/>
                        </div>
                        <span className="country-name">Maldives</span><span className="dial-code">+960</span></li>
                      <li className="country" data-dial-code={223} data-country-code="ml">
                        <div className="flag-box">
                          <div className="iti-flag ml"/>
                        </div>
                        <span className="country-name">Mali</span><span className="dial-code">+223</span></li>
                      <li className="country" data-dial-code={356} data-country-code="mt">
                        <div className="flag-box">
                          <div className="iti-flag mt"/>
                        </div>
                        <span className="country-name">Malta</span><span className="dial-code">+356</span></li>
                      <li className="country" data-dial-code={692} data-country-code="mh">
                        <div className="flag-box">
                          <div className="iti-flag mh"/>
                        </div>
                        <span className="country-name">Marshall Islands</span><span className="dial-code">+692</span>
                      </li>
                      <li className="country" data-dial-code={596} data-country-code="mq">
                        <div className="flag-box">
                          <div className="iti-flag mq"/>
                        </div>
                        <span className="country-name">Martinique</span><span className="dial-code">+596</span></li>
                      <li className="country" data-dial-code={222} data-country-code="mr">
                        <div className="flag-box">
                          <div className="iti-flag mr"/>
                        </div>
                        <span className="country-name">Mauritania (‫موريتانيا‬‎)</span><span
                        className="dial-code">+222</span></li>
                      <li className="country" data-dial-code={230} data-country-code="mu">
                        <div className="flag-box">
                          <div className="iti-flag mu"/>
                        </div>
                        <span className="country-name">Mauritius (Moris)</span><span className="dial-code">+230</span>
                      </li>
                      <li className="country" data-dial-code={262} data-country-code="yt">
                        <div className="flag-box">
                          <div className="iti-flag yt"/>
                        </div>
                        <span className="country-name">Mayotte</span><span className="dial-code">+262</span></li>
                      <li className="country" data-dial-code={52} data-country-code="mx">
                        <div className="flag-box">
                          <div className="iti-flag mx"/>
                        </div>
                        <span className="country-name">Mexico (México)</span><span className="dial-code">+52</span></li>
                      <li className="country" data-dial-code={691} data-country-code="fm">
                        <div className="flag-box">
                          <div className="iti-flag fm"/>
                        </div>
                        <span className="country-name">Micronesia</span><span className="dial-code">+691</span></li>
                      <li className="country" data-dial-code={373} data-country-code="md">
                        <div className="flag-box">
                          <div className="iti-flag md"/>
                        </div>
                        <span className="country-name">Moldova (Republica Moldova)</span><span className="dial-code">+373</span>
                      </li>
                      <li className="country" data-dial-code={377} data-country-code="mc">
                        <div className="flag-box">
                          <div className="iti-flag mc"/>
                        </div>
                        <span className="country-name">Monaco</span><span className="dial-code">+377</span></li>
                      <li className="country" data-dial-code={976} data-country-code="mn">
                        <div className="flag-box">
                          <div className="iti-flag mn"/>
                        </div>
                        <span className="country-name">Mongolia (Монгол)</span><span className="dial-code">+976</span>
                      </li>
                      <li className="country" data-dial-code={382} data-country-code="me">
                        <div className="flag-box">
                          <div className="iti-flag me"/>
                        </div>
                        <span className="country-name">Montenegro (Crna Gora)</span><span
                        className="dial-code">+382</span></li>
                      <li className="country" data-dial-code={1664} data-country-code="ms">
                        <div className="flag-box">
                          <div className="iti-flag ms"/>
                        </div>
                        <span className="country-name">Montserrat</span><span className="dial-code">+1664</span></li>
                      <li className="country" data-dial-code={212} data-country-code="ma">
                        <div className="flag-box">
                          <div className="iti-flag ma"/>
                        </div>
                        <span className="country-name">Morocco (‫المغرب‬‎)</span><span className="dial-code">+212</span>
                      </li>
                      <li className="country" data-dial-code={258} data-country-code="mz">
                        <div className="flag-box">
                          <div className="iti-flag mz"/>
                        </div>
                        <span className="country-name">Mozambique (Moçambique)</span><span
                        className="dial-code">+258</span></li>
                      <li className="country" data-dial-code={95} data-country-code="mm">
                        <div className="flag-box">
                          <div className="iti-flag mm"/>
                        </div>
                        <span className="country-name">Myanmar (Burma) (မြန်မာ)</span><span
                        className="dial-code">+95</span></li>
                      <li className="country" data-dial-code={264} data-country-code="na">
                        <div className="flag-box">
                          <div className="iti-flag na"/>
                        </div>
                        <span className="country-name">Namibia (Namibië)</span><span className="dial-code">+264</span>
                      </li>
                      <li className="country" data-dial-code={674} data-country-code="nr">
                        <div className="flag-box">
                          <div className="iti-flag nr"/>
                        </div>
                        <span className="country-name">Nauru</span><span className="dial-code">+674</span></li>
                      <li className="country" data-dial-code={977} data-country-code="np">
                        <div className="flag-box">
                          <div className="iti-flag np"/>
                        </div>
                        <span className="country-name">Nepal (नेपाल)</span><span className="dial-code">+977</span></li>
                      <li className="country" data-dial-code={31} data-country-code="nl">
                        <div className="flag-box">
                          <div className="iti-flag nl"/>
                        </div>
                        <span className="country-name">Netherlands (Nederland)</span><span
                        className="dial-code">+31</span></li>
                      <li className="country" data-dial-code={687} data-country-code="nc">
                        <div className="flag-box">
                          <div className="iti-flag nc"/>
                        </div>
                        <span className="country-name">New Caledonia (Nouvelle-Calédonie)</span><span
                        className="dial-code">+687</span></li>
                      <li className="country" data-dial-code={64} data-country-code="nz">
                        <div className="flag-box">
                          <div className="iti-flag nz"/>
                        </div>
                        <span className="country-name">New Zealand</span><span className="dial-code">+64</span></li>
                      <li className="country" data-dial-code={505} data-country-code="ni">
                        <div className="flag-box">
                          <div className="iti-flag ni"/>
                        </div>
                        <span className="country-name">Nicaragua</span><span className="dial-code">+505</span></li>
                      <li className="country" data-dial-code={227} data-country-code="ne">
                        <div className="flag-box">
                          <div className="iti-flag ne"/>
                        </div>
                        <span className="country-name">Niger (Nijar)</span><span className="dial-code">+227</span></li>
                      <li className="country" data-dial-code={234} data-country-code="ng">
                        <div className="flag-box">
                          <div className="iti-flag ng"/>
                        </div>
                        <span className="country-name">Nigeria</span><span className="dial-code">+234</span></li>
                      <li className="country" data-dial-code={683} data-country-code="nu">
                        <div className="flag-box">
                          <div className="iti-flag nu"/>
                        </div>
                        <span className="country-name">Niue</span><span className="dial-code">+683</span></li>
                      <li className="country" data-dial-code={672} data-country-code="nf">
                        <div className="flag-box">
                          <div className="iti-flag nf"/>
                        </div>
                        <span className="country-name">Norfolk Island</span><span className="dial-code">+672</span></li>
                      <li className="country" data-dial-code={850} data-country-code="kp">
                        <div className="flag-box">
                          <div className="iti-flag kp"/>
                        </div>
                        <span className="country-name">North Korea (조선 민주주의 인민 공화국)</span><span className="dial-code">+850</span>
                      </li>
                      <li className="country" data-dial-code={1670} data-country-code="mp">
                        <div className="flag-box">
                          <div className="iti-flag mp"/>
                        </div>
                        <span className="country-name">Northern Mariana Islands</span><span
                        className="dial-code">+1670</span></li>
                      <li className="country" data-dial-code={47} data-country-code="no">
                        <div className="flag-box">
                          <div className="iti-flag no"/>
                        </div>
                        <span className="country-name">Norway (Norge)</span><span className="dial-code">+47</span></li>
                      <li className="country" data-dial-code={968} data-country-code="om">
                        <div className="flag-box">
                          <div className="iti-flag om"/>
                        </div>
                        <span className="country-name">Oman (‫عُمان‬‎)</span><span className="dial-code">+968</span>
                      </li>
                      <li className="country" data-dial-code={92} data-country-code="pk">
                        <div className="flag-box">
                          <div className="iti-flag pk"/>
                        </div>
                        <span className="country-name">Pakistan (‫پاکستان‬‎)</span><span
                        className="dial-code">+92</span></li>
                      <li className="country" data-dial-code={680} data-country-code="pw">
                        <div className="flag-box">
                          <div className="iti-flag pw"/>
                        </div>
                        <span className="country-name">Palau</span><span className="dial-code">+680</span></li>
                      <li className="country" data-dial-code={970} data-country-code="ps">
                        <div className="flag-box">
                          <div className="iti-flag ps"/>
                        </div>
                        <span className="country-name">Palestine (‫فلسطين‬‎)</span><span
                        className="dial-code">+970</span></li>
                      <li className="country" data-dial-code={507} data-country-code="pa">
                        <div className="flag-box">
                          <div className="iti-flag pa"/>
                        </div>
                        <span className="country-name">Panama (Panamá)</span><span className="dial-code">+507</span>
                      </li>
                      <li className="country" data-dial-code={675} data-country-code="pg">
                        <div className="flag-box">
                          <div className="iti-flag pg"/>
                        </div>
                        <span className="country-name">Papua New Guinea</span><span className="dial-code">+675</span>
                      </li>
                      <li className="country" data-dial-code={595} data-country-code="py">
                        <div className="flag-box">
                          <div className="iti-flag py"/>
                        </div>
                        <span className="country-name">Paraguay</span><span className="dial-code">+595</span></li>
                      <li className="country" data-dial-code={51} data-country-code="pe">
                        <div className="flag-box">
                          <div className="iti-flag pe"/>
                        </div>
                        <span className="country-name">Peru (Perú)</span><span className="dial-code">+51</span></li>
                      <li className="country" data-dial-code={63} data-country-code="ph">
                        <div className="flag-box">
                          <div className="iti-flag ph"/>
                        </div>
                        <span className="country-name">Philippines</span><span className="dial-code">+63</span></li>
                      <li className="country" data-dial-code={48} data-country-code="pl">
                        <div className="flag-box">
                          <div className="iti-flag pl"/>
                        </div>
                        <span className="country-name">Poland (Polska)</span><span className="dial-code">+48</span></li>
                      <li className="country" data-dial-code={351} data-country-code="pt">
                        <div className="flag-box">
                          <div className="iti-flag pt"/>
                        </div>
                        <span className="country-name">Portugal</span><span className="dial-code">+351</span></li>
                      <li className="country" data-dial-code={1} data-country-code="pr">
                        <div className="flag-box">
                          <div className="iti-flag pr"/>
                        </div>
                        <span className="country-name">Puerto Rico</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={974} data-country-code="qa">
                        <div className="flag-box">
                          <div className="iti-flag qa"/>
                        </div>
                        <span className="country-name">Qatar (‫قطر‬‎)</span><span className="dial-code">+974</span></li>
                      <li className="country" data-dial-code={262} data-country-code="re">
                        <div className="flag-box">
                          <div className="iti-flag re"/>
                        </div>
                        <span className="country-name">Réunion (La Réunion)</span><span
                        className="dial-code">+262</span></li>
                      <li className="country" data-dial-code={40} data-country-code="ro">
                        <div className="flag-box">
                          <div className="iti-flag ro"/>
                        </div>
                        <span className="country-name">Romania (România)</span><span className="dial-code">+40</span>
                      </li>
                      <li className="country" data-dial-code={7} data-country-code="ru">
                        <div className="flag-box">
                          <div className="iti-flag ru"/>
                        </div>
                        <span className="country-name">Russia (Россия)</span><span className="dial-code">+7</span></li>
                      <li className="country" data-dial-code={250} data-country-code="rw">
                        <div className="flag-box">
                          <div className="iti-flag rw"/>
                        </div>
                        <span className="country-name">Rwanda</span><span className="dial-code">+250</span></li>
                      <li className="country" data-dial-code={590} data-country-code="bl">
                        <div className="flag-box">
                          <div className="iti-flag bl"/>
                        </div>
                        <span className="country-name">Saint Barthélemy (Saint-Barthélemy)</span><span
                        className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={290} data-country-code="sh">
                        <div className="flag-box">
                          <div className="iti-flag sh"/>
                        </div>
                        <span className="country-name">Saint Helena</span><span className="dial-code">+290</span></li>
                      <li className="country" data-dial-code={1869} data-country-code="kn">
                        <div className="flag-box">
                          <div className="iti-flag kn"/>
                        </div>
                        <span className="country-name">Saint Kitts and Nevis</span><span
                        className="dial-code">+1869</span></li>
                      <li className="country" data-dial-code={1758} data-country-code="lc">
                        <div className="flag-box">
                          <div className="iti-flag lc"/>
                        </div>
                        <span className="country-name">Saint Lucia</span><span className="dial-code">+1758</span></li>
                      <li className="country" data-dial-code={590} data-country-code="mf">
                        <div className="flag-box">
                          <div className="iti-flag mf"/>
                        </div>
                        <span className="country-name">Saint Martin (Saint-Martin (partie française))</span><span
                        className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={508} data-country-code="pm">
                        <div className="flag-box">
                          <div className="iti-flag pm"/>
                        </div>
                        <span className="country-name">Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)</span><span
                        className="dial-code">+508</span></li>
                      <li className="country" data-dial-code={1784} data-country-code="vc">
                        <div className="flag-box">
                          <div className="iti-flag vc"/>
                        </div>
                        <span className="country-name">Saint Vincent and the Grenadines</span><span
                        className="dial-code">+1784</span></li>
                      <li className="country" data-dial-code={685} data-country-code="ws">
                        <div className="flag-box">
                          <div className="iti-flag ws"/>
                        </div>
                        <span className="country-name">Samoa</span><span className="dial-code">+685</span></li>
                      <li className="country" data-dial-code={378} data-country-code="sm">
                        <div className="flag-box">
                          <div className="iti-flag sm"/>
                        </div>
                        <span className="country-name">San Marino</span><span className="dial-code">+378</span></li>
                      <li className="country" data-dial-code={239} data-country-code="st">
                        <div className="flag-box">
                          <div className="iti-flag st"/>
                        </div>
                        <span className="country-name">São Tomé and Príncipe (São Tomé e Príncipe)</span><span
                        className="dial-code">+239</span></li>
                      <li className="country" data-dial-code={966} data-country-code="sa">
                        <div className="flag-box">
                          <div className="iti-flag sa"/>
                        </div>
                        <span className="country-name">Saudi Arabia (‫المملكة العربية السعودية‬‎)</span><span
                        className="dial-code">+966</span></li>
                      <li className="country" data-dial-code={221} data-country-code="sn">
                        <div className="flag-box">
                          <div className="iti-flag sn"/>
                        </div>
                        <span className="country-name">Senegal (Sénégal)</span><span className="dial-code">+221</span>
                      </li>
                      <li className="country" data-dial-code={381} data-country-code="rs">
                        <div className="flag-box">
                          <div className="iti-flag rs"/>
                        </div>
                        <span className="country-name">Serbia (Србија)</span><span className="dial-code">+381</span>
                      </li>
                      <li className="country" data-dial-code={248} data-country-code="sc">
                        <div className="flag-box">
                          <div className="iti-flag sc"/>
                        </div>
                        <span className="country-name">Seychelles</span><span className="dial-code">+248</span></li>
                      <li className="country" data-dial-code={232} data-country-code="sl">
                        <div className="flag-box">
                          <div className="iti-flag sl"/>
                        </div>
                        <span className="country-name">Sierra Leone</span><span className="dial-code">+232</span></li>
                      <li className="country" data-dial-code={65} data-country-code="sg">
                        <div className="flag-box">
                          <div className="iti-flag sg"/>
                        </div>
                        <span className="country-name">Singapore</span><span className="dial-code">+65</span></li>
                      <li className="country" data-dial-code={1721} data-country-code="sx">
                        <div className="flag-box">
                          <div className="iti-flag sx"/>
                        </div>
                        <span className="country-name">Sint Maarten</span><span className="dial-code">+1721</span></li>
                      <li className="country" data-dial-code={421} data-country-code="sk">
                        <div className="flag-box">
                          <div className="iti-flag sk"/>
                        </div>
                        <span className="country-name">Slovakia (Slovensko)</span><span
                        className="dial-code">+421</span></li>
                      <li className="country" data-dial-code={386} data-country-code="si">
                        <div className="flag-box">
                          <div className="iti-flag si"/>
                        </div>
                        <span className="country-name">Slovenia (Slovenija)</span><span
                        className="dial-code">+386</span></li>
                      <li className="country" data-dial-code={677} data-country-code="sb">
                        <div className="flag-box">
                          <div className="iti-flag sb"/>
                        </div>
                        <span className="country-name">Solomon Islands</span><span className="dial-code">+677</span>
                      </li>
                      <li className="country" data-dial-code={252} data-country-code="so">
                        <div className="flag-box">
                          <div className="iti-flag so"/>
                        </div>
                        <span className="country-name">Somalia (Soomaaliya)</span><span
                        className="dial-code">+252</span></li>
                      <li className="country" data-dial-code={27} data-country-code="za">
                        <div className="flag-box">
                          <div className="iti-flag za"/>
                        </div>
                        <span className="country-name">South Africa</span><span className="dial-code">+27</span></li>
                      <li className="country" data-dial-code={82} data-country-code="kr">
                        <div className="flag-box">
                          <div className="iti-flag kr"/>
                        </div>
                        <span className="country-name">South Korea (대한민국)</span><span className="dial-code">+82</span>
                      </li>
                      <li className="country" data-dial-code={211} data-country-code="ss">
                        <div className="flag-box">
                          <div className="iti-flag ss"/>
                        </div>
                        <span className="country-name">South Sudan (‫جنوب السودان‬‎)</span><span className="dial-code">+211</span>
                      </li>
                      <li className="country" data-dial-code={34} data-country-code="es">
                        <div className="flag-box">
                          <div className="iti-flag es"/>
                        </div>
                        <span className="country-name">Spain (España)</span><span className="dial-code">+34</span></li>
                      <li className="country" data-dial-code={94} data-country-code="lk">
                        <div className="flag-box">
                          <div className="iti-flag lk"/>
                        </div>
                        <span className="country-name">Sri Lanka (ශ්‍රී ලංකාව)</span><span
                        className="dial-code">+94</span></li>
                      <li className="country" data-dial-code={249} data-country-code="sd">
                        <div className="flag-box">
                          <div className="iti-flag sd"/>
                        </div>
                        <span className="country-name">Sudan (‫السودان‬‎)</span><span className="dial-code">+249</span>
                      </li>
                      <li className="country" data-dial-code={597} data-country-code="sr">
                        <div className="flag-box">
                          <div className="iti-flag sr"/>
                        </div>
                        <span className="country-name">Suriname</span><span className="dial-code">+597</span></li>
                      <li className="country" data-dial-code={47} data-country-code="sj">
                        <div className="flag-box">
                          <div className="iti-flag sj"/>
                        </div>
                        <span className="country-name">Svalbard and Jan Mayen</span><span
                        className="dial-code">+47</span></li>
                      <li className="country" data-dial-code={268} data-country-code="sz">
                        <div className="flag-box">
                          <div className="iti-flag sz"/>
                        </div>
                        <span className="country-name">Swaziland</span><span className="dial-code">+268</span></li>
                      <li className="country" data-dial-code={46} data-country-code="se">
                        <div className="flag-box">
                          <div className="iti-flag se"/>
                        </div>
                        <span className="country-name">Sweden (Sverige)</span><span className="dial-code">+46</span>
                      </li>
                      <li className="country" data-dial-code={41} data-country-code="ch">
                        <div className="flag-box">
                          <div className="iti-flag ch"/>
                        </div>
                        <span className="country-name">Switzerland (Schweiz)</span><span
                        className="dial-code">+41</span></li>
                      <li className="country" data-dial-code={963} data-country-code="sy">
                        <div className="flag-box">
                          <div className="iti-flag sy"/>
                        </div>
                        <span className="country-name">Syria (‫سوريا‬‎)</span><span className="dial-code">+963</span>
                      </li>
                      <li className="country" data-dial-code={886} data-country-code="tw">
                        <div className="flag-box">
                          <div className="iti-flag tw"/>
                        </div>
                        <span className="country-name">Taiwan (台灣)</span><span className="dial-code">+886</span></li>
                      <li className="country" data-dial-code={992} data-country-code="tj">
                        <div className="flag-box">
                          <div className="iti-flag tj"/>
                        </div>
                        <span className="country-name">Tajikistan</span><span className="dial-code">+992</span></li>
                      <li className="country" data-dial-code={255} data-country-code="tz">
                        <div className="flag-box">
                          <div className="iti-flag tz"/>
                        </div>
                        <span className="country-name">Tanzania</span><span className="dial-code">+255</span></li>
                      <li className="country" data-dial-code={66} data-country-code="th">
                        <div className="flag-box">
                          <div className="iti-flag th"/>
                        </div>
                        <span className="country-name">Thailand (ไทย)</span><span className="dial-code">+66</span></li>
                      <li className="country" data-dial-code={670} data-country-code="tl">
                        <div className="flag-box">
                          <div className="iti-flag tl"/>
                        </div>
                        <span className="country-name">Timor-Leste</span><span className="dial-code">+670</span></li>
                      <li className="country" data-dial-code={228} data-country-code="tg">
                        <div className="flag-box">
                          <div className="iti-flag tg"/>
                        </div>
                        <span className="country-name">Togo</span><span className="dial-code">+228</span></li>
                      <li className="country" data-dial-code={690} data-country-code="tk">
                        <div className="flag-box">
                          <div className="iti-flag tk"/>
                        </div>
                        <span className="country-name">Tokelau</span><span className="dial-code">+690</span></li>
                      <li className="country" data-dial-code={676} data-country-code="to">
                        <div className="flag-box">
                          <div className="iti-flag to"/>
                        </div>
                        <span className="country-name">Tonga</span><span className="dial-code">+676</span></li>
                      <li className="country" data-dial-code={1868} data-country-code="tt">
                        <div className="flag-box">
                          <div className="iti-flag tt"/>
                        </div>
                        <span className="country-name">Trinidad and Tobago</span><span
                        className="dial-code">+1868</span></li>
                      <li className="country" data-dial-code={216} data-country-code="tn">
                        <div className="flag-box">
                          <div className="iti-flag tn"/>
                        </div>
                        <span className="country-name">Tunisia (‫تونس‬‎)</span><span className="dial-code">+216</span>
                      </li>
                      <li className="country" data-dial-code={90} data-country-code="tr">
                        <div className="flag-box">
                          <div className="iti-flag tr"/>
                        </div>
                        <span className="country-name">Turkey (Türkiye)</span><span className="dial-code">+90</span>
                      </li>
                      <li className="country" data-dial-code={993} data-country-code="tm">
                        <div className="flag-box">
                          <div className="iti-flag tm"/>
                        </div>
                        <span className="country-name">Turkmenistan</span><span className="dial-code">+993</span></li>
                      <li className="country" data-dial-code={1649} data-country-code="tc">
                        <div className="flag-box">
                          <div className="iti-flag tc"/>
                        </div>
                        <span className="country-name">Turks and Caicos Islands</span><span
                        className="dial-code">+1649</span></li>
                      <li className="country" data-dial-code={688} data-country-code="tv">
                        <div className="flag-box">
                          <div className="iti-flag tv"/>
                        </div>
                        <span className="country-name">Tuvalu</span><span className="dial-code">+688</span></li>
                      <li className="country" data-dial-code={1340} data-country-code="vi">
                        <div className="flag-box">
                          <div className="iti-flag vi"/>
                        </div>
                        <span className="country-name">U.S. Virgin Islands</span><span
                        className="dial-code">+1340</span></li>
                      <li className="country" data-dial-code={256} data-country-code="ug">
                        <div className="flag-box">
                          <div className="iti-flag ug"/>
                        </div>
                        <span className="country-name">Uganda</span><span className="dial-code">+256</span></li>
                      <li className="country" data-dial-code={380} data-country-code="ua">
                        <div className="flag-box">
                          <div className="iti-flag ua"/>
                        </div>
                        <span className="country-name">Ukraine (Україна)</span><span className="dial-code">+380</span>
                      </li>
                      <li className="country" data-dial-code={971} data-country-code="ae">
                        <div className="flag-box">
                          <div className="iti-flag ae"/>
                        </div>
                        <span className="country-name">United Arab Emirates (‫الإمارات العربية المتحدة‬‎)</span><span
                        className="dial-code">+971</span></li>
                      <li className="country" data-dial-code={44} data-country-code="gb">
                        <div className="flag-box">
                          <div className="iti-flag gb"/>
                        </div>
                        <span className="country-name">United Kingdom</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={1} data-country-code="us">
                        <div className="flag-box">
                          <div className="iti-flag us"/>
                        </div>
                        <span className="country-name">United States</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={598} data-country-code="uy">
                        <div className="flag-box">
                          <div className="iti-flag uy"/>
                        </div>
                        <span className="country-name">Uruguay</span><span className="dial-code">+598</span></li>
                      <li className="country" data-dial-code={998} data-country-code="uz">
                        <div className="flag-box">
                          <div className="iti-flag uz"/>
                        </div>
                        <span className="country-name">Uzbekistan (Oʻzbekiston)</span><span
                        className="dial-code">+998</span></li>
                      <li className="country" data-dial-code={678} data-country-code="vu">
                        <div className="flag-box">
                          <div className="iti-flag vu"/>
                        </div>
                        <span className="country-name">Vanuatu</span><span className="dial-code">+678</span></li>
                      <li className="country" data-dial-code={39} data-country-code="va">
                        <div className="flag-box">
                          <div className="iti-flag va"/>
                        </div>
                        <span className="country-name">Vatican City (Città del Vaticano)</span><span
                        className="dial-code">+39</span></li>
                      <li className="country" data-dial-code={58} data-country-code="ve">
                        <div className="flag-box">
                          <div className="iti-flag ve"/>
                        </div>
                        <span className="country-name">Venezuela</span><span className="dial-code">+58</span></li>
                      <li className="country" data-dial-code={84} data-country-code="vn">
                        <div className="flag-box">
                          <div className="iti-flag vn"/>
                        </div>
                        <span className="country-name">Vietnam (Việt Nam)</span><span className="dial-code">+84</span>
                      </li>
                      <li className="country" data-dial-code={681} data-country-code="wf">
                        <div className="flag-box">
                          <div className="iti-flag wf"/>
                        </div>
                        <span className="country-name">Wallis and Futuna</span><span className="dial-code">+681</span>
                      </li>
                      <li className="country" data-dial-code={212} data-country-code="eh">
                        <div className="flag-box">
                          <div className="iti-flag eh"/>
                        </div>
                        <span className="country-name">Western Sahara (‫الصحراء الغربية‬‎)</span><span
                        className="dial-code">+212</span></li>
                      <li className="country" data-dial-code={967} data-country-code="ye">
                        <div className="flag-box">
                          <div className="iti-flag ye"/>
                        </div>
                        <span className="country-name">Yemen (‫اليمن‬‎)</span><span className="dial-code">+967</span>
                      </li>
                      <li className="country" data-dial-code={260} data-country-code="zm">
                        <div className="flag-box">
                          <div className="iti-flag zm"/>
                        </div>
                        <span className="country-name">Zambia</span><span className="dial-code">+260</span></li>
                      <li className="country" data-dial-code={263} data-country-code="zw">
                        <div className="flag-box">
                          <div className="iti-flag zw"/>
                        </div>
                        <span className="country-name">Zimbabwe</span><span className="dial-code">+263</span></li>
                      <li className="country" data-dial-code={358} data-country-code="ax">
                        <div className="flag-box">
                          <div className="iti-flag ax"/>
                        </div>
                        <span className="country-name">Åland Islands</span><span className="dial-code">+358</span></li>
                    </ul>
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
              <div className="form-group form-first-name hidden has-feedback">
                <input type="text" name="firstname" placeholder="First Name" autoComplete="off"
                       className="form-control mrg-t-lg first-name" data-fv-field="firstName"/><i
                className="form-control-feedback" data-fv-icon-for="firstName" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="firstName"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Firstname is required.
                </small>
              </div>
              <div className="form-group form-last-name hidden has-feedback">
                <input type="text" name="lastname" placeholder="Last Name" autoComplete="off"
                       className="form-control mrg-t-lg last-name" data-fv-field="lastName"/><i
                className="form-control-feedback" data-fv-icon-for="lastName" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="lastName"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Lastname is required.
                </small>
              </div>
              <div className="form-group">
                <div className="text-xs">Name: <span className="bidder-name"/></div>
                <div className="text-xs">Email Id : <span className="bidder-email"/></div>
                <div className="text-xs">Cell Number : <span className="bidder-cell"/></div>
                <div className="text-xs">Available Tickets : <span className="bidder-tickets"/></div>
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
              <div className="cc-info" style={{xdisplay: 'none'}}>
                <style
                  dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n" }}/>
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
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name is required
                        and can't be empty
                      </small>
                      <small className="help-block" data-fv-validator="stringLength" data-fv-for="cardholdername"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name must be more
                        than 6 and less than 70 characters long
                      </small>
                      <small className="help-block" data-fv-validator="callback" data-fv-for="cardholdername"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name can not start
                        or end with white space
                      </small>
                    </div>
                    <div className="form-group has-feedback">
                      <label className="control-label">Credit Card Number</label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true"/></div>
                        <input type="number" className="form-control" id="cardnumber" placeholder="8888-8888-8888-8888"
                               maxLength={16} data-stripe="number" required="required" data-fv-field="cardnumber"/>
                      </div>
                      <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="cardnumber"
                         style={{display: 'none'}}/>
                      <div className="small text-danger js-error card_error number"/>
                      <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cardnumber"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number is required
                        and can't be empty
                      </small>
                      <small className="help-block" data-fv-validator="creditCard" data-fv-for="cardnumber"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number is invalid
                      </small>
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
                          <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="expYear"
                             style={{display: 'none'}}/><i
                          className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="expMonth"
                          style={{display: 'none'}}/>
                          <div className="small text-danger js-error card_error exp_year exp_month"/>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="expMonth"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration month is
                            required
                          </small>
                          <small className="help-block" data-fv-validator="digits" data-fv-for="expMonth"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration month can
                            contain digits only
                          </small>
                          <small className="help-block" data-fv-validator="callback" data-fv-for="expMonth"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Your card is Expired
                          </small>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="expYear"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration year is
                            required
                          </small>
                          <small className="help-block" data-fv-validator="digits" data-fv-for="expYear"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration year can
                            contain digits only
                          </small>
                          <small className="help-block" data-fv-validator="callback" data-fv-for="expYear"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}></small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group has-feedback">
                          <label className="control-label">CVV Number</label>
                          <div className="input-group">
                            <input type="number" className="form-control" maxLength={4} size={4} data-stripe="cvc"
                                   id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"/>
                          </div>
                          <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="cvv"
                             style={{display: 'none'}}/>
                          <div className="small text-danger js-error card_error cvc"/>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cvv"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV is required and can't
                            be empty
                          </small>
                          <small className="help-block" data-fv-validator="stringLength" data-fv-for="cvv"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV must be more than 4
                            and less than 3 characters long
                          </small>
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
              <button className="btn btn-white" onClick={()=>{this.setActiveView('select-action')}}>Back</button>
            </div>
          </view>
          <view name="submit-raffle-tickets" className={cx(this.state.activeViews === 'submit-raffle-tickets' && s.active)}>
            <h4 className="text-center"><strong>Submit Raffle Tickets</strong></h4>
            <form className="ajax-form validated fv-form fv-form-bootstrap"
                  action="/AccelEventsWebApp/events/jkazarian8/volunteer/submit-tickets" method="POST"
                  data-validation-fields="getRaffleSubmitValidationFields" data-onsuccess="handleBidSuccess"
                  data-validate-function="validateForm" data-switch-view="select-action"
                  data-view-name="submit-raffle-tickets" noValidate="novalidate">
              <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
              <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
                className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
              <div className="form-group has-feedback">
                <input type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                       className="form-control mrg-t-lg bidder-email" data-fv-field="email"/><i
                className="form-control-feedback" data-fv-icon-for="email" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="email"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Bidder email can't be empty
                </small>
                <small className="help-block" data-fv-validator="emailAddress" data-fv-for="email"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Invalid bidder email id
                </small>
              </div>
              <div className="form-group has-feedback">
                <div className="intl-tel-input allow-dropdown separate-dial-code iti-sdc-2">
                  <div className="flag-container">
                    <div className="selected-flag" tabIndex={0} title="Canada: +1">
                      <div className="iti-flag ca"/>
                      <div className="selected-dial-code">+1</div>
                      <div className="iti-arrow"/>
                    </div>
                    <ul className="country-list hide">
                      <li className="country preferred" data-dial-code={1} data-country-code="us">
                        <div className="flag-box">
                          <div className="iti-flag us"/>
                        </div>
                        <span className="country-name">United States</span><span className="dial-code">+1</span></li>
                      <li className="country preferred active" data-dial-code={1} data-country-code="ca">
                        <div className="flag-box">
                          <div className="iti-flag ca"/>
                        </div>
                        <span className="country-name">Canada</span><span className="dial-code">+1</span></li>
                      <li className="country preferred" data-dial-code={61} data-country-code="au">
                        <div className="flag-box">
                          <div className="iti-flag au"/>
                        </div>
                        <span className="country-name">Australia</span><span className="dial-code">+61</span></li>
                      <li className="country preferred" data-dial-code={91} data-country-code="in">
                        <div className="flag-box">
                          <div className="iti-flag in"/>
                        </div>
                        <span className="country-name">India (भारत)</span><span className="dial-code">+91</span></li>
                      <li className="divider"/>
                      <li className="country" data-dial-code={93} data-country-code="af">
                        <div className="flag-box">
                          <div className="iti-flag af"/>
                        </div>
                        <span className="country-name">Afghanistan (‫افغانستان‬‎)</span><span
                        className="dial-code">+93</span></li>
                      <li className="country" data-dial-code={355} data-country-code="al">
                        <div className="flag-box">
                          <div className="iti-flag al"/>
                        </div>
                        <span className="country-name">Albania (Shqipëri)</span><span className="dial-code">+355</span>
                      </li>
                      <li className="country" data-dial-code={213} data-country-code="dz">
                        <div className="flag-box">
                          <div className="iti-flag dz"/>
                        </div>
                        <span className="country-name">Algeria (‫الجزائر‬‎)</span><span
                        className="dial-code">+213</span></li>
                      <li className="country" data-dial-code={1684} data-country-code="as">
                        <div className="flag-box">
                          <div className="iti-flag as"/>
                        </div>
                        <span className="country-name">American Samoa</span><span className="dial-code">+1684</span>
                      </li>
                      <li className="country" data-dial-code={376} data-country-code="ad">
                        <div className="flag-box">
                          <div className="iti-flag ad"/>
                        </div>
                        <span className="country-name">Andorra</span><span className="dial-code">+376</span></li>
                      <li className="country" data-dial-code={244} data-country-code="ao">
                        <div className="flag-box">
                          <div className="iti-flag ao"/>
                        </div>
                        <span className="country-name">Angola</span><span className="dial-code">+244</span></li>
                      <li className="country" data-dial-code={1264} data-country-code="ai">
                        <div className="flag-box">
                          <div className="iti-flag ai"/>
                        </div>
                        <span className="country-name">Anguilla</span><span className="dial-code">+1264</span></li>
                      <li className="country" data-dial-code={1268} data-country-code="ag">
                        <div className="flag-box">
                          <div className="iti-flag ag"/>
                        </div>
                        <span className="country-name">Antigua and Barbuda</span><span
                        className="dial-code">+1268</span></li>
                      <li className="country" data-dial-code={54} data-country-code="ar">
                        <div className="flag-box">
                          <div className="iti-flag ar"/>
                        </div>
                        <span className="country-name">Argentina</span><span className="dial-code">+54</span></li>
                      <li className="country" data-dial-code={374} data-country-code="am">
                        <div className="flag-box">
                          <div className="iti-flag am"/>
                        </div>
                        <span className="country-name">Armenia (Հայաստան)</span><span className="dial-code">+374</span>
                      </li>
                      <li className="country" data-dial-code={297} data-country-code="aw">
                        <div className="flag-box">
                          <div className="iti-flag aw"/>
                        </div>
                        <span className="country-name">Aruba</span><span className="dial-code">+297</span></li>
                      <li className="country" data-dial-code={61} data-country-code="au">
                        <div className="flag-box">
                          <div className="iti-flag au"/>
                        </div>
                        <span className="country-name">Australia</span><span className="dial-code">+61</span></li>
                      <li className="country" data-dial-code={43} data-country-code="at">
                        <div className="flag-box">
                          <div className="iti-flag at"/>
                        </div>
                        <span className="country-name">Austria (Österreich)</span><span className="dial-code">+43</span>
                      </li>
                      <li className="country" data-dial-code={994} data-country-code="az">
                        <div className="flag-box">
                          <div className="iti-flag az"/>
                        </div>
                        <span className="country-name">Azerbaijan (Azərbaycan)</span><span
                        className="dial-code">+994</span></li>
                      <li className="country" data-dial-code={1242} data-country-code="bs">
                        <div className="flag-box">
                          <div className="iti-flag bs"/>
                        </div>
                        <span className="country-name">Bahamas</span><span className="dial-code">+1242</span></li>
                      <li className="country" data-dial-code={973} data-country-code="bh">
                        <div className="flag-box">
                          <div className="iti-flag bh"/>
                        </div>
                        <span className="country-name">Bahrain (‫البحرين‬‎)</span><span
                        className="dial-code">+973</span></li>
                      <li className="country" data-dial-code={880} data-country-code="bd">
                        <div className="flag-box">
                          <div className="iti-flag bd"/>
                        </div>
                        <span className="country-name">Bangladesh (বাংলাদেশ)</span><span
                        className="dial-code">+880</span></li>
                      <li className="country" data-dial-code={1246} data-country-code="bb">
                        <div className="flag-box">
                          <div className="iti-flag bb"/>
                        </div>
                        <span className="country-name">Barbados</span><span className="dial-code">+1246</span></li>
                      <li className="country" data-dial-code={375} data-country-code="by">
                        <div className="flag-box">
                          <div className="iti-flag by"/>
                        </div>
                        <span className="country-name">Belarus (Беларусь)</span><span className="dial-code">+375</span>
                      </li>
                      <li className="country" data-dial-code={32} data-country-code="be">
                        <div className="flag-box">
                          <div className="iti-flag be"/>
                        </div>
                        <span className="country-name">Belgium (België)</span><span className="dial-code">+32</span>
                      </li>
                      <li className="country" data-dial-code={501} data-country-code="bz">
                        <div className="flag-box">
                          <div className="iti-flag bz"/>
                        </div>
                        <span className="country-name">Belize</span><span className="dial-code">+501</span></li>
                      <li className="country" data-dial-code={229} data-country-code="bj">
                        <div className="flag-box">
                          <div className="iti-flag bj"/>
                        </div>
                        <span className="country-name">Benin (Bénin)</span><span className="dial-code">+229</span></li>
                      <li className="country" data-dial-code={1441} data-country-code="bm">
                        <div className="flag-box">
                          <div className="iti-flag bm"/>
                        </div>
                        <span className="country-name">Bermuda</span><span className="dial-code">+1441</span></li>
                      <li className="country" data-dial-code={975} data-country-code="bt">
                        <div className="flag-box">
                          <div className="iti-flag bt"/>
                        </div>
                        <span className="country-name">Bhutan (འབྲུག)</span><span className="dial-code">+975</span></li>
                      <li className="country" data-dial-code={591} data-country-code="bo">
                        <div className="flag-box">
                          <div className="iti-flag bo"/>
                        </div>
                        <span className="country-name">Bolivia</span><span className="dial-code">+591</span></li>
                      <li className="country" data-dial-code={387} data-country-code="ba">
                        <div className="flag-box">
                          <div className="iti-flag ba"/>
                        </div>
                        <span className="country-name">Bosnia and Herzegovina (Босна и Херцеговина)</span><span
                        className="dial-code">+387</span></li>
                      <li className="country" data-dial-code={267} data-country-code="bw">
                        <div className="flag-box">
                          <div className="iti-flag bw"/>
                        </div>
                        <span className="country-name">Botswana</span><span className="dial-code">+267</span></li>
                      <li className="country" data-dial-code={55} data-country-code="br">
                        <div className="flag-box">
                          <div className="iti-flag br"/>
                        </div>
                        <span className="country-name">Brazil (Brasil)</span><span className="dial-code">+55</span></li>
                      <li className="country" data-dial-code={246} data-country-code="io">
                        <div className="flag-box">
                          <div className="iti-flag io"/>
                        </div>
                        <span className="country-name">British Indian Ocean Territory</span><span className="dial-code">+246</span>
                      </li>
                      <li className="country" data-dial-code={1284} data-country-code="vg">
                        <div className="flag-box">
                          <div className="iti-flag vg"/>
                        </div>
                        <span className="country-name">British Virgin Islands</span><span
                        className="dial-code">+1284</span></li>
                      <li className="country" data-dial-code={673} data-country-code="bn">
                        <div className="flag-box">
                          <div className="iti-flag bn"/>
                        </div>
                        <span className="country-name">Brunei</span><span className="dial-code">+673</span></li>
                      <li className="country" data-dial-code={359} data-country-code="bg">
                        <div className="flag-box">
                          <div className="iti-flag bg"/>
                        </div>
                        <span className="country-name">Bulgaria (България)</span><span className="dial-code">+359</span>
                      </li>
                      <li className="country" data-dial-code={226} data-country-code="bf">
                        <div className="flag-box">
                          <div className="iti-flag bf"/>
                        </div>
                        <span className="country-name">Burkina Faso</span><span className="dial-code">+226</span></li>
                      <li className="country" data-dial-code={257} data-country-code="bi">
                        <div className="flag-box">
                          <div className="iti-flag bi"/>
                        </div>
                        <span className="country-name">Burundi (Uburundi)</span><span className="dial-code">+257</span>
                      </li>
                      <li className="country" data-dial-code={855} data-country-code="kh">
                        <div className="flag-box">
                          <div className="iti-flag kh"/>
                        </div>
                        <span className="country-name">Cambodia (កម្ពុជា)</span><span className="dial-code">+855</span>
                      </li>
                      <li className="country" data-dial-code={237} data-country-code="cm">
                        <div className="flag-box">
                          <div className="iti-flag cm"/>
                        </div>
                        <span className="country-name">Cameroon (Cameroun)</span><span className="dial-code">+237</span>
                      </li>
                      <li className="country" data-dial-code={1} data-country-code="ca">
                        <div className="flag-box">
                          <div className="iti-flag ca"/>
                        </div>
                        <span className="country-name">Canada</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={238} data-country-code="cv">
                        <div className="flag-box">
                          <div className="iti-flag cv"/>
                        </div>
                        <span className="country-name">Cape Verde (Kabu Verdi)</span><span
                        className="dial-code">+238</span></li>
                      <li className="country" data-dial-code={599} data-country-code="bq">
                        <div className="flag-box">
                          <div className="iti-flag bq"/>
                        </div>
                        <span className="country-name">Caribbean Netherlands</span><span
                        className="dial-code">+599</span></li>
                      <li className="country" data-dial-code={1345} data-country-code="ky">
                        <div className="flag-box">
                          <div className="iti-flag ky"/>
                        </div>
                        <span className="country-name">Cayman Islands</span><span className="dial-code">+1345</span>
                      </li>
                      <li className="country" data-dial-code={236} data-country-code="cf">
                        <div className="flag-box">
                          <div className="iti-flag cf"/>
                        </div>
                        <span className="country-name">Central African Republic (République centrafricaine)</span><span
                        className="dial-code">+236</span></li>
                      <li className="country" data-dial-code={235} data-country-code="td">
                        <div className="flag-box">
                          <div className="iti-flag td"/>
                        </div>
                        <span className="country-name">Chad (Tchad)</span><span className="dial-code">+235</span></li>
                      <li className="country" data-dial-code={56} data-country-code="cl">
                        <div className="flag-box">
                          <div className="iti-flag cl"/>
                        </div>
                        <span className="country-name">Chile</span><span className="dial-code">+56</span></li>
                      <li className="country" data-dial-code={86} data-country-code="cn">
                        <div className="flag-box">
                          <div className="iti-flag cn"/>
                        </div>
                        <span className="country-name">China (中国)</span><span className="dial-code">+86</span></li>
                      <li className="country" data-dial-code={61} data-country-code="cx">
                        <div className="flag-box">
                          <div className="iti-flag cx"/>
                        </div>
                        <span className="country-name">Christmas Island</span><span className="dial-code">+61</span>
                      </li>
                      <li className="country" data-dial-code={61} data-country-code="cc">
                        <div className="flag-box">
                          <div className="iti-flag cc"/>
                        </div>
                        <span className="country-name">Cocos (Keeling) Islands</span><span
                        className="dial-code">+61</span></li>
                      <li className="country" data-dial-code={57} data-country-code="co">
                        <div className="flag-box">
                          <div className="iti-flag co"/>
                        </div>
                        <span className="country-name">Colombia</span><span className="dial-code">+57</span></li>
                      <li className="country" data-dial-code={269} data-country-code="km">
                        <div className="flag-box">
                          <div className="iti-flag km"/>
                        </div>
                        <span className="country-name">Comoros (‫جزر القمر‬‎)</span><span
                        className="dial-code">+269</span></li>
                      <li className="country" data-dial-code={243} data-country-code="cd">
                        <div className="flag-box">
                          <div className="iti-flag cd"/>
                        </div>
                        <span className="country-name">Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)</span><span
                        className="dial-code">+243</span></li>
                      <li className="country" data-dial-code={242} data-country-code="cg">
                        <div className="flag-box">
                          <div className="iti-flag cg"/>
                        </div>
                        <span className="country-name">Congo (Republic) (Congo-Brazzaville)</span><span
                        className="dial-code">+242</span></li>
                      <li className="country" data-dial-code={682} data-country-code="ck">
                        <div className="flag-box">
                          <div className="iti-flag ck"/>
                        </div>
                        <span className="country-name">Cook Islands</span><span className="dial-code">+682</span></li>
                      <li className="country" data-dial-code={506} data-country-code="cr">
                        <div className="flag-box">
                          <div className="iti-flag cr"/>
                        </div>
                        <span className="country-name">Costa Rica</span><span className="dial-code">+506</span></li>
                      <li className="country" data-dial-code={225} data-country-code="ci">
                        <div className="flag-box">
                          <div className="iti-flag ci"/>
                        </div>
                        <span className="country-name">Côte d’Ivoire</span><span className="dial-code">+225</span></li>
                      <li className="country" data-dial-code={385} data-country-code="hr">
                        <div className="flag-box">
                          <div className="iti-flag hr"/>
                        </div>
                        <span className="country-name">Croatia (Hrvatska)</span><span className="dial-code">+385</span>
                      </li>
                      <li className="country" data-dial-code={53} data-country-code="cu">
                        <div className="flag-box">
                          <div className="iti-flag cu"/>
                        </div>
                        <span className="country-name">Cuba</span><span className="dial-code">+53</span></li>
                      <li className="country" data-dial-code={599} data-country-code="cw">
                        <div className="flag-box">
                          <div className="iti-flag cw"/>
                        </div>
                        <span className="country-name">Curaçao</span><span className="dial-code">+599</span></li>
                      <li className="country" data-dial-code={357} data-country-code="cy">
                        <div className="flag-box">
                          <div className="iti-flag cy"/>
                        </div>
                        <span className="country-name">Cyprus (Κύπρος)</span><span className="dial-code">+357</span>
                      </li>
                      <li className="country" data-dial-code={420} data-country-code="cz">
                        <div className="flag-box">
                          <div className="iti-flag cz"/>
                        </div>
                        <span className="country-name">Czech Republic (Česká republika)</span><span
                        className="dial-code">+420</span></li>
                      <li className="country" data-dial-code={45} data-country-code="dk">
                        <div className="flag-box">
                          <div className="iti-flag dk"/>
                        </div>
                        <span className="country-name">Denmark (Danmark)</span><span className="dial-code">+45</span>
                      </li>
                      <li className="country" data-dial-code={253} data-country-code="dj">
                        <div className="flag-box">
                          <div className="iti-flag dj"/>
                        </div>
                        <span className="country-name">Djibouti</span><span className="dial-code">+253</span></li>
                      <li className="country" data-dial-code={1767} data-country-code="dm">
                        <div className="flag-box">
                          <div className="iti-flag dm"/>
                        </div>
                        <span className="country-name">Dominica</span><span className="dial-code">+1767</span></li>
                      <li className="country" data-dial-code={1} data-country-code="do">
                        <div className="flag-box">
                          <div className="iti-flag do"/>
                        </div>
                        <span className="country-name">Dominican Republic (República Dominicana)</span><span
                        className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={593} data-country-code="ec">
                        <div className="flag-box">
                          <div className="iti-flag ec"/>
                        </div>
                        <span className="country-name">Ecuador</span><span className="dial-code">+593</span></li>
                      <li className="country" data-dial-code={20} data-country-code="eg">
                        <div className="flag-box">
                          <div className="iti-flag eg"/>
                        </div>
                        <span className="country-name">Egypt (‫مصر‬‎)</span><span className="dial-code">+20</span></li>
                      <li className="country" data-dial-code={503} data-country-code="sv">
                        <div className="flag-box">
                          <div className="iti-flag sv"/>
                        </div>
                        <span className="country-name">El Salvador</span><span className="dial-code">+503</span></li>
                      <li className="country" data-dial-code={240} data-country-code="gq">
                        <div className="flag-box">
                          <div className="iti-flag gq"/>
                        </div>
                        <span className="country-name">Equatorial Guinea (Guinea Ecuatorial)</span><span
                        className="dial-code">+240</span></li>
                      <li className="country" data-dial-code={291} data-country-code="er">
                        <div className="flag-box">
                          <div className="iti-flag er"/>
                        </div>
                        <span className="country-name">Eritrea</span><span className="dial-code">+291</span></li>
                      <li className="country" data-dial-code={372} data-country-code="ee">
                        <div className="flag-box">
                          <div className="iti-flag ee"/>
                        </div>
                        <span className="country-name">Estonia (Eesti)</span><span className="dial-code">+372</span>
                      </li>
                      <li className="country" data-dial-code={251} data-country-code="et">
                        <div className="flag-box">
                          <div className="iti-flag et"/>
                        </div>
                        <span className="country-name">Ethiopia</span><span className="dial-code">+251</span></li>
                      <li className="country" data-dial-code={500} data-country-code="fk">
                        <div className="flag-box">
                          <div className="iti-flag fk"/>
                        </div>
                        <span className="country-name">Falkland Islands (Islas Malvinas)</span><span
                        className="dial-code">+500</span></li>
                      <li className="country" data-dial-code={298} data-country-code="fo">
                        <div className="flag-box">
                          <div className="iti-flag fo"/>
                        </div>
                        <span className="country-name">Faroe Islands (Føroyar)</span><span
                        className="dial-code">+298</span></li>
                      <li className="country" data-dial-code={679} data-country-code="fj">
                        <div className="flag-box">
                          <div className="iti-flag fj"/>
                        </div>
                        <span className="country-name">Fiji</span><span className="dial-code">+679</span></li>
                      <li className="country" data-dial-code={358} data-country-code="fi">
                        <div className="flag-box">
                          <div className="iti-flag fi"/>
                        </div>
                        <span className="country-name">Finland (Suomi)</span><span className="dial-code">+358</span>
                      </li>
                      <li className="country" data-dial-code={33} data-country-code="fr">
                        <div className="flag-box">
                          <div className="iti-flag fr"/>
                        </div>
                        <span className="country-name">France</span><span className="dial-code">+33</span></li>
                      <li className="country" data-dial-code={594} data-country-code="gf">
                        <div className="flag-box">
                          <div className="iti-flag gf"/>
                        </div>
                        <span className="country-name">French Guiana (Guyane française)</span><span
                        className="dial-code">+594</span></li>
                      <li className="country" data-dial-code={689} data-country-code="pf">
                        <div className="flag-box">
                          <div className="iti-flag pf"/>
                        </div>
                        <span className="country-name">French Polynesia (Polynésie française)</span><span
                        className="dial-code">+689</span></li>
                      <li className="country" data-dial-code={241} data-country-code="ga">
                        <div className="flag-box">
                          <div className="iti-flag ga"/>
                        </div>
                        <span className="country-name">Gabon</span><span className="dial-code">+241</span></li>
                      <li className="country" data-dial-code={220} data-country-code="gm">
                        <div className="flag-box">
                          <div className="iti-flag gm"/>
                        </div>
                        <span className="country-name">Gambia</span><span className="dial-code">+220</span></li>
                      <li className="country" data-dial-code={995} data-country-code="ge">
                        <div className="flag-box">
                          <div className="iti-flag ge"/>
                        </div>
                        <span className="country-name">Georgia (საქართველო)</span><span
                        className="dial-code">+995</span></li>
                      <li className="country" data-dial-code={49} data-country-code="de">
                        <div className="flag-box">
                          <div className="iti-flag de"/>
                        </div>
                        <span className="country-name">Germany (Deutschland)</span><span
                        className="dial-code">+49</span></li>
                      <li className="country" data-dial-code={233} data-country-code="gh">
                        <div className="flag-box">
                          <div className="iti-flag gh"/>
                        </div>
                        <span className="country-name">Ghana (Gaana)</span><span className="dial-code">+233</span></li>
                      <li className="country" data-dial-code={350} data-country-code="gi">
                        <div className="flag-box">
                          <div className="iti-flag gi"/>
                        </div>
                        <span className="country-name">Gibraltar</span><span className="dial-code">+350</span></li>
                      <li className="country" data-dial-code={30} data-country-code="gr">
                        <div className="flag-box">
                          <div className="iti-flag gr"/>
                        </div>
                        <span className="country-name">Greece (Ελλάδα)</span><span className="dial-code">+30</span></li>
                      <li className="country" data-dial-code={299} data-country-code="gl">
                        <div className="flag-box">
                          <div className="iti-flag gl"/>
                        </div>
                        <span className="country-name">Greenland (Kalaallit Nunaat)</span><span className="dial-code">+299</span>
                      </li>
                      <li className="country" data-dial-code={1473} data-country-code="gd">
                        <div className="flag-box">
                          <div className="iti-flag gd"/>
                        </div>
                        <span className="country-name">Grenada</span><span className="dial-code">+1473</span></li>
                      <li className="country" data-dial-code={590} data-country-code="gp">
                        <div className="flag-box">
                          <div className="iti-flag gp"/>
                        </div>
                        <span className="country-name">Guadeloupe</span><span className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={1671} data-country-code="gu">
                        <div className="flag-box">
                          <div className="iti-flag gu"/>
                        </div>
                        <span className="country-name">Guam</span><span className="dial-code">+1671</span></li>
                      <li className="country" data-dial-code={502} data-country-code="gt">
                        <div className="flag-box">
                          <div className="iti-flag gt"/>
                        </div>
                        <span className="country-name">Guatemala</span><span className="dial-code">+502</span></li>
                      <li className="country" data-dial-code={44} data-country-code="gg">
                        <div className="flag-box">
                          <div className="iti-flag gg"/>
                        </div>
                        <span className="country-name">Guernsey</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={224} data-country-code="gn">
                        <div className="flag-box">
                          <div className="iti-flag gn"/>
                        </div>
                        <span className="country-name">Guinea (Guinée)</span><span className="dial-code">+224</span>
                      </li>
                      <li className="country" data-dial-code={245} data-country-code="gw">
                        <div className="flag-box">
                          <div className="iti-flag gw"/>
                        </div>
                        <span className="country-name">Guinea-Bissau (Guiné Bissau)</span><span className="dial-code">+245</span>
                      </li>
                      <li className="country" data-dial-code={592} data-country-code="gy">
                        <div className="flag-box">
                          <div className="iti-flag gy"/>
                        </div>
                        <span className="country-name">Guyana</span><span className="dial-code">+592</span></li>
                      <li className="country" data-dial-code={509} data-country-code="ht">
                        <div className="flag-box">
                          <div className="iti-flag ht"/>
                        </div>
                        <span className="country-name">Haiti</span><span className="dial-code">+509</span></li>
                      <li className="country" data-dial-code={504} data-country-code="hn">
                        <div className="flag-box">
                          <div className="iti-flag hn"/>
                        </div>
                        <span className="country-name">Honduras</span><span className="dial-code">+504</span></li>
                      <li className="country" data-dial-code={852} data-country-code="hk">
                        <div className="flag-box">
                          <div className="iti-flag hk"/>
                        </div>
                        <span className="country-name">Hong Kong (香港)</span><span className="dial-code">+852</span></li>
                      <li className="country" data-dial-code={36} data-country-code="hu">
                        <div className="flag-box">
                          <div className="iti-flag hu"/>
                        </div>
                        <span className="country-name">Hungary (Magyarország)</span><span
                        className="dial-code">+36</span></li>
                      <li className="country" data-dial-code={354} data-country-code="is">
                        <div className="flag-box">
                          <div className="iti-flag is"/>
                        </div>
                        <span className="country-name">Iceland (Ísland)</span><span className="dial-code">+354</span>
                      </li>
                      <li className="country" data-dial-code={91} data-country-code="in">
                        <div className="flag-box">
                          <div className="iti-flag in"/>
                        </div>
                        <span className="country-name">India (भारत)</span><span className="dial-code">+91</span></li>
                      <li className="country" data-dial-code={62} data-country-code="id">
                        <div className="flag-box">
                          <div className="iti-flag id"/>
                        </div>
                        <span className="country-name">Indonesia</span><span className="dial-code">+62</span></li>
                      <li className="country" data-dial-code={98} data-country-code="ir">
                        <div className="flag-box">
                          <div className="iti-flag ir"/>
                        </div>
                        <span className="country-name">Iran (‫ایران‬‎)</span><span className="dial-code">+98</span></li>
                      <li className="country" data-dial-code={964} data-country-code="iq">
                        <div className="flag-box">
                          <div className="iti-flag iq"/>
                        </div>
                        <span className="country-name">Iraq (‫العراق‬‎)</span><span className="dial-code">+964</span>
                      </li>
                      <li className="country" data-dial-code={353} data-country-code="ie">
                        <div className="flag-box">
                          <div className="iti-flag ie"/>
                        </div>
                        <span className="country-name">Ireland</span><span className="dial-code">+353</span></li>
                      <li className="country" data-dial-code={44} data-country-code="im">
                        <div className="flag-box">
                          <div className="iti-flag im"/>
                        </div>
                        <span className="country-name">Isle of Man</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={972} data-country-code="il">
                        <div className="flag-box">
                          <div className="iti-flag il"/>
                        </div>
                        <span className="country-name">Israel (‫ישראל‬‎)</span><span className="dial-code">+972</span>
                      </li>
                      <li className="country" data-dial-code={39} data-country-code="it">
                        <div className="flag-box">
                          <div className="iti-flag it"/>
                        </div>
                        <span className="country-name">Italy (Italia)</span><span className="dial-code">+39</span></li>
                      <li className="country" data-dial-code={1876} data-country-code="jm">
                        <div className="flag-box">
                          <div className="iti-flag jm"/>
                        </div>
                        <span className="country-name">Jamaica</span><span className="dial-code">+1876</span></li>
                      <li className="country" data-dial-code={81} data-country-code="jp">
                        <div className="flag-box">
                          <div className="iti-flag jp"/>
                        </div>
                        <span className="country-name">Japan (日本)</span><span className="dial-code">+81</span></li>
                      <li className="country" data-dial-code={44} data-country-code="je">
                        <div className="flag-box">
                          <div className="iti-flag je"/>
                        </div>
                        <span className="country-name">Jersey</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={962} data-country-code="jo">
                        <div className="flag-box">
                          <div className="iti-flag jo"/>
                        </div>
                        <span className="country-name">Jordan (‫الأردن‬‎)</span><span className="dial-code">+962</span>
                      </li>
                      <li className="country" data-dial-code={7} data-country-code="kz">
                        <div className="flag-box">
                          <div className="iti-flag kz"/>
                        </div>
                        <span className="country-name">Kazakhstan (Казахстан)</span><span
                        className="dial-code">+7</span></li>
                      <li className="country" data-dial-code={254} data-country-code="ke">
                        <div className="flag-box">
                          <div className="iti-flag ke"/>
                        </div>
                        <span className="country-name">Kenya</span><span className="dial-code">+254</span></li>
                      <li className="country" data-dial-code={686} data-country-code="ki">
                        <div className="flag-box">
                          <div className="iti-flag ki"/>
                        </div>
                        <span className="country-name">Kiribati</span><span className="dial-code">+686</span></li>
                      <li className="country" data-dial-code={383} data-country-code="xk">
                        <div className="flag-box">
                          <div className="iti-flag xk"/>
                        </div>
                        <span className="country-name">Kosovo</span><span className="dial-code">+383</span></li>
                      <li className="country" data-dial-code={965} data-country-code="kw">
                        <div className="flag-box">
                          <div className="iti-flag kw"/>
                        </div>
                        <span className="country-name">Kuwait (‫الكويت‬‎)</span><span className="dial-code">+965</span>
                      </li>
                      <li className="country" data-dial-code={996} data-country-code="kg">
                        <div className="flag-box">
                          <div className="iti-flag kg"/>
                        </div>
                        <span className="country-name">Kyrgyzstan (Кыргызстан)</span><span
                        className="dial-code">+996</span></li>
                      <li className="country" data-dial-code={856} data-country-code="la">
                        <div className="flag-box">
                          <div className="iti-flag la"/>
                        </div>
                        <span className="country-name">Laos (ລາວ)</span><span className="dial-code">+856</span></li>
                      <li className="country" data-dial-code={371} data-country-code="lv">
                        <div className="flag-box">
                          <div className="iti-flag lv"/>
                        </div>
                        <span className="country-name">Latvia (Latvija)</span><span className="dial-code">+371</span>
                      </li>
                      <li className="country" data-dial-code={961} data-country-code="lb">
                        <div className="flag-box">
                          <div className="iti-flag lb"/>
                        </div>
                        <span className="country-name">Lebanon (‫لبنان‬‎)</span><span className="dial-code">+961</span>
                      </li>
                      <li className="country" data-dial-code={266} data-country-code="ls">
                        <div className="flag-box">
                          <div className="iti-flag ls"/>
                        </div>
                        <span className="country-name">Lesotho</span><span className="dial-code">+266</span></li>
                      <li className="country" data-dial-code={231} data-country-code="lr">
                        <div className="flag-box">
                          <div className="iti-flag lr"/>
                        </div>
                        <span className="country-name">Liberia</span><span className="dial-code">+231</span></li>
                      <li className="country" data-dial-code={218} data-country-code="ly">
                        <div className="flag-box">
                          <div className="iti-flag ly"/>
                        </div>
                        <span className="country-name">Libya (‫ليبيا‬‎)</span><span className="dial-code">+218</span>
                      </li>
                      <li className="country" data-dial-code={423} data-country-code="li">
                        <div className="flag-box">
                          <div className="iti-flag li"/>
                        </div>
                        <span className="country-name">Liechtenstein</span><span className="dial-code">+423</span></li>
                      <li className="country" data-dial-code={370} data-country-code="lt">
                        <div className="flag-box">
                          <div className="iti-flag lt"/>
                        </div>
                        <span className="country-name">Lithuania (Lietuva)</span><span className="dial-code">+370</span>
                      </li>
                      <li className="country" data-dial-code={352} data-country-code="lu">
                        <div className="flag-box">
                          <div className="iti-flag lu"/>
                        </div>
                        <span className="country-name">Luxembourg</span><span className="dial-code">+352</span></li>
                      <li className="country" data-dial-code={853} data-country-code="mo">
                        <div className="flag-box">
                          <div className="iti-flag mo"/>
                        </div>
                        <span className="country-name">Macau (澳門)</span><span className="dial-code">+853</span></li>
                      <li className="country" data-dial-code={389} data-country-code="mk">
                        <div className="flag-box">
                          <div className="iti-flag mk"/>
                        </div>
                        <span className="country-name">Macedonia (FYROM) (Македонија)</span><span className="dial-code">+389</span>
                      </li>
                      <li className="country" data-dial-code={261} data-country-code="mg">
                        <div className="flag-box">
                          <div className="iti-flag mg"/>
                        </div>
                        <span className="country-name">Madagascar (Madagasikara)</span><span
                        className="dial-code">+261</span></li>
                      <li className="country" data-dial-code={265} data-country-code="mw">
                        <div className="flag-box">
                          <div className="iti-flag mw"/>
                        </div>
                        <span className="country-name">Malawi</span><span className="dial-code">+265</span></li>
                      <li className="country" data-dial-code={60} data-country-code="my">
                        <div className="flag-box">
                          <div className="iti-flag my"/>
                        </div>
                        <span className="country-name">Malaysia</span><span className="dial-code">+60</span></li>
                      <li className="country" data-dial-code={960} data-country-code="mv">
                        <div className="flag-box">
                          <div className="iti-flag mv"/>
                        </div>
                        <span className="country-name">Maldives</span><span className="dial-code">+960</span></li>
                      <li className="country" data-dial-code={223} data-country-code="ml">
                        <div className="flag-box">
                          <div className="iti-flag ml"/>
                        </div>
                        <span className="country-name">Mali</span><span className="dial-code">+223</span></li>
                      <li className="country" data-dial-code={356} data-country-code="mt">
                        <div className="flag-box">
                          <div className="iti-flag mt"/>
                        </div>
                        <span className="country-name">Malta</span><span className="dial-code">+356</span></li>
                      <li className="country" data-dial-code={692} data-country-code="mh">
                        <div className="flag-box">
                          <div className="iti-flag mh"/>
                        </div>
                        <span className="country-name">Marshall Islands</span><span className="dial-code">+692</span>
                      </li>
                      <li className="country" data-dial-code={596} data-country-code="mq">
                        <div className="flag-box">
                          <div className="iti-flag mq"/>
                        </div>
                        <span className="country-name">Martinique</span><span className="dial-code">+596</span></li>
                      <li className="country" data-dial-code={222} data-country-code="mr">
                        <div className="flag-box">
                          <div className="iti-flag mr"/>
                        </div>
                        <span className="country-name">Mauritania (‫موريتانيا‬‎)</span><span
                        className="dial-code">+222</span></li>
                      <li className="country" data-dial-code={230} data-country-code="mu">
                        <div className="flag-box">
                          <div className="iti-flag mu"/>
                        </div>
                        <span className="country-name">Mauritius (Moris)</span><span className="dial-code">+230</span>
                      </li>
                      <li className="country" data-dial-code={262} data-country-code="yt">
                        <div className="flag-box">
                          <div className="iti-flag yt"/>
                        </div>
                        <span className="country-name">Mayotte</span><span className="dial-code">+262</span></li>
                      <li className="country" data-dial-code={52} data-country-code="mx">
                        <div className="flag-box">
                          <div className="iti-flag mx"/>
                        </div>
                        <span className="country-name">Mexico (México)</span><span className="dial-code">+52</span></li>
                      <li className="country" data-dial-code={691} data-country-code="fm">
                        <div className="flag-box">
                          <div className="iti-flag fm"/>
                        </div>
                        <span className="country-name">Micronesia</span><span className="dial-code">+691</span></li>
                      <li className="country" data-dial-code={373} data-country-code="md">
                        <div className="flag-box">
                          <div className="iti-flag md"/>
                        </div>
                        <span className="country-name">Moldova (Republica Moldova)</span><span className="dial-code">+373</span>
                      </li>
                      <li className="country" data-dial-code={377} data-country-code="mc">
                        <div className="flag-box">
                          <div className="iti-flag mc"/>
                        </div>
                        <span className="country-name">Monaco</span><span className="dial-code">+377</span></li>
                      <li className="country" data-dial-code={976} data-country-code="mn">
                        <div className="flag-box">
                          <div className="iti-flag mn"/>
                        </div>
                        <span className="country-name">Mongolia (Монгол)</span><span className="dial-code">+976</span>
                      </li>
                      <li className="country" data-dial-code={382} data-country-code="me">
                        <div className="flag-box">
                          <div className="iti-flag me"/>
                        </div>
                        <span className="country-name">Montenegro (Crna Gora)</span><span
                        className="dial-code">+382</span></li>
                      <li className="country" data-dial-code={1664} data-country-code="ms">
                        <div className="flag-box">
                          <div className="iti-flag ms"/>
                        </div>
                        <span className="country-name">Montserrat</span><span className="dial-code">+1664</span></li>
                      <li className="country" data-dial-code={212} data-country-code="ma">
                        <div className="flag-box">
                          <div className="iti-flag ma"/>
                        </div>
                        <span className="country-name">Morocco (‫المغرب‬‎)</span><span className="dial-code">+212</span>
                      </li>
                      <li className="country" data-dial-code={258} data-country-code="mz">
                        <div className="flag-box">
                          <div className="iti-flag mz"/>
                        </div>
                        <span className="country-name">Mozambique (Moçambique)</span><span
                        className="dial-code">+258</span></li>
                      <li className="country" data-dial-code={95} data-country-code="mm">
                        <div className="flag-box">
                          <div className="iti-flag mm"/>
                        </div>
                        <span className="country-name">Myanmar (Burma) (မြန်မာ)</span><span
                        className="dial-code">+95</span></li>
                      <li className="country" data-dial-code={264} data-country-code="na">
                        <div className="flag-box">
                          <div className="iti-flag na"/>
                        </div>
                        <span className="country-name">Namibia (Namibië)</span><span className="dial-code">+264</span>
                      </li>
                      <li className="country" data-dial-code={674} data-country-code="nr">
                        <div className="flag-box">
                          <div className="iti-flag nr"/>
                        </div>
                        <span className="country-name">Nauru</span><span className="dial-code">+674</span></li>
                      <li className="country" data-dial-code={977} data-country-code="np">
                        <div className="flag-box">
                          <div className="iti-flag np"/>
                        </div>
                        <span className="country-name">Nepal (नेपाल)</span><span className="dial-code">+977</span></li>
                      <li className="country" data-dial-code={31} data-country-code="nl">
                        <div className="flag-box">
                          <div className="iti-flag nl"/>
                        </div>
                        <span className="country-name">Netherlands (Nederland)</span><span
                        className="dial-code">+31</span></li>
                      <li className="country" data-dial-code={687} data-country-code="nc">
                        <div className="flag-box">
                          <div className="iti-flag nc"/>
                        </div>
                        <span className="country-name">New Caledonia (Nouvelle-Calédonie)</span><span
                        className="dial-code">+687</span></li>
                      <li className="country" data-dial-code={64} data-country-code="nz">
                        <div className="flag-box">
                          <div className="iti-flag nz"/>
                        </div>
                        <span className="country-name">New Zealand</span><span className="dial-code">+64</span></li>
                      <li className="country" data-dial-code={505} data-country-code="ni">
                        <div className="flag-box">
                          <div className="iti-flag ni"/>
                        </div>
                        <span className="country-name">Nicaragua</span><span className="dial-code">+505</span></li>
                      <li className="country" data-dial-code={227} data-country-code="ne">
                        <div className="flag-box">
                          <div className="iti-flag ne"/>
                        </div>
                        <span className="country-name">Niger (Nijar)</span><span className="dial-code">+227</span></li>
                      <li className="country" data-dial-code={234} data-country-code="ng">
                        <div className="flag-box">
                          <div className="iti-flag ng"/>
                        </div>
                        <span className="country-name">Nigeria</span><span className="dial-code">+234</span></li>
                      <li className="country" data-dial-code={683} data-country-code="nu">
                        <div className="flag-box">
                          <div className="iti-flag nu"/>
                        </div>
                        <span className="country-name">Niue</span><span className="dial-code">+683</span></li>
                      <li className="country" data-dial-code={672} data-country-code="nf">
                        <div className="flag-box">
                          <div className="iti-flag nf"/>
                        </div>
                        <span className="country-name">Norfolk Island</span><span className="dial-code">+672</span></li>
                      <li className="country" data-dial-code={850} data-country-code="kp">
                        <div className="flag-box">
                          <div className="iti-flag kp"/>
                        </div>
                        <span className="country-name">North Korea (조선 민주주의 인민 공화국)</span><span className="dial-code">+850</span>
                      </li>
                      <li className="country" data-dial-code={1670} data-country-code="mp">
                        <div className="flag-box">
                          <div className="iti-flag mp"/>
                        </div>
                        <span className="country-name">Northern Mariana Islands</span><span
                        className="dial-code">+1670</span></li>
                      <li className="country" data-dial-code={47} data-country-code="no">
                        <div className="flag-box">
                          <div className="iti-flag no"/>
                        </div>
                        <span className="country-name">Norway (Norge)</span><span className="dial-code">+47</span></li>
                      <li className="country" data-dial-code={968} data-country-code="om">
                        <div className="flag-box">
                          <div className="iti-flag om"/>
                        </div>
                        <span className="country-name">Oman (‫عُمان‬‎)</span><span className="dial-code">+968</span>
                      </li>
                      <li className="country" data-dial-code={92} data-country-code="pk">
                        <div className="flag-box">
                          <div className="iti-flag pk"/>
                        </div>
                        <span className="country-name">Pakistan (‫پاکستان‬‎)</span><span
                        className="dial-code">+92</span></li>
                      <li className="country" data-dial-code={680} data-country-code="pw">
                        <div className="flag-box">
                          <div className="iti-flag pw"/>
                        </div>
                        <span className="country-name">Palau</span><span className="dial-code">+680</span></li>
                      <li className="country" data-dial-code={970} data-country-code="ps">
                        <div className="flag-box">
                          <div className="iti-flag ps"/>
                        </div>
                        <span className="country-name">Palestine (‫فلسطين‬‎)</span><span
                        className="dial-code">+970</span></li>
                      <li className="country" data-dial-code={507} data-country-code="pa">
                        <div className="flag-box">
                          <div className="iti-flag pa"/>
                        </div>
                        <span className="country-name">Panama (Panamá)</span><span className="dial-code">+507</span>
                      </li>
                      <li className="country" data-dial-code={675} data-country-code="pg">
                        <div className="flag-box">
                          <div className="iti-flag pg"/>
                        </div>
                        <span className="country-name">Papua New Guinea</span><span className="dial-code">+675</span>
                      </li>
                      <li className="country" data-dial-code={595} data-country-code="py">
                        <div className="flag-box">
                          <div className="iti-flag py"/>
                        </div>
                        <span className="country-name">Paraguay</span><span className="dial-code">+595</span></li>
                      <li className="country" data-dial-code={51} data-country-code="pe">
                        <div className="flag-box">
                          <div className="iti-flag pe"/>
                        </div>
                        <span className="country-name">Peru (Perú)</span><span className="dial-code">+51</span></li>
                      <li className="country" data-dial-code={63} data-country-code="ph">
                        <div className="flag-box">
                          <div className="iti-flag ph"/>
                        </div>
                        <span className="country-name">Philippines</span><span className="dial-code">+63</span></li>
                      <li className="country" data-dial-code={48} data-country-code="pl">
                        <div className="flag-box">
                          <div className="iti-flag pl"/>
                        </div>
                        <span className="country-name">Poland (Polska)</span><span className="dial-code">+48</span></li>
                      <li className="country" data-dial-code={351} data-country-code="pt">
                        <div className="flag-box">
                          <div className="iti-flag pt"/>
                        </div>
                        <span className="country-name">Portugal</span><span className="dial-code">+351</span></li>
                      <li className="country" data-dial-code={1} data-country-code="pr">
                        <div className="flag-box">
                          <div className="iti-flag pr"/>
                        </div>
                        <span className="country-name">Puerto Rico</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={974} data-country-code="qa">
                        <div className="flag-box">
                          <div className="iti-flag qa"/>
                        </div>
                        <span className="country-name">Qatar (‫قطر‬‎)</span><span className="dial-code">+974</span></li>
                      <li className="country" data-dial-code={262} data-country-code="re">
                        <div className="flag-box">
                          <div className="iti-flag re"/>
                        </div>
                        <span className="country-name">Réunion (La Réunion)</span><span
                        className="dial-code">+262</span></li>
                      <li className="country" data-dial-code={40} data-country-code="ro">
                        <div className="flag-box">
                          <div className="iti-flag ro"/>
                        </div>
                        <span className="country-name">Romania (România)</span><span className="dial-code">+40</span>
                      </li>
                      <li className="country" data-dial-code={7} data-country-code="ru">
                        <div className="flag-box">
                          <div className="iti-flag ru"/>
                        </div>
                        <span className="country-name">Russia (Россия)</span><span className="dial-code">+7</span></li>
                      <li className="country" data-dial-code={250} data-country-code="rw">
                        <div className="flag-box">
                          <div className="iti-flag rw"/>
                        </div>
                        <span className="country-name">Rwanda</span><span className="dial-code">+250</span></li>
                      <li className="country" data-dial-code={590} data-country-code="bl">
                        <div className="flag-box">
                          <div className="iti-flag bl"/>
                        </div>
                        <span className="country-name">Saint Barthélemy (Saint-Barthélemy)</span><span
                        className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={290} data-country-code="sh">
                        <div className="flag-box">
                          <div className="iti-flag sh"/>
                        </div>
                        <span className="country-name">Saint Helena</span><span className="dial-code">+290</span></li>
                      <li className="country" data-dial-code={1869} data-country-code="kn">
                        <div className="flag-box">
                          <div className="iti-flag kn"/>
                        </div>
                        <span className="country-name">Saint Kitts and Nevis</span><span
                        className="dial-code">+1869</span></li>
                      <li className="country" data-dial-code={1758} data-country-code="lc">
                        <div className="flag-box">
                          <div className="iti-flag lc"/>
                        </div>
                        <span className="country-name">Saint Lucia</span><span className="dial-code">+1758</span></li>
                      <li className="country" data-dial-code={590} data-country-code="mf">
                        <div className="flag-box">
                          <div className="iti-flag mf"/>
                        </div>
                        <span className="country-name">Saint Martin (Saint-Martin (partie française))</span><span
                        className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={508} data-country-code="pm">
                        <div className="flag-box">
                          <div className="iti-flag pm"/>
                        </div>
                        <span className="country-name">Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)</span><span
                        className="dial-code">+508</span></li>
                      <li className="country" data-dial-code={1784} data-country-code="vc">
                        <div className="flag-box">
                          <div className="iti-flag vc"/>
                        </div>
                        <span className="country-name">Saint Vincent and the Grenadines</span><span
                        className="dial-code">+1784</span></li>
                      <li className="country" data-dial-code={685} data-country-code="ws">
                        <div className="flag-box">
                          <div className="iti-flag ws"/>
                        </div>
                        <span className="country-name">Samoa</span><span className="dial-code">+685</span></li>
                      <li className="country" data-dial-code={378} data-country-code="sm">
                        <div className="flag-box">
                          <div className="iti-flag sm"/>
                        </div>
                        <span className="country-name">San Marino</span><span className="dial-code">+378</span></li>
                      <li className="country" data-dial-code={239} data-country-code="st">
                        <div className="flag-box">
                          <div className="iti-flag st"/>
                        </div>
                        <span className="country-name">São Tomé and Príncipe (São Tomé e Príncipe)</span><span
                        className="dial-code">+239</span></li>
                      <li className="country" data-dial-code={966} data-country-code="sa">
                        <div className="flag-box">
                          <div className="iti-flag sa"/>
                        </div>
                        <span className="country-name">Saudi Arabia (‫المملكة العربية السعودية‬‎)</span><span
                        className="dial-code">+966</span></li>
                      <li className="country" data-dial-code={221} data-country-code="sn">
                        <div className="flag-box">
                          <div className="iti-flag sn"/>
                        </div>
                        <span className="country-name">Senegal (Sénégal)</span><span className="dial-code">+221</span>
                      </li>
                      <li className="country" data-dial-code={381} data-country-code="rs">
                        <div className="flag-box">
                          <div className="iti-flag rs"/>
                        </div>
                        <span className="country-name">Serbia (Србија)</span><span className="dial-code">+381</span>
                      </li>
                      <li className="country" data-dial-code={248} data-country-code="sc">
                        <div className="flag-box">
                          <div className="iti-flag sc"/>
                        </div>
                        <span className="country-name">Seychelles</span><span className="dial-code">+248</span></li>
                      <li className="country" data-dial-code={232} data-country-code="sl">
                        <div className="flag-box">
                          <div className="iti-flag sl"/>
                        </div>
                        <span className="country-name">Sierra Leone</span><span className="dial-code">+232</span></li>
                      <li className="country" data-dial-code={65} data-country-code="sg">
                        <div className="flag-box">
                          <div className="iti-flag sg"/>
                        </div>
                        <span className="country-name">Singapore</span><span className="dial-code">+65</span></li>
                      <li className="country" data-dial-code={1721} data-country-code="sx">
                        <div className="flag-box">
                          <div className="iti-flag sx"/>
                        </div>
                        <span className="country-name">Sint Maarten</span><span className="dial-code">+1721</span></li>
                      <li className="country" data-dial-code={421} data-country-code="sk">
                        <div className="flag-box">
                          <div className="iti-flag sk"/>
                        </div>
                        <span className="country-name">Slovakia (Slovensko)</span><span
                        className="dial-code">+421</span></li>
                      <li className="country" data-dial-code={386} data-country-code="si">
                        <div className="flag-box">
                          <div className="iti-flag si"/>
                        </div>
                        <span className="country-name">Slovenia (Slovenija)</span><span
                        className="dial-code">+386</span></li>
                      <li className="country" data-dial-code={677} data-country-code="sb">
                        <div className="flag-box">
                          <div className="iti-flag sb"/>
                        </div>
                        <span className="country-name">Solomon Islands</span><span className="dial-code">+677</span>
                      </li>
                      <li className="country" data-dial-code={252} data-country-code="so">
                        <div className="flag-box">
                          <div className="iti-flag so"/>
                        </div>
                        <span className="country-name">Somalia (Soomaaliya)</span><span
                        className="dial-code">+252</span></li>
                      <li className="country" data-dial-code={27} data-country-code="za">
                        <div className="flag-box">
                          <div className="iti-flag za"/>
                        </div>
                        <span className="country-name">South Africa</span><span className="dial-code">+27</span></li>
                      <li className="country" data-dial-code={82} data-country-code="kr">
                        <div className="flag-box">
                          <div className="iti-flag kr"/>
                        </div>
                        <span className="country-name">South Korea (대한민국)</span><span className="dial-code">+82</span>
                      </li>
                      <li className="country" data-dial-code={211} data-country-code="ss">
                        <div className="flag-box">
                          <div className="iti-flag ss"/>
                        </div>
                        <span className="country-name">South Sudan (‫جنوب السودان‬‎)</span><span className="dial-code">+211</span>
                      </li>
                      <li className="country" data-dial-code={34} data-country-code="es">
                        <div className="flag-box">
                          <div className="iti-flag es"/>
                        </div>
                        <span className="country-name">Spain (España)</span><span className="dial-code">+34</span></li>
                      <li className="country" data-dial-code={94} data-country-code="lk">
                        <div className="flag-box">
                          <div className="iti-flag lk"/>
                        </div>
                        <span className="country-name">Sri Lanka (ශ්‍රී ලංකාව)</span><span
                        className="dial-code">+94</span></li>
                      <li className="country" data-dial-code={249} data-country-code="sd">
                        <div className="flag-box">
                          <div className="iti-flag sd"/>
                        </div>
                        <span className="country-name">Sudan (‫السودان‬‎)</span><span className="dial-code">+249</span>
                      </li>
                      <li className="country" data-dial-code={597} data-country-code="sr">
                        <div className="flag-box">
                          <div className="iti-flag sr"/>
                        </div>
                        <span className="country-name">Suriname</span><span className="dial-code">+597</span></li>
                      <li className="country" data-dial-code={47} data-country-code="sj">
                        <div className="flag-box">
                          <div className="iti-flag sj"/>
                        </div>
                        <span className="country-name">Svalbard and Jan Mayen</span><span
                        className="dial-code">+47</span></li>
                      <li className="country" data-dial-code={268} data-country-code="sz">
                        <div className="flag-box">
                          <div className="iti-flag sz"/>
                        </div>
                        <span className="country-name">Swaziland</span><span className="dial-code">+268</span></li>
                      <li className="country" data-dial-code={46} data-country-code="se">
                        <div className="flag-box">
                          <div className="iti-flag se"/>
                        </div>
                        <span className="country-name">Sweden (Sverige)</span><span className="dial-code">+46</span>
                      </li>
                      <li className="country" data-dial-code={41} data-country-code="ch">
                        <div className="flag-box">
                          <div className="iti-flag ch"/>
                        </div>
                        <span className="country-name">Switzerland (Schweiz)</span><span
                        className="dial-code">+41</span></li>
                      <li className="country" data-dial-code={963} data-country-code="sy">
                        <div className="flag-box">
                          <div className="iti-flag sy"/>
                        </div>
                        <span className="country-name">Syria (‫سوريا‬‎)</span><span className="dial-code">+963</span>
                      </li>
                      <li className="country" data-dial-code={886} data-country-code="tw">
                        <div className="flag-box">
                          <div className="iti-flag tw"/>
                        </div>
                        <span className="country-name">Taiwan (台灣)</span><span className="dial-code">+886</span></li>
                      <li className="country" data-dial-code={992} data-country-code="tj">
                        <div className="flag-box">
                          <div className="iti-flag tj"/>
                        </div>
                        <span className="country-name">Tajikistan</span><span className="dial-code">+992</span></li>
                      <li className="country" data-dial-code={255} data-country-code="tz">
                        <div className="flag-box">
                          <div className="iti-flag tz"/>
                        </div>
                        <span className="country-name">Tanzania</span><span className="dial-code">+255</span></li>
                      <li className="country" data-dial-code={66} data-country-code="th">
                        <div className="flag-box">
                          <div className="iti-flag th"/>
                        </div>
                        <span className="country-name">Thailand (ไทย)</span><span className="dial-code">+66</span></li>
                      <li className="country" data-dial-code={670} data-country-code="tl">
                        <div className="flag-box">
                          <div className="iti-flag tl"/>
                        </div>
                        <span className="country-name">Timor-Leste</span><span className="dial-code">+670</span></li>
                      <li className="country" data-dial-code={228} data-country-code="tg">
                        <div className="flag-box">
                          <div className="iti-flag tg"/>
                        </div>
                        <span className="country-name">Togo</span><span className="dial-code">+228</span></li>
                      <li className="country" data-dial-code={690} data-country-code="tk">
                        <div className="flag-box">
                          <div className="iti-flag tk"/>
                        </div>
                        <span className="country-name">Tokelau</span><span className="dial-code">+690</span></li>
                      <li className="country" data-dial-code={676} data-country-code="to">
                        <div className="flag-box">
                          <div className="iti-flag to"/>
                        </div>
                        <span className="country-name">Tonga</span><span className="dial-code">+676</span></li>
                      <li className="country" data-dial-code={1868} data-country-code="tt">
                        <div className="flag-box">
                          <div className="iti-flag tt"/>
                        </div>
                        <span className="country-name">Trinidad and Tobago</span><span
                        className="dial-code">+1868</span></li>
                      <li className="country" data-dial-code={216} data-country-code="tn">
                        <div className="flag-box">
                          <div className="iti-flag tn"/>
                        </div>
                        <span className="country-name">Tunisia (‫تونس‬‎)</span><span className="dial-code">+216</span>
                      </li>
                      <li className="country" data-dial-code={90} data-country-code="tr">
                        <div className="flag-box">
                          <div className="iti-flag tr"/>
                        </div>
                        <span className="country-name">Turkey (Türkiye)</span><span className="dial-code">+90</span>
                      </li>
                      <li className="country" data-dial-code={993} data-country-code="tm">
                        <div className="flag-box">
                          <div className="iti-flag tm"/>
                        </div>
                        <span className="country-name">Turkmenistan</span><span className="dial-code">+993</span></li>
                      <li className="country" data-dial-code={1649} data-country-code="tc">
                        <div className="flag-box">
                          <div className="iti-flag tc"/>
                        </div>
                        <span className="country-name">Turks and Caicos Islands</span><span
                        className="dial-code">+1649</span></li>
                      <li className="country" data-dial-code={688} data-country-code="tv">
                        <div className="flag-box">
                          <div className="iti-flag tv"/>
                        </div>
                        <span className="country-name">Tuvalu</span><span className="dial-code">+688</span></li>
                      <li className="country" data-dial-code={1340} data-country-code="vi">
                        <div className="flag-box">
                          <div className="iti-flag vi"/>
                        </div>
                        <span className="country-name">U.S. Virgin Islands</span><span
                        className="dial-code">+1340</span></li>
                      <li className="country" data-dial-code={256} data-country-code="ug">
                        <div className="flag-box">
                          <div className="iti-flag ug"/>
                        </div>
                        <span className="country-name">Uganda</span><span className="dial-code">+256</span></li>
                      <li className="country" data-dial-code={380} data-country-code="ua">
                        <div className="flag-box">
                          <div className="iti-flag ua"/>
                        </div>
                        <span className="country-name">Ukraine (Україна)</span><span className="dial-code">+380</span>
                      </li>
                      <li className="country" data-dial-code={971} data-country-code="ae">
                        <div className="flag-box">
                          <div className="iti-flag ae"/>
                        </div>
                        <span className="country-name">United Arab Emirates (‫الإمارات العربية المتحدة‬‎)</span><span
                        className="dial-code">+971</span></li>
                      <li className="country" data-dial-code={44} data-country-code="gb">
                        <div className="flag-box">
                          <div className="iti-flag gb"/>
                        </div>
                        <span className="country-name">United Kingdom</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={1} data-country-code="us">
                        <div className="flag-box">
                          <div className="iti-flag us"/>
                        </div>
                        <span className="country-name">United States</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={598} data-country-code="uy">
                        <div className="flag-box">
                          <div className="iti-flag uy"/>
                        </div>
                        <span className="country-name">Uruguay</span><span className="dial-code">+598</span></li>
                      <li className="country" data-dial-code={998} data-country-code="uz">
                        <div className="flag-box">
                          <div className="iti-flag uz"/>
                        </div>
                        <span className="country-name">Uzbekistan (Oʻzbekiston)</span><span
                        className="dial-code">+998</span></li>
                      <li className="country" data-dial-code={678} data-country-code="vu">
                        <div className="flag-box">
                          <div className="iti-flag vu"/>
                        </div>
                        <span className="country-name">Vanuatu</span><span className="dial-code">+678</span></li>
                      <li className="country" data-dial-code={39} data-country-code="va">
                        <div className="flag-box">
                          <div className="iti-flag va"/>
                        </div>
                        <span className="country-name">Vatican City (Città del Vaticano)</span><span
                        className="dial-code">+39</span></li>
                      <li className="country" data-dial-code={58} data-country-code="ve">
                        <div className="flag-box">
                          <div className="iti-flag ve"/>
                        </div>
                        <span className="country-name">Venezuela</span><span className="dial-code">+58</span></li>
                      <li className="country" data-dial-code={84} data-country-code="vn">
                        <div className="flag-box">
                          <div className="iti-flag vn"/>
                        </div>
                        <span className="country-name">Vietnam (Việt Nam)</span><span className="dial-code">+84</span>
                      </li>
                      <li className="country" data-dial-code={681} data-country-code="wf">
                        <div className="flag-box">
                          <div className="iti-flag wf"/>
                        </div>
                        <span className="country-name">Wallis and Futuna</span><span className="dial-code">+681</span>
                      </li>
                      <li className="country" data-dial-code={212} data-country-code="eh">
                        <div className="flag-box">
                          <div className="iti-flag eh"/>
                        </div>
                        <span className="country-name">Western Sahara (‫الصحراء الغربية‬‎)</span><span
                        className="dial-code">+212</span></li>
                      <li className="country" data-dial-code={967} data-country-code="ye">
                        <div className="flag-box">
                          <div className="iti-flag ye"/>
                        </div>
                        <span className="country-name">Yemen (‫اليمن‬‎)</span><span className="dial-code">+967</span>
                      </li>
                      <li className="country" data-dial-code={260} data-country-code="zm">
                        <div className="flag-box">
                          <div className="iti-flag zm"/>
                        </div>
                        <span className="country-name">Zambia</span><span className="dial-code">+260</span></li>
                      <li className="country" data-dial-code={263} data-country-code="zw">
                        <div className="flag-box">
                          <div className="iti-flag zw"/>
                        </div>
                        <span className="country-name">Zimbabwe</span><span className="dial-code">+263</span></li>
                      <li className="country" data-dial-code={358} data-country-code="ax">
                        <div className="flag-box">
                          <div className="iti-flag ax"/>
                        </div>
                        <span className="country-name">Åland Islands</span><span className="dial-code">+358</span></li>
                    </ul>
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
              <div className="form-group form-first-name hidden has-feedback">
                <input type="text" name="firstname" placeholder="First Name" autoComplete="off"
                       className="form-control mrg-t-lg first-name" data-fv-field="firstName"/><i
                className="form-control-feedback" data-fv-icon-for="firstName" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="firstName"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Firstname is required.
                </small>
              </div>
              <div className="form-group form-last-name hidden has-feedback">
                <input type="text" name="lastname" placeholder="Last Name" autoComplete="off"
                       className="form-control mrg-t-lg last-name" data-fv-field="lastName"/><i
                className="form-control-feedback" data-fv-icon-for="lastName" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="lastName"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Lastname is required.
                </small>
              </div>
              <div className="form-group">
                <div className="text-xs">Name: <span className="bidder-name"/></div>
                <div className="text-xs">Email Id : <span className="bidder-email"/></div>
                <div className="text-xs">Cell Number : <span className="bidder-cell"/></div>
                <div className="text-xs">Available Tickets : <span className="bidder-tickets"/></div>
              </div>
              <div className="form-group has-feedback">
                <input type="text" maxLength={3} name="itemCode" placeholder="Item Code" autoComplete="off"
                       className="form-control mrg-t-lg alpha-only" data-fv-field="itemCode"/><i
                className="form-control-feedback" data-fv-icon-for="itemCode" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="stringLength" data-fv-for="itemCode"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                </small>
              </div>
              <div className="form-group">
                <div className="text-xs">Item Name : <span className="item-name"/></div>
                <div className="text-xs"># Of Tickets Submitted: <span className="ticket-submitted"/></div>
              </div>
              <div className="form-group has-feedback">
                <input type="number" name="tickets" placeholder="Number Of Ticket" autoComplete="off"
                       className="form-control" data-fv-field="tickets"/><i className="form-control-feedback"
                                                                            data-fv-icon-for="tickets"
                                                                            style={{display: 'none'}}/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="tickets"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Please enter tickets you want to submit.
                </small>
                <small className="help-block" data-fv-validator="lessThan" data-fv-for="tickets"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Please enter Bidder email to submit
                  tickets.
                </small>
                <small className="help-block" data-fv-validator="integer" data-fv-for="tickets"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
                </small>
              </div>
              <div className="form-group">
                <button className="btn btn-block btn-success submit">Submit</button>
              </div>
            </form>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={()=>{this.setActiveView('select-action')}}>Back</button>
            </div>
          </view>
          <view name="purchase-event-tickets" className={cx(this.state.activeViews === 'purchase-event-tickets' && s.active)}>
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
              <button className="btn btn-white" onClick={()=>{this.setActiveView('select-action')}}>Back</button>
            </div>
          </view>
          <view name="ticket-checkout-tickets" className={cx(this.state.activeViews === 'ticket-checkout-tickets' && s.active)}>
            <div className="tickts"/>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={()=>{this.setActiveView('select-action')}}>Back</button>
            </div>
          </view>
          <view name="event-ticketing" className={cx(this.state.activeViews === 'event-ticketing' && s.active)}>
            <h4 className="text-center"><strong>Check in attendees</strong></h4>
            <input type="text" className="filter-attendee form-control" placeholder="Search..."/>
            <ul className="list-group attendees-list">
              <li className="list-group-item checked-in" data-barcode="43def9df-e531-4d29-a367-4cc72539b27d"
                  data-filter="jon kaz ` checked in">
                <span className="name">Jon Kaz</span><span
                className="status pull-right btn btn-success">Checked In</span>
              </li>
              <li className="list-group-item checked-in" data-barcode="8cec7686-5767-46a6-9dcc-1ac45f3c5a75"
                  data-filter="jon kaz ` checked in">
                <span className="name">Jon Kaz</span><span
                className="status pull-right btn btn-success">Checked In</span>
              </li>
              <li className="list-group-item booked" data-barcode="d62bb31a-15f3-44ec-8158-b9dd1c590531"
                  data-filter="jon kaz ` booked">
                <span className="name">Jon Kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="fe489fdd-4b9d-429f-a268-89caa2214e36"
                  data-filter="jon kaz ` booked">
                <span className="name">Jon Kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="fced9bfa-f584-47ff-a37d-3110db6bbf8a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a6f62c97-ed38-479d-aef4-c6a74cc2dde7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="96bdb70a-7753-4c13-8dfa-72e97e938b58"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a244d275-77c6-4e12-a3f2-b33047f63dbf"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="28fc1110-bde7-439c-a6c1-4dfdad5b59a5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d669d15b-0a3b-4a28-91cc-73108bbc7b17"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="35b9ab7f-866e-4bc0-8dcd-f09f7c9931fa"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="008189a8-d1a2-45f5-8592-c8458031c232"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3270d6b3-c842-4469-8828-124174005640"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4b2fd59b-0375-49bf-96b2-f31a900ab512"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7936191b-9347-419c-9a5f-0844a5945174"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="87dd627a-1089-4cd5-aefc-72cd6851a64f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c8957098-93da-40a8-9118-e00e84faf559"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="cd905b31-8e22-47a7-a1dc-0bd705a0b032"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="725a2797-eb87-43d2-b147-62361907091e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="227ffea5-6666-4127-ba01-16a9f078de0b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="569e9e83-ef53-4561-8cba-95cf74a60201"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7e314b63-aa70-4c5f-9270-87296f2b8be5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="89fd637e-0f95-47e5-8e68-360d30574973"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6eaeea42-f3f2-4b0a-9e2e-ab223e777abc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4a3d9a47-2515-4a7e-b616-d13d9f992f5b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0e345c06-726f-4205-9bff-f811079ca9f3"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e4f29943-9f34-4f6a-af1b-375cfc671a5e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="29215a02-b397-43ff-b7c5-715595d33f05"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f829842c-2ed7-4376-9d2b-72b95ce9ebbf"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="40dc55e9-d0fb-4eba-87af-6d8db67fd021"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="11313b6b-464b-4371-ae67-7c1d09ec0d05"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e02e57a3-9997-4384-a63e-6691dcfdafbc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="45826f48-7f41-40ff-ad0c-6b422699e658"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c37b79cd-2d14-4df8-b842-0684a88cc388"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3fff3698-4fe7-44e9-aa5f-ce06c2d7cd58"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="46066270-b9c9-4c08-a717-d54020df386b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8faebc25-9653-48ef-9ba1-4057f628c37e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a5c7f0cd-ab6d-48b2-9448-1ab287284cbc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f9d07eab-ca2b-4c86-b3a2-6f7fd796739e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b884a3c5-3cf3-469c-bc43-c237e1e2abcc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d1f79cac-0ceb-4694-b92d-698ab5d68dba"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7a39feae-1a5a-4c12-9c81-2b305ab764f4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5cbc0319-641c-4299-b94d-79f61ad59057"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="17b32365-8865-4c43-b375-d7f174ce7b7e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9c2cd027-5c9c-4aa9-a31d-ed3224f351ff"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="62e4b392-894e-4c27-9fb5-ec6d18b457e8"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a692b92f-9a81-4f3f-b145-6bbff5d990da"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="257ef0ee-7182-4adb-a6d8-3abc003e3201"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="47a8eee3-878b-49cf-bf22-4e7c51997279"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="02675088-0a09-4531-97df-3f55a22d108b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2aed646e-8242-415b-9e51-a7525c7dd986"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c77ffbe0-43f9-4340-8feb-771081962a84"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="bfffe51c-fd36-4813-b334-55200ba38a5c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a0b4dcfc-a552-4870-8c69-0d507c6ff048"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="160f2f0c-7661-447c-9f43-5581c23ed1c1"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8db9fae5-562b-411a-a8a3-d8d3fe26cb05"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="74c36c23-1ca5-40b8-baaa-7cd92bdfabf9"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b81285cb-172f-4e3a-947c-5979df8220db"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b26bc2fc-6251-480e-80db-6bc8f1caddca"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="df590803-a01b-4f81-9145-a99a09c34cf0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="41a46950-34a6-4ade-b8f9-ff52ec92972a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4c97e384-ff50-46da-914b-c69194df0b0a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9cdd2bac-1146-455b-8be3-56214512c2f2"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6d5eb0bb-82eb-4d8e-adcf-e20588e3961e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f771ecde-848f-4dbc-ad13-a4aa804cae65"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ebdfa04d-f774-4a59-80c6-21e8a95203d8"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ca376eeb-a5cb-47a0-9f45-5d232f8bb43f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b5bd78e5-7c95-4ad0-b94c-035de4d2e014"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="804a0f3e-4da4-4539-8161-ef43b7d28b74"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f58ef902-6ac5-4cef-82e1-700c7c8da1ec"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7f93e4f5-33d5-485a-ba89-75dd586e9cff"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="595cfee6-967a-4851-a940-45e40ffb9ac3"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="80f7ae9f-cf8b-4be7-93f8-42e78783c874"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0fd18e8f-f050-4646-8f81-bde3333ef328"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1b1eafce-7a83-434b-abb7-9f1644c2a195"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="72116fa1-b0a8-40bb-8d2d-8a784fe71812"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="dd3bd9e0-6d0a-4c61-9c8f-446c15135a44"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4a677c0b-82d8-4b25-83e0-ce9af5fd3b95"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f88283ee-e761-4e28-89ef-5a54dba7954b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="43c928fe-e7cc-4bc5-b3b1-852a41785ae4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4b32d889-96db-4d75-8489-f86220af7869"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="47af64b1-0724-4db4-8949-2b728908c974"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="68a8358f-a8c5-40cf-b6c8-76e39ce64ce0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="cd6d14e5-475f-4c1f-a4c2-12e60f5ca04f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e359d2b6-2957-48de-8b6f-0974dba804e3"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9842671f-87ff-4ac5-aa49-2a6f756f8293"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="364fe78c-2f09-49f0-a0b4-6309eb92a030"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="699eeb6e-956c-43ad-88d6-47bfb74e4a08"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6d8985af-5ac1-4efc-89d1-5c8d379839fb"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9dbd84e6-cdcd-4b7e-9ad0-ef9d67a041c5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d0a420a0-7f32-4454-a8dd-e48f0110f81c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1b3434de-438f-4551-b558-88ef00c31459"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="24530874-81fe-49dc-bca0-e05da11fb106"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="49164157-47d1-4254-9ba4-726888eb4e04"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="67bd7a18-c2fc-483f-bb0b-6e314ae0b3cd"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3bb03233-ce6a-4794-82e6-d6d1349b531c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="19db475b-8717-486a-894b-08d44953b79c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8c9655e7-ffb5-4c42-ae88-7c9077d42aac"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3688eaa8-03e9-4b17-a504-554c34cce7d2"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="effcdf1d-4f31-4900-803a-0ff00a0f6703"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="51bed648-43f2-4d0c-9c6e-e4008f354bda"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="191649fc-9819-441e-860b-fdc48ba0a7b8"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ac99cfc5-9644-48f6-829a-38de74721b8b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c72b15f9-c91c-41bb-8921-4d164cb60bbe"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="fa336c86-63ec-4677-8d23-4e1c692778ce"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7d205a44-583f-4aa2-8f2d-82a72c3d63a4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c40e576e-695f-44b4-b768-c404e871ed8c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2b3c8cef-6e31-45d4-93b7-ee22187e0b65"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c11c5cb0-3a9a-4e50-b4ba-4094f157c4a1"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="336cefb9-b43b-4051-87d7-33defd6d30a0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="317290b7-7e5d-4bb0-b847-5225aa479fdb"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="fdf8441a-b840-4606-9fc0-7d910952b4d0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f05e5fc8-6f8e-4443-8fb9-43d54f2cdc95"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f106a472-038f-40e1-82b1-0e182efb34f5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="59f08845-4f83-4510-a4b1-50ea96b0be0b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6c0d24c9-9883-4edd-95ac-4ed06c3846d7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8fff5116-e594-443c-8cba-3de9b39ec79e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c4ba741f-3f9e-42fa-a6a8-f74c777abf41"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="abec569c-f6bd-4f83-a967-5cc49ab9640f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e15bff9f-f0a3-4ccc-8a25-cfd639a86343"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="eadae175-4874-4cbf-b6fa-7d5b35464467"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0d8aa5c7-4761-4ff7-a559-21d8a7bc1c76"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d2327d3d-f8ff-48ce-8ea4-cc8b9ff831ec"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a14a659f-3ea8-4820-b24e-0181d42274f0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="af95a51b-b827-4ff4-85b1-d9abf6bd68b2"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ec33065f-7345-4ba5-a805-1ae9c7b0758c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c3a937a9-2f5e-4e83-860b-357d78bb154b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="721f6cb8-7938-4d89-82c2-f81050a07a04"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="778af2d6-a090-4ce6-ad65-f5a2bbf1e1f0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="166d707d-306a-443b-8904-7abfa3d54bac"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ef070ddd-d91f-4df0-bc9b-8026d3aad42a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="27402542-195f-4b39-9a27-0d96f0cdb238"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2b54ac9d-2843-42f1-b6a6-5a84ef7164a7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="86de8f75-2e3c-45c4-ac5c-67b1430b7284"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f238d234-e9c6-4d03-8980-37cd2e68d9ae"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e9f3b857-2a1d-4d3f-8076-0bdf264f63bc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8221fe0a-9766-45eb-a9ba-61a46574d8fc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7828c294-8ed8-4be8-a31a-abdbbd07a442"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a755c729-6897-4dea-ba64-0eda712da39e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4cf15552-3424-40da-b7f2-9879de2313c6"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6351773b-cb0e-4fea-8fa6-16942543bd6f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="74d3c01c-d6f2-4e42-96bd-a2f36706a208"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b956cf67-1cfd-42e8-8554-3f4a395c0c5c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="03dfab0d-3d72-49be-a08f-053f0c721d66"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1bfef0e6-518c-46ba-9159-6f923692904f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e51ceef2-0403-4cbf-ae1c-9c60d4cf1ce5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5c7b44d3-0454-44d6-9f91-49f3244db197"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5816f287-95ce-4ad7-8636-c8adc640e858"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="36622ad6-58b8-4b4a-a7ca-f73629d2499a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="363d3a37-c5b2-4120-9d91-822a5dd27e92"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6f2c78a2-6012-4b01-9cfd-0ebfcb0c6bf5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="00a9585f-4e3a-4621-a923-d9df82aa88ad"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="242ad3b2-fc43-4db8-8ff6-fd47f21e74da"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3e885dd5-9d18-4472-b22b-b7934bf00faa"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e90a8626-8c51-45d6-ac0c-5d5418775d24"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="95529b3c-f0c9-4f47-a154-fe86436a7882"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c4c6d53d-9319-438d-becc-8fe71faa02bf"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8d1662de-c09d-4ed7-9ba7-fe1b7668f787"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3c420dc8-9826-4f97-a466-58c81934a579"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1019fe41-3539-4e80-8e94-47c91d81f224"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4bf675a6-071c-436c-b57e-7533e5873e6c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ff277fc4-7af8-4f85-ba3d-a26cc8448d46"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ff87d23e-1c19-4b77-8408-ab293c0ff5df"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="27b60b16-fde1-4604-9ba2-0fa207b4526d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="bed407b5-f402-4c13-91c9-625bccc8a579"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="fd4f3e4d-4329-4513-bb48-fec2bf53b339"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="76dd2e58-6f5d-4dd7-8137-397e01e7d905"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a11ccc12-7e56-4b9d-8ff9-5c8b556945ce"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d4f0a7b8-687b-4e6f-856e-72e8c0657b50"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3ce89115-dbbf-49d5-9791-6aa5f53b78f5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="37d73f0c-4151-47b7-bf80-c3a4676f0aa5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="fc9b06a0-21e9-455e-abef-2dc5b74eaef6"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b8dafa00-59ab-4bdc-9adb-a3f64cfd04af"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e3c245d8-0373-4f98-b105-1960d5984334"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="be5c10e2-728f-49ef-aac5-691e58fa0574"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8bd1aca8-fba2-48c7-b82f-7b877e31e402"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3957bce4-2389-482a-8667-5b7ea40bbe7c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2916e325-e179-419e-b7b4-0d15fced9eb4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="43f48551-ab8a-4e2e-9c46-4088a23b4054"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="57cf05ff-42ea-42ae-be79-530ce4d244a5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="eaaa3dc1-e631-42a4-a979-d87df6a64cff"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ed049c6d-2063-49a7-a332-914111bba153"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="db5434e3-ef2b-428c-af78-092e5ae23932"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4eb14734-57c7-4663-a761-1acfb117dc3c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8ed79932-f255-45c2-99f1-9c7b22cb09a4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="361e7970-6105-4cdc-81dd-3f3e7925f78c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="728a854b-6214-4db9-bcb8-c1c285b7eaf0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4b6423af-b084-4218-ad8a-c362653a71da"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5ef513c5-3e4d-491f-ab70-d7d0b2af8c05"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4c0e43c6-5bac-4ee4-8938-45e5bbb0a167"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="846bdc7c-dce8-497e-88b6-352660287be3"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="df1ba2c8-ea86-41f9-9204-76bb2f0c70cc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6f6db285-e939-4e1d-8bda-942926fd1f21"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="76743290-8eed-44ac-8687-b2d871e07035"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="59dfa42e-9a4d-49cd-ad4f-44869fb1bb0a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6111c159-d79e-428f-b016-cc92ec697321"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7ab02efc-cf9b-4870-ac6e-e1ba967e05e3"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="bbb2002c-5cb8-427f-ad76-28ea1589daa1"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="bba87e34-792b-44b1-9f13-af2eeebe610b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d7f5cd68-ef62-4717-bb95-cce84c241f82"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c1168afd-ee73-4067-8d6b-133f9cf1b8df"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="02c96054-23d7-4f71-8904-d681a55eb8ab"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="abee619d-e0d4-4ed5-99ee-3938a9c9d619"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d34afd95-fe72-4cda-9c7f-92d18083c1d7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8697bb9e-c21d-4b08-aa73-e183c870db98"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="22fa13f8-b401-403a-a01c-ae02a7754ed6"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5f4d3341-338b-4395-a5d2-d868c7e333fd"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="78e9044e-18d0-4b18-85f3-9b5e85ee07ef"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="af00c070-cca3-464b-b5a9-8eaae7eac997"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="acb7d806-df69-4607-bfad-a9cc1ba594ce"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="12a19526-35c6-41da-a541-f76b8154264e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3f7d08fb-a2c5-41e4-8632-abe01d303dee"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="57927fbf-2db1-44bd-9242-b16b20b03b36"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2528479c-bd2c-4f1d-a206-e49ce7427160"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6f9612ef-7d41-41ce-890c-970d68a16370"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9f982128-f6df-4ff9-8fd6-c2a9d878f99b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2d19d9bb-47b9-4be9-9a27-1606dd11948b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ca7b2874-2ee4-46c0-a37b-101e91a71be0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="32e45c99-4e4a-4021-a046-60b10e877650"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d85502a6-9176-4aa3-b260-8e9d70a734ed"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5c25cd0f-dd71-4547-b2b7-7a82287a80ef"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6a14e9f7-6f35-476f-97fd-b4d527912459"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c02eec3d-c605-40dc-b243-bd07f6bdf8cc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="32cfa5ce-dd76-4bcf-842b-b2cd1b1cba9b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1771456e-8667-4392-acfb-b3334a97d852"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0e9c4078-a5a3-42b9-ba8c-cb8efb36e98c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="40cc26cf-24e7-409e-a476-165a41ae6ccf"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9ed51778-a1da-41b3-a7f0-dceeccf16cb7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1c888314-90f5-4e74-b28a-6ac74bce1e7c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="60d3de6a-a872-41f6-800c-85737114039e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2c2cc995-2c01-4270-a8f5-e6cce24c4ecd"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f28407aa-340c-434f-9480-eff5f7be222b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8f5dcc99-770a-4049-b7dc-697aecc84d6a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ce0160d8-1453-4e1d-9844-2ae32b2994f7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="20f5bf72-763b-4952-bbd9-b398d0b72746"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a16dce4b-d584-4daa-b1f0-1c288c4e29b4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="164640b4-516e-49c1-b20e-17456c6e28ef"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0fbffddc-3a22-4004-8470-b902c18cbbc9"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3b29d8bb-7aa1-40f8-bba8-fe9985613b59"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="592d1bb7-927c-4bf1-82e8-d790780d76e6"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0c7f6b10-6ccc-436c-bdfb-063be7744135"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f2c31cef-d345-43a5-be27-7f3850d2a170"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="53d33551-ec60-4c4f-b5c0-e8ee36ac19cd"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="fa7b775d-724c-4150-ad3a-407ecac56776"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1d096abc-f42c-449f-9eb3-133d93e88318"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ae24640a-1890-4119-a374-8bcdca20efa0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0a22f427-99b5-4c10-a1db-8a9ec4f70e1c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e7c973da-d1f6-4cb8-8e2f-e193c45cd72b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="38877084-0571-405d-bd92-9e61cfe2bcde"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="37677b70-7659-4e52-8d23-5a9f45c92140"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a7737200-984c-4b7d-aff5-a9989c8ed1a8"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8c455ca7-096b-40b0-af16-0f647bdb2892"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="db497900-5945-4265-943d-a4a10827b671"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="119d8fec-6dcd-4737-90d2-30a50cd3617a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="082932e4-38c7-43ce-835b-b30df8e1f1c7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0560e4ab-354f-4379-b785-108a7c75ff48"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d9e80a54-50b7-4270-b196-85ed19eb68bf"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f29d1772-e757-4c1c-b16f-ff49f5cf3742"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="14667674-28b3-4788-b71b-560d16370f97"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="36aece23-0f9a-4844-978d-885d464e2da3"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="26a9c7b2-dc69-42b1-952b-2d521b42ba03"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="15688873-59cd-4249-963a-0888b9c16732"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6f9b3d83-1f20-4142-a9a9-b1b5b0d27c05"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e0966745-1fd0-4f65-a0c8-98d34a5a5aa5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7c7ce95b-fd4c-4658-a3ad-170206b21b24"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2e65e3d1-818f-4631-a631-c1d3919ba0ef"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3a820aab-3821-43d1-a134-9e1832013beb"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4f55d308-f2da-4be4-b6de-68f0de707980"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d922b802-61cf-436e-abf2-e412d01d0a1c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="094a5a85-7e8d-4a6e-b6ed-1617a727a693"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="97479f21-49cd-4cf6-a6ba-55eaa4c6eba1"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c4c3baf5-0744-4ec0-887c-d21c9408e817"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="50656d15-7862-4639-8f18-3b6514d5c373"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8203067a-86cf-4b21-a115-0582a7e9a135"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d7ce4971-1738-4727-8458-77998995c884"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4ec8ee4e-4411-43bb-ac46-2b612f593eb6"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b152f8d4-543c-4fce-af55-379e5056815f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c8ee6448-8f63-401a-955f-29d1c2c21f39"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f0a17db8-de20-4e16-890e-c0a8dccfd9fd"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0281b774-c588-4538-a9b4-c01410c30782"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4a3e0a12-c80b-4379-9e0d-c134d7a1e6b7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9c2546f7-11a0-4226-8ab2-1684cabdefdf"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="89771d30-df71-4c23-bdb5-ebb6da0ebc6d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="bc3f7615-9df0-408c-b1d1-191755ad30c6"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="29758450-55a6-4069-a68b-228bf7793210"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="aa227cf3-1b53-4af4-a0f8-138d60675e85"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3d6e54b7-1c0a-4f70-8021-10503089f62b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="24fc1cbe-baf7-49df-9b4f-ed4a3b62b0a1"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="40509715-01e3-4318-97a5-655bd5df27e8"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="322a4f85-425e-4950-9f5d-a9132d120193"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="167acaad-50c9-4735-a128-9575e919e4a4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="965129b3-0864-43bf-98dd-bc5df7f77287"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3e916d4e-470f-4e65-82e1-58259f6ce72c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d7d097d8-6eff-4691-9146-c4c4ac3bca57"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ea58fc4e-02ab-4818-8442-1221d1f705c3"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d4bb5369-9b00-4502-8c2c-2035961ba396"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="bd661405-2c38-46ca-aa60-20339e40a757"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e6a4d8f6-7604-481c-b526-aa365376b3e7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="12915cb9-a1ea-440d-9722-5e765584ca58"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="21300684-1782-4ed7-b4d1-021f4360d47d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="574cdb12-5b4b-48da-a368-8e90f183adaf"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="01bbbf05-c9bc-45b7-aad5-27585d1dc6a9"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="39f544e9-7aef-4c4a-83be-f72aa4a09017"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="fdc713aa-efda-4d89-a5e6-ba9107515b39"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f64975c2-10ae-4ac4-8466-6f80ec396b6b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="35abd64d-b9a9-4605-a356-ae293ef0f012"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="178589d5-01e2-4b5a-8e95-f8a7b7876c39"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2a76dc98-e7cc-456d-9123-db9a2771efa2"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c8f1a524-fc4f-4709-80aa-458f001b27f7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8cc55bac-e1f6-417b-804b-4116fdbaf24a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a464692d-d397-4c1b-94de-c7aec52847fa"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d7aac9c4-d8c6-439e-8282-8b9c33a1e05a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4a9ab68b-e313-4b33-9e10-c23ea4bcafae"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0ab2064c-4d14-4c74-bb5c-77b5dcc01d4b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ebea0bf7-9fad-4134-b56e-d831bdc8d28e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="bf1b8bcd-6416-4184-a7d9-618648691047"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2cf59020-2307-48ee-8e66-7cf76e46403e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="03ef5b53-64f5-46a5-8c01-7f2a76856bf8"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9bae089a-e6bd-4d50-82b6-d2ed42284d7d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1f8fee73-9a0f-4073-a2ae-271cc51696ae"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b61b2f59-52a1-444b-a64e-5012dd871e0a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4091c760-3d71-4e1d-adba-0b86852170d9"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b6e12415-224b-4b4e-8199-569d3d9b6009"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="16779b13-129f-474a-8ef9-2fb2eeb2ee7d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2a23c885-ec2d-4094-a242-d79948e0fbb0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="417a1ecb-fc99-41c5-8243-43d22d33ac72"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="cbc9e0fb-c3ed-4f37-b217-5b7d627b4c94"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7939e434-a50f-4efe-b349-a31a0ce5789d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="03983d6f-50f3-4c08-9bc3-8acf7f7cc8fa"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="72dbbce3-0499-4d80-b1ad-c5c6d3c61e15"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="78ab2718-8ae2-4d15-905b-9648eeac9097"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5d81c4a7-bcd1-4b51-97ff-43433079f2e5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="486d62f9-eed4-4361-b309-b3fc08c93a09"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4df15e14-b62a-40ab-a082-7d86038f8561"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5c347297-4ff1-4e9e-8134-b6ec6b95c276"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="29532825-6e77-48cc-b6fb-aa010ae028c7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7fd54562-4f95-4555-9bd2-866d47efb172"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="61ac1098-b466-4ced-998f-2e5b16c6cdee"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="df8123a8-f727-4a6a-b124-abb3dead3340"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2833e9ec-bf76-4fa1-9f55-d180b5e87150"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="742d9366-5190-4921-a7d1-27038e101675"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f98e9fed-4793-4da3-9724-d32fdd10baeb"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2b218f8f-1a75-4234-90a5-dc061d703507"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c44b3bb5-ad0d-4d8e-96af-4726ce25e49c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5eb21300-4140-44c1-8afd-085c05ea9cd3"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="94e1d1d0-d665-4a53-bdf5-3788c95e062b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b8250940-b841-46c6-9227-8b70ae96649e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0a278fd8-8837-4a7e-a5dd-c57eda8a2e34"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9d07adcd-8689-4443-8464-9ea819ce2059"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d456efdf-2d5c-49a6-a342-e511ce5a96c3"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b4b62beb-b4d0-4302-8b53-5bc365909056"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="48a8e193-9d93-4014-a8c1-c1bfe7eb7067"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1fac6880-4d88-474f-bf83-5021b64a955f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="cc9bf86a-75ce-475b-aef2-abaeed8b9e8d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="779da589-6f43-4f78-9e0a-260df47ea5bd"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="29e8bcbf-d03b-414d-8da6-666a7af64bec"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c55c7e76-2f25-456e-87c8-9823cbd5f7d4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1885a757-85f9-4ec3-bc88-36085d3455b4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="428a89a3-80c5-4507-9a7e-5a7faaaf0b1d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="07b61233-721c-4f0b-8527-6f6280f6ddff"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0edc9afd-098d-42d3-bc5c-c2cd99f8c2f7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e667fefa-8557-405b-8097-6576fa691be0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="26eea44e-b649-4a05-b762-9f71a2c02445"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="94b5a35f-2e8f-4b02-8e75-51eaac8fcd67"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ef92a49f-6782-4efe-a219-e8905a39206c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d9c30215-f7ea-4a74-a34f-2bb1a20e0c2e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0d8ebf17-b918-4cbf-bf64-a1df4a418884"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="55f85dc3-7719-47cf-ae39-53382d351df1"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="67b1cea1-7ef0-4179-b55b-3a697b31e63d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9386328e-cab5-4220-b918-e14c2a6041c2"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9dff3e88-423f-42b4-aec8-cd69983eeb39"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0f05aebe-b1b3-46c9-a868-5713d02a2d8d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="93302164-1d05-4c41-afb7-cf3f7e340b4e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5e01dd92-2c0b-4854-81aa-bb4e380938d7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="366eaf7b-7656-4727-aff8-3f28c2789e15"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="26e556c3-7dbe-4606-9ad1-904eadeb25e4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="df3c32cd-63b3-4c03-9907-d853915b4cb1"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="adab9f07-7dba-4d1b-83bc-cb4a49ded69e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="96394202-cf24-4623-929c-8233faaceaf3"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="cb0cc8bd-80f5-45cf-bd6a-301b7c88399e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="43d36c5c-c557-4c52-bc69-bf860ea79f0c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5bf75491-549a-4643-8c06-0924c9eb96cd"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c5f2b47c-e95b-4cb2-a2f3-c07a678fa85a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="74b1b4e0-2a23-4593-a25e-b0b6d31f4816"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7958b1bb-77e4-49e5-9d3f-29b129ab396f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="375f7fc3-5be7-45d8-983e-d10a65ae0ceb"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8ad57d99-73a9-4bec-a740-147856ac1c6d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="59a76d42-086d-46d4-88be-86203f6c794e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9866a0dc-cbc5-4058-8662-c37cb758be0f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4a1438df-afed-4bb2-aaae-fd03fdbd6b52"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="697c9674-f2e2-4011-897a-d3c75cd4d76e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1fc62a74-62af-4b9d-8239-9bee9dceb4ba"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="946df8d4-4b67-4c21-a8d1-e106d5f140fc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="174d07d2-3d7d-48f1-b271-cbc7571a5051"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d7e4837f-8642-47a1-a4f3-a742555052bd"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="98ff7839-c72a-47e8-8cfb-71d7559b1ffc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d23d5b4a-3fff-46c7-aefa-ac74412d89bd"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6128f46a-f1af-4298-80c7-a0372a46cfa7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d9aa5395-998a-44a3-93fe-e2dd06461e4a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="966748fa-0783-4fa1-a1aa-dcd3902dc280"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="41a4b417-78a7-422e-a6bf-3c7e6449ef3e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="741aa840-a27f-4b7c-964f-ad03a61d4498"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f0d6e163-ba58-4e95-ad8e-1853e524e5ac"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0dbd8ed1-0fc2-424a-b235-a8dcc0b77f99"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d23b28d9-629d-4a0c-a8f4-5177218fd5b4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0b06d8d9-f282-4aec-8c61-8b9199e3c35d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="cbfd2b1d-a765-477a-9d82-483dc3d2eb51"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9de12a90-0745-4ecd-a37e-bad033e40544"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e415d08d-475f-4646-8cc7-2bce6e7b93c4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="15f073a1-f814-47c6-865d-4f0c0bcd56ac"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6d9c1d6d-4ae7-4888-ba8a-41407a87ce2a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1161bef7-f642-4042-9b67-441131c28cbf"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="87edfd0c-ccd6-427b-a118-41c38288df46"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3d2ada8f-bfc4-488a-87eb-85bf27ebd918"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9a02ce2f-ee35-4860-93eb-f63b1f20d4c6"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="24bcb99e-3b1a-4b78-8eb0-310e37aa065a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1848ec0a-99a0-4992-8dce-7448bbfe739f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a5918b34-2cee-4815-bda0-81e1ea74f6a2"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d9dbf2f5-d401-4fd5-8d3f-6cdf1c031692"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="135e2c8b-66e5-4359-9065-ce4bef957713"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="58feeb0f-8778-4ad2-97fc-370126173e20"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3539d9ba-b2dd-4a8f-9d34-fc76417fd170"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="922ce411-2dc9-4334-b5b3-c30677007813"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="951de17c-b64e-4d55-b0c2-533cef81b8ef"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a8634cf5-075f-4dfc-91de-edfecb10efdf"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b726f2ee-2854-40ae-8ebe-9d7b4d69cd6e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7ef1ddfa-c882-40b7-8760-ac4af98bac1b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="19bd46e9-4373-4bc2-b523-4f205b89fb26"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d71133ff-ed02-4590-bfad-d79b44daeb61"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f8ade757-89c2-4ed6-babd-f9fafcd0955a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0c86640c-5ac5-434d-a111-0fd2f2c00650"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b753358b-38ce-4645-bbd4-8d59ef055e45"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="19d4cab8-cc82-41c9-a745-343a68d68575"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8b7577fe-141a-475b-92dc-37bd69a1cd8f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1b690c2e-7bd6-461c-9e38-2ace25eb8325"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5ddb2c55-24ad-4425-a737-063a695af6d0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f186bf3a-02de-4d94-9a9f-124b1ade4f74"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9a55914e-6536-4e69-b267-698ae384b940"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="34428856-070d-4418-8c3a-5dd5beee0051"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9eef7101-1de1-413a-9d05-1c377720f7d8"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f5e5706c-db46-46b5-81f1-9ccd283a9ceb"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="da03aba2-2583-4e71-b182-3f995d54d7a1"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="98c198d6-f45d-447f-9c28-a0759a6a9350"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="dd04ad26-3a63-4861-b81a-adab1bcb91bc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="99d6ca1e-74fc-490a-ba72-ad676c90127d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="076a9711-bed6-4117-9a70-572acb783d44"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="cebd5a9c-3e0e-4805-8644-3ae2aebc7e0c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ce3d9ac2-0f9a-47e1-a031-7445d5d74abd"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a64ab0b2-0422-4b85-b328-9f70f4947d64"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="dc192c3b-0891-480e-8323-376eaa814fa7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ebc1ea24-ea50-4f62-897c-2349484bd6de"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="13e6f355-d512-4e3b-bd3b-ab85654edf5e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6fe64752-a381-4101-9a4b-9b03c4262835"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="dbecb00f-6c99-4f89-8493-c233728cf64e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="967f9b15-8e57-45db-9ca3-445f508034b5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a59395c9-9771-471b-affa-3a6f90cf31a9"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6b919c2a-1b79-4ef0-907f-8adfe9c1fa7d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="cb9480ac-dad4-4c08-8b3a-a29c7d35e1e5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="dc819ca4-184f-48c2-a09a-ad6904fa20cf"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="17147ff3-d0da-48cb-9604-6db2d7c972f5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="42ad1da3-2904-453d-8b83-579e733583b7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="158a5caa-b709-4807-bac7-0e402ad2d689"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="bd326563-0217-4eb8-8be1-82b34a01f73e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="64c039d8-4082-4f21-8b87-0b0e37db8b5b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="dfdb79c4-b6e8-442e-bae7-44128c0478f8"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="80d7436e-331e-41b5-bdff-6043717bc6c4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c9dfbfa8-262d-4ca4-9ab2-5d9927d1cf78"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b39168e5-e93f-4116-b240-abf64acf2c06"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="65f24ab7-95aa-4afa-80f8-29f4941e428a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3b1562f0-2299-4974-b236-b12526592383"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ee7fb442-bba7-4677-9995-53ce1d908015"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e73f1305-f770-4287-a46a-ff7f9151ab39"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="62fb7fe2-ffc6-4dfd-aa72-b33c4502fabd"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e3c19a28-22cc-4a96-ad0b-e3debc5ddc8c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="90d38c6b-2676-4ec0-9cf8-653932dfc3e8"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d2e00958-ac06-4a91-9691-f224c747444a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="eb20db49-d6b5-4a15-b9ff-de1cd7102b54"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b285d9e3-0936-4b5e-b5a1-487ff2b5207f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="928c7d8a-17aa-41c7-a873-f3c589d118fb"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="148718ae-0f7f-450b-817c-3e0ec9948815"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="951a92c9-c723-415c-935c-41d32ffc5e8a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9c10d3e3-2c97-4c7d-9cf6-cc0eab76e30c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6ad04f44-27ce-4fcd-8fa1-de2c98f267a0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8c88885b-94be-4a13-9ff1-a8a785291f23"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="82c1a9b3-48fb-4353-bec8-b5c46331444a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="66762a83-2d9a-434e-9757-dff414773a68"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c4ef4568-a5e4-4c63-8d26-64419b87ca23"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="fb8acbb7-461e-4e14-99b0-9ee2c29d75c2"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a1d635d5-a4bc-4a4e-b7d8-3058cfaebc8a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item checked-in" data-barcode="08b3e140-79e2-42b9-b612-e17f479892b8"
                  data-filter="jon kaz ` checked in">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-success">Checked In</span>
              </li>
              <li className="list-group-item booked" data-barcode="a68d56c2-b427-4829-a4f4-4e84e4cd1ed0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8aec0beb-4fc6-45cc-803d-d05113a801e4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="dedf40e6-346b-4010-b346-32d8c04ba055"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="cbcd3fa9-b09a-4b11-91d2-70101126ff80"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0dd6dea6-8013-48db-a456-f89e5867e66a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e5122e34-12f5-445e-8745-189153540f0f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d83c9189-927f-40dd-9d6e-7947888edc8c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4c3ac6c3-66c0-42cd-a4cb-80b120b8f553"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="505fe3e7-d0d9-47b5-b844-22b9c67c9fae"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f11580e1-e970-4488-8bfe-bf924f70bb5e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e9da694a-f965-44b9-a830-3f46b9e302a8"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="50b9aa52-2718-4c12-b648-bd4d1c274baf"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="12296f8b-9d7c-4a45-89e6-3e07beed762e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="bdde0f64-717f-48bc-b696-09c0009dfec0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a81aec9c-6563-47fe-ad27-d707e0b33e48"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ee758428-8461-48f6-a7d8-408b212c5c58"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="37377153-e5f1-4cc1-a2a5-d33984d9a32b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="1467ada7-a85f-480c-bd09-fcae30f2b55e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="71a0e924-c562-4226-8294-945894770993"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="13e9c6ad-f727-45de-948d-eff20a0712e9"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c35ad8ca-c032-4077-9e60-bc75761db0ad"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2c77d91d-a02b-4ebe-93d6-8631f12d9fab"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e4f31d33-f648-42e4-89c9-9dd04e564b9d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d42b9a3e-e38c-4a62-8979-85b08b080b7a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8b3d06f7-3787-4853-9b91-a33a491c0284"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="39c5ff3f-382d-4ec5-88b5-06a69bb5f981"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ccd4b363-eb0e-4985-9441-1bf2ceca310c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d896b0a7-d5d6-481b-83b2-cdfc09dad127"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a5c39f87-15e3-4f18-bca8-8a1c2f9bc5f3"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="326e1e25-605d-4a43-af61-544c3eaaf87a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="433dc3cf-2c7e-4365-8968-1898778f4d6c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a0ccda74-a136-41f5-8a47-e420aa383302"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f30561db-b5aa-4e73-b6bb-e34e0ea82915"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="acf5333b-9554-4e44-a6c4-82a3c5fb443e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0fb5bfa3-02ed-470d-8da1-73e0bc546c77"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="38c30a47-96da-47b6-bc70-878a41a77c35"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="17098304-ee48-411b-a027-913d00b28042"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b889754b-f831-48ab-a463-febf4c980a64"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="31df953d-def9-4814-9d12-491da3b73d62"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="dd3959ae-d1f2-459e-a5fe-875bf987bfb2"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="669d0d4a-9478-4f82-b110-6861b1c66f99"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b16fb715-7e18-4d58-a4ac-43243c40f5ae"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c6c988ec-0877-4dee-b8c7-06e6b8a4b448"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3af736e8-42f9-4704-aa1a-09c38b86eb0b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="98371ad5-1671-412a-bd74-c2ae48a0922f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="09f68b7f-e918-4945-bcdf-ce747b87b645"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b043f0f0-e0bd-466b-b346-d7ca0efea0fc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8db7b9b3-af0c-41ee-bc59-3fe836bf6e05"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="183cf0e2-5b26-46e7-8a62-f51ff286cfa4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="706b9b84-36ad-46d1-b592-2f956dfc92cb"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="905dfd79-c112-4d13-9545-aada92767ee1"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="cc2c7867-57e1-4106-adf0-966cce7049b5"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="62088787-5f3a-4e82-9150-d2b5d8207034"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="bc7fd701-22b2-4b4b-b7f1-6b755eb2b455"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="69a36948-21aa-4e50-ab39-cb528221d781"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="60c40975-5224-4ad3-ae7d-37c7f3c1271a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="120a835b-87f3-4e9e-ab0a-50432033a7f4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="36060533-03aa-44a9-b878-c5dfba863e34"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="7e4c9998-1d02-4a93-93ee-0be285aa366a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c94bbfb0-cc3a-40bf-98b5-1f990baf04f1"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="da3b19fc-cb6a-496e-934e-575cc3fc05ee"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0aee4a19-bcd6-4fbb-ab54-0e07a24e47ec"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="46ee6104-57b1-4a4c-8ed6-83bfed505c72"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="acf9f69d-f38d-4bcc-a1cd-a05a93af70e4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ed92bea2-6509-4d5e-bd39-e676d306f207"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="738e3b92-9ac9-4649-aeab-c72052ff1e9d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f54b5725-fbf1-40fc-a9c9-56892d8ea1a7"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c0273aae-e4da-45fa-998c-9310f7383908"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="8d750e68-36cb-4bde-b9ac-90678ce9f17e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3f7acf53-8a81-49a1-9eaa-aa3548e1c7ca"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="04d356a2-b517-4fb2-aa77-dd03c06a70ce"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c9fb31e7-eb86-4608-a86b-50f802c15b0d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="78acee1b-d921-457d-bcfc-08341349b2b1"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="784f28a8-07cb-488c-89bc-4206853e131a"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="a4d80d14-ee72-4352-839d-d316253de2e1"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="94545143-caff-4d74-92d1-7ea49cf71749"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2f5c18db-0dda-4758-8fcf-57441518b848"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b866d092-ec8f-4ed9-b88f-7d74f710506c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="d1433aed-445d-49a1-a3d3-4f0d25dab810"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9f53c51c-cef2-41c8-8cd0-f41d4e923724"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="e8d97209-f7db-41e3-b208-e59025a4871d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c424c3e8-bca6-43b7-8574-09b786bd68dc"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="db4eefd7-db2c-4e37-b683-ceb574511f81"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="762f2023-a314-4418-bdd9-06f451c58977"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="2a6fc0a7-b3a8-4165-ab3c-1d25feb88094"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="9a70f81d-2798-4691-94dd-f216acc791a9"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="05bfd4f4-9868-4f09-9f5c-cda5996924fa"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="50790da9-7ada-430d-847f-2516727929d6"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="f8876bc9-dada-44fe-8994-e8658a692908"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ffc373f4-1be7-4748-af32-31802616cd3c"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0282d666-f529-4a4a-a675-225fa14fdbd0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6dbe4bde-6aef-46ed-83d3-bf4c7a23e99f"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="3554dd36-f922-4fb1-9022-916dc17fc2f9"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b55213e5-9f43-4ed8-ba8a-71c4106113fd"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="5f64cd32-d3e7-4fdf-a9d6-a5fc2eaef47b"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="ccc0ff1d-fadc-45fe-98d2-22bc0906782d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="89be3125-e4f6-4acc-8cf5-8225736c05d3"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="72c23f10-13a8-47e0-9cfb-1b49570e64b0"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4bbb249a-f41f-4773-b03e-cc0da8cb3e16"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="6a1e5ff1-6fc2-4640-bfa8-4a4d8fc3c5d4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="75d3dfd8-6785-44bf-a26a-82ec7741d12e"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="b3a5bc34-a3e1-4a24-914b-9e6bb2a51eed"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="11ccfe32-f9be-4f5b-a158-ff5771aa1ea4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="c7de35d1-0eef-4c2f-8994-25aa2bed306d"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="0e97149a-e86b-46eb-9ecd-0c8c205fde43"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="31eb5844-2196-421d-8c09-013285d76b35"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="de85db0c-e839-458c-9550-f37b5b185fb4"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="4628e347-5ce5-4599-8414-9ddfef2dba07"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="bc36b73f-a358-41c6-aca9-195c64453f51"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
              <li className="list-group-item booked" data-barcode="dd7b494b-384a-4dbc-a082-8a0faea0a8fa"
                  data-filter="jon kaz ` booked">
                <span className="name">jon kaz</span><span
                className="status pull-right btn btn-warning">Registered</span>
              </li>
            </ul>
            <div className="form-group text-center">
              <button className="btn btn-white" onClick={()=>{this.setActiveView('select-action')}}>Back</button>
            </div>
          </view>
          <view name="donate" className={cx(this.state.activeViews === 'donate' && s.active)}>
            <h4 className="text-center"><strong>Donate</strong></h4>
            <form className="ajax-form validated fv-form fv-form-bootstrap" method="POST"
                  action="/AccelEventsWebApp/events/jkazarian8/volunteer/donate"
                  data-validation-fields="getDonateValidationFields" data-onsuccess="handleBidSuccess"
                  data-validate-function="validateForm" data-switch-view="select-action" data-view-name="donate"
                  noValidate="novalidate">
              <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
              <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
                className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
              <div className="form-group has-feedback">
                <input type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                       className="form-control mrg-t-lg bidder-email" data-fv-field="email"/><i
                className="form-control-feedback" data-fv-icon-for="email" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="email"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Bidder email can't be empty
                </small>
                <small className="help-block" data-fv-validator="emailAddress" data-fv-for="email"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Invalid bidder email id
                </small>
              </div>
              <div className="form-group has-feedback">
                <div className="intl-tel-input allow-dropdown separate-dial-code iti-sdc-2">
                  <div className="flag-container">
                    <div className="selected-flag" tabIndex={0} title="Canada: +1">
                      <div className="iti-flag ca"/>
                      <div className="selected-dial-code">+1</div>
                      <div className="iti-arrow"/>
                    </div>
                    <ul className="country-list hide">
                      <li className="country preferred" data-dial-code={1} data-country-code="us">
                        <div className="flag-box">
                          <div className="iti-flag us"/>
                        </div>
                        <span className="country-name">United States</span><span className="dial-code">+1</span></li>
                      <li className="country preferred active" data-dial-code={1} data-country-code="ca">
                        <div className="flag-box">
                          <div className="iti-flag ca"/>
                        </div>
                        <span className="country-name">Canada</span><span className="dial-code">+1</span></li>
                      <li className="country preferred" data-dial-code={61} data-country-code="au">
                        <div className="flag-box">
                          <div className="iti-flag au"/>
                        </div>
                        <span className="country-name">Australia</span><span className="dial-code">+61</span></li>
                      <li className="country preferred" data-dial-code={91} data-country-code="in">
                        <div className="flag-box">
                          <div className="iti-flag in"/>
                        </div>
                        <span className="country-name">India (भारत)</span><span className="dial-code">+91</span></li>
                      <li className="divider"/>
                      <li className="country" data-dial-code={93} data-country-code="af">
                        <div className="flag-box">
                          <div className="iti-flag af"/>
                        </div>
                        <span className="country-name">Afghanistan (‫افغانستان‬‎)</span><span
                        className="dial-code">+93</span></li>
                      <li className="country" data-dial-code={355} data-country-code="al">
                        <div className="flag-box">
                          <div className="iti-flag al"/>
                        </div>
                        <span className="country-name">Albania (Shqipëri)</span><span className="dial-code">+355</span>
                      </li>
                      <li className="country" data-dial-code={213} data-country-code="dz">
                        <div className="flag-box">
                          <div className="iti-flag dz"/>
                        </div>
                        <span className="country-name">Algeria (‫الجزائر‬‎)</span><span
                        className="dial-code">+213</span></li>
                      <li className="country" data-dial-code={1684} data-country-code="as">
                        <div className="flag-box">
                          <div className="iti-flag as"/>
                        </div>
                        <span className="country-name">American Samoa</span><span className="dial-code">+1684</span>
                      </li>
                      <li className="country" data-dial-code={376} data-country-code="ad">
                        <div className="flag-box">
                          <div className="iti-flag ad"/>
                        </div>
                        <span className="country-name">Andorra</span><span className="dial-code">+376</span></li>
                      <li className="country" data-dial-code={244} data-country-code="ao">
                        <div className="flag-box">
                          <div className="iti-flag ao"/>
                        </div>
                        <span className="country-name">Angola</span><span className="dial-code">+244</span></li>
                      <li className="country" data-dial-code={1264} data-country-code="ai">
                        <div className="flag-box">
                          <div className="iti-flag ai"/>
                        </div>
                        <span className="country-name">Anguilla</span><span className="dial-code">+1264</span></li>
                      <li className="country" data-dial-code={1268} data-country-code="ag">
                        <div className="flag-box">
                          <div className="iti-flag ag"/>
                        </div>
                        <span className="country-name">Antigua and Barbuda</span><span
                        className="dial-code">+1268</span></li>
                      <li className="country" data-dial-code={54} data-country-code="ar">
                        <div className="flag-box">
                          <div className="iti-flag ar"/>
                        </div>
                        <span className="country-name">Argentina</span><span className="dial-code">+54</span></li>
                      <li className="country" data-dial-code={374} data-country-code="am">
                        <div className="flag-box">
                          <div className="iti-flag am"/>
                        </div>
                        <span className="country-name">Armenia (Հայաստան)</span><span className="dial-code">+374</span>
                      </li>
                      <li className="country" data-dial-code={297} data-country-code="aw">
                        <div className="flag-box">
                          <div className="iti-flag aw"/>
                        </div>
                        <span className="country-name">Aruba</span><span className="dial-code">+297</span></li>
                      <li className="country" data-dial-code={61} data-country-code="au">
                        <div className="flag-box">
                          <div className="iti-flag au"/>
                        </div>
                        <span className="country-name">Australia</span><span className="dial-code">+61</span></li>
                      <li className="country" data-dial-code={43} data-country-code="at">
                        <div className="flag-box">
                          <div className="iti-flag at"/>
                        </div>
                        <span className="country-name">Austria (Österreich)</span><span className="dial-code">+43</span>
                      </li>
                      <li className="country" data-dial-code={994} data-country-code="az">
                        <div className="flag-box">
                          <div className="iti-flag az"/>
                        </div>
                        <span className="country-name">Azerbaijan (Azərbaycan)</span><span
                        className="dial-code">+994</span></li>
                      <li className="country" data-dial-code={1242} data-country-code="bs">
                        <div className="flag-box">
                          <div className="iti-flag bs"/>
                        </div>
                        <span className="country-name">Bahamas</span><span className="dial-code">+1242</span></li>
                      <li className="country" data-dial-code={973} data-country-code="bh">
                        <div className="flag-box">
                          <div className="iti-flag bh"/>
                        </div>
                        <span className="country-name">Bahrain (‫البحرين‬‎)</span><span
                        className="dial-code">+973</span></li>
                      <li className="country" data-dial-code={880} data-country-code="bd">
                        <div className="flag-box">
                          <div className="iti-flag bd"/>
                        </div>
                        <span className="country-name">Bangladesh (বাংলাদেশ)</span><span
                        className="dial-code">+880</span></li>
                      <li className="country" data-dial-code={1246} data-country-code="bb">
                        <div className="flag-box">
                          <div className="iti-flag bb"/>
                        </div>
                        <span className="country-name">Barbados</span><span className="dial-code">+1246</span></li>
                      <li className="country" data-dial-code={375} data-country-code="by">
                        <div className="flag-box">
                          <div className="iti-flag by"/>
                        </div>
                        <span className="country-name">Belarus (Беларусь)</span><span className="dial-code">+375</span>
                      </li>
                      <li className="country" data-dial-code={32} data-country-code="be">
                        <div className="flag-box">
                          <div className="iti-flag be"/>
                        </div>
                        <span className="country-name">Belgium (België)</span><span className="dial-code">+32</span>
                      </li>
                      <li className="country" data-dial-code={501} data-country-code="bz">
                        <div className="flag-box">
                          <div className="iti-flag bz"/>
                        </div>
                        <span className="country-name">Belize</span><span className="dial-code">+501</span></li>
                      <li className="country" data-dial-code={229} data-country-code="bj">
                        <div className="flag-box">
                          <div className="iti-flag bj"/>
                        </div>
                        <span className="country-name">Benin (Bénin)</span><span className="dial-code">+229</span></li>
                      <li className="country" data-dial-code={1441} data-country-code="bm">
                        <div className="flag-box">
                          <div className="iti-flag bm"/>
                        </div>
                        <span className="country-name">Bermuda</span><span className="dial-code">+1441</span></li>
                      <li className="country" data-dial-code={975} data-country-code="bt">
                        <div className="flag-box">
                          <div className="iti-flag bt"/>
                        </div>
                        <span className="country-name">Bhutan (འབྲུག)</span><span className="dial-code">+975</span></li>
                      <li className="country" data-dial-code={591} data-country-code="bo">
                        <div className="flag-box">
                          <div className="iti-flag bo"/>
                        </div>
                        <span className="country-name">Bolivia</span><span className="dial-code">+591</span></li>
                      <li className="country" data-dial-code={387} data-country-code="ba">
                        <div className="flag-box">
                          <div className="iti-flag ba"/>
                        </div>
                        <span className="country-name">Bosnia and Herzegovina (Босна и Херцеговина)</span><span
                        className="dial-code">+387</span></li>
                      <li className="country" data-dial-code={267} data-country-code="bw">
                        <div className="flag-box">
                          <div className="iti-flag bw"/>
                        </div>
                        <span className="country-name">Botswana</span><span className="dial-code">+267</span></li>
                      <li className="country" data-dial-code={55} data-country-code="br">
                        <div className="flag-box">
                          <div className="iti-flag br"/>
                        </div>
                        <span className="country-name">Brazil (Brasil)</span><span className="dial-code">+55</span></li>
                      <li className="country" data-dial-code={246} data-country-code="io">
                        <div className="flag-box">
                          <div className="iti-flag io"/>
                        </div>
                        <span className="country-name">British Indian Ocean Territory</span><span className="dial-code">+246</span>
                      </li>
                      <li className="country" data-dial-code={1284} data-country-code="vg">
                        <div className="flag-box">
                          <div className="iti-flag vg"/>
                        </div>
                        <span className="country-name">British Virgin Islands</span><span
                        className="dial-code">+1284</span></li>
                      <li className="country" data-dial-code={673} data-country-code="bn">
                        <div className="flag-box">
                          <div className="iti-flag bn"/>
                        </div>
                        <span className="country-name">Brunei</span><span className="dial-code">+673</span></li>
                      <li className="country" data-dial-code={359} data-country-code="bg">
                        <div className="flag-box">
                          <div className="iti-flag bg"/>
                        </div>
                        <span className="country-name">Bulgaria (България)</span><span className="dial-code">+359</span>
                      </li>
                      <li className="country" data-dial-code={226} data-country-code="bf">
                        <div className="flag-box">
                          <div className="iti-flag bf"/>
                        </div>
                        <span className="country-name">Burkina Faso</span><span className="dial-code">+226</span></li>
                      <li className="country" data-dial-code={257} data-country-code="bi">
                        <div className="flag-box">
                          <div className="iti-flag bi"/>
                        </div>
                        <span className="country-name">Burundi (Uburundi)</span><span className="dial-code">+257</span>
                      </li>
                      <li className="country" data-dial-code={855} data-country-code="kh">
                        <div className="flag-box">
                          <div className="iti-flag kh"/>
                        </div>
                        <span className="country-name">Cambodia (កម្ពុជា)</span><span className="dial-code">+855</span>
                      </li>
                      <li className="country" data-dial-code={237} data-country-code="cm">
                        <div className="flag-box">
                          <div className="iti-flag cm"/>
                        </div>
                        <span className="country-name">Cameroon (Cameroun)</span><span className="dial-code">+237</span>
                      </li>
                      <li className="country" data-dial-code={1} data-country-code="ca">
                        <div className="flag-box">
                          <div className="iti-flag ca"/>
                        </div>
                        <span className="country-name">Canada</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={238} data-country-code="cv">
                        <div className="flag-box">
                          <div className="iti-flag cv"/>
                        </div>
                        <span className="country-name">Cape Verde (Kabu Verdi)</span><span
                        className="dial-code">+238</span></li>
                      <li className="country" data-dial-code={599} data-country-code="bq">
                        <div className="flag-box">
                          <div className="iti-flag bq"/>
                        </div>
                        <span className="country-name">Caribbean Netherlands</span><span
                        className="dial-code">+599</span></li>
                      <li className="country" data-dial-code={1345} data-country-code="ky">
                        <div className="flag-box">
                          <div className="iti-flag ky"/>
                        </div>
                        <span className="country-name">Cayman Islands</span><span className="dial-code">+1345</span>
                      </li>
                      <li className="country" data-dial-code={236} data-country-code="cf">
                        <div className="flag-box">
                          <div className="iti-flag cf"/>
                        </div>
                        <span className="country-name">Central African Republic (République centrafricaine)</span><span
                        className="dial-code">+236</span></li>
                      <li className="country" data-dial-code={235} data-country-code="td">
                        <div className="flag-box">
                          <div className="iti-flag td"/>
                        </div>
                        <span className="country-name">Chad (Tchad)</span><span className="dial-code">+235</span></li>
                      <li className="country" data-dial-code={56} data-country-code="cl">
                        <div className="flag-box">
                          <div className="iti-flag cl"/>
                        </div>
                        <span className="country-name">Chile</span><span className="dial-code">+56</span></li>
                      <li className="country" data-dial-code={86} data-country-code="cn">
                        <div className="flag-box">
                          <div className="iti-flag cn"/>
                        </div>
                        <span className="country-name">China (中国)</span><span className="dial-code">+86</span></li>
                      <li className="country" data-dial-code={61} data-country-code="cx">
                        <div className="flag-box">
                          <div className="iti-flag cx"/>
                        </div>
                        <span className="country-name">Christmas Island</span><span className="dial-code">+61</span>
                      </li>
                      <li className="country" data-dial-code={61} data-country-code="cc">
                        <div className="flag-box">
                          <div className="iti-flag cc"/>
                        </div>
                        <span className="country-name">Cocos (Keeling) Islands</span><span
                        className="dial-code">+61</span></li>
                      <li className="country" data-dial-code={57} data-country-code="co">
                        <div className="flag-box">
                          <div className="iti-flag co"/>
                        </div>
                        <span className="country-name">Colombia</span><span className="dial-code">+57</span></li>
                      <li className="country" data-dial-code={269} data-country-code="km">
                        <div className="flag-box">
                          <div className="iti-flag km"/>
                        </div>
                        <span className="country-name">Comoros (‫جزر القمر‬‎)</span><span
                        className="dial-code">+269</span></li>
                      <li className="country" data-dial-code={243} data-country-code="cd">
                        <div className="flag-box">
                          <div className="iti-flag cd"/>
                        </div>
                        <span className="country-name">Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)</span><span
                        className="dial-code">+243</span></li>
                      <li className="country" data-dial-code={242} data-country-code="cg">
                        <div className="flag-box">
                          <div className="iti-flag cg"/>
                        </div>
                        <span className="country-name">Congo (Republic) (Congo-Brazzaville)</span><span
                        className="dial-code">+242</span></li>
                      <li className="country" data-dial-code={682} data-country-code="ck">
                        <div className="flag-box">
                          <div className="iti-flag ck"/>
                        </div>
                        <span className="country-name">Cook Islands</span><span className="dial-code">+682</span></li>
                      <li className="country" data-dial-code={506} data-country-code="cr">
                        <div className="flag-box">
                          <div className="iti-flag cr"/>
                        </div>
                        <span className="country-name">Costa Rica</span><span className="dial-code">+506</span></li>
                      <li className="country" data-dial-code={225} data-country-code="ci">
                        <div className="flag-box">
                          <div className="iti-flag ci"/>
                        </div>
                        <span className="country-name">Côte d’Ivoire</span><span className="dial-code">+225</span></li>
                      <li className="country" data-dial-code={385} data-country-code="hr">
                        <div className="flag-box">
                          <div className="iti-flag hr"/>
                        </div>
                        <span className="country-name">Croatia (Hrvatska)</span><span className="dial-code">+385</span>
                      </li>
                      <li className="country" data-dial-code={53} data-country-code="cu">
                        <div className="flag-box">
                          <div className="iti-flag cu"/>
                        </div>
                        <span className="country-name">Cuba</span><span className="dial-code">+53</span></li>
                      <li className="country" data-dial-code={599} data-country-code="cw">
                        <div className="flag-box">
                          <div className="iti-flag cw"/>
                        </div>
                        <span className="country-name">Curaçao</span><span className="dial-code">+599</span></li>
                      <li className="country" data-dial-code={357} data-country-code="cy">
                        <div className="flag-box">
                          <div className="iti-flag cy"/>
                        </div>
                        <span className="country-name">Cyprus (Κύπρος)</span><span className="dial-code">+357</span>
                      </li>
                      <li className="country" data-dial-code={420} data-country-code="cz">
                        <div className="flag-box">
                          <div className="iti-flag cz"/>
                        </div>
                        <span className="country-name">Czech Republic (Česká republika)</span><span
                        className="dial-code">+420</span></li>
                      <li className="country" data-dial-code={45} data-country-code="dk">
                        <div className="flag-box">
                          <div className="iti-flag dk"/>
                        </div>
                        <span className="country-name">Denmark (Danmark)</span><span className="dial-code">+45</span>
                      </li>
                      <li className="country" data-dial-code={253} data-country-code="dj">
                        <div className="flag-box">
                          <div className="iti-flag dj"/>
                        </div>
                        <span className="country-name">Djibouti</span><span className="dial-code">+253</span></li>
                      <li className="country" data-dial-code={1767} data-country-code="dm">
                        <div className="flag-box">
                          <div className="iti-flag dm"/>
                        </div>
                        <span className="country-name">Dominica</span><span className="dial-code">+1767</span></li>
                      <li className="country" data-dial-code={1} data-country-code="do">
                        <div className="flag-box">
                          <div className="iti-flag do"/>
                        </div>
                        <span className="country-name">Dominican Republic (República Dominicana)</span><span
                        className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={593} data-country-code="ec">
                        <div className="flag-box">
                          <div className="iti-flag ec"/>
                        </div>
                        <span className="country-name">Ecuador</span><span className="dial-code">+593</span></li>
                      <li className="country" data-dial-code={20} data-country-code="eg">
                        <div className="flag-box">
                          <div className="iti-flag eg"/>
                        </div>
                        <span className="country-name">Egypt (‫مصر‬‎)</span><span className="dial-code">+20</span></li>
                      <li className="country" data-dial-code={503} data-country-code="sv">
                        <div className="flag-box">
                          <div className="iti-flag sv"/>
                        </div>
                        <span className="country-name">El Salvador</span><span className="dial-code">+503</span></li>
                      <li className="country" data-dial-code={240} data-country-code="gq">
                        <div className="flag-box">
                          <div className="iti-flag gq"/>
                        </div>
                        <span className="country-name">Equatorial Guinea (Guinea Ecuatorial)</span><span
                        className="dial-code">+240</span></li>
                      <li className="country" data-dial-code={291} data-country-code="er">
                        <div className="flag-box">
                          <div className="iti-flag er"/>
                        </div>
                        <span className="country-name">Eritrea</span><span className="dial-code">+291</span></li>
                      <li className="country" data-dial-code={372} data-country-code="ee">
                        <div className="flag-box">
                          <div className="iti-flag ee"/>
                        </div>
                        <span className="country-name">Estonia (Eesti)</span><span className="dial-code">+372</span>
                      </li>
                      <li className="country" data-dial-code={251} data-country-code="et">
                        <div className="flag-box">
                          <div className="iti-flag et"/>
                        </div>
                        <span className="country-name">Ethiopia</span><span className="dial-code">+251</span></li>
                      <li className="country" data-dial-code={500} data-country-code="fk">
                        <div className="flag-box">
                          <div className="iti-flag fk"/>
                        </div>
                        <span className="country-name">Falkland Islands (Islas Malvinas)</span><span
                        className="dial-code">+500</span></li>
                      <li className="country" data-dial-code={298} data-country-code="fo">
                        <div className="flag-box">
                          <div className="iti-flag fo"/>
                        </div>
                        <span className="country-name">Faroe Islands (Føroyar)</span><span
                        className="dial-code">+298</span></li>
                      <li className="country" data-dial-code={679} data-country-code="fj">
                        <div className="flag-box">
                          <div className="iti-flag fj"/>
                        </div>
                        <span className="country-name">Fiji</span><span className="dial-code">+679</span></li>
                      <li className="country" data-dial-code={358} data-country-code="fi">
                        <div className="flag-box">
                          <div className="iti-flag fi"/>
                        </div>
                        <span className="country-name">Finland (Suomi)</span><span className="dial-code">+358</span>
                      </li>
                      <li className="country" data-dial-code={33} data-country-code="fr">
                        <div className="flag-box">
                          <div className="iti-flag fr"/>
                        </div>
                        <span className="country-name">France</span><span className="dial-code">+33</span></li>
                      <li className="country" data-dial-code={594} data-country-code="gf">
                        <div className="flag-box">
                          <div className="iti-flag gf"/>
                        </div>
                        <span className="country-name">French Guiana (Guyane française)</span><span
                        className="dial-code">+594</span></li>
                      <li className="country" data-dial-code={689} data-country-code="pf">
                        <div className="flag-box">
                          <div className="iti-flag pf"/>
                        </div>
                        <span className="country-name">French Polynesia (Polynésie française)</span><span
                        className="dial-code">+689</span></li>
                      <li className="country" data-dial-code={241} data-country-code="ga">
                        <div className="flag-box">
                          <div className="iti-flag ga"/>
                        </div>
                        <span className="country-name">Gabon</span><span className="dial-code">+241</span></li>
                      <li className="country" data-dial-code={220} data-country-code="gm">
                        <div className="flag-box">
                          <div className="iti-flag gm"/>
                        </div>
                        <span className="country-name">Gambia</span><span className="dial-code">+220</span></li>
                      <li className="country" data-dial-code={995} data-country-code="ge">
                        <div className="flag-box">
                          <div className="iti-flag ge"/>
                        </div>
                        <span className="country-name">Georgia (საქართველო)</span><span
                        className="dial-code">+995</span></li>
                      <li className="country" data-dial-code={49} data-country-code="de">
                        <div className="flag-box">
                          <div className="iti-flag de"/>
                        </div>
                        <span className="country-name">Germany (Deutschland)</span><span
                        className="dial-code">+49</span></li>
                      <li className="country" data-dial-code={233} data-country-code="gh">
                        <div className="flag-box">
                          <div className="iti-flag gh"/>
                        </div>
                        <span className="country-name">Ghana (Gaana)</span><span className="dial-code">+233</span></li>
                      <li className="country" data-dial-code={350} data-country-code="gi">
                        <div className="flag-box">
                          <div className="iti-flag gi"/>
                        </div>
                        <span className="country-name">Gibraltar</span><span className="dial-code">+350</span></li>
                      <li className="country" data-dial-code={30} data-country-code="gr">
                        <div className="flag-box">
                          <div className="iti-flag gr"/>
                        </div>
                        <span className="country-name">Greece (Ελλάδα)</span><span className="dial-code">+30</span></li>
                      <li className="country" data-dial-code={299} data-country-code="gl">
                        <div className="flag-box">
                          <div className="iti-flag gl"/>
                        </div>
                        <span className="country-name">Greenland (Kalaallit Nunaat)</span><span className="dial-code">+299</span>
                      </li>
                      <li className="country" data-dial-code={1473} data-country-code="gd">
                        <div className="flag-box">
                          <div className="iti-flag gd"/>
                        </div>
                        <span className="country-name">Grenada</span><span className="dial-code">+1473</span></li>
                      <li className="country" data-dial-code={590} data-country-code="gp">
                        <div className="flag-box">
                          <div className="iti-flag gp"/>
                        </div>
                        <span className="country-name">Guadeloupe</span><span className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={1671} data-country-code="gu">
                        <div className="flag-box">
                          <div className="iti-flag gu"/>
                        </div>
                        <span className="country-name">Guam</span><span className="dial-code">+1671</span></li>
                      <li className="country" data-dial-code={502} data-country-code="gt">
                        <div className="flag-box">
                          <div className="iti-flag gt"/>
                        </div>
                        <span className="country-name">Guatemala</span><span className="dial-code">+502</span></li>
                      <li className="country" data-dial-code={44} data-country-code="gg">
                        <div className="flag-box">
                          <div className="iti-flag gg"/>
                        </div>
                        <span className="country-name">Guernsey</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={224} data-country-code="gn">
                        <div className="flag-box">
                          <div className="iti-flag gn"/>
                        </div>
                        <span className="country-name">Guinea (Guinée)</span><span className="dial-code">+224</span>
                      </li>
                      <li className="country" data-dial-code={245} data-country-code="gw">
                        <div className="flag-box">
                          <div className="iti-flag gw"/>
                        </div>
                        <span className="country-name">Guinea-Bissau (Guiné Bissau)</span><span className="dial-code">+245</span>
                      </li>
                      <li className="country" data-dial-code={592} data-country-code="gy">
                        <div className="flag-box">
                          <div className="iti-flag gy"/>
                        </div>
                        <span className="country-name">Guyana</span><span className="dial-code">+592</span></li>
                      <li className="country" data-dial-code={509} data-country-code="ht">
                        <div className="flag-box">
                          <div className="iti-flag ht"/>
                        </div>
                        <span className="country-name">Haiti</span><span className="dial-code">+509</span></li>
                      <li className="country" data-dial-code={504} data-country-code="hn">
                        <div className="flag-box">
                          <div className="iti-flag hn"/>
                        </div>
                        <span className="country-name">Honduras</span><span className="dial-code">+504</span></li>
                      <li className="country" data-dial-code={852} data-country-code="hk">
                        <div className="flag-box">
                          <div className="iti-flag hk"/>
                        </div>
                        <span className="country-name">Hong Kong (香港)</span><span className="dial-code">+852</span></li>
                      <li className="country" data-dial-code={36} data-country-code="hu">
                        <div className="flag-box">
                          <div className="iti-flag hu"/>
                        </div>
                        <span className="country-name">Hungary (Magyarország)</span><span
                        className="dial-code">+36</span></li>
                      <li className="country" data-dial-code={354} data-country-code="is">
                        <div className="flag-box">
                          <div className="iti-flag is"/>
                        </div>
                        <span className="country-name">Iceland (Ísland)</span><span className="dial-code">+354</span>
                      </li>
                      <li className="country" data-dial-code={91} data-country-code="in">
                        <div className="flag-box">
                          <div className="iti-flag in"/>
                        </div>
                        <span className="country-name">India (भारत)</span><span className="dial-code">+91</span></li>
                      <li className="country" data-dial-code={62} data-country-code="id">
                        <div className="flag-box">
                          <div className="iti-flag id"/>
                        </div>
                        <span className="country-name">Indonesia</span><span className="dial-code">+62</span></li>
                      <li className="country" data-dial-code={98} data-country-code="ir">
                        <div className="flag-box">
                          <div className="iti-flag ir"/>
                        </div>
                        <span className="country-name">Iran (‫ایران‬‎)</span><span className="dial-code">+98</span></li>
                      <li className="country" data-dial-code={964} data-country-code="iq">
                        <div className="flag-box">
                          <div className="iti-flag iq"/>
                        </div>
                        <span className="country-name">Iraq (‫العراق‬‎)</span><span className="dial-code">+964</span>
                      </li>
                      <li className="country" data-dial-code={353} data-country-code="ie">
                        <div className="flag-box">
                          <div className="iti-flag ie"/>
                        </div>
                        <span className="country-name">Ireland</span><span className="dial-code">+353</span></li>
                      <li className="country" data-dial-code={44} data-country-code="im">
                        <div className="flag-box">
                          <div className="iti-flag im"/>
                        </div>
                        <span className="country-name">Isle of Man</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={972} data-country-code="il">
                        <div className="flag-box">
                          <div className="iti-flag il"/>
                        </div>
                        <span className="country-name">Israel (‫ישראל‬‎)</span><span className="dial-code">+972</span>
                      </li>
                      <li className="country" data-dial-code={39} data-country-code="it">
                        <div className="flag-box">
                          <div className="iti-flag it"/>
                        </div>
                        <span className="country-name">Italy (Italia)</span><span className="dial-code">+39</span></li>
                      <li className="country" data-dial-code={1876} data-country-code="jm">
                        <div className="flag-box">
                          <div className="iti-flag jm"/>
                        </div>
                        <span className="country-name">Jamaica</span><span className="dial-code">+1876</span></li>
                      <li className="country" data-dial-code={81} data-country-code="jp">
                        <div className="flag-box">
                          <div className="iti-flag jp"/>
                        </div>
                        <span className="country-name">Japan (日本)</span><span className="dial-code">+81</span></li>
                      <li className="country" data-dial-code={44} data-country-code="je">
                        <div className="flag-box">
                          <div className="iti-flag je"/>
                        </div>
                        <span className="country-name">Jersey</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={962} data-country-code="jo">
                        <div className="flag-box">
                          <div className="iti-flag jo"/>
                        </div>
                        <span className="country-name">Jordan (‫الأردن‬‎)</span><span className="dial-code">+962</span>
                      </li>
                      <li className="country" data-dial-code={7} data-country-code="kz">
                        <div className="flag-box">
                          <div className="iti-flag kz"/>
                        </div>
                        <span className="country-name">Kazakhstan (Казахстан)</span><span
                        className="dial-code">+7</span></li>
                      <li className="country" data-dial-code={254} data-country-code="ke">
                        <div className="flag-box">
                          <div className="iti-flag ke"/>
                        </div>
                        <span className="country-name">Kenya</span><span className="dial-code">+254</span></li>
                      <li className="country" data-dial-code={686} data-country-code="ki">
                        <div className="flag-box">
                          <div className="iti-flag ki"/>
                        </div>
                        <span className="country-name">Kiribati</span><span className="dial-code">+686</span></li>
                      <li className="country" data-dial-code={383} data-country-code="xk">
                        <div className="flag-box">
                          <div className="iti-flag xk"/>
                        </div>
                        <span className="country-name">Kosovo</span><span className="dial-code">+383</span></li>
                      <li className="country" data-dial-code={965} data-country-code="kw">
                        <div className="flag-box">
                          <div className="iti-flag kw"/>
                        </div>
                        <span className="country-name">Kuwait (‫الكويت‬‎)</span><span className="dial-code">+965</span>
                      </li>
                      <li className="country" data-dial-code={996} data-country-code="kg">
                        <div className="flag-box">
                          <div className="iti-flag kg"/>
                        </div>
                        <span className="country-name">Kyrgyzstan (Кыргызстан)</span><span
                        className="dial-code">+996</span></li>
                      <li className="country" data-dial-code={856} data-country-code="la">
                        <div className="flag-box">
                          <div className="iti-flag la"/>
                        </div>
                        <span className="country-name">Laos (ລາວ)</span><span className="dial-code">+856</span></li>
                      <li className="country" data-dial-code={371} data-country-code="lv">
                        <div className="flag-box">
                          <div className="iti-flag lv"/>
                        </div>
                        <span className="country-name">Latvia (Latvija)</span><span className="dial-code">+371</span>
                      </li>
                      <li className="country" data-dial-code={961} data-country-code="lb">
                        <div className="flag-box">
                          <div className="iti-flag lb"/>
                        </div>
                        <span className="country-name">Lebanon (‫لبنان‬‎)</span><span className="dial-code">+961</span>
                      </li>
                      <li className="country" data-dial-code={266} data-country-code="ls">
                        <div className="flag-box">
                          <div className="iti-flag ls"/>
                        </div>
                        <span className="country-name">Lesotho</span><span className="dial-code">+266</span></li>
                      <li className="country" data-dial-code={231} data-country-code="lr">
                        <div className="flag-box">
                          <div className="iti-flag lr"/>
                        </div>
                        <span className="country-name">Liberia</span><span className="dial-code">+231</span></li>
                      <li className="country" data-dial-code={218} data-country-code="ly">
                        <div className="flag-box">
                          <div className="iti-flag ly"/>
                        </div>
                        <span className="country-name">Libya (‫ليبيا‬‎)</span><span className="dial-code">+218</span>
                      </li>
                      <li className="country" data-dial-code={423} data-country-code="li">
                        <div className="flag-box">
                          <div className="iti-flag li"/>
                        </div>
                        <span className="country-name">Liechtenstein</span><span className="dial-code">+423</span></li>
                      <li className="country" data-dial-code={370} data-country-code="lt">
                        <div className="flag-box">
                          <div className="iti-flag lt"/>
                        </div>
                        <span className="country-name">Lithuania (Lietuva)</span><span className="dial-code">+370</span>
                      </li>
                      <li className="country" data-dial-code={352} data-country-code="lu">
                        <div className="flag-box">
                          <div className="iti-flag lu"/>
                        </div>
                        <span className="country-name">Luxembourg</span><span className="dial-code">+352</span></li>
                      <li className="country" data-dial-code={853} data-country-code="mo">
                        <div className="flag-box">
                          <div className="iti-flag mo"/>
                        </div>
                        <span className="country-name">Macau (澳門)</span><span className="dial-code">+853</span></li>
                      <li className="country" data-dial-code={389} data-country-code="mk">
                        <div className="flag-box">
                          <div className="iti-flag mk"/>
                        </div>
                        <span className="country-name">Macedonia (FYROM) (Македонија)</span><span className="dial-code">+389</span>
                      </li>
                      <li className="country" data-dial-code={261} data-country-code="mg">
                        <div className="flag-box">
                          <div className="iti-flag mg"/>
                        </div>
                        <span className="country-name">Madagascar (Madagasikara)</span><span
                        className="dial-code">+261</span></li>
                      <li className="country" data-dial-code={265} data-country-code="mw">
                        <div className="flag-box">
                          <div className="iti-flag mw"/>
                        </div>
                        <span className="country-name">Malawi</span><span className="dial-code">+265</span></li>
                      <li className="country" data-dial-code={60} data-country-code="my">
                        <div className="flag-box">
                          <div className="iti-flag my"/>
                        </div>
                        <span className="country-name">Malaysia</span><span className="dial-code">+60</span></li>
                      <li className="country" data-dial-code={960} data-country-code="mv">
                        <div className="flag-box">
                          <div className="iti-flag mv"/>
                        </div>
                        <span className="country-name">Maldives</span><span className="dial-code">+960</span></li>
                      <li className="country" data-dial-code={223} data-country-code="ml">
                        <div className="flag-box">
                          <div className="iti-flag ml"/>
                        </div>
                        <span className="country-name">Mali</span><span className="dial-code">+223</span></li>
                      <li className="country" data-dial-code={356} data-country-code="mt">
                        <div className="flag-box">
                          <div className="iti-flag mt"/>
                        </div>
                        <span className="country-name">Malta</span><span className="dial-code">+356</span></li>
                      <li className="country" data-dial-code={692} data-country-code="mh">
                        <div className="flag-box">
                          <div className="iti-flag mh"/>
                        </div>
                        <span className="country-name">Marshall Islands</span><span className="dial-code">+692</span>
                      </li>
                      <li className="country" data-dial-code={596} data-country-code="mq">
                        <div className="flag-box">
                          <div className="iti-flag mq"/>
                        </div>
                        <span className="country-name">Martinique</span><span className="dial-code">+596</span></li>
                      <li className="country" data-dial-code={222} data-country-code="mr">
                        <div className="flag-box">
                          <div className="iti-flag mr"/>
                        </div>
                        <span className="country-name">Mauritania (‫موريتانيا‬‎)</span><span
                        className="dial-code">+222</span></li>
                      <li className="country" data-dial-code={230} data-country-code="mu">
                        <div className="flag-box">
                          <div className="iti-flag mu"/>
                        </div>
                        <span className="country-name">Mauritius (Moris)</span><span className="dial-code">+230</span>
                      </li>
                      <li className="country" data-dial-code={262} data-country-code="yt">
                        <div className="flag-box">
                          <div className="iti-flag yt"/>
                        </div>
                        <span className="country-name">Mayotte</span><span className="dial-code">+262</span></li>
                      <li className="country" data-dial-code={52} data-country-code="mx">
                        <div className="flag-box">
                          <div className="iti-flag mx"/>
                        </div>
                        <span className="country-name">Mexico (México)</span><span className="dial-code">+52</span></li>
                      <li className="country" data-dial-code={691} data-country-code="fm">
                        <div className="flag-box">
                          <div className="iti-flag fm"/>
                        </div>
                        <span className="country-name">Micronesia</span><span className="dial-code">+691</span></li>
                      <li className="country" data-dial-code={373} data-country-code="md">
                        <div className="flag-box">
                          <div className="iti-flag md"/>
                        </div>
                        <span className="country-name">Moldova (Republica Moldova)</span><span className="dial-code">+373</span>
                      </li>
                      <li className="country" data-dial-code={377} data-country-code="mc">
                        <div className="flag-box">
                          <div className="iti-flag mc"/>
                        </div>
                        <span className="country-name">Monaco</span><span className="dial-code">+377</span></li>
                      <li className="country" data-dial-code={976} data-country-code="mn">
                        <div className="flag-box">
                          <div className="iti-flag mn"/>
                        </div>
                        <span className="country-name">Mongolia (Монгол)</span><span className="dial-code">+976</span>
                      </li>
                      <li className="country" data-dial-code={382} data-country-code="me">
                        <div className="flag-box">
                          <div className="iti-flag me"/>
                        </div>
                        <span className="country-name">Montenegro (Crna Gora)</span><span
                        className="dial-code">+382</span></li>
                      <li className="country" data-dial-code={1664} data-country-code="ms">
                        <div className="flag-box">
                          <div className="iti-flag ms"/>
                        </div>
                        <span className="country-name">Montserrat</span><span className="dial-code">+1664</span></li>
                      <li className="country" data-dial-code={212} data-country-code="ma">
                        <div className="flag-box">
                          <div className="iti-flag ma"/>
                        </div>
                        <span className="country-name">Morocco (‫المغرب‬‎)</span><span className="dial-code">+212</span>
                      </li>
                      <li className="country" data-dial-code={258} data-country-code="mz">
                        <div className="flag-box">
                          <div className="iti-flag mz"/>
                        </div>
                        <span className="country-name">Mozambique (Moçambique)</span><span
                        className="dial-code">+258</span></li>
                      <li className="country" data-dial-code={95} data-country-code="mm">
                        <div className="flag-box">
                          <div className="iti-flag mm"/>
                        </div>
                        <span className="country-name">Myanmar (Burma) (မြန်မာ)</span><span
                        className="dial-code">+95</span></li>
                      <li className="country" data-dial-code={264} data-country-code="na">
                        <div className="flag-box">
                          <div className="iti-flag na"/>
                        </div>
                        <span className="country-name">Namibia (Namibië)</span><span className="dial-code">+264</span>
                      </li>
                      <li className="country" data-dial-code={674} data-country-code="nr">
                        <div className="flag-box">
                          <div className="iti-flag nr"/>
                        </div>
                        <span className="country-name">Nauru</span><span className="dial-code">+674</span></li>
                      <li className="country" data-dial-code={977} data-country-code="np">
                        <div className="flag-box">
                          <div className="iti-flag np"/>
                        </div>
                        <span className="country-name">Nepal (नेपाल)</span><span className="dial-code">+977</span></li>
                      <li className="country" data-dial-code={31} data-country-code="nl">
                        <div className="flag-box">
                          <div className="iti-flag nl"/>
                        </div>
                        <span className="country-name">Netherlands (Nederland)</span><span
                        className="dial-code">+31</span></li>
                      <li className="country" data-dial-code={687} data-country-code="nc">
                        <div className="flag-box">
                          <div className="iti-flag nc"/>
                        </div>
                        <span className="country-name">New Caledonia (Nouvelle-Calédonie)</span><span
                        className="dial-code">+687</span></li>
                      <li className="country" data-dial-code={64} data-country-code="nz">
                        <div className="flag-box">
                          <div className="iti-flag nz"/>
                        </div>
                        <span className="country-name">New Zealand</span><span className="dial-code">+64</span></li>
                      <li className="country" data-dial-code={505} data-country-code="ni">
                        <div className="flag-box">
                          <div className="iti-flag ni"/>
                        </div>
                        <span className="country-name">Nicaragua</span><span className="dial-code">+505</span></li>
                      <li className="country" data-dial-code={227} data-country-code="ne">
                        <div className="flag-box">
                          <div className="iti-flag ne"/>
                        </div>
                        <span className="country-name">Niger (Nijar)</span><span className="dial-code">+227</span></li>
                      <li className="country" data-dial-code={234} data-country-code="ng">
                        <div className="flag-box">
                          <div className="iti-flag ng"/>
                        </div>
                        <span className="country-name">Nigeria</span><span className="dial-code">+234</span></li>
                      <li className="country" data-dial-code={683} data-country-code="nu">
                        <div className="flag-box">
                          <div className="iti-flag nu"/>
                        </div>
                        <span className="country-name">Niue</span><span className="dial-code">+683</span></li>
                      <li className="country" data-dial-code={672} data-country-code="nf">
                        <div className="flag-box">
                          <div className="iti-flag nf"/>
                        </div>
                        <span className="country-name">Norfolk Island</span><span className="dial-code">+672</span></li>
                      <li className="country" data-dial-code={850} data-country-code="kp">
                        <div className="flag-box">
                          <div className="iti-flag kp"/>
                        </div>
                        <span className="country-name">North Korea (조선 민주주의 인민 공화국)</span><span className="dial-code">+850</span>
                      </li>
                      <li className="country" data-dial-code={1670} data-country-code="mp">
                        <div className="flag-box">
                          <div className="iti-flag mp"/>
                        </div>
                        <span className="country-name">Northern Mariana Islands</span><span
                        className="dial-code">+1670</span></li>
                      <li className="country" data-dial-code={47} data-country-code="no">
                        <div className="flag-box">
                          <div className="iti-flag no"/>
                        </div>
                        <span className="country-name">Norway (Norge)</span><span className="dial-code">+47</span></li>
                      <li className="country" data-dial-code={968} data-country-code="om">
                        <div className="flag-box">
                          <div className="iti-flag om"/>
                        </div>
                        <span className="country-name">Oman (‫عُمان‬‎)</span><span className="dial-code">+968</span>
                      </li>
                      <li className="country" data-dial-code={92} data-country-code="pk">
                        <div className="flag-box">
                          <div className="iti-flag pk"/>
                        </div>
                        <span className="country-name">Pakistan (‫پاکستان‬‎)</span><span
                        className="dial-code">+92</span></li>
                      <li className="country" data-dial-code={680} data-country-code="pw">
                        <div className="flag-box">
                          <div className="iti-flag pw"/>
                        </div>
                        <span className="country-name">Palau</span><span className="dial-code">+680</span></li>
                      <li className="country" data-dial-code={970} data-country-code="ps">
                        <div className="flag-box">
                          <div className="iti-flag ps"/>
                        </div>
                        <span className="country-name">Palestine (‫فلسطين‬‎)</span><span
                        className="dial-code">+970</span></li>
                      <li className="country" data-dial-code={507} data-country-code="pa">
                        <div className="flag-box">
                          <div className="iti-flag pa"/>
                        </div>
                        <span className="country-name">Panama (Panamá)</span><span className="dial-code">+507</span>
                      </li>
                      <li className="country" data-dial-code={675} data-country-code="pg">
                        <div className="flag-box">
                          <div className="iti-flag pg"/>
                        </div>
                        <span className="country-name">Papua New Guinea</span><span className="dial-code">+675</span>
                      </li>
                      <li className="country" data-dial-code={595} data-country-code="py">
                        <div className="flag-box">
                          <div className="iti-flag py"/>
                        </div>
                        <span className="country-name">Paraguay</span><span className="dial-code">+595</span></li>
                      <li className="country" data-dial-code={51} data-country-code="pe">
                        <div className="flag-box">
                          <div className="iti-flag pe"/>
                        </div>
                        <span className="country-name">Peru (Perú)</span><span className="dial-code">+51</span></li>
                      <li className="country" data-dial-code={63} data-country-code="ph">
                        <div className="flag-box">
                          <div className="iti-flag ph"/>
                        </div>
                        <span className="country-name">Philippines</span><span className="dial-code">+63</span></li>
                      <li className="country" data-dial-code={48} data-country-code="pl">
                        <div className="flag-box">
                          <div className="iti-flag pl"/>
                        </div>
                        <span className="country-name">Poland (Polska)</span><span className="dial-code">+48</span></li>
                      <li className="country" data-dial-code={351} data-country-code="pt">
                        <div className="flag-box">
                          <div className="iti-flag pt"/>
                        </div>
                        <span className="country-name">Portugal</span><span className="dial-code">+351</span></li>
                      <li className="country" data-dial-code={1} data-country-code="pr">
                        <div className="flag-box">
                          <div className="iti-flag pr"/>
                        </div>
                        <span className="country-name">Puerto Rico</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={974} data-country-code="qa">
                        <div className="flag-box">
                          <div className="iti-flag qa"/>
                        </div>
                        <span className="country-name">Qatar (‫قطر‬‎)</span><span className="dial-code">+974</span></li>
                      <li className="country" data-dial-code={262} data-country-code="re">
                        <div className="flag-box">
                          <div className="iti-flag re"/>
                        </div>
                        <span className="country-name">Réunion (La Réunion)</span><span
                        className="dial-code">+262</span></li>
                      <li className="country" data-dial-code={40} data-country-code="ro">
                        <div className="flag-box">
                          <div className="iti-flag ro"/>
                        </div>
                        <span className="country-name">Romania (România)</span><span className="dial-code">+40</span>
                      </li>
                      <li className="country" data-dial-code={7} data-country-code="ru">
                        <div className="flag-box">
                          <div className="iti-flag ru"/>
                        </div>
                        <span className="country-name">Russia (Россия)</span><span className="dial-code">+7</span></li>
                      <li className="country" data-dial-code={250} data-country-code="rw">
                        <div className="flag-box">
                          <div className="iti-flag rw"/>
                        </div>
                        <span className="country-name">Rwanda</span><span className="dial-code">+250</span></li>
                      <li className="country" data-dial-code={590} data-country-code="bl">
                        <div className="flag-box">
                          <div className="iti-flag bl"/>
                        </div>
                        <span className="country-name">Saint Barthélemy (Saint-Barthélemy)</span><span
                        className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={290} data-country-code="sh">
                        <div className="flag-box">
                          <div className="iti-flag sh"/>
                        </div>
                        <span className="country-name">Saint Helena</span><span className="dial-code">+290</span></li>
                      <li className="country" data-dial-code={1869} data-country-code="kn">
                        <div className="flag-box">
                          <div className="iti-flag kn"/>
                        </div>
                        <span className="country-name">Saint Kitts and Nevis</span><span
                        className="dial-code">+1869</span></li>
                      <li className="country" data-dial-code={1758} data-country-code="lc">
                        <div className="flag-box">
                          <div className="iti-flag lc"/>
                        </div>
                        <span className="country-name">Saint Lucia</span><span className="dial-code">+1758</span></li>
                      <li className="country" data-dial-code={590} data-country-code="mf">
                        <div className="flag-box">
                          <div className="iti-flag mf"/>
                        </div>
                        <span className="country-name">Saint Martin (Saint-Martin (partie française))</span><span
                        className="dial-code">+590</span></li>
                      <li className="country" data-dial-code={508} data-country-code="pm">
                        <div className="flag-box">
                          <div className="iti-flag pm"/>
                        </div>
                        <span className="country-name">Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)</span><span
                        className="dial-code">+508</span></li>
                      <li className="country" data-dial-code={1784} data-country-code="vc">
                        <div className="flag-box">
                          <div className="iti-flag vc"/>
                        </div>
                        <span className="country-name">Saint Vincent and the Grenadines</span><span
                        className="dial-code">+1784</span></li>
                      <li className="country" data-dial-code={685} data-country-code="ws">
                        <div className="flag-box">
                          <div className="iti-flag ws"/>
                        </div>
                        <span className="country-name">Samoa</span><span className="dial-code">+685</span></li>
                      <li className="country" data-dial-code={378} data-country-code="sm">
                        <div className="flag-box">
                          <div className="iti-flag sm"/>
                        </div>
                        <span className="country-name">San Marino</span><span className="dial-code">+378</span></li>
                      <li className="country" data-dial-code={239} data-country-code="st">
                        <div className="flag-box">
                          <div className="iti-flag st"/>
                        </div>
                        <span className="country-name">São Tomé and Príncipe (São Tomé e Príncipe)</span><span
                        className="dial-code">+239</span></li>
                      <li className="country" data-dial-code={966} data-country-code="sa">
                        <div className="flag-box">
                          <div className="iti-flag sa"/>
                        </div>
                        <span className="country-name">Saudi Arabia (‫المملكة العربية السعودية‬‎)</span><span
                        className="dial-code">+966</span></li>
                      <li className="country" data-dial-code={221} data-country-code="sn">
                        <div className="flag-box">
                          <div className="iti-flag sn"/>
                        </div>
                        <span className="country-name">Senegal (Sénégal)</span><span className="dial-code">+221</span>
                      </li>
                      <li className="country" data-dial-code={381} data-country-code="rs">
                        <div className="flag-box">
                          <div className="iti-flag rs"/>
                        </div>
                        <span className="country-name">Serbia (Србија)</span><span className="dial-code">+381</span>
                      </li>
                      <li className="country" data-dial-code={248} data-country-code="sc">
                        <div className="flag-box">
                          <div className="iti-flag sc"/>
                        </div>
                        <span className="country-name">Seychelles</span><span className="dial-code">+248</span></li>
                      <li className="country" data-dial-code={232} data-country-code="sl">
                        <div className="flag-box">
                          <div className="iti-flag sl"/>
                        </div>
                        <span className="country-name">Sierra Leone</span><span className="dial-code">+232</span></li>
                      <li className="country" data-dial-code={65} data-country-code="sg">
                        <div className="flag-box">
                          <div className="iti-flag sg"/>
                        </div>
                        <span className="country-name">Singapore</span><span className="dial-code">+65</span></li>
                      <li className="country" data-dial-code={1721} data-country-code="sx">
                        <div className="flag-box">
                          <div className="iti-flag sx"/>
                        </div>
                        <span className="country-name">Sint Maarten</span><span className="dial-code">+1721</span></li>
                      <li className="country" data-dial-code={421} data-country-code="sk">
                        <div className="flag-box">
                          <div className="iti-flag sk"/>
                        </div>
                        <span className="country-name">Slovakia (Slovensko)</span><span
                        className="dial-code">+421</span></li>
                      <li className="country" data-dial-code={386} data-country-code="si">
                        <div className="flag-box">
                          <div className="iti-flag si"/>
                        </div>
                        <span className="country-name">Slovenia (Slovenija)</span><span
                        className="dial-code">+386</span></li>
                      <li className="country" data-dial-code={677} data-country-code="sb">
                        <div className="flag-box">
                          <div className="iti-flag sb"/>
                        </div>
                        <span className="country-name">Solomon Islands</span><span className="dial-code">+677</span>
                      </li>
                      <li className="country" data-dial-code={252} data-country-code="so">
                        <div className="flag-box">
                          <div className="iti-flag so"/>
                        </div>
                        <span className="country-name">Somalia (Soomaaliya)</span><span
                        className="dial-code">+252</span></li>
                      <li className="country" data-dial-code={27} data-country-code="za">
                        <div className="flag-box">
                          <div className="iti-flag za"/>
                        </div>
                        <span className="country-name">South Africa</span><span className="dial-code">+27</span></li>
                      <li className="country" data-dial-code={82} data-country-code="kr">
                        <div className="flag-box">
                          <div className="iti-flag kr"/>
                        </div>
                        <span className="country-name">South Korea (대한민국)</span><span className="dial-code">+82</span>
                      </li>
                      <li className="country" data-dial-code={211} data-country-code="ss">
                        <div className="flag-box">
                          <div className="iti-flag ss"/>
                        </div>
                        <span className="country-name">South Sudan (‫جنوب السودان‬‎)</span><span className="dial-code">+211</span>
                      </li>
                      <li className="country" data-dial-code={34} data-country-code="es">
                        <div className="flag-box">
                          <div className="iti-flag es"/>
                        </div>
                        <span className="country-name">Spain (España)</span><span className="dial-code">+34</span></li>
                      <li className="country" data-dial-code={94} data-country-code="lk">
                        <div className="flag-box">
                          <div className="iti-flag lk"/>
                        </div>
                        <span className="country-name">Sri Lanka (ශ්‍රී ලංකාව)</span><span
                        className="dial-code">+94</span></li>
                      <li className="country" data-dial-code={249} data-country-code="sd">
                        <div className="flag-box">
                          <div className="iti-flag sd"/>
                        </div>
                        <span className="country-name">Sudan (‫السودان‬‎)</span><span className="dial-code">+249</span>
                      </li>
                      <li className="country" data-dial-code={597} data-country-code="sr">
                        <div className="flag-box">
                          <div className="iti-flag sr"/>
                        </div>
                        <span className="country-name">Suriname</span><span className="dial-code">+597</span></li>
                      <li className="country" data-dial-code={47} data-country-code="sj">
                        <div className="flag-box">
                          <div className="iti-flag sj"/>
                        </div>
                        <span className="country-name">Svalbard and Jan Mayen</span><span
                        className="dial-code">+47</span></li>
                      <li className="country" data-dial-code={268} data-country-code="sz">
                        <div className="flag-box">
                          <div className="iti-flag sz"/>
                        </div>
                        <span className="country-name">Swaziland</span><span className="dial-code">+268</span></li>
                      <li className="country" data-dial-code={46} data-country-code="se">
                        <div className="flag-box">
                          <div className="iti-flag se"/>
                        </div>
                        <span className="country-name">Sweden (Sverige)</span><span className="dial-code">+46</span>
                      </li>
                      <li className="country" data-dial-code={41} data-country-code="ch">
                        <div className="flag-box">
                          <div className="iti-flag ch"/>
                        </div>
                        <span className="country-name">Switzerland (Schweiz)</span><span
                        className="dial-code">+41</span></li>
                      <li className="country" data-dial-code={963} data-country-code="sy">
                        <div className="flag-box">
                          <div className="iti-flag sy"/>
                        </div>
                        <span className="country-name">Syria (‫سوريا‬‎)</span><span className="dial-code">+963</span>
                      </li>
                      <li className="country" data-dial-code={886} data-country-code="tw">
                        <div className="flag-box">
                          <div className="iti-flag tw"/>
                        </div>
                        <span className="country-name">Taiwan (台灣)</span><span className="dial-code">+886</span></li>
                      <li className="country" data-dial-code={992} data-country-code="tj">
                        <div className="flag-box">
                          <div className="iti-flag tj"/>
                        </div>
                        <span className="country-name">Tajikistan</span><span className="dial-code">+992</span></li>
                      <li className="country" data-dial-code={255} data-country-code="tz">
                        <div className="flag-box">
                          <div className="iti-flag tz"/>
                        </div>
                        <span className="country-name">Tanzania</span><span className="dial-code">+255</span></li>
                      <li className="country" data-dial-code={66} data-country-code="th">
                        <div className="flag-box">
                          <div className="iti-flag th"/>
                        </div>
                        <span className="country-name">Thailand (ไทย)</span><span className="dial-code">+66</span></li>
                      <li className="country" data-dial-code={670} data-country-code="tl">
                        <div className="flag-box">
                          <div className="iti-flag tl"/>
                        </div>
                        <span className="country-name">Timor-Leste</span><span className="dial-code">+670</span></li>
                      <li className="country" data-dial-code={228} data-country-code="tg">
                        <div className="flag-box">
                          <div className="iti-flag tg"/>
                        </div>
                        <span className="country-name">Togo</span><span className="dial-code">+228</span></li>
                      <li className="country" data-dial-code={690} data-country-code="tk">
                        <div className="flag-box">
                          <div className="iti-flag tk"/>
                        </div>
                        <span className="country-name">Tokelau</span><span className="dial-code">+690</span></li>
                      <li className="country" data-dial-code={676} data-country-code="to">
                        <div className="flag-box">
                          <div className="iti-flag to"/>
                        </div>
                        <span className="country-name">Tonga</span><span className="dial-code">+676</span></li>
                      <li className="country" data-dial-code={1868} data-country-code="tt">
                        <div className="flag-box">
                          <div className="iti-flag tt"/>
                        </div>
                        <span className="country-name">Trinidad and Tobago</span><span
                        className="dial-code">+1868</span></li>
                      <li className="country" data-dial-code={216} data-country-code="tn">
                        <div className="flag-box">
                          <div className="iti-flag tn"/>
                        </div>
                        <span className="country-name">Tunisia (‫تونس‬‎)</span><span className="dial-code">+216</span>
                      </li>
                      <li className="country" data-dial-code={90} data-country-code="tr">
                        <div className="flag-box">
                          <div className="iti-flag tr"/>
                        </div>
                        <span className="country-name">Turkey (Türkiye)</span><span className="dial-code">+90</span>
                      </li>
                      <li className="country" data-dial-code={993} data-country-code="tm">
                        <div className="flag-box">
                          <div className="iti-flag tm"/>
                        </div>
                        <span className="country-name">Turkmenistan</span><span className="dial-code">+993</span></li>
                      <li className="country" data-dial-code={1649} data-country-code="tc">
                        <div className="flag-box">
                          <div className="iti-flag tc"/>
                        </div>
                        <span className="country-name">Turks and Caicos Islands</span><span
                        className="dial-code">+1649</span></li>
                      <li className="country" data-dial-code={688} data-country-code="tv">
                        <div className="flag-box">
                          <div className="iti-flag tv"/>
                        </div>
                        <span className="country-name">Tuvalu</span><span className="dial-code">+688</span></li>
                      <li className="country" data-dial-code={1340} data-country-code="vi">
                        <div className="flag-box">
                          <div className="iti-flag vi"/>
                        </div>
                        <span className="country-name">U.S. Virgin Islands</span><span
                        className="dial-code">+1340</span></li>
                      <li className="country" data-dial-code={256} data-country-code="ug">
                        <div className="flag-box">
                          <div className="iti-flag ug"/>
                        </div>
                        <span className="country-name">Uganda</span><span className="dial-code">+256</span></li>
                      <li className="country" data-dial-code={380} data-country-code="ua">
                        <div className="flag-box">
                          <div className="iti-flag ua"/>
                        </div>
                        <span className="country-name">Ukraine (Україна)</span><span className="dial-code">+380</span>
                      </li>
                      <li className="country" data-dial-code={971} data-country-code="ae">
                        <div className="flag-box">
                          <div className="iti-flag ae"/>
                        </div>
                        <span className="country-name">United Arab Emirates (‫الإمارات العربية المتحدة‬‎)</span><span
                        className="dial-code">+971</span></li>
                      <li className="country" data-dial-code={44} data-country-code="gb">
                        <div className="flag-box">
                          <div className="iti-flag gb"/>
                        </div>
                        <span className="country-name">United Kingdom</span><span className="dial-code">+44</span></li>
                      <li className="country" data-dial-code={1} data-country-code="us">
                        <div className="flag-box">
                          <div className="iti-flag us"/>
                        </div>
                        <span className="country-name">United States</span><span className="dial-code">+1</span></li>
                      <li className="country" data-dial-code={598} data-country-code="uy">
                        <div className="flag-box">
                          <div className="iti-flag uy"/>
                        </div>
                        <span className="country-name">Uruguay</span><span className="dial-code">+598</span></li>
                      <li className="country" data-dial-code={998} data-country-code="uz">
                        <div className="flag-box">
                          <div className="iti-flag uz"/>
                        </div>
                        <span className="country-name">Uzbekistan (Oʻzbekiston)</span><span
                        className="dial-code">+998</span></li>
                      <li className="country" data-dial-code={678} data-country-code="vu">
                        <div className="flag-box">
                          <div className="iti-flag vu"/>
                        </div>
                        <span className="country-name">Vanuatu</span><span className="dial-code">+678</span></li>
                      <li className="country" data-dial-code={39} data-country-code="va">
                        <div className="flag-box">
                          <div className="iti-flag va"/>
                        </div>
                        <span className="country-name">Vatican City (Città del Vaticano)</span><span
                        className="dial-code">+39</span></li>
                      <li className="country" data-dial-code={58} data-country-code="ve">
                        <div className="flag-box">
                          <div className="iti-flag ve"/>
                        </div>
                        <span className="country-name">Venezuela</span><span className="dial-code">+58</span></li>
                      <li className="country" data-dial-code={84} data-country-code="vn">
                        <div className="flag-box">
                          <div className="iti-flag vn"/>
                        </div>
                        <span className="country-name">Vietnam (Việt Nam)</span><span className="dial-code">+84</span>
                      </li>
                      <li className="country" data-dial-code={681} data-country-code="wf">
                        <div className="flag-box">
                          <div className="iti-flag wf"/>
                        </div>
                        <span className="country-name">Wallis and Futuna</span><span className="dial-code">+681</span>
                      </li>
                      <li className="country" data-dial-code={212} data-country-code="eh">
                        <div className="flag-box">
                          <div className="iti-flag eh"/>
                        </div>
                        <span className="country-name">Western Sahara (‫الصحراء الغربية‬‎)</span><span
                        className="dial-code">+212</span></li>
                      <li className="country" data-dial-code={967} data-country-code="ye">
                        <div className="flag-box">
                          <div className="iti-flag ye"/>
                        </div>
                        <span className="country-name">Yemen (‫اليمن‬‎)</span><span className="dial-code">+967</span>
                      </li>
                      <li className="country" data-dial-code={260} data-country-code="zm">
                        <div className="flag-box">
                          <div className="iti-flag zm"/>
                        </div>
                        <span className="country-name">Zambia</span><span className="dial-code">+260</span></li>
                      <li className="country" data-dial-code={263} data-country-code="zw">
                        <div className="flag-box">
                          <div className="iti-flag zw"/>
                        </div>
                        <span className="country-name">Zimbabwe</span><span className="dial-code">+263</span></li>
                      <li className="country" data-dial-code={358} data-country-code="ax">
                        <div className="flag-box">
                          <div className="iti-flag ax"/>
                        </div>
                        <span className="country-name">Åland Islands</span><span className="dial-code">+358</span></li>
                    </ul>
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
              <div className="form-group form-first-name hidden has-feedback">
                <input type="text" name="firstname" placeholder="First Name" autoComplete="off"
                       className="form-control mrg-t-lg first-name" data-fv-field="firstName"/><i
                className="form-control-feedback" data-fv-icon-for="firstName" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="firstName"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Firstname is required.
                </small>
              </div>
              <div className="form-group form-last-name hidden has-feedback">
                <input type="text" name="lastname" placeholder="Last Name" autoComplete="off"
                       className="form-control mrg-t-lg last-name" data-fv-field="lastName"/><i
                className="form-control-feedback" data-fv-icon-for="lastName" style={{display: 'none'}}/>
                <span className="message"/>
                <small className="help-block" data-fv-validator="notEmpty" data-fv-for="lastName"
                       data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Lastname is required.
                </small>
              </div>
              <div className="form-group">
                <div className="text-xs">Name: <span className="bidder-name"/></div>
                <div className="text-xs">Email Id : <span className="bidder-email"/></div>
                <div className="text-xs">Cell Number : <span className="bidder-cell"/></div>
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
              <div className="cc-info" style={{xdisplay: 'none'}}>
                <style
                  dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n" }}/>
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
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name is required
                        and can't be empty
                      </small>
                      <small className="help-block" data-fv-validator="stringLength" data-fv-for="cardholdername"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name must be more
                        than 6 and less than 70 characters long
                      </small>
                      <small className="help-block" data-fv-validator="callback" data-fv-for="cardholdername"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name can not start
                        or end with white space
                      </small>
                    </div>
                    <div className="form-group has-feedback">
                      <label className="control-label">Credit Card Number</label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true"/></div>
                        <input type="number" className="form-control" id="cardnumber" placeholder="8888-8888-8888-8888"
                               maxLength={16} data-stripe="number" required="required" data-fv-field="cardnumber"/>
                      </div>
                      <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="cardnumber"
                         style={{display: 'none'}}/>
                      <div className="small text-danger js-error card_error number"/>
                      <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cardnumber"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number is required
                        and can't be empty
                      </small>
                      <small className="help-block" data-fv-validator="creditCard" data-fv-for="cardnumber"
                             data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number is invalid
                      </small>
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
                          <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="expYear"
                             style={{display: 'none'}}/><i
                          className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="expMonth"
                          style={{display: 'none'}}/>
                          <div className="small text-danger js-error card_error exp_year exp_month"/>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="expMonth"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration month is
                            required
                          </small>
                          <small className="help-block" data-fv-validator="digits" data-fv-for="expMonth"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration month can
                            contain digits only
                          </small>
                          <small className="help-block" data-fv-validator="callback" data-fv-for="expMonth"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Your card is Expired
                          </small>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="expYear"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration year is
                            required
                          </small>
                          <small className="help-block" data-fv-validator="digits" data-fv-for="expYear"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration year can
                            contain digits only
                          </small>
                          <small className="help-block" data-fv-validator="callback" data-fv-for="expYear"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}></small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group has-feedback">
                          <label className="control-label">CVV Number</label>
                          <div className="input-group">
                            <input type="number" className="form-control" maxLength={4} size={4} data-stripe="cvc"
                                   id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"/>
                          </div>
                          <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="cvv"
                             style={{display: 'none'}}/>
                          <div className="small text-danger js-error card_error cvc"/>
                          <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cvv"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV is required and can't
                            be empty
                          </small>
                          <small className="help-block" data-fv-validator="stringLength" data-fv-for="cvv"
                                 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV must be more than 4
                            and less than 3 characters long
                          </small>
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
              <button className="btn btn-white" onClick={()=>{this.setActiveView('select-action')}}>Back</button>
            </div>
          </view>
        </views>

      </div>

    );
  }
}


const mapDispatchToProps = {};
const mapStateToProps = (state) => ({});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Volunteer));
