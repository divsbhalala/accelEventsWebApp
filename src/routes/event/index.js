import React from 'react';
import Layout from '../../components/Layout';
import Event from './Event';
import Fund from './fund/Fund';
import Raffle from './raffle/Raffle';
import Auction from './auction/Auction';
import Volunteer from './volunteer/Volunteer';

import FundGoal from './goal/Fund';
import RaffleGoal from './goal/Raffle';
import AuctionGoal from './goal/Auction';

import FundTable from './table/Fund';
import RaffleTable from './table/Raffle';
import AuctionTable from './table/Auction';

import FundScroll from './scroll/Fund';
import RaffleScroll from './scroll/Raffle';
import AuctionScroll from './scroll/Auction';


const title = 'AccelEvents | Event Page';
export default {
  path: '/events/:params',
  children: [
    {
      path: '/',
      action(props) {
        return {
          title: "Event Page",
          component: <Layout params={props.params} class="display"><Event title={title} params={props.params}/></Layout>,
        };
      }
    },
    {
      path: '/auction/goal',
      async action(props) {
        return {
          title: "AccelEvents | Auction Page",
          component: <Layout params={props.params} class="display goal-auction"><AuctionGoal params={props.params}
                                                                                             itemCode={props.params && props.params.ItemCode}
                                                                                             title={title}/></Layout>,
        };
      }
    },
    {
      path: '/FundaNeed/goal',
      async action(props) {
        return {
          title: "AccelEvents | Fund Page",
          component: <Layout params={props.params} class="display goal-fan"><FundGoal params={props.params}
                                                                                      itemCode={props.params && props.params.ItemCode}
                                                                                      title={title}/></Layout>,
        };
      }
    },
    {
      path: '/raffle/goal',
      async action(props) {
        return {
          title: "AccelEvents | Raffle Page",
          component: <Layout params={props.params} class="display goal-raffle"><RaffleGoal params={props.params}
                                                                                           itemCode={props.params && props.params.ItemCode}
                                                                                           title={title}/></Layout>,
        };
      }
    },

    {
      path: '/auction/table',
      async action(props) {
        return {
          title: "AccelEvents | Auction Page",
          component: <Layout params={props.params} class="display goal-auction"><AuctionTable params={props.params}
                                                                                             itemCode={props.params && props.params.ItemCode}
                                                                                             title={title}/></Layout>,
        };
      }
    },
    {
      path: '/FundaNeed/table',
      async action(props) {
        return {
          title: "AccelEvents | Fund Page",
          component: <Layout params={props.params} class="display goal-fan"><FundTable params={props.params}
                                                                                       itemCode={props.params && props.params.ItemCode}
                                                                                       title={title}/></Layout>,
        };
      }
    },
    {
      path: '/raffle/table',
      async action(props) {
        return {
          title: "AccelEvents | Raffle Page",
          component: <Layout params={props.params} class="display goal-raffle"><RaffleTable params={props.params}
                                                                                           itemCode={props.params && props.params.ItemCode}
                                                                                           title={title}/></Layout>,
        };
      }
    },

    {
      path: '/auction/scroll',
      async action(props) {
        return {
          title: "AccelEvents | Auction Page",
          component: <Layout params={props.params} class="display goal-auction"><AuctionScroll params={props.params}
                                                                                             itemCode={props.params && props.params.ItemCode}
                                                                                             title={title}/></Layout>,
        };
      }
    },
    {
      path: '/FundaNeed/scroll',
      async action(props) {
        return {
          title: "AccelEvents | Fund Page",
          component: <Layout params={props.params} class="display goal-fan"><FundScroll params={props.params}
                                                                                      itemCode={props.params && props.params.ItemCode}
                                                                                      title={title}/></Layout>,
        };
      }
    },
    {
      path: '/raffle/scroll',
      async action(props) {
        return {
          title: "AccelEvents | Raffle Page",
          component: <Layout params={props.params} class="display goal-raffle"><RaffleScroll params={props.params}
                                                                                           itemCode={props.params && props.params.ItemCode}
                                                                                           title={title}/></Layout>,
        };
      }
    },
    {
      path: '/auction/:ItemCode',
      async action(props) {
        return {
          title: "Auction Page",
          component: <Layout params={props.params} class="display auction-item"><Auction params={props.params}
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
          component: <Layout params={props.params} class="display fund-item"><Fund params={props.params}
                                                         itemCode={props.params && props.params.ItemCode} title="Fund"/></Layout>,
        };
      }
    },
    {
      path: '/raffle/:ItemCode',
      async action(props) {
        return {
          title: "Raffle Page",
          component: <Layout params={props.params} class="display raffle-item"><Raffle params={props.params}
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
          component: <Layout params={props.params} class="volunteer"><Volunteer params={props.params} title="Volunteer"/></Layout>,
        };
      }
    }
  ]

};
