import React, { Component } from 'react';
import   PropTypes   from 'prop-types';
import { Modal, Popover, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import cx from 'classnames';

class PopupModal extends Component{ // eslint-disable-line
  static propTypes = {
    id: PropTypes.string,
    headerText: PropTypes.string,
    modelBody: PropTypes.string,
    modelFooter: PropTypes.string,
    showModal: PropTypes.bool,
    onCloseFunc: PropTypes.func,
  }
  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div className="static-modal" id={this.props.id+'-containter'}>
        <div>
          <Modal show={this.props.showModal ? true : false} onHide={this.props.onCloseFunc}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.headerText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {<div dangerouslySetInnerHTML={{__html: this.props.modelBody}} />}
            </Modal.Body>
            {this.props.modelFooter && <Modal.Footer>
              {<div dangerouslySetInnerHTML={{__html: this.props.modelFooter}} />}
            </Modal.Footer>}
          </Modal>
        </div>
      </div>
    );
  }
}

export default PopupModal;
