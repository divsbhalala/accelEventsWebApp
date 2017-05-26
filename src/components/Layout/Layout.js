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
import s from './Layout.css';
import Header from '../Header';
import HeaderNew from '../HeaderNew/HeaderNew';
import Sidebar from '../Sidebar';
import Feedback from '../Feedback';
import Footer from '../Footer';
import {connect} from 'react-redux';
import { sessionService, loadSession } from 'redux-react-session';
import  {storeLoginData, storeToken} from './../../routes/login/action/index';
class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  constructor(){
    super();
    this.state={
      user:null,
      isAdmin:false
    }
  }

  componentDidMount(){
    let pathName=location.pathName;
    if(!_.isEmpty(localStorage.getItem('user')) && !_.isEmpty(localStorage.getItem('token'))){
      this.props.storeLoginData(JSON.parse(localStorage.getItem('user')));
      this.props.storeToken(JSON.parse(localStorage.getItem('token')));
      sessionService.saveSession(JSON.parse(localStorage.getItem('token')));
      sessionService.saveUser(JSON.parse(localStorage.getItem('user')));
      this.setState({user:
      {
        data:JSON.parse(localStorage.getItem('user')),
        token:JSON.parse(localStorage.getItem('token'))
      }
      });
      console.log('pathname', this.props.USER_DATA, JSON.parse(localStorage.getItem('user')));
      if(pathName && pathName.indexOf('login') > 0 && pathName.indexOf('signup') > 0 ){

      }
    } else{
      console.log('pathname', this.props.USER_DATA, JSON.parse(localStorage.getItem('user')));

      if(pathName && pathName.indexOf('login') > 0 && pathName.indexOf('signup') > 0 ){

      }
      console.log()
    }
  }

  render() {
    return (
      <div>
        <HeaderNew user={this.state.user} admin={this.state.isAdmin} params={this.props.params} />
        <div className="page-wrapper" id={this.state.isAdmin && "page-wrapper" }  >
          {/*{this.state.user && <Sidebar className="w-20" user={this.state.user} />}*/}
          {/*<div className="w-80">
            {this.props.children}
            {<Feedback />}
          </div>*/}
            <div className="row">
              <div className="col-lg-12">
                {this.props.children}
              </div>
            </div>

        </div>


        <Footer />
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    USER_DATA:state.user
  }
};
const mapDispatchToProps = {
  storeLoginData : (data) => storeLoginData(data),
  storeToken : (data) => storeToken(data)
};

export default connect(mapStateToProps,mapDispatchToProps)(Layout)
//export default Layout;
