
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import s from './scroll.css';
import {doGetFundANeedItemByLimit, doGetSettings, getScrollData} from './../action/index';
import EventEndUntil from '../../../components/Widget/EventEndUntil';
import TotalProceeds from '../../../components/Widget/TotalProceeds';
import ItemList from '../../../components/Widget/FundANeed/ItemList';
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
    });
  }

  render() {
    return (
      <div className="scroll-page-wrap">
        {this.state.settings ?
        <div id="content-wrapper">
          <div className="row">
            <div className="col-md-5 col-md-offset-1">
              {this.state.settings && <EventEndUntil isBig={true} settings={this.state.settings} headerText="Time Until Event Ends" className="gray-bg" />}
            </div>
            <div className="col-md-5">
              {this.state.settings && <TotalProceeds totalRised={this.state.settings.totalRised} headerText="Total Proceeds" className="gray-bg"/>}
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
                    <th>MINIMUM PLEDGE</th>
                    <th>TOTAL AMOUNT PLEDGED</th>
                  </tr>
                  </thead>
                </table>
                <div id="scroller" className="scrollingpage microsoft scroll-container" height={ "500px"}>
                  {this.state.settings && this.state.settings.items && this.state.settings.items.length > 8 && <span  className="marquee" >
                    <table className={("table datatables scrollingtable" , s.inner)}>
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
  doGetFundANeedItemByLimit: (eventUrl, page, size, type) => doGetFundANeedItemByLimit(eventUrl, page, size, type),
};
const mapStateToProps = (state) => ({});

export default  connect(mapStateToProps, mapDispatchToProps)(Fund);
