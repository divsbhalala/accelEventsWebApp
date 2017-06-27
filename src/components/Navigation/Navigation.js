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
      <header className="navbar turquoise-bg" id="header-navbar">
        <div className="container">
          <a href="http://www.stagingaccel.com:8080/AccelEventsWebApp/host/dashboard/home" id="logo" className="navbar-brand">
            <img src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/6bafabd0-5f33-4dcc-a95c-602babb11761accelevents-logo-white.png" alt className="normal-logo logo-white has-custom" />
          </a>
          <div className="clearfix">
            <button className="navbar-toggle" data-target=".navbar-ex1-collapse" data-toggle="collapse" type="button">
              <span className="sr-only">Toggle navigation</span>
              <span className="fa fa-bars" />
            </button>
            <div className="nav-no-collapse navbar-left pull-left hidden-sm hidden-xs">
              <ul className="nav navbar-nav pull-left">
                <li>
                  <a className="btn" id="make-small-nav">
                    <i className="fa fa-bars" />
                  </a>
                </li>
                <li className="hide"> {/*  hidden temporarily */}
                  <div className="eventmode">
                    <span> Event Mode</span>
                    <a href="?live" className="disabled">Live</a>
                    <a href="#" className="active">Test</a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="nav-no-collapse pull-right" id="header-nav">
              <ul className="nav navbar-nav pull-right">
                <li className>
                  <a href="http://support.accelevents.com/" role="button" target="_blank">
                    <i className="fa fa-question-circle" aria-hidden="true" /> &nbsp;Help
                  </a>
                </li>
                <li className="dropdown profile-dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <img src="http://www.stagingaccel.com:8080/AccelEventsWebApp/img/user-icon-placeholder.png" alt="Jon" />
                    <span className="hidden-xs">Jon</span> <b className="caret" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-right">
                    <li><a href="/AccelEventsWebApp/u/myprofile"><i className="fa fa-user" />Profile</a></li>
                    <li><a href="/AccelEventsWebApp/u/logout"><i className="fa fa-power-off" /> Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

    );
  }
}

export default (withStyles(s)(Navigation))
