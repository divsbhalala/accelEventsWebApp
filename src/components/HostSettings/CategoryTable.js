import React from 'react';
import PropTypes from 'prop-types';
import RemoteTable from './RemoteTable';
import {Alert} from 'react-bootstrap';

export default class CategoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.categories = this.props.data;
    this.state = {
      tableData:this.categories.slice(0, this.props.sizePerPage),
      totalDataSize: this.categories.length,
      sizePerPage: this.props.sizePerPage,
      currentPage: 1,
      categoryAlertVisible:false,
      categoryMessage : ''
    };
  };

  addItemCategory(categoryDTO){
      if(categoryDTO){
        this.props.addHostCategory(this.props.moduleType, categoryDTO).then(resp => {
          this.props.getHostCategories(this.props.moduleType).then(resp=> {
            if(resp && resp.data){
              this.categories = resp.data.itemCategories;
              this.setState({tableData : this.categories.slice(0, this.props.sizePerPage),totalDataSize: this.categories.length});
            }
          }).catch(error=>{

          });
        }).catch((error) => {

        });
      }
  };

  deleteItemCategory(ids){
      for (let id in ids) {
        this.props.removeHostCategory(this.props.moduleType, ids[id]).then(resp => {
          this.props.getHostCategories(this.props.moduleType).then(resp=> {
            if(resp && resp.data){
              this.categories = resp.data.itemCategories;
              this.setState({tableData : this.categories.slice(0, this.props.sizePerPage),totalDataSize: this.categories.length});
            }
          }).catch(error=>{

          });
        }).catch((error) => {

        });
      }
  };

  updateItemCategory(row, cellName, cellValue) {
    if(row && row.id){
      let tempVal = row[cellName];
      row[cellName] = cellValue;
      this.props.updateHostCategory(this.props.moduleType, row.id ,row).then(resp => {
        if(resp && resp.status === 200){
          this.showCategoryAlert(resp.data.message,'success');
        } else {
          row[cellName] = tempVal;
        }
      }).catch(error => {
        row[cellName] = tempVal;
        if(error && error.response && error.response.status===406){
          this.showCategoryAlert(error.response.data.errorMessage,'danger');
        }
      });
    }
  };

  onPageChange(page, sizePerPage) {
    const currentIndex = (page - 1) * sizePerPage;
    this.setState({
      tableData: this.categories.slice(currentIndex, currentIndex + sizePerPage),
      currentPage: page
    });
  };

  onSizePerPageList(sizePerPage) {
    const currentIndex = (this.state.currentPage - 1) * sizePerPage;
    this.setState({
      tableData: this.categories.slice(currentIndex, currentIndex + sizePerPage),
      sizePerPage: sizePerPage
    });
  };

  dismissCategoryAlert = () => {
    this.setState({categoryAlertVisible:false});
  };

  showCategoryAlert = (categoryMessage,alertType) => {
    this.setState({categoryAlertVisible:true, categoryMessage,alertType});
    setTimeout(function() { this.setState({categoryAlertVisible: false}); }.bind(this), 2000);
  };

  render() {
    return (
      <div className="col-md-8">
            { this.state.categoryAlertVisible &&
              <Alert bsStyle={ this.state.alertType } onDismiss={this.dismissCategoryAlert}>
                <h4>{this.state.categoryMessage}</h4>
              </Alert>
            }
          <RemoteTable onPageChange={ this.onPageChange.bind(this) } onSizePerPageList={ this.onSizePerPageList.bind(this) } { ...this.state }
            updateItemCategory = {this.updateItemCategory.bind(this)} addItemCategory = {this.addItemCategory.bind(this)}
            deleteItemCategory = {this.deleteItemCategory.bind(this)}/>
      </div>
    );
  };
}
CategoryTable.propTypes = {
  data: PropTypes.array.isRequired
};
