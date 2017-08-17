import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Setting.css';
import { connect } from 'react-redux';
import { doGetHostSettings, makePyment } from './action';
import { getCardToken } from './../../checkout/action/index';
import Button from 'react-bootstrap-button-loader';
import PopupModel from './../../../components/PopupModal';
// let CKEditor = require('react-ckeditor-wrapper');
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'content',
      settings: null,
      itemSelected: [],
      totalPrice: 0,

      cardNumberValue: null,
      cardHolderValue: null,
      cvvValue: null,
      monthValue: null,
      yearValue: null,
      expMonthValue: null,
      expYearValue: null,
      countryCodeValue: null,

      cardNumber: null,
      cardHolder: null,
      cvv: null,
      month: null,
      year: null,
      expMonth: null,
      expYear: null,
      countryCode: null,

      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
      cvvFeedBack: false,
      countryCodeFeedBack: false,

      errorMsgcardNumber: null,
      errorMsgcardHolder: null,
      errorMsgNumber: null,
      errorMsgcvv: null,
      errorMsgCountryCode: null,
      slientAuctionActivated: false,
      causeAuctionActivated: false,
      raffleActivated: false,
      ticketingActivated: false,

      loading: false,
      isError: false,
      message: null,
      modulActiveMessage: null,
      showPopup: false,
    };
    this.addPackage = this.addPackage.bind(this);
  }

  updateContent(value) {
    this.setState({ content: value });
  }

  static propTypes = {
    title: PropTypes.string,
  };
  countryCodeValidateHandler = (e) => {
    this.setState({
      countryCodeFeedBack: true,
      countryCodeValue: this.countryCode.value.trim(),
    });

    if (this.countryCode.value.trim() == '') {
      this.setState({
        countryCode: false,
        errorMsgcountryCode: "The countryCode is required and can't be empty",
      });
    } else {
      this.setState({
        countryCode: true,
      });
    }
  };
  cardHolderValidateHandler = (e) => {
    this.setState({
      cardHolderFeedBack: true,
      cardHolderValue: this.cardHolder.value.trim(),
    });

    if (this.cardHolder.value.trim() == '') {
      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name is required and can't be empty",
      });
    } else if (!(this.cardHolder.value.trim().length >= 6 && this.cardHolder.value.trim().length <= 70)) {
      this.setState({
        cardHolder: false,
        errorMsgcardHolder: 'The card holder name must be more than 6 and less than 70 characters long ',
      });
    } else if(this.cardHolder.value.charAt(0) === ' ' || this.cardHolder.value.charAt(this.cardHolder.value.length-1) === ' '){
      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name can not start or end with white space",
      });
    } else {
      this.setState({
        cardHolder: true,
      });
    }
    //  this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});
  };
  cardNumberValidateHandler = (e) => {
    this.cardNumber.value = this.cardNumber.value.substr(0, 16);
    this.setState({
      cardNumberFeedBack: true,
      cardNumberValue: this.cardNumber.value.trim(),
    });
    if (this.cardNumber.value.trim() == '') {
      this.setState({
        cardNumber: false,
        errorMsgcardNumber: 'Enter Card Number ',
      });
    } else if (this.cardNumber.value.trim().length !== 16 && this.cardNumber.value.trim().length !== 15) {
      this.setState({
        cardNumber: false,
        errorMsgcardNumber: ' Please enter a Valid Card Number ',
      });
    } else {
      this.setState({
        cardNumber: true,
      });
    }
    //   this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});
  };
  cvvValidateHandler = (e) => {
    this.cvv.value = this.cvv.value.substr(0, 4);
    this.setState({
      cvvFeedBack: true,
    });

    if (this.cvv.value.trim() == '') {
      this.setState({
        cvv: false,
        errorMsgcvv: "The CVV is required and can't be empty",
      });
    } else if (!(this.cvv.value.trim().length >= 3 && this.cvv.value.trim().length <= 4)) {
      this.setState({
        cvv: false,
        errorMsgcvv: 'The CVV must be more than 4 and less than 3 characters long',
      });
    } else {
      this.setState({
        cvv: true,
      });
    }
  };

  componentDidUpdate() {
    console.log('this.state.itemSelected', this.state.itemSelected);
    if (this.state.itemSelected) {

    }
  }
  componentWillMount() {
    this.props.doGetHostSettings('billing').then((resp) => {
      console.log('resp', resp);
      let message = '';
      if (resp.data.slientAuctionActivated) {
        if (message != '') { message += ','; }
        message += ' SILENT AUCTION ';
      }
      if (resp.data.causeAuctionActivated) {
        message += 'FUND A NEED';
      }
      if (resp.data.raffleActivated) {
        if (message !== '') { message += ','; }
        message += 'RAFFLE';
      }
      if (resp.data.ticketingActivated) {
        if (message !== '') { message += ','; }
        message += ' TICKETING';
      }
      if (message === '') {
        message = 'You have not yet activated any modules of your event.';
      } else { message = `Activated Modules are: ${message}`; }

      this.setState({
        settings: resp && resp.data,
        updatedSettings: resp && resp.data,
        modulActiveMessage: message,
      });
    }).catch((error) => {
      console.log('error', error);
    });
  }
  addPackage = (item) => {
    if (item.target) {
      const price = item.target.getAttribute('data-cost');
      const type = item.target.getAttribute('data-type');
      if (type === 'slientAuctionActivated') {
        this.setState({
          updatedSettings: Object.assign({}, this.state.updatedSettings, { slientAuctionActivated: !this.state.updatedSettings.slientAuctionActivated }),
        });
      }	if (type === 'causeAuctionActivated') {
        this.setState({
          updatedSettings: Object.assign({}, this.state.updatedSettings, { causeAuctionActivated: !this.state.updatedSettings.causeAuctionActivated }),
        });
      }	if (type === 'raffleActivated') {
        this.setState({
          updatedSettings: Object.assign({}, this.state.updatedSettings, { raffleActivated: !this.state.updatedSettings.raffleActivated }),
        });
      }	if (type === 'ticketingActivated') {
        if (!this.state.updatedSettings.ticketingActivated) {
          this.setState({ showPopup: true });
        }
        this.setState({
          updatedSettings: Object.assign({}, this.state.updatedSettings, { ticketingActivated: !this.state.updatedSettings.ticketingActivated }),
        });
      }
      const index = _.findIndex(this.state.itemSelected, { type });
      if (index >= 0) {
        const itemSelected = this.state.itemSelected;
        delete itemSelected[index];
        this.setState({
          itemSelected,
          totalPrice: this.state.totalPrice - parseInt(price),
        });
      }			else {
        const itemSelected = this.state.itemSelected;
        itemSelected.push({
          type,
          price: parseInt(price) ? parseInt(price) : 0,
        });
        this.setState({
          itemSelected,
          totalPrice: this.state.totalPrice + parseInt(price),
        });
      }
    }
  };
  submitePayment = (e) => {
    e.preventDefault();
    if (this.countryCode.value && this.state.cardNumber && this.state.cardHolder && this.state.cvv) {
      this.setState({ loading: true });
      this.props.getCardToken(this.state.settings.publicKey, this.cardNumber.value.trim(), this.expMonth.value.trim(), this.expYear.value.trim(), this.cvv.value.trim()).then((response) => {
        if (response.error) {
          this.setState({
            loading: false,
            showPopup: true,
            errorMsgCard: response.error.message });
        } else {
          const data = {
            countryCode: this.countryCode.value,
            discountCoupon: '',
            fundANeedActive: this.state.updatedSettings.causeAuctionActivated,
            nameOnCard: this.state.cardHolderValue,
            raffleActive: this.state.updatedSettings.raffleActivated,
            silentAuctionActive: this.state.updatedSettings.slientAuctionActivated,
            stripeToken: response.id,
            ticketingActive: this.state.updatedSettings.ticketingActivated,
          };
          this.props.makePyment(data).then((resp) => {
            if (resp && resp.message) {
              this.setState({ loading: false, message: resp.data.message, isError: false });
            } else {
              this.setState({ loading: false, message: resp.data.errorMessage, isError: true });
            }
          });
        }
      });
    } else { this.setState({ loading: false }); }
  };
  showPopup = () => {
    this.setState({
      showPopup: true,
    });
  };
  hidePopup = () => {
    this.setState({
      showPopup: false,
    });
  };
  numberOnly(e) {
    const re = /[/0-9A-F:]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  render() {
    // http://allenfang.github.io/react-bootstrap-table/example.html
    const products = [{
      id: 1,
      type: 'slientAuctionActivated',
      name: 'Silent Auction',
      code: 'silentactionpkg',
      price: 99,
    }, {
      id: 2,
      type: 'causeAuctionActivated',
      name: 'Fund a Need',
      code: 'causeauctionpkg',
      price: 99,
    }, {
      id: 3,
      type: 'raffleActivated',
      name: 'Raffle',
      code: 'rafflepkg',
      price: 99,
    }, {
      id: 4,
      type: 'ticketingActivated',
      name: 'Ticketing',
      code: 'ticketingpkg',
      price: 0,
    }];


    return (
      <div>
        {this.state.settings ?
          <div id="content-wrapper" className="admin-content-wrapper">
          <style
            dangerouslySetInnerHTML={{ __html: '.btn span.glyphicon {opacity: 0;}.btn.active span.glyphicon {opacity: 1;}.packages-check .btn-danger {background-color: #DE564B;}.packages-check .btn-success {background-color: #699e08;}.packages-check .btn-danger.active {background-color: #e44730;}.form-group .glyphicon-ok, .form-group .glyphicon-remove{display:inline-block}' }}
          />
          <div className="row">
            <div className="col-sm-12">
              <div className="row" style={{ opacity: 1 }}>
                <div className="col-md-8 col-md-offset-2">
                  <div className="row">
                    <div className>
                      <div className="main-box no-header">
                        <div className="main-box-body clearfix">
                          <div className="form">
                            { this.state.message && <div  className={cx("ajax-msg-box text-center mrg-b-lg", !this.state.isError ? 'text-success':'text-danger')} >
                              { this.state.message }</div> }
                            <form
                              id="payment-form" method="post"
                              className="ajax-form validated fv-form fv-form-bootstrap"
                            >
                              <button
                                type="submit" className="fv-hidden-submit"
                                style={{ display: 'none', width: 0, height: 0 }}
                              />
                              <div className="validation-msg text-danger"><span className="payment-errors" /></div>
                              <div className="ajax-msg-box text-center mrg-b-lg" style={{ display: 'none' }}>
                                <span className="fa fa-spinner fa-pulse fa-fw" />
                                <span className="resp-message" />
                              </div>
                              <div className="form-group">
                                <h4><label htmlFor="amount"><strong>Select Package</strong></label></h4>
                                <p>Select the modules that you would like to activate. You will be charged your per
                                  participant fee following your fundraiser's conclusion.</p>
                                <div className="text-danger text-center mrg-b-md">
                                  {this.state.modulActiveMessage}
                                </div>
                                <div className="packages-check">
                                  <div className="row">
                                    { products.map(item => <div className="col-md-6 mrg-b-md" data-toggle="buttons" key={item.id}>
                                      <label
                                        disabled={this.state.settings && this.state.settings[item.type]}
                                        className={cx('btn btn-lg btn-block', this.state.settings && this.state.settings[item.type] ? 'btn-success' : 'btn-danger', _.findIndex(this.state.itemSelected, { type: item.type }) >= 0 && 'active')}
                                      >
                                        <input
                                          type="checkbox" autoComplete="off" name={item.code}
                                          id={item.code} data-cost={item.price} data-type={item.type} onChange={this.addPackage} disabled={this.state.settings && this.state.settings[item.type]}
                                          defaultValue={this.state.settings && this.state.settings[item.type]}
                                        />
                                        <span className="glyphicon glyphicon-ok" />
                                        { (this.state.settings && this.state.settings[item.type]) ? `${item.name} Activated` : `Activate ${item.name}${item.price ? `($${item.price})` : ''}`}
                                      </label>
                                    </div>) }
                                  </div>
                                </div>
                              </div>
                              { !this.state.settings.causeAuctionActivated || !this.state.settings.raffleActivated || !this.state.settings.slientAuctionActivated || !this.state.settings.ticketingActivated ?
                                <div >
                                  <div className="form-group">
                                    <label htmlFor="package-subtotal">Subtotal</label>
                                    <input
                                      readOnly="readonly" id="package-subtotal" name="amount" type="text"
                                      className="form-control" value={this.state.totalPrice}
                                    />
                                  </div>
                                  <div
                                    className={cx('form-group', this.state.countryCodeFeedBack && 'has-feedback', this.state.countryCodeFeedBack && this.state.countryCode && 'has-success', this.state.countryCodeFeedBack && (!this.state.countryCode) && 'has-error')}
                                  >
                                    <label htmlFor="package-subtotal">Country Code</label>
                                    <select
                                      id="countrycode" name="countrycode" className="form-control" defaultValue ref={(ref) => {
                                      this.countryCode = ref;
                                    }} onChange={this.countryCodeValidateHandler}
                                    >
                                      {
                                        this.state.settings && this.state.settings.countryCodes ? this.state.settings.countryCodes.map((item, index) =>
                                          <option value={item} key={index}>{item}</option>,
                                        ) : <option value="US">US</option>
                                      }
                                    </select>
                                  </div>
                                  <div>
                                    <style
                                      dangerouslySetInnerHTML={{ __html: '\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field="expMonth"] {\n    xdisplay: none !important;\n  }\n' }}
                                    />
                                    <div className="stripe-form">
                                      <div className="stripe-card-info">
                                        <div
                                          className={cx('form-group', this.state.cardHolderFeedBack && 'has-feedback', this.state.cardHolderFeedBack && this.state.cardHolder && 'has-success', this.state.cardHolderFeedBack && (!this.state.cardHolder) && 'has-error')}
                                        >
                                          <label className="control-label">Card Holder Name</label>
                                          <div className="input-group">
                                            <div className="input-group-addon"><i className="fa fa-user" aria-hidden="true" /></div>
                                            <input
                                              type="text" className="form-control" id="cardname" data-stripe="name"
                                              placeholder="Name on the card" data-fv-field="cardholdername"
                                              ref={(ref) => {
                                                this.cardHolder = ref;
                                              }}
                                              onKeyUp={this.cardHolderValidateHandler}
                                            />
                                            { this.state.cardHolderFeedBack && this.state.cardHolder &&
                                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                                            { this.state.cardHolderFeedBack && !this.state.cardHolder &&
                                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                                          </div>
                                          { this.state.cardHolderFeedBack && !this.state.cardHolder &&
                                          <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgcardHolder}</small>}

                                        </div>
                                        <div
                                          className={cx('form-group', this.state.cardNumberFeedBack && 'has-feedback', this.state.cardNumberFeedBack && this.state.cardNumber && 'has-success', this.state.cardNumberFeedBack && (!this.state.cardNumber) && 'has-error')}
                                        >
                                          <label className="control-label">Credit Card Number</label>
                                          <div className="input-group">
                                            <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true" />
                                            </div>
                                            <input
                                              type="number" className="form-control field-card_number" id="cardnumber"
                                              placeholder="8888-8888-8888-8888" maxLength={16} data-stripe="number"
                                              required="required" data-fv-field="cardnumber"
                                              ref={(ref) => {
                                                this.cardNumber = ref;
                                              }}
                                              onKeyPress={(e) => this.numberOnly(e)}
                                              onKeyUp={this.cardNumberValidateHandler}
                                            />
                                            { this.state.cardNumberFeedBack && this.state.cardNumber &&
                                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                                            { this.state.cardNumberFeedBack && !this.state.cardNumber &&
                                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                                          </div>
                                          { this.state.cardNumberFeedBack && !this.state.cardNumber &&
                                          <small className="help-block">{this.state.errorMsgcardNumber}.</small>}
                                        </div>
                                        <div className="row">
                                          <div className="col-md-8">
                                            <div
                                              className={cx('form-group', this.state.expMonthFeedBack && 'has-feedback', this.state.expMonthFeedBack && this.state.expMonth && 'has-success', this.state.expMonthFeedBack && (!this.state.expMonth) && 'has-error')}
                                            >
                                              <label className="control-label">Expiration Date</label>
                                              <div className="input-group">
                                                <div className="input-group-addon field-exp_month"><i
                                                  className="fa fa-calendar"
                                                  aria-hidden="true"
                                                /></div>
                                                <select
                                                  className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth" ref={(ref) => {
                                                  this.expMonth = ref;
                                                }} onChange={this.expMonthValidateHandler}
                                                >
                                                  <option defaultValue value="01">Jan (01)</option>
                                                  <option value="02">Feb (02)</option>
                                                  <option value="03">Mar (03)</option>
                                                  <option value="04">Apr (04)</option>
                                                  <option value="05">May (05)</option>
                                                  <option value="06">Jun (06)</option>
                                                  <option value="07">Jul (07)</option>
                                                  <option value="08">Aug (08)</option>
                                                  <option value="09">Sep (09)</option>
                                                  <option value="10">Oct (10)</option>
                                                  <option value="11">Nov (11)</option>
                                                  <option value="12">Dec (12)</option>
                                                </select>
                                                <select
                                                  className data-stripe="exp_year field-exp_year" id="exp-year" data-fv-field="expYear"
                                                  ref={(ref) => {
                                                    this.expYear = ref;
                                                  }} onChange={this.expYearValidateHandler}
                                                >
                                                  <option value="2017">2017</option>
                                                  <option value="2018">2018</option>
                                                  <option value="2019">2019</option>
                                                  <option value="2020">2020</option>
                                                  <option value="2021">2021</option>
                                                  <option value="2022">2022</option>
                                                  <option value="2023">2023</option>
                                                  <option value="2024">2024</option>
                                                  <option value="2025">2025</option>
                                                  <option value="2026">2026</option>
                                                  <option value="2027">2027</option>
                                                  <option value="2028">2028</option>
                                                  <option value="2029">2029</option>
                                                  <option value="2030">2030</option>
                                                  <option value="2031">2031</option>
                                                  <option value="2032">2032</option>
                                                  <option value="2033">2033</option>
                                                  <option value="2034">2034</option>
                                                  <option value="2035">2035</option>
                                                  <option value="2036">2036</option>
                                                  <option value="2037">2037</option>
                                                  <option value="2038">2038</option>
                                                  <option value="2039">2039</option>
                                                  <option value="2040">2040</option>
                                                  <option value="2041">2041</option>
                                                  <option value="2042">2042</option>
                                                  <option value="2043">2043</option>
                                                  <option value="2044">2044</option>
                                                  <option value="2045">2045</option>
                                                  <option value="2046">2046</option>
                                                  <option value="2047">2047</option>
                                                  <option value="2048">2048</option>
                                                  <option value="2049">2049</option>
                                                  <option value="2050">2050</option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div
                                              className={cx('input-group', this.state.cvvFeedBack && 'has-feedback', this.state.cvvFeedBack && this.state.cvv && 'has-success', this.state.cvvFeedBack && (!this.state.cvv) && 'has-error')}
                                            >
                                              <label className="control-label">CVV Number</label>
                                              <div className="input-group">
                                                <input
                                                  type="number" className="form-control field-cvv" maxLength="4" size={4}
                                                  data-stripe="cvc" id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"
                                                  ref={(ref) => {
                                                    this.cvv = ref;
                                                  }}
                                                  onKeyPress={(e) => this.numberOnly(e)}
                                                  onKeyUp={this.cvvValidateHandler}
                                                />
                                                { this.state.cvvFeedBack && this.state.cvv &&
                                                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                                                { this.state.cvvFeedBack && !this.state.cvv &&
                                                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                                              </div>
                                              { this.state.cvvFeedBack && !this.state.cvv &&
                                              <small className="help-block">{ this.state.errorMsgcvv }</small>}

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <input
                                    type="hidden" className="form-control" name="discountcoupon" id="discountcoupon"
                                    placeholder="Discount coupon"
                                  />
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
                                    <Button loading={this.state.loading} className="btn btn-primary" type="submit" onClick={this.submitePayment}>Make payment</Button>
                                  </div>
                                </div> : <p>All modules are activated</p>
                              }
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
          <PopupModel
            id="bookingPopupbookingPopup"
            showModal={this.state.showPopup}
            headerText={<span>Ticketing Activation</span>}
            modelBody=""
            onCloseFunc={this.hidePopup}
            modelFooter={<button
              type="button" className="btn btn-info center-block" data-dismiss="modal" onClick={() => {
              this.hidePopup();
            }}
            >&nbsp; &nbsp; &nbsp; Close&nbsp; &nbsp; &nbsp; </button>}
          >
            <div className="ticket-type-container">
              <div>
                Your card with not be charged at this time. Payments will be made in two installments. The first payment will be at the halfway point between when you begin selling tickets and the date of your event. The second charge will be after your event concludes. You will be charged $1 per ticket sold and 1% of the value of each ticket. You can also pass these fees to the ticket purchase.
              </div>
            </div>
          </PopupModel>
        </div>
          :''}
      </div>

    );
  }
}

const mapDispatchToProps = {
  doGetHostSettings: type => doGetHostSettings(type),
  makePyment: data => makePyment(data),
  getCardToken: (stripeKey, cardNumber, expMonth, expYear, cvc) => getCardToken(stripeKey, cardNumber, expMonth, expYear, cvc),
};

const mapStateToProps = state => ({
	currencySymbol : (state.host && state.host.currencySymbol) || "$",
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Account));
