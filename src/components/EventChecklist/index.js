import React, {Component} from 'react';
import   PropTypes   from 'prop-types';
import {Panel} from 'react-bootstrap';
import Link from '../Link';
import cx from 'classnames';
import PopupModel from './../../components/PopupModal';
import Button from 'react-bootstrap-button-loader';
import IntlTelInput from './../../components/IntTelInput';
import {connect} from 'react-redux';
import  { doValidateMobileNumber} from './../../routes/event/action/index';
import {
  dashboardSubmitBid,
  dashboardRafflePurchaseTicket,
  dashboardSubmitPledge} from './../../routes/admin/action/index';
class EventChecklist extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      showPopup:false,
      message:null,
      loading:false,
      popupHeader:false,
      phone:null,
      phoneNumber: null,
      errorMsgPhoneNumber:null,
      countryPhone:null,
      phoneNumberFeedBack: false,
      isError:false,

    }
  }
  showPopup = () => {
    this.setState({
      showPopup: true
    })
  };
  hidePopup = () => {
    this.setState({
      showPopup: false,
      loading:false,
      message:null,
    });
  };
phoneNumberValidateHandler(name, isValid, value, countryData, number, ext) {
    this.setState({
      phone: value,
      countryPhone:countryData.iso2,
      phoneNumberFeedBack: true,
      errorMsgPhoneNumber :"",
    });
    if (value === '') {
      this.setState({
        phoneNumber: false,
        errorMsgPhoneNumber: "phoneNumber is Require",
      });
    }else{
      this.props.doValidateMobileNumber('+' + countryData.dialCode + value).then(resp => {
        this.setState({
          phoneNumber: !resp,
          errorMsgPhoneNumber: "Invalid phone number",
        });
      })
    }
    this.setState({
      phone: value,
    });
  };
componentWillMount() {
  this.changePhone = this.phoneNumberValidateHandler.bind(this, 'phone');
  this.setState({phone:this.props.phone.replace( /[^0-9]/g, '')})
}
submiteForm = (e) => {
  e.preventDefault();
  if(this.state.phoneNumber){
    this.setState({loading:true})
    if(this.props.checkList.todoButtonText == "Submit Bid"){
      this.dashboardSubmitBid();
    }
    if(this.props.checkList.todoButtonText == "Submit Pledge"){
      this.dashboardSubmitPledge();
    }
    if(this.props.checkList.todoButtonText == "Submit Raffle Ticket"){
      this.dashboardRafflePurchaseTicket();
    }
  }
}
dashboardSubmitBid = () => {
  this.props.dashboardSubmitBid(this.state.countryPhone, this.state.phone.replace( /[^0-9]/g, ''))
    .then(resp => {
      if (resp && resp.message) {
        this.setState({
          loading:false,
          message:resp.message,
          isError:false,
        });
      }else{
        this.setState({
          loading:false,
          message:"Something went wrong",
          isError:true
        });
      }
      this.setState({
        loading:false,
      })
    });
};
dashboardSubmitPledge = () => {
  this.props.dashboardSubmitPledge(this.state.countryPhone, this.state.phone.replace( /[^0-9]/g, ''))
    .then(resp => {
      if (resp && resp.message) {
        this.setState({
          loading:false,
          message:resp.message,
          isError:false,
        });
      }else{
        this.setState({
          loading:false,
          message:"Something went wrong",
          isError:true
        });
      }
      this.setState({
        loading:false,
      })
    });
};
dashboardRafflePurchaseTicket = () => {
  this.props.dashboardRafflePurchaseTicket(this.state.countryPhone, this.state.phone.replace( /[^0-9]/g, ''))
    .then(resp => {
      if (resp && resp.message) {
        this.setState({
          loading:false,
          message:resp.message,
          isError:false,
        });
      }else{
        this.setState({
          loading:false,
          message:"Something went wrong",
          isError:true
        });
      }
      this.setState({
        loading:false,
      })
    });
};
  render() {
    return (
      <li className="clearfix">
        <div className="name">
          <div className="checkbox-nice">
            <input type="checkbox" disabled="disabled"  defaultChecked={this.props.checkList.complete ? "checked" :""} />
              <label>{this.props.checkList.label}</label>
          </div>
          <div className="desc">{this.props.checkList.description}</div>
        </div>
        <div className="actions">
          {this.props.checkList.dialog  ?
          <a onClick={this.showPopup}  className={cx("table-link btn btn-xs",!this.props.checkList.complete ? "btn-danger" :"btn-success")}  >
            <span className={cx("label",!this.props.checkList.complete ? "btn-danger" :"btn-success")}  dangerouslySetInnerHTML={{__html: this.props.checkList.todoButtonText}}></span>
          </a>
          : <Link to={this.props.checkList.todoLink}  className={cx("table-link btn btn-xs",!this.props.checkList.complete ? "btn-danger" :"btn-success")}  >
            <span className={cx("label",!this.props.checkList.complete ? "btn-danger" :"btn-success")}  dangerouslySetInnerHTML={{__html: this.props.checkList.todoButtonText}}></span>
          </Link>
          }
        </div>
        <PopupModel
          id="bookingPopup"
          showModal={this.state.showPopup}
          headerText={<span>{this.props.checkList.label}</span>}
          modelBody=''
          onCloseFunc={this.hidePopup}>
          <div className="ticket-type-container">
            { this.props.checkList.description }
            <form method="POST" className="ajax-form validated" data-onsuccess="reloadPage">
              <div
                className={cx("form-group", this.state.phoneNumberFeedBack && 'has-feedback', this.state.phoneNumberFeedBack && this.state.phoneNumber && 'has-success', this.state.phoneNumberFeedBack && (!this.state.phoneNumber) && 'has-error')}>
                {/*<label className="control-label">Cell Number</label>*/}
                { this.state.message && <div  className={cx("ajax-msg-box text-center mrg-b-lg", !this.state.isError ? 'text-success':'text-danger')} >
                  { this.state.message } </div> }
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-phone" aria-hidden="true"/>
                  </div>
                  <IntlTelInput
                    css={['intl-tel-input', 'form-control intl-tel']}
                    utilsScript="./libphonenumber.js"
                    separateDialCode={true}
                    defaultCountry={this.props.country || ""}
                    value={ this.state.phone || ""}
                    onPhoneNumberChange={this.changePhone}
                  />
                  { this.state.phoneNumberFeedBack && this.state.phoneNumber &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                  { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                </div>
                { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgPhoneNumber}</small>}
              </div>
              <input type="hidden" name defaultValue />
              <div className="text-center">
                <Button type="submit" className="btn btn-primary m-r-5"  onClick={this.submiteForm} loading={this.state.loading} data-loading-text="<i class='fa fa-spinner fa-spin'></i> Submitting">{this.props.checkList.todoButtonText}</Button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.hidePopup}>Cancel</button>
              </div>
            </form>
         </div>
        </PopupModel>
      </li>
    );
  }
}
const mapDispatchToProps = {
  doValidateMobileNumber: (mobileNumber) => doValidateMobileNumber(mobileNumber),
  dashboardSubmitPledge: (countryCode,phoneNumber) => dashboardSubmitPledge(countryCode,phoneNumber),
  dashboardRafflePurchaseTicket: (countryCode,phoneNumber) => dashboardRafflePurchaseTicket(countryCode,phoneNumber),
  dashboardSubmitBid: (countryCode,phoneNumber) => dashboardSubmitBid(countryCode,phoneNumber),
};
const mapStateToProps = (state) => ({
	country: state.location && state.location.data && state.location.data.country && state.location.data.country.toLowerCase(),
});

export default  connect(mapStateToProps, mapDispatchToProps)((EventChecklist));
