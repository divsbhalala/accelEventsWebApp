import React from 'react';
import LoginLayout from '../../components/LoginLayout';
import ResetNewPassword from './resetNewPassword';

const title = 'AccelEvents | Set New Password';
const showFeedBack = false;

export default {

  path: '/u/new-password',

  action(request) {
    console.log("request", request.query.token);
    return {
      title,
      component: <LoginLayout><ResetNewPassword title={title} showFeedBack={showFeedBack} token={request && request.query && request.query.token}/></LoginLayout>,
    };
  },

};
