import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//import s from './AuctionPerformance.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {getPerformanceAuctionItemByItemCode} from './../../routes/admin/auction/performance/action';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class SubItemList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
  return (
		<div>
      { this.props.itemList ? this.props.itemList.length ?
				<table className="table item-data">
					<tbody>
          {this.props.itemList.map((item,index) =>
						<tr className="data-row" key={index}>
							<td><span className="email">{item.email}</span></td>
							<td><span className="phone">{item.firstName}</span></td>
							<td><span className="name">{item.lastName}</span></td>
							<td><span className="name">{item.phone}</span></td>
							<td><span className="amount">{item.tickets}</span></td>
							<td><span className="amount">{item.winner}</span></td>
						</tr> ) }
					</tbody>
				</table>
				: "Nobody has bid on this item." :<span className="sr-only"><i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"> </i>Loading...</span>
      }
		</div>
		);
	}
}

const mapDispatchToProps = {
  getPerformanceAuctionItemByItemCode: (ItemCode) => getPerformanceAuctionItemByItemCode(ItemCode),
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SubItemList);
