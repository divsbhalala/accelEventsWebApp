
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FundPerformance.css';
import cx from 'classnames';
import {BootstrapTable, TableHeaderColumn,ButtonGroup} from 'react-bootstrap-table';
import {getPerformancefundANeedItem,getPerformancefundANeedItemCSV} from './action';
import {connect} from 'react-redux';

class FundPerformance extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      showPopup: false,
      loading:false,
      message:null,
    }
  }
  getPerformancefundANeedItemCSV = () => {
    this.props.getPerformancefundANeedItemCSV().then((resp) => {
    });
  }
  componentWillMount() {
    this.props.getPerformancefundANeedItem().then(resp => {
      console.log("resp", resp);
      this.setState({
        items: resp,
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
    function priceFormate(cell, row){
      return  "$"+ cell.toFixed(2);
    }

    return (
      <div id="content-wrapper" className="admin-content-wrapper">
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
                        <div id="alertmessage" />
                        <div className="page-title">
                          <h1 className="page-header">Cause Item Performance</h1>
                        </div>
                        <br/>
                        <div id="DataTables_Table_1_wrapper" >
                          {this.state.items &&
                          <BootstrapTable data={this.state.items} striped hover search  pagination={ true }  tableHeaderClass='item-performance-page' options={ options }>
                            <TableHeaderColumn  isKey={true} dataField='itemName'>Item Name</TableHeaderColumn>
                            <TableHeaderColumn  dataField='itemCode' >Item Code</TableHeaderColumn>
                            <TableHeaderColumn  dataField='processed' >Processed</TableHeaderColumn>
                            <TableHeaderColumn  dataField='paid'>Paid</TableHeaderColumn>
                          </BootstrapTable>
                          }
                        </div>
                        {/* Action Row */}
                        <div className="form-group operations-row">
                          <div className="row">
                            <div className="col-md-4" role="group">
                              <a onClick={this.getPerformancefundANeedItemCSV} className="btn btn-block btn-default mrg-b-md">Download All Fund a Need Data</a>
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
    );
  }
}


const mapDispatchToProps = {
  getPerformancefundANeedItem: () => getPerformancefundANeedItem(),
  getPerformancefundANeedItemCSV: () => getPerformancefundANeedItemCSV(),
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(FundPerformance));

