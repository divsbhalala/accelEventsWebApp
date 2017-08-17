import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import s from './table.css';
import {doGetSettings, getScrollData} from './../action/index';
import moment from 'moment';
import EventEndUntil from '../../../components/Widget/EventEndUntil';
import TotalProceeds from '../../../components/Widget/TotalProceeds';
import  EventAside from './../../../components/EventAside/EventAside';
import ItemList from '../../../components/Widget/Raffle/ItemList';
// import  history from './../../../history';
let raffleInst = undefined;
class Raffle extends React.Component {
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
        raffleInst.doGetSettings(eventUrl, slug)
      },5000)

    });
  };
  getScrollData = (eventUrl, slug)=>{
    this.props.getScrollData(eventUrl, slug).then(resp => {
      this.setState({
        settings: resp
      });
      setTimeout(()=>{
        raffleInst.getScrollData(eventUrl, slug);
      },5000)
    });
  };
  componentWillMount() {
    raffleInst = this;
    this.doGetSettings(this.props.params && this.props.params.params, 'raffle');
    this.getScrollData(this.props.params && this.props.params.params, 'raffle');
  }
  render() {
    return (
      <div className="table-view-wrap">
        <div id="content-wrapper">
          <div className="row">
            {this.props.eventData ? <div className="col-lg-3 col-md-4 col-sm-4">
              <EventAside activeTab={'Raffle'} eventData={this.props.eventData} settings={this.state.eventSettings}
                          eventTicketData={this.props.eventTicketData} isBidInstructionHidden={true}
                          showMapPopup={this.showMapPopup} activeCategory={false}/>
            </div>
            : <div className="text-center"><span className="fa fa-spinner fa-3x mrg-t-lg fa-pulse fa-fw"/></div>}
            <div className="col-lg-9 col-md-8 col-sm-8">
              <div className="main-box no-header clearfix">
                { this.state.settings ?
                <div className="main-box-body">
                  <div className="table white-bg">
										{ this.state.settings && this.state.settings.displayText && <p className={cx(" help-text mrg-t-lg mrg-t-lg text-center")}>
											{this.state.settings.displayText}
                    </p>}
                    <div id="scroller" className="scrollingpage">
                      <table className={("table datatables" )}>
                        <thead className="turquoise-bg white">
                        <tr>
                          <th>Item</th>
                          <th>Item Code</th>
                          <th>TICKETS SUBMITTED</th>
                          <th>WINNING BIDDER</th>
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
                : <div className="text-center"><span className="fa fa-spinner fa-3x mrg-t-lg fa-pulse fa-fw"/></div> }
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
	getScrollData: (eventUrl, type) => getScrollData(eventUrl, type),
};
const mapStateToProps = (state) => ({
  eventData: state.event && state.event.data,
	currencySymbol: state.event && state.event.currencySymbol || "$",
});
export default  connect(mapStateToProps, mapDispatchToProps)(Raffle);
