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
import s from './EventTabCommonBox.css';
import Link from '../Link';
import cx from 'classnames';

class EventTabCommonBox extends React.Component {
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
      <div className={cx("item-container col-md-6")} data-category="Uncategorized" data-order="0" style={{display: "block"}}>
        <div className={cx("card item-card")}>
          <div className={cx("item-name-centered")}>
            <span className={cx("item-name")}>{this.props.headerText}</span>
          </div>
          <div className={cx("card-image")}>
            <div className={cx("carousel-container")}>
              <div id="img-carousel-0" className={cx("")}>
                <div className={cx("carousel-inner")} role="listbox">
                  <div className={cx("item active")}>
                    <a className={cx("item-link center-block")} href="http://www.stagingaccel.com:8080/AccelEventsWebApp/events/jkazarian8/R/RAF">
                      <div className={cx("item-image")}>
                        <div className={cx("item-image-inner")} style={{"background-image": "url("+this.props.imageUrl+")"}}></div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>


            <ul className={cx("social-network social-circle")}>
              <li>
                <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.stagingaccel.com%3A8080%2FAccelEventsWebApp%2Fevents%2Fjkazarian8%2FR%2FRAF" title="Facebook" target="_blank">
                  <i className={cx("fa fa-facebook")}></i>
                </a>
              </li>
              <li>
                <a href="http://twitter.com/home?status=http%3A%2F%2Fwww.stagingaccel.com%3A8080%2FAccelEventsWebApp%2Fevents%2Fjkazarian8%2FR%2FRAF" title="Twitter" target="_blank">
                  <i className={cx("fa fa-twitter")}></i>
                </a>
              </li>
            </ul>

          </div>
          <div className={cx("card-content item-description")}>{this.props.descText}</div>
          <div className={cx("action-wrap")}>
            <div className={cx("card-action")}>
              <div className={cx("flex-row")}>
                <div className={cx("flex-col")}><strong> ITEM CODE: </strong></div>
                <div className={cx("flex-col")}>
                  <span className={cx("item-code")}>{this.props.itemCode}</span>
                  <a href="http://www.stagingaccel.com:8080/AccelEventsWebApp/events/jkazarian8/R/RAF" className={cx("item-link btn btn-sm btn-info pull-right")}>More Info</a>
                </div>
              </div>
              {
                this.props.data.map( (item) =>
                  <div className={cx("flex-row")} key={item.title.toString()}>
                    <div className={cx("flex-col")}><strong> {item.title}: </strong></div>
                    <div className={cx("flex-col")}>
                      <span className={cx("item-tickets-submitted")}>{item.value}</span>
                    </div>
                  </div>)
              }

            </div>
            <div className={cx("text-center")}>
              <a role="button" className={cx(this.props.actionClassName)} data-toggle="modal" href="#info-modal" data-title="Raffle Drawn" data-message="This raffle has already been drawn. No further tickets are being accepted">{this.props.actionTitle}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(EventTabCommonBox);
