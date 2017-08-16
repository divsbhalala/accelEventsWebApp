import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import {doGetSettings, getScrollData} from './../action/index';
import s from './table.css';
import ItemList from '../../../components/Widget/Auction/ItemList';
// import  history from './../../../history';
let auctionInst = undefined;
import  EventAside from './../../../components/EventAside/EventAside';
class Auction extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      settings: null,
      eventSettings: null,
      itemList: null,
    };
    this.doGetSettings = this.doGetSettings.bind(this);
    this.getScrollData = this.getScrollData.bind(this);
  }
  doGetSettings = (eventUrl, slug)=>{
    this.props.doGetSettings(eventUrl, slug).then(resp => {
      this.setState({
        eventSettings: resp && resp.data
      });
      setTimeout(()=>{
        auctionInst.doGetSettings(eventUrl, slug)
      },5000)

    });
  };
  getScrollData = (eventUrl, slug)=>{
    this.props.getScrollData(eventUrl, slug).then(resp => {
      this.setState({
        settings: resp
      });
      setTimeout(()=>{
        auctionInst.getScrollData(eventUrl, slug);
      },5000)
    });
  };
  componentWillMount() {
    auctionInst = this;
    this.doGetSettings(this.props.params && this.props.params.params, 'auction');
    this.getScrollData(this.props.params && this.props.params.params, 'auction');
  }
  render() {
    return (
      <div className="table-view-wrap">

        <div id="content-wrapper">
          {this.state.settings ?
          <div className="row">

              <div className="col-lg-3 col-md-4 col-sm-4">
              <EventAside activeTab={'Auction'} eventData={this.props.eventData} settings={this.state.eventSettings}
                          eventTicketData={this.props.eventTicketData} isBidInstructionHidden={true}
                          showMapPopup={this.showMapPopup} activeCategory={false}/>
             </div>

            <div className="col-lg-9 col-md-8 col-sm-8">

              <div className="main-box no-header clearfix">
                <div className="main-box-body">
                  <div className="table white-bg ">
										{ this.state.settings && this.state.settings.displayText && <p className={cx(" help-text mrg-t-lg mrg-t-lg text-center")}>
											{this.state.settings.displayText}
                    </p>}
                    <div id="scroller" className="">
                      <table className={("table datatables scrollingtable" )}>
                        <thead className="turquoise-bg white">
                        <tr>
                          <th>Item</th>
                          <th>Item Code</th>
                          <th>{this.state.settings && this.state.settings.moduleEnded ? "WINNING BID" : "CURRENT BID"}</th>
													{ this.state.eventSettings && !this.state.eventSettings.highestBidderHidden &&
													!this.state.settings.moduleEnded ?<th>Highest Bidder</th> : <th>WINNING BIDDER</th>}
                        </tr>
                        </thead>
                        <tbody>
												{this.state.settings && this.state.settings.items &&
												this.state.settings.items.map((item, index) =>
                          <ItemList key={index} item={item} moduleEnded={this.state.settings && this.state.settings.moduleEnded}/>
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
            : <div className="text-center"><span className="fa fa-spinner fa-3x mrg-t-lg fa-pulse fa-fw"/></div> }
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
	getScrollData: (eventUrl, type) => getScrollData(eventUrl, type),
  doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
};
const mapStateToProps = (state) => ({
  eventData: state.event && state.event.data,
  eventTicketData: state.event && state.event.ticket_data,
	currencySymbol: state.event && state.event.currencySymbol || "$",
});
export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Auction));
