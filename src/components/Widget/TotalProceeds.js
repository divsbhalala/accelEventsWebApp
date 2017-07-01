import React, {Component} from 'react';
import   PropTypes   from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
class TotalProceeds extends Component { // eslint-disable-line
	static propTypes = {
		className: PropTypes.string,
		headerText: PropTypes.string,
		totalRised: PropTypes.number,
		submitedTicket: PropTypes.number,
	}

	render() {
		return (
			<div id="countdownTimer" className={cx("main-box clearfix project-box gray-box card")}>
							{(this.props.totalRised != undefined || this.props.submitedTicket != undefined) && <div className={cx("main-box-body clearfix")}>
					<div className={cx("project-box-header ", this.props.className || "gray-bg")}>
						<div className={cx("name")}>
							<a href="#">{ this.props.headerText || "Total Proceeds"}</a>
						</div>
					</div>
					<div className={cx("project-box-content")}>
						<div className={cx("value text-center")}>
							<div className={cx("ticker")}>
								{this.props.totalRised != undefined && <span className="total-funds-raised">${this.props.totalRised || 0 }</span>}
								{this.props.submitedTicket != undefined && <span className="total-funds-raised">{this.props.submitedTicket || 0 }</span>}
							</div>
						</div>
					</div>
				</div>}
			</div>
		);
	}
}

export default TotalProceeds;
