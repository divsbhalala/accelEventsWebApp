/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import  PropTypes   from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EventTabCommonBox.css';
import Link from '../Link';
import cx from 'classnames';

class EventTabCommonBox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    headerText: PropTypes.string,
    itemCode: PropTypes.string,
    descText: PropTypes.string,
    linkTitle: PropTypes.string,
    linkText: PropTypes.string,
    linkTarget: PropTypes.string,
    isSharable: PropTypes.string,
    actionTitle: PropTypes.string,
    actionClassName: PropTypes.string,
    imageUrl: PropTypes.string,
    data: PropTypes.array,
    auctionPurchaseFor: PropTypes.bool,
    auctionBuyNowTitle: PropTypes.string,
    auctionBuyNowClassName: PropTypes.string,
    marketValue: PropTypes.string,
    marketValueLabel: PropTypes.string,
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
                        <div className={cx("item-image-inner")} style={{"backgroundImage": "url("+this.props.imageUrl+")"}}></div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>


            { this.props.isSharable && this.props.isSharable=='true' && <ul className={cx("social-network social-circle")}>
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
            </ul>}

          </div>
          <div className={cx("card-content item-description")} dangerouslySetInnerHTML={{__html:this.props.descText}}></div>
          <div className={cx("action-wrap")}>
            <div className={cx("card-action")}>
              <div className={cx("flex-row")}>
                <div className={cx("flex-col")}><strong> ITEM CODE: </strong></div>
                <div className={cx("flex-col")}>
                  <span className={cx("item-code")}>{this.props.itemCode}</span>
                  <Link to={location.pathname+'/'+this.props.type+'/'+this.props.itemCode} className={cx("item-link btn btn-sm btn-info pull-right")}>More Info</Link>
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
              { this.props.marketValue && this.props.marketValueLabel && <div className={cx("flex-row")} >
                <div className={cx("flex-col")}><strong> {this.props.marketValueLabel}: </strong></div>
                <div className={cx("flex-col")}>
                  <span className={cx("item-tickets-submitted")}>{this.props.marketValue}</span>
                </div>
              </div>}

            </div>
            <div className={cx("text-center", "action-btns")}>{console.log(this.props.headerText,this.props.auctionPurchaseFor)}
              { this.props.actionTitle && <Link role="button" to={location.pathname+'/'+this.props.type+'/'+this.props.itemCode} className={cx(this.props.actionClassName)} style={{width:'50%'}}>{this.props.actionTitle}</Link>}&nbsp;&nbsp;
              { this.props.auctionBuyNowTitle && !this.props.auctionPurchaseFor && <Link role="button" to={location.pathname+'/'+this.props.type+'/'+this.props.itemCode} className={cx(this.props.auctionBuyNowClassName)} >{this.props.auctionBuyNowTitle}</Link>} &nbsp;&nbsp;
              { this.props.buyItNowPrice && !this.props.auctionPurchaseFor && <Link role="button" to={location.pathname+'/'+this.props.type+'/'+this.props.itemCode} className={cx(this.props.auctionBuyNowClassName)} >{this.props.buyItNowPrice}</Link>} &nbsp;&nbsp;
              { this.props.auctionBuyNowTitle && this.props.auctionPurchaseFor && <div className={cx("purchased")}>
                <div className={cx("alert alert-success mrg-b-0")}> {this.props.auctionBuyNowTitle}</div>
              </div> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(EventTabCommonBox);
