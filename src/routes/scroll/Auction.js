
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import {doGetAuctionItemByLimit, doGetSettings, getScrollData} from './../event/action/index';
import s from './scroll.css';
import moment from 'moment';
import EventEndUntil from '../../components/Widget/EventEndUntil';
import TotalProceeds from '../../components/Widget/TotalProceeds';
// import  history from './../../../history';

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
      auctionData:null,
    }
  }
  componentWillMount() {
    let totalFundRaised=0
    this.props.getScrollData(this.props.params && this.props.params.params, 'auction').then(resp => {
           this.setState({
        settings: resp

      });
    })

    this.props.doGetAuctionItemByLimit(this.props.params && this.props.params.params, 0, 100).then(resp => {
           if (resp && resp.data) {
        this.setState({
          itemList: resp && resp.data && resp.data.items
        });
      }
    })
    /*this.props.getScrollData(this.props.params && this.props.params.params, 'auction').then(resp => {
      totalFundRaised=resp.totalRised
      this.setState({
        auctionData: resp,
        settings:resp
      });
    })*/
  }
  render() {
    return (
      <div>
        <div className="row scrollingpage">
          <div className="col-lg-12">
            <div id="content-wrapper">
              <div className="row">
                <div className="col-md-5 col-md-offset-1">
                  {this.state.settings && <EventEndUntil settings={this.state.settings} isBig={true} headerText="Time Until Event Ends" className="gray-bg" />}
                </div>
                <div className="col-md-5">
                  {this.state.settings && <TotalProceeds totalRised={ this.state.settings.totalFundRised } headerText="Total Funds Contributed" className="gray-bg"/>
                  }
                </div>
              </div>
              <div className="row">
                <div className="col-md-10 col-md-offset-1">
                  <div className="table white-bg scrollingpage">
                    { this.state.settings && this.state.settings.displayText && <p className={cx(" help-text mrg-t-lg mrg-t-lg text-center", s.helptext)}>
                      {this.state.settings.displayText}
                    </p>}
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
                      <marquee direction="up" height="500px" loop="infinite">
                        <table className={("table datatables scrollingtable" , s.inner)}>
                          <tbody>
                          {this.state.itemList &&
                          this.state.itemList.map((item, index) =>
                            <ItemList key={index} item={item}/>
                          )
                          }
                          </tbody>
                        </table>
                      </marquee>
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
        <td className="item-startingBid">-</td>
        <td className="total-pledge">-</td>
      </tr>
    );
  }
}

const mapDispatchToProps = {
  getScrollData: (eventUrl, type) => getScrollData(eventUrl, type),
  doGetAuctionItemByLimit: (eventUrl, page, size, type) => doGetAuctionItemByLimit(eventUrl, page, size, type),
};
const mapStateToProps = (state) => ({});
export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Auction));
