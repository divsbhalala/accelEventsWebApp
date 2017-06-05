/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  ProgressBar,
} from 'react-bootstrap';
import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';
import history from '../../history';
import $ from "jquery";
import SidebarNew from '../SidebarNew';
import cx from 'classnames';


const logo = require('./logo.png');


class HeaderNew extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout=()=>{
    localStorage.clear();
    history.push('/login');
  }

  render() {
      let event= this.props.params && this.props.params.params;
    return (
      <div id="header-navbar" className={cx("content turquoise-bg white")}>

        <Navbar fluid={true} style={ {margin: 0} } className={ this.props.admin && "navbar-fixed-top"}>
          <Brand>
            <span>
              { this.props.params && this.props.params.params &&
              <a href="http://www.stagingaccel.com:8080/AccelEventsWebApp/events/jkazarian8" title="Start React"
                 rel="home">{this.props.params.params}</a>}
              <button type="button" className="navbar-toggle" onClick={() => {
                toggleMenu();
              }} style={{position: 'absolute', right: 0, top: 0}}>
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
            </span>
          </Brand>
          <ul className="nav navbar-top-links navbar-right">

          <MenuItem eventKey="1">
            <i className="fa fa-at fa-fw"></i> <span className="hidden-xs"> Contact</span>
          </MenuItem>
          <MenuItem eventKey="3">
            Volunteer
          </MenuItem>
          <NavDropdown title={<span><i className="fa fa-th-list fa-fw"></i> Views</span> } id='navDropdown3'>

            <MenuItem eventKey="5" href={"/scroll/"+event+"/auction"} >
              <span> Auction Scrolling </span>
            </MenuItem>
            <MenuItem eventKey="5" href={"/scroll/"+event+"/raffle"} >
              <span> Raffle Scrolling </span>
            </MenuItem>
            <MenuItem eventKey="5" href={"/scroll/"+event+"/fund"} >
              <span> Fund a Need Scrolling </span>
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="5" href={"/goal/"+event+"/auction"} >
              <span> Auction Goal </span>
            </MenuItem>
            <MenuItem eventKey="5" href={"/goal/"+event+"/raffle"} >
              <span> Raffle Goal </span>
            </MenuItem>
            <MenuItem eventKey="5" href={"/goal/"+event+"/fund"} >
              <span> Fund a Need Goal </span>
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="5" href={"/table/"+event+"/auction"} >
              <span> Auction Table </span>
            </MenuItem>
            <MenuItem eventKey="5" href={"/table/"+event+"/raffle"} >
              <span> Raffle Table </span>
            </MenuItem>
            <MenuItem eventKey="5" href={"/table/"+event+"/fund"} >
              <span> Fund a Need Table </span>
            </MenuItem>

            <MenuItem divider/>
            <MenuItem eventKey="4" onClick={(event) => {
              history.push('/login');
            }}>
              <span> <i className="fa fa-sign-out fa-fw"/> Logout </span>
            </MenuItem>
          </NavDropdown>

            { !this.props.user && <MenuItem eventKey="8" onClick={(event) => {
              history.push('/login');
            }}>
              <i className="fa fa-user fa-fw"></i> <span className="hidden-xs"> Login</span>
            </MenuItem>}

            { !this.props.user && <MenuItem eventKey="9" onClick={(event) => {
              history.push('/signup');
            }}>
              <i className="fa fa-sign-in fa-fw"></i> <span className="hidden-xs"> Sign up</span>
            </MenuItem>}

            <MenuItem eventKey="10">
              <i className="fa fa-plus fa-fw"></i> <span className="hidden-xs"> Create Event</span>
            </MenuItem>

            {
              this.props.user && <NavDropdown title={<i className="fa fa-user fa-fw"></i> } id='navDropdown4'>
                <MenuItem eventKey="2">
                  <span> <i className="fa fa-user fa-fw"></i> User Profile </span>
                </MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey="4" onClick={this.logout}>
                  <span> <i className="fa fa-sign-out fa-fw"/> Logout </span>
                </MenuItem>
              </NavDropdown>
            }

          </ul>
          { this.props.admin && <SidebarNew />}
        </Navbar>
      </div>
    )
  };
}
function toggleMenu() {
  if ($(".navbar-collapse").hasClass('collapse')) {
    $(".navbar-collapse").removeClass('collapse');
  }
  else {
    $(".navbar-collapse").addClass('collapse');
  }
}

export default HeaderNew;
