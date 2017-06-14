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
        <style dangerouslySetInnerHTML={{__html: "\n      body {\n        background-color: #eeeeee;\n        font-family: 'Open Sans',sans-serif;\n        font-weight: 300;\n      }\n      #error-box {\n          min-width: 280px;\n          text-align: center;\n          margin: 40px auto 20px;\n      }\n      \n      #error-box h1 {\n          margin-top: 40px;\n          color: #605f5f;\n          padding: 0;\n      }\n      \n      #error-box p {\n          margin: 20px 0;\n      }\n            \n    " }} />
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
                    Please click <Link to={'/event/'+this.props.eventUrl}>here</Link> to go back to the event page.
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
