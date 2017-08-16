
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FundAddItems.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import { getItemSheetPdf, getItemCatalogPdf, getItemListCsv } from './action';
import FundNeedAddItem from './../../../../components/FundAddItem'

class FundAddItems extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSuccess: false
    };
    this.showLoading = this.showLoading.bind(this);
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
  }
  showSuccessMessage = ()=>{
    this.setState({
      isLoading: true,
    },()=>{
      setTimeout(()=>{
        this.setState({
          isLoading: false,
          isSuccess: true
        }, ()=>{
          setTimeout(()=>{
            this.setState({
              isSuccess: false
            })
          }, 4000)
        });
      },3000)
    });
  };
  getItemSheetPdf = () => {
    this.props.getItemSheetPdf(this.props.eventName+'-causeauction-items.pdf').then((resp) => {
    });
  };
  getItemCatalogPdf= () => {
    this.props.getItemCatalogPdf(this.props.eventName+'-causeauction-catalog.pdf').then((resp) => {

    });
  };
  getItemListCsv=() => {
    this.props.getItemListCsv('All items.csv').then((resp) => {
    });
  };

  render() {
    return (
      <div id="content-wrapper" className="admin-content-wrapper">
        <div className="row">
          <div className="col-sm-12">
            <div className="row form-group flexrow">
              <div className="row" style={{ opacity: 1 }}>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12">
                      <div id className="clearfix">
                        <div className>
                          <h1>Add Fund a Need Items
									              <span className="item-count-wrap xpull-right"> </span >
                            <div className="pull-right">
                              <button onClick={this.showSuccessMessage} className="btn btn-info btn-block save-item-btn" type="button"> &nbsp; &nbsp; Save Items &nbsp; &nbsp; </button>
                            </div>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="main-box no-header">
                        <div className="main-box-body clearfix">

                          <div className="row">
                            <div className="table prizes-table">

                              <div className="table-body prize-items ui-sortable">
                                <FundNeedAddItem isLoading={this.state.isLoading}  isSuccess={this.state.isSuccess}/>
                              </div>
                              <div className="form-group operations-row">
                                <div className="row">
                                  <div className="col-md-3" role="group">
                                    <a data-toggle="tooltip" title="Download a PDF with a picture, description, and instructions on how to submit pledges for each fund a need item. One item per page." href="#" onClick={this.getItemSheetPdf} className="btn btn-block btn-default mrg-b-md">Download Item Sheet PDF</a>
                                  </div>
                                  <div className="col-md-3" role="group">
                                    <a data-toggle="tooltip" title="Download a PDF with a small picture, description, and instructions on how to submit pledges for each fund a need item. 6 items per page." href="#"  onClick={this.getItemCatalogPdf} className="btn btn-block btn-default mrg-b-md">Download Item Catalog</a>
                                  </div>
                                  <div className="col-md-3" role="group">
                                    <a data-toggle="tooltip" title="Download a CSV file of all of your items." href="#"  onClick={this.getItemListCsv} className="btn btn-block btn-default mrg-b-md">Download Item List</a>
                                  </div>
                                  <div className="col-md-3" role="group">
                                    <a title="Click here for instructions on how to upload items from a CSV file." role="button" href="#upload-csv-modal" data-toggle="modal" className="btn btn-block btn-default mrg-b-md">Upload Items</a>
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
            </div>

          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  getItemListCsv: (name) => getItemListCsv(name),
  getItemCatalogPdf: (name) => getItemCatalogPdf(name),
  getItemSheetPdf: (name) => getItemSheetPdf(name),

};

const mapStateToProps = state => ({
	currencySymbol : (state.host && state.host.currencySymbol) || "$",
  eventName : (state.host && state.host.eventDetails && state.host.eventName ) || "file"
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(FundAddItems));

