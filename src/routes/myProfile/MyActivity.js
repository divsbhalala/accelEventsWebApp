import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MyProfile.css';
import { connect } from 'react-redux';
import { getUserAcivity } from './action/signup_action';
import  ActivityData from './ActivityData';
import  ActivityItem from './ActivityItem';
class myActivity extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor() {
    super();
    this.state = {
      userData: null,
      message: '',
      status: '',
    };
  }
  componentWillMount() {
    this.props.getUserAcivity().then((resp) => {
      console.log('activ data1', resp.data);
      if (resp && resp.data) {
        this.setState({
          userData: resp.data,
        });
      }
       }).catch((error) => {
      console.log('error', error);
    });
  }
  render() {
    return (
      <div className="container">
        <h1 className="stats-event-name">{this.state.userData && this.state.userData.eventName}</h1>
               <div className="row">
          <div className="col-xs-12 col-md-6">
            <h2>Silent Auction Items</h2>
            <div className="main-box-body clearfix">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="emerald-bg white">
                  <tr>
                    <th><span>Item</span></th>
                    <th><span>My Bid</span></th>
                    <th><span>Current Bid</span></th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.userData && this.state.userData.silentActivitys.map((data) =>
                    <ActivityData userData={data} />)
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <header class="main-box-header clearfix greenbg">
              <h2>Raffle Auction Items</h2>
            </header>
            <div className="main-box-body clearfix">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="emerald-bg white">
                  <tr>
                    <th><span>Item</span></th>
                    <th><span>My Bid</span></th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.userData && this.state.userData.raffleActivitys.map((data) =>
                    <ActivityItem userData={data} />)
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <header class="main-box-header clearfix greenbg">
              <h2>Cause Auction Activity </h2>
            </header>
            <div className="main-box-body clearfix">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="emerald-bg white">
                  <tr>
                    <th><span>Item</span></th>
                    <th><span>My Bid</span></th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.userData && this.state.userData.causeAuctionActivitys.map((data) =>
                    <ActivityItem userData={data} />)
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}
const mapDispatchToProps = {
  getUserAcivity: () => getUserAcivity(),
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(myActivity));
