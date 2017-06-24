import React from 'react';
class AdminSiderbar extends React.Component {

	render() {
		return (
			<div id="nav-col">
				<section id="col-left" className="col-left-nano has-scrollbar">
					<div id="col-left-inner" className="col-left-nano-content" tabIndex={0} style={{right: '-15px'}}>
						<div id="user-left-box" className="clearfix hidden-sm hidden-xs dropdown profile2-dropdown">
							<div className="event-logo">
								<img src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/937320cf-a809-49c5-916d-e7436a1cfcaeaccelevents-logo-black.png" alt className="img-responsive" />
								<a role="button" href="#eventlogo-nav" data-toggle="modal" className="change-image-text">
									<img src="http://www.stagingaccel.com:8080/AccelEventsWebApp/img/photo-camera.png" /> Change Logo
								</a>
							</div>
						</div>
						<div className="collapse navbar-collapse navbar-ex1-collapse" id="sidebar-nav">
							<ul className="nav nav-pills nav-stacked">
								<li className="nav-header nav-header-first hidden-sm hidden-xs">Navigation</li>
								<li className=" active ">
									<a href="/admin" className="dropdown-toggle">
										<i className="vt vt-dashboard" />
										<span>Dashboard</span>
									</a>
									<ul className="submenu">
										<li className>
											<a href="/admin/auction-performance">
												Silent Auction Performance
											</a>
										</li>
										<li className>
											<a href="/admin/raffle-performance">
												Raffle Performance
											</a>
										</li>
										<li className>
											<a href="/admin/fund-performance">
												Fund a Need Performance
											</a>
										</li>
										<li className>
											<a href="/admin/donation-performance">
												Donation Performance
											</a>
										</li>
										<li className>
											<a href="/admin/ticket-performance">
												Ticket Sales Performance
											</a>
										</li>
									</ul>
								</li>
								<li className>
									<a href="/admin/design">
										<i className="vt vt-design" />
										<span>Design</span>
									</a>
								</li>
								<li className>
									<a href="#" className="dropdown-toggle">
										<i className="vt vt-event-ticketing" />
										<span>Ticketing</span>
									</a>
									<ul className="submenu">
										<li className>
											<a href="/admin/event-ticket-create">
												Create Event
											</a>
										</li>
										<li className>
											<a href="/admin/event-ticketing-settings">
												Event Registration Settings
											</a>
										</li>
										<li className>
											<a href="/admin/event-ticketing-orders">
												Ticket Orders
											</a>
										</li>
									</ul>
								</li>
								<li className>
									<a href="#" className="dropdown-toggle">
										<i className="vt vt-gavel" />
										<span>Silent Auction Management</span>
									</a>
									<ul className="submenu">
										<li className>
											<a href="/admin/silent-auction-add-items">
												Add Items
											</a>
										</li>
										<li className>
											<a href="/admin/silent-auction-settings">
												Settings
											</a>
										</li>
									</ul>
								</li>
								<li className>
									<a href="#" className="dropdown-toggle">
										<i className="vt vt-raffle" />
										<span>Raffle</span>
									</a>
									<ul className="submenu">
										<li className>
											<a href="/admin/raffle-add-items">
												Add Items
											</a>
										</li>
										<li className>
											<a href="/admin/raffle-settings">
												Settings
											</a>
										</li>
									</ul>
								</li>
								<li className>
									<a href="#" className="dropdown-toggle">
										<i className="vt vt-cause" />
										<span>Fund a Need</span>
									</a>
									<ul className="submenu">
										<li className>
											<a href="/admin/cause-auction-add-items">
												Add Items
											</a>
										</li>
										<li className>
											<a href="/admin/cause-auction-settings">
												Settings
											</a>
										</li>
									</ul>
								</li>
								<li>
									<a href="/admin/user-management-volunteers">
										<i className="vt vt-user-settings" />
										<span>User Management</span>
									</a>
								</li>
								<li className>
									<a href="#" className="dropdown-toggle">
										<i className="vt vt-settings-gears" />
										<span>Settings</span>
									</a>
									<ul className="submenu">
										<li className>
											<a href="/admin/settings-general">
												General Settings
											</a>
										</li>
										<li className>
											<a href="/admin/settings-credit-card">
												Credit Card Processing
											</a>
										</li>
										<li className>
											<a href="/admin/settings-account">
												Billing
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
					<div className="nano-pane"><div className="nano-slider" style={{height: 174, transform: 'translate(0px, 0px)'}} /></div></section>
				<div id="nav-col-submenu" />
			</div>

		);
	}
}

export default AdminSiderbar;
