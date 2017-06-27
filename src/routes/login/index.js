
import React from 'react';
import LoginLayout from '../../components/LoginLayout';
import Login from './Login';

const title = 'Log In';
const showFeedBack = false;

export default {

  path: '/login',

  action() {
    return {
      title,
      component: <LoginLayout><Login title={title} showFeedBack={showFeedBack}/></LoginLayout>,
    };
  },

};
