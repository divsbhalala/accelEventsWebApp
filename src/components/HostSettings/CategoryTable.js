import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {getHostCategories} from './RestActions';

export default class CategoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.categories = this.props.data;
    this.state = {
      sizePerPage: 5,
      currentPage: 1,
      categories : []
    };
  }

  onPageChange = (page, sizePerPage) => {
    const currentIndex = (page - 1) * sizePerPage;
    console.log(currentIndex +  "    " + this.categories);
    this.setState({
      data: this.categories.slice(currentIndex, currentIndex + sizePerPage),
      currentPage: page
    });
  };

  onSizePerPageList = (sizePerPage) => {
    const currentIndex = (this.state.currentPage - 1) * sizePerPage;
    console.log(currentIndex);
    this.setState({
      data: this.categories.slice(currentIndex, currentIndex + sizePerPage),
      sizePerPage: sizePerPage
    });
  };

  render() {
    function indexN(cell, row, enumObject, index) {
      return (<div>{index+1}</div>)
    };

    const options = {
      sizePerPageList: [{ text: '5', value: 5 }, { text: '10', value: 10 }, { text: 'All', value: 100 }],
      sizePerPage: 5,
      prePage: 'Prev',
      nextPage: 'Next',
      paginationPosition: 'bottom' ,
      onAddRow: this.props.onInsertRow,
      onDeleteRow: this.props.onDeleteRow,
      page: this.currentPage,
      onSizePerPageList: this.onSizePerPageList,
      onPageChange: this.onPageChange,
    };

    const editCategory = {
      mode: 'click',
      afterSaveCell: this.updateItemCategory
    };

    return (
      <BootstrapTable data={ this.props.data } striped hover pagination={ true } fetchInfo={ { dataTotalSize: this.categories.length } }
            insertRow={ true } remote = { true} cellEdit={ editCategory } deleteRow={ true } options={ options }>
          <TableHeaderColumn isKey dataField='id' dataFormat={indexN}>No</TableHeaderColumn>
          <TableHeaderColumn dataSort dataField='name' editable={{validator : this.categoryNameValidator}}>Name</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
CategoryTable.propTypes = {
  data: PropTypes.array.isRequired
};
