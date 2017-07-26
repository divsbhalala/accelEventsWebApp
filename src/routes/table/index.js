
import React from 'react';
import Layout from '../../components/Layout';
import Fund from './Fund';
import Raffle from './Raffle';
import Auction from './Auction';

const title = 'Event Page';
export default {
  path: '/table/:params',
  children: [
    {
      path: '/',
      async action(props) {
        return {
          title,
          component: <Layout params={props.params} class="display "><Auction title={title} params={props.params}/></Layout>,
        };
      }
    },
    {
      path: '/auction',
      action(props) {
        return {
          title: "Auction Page",
          component: <Layout params={props.params} class="display table-auction"><Auction params={props.params}
                                                            itemCode={props.params && props.params.ItemCode}
                                                            title={title}/></Layout>,
        };
      }
    },
    {
      path: '/fund',
      action(props) {
        return {
          title: "Fund Page",
          component: <Layout params={props.params} class="display table-fan"><Fund params={props.params}
                                                         itemCode={props.params && props.params.ItemCode}
                                                         title={title}/></Layout>,
        };
      }
    },
    {
      path: '/raffle',
      action(props) {
        return {
          title: "Raffle Page",
          component: <Layout params={props.params} class="display table-raffle"><Raffle params={props.params}
                                                           itemCode={props.params && props.params.ItemCode}
                                                           title={title}/></Layout>,
        };
      }
    }
  ]

};
