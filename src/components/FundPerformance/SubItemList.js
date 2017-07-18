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
      {this.props.itemList ?
				<table className="table item-data">
					<tbody>
          {this.props.itemList.map((item,index) =>
						<tr className="data-row" key={index}>
							<td><span className="email">{item.bidderEmail}</span></td>
							<td><span className="phone">{item.bidderPhone}</span></td>
							<td><span className="name">{item.bidderFirstName}</span></td>
							<td><span className="name">{item.bidderLastName}</span></td>
							<td><span className="amount">{item.bidAmount}</span></td>
							<td><span className="actions"> </span></td>
							<td><span className="actions"></span></td>
							<td><span className="actions">
                  <ul className="mrg-b-xs readonly-actions list-inline">
                    <li>
                      <a className="delete-bid" data-bidid={2} data-haspaid="true" href="#">Delete</a>
                    </li>
                  </ul>
                </span>
							</td>
						</tr> ) }
					</tbody>
				</table>
        : "Nobody has bid on this item."
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
