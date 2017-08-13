import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import CategoryList from './CategoryList';
import {getHostCategories} from '../HostSettings/action/RestActions';


class CategoryManager extends React.Component
{
  constructor(props) {
  super(props);
  this.state = {
    itemCategories: null,
    message: '',
    status: '',
  };
}
  componentWillMount() {
    this.props.getHostCategories(this.props.moduleType).then((resp) => {
      {console.log('resp',resp )}
      if (resp && resp.data) {
               this.setState({
                 itemCategories: resp.data.itemCategories,
        });
      }
    }).catch((error) => {
    });
  }
  addRow =() => {
    const itemCategories = this.state.itemCategories;
    const newRow = { name: '', id: 0 };

    //if(this.state.itemCategories[this.state.itemCategories.length-1].id) {
    itemCategories.push(newRow);
      this.setState({
        itemCategories,
      });
   // }
  };
  removeRow =(index) => {
    const itemCategories = this.state.itemCategories;
    itemCategories.splice(index, 1);
    this.setState({
      itemCategories,
    });
  };
  actionResult = (method, status, message) => {
    if (status === 'Failed') { this.setState({ status, message }); } else {
      this.setState({ status, message, itemCategories: '' });
      this.props.getHostCategories(this.props.moduleType).then((resp) => {
        if (resp && resp.data) {
          this.setState({
            itemCategories: resp.data.itemCategories,
          });
        }
      }).catch((error) => {
      });
    }
  };
  render()
  {
    return (
      <div>
        {this.state.message && <div className={cx('alert', this.state.status === 'Success' ? 'alert-success' : 'alert-danger')}>{this.state.message}</div>}
        {this.state.itemCategories ? <div className="no-header">
          <div className="col-md-3 col-md-offset-1">
            Category Management
          </div>
          <div className="col-md-8">
            <table className="table volunteer-table">
              <thead>
              <tr>
                <th className="text-center"><span>Name</span></th>

                <th className="text-center"><span>Actions</span></th>
              </tr>
              </thead>
              <tbody>
              {this.state.itemCategories && this.state.itemCategories.map((value, index) =>
                <CategoryList itemCategories={value} key={index} inedx={index} moduleType={this.props.moduleType } removeRow={this.removeRow} actionResult={this.actionResult} />,
              )}
              </tbody>
            </table>
          </div>
            <div className="form-group operations-row text-center">
              <button className="btn btn-default add-item" onClick={this.addRow}>Add Category</button>
            </div>

        </div> : <div id="app" className="loader"/> }
      </div>
    );
  }
}
const mapDispatchToProps = {
  getHostCategories : (moduleType) => getHostCategories(moduleType),
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManager);
