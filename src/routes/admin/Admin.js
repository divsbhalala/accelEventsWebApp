
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  MenuItem,
  DropdownButton,
  Panel, PageHeader, ListGroup, ListGroupItem, Button,
} from 'react-bootstrap'

import s from './Admin.css';
import StatWidget from '../../components/Widget';
import BoxWidget from '../../components/Widget/Box';
import PenalBoxWidget from '../../components/Widget/PenalBox';
import AdminSiderbar from '../../components/Sidebar/AdminSidebar';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';

class Admin extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="">
          <div className="row">
           <div className="col-lg-offset-2 col-sm-10">
              <PageHeader>Dashboard</PageHeader>
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
              <div className="auction-stat-box main-box clearfix project-box gray-box">
                <div className="main-box-body clearfix">
                  <div className="project-box-header gray-bg">
                    <div className="name">
                      <div>Event Ticketing
                        <a data-toggle="tooltip" title="Your Event Ticketing is in Test Mode. To begin sellings tickets please activate this module by clicking here." href="/host/settings/account" className="white text-uppercase pull-right badge badge-danger"> Start Selling Tickets </a>
                      </div>
                    </div>
                  </div>
                  <div className="project-box-content">
                    <div className="flex-row">
                      <div className="flex-col text-left lh-30">Time Until Event Starts: </div>
                      <div className="flex-col">
                        <div className="ticker" data-end-date="2017-06-07T18:55:54">
                          <div className="flex-row timer">
                            <div className="flex-col">
                              <span className="days">22</span>
                            </div>
                            <div className="flex-col">
                              <span className="hours">10</span>
                            </div>
                            <div className="flex-col">
                              <span className="minutes">11</span>
                            </div>
                            <div className="flex-col" style={{display: "none"}}>
                              <span className="seconds">29</span>
                            </div>
                          </div>
                          <div className="flex-row tiny text-center">
                            <div className="flex-col">
                              <span className="days">DAYS</span>
                            </div>
                            <div className="flex-col">
                              <span className="hours">HOURS</span>
                            </div>
                            <div className="flex-col">
                              <span className="minutes">MINUTES</span>
                            </div>
                            <div className="flex-col" style={{display: "none"}}>
                              <span className="seconds">SECONDS</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="flex-col text-left lh-30">Total Collection from ticket sales: </div>
                      <div className="flex-col lh-30">
                        $0.00
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="flex-col text-left lh-30">Total tickets sold:</div>
                      <div className="flex-col lh-30">
                        0
                      </div>
                    </div>
                    <div className="flex-row hide">
                      <div className="flex-col text-left lh-30"></div>
                      <div className="flex-col lh-30"></div>
                    </div>
                  </div>
                </div>
              </div>
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
             {/* <div className="auction-stat-box main-box clearfix project-box gray-box">
                <div className="main-box-body clearfix">
                  <div className="project-box-header gray-bg">
                    <div className="name">
                      <div>Auction
                        <a data-toggle="tooltip" title="" href="/host/settings/account" className="white text-uppercase pull-right badge badge-danger"> </a>
                      </div>
                    </div>
                  </div>
                  <div className="project-box-content">
                    <div className="flex-row">
                      <div className="flex-col text-left lh-30">Ends In: </div>
                      <div className="flex-col">
                        <div className="ticker" data-end-date="2017-06-07T18:55:54">
                          <div className="flex-row timer">
                            <div className="flex-col">
                              <span className="days">22</span>
                            </div>
                            <div className="flex-col">
                              <span className="hours">10</span>
                            </div>
                            <div className="flex-col">
                              <span className="minutes">11</span>
                            </div>
                            <div className="flex-col" style={{display: "none"}}>
                              <span className="seconds">29</span>
                            </div>
                          </div>
                          <div className="flex-row tiny text-center">
                            <div className="flex-col">
                              <span className="days">DAYS</span>
                            </div>
                            <div className="flex-col">
                              <span className="hours">HOURS</span>
                            </div>
                            <div className="flex-col">
                              <span className="minutes">MINUTES</span>
                            </div>
                            <div className="flex-col" style={{display: "none"}}>
                              <span className="seconds">SECONDS</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="flex-col text-left lh-30">Proceeds: </div>
                      <div className="flex-col lh-30">
                        $0.00
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="flex-col text-left lh-30">Bidders: </div>
                      <div className="flex-col lh-30">0</div>
                    </div>
                  </div>
                </div>
              </div>*/}
            </div>

            <div className="flex-col flex-col-mobile">
              <div className="auction-stat-box main-box clearfix project-box gray-box">
                <div className="main-box-body clearfix">
                  <div className="project-box-header gray-bg">
                    <div className="name">
                      <div>Raffle



                        <a data-toggle="tooltip" title="Your Raffle is in Test Mode. To begin sellings tickets please activate this module by clicking here." href="/host/settings/account" className="white text-uppercase pull-right badge badge-danger"> Test Mode </a>


                      </div>
                    </div>
                  </div>
                  <div className="project-box-content">
                    <div className="flex-row">
                      <div className="flex-col text-left lh-30">Ends In: </div>
                      <div className="flex-col">
                        <div className="ticker" data-end-date="2017-06-07T18:55:54">
                          <div className="flex-row timer">
                            <div className="flex-col">
                              <span className="days">22</span>
                            </div>
                            <div className="flex-col">
                              <span className="hours">10</span>
                            </div>
                            <div className="flex-col">
                              <span className="minutes">11</span>
                            </div>
                            <div className="flex-col" style={{display: "none"}}>
                              <span className="seconds">29</span>
                            </div>
                          </div>
                          <div className="flex-row tiny text-center">
                            <div className="flex-col">
                              <span className="days">DAYS</span>
                            </div>
                            <div className="flex-col">
                              <span className="hours">HOURS</span>
                            </div>
                            <div className="flex-col">
                              <span className="minutes">MINUTES</span>
                            </div>
                            <div className="flex-col" style={{display: "none"}}>
                              <span className="seconds">SECONDS</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="flex-col text-left lh-30">Proceeds: </div>
                      <div className="flex-col lh-30">
                        $0.00
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="flex-col text-left lh-30">Ticket Purchasers: </div>
                      <div className="flex-col lh-30">0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col flex-col-mobile">
              <div className="auction-stat-box main-box clearfix project-box gray-box">
                <div className="main-box-body clearfix">
                  <div className="project-box-header gray-bg">
                    <div className="name">
                      <div>Fund a Need



                        <a data-toggle="tooltip" title="Your Fund A Need is in Test Mode. To begin accepting pledges please activate this module by clicking here." href="/host/settings/account" className="white text-uppercase pull-right badge badge-danger"> Test Mode </a>


                      </div>
                    </div>
                  </div>
                  <div className="project-box-content">
                    <div className="flex-row">
                      <div className="flex-col text-left lh-30">Ending In: </div>
                      <div className="flex-col">
                        <div className="ticker" data-end-date="2017-06-07T18:55:54">
                          <div className="flex-row timer">
                            <div className="flex-col">
                              <span className="days">22</span>
                            </div>
                            <div className="flex-col">
                              <span className="hours">10</span>
                            </div>
                            <div className="flex-col">
                              <span className="minutes">11</span>
                            </div>
                            <div className="flex-col" style={{display: "none"}}>
                              <span className="seconds">29</span>
                            </div>
                          </div>
                          <div className="flex-row tiny text-center">
                            <div className="flex-col">
                              <span className="days">DAYS</span>
                            </div>
                            <div className="flex-col">
                              <span className="hours">HOURS</span>
                            </div>
                            <div className="flex-col">
                              <span className="minutes">MINUTES</span>
                            </div>
                            <div className="flex-col" style={{display: "none"}}>
                              <span className="seconds">SECONDS</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="flex-col text-left lh-30">Proceeds: </div>
                      <div className="flex-col lh-30">
                        $0.00
                      </div>
                    </div>
                    <div className="flex-row">
                      <div className="flex-col text-left lh-30">Donors: </div>
                      <div className="flex-col lh-30">0</div>
                    </div>
                  </div>
                </div>
              </div>
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

                    <li className="clearfix">
                      <div className="name">
                        <div className="checkbox-nice">
                          <input type="checkbox" disabled="disabled" />
                            <label>Name your event</label>
                        </div>
                        <div className="desc">Your event name will be used through the system.</div>
                      </div>
                      <div className="actions">
                        <a href="https://www.accelevents.com/host/event-management/design" className="table-link btn btn-xs btn-danger">
                          <span className="label label-danger">Set Event Name</span>
                        </a>
                      </div>
                    </li>

                    <li className="clearfix">
                      <div className="name">
                        <div className="checkbox-nice">
                          <input type="checkbox" disabled="disabled" />
                            <label>Submit a sample bid for your Auction</label>
                        </div>
                        <div className="desc">Give your silent auction a try to see how it works for free!</div>
                      </div>
                      <div className="actions">
                        <a href="#sample-bid" className="table-link btn btn-xs btn-danger" role="button" data-toggle="modal">
                          <span className="label label-danger">Submit Bid</span>
                        </a>
                      </div>
                    </li>

                    <li className="clearfix">
                      <div className="name">
                        <div className="checkbox-nice">
                          <input type="checkbox" disabled="disabled" />
                            <label>Add auction items</label>
                        </div>
                        <div className="desc">Add the Auction Items your guests will bid for.</div>
                      </div>
                      <div className="actions">
                        <a href="https://www.accelevents.com/host/silent-auction/add-items" className="table-link btn btn-xs btn-danger">
                          <span className="label label-danger">Add Auction Items</span>
                        </a>
                      </div>
                    </li>

                    <li className="clearfix">
                      <div className="name">
                        <div className="checkbox-nice">
                          <input type="checkbox" disabled="disabled" />
                            <label>Set auction date and ending time</label>
                        </div>
                        <div className="desc">Specify when the silent auction winners will be selected (East Coast Time).</div>
                      </div>
                      <div className="actions">
                       <a href="https://www.accelevents.com/host/silent-auction/settings" className="table-link btn btn-xs btn-danger">
                          <span className="label label-danger">Set Date &amp; Time</span>
                        </a>
                      </div>
                    </li>

                    <li className="clearfix">
                      <div className="name">
                        <div className="checkbox-nice">
                          <input type="checkbox" disabled="disabled" />
                            <label>Submit a sample ticket for your Raffle</label>
                        </div>
                        <div className="desc">Submit a sample ticket for your Raffle to see how it works for free!</div>
                      </div>
                      <div className="actions">
                        <a href="#sample-ticket" className="table-link btn btn-xs btn-danger" role="button" data-toggle="modal">
                          <span className="label label-danger">Submit Raffle Ticket</span>
                        </a>
                      </div>
                    </li>

                    <li className="clearfix">
                      <div className="name">
                        <div className="checkbox-nice">
                          <input type="checkbox" disabled="disabled" />
                            <label>Add raffle items</label>
                        </div>
                        <div className="desc">Add the Raffle Items your guests will bid for.</div>
                      </div>
                      <div className="actions">
                        <a href="https://www.accelevents.com/host/raffle/add-items" className="table-link btn btn-xs btn-danger">
                          <span className="label label-danger">Add Raffle Items</span>
                        </a>
                      </div>
                    </li>

                    <li className="clearfix">
                      <div className="name">
                        <div className="checkbox-nice">
                          <input type="checkbox" disabled="disabled" />
                            <label>Set raffle date and ending time</label>
                        </div>
                        <div className="desc">Specify when the raffle winners will be selected (East Coast Time).</div>
                      </div>
                      <div className="actions">
                        <a href="https://www.accelevents.com/host/raffle/settings" className="table-link btn btn-xs btn-danger">
                          <span className="label label-danger">Set Date &amp; Time</span>
                        </a>
                      </div>
                    </li>

                    <li className="clearfix">
                      <div className="name">
                        <div className="checkbox-nice">
                          <input type="checkbox" disabled="disabled" />
                            <label>Submit a sample pledge for your fund a need</label>
                        </div>
                        <div className="desc">Submit a sample pledge for your fund a need to see how it works for free!</div>
                      </div>
                      <div className="actions">
                        <a href="#sample-cause-bid" className="table-link btn btn-xs btn-danger" role="button" data-toggle="modal">
                          <span className="label label-danger">Submit Pledge</span>
                        </a>
                      </div>
                    </li>

                    <li className="clearfix">
                      <div className="name">
                        <div className="checkbox-nice">
                          <input type="checkbox" disabled="disabled" />
                            <label>Set fund a need date and ending time</label>
                        </div>
                        <div className="desc">Specify when the fund a need winners will be selected (East Coast Time).</div>
                      </div>
                      <div className="actions">
                        <a href="https://www.accelevents.com/host/cause-auction/settings" className="table-link btn btn-xs btn-danger">
                          <span className="label label-danger">Set Date &amp; Time</span>
                        </a>
                      </div>
                    </li>

                    <li className="clearfix">
                      <div className="name">
                        <div className="checkbox-nice">
                          <input type="checkbox" disabled="disabled" />
                            <label>Starting Selling Tickets</label>
                        </div>
                        <div className="desc">Starting Selling Tickets</div>
                      </div>
                      <div className="actions">
                        <a href="https://www.accelevents.com/host/settings/account" className="table-link btn btn-xs btn-danger">
                          <span className="label label-danger">Starting Selling Tickets</span>
                        </a>
                      </div>
                    </li>

                    <li className="clearfix">
                      <div className="name">
                        <div className="checkbox-nice">
                          <input type="checkbox" disabled="disabled" />
                            <label>Set up credit card processing</label>
                        </div>
                        <div className="desc">Accept credit card payments from your participants.</div>
                      </div>
                      <div className="actions">
                        <a href="https://www.accelevents.com/host/settings/credit-card" className="table-link btn btn-xs btn-danger">
                          <span className="label label-danger">Setup Payment Processing</span>
                        </a>
                      </div>
                    </li>

                  </ul>
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
export default withStyles(s)(Admin);
