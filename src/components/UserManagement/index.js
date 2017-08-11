import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import s from './../../routes/login/Login.css';
import Button from 'react-bootstrap-button-loader';
import {getUserManagementStaff} from './../../routes/admin/usermanagement/action/index';
import UserList from './userList';

class UserManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      message: '',
      status: '',
    };
  }
  componentWillMount() {
    this.props.getUserManagementStaff().then((resp) => {
      if (resp && resp.data) {
        this.setState({
          userData: resp.data,
        });
      }
    }).catch((error) => {
    });
  }
  addRow =() => {
    const userData = this.state.userData;
    const newRow = { firstName: '', lastName: '', email: '', role: '', id: 0 };


   if(this.state.userData[this.state.userData.length-1].id) {
     userData.push(newRow);
     this.setState({
       userData,
     });
   }
  };
  removeRow =(index) => {
    const userData = this.state.userData;
    userData.splice(index, 1);
    this.setState({
      userData,
    });
  };
  actionResult = (method, status, message) => {
    if (status === 'Failed') { this.setState({ status, message }); } else {
      this.setState({ status, message, userData: '' });
      this.props.getUserManagementStaff().then((resp) => {
        if (resp && resp.data) {
          this.setState({
            userData: resp.data,
          });
        }
      }).catch((error) => {
      });
    }
  };
  render() {
    return (
      <div>
        {this.state.message && <div className={cx('alert', this.state.status === 'Success' ? 'alert-success' : 'alert-danger')}>{this.state.message}</div>}
        {this.state.userData ? <div className="main-box no-header">
          <div className="main-box-body">
            <div id="alertmessage" className="alert alert-success alert-dismissible" style={{ opacity: 500, display: 'none' }}><h4>Volunteer deleted from the event.</h4></div>
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
                {this.state.userData && this.state.userData.map((value, index) =>
                  <UserList userData={value} key={index} inedx={index} removeRow={this.removeRow} actionResult={this.actionResult} />,
            )}
            </tbody>
          </table>
          <div className="form-group operations-row text-center">
            <button className="btn btn-default add-item" onClick={this.addRow}>Add Member</button>
          </div>
        </div>
      </div> : <div id="app" className="loader"/> }
    </div>
		)
	};
}

const mapDispatchToProps = {
  getUserManagementStaff: () => getUserManagementStaff()
};

const mapStateToProps = (state) => ({
	});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(UserManage));
