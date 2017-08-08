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
} from './../../routes/admin/event/action/index';
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
    this.setState({
      userData:this.props.userData,
      isEdit:false,
    });
    if(this.props.userData.id === 0 ){
      this.setState({
        isEdit:true,
        action:"Edit",
      })
    }
  };
  componentWillReceiveProps() {
    this.setState({
      userData:this.props.userData,
      isEdit:false,
    });
    if(this.props.userData.id === 0 ){
      this.setState({
        isEdit:true,
        action:"Edit",
      })
    }
  };
  componentDidMount() {
    this.setState({
      userData:this.props.userData,
      isEdit:false,
    });
    if(this.props.userData.id === 0 ){
      this.setState({
        isEdit:true,
        action:"Edit",
      })
    }
    this.firstName.value=this.props.userData.firstName;
    this.lastName.value=this.props.userData.lastName;
    this.email.value=this.props.userData.email;
 //   this.role.value=this.props.userData.role;
  };

  emailValidateHandler = (e) => {

    this.setState({
      emailFeedBack: true,
      emailValue: this.email.value.trim(),
    });
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.email.value.trim() === '') {
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

    if (this.password.value.trim() === '') {

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
    if (this.firstName.value.trim() === '') {
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

    if (this.lastName.value.trim() === '') {

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

    if (this.role.value.trim() === '') {

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
    if(this.state.userData.id === 0 ){
      this.props.removeRow(this.props.inedx);
    }
    this.setState({
      isEdit:!this.state.isEdit,
    })
  };

  clickAction = (action) => {
    this.setState({action})
    if(action==="Edit"){this.editToggle();}
    if(action==="Delete"){this.deleteUserManagementStaff();}
    if(action==="Resend-Invitation"){this.resendInvitationUserManagementStaff();}
  };
  addAction = () =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to send a payment link to  "+ bid.bidderEmail +" ? ",
      popupHeader:"Please Confirm" ,
      popupType:"Please-Confirm" ,
    })
  };
  invitationAction = () =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to Mark As Paid ",
      popupHeader:"Mark As Paid Confirmation" ,
      popupType:"MarkAsPaid-Confirmation" ,
    })
  };
  deleteAction = () =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to delete User ? ",
      popupHeader:"Delete Confirmation" ,
      popupType:"Delete-Confirmation" ,
    })
  };

  submiteAction = () => {
    if(this.state.action==="Edit"){
      let staff={ "email": this.email.value,
        "firstName": this.firstName.value,
        "lastName": this.lastName.value,
         "role": "whitelabeladmin"
      };
      if(this.state.userData.id) {
        this.updatedUserManagementStaff(staff);
      } else {
        this.addUserManagementStaff(staff);
      }
    }
  };
  addUserManagementStaff = (staff) =>{
    this.props.addUserManagementStaff(staff,this.props.params).then(resp=>{
      if (resp.errorMessage) {
        this.setState({
          // loading:false,
          // showPopup: true,
          // errorMsg: "Bidder has been notified.",
          // popupHeader:"Failed",
          // popupType:"Delete-Confirmation-Failed",
          isEdit:!this.state.isEdit,
        });
        this.props.actionResult("add","Failed","Something is Wrong");
      } else {
        this.setState({
          // loading:false,
          // showPopup: true,
          // errorMsg: resp.message ,
          // popupHeader:"Success",
          // popupType:"Delete-Confirmation-Success",
          isEdit:!this.state.isEdit,
        });
        this.props.actionResult("Add","Success",resp.message);
      }
    })
  };
  updatedUserManagementStaff = (staff) =>{
    this.props.updatedUserManagementStaff(this.state.userData.id,staff,this.props.params).then(resp=>{
      if (resp.errorMessage) {
        this.setState({
          // loading:false,
          // showPopup: true,
          // errorMsg: "Bidder has been notified.",
          // popupHeader:"Failed",
          // popupType:"Delete-Confirmation-Failed",
          isEdit:!this.state.isEdit,
        });
        this.props.actionResult("Update","Failed","Something is Wrong");
      } else {
        this.setState({
          // loading:false,
          // showPopup: true,
          // errorMsg: resp.message ,
          // popupHeader:"Success",
          // popupType:"Delete-Confirmation-Success",
          isEdit:!this.state.isEdit,
        });
        this.props.actionResult("Update","Success","White Label Admin Updated For Event");
      }
    })
  };
  resendInvitationUserManagementStaff = () =>{
    this.props.resendInvitationUserManagementStaff(this.state.userData.id,this.props.params).then(resp=>{
      if (resp.errorMessage) {
        this.props.actionResult("resendInvitation","Failed","Something is Wrong");
        this.setState({
          // loading:false,
          // showPopup: true,
          // errorMsg: "Bidder has been notified.",
          // popupHeader:"Failed",
          popupType:"Delete-Confirmation-Failed",
        });
      } else {
        this.props.actionResult("resendInvitation","Success", resp.message);
        this.setState({
          // loading:false,
          // showPopup: true,
          // errorMsg: resp.message ,
          // popupHeader:"Success",
          popupType:"Delete-Confirmation-Success",
        })
      }
    })
  };
  deleteUserManagementStaff = () =>{
    this.setState({loading:true});
    this.props.deleteUserManagementStaff(this.state.userData.id,this.props.params).then(resp=>{
      if (resp.errorMessage) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.errorMessage || "Something is Wrong",
          popupHeader:"Failed",
          popupType:"Delete-Confirmation-Failed",
        });
        this.props.actionResult("Delete","Failed",resp.errorMessage || "Something is Wrong");
      } else {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.message ,
          popupHeader:"Success",
          popupType:"Delete-Confirmation-Success",
        });
        this.props.actionResult("Delete","Success", resp.message || "User Deleted Successfully ");
      }
    })
  };
  showPopup = () => {
    this.setState({
      showPopup: true
    })
  };
  hidePopup = () => {
    this.setState({
      showPopup: false,
    })
  };
  render() {
    return (
      <tr className={cx(this.state.isEdit || this.props.userData.id===0 ? "edit" : "")}>
        <td>
          <input name="name" type="text" className="form-control first-name"
                 ref={ref => { this.firstName = ref; }} onKeyUp={this.firstNameValidateHandler}/>
          <span className="value" >{this.props.userData.firstName}</span>
        </td>
        <td>
          <input name="lastName" type="text" className="form-control last-name"
                 ref={ref => { this.lastName = ref; }} onKeyUp={this.lastNameValidateHandler} />
          <span className="value" >{this.props.userData.lastName}</span>
        </td>
        <td className="email">
          <input name="email" type="email" className="form-control email" defaultValue={this.state.emailValue} ref={ref => {
            this.email = ref;
          }} onKeyUp={this.emailValidateHandler} />
          <span className="value" >{this.props.userData.email}</span>
        </td>
        {/*<td>*/}
          {/*<select className="form-control permissions" name="permissions" defaultValue="admin" ref={ref => {*/}
            {/*this.role = ref;*/}
          {/*}} onChange={this.roleValidateHandler} >*/}
            {/*<option value="admin">Admin</option>*/}
            {/*<option value="volunteer">Volunteer</option>*/}
          {/*</select>*/}
          {/*<span className="value" >{this.props.userData.role}</span>*/}
        {/*</td>*/}
        <td className="text-center">
          <ul className="readonly-actions list-inline">
            <li>
              <a className="resend-email" onClick={()=> this.clickAction("Resend-Invitation")}>Resend Invitation</a>
            </li>
            <li>
              <a className="edit-item" onClick={()=>this.clickAction("Edit")}>Edit</a>
            </li>
            <li>
              <a className="delete-item" onClick={this.deleteAction}>Delete</a>
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
          <PopupModel
            id="mapPopup"
            showModal={this.state.showPopup}
            headerText= {<p>{this.state.popupHeader}</p>}
            modelBody='<div><h1>Location</h1></div>'
            onCloseFunc={this.hidePopup} >
            <div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>
              { this.state && this.state.errorMsg }
              <div className="modal-footer">
                {/*{this.state.popupType == "Invitation-Confirmation" ? <Button className="btn btn-success" loading={this.state.loading} onClick={this.resendInvitationUserManagementStaff} >Confirm</Button> : ""}*/}
                {/*{this.state.popupType == "Edit-Confirm" ? <Button className="btn btn-success" loading={this.state.loading} onClick={this.updatedUserManagementStaff} >Confirm</Button> : ""}*/}
                {this.state.popupType === "Delete-Confirmation" ? <Button className="btn btn-danger" loading={this.state.loading} onClick={this.deleteUserManagementStaff} >Confirm</Button> : ""}
                <button className="btn btn-primary" onClick={this.hidePopup}>Close</button>
              </div>
            </div>
          </PopupModel>
        </td>
      </tr>
    )
  };
}
const mapDispatchToProps = {
  updatedUserManagementStaff : (staffId,staff,whiteLabelURL) => updatedUserManagementStaff(staffId,staff,whiteLabelURL),
  deleteUserManagementStaff : (staffId,whiteLabelURL) => deleteUserManagementStaff(staffId,whiteLabelURL),
  resendInvitationUserManagementStaff : (staffId,whiteLabelURL) => resendInvitationUserManagementStaff(staffId,whiteLabelURL),
  addUserManagementStaff : (staffId,staff,whiteLabelURL) => addUserManagementStaff(staffId,staff,whiteLabelURL),
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(UserList));
