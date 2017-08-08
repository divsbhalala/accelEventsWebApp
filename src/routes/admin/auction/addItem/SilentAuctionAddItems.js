import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SilentAuctionAddItems.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import { getItemSheetPdf, getItemCatalogPdf, getItemListCsv } from './action';
import AuctionAddItem from './../../../../components/AuctionAddItem'

class SilentAuctionAddItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
    };
  }
  getItemSheetPdf = () => {
    this.props.getItemSheetPdf(this.props.eventName+"-auction-items.pdf").then((resp) => {
    });
  };
  getItemCatalogPdf= () => {
    this.props.getItemCatalogPdf(this.props.eventName+"-auction-catalog.pdf").then((resp) => {

    });
  };
  getItemListCsv=() => {
    this.props.getItemListCsv("All Items.csv").then((resp) => {
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
                          <h1>
                                Add Silent Auction Items
                                {/*<span className="item-count-wrap xpull-right"> (<span className="item-count">{this.state.items.length}</span>)</span>*/}
                            <div className="pull-right">
                              <button className="btn btn-info btn-block save-item-btn" type="button"> &nbsp; &nbsp; Save Items &nbsp; &nbsp; </button>
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
                          <AuctionAddItem />
                          <div className="form-group operations-row">
                            <div className="row">
                              <div className="col-md-3" role="group">
                                <a data-toggle="tooltip" title="Download a PDF with a picture, description, and instructions on how to bid for each item. One item per page." onClick={this.getItemSheetPdf} href="#" className="btn btn-block btn-default mrg-b-md">Download Item Sheet PDF</a>
                              </div>
                              <div className="col-md-3" role="group">
                                <a data-toggle="tooltip" title="Download a PDF with a small picture, description, and instructions on how to bid for each item. 6 items per page." onClick={this.getItemCatalogPdf} href="#" className="btn btn-block btn-default mrg-b-md">Download Item Catalog</a>
                              </div>
                              <div className="col-md-3" role="group">
                                <a data-toggle="tooltip" title="Download a CSV file of all of your items." href="#" onClick={this.getItemListCsv} className="btn btn-block btn-default mrg-b-md">Download Item List</a>
                              </div>
                              <div className="col-md-3" role="group">
                                <a title="Click here for instructions on how to upload items from a CSV file." role="button" href="#upload-csv-modal" data-backdrop="static" data-keyboard="false" data-toggle="modal" className="btn btn-block btn-default mrg-b-md">Upload Items</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(SilentAuctionAddItems));
