import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Setting.css';
import AdminSiderbar from '../../../components/Sidebar/AdminSidebar';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import CKEditor from 'react-ckeditor-wrapper';
//var CKEditor = require('react-ckeditor-wrapper');
class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: 'content',
		}
	}

	updateContent(value) {
		this.setState({content:value})
	}
  static propTypes = {
    title: PropTypes.string,
  };


  render() {
	  //http://allenfang.github.io/react-bootstrap-table/example.html
	  var products = [{
		  id: 1,
		  name: "Product1",
		  price: 120
	  }, {
		  id: 2,
		  name: "Product2",
		  price: 80
	  }, {
		  id: 3,
		  name: "Product3",
		  price: 1180
	  } , {
			  id: 4,
			  name: "Product4",
			  price: 200
		  }];

	  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-offset-2 col-sm-10">
            <div id="content-wrapper">
              <div className="row" style={{opacity: 1}}>
                <div className="col-md-8 col-md-offset-2">
                  <div className="row">
                    <div className>
                      <div className="main-box no-header">
                        <div className="main-box-body clearfix">
	                        <div className="form">
		                        <form id="payment-form" method="post" className="ajax-form validated fv-form fv-form-bootstrap" data-has-cc-info="true" data-show-cc-confirm="true" data-confirm-message="getBillingConfirmMessage" data-validate-function="validateBillingForm" data-onsuccess="handleBillingSuccessSubmit" action="/AccelEventsWebApp/host/settings/makepayment" noValidate="novalidate"><button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}} />
			                        <div className="validation-msg text-danger"><span className="payment-errors" /></div>
			                        <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}>
				                        <span className="fa fa-spinner fa-pulse fa-fw" />
				                        <span className="resp-message" />
			                        </div>
			                        <div className="form-group">
				                        <h4><label htmlFor="amount"><strong>Select Package</strong></label></h4>
				                        <p>Select the modules that you would like to activate. You will be charged your per participant fee following your fundraiser's conclusion.</p>
				                        <div className="text-danger text-center mrg-b-md">
					                        You have not yet activated any modules of your event.
				                        </div>
				                        <div className="packages-check">
					                        <div className="row">
						                        <div className="col-md-6 mrg-b-md" data-toggle="buttons">
							                        <label className="btn btn-lg btn-block  btn-danger">
								                        <input type="checkbox" autoComplete="off" name="silentactionpkg" id="silentactionpkg" data-cost={99} defaultValue="true" />
								                        <span className="glyphicon glyphicon-ok" />
								                        Activate Silent Auction ($99)
							                        </label>
						                        </div>
						                        <div className="col-md-6 mrg-b-md" data-toggle="buttons">
							                        <label className="btn btn-lg btn-block  btn-danger">
								                        <input type="checkbox" autoComplete="off" name="causeauctionpkg" id="causeauctionpkg" data-cost={99} defaultValue="true" />
								                        <span className="glyphicon glyphicon-ok" />
								                        Activate Fund a Need ($99)
							                        </label>
						                        </div>
						                        <div className="col-md-6 mrg-b-md" data-toggle="buttons">
							                        <label className="btn btn-lg btn-block  btn-danger">
								                        <input type="checkbox" autoComplete="off" name="rafflepkg" id="rafflepkg" data-cost={99} defaultValue="true" />
								                        <span className="glyphicon glyphicon-ok" />
								                        Activate Raffle  ($99)
							                        </label>
						                        </div>
						                        <div className="col-md-6 mrg-b-md" data-toggle="buttons">
							                        <label className="btn btn-lg btn-block  btn-danger">
								                        <input type="checkbox" autoComplete="off" name="ticketingpkg" id="ticketingpkg" data-cost={0} defaultValue="true" />
								                        <span className="glyphicon glyphicon-ok" />
								                        Activate Ticketing
							                        </label>
						                        </div>
					                        </div>
				                        </div>
			                        </div>
			                        <div className="form-group">
				                        <label htmlFor="package-subtotal">Subtotal</label>
				                        <input readOnly="readonly" id="package-subtotal" name="amount" type="text" className="form-control" defaultValue={0} />
			                        </div>
			                        <div className="form-group">
				                        <label htmlFor="package-subtotal">Country Code</label>
				                        <select id="countrycode" name="countrycode" className="form-control">
					                        <option value="US">US</option>
					                        <option value="AF">AF</option>
					                        <option value="AL">AL</option>
					                        <option value="DZ">DZ</option>
					                        <option value="AD">AD</option>
					                        <option value="AO">AO</option>
					                        <option value="AG">AG</option>
					                        <option value="AR">AR</option>
					                        <option value="AM">AM</option>
					                        <option value="AW">AW</option>
					                        <option value="AU">AU</option>
					                        <option value="AT">AT</option>
					                        <option value="AZ">AZ</option>
					                        <option value="BH">BH</option>
					                        <option value="BD">BD</option>
					                        <option value="BY">BY</option>
					                        <option value="BE">BE</option>
					                        <option value="BZ">BZ</option>
					                        <option value="BJ">BJ</option>
					                        <option value="BT">BT</option>
					                        <option value="BA">BA</option>
					                        <option value="BW">BW</option>
					                        <option value="BR">BR</option>
					                        <option value="IO">IO</option>
					                        <option value="BG">BG</option>
					                        <option value="BF">BF</option>
					                        <option value="BI">BI</option>
					                        <option value="KH">KH</option>
					                        <option value="CM">CM</option>
					                        <option value="CA">CA</option>
					                        <option value="CV">CV</option>
					                        <option value="CF">CF</option>
					                        <option value="TD">TD</option>
					                        <option value="CL">CL</option>
					                        <option value="CN">CN</option>
					                        <option value="CX">CX</option>
					                        <option value="CO">CO</option>
					                        <option value="KM">KM</option>
					                        <option value="CG">CG</option>
					                        <option value="CK">CK</option>
					                        <option value="CR">CR</option>
					                        <option value="HR">HR</option>
					                        <option value="CU">CU</option>
					                        <option value="CY">CY</option>
					                        <option value="CZ">CZ</option>
					                        <option value="DK">DK</option>
					                        <option value="DJ">DJ</option>
					                        <option value="EC">EC</option>
					                        <option value="EG">EG</option>
					                        <option value="SV">SV</option>
					                        <option value="GQ">GQ</option>
					                        <option value="ER">ER</option>
					                        <option value="EE">EE</option>
					                        <option value="ET">ET</option>
					                        <option value="FO">FO</option>
					                        <option value="FJ">FJ</option>
					                        <option value="FI">FI</option>
					                        <option value="FR">FR</option>
					                        <option value="GF">GF</option>
					                        <option value="PF">PF</option>
					                        <option value="GA">GA</option>
					                        <option value="GM">GM</option>
					                        <option value="GE">GE</option>
					                        <option value="DE">DE</option>
					                        <option value="GH">GH</option>
					                        <option value="GI">GI</option>
					                        <option value="GR">GR</option>
					                        <option value="GL">GL</option>
					                        <option value="GP">GP</option>
					                        <option value="GT">GT</option>
					                        <option value="GN">GN</option>
					                        <option value="GW">GW</option>
					                        <option value="GY">GY</option>
					                        <option value="HT">HT</option>
					                        <option value="HN">HN</option>
					                        <option value="HU">HU</option>
					                        <option value="IS">IS</option>
					                        <option value="IN">IN</option>
					                        <option value="ID">ID</option>
					                        <option value="IQ">IQ</option>
					                        <option value="IE">IE</option>
					                        <option value="IL">IL</option>
					                        <option value="IT">IT</option>
					                        <option value="JP">JP</option>
					                        <option value="JO">JO</option>
					                        <option value="KE">KE</option>
					                        <option value="KI">KI</option>
					                        <option value="KW">KW</option>
					                        <option value="KG">KG</option>
					                        <option value="LV">LV</option>
					                        <option value="LB">LB</option>
					                        <option value="LS">LS</option>
					                        <option value="LR">LR</option>
					                        <option value="LI">LI</option>
					                        <option value="LT">LT</option>
					                        <option value="LU">LU</option>
					                        <option value="MG">MG</option>
					                        <option value="MW">MW</option>
					                        <option value="MY">MY</option>
					                        <option value="MV">MV</option>
					                        <option value="ML">ML</option>
					                        <option value="MT">MT</option>
					                        <option value="MH">MH</option>
					                        <option value="MQ">MQ</option>
					                        <option value="MR">MR</option>
					                        <option value="MU">MU</option>
					                        <option value="YT">YT</option>
					                        <option value="MX">MX</option>
					                        <option value="MC">MC</option>
					                        <option value="MN">MN</option>
					                        <option value="ME">ME</option>
					                        <option value="MS">MS</option>
					                        <option value="MA">MA</option>
					                        <option value="MM">MM</option>
					                        <option value="NA">NA</option>
					                        <option value="NR">NR</option>
					                        <option value="NP">NP</option>
					                        <option value="NL">NL</option>
					                        <option value="AN">AN</option>
					                        <option value="NC">NC</option>
					                        <option value="NZ">NZ</option>
					                        <option value="NI">NI</option>
					                        <option value="NE">NE</option>
					                        <option value="NG">NG</option>
					                        <option value="NU">NU</option>
					                        <option value="NF">NF</option>
					                        <option value="NO">NO</option>
					                        <option value="OM">OM</option>
					                        <option value="PK">PK</option>
					                        <option value="PW">PW</option>
					                        <option value="PA">PA</option>
					                        <option value="PG">PG</option>
					                        <option value="PY">PY</option>
					                        <option value="PE">PE</option>
					                        <option value="PH">PH</option>
					                        <option value="PL">PL</option>
					                        <option value="PT">PT</option>
					                        <option value="QA">QA</option>
					                        <option value="RO">RO</option>
					                        <option value="RW">RW</option>
					                        <option value="WS">WS</option>
					                        <option value="SM">SM</option>
					                        <option value="SA">SA</option>
					                        <option value="SN">SN</option>
					                        <option value="RS">RS</option>
					                        <option value="SC">SC</option>
					                        <option value="SL">SL</option>
					                        <option value="SG">SG</option>
					                        <option value="SK">SK</option>
					                        <option value="SI">SI</option>
					                        <option value="SB">SB</option>
					                        <option value="ZA">ZA</option>
					                        <option value="GS">GS</option>
					                        <option value="ES">ES</option>
					                        <option value="LK">LK</option>
					                        <option value="SD">SD</option>
					                        <option value="SR">SR</option>
					                        <option value="SZ">SZ</option>
					                        <option value="SE">SE</option>
					                        <option value="CH">CH</option>
					                        <option value="TJ">TJ</option>
					                        <option value="TH">TH</option>
					                        <option value="TG">TG</option>
					                        <option value="TK">TK</option>
					                        <option value="TO">TO</option>
					                        <option value="TN">TN</option>
					                        <option value="TR">TR</option>
					                        <option value="TM">TM</option>
					                        <option value="TV">TV</option>
					                        <option value="UG">UG</option>
					                        <option value="UA">UA</option>
					                        <option value="AE">AE</option>
					                        <option value="GB">GB</option>
					                        <option value="UY">UY</option>
					                        <option value="UZ">UZ</option>
					                        <option value="VU">VU</option>
					                        <option value="WF">WF</option>
					                        <option value="YE">YE</option>
					                        <option value="ZM">ZM</option>
					                        <option value="ZW">ZW</option>
					                        <option value="BO">BO</option>
					                        <option value="BN">BN</option>
					                        <option value="CC">CC</option>
					                        <option value="CD">CD</option>
					                        <option value="CI">CI</option>
					                        <option value="FK">FK</option>
					                        <option value="GG">GG</option>
					                        <option value="VA">VA</option>
					                        <option value="HK">HK</option>
					                        <option value="IR">IR</option>
					                        <option value="IM">IM</option>
					                        <option value="JE">JE</option>
					                        <option value="KP">KP</option>
					                        <option value="KR">KR</option>
					                        <option value="LA">LA</option>
					                        <option value="LY">LY</option>
					                        <option value="MO">MO</option>
					                        <option value="MK">MK</option>
					                        <option value="FM">FM</option>
					                        <option value="MD">MD</option>
					                        <option value="MZ">MZ</option>
					                        <option value="PS">PS</option>
					                        <option value="PN">PN</option>
					                        <option value="RE">RE</option>
					                        <option value="RU">RU</option>
					                        <option value="BL">BL</option>
					                        <option value="SH">SH</option>
					                        <option value="MF">MF</option>
					                        <option value="PM">PM</option>
					                        <option value="ST">ST</option>
					                        <option value="SO">SO</option>
					                        <option value="SJ">SJ</option>
					                        <option value="SY">SY</option>
					                        <option value="TW">TW</option>
					                        <option value="TZ">TZ</option>
					                        <option value="TL">TL</option>
					                        <option value="VE">VE</option>
					                        <option value="VN">VN</option>
					                        <option value="VG">VG</option>
					                        <option value="VI">VI</option>
				                        </select>
			                        </div>
			                        <style dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n" }} />
			                        <div className="stripe-form">
				                        <div className="stripe-card-info">
					                        <div className="form-group has-feedback">
						                        <label className="control-label">Card Holder Name</label>
						                        <div className="input-group">
							                        <div className="input-group-addon"><i className="fa fa-user" aria-hidden="true" /></div>
							                        <input type="text" className="form-control" id="cardname" data-stripe="name" placeholder="Name on the card" data-fv-field="cardholdername" />
						                        </div><i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="cardholdername" style={{display: 'none'}} />
						                        <div className="small text-danger js-error card_error name" />
						                        <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cardholdername" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name is required and can't be empty</small><small className="help-block" data-fv-validator="stringLength" data-fv-for="cardholdername" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name must be more than 6 and less than 70 characters long</small><small className="help-block" data-fv-validator="callback" data-fv-for="cardholdername" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The card holder name can not start or end with white space</small></div>
					                        <div className="form-group has-feedback">
						                        <label className="control-label">Credit Card Number</label>
						                        <div className="input-group">
							                        <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true" /></div>
							                        <input type="number" className="form-control" id="cardnumber" placeholder="8888-8888-8888-8888" maxLength={16} data-stripe="number" required="required" data-fv-field="cardnumber" />
						                        </div><i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="cardnumber" style={{display: 'none'}} />
						                        <div className="small text-danger js-error card_error number" />
						                        <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cardnumber" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number is required and can't be empty</small><small className="help-block" data-fv-validator="creditCard" data-fv-for="cardnumber" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The credit card number is invalid</small></div>
					                        <div className="row">
						                        <div className="col-md-8">
							                        <div className="form-group expiration-date has-feedback">
								                        <label className="control-label">Expiration Date</label>
								                        <div className="input-group">
									                        <div className="input-group-addon"><i className="fa fa-calendar" aria-hidden="true" /></div>
									                        <select className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth">
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
									                        <select className data-stripe="exp_year" id="exp-year" data-fv-field="expYear">
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
								                        </div><i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="expYear" style={{display: 'none'}} /><i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="expMonth" style={{display: 'none'}} />
								                        <div className="small text-danger js-error card_error exp_year exp_month" />
								                        <small className="help-block" data-fv-validator="notEmpty" data-fv-for="expMonth" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration month is required</small><small className="help-block" data-fv-validator="digits" data-fv-for="expMonth" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration month can contain digits only</small><small className="help-block" data-fv-validator="callback" data-fv-for="expMonth" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Your card is Expired</small><small className="help-block" data-fv-validator="notEmpty" data-fv-for="expYear" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration year is required</small><small className="help-block" data-fv-validator="digits" data-fv-for="expYear" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The expiration year can contain digits only</small><small className="help-block" data-fv-validator="callback" data-fv-for="expYear" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}> </small></div>
						                        </div>
						                        <div className="col-md-4">
							                        <div className="form-group has-feedback">
								                        <label className="control-label">CVV Number</label>
								                        <div className="input-group">
									                        <input type="number" className="form-control" maxLength={4} size={4} data-stripe="cvc" id="cvv" placeholder="CVC/CVV" data-fv-field="cvv" />
								                        </div><i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="cvv" style={{display: 'none'}} />
								                        <div className="small text-danger js-error card_error cvc" />
								                        <small className="help-block" data-fv-validator="notEmpty" data-fv-for="cvv" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV is required and can't be empty</small><small className="help-block" data-fv-validator="stringLength" data-fv-for="cvv" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>The CVV must be more than 4 and less than 3 characters long</small></div>
						                        </div>
					                        </div>
				                        </div>
			                        </div>
			                        <input type="hidden" className="form-control" name="discountcoupon" id="discountcoupon" placeholder="Discount coupon" />
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
			                        <input type="hidden" name defaultValue />
			                        <div className="form-group">
				                        <div className="checkbox-nice">
					                        <input type="checkbox" id="disclaimer" required defaultChecked="checked" />
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
	                <div className="col-md-8 form">
		                <BootstrapTable data={products} striped hover search>
			                <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
			                <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
			                <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
		                </BootstrapTable>
		                <CKEditor
			                value={this.state.content}
			                onChange={this.updateContent.bind(this)} />
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


export default withStyles(s)(Account);
