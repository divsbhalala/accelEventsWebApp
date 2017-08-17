
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './event.css';
import {connect} from 'react-redux';

import ToggleSwitch from '../../../components/Widget/ToggleSwitch';

import {getOrganizationSettings,setOrganizationSettings} from './action';
import Button from 'react-bootstrap-button-loader';
import cx from 'classnames';

import ColorPicker from 'react-color-picker'
import 'react-color-picker/index.css'
import Link from "../../../components/Link/Link";


class EditEvent extends React.Component {
  render() {
    return (
      <div className="container">
        <form id="editform"  noValidate="novalidate" className="fv-form fv-form-bootstrap">
          <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}} />
          <div className="form-group row has-feedback">
            <div className="col-md-4">
              <label>Message after payment</label>
              <p className="help-text">
                Help Text for message after payment
              </p>
            </div>
            <div className="col-md-4">
              <textarea className="form-control" name="msgafterpymt" placeholder="Place Holder for Message After Payment" rows={5} data-fv-field="msgafterpymt" defaultValue={""} /><i className="form-control-feedback" data-fv-icon-for="msgafterpymt" style={{display: 'none'}} />
              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="msgafterpymt" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Field is required</small><small className="help-block" data-fv-validator="stringLength" data-fv-for="msgafterpymt" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Max 160 characters are allowed.</small></div>
          </div>
          <div className="form-group row has-feedback">
            <div className="col-md-4">
              <label> Congratulate message if stripe enabled for multiple items</label>
              <p className="help-text">
                Help Text for  Congratulate message if stripe enabled for multiple items
              </p>
            </div>
            <div className="col-md-4">
              <textarea className="form-control" name="strpenmultitem" placeholder="Place Holder for  Congratulate message if stripe enabled for multiple items" rows={5} data-fv-field="strpenmultitem" defaultValue={""} /><i className="form-control-feedback" data-fv-icon-for="strpenmultitem" style={{display: 'none'}} />
              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="strpenmultitem" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Field is required</small><small className="help-block" data-fv-validator="stringLength" data-fv-for="strpenmultitem" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Max 160 characters are allowed.</small></div>
          </div>
          <div className="form-group row has-feedback">
            <div className="col-md-4">
              <label>Congratulate message if stripe is not enabled for multiple items</label>
              <p className="help-text">
                Help Text for Congratulate message if stripe is not enabled for multiple items
              </p>
            </div>
            <div className="col-md-4">
              <textarea className="form-control" name="strpdisamultitem" placeholder="Place Holder for Congratulate message if stripe is not enabled for multiple items" rows={5} data-fv-field="strpdisamultitem" defaultValue={""} /><i className="form-control-feedback" data-fv-icon-for="strpdisamultitem" style={{display: 'none'}} />
              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="strpdisamultitem" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Field is required</small><small className="help-block" data-fv-validator="stringLength" data-fv-for="strpdisamultitem" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Max 160 characters are allowed.</small></div>
          </div>
          <div className="form-group row has-feedback">
            <div className="col-md-4">
              <label>Congratulate message if stripe is enabled for single item</label>
              <p className="help-text">
                Help Text for Congratulate message if stripe is enabled for single item
              </p>
            </div>
            <div className="col-md-4">
              <textarea className="form-control" name="strpensingleitem" placeholder="Place Holder for Congratulate message if stripe is enabled for single item" rows={5} data-fv-field="strpensingleitem" defaultValue={""} /><i className="form-control-feedback" data-fv-icon-for="strpensingleitem" style={{display: 'none'}} />
              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="strpensingleitem" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Field is required</small><small className="help-block" data-fv-validator="stringLength" data-fv-for="strpensingleitem" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Max 160 characters are allowed.</small></div>
          </div>
          <div className="form-group row has-feedback">
            <div className="col-md-4">
              <label>Congratulate message if stripe is not enabled for single item</label>
              <p className="help-text">
                Help Text for Congratulate message if stripe is not enabled for single item
              </p>
            </div>
            <div className="col-md-4">
              <textarea className="form-control" name="strpdisabsingleitem" placeholder="Place Holder for Congratulate message if stripe is not enabled for single item" rows={5} data-fv-field="strpdisabsingleitem" defaultValue={""} /><i className="form-control-feedback" data-fv-icon-for="strpdisabsingleitem" style={{display: 'none'}} />
              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="strpdisabsingleitem" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Field is required</small><small className="help-block" data-fv-validator="stringLength" data-fv-for="strpdisabsingleitem" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Max 160 characters are allowed.</small></div>
          </div>
          <div className="form-group row has-feedback">
            <div className="col-md-4">
              <label> When someone purchased an item &amp; stripe is disabled.</label>
              <p className="help-text">
                Help Text for  When someone purchased an item &amp; stripe is disabled.
              </p>
            </div>
            <div className="col-md-4">
              <textarea className="form-control" name="strpdisableitempurchase" placeholder="Place Holder for  When someone purchased an item & stripe is disabled." rows={5} data-fv-field="strpdisableitempurchase" defaultValue={""} /><i className="form-control-feedback" data-fv-icon-for="strpdisableitempurchase" style={{display: 'none'}} />
              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="strpdisableitempurchase" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Field is required</small><small className="help-block" data-fv-validator="stringLength" data-fv-for="strpdisableitempurchase" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Max 160 characters are allowed.</small></div>
          </div>
          <div className="form-group row has-feedback">
            <div className="col-md-4">
              <label>Default message after payment for cause item</label>
              <p className="help-text">
                Help Text for Default message after payment for cause item
              </p>
            </div>
            <div className="col-md-4">
              <textarea className="form-control" name="causteitempymntmsg" placeholder="Place Holder for Default message after payment for cause item" rows={5} data-fv-field="causteitempymntmsg" defaultValue={""} /><i className="form-control-feedback" data-fv-icon-for="causteitempymntmsg" style={{display: 'none'}} />
              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="causteitempymntmsg" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Field is required</small><small className="help-block" data-fv-validator="stringLength" data-fv-for="causteitempymntmsg" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Max 160 characters are allowed.</small></div>
          </div>
          <div className="form-group row has-feedback">
            <div className="col-md-4">
              <label>When someone makes donation through website.</label>
              <p className="help-text">
                Help Text for  When someone makes donation through website.
              </p>
            </div>
            <div className="col-md-4">
              <textarea className="form-control" name="donationmsg" placeholder="Place Holder for  When someone makes donation through website." rows={5} data-fv-field="donationmsg" defaultValue={""} /><i className="form-control-feedback" data-fv-icon-for="donationmsg" style={{display: 'none'}} />
              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="donationmsg" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Field is required</small><small className="help-block" data-fv-validator="stringLength" data-fv-for="donationmsg" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Max 160 characters are allowed.</small></div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <label>Confirmation SMS after online bid</label>
              <p className="help-text">Help Text For Confirmation SMS after online bid</p>
            </div>
            <div className="col-md-4">
              <div className="onoffswitch onoffswitch-success">
                <input type="checkbox" name="comfirmmsg" className="onoffswitch-checkbox" id="comfirmmsg" />
                <label className="onoffswitch-label" htmlFor="comfirmmsg">
                  <div className="onoffswitch-inner" />
                  <div className="onoffswitch-switch" />
                </label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <label>Total amount raised column for cause items</label>
              <p className="help-text">Help Text For Total amount raised column for cause items</p>
            </div>
            <div className="col-md-4">
              <div className="onoffswitch onoffswitch-success">
                <input type="checkbox" name="colforcauseitem" className="onoffswitch-checkbox" id="colforcauseitem" />
                <label className="onoffswitch-label" htmlFor="colforcauseitem">
                  <div className="onoffswitch-inner" />
                  <div className="onoffswitch-switch" />
                </label>
              </div>
            </div>
          </div>
          <input type="hidden" name defaultValue />
          <div className="form-group row">
            <div className="col-md-2 col-sm-12">
              <button className="btn btn-info btn-block" type="button" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">Save Settings</button>
            </div>
            <div className="col-md-2 col-sm-12">
              <a className="btn btn-danger btn-block" href="/u/superadmin/events">Cancel</a>
            </div>
            <div id="alertmessage" className="col-md-8 col-sm-12" />
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <label>"Auction" module Active</label>
            </div>
            <div className="col-md-4">
              <div className="onoffswitch onoffswitch-success module-status">
                <input type="checkbox" name="1_auction_activated" className="onoffswitch-checkbox " id="1_auction_activated" data-module="AUCTION" data-event-id={1} />
                <label className="onoffswitch-label" htmlFor="1_auction_activated">
                  <div className="onoffswitch-inner" />
                  <div className="onoffswitch-switch" />
                </label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <label>"Raffle" module Active</label>
            </div>
            <div className="col-md-4">
              <div className="onoffswitch onoffswitch-success module-status">
                <input type="checkbox" name="1_raffle_activated" className="onoffswitch-checkbox" id="1_raffle_activated" data-module="RAFFLE" data-event-id={1} />
                <label className="onoffswitch-label" htmlFor="1_raffle_activated">
                  <div className="onoffswitch-inner" />
                  <div className="onoffswitch-switch" />
                </label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <label>"Fund a Need" module Active</label>
            </div>
            <div className="col-md-4">
              <div className="onoffswitch onoffswitch-success module-status">
                <input type="checkbox" name="1_cause_activated" className="onoffswitch-checkbox" id="1_cause_activated" data-module="CAUSEAUCTION" data-event-id={1} />
                <label className="onoffswitch-label" htmlFor="1_cause_activated">
                  <div className="onoffswitch-inner" />
                  <div className="onoffswitch-switch" />
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>

    );
  }
}


const mapDispatchToProps = {
  getOrganizationSettings: (whiteLabelURL) => getOrganizationSettings(whiteLabelURL),
  setOrganizationSettings: (whiteLabelURL,data) => setOrganizationSettings(whiteLabelURL,data)
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(EditEvent));