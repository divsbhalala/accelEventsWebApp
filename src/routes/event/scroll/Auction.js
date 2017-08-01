
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import {doGetAuctionItemByLimit, doGetSettings, getScrollData} from './../action/index';
import s from './scroll.css';
import moment from 'moment';
import EventEndUntil from '../../../components/Widget/EventEndUntil';
import TotalProceeds from '../../../components/Widget/TotalProceeds';
import ItemList from '../../../components/Widget/Auction/ItemList';
import $ from 'jquery'
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
      auctionData:null,
    }
  }
  componentWillMount() {
    let totalFundRaised=0;
    this.props.getScrollData(this.props.params && this.props.params.params, 'auction').then(resp => {
           this.setState({
        settings: resp

      });
    });
  }
  render() {
    return (
      <div className={cx("scroll-page-wrap auction-scroll")}>
        {this.state.settings ?
        <div id="content-wrapper">
          <div className="row">
            <div className="col-md-5 col-md-offset-1">
              {this.state.settings && <EventEndUntil settings={this.state.settings} isBig={true} headerText="Time Until Event Ends" className="gray-bg" />}
            </div>
            <div className={("col-md-5")}>
              {this.state.settings &&  !this.state.settings.hideTotalFundRaised &&<TotalProceeds totalRised={ this.state.settings.totalFundRised } headerText="Total Funds Contributed" className="gray-bg"/>
              }
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="table white-bg scrollingpage">
                { this.state.settings && this.state.settings.displayText && <p className={cx(" help-text mrg-t-lg mrg-t-lg text-center", s.helptext)}>
                  {this.state.settings.displayText}
                </p>}
                <table className={cx("turquoise-bg white table table-striped datatables mrg-b-xs")}>
                  <thead>
                    <tr>
                      <th className="item-name">Item</th>
                      <th className="item-code">Item Code</th>
                      <th className="item-startingBid">{this.state.settings && this.state.settings.moduleEnded ? "WINNING BID" : "CURRENT BID"}</th>
                      { this.state.settings && !this.state.settings.highestBidderHidden &&
  										!this.state.settings.moduleEnded ?<th className="total-pledge">Highest Bidder</th> : <th className="total-pledge">WINNING BIDDER</th>}
                    </tr>
                  </thead>
                </table>
                <div id="scroller" className="scrollingpage microsoft scroll-container" height={ "500px"}>
                  {this.state.settings && this.state.settings.items && this.state.settings.items.length > 8 && <span  className="marquee" >
                    <table className={cx("table datatables scrollingtable" , s.inner)}>
                      <tbody>
                      {this.state.settings && this.state.settings.items &&
											this.state.settings.items.map((item, index) =>
                        <ItemList key={index} item={item} moduleEnded={this.state.settings && this.state.settings.moduleEnded}/>
                      )
                      }
                      </tbody>
                    </table>
                  </span>}
                  {this.state.settings && this.state.settings.items && this.state.settings.items.length <= 8 && <table className={("table datatables scrollingtable")}>
                    <tbody>
										{this.state.settings && this.state.settings.items &&
										this.state.settings.items.map((item, index) =>
                      <ItemList key={index} item={item} moduleEnded={this.state.settings && this.state.settings.moduleEnded}/>
										)
										}
                    </tbody>
                  </table>}
                </div>
              </div>
            </div>
          </div>
        </div>
        : <div id="app" className="loader" /> }

      </div>
    );
  }
}
const mapDispatchToProps = {
  getScrollData: (eventUrl, type) => getScrollData(eventUrl, type),
  doGetAuctionItemByLimit: (eventUrl, page, size, type) => doGetAuctionItemByLimit(eventUrl, page, size, type),
};
const mapStateToProps = (state) => ({
	currencySymbol: state.event && state.event.currencySymbol || "$",
});
export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Auction));
