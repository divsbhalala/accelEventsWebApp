
import React from 'react';
import LoginLayout from '../../components/LoginLayout';
import Login from './Login';

const title = 'AccelEvents | Log In';
const showFeedBack = false;

export default {

  path: '/login',

  async action() {
    return {
      title,
      component: <LoginLayout><Login title={title} showFeedBack={showFeedBack}/></LoginLayout>,
    };
  },

};
