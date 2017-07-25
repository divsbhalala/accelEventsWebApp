import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import './AdminLayout.css';
import HeaderNew from '../HeaderNew/HeaderNew';
import Feedback from '../Feedback';
import Footer from '../Footer';
import AdminSiderbar from '../../components/Sidebar/AdminSidebar';

class AdminLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={(this.props.class)}>
        <HeaderNew admin={true}/>
        <AdminSiderbar />
        {this.props.children}
        {this.props.showFeedBack && <Feedback />}
        <Footer />
      </div>
    );
  }
}

export default AdminLayout;
