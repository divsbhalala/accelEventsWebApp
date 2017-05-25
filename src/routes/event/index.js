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
import Event from './Event';

const title = 'Event Page';

export default {

  path: '/event/:params',

  action(props) {
    return {
      title,
      component: <Layout params={props.params} ><Event title={title} /></Layout>,
    };
  },

};
