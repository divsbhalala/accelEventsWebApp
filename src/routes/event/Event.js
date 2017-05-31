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
import InfiniteScroll from 'react-infinite-scroll-component';
import history from './../../history';
import { Button } from 'react-bootstrap';

import  EventAside from './../../components/EventAside/EventAside';
import  EventAuctionBox from './../../components/EventAuctionBox/EventAuctionBox';
import  EventTabCommonBox from './../../components/EventTabCommonBox/EventTabCommonBox';
import  EventDonation from './../../components/EventDonation/EventDonation';
import PopupModel from './../../components/PopupModal';

import {doGetEventData,
  doGetEventTicketSetting,
  doGetSettings,
  doGeItemByCode,
  doGetItemByLimit,
  doGetAuctionItemByLimit,
} from './action/index';
let  ar=[1,2,3,4,5,6,7,8];
class Event extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };
  constructor(props){
    super(props);
    this.state={
      tab:'The Event',
      totalAuction:ar,
      showBookingTicketPopup:false,
      showMapPopup:false,
      settings:null,
      auctionPageCount:0,
      auctionPageLimit:8,
      auctionPageItems:[],
      auctionPageLoading:true,
      rafflePageCount:8,
      rafflePageLimit:8,
      fundANeedPageCount:8,
      FundANeedPageLimit:8,
    };
    this.generateDivs = this.generateDivs.bind(this);
    this.showBookingPopup = this.showBookingPopup.bind(this);
    this.hideBookingPopup = this.hideBookingPopup.bind(this);
    this.showMapPopup = this.showMapPopup.bind(this);
    this.hideMapPopup = this.hideMapPopup.bind(this);
    this.setActiveTabState = this.setActiveTabState.bind(this);
    this.doGetAuctionItemByLimit = this.doGetAuctionItemByLimit.bind(this);

  }
  generateDivs=()=>{
    this.doGetAuctionItemByLimit(this.props.params && this.props.params.params);
    setTimeout(() => {
      this.setState({
        totalAuction:ar
      })
    }, 500);

  };
  showBookingPopup= (e)=>{
    e.preventDefault();
    this.setState({
      showBookingTicketPopup:true
    })
  };

  hideBookingPopup=()=>{
    this.setState({
      showBookingTicketPopup:false
    })
  };
  showMapPopup= (e)=>{
    e.preventDefault();
    this.setState({
      showMapPopup:true
    })
  };

  hideMapPopup=()=>{
    this.setState({
      showMapPopup:false
    })
  };

  componentWillMount(){
    this.props.doGetEventData(this.props.params && this.props.params.params);
    //this.props.doGetEventTicketSetting(this.props.params && this.props.params.params);
    this.props.doGetSettings(this.props.params && this.props.params.params, 'ticketing').then(resp=> {
      this.setState({
        settings: resp && resp.data
      });
    }).catch(error=>{
       history.push('/404');
    });
  }
  setActiveTabState=(label)=>{
    this.setState({ tab:label});
    if(label && (label=='Auction' || label=='Raffle' || label=='Fund a Need' || label=='The Event' || label=='Donation' )){
      if(label=='Auction'){
        label='auction';
        this.doGetAuctionItemByLimit(this.props.params && this.props.params.params);

      } else if(label=='Raffle'){
        label='raffle';
      } else if(label=='Fund a Need'){
        label='fundaneed';
      } else if(label=='The Event'){
        label='ticketing';
      } else if(label=='Donation'){
        label='donation';
      }
      this.props.doGetSettings(this.props.params && this.props.params.params, label).then(resp=>{
         this.setState({
           settings:resp && resp.data
         });
      })
        .catch(error=>{
          console.log(error)
        // history.push('/404');
      });

    }

  };

  doGetAuctionItemByLimit(eventUrl){
    this.props.doGetAuctionItemByLimit(eventUrl, this.state.auctionPageCount, this.state.auctionPageLimit).then(resp=>{
      console.log(resp)
      if(resp && resp.data){
        if(resp.data.length < 10){
          this.setState({
            auctionPageLoading:false
          })
        }
        this.setState({
          auctionPageItems:this.state.auctionPageItems.concat(resp.data),
          auctionPageCount:this.state.auctionPageCount+1

        })
      }
      else{
        this.setState({
          auctionPageLoading:false
        })
      }
    }).catch(error=>{
      console.log('er',error);
      this.setState({
        auctionPageLoading:false
      })
    })
  }

    render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          {this.props.eventData && this.props.eventData.design_detail && this.props.eventData.design_detail.is_banner_image_enabled  && <div className="row">
            <div className={cx("header-img","text-center")}>
              <img src={ this.props.eventData && this.props.eventData.design_detail && this.props.eventData.design_detail.banner_image ? "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/0-1900x300/"+this.props.eventData.design_detail.banner_image:"http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/0-1900x300/d631f896-be71-4e95-9d29-9ce501f7a4b8_fall_formal_2015.png"} className={cx("img-responsive","img-banner")} style={{width: "100%"}} />
            </div>
          </div>}
          <div id="content-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">
                <EventAside activeTab={this.state.tab} eventData={this.props.eventData} settings={this.state.settings} eventTicketData={this.props.eventTicketData} showBookingPopup={this.showBookingPopup} showMapPopup={this.showMapPopup} />
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8 ">
                <div className="main-box">
                  <Tabs onSelect={ (index, label)=>{ this.setActiveTabState(label)} } selected={this.state.tab} className="tabs-wrapper">
                    <Tab label="The Event">
                      <div className={cx("row item-canvas")}>
                        <div className={cx("mrg-t-lg mrg-b-lg pad-t-lg pad-r-lg pad-b-lg pad-l-lg event-description-display")}></div>
                      </div>
                      <div className={cx("row text-center")}>
                        <div className={cx("col-md-offset-3 col-md-6")}>
                          <a  onClick={this.showBookingPopup} className={cx("btn btn-block btn-lg btn-orange ")}>&nbsp; &nbsp; &nbsp; &nbsp; Buy Tickets&nbsp; &nbsp; &nbsp; &nbsp; </a>
                        </div>
                      </div>
                    </Tab>
                    <Tab label="Auction">
                      <div className="row">
                        <InfiniteScroll
                          next={this.generateDivs}
                          hasMore={true}
                          loader={<h4>Loading...</h4>}>
                          {
                            this.state.auctionPageItems.map((item)=>
                              <EventTabCommonBox key={item.id+Math.random().toString()}
                                                 type="auction"
                                                 headerText={item.name}
                                                 itemCode={item.code}
                                                 isSharable="false"
                                                 data={
                                                   [
                                                     {title: item.currentBid != 0 ? "CURRENT BID" : "Starting Bid",
                                                       value: item.currentBid != 0 ? '$'+item.currentBid : '$'+item.startingBid
                                                     }
                                                   ]
                                                 }
                                                 descText={item.excerpt}
                                                 imageUrl={ item.images && item.images.length> 0 ? 'http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/'+item.images[0].imageUrl:"http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"}
                                                 actionTitle={item.purchased ? null:"Bid"}
                                                 actionClassName={ item.purchased ? "btn btn-primary disabled":"btn btn-success w-50"}
                                                 auctionPurchaseFor={ item.purchased}
                                                 auctionBuyNowTitle={ (item.purchased ? "Purchased for $":"But now $")+ item.currentBid}
                                                 auctionBuyNowClassName="item-link btn btn-success actionlinks"
                                                 marketValue={item.marketValue > 0 ? '$'+item.marketValue:null}
                                                 marketValueLabel={item.marketValue > 0 ? 'Market Value':null}
                              />
                            )
                          }
                        </InfiniteScroll>
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
        <PopupModel
          id="bookingPopup"
          showModal={this.state.showBookingTicketPopup}
          headerText="Register"
          modelBody='<form action="/AccelEventsWebApp/u/checkout/jkazarian8/orderTicket" method="POST"> <div class="ticket-type-container"> <input type="hidden" value="44" name="tickettypeid"> <div class="sale-card"> <div class="flex-row"> <div class="flex-col"> <div class="type-name"><strong>First ticket type</strong> (<span class="type-cost txt-sm gray"> $100.00 </span>) <div class="pull-right"> <div class="col-md-7">No Of Tickets</div><div class="col-md-5"> SOLD OUT </div></div></div><div class="sale-text txt-sm text-uppercase">Sale Ended on Apr 12, 2017</div></div></div></div></div><div class="status-bar clearfix mrg-t-lg"> <div class="pull-left"> <span> QTY:<span class="qty">0</span> </span> <span class="total-price">FREE</span> </div><div class="pull-right"> <button type="button" class="btn btn-success" id="checkout-tickets">checkout</button> </div></div></form>'
          onCloseFunc={this.hideBookingPopup}
        />

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
  doGetEventData : (eventUrl) => doGetEventData(eventUrl),
  doGetEventTicketSetting : (eventUrl) => doGetEventTicketSetting(eventUrl),
  doGeItemByCode : ( eventUrl, itemCode, type) => doGeItemByCode( eventUrl, itemCode, type),
  doGetItemByLimit : (eventUrl, page, size, type) => doGetItemByLimit(eventUrl, page, size, type),
  doGetAuctionItemByLimit : (eventUrl, page, size, type) => doGetAuctionItemByLimit(eventUrl, page, size, type),
  doGetSettings : (eventUrl, type) => doGetSettings(eventUrl, type),
};
const mapStateToProps = (state) => ({
  eventData:state.event && state.event.data,
  eventTicketData:state.event && state.event.ticket_data,
  eventRaffleData:state.event && state.event.raffle_data,
  eventFundData:state.event && state.event.fund_data,
  eventDonationData:state.event && state.event.donation_data,
});

export default  connect(mapStateToProps,mapDispatchToProps)(withStyles(s)(Event));
//export default (withStyles(s)(Event));
