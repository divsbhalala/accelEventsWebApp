import React from 'react';
import Layout from '../../components/Layout';
import Checkout from './Checkout';
import ConfirmBid from './confirmBid/ConfirmBid';
import ByRaffleTickets from './byRaffleTickets/byRaffleTickets';
import Donation from './donation/donation';
import FundANeed from './fundANeed/fundANeed';
import BuyNow from './buyNow/index';

const title = 'AccelEvents | Checkout Page';
export default {
  path: '/u/checkout/:params',
  children: [
    {
      path: '/tickets/order/:orderId',
      async action(props) {
        return {
          title,
          component: <Layout params={props.params} class="display tickets-checkout"><Checkout title={title} params={props.params}/></Layout>,
        };
      }
    },
    {
      path: '/A/:userId/confirmbid/:ItemCode',
      async action(props) {
        return {
          title: "Confirm Bid",
          component: <Layout params={props.params} class="display bid-confirm"><ConfirmBid params={props.params}
                                                            itemCode={props.params && props.params.ItemCode}
                                                            userId={props.params && props.params.userId}
                                                            title="ConfirmBid"/></Layout>,
        };
      }
    },
    {
      path: '/R/:userId',
      async action(props) {
        return {
          title: "Buy Raffle Tickets",
          component: <Layout params={props.params} class="display buy-raffle-tickets"><ByRaffleTickets params={props.params}
                                                            userId={props.params && props.params.userId}
                                                            title="Tickets"/></Layout>,
        };
      }
    },
    {
      path: '/D/:userId/:amount',
      async action(props) {
        return {
          title: "Submit Donation",
          component: <Layout params={props.params} class="display submit-donation"><Donation params={props.params}
                                                            userId={props.params && props.params.userId}
                                                            title="Donation"/></Layout>,
        };
      }
    },
    {
      path: '/D/:userId',
      async action(props) {
        return {
          title: "Submit Donation",
          component: <Layout params={props.params} class="display submit-donation"><Donation params={props.params}
                                                            userId={props.params && props.params.userId}
                                                            title="Donation"/></Layout>,
        };
      }
    },
    {
      path: '/C/:userId',
      async action(props) {
        return {
          title: "Checkout Pledge Items",
          component: <Layout params={props.params} class="display checkout-fan"><FundANeed params={props.params}
                                                            userId={props.params && props.params.userId}
                                                            title="Pledge"/></Layout>,
        };
      }
    },
    {
      path: '/A/:userId/buynow/:ItemCode',
      async action(props) {
        return {
          title: "Checkout Auction buynow Items",
          component: <Layout params={props.params} class="display checkout-fan"><BuyNow params={props.params}
                                                            title="Buynow"/></Layout>,
        };
      }
    }
  ]
//http://api.stagingaccel.com:8080/AccelEventsWebApp/rest/u/checkout/jkazarian0/auction/buynow/user/12/item/COD

};
