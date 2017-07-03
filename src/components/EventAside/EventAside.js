import React from 'react';
import PropTypes   from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EventAside.css';
import Link from '../Link';
import cx from 'classnames';
import Moment from 'react-moment';
import moment from 'moment';
import PopupModel from './../PopupModal';
import BuyRaffleTicketsModal from './../../components/BuyRaffleTicketsModal'

var countDownInterval = null;

class EventAside extends React.Component {
	static propTypes = {
		activeTab: PropTypes.string,
		buyItNowPrice: PropTypes.string,
		selectedCategoty: PropTypes.string,
		showBookingPopup: PropTypes.func,
		onEnd: PropTypes.func,
		showMapPopup: PropTypes.func,
		setFilterCategory: PropTypes.func,
		eventData: PropTypes.object,
		eventTicketData: PropTypes.object,
		settings: PropTypes.object,
		activeCategory: PropTypes.bool,
		isClosed: PropTypes.bool,
		isBidInstructionHidden: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.state = {
			showBuyRaffleTicketPopup: false,
			filterCategory: '',
			searchString: '',
			isshowBuyRaffleTicketsModal: false,
			days: 0,
			hours: 0,
			minute: 0,
			seconds: 0,

		};
		this.showBuyRaffleTicketPopup = this.showBuyRaffleTicketPopup.bind(this);
		this.hideBuyRaffleTicketPopup = this.hideBuyRaffleTicketPopup.bind(this);
		this.setCountDown = this.setCountDown.bind(this);

	}

	showBuyRaffleTicketPopup = () => {
		this.setState({
			showBuyRaffleTicketPopup: this.props.authenticated
		})
	};
	hideBuyRaffleTicketPopup = () => {
		this.setState({
			showBuyRaffleTicketPopup: false
		})
	};
	serachString = (e) => {
		this.props.setSearchString(this.serachKey.value);
	};
	showBuyRaffleTicketsModal = () => {
		this.setState({
			isshowBuyRaffleTicketsModal: true
		})
	};
	hideBuyRaffleTicketsModal = () => {
		this.setState({
			isshowBuyRaffleTicketsModal: false
		})
	};
	setCountDown=()=>{
		let interval = 1000;
		let self=this;
		countDownInterval = setInterval(function(){
			let eventTime=moment();
			if(self.props.settings && self.props.settings.endDate){
				eventTime = moment(self.props.settings.endDate);
			}
			let days =  moment(eventTime).diff(moment(), 'days');
			let hours = moment(eventTime).add(-days, 'days').diff(moment(), 'hours');
			let minute = moment(eventTime).add(-days, 'days').add(-hours, 'hours').diff(moment(), 'minutes');
			let seconds = moment(eventTime).add(-days, 'days').add(-hours, 'hours').add(-minute, 'minutes').diff(moment(), 'seconds');

			// let duration = moment.duration(duration - interval, 'milliseconds');
			self.setState({
				days: days <= 0 ? "00": days,
				hours: hours <= 0 ? "00": hours <=9 ? ("0" +hours).slice(-2) : hours,
				minute: minute <= 0 ? "00":minute <=9 ? ("0" +minute).slice(-2) : minute,
				seconds: seconds <= 0 ? "00": seconds <=9 ? ("0" +seconds).slice(-2) : seconds,
			});

			if( !days && !hours && !minute && !seconds){
				if(countDownInterval){
					clearInterval(countDownInterval);
				}
				//self.props.onEnd();
			}
		}, interval);
	};
	componentWillUnmount(){
		if(countDownInterval){
			clearInterval(countDownInterval);
		}
	}
	render() {
		return (
			<div>
				<BuyRaffleTicketsModal
					showModal={this.state.isshowBuyRaffleTicketsModal}
					headerText=""
					onCloseFunc={this.hideBuyRaffleTicketsModal}
					params={this.props.params}/>
				<script type="text/javascript"
								src="//maps.google.com/maps/api/js?sensor=false&amp;libraries=places&amp;key=AIzaSyCTdjRtF5L54QIJdEQ8DyXlf2umq6MpvEw"></script>
				<div className={cx("main-box", "clearfix")}>
					<header className={cx("main-box-header", "clearfix")}>
						<h2>jkazarian8</h2>
					</header>
					<div className={cx("main-box-body", "clearfix")}>
						{}
						{ this.props.eventData && this.props.eventData.eventDesignDetail && this.props.eventData.eventDesignDetail.logoEnabled &&
						<img
							src={"http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/" + this.props.eventData.eventDesignDetail.logoImage}
							className="img-responsive center-block"/>
						}
						{ this.props.activeTab && (this.props.activeTab == 'The Event' ) &&
						<div className={cx("the-event", "mrg-t-lg")}>
							{ this.props.showBookingPopup && <a onClick={this.props.showBookingPopup}
																									className={cx("btn", "btn-block", "btn-lg", "btn-orange", this.props.settings ? "" : "disabled")}>Buy
								Tickets</a>}
							<div className={cx("box")}>
								<div className={cx("box-title", "text-uppercase")}>date and time</div>
								<div className={cx("box-content")}>
									{this.props.settings && this.props.settings.startDate && <Moment format="ddd MMMM D YYYY, h:mm A"
																																									 tz={this.props.eventData && this.props.eventData.timezoneId}>{this.props.settings.startDate}</Moment>}
									-
									{this.props.settings && this.props.settings.endDate && <Moment format="ddd MMMM D YYYY, h:mm A"
																																								 tz={this.props.eventData && this.props.eventData.timezoneId}>{this.props.settings.endDate}</Moment>}
									<br />
									<time>
										<span className="hide"> (America/New_York)</span>
									</time>
									<br />
									<a className="hide" href="#">Add to calendar</a>
								</div>
							</div>
							<div className="box">
								<div className={cx("box-title", "text-uppercase")}>Location</div>
								<div className="box-content">
									<address>
										{this.props.settings && this.props.settings.address}
									</address>
									{this.props.showMapPopup && <a onClick={this.props.showMapPopup}>View on Map</a>}
								</div>
							</div>
						</div> }
						{ !this.props.isBidInstructionHidden && this.props.activeTab && !(this.props.activeTab == 'The Event' || this.props.activeTab == 'Donation' ) && this.props.eventData && this.props.eventData.eventDesignDetail && this.props.eventData.eventDesignDetail.txtMsgBidInstShown &&
						<div className={cx("card bidinfo")}>
							{this.props.activeTab == 'Raffle' &&
							<p className={cx("raffle-text")}>Submit your tickets here or text your ticket submission to: (410)
								927-5356 with the item's three letter code, and your desired number of tickets ex. ABC10</p>}
							{ (this.props.activeTab == 'Donation' || this.props.activeTab == 'Auction' || this.props.activeTab == 'The Event' || this.props.activeTab == 'Fund a Need' )
							&& <p className={cx("causeauction-text donation-text auction-text")}>Bid here or text Your Bid To: (410)
								927-5356 with the item's three letter code and bid amount ex. ABC$300</p>}
						</div>}
						{ this.props.activeTab
						&& !(this.props.activeTab == 'The Event' || this.props.activeTab == 'Donation' )
						&& (this.props.eventData && (this.props.eventData.silentAuctionEnabled || this.props.eventData.causeAuctionEnabled || this.props.eventData.raffleEnabled) && this.props.eventData.eventDesignDetail && !this.props.eventData.eventDesignDetail.countDownTimeHidden )
						&& <div id="countdownTimer" className={cx("main-box clearfix project-box gray-box card")}>
							<div className={cx("main-box-body clearfix")}>
								<div className={cx("project-box-header gray-bg")}>
									<div className={cx("name text-center")}>
										<a href="#">Time Until Event Ends</a>
									</div>
								</div>
								{ this.props.settings && this.props.settings.endDate && <div className={cx("project-box-content")}>
									<div className={cx("ticker")}>{this.setCountDown()}
										<div className={cx("row timer")}>
											{ this.state.days > 0 && <div className={cx("col-xs-4")}><span className={cx("days")}>{this.state.days}</span></div>}
											{ <div className={cx("col-xs-4")}><span className={cx("days")}>{this.state.hours}</span></div>}
											{ <div className={cx("col-xs-4")}><span className={cx("days")}>{this.state.minute}</span></div>}
											{ this.state.days <= 0 && <div className={cx("col-xs-4")}><span className={cx("days")}>{this.state.seconds}</span></div>}

										</div>
										<div className={cx("row tiny text-center")}>
											{ this.state.days > 0 && <div className={cx("col-xs-4")}><span className={cx("days")}>DAYS</span></div> }
											<div className={cx("col-xs-4")}><span className={cx("hours")}>HOURS</span></div>
											<div className={cx("col-xs-4")}><span className={cx("minutes")}>MINUTES</span></div>
											{ this.state.days <= 0 && <div className={cx("col-xs-4")} ><span className={cx("seconds")}>SECONDS</span></div>}
										</div>
									</div>
								</div>}
							</div>
						</div> }
						{ this.props.activeTab && !(this.props.activeTab == 'The Event') && (this.props.eventData && (this.props.eventData.silentAuctionEnabled || this.props.eventData.causeAuctionEnabled || this.props.eventData.raffleEnabled) && this.props.eventData.eventDesignDetail && !this.props.eventData.eventDesignDetail.totalFundRaisedHidden ) &&
						<div className={cx("main-box clearfix project-box gray-box card funds-raised-container")}>
							<div className={cx("main-box-body clearfix")}>
								<div className={cx("project-box-header gray-bg")}>
									<div className={cx("name text-center")}>
										<a href="#">Total Funds Raised</a>
									</div>
								</div>
								<div className={cx("project-box-content")}>
									<div className={cx("funds-raised")}>$<span
										className={cx("total-funds-raised")}>{ this.props.settings && this.props.settings.totalFundRaised ? this.props.settings.totalFundRaised : "0"}</span>
									</div>
								</div>
							</div>
						</div> }
						{ this.props.activeTab && ( this.props.activeTab == 'Raffle' ) && this.props.settings && this.props.settings.endDate &&
						<a role="button"
							 className={cx("btn btn-primary btn-block buy-raffle-tickets", ((moment(this.props.settings.endDate).diff(moment()) <= 0 && !this.props.eventData.raffleEnabled) || this.props.settings.moduleEnded) && 'disabled')}
							 disabled={(moment(this.props.settings.endDate).diff(moment()) <= 0 && !this.props.eventData.raffleEnabled) || this.props.settings.moduleEnded}
							 onClick={this.showBuyRaffleTicketsModal}>{ (moment(this.props.settings.endDate).diff(moment()) <= 0 && !this.props.eventData.raffleEnabled) || this.props.settings.moduleEnded ? 'Raffle Closed' : 'Buy Raffle Tickets'}</a> }
						{ this.props.activeTab && !(this.props.activeTab == 'The Event' || this.props.activeTab == 'Donation' ) && this.props.activeCategory &&
						<div className={cx("search-bar card")}>
							<input type="text" className={cx("form-control")} placeholder="Search Items..."
										 onChange={this.serachString} ref={ref => {
								this.serachKey = ref;
							}}/>
						</div> }
						<div className={cx("text-center powered-by-sidebar")}><span>Powered by </span>
							<Link to="https://www.accelevents.com" target="_blank">
								<img
									src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x50/937320cf-a809-49c5-916d-e7436a1cfcaeaccelevents-logo-black.png"
									className={cx("img-responsive")}/>
							</Link>
						</div>
						{ this.props.settings && this.props.settings.categoriesEnabled && this.props.settings.categories && this.props.activeCategory &&
						<div id="divItemCategories" className={cx("item-categories hidden-xs")}>
							<h4 className={cx("")}>Categories</h4>
							<ul className={cx("nav nav-pills nav-stacked category-list ")}>
								<li className={cx("all-items", this.props.selectedCategoty == '' && "active")}>
									<a href="#" className={cx("category-switcher all-items")} onClick={() => {
										this.props.setFilterCategory("")
									}}>
										<i className={cx("fa fa-ticket")}></i>
										<span className={cx("cat-name")}>All Items</span>
										<span className={cx("badge badge-primary pull-right cat-count")}></span>
									</a>
								</li>
								{
									this.props.settings && this.props.settings.categories && this.props.settings.categories.map(item =>
										<li className={cx(this.props.selectedCategoty == item.name && "active")}
												key={item.name + Math.random()} onClick={() => {
											this.props.setFilterCategory(item.name)
										}}>
											<a className={cx("category-switcher pointer")}>
												<i className={cx("fa fa-ticket")}></i>
												<span className={cx("cat-name")}>{item.name}</span>
												{item.count &&
												<span className={cx("badge badge-primary pull-right cat-count")}>{item.count}</span>}
											</a>
										</li>)
								}
								{/* <li className={cx("")}>
								 <a href="#" className={cx("category-switcher")} data-category="Uncategorized" data-module="#raffle">
								 <i className={cx("fa fa-ticket")}></i>
								 <span className={cx("cat-name")}>Uncategorized</span>
								 <span className={cx("badge badge-primary pull-right cat-count")}>1</span>
								 </a>
								 </li>*/}
							</ul>
						</div> }
					</div>
				</div>
				<PopupModel
					id="buyRaffleTicketPopup"
					showModal={this.state.showBuyRaffleTicketPopup}
					headerText="Buy Raffle Ticket"
					onCloseFunc={this.hideBuyRaffleTicketPopup}
				>
					<div className="main-box-body clearfix">
						<div className="payment-area collapse in">
							<form className="ajax-form validated fv-form fv-form-bootstrap"
										method="post" action="/AccelEventsWebApp/events/12/R/purchaseticket" noValidate="novalidate">
								<button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
								<div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
									className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
								<div className="form-group">
									<label className="control-label">Number of Tickets</label>
									<div className="input-group">
										<div className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true"/></div>
										<select className="form-control" name="pkg" id="ticketpkgs" defaultValue={0}>
											<option value={0} disabled>Select Tickets</option>
											{this.props.settings && this.props.settings.ticketPackages ?
												this.props.settings.ticketPackages.map(item =>
													<option value={item.id} key={Math.random()} data-ticket={item.numOfTicket}
																	data-price={item.price}>
														{item.numOfTicket} Ticket For ${item.price}
													</option>
												) : ''
											}

										</select>
									</div>
								</div>
								<style
									dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n"}}/>
								<div className="stripe-form">
								</div>
								<button type="submit" className="btn btn-green"
												data-loading-text="<i class='fa fa-spinner fa-spin'></i> Processing Payment">Pay Now
								</button>
								<button type="button" className="btn btn-default btn-close" data-dismiss="modal" aria-label="Close"
												style={{display: 'none'}}>Close
								</button>
							</form>
						</div>
					</div>

				</PopupModel>
			</div>
		);
	}
}

export default withStyles(s)(EventAside);
