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
import './LoginLayout.css';
import LoginHeader from '../LoginHeader';
import Feedback from '../Feedback';
import Footer from '../Footer';
import AdminSiderbar from '../../components/Sidebar/AdminSidebar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarNew from '../../components/SidebarNew';

class LoginLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        <LoginHeader />
        {this.props.children}
        {this.props.showFeedBack && <Feedback />}
        <Footer />
      </div>
    );
  }
}

export default LoginLayout;
