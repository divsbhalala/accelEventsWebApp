import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import s from './Setting.css';
import ToggleSwitch from '../../../components/Widget/ToggleSwitch';

import {doGetHostSettings} from './action';

class Setting extends React.Component {
	static propTypes = {
		title: PropTypes.string,
	};
	constructor() {
		super();
		this.state = {
			settings: {},
			requireBidderAddress: false,
			silentAuctionEnabled: false,
			raffleEnabled: false,
			causeAuctionEnabled: false,
			donationEnabled: false,
			ticketingEnabled: false
		}
	};

	componentWillMount(){
		this.props.doGetHostSettings("general").then(resp =>{
				console.log("resp", resp);
				this.setState({
					settings: resp && resp.data
				})
		}).catch(error=>{
			console.log('error', error)
		})
	}

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
											</div>
											<ol className="breadcrumb">
												<li><a href="/AccelEventsWebApp/host/dashboard/home">Home</a></li>
												<li className="active"><span>General Settings</span></li>
											</ol>
											<h1>
												General Settings
												<div className="pull-right">
													<button className="btn btn-info" id="save-settings"
																	type="button">&nbsp;&nbsp;&nbsp;&nbsp;Save Settings&nbsp;&nbsp;&nbsp;&nbsp;</button>
												</div>
											</h1>
										</div>
									</div>
								</div>
								<div className="row">
									<div className>
										<div className="main-box no-header">
											<div className="main-box-body clearfix">
												<form id="form" action="/AccelEventsWebApp/host/settings/updatesettings" method="post">
													<div className="form-group row">
														<div className="col-md-4">
															<label>Select Currency</label>
														</div>
														<div className="col-md-4">
															<select className="form-control" name="currency" id="currency" defaultValue={ (this.state.settings && this.state.settings.fundRaisingGoal) || "USD"}>
																<option value="USD"> USD ( $ )</option>
																<option value="CAD"> CAD ( $ )</option>
																<option value="AUD"> AUD ( $ )</option>
																<option value="EURO"> EURO ( € )</option>
																<option value="POUND"> POUND ( £ )</option>
																<option value="RAND"> RAND ( R )</option>
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
																<span className="input-group-addon">$</span>
																<input type="text" className="form-control" name="fundRaisingGoal" defaultValue={ (this.state.settings && this.state.settings.fundRaisingGoal) || 0}/>
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
																<span className="input-group-addon">$</span>
																<input type="text" className="form-control" name="goalStartingAmount" defaultValue={(this.state.settings && this.state.settings.goalStartingAmount) || 0}/>
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
															<ToggleSwitch name="requireBidderAddress" id="requireBidderAddress" defaultValue={this.state.settings && this.state.settings.requireBidderAddress} className="success" onChange={()=>{ this.state.settings.requireBidderAddress = !this.state.settings.requireBidderAddress}}/>
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
															<p className="help-text"/>
														</div>
														<div className="col-md-4">
															<ToggleSwitch name="silentAuctionEnabled" id="silentAuctionEnabled" defaultValue={this.state.settings && this.state.settings.silentAuctionEnabled} className="success" onChange={()=>{ this.state.settings.silentAuctionEnabled = !this.state.settings.silentAuctionEnabled}}/>
														</div>
													</div>
													<div className="form-group row">
														<div className="col-md-4">
															<label>Enable Raffle</label>
															<p className="help-text"/>
														</div>
														<div className="col-md-4">
															<ToggleSwitch name="raffleEnabled" id="raffleEnabled" defaultValue={this.state.settings && this.state.settings.raffleEnabled} className="success" onChange={()=>{ this.state.settings.raffleEnabled = !this.state.settings.raffleEnabled}}/>
														</div>
													</div>
													<div className="form-group row">
														<div className="col-md-4">
															<label>Enable Fund a Need</label>
															<p className="help-text"/>
														</div>
														<div className="col-md-4">
															<ToggleSwitch name="causeAuctionEnabled" id="causeAuctionEnabled" defaultValue={this.state.settings && this.state.settings.causeAuctionEnabled} className="success" onChange={()=>{ this.state.settings.causeAuctionEnabled = !this.state.settings.causeAuctionEnabled}}/>
														</div>
													</div>
													<div className="form-group row">
														<div className="col-md-4">
															<label>Enable Donation Page</label>
															<p className="help-text"/>
														</div>
														<div className="col-md-4">
															<ToggleSwitch name="donationEnabled" id="donationEnabled" defaultValue={this.state.settings && this.state.settings.donationEnabled} className="success" onChange={()=>{ this.state.settings.donationEnabled = !this.state.settings.donationEnabled}}/>
														</div>
													</div>
													<div className="form-group row">
														<div className="col-md-4">
															<label>Enable Ticketing</label>
															<p className="help-text"/>
														</div>
														<div className="col-md-4">
															<ToggleSwitch name="ticketingEnabled" id="ticketingEnabled" defaultValue={this.state.settings && this.state.settings.ticketingEnabled} className="success" onChange={()=>{ this.state.settings.ticketingEnabled = !this.state.settings.ticketingEnabled}}/>
														</div>
													</div>
													<div className="row">
														<div className="col-md-3">
															<button className="btn btn-info" id="submitForm" type="submit">&nbsp;&nbsp;&nbsp;&nbsp;
																Save Settings&nbsp;&nbsp;&nbsp;&nbsp;</button>
														</div>
													</div>
													<div>
													</div>
												</form>
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
	doGetHostSettings: (type) => doGetHostSettings(type)
};

const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Setting));