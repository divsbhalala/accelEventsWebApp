import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Checkout.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import history from './../../history';
import Moment from 'react-moment';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import IntlTelInput from './../../components/IntTelInput';
import NumericInput from 'react-numeric-input';

import EventAside from './../../components/EventAside/EventAside';
import PopupModel from './../../components/PopupModal';
import Timer from './../../components/Timer';
import TimeOut from './../../components/TimeOut';
import TicketCheckout from './../../components/TicketCheckout';

import {
	doGetEventData,
	doGetOrderById,
	doGetSettings,
	doSignUp,
	couponCode
} from './../event/action/index';
import {createCardToken, orderTicket} from './action/index';
let Total = 0;
let attendee = {};
let questions = {};
let buyerInformationFields = {};
let eventUrl;
class Checkout extends React.Component {
	static propTypes = {
		title: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			settings : undefined,
			isTimeOut: false
		};
	}
	componentWillMount() {
		eventUrl = this.props.params && this.props.params.params;
		this.props.doGetEventData(eventUrl);
		this.props.doGetSettings(eventUrl, 'ticketing').then(resp => {
			this.setState({
				settings: resp && resp.data
			});
		}).catch(error => {
			//history.push('/404');
		});
	}

	setOrderExpierd = (status)=>{
		this.setState({
			isTimeOut: status
		})
	};


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
					<div id="content-wrapper">
						<div className="row">
							{ !this.state.isTimeOut ? <div className="col-lg-3 col-md-4 col-sm-4">
								<EventAside
									eventData={this.props.eventData}
									authenticated={this.props.authenticated}
									settings={this.state.settings}
									activeTab="The Event"
								/>
							</div> : ""}
							<TicketCheckout eventUrl={eventUrl} orderId={this.props.params && this.props.params.orderId} setOrderExpierd={this.setOrderExpierd} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = {
	doGetEventData: (eventUrl) => doGetEventData(eventUrl),
	doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
};
const mapStateToProps = (state) => ({
	eventData: state.event && state.event.data,
	user: state.session.user,
	authenticated: state.session.authenticated,
	orderData: state.event && state.event.order_data,
	country: state.location && state.location.data && state.location.data.country && state.location.data.country.toLowerCase(),
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Checkout));
//export default (withStyles(s)(Event));
