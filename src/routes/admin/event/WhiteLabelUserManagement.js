
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import s from './event.css';
import cx from 'classnames';
import {getUserManagementStaff} from './action';
import WhiteLabelUser from './../../../components/WhiteLabelUser/index';
import  history from './../../../history';

class WhiteLabelUserManagement extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
	constructor() {
		super();
	};
goBack = () =>{
  history.push('/');
}
	componentWillMount(){
	}
  render() {
    return (
      <div  className="container">
        <div className="row">
          <div className=" col-sm-12">
             <div className="row" style={{opacity: 1}}>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12">
                      <h1 className="text-center">Users</h1>
                      <div className="pull-right" style={{marginBottom: 10}}>
                        <a  onClick={this.goBack} className="btn btn-default">&nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;</a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="main-box no-header">
                        <div className="main-box-body">
                          <p>Volunteers are able to submit bids on behalf of your participants. Anyone you add as an event volunteer will receive an email with login credentials so that they can submit bids for other people online from their phone.
                          </p>
                          <div id="alertmessage" />
                         <WhiteLabelUser params={this.props.params} />
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(WhiteLabelUserManagement));
