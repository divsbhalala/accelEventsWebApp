import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';
import cx from 'classnames';
import {connect} from 'react-redux';
import s from './../../routes/login/Login.css';
import Link from './../Link';
import {
  updatedUserManagementStaff,
  addUserManagementStaff,
  resendInvitationUserManagementStaff,
  deleteUserManagementStaff
} from './../../routes/admin/usermanagement/action/index';
import {Modal, Popover, OverlayTrigger, Tooltip} from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import PopupModel from './../PopupModal/index';

class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      userData:null,
      loading:false,
      showPopup: false,
      errorMsg:"" ,
      popupHeader:"",
      popupType:"",
      action:"",
      staffId:"",

      email:null,
      firstName: null,
      lastName: null,
      role: null,

      emailFeedBack: false,
      firstNameFeedBack: false,
      lastNameFeedBack: false,
      roleFeedBack: false,

      emailValue: null,
      firstNameValue: null,
      lastNameValue: null,
      roleValue: null,

    };
	};
	componentWillMount() {
    console.log("componentWillMount 2")
    this.setState({
      userData:this.props.userData,
      isEdit:false,
    })
    if(this.props.userData.id == 0 ){
      this.setState({
        isEdit:true,
        action:"Edit",
      })
    }
	};
	componentWillReceiveProps() {
    console.log("componentWillReceiveProps 2 ",this.props.userData)
    this.setState({
      userData:this.props.userData,
      isEdit:false,
    })
    if(this.props.userData.id == 0 ){
      this.setState({
        isEdit:true,
        action:"Edit",
      })
    }
	};
  componentDidMount() {
    console.log("componentDidMount 2")
    this.setState({
      userData:this.props.userData,
      isEdit:false,
    })
    if(this.props.userData.id == 0 ){
      this.setState({
        isEdit:true,
        action:"Edit",
      })
    }

  this.firstName.value=this.props.userData.firstName;
  this.lastName.value=this.props.userData.lastName;
  this.email.value=this.props.userData.email;
  this.role.value=this.props.userData.role;
  };

  emailValidateHandler = (e) => {

		this.setState({
			emailFeedBack: true,
			emailValue: this.email.value.trim(),
		});
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (this.email.value.trim() == '') {
			this.setState({
				email: false,
				errorMsgEmail: "Email is required.",
			});
		}
		else {
			this.setState({
				email: re.test(this.email.value.trim()),
				errorMsgEmail: "Invalid Email.",
			});
		}
	};
	passwordValidateHandler = (e) => {

		this.setState({
			passwordFeedBack: true,
			passwordValue: this.password.value.trim(),
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
	firstNameValidateHandler = (e) => {
		this.setState({
			firstNameFeedBack: true,
			firstNameValue: this.firstName.value.trim()
		});
		if (this.firstName.value.trim() == '') {
			this.setState({
				firstName: false
			});
		} else {
			this.setState({
				firstName: true
			});
		}
	};
	lastNameValidateHandler = (e) => {
		this.setState({
			lastNameFeedBack: true,
			lastNameValue: this.lastName.value.trim(),
		});

		if (this.lastName.value.trim() == '') {

			this.setState({
				lastName: false
			});
		} else {
			this.setState({
				lastName: true
			});
		}
		//  this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});

	};
  roleValidateHandler = (e) => {
		this.setState({
      roleFeedBack: true,
      roleValue: this.role.value.trim(),
		});

		if (this.role.value.trim() == '') {

			this.setState({
        role: false
			});
		} else {
			this.setState({
        role: true
			});
		}
		//  this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});

	};

	editToggle = ()=>{
    if(this.state.userData.id == 0 ){
     this.props.removeRow(this.props.inedx);
    }
    this.setState({
      isEdit:!this.state.isEdit,
    })
  };

  clickAction = (action) => {
    this.setState({action})
    if(action=="Edit"){this.editToggle();}
    if(action=="Delete"){this.deleteUserManagementStaff();}
    if(action=="Resend-Invitation"){this.resendInvitationUserManagementStaff();}
  };
  addAction = () =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to send a payment link to  "+ bid.bidderEmail +" ? ",
      popupHeader:"Please Confirm" ,
      popupType:"Please-Confirm" ,
      bid:bid.bidId,
    })
  };
  invitationAction = () =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to Mark As Paid ",
      popupHeader:"Mark As Paid Confirmation" ,
      popupType:"MarkAsPaid-Confirmation" ,
      bid:bid.bidId,
    })
  };
  deleteAction = () =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to delete Auction Bid of $"+ bid.bidAmount +" from "+ bid.bidderEmail +" ? ",
      popupHeader:"Delete Confirmation" ,
      popupType:"Delete-Confirmation" ,
      bid:bid.bidId,
    })
  };

  submiteAction = () => {
    if(this.state.action=="Edit"){
      let staff={ "email": this.email.value,
        "firstName": this.firstName.value,
        "lastName": this.lastName.value,
        "role": this.role.value}
      if(this.state.userData.id) {
        this.updatedUserManagementStaff(staff);
      } else {
        this.addUserManagementStaff(staff);
      }
    }
  };
  addUserManagementStaff = (staff) =>{
	  this.props.addUserManagementStaff(staff).then(resp=>{
      if (resp.errorMessage) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: "Bidder has been notified.",
          popupHeader:"Failed",
          popupType:"Delete-Confirmation-Failed",
          isEdit:!this.state.isEdit,
        });
        this.props.actionResult("add","Failed","Something is Wrong");
      } else {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.message ,
          popupHeader:"Success",
          popupType:"Delete-Confirmation-Success",
          isEdit:!this.state.isEdit,
        })
        this.props.actionResult("Add","Success",resp.message);
      }
    })
  };
  updatedUserManagementStaff = (staff) =>{
	  this.props.updatedUserManagementStaff(this.state.userData.id,staff).then(resp=>{
      if (resp.errorMessage) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: "Bidder has been notified.",
          popupHeader:"Failed",
          popupType:"Delete-Confirmation-Failed",
          isEdit:!this.state.isEdit,
        });
        this.props.actionResult("Update","Failed","Something is Wrong");
      } else {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.message ,
          popupHeader:"Success",
          popupType:"Delete-Confirmation-Success",
          isEdit:!this.state.isEdit,
        })
        this.props.actionResult("Update","Success",resp.message);
      }
    })
  };
  resendInvitationUserManagementStaff = () =>{
	  this.props.resendInvitationUserManagementStaff(this.state.userData.id).then(resp=>{
      if (resp.errorMessage) {
        this.props.actionResult("resendInvitation","Failed","Something is Wrong");
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: "Bidder has been notified.",
          popupHeader:"Failed",
          popupType:"Delete-Confirmation-Failed",
        });
      } else {
        this.props.actionResult("resendInvitation","Success", resp.message);
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.message ,
          popupHeader:"Success",
          popupType:"Delete-Confirmation-Success",
        })
      }
    })
  };
  deleteUserManagementStaff = () =>{
	  this.props.deleteUserManagementStaff(this.state.userData.id).then(resp=>{
      if (resp.errorMessage) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: "Bidder has been notified.",
          popupHeader:"Failed",
          popupType:"Delete-Confirmation-Failed",
        });
        this.props.actionResult("Delete","Failed","Something is Wrong");
      } else {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.message ,
          popupHeader:"Success",
          popupType:"Delete-Confirmation-Success",
        })
        this.props.actionResult("Delete","Success", "User Deleted Successfully ");
      }
    })
  };
render() {
	return (
    <tr className={cx(this.state.isEdit || this.state.userData.id==0 ? "edit" : "")}>
      <td>
        <input name="name" type="text" className="form-control first-name"
               ref={ref => { this.firstName = ref; }} onKeyUp={this.firstNameValidateHandler}/>
        <span className="value" >{this.state.userData.firstName}</span>
      </td>
      <td>
        <input name="lastName" type="text" className="form-control last-name"
               ref={ref => { this.lastName = ref; }} onKeyUp={this.lastNameValidateHandler} />
        <span className="value" >{this.state.userData.lastName}</span>
      </td>
      <td className="email">
        <input name="email" type="email" className="form-control email" defaultValue={this.state.emailValue} ref={ref => {
          this.email = ref;
        }} onKeyUp={this.emailValidateHandler} />
        <span className="value" >{this.state.userData.email}</span>
      </td>
      <td>
        <select className="form-control permissions" name="permissions" defaultValue={this.state.roleValue} ref={ref => {
          this.role = ref;
        }} onChange={this.roleValidateHandler} >
          <option value="admin">Admin</option>
          <option value="volunteer">Volunteer</option>
        </select>
        <span className="value" >{this.state.userData.role}</span>
      </td>
      <td className="text-center">
      <ul className="readonly-actions list-inline">
        <li>
          <a className="resend-email" onClick={()=> this.clickAction("Resend-Invitation")}>Resend Invitation</a>
        </li>
        <li>
          <a className="edit-item" onClick={()=>this.clickAction("Edit")}>Edit</a>
        </li>
        <li>
          <a className="delete-item" onClick={()=>this.clickAction("Delete")}>Delete</a>
        </li>
      </ul>
      <input type="hidden" name="id" defaultValue={0} />
      <ul className="edit-actions list-inline">
        <li>
          <button className="btn btn-primary btn-submit edit-item" onClick={this.submiteAction}>Submit</button>
        </li>
        <li>
          <button className="btn btn-default btn-cancel" onClick={this.editToggle}>Cancel</button>
        </li>
      </ul>
    </td>
      {/*<PopupModel*/}
        {/*id="mapPopup"*/}
        {/*showModal={this.state.showPopup}*/}
        {/*headerText= {<p>{this.state.popupHeader}</p>}*/}
        {/*modelBody='<div><h1>Location</h1></div>'*/}
        {/*onCloseFunc={this.hidePopup} >*/}
        {/*<div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>*/}
          {/*{ this.state && this.state.errorMsg }*/}
          {/*<div className="modal-footer">*/}
            {/*{this.state.popupType == "Invitation-Confirmation" ? <Button className="btn btn-success" loading={this.state.loading} onClick={this.resendInvitationUserManagementStaff} >Confirm</Button> : ""}*/}
            {/*{this.state.popupType == "Edit-Confirm" ? <Button className="btn btn-success" loading={this.state.loading} onClick={this.updatedUserManagementStaff} >Confirm</Button> : ""}*/}
            {/*{this.state.popupType == "Delete-Confirmation" ? <Button className="btn btn-danger" loading={this.state.loading} onClick={this.deleteUserManagementStaff} >Confirm</Button> : ""}*/}
            {/*<button className="btn btn-primary" onClick={this.hidePopup}>Close</button>*/}
          {/*</div>*/}
        {/*</div>*/}
      {/*</PopupModel>*/}
    </tr>
		)
	};
}

const mapDispatchToProps = {
  updatedUserManagementStaff : (staffId,staff) => updatedUserManagementStaff(staffId,staff),
  deleteUserManagementStaff : (staffId) => deleteUserManagementStaff(staffId),
  resendInvitationUserManagementStaff : (staffId) => resendInvitationUserManagementStaff(staffId),
  addUserManagementStaff : (staffId,staff) => addUserManagementStaff(staffId,staff),
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(UserList));
