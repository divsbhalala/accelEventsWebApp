
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './resetPassword.css';
import _ from 'lodash';
import {onFormSubmit, doResetPassword} from './action/index';
import Link from './../../components/Link/Link';
import cx from 'classnames';

import {connect} from 'react-redux';
import {Alert, Button} from 'react-bootstrap';
import  history from './../../history';


class ResetPassword extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isValidData: false,
      email: null,
      error: null,
      emailFeedBack: false,
      emailSend: false,
    };

  }

  onFormClick = (e) => {
    e.preventDefault();

    if (this.email.value == '') {
      this.setState({
        email: false
      });
    }
    if (this.state.isValidData) {
      this.props.doResetPassword(this.email.value).then((resp) => {
        ;
        if (!resp.error) {
          history.push('/');
          this.setState({error: ""});
        }
        else {
          this.setState({error: "Invalid Email"});
        }

      });
    }

  };

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  emailValidateHandler = (e) => {

    this.setState({
      emailFeedBack: true
    });

    if (this.email.value == '') {
      this.setState({
        email: false
      });
    }
    else {
      this.setState({
        email: this.validateEmail(this.email.value)
      });
    }
    this.setState({isValidData: !!(this.email.value)});

  };


  componentDidMount() {
    /* if(localStorage.getItem('user') && localStorage.getItem('token')){
     this.props.storeResetPasswordData(JSON.parse(localStorage.getItem('user')));
     this.props.storeToken(JSON.parse(localStorage.getItem('token')));
     }
     */
    if (!_.isEmpty(this.props.USER_DATA)) {
      history.push('/');
    }
  }

  render() {
    return (

      <div className="password-reset">
        {/*<div className="login-signup-container login  has-cell-number ">
         <div className="login-form" id="ResetPasswordAttempt">
         <h1 className="text-center">Log in</h1>
         <h4 className="text-center">
         Or &nbsp;&nbsp;<Link className={s.link} to="/signup">Signup</Link>
         </h4>
         <form className="ajax-form  validated fv-form fv-form-bootstrap" onSubmit={this.onFormClick}>
         <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}} />
         <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}>
         <span className="fa fa-spinner fa-pulse fa-fw" />
         <span className="resp-message" />
         </div>
         <div className="js-notification notification-register mrg-t-md" style={{display: 'none'}}>
         Looks like you don't have an account yet. Let's change that!
         <a href="/AccelEventsWebApp/u/signup">Sign up for free.</a>
         </div>
         <div className={cx("mrg-t-sm form-group" , this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
         <label className="sr-only" htmlFor="login-email">Email</label>
         <input name="username"
         id="login-email"
         autoComplete="off"
         placeholder="Email"
         type="text"
         required="required"
         className="form-control input-lg"
         autoFocus
         ref={ref => { this.email = ref; }}
         onKeyUp={this.emailValidateHandler}
         />
         { this.state.emailFeedBack && this.state.email && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
         { this.state.emailFeedBack && !this.state.email && <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
         { this.state.emailFeedBack && !this.state.email && <small className="help-block" >This value is not valid</small> }
         </div>
         <div className={cx("mrg-t-sm form-group", this.state.passwordFeedBack && 'has-feedback', this.state.passwordFeedBack && this.state.email && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
         <label className="sr-only" htmlFor="login-password">Password</label>
         <input name="password"
         placeholder="Password"
         id="login-password"
         type="password"
         autoComplete="off"
         required="required"
         className="form-control input-lg"
         ref={ref => { this.password = ref; }}
         onKeyUp={this.passwordValidateHandler}
         />
         { this.state.passwordFeedBack && this.state.password &&  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
         { this.state.passwordFeedBack && !this.state.password &&  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
         { this.state.passwordFeedBack && !this.state.password && <small className="help-block" >This value is not valid</small> }
         </div>
         <input type="hidden" name defaultValue />
         <div className="mrg-t-sm">
         <button type="submit" className="btn btn-square btn-green btn-block btn-lg">Log in</button>
         </div>
         <div className="mrg-t-sm ">
         <div className="form-group">
         <input id="remember-me" name="remember-me" defaultChecked="checked" type="checkbox" />
         <label htmlFor="remember-me" className="text-small">Remember me</label>
         <Link className="pull-right small" to="/password-reset">Forgot password?</Link>
         </div>
         </div>
         </form>
         </div>
         </div>*/}
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <h2 className="text-center"><strong>Password Reset</strong></h2>
            <p className="help-text text-center mrg-b-lg">Enter your email to reset you password</p>
            <div className="form">
              <form noValidate className="login-form" onSubmit={this.onFormClick}>
                <div
                  className={cx("mrg-t-sm form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
                  <input className="form-control input-lg" type="text" placeholder="Email" name="username"
                         required="required"
                         autoFocus
                         ref={ref => {
                           this.email = ref;
                         }}
                         onKeyUp={this.emailValidateHandler}
                  />
                </div>
                { this.state.emailFeedBack && !this.state.email &&
                <Alert bsStyle="danger">Invalid Email address</Alert>}
                { this.state.emailSend &&
                <Alert bsStyle="success">Password reset link sent successfully, Please check your mail</Alert>}
                <input type="hidden" name defaultValue/>
                <button className="btn btn-square btn-green btn-lg" type="submit">Reset my password</button>
              </form>
              {/* /.login-form */}
            </div>
            {/* /.form */}
            {/* created just in case we decide to add these later.
             <p class="help-text text-center"><a href='/AccelEventsWebApp/u/login'>Login here.</a></p>
             <p class="help-text text-center">New User? <a href='/AccelEventsWebApp/u/signup'>Signup now.</a></p>
             */}
          </div>
        </div>

      </div>

    );
  }
}
const mapDispatchToProps = {
  onFormSubmit: () => onFormSubmit(),
  doResetPassword: (email) => doResetPassword(email),
};

const mapStateToProps = (state) => ({
  counter: state.counter,
  USER_DATA: state.USER
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(ResetPassword));
