import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DonationPerformance.css';
import cx from 'classnames';
import {BootstrapTable, TableHeaderColumn,ButtonGroup} from 'react-bootstrap-table';
import {getPerformanceDonation,getPerformanceDonationCSV} from './action';
import {connect} from 'react-redux';
import moment from 'moment';

let selfInst;
let donationPerformanceTimeout = undefined;
class DonationPerformance extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      donation: null,
      showPopup: false,
      loading:false,
      message:null,
    };
    this.getPerformanceDonation = this.getPerformanceDonation.bind(this);
    selfInst = this;
  }
  getPerformanceDonationCSV = () => {
    this.props.getPerformanceDonationCSV('All Donation Performance Data.csv').then((resp) => {
    });
  };
  componentWillMount() {
    this.getPerformanceDonation();
  }
  getPerformanceDonation = ()=>{
    this.props.getPerformanceDonation().then(resp => {
      console.log("resp", resp);
      this.setState({
        donation: resp,
      }, ()=>{
        donationPerformanceTimeout = setTimeout(()=>{
          selfInst.getPerformanceDonation();
        }, 10000)
      });
    }).catch(error => {
      if(donationPerformanceTimeout){
        clearTimeout(donationPerformanceTimeout);
        donationPerformanceTimeout = null;
      }
    });
  }
  componentWillUnmount(){
    if(donationPerformanceTimeout){
      clearTimeout(donationPerformanceTimeout);
      donationPerformanceTimeout = null;
    }
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
      // return new Date(cell).toISOString().split('T')[0];
      let d = new Date(cell);
      return moment(d).format('YYYY-MM-DD h:mm a');
      // return (new Date(cell).toISOString().split('T')[0]+ ' ' + new Date(cell).toISOString().split('T')[1].substring(0,5))
    }
    function priceFormat(cell, row){
      return  selfInst.props.currencySymbol + cell;//.toFixed(2);
    }
   return (
      <div id="content-wrapper" className="admin-content-wrapper">
        <div className="row">
          <div className="col-sm-12">
            <div className="row" style={{opacity: 1}}>
                <div className="col-lg-12">
                  <div id className="clearfix" />
                </div>
              </div>
              <div className="row" style={{opacity: 1}}>
                <div className="col-lg-12">
                  <div className="main-box no-header">
                    <div className="main-box-body clearfix">
                      <div className="performance-table-wrap">
                        <div className="page-title">
                          <h1 className="page-header">Donation Performance</h1>
                        </div>
                        <div id="DataTables_Table_1_wrapper" >
                          {this.state.donation ?
                          <BootstrapTable data={this.state.donation} striped hover search  pagination={ true }   options={ options }>
                            <TableHeaderColumn  isKey={true} dataField='firstName'>First Name</TableHeaderColumn>
                            <TableHeaderColumn  dataField='lastName' >Last Name</TableHeaderColumn>
                            <TableHeaderColumn  dataField='email' >Email Address</TableHeaderColumn>
                            <TableHeaderColumn  dataField='phoneNumber'>Phone Number</TableHeaderColumn>
                            <TableHeaderColumn  dataField='donationDate' width="20%" dataFormat={dateFormatter}>Donation Date</TableHeaderColumn>
                            <TableHeaderColumn  dataField='donationAmount'  dataFormat={priceFormat}>Donation Amount</TableHeaderColumn>
                          </BootstrapTable> : <div className="text-center"><span className="fa fa-spinner fa-3x mrg-t-lg fa-pulse fa-fw"/></div>
                          }
                        </div>
                      </div>
                      <div className="form-group operations-row">
                        <div className="row">
                          <div className="col-md-4" role="group">
                            <a onClick={this.getPerformanceDonationCSV} className="btn btn-block btn-default mrg-b-md">Download
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
    );
  }
}


const mapDispatchToProps = {
  getPerformanceDonation: () => getPerformanceDonation(),
  getPerformanceDonationCSV: (name) => getPerformanceDonationCSV(name),
};

const mapStateToProps = (state) => ({
	currencySymbol : (state.host && state.host.currencySymbol) || "$"
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(DonationPerformance));
