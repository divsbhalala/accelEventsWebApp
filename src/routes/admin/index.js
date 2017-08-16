import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import AdminWLLayout from '../../components/AdminWLLayout';
import Design from './design/Design';
import Ticket from './ticket/Ticket';
import CreateTicket from './ticket/create/CreateTicket';
import TicketSetting from './ticket/settings/TicketSetting';
import TicketPerformance from './ticket/performance/TicketPerformance';
import TicketOrders from './ticket/ticketorders/TicketSetting';
import TicketHolderData from './ticket/editHolderData/Ticket';
import TicketRefund from './ticket/refund/Ticket';
import Auction from './auction/Auction';
import SilentAuctionAddItems from './auction/addItem/SilentAuctionAddItems';
import SilentAuctionSettings from './auction/settings/AuctionSetting';
import AuctionPerformance from './auction/performance/AuctionPerformance';
import Fund from './fund/Fund';
import FundSetting from './fund/settings/FundSetting';
import FundAddItems from './fund/addItem/FundAddItems';
import FundPerformance from './fund/performance/FundPerformance';
import SettingsGeneral from './setting/Setting';
import SettingsCreditCard from './setting/CreditCard';
import SettingsAccount from './setting/Account';
import Users from './users/Users';
import Raffle from './raffle/Raffle';
import RafflePerformance from './raffle/performance/RafflePerformance';
import RaffleAddItems from './raffle/addItem/RaffleAddItems';
import RaffleSetting from './raffle/settings/RaffleSetting';
import DonationPerformance from './donation/performance/DonationPerformance';
import UserManagement from './usermanagement/UserManagement';
import EventsList from './event/index';
import WhiteLabelEventList from './event/whiteLabelEvent';
import OrganizationSettings from './event/organizationSettings';
import WhiteLabelUserManagement from './event/WhiteLabelUserManagement';


const title = 'Admin Page';
const isAdmin = true;
export default {
  path: '/host',
  children: [
    {
      path: '/dashboard/home',
      async action() {
				/*  if (!isAdmin) {
				 return { redirect: '/login' };
				 }*/

				const Admin = await require.ensure([], require => require('./Admin').default, 'admin');

        return {
          title,
          chunk: 'host',
          component: <AdminLayout class="host dashboard" isAdmin={isAdmin}><Admin title={title} /></AdminLayout>,
        };
      },
    },
    {
      path: '/event-management/design',
      async action() {
        return {
          title: 'Design Page',
          component: <AdminLayout class="host design" isAdmin={isAdmin} ><Design title="Design Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/ticket',
      async action() {
        return {
          title: 'Ticket Page',
          component: <AdminLayout class="host ticketing" isAdmin={isAdmin}><Ticket title="Ticket Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/event-ticketing/create',
      async  action() {
        return {
          title: 'Create Ticket',
          component: <AdminLayout class="host ticketing create" isAdmin={isAdmin}><CreateTicket title="Create Ticket" /></AdminLayout>,
        };
      },
    },
    {
      path: '/event-ticketing/settings',
      async  action() {
        return {
          title: 'Event ticketing settings',
          component: <AdminLayout class="host ticketing settings" isAdmin={isAdmin}><TicketSetting title="Event ticketing settings" /></AdminLayout>,
        };
      },
    },
    {
      path: '/event-ticketing/orders',
      async action() {
        return {
          title: 'Event ticketing Orders',
          component: <AdminLayout class="host ticketing orders" isAdmin={isAdmin}><TicketOrders title="Event ticketing Orders" /></AdminLayout>,
        };
      },
    },
    {
      path: '/event-ticketing-orders/edit-holder-data/:ticketId',
      async action(props) {
        return {
          title: 'Event ticketing Orders',
          component: <AdminLayout class="host ticketing edit holder-data" isAdmin={isAdmin}><TicketHolderData ticketId={props.params && props.params.ticketId} title="Event ticketing edit holder data" /></AdminLayout>,
        };
      },
    },
    {
      path: '/event-ticketing-orders/get-refund/:ticketId',
      async action(props) {
        return {
          title: 'Event ticketing Orders',
          component: <AdminLayout class="host ticketing refund ticket" isAdmin={isAdmin}><TicketRefund ticketId={props.params && props.params.ticketId} title="Event ticket refund" /></AdminLayout>,
        };
      },
    },
    {
      path: '/event-ticketing-orders/get-refund/:ticketId/:holderId',
      async action(props) {
        return {
          title: 'Event ticketing Orders',
          component: <AdminLayout class="host ticketing refund holder" isAdmin={isAdmin}><TicketRefund ticketId={props.params && props.params.ticketId} holderId={props.params && props.params.holderId} title="Event ticket refund" /></AdminLayout>,
        };
      },
    },
    {
      path: '/dashboard/ticket-sales-performance',
      async action() {
        return {
          title: 'Ticket Performance',
          component: <AdminLayout class="host ticketing performance" isAdmin={isAdmin}><TicketPerformance title="Ticket Performance Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/raffle',
      async action() {
        return {
          title: 'Raffle Page',
          component: <AdminLayout class="host raffle" isAdmin={isAdmin}><Raffle title="Raffle Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/dashboard/raffle-item-performance',
      async action() {
        return {
          title: 'Raffle performance Page',
          component: <AdminLayout class="host raffle performance" isAdmin={isAdmin}><RafflePerformance title="Raffle performance Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/raffle/add-items',
      async action() {
        return {
          title: 'Raffle Add Item Page',
          component: <AdminLayout class="host raffle add-items" isAdmin={isAdmin}><RaffleAddItems title="Raffle Add Item" /></AdminLayout>,
        };
      },
    },
    {
      path: '/raffle/settings',
      async action() {
        return {
          title: 'Raffle Setting',
          component: <AdminLayout class="host raffle settings" isAdmin={isAdmin}><RaffleSetting title="Raffle Setting " /></AdminLayout>,
        };
      },
    },
    {
      path: '/dashboard/auction',
      async action() {
        return {
          title: 'Silent Auction Page',
          component: <AdminLayout class="host auction " isAdmin={isAdmin}><Auction title="Silent Auction Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/dashboard/auction-item-performance',
      async action() {
        return {
          title: 'Silent Auction performance Page',
          component: <AdminLayout class="host auction performance" isAdmin={isAdmin}><AuctionPerformance title="Silent Auction performance Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/silent-auction/add-items',
      async action() {
        return {
          title: 'Silent Auction Add Item',
          component: <AdminLayout class="host auction add-items" isAdmin={isAdmin}><SilentAuctionAddItems title="Silent Auction Add item" /></AdminLayout>,
        };
      },
    },
    {
      path: '/silent-auction/settings',
      async action() {
        return {
          title: 'Silent Auction Setting',
          component: <AdminLayout class="host auction settings" isAdmin={isAdmin}><SilentAuctionSettings title="Silent Auction Setting" /></AdminLayout>,
        };
      },
    },
    {
      path: '/settings/general',
      async  action() {
        return {
          title: 'Setting Page',
          component: <AdminLayout class="host general settings" isAdmin={isAdmin}><SettingsGeneral title="Setting Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/users',
      async action() {
        return {
          title: 'Users Page',
          component: <AdminLayout class="host users" isAdmin={isAdmin}><Users title="Users Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/fund',
      async action() {
        return {
          title: 'Fund Page',
          component: <AdminLayout class="host cause " isAdmin={isAdmin}><Fund title="Fund Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/cause-auction/add-items',
      async action() {
        return {
          title: 'Fund Page',
          component: <AdminLayout class="host cause add-items" isAdmin={isAdmin}><FundAddItems title="Fund Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/cause-auction/settings',
      async action() {
        return {
          title: 'Fund Page',
          component: <AdminLayout class="host cause settings" isAdmin={isAdmin}><FundSetting title="Fund Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/dashboard/cause-item-performance',
      async action() {
        return {
          title: 'Fund performance Page',
          component: <AdminLayout class="host cause performance" isAdmin={isAdmin}><FundPerformance title="Fund performance Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/dashboard/donation-performance',
      async action() {
        return {
          title: 'Donation performance Page',
          component: <AdminLayout class="host donation performance" isAdmin={isAdmin}><DonationPerformance title="Donation performance Page" /></AdminLayout>,
        };
      },
    },
    {
      path: '/settings/credit-card',
      async action() {
        return {
          title: 'settings credit card',
          component: <AdminLayout class="host credit-card settings" isAdmin={isAdmin}><SettingsCreditCard title="settings credit card" /></AdminLayout>,
        };
      },
    },
    {
      path: '/settings/account',
      async action() {
        return {
          title: 'settings account',
          component: <AdminLayout class="host account settings" isAdmin={isAdmin}><SettingsAccount title="Settings Account" /></AdminLayout>,
        };
      },
    },
    {
      path: '/user-management/volunteers',
      async action() {
        return {
          title: 'user management volunteers',
          component: <AdminLayout class="host user-management volunteers" isAdmin={isAdmin}><UserManagement title="user management volunteers" /></AdminLayout>,
        };
      },
    },
    {
      path: '/u/:params/home',
      async action(props) {
        return {
          title: "Events",
          component: <WhiteLabelEventList isAdmin={isAdmin} params={props.params} title="WhiteLabelEventList"/>,
        };
      }
    },
    {
      path: '/u/:params/wl-settings',
      async action(props) {
        return {
          title: "Organization Settings",
          component: <OrganizationSettings isAdmin={isAdmin} params={props.params} title="Organization Settings"/>,
        };
      }
    },
    {
    	path: '/u/:params/user',
      async action(props) {
        return {
          title: "WhiteLabel User Management",
          component: <WhiteLabelUserManagement isAdmin={isAdmin} params={props.params} title="WhiteLabel User Management"/>,
        };
      }
    },
    {
    	path: '/superadmin/edit/:params',
      async action(props) {
        return {
          title: "WhiteLabel User Management",
          component: <WhiteLabelUserManagement isAdmin={isAdmin} params={props.params} title="WhiteLabel User Management"/>,
        };
      }
    }
	]

};
