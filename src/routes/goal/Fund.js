
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import s from './goal.css';
import {doGetSettings,getGoalData} from './../event/action/index';
import EventEndUntil from '../../components/Widget/EventEndUntil';
import TotalProceeds from '../../components/Widget/TotalProceeds';
import Thermometer from '../../components/Widget/Thermometer';

class Fund extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      settings: null,
      goalData:null,
      goalPer:0,
    }
  }

  componentWillMount() {
    let totalFundRaised=0
    // this.props.doGetSettings(this.props.params && this.props.params.params, 'fundaneed').then(resp => {
    //   totalFundRaised=resp.data.totalFundRaised
    //   this.setState({
    //     settings: resp && resp.data
    //   });
    //   this.props.getGoalData(this.props.params && this.props.params.params, 'fundaneed').then(resp => {
    //     this.setState({
    //       goalData: resp,
    //       goalPer:totalFundRaised * 100  / resp.fundRaisingGoal
    //     });
    //   })
    // })
    this.props.getGoalData(this.props.params && this.props.params.params, 'fundaneed').then(resp => {
      totalFundRaised=resp.totalRised
      this.setState({
        goalData: resp,
        goalPer:totalFundRaised * 100  / resp.fundRaisingGoal,
        settings:resp
      });
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div id="content-wrapper">
              <div className="row">
                <h1 className="text-center" style={{marginTop: 120}}>Fund a Need Goal</h1>
                <h4 className="text-center" style={{marginTop: 5, marginBottom: 50}}>
                  {this.state.goalData && this.state.goalData.bidInstructions} </h4>
              </div>
              <div className="row">
                <div className="col-md-3">
                  {this.state.settings &&
                  <TotalProceeds totalRised={this.state.settings.totalRised} headerText="Total Proceeds" className="gray-bg"/>
                  }
                </div>
                <style dangerouslySetInnerHTML={{__html: ".liquid:before{width:"+this.state.goalPer+"% !important;}"}} />
                <div className="col-md-6">
                  <div className="col-md-6">
                    <div className="goalcontainer">
                        { this.state.goalPer &&  this.state.settings && this.state.goalData && <Thermometer goalPer={this.state.goalPer} settings={this.state.settings} goalData={this.state.goalData} />}
                    </div>
                  </div>

                </div>
                <div className="col-md-3">
                  {this.state.settings && <EventEndUntil settings={this.state.settings} />}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }

}

const mapDispatchToProps = {
  doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
  getGoalData: (eventUrl,type) => getGoalData(eventUrl,type),
};
const mapStateToProps = (state) => ({});
export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Fund));