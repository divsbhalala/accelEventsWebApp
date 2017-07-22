import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class RemoteTable extends React.Component {
  constructor(props) {
    super(props);
  }

  categoryNameValidator(value, row) {
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
    if (!value) {
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Category name can\'t be empty!';
      response.notification.title = 'Requested Category Name';
    }
    return response;
  };

  addCategoryHeader(closeModal, save){
    return (<InsertModalHeader  title='Add Item Category' />);
  };



  render() {
    function indexN(cell, row, enumObject, index) {
      return (<div>{index+1}</div>);
    };

    const options = {
      sizePerPageList: [{ text: '5', value: 5 }, { text: '10', value: 10 }, { text: 'All', value: 100 }],
      sizePerPage: this.props.sizePerPage,
      prePage: 'Prev',
      nextPage: 'Next',
      paginationPosition: 'bottom' ,
      onAddRow: this.props.onInsertRow,
      onDeleteRow: this.props.deleteItemCategory,
      page: this.props.currentPage,
      onSizePerPageList: this.props.onSizePerPageList,
      onPageChange: this.props.onPageChange,
      afterInsertRow: this.props.addItemCategory,
      insertModalHeader: this.addCategoryHeader
    };

    const editCategory = {
      mode: 'click',
      afterSaveCell: this.props.updateItemCategory
    };

    return (
      <BootstrapTable data={ this.props.tableData } striped hover pagination={ true } fetchInfo={ { dataTotalSize: this.props.totalDataSize } }
            insertRow={ true } remote = { true} cellEdit={ editCategory } deleteRow={ true } options={ options }
            deleteRow={ true } selectRow={ {mode: 'checkbox'} } >
          <TableHeaderColumn isKey dataField='id' editable={false} hiddenOnInsert={true} dataFormat={indexN}>Id</TableHeaderColumn>
          <TableHeaderColumn dataField='name' editable={{validator : this.categoryNameValidator}}>Name</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
