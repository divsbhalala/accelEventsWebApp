
import React from 'react';
import Layout from '../../components/Layout';
import Fund from './Fund';
import Raffle from './Raffle';
import Auction from './Auction';

const title = 'Event Page';
export default {
  path: '/scroll/:params',
  children: [
    {
      path: '/',
      async action(props) {
        return {
          title,
          component: <Layout params={props.params} class="display scroll"><Auction title={title} params={props.params}/></Layout>,
        };
      }
    },
    {
      path: '/auction',
      async action(props) {
        return {
          title: "Auction Page",
          component: <Layout params={props.params} class="display scroll-auction"><Auction params={props.params}
                                                            itemCode={props.params && props.params.ItemCode}
                                                            title={title}/></Layout>,
        };
      }
    },
    {
      path: '/fund',
      async action(props) {
        return {
          title: "Fund Page",
          component: <Layout params={props.params} class="display scroll-fan"><Fund params={props.params}
                                                         itemCode={props.params && props.params.ItemCode}
                                                         title={title}/></Layout>,
        };
      }
    },
    {
      path: '/raffle',
      async action(props) {
        return {
          title: "Raffle Page",
          component: <Layout params={props.params} class="display scroll-raffle"><Raffle params={props.params}
                                                           itemCode={props.params && props.params.ItemCode}
                                                           title={title}/></Layout>,
        };
      }
    }
  ]
};
