import React, {Component} from 'react';
import   PropTypes   from 'prop-types';

class ProgressIndicator extends Component { // eslint-disable-line
  static propTypes = {
    showLoader: PropTypes.bool,
  }

  close() {
    this.setState({showLoader: false});
  }

  open() {
    this.setState({showLoader: true});
  }

  render() {
    return (
      <div>
        { this.props.showLoader && <div className="mobile-progress">
          <div className="mobile-progress-indicator">
            <div className="fa fa-circle-o-notch fa-spin">
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default ProgressIndicator;
