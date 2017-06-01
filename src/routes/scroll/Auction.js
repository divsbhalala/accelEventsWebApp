/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {connect} from 'react-redux';
import {doGetEventData,doGetSettings } from './../event/action/index';
// import  history from './../../../history';

class Auction extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      tab: 'The Event',
      showBookingTicketPopup: false,
      showMapPopup: false,
        isValidData:false,
        error:null,
        isLogin:false,
    }

  }
    componentWillMount(){
        this.props.doGetEventData(this.props.params && this.props.params.params);
        this.props.doGetSettings(this.props.params && this.props.params.params, 'auction').then(resp=> {
            this.setState({
                settings: resp && resp.data
            });
        }).catch(error=>{
            history.push('/404');
        });


        console.log(this.state,this.props) ;
        console.log('->>>',this.state.settings);
    }
    render() {

      return (
      <div className="row">
        <div className="col-lg-12">
          <div id="content-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">
               ho
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = {
    doGetEventData : (eventUrl) => doGetEventData(eventUrl),
    doGetSettings : (eventUrl, type) => doGetSettings(eventUrl, type),
};
const mapStateToProps = (state) => ({
    eventData:state.event && state.event.data,
    eventTicketData:state.event && state.event.ticket_data,
       auction_data:state.event && state.event.auction_data,

});

export default  connect(mapStateToProps,mapDispatchToProps)(Auction);
