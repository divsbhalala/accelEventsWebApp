import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MyProfile.css';
import {connect} from 'react-redux';
import {updateProfile} from './action/signup_action';
import  history from './../../history';
import InlineEdit from 'react-edit-inline';
import IntlTelInput from '../../components/IntTelInput';
import {EditableTextField} from 'react-bootstrap-xeditable';
import cx from 'classnames';
import { doValidateMobileNumber
} from './../event/action/index';
class ProfileField extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor() {
    super();
    this.state = {
      isValidData: false,
      error: null,
      data:null,
      fieldValue:null,
      fieldName:null,
      isEdit:false,
      phone: null,
    };
    this.updateProfile = this.updateProfile.bind(this);
 	}
 	phoneEdit=()=>{
    this.setState({
      isEdit: !this.state.isEdit,
    });
  }
  updateProfile = (name, value) =>{
     this.setState({
      fieldValue:value
    });
     if(value!= this.props.fieldValue ) {
     this.props.updateProfile(this.state.fieldName, value).then(resp => {
      }).catch(error => {
        //history.push('/404');
      });
      this.props.updatePProfile(this.state.fieldName, value);
    }
 };
  updateProfileMob = () =>{
    this.setState({
      fieldValue:this.state.phone
    });
    console.log(this.state.fieldValue,'..............',this.state.fieldName)
    if(this.state.phone!== this.props.fieldValue ) {
      this.props.updateProfile(this.state.fieldName, this.state.phone).then(resp => {
      }).catch(error => {
        //history.push('/404');
      });
      this.props.updatePProfile(this.state.fieldName, this.state.phone);
    }
  };
  updateProfileContry = () =>{
    this.setState({
      fieldValue:this.state.countryPhone
    });
      if(this.state.countryPhone!== this.props.fieldValue ) {
      this.props.updateProfile(this.props.fieldName1, this.state.countryPhone).then(resp => {
      }).catch(error => {
        //history.push('/404');
      });
      this.props.updatePProfile(this.props.fieldName1, this.state.countryPhone);
    }
    this.updateProfileMob;
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
      this.props.doValidateMobileNumber(number).then(resp => {
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
  componentWillMount(){
    this.changePhone = this.phoneNumberValidateHandler.bind(this, 'phone');
  }
  componentDidMount(){
    this.setState({
      fieldValue:this.props.fieldValue,
      fieldName:this.props.fieldName,
      phone:this.props.fieldValue ,
    })
 }
  componentWillUpdate(){}
  componentWillReceiveProps(){}
  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-4"><label htmlFor="firstname">{this.props.title}</label></div>
          <div className="col-md-8">
            <div  className="row">
              <div className="editable-input col-sm-5" style={{position: 'relative'}}>
                {this.props.title === 'Email' ?
                  <a className="editable editable-click" >{ this.state.fieldValue }</a>
                 :this.props.title === 'Phone' ?
                    <div>
                      {!this.state.isEdit && <a className="editable editable-click" onClick={this.phoneEdit}>{ this.state.fieldValue }</a>}
                      {this.state.isEdit && <div className={cx("form-group", this.state.phoneNumberFeedBack && 'has-feedback', this.state.phoneNumberFeedBack && this.state.phoneNumber && 'has-success', this.state.phoneNumberFeedBack && (!this.state.phoneNumber) && 'has-error')}>
                        <IntlTelInput
                          css={['intl-tel-input', 'form-control intl-tel']}
                          utilsScript="./libphonenumber.js"
                          separateDialCode={true}
                          //defaultCountry={this.props.country || ""}
                          //value={ this.state.phone }
                          onPhoneNumberChange={this.changePhone}
                        />
                         <div className="editable-buttons">
                        <button type="submit" className="btn btn-primary btn-sm editable-submit" onClick={this.updateProfileContry}>
                          <i className="glyphicon glyphicon-ok"></i>
                        </button>
                        <button type="button" className="btn btn-default btn-sm editable-cancel" onClick={this.phoneEdit} >
                          <i className="glyphicon glyphicon-remove"></i>
                        </button>
                      </div>
                    </div>}
                    </div>
                   : <EditableTextField name='username' value={this.state.fieldValue} onUpdate={this.updateProfile} placeholder=''/>}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
const mapDispatchToProps = {
  updateProfile: (field,value) => updateProfile(field,value),
  doValidateMobileNumber: (mobileNumber) => doValidateMobileNumber(mobileNumber),
};
const mapStateToProps = (state) => ({
 });
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(ProfileField));
