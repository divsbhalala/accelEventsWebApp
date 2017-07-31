
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Design.css';
import {connect} from 'react-redux';

import ToggleSwitch from '../../../components/Widget/ToggleSwitch';

import {getDesingSetting,updateDesingSetting,updateEventUrlDesingSetting} from './action';
import Button from 'react-bootstrap-button-loader';
import cx from 'classnames';
import CKEditor from 'react-ckeditor-wrapper';
import {EditableTextField} from 'react-bootstrap-xeditable';

class Design extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      settings: {},
      loading:false,
      isError:false,
      message:null,
    };
    this.submitSettings = this.submitSettings.bind(this);
  };

  componentWillMount() {
    this.props.getDesingSetting("general").then(resp => {
      console.log("resp", resp);
      this.setState({
        settings: resp
      })
    }).catch(error => {
      console.log('error', error)
    })
  };

  submitSettings = (e) => {
    e.preventDefault();
    this.setState({loading:true})
    this.props.updateDesingSetting( this.state.settings).then(resp =>{
      if(resp && resp.message){
        this.setState({loading:false,message:resp.message,isError:false})
      }else{
        this.setState({loading:false,message:"Something wrong",isError:true})
      }
    });
    console.log(e, e.target, this.state.settings)
  };
  updateContent = (value) =>{
    let settings =this.state.settings;
    settings.desc=value;
    this.setState({
      settings
    });
  };
  updateEventUrl = (name, value) =>{
    let settings =this.state.settings;
    settings.eventUrl=value;
    this.setState({
      settings
    });
    this.props.updateEventUrlDesingSetting(value).then(resp =>{
      if(resp && resp.message){
        this.setState({loading:false,message:resp.message,isError:false})
      }else{
        this.setState({loading:false,message:"Something wrong",isError:true})
      }
    });
    console.log(settings,value)
  };
  render() {
    return (
      <div>
      {this.state.settings ?
      <div id="content-wrapper" className="admin-content-wrapper">
        <div className="row">
          <div className="col-sm-12">
            <div className="row" style={{opacity: 1}}>
                <div className="col-lg-12">
                  <div className="row">
                    <div

                      className="col-lg-12">
                      <div id className="clearfix">
                        <h1>
                          Design Event
                          <div className="pull-right">
                            <Button className="btn btn-info btn-block" type="submit" loading={this.state.loading}  onClick={this.submitSettings} >Save Settings</Button>
                          </div>
                        </h1>
                        { this.state.message && <div  className={cx('ajax-msg-box text-center mrg-b-lg', !this.state.isError ? 'text-success':'text-danger')} >
                          { this.state.message }</div>}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="main-box no-header">
                      <div className="main-box-body clearfix">
                        <p>
                          Design your display page. View your changes on your
                          page here:
                          <a href={"http://www.stagingaccel.com:8080/AccelEventsWebApp/events/"+this.state.settings.eventUrl} title="Display page" target="_blank">http://www.stagingaccel.com:8080/AccelEventsWebApp/events/{this.state.settings.eventUrl}</a>.
                        </p>

                        <form id="form" className="form ajax-form" data-validate-function="validateValues" action="design" method="post"><div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span className="fa fa-spinner fa-pulse fa-fw" /> <span className="resp-message" /></div>
                          <div className="row form-group mrg-t-lg">
                            <div className="col-md-3">
                              Event Name
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <input type="text"  name="name" className="form-control" value={this.state.settings.eventName} maxLength={50} />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-md-3">
                              <label>Event URL</label>
                              <p className="help-text">URL by which users will access your event</p>
                            </div>
                            <div className="col-md-6">
                              <div className=" event-url">
                               <span className="text">http://www.stagingaccel.com:8080/AccelEventsWebApp/events/</span>
                               <span className="new-tab-link"> <EditableTextField onUpdate={this.updateEventUrl} value={this.state.settings.eventUrl } name='EventUrl'/></span>
                              </div>
                              <div id="urlAlert" />

                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              Event Logo
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <div className="event-logo">
                                {/*<img src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/937320cf-a809-49c5-916d-e7436a1cfcaeaccelevents-logo-black.png" alt className="img-responsive" />*/}
                                <img src={this.state.settings.logoImage  ? "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/"+this.state.settings.logoImage  : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/937320cf-a809-49c5-916d-e7436a1cfcaeaccelevents-logo-black.png"} alt className="img-responsive" />
                                <a role="button" href="#eventlogo" data-toggle="modal" className="change-image-text">
                                  <img src="http://www.stagingaccel.com:8080/AccelEventsWebApp/img/photo-camera.png" /> Change Logo
                                </a>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <ToggleSwitch name="requireBidderAddress" id="logoEnabled"
                                            defaultValue={ (this.state.settings && this.state.settings.logoEnabled) || false}
                                            className="success enabledisable-switch" onChange={() => {
                                      this.state.settings.logoEnabled = !this.state.settings.logoEnabled
                              }}/>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              Event Banner Image
                              <div className="help-text">The ideal dimensions are 1900 x 300 pixels.</div>
                            </div>
                            <div className="col-md-3">
                              <div className="banner-img">
                                <img src={this.state.settings.bannerImage ? "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/"+this.state.settings.bannerImage : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/937320cf-a809-49c5-916d-e7436a1cfcaeaccelevents-logo-black.png"} alt className="img-responsive normal-logo logo-black" />
                                <a role="button" href="#eventBannerImage" data-toggle="modal" className="change-image-text">
                                  <img src="http://www.stagingaccel.com:8080/AccelEventsWebApp/img/photo-camera.png" /> Change Logo
                                </a>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <ToggleSwitch name="requireBidderAddress" id="bannerImageEnabled"
                                            defaultValue={ (this.state.settings && this.state.settings.bannerImageEnabled ) || false}
                                            className="success enabledisable-switch" onChange={() => {
                                this.state.settings.bannerImageEnabled = !this.state.settings.bannerImageEnabled
                              }}/>
                            </div>
                          </div>

                          <div className="row form-group">
                            <div className="col-md-3">
                              Event Description
                              <div className="help-text" />
                            </div>
                            <div className="col-md-9">
                              <CKEditor value={this.state.settings.desc}
                                        onChange={this.updateContent.bind(this)} />
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              Text Message Bidding Instructions
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <ToggleSwitch name="requireBidderAddress" id="txtMsgBidInstShown"
                                            defaultValue={ (this.state.settings && this.state.settings.txtMsgBidInstShown) || false}
                                            className="success" onChange={() => {
                                this.state.settings.txtMsgBidInstShown = !this.state.settings.txtMsgBidInstShown
                              }}/>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              Hide Total Funds Raised
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <ToggleSwitch name="requireBidderAddress" id="totalFundRaisedHidden"
                                            defaultValue={ (this.state.settings && this.state.settings.totalFundRaisedHidden) || false}
                                            className="success" onChange={() => {
                                this.state.settings.totalFundRaisedHidden = !this.state.settings.totalFundRaisedHidden
                              }}/>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              Hide Countdown Timer
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <ToggleSwitch name="requireBidderAddress" id="countDownTimeHidden"
                                            defaultValue={ (this.state.settings && this.state.settings.countDownTimeHidden) || false}
                                            className="success" onChange={() => {
                                this.state.settings.countDownTimeHidden = !this.state.settings.countDownTimeHidden
                              }}/>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              Social Sharing
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <ToggleSwitch name="requireBidderAddress" id="socialSharingEnabled"
                                            defaultValue={ (this.state.settings && this.state.settings.socialSharingEnabled) || false}
                                            className="success" onChange={() => {
                                this.state.settings.socialSharingEnabled = !this.state.settings.socialSharingEnabled
                              }}/>
                            </div>
                          </div>
                          <div>
                          </div></form>
                        <div className="row">
                          <div className="col-md-offset-4 col-md-3 mrg-t-lg">
                            <Button className="btn btn-info btn-block" type="submit" loading={this.state.loading}  onClick={this.submitSettings}>Save Settings</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
      </div>
        :<div id="app" className="loader" />
      }
      </div>
    );
  }
}


const mapDispatchToProps = {
  getDesingSetting: () => getDesingSetting(),
  updateDesingSetting: (data) => updateDesingSetting(data),
  updateEventUrlDesingSetting: (value) => updateEventUrlDesingSetting(value)
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Design));