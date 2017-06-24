/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FundAddItems.css';
import cx from 'classnames';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';

class FundAddItems extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <div className="container-fluid">
          <div className="row">
            <div className="col-lg-offset-2 col-sm-10">
              <div className="row form-group flexrow">
	              <div id="content-wrapper">
		              <div className="row" style={{opacity: 1}}>
			              <div className="col-lg-12">
				              <div className="row">
					              <div className="col-lg-12">
						              <div id className="clearfix">
							              <div className>
								              <h1>Add Fund a Need Items
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
								              <p>In Fund a Need, any number of people can submit a 'bid' for a fund a need item. The price of the item does not increase with each subsequent bid.</p>
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
											              <div className="flex-col item-starting-bid-column"><span>Amount ($)</span></div>
											              <div className="flex-col item-actions-column"><span>Actions</span></div>
										              </div>
									              </div>
									              <div className="table-body prize-items ui-sortable">
										              <div className="item-row dummy ui-sortable-handle">
											              <div className="flex-row">
												              <div className="flex-col plus-sign-column"><i className="fa fa-plus edit-item fa-lg" /></div>
												              <div className="flex-col item-name-column">
													              <input type="hidden" name="id" defaultValue={0} />
													              <input type="text" className="form-control item-name" name="name" maxLength={255} />
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
																              </div>
															              </div>
															              <div className="col-md-4">
																              <div className="row">
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
										              <div data-id={2128} className="item-row ui-sortable-handle">
											              <div className="flex-row">
												              <div className="flex-col plus-sign-column"><i className="fa fa-plus edit-item fa-lg" /></div>
												              <div className="flex-col item-name-column">
													              <input type="hidden" name="id" defaultValue={2128} />
													              <input type="text" className="form-control item-name" name="name" maxLength={255} defaultValue="My Fund a Need Item" />
												              </div>
												              <div className="flex-col item-code-column">
													              <input type="text" className="form-control item-code alpha-only" name="code" defaultValue="FAN" maxLength={3} />
												              </div>
												              <div className="flex-col item-starting-bid-column">
													              <div className="input-group">
														              <span className="input-group-addon">$</span>
														              <input type="text" className="form-control item-bid" name="startingBid" defaultValue={300} />
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
																              </div>
																              <br />
																              <div className="row">
																	              <div className="col-md-6">
																		              Hide Item
																		              <div className="help-text">This is will hide item from display page</div>
																	              </div>
																	              <div className="col-md-6">
																		              <div className="onoffswitch onoffswitch-success activeswitch">
																			              <input type="checkbox" name="activeEnabled" className="onoffswitch-checkbox" id="active2128" />
																			              <label className="onoffswitch-label" htmlFor="active2128">
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
													              <i className="fa fa-trash delete-item red" />
												              </div>
											              </div>
										              </div>
									              </div>
									              <div className="form-group operations-row">
										              <div className="row">
											              <div className="col-md-3" role="group">
												              <a data-toggle="tooltip" title="Download a PDF with a picture, description, and instructions on how to submit pledges for each fund a need item. One item per page." href="/AccelEventsWebApp/host/cause-auction/export/items/PDF" className="btn btn-block btn-default mrg-b-md">Download Item Sheet PDF</a>
											              </div>
											              <div className="col-md-3" role="group">
												              <a data-toggle="tooltip" title="Download a PDF with a small picture, description, and instructions on how to submit pledges for each fund a need item. 6 items per page." href="/AccelEventsWebApp/host/cause-auction/export/catalog/PDF" className="btn btn-block btn-default mrg-b-md">Download Item Catalog</a>
											              </div>
											              <div className="col-md-3" role="group">
												              <a data-toggle="tooltip" title="Download a CSV file of all of your items." href="/AccelEventsWebApp/host/cause-auction/download/item/CSV" className="btn btn-block btn-default mrg-b-md">Download Item List</a>
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

export default withStyles(s)(FundAddItems);
