/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../App';
import AdminLayout from './AdminLayout';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};

describe('AdminLayout', () => {
  it('renders children correctly', () => {
    const store = mockStore(initialState);

    const wrapper = render(
      <App context={{ insertCss: () => {}, store }}>
        <AdminLayout>
          <div className="child" />
        </AdminLayout>
      </App>,
    );
    //expect(wrapper.find('div.child').length).to.eq(1);
  });

});
