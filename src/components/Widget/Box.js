import React, { Component } from 'react';
import   PropTypes   from 'prop-types';
import { Panel } from 'react-bootstrap';
import Link from '../Link';
import cx from 'classnames';

class BoxWidget extends Component{ // eslint-disable-line
  static propTypes = {
    className: PropTypes.string,
    headerText: PropTypes.string,
    descText: PropTypes.string,
    linkTitle: PropTypes.string,
    linkText: PropTypes.string,
    linkTarget: PropTypes.string,
  }
  render() {
    return (
      <div className={this.props.className} style={{height: "161px"}}>
        <span className="headline">{this.props.headerText}</span>
        <span className="desc">{this.props.descText}</span>
        <span className="value">
                      <a href={this.props.linkTo} data-toggle="tooltip" title={this.props.linkTitle} target="_blank">{this.props.linkText}</a>
                    </span>
      </div>
    );
  }
}

export default BoxWidget;
