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
import cx from 'classnames';

import  EventAside from './../../components/EventAside/EventAside';

class Event extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div class="row">
            <div className={cx("header-img","text-center")}>
              <img src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/0-1900x300/d631f896-be71-4e95-9d29-9ce501f7a4b8_fall_formal_2015.png" className={cx("img-responsive","img-banner")} style={{width: "100%"}} />
            </div>
          </div>
          <div className="row">
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
