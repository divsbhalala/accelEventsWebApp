import React from 'react';
class ItemList extends React.Component {
	render() {
		return (
			<tr >
				<td className="item-name">{this.props.item.itemName}</td>
				<td className="item-code">{this.props.item.itemCode}</td>
				<td className="item-startingBid">{this.props.item.winningBid || "-"}</td>
				{<td className="total-pledge">{this.props.moduleEnded && this.props.item.highestBidderName || "-"}</td>}
			</tr>
		);
	}
}
export default  ItemList;