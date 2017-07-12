
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import s from './Setting.css';
import ToggleSwitch from '../../../components/Widget/ToggleSwitch';
import PopupModel from '../../../components/PopupModal';

import {doGetHostSettings} from './action';


class CreditCard extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
	constructor() {
		super();
		this.state = {
			creditCardEnabled: false,
			ccRequiredForBidConfirm: false,
			showItemTransactions : false
		};
		this.toggleItemTransactionsPopup = this.toggleItemTransactionsPopup.bind(this);

	};

	componentWillMount(){
		this.props.doGetHostSettings("creditCard").then(resp =>{
			console.log("resp", resp);
		}).catch(error=>{
			console.log('error', error)
		})
	}

	toggleItemTransactionsPopup = ()=>{
		this.setState({
			showItemTransactions: !this.state.showItemTransactions
		})
  };
  render() {
    return (
      <div id="content-wrapper" className="admin-content-wrapper">
        <div className="row">
          <div className="col-sm-12">
            <div className="row" style={{opacity: 1}}>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12">
                      <div id className="clearfix">
                        <div className="pull-left">
                          <ol className="breadcrumb">
                            <li><a href="/AccelEventsWebApp/host/dashboard/home">Home</a></li>
                            <li>
                              <a href="/AccelEventsWebApp/host/settings/general">Settings</a>
                            </li>
                            <li className="active"><span>Credit Card</span></li>
                          </ol>
                        </div>
                        <h1>
                          Credit Card Processing
                          <div className="pull-right">
                            <button className="btn btn-info mrg-b-md" type="button">&nbsp;&nbsp;&nbsp;&nbsp;Save Settings&nbsp;&nbsp;&nbsp;&nbsp;</button>
                          </div>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className>
                      <div className="main-box no-header">
                        <div className="main-box-body clearfix">
                          <p>If you would like to accept credit cards through Accelevents please set up a Stripe account. There is a link below with a step-by-step guide on how to quickly (5-10 minutes) create your free Stripe account.</p>
                          <form id="form" className="mrg-t-lg" action="/AccelEventsWebApp/host/settings/updateccsettings" method="post">
                            <div className="form-group row mrg-t-lg">
                              <div className="col-md-4">
                                <label>Connect Stripe</label>
                              </div>
                              <div className="col-md-8">
                                <div className="row stripe-button-group">
                                  <div className="col-sm-4">
                                    <div className="stripeconnect stripe-connect btn btn-danger btn-sm">
                                      <span>Connect with Stripe</span>
                                    </div>
                                  </div>
                                  <div className="col-sm-8">
                                    <a className="add-info" href="http://support.accelevents.com/event-setup/credit-card-processing-with-stripe" title="Additional Instructions" target="_blank">Additional Instructions</a>.
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-md-4">
                                <label>Enable Credit Card Processing</label>
                                <p className="help-text">This option is only available when Stripe Payments is connected.</p>
                              </div>
                              <div className="col-md-4">
                                <ToggleSwitch name="creditCardEnabled" id="creditCardEnabled" defaultValue={this.state.creditCardEnabled} className="success" onChange={()=>{ this.state.creditCardEnabled = !this.state.creditCardEnabled}}/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-md-4">
                                <label>Require Credit Card for Bid Confirmation</label>
                                <p className="help-text">Enabling this will require all bidders to enter their credit card information upon submitting their first bid. Bidders will then be asked to confirm the transaction if they win an item. Note, this feature only applies to silent auctions.</p>
                              </div>
                              <div className="col-md-4">
                                <ToggleSwitch name="ccRequiredForBidConfirm" id="ccRequiredForBidConfirm" defaultValue={this.state.ccRequiredForBidConfirm} className="success" onChange={()=>{ this.state.ccRequiredForBidConfirm = !this.state.ccRequiredForBidConfirm}}/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-md-4">
                                <label>Tax Id Number (optional)</label>
                                <p className="help-text">Your tax ID number will be include in the receipts that your donors receive.</p>
                              </div>
                              <div className="col-md-4">
                                <div className="input-group">
                                  <input type="text" className="form-control" name="taxId" defaultValue />
                                </div>
                              </div>
                            </div>
                            <div className="form-group row mrg-t-lg">
                              <div className="col-md-3">
                                <button className="btn btn-info" type="button">&nbsp;&nbsp;&nbsp;&nbsp;Save Settings&nbsp;&nbsp;&nbsp;&nbsp;</button>
                              </div>
                            </div>
                            <div className="form-group row mrg-t-lg">
                              <div className="col-md-4">
                                <a  className="btn btn-default btn-block mrg-b-md" onClick={this.toggleItemTransactionsPopup}>View Item Transactions</a>
                              </div>
                            </div>
                            <div>
                            </div></form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        <PopupModel
          id="mapPopup"
          showModal={this.state.showItemTransactions}
          headerText={"Stripe Customers"}
          onCloseFunc={this.toggleItemTransactionsPopup}
          modelFooter = {<div>
            <button className="btn btn-green" onClick={()=>{this.toggleItemTransactionsPopup()}}>Close</button></div>}
        >
          <table className="table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Source</th>
            </tr>
            </thead>
            <tbody><tr>
              <td>alex</td>
              <td>(508) 254-0009</td>
              <td>105.36</td>
              <td>SUCCESS</td>
              <td>EVENT_TICKETING</td>
            </tr>
            </tbody></table>

        </PopupModel>

      </div>
    );
  }
}
const mapDispatchToProps = {
	doGetHostSettings: (type) => doGetHostSettings(type)
};

const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(CreditCard));
