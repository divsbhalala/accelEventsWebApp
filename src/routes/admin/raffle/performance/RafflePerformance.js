
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RafflePerformance.css';
import cx from 'classnames';
import {getPerformanceRaffleItem,
  getPerformanceRaffleItemByItemCode,
  getPerformanceRafflePurchasedTicketCSV,
  getPerformanceRaffleParticipantTicketCSV,
  getPerformanceRaffleWinnerCSV} from './action';
import {connect} from 'react-redux';
import RaffleItemTable from '../../../../components/RafflePerformance/RaffleItemTable';

class RafflePerformance extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      showPopup: false,
      loading:false,
      message:null,
    }
  }
  getPerformanceRafflePurchasedTicketCSV = () => {
    this.props.getPerformanceRafflePurchasedTicketCSV().then((resp) => {
    });
  };
  getPerformanceAuctionBidderCSV = () => {
    this.props.getPerformanceAuctionBidderCSV().then((resp) => {
    });
  };
  getPerformanceRaffleParticipantTicketCSV = () => {
    this.props.getPerformanceRaffleParticipantTicketCSV().then((resp) => {
    });
  };
  getPerformanceRaffleWinnerCSV = () => {
    this.props.getPerformanceRaffleWinnerCSV().then((resp) => {
      this.setState({items:resp})
    });
  };
  componentWillMount() {
    this.props.getPerformanceRaffleItem().then(resp => {
      console.log("resp", resp);
      this.setState({
        items: resp,
      })
    }).catch(error => {
      console.log('error', error)
    })
  }
  render() {
    return (
      <div id="content-wrapper" className="admin-content-wrapper">
        <div className="row">
          <div className="col-sm-12">
            <div className="row form-group flexrow">
                <div className="row" style={{opacity: 1}}>
                  <div className="col-lg-12">
                    <div id className="clearfix">
                    </div>
                  </div>
                </div>
                <div className="row" style={{opacity: 1}}>
                  <div className="col-lg-12">
                    <div className="main-box no-header">
                      <div className="main-box-body clearfix">
                        <RaffleItemTable items={this.state.items} />

                        {/* Action Row */}
                        <div className="form-group operations-row">
                          <div className="row">
                            <div className="col-md-3" role="group">
                              <a onClick={this.getPerformanceRaffleParticipantTicketCSV} className="btn btn-block btn-default mrg-b-md">Download All Participant Data</a>
                            </div>
                            <div className="col-md-3" role="group">
                              <a onClick={this.getPerformanceRaffleWinnerCSV} className="btn btn-block btn-default mrg-b-md">Download Winner Data</a>
                            </div>
                            <div className="col-md-3" role="group">
                              <a onClick={this.getPerformanceRafflePurchasedTicketCSV} className="btn btn-block btn-default mrg-b-md">Download Raffle Purchased Data</a>
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
  getPerformanceRaffleItem: () => getPerformanceRaffleItem(),
  getPerformanceRaffleItemByItemCode: (ItemCode) => getPerformanceRaffleItemByItemCode(ItemCode),
  getPerformanceRafflePurchasedTicketCSV: () => getPerformanceRafflePurchasedTicketCSV(),
  getPerformanceRaffleParticipantTicketCSV: () => getPerformanceRaffleParticipantTicketCSV(),
  getPerformanceRaffleWinnerCSV: () => getPerformanceRaffleWinnerCSV(),

};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(RafflePerformance));
