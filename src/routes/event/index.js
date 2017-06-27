import React from 'react';
import Layout from '../../components/Layout';
import Event from './Event';
import Fund from './fund/Fund';
import Raffle from './raffle/Raffle';
import Auction from './auction/Auction';
import Volunteer from './volunteer/Volunteer';

const title = 'Event Page';
export default {
  path: '/event/:params',
  children: [
    {
      path: '/',
      action(props) {
        return {
          title: "Event Page",
          component: <Layout params={props.params}><Event title={title} params={props.params}/></Layout>,
        };
      }
    },
    {
      path: '/auction/:ItemCode',
      async action(props) {
        return {
          title: "Auction Page",
          component: <Layout params={props.params}><Auction params={props.params}
                                                            itemCode={props.params && props.params.ItemCode}
                                                            title="Auction"/></Layout>,
        };
      }
    },
    {
      path: '/fund/:ItemCode',
      async action(props) {
        return {
          title: "Fund Page",
          component: <Layout params={props.params}><Fund params={props.params}
                                                         itemCode={props.params && props.params.ItemCode} title="Fund"/></Layout>,
        };
      }
    },
    {
      path: '/raffle/:ItemCode',
      async action(props) {
        return {
          title: "Raffle Page",
          component: <Layout params={props.params}><Raffle params={props.params}
                                                           itemCode={props.params && props.params.ItemCode}
                                                           title="raffle"/></Layout>,
        };
      }
    },
    {
      path: '/volunteer',
      async action(props) {
        return {
          title: "Volunteer Page",
          component: <Layout params={props.params}><Volunteer params={props.params} title="Volunteer"/></Layout>,
        };
      }
    }
  ]

};
