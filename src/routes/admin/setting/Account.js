import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Setting.css';
import {connect} from 'react-redux';
import {doGetHostSettings} from './action';

//let CKEditor = require('react-ckeditor-wrapper');
class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: 'content',
			settings: {},
			itemSelected:[],
			totalPrice:0
		};
		this.addPackage = this.addPackage.bind(this);
	}

	updateContent(value) {
		this.setState({content: value})
	}

	static propTypes = {
		title: PropTypes.string,
	};

	componentDidUpdate(){
		console.log("this.state.itemSelected", this.state.itemSelected);
		if(this.state.itemSelected){

		}
	}
	componentWillMount() {
		this.props.doGetHostSettings("billing").then(resp => {
			console.log("resp", resp);
			this.setState({
				settings: resp && resp.data
			})
		}).catch(error => {
			console.log('error', error)
		})
	}
	addPackage = (item)=>{
		console.log(item.target);
		if(item.target){
			let price = item.target.getAttribute("data-cost");
			let type = item.target.getAttribute("data-type");
			let index = _.findIndex(this.state.itemSelected,{"type": type});
			if(index >= 0){
				let itemSelected = this.state.itemSelected;
				delete itemSelected[index];
				this.setState({
					itemSelected:itemSelected,
					totalPrice : this.state.totalPrice - parseInt(price)
				});
			}
			else {
				let itemSelected = this.state.itemSelected;
				itemSelected.push({
					"type" : type,
					"price" : parseInt(price) ? parseInt(price)  : 0,
				});
				this.setState({
					itemSelected:itemSelected,
					totalPrice : this.state.totalPrice + parseInt(price)
				});
			}
		}
		console.log(item.target.getAttribute("data-cost"))
	};
	render() {
		//http://allenfang.github.io/react-bootstrap-table/example.html
		let products = [{
			id: 1,
			type: "causeAuctionActivated",
			name: "Silent Auction",
			code: "silentactionpkg",
			price: 99
		}, {
			id: 2,
			type: "slientAuctionActivated",
			name: "Fund a Need",
			code: "causeauctionpkg",
			price: 99
		}, {
			id: 3,
			type: "raffleActivated",
			name: "Raffle",
			code: "rafflepkg",
			price: 99
		}, {
			id: 4,
			type: "ticketingActivated",
			name: "Ticketing",
			code: "ticketingpkg",
			price: 0
		}];

		return (
			<div id="content-wrapper" className="admin-content-wrapper">
				<style
					dangerouslySetInnerHTML={{__html: ".btn span.glyphicon {opacity: 0;}.btn.active span.glyphicon {opacity: 1;}.packages-check .btn-danger {background-color: #DE564B;}.packages-check .btn-success {background-color: #699e08;}.packages-check .btn-danger.active {background-color: #e44730;}.form-group .glyphicon-ok, .form-group .glyphicon-remove{display:inline-block}"}}/>
				<div className="row">
					<div className="col-sm-12">
						<div className="row" style={{opacity: 1}}>
							<div className="col-md-8 col-md-offset-2">
								<div className="row">
									<div className>
										<div className="main-box no-header">
											<div className="main-box-body clearfix">
												<div className="form">
													<form id="payment-form" method="post"
																className="ajax-form validated fv-form fv-form-bootstrap" data-has-cc-info="true"
																data-show-cc-confirm="true" data-confirm-message="getBillingConfirmMessage"
																data-validate-function="validateBillingForm" data-onsuccess="handleBillingSuccessSubmit"
																action="/AccelEventsWebApp/host/settings/makepayment" noValidate="novalidate">
														<button type="submit" className="fv-hidden-submit"
																		style={{display: 'none', width: 0, height: 0}}/>
														<div className="validation-msg text-danger"><span className="payment-errors"/></div>
														<div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}>
															<span className="fa fa-spinner fa-pulse fa-fw"/>
															<span className="resp-message"/>
														</div>
														<div className="form-group">
															<h4><label htmlFor="amount"><strong>Select Package</strong></label></h4>
															<p>Select the modules that you would like to activate. You will be charged your per
																participant fee following your fundraiser's conclusion.</p>
															<div className="text-danger text-center mrg-b-md">
																You have not yet activated any modules of your event.
															</div>
															<div className="packages-check">
																<div className="row">
																	{ products.map(item=> <div className="col-md-6 mrg-b-md" data-toggle="buttons" key={item.id}>
																		<label
																			className={cx("btn btn-lg btn-block", this.props.settings && this.props.settings[item.type] ? "btn-success" : "btn-danger", _.findIndex(this.state.itemSelected,{"type": item.type}) >=0 && "active" )}>
																			<input type="checkbox" autoComplete="off" name={item.code}
																						 id={item.code} data-cost={item.price} data-type={item.type} onChange={this.addPackage}
																						 defaultValue={this.props.settings && this.props.settings[item.type]}/>
																			<span className="glyphicon glyphicon-ok"/>
																			{ (this.props.settings && this.props.settings[item.type]) ? item.name + " Activated" : "Activate " + item.name + (item.price ? "($"+item.price+")" : "")}
																		</label>
																	</div>) }
																</div>
															</div>
														</div>
														<div className="form-group">
															<label htmlFor="package-subtotal">Subtotal</label>
															<input readOnly="readonly" id="package-subtotal" name="amount" type="text"
																		 className="form-control" value={this.state.totalPrice}/>
														</div>
														<div className="form-group">
															<label htmlFor="package-subtotal">Country Code</label>
															<select id="countrycode" name="countrycode" className="form-control" defaultValue>
																{
																	this.props.settings && this.props.settings.countryCodes ? this.props.settings.countryCodes.map(item => {
																		<option value={item}>{item}</option>
																	}) : <option value="US">US</option>
																}
															</select>
														</div>
														<style
															dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n"}}/>
														<div className="stripe-form">
															<div className="stripe-card-info">
																<div className="form-group has-feedback">
																	<label className="control-label">Card Holder Name</label>
																	<div className="input-group">
																		<div className="input-group-addon"><i className="fa fa-user" aria-hidden="true"/>
																		</div>
																		<input type="text" className="form-control" id="cardname" data-stripe="name"
																					 placeholder="Name on the card" data-fv-field="cardholdername"/>
																	</div>
																	<i className="form-control-feedback fv-bootstrap-icon-input-group"
																		 data-fv-icon-for="cardholdername" style={{display: 'none'}}/>
																	<div className="small text-danger js-error card_error name"/>
																	<small className="help-block" data-fv-validator="notEmpty"
																				 data-fv-for="cardholdername" data-fv-result="NOT_VALIDATED"
																				 style={{display: 'none'}}>The card holder name is required and can't be empty
																	</small>
																	<small className="help-block" data-fv-validator="stringLength"
																				 data-fv-for="cardholdername" data-fv-result="NOT_VALIDATED"
																				 style={{display: 'none'}}>The card holder name must be more than 6 and less
																		than 70 characters long
																	</small>
																	<small className="help-block" data-fv-validator="callback"
																				 data-fv-for="cardholdername" data-fv-result="NOT_VALIDATED"
																				 style={{display: 'none'}}>The card holder name can not start or end with white
																		space
																	</small>
																</div>
																<div className="form-group has-feedback">
																	<label className="control-label">Credit Card Number</label>
																	<div className="input-group">
																		<div className="input-group-addon"><i className="fa fa-credit-card"
																																					aria-hidden="true"/></div>
																		<input type="number" className="form-control" id="cardnumber"
																					 placeholder="8888-8888-8888-8888" maxLength={16} data-stripe="number"
																					 required="required" data-fv-field="cardnumber"/>
																	</div>
																	<i className="form-control-feedback fv-bootstrap-icon-input-group"
																		 data-fv-icon-for="cardnumber" style={{display: 'none'}}/>
																	<div className="small text-danger js-error card_error number"/>
																	<small className="help-block" data-fv-validator="notEmpty" data-fv-for="cardnumber"
																				 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number
																		is required and can't be empty
																	</small>
																	<small className="help-block" data-fv-validator="creditCard" data-fv-for="cardnumber"
																				 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number
																		is invalid
																	</small>
																</div>
																<div className="row">
																	<div className="col-md-8">
																		<div className="form-group expiration-date has-feedback">
																			<label className="control-label">Expiration Date</label>
																			<div className="input-group">
																				<div className="input-group-addon"><i className="fa fa-calendar"
																																							aria-hidden="true"/></div>
																				<select className data-stripe="exp_month" id="exp-month"
																								data-fv-field="expMonth" defaultValue>
																					<option selected value={1}>Jan (01)</option>
																					<option value={2}>Feb (02)</option>
																					<option value={3}>Mar (03)</option>
																					<option value={4}>Apr (04)</option>
																					<option value={5}>May (05)</option>
																					<option value={6}>Jun (06)</option>
																					<option value={7}>Jul (07)</option>
																					<option value={8}>Aug (08)</option>
																					<option value={9}>Sep (09)</option>
																					<option value={10}>Oct (10)</option>
																					<option value={11}>Nov (11)</option>
																					<option value={12}>Dec (12)</option>
																				</select>
																				<select className data-stripe="exp_year" id="exp-year" data-fv-field="expYear"
																								defaultValue>
																					<option value={2016}>2016</option>
																					<option value={2017}>2017</option>
																					<option value={2018}>2018</option>
																					<option value={2019}>2019</option>
																					<option value={2020}>2020</option>
																					<option value={2021}>2021</option>
																					<option value={2022}>2022</option>
																					<option value={2023}>2023</option>
																					<option value={2024}>2024</option>
																					<option value={2025}>2025</option>
																					<option value={2026}>2026</option>
																					<option value={2027}>2027</option>
																					<option value={2028}>2028</option>
																					<option value={2029}>2029</option>
																					<option value={2030}>2030</option>
																					<option value={2031}>2031</option>
																					<option value={2032}>2032</option>
																					<option value={2033}>2033</option>
																					<option value={2034}>2034</option>
																					<option value={2035}>2035</option>
																					<option value={2036}>2036</option>
																					<option value={2037}>2037</option>
																					<option value={2038}>2038</option>
																					<option value={2039}>2039</option>
																					<option value={2040}>2040</option>
																					<option value={2041}>2041</option>
																					<option value={2042}>2042</option>
																					<option value={2043}>2043</option>
																					<option value={2044}>2044</option>
																					<option value={2045}>2045</option>
																					<option value={2046}>2046</option>
																					<option value={2047}>2047</option>
																					<option value={2048}>2048</option>
																					<option value={2049}>2049</option>
																					<option value={2050}>2050</option>
																				</select>
																			</div>
																			<i className="form-control-feedback fv-bootstrap-icon-input-group"
																				 data-fv-icon-for="expYear" style={{display: 'none'}}/><i
																			className="form-control-feedback fv-bootstrap-icon-input-group"
																			data-fv-icon-for="expMonth" style={{display: 'none'}}/>
																			<div className="small text-danger js-error card_error exp_year exp_month"/>
																			<small className="help-block" data-fv-validator="notEmpty" data-fv-for="expMonth"
																						 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration
																				month is required
																			</small>
																			<small className="help-block" data-fv-validator="digits" data-fv-for="expMonth"
																						 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration
																				month can contain digits only
																			</small>
																			<small className="help-block" data-fv-validator="callback" data-fv-for="expMonth"
																						 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Your card is
																				Expired
																			</small>
																			<small className="help-block" data-fv-validator="notEmpty" data-fv-for="expYear"
																						 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration
																				year is required
																			</small>
																			<small className="help-block" data-fv-validator="digits" data-fv-for="expYear"
																						 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration
																				year can contain digits only
																			</small>
																			<small className="help-block" data-fv-validator="callback" data-fv-for="expYear"
																						 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}></small>
																		</div>
																	</div>
																	<div className="col-md-4">
																		<div className="form-group has-feedback">
																			<label className="control-label">CVV Number</label>
																			<div className="input-group">
																				<input type="number" className="form-control" maxLength={4} size={4}
																							 data-stripe="cvc" id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"/>
																			</div>
																			<i className="form-control-feedback fv-bootstrap-icon-input-group"
																				 data-fv-icon-for="cvv" style={{display: 'none'}}/>
																			<div className="small text-danger js-error card_error cvc"/>
																			<small className="help-block" data-fv-validator="notEmpty" data-fv-for="cvv"
																						 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV is
																				required and can't be empty
																			</small>
																			<small className="help-block" data-fv-validator="stringLength" data-fv-for="cvv"
																						 data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV must be
																				more than 4 and less than 3 characters long
																			</small>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<input type="hidden" className="form-control" name="discountcoupon" id="discountcoupon"
																	 placeholder="Discount coupon"/>
														{/*  <div class="form-group">
														 <label for="discountcoupon">Discount Coupon</label>
														 <div class="input-group">
														 <input type="text" class="form-control" name="discountcoupon" id="discountcoupon" placeholder="Discount coupon">
														 <span class="input-group-btn">
														 <button type="button" class="btn btn-primary" id="discoupon">Apply</button>
														 </span>
														 </div>
														 <div class="js-error mrg-t-sm red small"></div>
														 </div> -*/}
														<input type="hidden" name defaultValue/>
														<div className="form-group">
															<div className="checkbox-nice">
																<input type="checkbox" id="disclaimer" required defaultChecked="checked"/>
																<label htmlFor="disclaimer">
																	I have read the <a href="https://www.accelevents.com/Privacy-Policy/" target="_blank">Disclaimer</a>.
																</label>
															</div>
														</div>
														<div className="form-group text-center">
															<button className="btn btn-primary" type="submit">Make payment</button>
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
			</div>
		);
	}
}

const mapDispatchToProps = {
	doGetHostSettings: (type) => doGetHostSettings(type)
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Account));