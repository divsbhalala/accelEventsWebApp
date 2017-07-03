import React from 'react';
class ItemList extends React.Component {
	render() {
		return (
			<tr >
				<td className="item-name">{this.props.item.itemName}</td>
				<td className="item-code">{this.props.item.itemCode}</td>
				<td className="item-startingBid">{this.props.item.totalTicketSubmitted || "-"}</td>
				{this.props.moduleEnded &&<td className="total-pledge">{this.props.item.winnerName || "-"}</td>}
			</tr>
		);
	}
}

export default  ItemList;