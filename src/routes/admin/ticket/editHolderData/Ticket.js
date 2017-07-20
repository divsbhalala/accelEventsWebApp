
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class TicketHolderData extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
	constructor(props) {
		super(props);
		this.validateForm = this.validateForm.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
	}

	validateEmail = (email) => {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	validateForm = (field, event)=>{
		let value = event.target.value;
		event.target.parentElement.classList.add('has-feedback');
		if (value && field === 'email') {
			// object[key][field.name]['error'] = !this.validateEmail(value);
			if (this.validateEmail(value)) {
				event.target.parentElement.classList.remove('has-error');
				event.target.parentElement.classList.add('has-success');
			}
			else {
				event.target.parentElement.classList.add('has-error');
				event.target.parentElement.classList.remove('has-success');
			}
		}
		else if (value && event.target.parentElement) {
			event.target.parentElement.classList.add('has-success');
			event.target.parentElement.classList.remove('has-error');
		}
		else {
			event.target.parentElement.classList.remove('has-success');
			event.target.parentElement.classList.add('has-error');
		}
	};

  render() {
    return (
      <div id="content-wrapper">
        <div className="row" style={{opacity: 1}}>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8">
                <div className="main-box clearfix">
                  <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                      <div className="project-box gray-box card box-shadow-none">
                        <div className="project-box-header gray-bg">
                          <div className="name text-center">
                            <a href="#">Ticket Holder Information</a>
                          </div>
                        </div>
                        <div className="project-box-content">
                          <div className="red pull-right" />
                          <h4 className="text-left"><strong /></h4>
                          <div className="holder-attribute">
                            <div className="custom-attribute" data-attribute-type="text" data-attribute-name="First Name">
                              <div className="mrg-t-md">
                                <div className="row">
                                  <div className="col-md-4 text-right">
                                    <label className="text-right">First Name</label>
                                  </div>
                                  <div className="col-md-6 text-left form-group">
                                    <input type="text"
																					 className="form-control"
																					 name="First Name"
																					 placeholder="First Name"
																					 defaultValue=""
																					 onChange={(e)=>{this.validateForm('text', e)}}
																		/>
																		<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																		<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
                                    <small className="pad-l-sm help-block small red err-invalid">First Name is required.</small>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="custom-attribute" data-attribute-type="text" data-attribute-name="Last Name">
                              <div className=" mrg-t-md">
                                <div className="row">
                                  <div className="col-md-4 text-right">
                                    <label className="text-right">Last Name</label>
                                  </div>
                                  <div className="col-md-6 text-left form-group">
                                    <input type="text"
																					 className="form-control"
																					 name="Last Name"
																					 placeholder="Last Name"
																					 defaultValue=""
																					 onChange={(e)=>{this.validateForm('text', e)}}
																		/>
																		<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																		<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
                                    <small className="pad-l-sm help-block small red err-invalid" >Last Name is required.</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="custom-attribute" data-attribute-type="email" data-attribute-name="Email">
                              <div className="mrg-t-md ">
                                <div className="row">
                                  <div className="col-md-4 text-right">
                                    <label className="text-right">Email</label>
                                  </div>
                                  <div className="col-md-6 text-left form-group">
                                    <input type="email"
																					 className="form-control"
																					 name="Email"
																					 placeholder="Email"
																					 defaultValue=""
																					 onChange={(e)=>{this.validateForm('email', e)}} />
																		<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																		<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
                                    <small className="pad-l-sm help-block small red err-invalid" >Invalid Email.</small>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button type="button" className="btn btn-info updateHolderAttributes" onClick={this.updateHolderDetails}>Update</button>
                        <div className="mrg-t-lg mrg-b-lg text-center">
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

export default (TicketHolderData);
