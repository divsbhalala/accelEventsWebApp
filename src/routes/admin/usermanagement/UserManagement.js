
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import s from './UserManagement.css';
import cx from 'classnames';
import {getUserManagementStaff} from './action';


class UserManagement extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
	constructor() {
		super();
		this.state = {
			userList: []
		};
	};

	componentWillMount(){
		this.props.getUserManagementStaff().then(resp =>{
			console.log("resp", resp);
			if(resp && resp.data){
			  this.setState({
					userList : resp.data
        })
      }
		}).catch(error=>{
			console.log('error', error)
		})
	}
  render() {
		function buttonFormatter(cell, row){
			return '<ul class="readonly-actions list-inline"><li><a href="edit/7" ><i class="fa fa-cog blue" aria-hidden="true"></i></a></li><li><a href="/AccelEventsWebApp/auctions/admin/events/delete/" ><i class="fa fa-trash red" aria-hidden="true"></i></a></li></ul>';
		}
		function createCustomInsertButton (onClick) {
			return (
				<button className="btn btn-default add-item" onClick={ onClick }>Add Member</button>
			);
		};
		const options = {
			insertBtn: createCustomInsertButton,
			page: 1,  // which page you want to show as default
			sizePerPageList: [ {
				text: '5', value: 5
			}, {
				text: '10', value: 10
			}, {
				text: 'All', value: 100
			} ], // you can change the dropdown list for size per page
			sizePerPage: 10,  // which size per page you want to locate as default
			pageStartIndex: 0, // where to start counting the pages
			paginationSize: 5,  // the pagination bar size.
			prePage: 'Prev', // Previous page button text
			nextPage: 'Next', // Next page button text
			// firstPage: 'First', // First page button text
			// lastPage: 'Last', // Last page button text
			// paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
			paginationPosition: 'bottom'  // default is bottom, top and both is all available
			// hideSizePerPage: true > You can hide the dropdown for sizePerPage
			// alwaysShowAllBtns: true // Always show next and previous button
			// withFirstAndLast: false > Hide the going to First and Last page button
		};
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
                          <BootstrapTable containerClass='table volunteer-table' insertRow bordered={ false }  data={this.state.userList} hover  pagination={ this.state.userList.length > 5 }  options={ options }>
                            <TableHeaderColumn columnClassName='text-center' dataSort isKey dataField='firstName'>First Name</TableHeaderColumn>
                            <TableHeaderColumn columnClassName='text-center' dataSort dataField='lastName'>Last Name</TableHeaderColumn>
                            <TableHeaderColumn columnClassName='text-center' dataSort dataField='email'>Email</TableHeaderColumn>
                            <TableHeaderColumn columnClassName='text-center' dataSort dataField='role'>Permissions</TableHeaderColumn>
                            <TableHeaderColumn columnClassName='text-center' dataFormat={buttonFormatter} >Action</TableHeaderColumn>
                          </BootstrapTable>
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
    );
  }
}

const mapDispatchToProps = {
	getUserManagementStaff: () => getUserManagementStaff()
};

const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(UserManagement));
