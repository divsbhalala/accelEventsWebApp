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
import s from './FundPerformance.css';
import cx from 'classnames';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';

class FundPerformance extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-offset-2 col-sm-10">
            <div className="row form-group flexrow">
              <div id="content-wrapper">
                <div className="row" style={{opacity: 1}}>
                  <div className="col-lg-12">
                    <div id className="clearfix">
                    </div>
                  </div>
                </div>
                <div className="row" style={{opacity: 1}}>
                  <div className="col-lg-12">
                    <div className="main-box no-header">
                      <div className="main-box-body clearfix">
                        <div id="alertmessage" />
                        <div className="page-title">
                          <h1 className="page-header">Cause Item Performance</h1>
                        </div>
                        <div className="table table-responsive">
                          <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer"><div id="DataTables_Table_0_filter" className="dataTables_filter"><label><input type="search" className placeholder="Search" aria-controls="DataTables_Table_0" /></label></div><table className="table item-performance datatable no-footer dataTable" id="DataTables_Table_0" role="grid" style={{width: 1006}}>
                            <thead className="">
                            <tr role="row"><th className="show-details sorting_disabled" rowSpan={1} colSpan={1} style={{width: 57}} aria-label /><th className="sorting_asc" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 245}} aria-label="Item Name: activate to sort column descending" aria-sort="ascending">Item Name</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 166}} aria-label="Item Code: activate to sort column ascending">Item Code</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 248}} aria-label="Total Proceeds: activate to sort column ascending">Total Proceeds</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{width: 110}} aria-label="Paid ?">Paid ?</th></tr>
                            </thead>
                            <tbody>
                            <tr role="row" className="odd"><td className=" show-details"><span className="fa-stack pointer"><i className="fa fa-circle fa-stack-2x icon-backgroundGreen" /><i className="fa fa-plus fa-stack-1x fa-lg plus-green white" /></span><span className="item-code FAN" data-item-code="FAN" /></td><td className="sorting_1">My Fund a Need Item</td><td>FAN</td><td>0</td><td><ul className="readonly-actions list-inline">  <li>    <i className="fa fa-times red" aria-hidden="true" /></li></ul></td></tr></tbody>
                          </table></div>
                        </div>
                        {/* Action Row */}
                        <div className="form-group operations-row">
                          <div className="row">
                            <div className="col-md-4" role="group">
                              <a href="/AccelEventsWebApp/host/item-performance/download/cause/donor/CSV" className="btn btn-block btn-default mrg-b-md">Download All Fund a Need Data</a>
                            </div>
                            {/* <div class="col-md-4" role="group">
                             <button class="btn btn-block btn-default">Download
                             Fund a Need Winner Data</button>
                             </div> */}
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

export default withStyles(s)(FundPerformance);
