import React from 'react';
import PropTypes from 'prop-types';

export default class TimeZoneSelector extends React.Component {
  constructor(props) {
    super(props);
  };

  createTimeZones = () => {
    let data = [];
    let timezones = this.props.timeZoneList;
    for (let i in timezones) {
        data.push(<option key={timezones[i].name} value={timezones[i].name}>{timezones[i].name}</option>);
    }
    return data;
  };

  render() {
    return (<select id={this.props.id} name={this.props.name} className={this.props.className}
      defaultValue={this.props.defaultValue} onChange={(e)=>{ if(this.props.onChange){this.props.onChange(e)}}}>
      {this.createTimeZones()}
    </select>);
  };
}

TimeZoneSelector.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	defaultValue: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
  timeZoneList: PropTypes.array.isRequired
};
