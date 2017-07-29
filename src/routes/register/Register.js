
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import {connect} from 'react-redux';
import cx from 'classnames';
import Link from '../../components/Link';
import Footer from '../../components/Footer';
import  history from './../../history';
import {Button, FormGroup, ControlLabel, Alert, Radio, HelpBlock, Form, FormControl} from 'react-bootstrap';
import {onFormSubmit, doRegister} from './action/signup_action';
import  _ from 'lodash';
function FieldGroup({id, label, help, ...props}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isValidData: false,
      email: null,
      password: null,
      error: null,
      emailFeedBack: false,
      passwordFeedBack: false,
    }

    this.emailValidateHandler = this.emailValidateHandler.bind(this);
    this.passwordValidateHandler = this.passwordValidateHandler.bind(this);
  }

  onFormClick = (e) => {
    e.preventDefault();

    if (this.password.value.trim() == '') {
      this.setState({
        password: false
      });
    }
    if (this.state.isValidData) {
      this.props.doRegister(this.email.value.trim(), this.password.value.trim()).then((resp) => {
        if (resp.error) {
          browserHistory.push('/');
          this.setState({error: ""});
        }
        else {
          alert('invalid Data');
          this.setState({error: "Invalid Data"});
        }

      });
    }

  };

  emailValidateHandler = (e) => {
    this.setState({
      emailFeedBack: true
    })
    if (this.email.value.trim() == '') {
      this.setState({
        email: false
      });
    }
    else {
      this.setState({
        email: true
      });
    }
    this.setState({isValidData: !!(this.email.value.trim() && this.password.value.trim())});

  };
  passwordValidateHandler = (e) => {
    this.setState({
      passwordFeedBack: true
    });

    if (this.password.value.trim() == '') {

      this.setState({
        password: false
      });
    } else {
      this.setState({
        password: true
      });
    }
    this.setState({isValidData: !!(this.email.value.trim() && this.password.value.trim())});

  };

  componentWillMount() {
    if (!_.isEmpty(this.props.USER_DATA)) {
      history.push('/');
    }
  }

  render() {
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="/css/signup.css"/>
        <img
          src="http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-300x300/6bafabd0-5f33-4dcc-a95c-602babb11761accelevents-logo-white.png"
          alt="" className="logo-img img-responsive center-block"/>
        <h1 className="text-center mrg-t-md">Get started with a free account</h1>
        <div className={s.root}>
          <div className={s.container}>
            {/*<div className="row">

             <form onSubmit={this.onFormClick} className="col-md-6">
             {this.state.error && <Alert bsStyle="danger" >{this.state.error}</Alert>}
             <FormGroup validationState={this.state.name}>
             <FieldGroup
             id="formControlsName"
             type="text"
             label="Name"
             placeholder="Enter Name"
             inputRef={ref => { this.name = ref; }}
             onKeyUp={this.nameValidateHandler}

             />
             </FormGroup>
             <FormGroup validationState={this.state.email}>
             <FieldGroup
             id="formControlsEmail"
             type="email"
             label="Email address"
             placeholder="Enter email"
             inputRef={ref => { this.email = ref; }}
             onKeyUp={this.emailValidateHandler}
             />
             </FormGroup>
             <FormGroup validationState={this.state.password}>
             <FieldGroup
             id="formControlsPassword"
             label="Password"
             type="password"
             inputRef={ref => { this.password = ref; }}
             onKeyUp={this.passwordValidateHandler}
             />
             </FormGroup>
             <Button type="submit">
             Submit
             </Button>
             </form>
             <Link to='/login'>Login</Link>
             </div>*/}
            <div className="onboardpage center-block">
              <div id="alertmessage" className="hide"/>
              <form id="signupform" onSubmit={this.onFormClick} className="createpwdform fv-form fv-form-bootstrap"
                    noValidate="novalidate">
                <button type="submit" className="fv-hidden-submit" style={{display: 'none', width: 0, height: 0}}/>
                <div
                  className={cx("form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
                  <label className="control-label text-uppercase">Email Address</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true"/>
                    </div>
                    <input type="text"
                           className="form-control"
                           name="email"
                           id="login-email"
                           required="required"
                           ref={(input) => {
                             this.email = input;
                           }}
                           onKeyUp={this.emailValidateHandler}/>
                  </div>
                  { this.state.emailFeedBack && this.state.email &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                  { this.state.emailFeedBack && !this.state.email &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                  { this.state.emailFeedBack && !this.state.email &&
                  <small className="help-block">This value is not valid</small> }
                </div>
                <div
                  className={cx("form-group", this.state.passwordFeedBack && 'has-feedback', this.state.passwordFeedBack && this.state.email && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
                  <label className="control-label text-uppercase">Password</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-key" aria-hidden="true"/>
                    </div>
                    <input type="password" className={cx("form-control")} name="password" required="required"
                           ref={(input) => {
                             this.password = input;
                           }}
                           onKeyUp={this.passwordValidateHandler}/>
                  </div>
                  { this.state.passwordFeedBack && this.state.password &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                  { this.state.passwordFeedBack && !this.state.password &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                  { this.state.passwordFeedBack && !this.state.password &&
                  <small className="help-block">This value is not valid</small> }
                </div>
                <input type="hidden" name="mostRecentEventId" defaultValue={0}/>
                <input type="hidden" name defaultValue/>
                <button
                  className={cx("btn btn-lg btn-block mrg-t-lg text-uppercase", ( (this.state.emailFeedBack && !this.state.email) || (this.state.passwordFeedBack && !this.state.password)) && 'disabled')}
                  role="button" type="submit"
                  data-loading-text="<i class='fa fa-spinner fa-spin'></i> Getting Started..">
                  Get Started
                </button>
                <div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
const mapDispatchToProps = {
  onFormSubmit: () => onFormSubmit(),
  doRegister: (email, password) => doRegister(email, password)
};

const mapStateToProps = (state) => ({
  counter: state.counter,
  USER_DATA: state.USER
});

Register.propTypes = {
  //onFormClick: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Register));
