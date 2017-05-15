/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  MenuItem,
  DropdownButton,
  Panel, PageHeader, ListGroup, ListGroupItem, Button,
} from 'react-bootstrap'

import s from './Admin.css';
import StatWidget from '../../components/Widget';
class Admin extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>

          <div className="row">
            <div className="col-lg-12">
              <PageHeader>Dashboard</PageHeader>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <StatWidget
                style="panel-primary"
                icon="fa fa-comments fa-5x"
                count="26"
                headerText="New Comments!"
                footerText="View Details"
                linkTo="/"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <StatWidget
                style="panel-green"
                icon="fa fa-tasks fa-5x"
                count="12"
                headerText="New Tasks!"
                footerText="View Details"
                linkTo="/"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <StatWidget
                style="panel-yellow"
                icon="fa fa-shopping-cart fa-5x"
                count="124"
                headerText="New Orders!"
                footerText="View Details"
                linkTo="/"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <StatWidget
                style="panel-red"
                icon="fa fa-support fa-5x"
                count="13"
                headerText="Support Tickets!"
                footerText="View Details"
                linkTo="/"
              />
            </div>
          </div>
          <div className="row">


            <div className="col-lg-4">

              <Panel
                header={<span>
              <i className="fa fa-bell fa-fw" /> Notifications Panel
            </span>}
              >
                <ListGroup>
                  <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                    <i className="fa fa-comment fa-fw" /> New Comment
                    <span className="pull-right text-muted small"><em>4 minutes ago</em></span>
                  </ListGroupItem>
                  <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                    <i className="fa fa-twitter fa-fw" /> 3 New Followers
                    <span className="pull-right text-muted small"><em>12 minutes ago</em></span>
                  </ListGroupItem>
                  <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                    <i className="fa fa-envelope fa-fw" /> Message Sent
                    <span className="pull-right text-muted small"><em>27 minutes ago</em></span>
                  </ListGroupItem>
                  <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                    <i className="fa fa-tasks fa-fw" /> New Task
                    <span className="pull-right text-muted small"><em>43 minutes ago</em></span>
                  </ListGroupItem>
                  <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                    <i className="fa fa-upload fa-fw" /> Server Rebooted
                    <span className="pull-right text-muted small"><em>11:32 AM</em></span>
                  </ListGroupItem>
                  <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                    <i className="fa fa-bolt fa-fw" /> Server Crashed!
                    <span className="pull-right text-muted small"><em>11:13 AM</em></span>
                  </ListGroupItem>
                  <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                    <i className="fa fa-warning fa-fw" /> Server Not Responding
                    <span className="pull-right text-muted small"><em>10:57 AM</em></span>
                  </ListGroupItem>
                  <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                    <i className="fa fa-shopping-cart fa-fw" /> New Order Placed
                    <span className="pull-right text-muted small"><em>9:49 AM</em></span>
                  </ListGroupItem>
                  <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                    <i className="fa fa-money fa-fw" /> Payment Received
                    <span className="pull-right text-muted small"><em>Yesterday</em></span>
                  </ListGroupItem>
                </ListGroup>
                <Button block>View All Alerts</Button>
              </Panel>

              <Panel
                header={<span>
              <i className="fa fa-bar-chart-o fa-fw" /> Donut Chart Example
            </span>}
              >
                <div>
                  Hello
                </div>
              </Panel>

            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default withStyles(s)(Admin);
