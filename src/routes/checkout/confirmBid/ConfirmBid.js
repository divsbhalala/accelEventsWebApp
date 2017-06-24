/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ConfirmBid.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {confirmAuctionBid,createCardToken, orderTicket} from './../action/index';

class ConfirmBid extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isVisibleConfirmBid : false,
    }
  }
  showConfirmBid = () =>{
    this.setState({
      isVisibleConfirmBid:true,
    })
  }
  doConfirmAuctionBid = () =>{
    this.props.confirmAuctionBid('eventurl', props.itemCode, 'stripeToken').then(resp => {

    }).catch((error) => {

    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 col-lg-offset-2 col-md-offset-1 mrg-t-lg">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-box clearfix">
                  <header className="main-box-header clearfix">
                    <h1>Confirm Bid</h1>
                  </header>
                  <div className="main-box-body clearfix">
                    <div className={cx("collapse ", !this.state.isVisibleConfirmBid && 'in' )}>
                      <div className>
                        <table className="table items-table">
                          <thead>
                          <tr>
                            <th />
                            <th className="text-left"><span>Item Name</span></th>
                            <th className="text-right"><span>Your Bid</span></th>
                            {/*                             <th></th> */}
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                            <td colSpan={4} className="text-right">
                              <button className="btn btn-info checkout" onClick={this.showConfirmBid}> Confirm Bid </button>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className={cx(" payment-area collapse", this.state.isVisibleConfirmBid && 'in')}  >
                      <form className="ajax-form validated fv-form fv-form-bootstrap" method="post" action="../confirmbid" data-onsuccess="handleBidConfirmSuccess" noValidate="novalidate"><button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}} /><div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span className="fa fa-spinner fa-pulse fa-fw" /> <span className="resp-message" /></div>
                        <div className="amount-to-pay">Your Bid: $ <span className="total-amount">0</span></div>
                        <input type="hidden" name="amount" defaultValue={0} className="total-amount-hidden" />
                        <div className="form-group has-feedback">
                          <label className="control-label">Email Address</label>
                          <div className="input-group">
                            <div className="input-group-addon"><i className="fa fa-envelope" aria-hidden="true" /></div>
                            <input type="email" className="form-control" name="email" defaultValue="jfbnd@fjdnd.com" disabled="disabled" data-fv-field="email" />
                          </div><i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="email" style={{display: 'none'}} />
                          <small className="help-block" data-fv-validator="emailAddress" data-fv-for="email" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid</small></div>
                        <div className="form-group">
                          <label className="control-label">Cell Number</label>
                          <div className="input-group">
                            <div className="input-group-addon"><i className="fa fa-phone" aria-hidden="true" /></div>
                            <input type="tel" className=" form-control" name="phoneNumber" disabled="disabled" data-country="US" />
                          </div>
                        </div>
                        <style dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n" }} />
                        <div className="stripe-form">
                        </div>
                        <button type="submit" className="btn btn-green paynow">Confirm Bid</button>
                      </form>
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
  confirmAuctionBid : (eventurl, itemIds, stripeToken)  => confirmAuctionBid(eventurl, itemIds, stripeToken)
};
const mapStateToProps = (state) => ({});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(ConfirmBid));

