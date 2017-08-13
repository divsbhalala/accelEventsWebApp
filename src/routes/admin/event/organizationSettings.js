
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
import UploadImage from './../../../components/Widget/UploadFile/UploadImage'

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
      this.setState({
        settings: resp,
        headerBgColor :resp.headerColor,
        headerTextColor:resp.headerFontColor,
      });
      this.firmName.value=resp.firmName;
    }).catch(error => {
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
  };
  logoImageUploaded = (imageUrl) =>{
     let settings =this.state.settings;
     settings.logoImage=imageUrl;
     this.setState({settings});
  };
  logoImageRemove =(index) => {
    if(this.state.settings && this.state.settings.logoImage) {
      let settings = this.state.settings;
      settings.logoImage=null;
      this.setState({settings});
    }
  };
  defaultItemImageUploaded = (imageUrl) =>{
     let settings =this.state.settings;
     settings.defaultItemImage=imageUrl;
     this.setState({settings});
  };
  defaultItemImageRemove =(index) => {
    if(this.state.settings && this.state.settings.defaultItemImage) {
      let settings = this.state.settings;
      settings.defaultItemImage=null;
      this.setState({settings});
    }
  };
  bannerImageUploaded = (imageUrl) =>{
     let settings =this.state.settings;
     settings.bannerImage=imageUrl;
     this.setState({settings});
  };
  bannerImageRemove =(index) => {
    if(this.state.settings && this.state.settings.bannerImage) {
      let settings = this.state.settings;
      settings.bannerImage=null;
      this.setState({settings});
    }
  };
  headerLogoImageUploaded = (imageUrl) =>{
     let settings =this.state.settings;
     settings.headerLogoImage=imageUrl;
     this.setState({settings});
  };
  headerLogoImageRemove =(index) => {
    if(this.state.settings && this.state.settings.headerLogoImage) {
      let settings = this.state.settings;
      settings.headerLogoImage=null;
      this.setState({settings});
    }
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
              { this.state.message && <div  className={cx("ajax-msg-box text-center mrg-b-lg", !this.state.isError ? 'text-success':'text-danger')} >
                { this.state.message }</div>  }
            </div>
            </div>
          <div className="row">
            <div className="main-box no-header">
              <div className="main-box-body clearfix">
                <form >
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
                      <UploadImage  multiple={false} item={ this.state.settings.logoImage && {'images':[{'imageUrl':this.state.settings.logoImage}]}} imageRemove={this.logoImageRemove} imageUploaded = {this.logoImageUploaded }/>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-3">
                      Default Event Banner Image
                      <div className="help-text" />
                    </div>
                    <div className="col-md-4">
                      <UploadImage  multiple={false} item={ this.state.settings.bannerImage && {'images':[{'imageUrl':this.state.settings.bannerImage}]}} imageRemove={this.bannerImageRemove} imageUploaded = {this.bannerImageUploaded }/>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-3">
                      Default Item Image
                      <div className="help-text" />
                    </div>
                    <div className="col-md-4">
                      <UploadImage  multiple={false} item={ this.state.settings.defaultItemImage && {'images':[{'imageUrl':this.state.settings.defaultItemImage}]}} imageRemove={this.defaultItemImageRemove} imageUploaded = {this.defaultItemImageUploaded }/>
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-3">
                      Header Logo Image
                      <div className="help-text" />
                    </div>
                    <div className="col-md-4">
                      <UploadImage  multiple={false} item={ this.state.settings.headerLogoImage && {'images':[{'imageUrl':this.state.settings.headerLogoImage}]}} imageRemove={this.headerLogoImageRemove} imageUploaded = {this.headerLogoImageUploaded }/>
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
                    <Link to="u/wl/JonsBigWLL/home" className="btn btn-default">&nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;</Link>
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