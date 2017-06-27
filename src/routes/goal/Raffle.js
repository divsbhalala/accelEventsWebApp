
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import s from './goal.css';
import {doGetSettings,getGoalData} from './../event/action/index';
import moment from 'moment';

class Raffle extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      settings: null,
      itemList: null,
      goaldata:null,
      goalPer:0,
    }

  }

  componentWillMount() {
    let totalFundRaised=0
    // this.props.doGetSettings(this.props.params && this.props.params.params, 'raffle').then(resp => {
    //   totalFundRaised=resp.data.totalFundRaised
    //   this.setState({
    //     settings: resp && resp.data
    //   });
    //   this.props.getGoalData(this.props.params && this.props.params.params, 'raffle').then(resp => {
    //     this.setState({
    //       goaldata: resp,
    //       goalPer:totalFundRaised * 100  / resp.fundRaisingGoal
    //     });
    //   })
    // })
    this.props.getGoalData(this.props.params && this.props.params.params, 'raffle').then(resp => {
      totalFundRaised=resp.totalRised
      this.setState({
        goaldata: resp,
        goalPer:totalFundRaised * 100  / resp.fundRaisingGoal,
        settings:resp
      });
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div id="content-wrapper">
              <div className="row">
                <h1 className="text-center" style={{marginTop: 120}}>Raffle Goal</h1>
                <h4 className="text-center" style={{marginTop: 5, marginBottom: 50}}>
                  {this.state.goaldata && this.state.goaldata.bidInstructions} </h4>
              </div>
              <div className="row">
                <div className="col-md-3">
                  {this.state.settings &&
                  <div id="countdownTimer" className={cx("main-box clearfix project-box gray-box card")}>
                    <div className={cx("main-box-body clearfix")}>
                      <div className={cx("project-box-header emerald-bg")}>
                        <div className={cx("name")}>
                          <a href="#">Total Proceeds</a>
                        </div>
                      </div>
                      <div className={cx("project-box-content")}>
                        <div className={cx("value text-center")}>
                          <div className={cx("ticker big")}>
                            <span className="total-funds-raised">{this.state.settings.totalRised}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> }
                </div>
                <style dangerouslySetInnerHTML={{__html: ".liquid:before{width:"+this.state.goalPer+"% !important;}"}} />
                <div className="col-md-6">
                  <div className="col-md-6">
                    <div className="goalcontainer">
                      <div className>
                        <div className={this.state.goalPer<=20 ?'thermometer--very-low' : this.state.goalPer<=40 ? 'thermometer--low' : this.state.goalPer<=60 ? 'thermometer--moderate' :  this.state.goalPer <= 80  ? 'thermometer--high' : 'thermometer--very-high'}>
                          <div className="glass">
                            <div id="tooltip" style={{left: this.state.goalPer+'%'}}>
                              <span>${this.state.settings && this.state.settings.totalRised}</span>
                            </div>
                            <div className="liquid" />
                            <svg className="ruler">
                              <rect x="0px" y={0} width="20%" height="100%" fill="url(#ticks--very-low)" rx={2} />
                              <rect x="20%" y={0} width="20%" height="100%" fill="url(#ticks--low)" rx={2} />
                              <rect x="40%" y={0} width="20%" height="100%" fill="url(#ticks--moderate)" rx={2} />
                              <rect x="60%" y={0} width="20%" height="100%" fill="url(#ticks--high)" rx={2} />
                              <rect x="80%" y={0} width="20%" height="10k%" fill="url(#ticks--very-high)" rx={2} />
                              <defs>
                                <pattern id="ticks--very-low" className="ticks--very-low" width="60px" height="100%" patternUnits="userSpaceOnUse" x={0}>
                                  <line x1="1px" x2="1px" y2="6px" />
                                  <line x1="12px" x2="12px" y2="6px" />
                                  <line x1="24px" x2="24px" y2="6px" />
                                  <line x1="36px" x2="36px" y2="6px" />
                                  <line x1="48px" x2="48px" y2="10px" />
                                </pattern>
                                <pattern id="ticks--low" className="ticks--low" width="60px" height="100%" patternUnits="userSpaceOnUse" x={0}>
                                  <line x1="1px" x2="1px" y2="6px" />
                                  <line x1="12px" x2="12px" y2="6px" />
                                  <line x1="24px" x2="24px" y2="6px" />
                                  <line x1="36px" x2="36px" y2="6px" />
                                  <line x1="48px" x2="48px" y2="10px" />
                                </pattern>
                                <pattern id="ticks--moderate" className="ticks--moderate" width="60px" height="100%" patternUnits="userSpaceOnUse" x={0}>
                                  <line x1="1px" x2="1px" y2="6px" />
                                  <line x1="12px" x2="12px" y2="6px" />
                                  <line x1="24px" x2="24px" y2="6px" />
                                  <line x1="36px" x2="36px" y2="6px" />
                                  <line x1="48px" x2="48px" y2="10px" />
                                </pattern>
                                <pattern id="ticks--high" className="ticks--high" width="60px" height="100%" patternUnits="userSpaceOnUse" x={0}>
                                  <line x1="1px" x2="1px" y2="6px" />
                                  <line x1="12px" x2="12px" y2="6px" />
                                  <line x1="24px" x2="24px" y2="6px" />
                                  <line x1="36px" x2="36px" y2="6px" />
                                  <line x1="48px" x2="48px" y2="10px" />
                                </pattern>
                                <pattern id="ticks--very-high" className="ticks--very-high" width="60px" height="100%" patternUnits="userSpaceOnUse" x={0}>
                                  <line x1="1px" x2="1px" y2="6px" />
                                  <line x1="12px" x2="12px" y2="6px" />
                                  <line x1="24px" x2="24px" y2="6px" />
                                  <line x1="36px" x2="36px" y2="6px" />
                                  <line x1="48px" x2="48px" y2="10px" />
                                </pattern>
                              </defs>
                            </svg>
                            <svg className="markers">
                              <text x="8px" y="15px" style={{writingMode: 'tb'}} fill="#249AA7">$0</text>
                              <text x="108px" y="15px" style={{writingMode: 'tb'}} fill="#B8E1F2">${ this.state.goaldata && Math.round(this.state.goaldata.fundRaisingGoal / 4)}</text>
                              <text x="228px" y="15px" style={{writingMode: 'tb'}} fill="#ABD25E">${ this.state.goaldata && Math.round(this.state.goaldata.fundRaisingGoal / 2)}</text>
                              <text x="348px" y="15px" style={{writingMode: 'tb'}} fill="#F8C830">${ this.state.goaldata && Math.round((this.state.goaldata.fundRaisingGoal / 4) * 3)}</text>
                              <text x="468px" y="15px" style={{writingMode: 'tb'}} fill="#F1594A">${ this.state.goaldata && Math.round(this.state.goaldata.fundRaisingGoal )} </text>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-md-3">
                  {this.state.settings &&
                  <div id="countdownTimer" className={cx("main-box clearfix project-box gray-box card")}>
                    <div className={cx("main-box-body clearfix")}>
                      <div className={cx("project-box-header gray-bg")}>
                        <div className={cx("name")}>
                          <a href="#">Time Until Event Ends</a>
                        </div>
                      </div>
                      <div className={cx("project-box-content")}>
                        <div className={cx("ticker big")}>
                          <div className={cx("row timer")}>

                            <div className={cx("col-xs-4")}><span className={cx("hours")}>{
                              moment(this.state.settings.moduleEndDate).add(-moment(this.state.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours') > 0
                              && moment(this.state.settings.moduleEndDate).add(-moment(this.state.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours') > 0
                              && moment(this.state.settings.moduleEndDate).add(-moment(this.state.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours') || '00'
                            }</span></div>
                            <div className={cx("col-xs-4")}><span className={cx("minutes")}>{
                              moment(this.state.settings.moduleEndDate).add(-moment(this.state.settings.moduleEndDate).diff(moment(), 'days'), 'days').add(-moment(this.state.settings.moduleEndDate).add(-moment(this.state.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours'), 'hours').diff(moment(), 'minutes') > 0
                              && moment(this.state.settings.moduleEndDate).add(-moment(this.state.settings.moduleEndDate).diff(moment(), 'days'), 'days').add(-moment(this.state.settings.moduleEndDate).add(-moment(this.state.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours'), 'hours').diff(moment(), 'minutes')
                              || '00'}</span></div>
                            <div className={cx("col-xs-4")}><span className={cx("seconds")}>00</span></div>
                          </div>
                          <div className={cx("row tiny text-center")}>
                            <div className={cx("col-xs-4")}><span className={cx("hours")}>HOURS</span></div>
                            <div className={cx("col-xs-4")}><span className={cx("minutes")}>MINUTES</span></div>
                            <div className={cx("col-xs-4")}><span className={cx("seconds")}>SECONDS</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> }
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = {
  doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
  getGoalData: (eventUrl,type) => getGoalData(eventUrl,type),
};
const mapStateToProps = (state) => ({});
export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Raffle));

