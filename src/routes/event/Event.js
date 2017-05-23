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
import s from './Event.css';
import cx from 'classnames';
import {connect} from 'react-redux';

import  EventAside from './../../components/EventAside/EventAside';
import  EventAuctionBox from './../../components/EventAuctionBox/EventAuctionBox';
import  EventTabCommonBox from './../../components/EventTabCommonBox/EventTabCommonBox'
import  EventDonation from './../../components/EventDonation/EventDonation'

class Event extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };
  constructor(props){
    super(props);
    this.state={
      tab:'The Event'
    }
  }


    render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className={cx("header-img","text-center")}>
              <img src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/0-1900x300/d631f896-be71-4e95-9d29-9ce501f7a4b8_fall_formal_2015.png" className={cx("img-responsive","img-banner")} style={{width: "100%"}} />
            </div>
          </div>
          <div id="content-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">
                <EventAside activeTab={this.state.tab}/>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8 ">
                <div className="main-box">
                  <Tabs onSelect={ (index, label)=>{ this.setState({ tab:label})} } selected={this.state.tab} className="tabs-wrapper">
                    <Tab label="The Event">
                      <div className={cx("row item-canvas")}>
                        <div className={cx("mrg-t-lg mrg-b-lg pad-t-lg pad-r-lg pad-b-lg pad-l-lg event-description-display")}></div>
                      </div>
                      <div className={cx("row text-center")}>
                        <div className={cx("col-md-offset-3 col-md-6")}>
                          <a href="#buy-event-tickets" role="button" data-toggle="modal" className={cx("btn btn-block btn-lg btn-orange ")}>&nbsp; &nbsp; &nbsp; &nbsp; Buy Tickets&nbsp; &nbsp; &nbsp; &nbsp; </a>
                        </div>
                      </div>
                    </Tab>
                    <Tab label="Auction">
                      <div className="row">
                        <EventTabCommonBox
                          headerText="Louis Vuitton Sunglasses"
                          itemCode="SLV"
                          isSharable="false"
                          data={
                          [{title:"CURRENT BID", value:'$425'}]
                          }
                          descText="Trendy Louis Vuitton Sunglasses - Like New"
                          imageUrl="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"
                          actionTitle="Bidding Closed"
                          actionClassName="btn btn-primary disabled"
                        />
                        <EventTabCommonBox
                          headerText="Louis Vuitton Sunglasses"
                          itemCode="SLV"
                          isSharable="false"
                          data={
                          [{title:"CURRENT BID", value:'$425'}]
                          }
                          descText="Trendy Louis Vuitton Sunglasses - Like New"
                          imageUrl="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"
                          actionTitle="Bidding Closed"
                          actionClassName="btn btn-primary disabled"
                        />
                        <EventTabCommonBox
                          headerText="Louis Vuitton Sunglasses"
                          itemCode="SLV"
                          isSharable="false"
                          data={
                          [{title:"CURRENT BID", value:'$425'}]
                          }
                          descText="Trendy Louis Vuitton Sunglasses - Like New"
                          imageUrl="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"
                          actionTitle="Bidding Closed"
                          actionClassName="btn btn-primary disabled"
                        />
                        <EventTabCommonBox
                          headerText="Louis Vuitton Sunglasses"
                          itemCode="SLV"
                          isSharable="false"
                          data={
                          [{title:"CURRENT BID", value:'$425'}]
                          }
                          descText="Trendy Louis Vuitton Sunglasses - Like New"
                          imageUrl="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"
                          actionTitle="Bidding Closed"
                          actionClassName="btn btn-primary disabled"
                        />
                        <EventTabCommonBox
                          headerText="Louis Vuitton Sunglasses"
                          itemCode="SLV"
                          isSharable="false"
                          data={
                          [{title:"CURRENT BID", value:'$425'}]
                          }
                          descText="Trendy Louis Vuitton Sunglasses - Like New"
                          imageUrl="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"
                          actionTitle="Bidding Closed"
                          actionClassName="btn btn-primary disabled"
                        />
                        <EventTabCommonBox
                          headerText="Louis Vuitton Sunglasses"
                          itemCode="SLV"
                          isSharable="false"
                          data={
                          [{title:"CURRENT BID", value:'$425'}]
                          }
                          descText="Trendy Louis Vuitton Sunglasses - Like New"
                          imageUrl="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"
                          actionTitle="Bidding Closed"
                          actionClassName="btn btn-primary disabled"
                        />
                        <EventTabCommonBox
                          headerText="Louis Vuitton Sunglasses"
                          itemCode="SLV"
                          isSharable="false"
                          data={
                          [{title:"CURRENT BID", value:'$425'}]
                          }
                          descText="Trendy Louis Vuitton Sunglasses - Like New"
                          imageUrl="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"
                          actionTitle="Bidding Closed"
                          actionClassName="btn btn-primary disabled"
                        />
                        <EventTabCommonBox
                          headerText="Louis Vuitton Sunglasses"
                          itemCode="SLV"
                          isSharable="false"
                          data={
                          [{title:"CURRENT BID", value:'$425'}]
                          }
                          descText="Trendy Louis Vuitton Sunglasses - Like New"
                          imageUrl="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"
                          actionTitle="Bidding Closed"
                          actionClassName="btn btn-primary disabled"
                        />

                      </div>
                    </Tab>
                    <Tab label="Raffle">
                      <div className="row">
                        <EventTabCommonBox
                          headerText="My First Raffle Item"
                          itemCode="RAF"
                          data={
                          [{title:"TICKETS SUBMITTED", value:0}]
                          }
                          isSharable="false"
                          descText="testDesc"
                          imageUrl="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/8921aa81-cc4e-4d9b-a19a-2d5f07fc0aa5_lighthouse.jpg"
                          actionTitle="Raffle Closed"
                          actionClassName="btn btn-primary btn-block disabled"
                        />

                      </div>
                    </Tab>
                    <Tab label="Fund a Need">
                      <div className="row">
                        <EventTabCommonBox
                          headerText="My Fund a Need Item"
                          itemCode="FAN"
                          data={
                          [{title:"TMINIMUM PLEDGE", value:"300"}]
                          }
                          isSharable="false"
                          descText="testDesc"
                          imageUrl="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/8921aa81-cc4e-4d9b-a19a-2d5f07fc0aa5_lighthouse.jpg"
                          actionTitle="Pledging Closed"
                          actionClassName="btn btn-primary btn-block disabled"
                        />

                      </div>
                    </Tab>
                    <Tab label="Donation">
                      <div className="row"><EventDonation /></div>
                    </Tab>
                  </Tabs>
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
export default (withStyles(s)(Event));
