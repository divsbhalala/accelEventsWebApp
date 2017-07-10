
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Setting.css';
import AdminSiderbar from '../../../components/Sidebar/AdminSidebar';

class CreditCard extends React.Component {
  static propTypes = {
    title: PropTypes.string,
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
                            <button className="btn btn-info mrg-b-md" type="button" onclick="$('#form').submit();">&nbsp;&nbsp;&nbsp;&nbsp;Save Settings&nbsp;&nbsp;&nbsp;&nbsp;</button>
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
                                <div className="onoffswitch onoffswitch-success">
                                  <input id="cc-option" name="creditCardEnabled" className="onoffswitch-checkbox" disabled="disabled" type="checkbox" defaultValue="true" />
                                  <label className="onoffswitch-label" htmlFor="cc-option">
                                    <div className="onoffswitch-inner" />
                                    <div className="onoffswitch-switch" />
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-md-4">
                                <label>Require Credit Card for Bid Confirmation</label>
                                <p className="help-text">Enabling this will require all bidders to enter their credit card information upon submitting their first bid. Bidders will then be asked to confirm the transaction if they win an item. Note, this feature only applies to silent auctions.</p>
                              </div>
                              <div className="col-md-4">
                                <div className="onoffswitch onoffswitch-success">
                                  <input id="require-cc" name="ccRequiredForBidConfirm" className="onoffswitch-checkbox" type="checkbox" defaultValue="true" /><input type="hidden" name="_ccRequiredForBidConfirm" defaultValue="on" />
                                  <label className="onoffswitch-label" htmlFor="require-cc">
                                    <div className="onoffswitch-inner" />
                                    <div className="onoffswitch-switch" />
                                  </label>
                                </div>
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
                                <button className="btn btn-info" type="button" onclick="$('#form').submit();">&nbsp;&nbsp;&nbsp;&nbsp;Save Settings&nbsp;&nbsp;&nbsp;&nbsp;</button>
                              </div>
                            </div>
                            <div className="form-group row mrg-t-lg">
                              <div className="col-md-4">
                                <a href="#" className="btn btn-default btn-block mrg-b-md" data-toggle="modal" data-target="#item-transactions">View Item Transactions</a>
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
        </div>
    );
  }
}


export default withStyles(s)(CreditCard);
