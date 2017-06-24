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
import cx from 'classnames';
import s from './TicketSetting.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';
import {Tabs, Tab} from 'react-bootstrap-tabs';

class TicketSetting extends React.Component {
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
                  <div className="row">
                    <div className="col-lg-12">
                      <div id className="clearfix">
                        <h1>
                          Event Registration Settings
                          <div className="pull-right">
                            <button className="btn btn-info btn-block saveSettings" type="submit" onclick="$('.main-box > .form').submit();" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">Save
                              Settings</button>
                          </div>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="main-box no-header">
                        <div className="ajax-wrap">
                          <div className="ajax-msg-box text-center" style={{display: 'none'}}>
                            <span className="fa fa-spinner fa-pulse fa-fw" />
                            <span className="resp-message" />
                          </div>
                        </div>
                        <div className="tabs-wrapper profile-tabs">
                          <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                            <Tab eventKey={1} label=" Order Form " ><div className="tab-content">
	                            <div className="tab-pane fade active in" id="order-form">
		                            <div className="attendee-information-container">
			                            <h4>Attendee Information:</h4>
			                            <div className="form-group">
				                            <div className="radio">
					                            <input type="radio" name="buyer-only" id="buyer-only" defaultValue="true" defaultChecked="checked" />
					                            <label htmlFor="buyer-only">
						                            <strong>Buyer Only</strong> (collect information from just the person purchasing tickets)
					                            </label>
				                            </div>
			                            </div>
			                            <div className="form-group">
				                            <div className="radio">
					                            <input type="radio" name="buyer-only" id="each-attendee" defaultValue="true" />
					                            <label htmlFor="each-attendee">
						                            <strong>Each Attendee</strong> (collect information from each person attending the event)
					                            </label>
				                            </div>
			                            </div>
		                            </div>
		                            <div className="table-responsive info-fields-table">
			                            <div className="text">Information to collect</div>
			                            <table className="table user-list table-hover">
				                            <thead>
				                            <tr>
					                            <th><span>Field</span></th>
					                            <th><span>Include</span></th>
					                            <th><span>Require</span></th>
					                            <th className="hide"><span>Attribute Order</span></th>
				                            </tr>
				                            </thead>
				                            <tbody>
				                            <input type="hidden" defaultValue="Prefix" className="fieldName" />
				                            <tr>
					                            <td>Prefix</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Prefix]" className="onoffswitch-checkbox" id="included-Prefix" />
							                            <label className="onoffswitch-label " htmlFor="included-Prefix">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Prefix]" className="onoffswitch-checkbox" id="required-Prefix" />
							                            <label className="onoffswitch-label" htmlFor="required-Prefix">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Prefix]" className="form-control" defaultValue={1000} id="attributeOrder-Prefix" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="First Name" className="fieldName" />
				                            <tr>
					                            <td>First Name</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" disabled="disabled" name="includedFields[First Name]" className="onoffswitch-checkbox" id="included-First Name" defaultChecked="checked" />
							                            <label className="onoffswitch-label " htmlFor="included-First Name">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" disabled="disabled" name="requiredFields[First Name]" className="onoffswitch-checkbox" id="required-First Name" defaultChecked="checked" />
							                            <label className="onoffswitch-label" htmlFor="required-First Name">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[First Name]" className="form-control" defaultValue={2000} id="attributeOrder-First Name" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Last Name" className="fieldName" />
				                            <tr>
					                            <td>Last Name</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" disabled="disabled" name="includedFields[Last Name]" className="onoffswitch-checkbox" id="included-Last Name" defaultChecked="checked" />
							                            <label className="onoffswitch-label " htmlFor="included-Last Name">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" disabled="disabled" name="requiredFields[Last Name]" className="onoffswitch-checkbox" id="required-Last Name" defaultChecked="checked" />
							                            <label className="onoffswitch-label" htmlFor="required-Last Name">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Last Name]" className="form-control" defaultValue={3000} id="attributeOrder-Last Name" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Email" className="fieldName" />
				                            <tr>
					                            <td>Email</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" disabled="disabled" name="includedFields[Email]" className="onoffswitch-checkbox" id="included-Email" defaultChecked="checked" />
							                            <label className="onoffswitch-label " htmlFor="included-Email">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" disabled="disabled" name="requiredFields[Email]" className="onoffswitch-checkbox" id="required-Email" defaultChecked="checked" />
							                            <label className="onoffswitch-label" htmlFor="required-Email">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Email]" className="form-control" defaultValue={4000} id="attributeOrder-Email" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Cell Phone" className="fieldName" />
				                            <tr>
					                            <td>Cell Phone</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Cell Phone]" className="onoffswitch-checkbox" id="included-Cell Phone" />
							                            <label className="onoffswitch-label " htmlFor="included-Cell Phone">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Cell Phone]" className="onoffswitch-checkbox" id="required-Cell Phone" />
							                            <label className="onoffswitch-label" htmlFor="required-Cell Phone">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Cell Phone]" className="form-control" defaultValue={5000} id="attributeOrder-Cell Phone" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Billing Address" className="fieldName" />
				                            <tr>
					                            <td>Billing Address</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Billing Address]" className="onoffswitch-checkbox" id="included-Billing Address" />
							                            <label className="onoffswitch-label " htmlFor="included-Billing Address">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Billing Address]" className="onoffswitch-checkbox" id="required-Billing Address" />
							                            <label className="onoffswitch-label" htmlFor="required-Billing Address">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Billing Address]" className="form-control" defaultValue={6000} id="attributeOrder-Billing Address" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Shiping Address" className="fieldName" />
				                            <tr>
					                            <td>Shiping Address</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Shiping Address]" className="onoffswitch-checkbox" id="included-Shiping Address" />
							                            <label className="onoffswitch-label " htmlFor="included-Shiping Address">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Shiping Address]" className="onoffswitch-checkbox" id="required-Shiping Address" />
							                            <label className="onoffswitch-label" htmlFor="required-Shiping Address">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Shiping Address]" className="form-control" defaultValue={7000} id="attributeOrder-Shiping Address" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Gender" className="fieldName" />
				                            <tr>
					                            <td>Gender</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Gender]" className="onoffswitch-checkbox" id="included-Gender" />
							                            <label className="onoffswitch-label " htmlFor="included-Gender">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Gender]" className="onoffswitch-checkbox" id="required-Gender" />
							                            <label className="onoffswitch-label" htmlFor="required-Gender">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Gender]" className="form-control" defaultValue={8000} id="attributeOrder-Gender" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Birthday" className="fieldName" />
				                            <tr>
					                            <td>Birthday</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Birthday]" className="onoffswitch-checkbox" id="included-Birthday" />
							                            <label className="onoffswitch-label " htmlFor="included-Birthday">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Birthday]" className="onoffswitch-checkbox" id="required-Birthday" />
							                            <label className="onoffswitch-label" htmlFor="required-Birthday">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Birthday]" className="form-control" defaultValue={9000} id="attributeOrder-Birthday" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Age" className="fieldName" />
				                            <tr>
					                            <td>Age</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Age]" className="onoffswitch-checkbox" id="included-Age" />
							                            <label className="onoffswitch-label " htmlFor="included-Age">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Age]" className="onoffswitch-checkbox" id="required-Age" />
							                            <label className="onoffswitch-label" htmlFor="required-Age">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Age]" className="form-control" defaultValue={10000} id="attributeOrder-Age" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Organization" className="fieldName" />
				                            <tr>
					                            <td>Organization</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Organization]" className="onoffswitch-checkbox" id="included-Organization" />
							                            <label className="onoffswitch-label " htmlFor="included-Organization">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Organization]" className="onoffswitch-checkbox" id="required-Organization" />
							                            <label className="onoffswitch-label" htmlFor="required-Organization">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Organization]" className="form-control" defaultValue={11000} id="attributeOrder-Organization" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Job title" className="fieldName" />
				                            <tr>
					                            <td>Job title</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Job title]" className="onoffswitch-checkbox" id="included-Job title" />
							                            <label className="onoffswitch-label " htmlFor="included-Job title">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Job title]" className="onoffswitch-checkbox" id="required-Job title" />
							                            <label className="onoffswitch-label" htmlFor="required-Job title">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Job title]" className="form-control" defaultValue={12000} id="attributeOrder-Job title" />
						                            </div>
					                            </td>
				                            </tr>
				                            </tbody>
			                            </table>
		                            </div>
		                            <div className="attendee-information-container">
			                            <h4>Embed ticketing in my website</h4>
			                            <div className="form-group">
				                            <div className="embed-event-code noselect" onclick="copyToClipboard($('.embed-event-code')[0])">
					                            &lt;iframe src="http://www.stagingaccel.com:8080/AccelEventsWebApp/events/jfbnd/embed" style="min-height: 400px; min-width: 500px; border: 1px solid #eee;"&gt;&lt;/iframe&gt;
				                            </div>
				                            <button className="btn mrg-t-lg" type="button" onclick="copyToClipboard($('.embed-event-code')[0])">Copy Code</button>
			                            </div>
		                            </div>
		                            <div className="form-group operations-row text-center">
			                            <button className="btn btn-info mrg-t-lg saveSettings" type="submit" onclick="$('.main-box > .form').submit();" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">Save
				                            Settings</button>
		                            </div>
	                            </div>
	                            <div className="tab-pane fade" id="discount-codes">
		                            <h4>Discount Codes</h4>
		                            <div className="discount-codes-container">
			                            <a data-toggle="modal" data-target="#new-code" className="btn btn-wire">
                            <span className="fa-stack">
                              <i className="fa fa-circle-thin fa-stack-2x" />
                              <i className="fa fa-plus fa-stack-1x" />
                            </span>
				                            New Code
			                            </a>
			                            <div className="table-responsive discount-codes-table-container">
				                            <div className="text">Event Specific Codes</div>
				                            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer"><div className="dataTables_length" id="DataTables_Table_0_length"><label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select> entries</label></div><table className="table table-hover discount-codes-table dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" style={{width: 0}}>
					                            <thead>
					                            <tr role="row"><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 0}} aria-label="Name: activate to sort column ascending"><span>Name</span></th><th className="text-center sorting_asc" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 0}} aria-label="Amount: activate to sort column descending" aria-sort="ascending"><span>Amount</span></th><th className="text-right sorting_disabled" rowSpan={1} colSpan={1} style={{width: 0}} aria-label="Uses"><span>Uses</span></th><th className="text-right sorting_disabled" width="1px" rowSpan={1} colSpan={1} style={{width: 0}} aria-label="Starts-Ends"><span>Starts-Ends</span></th><th width="1px" className="sorting_disabled" rowSpan={1} colSpan={1} style={{width: 0}} aria-label /></tr>
					                            </thead>
					                            <tbody>
					                            <tr className="odd"><td valign="top" colSpan={5} className="dataTables_empty">No item to show</td></tr></tbody>
				                            </table><div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a className="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx={0} tabIndex={0} id="DataTables_Table_0_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="DataTables_Table_0" data-dt-idx={1} tabIndex={0} id="DataTables_Table_0_next">Next</a></div></div>
			                            </div>
		                            </div>
	                            </div>
                            </div></Tab>
                            <Tab eventKey={2} label=" Discount Codes " ><div className="tab-content">
	                            <div className="tab-pane fade" id="order-form">
		                            <div className="attendee-information-container">
			                            <h4>Attendee Information:</h4>
			                            <div className="form-group">
				                            <div className="radio">
					                            <input type="radio" name="buyer-only" id="buyer-only" defaultValue="true" defaultChecked="checked" />
					                            <label htmlFor="buyer-only">
						                            <strong>Buyer Only</strong> (collect information from just the person purchasing tickets)
					                            </label>
				                            </div>
			                            </div>
			                            <div className="form-group">
				                            <div className="radio">
					                            <input type="radio" name="buyer-only" id="each-attendee" defaultValue="true" />
					                            <label htmlFor="each-attendee">
						                            <strong>Each Attendee</strong> (collect information from each person attending the event)
					                            </label>
				                            </div>
			                            </div>
		                            </div>
		                            <div className="table-responsive info-fields-table">
			                            <div className="text">Information to collect</div>
			                            <table className="table user-list table-hover">
				                            <thead>
				                            <tr>
					                            <th><span>Field</span></th>
					                            <th><span>Include</span></th>
					                            <th><span>Require</span></th>
					                            <th className="hide"><span>Attribute Order</span></th>
				                            </tr>
				                            </thead>
				                            <tbody>
				                            <input type="hidden" defaultValue="Prefix" className="fieldName" />
				                            <tr>
					                            <td>Prefix</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Prefix]" className="onoffswitch-checkbox" id="included-Prefix" />
							                            <label className="onoffswitch-label " htmlFor="included-Prefix">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Prefix]" className="onoffswitch-checkbox" id="required-Prefix" />
							                            <label className="onoffswitch-label" htmlFor="required-Prefix">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Prefix]" className="form-control" defaultValue={1000} id="attributeOrder-Prefix" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="First Name" className="fieldName" />
				                            <tr>
					                            <td>First Name</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" disabled="disabled" name="includedFields[First Name]" className="onoffswitch-checkbox" id="included-First Name" defaultChecked="checked" />
							                            <label className="onoffswitch-label " htmlFor="included-First Name">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" disabled="disabled" name="requiredFields[First Name]" className="onoffswitch-checkbox" id="required-First Name" defaultChecked="checked" />
							                            <label className="onoffswitch-label" htmlFor="required-First Name">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[First Name]" className="form-control" defaultValue={2000} id="attributeOrder-First Name" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Last Name" className="fieldName" />
				                            <tr>
					                            <td>Last Name</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" disabled="disabled" name="includedFields[Last Name]" className="onoffswitch-checkbox" id="included-Last Name" defaultChecked="checked" />
							                            <label className="onoffswitch-label " htmlFor="included-Last Name">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" disabled="disabled" name="requiredFields[Last Name]" className="onoffswitch-checkbox" id="required-Last Name" defaultChecked="checked" />
							                            <label className="onoffswitch-label" htmlFor="required-Last Name">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Last Name]" className="form-control" defaultValue={3000} id="attributeOrder-Last Name" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Email" className="fieldName" />
				                            <tr>
					                            <td>Email</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" disabled="disabled" name="includedFields[Email]" className="onoffswitch-checkbox" id="included-Email" defaultChecked="checked" />
							                            <label className="onoffswitch-label " htmlFor="included-Email">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" disabled="disabled" name="requiredFields[Email]" className="onoffswitch-checkbox" id="required-Email" defaultChecked="checked" />
							                            <label className="onoffswitch-label" htmlFor="required-Email">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Email]" className="form-control" defaultValue={4000} id="attributeOrder-Email" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Cell Phone" className="fieldName" />
				                            <tr>
					                            <td>Cell Phone</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Cell Phone]" className="onoffswitch-checkbox" id="included-Cell Phone" />
							                            <label className="onoffswitch-label " htmlFor="included-Cell Phone">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Cell Phone]" className="onoffswitch-checkbox" id="required-Cell Phone" />
							                            <label className="onoffswitch-label" htmlFor="required-Cell Phone">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Cell Phone]" className="form-control" defaultValue={5000} id="attributeOrder-Cell Phone" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Billing Address" className="fieldName" />
				                            <tr>
					                            <td>Billing Address</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Billing Address]" className="onoffswitch-checkbox" id="included-Billing Address" />
							                            <label className="onoffswitch-label " htmlFor="included-Billing Address">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Billing Address]" className="onoffswitch-checkbox" id="required-Billing Address" />
							                            <label className="onoffswitch-label" htmlFor="required-Billing Address">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Billing Address]" className="form-control" defaultValue={6000} id="attributeOrder-Billing Address" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Shiping Address" className="fieldName" />
				                            <tr>
					                            <td>Shiping Address</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Shiping Address]" className="onoffswitch-checkbox" id="included-Shiping Address" />
							                            <label className="onoffswitch-label " htmlFor="included-Shiping Address">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Shiping Address]" className="onoffswitch-checkbox" id="required-Shiping Address" />
							                            <label className="onoffswitch-label" htmlFor="required-Shiping Address">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Shiping Address]" className="form-control" defaultValue={7000} id="attributeOrder-Shiping Address" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Gender" className="fieldName" />
				                            <tr>
					                            <td>Gender</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Gender]" className="onoffswitch-checkbox" id="included-Gender" />
							                            <label className="onoffswitch-label " htmlFor="included-Gender">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Gender]" className="onoffswitch-checkbox" id="required-Gender" />
							                            <label className="onoffswitch-label" htmlFor="required-Gender">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Gender]" className="form-control" defaultValue={8000} id="attributeOrder-Gender" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Birthday" className="fieldName" />
				                            <tr>
					                            <td>Birthday</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Birthday]" className="onoffswitch-checkbox" id="included-Birthday" />
							                            <label className="onoffswitch-label " htmlFor="included-Birthday">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Birthday]" className="onoffswitch-checkbox" id="required-Birthday" />
							                            <label className="onoffswitch-label" htmlFor="required-Birthday">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Birthday]" className="form-control" defaultValue={9000} id="attributeOrder-Birthday" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Age" className="fieldName" />
				                            <tr>
					                            <td>Age</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Age]" className="onoffswitch-checkbox" id="included-Age" />
							                            <label className="onoffswitch-label " htmlFor="included-Age">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Age]" className="onoffswitch-checkbox" id="required-Age" />
							                            <label className="onoffswitch-label" htmlFor="required-Age">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Age]" className="form-control" defaultValue={10000} id="attributeOrder-Age" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Organization" className="fieldName" />
				                            <tr>
					                            <td>Organization</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Organization]" className="onoffswitch-checkbox" id="included-Organization" />
							                            <label className="onoffswitch-label " htmlFor="included-Organization">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Organization]" className="onoffswitch-checkbox" id="required-Organization" />
							                            <label className="onoffswitch-label" htmlFor="required-Organization">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Organization]" className="form-control" defaultValue={11000} id="attributeOrder-Organization" />
						                            </div>
					                            </td>
				                            </tr>
				                            <input type="hidden" defaultValue="Job title" className="fieldName" />
				                            <tr>
					                            <td>Job title</td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-included-field">
							                            <input type="checkbox" name="includedFields[Job title]" className="onoffswitch-checkbox" id="included-Job title" />
							                            <label className="onoffswitch-label " htmlFor="included-Job title">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td>
						                            <div className="onoffswitch onoffswitch-success onoffswitch-required-field">
							                            <input type="checkbox" name="requiredFields[Job title]" className="onoffswitch-checkbox" id="required-Job title" />
							                            <label className="onoffswitch-label" htmlFor="required-Job title">
								                            <div className="onoffswitch-inner" />
								                            <div className="onoffswitch-switch" />
							                            </label>
						                            </div>
					                            </td>
					                            <td className="hide">
						                            <div className="edit">
							                            <input type="text" name="attributeOrder[Job title]" className="form-control" defaultValue={12000} id="attributeOrder-Job title" />
						                            </div>
					                            </td>
				                            </tr>
				                            </tbody>
			                            </table>
		                            </div>
		                            <div className="attendee-information-container">
			                            <h4>Embed ticketing in my website</h4>
			                            <div className="form-group">
				                            <div className="embed-event-code noselect" onclick="copyToClipboard($('.embed-event-code')[0])">
					                            &lt;iframe src="http://www.stagingaccel.com:8080/AccelEventsWebApp/events/press/embed" style="min-height: 400px; min-width: 500px; border: 1px solid #eee;"&gt;&lt;/iframe&gt;
				                            </div>
				                            <button className="btn mrg-t-lg" type="button" onclick="copyToClipboard($('.embed-event-code')[0])">Copy Code</button>
			                            </div>
		                            </div>
		                            <div className="form-group operations-row text-center">
			                            <button className="btn btn-info mrg-t-lg saveSettings" type="submit" onclick="$('.main-box > .form').submit();" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">Save
				                            Settings</button>
		                            </div>
	                            </div>
	                            <div className="tab-pane active in" id="discount-codes">
		                            <h4>Discount Codes</h4>
		                            <div className="discount-codes-container">
			                            <a data-toggle="modal" data-target="#new-code" className="btn btn-wire">
              <span className="fa-stack">
                <i className="fa fa-circle-thin fa-stack-2x" />
                <i className="fa fa-plus fa-stack-1x" />
              </span>
				                            New Code
			                            </a>
			                            <div className="table-responsive discount-codes-table-container">
				                            <div className="text">Event Specific Codes</div>
				                            <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer"><div className="dataTables_length" id="DataTables_Table_0_length"><label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select> entries</label></div><table className="table table-hover discount-codes-table dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" style={{width: 1028}}>
					                            <thead>
					                            <tr role="row"><th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 249}} aria-label="Name: activate to sort column ascending"><span>Name</span></th><th className="text-center sorting_asc" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 317}} aria-label="Amount: activate to sort column descending" aria-sort="ascending"><span>Amount</span></th><th className="text-right sorting_disabled" rowSpan={1} colSpan={1} style={{width: 231}} aria-label="Uses"><span>Uses</span></th><th className="text-right sorting_disabled" width="1px" rowSpan={1} colSpan={1} style={{width: 50}} aria-label="Starts-Ends"><span>Starts-Ends</span></th><th width="1px" className="sorting_disabled" rowSpan={1} colSpan={1} style={{width: 1}} aria-label /></tr>
					                            </thead>
					                            <tbody>
					                            <tr className="odd"><td valign="top" colSpan={5} className="dataTables_empty">No item to show</td></tr></tbody>
				                            </table><div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a className="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx={0} tabIndex={0} id="DataTables_Table_0_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="DataTables_Table_0" data-dt-idx={1} tabIndex={0} id="DataTables_Table_0_next">Next</a></div></div>
			                            </div>
		                            </div>
	                            </div>
                            </div>
                            </Tab>
                          </Tabs>

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

export default withStyles(s)(TicketSetting);
