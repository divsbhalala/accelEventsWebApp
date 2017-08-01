
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import s from './event.css';
import cx from 'classnames';
import {getUserManagementStaff} from './action';
import WhiteLabelUserList from './../../../components/WhiteLabelUser';
import  history from './../../../history';

class WhiteLabelUserManagement extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
	constructor() {
		super();
	};
goBack = () =>{
  history.push('home');
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
                         <WhiteLabelUserList params={this.props.params} />
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
	getUserManagementStaff: (whiteLabelURL) => getUserManagementStaff(whiteLabelURL)
};

const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(WhiteLabelUserManagement));
