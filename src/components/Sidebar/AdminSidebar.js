import React from 'react';
import Link from '../Link';
import cx from 'classnames';
class AdminSiderbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeState:'',
      togale:false,
		};
		this.showBuyRaffelTicketPopup = this.showBuyRaffelTicketPopup.bind(this);
		this.togaleUl = this.togaleUl.bind(this);
	//	this.hideBuyRaffelTicketPopup = this.hideBuyRaffelTicketPopup.bind(this);
	}
  togaleUl = () =>{
	  this.setState({
      togale:!this.state.togale
    })
    console.log('test',this.state)
  }
	showBuyRaffelTicketPopup = () => {
		this.setState({
			showBuyRaffelTicketPopup: this.props.authenticated
		})
	};

	render() {
		return (
			<div className="">
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
										<Link to="/admin" className="dropdown-toggle">
											<i className="vt vt-dashboard" />
											<span>Dashboard</span>
										</Link>
										<ul className="submenu">
											<li className>
												<Link to="/admin/auction-performance">
													Silent Auction Performance
												</Link>
											</li>
											<li className>
												<Link to="/admin/raffle-performance">
													Raffle Performance
												</Link>
											</li>
											<li className>
												<Link to="/admin/fund-performance">
													Fund a Need Performance
												</Link>
											</li>
											<li className>
												<Link to="/admin/donation-performance">
													Donation Performance
												</Link>
											</li>
											<li className>
												<Link to="/admin/ticket-performance">
													Ticket Sales Performance
												</Link>
											</li>
										</ul>
									</li>
									<li className>
										<Link to="/admin/design">
											<i className="vt vt-design" />
											<span>Design</span>
										</Link>
									</li>
									<li className="active" >
										<Link to="#" className="dropdown-toggle">
											<i className="vt vt-event-ticketing" />
											<span>Ticketing</span>
										</Link>
										<ul className="submenu">
											<li className>
												<Link to="/admin/event-ticket-create">
													Create Event
												</Link>
											</li>
											<li className>
												<Link to="/admin/event-ticketing-settings">
													Event Registration Settings
												</Link>
											</li>
											<li className>
												<Link to="/admin/event-ticketing-orders">
													Ticket Orders
												</Link>
											</li>
										</ul>
									</li>
									<li className={cx(this.state.togale ? "open":'')} onClick={this.togaleUl}>
										<Link to="#" className="dropdown-toggle" >
											<i className="vt vt-gavel" />
											<span>Silent Auction Management</span>
										</Link>
										<ul className="submenu" style={{display: this.state.togale ? 'none' : 'block'}}>
											<li className>
												<Link to="/admin/silent-auction-add-items">
													Add Items
												</Link>
											</li>
											<li className>
												<Link to="/admin/silent-auction-settings">
													Settings
												</Link>
											</li>
										</ul>
									</li>
									<li className>
										<Link to="#" className="dropdown-toggle" >
											<i className="vt vt-raffle" />
											<span>Raffle</span>
										</Link>
										<ul className="submenu">
											<li className>
												<Link to="/admin/raffle-add-items">
													Add Items
												</Link>
											</li>
											<li className>
												<Link to="/admin/raffle-settings">
													Settings
												</Link>
											</li>
										</ul>
									</li>
									<li className>
										<Link to="#" className="dropdown-toggle">
											<i className="vt vt-cause" />
											<span>Fund a Need</span>
										</Link>
										<ul className="submenu">
											<li className>
												<Link to="/admin/cause-auction-add-items">
													Add Items
												</Link>
											</li>
											<li className>
												<Link to="/admin/cause-auction-settings">
													Settings
												</Link>
											</li>
										</ul>
									</li>
									<li>
										<Link to="/admin/user-management-volunteers">
											<i className="vt vt-user-settings" />
											<span>User Management</span>
										</Link>
									</li>
									<li className>
										<Link to="#" className="dropdown-toggle">
											<i className="vt vt-settings-gears" />
											<span>Settings</span>
										</Link>
										<ul className="submenu">
											<li className>
												<Link to="/admin/settings-general">
													General Settings
												</Link>
											</li>
											<li className>
												<Link to="/admin/settings-credit-card">
													Credit Card Processing
												</Link>
											</li>
											<li className>
												<Link to="/admin/settings-account">
													Billing
												</Link>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
						<div className="nano-pane"><div className="nano-slider" style={{height: 174, transform: 'translate(0px, 0px)'}} /></div></section>
					<div id="nav-col-submenu" />
				</div>
			</div>

		);
	}
}

export default AdminSiderbar;
