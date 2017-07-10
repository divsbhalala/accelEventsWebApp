
import React from 'react';
import MyProfile from './MyProfile';
import Layout from '../../components/Layout';

const title = 'MyProfile';

export default {

  path: '/',
  children: [
    {
      path: '/my-profile',
  action() {
    return {
      title,
      component: <Layout class="eventPage" title={title}><MyProfile title={title}/></Layout>,
    };
  }}]

};
