import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './RaffleSetting.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {connect} from 'react-redux';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';
import {getHostCategories,addHostCategory,getHostSettings,removeHostCategory,resetHostSettings,updateHostCategory,updateHostSettings, getHostTickets} from '../../../../components/HostSettings/action/RestActions';
import TicketList from '../../../../components/HostSettings/TicketList';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ToggleSwitch from '../../../../components/Widget/ToggleSwitch';
import CategoryTable from '../../../../components/HostSettings/CategoryTable';
import TimeZoneSelector from '../../../../components/HostSettings/TimeZoneSelector';
import {Modal ,Button, Alert} from 'react-bootstrap';
import moment from 'moment';

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
      loading: false,
      tickets : [],
      startDate: moment()

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
      this.setState({settings:resp.data, startDate : resp.data.userTime});
    }).catch((error) => {
      console.log(error);
    });
    this.props.getHostTickets(this.state.moduleType).then(resp => {
      this.setState({tickets:resp.data});
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
    settings.moduleHidden = this.state.settings.moduleHidden;
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

  handleChange = (newDate) => {
      console.log("newDate", newDate);
      return this.setState({date: newDate});
  };

  handleEvent = (event, picker) => {
    let settings = this.state.settings;
    settings['userTime'] = picker.startDate.format('YYYY/MM/DD HH:mm');
    this.setState({
      startDate: picker.startDate,
      settings
    });
  };

  resetHostSettings = () => {
    this.props.resetHostSettings(this.state.moduleType).then(resp => {
      if(resp && resp.data && resp.status==200){
        this.closeResetModal();
        this.handleAlertShow(resp.data.message,'success');
      }
      else{
        this.handleAlertShow('Something went wrong.','danger');
      }
    }).catch((error) => {
      this.handleAlertShow('Something went wrong.','danger');
    });
  };

  addRow =() =>{
    let tickets = this.state.tickets;
    let newRow = {numberOfTickets:1,price:0,id:0,complementary:false};
    tickets.push(newRow);
    this.setState({
      tickets
    })
  }
  removeRow =(index) =>{
    let tickets = this.state.tickets;
    tickets.splice(index,1)
    this.setState({
      tickets
    })
  }
  actionResult = (method,status,message) =>{
    if(status == "Failed"){ this.setState({status,message});}
    else{
      this.setState({status,message,tickets : ""});
      this.props.getHostTickets(this.state.moduleType).then(resp => {
        if(resp && resp.data){
          this.setState({tickets:resp.data});
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }

  render() {
    let locale = {
      format: 'YYYY/MM/DD HH:mm',
      separator: ' - ',
      weekLabel: 'W',
      customRangeLabel: 'Custom Range',
      daysOfWeek: moment.weekdaysMin(),
      monthNames: moment.monthsShort(),
      firstDay: moment.localeData().firstDayOfWeek(),
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
                            { this.state.settings.userTime && <div className="col-md-3">
                              <DatetimeRangePicker
                                singleDatePicker
                                timePicker
                                timePicker24Hour
                                showDropdowns
                                locale={locale}
                                startDate={this.state.startDate}
                                onEvent={this.handleEvent}
                              >
                                <div className="input-group">
                                  <input type="text" className="form-control" value={this.state.settings.userTime}/>
                                    <span className="input-group-btn">
                                        <Button className="default date-range-toggle">
                                          <i className="fa fa-calendar"/>
                                        </Button>
                                    </span>
                                </div>
                              </DatetimeRangePicker>
                            </div>
                          }
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
                              <ToggleSwitch name="moduleHidden" id="moduleHidden"
                                  defaultValue={this.state.settings.moduleHidden} className="success"
                                  onChange={()=>{ this.state.settings.moduleHidden = !this.state.settings.moduleHidden}}/>
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
                          <button className="btn btn-default reset" onClick={this.openResetModal}>Reset</button>
                        </div>

                        {this.state.message && <div className={cx("alert",this.state.status=="Success" ? "alert-success":"alert-danger")}>{this.state.message}</div>}
                        {this.state.tickets ? <div className="row form-group ticket-price-settings">
                          <div className="col-md-3 col-md-offset-1">
                            Raffle Ticket Prices
                          </div>
                          <div className="col-md-8">
                            <div id="alert" />
                            <table className="table volunteer-table">
                              <thead>
                              <tr>
                                <th className="text-center"><span>Number of Tickets</span></th>
                                <th className="text-center"><span>Price</span></th>
                                <th className="text-center"><span>Actions</span></th>
                              </tr>
                              </thead>
                              <tbody>
                              {this.state.tickets && this.state.tickets.map((value,index)=>
                                  <TicketList ticket={value} key={index} index={index} removeRow={this.removeRow} actionResult={this.actionResult} />
                              )}
                              </tbody>
                            </table>
                            <div className="form-group operations-row text-center">
                              <button className="btn btn-default add-item" onClick={this.addRow}>Add Ticket Price</button>
                            </div>
                          </div>
                        </div> : <div id="app" className="loader"></div> }


                        <div className="row form-group category-settings" style={{display : 'block'}}>
                          <div className="col-md-3 col-md-offset-1">
                            Category Management
                          </div>
                          {this.state.itemCategories && <CategoryTable data={this.state.itemCategories} sizePerPage={ 5 } { ...this.state } {...this.props}/>}
                        </div>
                        <div className="form-group operations-row text-center">
                          <button className={cx("btn btn-info save-settings", ( (this.state.emailFeedBack && !this.state.email) || (this.state.passwordFeedBack && !this.state.password)) && 'disabled')}
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
            <Modal show={this.state.showModal} onHide={this.closeResetModal}>
              <Modal.Header closeButton>
                <Modal.Title>Reset Raffle</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Reseting your raffle will delete all ticket and winner history. You will not be able to recover this information. Are you sure you want to reset?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="danger" onClick={this.resetHostSettings}>Reset</Button>
                <Button onClick={this.closeResetModal}>Close</Button>
              </Modal.Footer>
            </Modal>
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
  resetHostSettings : (moduleType) => resetHostSettings(moduleType),
  getHostTickets : (moduleType) => getHostTickets(moduleType)
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(RaffleSetting));
