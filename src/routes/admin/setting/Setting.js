import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './Setting.css';
import ToggleSwitch from '../../../components/Widget/ToggleSwitch';

import { doGetHostSettings, putGetHostSettings } from './action';
import Button from 'react-bootstrap-button-loader';
import cx from 'classnames';

const regOnlyNumber = new RegExp('^[0-9]*$');
class Setting extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      settings: null,
      requireBidderAddress: false,
      silentAuctionEnabled: false,
      raffleEnabled: false,
      causeAuctionEnabled: false,
      donationEnabled: false,
      ticketingEnabled: false,
      loading: false,
      isError: false,
      message: null,
    };
    this.submitSettings = this.submitSettings.bind(this);
  }

  componentWillMount() {
    this.props.doGetHostSettings('general').then((resp) => {
      this.setState({
        settings: resp && resp.data,
      });
    }).catch((error) => {
    });
  }

  submitSettings = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const settings = this.state.settings;
    delete settings.allCurrencies;
    this.props.putGetHostSettings('general', settings).then((resp) => {
      this.setState({ loading: false, message: resp.data.message, isError: false });
    }).catch((error) => {
      this.setState({ loading: false, message: 'Something wrong', isError: true });
    });
  };
  changeGoalStartingAmount = (event) => {
    if (this.goalStartingAmount && this.goalStartingAmount.value) {
      if (regOnlyNumber.test(this.goalStartingAmount.value.trim())) {
        event.target.parentElement.classList.remove('has-error');
        let settings = this.state.settings;
        if (!settings) {
          settings = {};
        }
        if (!settings.goalStartingAmount) {
          settings.goalStartingAmount = 0;
        }
        this.goalStartingAmount.value = parseInt(this.goalStartingAmount.value.trim());
        settings.goalStartingAmount = this.goalStartingAmount.value;
        this.setState({
          settings,
        });
      }			else {
        event.target.parentElement.classList.add('has-error');
      }
    }		else {
      event.target.parentElement.classList.add('has-error');
    }
  };
  changeFundRaisingGoal = (event) => {
    if (this.fundStartingAmount && this.fundStartingAmount.value) {
      if (regOnlyNumber.test(this.fundStartingAmount.value.trim())) {
        event.target.parentElement.classList.remove('has-error');
        let settings = this.state.settings;
        if (!settings) {
          settings = {};
        }
        if (!settings.fundRaisingGoal) {
          settings.fundRaisingGoal = 0;
        }
        this.fundStartingAmount.value = parseInt(this.fundStartingAmount.value.trim());
        settings.fundRaisingGoal = this.fundStartingAmount.value;
        this.setState({
          settings,
        });
      }			else {
        event.target.parentElement.classList.add('has-error');
      }
    }		else {
      event.target.parentElement.classList.add('has-error');
    }
  };
  SelectCurrency = (event) => {
    if (this.currency && this.currency.value) {
      if (this.currency.value && this.currency.value.trim()) {
        event.target.parentElement.classList.remove('has-error');
        let settings = this.state.settings;
        if (!settings) {
          settings = {};
        }
        if (!settings.currency) {
          settings.currency = 0;
        }
        settings.currency = (this.currency.value.trim());
        this.setState({
          settings,
        });
      }			else {
        event.target.parentElement.classList.add('has-error');
      }
    }		else {
      event.target.parentElement.classList.add('has-error');
    }
  };

  render() {
    return (
			<div id="content-wrapper" className="admin-content-wrapper">
        {this.state.settings ?
					<div className="row">
						<div className="col-sm-12">
							<div className="row" style={{ opacity: 1 }}>
								<div className="col-lg-12">
									<div className="row">
										<div className="col-lg-12">
											<div id className="clearfix">
												<div className="pull-left" />
												<ol className="breadcrumb">
													<li><a href="/AccelEventsWebApp/host/dashboard/home">Home</a></li>
													<li className="active"><span>General Settings</span></li>
												</ol>
												<h1>
													General Settings
													<div className="pull-right">
														<Button
															className="btn btn-info" loading={this.state.loading} id="save-settings" onClick={this.submitSettings}
															type="button"
														>&nbsp;&nbsp;&nbsp;&nbsp;Save Settings&nbsp;&nbsp;&nbsp;&nbsp;</Button>
													</div>
												</h1>
											</div>
										</div>
									</div>
                  { this.state.settings ? <div className="row">
										<div className>
											<div className="main-box no-header">
												<div className="main-box-body clearfix">
													<form id="form">
                            { this.state.message && <div  className={cx("ajax-msg-box text-center mrg-b-lg", !this.state.isError ? 'text-success':'text-danger')} >
                              { this.state.message }</div> }
														<div className="form-group row">
															<div className="col-md-4">
																<label>Select Currency</label>
															</div>
															<div className="col-md-4">
																<select
																	className="form-control" name="currency" id="currency"
																	ref={(input) => {
                                    this.currency = input;
                                  }}
																	onChange={this.SelectCurrency}
																	defaultValue={(this.state.settings && this.state.settings.currency) || 'USD'}
																>

                                  {
                                    this.state.settings && this.state.settings.allCurrencies ? this.state.settings.allCurrencies.map(item =>
																			<option value={item} key={item}> {item}</option>) : <option value="USD"> USD ( $ )</option>
                                  }
																</select>
															</div>
														</div>
														<div className="form-group row">
															<div className="col-md-4">
																<label>Event Fundraising Goal (used for event display)</label>
																<p className="help-text">Your event fundraising goal is the
																	dollar amount that you hope to raise. This amount will be
																	displayed to attendees to encourage donations and monitor
																	progress towards your goal.</p>
															</div>
															<div className="col-md-4">
																<div className="input-group">
																	<span className="input-group-addon">{this.props.currencySymbol}</span>
																	<input
																		type="text"
																		className="form-control"
																		name="fundRaisingGoal"
																		ref={(input) => {
                                      this.fundStartingAmount = input;
                                    }}
																		onChange={this.changeFundRaisingGoal}
																		defaultValue={(this.state.settings && this.state.settings.fundRaisingGoal) || 0}
																	/>
																</div>
															</div>
														</div>
														<div className="form-group row">
															<div className="col-md-4">
																<label>Goal Starting Amount</label>
																<p className="help-text">If you have already received
																	donations or sold tickets for your event you can enter a
																	starting amount to be used for your contributions.</p>
															</div>
															<div className="col-md-4">
																<div className="input-group">
																	<span className="input-group-addon">{this.props.currencySymbol}</span>
																	<input
																		type="text"
																		className="form-control"
																		name="goalStartingAmount"
																		ref={(input) => {
                                      this.goalStartingAmount = input;
                                    }}
																		onChange={this.changeGoalStartingAmount}
																		defaultValue={(this.state.settings && this.state.settings.goalStartingAmount) || 0}
																	/>
																</div>
															</div>
														</div>
														<div className="form-group row">
															<div className="col-md-4">
																<label>Bidder Residential Address</label>
																<p className="help-text">On Sign Up page, you can ask Bidder to enter Residential Address
																	which may be helpful for delivering an item.</p>
															</div>
															<div className="col-md-4">
																<ToggleSwitch
																	name="requireBidderAddress" id="requireBidderAddress"
																	defaultValue={(this.state.settings && this.state.settings.requireBidderAddress)}
																	className="success" onChange={() => {
                                  this.state.settings.requireBidderAddress = !this.state.settings.requireBidderAddress;
                                }}
																/>
															</div>
														</div>
														<div className="main-box-body clearfix">
															<p>Disabling a module from this page will hide the module setup page and hide the tab on the
																Display Page. If you only wish to hide the module tab on the Display Page you can do so
																from the module Settings page in the left hand navigation menu.</p>
														</div>
														<div className="form-group row">
															<div className="col-md-4">
																<label>Enable Silent Auctions</label>
																<p className="help-text" />
															</div>
															<div className="col-md-4">
																<ToggleSwitch
																	name="silentAuctionEnabled" id="silentAuctionEnabled"
																	defaultValue={(this.state.settings && this.state.settings.silentAuctionEnabled)}
																	className="success" onChange={() => {
                                  this.state.settings.silentAuctionEnabled = !this.state.settings.silentAuctionEnabled;
                                }}
																/>
															</div>
														</div>
														<div className="form-group row">
															<div className="col-md-4">
																<label>Enable Raffle</label>
																<p className="help-text" />
															</div>
															<div className="col-md-4">
																<ToggleSwitch
																	name="raffleEnabled" id="raffleEnabled"
																	defaultValue={(this.state.settings && this.state.settings.raffleEnabled)}
																	className="success" onChange={() => {
                                  this.state.settings.raffleEnabled = !this.state.settings.raffleEnabled;
                                }}
																/>
															</div>
														</div>
														<div className="form-group row">
															<div className="col-md-4">
																<label>Enable Fund a Need</label>
																<p className="help-text" />
															</div>
															<div className="col-md-4">
																<ToggleSwitch
																	name="causeAuctionEnabled" id="causeAuctionEnabled"
																	defaultValue={(this.state.settings && this.state.settings.causeAuctionEnabled)}
																	className="success" onChange={() => {
                                  this.state.settings.causeAuctionEnabled = !this.state.settings.causeAuctionEnabled;
                                }}
																/>
															</div>
														</div>
														<div className="form-group row">
															<div className="col-md-4">
																<label>Enable Donation Page</label>
																<p className="help-text" />
															</div>
															<div className="col-md-4">
																<ToggleSwitch
																	name="donationEnabled" id="donationEnabled"
																	defaultValue={(this.state.settings && this.state.settings.donationEnabled)}
																	className="success" onChange={() => {
                                  this.state.settings.donationEnabled = !this.state.settings.donationEnabled;
                                }}
																/>
															</div>
														</div>
														<div className="form-group row">
															<div className="col-md-4">
																<label>Enable Ticketing</label>
																<p className="help-text" />
															</div>
															<div className="col-md-4">
																<ToggleSwitch
																	name="ticketingEnabled" id="ticketingEnabled"
																	defaultValue={(this.state.settings && this.state.settings.ticketingEnabled)}
																	className="success" onChange={() => {
                                  this.state.settings.ticketingEnabled = !this.state.settings.ticketingEnabled;
                                }}
																/>
															</div>
														</div>
														<div className="row">
															<div className="col-md-3">
																<Button loading={this.state.loading} className="btn btn-info" id="submitForm" onClick={this.submitSettings}>&nbsp;&nbsp;&nbsp;&nbsp;
																	Save Settings&nbsp;&nbsp;&nbsp;&nbsp;</Button>
															</div>
														</div>
														<div />
													</form>
												</div>
											</div>
										</div>
									</div>: <div id="app" className="loader" /> }
								</div>
							</div>
						</div>
					</div> :<div id="app" className="loader" /> }
			</div>
    );
  }
}

const mapDispatchToProps = {
  doGetHostSettings: type => doGetHostSettings(type),
  putGetHostSettings: (type, data) => putGetHostSettings(type, data),
};

const mapStateToProps = state => ({
	currencySymbol : (state.host && state.host.currencySymbol) || "$",
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Setting));
