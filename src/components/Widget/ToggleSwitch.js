import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
class ToggleSwitch extends React.Component {
	constructor() {
		super();
		this.state = {
		}
	};

	render() {
		return (
			<div className={cx("onoffswitch", this.props.className ? "onoffswitch-" + this.props.className : "onoffswitch-success")}>
				<input type="checkbox" name={this.props.name} className="onoffswitch-checkbox"
							 id={this.props.id} defaultChecked={this.props.defaultValue} onClick={this.props.onClick} onChange={()=>{ if(this.props.onChange){this.props.onChange()}}} disabled={this.props.disabled}/>
				<label className="onoffswitch-label" htmlFor={this.props.id}>
					<div className="onoffswitch-inner"/>
					<div className="onoffswitch-switch"/>
				</label>
			</div>
		);
	}
}
ToggleSwitch.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	defaultValue: PropTypes.bool.isRequired,
	className: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
export default ToggleSwitch;
