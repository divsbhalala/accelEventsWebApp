
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './event.css';
import {connect} from 'react-redux';

import ToggleSwitch from '../../../components/Widget/ToggleSwitch';

import {getOrganizationSettings,setOrganizationSettings} from './action';
import Button from 'react-bootstrap-button-loader';
import cx from 'classnames';

import ColorPicker from 'react-color-picker'
import 'react-color-picker/index.css'
import Link from "../../../components/Link/Link";


class OrganizationSettings extends React.Component {

  constructor() {
    super();
    this.state = {
      settings: {},
      loading:false,
      isError:false,
      message:null,
      headerBgColor: '',
      headerTextColor: '',
      firmName:'',
    };
    this.submitSettings = this.submitSettings.bind(this);
  };

  firmNameValidateHandler = (e) => {
    let settings =this.state.settings;
    settings.firmName=this.firmName.value.trim()
    this.setState({
      settings,settings
    })
  };
  onDragHeaderTextColor(headerTextColor, c) {
    let settings =this.state.settings;
    settings.headerFontColor=headerTextColor;
    this.setState({
      settings,headerTextColor
    })
}
  onDragHeaderBgColor(headerBgColor, c) {
  let settings =this.state.settings;
  settings.headerColor=headerBgColor;
  this.setState({
    settings,headerBgColor
  })
  }
  componentWillMount() {
    this.props.getOrganizationSettings(this.props.params && this.props.params.params).then(resp => {
      console.log("resp", resp);
      this.setState({
        settings: resp,
        headerBgColor :resp.headerColor,
        headerTextColor:resp.headerFontColor,
      })
      this.firmName.value=resp.firmName;
    }).catch(error => {
      console.log('error', error)
    })
  }

  submitSettings = (e) => {
    e.preventDefault();
    this.setState({loading:true})
    this.props.setOrganizationSettings( this.props.params && this.props.params.params,this.state.settings).then(resp =>{
      if(resp && resp.message){
        this.setState({loading:false,message:resp.message,isError:false})
      }else{
        this.setState({loading:false,message:"Something wrong",isError:true})
      }
    });
    console.log(e, e.target, this.state.settings)
  };

  render() {
    return (
      <div>
        { this.state.settings &&
        <div >
          <div className="row">
            <div className="container">
              <h1 className="text-center">Organization Settings</h1>
              <div className="pull-right" style={{marginBottom: 10}}>
                <Link className="btn btn-default " to="home">&nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                <Button className="btn btn-info" type="button" loading={this.state.loading}  onClick={this.submitSettings} >&nbsp;&nbsp;&nbsp;&nbsp;Save Settings&nbsp;&nbsp;&nbsp;&nbsp;</Button>
              </div>
              <div  className={cx("ajax-msg-box text-center mrg-b-lg", !this.state.isError ? 'text-success':'text-danger')} >
                { this.state.message }</div>
            </div>
            </div>
          <div className="row">
            <div className="main-box no-header">
              <div className="main-box-body clearfix">
                <form modelattribute="whiteLabel" action="/AccelEventsWebApp/u/wl/JonsBigWLL/updatesettings" method="POST" id="form">
                  <input type="hidden" className="form-control" name="whiteLabelUrl" defaultValue="JonsBigWLL" />
                  <div className="form-group row mrg-t-lg">
                    <div className="col-md-3">
                      <label>Organization Name</label>
                    </div>
                    <div className="col-md-4">
                      <input type="text" name="firmName" className="form-control"  ref={ref => {
                        this.firmName = ref;
                      }}
                             onKeyUp={this.firmNameValidateHandler}/>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-3">
                      Default Organization Logo
                      <div className="help-text" />
                    </div>
                    <div className="col-md-4">
                      <div className="dropzone-container">
                        <div className="dropzone-alert" />
                        <input type="hidden" name="logoImage" className="form-control" defaultValue="a08ed5d6-e0dc-4c23-b57c-b7eddfc7db93_unnamed.png" />
                        <div className="dropzone dz-clickable">
                          <div className="dz-default dz-message">
                            <span>Drop files here to upload</span>
                          </div>
                          <div className="dz-preview dz-image-preview">  <div className="dz-details">    <div className="dz-filename"><span data-dz-name>Logo</span></div>    <div className="dz-size" data-dz-size><strong>NaN</strong> b</div>    <img data-dz-thumbnail alt="Logo" src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-130x70/a08ed5d6-e0dc-4c23-b57c-b7eddfc7db93_unnamed.png" /></div>  <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress /></div>  <div className="dz-success-mark"><span>âœ”</span></div>  <div className="dz-error-mark"><span>âœ˜</span></div>  <div className="dz-error-message"><span data-dz-errormessage /></div><a className="dz-remove" href="javascript:undefined;">Remove file</a></div></div>
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-3">
                      Default Event Banner Image
                      <div className="help-text" />
                    </div>
                    <div className="col-md-4">
                      <div className="dropzone-container">
                        <div className="dropzone-alert" />
                        <input type="hidden" name="bannerImage" className="form-control" defaultValue="2e238c13-1fb8-4dd5-bb26-a5faa1462f22_jellyfish.jpg" />
                        <div className="dropzone dz-clickable">
                          <div className="dz-default dz-message">
                            <span>Drop files here to upload</span>
                          </div>
                          <div className="dz-preview dz-image-preview">  <div className="dz-details">    <div className="dz-filename"><span data-dz-name>Logo</span></div>    <div className="dz-size" data-dz-size><strong>NaN</strong> b</div>    <img data-dz-thumbnail alt="Logo" src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-130x70/2e238c13-1fb8-4dd5-bb26-a5faa1462f22_jellyfish.jpg" /></div>  <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress /></div>  <div className="dz-success-mark"><span>âœ”</span></div>  <div className="dz-error-mark"><span>âœ˜</span></div>  <div className="dz-error-message"><span data-dz-errormessage /></div><a className="dz-remove" href="javascript:undefined;">Remove file</a></div></div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <input type="hidden" name="bannerImageEnabled" defaultValue="off" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-3">
                      Default Item Image
                      <div className="help-text" />
                    </div>
                    <div className="col-md-4">
                      <div className="dropzone-container">
                        <div className="dropzone-alert" />
                        <input type="hidden" name="defaultItemImage" defaultValue="8921aa81-cc4e-4d9b-a19a-2d5f07fc0aa5_lighthouse.jpg" />
                        <div className="dropzone dz-clickable">
                          <div className="dz-default dz-message">
                            <span>Drop files here to upload</span>
                          </div>
                          <div className="dz-preview dz-image-preview">  <div className="dz-details">    <div className="dz-filename"><span data-dz-name>Logo</span></div>    <div className="dz-size" data-dz-size><strong>NaN</strong> b</div>    <img data-dz-thumbnail alt="Logo" src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-130x70/8921aa81-cc4e-4d9b-a19a-2d5f07fc0aa5_lighthouse.jpg" /></div>  <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress /></div>  <div className="dz-success-mark"><span>âœ”</span></div>  <div className="dz-error-mark"><span>âœ˜</span></div>  <div className="dz-error-message"><span data-dz-errormessage /></div><a className="dz-remove" href="javascript:undefined;">Remove file</a></div></div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <input type="hidden" name="defaultItemImageUpload" defaultValue="off" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-3">
                      Header Logo Image
                      <div className="help-text" />
                    </div>
                    <div className="col-md-4">
                      <div className="dropzone-container">
                        <div className="dropzone-alert" />
                        <input type="hidden" name="headerLogoImage" className="form-control" defaultValue="2bf48224-cdf8-4612-8068-8729e2e64dc8_fall_formal_2015.png" />
                        <div className="dropzone dz-clickable">
                          <div className="dz-default dz-message">
                            <span>Drop files here to upload</span>
                          </div>
                          <div className="dz-preview dz-image-preview">  <div className="dz-details">    <div className="dz-filename"><span data-dz-name>Logo</span></div>    <div className="dz-size" data-dz-size><strong>NaN</strong> b</div>    <img data-dz-thumbnail alt="Logo" src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-130x70/2bf48224-cdf8-4612-8068-8729e2e64dc8_fall_formal_2015.png" /></div>  <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress /></div>  <div className="dz-success-mark"><span>âœ”</span></div>  <div className="dz-error-mark"><span>âœ˜</span></div>  <div className="dz-error-message"><span data-dz-errormessage /></div><a className="dz-remove" href="javascript:undefined;">Remove file</a></div></div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <input type="hidden" name="headerLogoImageUpload" defaultValue="off" />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-4">
                      <div className="text-center" >Header Background Color</div>
                      <input type="text" readOnly className="form-control background iris-color-picker" name="headerColor" defaultValue="#ffffff" value={this.state.headerBgColor} style={{height: 40,color: this.state.headerBgColor}} />
                      <div className="col-md-12">
                        <ColorPicker value={this.state.headerBgColor} onDrag={this.onDragHeaderBgColor.bind(this)} />
                      </div>
                    </div>

                  <div className="col-md-4">
                    <div className="text-center" >Header Color</div>
                    <input  type="text" readOnly className="form-control background iris-color-picker" name="headerColor" defaultValue="#ffffff" value={this.state.headerTextColor}  style={{height: 40,color: this.state.headerTextColor}} />
                    <div className="col-md-12">
                      <ColorPicker value={this.state.headerTextColor} onDrag={this.onDragHeaderTextColor.bind(this)} />
                    </div>
                  </div>

                    <div className="col-md-4">
                      <div className="preview" >Header Preview</div>
                      <div className="demo-div" style={{backgroundColor: this.state.headerBgColor}}>
                        <img src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/2bf48224-cdf8-4612-8068-8729e2e64dc8_fall_formal_2015.png" alt style={{height: 40, padding: '2px 8px'}} className="normal-logo logo-white" />
                        <span className="sample-text pull-right mrg-r-lg" style={{color: this.state.headerTextColor}}>Sample Text</span>
                        <div className="clearfix" />
                      </div>
                    </div>

                  </div>
                  <div className="form-group row">
                    <div className="col-md-4">
                      <label>Show Intercom Chat Widget</label>
                      <p className="help-text">The intercom chat widget allows event organizers to communicate directly with the Accelevents customer
                        support team.</p>
                    </div>
                    <div className="col-md-4">
                      <ToggleSwitch name="requireBidderAddress" id="intercomActivated"
                                    defaultValue={ (this.state.settings && this.state.settings.intercomActivated)}
                                    className="success" onChange={() => {
                        this.state.settings.intercomActivated = !this.state.settings.intercomActivated
                      }}/>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-4">
                      <label>Enable Help Center Links</label>
                      <p className="help-text">Disabling this feature hides the link to the Accelevents help center.</p>
                    </div>
                    <div className="col-md-4">
                      <ToggleSwitch name="requireBidderAddress" id="helpCenterActivated"
                                    defaultValue={ (this.state.settings && this.state.settings.helpCenterActivated)}
                                    className="success" onChange={() => {
                        this.state.settings.helpCenterActivated = !this.state.settings.helpCenterActivated
                      }}/>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-md-6 col-offset-md-3">
                    <Button className="btn btn-info" loading={this.state.loading}  onClick={this.submitSettings} type="button">&nbsp;&nbsp;&nbsp;&nbsp;Save Settings&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                    <Link className="btn btn-default">&nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        }
      </div>
    );
  }
}


const mapDispatchToProps = {
  getOrganizationSettings: (whiteLabelURL) => getOrganizationSettings(whiteLabelURL),
  setOrganizationSettings: (whiteLabelURL,data) => setOrganizationSettings(whiteLabelURL,data)
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(OrganizationSettings));