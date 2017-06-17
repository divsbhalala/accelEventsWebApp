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
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import history from './../../history';
import Moment from 'react-moment';
import moment from 'moment';

import EventAside from './../../components/EventAside/EventAside';
import EventAuctionBox from './../../components/EventAuctionBox/EventAuctionBox';
import EventTabCommonBox from './../../components/EventTabCommonBox/EventTabCommonBox';
import EventDonation from './../../components/EventDonation/EventDonation';
import PopupModel from './../../components/PopupModal';

import {
	doGetEventData,
	doGetEventTicketSetting,
	doGetSettings,
	doGeItemByCode,
	doGetItemByLimit,
	doGetAuctionItemByLimit,
	doGetRaffleItemByLimit,
	doGetFundANeedItemByLimit,
	storeActiveTabData,
	doOrderTicket,
} from './action/index';
let ar = [1, 2, 3, 4, 5, 6, 7, 8];
class Event extends React.Component {
	static propTypes = {
		title: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			tab: 'The Event',
			totalAuction: ar,
			showBookingTicketPopup: false,
			showMapPopup: false,
			settings: null,
			orderTicket: null,
			auctionPageCount: 0,
			auctionPageLimit: 8,
			auctionPageItems: [],
			auctionPageLoading: true,
			auctionPageCategory: '',
			rafflePageCount: 0,
			rafflePageLimit: 8,
			rafflePageItems: [],
			rafflePageLoading: true,
			rafflePageCategory: '',
			fundANeedPageCount: 0,
			fundANeedPageLimit: 8,
			fundANeedPageItems: [],
			fundANeedPageLoading: true,
			fundANeedPageCategory: '',
			totalTicketQty: 0,
			totalTickets: [],
			totalTicketPrice: 0,
			selectedCategoty: '',
			lastScrollPos: 0,
		};
		this.doGetLoadMoreAuctionItem = this.doGetLoadMoreAuctionItem.bind(this);
		this.showBookingPopup = this.showBookingPopup.bind(this);
		this.hideBookingPopup = this.hideBookingPopup.bind(this);
		this.showMapPopup = this.showMapPopup.bind(this);
		this.hideMapPopup = this.hideMapPopup.bind(this);
		this.setActiveTabState = this.setActiveTabState.bind(this);
		this.doGetAuctionItemByLimit = this.doGetAuctionItemByLimit.bind(this);
		this.doGetRaffleItemByLimit = this.doGetRaffleItemByLimit.bind(this);
		this.doGetFundANeedItemByLimit = this.doGetFundANeedItemByLimit.bind(this);
		this.selectHandle = this.selectHandle.bind(this);
		this.setFilterCategory = this.setFilterCategory.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.doOrderTicket = this.doOrderTicket.bind(this);

	}

	doGetLoadMoreAuctionItem = () => {
		this.doGetAuctionItemByLimit(this.props.params && this.props.params.params);
		setTimeout(() => {
			this.setState({
				totalAuction: ar
			})
		}, 500);

	};
	doGetLoadMoreRaffleItem = () => {
		this.doGetRaffleItemByLimit(this.props.params && this.props.params.params);
		setTimeout(() => {
			this.setState({
				totalAuction: ar
			})
		}, 500);

	};
	doGetLoadMoreFundANeedItem = () => {
		this.doGetFundANeedItemByLimit(this.props.params && this.props.params.params);
		setTimeout(() => {
			this.setState({
				totalAuction: ar
			})
		}, 500);

	};
	showBookingPopup = (e) => {
		e.preventDefault();
		this.setState({
			showBookingTicketPopup: true
		})
	};
	hideBookingPopup = () => {
		this.setState({
			showBookingTicketPopup: false
		})
	};
	showMapPopup = (e) => {
		e.preventDefault();
		this.setState({
			showMapPopup: true
		})
	};
	hideMapPopup = () => {
		this.setState({
			showMapPopup: false
		})
	};

	componentWillMount() {
		this.props.doGetEventData(this.props.params && this.props.params.params);
		//this.props.doGetEventTicketSetting(this.props.params && this.props.params.params);
		this.props.doGetSettings(this.props.params && this.props.params.params, 'ticketing').then(resp => {
			this.setState({
				settings: resp && resp.data
			});
		}).catch(error => {
			history.push('/404');
		});
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	setActiveTabState = (label) => {
		this.setState({tab: label});
		this.props.storeActiveTabData({tab: label, lastScrollPos: this.state.lastScrollPos});

		if (label && (label == 'Auction' || label == 'Raffle' || label == 'Fund a Need' || label == 'The Event' || label == 'Donation' )) {
			if (label == 'Auction') {
				label = 'auction';
				this.doGetAuctionItemByLimit(this.props.params && this.props.params.params);

			} else if (label == 'Raffle') {
				label = 'raffle';
				this.doGetRaffleItemByLimit(this.props.params && this.props.params.params);

			} else if (label == 'Fund a Need') {
				label = 'fundaneed';
				this.doGetFundANeedItemByLimit(this.props.params && this.props.params.params);

			} else if (label == 'The Event') {
				label = 'ticketing';
			} else if (label == 'Donation') {
				label = 'donation';
			}
			this.props.doGetSettings(this.props.params && this.props.params.params, label).then(resp => {
				this.setState({
					settings: resp && resp.data
				});
			})
				.catch(error => {
					console.log(error);
					// history.push('/404');
				});
		}
	};

	doGetAuctionItemByLimit(eventUrl) {
		this.props.doGetAuctionItemByLimit(eventUrl, this.state.auctionPageCount, this.state.auctionPageLimit, this.state.auctionPageCategory).then(resp => {
			if (resp && resp.data && resp.data.items) {
				if (resp.data && resp.data.items.length < this.state.auctionPageLimit) {
					this.setState({
						auctionPageLoading: false
					})
				}
				this.setState({
					auctionPageItems: this.state.auctionPageItems.concat(resp.data && resp.data.items),
					auctionPageCount: this.state.auctionPageCount + 1

				})
			}
			else {
				this.setState({
					auctionPageLoading: false
				})
			}
		}).catch(error => {
			this.setState({
				auctionPageLoading: false
			})
		})
	}


	doGetRaffleItemByLimit(eventUrl) {
		this.props.doGetRaffleItemByLimit(eventUrl, this.state.rafflePageCount, this.state.rafflePageLimit, this.state.rafflePageCategory).then(resp => {
			if (resp && resp.data && resp.data.items) {
				if (resp.data && resp.data.items.length < this.state.rafflePageLimit) {
					this.setState({
						rafflePageLoading: false
					})
				}
				this.setState({
					rafflePageItems: this.state.rafflePageItems.concat(resp.data.items),
					rafflePageCount: this.state.rafflePageCount + 1

				})
			}
			else {
				this.setState({
					rafflePageLoading: false
				})
			}
		}).catch(error => {
			this.setState({
				rafflePageLoading: false
			})
		})
	}


	doGetFundANeedItemByLimit(eventUrl) {
		this.props.doGetFundANeedItemByLimit(eventUrl, this.state.fundANeedPageCount, this.state.fundANeedPageLimit, this.state.fundANeedPageCategory).then(resp => {
			if (resp && resp.data && resp.data.items) {
				if (resp.data && resp.data.items.length < this.state.fundANeedPageLimit) {
					this.setState({
						fundANeedPageLoading: false
					})
				}
				this.setState({
					fundANeedPageItems: this.state.fundANeedPageItems.concat(resp.data.items),
					fundANeedPageCount: this.state.fundANeedPageCount + 1

				})
			}
			else {
				this.setState({
					fundANeedPageLoading: false
				})
			}
		}).catch(error => {
			this.setState({
				fundANeedPageLoading: false
			})
		})
	}

	selectHandle(e) {
		let totalTickets = this.state.totalTickets;
		totalTickets[e.target.name] = {
			price: e.target.dataset && e.target.dataset.price,
			numberofticket: e.target.value,
			tickettypeid: e.target.name
		};
		let totalPrice = 0;
		totalTickets.map(item => {
			//console.log(item)
			totalPrice += item.price * item.numberofticket;
		});
		this.setState({
			totalTickets: totalTickets,
			totalTicketQty: 0 + parseInt(e.target.value) + this.state.totalTicketQty,
			totalTicketPrice: totalPrice,
		});
	}

	setFilterCategory = (category)=> {
		if (this.props.active_tab_data && this.props.active_tab_data.tab) {
			let label = this.props.active_tab_data && this.props.active_tab_data.tab;
			this.setState({
				selectedCategoty: category
			})
			if (label == 'Auction') {
				this.setState({
					auctionPageCategory: category,
					auctionPageLoading: true,
					auctionPageCount: 0,
					auctionPageItems: [],
				});
				setTimeout(() => {
					this.doGetAuctionItemByLimit(this.props.params && this.props.params.params);
				}, 500);

			} else if (label == 'Raffle') {
				this.setState({
					rafflePageCategory: category,
					rafflePageLoading: true,
					rafflePageCount: 0,
					rafflePageItems: [],
				})
				this.doGetRaffleItemByLimit(this.props.params && this.props.params.params);

			} else if (label == 'Fund a Need') {
				this.setState({
					fundANeedPageCategory: category,
					fundANeedPageCount: 0,
					fundANeedPageLoading: true,
					fundANeedPageItems: [],
				});
				this.doGetFundANeedItemByLimit(this.props.params && this.props.params.params);

			}
		}
	};

	handleScroll(event) {
		/*if(this.props.title && this.props.title=='Event Page'){
		 var body  = document.querySelector('body');
		 this.setState({
		 lastScrollPos:body.scrollTop,
		 });
		 console.log('this.props.active_tab_data && this.props.active_tab_data.tab',this.props.active_tab_data, this.props.active_tab_data && this.props.active_tab_data.tab)
		 this.props.storeActiveTabData({tab:this.props.active_tab_data && this.props.active_tab_data.tab,lastScrollPos:body.scrollTop});
		 }*/

	}

	doOrderTicket() {
		let Data = {};
		Data.clientDate = moment().format('DD/MM/YYYY hh:mm:ss');
		let ticketings = this.state.totalTickets;
		ticketings = ticketings.filter(function (n) {
			return n != null
		});
		ticketings = ticketings.map(function (obj) {
			return {"numberOfTicket": parseInt(obj.numberofticket), "ticketTypeId": parseInt(obj.tickettypeid)};
		});
		Data.ticketings = ticketings;
		this.setState({
			orderTicket: null
		});
		let eventUrl = this.props.params && this.props.params.params;
		this.props.doOrderTicket(eventUrl, Data)
			.then(resp => {
				if (resp && resp.data && resp.data.orderId) {
					history.push('/checkout/' + eventUrl + '/tickets/order/' + resp.data.orderId);
				}
				else {
					this.setState({
						orderTicket: "Error while Oraring Tickets"
					})
				}
			}).catch(error => {
			this.setState({
				orderTicket: "Error while Oraring Tickets"
			})
		})
	}

	render() {
		let makeItem = function (i) {
			let item = [];
			for (let j = 0; j <= i; j++) {
				item.push(<option value={j} key={i + Math.random()}>{j}</option>)
			}
			return item;
		};
		return (
			<div className="row">
				<div className="col-lg-12">
					{this.props.eventData && this.props.eventData.eventDesignDetail && this.props.eventData.eventDesignDetail.is_banner_image_enabled &&
					<div className="row">
						<div className={cx("header-img", "text-center")}>
							<img
								src={ this.props.eventData && this.props.eventData.eventDesignDetail && this.props.eventData.eventDesignDetail.banner_image ? "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/0-1900x300/" + this.props.eventData.eventDesignDetail.banner_image : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/0-1900x300/d631f896-be71-4e95-9d29-9ce501f7a4b8_fall_formal_2015.png"}
								className={cx("img-responsive", "img-banner")} style={{width: "100%"}}/>
						</div>
					</div>}
					<div id="content-wrapper">
						<div className="row">
							<div className="col-lg-3 col-md-4 col-sm-4">
								<EventAside activeTab={(this.props.active_tab_data && this.props.active_tab_data.tab) || this.state.tab}
								            eventData={this.props.eventData}
								            settings={this.state.settings}
								            eventTicketData={this.props.eventTicketData}
								            showBookingPopup={this.showBookingPopup}
								            showMapPopup={this.showMapPopup} activeCategory={true}
								            authenticated={this.props.authenticated}
								            setFilterCategory={this.setFilterCategory}
								            selectedCategoty={this.state.selectedCategoty}
								/>
							</div>
							<div className="col-lg-9 col-md-8 col-sm-8 ">
								<div className="main-box">
									<Tabs onSelect={ (index, label) => {
                    this.setActiveTabState(label)
                  } } selected={this.props.active_tab_data && this.props.active_tab_data.tab} className="tabs-wrapper">
										<Tab label="The Event">
											<div className={cx("row item-canvas")}>
												<div
													className={cx("mrg-t-lg mrg-b-lg pad-t-lg pad-r-lg pad-b-lg pad-l-lg event-description-display")}></div>
											</div>
											<div className={cx("row text-center")}>
												<div className={cx("col-md-offset-3 col-md-6")}>
													<a onClick={this.showBookingPopup}
													   className={cx("btn btn-block btn-lg btn-orange ")}>&nbsp; &nbsp; &nbsp; &nbsp; Buy
														Tickets&nbsp; &nbsp; &nbsp; &nbsp; </a>
												</div>
											</div>
										</Tab>
										<Tab label="Auction">
											<div className="row">
												<InfiniteScroll
													next={this.doGetLoadMoreAuctionItem}
													hasMore={this.state.auctionPageLoading}
													loader={<h4 className="text-center mrg-t-md"><span
                            className="fa fa-spinner fa-pulse fa-fw"></span></h4>}>
													{
														this.state.auctionPageItems.map((item) =>
															<EventTabCommonBox key={item.id + Math.random().toString()}
															                   type="auction"
															                   headerText={item.name}
															                   itemCode={item.code}
															                   isSharable={this.props.eventData && this.props.eventData.eventDesignDetail && this.props.eventData.eventDesignDetail.socialSharingEnabled}
															                   data={
                                                   [
                                                     {
                                                       title: item.currentBid != 0 ? "CURRENT BID" : "Starting Bid",
                                                       value: item.currentBid != 0 ? '$' + item.currentBid : '$' + item.startingBid
                                                     }
                                                   ]
                                                 }
															                   descText={item.excerpt}
															                   images={item.images}
															                   imageUrl={ item.images && item.images.length > 0 ? 'http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/' + item.images[0].imageUrl : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"}
															                   actionTitle={item.purchased ? null : (this.state.settings && moment(this.state.settings.endDate).diff(moment()) <= 0) ? "Bidding Closed" : "Bid"}
															                   actionClassName={ item.purchased || (this.state.settings && moment(this.state.settings.endDate).diff(moment()) <= 0) ? "btn btn-primary disabled" : "btn btn-success w-50"}
															                   auctionPurchaseFor={ item.purchased}
															                   buyItNowPrice={ item.buyItNowPrice > 0 ? "Buy now $" + item.buyItNowPrice : null}
															                   auctionBuyNowTitle={ (item.purchased ? "Purchased for $" + item.currentBid : null)}
															                   auctionBuyNowClassName="item-link btn btn-success actionlinks"
															                   marketValue={item.marketValue > 0 ? '$' + item.marketValue : null}
															                   marketValueLabel={item.marketValue > 0 ? 'Market Value' : null}
															/>
														)
													}
												</InfiniteScroll>
											</div>
										</Tab>
										<Tab label="Raffle">
											<div className="row">
												<InfiniteScroll
													next={this.doGetLoadMoreRaffleItem}
													hasMore={this.state.rafflePageLoading}
													loader={<h4 className="text-center mrg-t-md"><span
                            className="fa fa-spinner fa-pulse fa-fw"></span></h4>}>
													{
														this.state.rafflePageItems.map((item) =>
															<EventTabCommonBox key={item.id + Math.random().toString()}
															                   type="raffle"
															                   headerText={item.name}
															                   itemCode={item.code}
															                   isSharable={this.props.eventData && this.props.eventData.eventDesignDetail && this.props.eventData.eventDesignDetail.socialSharingEnabled}
															                   data={
                                                   [
                                                     {
                                                       title: "TICKETS SUBMITTED",
                                                       value: item.ticketsSubmitted ? item.ticketsSubmitted : 0
                                                     }
                                                   ]
                                                 }
															                   descText={item.excerpt}
															                   images={item.images}
															                   imageUrl={ item.images && item.images.length > 0 ? 'http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/' + item.images[0].imageUrl : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"}
															                   actionTitle={item.purchased ? null : (this.state.settings && moment(this.state.settings.endDate).diff(moment()) <= 0) ? "Raffle Closed" : "Raffle"}
															                   actionClassName={ item.purchased || (this.state.settings && moment(this.state.settings.endDate).diff(moment()) <= 0) ? "btn btn-primary disabled" : "btn btn-success w-50"}
															/>
														)
													}
												</InfiniteScroll>
											</div>
										</Tab>
										<Tab label="Fund a Need">
											<div className="row">
												<InfiniteScroll
													next={this.doGetLoadMoreFundANeedItem}
													hasMore={this.state.fundANeedPageLoading}
													loader={<h4 className="text-center mrg-t-md"><span
                            className="fa fa-spinner fa-pulse fa-fw"></span></h4>}>
													{
														this.state.fundANeedPageItems.map((item) =>
															<EventTabCommonBox key={item.id + Math.random().toString()}
															                   type="fund"
															                   headerText={item.name}
															                   itemCode={item.code}
															                   isSharable={this.props.eventData && this.props.eventData.eventDesignDetail && this.props.eventData.eventDesignDetail.socialSharingEnabled}
															                   data={
                                                   [
                                                     {
                                                       title: "MINIMUM PLEDGE",
                                                       value: item.pledgePrice ? item.pledgePrice : 0
                                                     }
                                                   ]
                                                 }
															                   descText={item.excerpt}
															                   imageUrl={ item.images && item.images.length > 0 ? 'http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/' + item.images[0].imageUrl : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"}
															                   images={item.images}
															                   actionTitle={item.purchased ? null : (this.state.settings && moment(this.state.settings.endDate).diff(moment()) <= 0) ? "PLEDGing Closed" : "PLEDGE"}
															                   actionClassName={ item.purchased || (this.state.settings && moment(this.state.settings.endDate).diff(moment()) <= 0) ? "btn btn-primary disabled" : "btn btn-success w-50"}

															/>
														)
													}
												</InfiniteScroll>
											</div>
										</Tab>
										<Tab label="Donation">
											<div className="row"><EventDonation /></div>
										</Tab>
									</Tabs>
								</div>

							</div>

						</div>

					</div>
				</div>
				<PopupModel
					id="bookingPopup"
					showModal={this.state.showBookingTicketPopup}
					headerText="Register"
					modelBody=''
					onCloseFunc={this.hideBookingPopup}
				>
					<form action="/AccelEventsWebApp/u/checkout/jkazarian8/orderTicket" method="POST">
						<div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>
							{
								this.state.settings && this.state.settings.tickeTypes && (this.state.settings.tickeTypes).map(item =>
									<div className="sale-card" key={item.typeId.toString()}>
										<div className="flex-row">
											<div className="flex-col">
												<div className="type-name"><strong>{item.name}</strong>
													(<span className="type-cost txt-sm gray"> ${item.price}</span>)
													<div className="pull-right">
														<div className="col-md-7">No Of Tickets</div>
														{ item.remaniningTickets && item.remaniningTickets > 0 ? <div className="col-md-5">
															<select className="form-control" name={item.typeId} data-price={item.price}
															        disabled = {moment(item.endDate).diff(moment()) <= 0}
															        onChange={this.selectHandle}
															        value={this.state.totalTickets && this.state.totalTickets[item.typeId] && this.state.totalTickets[item.typeId].numberofticket ? this.state.totalTickets[item.typeId].numberofticket : 0}>
																{makeItem(item.remaniningTickets > 10 ? 10 : item.remaniningTickets).map(item => item)}
															</select>
														</div> : ''}
														{
															!item.remaniningTickets && <div className="col-md-5"> SOLD OUT </div>
														}
													</div>
												</div>
												<div
													className="sale-text txt-sm text-uppercase"> {moment(item.endDate).diff(moment()) > 0 ? "Available until " : "Sale Ended on "}
													<Moment format="MMMM D YYYY">{item.endDate}</Moment></div>
												{item.ticketsPerTable && item.ticketsPerTable > 0 ?
													<div className="sale-text txt-sm text-uppercase">Each table has {item.ticketsPerTable}
														tickets</div> : ''}
												{/*<div className="txt-sm gray type-desc">
												 sadfw
												 </div>*/}
											</div>
										</div>
									</div>
								)
							}


							{/*<div className="sale-card">
							 <div className="flex-row">
							 <div className="flex-col">
							 <div className="type-name">
							 <strong>First ticket type</strong>
							 (<span className="type-cost txt-sm gray"> $100.00 </span>)
							 <div className="pull-right">
							 <div className="col-md-7">No Of Tickets</div>
							 <div className="col-md-5"> SOLD OUT </div>
							 </div>
							 </div>
							 <div className="sale-text txt-sm text-uppercase">Sale Ended on Apr 12, 2017</div>
							 </div>
							 </div>
							 </div>*/}
							<div className="status-bar clearfix mrg-t-lg">
								<div className="pull-left">
									<span> QTY:<span className="qty">{this.state.totalTicketQty}</span> </span>
                  <span
	                  className="total-price">{this.state.totalTicketPrice ? this.state.totalTicketPrice : 'FREE'}</span>
								</div>
								<div className="pull-right">
									<button type="button" className="btn btn-success" id="checkout-tickets" onClick={this.doOrderTicket}>
										checkout
									</button>
								</div>
							</div>
						</div>
					</form>
				</PopupModel>

				<PopupModel
					id="mapPopup"
					showModal={this.state.showMapPopup}
					headerText="Event Location"
					onCloseFunc={this.hideMapPopup}
				>
					<div><h1>Location</h1></div>
				</PopupModel>
			</div>
		);
	}
}

const mapDispatchToProps = {
	doGetEventData: (eventUrl) => doGetEventData(eventUrl),
	doGetEventTicketSetting: (eventUrl) => doGetEventTicketSetting(eventUrl),
	doGeItemByCode: (eventUrl, itemCode, type) => doGeItemByCode(eventUrl, itemCode, type),
	doGetItemByLimit: (eventUrl, page, size, type) => doGetItemByLimit(eventUrl, page, size, type),
	doGetAuctionItemByLimit: (eventUrl, page, size, type) => doGetAuctionItemByLimit(eventUrl, page, size, type),
	doGetRaffleItemByLimit: (eventUrl, page, size, type) => doGetRaffleItemByLimit(eventUrl, page, size, type),
	doGetFundANeedItemByLimit: (eventUrl, page, size, type) => doGetFundANeedItemByLimit(eventUrl, page, size, type),
	doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
	storeActiveTabData: (tab) => storeActiveTabData(tab),
	doOrderTicket: (eventUrl, dto) => doOrderTicket(eventUrl, dto),
};
const mapStateToProps = (state) => ({
	eventData: state.event && state.event.data,
	eventTicketData: state.event && state.event.ticket_data,
	eventRaffleData: state.event && state.event.raffle_data,
	eventFundData: state.event && state.event.fund_data,
	eventDonationData: state.event && state.event.donation_data,
	user: state.session.user,
	authenticated: state.session.authenticated,
	active_tab_data: state.event && state.event.active_tab_data,
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Event));
//export default (withStyles(s)(Event));
