import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import s from './Setting.css';
import ToggleSwitch from '../../../components/Widget/ToggleSwitch';
import PopupModel from '../../../components/PopupModal';
import Button from 'react-bootstrap-button-loader';
import cx from 'classnames';
import {doGetHostSettings, putGetHostSettings, disconnectStripeAccount, connectStripe} from './action';


class CreditCard extends React.Component {
	static propTypes = {
		title: PropTypes.string,
	};

	constructor() {
		super();
		this.state = {
			settings: undefined,
			creditCardEnabled: false,
			ccRequiredForBidConfirm: false,
			showItemTransactions: false,
			transactions: [],
      loading:false,
      isError:false,
      message:null,
		};
		this.toggleItemTransactionsPopup = this.toggleItemTransactionsPopup.bind(this);
		this.submitSettings = this.submitSettings.bind(this);

	};

	componentWillMount() {
		this.props.doGetHostSettings("creditCard").then(resp => {
			this.setState({
				settings: resp && resp.data
			})
		}).catch(error => {
			console.log('error', error)
		})
	}

	submitSettings = (e) => {
		e.preventDefault();
    this.setState({loading:true})
		let settings = this.state.settings;
		delete settings.allCurrencies;
		this.props.putGetHostSettings("creditCard", settings).then(resp =>{
      this.setState({loading:false,message:resp.data.message,isError:false})
		}).catch(error=>{
      this.setState({loading:false,message:"Something wrong",isError:true})
		});
		console.log(e, e.target, this.state.settings)
	};

	disconnectStripe = (e) => {
		e.preventDefault();
    this.setState({loading:true})
		this.props.disconnectStripeAccount().then(resp =>{
      this.setState({loading:false,message:resp.data.message,isError:false})
		}).catch(error=>{
      this.setState({loading:false,message:"Something wrong",isError:true})
		});
	};

	connectStripe = (e) => {
		e.preventDefault();
		this.props.connectStripe().then(resp =>{
			if(resp.data.redirecttostripe==="true"){
				this.connectWithStripe(resp.data.stripeConnectUrl);
			}else{
				//window.location.reload();
			}
		}).catch(error=>{
      this.setState({loading:false,message:"Something wrong",isError:true})
		});
	}

	connectWithStripe = (url) => {
		 let newwindow = window.open(url, 'Connect With Stripe', 'height=600, width=600');
	   if (window.focus && newwindow) { newwindow.focus(); }
	}

	toggleItemTransactionsPopup = () => {
		if (!this.state.showItemTransactions) {
			this.props.doGetHostSettings("transactions").then(resp => {
				this.setState({
					transactions: resp && resp.data
				})
			}).catch(error => {
				console.log('error', error)
			})
		}
		this.setState({
			showItemTransactions: !this.state.showItemTransactions
		})
	};
	changeTaxId = (event) => {
		if(this.taxId && this.taxId.value){
			if(this.taxId.value && this.taxId.value.trim()){
				event.target.parentElement.classList.remove('has-error');
				let settings = this.state.settings;
				if (!settings){
					settings={};
				}
				if(!settings.taxId){
					settings.taxId = "";
				}
				settings.taxId = (this.taxId.value.trim());
				this.setState({
					settings : settings
				})

			}
			else{
				event.target.parentElement.classList.add('has-error');
			}
		}
		else{
			event.target.parentElement.classList.add('has-error');
		}
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
													<Button loading={this.state.loading} className="btn btn-info mrg-b-md" type="button" onClick={this.submitSettings}>&nbsp;&nbsp;&nbsp;&nbsp;Save
														Settings&nbsp;&nbsp;&nbsp;&nbsp;</Button>
												</div>
                      </h1>
                    </div>
                  </div>
                </div>
                { this.state.settings ?
									<div className="row">
                  <div className>
                    <div className="main-box no-header">
                      { this.state.message && <div className={cx('ajax-msg-box text-center mrg-b-lg', !this.state.isError ? 'text-success' : 'text-danger')} >
                        { this.state.message }</div> }
											{ this.state.loading ?
												<div className="ajax-msg-box text-center mrg-b-lg">
													<span className="fa fa-spinner fa-pulse fa-fw"/>
													<span className="resp-message">Please wait...</span>
												</div> : ""
											}
                      <div className="main-box-body clearfix">
                        <p>If you would like to accept credit cards through Accelevents please set up a Stripe account.
													There is a link below with a step-by-step guide on how to quickly (5-10 minutes) create your
													free Stripe account.</p>
												<form id="form" className="mrg-t-lg">
													<div className="form-group row mrg-t-lg">
														<div className="col-md-4">
															<label>Connect Stripe</label>
														</div>
														<div className="col-md-8">
															<div className="row stripe-button-group">
																{!this.state.settings.stripeConnected &&
																	<div className="col-sm-4">
																	<button type="button" className="btn btn-danger btn-sm" onClick={this.connectStripe}>
																		Connect with Stripe
																	</button>
																</div>}
																{this.state.settings.stripeConnected &&
																	<div className="col-sm-4">
																			<button type="button" className="btn btn-green connectedstripeaccount btn-sm">
    	                                  <span>Stripe Account Connected</span>
    	                                </button>
																		<a className="mrg-t-sm disconnectedstripeaccount" onClick={this.disconnectStripe}>Disconnect Stripe Account</a>
																</div> }
																<div className="col-sm-8">
																	<a className="add-info"
																		 href="http://support.accelevents.com/event-setup/credit-card-processing-with-stripe"
																		 title="Additional Instructions" target="_blank">Additional Instructions</a>.
																</div>
															</div>
														</div>
													</div>
													<div className="form-group row">
														<div className="col-md-4">
															<label>Enable Credit Card Processing</label>
															<p className="help-text">This option is only available when Stripe Payments is
																connected.</p>
														</div>
														<div className="col-md-4">
															<ToggleSwitch name="creditCardEnabled" id="creditCardEnabled"
																						defaultValue={this.state.settings && this.state.settings.creditCardEnabled}
																						className="success" onChange={() => {
																this.state.settings.creditCardEnabled = !this.state.settings.creditCardEnabled
															}}
															disabled={!this.state.settings.stripeConnected}
															/>
														</div>
													</div>

													<div className="form-group row">
                              <div className="col-md-4">
                                  <label>Pass Credit Card Transaction Fees to Buyer</label>
                              </div>
                              <div className="col-md-4">
                                  <ToggleSwitch name="processingFeesToPurchaser" id="processingFeesToPurchaser"
                                                              defaultValue={this.state.settings && this.state.settings.processingFeesToPurchaser || false}
                                                              className="success" onChange={() => {
                                      this.state.settings.processingFeesToPurchaser = !this.state.settings.processingFeesToPurchaser
                                  }}/>
                              </div>
                          </div>
													
													<div className="form-group row">
														<div className="col-md-4">
															<label>Require Credit Card for Bid Confirmation</label>
															<p className="help-text">Enabling this will require all bidders to enter their credit card
																information upon submitting their first bid. Bidders will then be asked to confirm the
																transaction if they win an item. Note, this feature only applies to silent auctions.</p>
														</div>
														<div className="col-md-4">
															<ToggleSwitch name="ccRequiredForBidConfirm" id="ccRequiredForBidConfirm"
																						defaultValue={this.state.settings && this.state.settings.ccRequiredForBidConfirm || false}
																						className="success" onChange={() => {
																this.state.settings.ccRequiredForBidConfirm = !this.state.settings.ccRequiredForBidConfirm
															}}/>
														</div>
													</div>
													<div className="form-group row">
														<div className="col-md-4">
															<label>Tax Id Number (optional)</label>
															<p className="help-text">Your tax ID number will be include in the receipts that your
																donors receive.</p>
														</div>
														<div className="col-md-4">
															<div className="input-group">
																<input type="text"
																			 className="form-control"
																			 name="taxId"
																			 ref={(input) => {
																				 this.taxId = input;
																			 }}
																			 onChange={this.changeTaxId}
																			 defaultValue={(this.state.settings && this.state.settings.taxId) || ''}/>
															</div>
														</div>
													</div>
													<div className="form-group row mrg-t-lg">
														<div className="col-md-3">
															<Button loading={this.state.loading} className="btn btn-info" onClick={this.submitSettings}>&nbsp;&nbsp;&nbsp;&nbsp;Save
																Settings&nbsp;&nbsp;&nbsp;&nbsp;</Button>
														</div>
													</div>
													<div className="form-group row mrg-t-lg">
														<div className="col-md-4">
															<a className="btn btn-default btn-block mrg-b-md"
																 onClick={this.toggleItemTransactionsPopup}>View Item Transactions</a>
														</div>
													</div>
													<div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div> :  <div className="text-center"><span className="fa fa-spinner fa-3x mrg-t-lg fa-pulse fa-fw"/></div> }
							</div>
						</div>
					</div>

				</div>
				<PopupModel
					id="mapPopup"
					showModal={this.state.showItemTransactions}
					headerText={ <p>Stripe Customers</p>}
					onCloseFunc={this.toggleItemTransactionsPopup}
					modelFooter={<div>
						<button className="btn btn-green" onClick={() => {
							this.toggleItemTransactionsPopup()
						}}>Close
						</button>
					</div>}
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
						<tbody>
						{
							this.state.transactions ? this.state.transactions.map(item=>{
								<tr key={item.name}>
									<td>{item.name}</td>
									<td>{item.phoneNumber}</td>
									<td>{item.amount}</td>
									<td>{item.status}</td>
									<td>{item.source}</td>
								</tr>
							}) : ""
						}
						<tr>
							<td colSpan="5" className="text-center">No record found</td>
						</tr>
						</tbody>
					</table>

				</PopupModel>

			</div>
		);
	}
}
const mapDispatchToProps = {
	doGetHostSettings: (type) => doGetHostSettings(type),
	putGetHostSettings: (type, settings) => putGetHostSettings(type, settings),
	disconnectStripeAccount : () => disconnectStripeAccount(),
	connectStripe : () => connectStripe()
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(CreditCard));
