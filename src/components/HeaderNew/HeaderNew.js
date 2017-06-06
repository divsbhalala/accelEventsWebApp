/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import {Link} from 'react-router';
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
import PopupModel from './../PopupModal';

const logo = require('./logo.png');


class HeaderNew extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showContactPopup: false
    };
    this.logout = this.logout.bind(this);
    this.showContactPopup = this.showContactPopup.bind(this);
    this.hideContactPopup = this.hideContactPopup.bind(this);
  }

  logout = ()=> {
    localStorage.clear();
    history.push('/login');
  }
  showContactPopup = () => {
    this.setState({
      showContactPopup: true
    })
  };
  hideContactPopup = () => {
    this.setState({
      showContactPopup: false
    })
  };

  render() {
    let event = this.props.params && this.props.params.params;
    return (
      <div id="header-navbar" className={cx("content turquoise-bg white")}>

        <Navbar fluid={true} style={ {margin: 0} } className={ this.props.admin && "navbar-fixed-top"}>
          <Brand>
            <span>
              { this.props.params && this.props.params.params &&
              <a href={"/events/"+  this.props.params.params} title={this.props.params.params}
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

            <MenuItem eventKey="1" onClick={this.showContactPopup}>
              <i className="fa fa-at fa-fw"></i> <span className="hidden-xs"> Contact</span>
            </MenuItem>
            <MenuItem eventKey="3" href={'/event/'+event+'/volunteer'}>
              Volunteer
            </MenuItem>
            <NavDropdown title={<span><i className="fa fa-th-list fa-fw"></i> Views</span> } id='navDropdown3'>

              <MenuItem eventKey="5" href={"/scroll/"+event+"/auction"}>
                <span> Auction Scrolling </span>
              </MenuItem>
              <MenuItem eventKey="5" href={"/scroll/"+event+"/raffle"}>
                <span> Raffle Scrolling </span>
              </MenuItem>
              <MenuItem eventKey="5" href={"/scroll/"+event+"/fund"}>
                <span> Fund a Need Scrolling </span>
              </MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey="5" href={"/goal/"+event+"/auction"}>
                <span> Auction Goal </span>
              </MenuItem>
              <MenuItem eventKey="5" href={"/goal/"+event+"/raffle"}>
                <span> Raffle Goal </span>
              </MenuItem>
              <MenuItem eventKey="5" href={"/goal/"+event+"/fund"}>
                <span> Fund a Need Goal </span>
              </MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey="5" href={"/table/"+event+"/auction"}>
                <span> Auction Table </span>
              </MenuItem>
              <MenuItem eventKey="5" href={"/table/"+event+"/raffle"}>
                <span> Raffle Table </span>
              </MenuItem>
              <MenuItem eventKey="5" href={"/table/"+event+"/fund"}>
                <span> Fund a Need Table </span>
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
        <PopupModel
          id="contactPopup"
          showModal={this.state.showContactPopup}
          headerText="Contact"
          onCloseFunc={this.hideContactPopup}
        >
          <div className="modal-body">
            <div id="alertmessage" className="hide"/>
            <p>Let us know if you have any query. We'll respond as quick as possible.</p>
            <form className="ajax-form validated fv-form fv-form-bootstrap" id="contactForm" method="post"
                  action="http://www.stagingaccel.com:8080/AccelEventsWebApp/events/jkazarian0/contact"
                  data-onsuccess="contactFormSuccess" noValidate="novalidate">
              <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
              <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
                className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
              <div className="form-group">
                <label className="control-label">Message to Event Host</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-comment-o" aria-hidden="true"/>
                  </div>
                  <textarea rows={10} className="form-control" id="message" name="message"
                            style={{zIndex: 3, position: 'relative',  fontSize: 13, transition: 'none', background: 'transparent !important'}}
                            defaultValue={" "}/>

                </div>
              </div>
              <button type="button" className="btn btn-primary">Send Message</button>
              <button type="button" className="btn btn-danger" onClick={this.hideContactPopup}>Cancel</button>
            </form>
          </div>

        </PopupModel>
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
