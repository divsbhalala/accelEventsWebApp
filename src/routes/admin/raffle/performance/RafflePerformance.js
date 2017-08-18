
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
let rafflePerformanceInst = undefined;
let rafflePerformanceTimeout = undefined;
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
    this.getPerformanceRaffleItem = this.getPerformanceRaffleItem.bind(this);
    rafflePerformanceInst = this;
  }
  getPerformanceRafflePurchasedTicketCSV = () => {
    this.props.getPerformanceRafflePurchasedTicketCSV('Purchased Raffle data.csv').then((resp) => {
    });
  };
  getPerformanceAuctionBidderCSV = () => {
    this.props.getPerformanceAuctionBidderCSV().then((resp) => {
    });
  };
  getPerformanceRaffleParticipantTicketCSV = () => {
    this.props.getPerformanceRaffleParticipantTicketCSV('All Participant data.csv').then((resp) => {
    });
  };
  getPerformanceRaffleWinnerCSV = () => {
    this.props.getPerformanceRaffleWinnerCSV('Ticket Winner data.csv').then((resp) => {
      this.setState({items:resp})
    });
  };
  componentWillMount() {
    this.getPerformanceRaffleItem();
  }
  getPerformanceRaffleItem = ()=>{
    this.props.getPerformanceRaffleItem().then((resp) => {
      this.setState({
        items: resp,
      }, ()=>{
        rafflePerformanceTimeout = setTimeout(()=>{
          rafflePerformanceInst.getPerformanceRaffleItem();
        }, 10000)
      });
    }).catch((error) => {
      if(rafflePerformanceTimeout){
        clearTimeout(rafflePerformanceTimeout);
        rafflePerformanceTimeout = null;
      }
    });
  }
  componentWillUnmount(){
    if(rafflePerformanceTimeout){
      clearTimeout(rafflePerformanceTimeout);
      rafflePerformanceTimeout = null;
    }
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
                        { this.state.items? <RaffleItemTable items={this.state.items} />: <div className="text-center"><span className="fa fa-spinner fa-3x mrg-t-lg fa-pulse fa-fw"/></div>}

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
  getPerformanceRafflePurchasedTicketCSV: (name) => getPerformanceRafflePurchasedTicketCSV(name),
  getPerformanceRaffleParticipantTicketCSV: (name) => getPerformanceRaffleParticipantTicketCSV(name),
  getPerformanceRaffleWinnerCSV: (name) => getPerformanceRaffleWinnerCSV(name),

};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(RafflePerformance));
