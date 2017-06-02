/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';
import cx from 'classnames';

class Footer extends React.Component {
  render() {
    return (
      <footer id="footer-bar" className="clearfix">
        <p id="footer-copyright" className="col-xs-12">
          Copyright © AccelEvents, 2017 <a href="https://www.accelevents.com/Privacy-Policy/" target="_blank"> Privacy
          Policy</a> | <a href="https://www.accelevents.com/terms-conditions" target="_blank">Terms &amp; Conditions</a>
        </p>
      </footer>
    );
  }
}

export default withStyles(s)(Footer);
