/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
	Nav,
	NavItem,
	NavDropdown,
	MenuItem,
	ProgressBar,
} from 'react-bootstrap';
import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';
import history from '../../history';
import $ from "jquery";
import SidebarNew from '../SidebarNew';
import cx from 'classnames';
import PopupModel from './../PopupModal';
import {sessionService} from 'redux-react-session';
import {connect} from 'react-redux';
import s from './../../routes/login/Login.css';
import {
	doLogin,
	doSignUp,
	doContactSupport,
	isVolunteer
} from './../../routes/event/action/index';

import LoginModal from './../../components/LoginModal/index';

const logo = require('./logo.png');
let eventUrl= "";

class HeaderNew extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showContactPopup: false,
			showLoginPopup: false,
			isValidData: false,
			name: null,
			message: null,
			email: null,
			password: null,
			error: null,
			nameFeedBack: false,
			messageFeedBack: false,
			emailFeedBack: false,
			passwordFeedBack: false,
			phoneNumberFeedBack: false,
			errorMsgNumber: null,
			phoneNumber: false,
			toggle: true,
			emailValue: null,
			nameValue: null,
			messageValue: null,
			showFormMessagePopup: false
		};
		this.logout = this.logout.bind(this);
		this.showContactPopup = this.showContactPopup.bind(this);
		this.hideContactPopup = this.hideContactPopup.bind(this);
		this.hideFormMessagePopup = this.hideFormMessagePopup.bind(this);
		this.doContactRequest = this.doContactRequest.bind(this);
	}

	componentWillReceiveProps() {
		eventUrl = this.props.params && this.props.params.params;
		console.log("even", eventUrl);
		if (this.props.authenticated) {
			this.props.isVolunteer(this.props.params && this.props.params.params);
		}
	}

	onFormClick = (e) => {
		e.preventDefault();

		if (this.email.value == '') {
			this.setState({
				email: false
			});
		}

		if (this.password.value == '') {
			this.setState({
				password: false
			});
		}
		if (this.state.isValidData) {
			let user = {
				countryCode: "IN",
				email: this.email.value,
				password: this.password.value,
				phoneNumber: this.state.phoneNumber
			}
			this.props.doSignUp(this.props.params && this.props.params.params, user).then((resp) => {
				;
				if (!resp.errorMessage) {
					this.setState({error: "Your account has been created"});
					window.location.reload();
				}
				else {
					this.setState({error: resp.errorMessage});
				}

			});
		}

	};
	onFormClickLogin = (e) => {
		e.preventDefault();

		if (this.email.value == '') {
			this.setState({
				email: false
			});
		}

		if (this.password.value == '') {
			this.setState({
				password: false
			});
		}
		if (this.state.isValidData) {
			this.props.doLogin(this.email.value, this.password.value).then((resp) => {
				if (!resp.errorMessage) {
					this.setState({error: "Log In SuccessFully"});
					this.setState({
						showLoginPopup: false
					})
					//window.location.reload();
				}
				else {
					this.setState({error: "Invalid Email or password"});
				}

			});
		}

	};
	phoneNumberValidateHandler = (e) => {
		this.setState({
			phoneNumberFeedBack: true,
			phoneNumberValue: this.phoneNumber.value,
		});
		if (this.phoneNumber.value.trim() == '') {
			this.setState({
				phoneNumber: false,
				errorMsgPhoneNumber: "phoneNumber is Require",
			});
		} else {
			this.setState({
				phoneNumber: true
			});
		}
		// this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});
	};
	emailValidateHandler = (e) => {
		this.setState({
			emailFeedBack: true,
			emailValue: this.email.value,
		});
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (this.email.value.trim() == '') {
			this.setState({
				email: false,
				errorMsgEmail: "Email is required.",
			});
		}
		else {
			this.setState({
				email: re.test(this.email.value),
				errorMsgEmail: "Invalid Email.",
			});
		}
	};
	nameValidateHandler = (e) => {
		this.setState({
			nameFeedBack: true,
			nameValue: this.name.value,
		});
		if (this.name.value.trim() == '' || !this.name.value) {
			this.setState({
				name: false,
				errorMsgName: "Name is required.",
			});
		}
		else {
			this.setState({
				name: this.name.value,
				errorMsgName: null,
			});
		}
	};
	messageValidateHandler = (e) => {
		this.setState({
			messageFeedBack: true,
			messageValue: this.message.value,
		});
		if(this.message.value == ''){
			this.message.value = '';
		}
		if (this.message.value.trim() == '') {
			this.setState({
				message: false,
				errorMsgMessage: "Message is required.",
			});
		}
		else {
			this.setState({
				message: this.message.value,
				errorMsgMessage: null,
			});
		}
	};
	passwordValidateHandler = (e) => {

		this.setState({
			passwordFeedBack: true
		});

		if (this.password.value == '') {

			this.setState({
				password: false
			});
		} else {
			this.setState({
				password: true
			});
		}
	};
	logout = () => {
		localStorage.clear();
		sessionService.deleteSession();
		sessionService.deleteUser();
		history.push('/login');
	};
	showContactPopup = () => {
		this.setState({
			name: null,
			message: null,
			email: null,
			emailValue: null,
			nameValue: null,
			messageValue: null,
			nameFeedBack: false,
			messageFeedBack: false,
			emailFeedBack: false,
			showContactPopup: true
		})
	};
	hideContactPopup = () => {
		this.setState({
			showContactPopup: false
		})
	};
	hideFormMessagePopup = () => {
		this.setState({
			showFormMessagePopup: false
		})
	};
	showLoginPopup = () => {
		this.setState({
			showLoginPopup: true
		})
	};
	hideLoginPopup = () => {
		this.setState({
			showLoginPopup: false
		})
	};
	showLogin = () => {
		this.setState({
			toggle: true
		})
	};
	showRegister = () => {
		this.setState({
			toggle: false
		})
	};

	doContactRequest = ()=>{
		console.log("here", "this.props.authenticated",this.props.authenticated  , (this.props.authenticated || (this.email && this.name && this.email.value && this.name.value)) ,this.message && this.message.value, !this.message.value);
		if( (this.props.authenticated || (this.email && this.name && this.email.value.trim() !='' && this.name.value.trim() !='')) && this.message && this.message.value.trim() !='' ){
			let contactData={};
			if(!this.props.authenticated){
				contactData = {
					email : this.email.value,
					name : this.name.value,
				}
			}
			contactData.message=this.message.value;
			if(eventUrl){
				this.props.doContactSupport(eventUrl, contactData).then(resp=>{
					console.log("resp", resp);
					if(resp && resp.status == 200){
						this.setState({
							formMessage: resp.data && resp.data.message || "Thank you for writing to us, we will get back to you soon!",
							showFormMessagePopup : true,
							showContactPopup : false,
						})
					}
					else{
						this.setState({
							formMessage: "Opps! Error while processing your request. Please try after sometime",
							showFormMessagePopup : true,
							showContactPopup : false,
						})
					}
				}).catch(error=>{
					this.setState({
						formMessage: "Opps! Error while processing your request. Please try after sometime",
						showFormMessagePopup : true,
						showContactPopup : false,
					})
					console.log("error", error);
				})
			}
			else{
				this.setState({
					formMessage: "No EventFound",
					showFormMessagePopup : true,
					showContactPopup : false,
				})
			}

		}
		else {
			this.setState({
				name: false,
				errorMsgName: "Name is required.",
				email: false,
				errorMsgEmail: "Email is required.",
				message: false,
				errorMsgMessage: "Message is required.",
				nameFeedBack : true,
				emailFeedBack : true,
				messageFeedBack : true,
			});
		}
	};

	render() {
		let event = this.props.params && this.props.params.params;
		return (
			<div id="header-navbar" className={cx("content turquoise-bg white")}>

				<Navbar fluid={true} style={ {margin: 0} } className={ this.props.admin && "navbar-fixed-top"}>
					<Brand>
            <span>
              { this.props.params && this.props.params.params &&
							<Link to={"/event/" + this.props.params.params} title={this.props.params.params}
										rel="home">{this.props.params.params}</Link>}
							<button type="button" className="navbar-toggle" onClick={() => {
								toggleMenu();
							}} style={{position: 'absolute', right: 0, top: 0}}>
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
            </span>
					</Brand>
					<ul className="nav navbar-top-links navbar-right">

						<MenuItem eventKey="1" onClick={this.showContactPopup}>
							<i className="fa fa-at fa-fw"></i> <span className="hidden-xs"> Contact</span>
						</MenuItem>
						{ event && this.props.is_volunteer && <MenuItem eventKey="3" href={'/event/' + event + '/volunteer'}>
							Volunteer
						</MenuItem>}
						{ event &&
						<NavDropdown title={<span><i className="fa fa-th-list fa-fw"></i> Views</span> } id='navDropdown3'>

							<MenuItem eventKey="5" href={"/scroll/" + event + "/auction"}>
								<span> Auction Scrolling </span>
							</MenuItem>
							<MenuItem eventKey="5" href={"/scroll/" + event + "/raffle"}>
								<span> Raffle Scrolling </span>
							</MenuItem>
							<MenuItem eventKey="5" href={"/scroll/" + event + "/fund"}>
								<span> Fund a Need Scrolling </span>
							</MenuItem>
							<MenuItem divider/>
							<MenuItem eventKey="5" href={"/goal/" + event + "/auction"}>
								<span> Auction Goal </span>
							</MenuItem>
							<MenuItem eventKey="5" href={"/goal/" + event + "/raffle"}>
								<span> Raffle Goal </span>
							</MenuItem>
							<MenuItem eventKey="5" href={"/goal/" + event + "/fund"}>
								<span> Fund a Need Goal </span>
							</MenuItem>
							<MenuItem divider/>
							<MenuItem eventKey="5" href={"/table/" + event + "/auction"}>
								<span> Auction Table </span>
							</MenuItem>
							<MenuItem eventKey="5" href={"/table/" + event + "/raffle"}>
								<span> Raffle Table </span>
							</MenuItem>
							<MenuItem eventKey="5" href={"/table/" + event + "/fund"}>
								<span> Fund a Need Table </span>
							</MenuItem>

						</NavDropdown>}

						{ !this.props.authenticated && <MenuItem eventKey="8" onClick={this.showLoginPopup}>
							<i className="fa fa-user fa-fw"></i> <span className="hidden-xs"> Login</span>
						</MenuItem>}

						{ !this.props.authenticated && <MenuItem eventKey="9"
             // onClick={this.showLoginPopup}
						  onClick={(event) => { history.push('/signup');}}
						>
							<i className="fa fa-sign-in fa-fw"></i> <span className="hidden-xs" > Sign up</span>
						</MenuItem>}

						<MenuItem eventKey="10">
							<i className="fa fa-plus fa-fw"></i> <span className="hidden-xs"> Create Event</span>
						</MenuItem>

						{
							this.props.authenticated && <NavDropdown title={<i className="fa fa-user fa-fw"></i> } id='navDropdown4'>
								<MenuItem eventKey="2">
									<span> <i className="fa fa-user fa-fw"></i> User Profile </span>
								</MenuItem>
								<MenuItem divider/>
								<MenuItem eventKey="4" onClick={this.logout}>
									<span> <i className="fa fa-sign-out fa-fw"/> Logout </span>
								</MenuItem>
							</NavDropdown>
						}

					</ul>
					{ this.props.admin && this.props.authenticated && <SidebarNew />}
				</Navbar>
				<PopupModel
					id="contactPopup"
					showModal={this.state.showContactPopup}
					headerText={<h4>Contact</h4>}
					onCloseFunc={this.hideContactPopup}
				>
					<div className="modal-body">
						<div id="alertmessage" className="hide"/>
						<p>Let us know if you have any query. We'll respond as quick as possible.</p>
						<form className="ajax-form validated fv-form fv-form-bootstrap" id="contactForm" method="post"
									action="http://www.stagingaccel.com:8080/AccelEventsWebApp/events/jkazarian0/contact"
									data-onsuccess="contactFormSuccess" noValidate="novalidate">
							<button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
							<div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
								className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
							{!this.props.authenticated &&
							<div className={cx("form-group", this.state.nameFeedBack && 'has-feedback', this.state.nameFeedBack && this.state.name && 'has-success', this.state.nameFeedBack && (!this.state.name) && 'has-error')}>
							<label className="control-label">Name</label>
								<div className="input-group">
									<div className="input-group-addon">
										<i className="fa fa-user" aria-hidden="true"/>
									</div>
									<input type="text" className="form-control" id="name" name="name" data-fv-notempty="true" placeholder="Name"
												 data-fv-notempty-message="Name is required." required="required" data-fv-field="name"
												 ref={ref => {
													 this.name = ref;
												 }}
												 onKeyUp={this.nameValidateHandler}
									/>
								</div>
								{ this.state.nameFeedBack && this.state.name &&
								<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
								{ this.state.nameFeedBack && !this.state.name &&
								<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
								{ this.state.nameFeedBack && !this.state.name &&
								<small className="help-block">This value is not valid</small> }
							</div>}
							{!this.props.authenticated &&
							<div className={cx("form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
								<label className="control-label">Email Address</label>
								<div className="input-group">
									<div className="input-group-addon">
										<i className="fa fa-envelope" aria-hidden="true"/>
									</div>
									<input type="email" className="form-control" id="email" name="email" required="required" placeholder="Email"
												 ref={ref => {
													 this.email = ref;
												 }}
												 onKeyUp={this.emailValidateHandler}
									/>
								</div>
								{ this.state.emailFeedBack && this.state.email &&
								<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
								{ this.state.emailFeedBack && !this.state.email &&
								<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
								{ this.state.emailFeedBack && !this.state.email &&
								<small className="help-block">This value is not valid</small> }
							</div>}


							<div className={cx("form-group", this.state.messageFeedBack && 'has-feedback', this.state.messageFeedBack && this.state.message && 'has-success', this.state.messageFeedBack && (!this.state.message) && 'has-error')}>
								<label className="control-label">Message to Event Host</label>
								<div className="input-group">
									<div className="input-group-addon">
										<i className="fa fa-comment-o" aria-hidden="true"/>
									</div>
									<textarea rows={10} className="form-control" id="message" name="message"
														style={{
															zIndex: 3,
															position: 'relative',
															fontSize: 13,
															transition: 'none',
															background: 'transparent !important'
														}}
														ref={ref => {
															this.message = ref;
														}}
														onKeyUp={this.messageValidateHandler}

														defaultValue={" "}/>

								</div>
								{ this.state.messageFeedBack && this.state.message &&
								<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
								{ this.state.messageFeedBack && !this.state.message &&
								<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
								{ this.state.messageFeedBack && !this.state.message &&
								<small className="help-block">This value is not valid</small> }
							</div>
							<button type="button" className="btn btn-primary m-r-5" onClick={this.doContactRequest}>Send Message</button>
							<button type="button" className="btn btn-danger" onClick={this.hideContactPopup}>Cancel</button>
						</form>
					</div>

				</PopupModel>
				{ this.state.showFormMessagePopup &&
				<PopupModel
					id="mapPopup"
					showModal={this.state.showFormMessagePopup}
					onCloseFunc={this.hideFormMessagePopup}
					modelFooter={<button className="btn btn-green" data-dismiss="modal" onClick={()=>{this.hideFormMessagePopup()}}>Close</button>}
				>
					<center>{ this.state.formMessage }</center>
				</PopupModel> }
				<LoginModal
					showModal={this.state.showLoginPopup}
					headerText=""
					onCloseFunc={this.hideLoginPopup}
          params={this.props.params }
					modelFooter={<button type="button" className="btn btn-info center-block" data-dismiss="modal" onClick={()=>{this.hideLoginPopup()}}>&nbsp; &nbsp; &nbsp; Close&nbsp; &nbsp; &nbsp; </button>}
				/>

			</div>
		)
	};
}
function toggleMenu() {
	if ($(".navbar-collapse").hasClass('collapse')) {
		$(".navbar-collapse").removeClass('collapse');
	}
	else {
		$(".navbar-collapse").addClass('collapse');
	}
}

//export default HeaderNew;
const mapDispatchToProps = {
	isVolunteer: (eventUrl) => isVolunteer(eventUrl),
	doContactSupport: (eventUrl, contact) => doContactSupport(eventUrl, contact),
	doSignUp: (eventUrl, userData) => doSignUp(eventUrl, userData),
	doLogin: (email, password, rememberme) => doLogin(email, password, rememberme),
};

const mapStateToProps = (state) => ({
	is_volunteer: state.event && state.event.is_volunteer,
	user: state.session && state.session.user,
	authenticated: state.session && state.session.authenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(HeaderNew));