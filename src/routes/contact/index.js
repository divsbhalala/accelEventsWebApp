
import React from 'react';
import Layout from '../../components/Layout';
import Contact from './Contact';

const title = 'AccelEvents | Contact Us';

export default {

  path: '/contact',

  async action() {
    return {
      title,
      component: <Layout><Contact title={title}/></Layout>,
    };
  },

};
