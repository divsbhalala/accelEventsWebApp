import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Link from '../Link';
import cx from 'classnames';

class PenalBoxWidget extends Component{ // eslint-disable-line
  static propTypes = {
    className: React.PropTypes.string,
    headerText: React.PropTypes.string,
    descText: React.PropTypes.string,
    linkTitle: React.PropTypes.string,
    linkText: React.PropTypes.string,
    linkTarget: React.PropTypes.string,
  }
  render() {
    return (
      <div className="auction-stat-box main-box clearfix project-box gray-box">
        <div className="main-box-body clearfix">
          <div className="project-box-header gray-bg">
            <div className="name">
              <div>Auction
                <a data-toggle="tooltip" title="Your Silent Auction is in Test Mode. To begin accepting bids please activate this module by clicking here." href="/host/settings/account" className="white text-uppercase pull-right badge badge-danger"> Test Mode </a>
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
      </div>
    );
  }
}

export default PenalBoxWidget;
