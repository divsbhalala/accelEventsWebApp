import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './resetNewPassword.css';
import _ from 'lodash';
import {doResetNewPassword} from './action/index';
import cx from 'classnames';

import {connect} from 'react-redux';
import {Alert, Button} from 'react-bootstrap';
import  history from './../../history';


class ResetNewPassword extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			isValidData: false,
			passwordError: null,
			passwordResponseError: null,
			passwordMatch: false,
			emailSend: false,
			emailResponseError: "",
		};

	}

	onFormClick = (e) => {
		e.preventDefault();
		if (!this.state.passwordMatch) {
			this.setState({
				passwordError: "Confirm password does not match"
			});
		}
		else {
			let data = {
				newPassword: this.newPassword && this.newPassword.value,
				confirmPassword: this.confirmPassword && this.confirmPassword.value,
			};
			this.props.doResetNewPassword(data, this.props.token).then((resp) => {
				let data = resp && resp.data;
				if(resp.message){
					history.push(resp.message);
				}
				else if(resp.redirectUrl){
					history.push(resp.redirectUrl);
				}

			}).catch(error => {
				this.setState({
					passwordResponseError: (error && error.response && error.response.data && error.response.data.errorMessage) || "Error while processing your request"
				});
			});
		}

	};


	validateHandler = (event) => {
		let target = event.target;
		if (target) {
			event.target.value = target.value && target.value.trim();
			if (_.isEmpty(event.target.value)) {
				event.target.parentElement.classList.remove('has-error');
				event.target.parentElement.classList.add('has-success');
			}
			else {
				event.target.parentElement.classList.remove('has-error');
				if (this.confirmPassword) {
					if (this.newPassword && this.confirmPassword && this.newPassword.value && this.confirmPassword.value && this.confirmPassword.value === this.newPassword.value) {
						this.setState({
							passwordMatch: true
						});
					}
					else {
						this.setState({
							passwordMatch: false
						});
					}
				}
			}
		}

	};


	componentDidMount() {
		/* if(localStorage.getItem('user') && localStorage.getItem('token')){
		 this.props.storeResetNewPasswordData(JSON.parse(localStorage.getItem('user')));
		 this.props.storeToken(JSON.parse(localStorage.getItem('token')));
		 }
		 */
		if (!_.isEmpty(this.props.USER_DATA)) {
			history.push('/');
		}
	}

	render() {
		return (
			<div className="new-password">
				{ this.props.token ? <div className="row">
					<div className="col-md-4 col-md-offset-4">
						<h2 className="text-center"><strong>Password Reset</strong></h2>
						<div className="form">
							<form noValidate id="new-password" name="new-password" className="login-form" onSubmit={this.onFormClick}>
								<div
									className={cx("mrg-t-sm form-group")}>
									<label htmlFor="newpassword" className="control-label text-center">New Password</label>
									<input className="form-control input-lg" type="password" placeholder="New Password" name="newPassword"
												 required="required"
												 autoFocus
												 ref={ref => {
													 this.newPassword = ref;
												 }}
												 onChange={this.validateHandler}
									/>
								</div>
								<div
									className={cx("mrg-t-sm form-group")}>
									<label htmlFor="confirmPassword" className="control-label text-center">Confirm
										Password<sup>*</sup></label>
									<input className="form-control input-lg" type="password" placeholder="Confirm Password"
												 name="confirmPassword"
												 required="required"
												 ref={ref => {
													 this.confirmPassword = ref;
												 }}
												 onChange={this.validateHandler}
									/>
								</div>
								{ this.state.passwordResponseError ?
									<Alert bsStyle="danger">{this.state.passwordResponseError}</Alert> : ""}
								{ this.state.emailSend &&
								<Alert bsStyle="success">Password reset link sent successfully, Please check your mail</Alert>}
								<input type="hidden" name defaultValue/>
								<button className="btn btn-square btn-green btn-lg" type="submit">Reset my password</button>
							</form>
							{/* /.login-form */}
						</div>
					</div>
				</div> : "" }
			</div>
		);
	}
}
const mapDispatchToProps = {
	doResetNewPassword: (email, token) => doResetNewPassword(email, token),
};

const mapStateToProps = (state) => ({
	counter: state.counter,
	USER_DATA: state.USER
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(ResetNewPassword));
