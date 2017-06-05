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
import s from './Raffle.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {doGetEventData, doGetSettings} from './../action/index';
import  history from './../../../history';

import  EventAside from './../../../components/EventAside/EventAside';
import  {doGetRaffleItemByCode} from './../action/index';

class Raffle extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      tab: 'The Event',
      showBookingTicketPopup: false,
      showMapPopup: true,
      isLogin: false,

      isValidData: false,
      error: null,

      firstName: null,
      lastName: null,

      firstNameFeedBack: false,
      lastNameFeedBack: false,
    }

  }


  onFormClick = (e) => {
    e.preventDefault();

    if (this.state.isValidData) {
      // this.props.doLogin(this.email.value, this.password.value ).then((resp)=>{
      //     if(!resp.error){
      //         history.push('/');
      //         this.setState({error:""});
      //     }
      //     else{
      //         this.setState({error:"Invalid Email or password"});
      //     }
      //
      // });
    }

  };
  firstNameValidateHandler = (e) => {

    this.setState({
      firstNameFeedBack: true
    });

    if (this.firstName.value == '') {

      this.setState({
        firstName: false
      });
    } else {
      this.setState({
        firstName: true
      });
    }
    this.setState({isValidData: !!(this.firstName.value && this.lastName.value )});

  };
  lastNameValidateHandler = (e) => {

    this.setState({
      lastNameFeedBack: true
    });

    if (this.lastName.value == '') {

      this.setState({
        lastName: false
      });
    } else {
      this.setState({
        lastName: true
      });
    }
    this.setState({isValidData: !!(this.firstName.value && this.lastName.value )});

  };

  componentWillMount() {
    this.props.doGetEventData(this.props.params && this.props.params.params);
    this.props.doGetSettings(this.props.params && this.props.params.params, 'raffle').then(resp => {
      this.setState({
        settings: resp && resp.data
      });
    }).catch(error => {
      history.push('/404');
    });
    this.props.doGetRaffleItemByCode(this.props.params && this.props.params.params, this.props.itemCode)
      .then(resp => {
        if (resp && resp.data) {
          this.setState({
            raffleData: resp.data
          })
        }
      }).catch(error => {
      console.log(error)
    });
  }

  render() {
    var form_login = <form className="ajax-form validated fv-form fv-form-bootstrap" method="post"
                           action="/AccelEventsWebApp/events/148/C/FAN/bid" data-has-cc-info="true"
                           data-show-cc-confirm="true" data-confirm-message="getCauseStripeConfirmMessage"
                           data-validate-function="validateCauseBidForm" data-onsuccess="handleCauseBidSubmit"
                           data-validation-fields="getCauseBidValidationFields" noValidate="novalidate"
                           onSubmit={this.onFormClick}>

      <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
        className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
      <div
        className={cx("form-group", this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}>
        <label className="control-label">First Name</label>
        <div className="input-group">
          <div className="input-group-addon">
            <i className="fa fa-user" aria-hidden="true"/>
          </div>
          <input type="text" className="form-control" name="firstname" data-fv-field="firstName"
                 ref={ref => {
                   this.firstName = ref;
                 }}
                 onKeyUp={this.firstNameValidateHandler}/>
          { this.state.firstNameFeedBack && this.state.email &&
          <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
          { this.state.firstNameFeedBack && !this.state.email &&
          <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
        </div>
        { this.state.firstNameFeedBack && !this.state.firstName &&
        <small className="help-block" data-fv-result="NOT_VALIDATED">Firstname is required.</small>}
      </div>
      <div
        className={cx("form-group", this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}>
        <label className="control-label">Last Name</label>
        <div className="input-group">
          <div className="input-group-addon">
            <i className="fa fa-user" aria-hidden="true"/>
          </div>
          <input type="text" className="form-control" name="lastname" data-fv-field="lastName"
                 ref={ref => {
                   this.lastName = ref;
                 }}
                 onKeyUp={this.lastNameValidateHandler}/>
          { this.state.lastNameFeedBack && this.state.lastName &&
          <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
          { this.state.lastNameFeedBack && !this.state.lastName &&
          <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
        </div>
        { this.state.lastNameFeedBack && !this.state.lastName &&
        <small className="help-block" data-fv-result="NOT_VALIDATED">Lastname is required.</small>}
      </div>

      <div className="form-group has-feedback">
        <label className="control-label"> You have <span className="available-tickets">0</span> tickets
          remaining.</label>
        <div className="row">
          <div className="col-md-5 col-lg-5">
            <div className="input-group">
              <div className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true"/></div>
              <input type="number" className="form-control" name="itembid" disabled="disabled" required="required"
                     data-isprocessingfeestopurchaser="false" data-fv-field="itembid"/>
            </div>
            <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="itembid"
               style={{display: 'none'}}/>
            <small className="help-block" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Number of Tickets
              should be greater than zero.
            </small>
            <small className="help-block" data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Digits Only
              Accepted.
            </small>
            <small className="help-block" data-fv-validator="callback" data-fv-for="itembid"
                   data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>Tickets should be more than 0 and less than
              0
            </small>
            <small className="help-block" data-fv-validator="integer" data-fv-for="itembid"
                   data-fv-result="NOT_VALIDATED" style={{display: 'none'}}>This value is not valid
            </small>
          </div>
        </div>
      </div>
      <div className="row btn-row">
        <div className="col-md-5 col-lg-5">
          <button className={cx("btn btn-primary text-uppercase", s.btnFull, !this.state.isValidData && 'disabled')}
                  role="button" type="submit"
                  data-loading-text="<i class='fa fa-spinner fa-spin'></i> Getting Started..">
            Submit Tickets
          </button>

        </div>
        <div className="col-md-6 col-lg-5">

          <a role="button" className="btn btn-success btn-block" href="/AccelEventsWebApp/events/jkazarian8#raffle">Go
            back to All Items</a>
        </div>
      </div>
      <div className="row mrg-t-md">
        <div className="col-md-5 col-lg-10">
          <button className={cx("btn btn-primary text-uppercase", s.btnFull)} role="button" type="submit"
                  data-loading-text="<i class='fa fa-spinner fa-spin'></i> Getting Started..">
            Get Tickets
          </button>
        </div>
      </div>
    </form>;
    var form_normal = <div >
        {this.state.raffleData && this.state.raffleData.active && <div className="text-danger text-center bold"> Please activate this module to start accepting
          pledges.
        </div>}
      <a role="button" className="btn btn-success btn-block" href="#login-user" data-toggle="modal" data-form="login">Login</a>
      <a role="button" className="btn btn-primary btn-block" data-toggle="modal" href="#info-modal"
         data-title="Raffle Drawn"
         data-message="This raffle has already been drawn. No further tickets are being accepted">Get Tickets</a>
      <a role="button" className="btn btn-success btn-block" href="/AccelEventsWebApp/events/jkazarian8#raffle">Go back
        to All Items</a>
    </div>;

    var imageUrl = this.state.raffleData && this.state.raffleData.images[0].imageUrl > 0 ? 'http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/' + this.state.raffleData.images[0].imageUrl : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"
    return (
      <div className="row">
        <div className="col-lg-12">

          <div id="content-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">

                <EventAside activeTab={'Raffle'} eventData={this.props.eventData} settings={this.state.settings}
                            eventTicketData={this.props.eventTicketData}
                            activeCategory={false}/>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8">
                <div className="main-box clearfix">
                  <h1 className="text-center mrg-t-lg"
                      id="item-name">{this.state.raffleData && this.state.raffleData.name}</h1>
                  <div className="row mrg-t-lg">
                    <div className="col-md-6">
                      <div className="pad-l-md pad-r-md">
                        <div className="item-image">
                          <div className="item-image-inner" style={{
                            backgroundImage: 'url(' + imageUrl + ')',
                            width: '',
                            transform: 'rotate(0deg)'
                          }}/>
                        </div>
                      </div>
                      <div className="mrg-t-lg pad-l-md pad-r-md">
                      </div>
                    </div>
                    <div className="col-md-6">
                      { this.state.isLogin ? form_login : form_normal  }
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
  doGetEventData: (eventUrl) => doGetEventData(eventUrl),
  doGetRaffleItemByCode: (eventUrl, itemCode) => doGetRaffleItemByCode(eventUrl, itemCode),
  doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
};
const mapStateToProps = (state) => ({
  raffle_data: state.event && state.event.raffle_data,
  eventData: state.event && state.event.data,
  eventTicketData: state.event && state.event.ticket_data,

});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Raffle));

