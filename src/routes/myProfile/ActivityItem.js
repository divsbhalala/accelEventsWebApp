import React from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
class ActivityItem extends React.Component {
  render() {
    return (
      <tr style={{height: 70}}>
        <td>
          <strong>
            {this.props.userData.itemName}
          </strong>
        </td>
        <td className="text-center  ">
          <strong className="center-block lh-2">
            {this.props.currencySymbol}{this.props.userData.myBid}
          </strong>
        </td>
      </tr>

      );
  }
}
const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
	currencySymbol : (state.event && state.event.currencySymbol) || "$"
});
export default connect(mapStateToProps, mapDispatchToProps)(ActivityItem);
