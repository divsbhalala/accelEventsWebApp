
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SilentAuctionAddItems.css';
import cx from 'classnames';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import {getAuctionItems, addAuctionItem, updateAuctionItem} from './../Auction';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//import {Dropdown} from 'react-bootstrap';

const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset_id';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/your_cloudinary_app_name/upload';


class BSTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: '',
      items:[]
    };
  };
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  };

  buildCategoryDropDown = () => {
    let items = [];
    let i;
    let categories = this.props.data.categories;
    for (i in categories) {
      items.push(<option key={categories[i]} value={categories[i]}>{categories[i]}</option>);
    }
    return items;
  };

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  };

  render() {
    console.log(this.props.data);
    if (this.props.data) {
        return (
            <div className="col-md-12 data-wrap">
              <div className="data">
                <div className="item-data">
                  <div className="row">
                    <div className="col-md-8">
                      <textarea rows={3} className="form-control" placeholder="Item description" name="description" defaultValue={""} />
                      <div>
                        <div id className="dropzone dz-clickable" action="/AccelEventsWebApp/host/upload">
                          <div className="dz-default dz-message">
                            <span>Drop files here to upload</span>
                          </div>
                        </div>
                        <Dropzone
                          multiple={true}
                          accept="image/*"
                          onDrop={this.onImageDrop.bind(this)} >
                          <p>Drop an image or click to select a file to upload.</p>
                        </Dropzone>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="row">
                        <div className="form-group">
                          <label htmlFor="bidIncrement">Bid Increment</label>
                          <div className="input-group">
                            <span className="input-group-addon">$</span>
                            <input className="form-control" placeholder="Increment (optional)" data-price="true" name="bidIncrement" type="number" />
                          </div>
                        </div>
                        <div className="form-group">
                          <select className="form-control" name="itemCategory">
                            <option value={0} disabled selected>-- Select Category --</option>
                            {this.buildCategoryDropDown()}
                          </select>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-md-6">
                          Hide Item
                          <div className="help-text">This is will hide item from display page</div>
                        </div>
                        <div className="col-md-6">
                          <div className="onoffswitch onoffswitch-success activeswitch">
                            <input type="checkbox" name="activeEnabled" className="onoffswitch-checkbox" id="active" />
                            <label className="onoffswitch-label" htmlFor="active">
                              <div className="onoffswitch-inner" />
                              <div className="onoffswitch-switch" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <input type="hidden" name defaultValue />
                <i className="fa fa-trash delete-item red" />
              </div>
            </div>);
        } else{
            return (<p>?</p>);
        }
  }
}



class SilentAuctionAddItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadedFileCloudinaryUrl: '',
      items:[]
		};
	};

  componentWillMount(){
    this.props.getAuctionItems().then(resp => {
      if(resp && resp.data && resp.data.items.length){
        this.setState({items:resp.data.items});
        console.log(this.state.items);
      }
      else{
        console.log(resp);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

	onImageDrop(files) {
		this.setState({
			uploadedFile: files[0]
		});

		this.handleImageUpload(files[0]);
	}
	handleImageUpload(file) {
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
			.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
			.field('file', file);

		upload.end((err, response) => {
			if (err) {
				console.error(err);
			}

			if (response.body.secure_url !== '') {
				this.setState({
					uploadedFileCloudinaryUrl: response.body.secure_url
				});
			}
		});
	}
  static propTypes = {
    title: PropTypes.string,
  };

  expandColumnComponent = ({isExpanded }) => {
    return (
      <div className="flex-col plus-sign-column text-center"> { (isExpanded ? <i className="fa fa-minus edit-item fa-lg" /> : <i className="fa fa-plus edit-item fa-lg" /> ) } </div>
    );
  };

  expandComponent = (row) => {
    return (
      <BSTable data={ row }/>
    );
  };

  isExpandableRow = (row) => {
    return true;
  };

  updateItem = (row, cellName, cellValue) => {
    if(row && row.id){
      this.props.updateAuctionItem(row.id ,row).then(resp => {
        console.log(resp);
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  addItemButton = (onClick) => {
    return (
      <InsertButton
        btnText=' &nbsp; Add Item &nbsp; '
        className='btn btn-info add-new-item mrg-b-lg'
        onClick={ () => this.handleInsertButtonClick(onClick) }/>
    );
  };

  handleInsertButtonClick = (onClick) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
    console.log('This is my custom function for InserButton click event');
    onClick();
  };

  render() {

    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: 100
      } ],
      sizePerPage: 10,
      pageStartIndex: 0,
      paginationSize: 5,
      prePage: 'Prev',
      nextPage: 'Next',
      paginationPosition: 'bottom' ,
      onAddRow: this.onInsertRow,
      insertBtn: this.addItemButton,
      expandBy: 'column'
    };
    function indexN(cell, row, enumObject, index) {
      return (<div>{index+1}</div>)
    };

    const editItem = {
      mode: 'click',
      afterSaveCell: this.updateItem
    };

    function actionCell(cell, row, enumObject, index) {
      return (<div className="flex-col text-center item-actions-column">
        <ul className="list-inline">
          <li><i className="fa fa-2x fa-image red edit-item" /></li>
          <li><i className="fa fa-2x fa-file-o red edit-item" /></li>
        </ul>
      </div>)
    };

    return (
      <div id="content-wrapper" className="admin-content-wrapper">
          <div className="row">
            <div className="col-sm-12">
              <div className="row form-group flexrow">
                <div className="row" style={{opacity: 1}}>
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-12">
                          <div id className="clearfix">
                            <div className>
                              <h1>
                                Add Silent Auction Items
                                <span className="item-count-wrap xpull-right"> (<span className="item-count">{this.state.items.length}</span>)</span>
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
                              <p>Add the items that will be available at your silent
                                auction. There are not limits on the number of items which you
                                can add. Attendees will submit bids for an item by replying to
                                the event text message number with the 3 letter item code
                                followed by the dollar amount they would like to place for that
                                item. After their first bid they will be asked to confirm their
                                bid by replying to the text message with their first and last
                                name.</p>
	                            {/*<Dropzone
		                            multiple={true}
		                            accept="image/*"
		                            onDrop={this.onImageDrop.bind(this)}>
		                            <p>Drop an image or click to select a file to upload.</p>
	                            </Dropzone>*/}

                              <div className="ajax-wrap">
                                <div className="ajax-msg-box text-center" style={{display: 'none'}}>
                                  <span className="fa fa-spinner fa-pulse fa-fw" />
                                  <span className="resp-message" />
                                </div>
                              </div>

                              <div className="table prizes-table">
                              { this.state.items && this.state.items.length &&
                              <BootstrapTable data={ this.state.items } search  pagination={ true }
                                              insertRow={ true } options={ options }
                                              expandableRow={ this.isExpandableRow }
                                              expandComponent={ this.expandComponent }
                                              cellEdit={ editItem }
                                              expandColumnOptions={{
                                                expandColumnVisible: true,
                                                expandColumnComponent: this.expandColumnComponent,
                                                columnWidth: 50
                                              }}>
                                <TableHeaderColumn isKey dataField='id' dataFormat={indexN}>No</TableHeaderColumn>
                                <TableHeaderColumn dataField='name' expandable={ false }>Item Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='code' expandable={ false }>Item Code</TableHeaderColumn>
                                <TableHeaderColumn dataField='startingBid' expandable={ false }>Starting Bid</TableHeaderColumn>
                                <TableHeaderColumn dataField='buyItNowPrice' expandable={ false }>Buy It Now Price</TableHeaderColumn>
                                <TableHeaderColumn dataField='' editable={ false } dataFormat={actionCell}>Action</TableHeaderColumn>
                              </BootstrapTable>}
                              </div>

                              <div className="form-group operations-row">
                                <div className="row">
                                  <div className="col-md-3" role="group">
                                    <a data-toggle="tooltip" title="Download a PDF with a picture, description, and instructions on how to bid for each item. One item per page." href="/AccelEventsWebApp/host/silent-auction/export/items/PDF" className="btn btn-block btn-default mrg-b-md">Download Item Sheet PDF</a>
                                  </div>
                                  <div className="col-md-3" role="group">
                                    <a data-toggle="tooltip" title="Download a PDF with a small picture, description, and instructions on how to bid for each item. 6 items per page." href="/AccelEventsWebApp/host/silent-auction/export/catalog/PDF" className="btn btn-block btn-default mrg-b-md">Download Item Catalog</a>
                                  </div>
                                  <div className="col-md-3" role="group">
                                    <a data-toggle="tooltip" title="Download a CSV file of all of your items." href="/AccelEventsWebApp/host/silent-auction/download/item/CSV" className="btn btn-block btn-default mrg-b-md">Download Item List</a>
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
  getAuctionItems : () => getAuctionItems(),
  addAuctionItem : (auctionDTO) => getAuctionItems(auctionDTO),
  updateAuctionItem : (id, auctionDTO) => updateAuctionItem(id, auctionDTO)
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(SilentAuctionAddItems));
