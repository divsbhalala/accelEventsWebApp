import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';
import cx from 'classnames';
import {connect} from 'react-redux';
import s from './../../routes/login/Login.css';
import Link from './../Link';
import { doLogin,doSignUp,doValidateMobileNumber} from './../../routes/event/action/index';
import {Modal, Popover, OverlayTrigger, Tooltip} from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import IntlTelInput from './../../components/IntTelInput';

class LoginPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContactPopup: false,
      showLoginPopup: false,
      isValidData: false,
      email: null,
      password: null,
      error: null,
      emailFeedBack: false,
      passwordFeedBack: false,
      phoneNumberFeedBack: false,
      errorMsgNumber: null,
      phoneNumber: false,
      phone: null,
      toggle: true,
      emailValue: null,
      countryPhone:null,
      loading:false,
    };
   }
  componentWillMount() {
    this.changePhone = this.phoneNumberValidateHandler.bind(this, 'phone');
  }
  componentWillReceiveProps(){
    this.setState({
      showContactPopup: false,
      showLoginPopup: false,
      isValidData: false,
      email: null,
      password: null,
      error: null,
      emailFeedBack: false,
      passwordFeedBack: false,
      phoneNumberFeedBack: false,
      errorMsgNumber: null,
      phoneNumber: false,
      phone: null,
      toggle: true,
      emailValue: null,
      countryPhone:null,
      loading:false,
    })
  }
  onFormClick = (e) => {
    e.preventDefault();
    this.setState({
      emailFeedBack: true,
      passwordFeedBack: true,
      phoneNumberFeedBack: true,});
    if (this.state.phoneNumber && this.state.email && this.state.password) {
      this.setState({loading:true});
      let user = {
        countryCode: this.state.countryPhone,
        email: this.email.value,
        password: this.password.value,
        phoneNumber: this.state.phone,
      };
      this.props.doSignUp(this.props.params && this.props.params.params, user).then((resp) => {
        if (!resp.errorMessage) {
          this.setState({error: "Your account has been created",loading:true});
          this.props.onCloseFunc();
        }
        else {
          this.setState({error: resp.errorMessage,loading:false});
        }
      });
    }
  };
  onFormClickLogin = (e) => {
    e.preventDefault();
    this.setState({
      emailFeedBack: true,
      passwordFeedBack: true,});
    if (this.state.email && this.state.password) {
      this.setState({loading:true});
      this.props.doLogin(this.email.value, this.password.value).then((resp) => {
        if (!resp.errorMessage) {
          this.setState({error: "Log In SuccessFully",loading:false});
          setTimeout(()=>{window.location.reload();},3000);
         // window.location.reload();
          this.props.onCloseFunc();
        }
        else {
          this.setState({error: "Invalid Email or password",loading:false});
        }

      });
    }

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
  }
  emailValidateHandler = (e) => {
    this.setState({
      emailFeedBack: true,
      emailValue:this.email.value.trim(),
    });
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.email.value && this.email.value.trim() === '') {
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

  showLoginPopup = () => {
    this.setState({
      showLoginPopup: true
    })
  };
  hideLoginPopup = () => {
    this.setState({
      showLoginPopup: false
    })
  };
  showLogin = () => {
    this.setState({
      toggle: true
    })
  };
  showRegister = () => {
    this.setState({
      toggle: false
    })
  };
  hideRegisterPopup = () => {
    this.setState({
      showLoginPopup: false,
    })
  };
  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }
  render() {
    let event = this.props.params && this.props.params.params;
    return (
      <div >
        <div className="static-modal" id={this.props.id + '-containter'}>
          <div id="login-user">
            <Modal id="login-user" show={!!this.props.showModal} onHide={this.props.onCloseFunc} dialogClassName="" >
              <Modal.Body>
                <div className="login-signup-wrap">
                  { this.state.toggle ?
                    <div className="login-signup-container login  has-cell-number ">
                      <div className="login-form" id="LoginAttempt">
                        <h1 className="text-center">Log in</h1>
                        <h4 className="text-center">
                          Or, <a className={s.link} onClick={this.showRegister}>sign up.</a>
                        </h4>
                        {this.state.error && <div id="alertmessage" className="js-notification notification-login mrg-t-md">{this.state.error}</div>}
                        <form className="ajax-form  validated fv-form fv-form-bootstrap" onSubmit={this.onFormClickLogin} autoComplete="off">
                          <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
                          <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}>
                            <span className="fa fa-spinner fa-pulse fa-fw"/>
                            <span className="resp-message"/>
                          </div>
                          <div className="js-notification notification-register mrg-t-md" style={{display: 'none'}}>
                            Looks like you don't have an account yet. Let's change that!
                            <a href="/AccelEventsWebApp/u/signup">Sign up for free.</a>
                          </div>
                          <div
                            className={cx("mrg-t-sm form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
                            <label className="sr-only" htmlFor="login-email">Email</label>
                            <input name="username"
                                   id="login-email"
                                   autoComplete="off"
                                   placeholder="Email"
                                   type="text"
                                   className="form-control input-lg"
                                   autoFocus
                                   ref={ref => {
                                     this.email = ref;
                                   }}
                                   onKeyUp={this.emailValidateHandler}
                                   onChange={this.emailValidateHandler}
                            />
                            { this.state.emailFeedBack && this.state.email &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                            { this.state.emailFeedBack && !this.state.email &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                            { this.state.emailFeedBack && !this.state.email &&
                            <small className="help-block">This value is not valid</small> }
                          </div>
                          <input type="text" style={{display:'none'}}/>
                          <input type="password" style={{display:'none'}}/>
                          <div
                            className={cx("mrg-t-sm form-group", this.state.passwordFeedBack && 'has-feedback', this.state.passwordFeedBack && this.state.email && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
                            <label className="sr-only" htmlFor="login-password">Password</label>
                            <input name="password"
                                   placeholder="Password"
                                   id="login-password"
                                   type="password"
                                   autoComplete="new-password"
                                   className="form-control input-lg"
                                   ref={ref => {
                                     this.password = ref;
                                   }}
                                   onKeyUp={this.passwordValidateHandler}
                                   onChange={this.passwordValidateHandler}
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
                            {this.state.isValidData ? <Button loading={this.state.loading}  type="submit" style={{"backgroundColor":"green"}} className="btn-green btn-square btn-block btn-lg">Log in</Button> :
                            <Button loading={this.state.loading}  type="submit" style={{"backgroundColor":"green"}} className="btn btn-green btn-square btn-block btn-lg" disabled>Log in</Button> }
                          </div>

                          <div className="mrg-t-sm ">
                            <div className="form-group">
                              <input id="remember-me" name="remember-me" defaultChecked="checked" type="checkbox"/>
                              <label htmlFor="remember-me" className="text-small">Remember me</label>
                              <Link className="pull-right small" to="/u/password-reset">Forgot password?</Link>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div> :
                    <div className="login-signup-container login has-cell-number ">
                      <div className="login-form" id="LoginAttempt">
                        <h1 className="text-center">Signup</h1>
                        <h4 className="text-center">
                          Or Already have an account? &nbsp;&nbsp;<a className={s.link} onClick={this.showLogin}> Log in</a>
                        </h4>
                        {this.state.error && <div id="alertmessage" className="js-notification notification-signup mrg-t-md">{this.state.error}</div>}
                        <form className="ajax-form  validated fv-form fv-form-bootstrap" onSubmit={this.onFormClick} autoComplete="off">
                          <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
                          <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}>
                            <span className="fa fa-spinner fa-pulse fa-fw"/>
                            <span className="resp-message"/>
                          </div>
                          <div className="js-notification notification-register mrg-t-md" style={{display: 'none'}}>
                            Looks like you don't have an account yet. Let's change that!
                            <a href="/AccelEventsWebApp/u/signup">Sign up for free.</a>
                          </div>
                          <input type="text" style={{display:'none'}}/>
                          <input type="password" style={{display:'none'}}/>
                          <div
                            className={cx("mrg-t-sm form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
                            <label className="sr-only" htmlFor="login-email">Email</label>
                            <input name="username"
                                   id="login-email"
                                   autoComplete="off"
                                   placeholder="Email"
                                   type="text"

                                   className="form-control input-lg"
                                   autoFocus
                                   ref={ref => {
                                     this.email = ref;
                                   }}
                                   onKeyUp={this.emailValidateHandler}
                                   onChange={this.emailValidateHandler}
                            />
                            { this.state.emailFeedBack && this.state.email &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                            { this.state.emailFeedBack && !this.state.email &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                            { this.state.emailFeedBack && !this.state.email &&
                            <small className="help-block">This value is not valid</small> }
                          </div>
                          <div
                            className={cx("form-group", this.state.phoneNumberFeedBack && 'has-feedback', this.state.phoneNumberFeedBack && this.state.phoneNumber && 'has-success', this.state.phoneNumberFeedBack && (!this.state.phoneNumber) && 'has-error')}>
                            <label className="control-label">Cell Number</label>
                            <div className="input-group">
                              <div className="input-group-addon">
                                <i className="fa fa-phone" aria-hidden="true"/>
                              </div>
                              <IntlTelInput
                                css={['intl-tel-input', 'form-control intl-tel']}
                                utilsScript="./libphonenumber.js"
                                defaultCountry={this.props.country || ""}
                                separateDialCode={true}
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
                          <div
                            className={cx("mrg-t-sm form-group", this.state.passwordFeedBack && 'has-feedback', this.state.passwordFeedBack && this.state.email && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
                            <label className="sr-only" htmlFor="login-password">Password</label>
                            <input name="password"
                                   placeholder="Password"
                                   id="login-password"
                                   type="password"
                                   autoComplete="new-password"
                                   className="form-control input-lg"
                                   ref={ref => {
                                     this.password = ref;
                                   }}
                                   onKeyUp={this.passwordValidateHandler}
                                   onChange={this.passwordValidateHandler}
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
                            <Button loading={this.state.loading}  type="submit" bsStyle="link" className="btn-green btn-square btn-block btn-lg"> SIGN UP </Button>
                          </div>
                          <p className="mrg-t-md small text-center">
                            By signing up, I agree to Accelevent&#39;s <a href="/AccelEventsWebApp/tos" target="_blank">terms of
                            service</a>, <a href="/AccelEventsWebApp/privacypolicy" target="_blank">privacy policy</a>, and <a
                            href="/AccelEventsWebApp/cookies" target="_blank">cookie policy</a>.
                          </p>
                        </form>
                      </div>
                    </div> }
                </div>
              </Modal.Body>
              {this.props.modelFooter && <Modal.Footer>
                {this.props.modelFooter}

              </Modal.Footer>}
            </Modal>
          </div>
        </div>
      </div>
    )
  };
}

const mapDispatchToProps = {
  doSignUp: (eventUrl, userData) => doSignUp(eventUrl, userData),
  doLogin: (email, password, rememberme) => doLogin(email, password, rememberme),
  doValidateMobileNumber: (mobileNumber) => doValidateMobileNumber(mobileNumber),
};

const mapStateToProps = (state) => ({
  isVolunteer : state.event && state.event.is_volunteer,
  user : state.session && state.session.user,
  authenticated : state.session && state.session.authenticated,
  stripeKey: state.event && state.event.data && state.event.data.stripeKey,
	country: state.location && state.location.data && state.location.data.country && state.location.data.country.toLowerCase(),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(LoginPopup));
