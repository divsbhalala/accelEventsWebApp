import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import {doGetSettings, getGoalData} from './../action/index';
import s from './goal.css';
import EventEndUntil from '../../../components/Widget/EventEndUntil';
import TotalProceeds from '../../../components/Widget/TotalProceeds';
import Thermometer from '../../../components/Widget/Thermometer';
let auctionInst = undefined;
let totalFundRaised=0;
class Auction extends React.Component {
	static propTypes = {
		title: PropTypes.string
	};
	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			settings: null,
			itemList: null,
			goalData: null,
			goalPer: 0,
		};
    this.getGoalData = this.getGoalData.bind(this);
	}
  componentWillMount() {
    totalFundRaised=0;
    this.getGoalData(this.props.params && this.props.params.params, 'auction');
  }
  getGoalData = (eventUrl, slug)=>{
    this.props.getGoalData(eventUrl, slug).then(resp => {
      totalFundRaised=resp.totalRised;
      this.setState({
        goalData: resp,
        goalPer:totalFundRaised ? totalFundRaised * 100 / resp.fundRaisingGoal : 0,
        settings:resp
      });
      // setTimeout(()=>{
      //   auctionInst.getGoalData(eventUrl, slug)
      // },5000)
    });
  };
	render() {
		return (
			<div className="container goal-page">
				<div className="row">
					{this.state.goalData ?
					<div className="col-lg-12">
						<div>
							<div className="row header">
								<h1 className="text-center">Auction Goal</h1>
								<h4 className="text-center">
									{this.state.goalData && this.state.goalData.bidInstructions} </h4>
							</div>
							<div className="row">
								<div className="col-md-3">
									{this.state.settings &&
									<TotalProceeds totalRised={this.state.settings.totalRised} headerText="Total Proceeds" className="gray-bg"/>
									}
								</div>
								<style dangerouslySetInnerHTML={{__html: ".liquid:before{width:"+this.state.goalPer+"% !important;}"}}/>
								<div className="col-md-6">
									<div className="col-md-6">
										<div className="goalcontainer">
											{ this.state.settings && this.state.goalData && <Thermometer goalPer={this.state.goalPer} settings={this.state.settings} goalData={this.state.goalData} />}
										</div>
									</div>
								</div>
								<div className="col-md-3">
									{this.state.settings && <EventEndUntil settings={this.state.settings} />}
								</div>
							</div>
						</div>
					</div>
					: <div className="text-center"><span className="fa fa-spinner fa-3x mrg-t-lg fa-pulse fa-fw"/></div> }
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = {
	getGoalData: (eventUrl, type) => getGoalData(eventUrl, type),
};
const mapStateToProps = (state) => ({
	currencySymbol: state.event && state.event.currencySymbol || "$",
});
export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Auction));
