
import React, {Component} from 'react';
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
      <div className="navbar-default sidebar" role="navigation">
        <div className="sidebar-nav navbar-collapse collapse">
          <ul className="nav in" id="side-menu">
            <li className="sidebar-search">
              <div className="input-group custom-search-form">
                <input type="text" className="form-control" placeholder="Search..."/>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <i className="fa fa-search"/>
                  </button>
                </span>
              </div>
            </li>

            <li>
              <Link to="/admin">
                <i className="fa fa-dashboard fa-fw"/> &nbsp;Dashboard </Link>

            </li>

            <li>
              <Link to="/admin/design">
                <i className="fa fa-paint-brush fa-fw"/> &nbsp;Design </Link>
            </li>

            <li>
              <Link to="/admin/ticket">
                <i className="fa fa-ticket"/> &nbsp;Ticketing </Link>
            </li>

            <li>
              <Link to="/admin/auction">
                <i className="fa fa-gavel"/> &nbsp;Silent Auction</Link>
            </li>

            <li>
              <Link to="/admin/raffle"><i className="fa fa-dashboard fa-fw"/> &nbsp;
                Raffle</Link>
            </li>

            <li>
              <Link to="/admin/fund"><i className="fa fa-money fa-fw"/> &nbsp;Fund A Need</Link>
            </li>
            <li>
              <Link to="/admin/users"><i className="fa fa-users"/> &nbsp;User Management</Link>
            </li>
            <li>
              <Link to="/admin/setting"><i className="fa fa-cogs fa-fw"/> &nbsp;Settings</Link>
            </li>


          </ul>
        </div>
      </div>
    );
  }
}
export default SidebarNew;
