import React from 'react';
import Layout from '../../components/Layout';
import Checkout from './Checkout';
import ConfirmBid from './confirmBid/ConfirmBid';
import ByRaffleTickets from './byRaffleTickets/byRaffleTickets';
import Donation from './donation/donation';
import FundANeed from './fundANeed/fundANeed';

const title = 'AccelEvents | Checkout Page';
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
      path: '/:userId/confirmbid/:ItemCode',
      async action(props) {
        return {
          title: "Confirm Bid",
          component: <Layout params={props.params}><ConfirmBid params={props.params}
                                                            itemCode={props.params && props.params.ItemCode}
                                                            userId={props.params && props.params.userId}
                                                            title="ConfirmBid"/></Layout>,
        };
      }
    },
    {
      path: '/byRaffleTickets/:userId',
      async action(props) {
        return {
          title: "Buy Raffle Tickets",
          component: <Layout params={props.params}><ByRaffleTickets params={props.params}
                                                            userId={props.params && props.params.userId}
                                                            title="ConfirmBid"/></Layout>,
        };
      }
    },
    {
      path: '/donation/:userId',
      async action(props) {
        return {
          title: "Submit Donation",
          component: <Layout params={props.params}><Donation params={props.params}
                                                            userId={props.params && props.params.userId}
                                                            title="ConfirmBid"/></Layout>,
        };
      }
    },
    {
      path: '/fundANeed/:userId',
      async action(props) {
        return {
          title: "Checkout Pledge Items",
          component: <Layout params={props.params}><FundANeed params={props.params}
                                                            userId={props.params && props.params.userId}
                                                            title="ConfirmBid"/></Layout>,
        };
      }
    }
  ]

};
