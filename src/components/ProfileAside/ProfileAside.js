
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

let countDownInterval = null;
let isEventEnd = false;

class ProfileAside extends React.Component {
	static propTypes = {
		setActiveTabState: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div id="user-profile">{console.log("user",this.props.user)}
				<script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false&amp;libraries=places&amp;key=AIzaSyCTdjRtF5L54QIJdEQ8DyXlf2umq6MpvEw"></script>
				<div className={cx("main-box", "clearfix")}>
					<header className={cx("main-box-header", "clearfix")}>
						<h2></h2>
					</header>
					<div className={cx("main-box-body clearfix")}>
						<img src="/images/user-icon-placeholder.png" className="profile-img img-responsive center-block" />
						<div className="profile-label">
							<span className="label label-info">{this.props.user && this.props.user.userLabel} </span>
						</div>
						<div className="profile-details">
							<ul className="fa-ul">
								<li><i className="fa-li fa fa-envelope-o" />{this.props.user && this.props.user.email}</li>
								<li><i className="fa-li fa fa-phone" />{this.props.user && this.props.user.phoneNumber}</li>
								<li><i className="fa-li fa fa-building-o" />{this.props.user && this.props.user.address1 + " " +  this.props.user.address2  + " " +this.props.user.cityOrProvidence  + " " +this.props.user.state + " " +this.props.user.zipcode  }</li>
							</ul>
						</div>
						<div className="profile-message-btn center-block text-center">
							<a  className="btn btn-success edit-profile" onClick={()=>{
								this.props.setActiveTabState("Profile");
							}}>
								<i className="fa fa-pencil" />
								Edit Profile
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(s)(ProfileAside);
