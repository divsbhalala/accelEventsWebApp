import React, {Component} from 'react';
import   PropTypes   from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
class EventEndUntil extends Component { // eslint-disable-line
	static propTypes = {
		className: PropTypes.string,
		isBig: PropTypes.bool,
		headerText: PropTypes.string,
		settings: PropTypes.object,
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

								<div className={cx("col-xs-4")}><span className={cx("days")}>{
									moment(this.props.settings.moduleEndDate).diff(moment(), 'days') > 0
									&& ( '0' + moment(this.props.settings.moduleEndDate).diff(moment(), 'days')).slice(-2) || '00'
								}</span></div>
								<div className={cx("col-xs-4")}><span className={cx("hours")}>{
									moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours') > 0
									&& moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours') > 0
									&& ('0' + moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours')).slice(-2) || '00'
								}</span></div>
								<div className={cx("col-xs-4")}><span className={cx("minutes")}>{
									moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').add(-moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours'), 'hours').diff(moment(), 'minutes') > 0
									&& ( "0" + moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').add(-moment(this.props.settings.moduleEndDate).add(-moment(this.props.settings.moduleEndDate).diff(moment(), 'days'), 'days').diff(moment(), 'hours'), 'hours').diff(moment(), 'minutes')).slice(-2)
									|| '00'}</span></div>
								<div className={cx("col-xs-4 hide")}><span className={cx("seconds")}>00</span></div>
							</div>
							<div className={cx("row tiny text-center")}>
								<div className={cx("col-xs-4")}><span className={cx("days")}>DAYS</span></div>
								<div className={cx("col-xs-4")}><span className={cx("hours")}>HOURS</span></div>
								<div className={cx("col-xs-4")}><span className={cx("minutes")}>MINUTES</span></div>
								<div className={cx("col-xs-4 hide")}><span className={cx("seconds")}>SECONDS</span></div>
							</div>
						</div>
					</div>
				</div> }
			</div>
		);
	}
}

export default EventEndUntil;
