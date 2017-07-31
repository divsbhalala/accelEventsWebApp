import React from 'react';
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
            ${this.props.userData.myBid}
          </strong>
        </td>
      </tr>

      );
  }
}
export default ActivityItem;
