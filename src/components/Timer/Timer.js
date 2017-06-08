/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Timer.css';
import Link from '../Link';
import _ from 'lodash';
import  history from  './../../history';
import Moment from 'react-moment';
import moment from 'moment';

class Timer extends React.Component {
  static propTypes = {
    time: PropTypes.string,
    onEnd: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minute: 0,
      seconds: 0,
    };
    this.setCountDown = this.setCountDown.bind(this);
  }

  setCountDown=()=>{
    let interval = 1000;
    let eventTime=moment().add(5, 'days');
    let self=this;
    setInterval(function(){
      let days =  moment(eventTime).diff(moment(), 'days');
      let hours=moment(eventTime).add(-days, 'days').diff(moment(), 'hours');
      let minute=moment(eventTime).add(-days, 'days').add(-hours, 'hours').diff(moment(), 'minutes');
      let seconds=moment(eventTime).add(-days, 'days').add(-hours, 'hours').add(-minute, 'minutes').diff(moment(), 'seconds');

      let duration = moment.duration(duration - interval, 'milliseconds');
      self.setState({
        days: days <= 0 ? "00": days,
        hours: hours <= 0 ? "00": hours,
        minute: minute <= 0 ? "00": minute,
        seconds: seconds <= 0 ? "00": seconds,
      })
    }, interval);
  }
  componentDidMount(){
    this.setCountDown();
  }

  render() {
    return (
      <div className={cx(s.root, this.props.className) } style={this.props.style}>{}
        <div className={cx(s.timeLeft)}>
          <div className={cx(s.ticker, s.timeLeftTicker)}>
            <div className={cx(s.timer, 'flex-row')}>
              <div className="flex-col hide">
                <span className="days">{this.state.days}</span>
              </div>
              <div className="flex-col hide">
                <span className="hours">{this.state.hours}</span>
              </div>
              <div className="flex-col">
                <span className="minutes">{this.state.minute}</span>
              </div>
              <div className="flex-col">
                <span className="seconds">{this.state.seconds}</span>
              </div>
            </div>
            <div className={cx(s.tiny, 'flex-row', 'text-center')}>
              <div className="flex-col hide">
                <span className="days">DAYS</span>
              </div>
              <div className="flex-col hide">
                <span className="hours">HOURS</span>
              </div>
              <div className="flex-col">
                <span className="minutes">MINUTES</span>
              </div>
              <div className="flex-col">
                <span className="seconds">SECONDS</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default (withStyles(s)(Timer))
