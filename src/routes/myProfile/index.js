
import React from 'react';
import MyProfile from './MyProfile';
import MyActivity from './MyActivity';
import Layout from '../../components/Layout';

const title = 'MyProfile';

export default {

  path: '/u',
  children: [
    {
      path: '/myprofile',
  action() {
    return {
      title,
      component: <Layout class="display myprofile" title={title} ><MyProfile title={title}/></Layout>,
    };
  }
    },
    {
      path: '/my-activity',
      action() {
        return {
          title : "My Activity",
          component: <Layout class="display my-activity" title={title}><MyActivity title={title}/></Layout>,
        };
      }
    }
  ]

};
