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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import {doGetSettings} from './../event/action/index';
import s from './goal.css';
import moment from 'moment';


class Auction extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      settings: null,
      itemList: null,
    }
  }

  componentWillMount() {
    this.props.doGetSettings(this.props.params && this.props.params.params, 'auction').then(resp => {
      this.setState({
        settings: resp && resp.data
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
                <h1 className="text-center" style={{marginTop: 120, marginBottom: 0}}>Auction Goal</h1>
                <h4 className="text-center" style={{marginTop: 5}}> Text your Bid To: (410) 927-5356 with the item's
                  three letter code and bid amount ex. ABC$300. </h4>
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
                            <span className="total-funds-raised">{this.state.settings.totalFundRaised}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> }
                </div>
                <div className="col-md-6">
                  Auction Goal
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
                              moment(this.state.settings.eventEnd).add(-moment(this.state.settings.eventEnd).diff(moment(), 'days'), 'days').diff(moment(), 'hours') > 0
                              && moment(this.state.settings.eventEnd).add(-moment(this.state.settings.eventEnd).diff(moment(), 'days'), 'days').diff(moment(), 'hours') > 0
                              && moment(this.state.settings.eventEnd).add(-moment(this.state.settings.eventEnd).diff(moment(), 'days'), 'days').diff(moment(), 'hours') || '00'
                            }</span></div>
                            <div className={cx("col-xs-4")}><span className={cx("minutes")}>{
                              moment(this.state.settings.eventEnd).add(-moment(this.state.settings.eventEnd).diff(moment(), 'days'), 'days').add(-moment(this.state.settings.eventEnd).add(-moment(this.state.settings.eventEnd).diff(moment(), 'days'), 'days').diff(moment(), 'hours'), 'hours').diff(moment(), 'minutes') > 0
                              && moment(this.state.settings.eventEnd).add(-moment(this.state.settings.eventEnd).diff(moment(), 'days'), 'days').add(-moment(this.state.settings.eventEnd).add(-moment(this.state.settings.eventEnd).diff(moment(), 'days'), 'days').diff(moment(), 'hours'), 'hours').diff(moment(), 'minutes')
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
};
const mapStateToProps = (state) => ({});
export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Auction));
