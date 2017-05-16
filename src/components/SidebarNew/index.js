import React, { Component } from 'react';
// import classNames from 'classnames';
import history from '../../history';
import Link from '../Link';

class SidebarNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uiElementsCollapsed: true,
      chartsElementsCollapsed: true,
      multiLevelDropdownCollapsed: true,
      thirdLevelDropdownCollapsed: true,
      samplePagesCollapsed: true,
    };
  }

  render() {
    return (
      <div className="navbar-default sidebar" style={{ marginLeft: '-20px' }} role="navigation">
        <div className="sidebar-nav navbar-collapse collapse">
          <ul className="nav in" id="side-menu">
            <li className="sidebar-search">
              <div className="input-group custom-search-form">
                <input type="text" className="form-control" placeholder="Search..." />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <i className="fa fa-search" />
                  </button>
                </span>
              </div>
            </li>

            <li>
              <Link to="/admin" style={{color: "#333"}}>
                <i className="fa fa-dashboard fa-fw" /> &nbsp;Dashboard </Link>

            </li>

            <li>
              <Link to="/admin/design" style={{color: "#333"}}>
                <i className="fa fa-paint-brush fa-fw" /> &nbsp;Design </Link>
            </li>

            <li>
              <Link to="/admin/ticket" style={{color: "#333"}}>
                <i className="fa fa-ticket" /> &nbsp;Ticketing </Link>
            </li>

            <li>
              <Link to="/admin/auction" style={{color: "#333"}}>
                <i className="fa fa-gavel" /> &nbsp;Silent Auction</Link>
            </li>

            <li>
              <Link to="/admin/raffle" style={{color: "#333"}}><i className="fa fa-dashboard fa-fw" /> &nbsp;Raffle</Link>
            </li>

            <li>
              <Link to="/admin/fund" style={{color: "#333"}}><i className="fa fa-money fa-fw" /> &nbsp;Fund A Need</Link>
            </li>
            <li>
              <Link to="/admin/users" style={{color: "#333"}}><i className="fa fa-users" /> &nbsp;User Management</Link>
            </li>
            <li>
              <Link to="/admin/setting" style={{color: "#333"}}><i className="fa fa-cogs fa-fw" /> &nbsp;Settings</Link>
            </li>


          </ul>
        </div>
      </div>
    );
  }
}


export default SidebarNew;
