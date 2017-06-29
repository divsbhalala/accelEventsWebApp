
import React from 'react';
import Layout from '../../components/Layout';
import Fund from './Fund';
import Raffle from './Raffle';
import Auction from './Auction';

const title = 'AccelEvents | Event Page';
export default {
  path: '/goal/:params',
  children: [
    {
      path: '/',
      async action(props) {
        return {
          title,
          component: <Layout params={props.params}><Auction title={title} params={props.params}/></Layout>,
        };
      }
    },
    {
      path: '/auction',
      async action(props) {
        return {
          title: "AccelEvents | Auction Page",
          component: <Layout params={props.params}><Auction params={props.params}
                                                            itemCode={props.params && props.params.ItemCode}
                                                            title={title}/></Layout>,
        };
      }
    },
    {
      path: '/fund',
      async action(props) {
        return {
          title: "AccelEvents | Fund Page",
          component: <Layout params={props.params}><Fund params={props.params}
                                                         itemCode={props.params && props.params.ItemCode}
                                                         title={title}/></Layout>,
        };
      }
    },
    {
      path: '/raffle',
      async action(props) {
        return {
          title: "AccelEvents | Raffle Page",
          component: <Layout params={props.params}><Raffle params={props.params}
                                                           itemCode={props.params && props.params.ItemCode}
                                                           title={title}/></Layout>,
        };
      }
    }
  ]

};
