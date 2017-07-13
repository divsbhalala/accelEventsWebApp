
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
              />

            </div>
          </div>

          <div className="form-group flex-row flex-2-col">
            <div className="flex-col flex-col-mobile">
              <PenalBoxWidget
                boxTitle="Event Ticketing"
                badgeTitle="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here."
                badgeLink="/host/settings/account"
                badgeClass="white text-uppercase pull-right badge badge-danger"
                badgeText="Test Mode"
                endDate="2017-06-07T18:55:54"
                endsInDays="22"
                endsInHours="10"
                endsInMinute="11"
                endsInSecond="20"
                data={[{"Total Collection from ticket sales": this.state.data && "$"+this.state.data.ticketingDetail.collectedAmout}, {"Bidders": this.state.data && this.state.data.ticketingDetail.numberOfTicketSold}]}
              />
            </div>
            <div className="flex-col flex-col-mobile">
              <PenalBoxWidget
                boxTitle="Auction"
                badgeTitle="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here."
                badgeLink="/host/settings/account"
                badgeClass="white text-uppercase pull-right badge badge-danger"
                badgeText="Test Mode"
                endDate="2017-06-07T18:55:54"
                endsInDays="22"
                endsInHours="10"
                endsInMinute="11"
                endsInSecond="20"
                data={[{"Proceeds":this.state.data && "$"+ this.state.data.auctionDetail.collectedAmout}, {"Bidders":this.state.data && this.state.data.auctionDetail.numberOfBidder}]}
              />
            </div>
            <div className="flex-col flex-col-mobile">
              <PenalBoxWidget
                boxTitle="Raffle"
                badgeTitle="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here."
                badgeLink="/host/settings/account"
                badgeClass="white text-uppercase pull-right badge badge-danger"
                badgeText="Test Mode"
                endDate="2017-06-07T18:55:54"
                endsInDays="22"
                endsInHours="10"
                endsInMinute="11"
                endsInSecond="20"
                data={[{"Proceeds":this.state.data && "$"+ this.state.data.raffleDetail.collectedAmout}, {"Ticket Purchasers":this.state.data && this.state.data.raffleDetail.numberOfTicketPurchased}]}
              />
            </div>
            <div className="flex-col flex-col-mobile">
              <PenalBoxWidget
                boxTitle="Fund a Need"
                badgeTitle="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here."
                badgeLink="/host/settings/account"
                badgeClass="white text-uppercase pull-right badge badge-danger"
                badgeText="Test Mode"
                endDate="2017-06-07T18:55:54"
                endsInDays="22"
                endsInHours="10"
                endsInMinute="11"
                endsInSecond="20"
                data={[{"Proceeds":this.state.data && "$"+ this.state.data.fundANeedDetail.collectedAmout}, {"Donors":this.state.data && this.state.data.fundANeedDetail.donors}]}
              />
            </div>
          </div>

          <div className="row form-group">
            <EventChecklist />
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

