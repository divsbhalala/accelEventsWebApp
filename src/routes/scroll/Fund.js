
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import s from './scroll.css';
import {doGetFundANeedItemByLimit, doGetSettings, getScrollData} from './../event/action/index';
import EventEndUntil from '../../components/Widget/EventEndUntil';
import TotalProceeds from '../../components/Widget/TotalProceeds';
// import  history from './../../../history';

import moment from 'moment';
class Fund extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      settings: null,
    }

  }

  componentWillMount() {
    this.props.getScrollData(this.props.params && this.props.params.params, 'fundaneed').then(resp => {
      this.setState({
        settings: resp
      });
    })
    this.props.doGetFundANeedItemByLimit(this.props.params && this.props.params.params, 0, 100).then(resp => {
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
                  {this.state.settings && <EventEndUntil settings={this.state.settings} headerText="Time Until Event Ends" className="emerald-bg" />}
                </div>
                <div className="col-md-5">
                  {this.state.settings && <TotalProceeds totalRised={this.state.settings.totalRised} headerText="Total Proceeds" className="gray-bg"/>}
                </div>
              </div>
              <div className="row">
                <div className="col-md-10 col-md-offset-1">
                  <div className="table white-bg scrollingpage">
                    <p className={cx(" help-text mrg-t-lg mrg-t-lg text-center", s.helptext)}>
                      Text Your Pledge To: (410) 927-5356 with the item's three letter code and your desired pledge
                      amount. Example: ABC$300
                    </p>
                    <table className="turquoise-bg white table table-striped datatables mrg-b-xs">
                      <thead>
                      <tr>
                        <th>Item</th>
                        <th>Item Code</th>
                        <th>MINIMUM PLEDGE</th>
                        <th>TOTAL AMOUNT PLEDGED</th>
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
        <td className="item-startingBid">{this.props.item.pledge_price}</td>
        <td className="total-pledge">-</td>
      </tr>
    );
  }
}
const mapDispatchToProps = {
  getScrollData: (eventUrl, type) => getScrollData(eventUrl, type),
  doGetFundANeedItemByLimit: (eventUrl, page, size, type) => doGetFundANeedItemByLimit(eventUrl, page, size, type),
};
const mapStateToProps = (state) => ({});

export default  connect(mapStateToProps, mapDispatchToProps)(Fund);