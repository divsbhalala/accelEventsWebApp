
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import './LoginLayout.css';
import LoginHeader from '../LoginHeader';
import Feedback from '../Feedback';
import Footer from '../Footer';

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
