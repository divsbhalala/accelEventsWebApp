
import React from 'react';
import Layout from '../../components/Layout';
import NotFound from './NotFound';

const title = 'Page Not Found';

export default {

  path: '*',

  action(props) {
    return {
      title,
      component: <Layout params={props.params}><NotFound title={title}/></Layout>,
      status: 404,
    };
  },

};
