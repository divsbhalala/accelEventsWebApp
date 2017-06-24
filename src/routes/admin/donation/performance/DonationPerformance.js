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
import s from './DonationPerformance.css';
import cx from 'classnames';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';

class DonationPerformance extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-offset-2 col-sm-10">
            <div id="content-wrapper">
              <div className="row" style={{opacity: 1}}>
                <div className="col-lg-12">
                  <div id className="clearfix" />
                </div>
              </div>
              <div className="row" style={{opacity: 1}}>
                <div className="col-lg-12">
                  <div className="main-box no-header">
                    <div className="main-box-body clearfix">
                      <div className="page-title">
                        <h1 className="page-header">Donation Performance</h1>
                      </div>
                      <div className="table table-responsive">
                        <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer">
                          <div id="DataTables_Table_0_filter" className="dataTables_filter">
                            <input type="search" className="search-input" placeholder="Search" aria-controls="DataTables_Table_0" />
                          </div>
                        </div>
                      </div>
                      <table className="table item-performance datatable no-footer">
                        <thead>
                        <tr>
                          {/* <th></th> */}
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email Address</th>
                          <th>Phone Number</th>
                          <th>Donation Date</th>
                          <th>Donation Amount</th>
                          {/* <th>Action</th> */}
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                      {/* Action Row */}
                      <div className="form-group operations-row">
                        <div className="row">
                          <div className="col-md-4" role="group">
                            <a href="/AccelEventsWebApp/host/dashboard/download/donation-performance/CSV" className="btn btn-block btn-default mrg-b-md">Download
                              Donation Data</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(DonationPerformance);
