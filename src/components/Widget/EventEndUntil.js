import React, {Component} from 'react';
import   PropTypes   from 'prop-types';
import cx from 'classnames';
import moment from 'moment';

var countDownInterval = null;
var isEventEnd = false;

class EventEndUntil extends Component { // eslint-disable-line
	static propTypes = {
		className: PropTypes.string,
		isBig: PropTypes.bool,
		headerText: PropTypes.string,
		settings: PropTypes.object,
	}
	constructor(props) {
		super(props);
		this.state = {
			days: '00',
			hours: '00',
			minute: '00',
			seconds: '00',

		};

		this.setCountDown = this.setCountDown.bind(this);
	}
	setCountDown=()=>{
		let interval = 100;
		let self=this;
		if(this.props.settings && this.props.settings.moduleEndDate){
			interval = 60000;
			let eventTime=moment();
			if(this.props.settings && this.props.settings.moduleEndDate){
				eventTime = moment(this.props.settings.moduleEndDate);
			}
			let days =  moment(eventTime).diff(moment(), 'days');
			let hours = moment(eventTime).add(-days, 'days').diff(moment(), 'hours');
			let minute = moment(eventTime).add(-days, 'days').add(-hours, 'hours').diff(moment(), 'minutes');
			let seconds = moment(eventTime).add(-days, 'days').add(-hours, 'hours').add(-minute, 'minutes').diff(moment(), 'seconds');

			// let duration = moment.duration(duration - interval, 'milliseconds');
			this.setState({
				days: days <= 0 ? "00": days,
				hours: hours <= 0 ? "00": hours <=9 ? ("0" +hours).slice(-2) : hours,
				minute: minute <= 0 ? "00":minute <=9 ? ("0" +minute).slice(-2) : minute,
				seconds: seconds <= 0 ? "00": seconds <=9 ? ("0" +seconds).slice(-2) : seconds,
			});

			if( !days && !hours && !minute && !seconds && !isEventEnd){
				this.props.onEnd();
				isEventEnd = true;
			}
			else {
				isEventEnd = false;
			}
		};
	};

	componentDidMount(){
		countDownInterval = setInterval(()=>{
			this.setCountDown(countDownInterval);
		},1000)
	}
	componentWillUnmount(){
		clearInterval(countDownInterval);
	}


	render() {
		return (
			<div id="countdownTimer" className={cx("main-box clearfix project-box gray-box card")}>
				{this.props.settings &&
				<div className={cx("main-box-body clearfix")}>
					<div className={cx("project-box-header", this.props.className || "emerald-bg")}>
						<div className={cx("name")}>
							<a href="#">{ this.props.headerText || "Time Until Event Ends"}</a>
						</div>
					</div>
					<div className={cx("project-box-content ticker-box")}>
						<div className={cx("ticker", this.props.isBig && "big")}>
							<div className={cx("flex-row timer")}>

								<div className={cx("flex-col")}><span className={cx("days")}>{
									moment(this.props.settings.moduleEndDate).diff(moment(), 'days') > 0
									&& ( moment(this.props.settings.moduleEndDate).diff(moment(), 'days')) || '00'
								}</span></div>
								<div className={cx("flex-col")}><span className={cx("hours")}>{
									moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours') > 0
									&& moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours') > 0
									&& ('0' + moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours')).slice(-2) || '00'
								}</span></div>
								<div className={cx("flex-col")}><span className={cx("minutes")}>{
									moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').add(-moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours'), 'hours').diff(moment(), 'minutes') > 0
									&& ( "0" + moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').add(-moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours'), 'hours').diff(moment(), 'minutes')).slice(-2)
									|| '00'}</span></div>
								<div className={cx("flex-col hide")}><span className={cx("seconds")}>00</span></div>
							</div>
							<div className={cx("flex-row tiny text-center")}>
								<div className={cx("flex-col")}><span className={cx("days")}>DAYS</span></div>
								<div className={cx("flex-col")}><span className={cx("hours")}>HOURS</span></div>
								<div className={cx("flex-col")}><span className={cx("minutes")}>MINUTES</span></div>
								<div className={cx("flex-col hide")}><span className={cx("seconds")}>SECONDS</span></div>
							</div>
						</div>
					</div>
				</div> }
			</div>
		);
	}
}

export default EventEndUntil;
