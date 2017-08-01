
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
  componentDidMount(){
    this.getDashboard()
  }
  getDashboard = () => {
    this.props.getDashboard().then((resp) => {
      this.setState({
        data:resp
      })
    });
  }
  render() {
    return (
      <div id="content-wrapper" className="admin-content-wrapper">
        <div className="row">
          {console.log("-><-",this.state.data)}
          <div className="col-sm-12">
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
                  linkTo={ this.state.data && "https://www.accelevents.com/events/" +  this.state.data.eventUrl}
                  linkTitle="Share your custom event page with your participants"
                  linkText={ this.state.data && "https://www.accelevents.com/events/" +  this.state.data.eventUrl}
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
                  linkText={ this.state.data && this.state.data.eventPhoneNumber}
                  linkTarget=""
                  tooltip="Text bids, raffle tickets, and pledges to this number"
                />
              </div>
            </div>

            <div className="form-group flex-row flex-2-col">
              <div className="flex-col flex-col-mobile">
                { this.state.data && this.state.data.ticketingDetail  && <PenalBoxWidget
                  boxTitle="Event Ticketing"
                  badgeTitle="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here."
                  badgeLink="/host/settings/account"
                  badgeClass="white text-uppercase pull-right badge badge-danger"
                  firstTitle="Time Until Event Starts:"
                  firstData= {this.state.data.ticketingDetail.startDate}
                  secondTitle="Total Collection from ticket sales"
                  secondData={ this.state.data.ticketingDetail.collectedAmout}
                  thirdTitle="Total tickets sold"
                  thirdData={ this.state.data.ticketingDetail.numberOfTicketSold}
                  active={this.state.data.ticketingDetail.active}
                /> }
              </div>
              <div className="flex-col flex-col-mobile">
                { this.state.data  && this.state.data.auctionDetail &&  <PenalBoxWidget
                  boxTitle="Auction"
                  badgeTitle="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here."
                  badgeLink="/host/settings/account"
                  badgeClass="white text-uppercase pull-right badge badge-danger"
                  firstTitle="Ends In"
                  firstData={this.state.data.auctionDetail.endDate}
                  secondTitle="Proceeds"
                  secondData={this.state.data.auctionDetail.collectedAmout}
                  thirdTitle="Bidders"
                  thirdData={this.state.data.auctionDetail.numberOfBidder}
                  active={this.state.data.auctionDetail.active}
                /> }
              </div>
              <div className="flex-col flex-col-mobile">
                { this.state.data &&  this.state.data.raffleDetail &&  <PenalBoxWidget
                  boxTitle="Raffle"
                  badgeTitle="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here."
                  badgeLink="/host/settings/account"
                  badgeClass="white text-uppercase pull-right badge badge-danger"
                  firstTitle="Ends In"
                  firstData={ this.state.data.raffleDetail.endDate}
                  secondTitle="Proceeds"
                  secondData={ this.state.data.raffleDetail.collectedAmout}
                  thirdTitle="Ticket Purchasers"
                  thirdData={ this.state.data.raffleDetail.numberOfTicketPurchased}
                  active={this.state.data.raffleDetail.active}
                /> }
              </div>
              <div className="flex-col flex-col-mobile">
                { this.state.data &&  this.state.data.fundANeedDetail && <PenalBoxWidget
                  boxTitle="Fund a Need"
                  badgeTitle="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here."
                  badgeLink="/host/settings/account"
                  badgeClass="white text-uppercase pull-right badge badge-danger"
                  firstTitle="Ends In"
                  firstData={this.state.data.fundANeedDetail.endDate}
                  secondTitle="Proceeds"
                  secondData={ this.state.data.fundANeedDetail.collectedAmout}
                  thirdTitle="Donors"
                  thirdData={this.state.data.fundANeedDetail.donors}
                  active={this.state.data.fundANeedDetail.active}
                /> }
              </div>
            </div>
            <div className="row form-group">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="main-box clearfix">
                  <header className="main-box-header clearfix">
                    <h2>Event Checklist</h2>
                  </header>
                  <div className="main-box-body clearfix">
                    <ul className="widget-todo">
                      {  this.state.data &&  this.state.data.checkList.map((value,index)=>
                        <EventChecklist checkList={value} />
                      )}
                    </ul>
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
  getDashboard: () => getDashboard()
};
const mapStateToProps = (state) => ({
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Admin));
