/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import {connect} from 'react-redux';
import _ from 'lodash';
import  {storeLoginData, storeToken} from './../../routes/login/action/index';

class Navigation extends React.Component {
  componentDidMount(){
    console.log(localStorage);
    this.props.storeLoginData(JSON.parse(localStorage.getItem('user')));
    this.props.storeToken(JSON.parse(localStorage.getItem('token')));
  };
  render() {
    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/about">About</Link>
        <Link className={s.link} to="/contact">Contact</Link>
        <span className={s.spacer}> | </span>
        { _.isEmpty(this.props.USER_DATA) && <Link className={s.link} to="/login">Log in</Link>}
        { _.isEmpty(this.props.USER_DATA) && <span className={s.spacer}>or</span>}
        { _.isEmpty(this.props.USER_DATA) && <Link className={cx(s.link, s.highlight)} to="/register">Sign up</Link>}
        { !_.isEmpty(this.props.USER_DATA) && <Link className={cx(s.link, s.highlight)} to="/profile">Profile</Link>}
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    USER_DATA:state.user
  }
};
const mapDispatchToProps = {
  storeLoginData : (data) => storeLoginData(data),
  storeToken : (data) => storeToken(data)
};
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(s)(Navigation))
