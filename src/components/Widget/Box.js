import React, {Component} from 'react';
import   PropTypes   from 'prop-types';
import {Panel} from 'react-bootstrap';
import Link from '../Link';
import cx from 'classnames';
import {Tooltip,OverlayTrigger} from 'react-bootstrap';

class BoxWidget extends Component { // eslint-disable-line
  static propTypes = {
    className: PropTypes.string,
    headerText: PropTypes.string,
    descText: PropTypes.string,
    linkTitle: PropTypes.string,
    linkText: PropTypes.string,
    linkTarget: PropTypes.string,
  };

  render() {
    return (
      <div className={this.props.className} style={{height: "161px"}}>
        <span className="headline">{this.props.headerText}</span>
        <span className="desc">{this.props.descText}</span>
        <span className="value">
           <LinkWithTooltip href={this.props.linkTo} tooltip={this.props.tooltip}  id="tooltip-1" >
             <span data-toggle="tooltip" className="white" title={this.props.linkTitle}
             target="_blank">{this.props.linkText}
         </span></LinkWithTooltip>
        </span>
      </div>
    );
  }
}
const LinkWithTooltip = React.createClass({
  render() {
    let tooltip = <Tooltip id={this.props.id}>{this.props.tooltip}</Tooltip>;
    return (
      <OverlayTrigger
        overlay={tooltip} placement="bottom"
        delayShow={300} delayHide={150}>
        <a href={this.props.href}>{this.props.children}</a>
      </OverlayTrigger>
    );
  }
});
export default BoxWidget;
