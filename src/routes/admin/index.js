/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Design from './design/Design';
import Ticket from './ticket/Ticket';
import TicketPerformance from './ticket/performance/TicketPerformance';
import Auction from './auction/Auction';
import AuctionPerformance from './auction/performance/AuctionPerformance';
import Fund from './fund/Fund';
import FundPerformance from './fund/performance/FundPerformance';
import Setting from './setting/Setting';
import Users from './users/Users';
import Raffle from './raffle/Raffle';
import RafflePerformance from './raffle/performance/RafflePerformance';
import DonationPerformance from './donation/performance/DonationPerformance';


const title = 'Admin Page';
const isAdmin = false;

export default {

  path: '/admin',
  children:[
    {
      path:'/',
      async action() {
        /*  if (!isAdmin) {
            return { redirect: '/login' };
          }*/

        const Admin = await require.ensure([], require => require('./Admin').default, 'admin');

        return {
          title,
          chunk: 'admin',
          component: <Layout><Admin title={title} /></Layout>,
        };
      }
    },
    {
    path:'/design',
      action() {
        return {
          title:"Design Page",
          component: <Layout><Design title="Design Page"/></Layout>,
        };
      }
    },
    {
    path:'/ticket',
      action() {
        return {
          title:"Ticket Page",
          component: <Layout><Ticket title="Ticket Page"/></Layout>,
        };
      }
    },
    {
    path:'/ticket-performance',
      action() {
        return {
          title:"Ticket Performance",
          component: <Layout><TicketPerformance title="Ticket Performance Page"/></Layout>,
        };
      }
    },
    {
    path:'/raffle',
      action() {
        return {
          title:"Raffle Page",
          component: <Layout><Raffle title="Raffle Page"/></Layout>,
        };
      }
    },
    {
    path:'/raffle-performance',
      action() {
        return {
          title:"Raffle performance Page",
          component: <Layout><RafflePerformance title="Raffle performance Page"/></Layout>,
        };
      }
    },
    {
    path:'/auction',
      action() {
        return {
          title:"Silent Auction Page",
          component: <Layout><Auction title="Silent Auction Page"/></Layout>,
        };
      }
    },
    {
    path:'/auction-performance',
      action() {
        return {
          title:"Silent Auction performance Page",
          component: <Layout><AuctionPerformance title="Silent Auction performance Page"/></Layout>,
        };
      }
    },
    {
    path:'/setting',
      action() {
        return {
          title:"Setting Page",
          component: <Layout><Setting title="Setting Page"/></Layout>,
        };
      }
    },
    {
    path:'/users',
      action() {
        return {
          title:"Users Page",
          component: <Layout><Users title="Users Page"/></Layout>,
        };
      }
    },
    {
    path:'/fund',
      action() {
        return {
          title:"Fund Page",
          component: <Layout><Fund title="Fund Page"/></Layout>,
        };
      }
    },
    {
    path:'/fund-performance',
      action() {
        return {
          title:"Fund performance Page",
          component: <Layout><FundPerformance title="Fund performance Page"/></Layout>,
        };
      }
    },
    {
    path:'/donation-performance',
      action() {
        return {
          title:"Donation performance Page",
          component: <Layout><DonationPerformance title="Donation performance Page"/></Layout>,
        };
      }
    }
  ]

};
