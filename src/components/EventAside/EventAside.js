/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes   from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EventAside.css';
import Link from '../Link';
import cx from 'classnames';
import Moment from 'react-moment';
import moment from 'moment';

class EventAside extends React.Component {
  static propTypes = {
    activeTab: PropTypes.string,
    showBookingPopup: PropTypes.func,
    showMapPopup: PropTypes.func,
    eventData: PropTypes.object,
    eventTicketData: PropTypes.object,
    settings: PropTypes.object,
  };
  render() {
    return (
      <div >
        <script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false&amp;libraries=places&amp;key=AIzaSyCTdjRtF5L54QIJdEQ8DyXlf2umq6MpvEw"></script>
        <div className={cx("main-box", "clearfix")}>
          <header className={cx("main-box-header", "clearfix")}>
            <h2>jkazarian8</h2>
          </header>
          <div className={cx("main-box-body","clearfix")}>
            { this.props.eventData && this.props.eventData.design_detail && this.props.eventData.design_detail.is_logo_enabled  && <img src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/a08ed5d6-e0dc-4c23-b57c-b7eddfc7db93_unnamed.png" className="img-responsive center-block" />}
            { this.props.activeTab && (this.props.activeTab=='The Event' ) &&  <div className={cx("the-event","mrg-t-lg")}>
              { this.props.showBookingPopup && <a onClick={this.props.showBookingPopup} className={cx("btn","btn-block","btn-lg","btn-orange", this.props.settings && this.props.settings['ticket-type'] ? "": "disabled")}>Buy Tickets</a>}
                <div className={cx("box")}>
                  <div className={cx("box-title","text-uppercase")}>date and time</div>
                  <div className={cx("box-content")}>
                    {this.props.settings && this.props.settings.startdate && <Moment  format="ddd MMMM D YYYY, h:mm A"  tz={this.props.eventData && this.props.eventData.timezoneId}>{this.props.settings.startdate}</Moment>} -
                    {this.props.settings && this.props.settings.enddate && <Moment  format="ddd MMMM D YYYY, h:mm A" tz={this.props.eventData && this.props.eventData.timezoneId}>{this.props.settings.enddate}</Moment>}
                    <br />
                    <time>
                      <span className="hide"> (America/New_York)</span>
                    </time><br />
                    <a className="hide" href="#">Add to calendar</a>
                  </div>
                </div>
                <div className="box">
                  <div className={cx("box-title","text-uppercase")}>Location</div>
                  <div className="box-content">
                    <address>
                      {this.props.settings && this.props.settings.address}
                    </address>
                    {this.props.showMapPopup && <a onClick={this.props.showMapPopup}>View on Map</a>}
                  </div>
                </div>
              </div> }
            { this.props.activeTab && !(this.props.activeTab=='The Event' || this.props.activeTab=='Donation' ) && this.props.eventData && this.props.eventData.design_detail && this.props.eventData.design_detail.is_txt_msg_bid_inst_shown && <div className={cx("card bidinfo")} >
              {this.props.activeTab=='Raffle' && <p className={cx("raffle-text")} >Submit your tickets here or text your ticket submission to: (410) 927-5356 with the item's three letter code, and your desired number of tickets ex. ABC10</p>}
              { (this.props.activeTab=='Donation' || this.props.activeTab=='Auction'|| this.props.activeTab=='The Event' )
              && <p className={cx("causeauction-text donation-text auction-text")} >Bid here or text Your Bid To: (410) 927-5356 with the item's three letter code and bid amount ex. ABC$300</p>}
            </div>}
            { this.props.activeTab
            && !(this.props.activeTab=='The Event' || this.props.activeTab=='Donation' )
            && (this.props.eventData && (this.props.eventData.is_silent_auction_enabled ||this.props.eventData.is_cause_auction_enabled ||this.props.eventData.is_raffle_enabled) && this.props.eventData.design_detail && !this.props.eventData.design_detail.is_countdown_timer_hiddedn )
            && <div id="countdownTimer" className={cx("main-box clearfix project-box gray-box card")} >
                <div className={cx("main-box-body clearfix")}>
                  <div className={cx("project-box-header gray-bg")}>
                    <div className={cx("name text-center")}>
                      <a href="#">Time Until Event Ends</a>
                    </div>
                  </div>
                  <div className={cx("project-box-content")}>
                    <div className={cx("ticker")}>
                      <div className={cx("row timer")}>
                        <div className={cx("col-xs-4")}><span className={cx("days")}>{
                          moment(this.props.settings.eventEnd).diff(moment(), 'days') > 0
                          && moment(this.props.settings.eventEnd).diff(moment(), 'days') || '00'
                        }</span></div>
                        <div className={cx("col-xs-4")}><span className={cx("hours")}>{
                          moment(this.props.settings.eventEnd).add(-moment(this.props.settings.eventEnd).diff(moment(), 'days'),'days').diff(moment(), 'hours')> 0
                          && moment(this.props.settings.eventEnd).add(-moment(this.props.settings.eventEnd).diff(moment(), 'days'),'days').diff(moment(), 'hours') > 0
                          && moment(this.props.settings.eventEnd).add(-moment(this.props.settings.eventEnd).diff(moment(), 'days'),'days').diff(moment(), 'hours') || '00'
                        }</span></div>
                        <div className={cx("col-xs-4")}><span className={cx("minutes")}>{
                          moment(this.props.settings.eventEnd).add(-moment(this.props.settings.eventEnd).diff(moment(), 'days'),'days').add(-moment(this.props.settings.eventEnd).add(-moment(this.props.settings.eventEnd).diff(moment(), 'days'),'days').diff(moment(), 'hours'),'hours').diff(moment(), 'minutes') > 0
                          && moment(this.props.settings.eventEnd).add(-moment(this.props.settings.eventEnd).diff(moment(), 'days'),'days').add(-moment(this.props.settings.eventEnd).add(-moment(this.props.settings.eventEnd).diff(moment(), 'days'),'days').diff(moment(), 'hours'),'hours').diff(moment(), 'minutes')
                        || '00'}</span></div>
                        <div className={cx("col-xs-4")} style={{display: "none"}}><span className={cx("seconds")}>00</span></div>
                      </div>
                      <div className={cx("row tiny text-center")}>
                        <div className={cx("col-xs-4")}><span className={cx("days")}>DAYS</span></div>
                        <div className={cx("col-xs-4")}><span className={cx("hours")}>HOURS</span></div>
                        <div className={cx("col-xs-4")}><span className={cx("minutes")}>MINUTES</span></div>
                        <div className={cx("col-xs-4")} style={{display: "none"}}><span className={cx("seconds")}>SECONDS</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> }
            { this.props.activeTab && !(this.props.activeTab=='The Event') && (this.props.eventData && (this.props.eventData.is_silent_auction_enabled ||this.props.eventData.is_cause_auction_enabled ||this.props.eventData.is_raffle_enabled) && this.props.eventData.design_detail && !this.props.eventData.design_detail.is_total_fund_raised_hiddend ) && <div className={cx("main-box clearfix project-box gray-box card funds-raised-container")} >
                <div className={cx("main-box-body clearfix")}>
                  <div className={cx("project-box-header gray-bg")}>
                    <div className={cx("name text-center")}>
                      <a href="#">Total Funds Raised</a>
                    </div>
                  </div>
                  <div className={cx("project-box-content")}>
                    <div className={cx("funds-raised")}>$<span className={cx("total-funds-raised")}>{ this.props.settings && this.props.settings.totalFundRaised ? this.props.settings.totalFundRaised:"0"}</span></div>
                  </div>
                </div>
              </div> }
            { this.props.activeTab && ( this.props.activeTab=='Raffle' ) && <a role="button" className={cx("btn btn-primary btn-block disabled buy-raffle-tickets")} data-toggle="modal" href="#info-modal" data-title="Raffle Drawn" data-message="This raffle has already been drawn. No further tickets are being accepted" >Raffle Closed</a> }
            { this.props.activeTab && !(this.props.activeTab=='The Event' || this.props.activeTab=='Donation' ) && <div className={cx("search-bar card")} data-module="" >
                <input type="text" className={cx("form-control")} placeholder="Search Items..." />
              </div> }
            <div className={cx("text-center powered-by-sidebar")}><span>Powered by </span><a href="https://www.accelevents.com" target="_blank">
                <img src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x50/937320cf-a809-49c5-916d-e7436a1cfcaeaccelevents-logo-black.png" className={cx("img-responsive")} />
              </a>
              </div>
            <input type="hidden" value="true" id="causeAuctionCategoryEnabled" />
            <input type="hidden" value="true" id="raffleCategoryEnabled" />
            <input type="hidden" value="false" id="auctionCategoryEnabled" />
            { this.props.activeTab && (this.props.activeTab=='Raffle' || this.props.activeTab=='Fund a Need' ) && <div id="divItemCategories" className={cx("item-categories hidden-xs hide")}>
              <h4 className={cx("")}>Categories</h4>
              <ul className={cx("nav nav-pills nav-stacked category-list ")}>
                <li className={cx("all-items")}>
                  <a href="#" className={cx("category-switcher all-items")} data-category="" data-module="">
                    <i className={cx("fa fa-ticket")}></i>
                    <span className={cx("cat-name")}>All Items</span>
                    <span className={cx("badge badge-primary pull-right cat-count")}></span>
                  </a>
                </li>
                <li className={cx("dummy")}>
                  <a href="#" className={cx("category-switcher")} data-category="" data-module="">
                    <i className={cx("fa fa-ticket")}></i>
                    <span className={cx("cat-name")}></span>
                    <span className={cx("badge badge-primary pull-right cat-count")}></span>
                  </a>
                </li>
              </ul>
            </div> }
            { this.props.activeTab && !(this.props.activeTab=='The Event' || this.props.activeTab=='Donation' )&& this.props.settings && this.props.settings.categories  && <div id="divItemCategories" className={cx("item-categories hidden-xs")}>
              <h4 className={cx("")}>Categories</h4>
              <ul className={cx("nav nav-pills nav-stacked category-list ")}>
                <li className={cx("all-items")}>
                  <a href="#" className={cx("category-switcher all-items")} data-category="" data-module="#raffle">
                    <i className={cx("fa fa-ticket")}></i>
                    <span className={cx("cat-name")}>All Items</span>
                    <span className={cx("badge badge-primary pull-right cat-count")}></span>
                  </a>
                </li>
                {
                  this.props.settings && this.props.settings.categories && this.props.settings.categories.map(item=>
                    <li className={cx("")} key={item+Math.random()}>
                    <a className={cx("category-switcher pointer")}>
                      <i className={cx("fa fa-ticket")}></i>
                      <span className={cx("cat-name")}>{item}</span>
                      {/*<span className={cx("badge badge-primary pull-right cat-count")}>1</span>*/}
                    </a>
                  </li>)
                }
                <li className={cx("")}>
                <a href="#" className={cx("category-switcher")} data-category="Uncategorized" data-module="#raffle">
                  <i className={cx("fa fa-ticket")}></i>
                  <span className={cx("cat-name")}>Uncategorized</span>
                  <span className={cx("badge badge-primary pull-right cat-count")}>1</span>
                </a>
              </li>
              </ul>
            </div> }
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(EventAside);
