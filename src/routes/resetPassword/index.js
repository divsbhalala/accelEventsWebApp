import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import ResetPassword from './resetPassword';

const title = 'Reset Password';
const showFeedBack = false;

export default {

  path: '/password-reset',

  action() {
    return {
      title,
      component: <AdminLayout><ResetPassword title={title} showFeedBack={showFeedBack}/></AdminLayout>,
    };
  },

};
