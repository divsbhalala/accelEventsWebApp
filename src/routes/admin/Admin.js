
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Admin.css';
import BoxWidget from '../../components/Widget/Box';
import EventChecklist from '../../components/EventChecklist/index';
import PenalBoxWidget from '../../components/Widget/PenalBox';
import {getDashboard} from './action/index';
import {connect} from 'react-redux';


class Admin extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    }
  }

  render() {
    return (
      <div id="content-wrapper" className="admin-content-wrapper">
        <div className="row">
          { this.props.hostData ? <div className="col-sm-12">
            <div className="row">
              <div className="col-lg-12">
                <div id="content-header" className="clearfix">
                  <div className="pull-left">
                    <h1>Dashboard</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="row form-group flexrow dashboard">

              <div className="col-lg-6 col-sm-6 col-xs-12">
                <BoxWidget
                  className="main-box infographic-box colored display-page-box"
                  headerText="Fundraiser Page"
                  descText="Share this URL with your audience so that they can learn about your fundraiser and participate online."
                  linkTo={ this.props.hostData && "https://www.accelevents.com/events/" +  this.props.hostData.eventUrl}
                  linkTitle="Share your custom event page with your participants"
                  linkText={ this.props.hostData && "https://www.accelevents.com/events/" +  this.props.hostData.eventUrl}
                  linkTarget="_blank"
                  tooltip="Share your custom event page with your participants"
                />
              </div>
              <div className="col-lg-6 col-sm-6 col-xs-12">
                <BoxWidget
                  className="main-box infographic-box colored emerald-bg"
                  headerText="Event Text Message Number"
                  descText="This is the phone number that participants will use."
                  linkTo="javascript:void(0)"
                  linkTitle="Text bids, raffle tickets, and pledges to this number"
                  linkText={ this.props.hostData && this.props.hostData.eventPhoneNumber}
                  linkTarget=""
                  tooltip="Text bids, raffle tickets, and pledges to this number"
                />
              </div>
            </div>

            <div className="form-group flex-row flex-2-col">
							{ this.props.hostData && this.props.hostData.ticketingEnabled ?<div className="flex-col flex-col-mobile">
                 <PenalBoxWidget
                  boxTitle="Event Ticketing"
                  badgeTitle="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here."
                  badgeLink="/host/settings/account"
                  badgeClass="white text-uppercase pull-right badge badge-danger"
                  firstTitle="Time Until Event Starts:"
                  firstData= {this.props.hostData.ticketingDetail.startDate}
                  secondTitle="Total Collection from ticket sales"
                  secondData={ this.props.hostData.ticketingDetail.collectedAmout}
                  thirdTitle="Total tickets sold"
                  thirdData={ this.props.hostData.ticketingDetail.numberOfTicketSold}
                  active={this.props.hostData.ticketingDetail.active}
                />
              </div> : ""}
							{ this.props.hostData && this.props.hostData.auctionEnabled ? <div className="flex-col flex-col-mobile">
                 <PenalBoxWidget
                  boxTitle="Auction"
                  badgeTitle="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here."
                  badgeLink="/host/settings/account"
                  badgeClass="white text-uppercase pull-right badge badge-danger"
                  firstTitle="Ends In"
                  firstData={this.props.hostData.auctionDetail.endDate}
                  secondTitle="Proceeds"
                  secondData={this.props.hostData.auctionDetail.collectedAmout}
                  thirdTitle="Bidders"
                  thirdData={this.props.hostData.auctionDetail.numberOfBidder}
                  active={this.props.hostData.auctionDetail.active}
                />
              </div> : "" }
							{ this.props.hostData && this.props.hostData.raffleEnabled ? <div className="flex-col flex-col-mobile">
                  <PenalBoxWidget
                  boxTitle="Raffle"
                  badgeTitle="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here."
                  badgeLink="/host/settings/account"
                  badgeClass="white text-uppercase pull-right badge badge-danger"
                  firstTitle="Ends In"
                  firstData={ this.props.hostData.raffleDetail.endDate}
                  secondTitle="Proceeds"
                  secondData={ this.props.hostData.raffleDetail.collectedAmout}
                  thirdTitle="Ticket Purchasers"
                  thirdData={ this.props.hostData.raffleDetail.numberOfTicketPurchased}
                  active={this.props.hostData.raffleDetail.active}
                />
              </div> : ""}
							{ this.props.hostData && this.props.hostData.fundANeedEnabled ? <div className="flex-col flex-col-mobile">
                  <PenalBoxWidget
                  boxTitle="Fund a Need"
                  badgeTitle="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here."
                  badgeLink="/host/settings/account"
                  badgeClass="white text-uppercase pull-right badge badge-danger"
                  firstTitle="Ends In"
                  firstData={this.props.hostData.fundANeedDetail.endDate}
                  secondTitle="Proceeds"
                  secondData={ this.props.hostData.fundANeedDetail.collectedAmout}
                  thirdTitle="Donors"
                  thirdData={this.props.hostData.fundANeedDetail.donors}
                  active={this.props.hostData.fundANeedDetail.active}
                />
              </div> : ""}
            </div>
            <div className="row form-group">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="main-box clearfix">
                  <header className="main-box-header clearfix">
                    <h2>Event Checklist</h2>
                  </header>
                  <div className="main-box-body clearfix">
                    <ul className="widget-todo">
                      {  this.props.hostData &&  this.props.hostData.checkList.map((value,index)=>
                        <EventChecklist key={index} checkList={value} phone={ this.props.hostData && this.props.hostData.eventPhoneNumber} />
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> : "" }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
};
const mapStateToProps = (state) => ({
	user: state.session.user,
	authenticated: state.session.authenticated,
  hostData : state.host && state.host.data,
	currencySymbol : (state.host && state.host.currencySymbol) || "$",
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Admin));

