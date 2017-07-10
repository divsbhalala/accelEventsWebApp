
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SilentAuctionAddItems.css';
import cx from 'classnames';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset_id';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/your_cloudinary_app_name/upload';
class SilentAuctionAddItems extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			uploadedFileCloudinaryUrl: ''
		};
	}
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

  render() {
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
                                <span className="item-count-wrap xpull-right"> (<span className="item-count">1</span>)</span>
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
	                            <Dropzone
		                            multiple={true}
		                            accept="image/*"
		                            onDrop={this.onImageDrop.bind(this)}>
		                            <p>Drop an image or click to select a file to upload.</p>
	                            </Dropzone>
                              <div className="text-left mrg-t-md">
                                <button className="btn btn-info add-new-item mrg-t-lg"> &nbsp; Add Item &nbsp; </button>
                              </div>
                              <div className="ajax-wrap">
                                <div className="ajax-msg-box text-center" style={{display: 'none'}}>
                                  <span className="fa fa-spinner fa-pulse fa-fw" />
                                  <span className="resp-message" />
                                </div>
                              </div>
                              <div className="table prizes-table">
                                <div className="table-header">
                                  <div className="flex-row">
                                    <div className="flex-col plus-sign-column" />
                                    <div className="flex-col item-name-column"><span>Item name</span></div>
                                    <div className="flex-col item-code-column"><span>Item code</span></div>
                                    <div className="flex-col item-starting-bid-column"><span>Starting Bid</span></div>
                                    <div className="flex-col item-buy-now-price-column"><span>Buy It Now Price</span></div>
                                    <div className="flex-col item-actions-column"><span>Actions</span></div>
                                  </div>
                                </div>
                                <div className="table-body prize-items ui-sortable">
                                  <div className="item-row dummy ui-sortable-handle">
                                    <div className="flex-row">
                                      <div className="flex-col plus-sign-column"><i className="fa fa-plus edit-item fa-lg" /></div>
                                      <div className="flex-col item-name-column">
                                        <input type="hidden" name="id" defaultValue={0} />
                                        <input type="text" className="form-control item-name" name="name" maxLength="255/" />
                                      </div>
                                      <div className="flex-col item-code-column">
                                        <input type="text" className="form-control item-code alpha-only" name="code" maxLength={3} />
                                      </div>
                                      <div className="flex-col item-starting-bid-column">
                                        <div className="input-group">
                                          <span className="input-group-addon">$</span>
                                          <input type="number" className="form-control item-bid" name="startingBid" />
                                        </div>
                                      </div>
                                      <div className="flex-col item-buy-now-price-column">
                                        <div className="input-group">
                                          <span className="input-group-addon">$</span>
                                          <input type="number" className="form-control item-buy-now-price" name="buyItNowPrice" placeholder="or leave blank" />
                                        </div>
                                      </div>
                                      <div className="flex-col text-center item-actions-column">
                                        <ul className="list-inline">
                                          <li>
                                            <i className="fa fa-2x fa-image edit-item" />
                                          </li>
                                          <li>
                                            <i className="fa fa-2x fa-file-o edit-item" />
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="data-wrap">
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
		                                              onDrop={this.onImageDrop.bind(this)}>
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
                                                    <option value={3508}>Travel</option>
                                                    <option value={3509}>Experiences</option>
                                                    <option value={3510}>Memorabilia</option>
                                                    <option value={3511}>Music</option>
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
                                    </div>
                                  </div>
                                  <div data-id={2127} className="item-row ui-sortable-handle">
                                    <div className="flex-row">
                                      <div className="flex-col plus-sign-column"><i className="fa fa-plus edit-item fa-lg" /></div>
                                      <div className="flex-col item-name-column">
                                        <input type="hidden" name="id" defaultValue={2127} />
                                        <input type="text" className="form-control item-name" name="name" maxLength={255} defaultValue="My First Auction Item" />
                                      </div>
                                      <div className="flex-col item-code-column">
                                        <input type="text" className="form-control item-code alpha-only" name="code" defaultValue="AUC" maxLength={3} />
                                      </div>
                                      <div className="flex-col item-starting-bid-column">
                                        <div className="input-group">
                                          <span className="input-group-addon">$</span>
                                          <input type="text" className="form-control item-bid" name="startingBid" defaultValue={300} />
                                        </div>
                                      </div>
                                      <div className="flex-col item-buy-now-price-column">
                                        <div className="input-group ">
                                          <span className="input-group-addon">$</span>
                                          <input type="number" className="form-control item-bid" name="buyItNowPrice" placeholder="or leave blank" defaultValue />
                                        </div>
                                      </div>
                                      <div className="flex-col text-center item-actions-column">
                                        <ul className="list-inline">
                                          <li>
                                            <i className="fa fa-2x fa-image edit-item" />
                                          </li>
                                          <li>
                                            <i className="fa fa-2x fa-file-o edit-item" />
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="data-wrap">
                                      <div className="data">
                                        <div className="item-data">
                                          <div className="row">
                                            <div className="col-md-8">
                                              <textarea rows={3} className="form-control summernote" placeholder="Item description" name="description" defaultValue={""} />
                                              <div>
                                                <div id className="dropzone dz-clickable" action="/AccelEventsWebApp/host/upload">
                                                  <div className="dz-default dz-message">
                                                    <span>Drop files here to upload</span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="row">
                                                <div className="form-group">
                                                  <label htmlFor="bidIncrement">Bid Increment</label>
                                                  <div className="input-group">
                                                    <span className="input-group-addon">$</span>
                                                    <input className="form-control" placeholder="Increment (optional)" data-price="true" name="bidIncrement" type="number" defaultValue={75} />
                                                  </div>
                                                </div>
                                                <div className="form-group">
                                                  <select className="form-control" name="itemCategory">
                                                    <option value={0} disabled="disabled" selected>-- Select Category --</option>
                                                    <option value={3508}>Travel</option>
                                                    <option value={3509}>Experiences</option>
                                                    <option value={3510}>Memorabilia</option>
                                                    <option value={3511}>Music</option>
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
                                                    <input type="checkbox" name="activeEnabled" className="onoffswitch-checkbox" id="active2127" />
                                                    <label className="onoffswitch-label" htmlFor="active2127">
                                                      <div className="onoffswitch-inner" />
                                                      <div className="onoffswitch-switch" />
                                                    </label>
                                                    <input type="hidden" name="activeEnabled" defaultValue="off" />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <input type="hidden" name defaultValue />
                                        <i className="fa fa-2x fa-trash delete-item red" data-has-bids="false" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
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

export default withStyles(s)(SilentAuctionAddItems);
