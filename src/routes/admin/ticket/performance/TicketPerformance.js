
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TicketPerformance.css';
import cx from 'classnames';
import {BootstrapTable, TableHeaderColumn,ButtonGroup} from 'react-bootstrap-table';
import {getPerformanceSale,getPerformanceBuyer,
  getPerformanceBuyerCSV,getPerformanceHolderCSV} from './action';
import {connect} from 'react-redux';

let self_TicketPerformance;
class TicketPerformance extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      sales: null,
      showPopup: false,
      loading:false,
      message:null,
    }
  }
  getPerformanceBuyerCSV = () => {
    this.props.getPerformanceBuyerCSV('All ticket buyer.csv').then((resp) => {
    });
  };
  getPerformanceHolderCSV = () => {
    this.props.getPerformanceHolderCSV('All ticket holder.csv').then((resp) => {
    });
  };
  componentWillMount() {
		self_TicketPerformance = this;
    let total =0;
    this.props.getPerformanceSale().then(resp => {
      console.log("resp", resp);
      resp.map(function(value){total +=value.ticketPrice });
      this.setState({
        sales: resp,
      });
      console.log("total",total)
    }).catch(error => {
      console.log('error', error)
    });
    this.props.getPerformanceBuyer().then(resp => {
      console.log("resp", resp);
      resp.map(function(value){total +=value.orderAmount  });
      this.setState({
        order: resp,
        total: total.toFixed(2),
      })
    }).catch(error => {
      console.log('error', error)
    })
  }
  render() {
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '10', value: 10
      }, {
        text: '100', value: 100
      }], // you can change the dropdown list for size per page
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 0, // where to start counting the pages
      paginationSize: 2,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      paginationPosition: 'bottom'  // default is bottom, top and both is all available
       };
    function dateFormatter(cell, row){
      return new Date(1*cell).toUTCString();
    }
    function priceFormate(cell, row){
      return  self_TicketPerformance.props.currencySymbol + cell.toFixed(2);
    }
    function soldFormate(cell, row){
      return   cell + "/" + row.totalTickets;
    }
    return (
      <div id="content-wrapper" className="admin-content-wrapper">
        <div className="row">
          <div className="col-sm-12">
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
                        <br /><br /><br />
                      <div className="grossSales">
                        <strong>Gross Sales</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <strong><span className="sales">{self_TicketPerformance.props.currencySymbol}{this.state.total}</span></strong>
                      </div>
                      <div id="DataTables_Table_1_wrapper" >
                        {this.state.sales ?
                        <BootstrapTable data={this.state.sales} striped hover search  pagination={ true }   options={ options }>
                          <TableHeaderColumn  isKey={true} dataField='ticketTypeName'>Ticket Type</TableHeaderColumn>
                          <TableHeaderColumn  dataField='ticketPrice' dataFormat={priceFormate}>PRICE</TableHeaderColumn>
                          <TableHeaderColumn  dataField='ticketSold' dataFormat={soldFormate}>SOLD</TableHeaderColumn>
                          <TableHeaderColumn  dataField='status'>STATUS</TableHeaderColumn>
                          <TableHeaderColumn  dataField='endDate'  dataFormat={dateFormatter}>SALES END DATE</TableHeaderColumn>
                        </BootstrapTable>: <div id="app" className="loader" /> }
                     </div>
                      <div >
                        <h4><strong>Recent Orders</strong></h4>
                        <div id="DataTables_Table_1_wrapper" >
                          {this.state.order ?
                          <BootstrapTable data={this.state.order} striped hover search  pagination={ true }   options={ options }>
                            <TableHeaderColumn  isKey={true} dataField='orderNo'>#ORDER</TableHeaderColumn>
                            <TableHeaderColumn  dataField='ticketBuyerName'>BUYER</TableHeaderColumn>
                            <TableHeaderColumn  dataField='quantity'>QTY</TableHeaderColumn>
                            <TableHeaderColumn  dataField='orderAmount' dataFormat={priceFormate} >PRICE</TableHeaderColumn>
                            <TableHeaderColumn  dataField='refundedAmount' dataFormat={priceFormate}>REFUNDED</TableHeaderColumn>
                            <TableHeaderColumn  dataField='orderDate' width="20%" dataFormat={dateFormatter}>DATE</TableHeaderColumn>
                            <TableHeaderColumn  dataField='paymentMode'>PAYMENT</TableHeaderColumn>
                          </BootstrapTable>: <div id="app" className="loader" /> }
                        </div>
                      </div>
                      <div className="form-group operations-row mrg-t-lg">
                        <div className="row">
                          <div className="col-md-3" role="group">
                            <a onClick={this.getPerformanceHolderCSV} className="btn btn-block btn-default mrg-b-md">Download Ticket Holder Data</a>
                          </div>
                          <div className="col-md-3" role="group">
                            <a onClick={this.getPerformanceBuyerCSV} className="btn btn-block btn-default mrg-b-md">Download Ticket Buyer Data</a>
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


const mapDispatchToProps = {
  getPerformanceSale: () => getPerformanceSale(),
  getPerformanceBuyer: () => getPerformanceBuyer(),
  getPerformanceBuyerCSV: (name) => getPerformanceBuyerCSV(name),
  getPerformanceHolderCSV: (name) => getPerformanceHolderCSV(name),
};

const mapStateToProps = (state) => ({
	currencySymbol : (state.host && state.host.currencySymbol) || "$"
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(TicketPerformance));