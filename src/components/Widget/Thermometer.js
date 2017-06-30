import React, {Component} from 'react';
import   PropTypes   from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
class Thermometer extends Component { // eslint-disable-line
	static propTypes = {
		className: PropTypes.string,
		headerText: PropTypes.string,
		settings: PropTypes.object,
		goalData: PropTypes.object,
		goalPer: PropTypes.number,
	}

	render() {
		return (
			<div className>
				{
					this.props.settings && this.props.goalPer && this.props.goalData &&
					<div
						className={this.props.goalPer<=20 ?'thermometer--very-low' : this.props.goalPer<=40 ? 'thermometer--low' : this.props.goalPer<=60 ? 'thermometer--moderate' :  this.props.goalPer <= 80  ? 'thermometer--high' : 'thermometer--very-high'}>

						<div className="glass">
							<div id="tooltip" style={{left: this.props.goalPer+'%'}}>
								<span>${this.props.settings && this.props.settings.totalRised}</span>
							</div>
							<div className="liquid"/>
							<svg className="ruler">
								<rect x="0px" y={0} width="20%" height="100%" fill="url(#ticks--very-low)" rx={2}/>
								<rect x="20%" y={0} width="20%" height="100%" fill="url(#ticks--low)" rx={2}/>
								<rect x="40%" y={0} width="20%" height="100%" fill="url(#ticks--moderate)" rx={2}/>
								<rect x="60%" y={0} width="20%" height="100%" fill="url(#ticks--high)" rx={2}/>
								<rect x="80%" y={0} width="20%" height="10k%" fill="url(#ticks--very-high)" rx={2}/>
								<defs>
									<pattern id="ticks--very-low" className="ticks--very-low" width="60px" height="100%"
									         patternUnits="userSpaceOnUse" x={0}>
										<line x1="1px" x2="1px" y2="6px"/>
										<line x1="12px" x2="12px" y2="6px"/>
										<line x1="24px" x2="24px" y2="6px"/>
										<line x1="36px" x2="36px" y2="6px"/>
										<line x1="48px" x2="48px" y2="10px"/>
									</pattern>
									<pattern id="ticks--low" className="ticks--low" width="60px" height="100%"
									         patternUnits="userSpaceOnUse" x={0}>
										<line x1="1px" x2="1px" y2="6px"/>
										<line x1="12px" x2="12px" y2="6px"/>
										<line x1="24px" x2="24px" y2="6px"/>
										<line x1="36px" x2="36px" y2="6px"/>
										<line x1="48px" x2="48px" y2="10px"/>
									</pattern>
									<pattern id="ticks--moderate" className="ticks--moderate" width="60px" height="100%"
									         patternUnits="userSpaceOnUse" x={0}>
										<line x1="1px" x2="1px" y2="6px"/>
										<line x1="12px" x2="12px" y2="6px"/>
										<line x1="24px" x2="24px" y2="6px"/>
										<line x1="36px" x2="36px" y2="6px"/>
										<line x1="48px" x2="48px" y2="10px"/>
									</pattern>
									<pattern id="ticks--high" className="ticks--high" width="60px" height="100%"
									         patternUnits="userSpaceOnUse" x={0}>
										<line x1="1px" x2="1px" y2="6px"/>
										<line x1="12px" x2="12px" y2="6px"/>
										<line x1="24px" x2="24px" y2="6px"/>
										<line x1="36px" x2="36px" y2="6px"/>
										<line x1="48px" x2="48px" y2="10px"/>
									</pattern>
									<pattern id="ticks--very-high" className="ticks--very-high" width="60px" height="100%"
									         patternUnits="userSpaceOnUse" x={0}>
										<line x1="1px" x2="1px" y2="6px"/>
										<line x1="12px" x2="12px" y2="6px"/>
										<line x1="24px" x2="24px" y2="6px"/>
										<line x1="36px" x2="36px" y2="6px"/>
										<line x1="48px" x2="48px" y2="10px"/>
									</pattern>
								</defs>
							</svg>
							<svg className="markers">
								<text x="8px" y="15px" style={{writingMode: 'tb'}} fill="#249AA7">$0</text>
								<text x="108px" y="15px" style={{writingMode: 'tb'}} fill="#B8E1F2">
									${ this.props.goalData && Math.round(this.props.goalData.fundRaisingGoal / 4)}</text>
								<text x="228px" y="15px" style={{writingMode: 'tb'}} fill="#ABD25E">
									${ this.props.goalData && Math.round(this.props.goalData.fundRaisingGoal / 2)}</text>
								<text x="348px" y="15px" style={{writingMode: 'tb'}} fill="#F8C830">
									${ this.props.goalData && Math.round((this.props.goalData.fundRaisingGoal / 4) * 3)}</text>
								<text x="468px" y="15px" style={{writingMode: 'tb'}} fill="#F1594A">
									${ this.props.goalData && Math.round(this.props.goalData.fundRaisingGoal)} </text>
							</svg>
						</div>
					</div>}
			</div>
		);
	}
}

export default Thermometer;
