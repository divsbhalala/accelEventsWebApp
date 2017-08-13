import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//import s from './AuctionPerformance.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {getPerformanceRaffleItemByItemCode} from './../../routes/admin/raffle/performance/action';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import  SubItemList  from './SubItemList';

class RaffleItemTable extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      event: null
    }
	}
 	isExpandableRow(row) {
	    return true;
	}
    expandComponent(row) {
	    return <SubItemList itemList={row.bidList} />
    }

	expandColumnComponent({ isExpandableRow, isExpanded }) {
		let content = '';

		if (isExpandableRow) {
			content = (isExpanded ?<span className="fa-stack pointer"><i className="fa fa-circle fa-stack-2x icon-backgroundRed" /><i className="fa fa-minus fa-stack-1x fa-lg plus-green white" /></span>
        : <span className="fa-stack pointer"><i className="fa fa-circle fa-stack-2x icon-backgroundGreen" /><i className="fa fa-plus fa-stack-1x fa-lg plus-green white" /></span> );
		} else {
			content = ' ';
		}
		return (
			<div> { content } </div>
		);
	}
  addAsyncProduct(row) {
    if(!row['bidList']){
    this.props.getPerformanceRaffleItemByItemCode(row.itemCode).then((resp) => {
      row['bidList']=resp;
      this.setState({event:1})
    });}

  }
	render() {
		const options = {
			expandRowBgColor: 'rgb(221, 221, 221)'
		};
  function formtPaid(cell,row){
		  return (cell ? <i className="fa fa-check green" aria-hidden="true"/> :<i className="fa fa-times red" aria-hidden="true"/>)
    }
    const selectRow = {
      mode: 'checkbox',  // multi select
      //bgColor: 'green',
      onSelect: this.addAsyncProduct.bind(this),
      hideSelectColumn: true,
      clickToExpand: true,
      clickToSelect: true
    };
  return (
	<div className="performance-table-wrap">
		<div className="page-title">
			<h1 className="page-header">Raffle Item Performance</h1>
		</div>
		<BootstrapTable data={ this.props.items }
			                options={ options }
			                expandableRow={ this.isExpandableRow }
			                expandComponent={ this.expandComponent}
                      selectRow={ selectRow }
                      expandColumnOptions={ {
          expandColumnVisible: true,
          expandColumnComponent: this.expandColumnComponent,
          columnWidth: 50
        } } search>

				<TableHeaderColumn dataField='itemName' >Item Name</TableHeaderColumn>
				<TableHeaderColumn dataField='itemCode' isKey={ true }>Item Code</TableHeaderColumn>
				<TableHeaderColumn dataField='winner'>WINNER</TableHeaderColumn>
				<TableHeaderColumn dataField='totalTickets'>TOTAL TICKETS</TableHeaderColumn>
			</BootstrapTable>
		</div>
		);
	}
}

const mapDispatchToProps = {
  getPerformanceRaffleItemByItemCode: (ItemCode) => getPerformanceRaffleItemByItemCode(ItemCode),
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(RaffleItemTable);
