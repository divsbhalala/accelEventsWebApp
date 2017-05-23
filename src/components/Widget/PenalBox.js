import React, { Component } from 'react';
import   PropTypes   from 'prop-types';
import { Panel } from 'react-bootstrap';
import Link from '../Link';
import cx from 'classnames';

class PenalBoxWidget extends Component{ // eslint-disable-line
  static propTypes = {
    className: PropTypes.string,
    boxTitle: PropTypes.string,
    badgeTitle: PropTypes.string,
    badgeLink: PropTypes.string,
    badgeClass: PropTypes.string,
    badgeText: PropTypes.string,
    endsInDays: PropTypes.string,
    endsInHours: PropTypes.string,
    endsInMinute: PropTypes.string,
    endsInSecond: PropTypes.string,
    data: PropTypes.array,
  };

  render() {
    return (
      <div className="auction-stat-box main-box clearfix project-box gray-box">
        <div className="main-box-body clearfix">
          <div className="project-box-header gray-bg">
            <div className="name">
              <div>{this.props.boxTitle}
                <a data-toggle="tooltip" title={this.props.boxTitle} href={this.props.badgeLink} className={this.props.badgeClass}> {this.props.badgeText} </a>
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
                      <span className="days">{this.props.endsInDays}</span>
                    </div>
                    <div className="flex-col">
                      <span className="hours">{this.props.endsInHours}</span>
                    </div>
                    <div className="flex-col">
                      <span className="minutes">{this.props.endsInMinute}</span>
                    </div>
                    <div className="flex-col" style={{display: "none"}}>
                      <span className="seconds">{this.props.endsInSecond}</span>
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
