
import React from 'react';
import  PropTypes   from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EventTabCommonBox.css';
import Link from '../Link';
import cx from 'classnames';
import {connect} from 'react-redux';

import  {Carousel} from 'react-responsive-carousel';
import { setOpenedTabCache } from './../../routes/event/action/index';

class ImageList extends React.Component {
  render() {
    let img = '';
    return (
      <div>
        <div className={cx("item-image-inner")}
             style={{"backgroundImage": "url(" + this.props.imageUrl + ")"}}></div>

      </div>

    );
  }
}

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
    isSharable: PropTypes.bool,
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

  setCache = () => {
    let height = document.body.scrollTop;
    if(this.props.type == 'A'){
        this.props.setOpenedTabCache({type:'A',height:height});
    }else if(this.props.type == 'R'){
        this.props.setOpenedTabCache({type:'R',height:height});
    }else{
        this.props.setOpenedTabCache({type:'F',height:height});
    }
  }
  render() {
    return (
      <div className={cx("item-container col-md-6")} data-category="Uncategorized" data-order="0"
           style={{display: "block"}}>
        <div className={cx("card item-card")}>
          <div className={cx("item-name-centered")}>
            <span className={cx("item-name")}>{this.props.headerText}</span>
          </div>
          <div className={cx("card-image")}>
            <div className={cx("carousel-container")}>
              <div id="img-carousel-0" className={cx("")}>
                <div className={cx("carousel-inner")} role="listbox">
                  <div className={cx("item active")}>
                    <a className={cx("item-link center-block")}
                       onClick={() => {
                       }}>
                      <div className={cx("item-image")}>
                        {/*<div className={cx("item-image-inner")}
                         style={{"backgroundImage": "url(" + this.props.imageUrl + ")"}}></div>*/}
                        <Carousel axis="horizontal" showThumbs={false} showStatus={false} showIndicators={false}
                                  showArrows={true} dynamicHeight emulateTouch>
                          {this.props.images && this.props.images.length > 0 ?
                            this.props.images.map((item, index) =>
                              <ImageList key={index} item={item}
                                         imageUrl={item.imageUrl ? 'http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/' + item.imageUrl : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"}/>
                            ) : <div className="item-image-inner" style={{
                              backgroundImage: 'url("http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg")',
                              width: '',
                              transform: 'rotate(0deg)'
                            }}/>
                          }
                        </Carousel>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>


            { this.props.isSharable  &&
            <ul className={cx("social-network social-circle")}>
              <li>
                <a
                  href={"https://www.facebook.com/sharer/sharer.php?u=" + location.href}
                  title="Facebook" target="_blank">
                  <i className={cx("fa fa-facebook")}/>
                </a>
              </li>
              <li>
                <a
                  href={"http://twitter.com/home?status=" + location.href}
                  title="Twitter" target="_blank">
                  <i className={cx("fa fa-twitter")}/>
                </a>
              </li>
            </ul>}

          </div>
          <div className={cx("card-content item-description")}
	dangerouslySetInnerHTML={{__html: this.props.descText}}/>
          <div className={cx("action-wrap")}>
            <div className={cx("card-action")}>
              <div className={cx("flex-row")}>
                <div className={cx("flex-col")}><strong> ITEM CODE: </strong></div>
                <div className={cx("flex-col")}>
                  <span className={cx("item-code")}>{this.props.itemCode}</span>
                  <Link onClick={this.setCache} to={location.pathname + '/' + this.props.type + '/' + this.props.itemCode}
                        className={cx("item-link btn btn-sm btn-info pull-right")}>More Info</Link>
                </div>
              </div>
              {
                this.props.data.map((item) =>
                  <div className={cx("flex-row")} key={item.title.toString()}>
                    <div className={cx("flex-col")}><strong> {item.title}: </strong></div>
                    <div className={cx("flex-col")}>
                      <span className={cx("item-tickets-submitted")}>{item.value}</span>
                    </div>
                  </div>)
              }
              { this.props.marketValue && this.props.marketValueLabel && <div className={cx("flex-row")}>
                <div className={cx("flex-col")}><strong> {this.props.marketValueLabel}: </strong></div>
                <div className={cx("flex-col")}>
                  <span className={cx("item-tickets-submitted")}>{this.props.marketValue}</span>
                </div>
              </div>}

            </div>
            <div
              className={cx("text-center", "action-btns")}>
              { this.props.actionTitle &&
              <Link onClick={this.setCache} role="button" to={this.props.type + '/' + this.props.itemCode}
                    className={cx(this.props.actionClassName)}
                    >{this.props.actionTitle}</Link>}
              { this.props.auctionBuyNowTitle && !this.props.auctionPurchaseFor &&
              <Link onClick={this.setCache} role="button" to={this.props.type + '/' + this.props.itemCode}
                    className={cx(this.props.auctionBuyNowClassName)}>{this.props.auctionBuyNowTitle}</Link>}
              { this.props.buyItNowPrice && !this.props.auctionPurchaseFor &&
              <Link onClick={this.setCache} role="button" to={this.props.type + '/' + this.props.itemCode}
                    className={cx(this.props.auctionBuyNowClassName)}>{this.props.buyItNowPrice}</Link>}
              { this.props.auctionBuyNowTitle && this.props.auctionPurchaseFor && <div className={cx("purchased")}>
                <div className={cx("alert alert-success mrg-b-0 alert-height")}> {this.props.auctionBuyNowTitle}</div>
              </div> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  setOpenedTabCache: (data) => setOpenedTabCache(data),
};

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(EventTabCommonBox));
