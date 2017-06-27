
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AuctionPerformance.css';
import cx from 'classnames';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';

class AuctionPerformance extends React.Component {
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
                            <h1 className="page-header">Auction Item Performance</h1>
                          </div>
                          <div className="table table-responsive">
                            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer"><div id="DataTables_Table_0_filter" className="dataTables_filter"><label><input type="search" className placeholder="Search" aria-controls="DataTables_Table_0" /></label></div><table className="table item-performance datatable no-footer dataTable" id="DataTables_Table_0" role="grid" style={{width: 990}}>
                              <thead className="">
                              <tr role="row"><th className="show-details sorting_disabled" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 39}} aria-label /><th className="sorting_asc" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 191}} aria-label="Item Name: activate to sort column descending" aria-sort="ascending">Item Name</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 127}} aria-label="Item Code: activate to sort column ascending">Item Code</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 183}} aria-label="Highest Bidder: activate to sort column ascending">Highest Bidder</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 152}} aria-label="Current Bid: activate to sort column ascending">Current Bid</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{width: 82}} aria-label="Paid ?">Paid ?</th></tr>
                              </thead>
                              <tbody>
                              <tr role="row" className="odd"><td className=" show-details"><span className="fa-stack pointer"><i className="fa fa-circle fa-stack-2x icon-backgroundGreen" /><i className="fa fa-plus fa-stack-1x fa-lg plus-green white" /></span><span className="item-code AUC" data-item-code="AUC" /></td><td className="sorting_1">My First Auction Item</td><td>AUC</td><td>-</td><td>-</td><td><ul className="readonly-actions list-inline">  <li>    <i className="fa fa-times red" aria-hidden="true" /></li></ul></td></tr></tbody>
                            </table></div>
                          </div>
                          {/* Action Row */}
                          <div className="form-group operations-row mrg-t-lg">
                            <div className="row">
                              <div className="col-md-3" role="group">
                                <a href="/AccelEventsWebApp/host/item-performance/download/auction/bidder/CSV" className="btn btn-block btn-default mrg-b-md">Download all bidder data</a>
                              </div>
                              <div className="col-md-3" role="group">
                                <a href="/AccelEventsWebApp/host/item-performance/download/auction/winner/CSV" className="btn btn-block btn-default mrg-b-md">Download Winner Data</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> {/* /.col-lg-12 */}
                  </div> {/* /.row */}
                </div>

              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AuctionPerformance);
