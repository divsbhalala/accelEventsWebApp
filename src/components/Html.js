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
import serialize from 'serialize-javascript';
import config from '../config';

import rrui from 'react-phone-number-input/rrui.css'
import rpni from 'react-phone-number-input/style.css'

/* eslint-disable react/no-danger */

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      cssText: PropTypes.string.isRequired,
    }).isRequired),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };


  render() {
    const {title, description, styles, scripts, app, children} = this.props;
    return (
      <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="apple-touch-icon" href="apple-touch-icon.png"/>
        <link rel="stylesheet" href="/css/bootstrap.min.css"/>
        <link href="http://diegoddox.github.io/react-redux-toastr/5.0/react-redux-toastr.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="/css/carousel.css"/>
        <link rel="stylesheet" href="/css/goal-thermometer.css"/>

        <link rel="stylesheet" href="/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="/css/App.css"/>
        <link rel="stylesheet" href="/css/loader.css"/>
        <link rel="stylesheet" href="/css/sb-admin.css"/>
        <link rel="stylesheet" href="/css/admin-style.css"/>

        <link rel="stylesheet" href="/css/display.css"/>
        <link rel="stylesheet" href="/css/style.css"/>

        <link rel="stylesheet" href="/css/react-styles.min.css"/>
        <link rel="stylesheet" href="/css/telInput.css"/>
        <link rel="stylesheet" href="/css/rrui.css"/>
        <link rel="stylesheet" href="/css/style2.css"/>
        <link rel="stylesheet" href="/css/host-dashboard.css" />
        <link rel="stylesheet" href="/css/vt-icons.css" />
        {styles.map(style =>
          <style
            key={style.id}
            id={style.id}
            dangerouslySetInnerHTML={{__html: style.cssText}}
          />,
        )}
      </head>
      <body>
      <div id="app" dangerouslySetInnerHTML={{__html: children}}/>
      <script src="https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js"></script>
      <script dangerouslySetInnerHTML={{__html: `window.App=${serialize(app)}`}}/>
      {scripts.map(script => <script key={script} src={script}/>)}
      {config.analytics.googleTrackingId &&
      <script
        dangerouslySetInnerHTML={{
          __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
          `ga('create','${config.analytics.googleTrackingId}','auto');ga('send','pageview')`
        }}
      />
      }
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
      <script src="https://js.stripe.com/v3/"></script>
      {config.analytics.googleTrackingId &&
      <script src="https://www.google-analytics.com/analytics.js" async defer/>
      }
      <script type="text/javascript" src="https://js.stripe.com/v2/"></script>

      </body>
      </html>
    );
  }
}

export default Html;
