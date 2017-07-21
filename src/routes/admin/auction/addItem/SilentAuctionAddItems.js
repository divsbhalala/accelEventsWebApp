import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SilentAuctionAddItems.css';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import {getAuctionItems, addAuctionItem, updateAuctionItem, getAuctionCategories, getGeneralSettings, getItemCatalog, removeItem, getItemsPDF, getItemsCSV} from './../Auction';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ToggleSwitch from '../../../../components/Widget/ToggleSwitch';
import CKEditor from 'react-ckeditor-wrapper';
import {Modal ,Button, Alert} from 'react-bootstrap';
import {apiUrl as API_URL} from './../../../../clientConfig';

const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset_id';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/your_cloudinary_app_name/upload';

class SilentAuctionAddItems extends React.Component {
	constructor(props) {
		super(props);
      this.state = {
			uploadedFileCloudinaryUrl: '',
      items:[],
      alertVisible: false,
      alertMessage:null,
      alertType:null,
      item:{},
      itemCategories : [],
      settings:{},
      showModal : false,
      showDeleteModal : false,
      itemToDelete : {},
      currentPage : 1,
      sizePerPage : 5,
      showLoader : false
		};
	};

	getItems = (page, size) => {
    this.props.getAuctionItems(page, size).then(resp => {
      if(resp && resp.data){
        this.setState({items:resp.data.items, showLoader:false});
        console.log(this.state.items);
      }
      else{
        console.log(resp);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

	getSettings = () =>{
    this.props.getGeneralSettings().then(resp => {
      console.log(resp);
      if(resp && resp.data){
        this.setState({settings:resp.data});
      }
      else{
        console.log(resp);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

	getItemCategories = () => {
    this.props.getAuctionCategories().then(resp=> {
      if(resp && resp.data){
        this.setState({itemCategories : resp.data.itemCategories});
      }
      else{
        console.log(resp);
      }
    }).catch(error=>{
      console.log(error);
    })
  };
  deleteItem = (id) => {
    if(id) {
      this.props.removeItem(id).then(resp => {
        if (resp && resp.data) {
          this.closeDeleteItemModal();
          this.onPageChange(this.state.currentPage, this.state.sizePerPage);
          this.handleAlertShow(resp.data.message, 'success');
        }
        else {
          console.log(resp);
        }
      }).catch(error => {
        console.log(error);
      })
    } else {
      console.log("id is undefined");
    }
  };
  openUploadItemModal = () => {
    this.setState({ showModal: true });
  };
  closeUploadItemModal = () => {
    this.setState({ showModal: false });
  };
  openDeleteItemModal = (row) => {
    this.setState({ showDeleteModal: true, itemToDelete:row });
  };
  closeDeleteItemModal = () => {
    this.setState({ showDeleteModal: false, itemToDelete:{}});
  };
  componentWillMount() {
    this.getSettings();
    const currentIndex = (this.state.currentPage - 1) * this.state.sizePerPage;
    this.getItems(currentIndex, currentIndex + this.state.sizePerPage);
    this.getItemCategories();
  };
  updateContent = (row, value) => {
    if(value){
      row.description = value;
      this.updateItem(row);
      return value;
    }
  };

  updateCategory = (e) =>{
    let selected = e.nativeEvent.target;
    let item = this.state.item;
    item.category = selected[selected.selectedIndex].text;
    this.setState({item});
    this.updateItem(item);
  };
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  };

  onItemCSVDrop(files) {
    this.setState({
      uploadedCSV: files[0]
    });
    this.handleItemUpload(files[0]);
  };

  buildCategoryDropDown = (row) => {
    let items = [];
    for (let i in row.categories) {
      items.push(<option key={row.categories[i]} value={row.categories[i]}>{row.categories[i]}</option>);
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

  handleItemUpload(file) {
    let upload = request.post(API_URL,{Authorization: localStorage.getItem('token')})
      //.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      else{
        console.log(response);
      }
    });
  };

  handleAlertDismiss = () => {
    this.setState({alertVisible: false});
  };

  handleAlertShow = (alertMessage,alertType) => {
    this.setState({alertVisible: true, alertMessage,alertType});
    setTimeout(function() { this.setState({alertVisible: false}); }.bind(this), 2000);
  };

  static propTypes = {
    title: PropTypes.string,
  };

  onPageChange = (page, sizePerPage) => {
    const currentIndex = (page - 1) * sizePerPage;
    this.setState({ currentPage: page, showLoader:true });
    this.getItems(currentIndex, currentIndex + sizePerPage);
  }

  onSizePerPageList = (sizePerPage) => {
    const currentIndex = (this.state.currentPage - 1) * sizePerPage;
    this.setState({ sizePerPage: sizePerPage, showLoader:true });
    this.getItems(currentIndex, currentIndex + sizePerPage);

  };

  expandColumnComponent = ({isExpanded }) => {
    return (
      <div className="flex-col plus-sign-column text-center"> { (isExpanded ? <i className="fa fa-minus edit-item fa-lg" /> : <i className="fa fa-plus edit-item fa-lg" /> ) } </div>
    );
  };

  expandComponent = (row) => {
    return (
      <div className="data-wrap">
        <div className="data">
          <div className="item-data">
            <div className="row">
              <div className="col-md-8">
                <CKEditor value={row.description} onChange={this.updateContent.bind(this, row)} />
                <div>
                  <Dropzone
                    multiple={true}
                    accept="image/*"
                    onDrop={this.onImageDrop.bind(this)}>
                    <div className="dz-default dz-message">
                      <span>Drop files here to upload</span>
                    </div>
                  </Dropzone>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="form-group">
                    <label htmlFor="bidIncrement">Bid Increment</label>
                    <div className="input-group">
                      <span className="input-group-addon">{this.state.settings.currencySymbol}</span>
                      <input className="form-control" placeholder="Increment (optional)" defaultValue={row.bidIncrement} data-price="true" name="bidIncrement" type="number" />
                    </div>
                  </div>
                  <div className="form-group">
                    <select className="form-control" name="itemCategory"  defaultValue={row.category} onChange={this.updateCategory}>
                      <option value={0} disabled>-- Select Category --</option>
                      {this.buildCategoryDropDown(row)}
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
                    <ToggleSwitch name="categoryEnabled" id="categoryEnabled"
                      defaultValue={row.active} className="success"
                      onChange={()=>{ row.active = !row.active; this.updateItem(row)}}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <i className="fa fa-2x fa-trash delete-item red" onClick={() => this.openDeleteItemModal(row)}/>
        </div>
      </div>);
  };

  isExpandableRow = (row) => {
    return true;
  };

  updateItem = (row, cellName, cellValue) => {
    row[cellName] = cellValue;
    console.log(row);
    if(row && row.id){
      this.props.updateAuctionItem(row.id ,row).then(resp => {
        if(resp && resp.data)
          this.handleAlertShow(resp.data.message, 'success');
        else
          console.log("Invalid response");
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  addItemButton = (onClick) => {
    return (<InsertButton btnText=' &nbsp; Add Item &nbsp; ' className='btn btn-info add-new-item mrg-b-lg'/>);
  };

  buyItNowPriceValidator = (value, row) => {
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
    if (!value) {
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Buy It Now Price can\'t be empty!';
      response.notification.title = '';
    }
    else if(isNaN(value)){
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Buy it now price bid must be digit!';
      response.notification.title = '';
    }
    else if(value < row.startingBid){
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Buy it now price must be greater than Starting Bid';
      response.notification.title = '';
    }
    return response;
  };

  itemNameValidator = (value, key) => {
    console.log(value);
    console.log(key);
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
    if(value == null || value==''){
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Item name can\'t be empty!';
      response.notification.title = '';
    }
    return response;
  };

  itemCodeValidator = (value, key) => {
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
    if(value == null || value==''){
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Item code can\'t be empty!';
      response.notification.title = '';
    } else if(value.length < 3) {
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Minimum 3 characters';
      response.notification.title = '';
    } else if(!isNaN(value)){
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Item code can\'t contain numbers!';
      response.notification.title = '';
    } else if(value.length > 3) {
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Item code can only have 3 characters!';
      response.notification.title = '';
    }
    return response;
  };

  startingBidValidator = (value, row) => {
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
    if(value == null || value==''){
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Starting bid can\'t be empty!';
      response.notification.title = '';
    }
    else if(isNaN(value)){
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Starting bid must be digit!';
      response.notification.title = '';
    }
    else if(value >  row.buyItNowPrice){
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Buy it now price must be greater than Starting Bid';
      response.notification.title = '';
    }
    return response;
  };

  currencyFormatter = (cell) => {
    return <p> {this.state.settings.currencySymbol} {cell}</p>;
  };

  addNewItem = (columns, validateState, ignoreEditable) => {
    return (
      <AddItem columns={ columns } validateState={ validateState } ignoreEditable={ ignoreEditable }/>
    );
  };

  getCategories = () => {
    let categories = ['-- Select Category --'];
    let itemCategories = this.state.itemCategories;
    for (let i in itemCategories){
      if(itemCategories[i] && itemCategories[i].name)
        categories.push(itemCategories[i].name);
      else
        console.log("invalid name");
    }
    return categories;
  };

  /*customNameField = (column, attr, editorClass, ignoreEditable) => {
    let defaultValue = false;
    return (<ToggleSwitch name="active" id="active" ref={ attr.ref } className={'${editorClass}'} { ...attr } defaultValue={defaultValue} onChange={()=>{ defaultValue = !defaultValue}}/>);
  };*/

  onAfterInsertRow = (row) => {
    row.id=0;
    row.categories = this.getCategories;
    console.log(row);
    this.props.addAuctionItem(row).then(resp => {
      this.onPageChange(this.state.currentPage, this.state.sizePerPage);
    }).catch((error) => {
      console.log(error);
    });

  };

  createCustomModalFooter = (closeModal, save) => {
    return (<InsertModalFooter beforeSave={ this.beforeSave }/>);
  };
  createCustomModalHeader = (closeModal, save) => {
    return (
    <InsertModalHeader  title='Add Silent Auction Item' />);
  };

  render() {

    const options = {
      page: this.state.currentPage,  // which page you want to show as default
      sizePerPageList: [{text: '5', value: 5},{text: '10', value: 10},{text: 'All', value: 100}],
      sizePerPage: this.state.sizePerPage,
      pageStartIndex: 1,
      prePage: 'Prev',
      nextPage: 'Next',
      paginationPosition: 'bottom',
      insertBtn: this.addItemButton,
      expandBy: 'column',
      afterInsertRow: this.onAfterInsertRow,
      insertModalFooter: this.createCustomModalFooter,
      insertModalHeader: this.createCustomModalHeader,
      onPageChange: this.onPageChange,
      onSizePerPageList: this.onSizePerPageList
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
                              <div className="ajax-wrap text-center">
                                {this.state.showLoader && <i className="fa fa-3x fa-spinner fa-spin"></i>}
                                { this.state.alertVisible &&
                                  <Alert bsStyle={this.state.alertType} onDismiss={this.handleAlertDismiss}>
                                    <h4>{this.state.alertMessage}</h4>
                                  </Alert>
                                }
                              </div>
                              <div className="table prizes-table">

                              { this.state.items &&
                              <BootstrapTable data={ this.state.items } pagination={ true }
                                              insertRow={ true } options={ options } expandableRow={ this.isExpandableRow }
                                              expandComponent={ this.expandComponent } fetchInfo={ { dataTotalSize: 500 } }
                                              cellEdit={ editItem } remote={true}
                                              expandColumnOptions={{ expandColumnVisible: true, expandColumnComponent: this.expandColumnComponent }}>
                                <TableHeaderColumn isKey dataField='id'  editable={false} hiddenOnInsert={true}  dataFormat={indexN} autoValue = {true}>No</TableHeaderColumn>
                                <TableHeaderColumn dataField='name' expandable={ false } editable={{validator:this.itemNameValidator}}>Item Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='code' expandable={ false } editable={{validator:this.itemCodeValidator}}>Item Code</TableHeaderColumn>
                                <TableHeaderColumn dataField='startingBid' expandable={ false } dataFormat={this.currencyFormatter} editable={{validator:this.startingBidValidator}}>Starting Bid</TableHeaderColumn>
                                <TableHeaderColumn dataField='buyItNowPrice' expandable={ false } dataFormat={this.currencyFormatter} editable={{validator : this.buyItNowPriceValidator}}>Buy It Now Price</TableHeaderColumn>
                                <TableHeaderColumn dataField='' editable={ false } hiddenOnInsert={true} dataFormat={actionCell}>Action</TableHeaderColumn>
                                <TableHeaderColumn dataField='category' hidden={true} editable={ { type: 'select', options: { values: this.getCategories() } } }>Category</TableHeaderColumn>
                                {/*<TableHeaderColumn dataField='active' hidden={true} customInsertEditor={ { getElement: this.customNameField } }>Active</TableHeaderColumn>*/}
                                <TableHeaderColumn dataField='active' hidden={true} editable={ { type: 'checkbox', options: { values: 'true:false' }}}>Active</TableHeaderColumn>
                                <TableHeaderColumn dataField='bidIncrement' hidden={true} editable={ { type: 'number'}}>Bid Increment</TableHeaderColumn>
                                <TableHeaderColumn dataField='description' hidden={true} editable={ { type: 'textarea'}}>Description</TableHeaderColumn>
                              </BootstrapTable>}
                                {/*<RemoteStorePaging sizePerPage={ 5 }/>*/}
                              </div>

                              <div className="form-group operations-row">
                                <div className="row">
                                  <div className="col-md-3" role="group">
                                    <a data-toggle="tooltip" title="Download a PDF with a picture, description, and instructions on how to bid for each item. One item per page." href="javascript:;" onClick={ this.props.getItemsPDF} className="btn btn-block btn-default mrg-b-md">Download Item Sheet PDF</a>
                                  </div>
                                  <div className="col-md-3" role="group">
                                    <a data-toggle="tooltip" title="Download a PDF with a small picture, description, and instructions on how to bid for each item. 6 items per page." href="javascript:;" onClick={this.props.getItemCatalog} className="btn btn-block btn-default mrg-b-md">Download Item Catalog</a>
                                  </div>
                                  <div className="col-md-3" role="group">
                                    <a data-toggle="tooltip" title="Download a CSV file of all of your items." href="javascript:;" onClick={this.props.getItemsCSV} className="btn btn-block btn-default mrg-b-md">Download Item List</a>
                                  </div>
                                  <div className="col-md-3" role="group">
                                    <a title="Click here for instructions on how to upload items from a CSV file." role="button" href="javascript:;" className="btn btn-block btn-default mrg-b-md" onClick={this.openUploadItemModal}>Upload Items</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Modal show={this.state.showModal} onHide={this.closeUploadItemModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Upload Items</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div id="alert-message" class="alert hidden"></div>
                          Please click <a href="http://support.accelevents.com/event-setup/management/uploading-items-from-a-csv" class="help-link" target="_blank" >here</a> for instructions and a csv upload template.
                          <Dropzone
                            multiple={true}
                            accept="image/*"
                            onDrop={this.onItemCSVDrop.bind(this)}>
                            <div className="dz-default dz-message">
                              <span>Drop files here to upload</span>
                            </div>
                          </Dropzone>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={this.closeUploadItemModal}>Close</Button>
                        </Modal.Footer>
                      </Modal>

                      <Modal show={this.state.showDeleteModal} onHide={this.closeDeleteItemModal}>
                          <Modal.Header closeButton>
                            <Modal.Title>Delete Confirmation</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure, You want to delete Item : {this.state.itemToDelete.name} ?
                          </Modal.Body>
                          <Modal.Footer>
                            <Button bsStyle="danger" onClick={() => this.deleteItem(this.state.itemToDelete.id)}>Delete</Button>
                            <Button onClick={this.closeDeleteItemModal}>Close</Button>
                          </Modal.Footer>
                        </Modal>
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
  getAuctionItems : (page, size) => getAuctionItems(page, size),
  getAuctionCategories : () => getAuctionCategories(),
  getItemCatalog : () => getItemCatalog(),
  getItemsPDF : () => getItemsPDF(),
  getItemsCSV : () => getItemsCSV(),
  getGeneralSettings : () => getGeneralSettings(),
  addAuctionItem : (auctionDTO) => getAuctionItems(auctionDTO),
  updateAuctionItem : (id, auctionDTO) => updateAuctionItem(id, auctionDTO),
  addAuctionItem : (auctionDTO) => addAuctionItem(auctionDTO),
  removeItem : (id) => removeItem(id)
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(SilentAuctionAddItems));
