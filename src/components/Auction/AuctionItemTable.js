import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//import s from './AuctionPerformance.css';
import cx from 'classnames';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const products = [];
function addProducts(quantity) {
	const startId = products.length;
	for (let i = 0; i < quantity; i++) {
		const id = startId + i;
		if (i < 3) {
			products.push({
				id: id,
				name: 'Item name ' + id,
				price: 2100 + i,
				expand: [ {
					fieldA: 'test1',
					fieldB: (i + 1) * 99,
					fieldC: (i + 1) * Math.random() * 100,
					fieldD: '123eedd' + i
				}, {
					fieldA: 'test2',
					fieldB: i * 99,
					fieldC: i * Math.random() * 100,
					fieldD: '123eedd' + i
				} ]
			});
		} else {
			products.push({
				id: id,
				name: 'Item name ' + id,
				price: 2100 + i
			});
		}
	}
}
addProducts(5);

class BSTable extends React.Component {
	render() {
		if (this.props.data) {
			return (
				<BootstrapTable data={ this.props.data }>
					<TableHeaderColumn dataField='fieldA' isKey={ true }>Field A</TableHeaderColumn>
					<TableHeaderColumn dataField='fieldB'>Field B</TableHeaderColumn>
					<TableHeaderColumn dataField='fieldC'>Field C</TableHeaderColumn>
					<TableHeaderColumn dataField='fieldD'>Field D</TableHeaderColumn>
				</BootstrapTable>);
		} else {
			return (<p>?</p>);
		}
	}
}
  class ExpandRow extends React.Component {
	constructor(props) {
		super(props);
	}

	isExpandableRow(row) {
		if (row.id < 3) return true;
		else return false;
	}

	expandComponent(row) {
		return (
			<BSTable data={ row.expand } />
		);
	}

	expandColumnComponent({ isExpandableRow, isExpanded }) {
		let content = '';

		if (isExpandableRow) {
			content = (isExpanded ? '(-)' : '(+)' );
		} else {
			content = ' ';
		}
		return (
			<div> { content } </div>
		);
	}

	render() {
		const options = {
			expandRowBgColor: 'rgb(242, 255, 163)'
		};
		return (
	<div>
		<div className="page-title">
			<h1 className="page-header">Auction Item Performance</h1>
		</div>

		<BootstrapTable data={ products }
			                options={ options }
			                expandableRow={ this.isExpandableRow }
			                expandComponent={ this.expandComponent }
			                expandColumnOptions={ {
          expandColumnVisible: true,
          expandColumnComponent: this.expandColumnComponent,
          columnWidth: 50
        } } search>

				<TableHeaderColumn dataField='id' isKey={ true }>Item Name</TableHeaderColumn>
				<TableHeaderColumn dataField='name'>Item Code</TableHeaderColumn>
				<TableHeaderColumn dataField='price'>Highest Bidder</TableHeaderColumn>
				<TableHeaderColumn dataField='price'>Current Bid</TableHeaderColumn>
				<TableHeaderColumn dataField='price'>Paid ?</TableHeaderColumn>

			</BootstrapTable>
		</div>
		);
	}
}

class AuctionItemTable extends React.Component{

render() {
		return (
			<div>
					<ExpandRow />

			<div className="table table-responsive">
				<div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer">
					<div id="DataTables_Table_0_filter" className="dataTables_filter">
						<label>
						<input type="search" className placeholder="Search" aria-controls="DataTables_Table_0" />
						</label>
					</div>
					<table className="table item-performance datatable no-footer dataTable" id="DataTables_Table_0" role="grid" style={{width: 990}}>
					<thead className="">
					<tr role="row">
						<th className="show-details sorting_disabled" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 39}} aria-label />
						<th className="sorting_asc" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 191}} aria-label="Item Name: activate to sort column descending" aria-sort="ascending">Item Name</th>
						<th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 127}} aria-label="Item Code: activate to sort column ascending">Item Code</th>
						<th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 183}} aria-label="Highest Bidder: activate to sort column ascending">Highest Bidder</th>
						<th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1} colSpan={1} style={{width: 152}} aria-label="Current Bid: activate to sort column ascending">Current Bid</th>
						<th className="sorting_disabled" rowSpan={1} colSpan={1} style={{width: 82}} aria-label="Paid ?">Paid ?</th></tr>
					</thead>
					<tbody>
					<tr role="row" className="odd"><td className=" show-details"><span className="fa-stack pointer"><i className="fa fa-circle fa-stack-2x icon-backgroundGreen" /><i className="fa fa-plus fa-stack-1x fa-lg plus-green white" /></span><span className="item-code AUC" data-item-code="AUC" /></td><td className="sorting_1">My First Auction Item</td><td>AUC</td><td>-</td><td>-</td><td><ul className="readonly-actions list-inline">  <li>    <i className="fa fa-times red" aria-hidden="true" /></li></ul></td></tr></tbody>
				</table>
				</div>
			</div>
			</div>
		);
	}
		
}
export default AuctionItemTable;