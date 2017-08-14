import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Navbar, { Brand } from 'react-bootstrap/lib/Navbar';
import cx from 'classnames';
import { connect } from 'react-redux';
import s from './../../routes/login/Login.css';
import {addHostCategory,updateHostCategory,removeHostCategory} from '../HostSettings/action/RestActions';
import Button from 'react-bootstrap-button-loader';
import PopupModel from '../PopupModal';
class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCategories: null,
      loading: false,
      showPopup: false,
      errorMsg: '',
      popupHeader: '',
      popupType: '',
      action: '',
      staffId: '',


      categoryName: null,
      categoryNameFeedBack: false,
      categoryNameValue: null,
    };
  }
  componentWillMount() {
    this.setState({
      itemCategories: this.props.itemCategories,
      isEdit: false,
    });
    if (this.props.itemCategories.id == 0) {
      this.setState({
        isEdit: true,
        action: 'Edit',
      });
    }
  }
  componentWillReceiveProps() {
    this.setState({
      itemCategories: this.props.itemCategories,
      isEdit: false,
    });
    if (this.props.itemCategories.id == 0) {
      this.setState({
        isEdit: true,
        action: 'Edit',
      });
    }
  }
  componentDidMount() {
    this.setState({
      itemCategories: this.props.itemCategories,
      isEdit: false,
    });
    if (this.props.itemCategories.id === 0) {
      this.setState({
        isEdit: true,
        action: 'Edit',
      });
    }
    this.categoryName.value = this.props.itemCategories.name;
  }
  categoryNameValidateHandler = (e) => {
    this.setState({
      categoryNameFeedBack: true,
      categoryNameValue: this.categoryName.value.trim(),
    });
    if (this.categoryName.value.trim() === '') {
      this.setState({
        categoryName: false,
      });
    } else {
      this.setState({
        categoryName: true,
      });
    }
  };
  editToggle = () => {
    if (this.state.itemCategories.id === 0) {
      this.props.removeRow(this.props.inedx);
    }
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  clickAction = (action) => {
    this.setState({ action });
    if (action === 'Edit') { this.editToggle(); }
   // if (action === 'Delete') { this.removeHostCategory(); }
  };
   deleteAction = () => {
    this.setState({
      showPopup: true,
      errorMsg: 'Are you sure you want to delete Category ? ',
      popupHeader: 'Delete Confirmation',
      popupType: 'Delete-Confirmation',
    });
  };
  submiteAction = () => {
    this.setState({
      categoryNameFeedBack: true,
    });
     if (this.state.action === 'Edit') {
      const category = {
        'name': this.categoryName.value,
         };
        if (this.categoryName.value.trim()) {
        if (this.state.itemCategories.id) {
          this.updateHostCategory(category);
        } else {
          this.addHostCategory(category);
        }
      }
    }
  };
  addHostCategory = (category) => {
     this.props.addHostCategory(this.props.moduleType, category).then((resp) => {
    if (resp.errorMessage) {
      this.setState({
        isEdit: !this.state.isEdit,
      });
      this.props.actionResult('add', 'Failed', 'Something is Wrong');
    } else {
      this.setState({
         isEdit: !this.state.isEdit,
      });
      this.props.actionResult('Add', 'Success', resp.message);
    }
  });
  };
  updateHostCategory = (Category) => {
   	 this.props.updateHostCategory(this.props.moduleType ,this.state.itemCategories.id, Category).then((resp) => {
      if (resp.errorMessage) {
        this.setState({
          isEdit: !this.state.isEdit,
        });
        this.props.actionResult('Update', 'Failed', 'Something is Wrong');
      } else {
        this.setState({
         isEdit: !this.state.isEdit,
        });
        this.props.actionResult('Update', 'Success', resp.message);
      }
    });
  };
  removeHostCategory = () => {
    console.log("hello .. tst delete")
    this.setState({ loading: true });
	  this.props.removeHostCategory(this.props.moduleType,this.state.itemCategories.id).then((resp) => {
    if (resp.errorMessage) {
      this.setState({
        loading: false,
        showPopup: true,
        errorMsg:resp.errorMessage,
        popupHeader: 'Failed',
        popupType: 'Delete-Confirmation-Failed',
      });
      this.props.actionResult('Delete', 'Failed', 'Something is Wrong');
    } else {
      this.setState({
        loading: false,
        showPopup: true,
        errorMsg: resp.message,
        popupHeader: 'Success',
        popupType: 'Delete-Confirmation-Success',
      });
      this.props.actionResult('Delete', 'Success', 'Category Deleted Successfully ');
    }
  });
  };
  showPopup = () => {
    this.setState({
      showPopup: true,
    });
  };
  hidePopup = () => {
    this.setState({
      showPopup: false,
    });
  };
  render() {
        return (
      <tr className={cx(this.state.isEdit || this.props.itemCategories.id === 0 ? 'edit' : '')}>
       <td>
          <div className={cx('form-group', this.state.categoryNameFeedBack && 'has-feedback', this.state.categoryNameFeedBack && this.state.categoryName && 'has-success', this.state.categoryNameFeedBack && (!this.state.categoryName) && 'has-error')}>
            <input
              name="name" type="text" className="form-control first-name"
              ref={(ref) => { this.categoryName = ref; }} onKeyUp={this.categoryNameValidateHandler}
            />
            { this.state.categoryNameFeedBack && !this.state.categoryName &&
            <i className="form-control-feedback fv-bootstrap-icon-input-group" />}
            { this.state.categoryNameFeedBack && !this.state.categoryName &&
            <small className="help-block">{this.state.errorMsg}</small>}
          </div>
          <span className="value" >{this.props.itemCategories.name}</span>
        </td>
                <td className="text-center">
          <ul className="readonly-actions list-inline">
            <li>
              <a className="edit-item" onClick={() => this.clickAction('Edit')}>Edit</a>
            </li>
            <li>
              <a className="delete-item" onClick={this.deleteAction}>Delete</a>
            </li>
          </ul>
          <input type="hidden" name="id" defaultValue={0} />
          <ul className="edit-actions list-inline">
            <li>
              <button className="btn btn-primary btn-submit edit-item" onClick={this.submiteAction} >Submit</button>
            </li>
            <li>
              <button className="btn btn-default btn-cancel" onClick={this.editToggle}>Cancel</button>
            </li>
          </ul>
          <PopupModel
            id="mapPopup"
            showModal={this.state.showPopup}
            headerText={<p>{this.state.popupHeader}</p>}
            modelBody="<div><h1>Location</h1></div>"
            onCloseFunc={this.hidePopup}
          >
            <div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid" />
              { this.state && this.state.errorMsg }
              <div className="modal-footer">
                {this.state.popupType === 'Delete-Confirmation' ? <Button className="btn btn-danger" loading={this.state.loading} onClick={this.removeHostCategory} >Confirm</Button> : ''}
                <button className="btn btn-primary" onClick={this.hidePopup}>Close</button>
              </div>
            </div>
          </PopupModel>
        </td>
      </tr>
    );
  }
}
const mapDispatchToProps = {
  removeHostCategory : (moduleType, id) => removeHostCategory(moduleType, id),
  addHostCategory : (moduleType, itemCategory) => addHostCategory (moduleType, itemCategory),
  updateHostCategory : (moduleType, id, itemCategory) => updateHostCategory(moduleType, id, itemCategory)
};
const mapStateToProps = state => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(CategoryList));
