
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TicketPerformance.css';
import cx from 'classnames';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';

class TicketPerformance extends React.Component {
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
                  <div id className="clearfix">
                  </div>
                </div>
              </div>
              <div className="row" style={{opacity: 1}}>
                <div className="col-lg-12">
                  <div className="main-box no-header">
                    <div className="main-box-body clearfix">
                      <div className="page-title">
                        <h1 className="page-header">Ticket Sales Performance</h1>
                      </div>
                      <div className="post-page-header" />
                      <div className="grossSales">
                        <strong>Gross Sales</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <strong><span className="sales">$0.00</span></strong>
                      </div>
                      <div className="table table-responsive">
                        <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer"><div className="dataTables_length" id="DataTables_Table_0_length"><label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select> entries</label></div><div id="DataTables_Table_0_filter" className="dataTables_filter"><label><input type="search" className placeholder="Search" aria-controls="DataTables_Table_0" /></label></div><table className="table sales-by-tickettype datatable no-footer dataTable" id="DataTables_Table_0" role="grid" style={{width: 990}}>
                          <thead className="">
                          <tr role="row"><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 202}} aria-label="Ticket Type: activate to sort column ascending">Ticket Type</th><th className="sorting_asc" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 114}} aria-label="Price: activate to sort column descending" aria-sort="ascending">Price</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{width: 106}} aria-label="Sold">Sold</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 137}} aria-label="Status: activate to sort column ascending">Status</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{width: 251}} aria-label="Sales End Date">Sales End Date</th></tr>
                          </thead>
                          <tbody>
                          <tr className="odd"><td valign="top" colSpan={5} className="dataTables_empty">No item to show</td></tr></tbody>
                        </table><div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a className="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx={0} tabIndex={0} id="DataTables_Table_0_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="DataTables_Table_0" data-dt-idx={1} tabIndex={0} id="DataTables_Table_0_next">Next</a></div></div>
                      </div>
                      <div className="table table-responsive">
                        <h4><strong>Recent Orders</strong></h4>
                        <div id="DataTables_Table_1_wrapper" className="dataTables_wrapper no-footer"><div className="dataTables_length" id="DataTables_Table_1_length"><label>Show <select name="DataTables_Table_1_length" aria-controls="DataTables_Table_1" className><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select> entries</label></div><div id="DataTables_Table_1_filter" className="dataTables_filter"><label><input type="search" className placeholder="Search" aria-controls="DataTables_Table_1" /></label></div><table className="table all-ticket-holder datatable no-footer dataTable" id="DataTables_Table_1" role="grid" style={{width: 990}}>
                          <thead className="">
                          <tr role="row"><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} style={{width: 119}} aria-label="Order #: activate to sort column ascending">Order #</th><th className="sorting_asc" tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} style={{width: 98}} aria-label="Buyer: activate to sort column descending" aria-sort="ascending">Buyer</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} style={{width: 71}} aria-label="QTY: activate to sort column ascending">QTY</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} style={{width: 91}} aria-label="Price: activate to sort column ascending">Price</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} style={{width: 145}} aria-label="Refunded: activate to sort column ascending">Refunded</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} style={{width: 83}} aria-label="Date: activate to sort column ascending">Date</th><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} style={{width: 131}} aria-label="Payment: activate to sort column ascending">Payment</th></tr>
                          </thead>
                          <tbody>
                          <tr className="odd"><td valign="top" colSpan={7} className="dataTables_empty">No item to show</td></tr></tbody>
                        </table><div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_1_paginate"><a className="paginate_button previous disabled" aria-controls="DataTables_Table_1" data-dt-idx={0} tabIndex={0} id="DataTables_Table_1_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="DataTables_Table_1" data-dt-idx={1} tabIndex={0} id="DataTables_Table_1_next">Next</a></div></div>
                      </div>
                      <div className="form-group operations-row mrg-t-lg">
                        <div className="row">
                          <div className="col-md-3" role="group">
                            <a href="/AccelEventsWebApp/host/item-performance/download/ticket/holder/CSV" className="btn btn-block btn-default mrg-b-md">Download Ticket Holder Data</a>
                          </div>
                          <div className="col-md-3" role="group">
                            <a href="/AccelEventsWebApp/host/item-performance/download/ticket/buyer/CSV" className="btn btn-block btn-default mrg-b-md">Download Ticket Buyer Data</a>
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
    );
  }
}

export default withStyles(s)(TicketPerformance);
