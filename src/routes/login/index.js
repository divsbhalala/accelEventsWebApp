
import React from 'react';
import LoginLayout from '../../components/LoginLayout';
import Login from './Login';
import AdminWLLayout from '../../components/AdminWLLayout';
import EventsList from './../admin/event/index';
import WhiteLabelUserManagement from './../admin/event/WhiteLabelUserManagement';
import OrganizationSettings from './../admin/event/organizationSettings';

import WhiteLabelEventList from './../admin/event/whiteLabelEvent';
import EditEvent from './../admin/event/editEvent';

const title = 'AccelEvents | Log In';
const showFeedBack = false;

export default {

path: '/u',
  children: [
  {
    path: '/login',
    async action() {

      return {
        title,
        chunk: 'login',
        component: <LoginLayout><Login title={title} showFeedBack={showFeedBack}/></LoginLayout>,
      };
    },
  },
  {
    path: '/superadmin/events',
    async action() {
      return {
        title: "Events",
        component: <AdminWLLayout><EventsList title="Events"/></AdminWLLayout>,
      };
    }
  },
  {
    path: '/wl/:params/users',
    async action(props) {
      return {
        title: "WhiteLabel User Management",
        component: <AdminWLLayout isAdmin={true}><WhiteLabelUserManagement params={props.params} title="WhiteLabel User Management"/></AdminWLLayout>,
      };
    }
  },
    {
      path: '/wl/:params/settings',
      async action(props) {
        return {
          title: "Organization Settings",
          component: <AdminWLLayout isAdmin={true}><OrganizationSettings params={props.params} title="Organization Settings"/></AdminWLLayout>,
        };
      }
    },
    {
      path: '/superadmin/edit/:params',
      async action(props) {
        return {
          title: "EditEvent",
          component: <AdminWLLayout isAdmin={true}><EditEvent  params={props.params} title="EditEvent"/></AdminWLLayout>,
        };
      }
    },
    {
      path: '/wl/:params/home',
      async action(props) {
        return {
          title: "Events",
          component: <AdminWLLayout  ><WhiteLabelEventList params={props.params} title="WhiteLabelEventList"/></AdminWLLayout>,
        };
      }
    }
  ]
};
