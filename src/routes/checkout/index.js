import React from 'react';
import Layout from '../../components/Layout';
import Checkout from './Checkout';

const title = 'Checkout Page';
export default {
  path: '/checkout/:params',
  children: [
    {
      path: '/tickets/order/:orderId',
      async action(props) {
        return {
          title,
          component: <Layout params={props.params}><Checkout title={title} params={props.params}/></Layout>,
        };
      }
    },
  ]

};
