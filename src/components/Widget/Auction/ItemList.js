import React from 'react';
import {connect} from 'react-redux';
class ItemList extends React.Component {
	render() {
		return (
			<tr >
				<td className="item-name">{this.props.item.itemName}</td>
				<td className="item-code">{this.props.item.itemCode}</td>
				<td className="item-startingBid">{(this.props.item.winningBid && (this.props.currencySymbol + this.props.item.winningBid)) || "-"}</td>

				{!this.props.highestBidderHidden && !this.props.moduleEnded ?<td className="total-pledge">{this.props.item.highestBidderName || "-"}</td> : ""}
				{!this.props.moduleEnded ?"" : <td className="total-pledge">{this.props.item.highestBidderName || "-"}</td>}
			</tr>
		);
	}
}

const mapDispatchToProps = {};
const mapStateToProps = (state) => ({
	currencySymbol: state.event && state.event.currencySymbol || "$",
});
export default  connect(mapStateToProps, mapDispatchToProps)(ItemList);
