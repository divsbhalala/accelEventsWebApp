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
import s from './Login.css';
import _ from 'lodash';
import {onFormSubmit, doLogin, storeLoginData, storeToken} from './action/index';
import Link from './../../components/Link/Link';
import cx from 'classnames';

import {connect} from 'react-redux';
import { Alert} from 'react-bootstrap';
import  history from './../../history';


class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props){
    super(props);
    this.state={
      isValidData:false,
      email:null,
      password:null,
      error:null
    };

  }

  onFormClick=(e)=>{
    e.preventDefault();

    if(this.email.value == ''){
      this.setState({
        email:'error'
      });
    }

    if(this.password.value == ''){
      this.setState({
        password:'error'
      });
    }
    if(this.state.isValidData){
      this.props.doLogin(this.email.value, this.password.value ).then((resp)=>{;
        if(!resp.error){
          history.push('/');
          this.setState({error:""});
        }
        else{
          this.setState({error:"Invalid Email or password"});
        }

      });
    }

  };

  emailValidateHandler= (e)=>{

    if(this.email.value == ''){
      this.setState({
        email:'error'
      });
    }
    else{
      this.setState({
        email:null
      });
    }
    this.setState({isValidData: !!(this.email.value && this.password.value)});

  };
  passwordValidateHandler= (e)=>{

    if(this.password.value == ''){

      this.setState({
        password:'error'
      });
    }else{
      this.setState({
        password:null
      });
    }
    this.setState({isValidData: !!(this.email.value && this.password.value)});

  };

  componentDidMount(){
   /* if(localStorage.getItem('user') && localStorage.getItem('token')){
      this.props.storeLoginData(JSON.parse(localStorage.getItem('user')));
      this.props.storeToken(JSON.parse(localStorage.getItem('token')));
    }
*/
    console.log('this.props.USER_DATA', this.props.USER_DATA)
    if(!_.isEmpty(this.props.USER_DATA)){
      history.push('/');
    }
  }

  render() {
    return (
      <div className={s.loginSignupWrap}>
        <div className={s.container}>
          <h1 className={s.loginSignupWrapTitle}>{this.props.title}</h1>
          <p className="text-center">Or &nbsp;&nbsp;<Link className={s.link} to="/signup">Signup</Link></p>
          <form  onSubmit={this.onFormClick}>
            {this.state.error && <Alert bsStyle="danger" >{this.state.error}</Alert>}
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="usernameOrEmail">
                Email:
              </label>
              <input
                className={s.input}
                id="usernameOrEmail"
                type="text"
                name="usernameOrEmail"
                autoFocus
                ref={ref => { this.email = ref; }}
                onKeyUp={this.emailValidateHandler}
              />
            </div>
            <div className={s.formGroup}>
              <label className={s.label} htmlFor="password">
                Password:
              </label>
              <input
                className={s.input}
                id="password"
                type="password"
                name="password"
                ref={ref => { this.password = ref; }}
                onKeyUp={this.passwordValidateHandler}
              />
            </div>
            <div className={s.formGroup}>
              <button className={cx("btn btn-square btn-green btn-block btn-lg")} type="submit">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  onFormSubmit : () => onFormSubmit(),
  doLogin : (email, password) => doLogin(email, password),
  storeLoginData : (data) => storeLoginData(data),
  storeToken : (data) => storeToken(data)
};

const mapStateToProps = (state) => ({
  counter : state.counter,
  USER_DATA:state.USER
});

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(s)(Login));
