import React, {Component} from 'react';
import   PropTypes   from 'prop-types';
import {connect} from 'react-redux';
import {Panel} from 'react-bootstrap';
import Link from '../Link';
import cx from 'classnames';
import Moment from 'react-moment';
import moment from 'moment';
class PenalBoxWidget extends Component { // eslint-disable-line
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
  constructor(props) {
    super(props);
    this.state = {
      days: '00',
      hours: '00',
      minute: '00',
      seconds: '00',
      status:null,
    }
  }
  setCountDown=()=>{
    if(this.props.firstData){

      let eventTime=moment();
      if(this.props.firstData){
        eventTime = moment(this.props.firstData);
      }
      let days =  moment(eventTime).diff(moment(), 'days');
      let hours = moment(eventTime).add(-days, 'days').diff(moment(), 'hours');
      let minute = moment(eventTime).add(-days, 'days').add(-hours, 'hours').diff(moment(), 'minutes');
      let seconds = moment(eventTime).add(-days, 'days').add(-hours, 'hours').add(-minute, 'minutes').diff(moment(), 'seconds');

      // let duration = moment.duration(duration - interval, 'milliseconds');
      this.setState({
        days: days <= 0 ? "00": days,
        hours: hours <= 0 ? "00": hours <=9 ? ("0" +hours).slice(-2) : hours,
        minute: minute <= 0 ? "00":minute <=9 ? ("0" +minute).slice(-2) : minute,
        seconds: seconds <= 0 ? "00": seconds <=9 ? ("0" +seconds).slice(-2) : seconds,
      });
    }
    let status:null;
    if(this.props.boxTitle === "Event Ticketing"){
      status = this.props.active ? "Live" : "Start Selling Tickets"
    }else {
      status = this.props.active ? "ACTIVATED" : "Test Mode"
    }
    this.setState({status})
  };
  componentDidMount(){
    this.setCountDown()
  }

  render() {
    return (
      <div className="auction-stat-box main-box clearfix project-box gray-box">
        <div className="main-box-body clearfix">
          <div className="project-box-header gray-bg">
            <div className="name">
              <div>{this.props.boxTitle}
                <a data-toggle="tooltip" title={this.props.boxTitle} href={this.props.badgeLink}
                   className={this.props.active ? "white text-uppercase pull-right badge badge-success" : "white text-uppercase pull-right badge badge-danger"}> {this.state.status} </a>
              </div>
            </div>
          </div>
          <div className="project-box-content">
            <div className="flex-row">
              <div className="flex-col text-left lh-30">{this.props.firstTitle}:</div>
              <div className="flex-col">
                <div className="ticker" data-end-date="2017-06-07T18:55:54">
                  <div className="flex-row timer">
                    <div className="flex-col">
                      <span className="days">{this.state.days}</span>
                    </div>
                    <div className="flex-col">
                      <span className="hours">{this.state.hours}</span>
                    </div>
                    <div className="flex-col">
                      <span className="minutes">{this.state.seconds}</span>
                    </div>
                    <div className="flex-col" style={{display: "none"}}>
                      <span className="seconds">{this.state.second}</span>
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
              <div className="flex-col text-left lh-30">{this.props.secondTitle}:</div>
              <div className="flex-col lh-30">
                {this.props.currencySymbol}{this.props.secondData.toFixed(2)}
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-col text-left lh-30">{this.props.thirdTitle}:</div>
              <div className="flex-col lh-30">{this.props.thirdData}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
	currencySymbol : (state.host && state.host.currencySymbol) || "$"
});
export default connect(mapStateToProps, mapDispatchToProps)(PenalBoxWidget);