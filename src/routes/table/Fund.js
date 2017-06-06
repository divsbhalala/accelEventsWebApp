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
import s from './table.css';
import {doGetEventData, doGetFundANeedItemByLimit, doGetSettings} from './../event/action/index';
import  EventAside from './../../components/EventAside/EventAside';

class Fund extends React.Component {
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
    this.props.doGetEventData(this.props.params && this.props.params.params);
    this.props.doGetSettings(this.props.params && this.props.params.params, 'fundaneed').then(resp => {
      this.setState({
        settings: resp && resp.data
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

      <div className="row">
        <div className="col-lg-12">
          <div id="content-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">

                <EventAside activeTab={'Auction'} eventData={this.props.eventData} settings={this.state.settings}
                            eventTicketData={this.props.eventTicketData}
                            showMapPopup={this.showMapPopup} activeCategory={false}/>
              </div>

              <div className="col-lg-9 col-md-8 col-sm-8">
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
                      <th>WINNING BID</th>
                      <th>WINNING BIDDER</th>
                    </tr>
                    </thead>
                  </table>
                  <div id="scroller" className="scrollingpage">
                    <table className={("table datatables scrollingtable" )}>
                      <tbody>
                      {this.state.itemList &&
                      this.state.itemList.map((item, index) =>
                        <ItemList key={index} item={item}/>
                      )
                      }
                      </tbody>
                    </table>
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
  doGetEventData: (eventUrl) => doGetEventData(eventUrl),
  doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
  doGetFundANeedItemByLimit: (eventUrl, page, size, type) => doGetFundANeedItemByLimit(eventUrl, page, size, type),
};
const mapStateToProps = (state) => ({
  eventData: state.event && state.event.data,
  eventTicketData: state.event && state.event.ticket_data
});

export default  connect(mapStateToProps, mapDispatchToProps)(Fund);