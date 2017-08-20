
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
      emailResponseError: "",
    };

  }

  onFormClick = (e) => {
    e.preventDefault();

    if(this.email.value && this.email.value.trim() === '') {
      this.setState({
        email: false
      });
    }
    else {
      this.props.doResetPassword(this.email.value.trim()).then((resp) => {
        let data = resp && resp.data;
				this.setState({error: "Invalid Email", emailResponseError : data.message});

			}).catch(error=>{
          this.setState({
					emailResponseError : "Error while processing your request"
				})
      });
    }

  };

  validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

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
        email: this.validateEmail(this.email.value.trim())
      });
    }
    this.setState({isValidData: !!(this.email.value.trim())});

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
                         onBlur={this.emailValidateHandler}
                  />
                </div>
                { this.state.emailFeedBack && !this.state.email && <Alert bsStyle="danger">Invalid Email address</Alert>}
                { this.state.emailResponseError ? <Alert bsStyle="danger">{this.state.emailResponseError}</Alert> : ""}
                { this.state.emailSend &&
                <Alert bsStyle="success">Password reset link sent successfully, Please check your mail</Alert>}
                <input type="hidden" name defaultValue/>
                <button className="btn btn-square btn-green btn-lg" type="submit">Reset my password</button>
              </form>
              {/* /.login-form */}
            </div>
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
