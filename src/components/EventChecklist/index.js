import React, {Component} from 'react';
import   PropTypes   from 'prop-types';
import {Panel} from 'react-bootstrap';
import Link from '../Link';
import cx from 'classnames';

class EventChecklist extends Component { // eslint-disable-line
  static propTypes = {
    }

  render() {
    return (
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
    );
  }
}

export default EventChecklist;
