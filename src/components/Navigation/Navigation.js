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
import _ from 'lodash';

class Navigation extends React.Component {

  render() {
    return (
      /*<div className={s.root} role="navigation">
        <Link className={s.link} to="/about">About</Link>
        <Link className={s.link} to="/contact">Contact</Link>
        <span className={s.spacer}> | </span>
        { _.isEmpty(this.props.user) && <Link className={s.link} to="/login">Log in</Link>}
        { _.isEmpty(this.props.user) && <span className={s.spacer}>or</span>}
        { _.isEmpty(this.props.user) && <Link className={cx(s.link, s.highlight)} to="/register">Sign up</Link>}
        { !_.isEmpty(this.props.user) && !_.isEmpty(this.props.user.token) && <Link className={cx(s.link, s.highlight)} to="/profile">Profile</Link>}
        { !_.isEmpty(this.props.user) && !_.isEmpty(this.props.user.token) && <Link className={cx(s.link, s.highlight)} to="/admin">Admin</Link>}
      </div>*/
      <nav className={cx("navbar navbar-default", s.navbarDefault)}>
        <div className="container-fluid">
          <div className="navbar-header">
            <img src="/images/accelevents-logo-black.png" alt="" className="normal-logo logo-black navbar-brand" style={{height: "60px"}} />
          </div>
        </div>
      </nav>
    );
  }
}

export default (withStyles(s)(Navigation))
