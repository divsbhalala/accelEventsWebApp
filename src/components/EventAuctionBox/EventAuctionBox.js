import {connect} from 'react-redux';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EventAuctionBox.css';
import Link from '../Link';
import cx from 'classnames';

class EventAuctionBox extends React.Component {
  render() {
    return (
      <div className="item-container col-md-6">
        <div className={cx("card", "item-card")}>
          <div className={cx("item-name-centered")}>
            <span className={cx("item-name")}>Louis Vuitton Sunglasses</span>
          </div>
          <div className={cx("card-image")}>

            <div className={cx("default-img", "item-image")} style={{display: "block"}}>
              <div className={cx("item-image-inner", s.itemImageInner)}></div>
            </div>

          </div>
          <div className={cx("card-content", "item-description")}>Trendy Louis Vuitton Sunglasses - Like New</div>
          <div className={cx("action-wrap")}>
            <div className={cx("card-action")}>
              <div className={cx("flex-row")}>
                <div className={cx("flex-col")}><strong> ITEM CODE:</strong></div>
                <div className={cx("flex-col")}>
                  <span className={cx("item-code")}>SLV</span>
                  <a href="http://www.stagingaccel.com:8080/AccelEventsWebApp/events/jkazarian8/A/SLV"
                     className={cx("item-link", "btn", "btn-sm", "btn-info", "pull-right")}>More Info</a>
                </div>
              </div>
              <div className={cx("flex-row")}>
                <div className={cx("flex-col")}>
                  <strong className={cx("current-bid-label")}> CURRENT BID: </strong>
                </div>
                <div className={cx("flex-col")}>
                  {this.props.currencySymbol}<span className={cx("current-bid")}>425</span>
                </div>
              </div>

            </div>
            <div className={cx("text-center", "action-btns")}>
              <a role="button" className={cx("btn", "btn-primary", "disabled")} data-toggle="modal" href="#info-modal"
                 data-title="Auction Completed" data-message="Bid are no longer being accepted for this auction">Bidding
                Closed</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
	currencySymbol : (state.host && state.host.currencySymbol) || "$"
});
export default connect(mapStateToProps, mapDispatchToProps)(EventAuctionBox);
