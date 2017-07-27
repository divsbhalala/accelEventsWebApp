
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AuctionPerformance.css';
import cx from 'classnames';
import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
import { getPerformanceAuctionItem, getPerformanceAuctionItemByItemCode, getPerformanceAuctionWinnerCSV, getPerformanceAuctionBidderCSV } from './action';
import { connect } from 'react-redux';
import AuctionItemTable from '../../../../components/AuctionPerformance/AuctionItemTable';

class AuctionPerformance extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      showPopup: false,
      loading: false,
      message: null,
    };
  }
  getPerformanceAuctionWinnerCSV = () => {
    this.props.getPerformanceAuctionWinnerCSV().then((resp) => {
    });
  };
  getPerformanceAuctionBidderCSV = () => {
    this.props.getPerformanceAuctionBidderCSV().then((resp) => {
    });
  }
  getPerformanceAuctionItemByItemCode = () => {
    this.props.getPerformanceAuctionItemByItemCode().then((resp) => {
      this.setState({ items: resp });
    });
  }
  componentWillMount() {
    this.props.getPerformanceAuctionItem().then((resp) => {
      console.log('resp', resp);
      this.setState({
        items: resp,
      });
    }).catch((error) => {
      console.log('error', error);
    });
  }
  render() {
    return (
      <div id="content-wrapper" className="admin-content-wrapper">
        <div className="row">
          <div className="col-sm-12">
            <div className="row form-group flexrow">
              <div className="row" style={{ opacity: 1 }}>
                <div className="col-lg-12">
                  <div id className="clearfix" />
                </div>
              </div>
              <div className="row" style={{ opacity: 1 }}>
                <div className="col-lg-12">
                  <div className="main-box no-header">
                    <div className="main-box-body clearfix">
                      <div id="alertmessage" />
                      {this.state.items?
                      <AuctionItemTable items={this.state.items} />: <div id="app" className="loader" /> }
                      <div className="form-group operations-row mrg-t-lg">
                        <div className="row">
                          <div className="col-md-3" role="group">
                            <a onClick={this.getPerformanceAuctionBidderCSV} className="btn btn-block btn-default mrg-b-md">Download all bidder data</a>
                          </div>
                          <div className="col-md-3" role="group">
                            <a onClick={this.getPerformanceAuctionWinnerCSV} className="btn btn-block btn-default mrg-b-md">Download Winner Data</a>
                          </div>
                        </div>
                      </div>
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


const mapDispatchToProps = {
  getPerformanceAuctionItem: () => getPerformanceAuctionItem(),
  getPerformanceAuctionItemByItemCode: ItemCode => getPerformanceAuctionItemByItemCode(ItemCode),
  getPerformanceAuctionWinnerCSV: () => getPerformanceAuctionWinnerCSV(),
  getPerformanceAuctionBidderCSV: () => getPerformanceAuctionBidderCSV(),
};

const mapStateToProps = state => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(AuctionPerformance));

