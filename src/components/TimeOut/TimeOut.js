import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TimeOut.css';
import Link from '../Link';

class TimeOut extends React.Component {
  static propTypes = {
    eventUrl: PropTypes.string,
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div id="error-box">
              <div className="row">
                <div className="col-xs-12">
                  <div id="error-box-inner">
                    <img src="/images/page-timeout.png" alt="Timeout" />
                  </div>
                  <h1>Session Timed out</h1>
                  <p>
                    Sorry, your session has timed out.
                  </p>
                  <p>
                    Please click <Link to={'/events/'+this.props.eventUrl}>here</Link> to go back to the event page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (withStyles(s)(TimeOut))
