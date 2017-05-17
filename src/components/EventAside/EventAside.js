/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EventAside.css';
import Link from '../Link';
import cx from 'classnames';

class EventAside extends React.Component {
  render() {
    return (
      <div >
        <script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false&amp;libraries=places&amp;key=AIzaSyCTdjRtF5L54QIJdEQ8DyXlf2umq6MpvEw"></script>
        <div className={cx("main-box", "clearfix")}>
          <header className={cx("main-box-header", "clearfix")}>
            <h2>jkazarian8</h2>
          </header>
          <div className={cx("main-box-body","clearfix")}>
            <img src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/a08ed5d6-e0dc-4c23-b57c-b7eddfc7db93_unnamed.png" className="img-responsive center-block" />
            <div className={cx("the-event","mrg-t-lg")}>
                <a href="#buy-event-tickets" role="button" data-toggle="modal" className={cx("btn","btn-block","btn-lg","btn-orange")}>Buy Tickets</a>
                <div className={cx("box")}>
                  <div className={cx("box-title","text-uppercase")}>date and time</div>
                  <div className={cx("box-content")}>
                    <time>




                      Thu, April 13, 2017
                      01:29 PM
                      —

                      Fri, April 14, 2017

                      05:29 PM<span className="hide"> (America/New_York)</span>
                    </time><br />
                    <a className="hide" href="#">Add to calendar</a>
                  </div>
                </div>
                <div className="box">
                  <div className={cx("box-title","text-uppercase")}>Location</div>
                  <div className="box-content">
                    <address>

                    </address>
                    <a data-toggle="modal" data-target="#location-dialog">View on Map</a>
                  </div>
                </div>
              </div>
            <div className={cx("card bidinfo")} style={{display: "none"}}>
                <p className={cx("raffle-text")} style={{display: "none"}}>Submit your tickets here or text your ticket submission to: (410) 927-5356 with the item's three letter code, and your desired number of tickets ex. ABC10</p>
                <p className={cx("causeauction-text donation-text auction-text")} style={{display: "none"}}>Bid here or text Your Bid To: (410) 927-5356 with the item's three letter code and bid amount ex. ABC$300</p>
              </div>
            <div id="countdownTimer" className={cx("main-box clearfix project-box gray-box card")} style={{display: "none"}}>
                <div className={cx("main-box-body clearfix")}>
                  <div className={cx("project-box-header gray-bg")}>
                    <div className={cx("name text-center")}>
                      <a href="#">Time Until Event Ends</a>
                    </div>
                  </div>
                  <div className={cx("project-box-content")}>
                    <div className={cx("ticker")}>
                      <div className={cx("row timer")}>
                        <div className={cx("col-xs-4")}><span className={cx("days")}>00</span></div>
                        <div className={cx("col-xs-4")}><span className={cx("hours")}>00</span></div>
                        <div className={cx("col-xs-4")}><span className={cx("minutes")}>00</span></div>
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
              </div>
            <div className={cx("main-box clearfix project-box gray-box card funds-raised-container")} style={{display: "none"}}>
                <div className={cx("main-box-body clearfix")}>
                  <div className={cx("project-box-header gray-bg")}>
                    <div className={cx("name text-center")}>
                      <a href="#">Total Funds Raised</a>
                    </div>
                  </div>
                  <div className={cx("project-box-content")}>
                    <div className={cx("funds-raised")}>$<span className={cx("total-funds-raised")}></span></div>
                  </div>
                </div>
              </div>
            <a role="button" className={cx("btn btn-primary btn-block disabled buy-raffle-tickets")} data-toggle="modal" href="#info-modal" data-title="Raffle Drawn" data-message="This raffle has already been drawn. No further tickets are being accepted" style={{display: "none"}}>Raffle Closed</a>
            <div className={cx("search-bar card")} data-module="" style={{display: "none"}}>
                <input type="text" className={cx("form-control")} placeholder="Search Items..." />
              </div>
            <div className={cx("text-center powered-by-sidebar")}><span>Powered by </span><a href="https://www.accelevents.com" target="_blank">
                <img src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x50/937320cf-a809-49c5-916d-e7436a1cfcaeaccelevents-logo-black.png" className={cx("img-responsive")} />
              </a>
              </div>
            <input type="hidden" value="true" id="causeAuctionCategoryEnabled" />
            <input type="hidden" value="true" id="raffleCategoryEnabled" />
            <input type="hidden" value="false" id="auctionCategoryEnabled" />
            <div id="divItemCategories" className={cx("item-categories hidden-xs hide")}>
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
                    </div>
            <div className={cx("item-categories hidden-sm hidden-md hidden-lg hide")}>
                      <h4 className=" ">Categories</h4>
                      <div className="dropdown">
                        <button className={cx("btn btn-block dropdown-toggle")} type="button" data-toggle="dropdown"><span className={cx("text")}>All Items</span>
                          <span className={cx("caret")}></span></button>
                        <ul className={cx("dropdown-menu category-list")} style={{width: "100%"}}>
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
                      </div>
                    </div>

          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(EventAside);
