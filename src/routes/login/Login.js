
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import _ from 'lodash';
import {onFormSubmit, storeLoginData, storeToken,} from './action/index';
import { doLogin,doSignUp} from './../../routes/event/action/index';
import Link from './../../components/Link/Link';
import cx from 'classnames';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';
import  history from './../../history';


class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isValidData: false,
      email: null,
      password: null,
      error: null,
      emailFeedBack: false,
      passwordFeedBack: false,
    };

  }

  onFormClick = (e) => {
    e.preventDefault();

    if(this.email.value && this.email.value.trim() === ''){
      this.setState({
        email: false
      });
    }

    if(this.password.value && this.password.value.trim() === ''){
      this.setState({
        password: false
      });
    }
    if(this.state.isValidData) {
      this.props.doLogin(this.email.value.trim(), this.password.value.trim()).then((resp) => {
        //console.log(resp.data.redirectUrl);
        if (!resp.errorMessage) {
          this.setState({error: "Log In SuccessFully...",loading:false});
          setTimeout(()=>{
             history.push(resp.data.redirectUrl)
            //window.location.replace(resp.data.redirectUrl)
          },2000)
        }
        else {
          this.setState({error: "Invalid Email or password"});
        }

      });
    }
  };

  emailValidateHandler = (e) => {
    this.setState({
      emailFeedBack: true,
      emailValue:this.email.value.trim(),
    });
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(this.password.value && this.email.value.trim() === '') {
      this.setState({
        email: false,
        errorMsgEmail: "Email is required.",
      });
    }
    else {
      this.setState({
        email: re.test(this.email.value.trim()),
        errorMsgEmail: "Invalid Email.",
      });
    }
    this.setState({isValidData: !!(this.email.value && this.password.value)});
  };
  passwordValidateHandler = (e) => {

    this.setState({
      passwordFeedBack: true
    });

    if (this.password.value === '') {

      this.setState({
        password: false
      });
    } else {
      this.setState({
        password: true
      });
    }
    this.setState({isValidData: !!(this.email.value && this.password.value)});

  };


  componentDidMount() {
    /* if(localStorage.getItem('user') && localStorage.getItem('token')){
     this.props.storeLoginData(JSON.parse(localStorage.getItem('user')));
     this.props.storeToken(JSON.parse(localStorage.getItem('token')));
     }
     */
    if (this.props.authenticated) {
       history.push('/u/superadmin/events');
       // window.location.replace('/u/superadmin/events');
    }
  }

  render() {
    return (
      <div className="login-signup-wrap">
        <div className="login-signup-container login  has-cell-number ">
          <div className="login-form" id="LoginAttempt">
            <h1 className="text-center">Log in</h1>
            <h4 className="text-center">
              Or &nbsp;&nbsp;<Link className={s.link} to="/u/signup">Signup</Link>
            </h4>
            {this.state.error && <div id="alertmessage" className="js-notification notification-login mrg-t-md">{this.state.error}</div>}
            <form className="ajax-form  validated fv-form fv-form-bootstrap" onSubmit={this.onFormClick}>
              <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
              <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}>
                <span className="fa fa-spinner fa-pulse fa-fw"/>
                <span className="resp-message"/>
              </div>
              <div className="js-notification notification-register mrg-t-md" style={{display: 'none'}}>
                Looks like you don't have an account yet. Let's change that!
                <a href="/u/signup">Sign up for free.</a>
              </div>
              <div
                className={cx("mrg-t-sm form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
                <label className="sr-only" htmlFor="login-email">Email</label>
                <input name="username"
                       id="login-email"
                       autoComplete="off"
                       placeholder="Email"
                       type="text"
                       required="required"
                       className="form-control input-lg"
                       autoFocus
                       ref={ref => {
                         this.email = ref;
                       }}
                       onKeyUp={this.emailValidateHandler}
                />
                { this.state.emailFeedBack && this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                { this.state.emailFeedBack && !this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                { this.state.emailFeedBack && !this.state.email &&
                <small className="help-block">This value is not valid</small> }
              </div>
              <div
                className={cx("mrg-t-sm form-group", this.state.passwordFeedBack && 'has-feedback', this.state.passwordFeedBack && this.state.email && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
                <label className="sr-only" htmlFor="login-password">Password</label>
                <input name="password"
                       placeholder="Password"
                       id="login-password"
                       type="password"
                       autoComplete="off"
                       required="required"
                       className="form-control input-lg"
                       ref={ref => {
                         this.password = ref;
                       }}
                       onKeyUp={this.passwordValidateHandler}
                />
                { this.state.passwordFeedBack && this.state.password &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                { this.state.passwordFeedBack && !this.state.password &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                { this.state.passwordFeedBack && !this.state.password &&
                <small className="help-block">This value is not valid</small> }
              </div>
              <input type="hidden" name defaultValue/>
              <div className="mrg-t-sm">
                <button type="submit" className="btn btn-square btn-green btn-block btn-lg">Log in</button>
              </div>
              <div className="mrg-t-sm ">
                <div className="form-group">
                  <input id="remember-me" name="remember-me" defaultChecked="checked" type="checkbox"/>
                  <label htmlFor="remember-me" className="text-small">Remember me</label>
                  <Link className="pull-right small" to="/password-reset">Forgot password?</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}
const mapDispatchToProps = {
  onFormSubmit: () => onFormSubmit(),
  doLogin: (email, password) => doLogin(email, password),
  doSignUp: (email, password) => doSignUp(email, password),
  storeLoginData: (data) => storeLoginData(data),
  storeToken: (data) => storeToken(data)
};

const mapStateToProps = (state) => ({
  counter: state.counter,
  user : state.session && state.session.user,
  authenticated: state.session.authenticated
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Login));
