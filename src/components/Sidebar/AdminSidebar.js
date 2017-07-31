import React from 'react';
import Link from '../Link';
import cx from 'classnames';
import {sessionService} from 'redux-react-session';
import {connect} from 'react-redux';
import $ from 'jquery'
import { getDashboard } from './../../routes/admin/action/index';
import { getDesignSetting } from './../../routes/admin/design/action/index';
class AdminSidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeState:'',
      toggle:false,
			nav : "dashboard",
			subNav : "",
		};
		this.showBuyRaffleTicketPopup = this.showBuyRaffleTicketPopup.bind(this);
		this.toggleUl = this.toggleUl.bind(this);
		this.setNav = this.setNav.bind(this);
	//	this.hideBuyRaffleTicketPopup = this.hideBuyRaffleTicketPopup.bind(this);
	}
  toggleUl = () =>{
	  this.setState({
      toggle:!this.state.toggle
    });
    console.log('test',this.state)
  };
	showBuyRaffleTicketPopup = () => {
		this.setState({
			showBuyRaffleTicketPopup: this.props.authenticated
		})
	};
	setNav = (nav, subNav)=>{
		this.setState({
			nav: nav,
			subNav: subNav
		})
	};

	componentWillMount(){
		this.props.getDashboard();
		this.props.getDesignSetting();
	}
	render() {
		return (
			<div className="nav-small-id" >
				<div id="nav-col">
					<section id="col-left" className="col-left-nano has-scrollbar">
						<div id="col-left-inner" className="col-left-nano-content" tabIndex={0} style={{right: '-15px'}}>
							<div id="user-left-box" className="clearfix hidden-sm hidden-xs dropdown profile2-dropdown">
								<div className="event-logo">
									<img src={this.props.hostData && this.props.hostData.eventLogo ? this.props.hostData.eventLogo : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/937320cf-a809-49c5-916d-e7436a1cfcaeaccelevents-logo-black.png"} alt className="img-responsive" />
									<a role="button" href="#eventlogo-nav" data-toggle="modal" className="change-image-text">
										<img src="http://www.stagingaccel.com:8080/AccelEventsWebApp/img/photo-camera.png" /> Change Logo
									</a>
								</div>
							</div>
							<div className="collapse navbar-collapse navbar-ex1-collapse" id="sidebar-nav">
								<ul className="nav nav-pills nav-stacked">
									<li className={cx(this.state.nav === "dashboard" && "active")} >
										<Link to="/host/dashboard" className="dropdown-toggle" onClick={()=>{ this.setNav("dashboard", "")}}>
											<i className="vt vt-dashboard" />
											<span>Dashboard</span>
										</Link>
										<ul className="submenu">
											<li className={cx(this.state.subNav === "dashboardSilentAuction" && "active")}>
												<Link to="/host/dashboard/auction-item-performance" onClick={()=>{ this.setNav("dashboard", "dashboardSilentAuction")}}>
													Silent Auction Performance
												</Link>
											</li>
											<li className={cx(this.state.subNav === "dashboardRaffle" && "active")}>
												<Link to="/host/dashboard/raffle-item-performance" onClick={()=>{ this.setNav("dashboard", "dashboardRaffle")}}>
													Raffle Performance
												</Link>
											</li>
											<li className={cx(this.state.subNav === "dashboardFundANeed" && "active")}>
												<Link to="/host/dashboard/cause-item-performance" onClick={()=>{ this.setNav("dashboard", "dashboardFundANeed")}}>
													Fund a Need Performance
												</Link>
											</li>
											<li className={cx(this.state.subNav === "dashboardDonation" && "active")}>
												<Link to="/host/dashboard/donation-performance" onClick={()=>{ this.setNav("dashboard", "dashboardDonation")}}>
													Donation Performance
												</Link>
											</li>
											<li className={cx(this.state.subNav === "ticketSales" && "active")}>
												<Link to="/host/dashboard/ticket-sales-performance" onClick={()=>{ this.setNav("dashboard", "ticketSales")}}>
													Ticket Sales Performance
												</Link>
											</li>
										</ul>
									</li>
									<li className={cx(this.state.nav === "design" && "active")}>
										<Link to="/host/event-management/design" onClick={()=>{ this.setNav("design", "")}}>
											<i className="vt vt-design" />
											<span>Design</span>
										</Link>
									</li>
									{ this.props.hostData && this.props.hostData.ticketingEnabled ?<li className={cx(this.state.nav === "ticketing" && "active")} onClick={()=>{  }} >
										<Link to="#" className="dropdown-toggle" onClick={()=>{ this.setNav("ticketing", "")}}>
											<i className="vt vt-event-ticketing" />
											<span>Ticketing</span>
										</Link>
										<ul className="submenu">
											<li className={cx(this.state.subNav === "ticketCreateEvent" && "active")} onClick={()=>{ this.setNav("ticketing", "ticketCreateEvent")}}>
												<Link to="/host/event-ticketing/create">
													Create Event
												</Link>
											</li>
											<li className={cx(this.state.subNav === "ticketEventRegistration" && "active")} onClick={()=>{ this.setNav("ticketing", "ticketEventRegistration")}}>
												<Link to="/host/event-ticketing/settings">
													Event Registration Settings
												</Link>
											</li>
											<li className={cx(this.state.subNav === "ticketOrder" && "active")} onClick={()=>{ this.setNav("ticketing", "ticketOrder")}}>
												<Link to="/host/event-ticketing/orders">
													Ticket Orders
												</Link>
											</li>
										</ul>
									</li> : "" }
									{ this.props.hostData && this.props.hostData.auctionEnabled ? <li className={cx(this.state.nav === "silentAuction" && "active")} onClick={()=>{  }} >
										<Link to="#" className="dropdown-toggle" onClick={()=>{ this.setNav("silentAuction", "")}} >
											<i className="vt vt-gavel" />
											<span>Silent Auction Management</span>
										</Link>
										<ul className="submenu" >
											<li className={cx(this.state.subNav === "silentAuctionAddItem" && "active")}>
												<Link to="/host/silent-auction/add-items" onClick={()=>{ this.setNav("silentAuction", "silentAuctionAddItem")}}>
													Add Items
												</Link>
											</li>
											<li className={cx(this.state.subNav === "silentAuctionSettings" && "active")}>
												<Link to="/host/silent-auction/settings" onClick={()=>{ this.setNav("silentAuction", "silentAuctionSettings")}}>
													Settings
												</Link>
											</li>
										</ul>
									</li> :"" }
									{ this.props.hostData && this.props.hostData.raffleEnabled ? <li className={cx(this.state.nav === "raffle" && "active")} onClick={()=>{ }} >
										<Link to="#" className="dropdown-toggle" onClick={()=>{ this.setNav("raffle", "")}} >
											<i className="vt vt-raffle" />
											<span>Raffle</span>
										</Link>
										<ul className="submenu" >
											<li className={cx(this.state.subNav === "raffleAddItem" && "active")}>
												<Link to="/host/raffle/add-items" onClick={()=>{ this.setNav("raffle", "raffleAddItem")}}>
													Add Items
												</Link>
											</li>
											<li className={cx(this.state.subNav === "raffleSettings" && "active")}>
												<Link to="/host/raffle/settings" onClick={()=>{ this.setNav("raffle", "raffleSettings")}}>
													Settings
												</Link>
											</li>
										</ul>
									</li> : ""}
									{ this.props.hostData && this.props.hostData.fundANeedEnabled ?<li className={cx(this.state.nav === "causeAuction" && "active")} onClick={()=>{  }}>
										<Link to="#" className="dropdown-toggle" onClick={()=>{ this.setNav("causeAuction", "")}}>
											<i className="vt vt-cause" />
											<span>Fund a Need</span>
										</Link>
										<ul className="submenu" >
											<li className={cx(this.state.subNav === "causeAddItem" && "active")}>
												<Link to="/host/cause-auction/add-items" onClick={()=>{ this.setNav("causeAuction", "causeAddItem")}}>
													Add Items
												</Link>
											</li>
											<li className={cx(this.state.subNav === "causeSettings" && "active")}>
												<Link to="/host/cause-auction/settings" onClick={()=>{ this.setNav("causeAuction", "causeSettings")}}>
													Settings
												</Link>
											</li>
										</ul>
									</li> :""}
									<li className={cx(this.state.nav === "userManagement" && "active")}>
										<Link to="/host/user-management/volunteers" onClick={()=>{ this.setNav("userManagement", "")}}>
											<i className="vt vt-user-settings" />
											<span>User Management</span>
										</Link>
									</li>
									<li className={cx(this.state.nav === "settings" && "active")} onClick={()=>{  }} >
										<Link to="#" className="dropdown-toggle" onClick={()=>{ this.setNav("settings", "")}}>
											<i className="vt vt-settings-gears" />
											<span>Settings</span>
										</Link>
										<ul className="submenu">
											<li className={cx(this.state.subNav === "generalSettings" && "active")}>
												<Link to="/host/settings/general" onClick={()=>{ this.setNav("settings", "generalSettings")}}>
													General Settings
												</Link>
											</li>
											<li className={cx(this.state.subNav === "cardProcessing" && "active")}>
												<Link to="/host/settings/credit-card" onClick={()=>{ this.setNav("settings", "cardProcessing")}}>
													Credit Card Processing
												</Link>
											</li>
											<li className={cx(this.state.subNav === "billing" && "active")}>
												<Link to="/host/settings/account" onClick={()=>{ this.setNav("settings", "billing")}}>
													Billing
												</Link>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
						<div className="nano-pane"><div className="nano-slider" style={{ transform: 'translate(0px, 0px)'}} /></div></section>
					<div id="nav-col-submenu" />
				</div>
			</div>

		);
	}
}
const mapDispatchToProps = {
	getDashboard: () => getDashboard(),
	getDesignSetting: () => getDesignSetting()
};

const mapStateToProps = (state) => ({
	user: state.session && state.session.user,
	authenticated: state.session && state.session.authenticated,
	hostData : state.host && state.host.data
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminSidebar);
