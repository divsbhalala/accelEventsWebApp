import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import s from './Setting.css';
import ToggleSwitch from '../../../components/Widget/ToggleSwitch';
import PopupModel from '../../../components/PopupModal';

import {doGetHostSettings, putGetHostSettings} from './action';


class CreditCard extends React.Component {
	static propTypes = {
		title: PropTypes.string,
	};

	constructor() {
		super();
		this.state = {
			settings: {},
			creditCardEnabled: false,
			ccRequiredForBidConfirm: false,
			showItemTransactions: false,
			transactions: [],
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
		let settings = this.state.settings;
		delete settings.allCurrencies;
		this.props.putGetHostSettings("creditCard", settings).then(resp =>{

		}).catch(error=>{

		});
		console.log(e, e.target, this.state.settings)
	};

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
		const options = {
			page: 1,  // which page you want to show as default
			sizePerPageList: [{
				text: '5', value: 5
			}, {
				text: '10', value: 10
			}, {
				text: 'All', value: 100
			}], // you can change the dropdown list for size per page
			sizePerPage: 10,  // which size per page you want to locate as default
			pageStartIndex: 0, // where to start counting the pages
			paginationSize: 5,  // the pagination bar size.
			prePage: 'Prev', // Previous page button text
			nextPage: 'Next', // Next page button text
			// firstPage: 'First', // First page button text
			// lastPage: 'Last', // Last page button text
			// paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
			paginationPosition: 'bottom'  // default is bottom, top and both is all available
			// hideSizePerPage: true > You can hide the dropdown for sizePerPage
			// alwaysShowAllBtns: true // Always show next and previous button
			// withFirstAndLast: false > Hide the going to First and Last page button
		};
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
													<button className="btn btn-info mrg-b-md" type="button" onClick={this.submitSettings}>&nbsp;&nbsp;&nbsp;&nbsp;Save
														Settings&nbsp;&nbsp;&nbsp;&nbsp;</button>
												</div>
											</h1>
										</div>
									</div>
								</div>
								<div className="row">
									<div className>
										<div className="main-box no-header">
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
																<div className="col-sm-4">
																	<div className="stripeconnect stripe-connect btn btn-danger btn-sm">
																		<span>Connect with Stripe</span>
																	</div>
																</div>
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
																						defaultValue={this.state.settings && this.state.settings.ccRequiredForBidConfirm}
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
															<button className="btn btn-info" onClick={this.submitSettings}>&nbsp;&nbsp;&nbsp;&nbsp;Save
																Settings&nbsp;&nbsp;&nbsp;&nbsp;</button>
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
								</div>
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
								<tr>
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
	putGetHostSettings: (type, settings) => putGetHostSettings(type, settings)
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(CreditCard));
