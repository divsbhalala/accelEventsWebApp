
import React from 'react';
import MyProfile from './MyProfile';
import MyActivity from './MyActivity';
import Layout from '../../components/Layout';

const title = 'MyProfile';

export default {

  path: '/u',
  children: [
    {
      path: '/my-profile',
  action() {
    return {
      title,
      component: <Layout class="eventPage" title={title} ><MyProfile title={title}/></Layout>,
    };
  }
    },
    {
      path: '/my-activity',
      action() {
        return {
          title,
          component: <Layout class="eventPage" title={title}><MyActivity title={title}/></Layout>,
        };
      }
    }
  ]

};
