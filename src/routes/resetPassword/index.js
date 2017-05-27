/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import ResetPassword from './resetPassword';

const title = 'Reset Password';
const showFeedBack=false;

export default {

  path: '/password-reset',

  action() {
    return {
      title,
      component: <AdminLayout><ResetPassword title={title} showFeedBack={showFeedBack} /></AdminLayout>,
    };
  },

};
