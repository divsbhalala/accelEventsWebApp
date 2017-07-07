
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
var isEventEnd = false;

class ProfileAside extends React.Component {
	static propTypes = {
		setActiveTabState: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
		};

	}
	componentDidMount(){
	}
	componentWillUnmount(){
	}
	render() {
		return (
			<div id="user-profile">
				<script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false&amp;libraries=places&amp;key=AIzaSyCTdjRtF5L54QIJdEQ8DyXlf2umq6MpvEw"></script>
				<div className={cx("main-box", "clearfix")}>
					<header className={cx("main-box-header", "clearfix")}>
						<h2></h2>
					</header>
					<div className={cx("main-box-body clearfix")}>
						<img src="/images/user-icon-placeholder.png" className="profile-img img-responsive center-block" />
						<div className="profile-details">
							<ul className="fa-ul">
								<li><i className="fa-li fa fa-envelope-o" />Penit1936@einrot.com</li>
								<li><i className="fa-li fa fa-phone" /></li>
							</ul>
						</div>
						<div className="profile-message-btn center-block text-center">
							<a  className="btn btn-success edit-profile" onClick={()=>{
								this.props.setActiveTabState();
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
