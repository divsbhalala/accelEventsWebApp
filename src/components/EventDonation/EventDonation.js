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
import s from './EventDonation.css';
import Link from '../Link';
import cx from 'classnames';
var svgTag='<svg fill-rule="evenodd" style={{width: "auto !important"}} xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" overflow="visible" width="32px" height="32px" viewBox="0 0 24 24"> <defs> </defs> <g id="Document" fill="none" stroke="black" font-family="Times New Roman" font-size="16" transform="scale(1 -1)"> <g id="Spread" transform="translate(0 -24)"> <g id="Layer 1"> <g id="Group" stroke="none" fill="#FFFFFF"> <path d="M 7.106,12.949 C 6.985,12.949 6.696,13.063 6.55,13.204 L 1.926,18.216 C 0.551,19.548 0.689,23.031 4.017,23.031 C 5.471,23.031 6.39,21.459 7.106,20.557 C 7.82,21.459 8.74,23.031 10.195,23.031 C 13.522,23.031 13.66,19.548 12.285,18.216 L 7.661,13.204 C 7.515,13.063 7.227,12.949 7.106,12.949 Z" marker-start="none" marker-end="none"></path> <path d="M 7.598,3.304 L 1.894,9.436 C 1.088,10.614 2.41,11.789 3.5,10.762 L 5.872,8.504 C 5.456,6.881 7.115,5.385 8.371,5.385 L 10.462,5.385 C 12.135,5.385 14.181,7.579 15.136,7.579 C 13.446,7.579 12.033,6.728 11.027,6.728 L 8.43,6.728 C 7.056,6.728 6.931,8.787 8.43,8.787 L 11.019,8.787 C 13.544,8.787 13.746,10.848 15.888,10.848 C 17.104,10.848 19.406,8.723 20.846,7.673 C 21.026,7.541 21.218,7.306 21.062,7.03 L 19.213,3.723 C 19.122,3.58 18.806,3.467 18.551,3.662 L 16.99,4.76 C 16.791,4.896 16.56,4.897 16.22,4.784 L 10.651,2.848 C 9.711,2.596 8.446,2.333 7.598,3.304 Z M 6.661,1.912 C 6.658,1.915 6.65,1.922 6.648,1.925 L 6.442,2.134 L 0.738,8.264 C 0.663,8.338 0.595,8.419 0.536,8.507 C -0.297,9.723 -0.148,11.268 0.917,12.177 C 1.994,13.096 3.552,12.974 4.632,11.956 L 6.761,9.93 L 6.84,9.991 C 6.849,9.997 6.859,10.004 6.868,10.01 C 7.309,10.282 7.844,10.433 8.43,10.433 L 11.019,10.433 C 11.7,10.433 12.01,10.648 12.559,11.094 C 13.124,11.554 14.137,12.494 15.888,12.494 C 17.082,12.494 18.316,11.703 18.976,11.263 C 19.879,10.662 22.374,8.597 23.29,7.958 C 24.117,7.354 24.138,7.041 23.775,6.332 L 21.389,1.9 C 20.586,0.63 19.452,0.963 18.622,1.589 L 16.64,2.968 C 16.495,3.069 16.28,3.087 16.114,3.029 L 11.2,1.297 C 11.164,1.284 11.115,1.268 11.077,1.258 C 10.597,1.129 9.831,0.937 9.016,0.973 C 8.251,1.007 7.393,1.247 6.661,1.912 Z" marker-start="none" marker-end="none"></path> </g> </g> </g> </g> </svg>';

class EventDonation extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    headerText: React.PropTypes.string,
    itemCode: React.PropTypes.string,
    descText: React.PropTypes.string,
    linkTitle: React.PropTypes.string,
    linkText: React.PropTypes.string,
    linkTarget: React.PropTypes.string,
    actionTitle: React.PropTypes.string,
    actionClassName: React.PropTypes.string,
    imageUrl: React.PropTypes.string,
    data: React.PropTypes.array,
  };

  render() {
    return (
      <div id="donationfrom" className={cx("col-md-offset-1 col-md-10 col-lg-offset-1 col-lg-10")}>
        <div className={cx("form-group")}>
          <div className={cx("btn-group")} data-toggle="buttons">



            <label className={cx("btn")}>
              <input type="radio" autoComplete="off" className={cx("default-amount")} value="5" />
                <span className={cx("fa fa-usd")}></span>
                5
            </label>

            <label className={cx("btn active")}>
              <input type="radio" autoComplete="off" className={cx("default-amount")} value="15" />
                <span className={cx("fa fa-usd")}></span>
                15
            </label>

            <label className={cx("btn")}>
              <input type="radio" autoComplete="off" className={cx("default-amount")} value="30" />
                <span className={cx("fa fa-usd")}></span>
                30
            </label>

            <label className={cx("btn")}>
              <input type="radio" autoComplete="off" className={cx("default-amount")} value="50" />
                <span className={cx("fa fa-usd")}></span>
                50
            </label>


          </div>
        </div>
        <div className={cx("form-group")}>
          <div className={cx("input-group")}>
            <div className={cx("input-group-addon")}>
              $
            </div>
            <input type="number" className={cx("form-control")} name="amount" value="25" />
          </div>
        </div>
        <input type="hidden" name="" value="" />
          {/*Do NOT use name="submit" or id="submit" for the Submit button*/ }


          <a role="button" className={cx("btn open-donate-modal")} data-toggle="modal" href="#donateModal">
            <img src="/images/hand.svg" />
            Donate
          </a>



      </div>
    );
  }
}

export default withStyles(s)(EventDonation);
