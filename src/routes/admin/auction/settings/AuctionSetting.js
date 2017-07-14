
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './AuctionSetting.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AdminSiderbar from '../../../../components/Sidebar/AdminSidebar';
import {EditableTextField} from 'react-bootstrap-xeditable';
import {updateAuctionSettings, getAuctionSettings, getAuctionCategories, removeAuctionCategory, addAuctionCategory, updateAuctionCategory} from './../Auction';
import {connect} from 'react-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ToggleSwitch from '../../../../components/Widget/ToggleSwitch';

class AuctionSetting extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {settings: {}, title: props['title'], bidIncrement:false, itemCategories:[], isValidData : false};
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

  onInsertRow = (row) => {
      console.log(row);
  };

  onDeleteRow = (rowKeys) => {
      console.log(rowKeys);
      this.props.removeAuctionCategory(rowKeys).then(resp => {
        console.log(resp);
      }).catch((error) => {
        console.log(error);
      });
  };

  updateItemCategory = (row, cellName, cellValue) => {
    console.log(row);
      if(row && row.id){
        this.props.updateAuctionCategory(row.id ,row).then(resp => {
          console.log(resp);
        }).catch((error) => {
          console.log(error);
        });
      }
  };



  componentWillMount(){
    this.props.getAuctionSettings().then(resp => {
      this.setState({settings:resp.data});
    }).catch((error) => {
      console.log(error);
    });

    this.props.getAuctionCategories().then(resp=> {
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

  cvvValidateHandler = (e) => {
    this.cvv.value=this.cvv.value.substr(0,4);
    this.setState({
      cvvFeedBack: true,
      ccvValue:this.cvv.value.trim(),
    });

    if (this.cvv.value.trim() == '') {

      this.setState({
        cvv: false,
        errorMsgcvv: "The CVV is required and can't be empty",
      });
    } else if (!( 3 <= this.cvv.value.trim().length && 4 >= this.cvv.value.trim().length )) {
      this.setState({
        cvv: false,
        errorMsgcvv: "The CVV must be more than 4 and less than 3 characters long",
      });
    } else {
      this.setState({
        cvv: true
      });
    }
  };

  bidHandler = (e) => {
    const settings = this.state.settings;
    if (this.defaultBidIncrement.value.trim() == '' || isNaN(this.defaultBidIncrement.value) ) {
      this.setState({bidIncrement: true, isValidData:true});
    }
    else {
      settings.defaultBidIncrement = this.defaultBidIncrement.value;
      this.setState({settings,bidIncrement: false, isValidData:true});
      console.log(this.state.settings);
    }
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
    settings.defaultBidIncrement = this.state.settings.defaultBidIncrement;
    settings.enableMarketValue = this.state.settings.enableMarketValue;
    settings.eventTimeZone = this.state.settings.eventTimeZone;
    settings.highestBidderHidden = this.state.settings.highestBidderHidden;
    settings.moduleHidden = this.state.settings.moduleHidden;
    settings.socialSharingEnabled = this.state.settings.socialSharingEnabled;
    settings.userTime = this.state.settings.userTime;
    console.log(settings);
    this.props.updateAuctionSettings(settings).then(resp => {
      console.log(resp);
    }).catch((error) => {
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

      /*onAddRow: this.onAfterInsertRow,
      onDeleteRow: this.onAfterDeleteRow*/
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
                    <div className>
                      <div className="main-box no-header">
                        <div id="formmessage" />
                        <form id="command" className="form" action="update" method="POST">
                          <input type="hidden" name="id" defaultValue={288} />
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Silent Auction end time
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <input type="text"
                                     className="form-control datetimepicker white-bg"
                                     name="newEndDate"
                                     id="newEndDate"
                                     defaultValue="2017/07/23 02:30"
                                     value={this.state.settings.userTime}
                                     readOnly="readonly" />
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Select Timezone
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">{this.state.settings.eventTimeZone &&
                              <select name="timezone" className="form-control" defaultValue={this.state.settings.eventTimeZone} onChange={this.updateTimezone}>
                                {this.createSelectItems()}
                              </select>}
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Default Bid Increment
                              <div className="help-text">Specify the minimum increment for new bids. This value is the default value. You can set specific values for each item in Item Management.</div>
                            </div>
                            <div className="col-md-3">
                              <div className="input-group">
                                <div className="input-group-addon">
                                  <i className="fa fa-usd" aria-hidden="true"/>
                                </div>
                                <input type="text" className="form-control"
                                       name="defaultBidIncrement" id="defaultBid"
                                       value={this.state.settings.defaultBidIncrement}
                                       required="required" ref={(input) => {this.defaultBidIncrement = input;}}
                                       onChange={this.bidHandler}/>
                              </div>
                              {this.state.bidIncrement && <p className="red">Bid increament must be greater than 0 or numeric.</p>}
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Enable Social Sharing
                              <div className="help-text">This is popup text for enable social sharing</div>
                            </div>
                            <div className="col-md-3"> {this.state.settings.socialSharingEnabled &&
                              <ToggleSwitch name="socialSharingEnabled"
                                            id="socialSharingEnabled"
                                            defaultValue={this.state.settings.socialSharingEnabled}
                                            className="success"
                                            onChange={()=>{ this.state.settings.socialSharingEnabled = !this.state.settings.socialSharingEnabled}}/> }
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Enable Item Categories
                            </div>
                            <div className="col-md-3">{this.state.settings.categoryEnabled &&
                              <ToggleSwitch name="categoryEnabled"
                                            id="categoryEnabled"
                                            defaultValue={this.state.settings.categoryEnabled}
                                            className="success"
                                            onChange={()=>{ this.state.settings.categoryEnabled = !this.state.settings.categoryEnabled}}/> }
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Hide Auction Tab
                            </div>
                            <div className="col-md-3">{this.state.settings && this.state.settings.activated &&
                              <ToggleSwitch name="activated"
                                            id="activated"
                                            defaultValue={this.state.settings.activated}
                                            className="success"
                                            onChange={()=>{ this.state.settings.activated = !this.state.settings.activated}}/> }
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Hide Highest Bidder
                            </div>
                            <div className="col-md-3">{this.state.settings.highestBidderHidden &&
                              <ToggleSwitch name="highestBidderHidden"
                                            id="highestBidderHidden"
                                            defaultValue={this.state.settings.highestBidderHidden}
                                            className="success"
                                            onChange={()=>{ this.state.settings.highestBidderHidden = !this.state.settings.highestBidderHidden}}/>}
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3 col-md-offset-1">
                              Enable Market Value
                            </div>
                            <div className="col-md-3">{this.state.settings.enableMarketValue &&
                              <ToggleSwitch name="enableMarketValue"
                                            id="enableMarketValue"
                                            defaultValue={this.state.settings.enableMarketValue}
                                            className="success"
                                            onChange={()=>{ this.state.settings.enableMarketValue = !this.state.settings.enableMarketValue}}/>}
                            </div>
                          </div>
                          <input type="hidden" name defaultValue />
                          <div>
                          </div></form>

                        <div className="form-group operations-row text-center">
                          <button className="btn btn-default   reset" data-toggle="modal" data-target="#resetModuleConfirm">Reset</button>
                        </div>

                        <div className="row form-group category-settings" style={{display : 'block'}}>
                          <div className="col-md-3 col-md-offset-1">
                            Category Management
                          </div>

                          <div className="col-md-6">
                            <div id="alertmessage" />
                            { this.state.itemCategories && this.state.itemCategories.length &&
                            <BootstrapTable data={ this.state.itemCategories } striped hover search  pagination={ true }
                                            insertRow={ true } cellEdit={ editCategory } deleteRow={ true }
                                            selectRow={ selectCategory } options={ options }>
                              <TableHeaderColumn isKey dataField='id' dataFormat={indexN}>No</TableHeaderColumn>
                              <TableHeaderColumn dataSort dataField='name' editable={{validator : this.categoryNameValidator}}>Name</TableHeaderColumn>
                            </BootstrapTable>}
                          </div>

                        </div>
                        <div className="form-group operations-row text-center">
                          <button className="btn btn-info mrg-t-lg save-settings" type="submit" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">Save Settings</button>
                        </div>{/*onClick="$('.main-box > .form').submit();"*/}
                      </div> {/* /.form */}
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
  updateAuctionSettings : (auctionDTO)  => updateAuctionSettings(auctionDTO),
  getAuctionSettings : () => getAuctionSettings(),
  getAuctionCategories : () => getAuctionCategories(),
  removeAuctionCategory : (id) => removeAuctionCategory(id),
  addAuctionCategory : (itemCategory) => addAuctionCategory (itemCategory),
  updateAuctionCategory : (id, itemCategory) => updateAuctionCategory(id, itemCategory)
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(AuctionSetting));
