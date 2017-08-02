
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Admin.css';
import BoxWidget from '../../components/Widget/Box';
import EventChecklist from '../../components/EventChecklist/index';
import PenalBoxWidget from '../../components/Widget/PenalBox';
import {getDashboard,enableModules} from './action/index';
import {connect} from 'react-redux';
import {Modal, Popover, OverlayTrigger, Tooltip, Button} from 'react-bootstrap';
import cx from 'classnames';
import {serverUrl } from './../../clientConfig';


class Admin extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      settings: null,

      slientAuctionActivated: false,
      causeAuctionActivated: false,
      raffleActivated: false,
      ticketingActivated: false,
      errorMessage:"",
      isAnySelected:true,
    }
  }

  componentDidMount(){
    this.getDashboard()
  }
  getDashboard = () => {
    /*this.props.getDashboard().then((resp) => {
      this.setState({
        data:resp
      })
    });*/
    /*this.props.getStoreDesingData().then((resp) => {
      this.setState({
        data:resp
      })
    });*/
  };
  addPackage = (item) => {
    if (item.target) {
      const type = item.target.getAttribute('data-type');
      if (type === 'slientAuctionActivated') {
        this.setState({
         slientAuctionActivated: !this.state.slientAuctionActivated
        });
      }	if (type === 'causeAuctionActivated') {
        this.setState({
         causeAuctionActivated: !this.state.causeAuctionActivated
        });
      }	if (type === 'raffleActivated') {
        this.setState({
          raffleActivated: !this.state.raffleActivated
        });
      }	if (type === 'ticketingActivated') {
        this.setState({
          ticketingActivated: !this.state.ticketingActivated
        });
      }
    }
    console.log(this.state)
  };
  enableModule =(e)=>{
    e.preventDefault();
      if(this.state.slientAuctionActivated || this.state.causeAuctionActivated || this.state.raffleActivated || this.state.ticketingActivated){
        this.setState({isAnySelected:true});
        let data='auctionEnabled='+this.state.slientAuctionActivated+'&causeEnabled='+this.state.causeAuctionActivated+'&raffleEnabled='+this.state.raffleActivated +'&ticketingEnabled='+this.state.ticketingActivated
        this.props.enableModules(data).then(resp=>{
            this.getDashboard();
        });
      }else {
        this.setState({isAnySelected:false})
      }
  };

  render() {
    const products = [{
      id: 1,
      type: 'slientAuctionActivated',
      name: 'Silent Auction',
      code: 'silentactionpkg',
      price: 99,
    }, {
      id: 2,
      type: 'causeAuctionActivated',
      name: 'Fund a Need',
      code: 'causeauctionpkg',
      price: 99,
    }, {
      id: 3,
      type: 'raffleActivated',
      name: 'Raffle',
      code: 'rafflepkg',
      price: 99,
    }, {
      id: 4,
      type: 'ticketingActivated',
      name: 'Event Ticketing',
      code: 'ticketingpkg',
      price: 0,
    }];
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
                  linkTo={ this.props.hostData && serverUrl+"/events/" +  this.props.hostData.eventUrl}
                  linkTitle="Share your custom event page with your participants"
                  linkText={ this.props.hostData && serverUrl+"/events/" +  this.props.hostData.eventUrl}
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
							{ this.props.eventDetails && this.props.eventDetails.ticketingEnabled ?<div className="flex-col flex-col-mobile">
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
							{ this.props.eventDetails && this.props.eventDetails.auctionEnabled ? <div className="flex-col flex-col-mobile">
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
							{ this.props.eventDetails && this.props.eventDetails.raffleEnabled ? <div className="flex-col flex-col-mobile">
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
							{ this.props.eventDetails && this.props.eventDetails.fundANeedEnabled ? <div className="flex-col flex-col-mobile">
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
        <div id="select-modules" >
        <Modal show={ this.state.data &&  this.state.data.noModuleActivate } dialogClassName="model-transparent" >
          <Modal.Body  >
            <form id="selectModules" >
              <label className="text-center center-block">Please select the tools that you would like to setup for your event.</label>
              <div className="js-error module-check" style={{display: this.state.isAnySelected ? 'none' : 'block'}}>You must select at least one fundraising option to create your account.</div>
              <input type="hidden" name="eventId" defaultValue={310} />
              { products.map(item => <div className="col-md-6 mrg-b-md" data-toggle="buttons" key={item.id}>
                <label
                  disabled={this.state.settings && this.state.settings[item.type]}
                  className={cx('btn btn-lg btn-block', this.state.settings && this.state.settings[item.type] ? 'btn-success' : 'btn-danger', _.findIndex(this.state.itemSelected, { type: item.type }) >= 0 && 'active')}>
                  <input
                    type="checkbox" autoComplete="off" name={item.code}
                    id={item.code} data-cost={item.price} data-type={item.type} onChange={this.addPackage} disabled={this.state.settings && this.state.settings[item.type]}
                    defaultValue={this.state.settings && this.state.settings[item.type]}
                  />
                  <span className="glyphicon glyphicon-ok" />
                  { (this.state.settings && this.state.settings[item.type]) ? `${item.name} Activated` : `${item.name}`}
                </label>
              </div>) }
              <div className="small text-center">You can add or remove tools from the Settings page at any time</div>
              <button onClick={this.enableModule} className="btn btn-lg btn-block mrg-t-lg text-uppercase" role="button" type="submit" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Getting Started..">
                Enable
              </button>
            </form>
          </Modal.Body>

        </Modal>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getDashboard: () => getDashboard(),
  doGetHostSettings: type => doGetHostSettings(type),
  enableModules: data => enableModules(data),
};
const mapStateToProps = (state) => ({
	user: state.session.user,
	authenticated: state.session.authenticated,
  hostData : state.host && state.host.data,
	eventDetails : state.host && state.host.eventDetails,
	currencySymbol : (state.host && state.host.currencySymbol) || "$",
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Admin));
