
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Setting.css';
import AdminSiderbar from '../../../components/Sidebar/AdminSidebar';

class Setting extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-offset-2 col-sm-10">
            <div id="content-wrapper">
            <div className="row" style={{opacity: 1}}>
            <div className="col-lg-12">
            <div className="row">
            <div className="col-lg-12">
            <div id className="clearfix">
            <div className="pull-left">
            </div>
            <ol className="breadcrumb">
            <li><a href="/AccelEventsWebApp/host/dashboard/home">Home</a></li>
            <li className="active"><span>General Settings</span></li>
            </ol>
            <h1>
            General Settings
            <div className="pull-right">
            <button className="btn btn-info" id="save-settings" onclick="$('#submitForm').click();" type="button">&nbsp;&nbsp;&nbsp;&nbsp;Save Settings&nbsp;&nbsp;&nbsp;&nbsp;</button>
            </div>
            </h1>
            </div>
            </div>
            </div>
            <div className="row">
            <div className>
            <div className="main-box no-header">
            <div className="main-box-body clearfix">
            <form id="form" action="/AccelEventsWebApp/host/settings/updatesettings" method="post">
            <div className="form-group row">
            <div className="col-md-4">
            <label>Select Currency</label>
            </div>
            <div className="col-md-4">
            <select className="form-control" name="currency" id="currency">
            <option value="USD" selected> USD ( $ )</option>
            <option value="CAD"> CAD ( $ )</option>
            <option value="AUD"> AUD ( $ )</option>
            <option value="EURO"> EURO ( € )</option>
            <option value="POUND"> POUND ( £ )</option>
            <option value="RAND"> RAND ( R )</option>
            </select>
            </div>
            </div>
            <div className="form-group row">
            <div className="col-md-4">
            <label>Event Fundraising Goal (used for event display)</label>
            <p className="help-text">Your event fundraising goal is the
            dollar amount that you hope to raise. This amount will be
            displayed to attendees to encourage donations and monitor
            progress towards your goal.</p>
            </div>
            <div className="col-md-4">
            <div className="input-group">
            <span className="input-group-addon">$</span>
            <input type="text" className="form-control" name="fundRaisingGoal" defaultValue={0} />
            </div>
            </div>
            </div>
            <div className="form-group row">
            <div className="col-md-4">
            <label>Goal Starting Amount</label>
            <p className="help-text">If you have already received
            donations or sold tickets for your event you can enter a
            starting amount to be used for your contributions.</p>
            </div>
            <div className="col-md-4">
            <div className="input-group">
            <span className="input-group-addon">$</span>
            <input type="text" className="form-control" name="goalStartingAmount" defaultValue={0} />
            </div>
            </div>
            </div>
            <div className="form-group row">
            <div className="col-md-4">
            <label>Bidder Residential Address</label>
            <p className="help-text">On Sign Up page, you can ask Bidder to enter Residential Address which may be helpful for delivering an item.</p>
            </div>
            <div className="col-md-4">
            <div className="onoffswitch onoffswitch-success">
            <input type="checkbox" name="requireBidderAddress" className="onoffswitch-checkbox" id="bidderaddress" />
            <label className="onoffswitch-label" htmlFor="bidderaddress">
            <div className="onoffswitch-inner" />
            <div className="onoffswitch-switch" />
            </label>
            <input type="hidden" name="requireBidderAddress" defaultValue="off" />
            </div>
            </div>
            </div>
            <div className="main-box-body clearfix">
            <p>Disabling a module from this page will hide the module setup page and hide the tab on the Display Page. If you only wish to hide the module tab on the Display Page you can do so from the module Settings page in the left hand navigation menu.</p>
            </div>
            <div className="form-group row">
            <div className="col-md-4">
            <label>Enable Silent Auctions</label>
            <p className="help-text" />
            </div>
            <div className="col-md-4">
            <div className="onoffswitch onoffswitch-success">
            <input type="checkbox" name="silentAuctionEnabled" className="onoffswitch-checkbox" id="silentauction" defaultChecked />
            <label className="onoffswitch-label" htmlFor="silentauction">
            <div className="onoffswitch-inner" />
            <div className="onoffswitch-switch" />
            </label>
            <input type="hidden" name="silentAuctionEnabled" defaultValue="off" />
            </div>
            </div>
            </div>
            <div className="form-group row">
            <div className="col-md-4">
            <label>Enable Raffle</label>
            <p className="help-text" />
            </div>
            <div className="col-md-4">
            <div className="onoffswitch onoffswitch-success">
            <input type="checkbox" name="raffleEnabled" className="onoffswitch-checkbox" id="raffle" defaultChecked />
            <label className="onoffswitch-label" htmlFor="raffle">
            <div className="onoffswitch-inner" />
            <div className="onoffswitch-switch" />
            </label>
            <input type="hidden" name="raffleEnabled" defaultValue="off" />
            </div>
            </div>
            </div>
            <div className="form-group row">
            <div className="col-md-4">
            <label>Enable Fund a Need</label>
            <p className="help-text" />
            </div>
            <div className="col-md-4">
            <div className="onoffswitch onoffswitch-success">
            <input type="checkbox" name="causeAuctionEnabled" className="onoffswitch-checkbox" id="cause-auction" defaultChecked />
            <label className="onoffswitch-label" htmlFor="cause-auction">
            <div className="onoffswitch-inner" />
            <div className="onoffswitch-switch" />
            </label>
            <input type="hidden" name="causeAuctionEnabled" defaultValue="off" />
            </div>
            </div>
            </div>
            <div className="form-group row">
            <div className="col-md-4">
            <label>Enable Donation Page</label>
            <p className="help-text" />
            </div>
            <div className="col-md-4">
            <div className="onoffswitch onoffswitch-success">
            <input type="checkbox" name="donationEnabled" className="onoffswitch-checkbox" id="donation-btn" defaultChecked />
            <label className="onoffswitch-label" htmlFor="donation-btn">
            <div className="onoffswitch-inner" />
            <div className="onoffswitch-switch" />
            </label>
            <input type="hidden" name="donationEnabled" defaultValue="off" />
            </div>
            </div>
            </div>
            <div className="form-group row">
            <div className="col-md-4">
            <label>Enable Ticketing</label>
            <p className="help-text" />
            </div>
            <div className="col-md-4">
            <div className="onoffswitch onoffswitch-success">
            <input type="checkbox" name="ticketingEnabled" className="onoffswitch-checkbox" id="ticketingEnabled" defaultChecked />
            <label className="onoffswitch-label" htmlFor="ticketingEnabled">
            <div className="onoffswitch-inner" />
            <div className="onoffswitch-switch" />
            </label>
            <input type="hidden" name="ticketingEnabled" defaultValue="off" />
            </div>
            </div>
            </div>
            <div className="row">
            <div className="col-md-3">
            <button className="btn btn-info" id="submitForm" type="submit">&nbsp;&nbsp;&nbsp;&nbsp;Save Settings&nbsp;&nbsp;&nbsp;&nbsp;</button>
            </div>
            </div>
            <div>
            </div></form>
            </div>
            </div>
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


export default withStyles(s)(Setting);
