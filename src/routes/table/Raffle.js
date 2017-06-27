
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import s from './table.css';
import {doGetRaffleItemByLimit, doGetSettings} from './../event/action/index';
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
    }

  }

  componentWillMount() {
    this.props.doGetSettings(this.props.params && this.props.params.params, 'raffle').then(resp => {
      this.setState({
        settings: resp && resp.data
      });
    })
    this.props.doGetRaffleItemByLimit(this.props.params && this.props.params.params, 0, 100).then(resp => {
      if (resp && resp.data) {
        this.setState({
          itemList: resp && resp.data && resp.data.items
        });
      }
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div id="content-wrapper">
              <div className="row">
                <div className="col-md-5 col-md-offset-1">
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
                <div className="col-md-5">
                  {this.state.settings &&
                  <div id="countdownTimer" className={cx("main-box clearfix project-box gray-box card")}>
                    <div className={cx("main-box-body clearfix")}>
                      <div className={cx("project-box-header gray-bg")}>
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
              </div>
              <div className="row">
                <div className="col-md-10 col-md-offset-1">
                  <div className="table white-bg scrollingpage">
                    <p className={cx(" help-text mrg-t-lg mrg-t-lg text-center", s.helptextt)}>
                      Text Your Pledge To: (410) 927-5356 with the item's three letter code and your desired pledge
                      amount. Example: ABC$300
                    </p>
                    <table className="turquoise-bg white table table-striped datatables mrg-b-xs">
                      <thead>
                      <tr>
                        <th>Item</th>
                        <th>Item Code</th>
                        <th>TICKETS SUBMITTED</th>
                        <th>WINNING</th>
                      </tr>
                      </thead>
                    </table>
                    <div id="scroller" className="scrollingpage">
                      {/*<marquee direction="up" height="500px" loop="infinite">*/}
                      <table className="table datatables scrollingtable">
                        <tbody>
                        {this.state.itemList &&
                        this.state.itemList.map((item, index) =>
                          <ItemList key={index} item={item}/>
                        )
                        }
                        </tbody>
                      </table>
                      {/*</marquee>*/}
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
class ItemList extends React.Component {
  render() {
    return (
      <tr >
        <td className="item-name">{this.props.item.name}</td>
        <td className="item-code">{this.props.item.code}</td>
        <td className="item-startingBid">{this.props.item.tickes_submitted}</td>
        <td className="total-pledge">-</td>
      </tr>
    );
  }
}


const mapDispatchToProps = {
  doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
  doGetRaffleItemByLimit: (eventUrl, page, size, type) => doGetRaffleItemByLimit(eventUrl, page, size, type),
};
const mapStateToProps = (state) => ({});
export default  connect(mapStateToProps, mapDispatchToProps)(Raffle);

