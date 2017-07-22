import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './FundSetting.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';
import {getHostCategories,addHostCategory,getHostSettings,removeHostCategory,resetHostSettings,updateHostCategory,updateHostSettings} from '../../../../components/HostSettings/RestActions';
import DateTimeField from "react-bootstrap-datetimepicker";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ToggleSwitch from '../../../../components/Widget/ToggleSwitch';
import CategoryTable from '../../../../components/HostSettings/CategoryTable';
import {Modal ,Button, Alert} from 'react-bootstrap';

class FundSetting extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      moduleType: 'fundANeed',
      settings: {},
      title: props['title'],
      bidIncrement:false,
      itemCategories:[],
      isValidData : false,
      alert : null,
      showModal: false,
      alertVisible: false,
      alertMessage:null,
      alertType:null,
      categoryAlertVisible:false
    };
  };

  categoryNameValidator = (value, row) => {
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
    if (!value) {
      response.isValid = false;
      response.notification.type = 'error';
      response.notification.msg = 'Category name can\'t be empty!';
      response.notification.title = 'Requested Category Name';
    }
    return response;
  };

  handleAlertDismiss = () => {
    this.setState({alertVisible: false, categoryAlertVisible:false});
  };

  handleAlertShow = (alertMessage,alertType) => {
    this.setState({categoryAlertVisible:true,alertVisible: true, alertMessage,alertType});
    setTimeout(function() { this.setState({alertVisible: false}); }.bind(this), 2000);
  };

  onInsertRow = (row) => {
    console.log(row);
  };

  onDeleteRow = (rowKeys) => {
    console.log(rowKeys);
    this.props.removeHostCategory(this.state.moduleType, rowKeys).then(resp => {
      console.log(resp);
    }).catch((error) => {
      console.log(error);
    });
  };

  updateItemCategory = (row, cellName, cellValue) => {
    if(row && row.id){
      this.props.updateHostCategory(this.state.moduleType, row.id ,row).then(resp => {
        if(resp && resp.status == 200)
          this.handleAlertShow(resp.data.message,'success');
      }).catch(error => {
        if(error && error.response && error.response.status==406);
          this.handleAlertShow(error.response.data.errorMessage,'danger');
      });
    }
  };

  closeResetModal = () => {
    this.setState({ showModal: false });
  };

  openResetModal = () => {
    this.setState({ showModal: true });
  };

  resetHostSettings = () => {
    this.props.resetHostSettings(this.state.moduleType).then(resp => {
      if(resp && resp.data){
        this.closeResetModal();
        this.handleAlertShow(resp.data.message,'success');
      }
      else{
        console.log(resp);
      }
    }).catch((error) => {
      console.log(error);
    });
  };
  createSelectItems = () => {
    let items = [];
    let timezones = this.state.settings.timeZones;
    for (let i in timezones) {
      items.push(<option key={timezones[i].name} value={timezones[i].name}>{timezones[i].name}</option>);
    }
    return items;
  };
  updateTimezone = (e) =>{
    let selected = e.nativeEvent.target;
    let settings = this.state.settings;
    settings.eventTimeZone = selected[selected.selectedIndex].text;
    this.setState({settings});
  };

  onSaveSetting = () =>{
    const settings = {};
    settings.activated = this.state.settings.activated;
    settings.categoryEnabled = this.state.settings.categoryEnabled;
    settings.eventTimeZone = this.state.settings.eventTimeZone;
    settings.moduleHidden = this.state.settings.moduleHidden;
    settings.socialSharingEnabled = this.state.settings.socialSharingEnabled;
    settings.userTime = this.state.settings.userTime;
    console.log(settings);
    this.props.updateHostSettings(this.state.moduleType, settings).then(resp => {
      if(resp && resp.data){
        this.handleAlertShow(resp.data.message,'success');
      }
      else{
        console.log(resp);
      }
    }).catch((error) => {
      console.log(error);
    })
  };

  componentWillMount(){
    this.props.getHostSettings(this.state.moduleType).then(resp => {
      this.setState({settings:resp.data});
    }).catch((error) => {
      console.log(error);
    });

    this.props.getHostCategories(this.state.moduleType).then(resp=> {
      if(resp){
        this.setState({itemCategories : resp.data.itemCategories});
      }
      else{
        console.log(resp);
      }
    }).catch(error=>{
      console.log(error);
    })

  };

  render() {

    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: 100
      } ],
      sizePerPage: 10,
      pageStartIndex: 0,
      paginationSize: 5,
      prePage: 'Prev',
      nextPage: 'Next',
      paginationPosition: 'bottom' ,
      onAddRow: this.onInsertRow,
      onDeleteRow: this.onDeleteRow
    };
    function indexN(cell, row, enumObject, index) {
      return (<div>{index+1}</div>)
    };
    const selectCategory = {
      mode: 'checkbox'
    };
    const editCategory = {
      mode: 'click',
      afterSaveCell: this.updateItemCategory
    };

    return (
      <div id="content-wrapper" className="admin-content-wrapper">
        <div className="row">
          <div className="col-sm-12">
           <div className="row" style={{opacity: 1}}>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12">
                      <div id className="clearfix">
                        <h1>
                          {this.state.title}
                          <div className="pull-right">
                            <button
                              className={cx("btn btn-info btn-block save-settings", ( (this.state.emailFeedBack && !this.state.email) || (this.state.passwordFeedBack && !this.state.password)) && 'disabled')}
                              role="button" type="submit" onClick={this.onSaveSetting}
                              data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings..">
                              Save Settings
                            </button>
                          </div>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="main-box no-header">
                        <div className="ajax-wrap text-center">
                          { this.state.alertVisible && <Alert bsStyle={this.state.alertType} onDismiss={this.handleAlertDismiss}><h4>{this.state.alertMessage}</h4></Alert> }
                        </div>
                        <form id="causeHost" className="form" action="update" method="POST">
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Fund a Need end time
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <DateTimeField inputFormat="DD-MM-YYYY" dateTime={this.state.settings.userTime}/>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Select Timezone
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              {this.state.settings.eventTimeZone &&
                              <select name="timezone" className="form-control" defaultValue={this.state.settings.eventTimeZone} onChange={this.updateTimezone}>
                                {this.createSelectItems()}
                              </select>}
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Enable Social Sharing
                              <div className="help-text">This is popup text for enable social sharing</div>
                            </div>
                            <div className="col-md-3">
                              {this.state.settings &&
                              <ToggleSwitch name="socialSharingEnabled"
                                            id="socialSharingEnabled"
                                            defaultValue={this.state.settings.socialSharingEnabled}
                                            className="success"
                                            onChange={()=>{ this.state.settings.socialSharingEnabled = !this.state.settings.socialSharingEnabled}}/> }
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Hide Fund-a-Need Tab
                            </div>
                            <div className="col-md-3">
                              {this.state.settings &&
                              <ToggleSwitch name="activated" id="activated"
                                defaultValue={this.state.settings.activated} className="success"
                                onChange={()=>{ this.state.settings.activated = !this.state.settings.activated}}/> }
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Enable Item Categories
                            </div>
                            <div className="col-md-3">
                              {this.state.settings &&
                              <ToggleSwitch name="categoryEnabled"
                                            id="categoryEnabled"
                                            defaultValue={this.state.settings.categoryEnabled}
                                            className="success"
                                            onChange={()=>{ this.state.settings.categoryEnabled = !this.state.settings.categoryEnabled}}/> }
                            </div>
                          </div>
                          <div>
                          </div></form>
                        <div className="form-group operations-row text-center">
                          <button className="btn btn-default reset" onClick={this.openResetModal}>Reset</button>
                        </div>
                        <div className="row form-group category-settings">
                          <div className="col-md-3 col-md-offset-1">
                            Category Management
                          </div>
                          <div className="col-md-8">
                            <CategoryTable data={this.state.itemCategories}/>
                          </div>
                        </div>
                        <div className="form-group operations-row text-center">
                          <button className="btn btn-info mrg-t-lg" type="submit" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">Save Settings</button>
                        </div>
                      </div> {/* /.form */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <Modal show={this.state.showModal} onHide={this.closeResetModal}>
            <Modal.Header closeButton>
              <Modal.Title>Reset Auction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Reseting your auction will delete all bid history. You will not be able to recover this information. Are you sure you want to reset?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="danger" onClick={this.resetAuctionSettings}>Reset</Button>
              <Button onClick={this.closeResetModal}>Close</Button>
            </Modal.Footer>
          </Modal>
          </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateHostSettings : (moduleType, auctionDTO)  => updateHostSettings(moduleType, auctionDTO),
  getHostSettings : (moduleType) => getHostSettings(moduleType, ),
  getHostCategories : (moduleType) => getHostCategories(moduleType, ),
  removeHostCategory : (moduleType, id) => removeHostCategory(moduleType, id),
  addHostCategory : (moduleType, itemCategory) => addHostCategory (moduleType, itemCategory),
  updateHostCategory : (moduleType, id, itemCategory) => updateHostCategory(moduleType, id, itemCategory),
  resetHostSettings : (moduleType) => resetHostSettings(moduleType)
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(FundSetting));
