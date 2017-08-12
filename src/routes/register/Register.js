
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import {connect} from 'react-redux';
import cx from 'classnames';
import Link from '../../components/Link';
import Footer from '../../components/Footer';
import  history from './../../history';
import {Button, FormGroup, ControlLabel, Alert, Radio, HelpBlock, Form, FormControl} from 'react-bootstrap';
import {onFormSubmit, doRegister} from './action/signup_action';
import  _ from 'lodash';
function FieldGroup({id, label, help, ...props}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isValidData: false,
      email: null,
      password: null,
      error: null,
      emailFeedBack: false,
      passwordFeedBack: false,
    };

    this.emailValidateHandler = this.emailValidateHandler.bind(this);
    this.passwordValidateHandler = this.passwordValidateHandler.bind(this);
  }

  onFormClick = (e) => {
    e.preventDefault();

    if (this.password.value && this.password.value.trim() === '') {
      this.setState({
        password: false
      });
    }
    if (this.state.isValidData) {
      this.props.doRegister(this.email.value.trim(), this.password.value.trim()).then((resp) => {
        if (resp && resp.data) {
          this.setState({error: ""});
          setTimeout(()=>{
              // history.push(resp.data.redirectUrl)
             history.push('/');
            // window.location.replace(resp.data.redirectUrl)
          },2500)
        }
        else {
          let errorMessage = resp && resp.errorMessage;
          this.setState({error: errorMessage || "Error while processing your request"});
        }

      });
    }

  };

  emailValidateHandler = (e) => {
    this.setState({
      emailFeedBack: true
    });
    if (this.email.value && this.email.value.trim() === '') {
      this.setState({
        email: false
      });
    }
    else {
      this.setState({
        email: true
      });
    }
    this.setState({isValidData: !!(this.email.value.trim() && this.password.value.trim())});

  };
  passwordValidateHandler = (e) => {
    this.setState({
      passwordFeedBack: true
    });

    if(this.password.value && this.password.value.trim() === '') {

      this.setState({
        password: false
      });
    } else {
      this.setState({
        password: true
      });
    }
    this.setState({isValidData: !!(this.email.value.trim() && this.password.value.trim())});

  };

  componentWillMount() {
    if (!_.isEmpty(this.props.USER_DATA)) {
      history.push('/');
    }
  }

  render() {
    return (
      <div className="signup-page-wrap">
        <img
          src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/6bafabd0-5f33-4dcc-a95c-602babb11761accelevents-logo-white.png"
          alt="" className="logo-img img-responsive center-block"/>
        <h1 className="text-center mrg-t-md">Get started with a free account</h1>
        <div className="onboardpage center-block">
					{ this.state.error ? <Alert bsStyle="danger">{this.state.error}</Alert> : ""}
          <form id="signupform" onSubmit={this.onFormClick} className="createpwdform fv-form fv-form-bootstrap"
                noValidate="novalidate" autoComplete="off">
            <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
            <div
              className={cx("form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
              <label className="control-label text-uppercase">Email Address</label>
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-user" aria-hidden="true"/>
                </div>
                <input type="text"
                       className="form-control"
                       name="email"
                       id="login-email"
                       required="required"
                       autoComplete="off"
                       ref={(input) => {
                         this.email = input;
                       }}
                       onKeyUp={this.emailValidateHandler}/>
              </div>
              <input type="text" style={{display:'none'}}/>
              <input type="password" style={{display:'none'}}/>
              { this.state.emailFeedBack && this.state.email &&
              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
              { this.state.emailFeedBack && !this.state.email &&
              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
              { this.state.emailFeedBack && !this.state.email &&
              <small className="help-block">This value is not valid</small> }
            </div>
            <div
              className={cx("form-group", this.state.passwordFeedBack && 'has-feedback', this.state.passwordFeedBack && this.state.email && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
              <label className="control-label text-uppercase">Password</label>
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="fa fa-key" aria-hidden="true"/>
                </div>
                <input type="password"
                      className="form-control"
                      name="signup-password"
                      id="signup-password"
                      required="required"
                       ref={(input) => {
                         this.password = input;
                       }}
                       autoComplete="new-password"
                       onKeyUp={this.passwordValidateHandler}/>
              </div>
              { this.state.passwordFeedBack && this.state.password &&
              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
              { this.state.passwordFeedBack && !this.state.password &&
              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
              { this.state.passwordFeedBack && !this.state.password &&
              <small className="help-block">This value is not valid</small> }
            </div>
            <input type="hidden" name="mostRecentEventId" defaultValue={0}/>
            <input type="hidden" name defaultValue/>
            <button
              className={cx("btn btn-lg btn-block mrg-t-lg text-uppercase", ( (this.state.emailFeedBack && !this.state.email) || (this.state.passwordFeedBack && !this.state.password)) && 'disabled')}
              role="button" type="submit"
              data-loading-text="<i class='fa fa-spinner fa-spin'></i> Getting Started..">
              Get Started
            </button>
            <div>
            </div>
          </form>
        </div>
        <Footer/>
      </div>
    );
  }
}
const mapDispatchToProps = {
  onFormSubmit: () => onFormSubmit(),
  doRegister: (email, password) => doRegister(email, password)
};

const mapStateToProps = (state) => ({
  counter: state.counter,
  USER_DATA: state.USER
});

Register.propTypes = {
  //onFormClick: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Register));
