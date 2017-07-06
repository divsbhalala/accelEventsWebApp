
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RafflePerformance.css';
import cx from 'classnames';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';
  
class RafflePerformance extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <div id="content-wrapper">
        <div className="row">
          <div className="col-sm-12">
            <div className="row form-group flexrow">
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
                        <div className="page-title">
                          <h1 className="page-header">Raffle Item Performance</h1>
                        </div>
                        <div className="table table-responsive">
                          <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer"><div id="DataTables_Table_0_filter" className="dataTables_filter"><label><input type="search" className placeholder="Search" aria-controls="DataTables_Table_0" /></label></div><table className="table item-performance datatable no-footer dataTable" id="DataTables_Table_0" role="grid" style={{width: 990}}>
                            <thead className="">
                            <tr role="row"><th className="show-details sorting_disabled" rowSpan={1} colSpan={1} style={{width: 58}} aria-label /><th className="sorting_asc" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 226}} aria-label="Item Name: activate to sort column descending" aria-sort="ascending">Item Name</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 168}} aria-label="Item Code: activate to sort column ascending">Item Code</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 136}} aria-label="Winner: activate to sort column ascending">Winner</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 222}} aria-label="Total Tickets: activate to sort column ascending">Total Tickets</th></tr>
                            </thead>
                            <tbody>
                            <tr role="row" className="odd"><td className=" show-details"><span className="fa-stack pointer"><i className="fa fa-circle fa-stack-2x icon-backgroundGreen" /><i className="fa fa-plus fa-stack-1x fa-lg plus-green white" /></span><span className="item-code RAF" data-item-code="RAF" /></td><td className="sorting_1">My First Raffle Item</td><td>RAF</td><td /><td>0</td></tr></tbody>
                          </table></div>
                        </div>
                        {/* Action Row */}
                        <div className="form-group operations-row">
                          <div className="row">
                            <div className="col-md-3" role="group">
                              <a href="/AccelEventsWebApp/host/item-performance/download/raffle/ticket/CSV" className="btn btn-block btn-default mrg-b-md">Download All Participant Data</a>
                            </div>
                            <div className="col-md-3" role="group">
                              <a href="/AccelEventsWebApp/host/item-performance/download/raffle/winner/CSV" className="btn btn-block btn-default mrg-b-md">Download Winner Data</a>
                            </div>
                            <div className="col-md-3" role="group">
                              <a href="/AccelEventsWebApp/host/item-performance/download/raffle/purchased/ticket/CSV" className="btn btn-block btn-default mrg-b-md">Download Raffle Purchased Data</a>
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

export default withStyles(s)(RafflePerformance);
