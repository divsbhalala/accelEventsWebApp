
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Design.css';
import cx from 'classnames';
import AdminSiderbar from '../../../components/Sidebar/AdminSidebar';
import CKEditor from 'react-ckeditor-wrapper';
class Design extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <div id="content-wrapper">
        <div className="row">
          <div className="col-sm-12">
            <div className="row" style={{opacity: 1}}>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12">
                      <div id className="clearfix">
                        <h1>
                          Design Event
                          <div className="pull-right">
                            <button className="btn btn-info btn-block" type="submit" onclick="$('#form').submit();" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">Save Settings</button>
                          </div>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="main-box no-header">
                      <div className="main-box-body clearfix">
                        <p>
                          Design your display page. View your changes on your
                          page here:
                          <a href="http://www.stagingaccel.com:8080/AccelEventsWebApp/events/jfbnd" title="Display page" target="_blank">http://www.stagingaccel.com:8080/AccelEventsWebApp/events/jfbnd</a>.
                        </p>
                        <form id="form" className="form ajax-form" data-validate-function="validateValues" action="design" method="post"><div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span className="fa fa-spinner fa-pulse fa-fw" /> <span className="resp-message" /></div><input type="hidden" name="_method" defaultValue="PUT" />
                          <input type="hidden" name defaultValue />
                          <input type="hidden" name="id" defaultValue={288} />
                          <input type="hidden" name="logoImage" defaultValue="937320cf-a809-49c5-916d-e7436a1cfcaeaccelevents-logo-black.png" />
                          <input type="hidden" name="bannerImage" defaultValue />
                          <input type="hidden" name="updateAll" defaultValue="true" />
                          <div className="row form-group mrg-t-lg">
                            <div className="col-md-3">
                              Event Name
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <input type="text" name="name" className="form-control" defaultValue="cd6aecc79b" maxLength={50} />
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-md-3">
                              <label>Event URL</label>
                              <p className="help-text">URL by which users will access your event</p>
                            </div>
                            <div className="col-md-6">
                              <div className="text-input-combo event-url">
                                <span className="text">http://www.stagingaccel.com:8080/AccelEventsWebApp/events/<a href="#" id="eventURL" data-maxlength={30} data-type="text" data-pk={1} data-title="Enter Event Url" className="editable editable-click">jfbnd</a></span>
                                {/*                            <span class="new-tab-link">&nbsp;</span> */}
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
                                <img src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/937320cf-a809-49c5-916d-e7436a1cfcaeaccelevents-logo-black.png" alt className="img-responsive" />
                                <a role="button" href="#eventlogo" data-toggle="modal" className="change-image-text">
                <img src="http://www.stagingaccel.com:8080/AccelEventsWebApp/img/photo-camera.png" /> Change Logo
                                </a>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="onoffswitch enabledisable-switch onoffswitch-success">
                                <input type="checkbox" name="logoEnabled" className="onoffswitch-checkbox enabledisable-switch" id="logo-enable" defaultChecked />
                                <label className="onoffswitch-label" htmlFor="logo-enable">
                                  <div className="onoffswitch-inner" />
                                  <div className="onoffswitch-switch" />
                                </label>
                                <input type="hidden" defaultValue="off" name="_logoEnabled" />
                              </div>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              Event Banner Image
                              <div className="help-text">The ideal dimensions are 1900 x 300 pixels.</div>
                            </div>
                            <div className="col-md-3">
                              <div className="banner-img">
                                <img src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/229987ef-9c3d-450d-9d36-0199af71a78bheader.jpg" alt className="img-responsive normal-logo logo-black" />
                                <a role="button" href="#eventBannerImage" data-toggle="modal" className="change-image-text">
                                  <img src="AccelEventsWebApp/img/photo-camera.png" /> Change Logo
                                </a>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="onoffswitch enabledisable-switch onoffswitch-success">
                                <input type="checkbox" name="bannerImageEnabled" className="onoffswitch-checkbox " id="banner-enable" defaultChecked />
                                <label className="onoffswitch-label" htmlFor="banner-enable">
                                  <div className="onoffswitch-inner" />
                                  <div className="onoffswitch-switch" />
                                </label>
                                <input type="hidden" defaultValue="off" name="_bannerImageEnabled" />
                              </div>
                            </div>
                          </div>

                          <div className="row form-group">
                            <div className="col-md-3">
                              Event Description
                              <div className="help-text" />
                            </div>
                            <div className="col-md-9">
                              <CKEditor />
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              Text Message Bidding Instructions
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <div className="onoffswitch onoffswitch-success">
                                <input type="checkbox" name="txtMsgBidInstShown" className="onoffswitch-checkbox " id="bid-instr" defaultChecked />
                                <label className="onoffswitch-label" htmlFor="bid-instr">
                                  <div className="onoffswitch-inner" />
                                  <div className="onoffswitch-switch" />
                                </label>
                                <input type="hidden" defaultValue="off" name="_txtMsgBidInstShown" />
                              </div>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              Hide Total Funds Raised
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <div className="onoffswitch onoffswitch-success">
                                <input type="checkbox" name="totalFundRaisedHidden" className="onoffswitch-checkbox " id="funds-raised" />
                                <label className="onoffswitch-label" htmlFor="funds-raised">
                                  <div className="onoffswitch-inner" />
                                  <div className="onoffswitch-switch" />
                                </label>
                                <input type="hidden" defaultValue="off" name="_totalFundRaisedHidden" />
                              </div>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              Hide Countdown Timer
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <div className="onoffswitch onoffswitch-success">
                                <input type="checkbox" name="countDownTimeHidden" className="onoffswitch-checkbox " id="show-timer" />
                                <label className="onoffswitch-label" htmlFor="show-timer">
                                  <div className="onoffswitch-inner" />
                                  <div className="onoffswitch-switch" />
                                </label>
                                <input type="hidden" defaultValue="off" name="_countDownTimeHidden" />
                              </div>
                            </div>
                          </div>
                          <div className="row form-group">
                            <div className="col-md-3">
                              Social Sharing
                              <div className="help-text" />
                            </div>
                            <div className="col-md-3">
                              <div className="onoffswitch onoffswitch-success">
                                <input type="checkbox" name="socialSharingEnabled" className="onoffswitch-checkbox " id="social-sharing" defaultChecked />
                                <label className="onoffswitch-label" htmlFor="social-sharing">
                                  <div className="onoffswitch-inner" />
                                  <div className="onoffswitch-switch" />
                                </label>
                                <input type="hidden" defaultValue="off" name="_socialSharingEnabled" />
                              </div>
                            </div>
                          </div>
                          <div>
                          </div></form>
                        {/* /.form */}
                        <div className="row">
                          <div className="col-md-offset-4 col-md-3 mrg-t-lg">
                            <button className="btn btn-info btn-block" type="submit" onclick="$('#form').submit();" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Saving Settings">Save Settings</button>
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
    );
  }
}

export default withStyles(s)(Design);
