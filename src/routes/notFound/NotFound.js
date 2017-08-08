
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFound.css';

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="col-lg-12">
        <style dangerouslySetInnerHTML={{__html: "\n      body {\n        background-color: #eeeeee;\n        font-family: 'Open Sans',sans-serif;\n        font-weight: 300;\n      }\n      #error-box {\n          min-width: 280px;\n          text-align: center;\n          margin: 40px auto 20px;\n      }\n      \n      #error-box h1 {\n          margin-top: 40px;\n          color: #605f5f;\n          padding: 0;\n      }\n      \n      #error-box p {\n          margin: 20px 0;\n      }\n            \n    " }} />
        <div id="error-box">
          <div className="row">
            <div className="col-xs-12" style={{minHeight: 900}}>
              <div id="error-box-inner">
                <img src="/images/error-404.png" alt="Have you seen this page?" />
              </div>
              <h1>ERROR 404</h1>
              <p>
                Page not found.<br />
                If you find this page, let us know.
              </p>
              <p>
                Go back to <a href="javascript:history.back()">previous page</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

		);
  }
}

export default withStyles(s)(NotFound);
