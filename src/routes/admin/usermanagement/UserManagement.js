
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import s from './UserManagement.css';
import cx from 'classnames';
import {getUserManagementStaff} from './action';
import UserManage from './../../../components/UserManagement/index';


class UserManagement extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
	constructor() {
		super();
	};

	componentWillMount(){
	}
  render() {
    return (
      <div id="content-wrapper" className="admin-content-wrapper">
        <div className="row">
          <div className=" col-sm-12">
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
                         <UserManage   />
                          {/*<BootstrapTable containerClass='table volunteer-table' insertRow bordered={ false }  data={this.state.userList} hover  pagination={ this.state.userList.length > 5 }  options={ options }>*/}
                            {/*<TableHeaderColumn columnClassName='text-center' dataSort isKey dataField='firstName'>First Name</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn columnClassName='text-center' dataSort dataField='lastName'>Last Name</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn columnClassName='text-center' dataSort dataField='email'>Email</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn columnClassName='text-center' dataSort dataField='role'>Permissions</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn columnClassName='text-center' dataFormat={buttonFormatter} >Action</TableHeaderColumn>*/}
                          {/*</BootstrapTable>*/}
                          {/*<div className="form-group operations-row text-center">*/}
                            {/*<button className="btn btn-default add-item">Add Member</button>*/}
                          {/*</div>*/}
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
	getUserManagementStaff: () => getUserManagementStaff()
};

const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(UserManagement));
