
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
    time: PropTypes.number,
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
    let eventTime=moment();
    if(this.props.time){
      eventTime=moment().add(this.props.time || 0, 'seconds');
    }
    else{
      eventTime=moment().add(0, 'days');
    }
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
      });
      if( !days && !hours && !minute && !seconds){
        self.props.onEnd();
      }
    }, interval);
  };
  componentDidMount(){
    this.setCountDown();
  }

  render() {
    return (
      <div className={cx('ticker', this.props.class) } style={this.props.style}>{}
        <div className={cx('flex-row')}>
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
        <div className={cx('tiny', 'flex-row')}>
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
    );
  }
}

export default (withStyles(s)(Timer))
