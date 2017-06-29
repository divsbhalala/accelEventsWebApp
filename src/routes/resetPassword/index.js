import React from 'react';
import LoginLayout from '../../components/LoginLayout';
import ResetPassword from './resetPassword';

const title = 'AccelEvents | Reset Password';
const showFeedBack = false;

export default {

  path: '/password-reset',

  action() {
    return {
      title,
      component: <LoginLayout><ResetPassword title={title} showFeedBack={showFeedBack}/></LoginLayout>,
    };
  },

};
