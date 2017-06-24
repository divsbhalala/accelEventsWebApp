import React from 'react';
import Layout from '../../components/Layout';
import Checkout from './Checkout';
import ConfirmBid from './confirmBid/ConfirmBid';

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
    {
      path: '/:bidId/confirmbid/:ItemCode',
      action(props) {
        return {
          title: "Confirm Bid Page",
          component: <Layout params={props.params}><ConfirmBid params={props.params}
                                                            itemCode={props.params && props.params.ItemCode}
                                                            title="ConfirmBid"/></Layout>,
        };
      }
    }
  ]

};
