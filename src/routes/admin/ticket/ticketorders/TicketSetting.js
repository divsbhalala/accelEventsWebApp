
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './TicketSetting.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';

class TicketSetting extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  
  render() {
    return (
      <div id="content-wrapper">
        <div className="row">
          <div className="col-sm-12">
            <div className="row" style={{opacity: 1}}>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12">
                      <div id className="clearfix">
                        <h1>
                          Event Orders
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="main-box no-header">
                        <div className="all-orders">
                          <div className="text-center" style={{marginTop: '30%'}}>
                            <h1>Please activate Event Ticketing to start selling tickets.</h1>
                            <a href="/AccelEventsWebApp/host/settings/account" role="button" className="btn btn-warning btn-lg">
                              Click Here to Get Started
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(TicketSetting);
