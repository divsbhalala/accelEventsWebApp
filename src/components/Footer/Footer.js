
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
