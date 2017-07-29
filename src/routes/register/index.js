
import React from 'react';
import Register from './Register';
const showFeedBack = false;

const title = 'New User Registration';

export default {

  path: '/u/signup',

  action() {
    return {
      title,
      component: <Register title={title}/>,
    };
  },

};
