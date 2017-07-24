import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './RaffleSetting.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';
import {getHostCategories,addHostCategory,getHostSettings,removeHostCategory,resetHostSettings,updateHostCategory,updateHostSettings} from '../../../../components/HostSettings/action/RestActions';
import DateTimeField from "react-bootstrap-datetimepicker";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ToggleSwitch from '../../../../components/Widget/ToggleSwitch';
import CategoryTable from '../../../../components/HostSettings/CategoryTable';
import TimeZoneSelector from '../../../../components/HostSettings/TimeZoneSelector';
import {Modal ,Button, Alert} from 'react-bootstrap';

class RaffleSetting extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      moduleType: 'raffle',
      title: props['title'],
      settings : {},
      bidIncrement:false,
      isValidData : false,
      alert : null,
      showModal: false,
      alertVisible: false,
      alertMessage:null,
      alertType:null,
      loading: false
    };
  };

  handleAlertDismiss = () => {
    this.setState({alertVisible: false, categoryAlertVisible:false});
  };

  handleAlertShow = (alertMessage,alertType) => {
    this.setState({categoryAlertVisible:true,alertVisible: true, alertMessage,alertType});
    setTimeout(function() { this.setState({alertVisible: false}); }.bind(this), 2000);
  };

  closeResetModal = () => {
    this.setState({ showModal: false });
  };

  openResetModal = () => {
    this.setState({ showModal: true });
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
    });
  };

  updateTimezone = (e) =>{
    let selected = e.nativeEvent.target;
    let settings = this.state.settings;
    settings.eventTimeZone = selected[selected.selectedIndex].text;
    this.setState({settings});
  };

  updateCompTicket = (e) =>{
    let settings = this.state.settings;
    settings.compTicketCode = e.target.value;
    console.log(settings);
    this.setState({settings});
  };

  onSaveSetting = () =>{
    this.setState({loading:true});
    const settings = {};
    settings.activated = this.state.settings.activated;
    settings.categoryEnabled = this.state.settings.categoryEnabled;
    settings.eventTimeZone = this.state.settings.eventTimeZone;
    settings.moduleHidden = this.state.settings.moduleHidden;
    settings.socialSharingEnabled = this.state.settings.socialSharingEnabled;
    settings.userTime = this.state.settings.userTime;
    settings.compTicketCode = this.state.settings.compTicketCode;
    settings.limiteTotalTicket = this.state.settings.limiteTotalTicket,
	  settings.autoSubmitOnPurchase = this.state.settings.autoSubmitOnPurchase,
    console.log(settings);
    this.props.updateHostSettings(this.state.moduleType, settings).then(resp => {
      if(resp && resp.data){
        this.handleAlertShow(resp.data.message,'success');
      }
      else{
        console.log(resp);
      }
      this.setState({loading:false});
    }).catch((error) => {
      this.setState({loading:false});
      console.log(error);
    });
  };

  render() {
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
                          Raffle Settings
                          <div className="pull-right">

                            <button className={cx("btn btn-info btn-block save-settings", (this.state.settings.userTime || this.state.settings.compTicketCode) && 'disabled')}
                              role="button" onClick={this.onSaveSetting}>
                              {this.state.loading ? <div><i className='fa fa-spinner fa-spin'></i> Saving Settings..</div> : 'Save Settings' }
                            </button>
                          </div>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className>
                      <div className="main-box no-header">
                      <div className="ajax-wrap text-center">
                        { this.state.alertVisible && <Alert bsStyle={this.state.alertType} onDismiss={this.handleAlertDismiss}><h4>{this.state.alertMessage}</h4></Alert> }
                      </div>
                        <form id="command" className="form" action="update" method="POST">
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Raffle end time
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <input type="text" className="form-control datetimepicker white-bg" name="newEndDate" id="newEndDate" defaultValue="2017/07/23 02:30" />
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Select Timezone
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              {this.state.settings.eventTimeZone && this.state.settings.timeZones && <TimeZoneSelector id="timeZone" name="timeZone" className="form-control"
                                defaultValue={this.state.settings.eventTimeZone} onChange={this.updateTimezone} timeZoneList={this.state.settings.timeZones} /> }
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Complimentary Ticket Code
                              <div className="help-text">Enter a comma separated list of codes that you wish to accept.</div>
                            </div>
                            <div className="col-md-3">
                              {this.state.settings && <input type="text" className="form-control" name="compTicketCode" value={this.state.settings.compTicketCode}
                              onChange={this.updateCompTicket}/> }
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Enable Social Sharing
                              <div className="help-text">This is popup text for enable social sharing</div>
                            </div>
                            <div className="col-md-3">
                              { this.state.settings && <ToggleSwitch name="socialSharingEnabled" id="socialSharingEnabled"
                                defaultValue={this.state.settings.socialSharingEnabled} className="success"
                                onChange={()=>{ this.state.settings.socialSharingEnabled = !this.state.settings.socialSharingEnabled}}/> }
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Enable Item Categories
                            </div>
                            <div className="col-md-3">{this.state.settings &&
                              <ToggleSwitch name="categoryEnabled" id="categoryEnabled"
                                  defaultValue={this.state.settings.categoryEnabled} className="success"
                                  onChange={()=>{ this.state.settings.categoryEnabled = !this.state.settings.categoryEnabled}}/> }
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Hide Raffle Tab
                            </div>
                            <div className="col-md-3">
                              <ToggleSwitch name="activated" id="activated"
                                  defaultValue={this.state.settings.activated} className="success"
                                  onChange={()=>{ this.state.settings.activated = !this.state.settings.activated}}/>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Auto Submit On Purchase
                            </div>
                            <div className="col-md-3">
                              <ToggleSwitch name="autoSubmitOnPurchase" id="autoSubmitOnPurchase"
                                  defaultValue={this.state.settings.autoSubmitOnPurchase} className="success"
                                  onChange={()=>{ this.state.settings.autoSubmitOnPurchase = !this.state.settings.autoSubmitOnPurchase}}/>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Limit Total Ticket
                            </div>
                            <div className="col-md-3">
                              <ToggleSwitch name="limiteTotalTicket" id="limiteTotalTicket"
                                  defaultValue={this.state.settings.limiteTotalTicket} className="success"
                                  onChange={()=>{ this.state.settings.limiteTotalTicket = !this.state.settings.limiteTotalTicket}}/>
                            </div>
                          </div>
                        </form>
                        <div className="form-group operations-row text-center">
                          <button className="btn btn-default reset" data-toggle="modal" data-target="#resetModuleConfirm">Reset</button>
                        </div>
                        <div className="row form-group ticket-price-settings">
                          <div className="col-md-3 col-md-offset-1">
                            Raffle Ticket Prices
                          </div>
                          <div className="col-md-8">
                            <div id="alert" />
                            <table className="table ticket-price-settings-table">
                              <thead>
                              <tr>
                                <th className="text-center"><span>Number of Tickets</span></th>
                                <th className="text-center"><span>Price</span></th>
                                <th className="text-center"><span>Actions</span></th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr className="dummy edit">
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" required name="numOfTicket" />
                                  </div>
                                  <span className="value numofticket" />
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" required name="price" />
                                  </div>
                                  <span className="value ">$<span className="price" /></span>
                                </td>
                                <td className="text-center">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" name="numOfTicket" defaultValue={1} required />
                                  </div>
                                  <span className="value numofticket">1</span>
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" name="price" defaultValue={5} required />
                                    <input type="hidden" className="form-control" name="id" defaultValue={1694} required />
                                  </div>
                                  <span className="value">$<span className="price">5</span></span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" name="numOfTicket" defaultValue={2} required />
                                  </div>
                                  <span className="value numofticket">2</span>
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" name="price" defaultValue={10} required />
                                    <input type="hidden" className="form-control" name="id" defaultValue={1695} required />
                                  </div>
                                  <span className="value">$<span className="price">10</span></span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" name="numOfTicket" defaultValue={6} required />
                                  </div>
                                  <span className="value numofticket">6</span>
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" name="price" defaultValue={20} required />
                                    <input type="hidden" className="form-control" name="id" defaultValue={1696} required />
                                  </div>
                                  <span className="value">$<span className="price">20</span></span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" name="numOfTicket" defaultValue={15} required />
                                  </div>
                                  <span className="value numofticket">15</span>
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" name="price" defaultValue={40} required />
                                    <input type="hidden" className="form-control" name="id" defaultValue={1697} required />
                                  </div>
                                  <span className="value">$<span className="price">40</span></span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" name="numOfTicket" defaultValue={20} required />
                                  </div>
                                  <span className="value numofticket">20</span>
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" name="price" defaultValue={50} required />
                                    <input type="hidden" className="form-control" name="id" defaultValue={1698} required />
                                  </div>
                                  <span className="value">$<span className="price">50</span></span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div className="input-group">
                                    <input type="number" className="form-control item-name" name="numOfTicket" defaultValue={50} required />
                                  </div>
                                  <span className="value numofticket">50</span>
                                </td>
                                <td className="text-center">
                                  <div className="input-group">
                                    <span className="input-group-addon">$</span>
                                    <input type="number" className="form-control item-name" name="price" defaultValue={100} required />
                                    <input type="hidden" className="form-control" name="id" defaultValue={1699} required />
                                  </div>
                                  <span className="value">$<span className="price">100</span></span>
                                </td>
                                <td className="text-center action-items">
                                  <ul className="readonly-actions list-inline">
                                    <li>
                                      <a className="edit-item">Edit</a>
                                    </li>
                                    <li>
                                      <a className="delete-item">Delete</a>
                                    </li>
                                  </ul>
                                  <ul className="edit-actions list-inline">
                                    <li>
                                      <button className="btn btn-primary btn-submit edit-item">Submit</button>
                                    </li>
                                    <li>
                                      <button className="btn btn-default btn-cancel">Cancel</button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                            <div className="form-group operations-row text-center">
                              <button className="btn btn-default add-item">Add Ticket Price</button>
                            </div>
                          </div>
                        </div>
                        <div className="row form-group category-settings" style={{display : 'block'}}>
                          <div className="col-md-3 col-md-offset-1">
                            Category Management
                          </div>
                          {this.state.itemCategories && <CategoryTable data={this.state.itemCategories} sizePerPage={ 5 } { ...this.state } {...this.props}/>}
                        </div>
                        <div className="form-group operations-row text-center">
                          <button className={cx("btn btn-info btn-block save-settings", ( (this.state.emailFeedBack && !this.state.email) || (this.state.passwordFeedBack && !this.state.password)) && 'disabled')}
                            role="button" onClick={this.onSaveSetting}>
                            {this.state.loading ? <div><i className='fa fa-spinner fa-spin'></i> Saving Settings..</div> : 'Save Settings' }
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
    );
  }
}

const mapDispatchToProps = {
  updateHostSettings : (moduleType, settingsDTO)  => updateHostSettings(moduleType, settingsDTO),
  getHostSettings : (moduleType) => getHostSettings(moduleType),
  getHostCategories : (moduleType) => getHostCategories(moduleType),
  removeHostCategory : (moduleType, id) => removeHostCategory(moduleType, id),
  addHostCategory : (moduleType, itemCategory) => addHostCategory (moduleType, itemCategory),
  updateHostCategory : (moduleType, id, itemCategory) => updateHostCategory(moduleType, id, itemCategory),
  resetHostSettings : (moduleType) => resetHostSettings(moduleType)
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(RaffleSetting));
