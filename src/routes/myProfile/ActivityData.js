import React from 'react';
import cx from 'classnames';
class ActivityData extends React.Component {
  render() {
    return (
      <tr style={{ height: 70 }}>
        <td >
          <strong>
            {this.props.userData.itemName}
          </strong>
        </td>
        <td className={cx("text-center", this.props.userData.myBid != this.props.userData.currentBid ? "red" :"green")}>
          <strong className="center-block lh-2">
            ${this.props.userData.myBid}
          </strong>
          {this.props.userData.myBid != this.props.userData.currentBid && <span className="label label-warning">BID</span>}
        </td>
        <td className="text-center green">
          <strong>
            ${this.props.userData.currentBid}
          </strong>
        </td>
      </tr>

      );
  }
}
export default ActivityData;
