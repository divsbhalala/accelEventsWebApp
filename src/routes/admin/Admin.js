
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Admin.css';
import BoxWidget from '../../components/Widget/Box';
import EventChecklist from '../../components/EventChecklist/index';
import PenalBoxWidget from '../../components/Widget/PenalBox';


class Admin extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
        <div id="content-wrapper" className="admin-content-wrapper">
          <div className="row">
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
                linkTo="https://www.accelevents.com/events/a"
                linkTitle="Share your custom event page with your participants"
                linkText="https://www.accelevents.com/events/a"
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
                linkText="[account activation required]"
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
                data={[{"Proceeds":"$0.00"}, {"Bidders":"0"}]}
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
                data={[{"Proceeds":"$0.00"}, {"Bidders":"0"}]}
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
                data={[{"Proceeds":"$0.00"}, {"Bidders":"0"}]}
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
                data={[{"Proceeds":"$0.00"}, {"Bidders":"0"}]}
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
export default withStyles(s)(Admin);
