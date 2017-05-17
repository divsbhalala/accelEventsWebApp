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
import {Tabs, Tab} from 'react-bootstrap-tabs';
import s from './Event.css';

import  EventAside from './../../components/EventAside/EventAside';

class Event extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="row">

            <h1>{this.props.title}</h1>
            <div className="col-lg-3 col-md-4 col-sm-4">
              <EventAside />
            </div>
            <div className="col-lg-9 col-md-8 col-sm-8">
              <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
                <Tab label="The Event">The event content</Tab>
                <Tab label="Auction">Auction content</Tab>
                <Tab label="Raffle">Raffle content</Tab>
                <Tab label="Fund a Need">Fund a need content</Tab>
                <Tab label="Donation">Donation content</Tab>
              </Tabs>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Event);
