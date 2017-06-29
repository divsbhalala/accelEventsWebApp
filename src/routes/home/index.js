
import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

export default {

  path: '/',

  async action({fetch}) {
    return {
      title: 'AccelEvents',
      component: <Layout><Home news={<h1>Home Page</h1>}/></Layout>,
    };

  },

};
