
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserManagement.css';
import cx from 'classnames';
import AdminSiderbar from '../../../components/Sidebar/AdminSidebar';

class UserManagement extends React.Component {
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
                        <div className="pull-left">
                          <ol className="breadcrumb">
                            <li><a href="<:url value=&quot;auctions/admin/users&quot; />">Home</a></li>
                            <li><a href="<:url value=&quot;auctions/admin/manage&quot; />">Manage</a></li>
                            <li className="active"><span>User Management</span></li>
                          </ol>
                          <h1>User Management</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="main-box no-header">
                        <div className="main-box-body">
                          <p>Admins and Volunteers will receive an email with instructions on how to access the system. Admins have full editing control of your dashboard account, while Volunteers will only have access to your volunteer pages. More information can be found in the <a href="http://support.accelevents.com/event-setup/management/adding-volunteers-and-admins">help center</a>.</p>
                          <div id="alertmessage" />
                          <table className="table volunteer-table">
                            <thead>
                            <tr>
                              <th className="text-center"><span>First Name</span></th>
                              <th className="text-center"><span>Last Name</span></th>
                              <th className="text-center"><span>Email</span></th>
                              <th className="text-center"><span>Permissions</span></th>
                              <th className="text-center"><span>Actions</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="dummy edit">
                              <td>
                                <input name="name" type="text" className="form-control first-name" required />
                                <span className="value" />
                              </td>
                              <td>
                                <input name="lastName" type="text" className="form-control last-name" required />
                                <span className="value" />
                              </td>
                              <td className="email">
                                <input name="email" type="email" className="form-control email" required />
                                <span className="value" />
                              </td>
                              <td>
                                <select className="form-control permissions" name="permissions" required="required">
                                  <option value="admin">Admin</option>
                                  <option value="volunteer">Volunteer</option>
                                </select>
                                <span className="value" />
                              </td>
                              <td className="text-center">
                                <ul className="readonly-actions list-inline">
                                  <li>
                                    <a href="#" className="resend-email">Resend Invitation</a>
                                  </li>
                                  <li>
                                    <a href="#" className="edit-item">Edit</a>
                                  </li>
                                  <li>
                                    <a href="#" className="delete-item">Delete</a>
                                  </li>
                                </ul>
                                <input type="hidden" name="id" defaultValue={0} />
                                <ul className="edit-actions list-inline">
                                  <li>
                                    <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                  </li>
                                  <li>
                                    <button className="btn btn-default btn-cancel">Cancel</button>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">
                                <input name="name" type="text" className="form-control first-name" defaultValue="Jon" />
                                <span className="value">Jon</span>
                              </td>
                              <td className="text-center">
                                <input name="lastName" type="text" className="form-control last-name" defaultValue="Kaz" />
                                <span className="value">Kaz</span>
                              </td>
                              <td className="text-center">
                                <input name="email" type="email" className="form-control email" defaultValue="jfbnd@fjdnd.com" />
                                <span className="value">jfbnd@fjdnd.com</span>
                              </td>
                              <td className="text-center">
                                <select className="form-control permissions" name="permissions" required="required">
                                  <option value="admin" selected="selected">Admin</option>
                                  <option value="volunteer">Volunteer</option>
                                </select>
                                <span className="value">admin</span>
                              </td>
                              <td className="text-center action-items">
                                <ul className="readonly-actions list-inline">
                                  <li>
                                    <a href="#" className="resend-email">Resend Invitation</a>
                                  </li>
                                  <li>
                                    <a href="#" className="edit-item">Edit</a>
                                  </li>
                                  <li>
                                    <a href="#" className="delete-item">Delete</a>
                                  </li>
                                </ul>
                                <input type="hidden" name="id" defaultValue={319} />
                                <ul className="edit-actions list-inline">
                                  <li>
                                    <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                  </li>
                                  <li>
                                    <button className="btn btn-default btn-cancel">Cancel</button>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                          <div className="form-group operations-row text-center">
                            <button className="btn btn-default add-item">Add Member</button>
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

export default withStyles(s)(UserManagement);
