import React from 'react';
import AdminLayout from '../../components/AdminLayout';
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
const isAdmin = false;

export default {

	path: '/admin',
	children: [
		{
			path: '/',
			async action() {
				/*  if (!isAdmin) {
				 return { redirect: '/login' };
				 }*/

				const Admin = await require.ensure([], require => require('./Admin').default, 'admin');

				return {
					title,
					chunk: 'admin',
					component: <AdminLayout class="host dashboard"><Admin title={title}/></AdminLayout>,
				};
			}
		},
		{
			path: '/design',
			async action() {
				return {
					title: "Design Page",
					component: <AdminLayout class="host "><Design title="Design Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/ticket',
			async action() {
				return {
					title: "Ticket Page",
					component: <AdminLayout class="host "><Ticket title="Ticket Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/event-ticket-create',
			async  action() {
				return {
					title: "Create Ticket",
					component: <AdminLayout class="host "><CreateTicket title="Create Ticket"/></AdminLayout>,
				};
			}
		},
		{
			path: '/event-ticketing-settings',
			async  action() {
				return {
					title: "Event ticketing settings",
					component: <AdminLayout class="host "><TicketSetting title="Event ticketing settings"/></AdminLayout>,
				};
			}
		},
		{
			path: '/event-ticketing-orders',
			async action() {
				return {
					title: "Event ticketing Orders",
					component: <AdminLayout class="host "><TicketOrders title="Event ticketing Orders"/></AdminLayout>,
				};
			}
		},
		{
			path: '/event-ticketing-orders/edit-holder-data/:ticketId',
			async action(props) {
				return {
					title: "Event ticketing Orders",
					component: <AdminLayout class="host "><TicketHolderData ticketId={props.params && props.params.ticketId} title="Event ticketing edit holder data"/></AdminLayout>,
				};
			}
		},
		{
			path: '/event-ticketing-orders/get-refund/:ticketId',
			async action(props) {
				return {
					title: "Event ticketing Orders",
					component: <AdminLayout class="host "><TicketRefund ticketId={props.params && props.params.ticketId} title="Event ticket refund"/></AdminLayout>,
				};
			}
		},
		{
			path: '/event-ticketing-orders/get-refund/:ticketId/:holderId',
			async action(props) {
				return {
					title: "Event ticketing Orders",
					component: <AdminLayout class="host "><TicketRefund ticketId={props.params && props.params.ticketId} holderId={props.params && props.params.holderId} title="Event ticket refund"/></AdminLayout>,
				};
			}
		},
		{
			path: '/ticket-performance',
			async action() {
				return {
					title: "Ticket Performance",
					component: <AdminLayout class="host "><TicketPerformance title="Ticket Performance Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/raffle',
			async action() {
				return {
					title: "Raffle Page",
					component: <AdminLayout class="host "><Raffle title="Raffle Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/raffle-performance',
			async action() {
				return {
					title: "Raffle performance Page",
					component: <AdminLayout class="host "><RafflePerformance title="Raffle performance Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/raffle-add-items',
			async action() {
				return {
					title: "Raffle Add Item Page",
					component: <AdminLayout class="host "><RaffleAddItems title="Raffle Add Item"/></AdminLayout>,
				};
			}
		},
		{
			path: '/raffle-settings',
			async action() {
				return {
					title: "Raffle Setting",
					component: <AdminLayout class="host "><RaffleSetting title="Raffle Setting "/></AdminLayout>,
				};
			}
		},
		{
			path: '/auction',
			async action() {
				return {
					title: "Silent Auction Page",
					component: <AdminLayout class="host "><Auction title="Silent Auction Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/auction-performance',
			async action() {
				return {
					title: "Silent Auction performance Page",
					component: <AdminLayout class="host "><AuctionPerformance title="Silent Auction performance Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/silent-auction-add-items',
			async action() {
				return {
					title: "Silent Auction Add Item",
					component: <AdminLayout class="host "><SilentAuctionAddItems title="Silent Auction Add item"/></AdminLayout>,
				};
			}
		},
		{
			path: '/silent-auction-settings',
			async action() {
				return {
					title: "Silent Auction Setting",
					component: <AdminLayout class="host "><SilentAuctionSettings title="Silent Auction Setting"/></AdminLayout>,
				};
			}
		},
		{
			path: '/settings-general',
			async  action() {
				return {
					title: "Setting Page",
					component: <AdminLayout class="host "><SettingsGeneral title="Setting Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/users',
			async action() {
				return {
					title: "Users Page",
					component: <AdminLayout class="host "><Users title="Users Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/fund',
			async action() {
				return {
					title: "Fund Page",
					component: <AdminLayout class="host "><Fund title="Fund Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/cause-auction-add-items',
			async action() {
				return {
					title: "Fund Page",
					component: <AdminLayout class="host "><FundAddItems title="Fund Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/cause-auction-settings',
			async action() {
				return {
					title: "Fund Page",
					component: <AdminLayout class="host "><FundSetting title="Fund Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/fund-performance',
			async action() {
				return {
					title: "Fund performance Page",
					component: <AdminLayout class="host "><FundPerformance title="Fund performance Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/donation-performance',
			async action() {
				return {
					title: "Donation performance Page",
					component: <AdminLayout class="host "><DonationPerformance title="Donation performance Page"/></AdminLayout>,
				};
			}
		},
		{
			path: '/settings-credit-card',
			async action() {
				return {
					title: "settings credit card",
					component: <AdminLayout class="host "><SettingsCreditCard title="settings credit card"/></AdminLayout>,
				};
			}
		},
		{
			path: '/settings-account',
			async action() {
				return {
					title: "settings account",
					component: <AdminLayout class="host "><SettingsAccount title="Settings Account"/></AdminLayout>,
				};
			}
		},
		{
			path: '/user-management-volunteers',
			async action() {
				return {
					title: "user management volunteers",
					component: <AdminLayout class="host "><UserManagement title="user management volunteers"/></AdminLayout>,
				};
			}
		},
    {
      path: '/superadmin',
      async action() {
        return {
          title: "Events",
          component: <EventsList title="Events"/>,
        };
      }
    },
    {
      path: '/u/:params/home',
      async action(props) {
        return {
          title: "Events",
          component: <WhiteLabelEventList params={props.params} title="WhiteLabelEventList"/>,
        };
      }
    },
    {
      path: '/u/:params/wl-settings',
      async action(props) {
        return {
          title: "Organization Settings",
          component: <OrganizationSettings params={props.params} title="Organization Settings"/>,
        };
      }
    },
    {
    	path: '/u/:params/user',
      async action(props) {
        return {
          title: "WhiteLabel User Management",
          component: <WhiteLabelUserManagement params={props.params} title="WhiteLabel User Management"/>,
        };
      }
    },
    {
    	path: '/superadmin/edit/:params',
      async action(props) {
        return {
          title: "WhiteLabel User Management",
          component: <WhiteLabelUserManagement params={props.params} title="WhiteLabel User Management"/>,
        };
      }
    }
	]

};
