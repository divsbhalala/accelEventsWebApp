
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	doTicketHolderDataById,
} from '../action';
let ticketHolder = {};
let TicketHolderQuestions = {};
import Link from '../../../../components/Link';
import PopupModel from '../../../../components/PopupModal';
import history from '../../../../history';
import {connect} from 'react-redux';
class TicketHolderData extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
	constructor(props) {
		super(props);
		this.state = {
			holderData: {},
			ticketHolder: [],
			TicketHolderQuestions: [],
			buyerInformationFields: [],
			errorBuyer: [],
			errorTicketHolder: [],
			errorQuestions: [],
		};
		this.toggleDialog = this.toggleDialog.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.toggleDialog = this.toggleDialog.bind(this);
		this.updateHolderAttributes = this.updateHolderAttributes.bind(this);
	}

	validateEmail = (email) => {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};
	componentWillMount = ()=>{
		if(this.props.ticketId){
			this.props.doTicketHolderDataById('get', this.props.ticketId).then(item=>{
				this.setState({
					holderData : item && item.data
				})
			}).catch(error=>{

				let orderRefundError = error && error.response && error.response.data;
				this.setState({
					dialogTitle : "Error",
					dialogMessage : (orderRefundError && orderRefundError.errorMessage) || "Oops something went wrong, Try again later"
				});
				setTimeout(()=>{
					this.toggleDialog();
				},10);
			})
		}
		else {
			this.setState({
				dialogTitle : "Not Found",
				dialogMessage : "TicketId not found. Please try again later."
			});
			setTimeout(()=>{
				this.toggleDialog();
			},10);
		}
	};

	toggleDialog = ()=>{
		this.setState({
			showDialog: !this.state.showDialog
		})
	};
	setTicketHoldersValue = (field, key,  event) => {
		//If the input fields were directly within this
		//this component, we could use this.refs.[FIELD].value
		//Instead, we want to save the data for when the form is submitted
		let object = ticketHolder || {};
		let value = event.target.value;
		/*if (!object) {
			object = [];
		}
		if (!object) {
			object = {};
		}*/
		if (!object[field.name]) {
			object[field.name] = {};
		}
		object[field.name] = {
			"key": field.name,
			"value": value
		};
		if (field.mandatory) {
			if (!event.target.value) {
				object[field.name]['error'] = true;
				event.target.parentElement.classList.add('has-error');
				event.target.parentElement.classList.remove('has-success');
			}
			else {
				object[field.name]['error'] = false;
			}
		}
		event.target.parentElement.classList.add('has-feedback');
		if (value && field && field.type === 'email') {
			object[field.name]['error'] = !this.validateEmail(value);
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
		ticketHolder = object;
	};
	setQuestionsValue = (field, key, event) => {
		//If the input fields were directly within this
		//this component, we could use this.refs.[FIELD].value
		//Instead, we want to save the data for when the form is submitted
		let object = TicketHolderQuestions || {};
		let value = event.target.value;
		if (!object) {
			object = [];
		}
		if (!object) {
			object = {};
		}
		if (!object[field.name]) {
			object[field.name] = {};
		}
		object[field.name] = {
			"key": field.name,
			"value": value
		};
		if (field.mandatory) {
			if (!event.target.value) {
				object[field.name]['error'] = true;
				event.target.parentElement.classList.add('has-error');
				event.target.parentElement.classList.remove('has-success');
			}
			else {
				object[field.name]['error'] = false;
			}
		}
		event.target.parentElement.classList.add('has-feedback');
		if (value && field && field.type === 'email') {
			object[field.name]['error'] = !this.validateEmail(value);
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
		TicketHolderQuestions = object;
	};
	updateHolderAttributes = ()=>{
		if(this.state.holderData ){
			if(this.state.holderData.attendees && this.state.holderData.attendees.attributes){
				this.state.holderData.attendees.attributes.map((field, key) => {
					if (!ticketHolder) {
						ticketHolder = {};
					}
					if (!ticketHolder[field.name]) {
						ticketHolder[field.name] = {
							"key": field.name,
							"value": field.value
						};
					}
					if (field.mandatory && !ticketHolder[field.name].value) {
						ticketHolder[field.name]['error'] = true;
					}
					console.log(ticketHolder, field)
				})
			}
			if(this.state.holderData.attendees.questions && TicketHolderQuestions) {
				this.state.holderData.attendees.questions.map((field, key) => {
					if (!TicketHolderQuestions) {
						TicketHolderQuestions = {};
					}
					if (!TicketHolderQuestions[field.name]) {
						TicketHolderQuestions[field.name] = {};
					}
					if (field.mandatory && !TicketHolderQuestions[field.name].value) {
						TicketHolderQuestions[field.name]['error'] = true;
					}
					console.log(TicketHolderQuestions, field)
				})
			}
			this.setState({
				errorTicketHolder: ticketHolder
			});
			setTimeout(() => {
				let isValidData = document.getElementsByClassName("has-error").length == 0;
				if (isValidData) {
					let holder = [];
					let holderQuestions = [];
					if (ticketHolder) {
						let keys = _.keys(ticketHolder);
						keys.map(keyItem => {
							console.log(keyItem, ticketHolder);
							if (ticketHolder[keyItem].key) {
								holder.push({
									key: ticketHolder[keyItem].key,
									value: ticketHolder[keyItem].value,
								})
							}
						})
					}
					if (TicketHolderQuestions) {
						let keys = _.keys(TicketHolderQuestions);
						keys.map(keyItem => {
							if (TicketHolderQuestions[keyItem].key) {
								holderQuestions.push({
									key: TicketHolderQuestions[keyItem].key,
									value: TicketHolderQuestions[keyItem].value,
								})
							}
						})
					}
					let holderData = this.state.holderData.attendees;
					holderData.attributes = holder;
					holderData.questions = holderQuestions;

					console.log("TicketHolderQuestions", holderData);
					this.props.doTicketHolderDataById('put', this.props.ticketId, holderData).then(item=>{
						this.setState({
							dialogTitle : "Success",
							dialogMessage : "Ticket Holder information updated successfully "
						});
						setTimeout(()=>{
							this.toggleDialog();
						},10);
					}).catch(error=>{

						let orderRefundError = error && error.response && error.response.data;
						this.setState({
							dialogTitle : "Error",
							dialogMessage : (orderRefundError && orderRefundError.errorMessage) || "Oops something went wrong, Try again later"
						});
						setTimeout(()=>{
							this.toggleDialog();
						},10);
					})
					// this.doCheckout(ticketAttribute, orderData);
				}
				else {
					this.setState({
						showFormError : true,
						formError : "Invalid Data"
					});
				}

			}, 100);
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
                          </div>
													{ this.state.holderData && this.state.holderData.attendees  ?
														<div
															className="attendee-data" key={Math.random()}>
															{
																this.state.holderData.attendees.attributes ?
																	this.state.holderData.attendees.attributes.map((attrib, key) =>
																		<div className="holder-attribute" key={Math.random()}>
																			<div className="custom-attribute">
																				<div className={cx("form-group mrg-t-md")}>
																					<div className="row">
																						<div className="col-md-4 text-right">
																							<label className="text-right">{attrib.name}
																								{ attrib.mandatory && <span className="red">*</span>}
																							</label>
																						</div>
																						<div className="col-md-6 text-left">
																							<div className={cx("form-group",
																								this.state.errorTicketHolder && this.state.errorTicketHolder && this.state.errorTicketHolder && this.state.errorTicketHolder[attrib.name] && (this.state.errorTicketHolder[attrib.name].key || this.state.errorTicketHolder[attrib.name].error) && 'has-feedback',
																								this.state.errorTicketHolder && this.state.errorTicketHolder && this.state.errorTicketHolder && this.state.errorTicketHolder[attrib.name] && this.state.errorTicketHolder[attrib.name].error && 'has-error',
																								this.state.errorTicketHolder && this.state.errorTicketHolder && this.state.errorTicketHolder && this.state.errorTicketHolder[attrib.name] && this.state.errorTicketHolder[attrib.name].value&& 'has-success',
																							)}>
																								<input type="text"
																											 placeholder={attrib.name}
																											 className="form-control"
																											 name={attrib.name}
																											 required={ attrib.mandatory}
																											 defaultValue={attrib.value ||
																											 (this.state.attendee &&
																											 this.state.attendee &&
																											 this.state.attendee &&
																											 this.state.attendee[attrib.name]) || (
																												 this.state.errorTicketHolder && this.state.errorTicketHolder && this.state.errorTicketHolder && this.state.errorTicketHolder[attrib.name] && this.state.errorTicketHolder[attrib.name].value
																											 )
																											 }
																											 onChange={this.setTicketHoldersValue.bind(this, attrib, key)}
																								/>
																								<i
																									className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																								<i
																									className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																								<small
																									className="help-block">{ "The " + attrib.name + " is invalid."}</small>
																							</div>
																						</div>
																					</div>
																				</div>
																			</div>
																			<input type="hidden" name="tableId" defaultValue={0}/>
																		</div>
																	) : ""
															}
															<div className="holder-question">
																<input type="hidden" name="tableId" defaultValue={0}/>
																{
																	this.state.holderData.attendees.questions ?
																		this.state.holderData.attendees.questions.map((attrib, key) =>
																			<div className="holder-attribute" key={Math.random()}>
																				<div className="custom-attribute">
																					<div className={cx("form-group mrg-t-md")}>
																						<div className="row">
																							<div className="col-md-4 text-right">
																								<label className="text-right">{attrib.name}
																									{ attrib.mandatory && <span className="red">*</span>}
																								</label>
																							</div>
																							<div className="col-md-6 text-left">
																								<div className={cx("form-group",
																									this.state.errorQuestions && this.state.errorQuestions && this.state.errorQuestions[attrib.name] && (this.state.errorQuestions[attrib.name].key || this.state.errorQuestions[attrib.name].error) && 'has-feedback',
																									this.state.errorQuestions && this.state.errorQuestions && this.state.errorQuestions[attrib.name] && this.state.errorQuestions[attrib.name].error && 'has-error',
																									this.state.errorQuestions && this.state.errorQuestions && this.state.errorQuestions[attrib.name] && this.state.errorQuestions[attrib.name].value&& 'has-success',
																								)}>
																									<input type="text"
																												 placeholder={attrib.name}
																												 className="form-control"
																												 name={attrib.name}
																												 required={ attrib.mandatory}
																												 defaultValue={attrib.value ||
																												 (this.state.TicketHolderQuestions &&
																												 this.state.TicketHolderQuestions &&
																												 this.state.TicketHolderQuestions[attrib.name]) || (
																													 this.state.errorQuestions && this.state.errorQuestions && this.state.errorQuestions[attrib.name] && this.state.errorQuestions[attrib.name].value
																												 )
																												 }
																												 onChange={this.setQuestionsValue.bind(this, attrib, key)}
																									/>
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>
																									<i
																										className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>
																									<small
																										className="help-block">{ "The " + attrib.name + " is invalid."}</small>
																								</div>
																							</div>
																						</div>
																					</div>
																				</div>
																				<input type="hidden" name="tableId" defaultValue={0}/>
																			</div>
																		) : ""
																}
															</div>
															<hr />
														</div>
														: ''
													}
                        </div>
                        <button type="button" className="btn btn-info updateHolderAttributes" onClick={this.updateHolderAttributes}>Update</button>
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
				<PopupModel
					id="popupDialog"
					showModal={this.state.showDialog && this.state.dialogMessage.length > 0}
					headerText={<p>{this.state.dialogTitle}</p>}
					onCloseFunc={this.toggleDialog}
					modelFooter = {<div>
						<button className="btn btn-green" onClick={()=>{this.toggleDialog(), history.push("/admin/event-ticketing-orders")}}>Close</button></div>}
				>
					<div>{this.state.dialogMessage}</div>
				</PopupModel>
      </div>
		);
  }
}

const mapDispatchToProps = {
	doTicketHolderDataById: (method, ticketId, data) => doTicketHolderDataById(method, ticketId, data),
};
const mapStateToProps = (state) => ({
	authenticated: state.session.authenticated
});
export default connect(mapStateToProps, mapDispatchToProps)(TicketHolderData);