import React, {Component} from 'react';
import   PropTypes   from 'prop-types';
import cx from 'classnames';
import {connect} from 'react-redux';
import moment from 'moment';
class TotalProceeds extends Component { // eslint-disable-line
	static propTypes = {
		className: PropTypes.string,
		headerText: PropTypes.string,
		totalRised: PropTypes.number,
		submitedTicket: PropTypes.number,
	};

	render() {
		return (
			(this.props.totalRised !== undefined || this.props.submitedTicket !== undefined) ?
			<div className={cx("project-box")}>
				<div className={cx("project-box-header ", this.props.className || "gray-bg")}>
					<div className={cx("name")}>
						<a href="#">{ this.props.headerText || "Total Proceeds"}</a>
					</div>
				</div>
				<div className={cx("project-box-content")}>
					<div className={cx("value text-center")}>
						{this.props.totalRised !== undefined ? <span className="total-funds-raised">{this.props.currencySymbol}{this.props.totalRised || 0 }</span> : ""}
						{this.props.submitedTicket !== undefined ? <span className="total-funds-raised">{this.props.submitedTicket || 0 }</span> : ""}
					</div>
				</div>
			</div> : ""
		);
	}
}
const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
	user: state.session.user,
	authenticated: state.session.authenticated,
	currencySymbol : (state.event && state.event.currencySymbol) || "$",
});
export default  connect(mapStateToProps, mapDispatchToProps)(TotalProceeds);