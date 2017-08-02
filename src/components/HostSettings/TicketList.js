import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';
import cx from 'classnames';
import {connect} from 'react-redux';
import s from './../../routes/login/Login.css';
import Link from './../Link';
import {updateTicket, addTicket, deleteTicket} from './action/RestActions';
import {Modal, Popover, OverlayTrigger, Tooltip} from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import PopupModel from './../PopupModal/index';

class TicketList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      ticket:null,
      loading:false,
      showPopup: false,
      errorMsg:"" ,
      popupHeader:"",
      popupType:"",
      action:"",
      moduleType: 'raffle',
      numberOfTickets: null,
      price: null,
      numberOfTicketsFeedBack: false,
      priceFeedBack: false,
      numberOfTicketsValue: null,
      priceValue: null,
    };
	};
	componentWillMount() {
    this.setState({
      ticket:this.props.ticket,
      isEdit:false,
    });
    if(this.props.ticket.id === 0 ){
      this.setState({
        isEdit:true,
        action:"Edit",
      })
    }
	};
	componentWillReceiveProps() {
    this.setState({
      ticket:this.props.ticket,
      isEdit:false,
    });
    if(this.props.ticket.id === 0 ){
      this.setState({
        isEdit:true,
        action:"Edit",
      })
    }
	};
  componentDidMount() {
    this.setState({
      ticket:this.props.ticket,
      isEdit:false,
    });
    if(this.props.ticket.id === 0 ){
      this.setState({
        isEdit:true,
        action:"Edit",
      })
    }
  this.numberOfTickets.value=this.props.ticket.numberOfTickets;
  this.price.value=this.props.ticket.price;
  };

	numberOfTicketsValidater = (e) => {
		this.numberOfTickets.value = this.numberOfTickets.value && this.numberOfTickets.value.trim();
		this.setState({
			numberOfTicketsFeedBack: true,
			numberOfTicketsValue: this.numberOfTickets.value.trim()
		});
		if (this.numberOfTickets.value.trim() === '') {
			this.setState({
				numberOfTickets: false
			});
		} else {
			this.setState({
				numberOfTickets: true
			});
		}
	};
	priceValidator = (e) => {
		this.price.value = this.price.value && this.price.value.trim();
		this.setState({
			priceFeedBack: true,
			priceValue: this.price.value.trim(),
		});

		if (this.price.value.trim() === '') {

			this.setState({
				price: false
			});
		} else {
			this.setState({
				price: true
			});
		}
	};

	editToggle = ()=>{
    if(this.state.ticket.id === 0 ){
     this.props.removeRow(this.props.index);
    }
    this.setState({
      isEdit:!this.state.isEdit,
    })
  };

  clickAction = (action) => {
    this.setState({action});
    if(action==="Edit"){this.editToggle();}
    if(action==="Delete"){this.deleteTicket();}
  };
  addAction = () =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to send a payment link to  "+ bid.bidderEmail +" ? ",
      popupHeader:"Please Confirm" ,
      popupType:"Please-Confirm" ,
    })
  };
  deleteAction = () =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to delete Ticket Price ? ",
      popupHeader:"Delete Confirmation" ,
      popupType:"Delete-Confirmation" ,
    })
  };

  submiteAction = () => {
    if(this.state.action==="Edit"){
      let ticketDTO={"numberOfTickets": this.numberOfTickets.value,"price": this.price.value,"id":0, "complementary":false};
      console.log(this.state.ticket);
      if(this.state.ticket.id) {
        ticketDTO.id = this.state.ticket.id;
        this.updateTicket(ticketDTO);
      } else {
        this.addTicket(ticketDTO);
      }
    }
  };
  addTicket = (ticketDTO) =>{
	  this.props.addTicket(this.state.moduleType, ticketDTO).then(resp=>{
      if (resp.errorMessage) {
        this.setState({
          isEdit:!this.state.isEdit,
        });
        this.props.actionResult("add","Failed","Something is Wrong");
      } else {
        this.setState({
          isEdit:!this.state.isEdit,
        });
        this.props.actionResult("Add","Success",resp.message);
      }
    })
  };
  updateTicket = (ticketDTO) =>{
	  this.props.updateTicket(this.state.moduleType, ticketDTO).then(resp=>{
      if (resp.errorMessage) {
        this.setState({
          isEdit:!this.state.isEdit,
        });
        this.props.actionResult("Update","Failed","Something is Wrong");
      } else {
        this.setState({
          isEdit:!this.state.isEdit,
        });
        this.props.actionResult("Update","Success",resp.message);
      }
    })
  };

  deleteTicket = () =>{
    this.setState({loading:true});
	  this.props.deleteTicket(this.state.moduleType, this.state.ticket.id).then(resp=>{
      if (resp.errorMessage) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: "Ticket delete failed.",
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
        });
        this.props.actionResult("Delete","Success", "Ticket Deleted Successfully ");
      }
    })
  };
  showPopup = () => {
    this.setState({ showPopup: true })
  };
  hidePopup = () => {
    this.setState({ showPopup: false})
  };
render() {
	return (
    <tr className={cx(this.state.isEdit || this.props.ticket.id===0 ? "edit" : "")}>
      <td>
        <input name="numberOfTickets" type="text" className="form-control first-name"
               ref={ref => { this.numberOfTickets = ref; }} onKeyUp={this.numberOfTicketsValidater}/>
        <span className="value" >{this.props.ticket.numberOfTickets}</span>
      </td>
      <td>
        <input name="price" type="text" className="form-control"
               ref={ref => { this.price = ref; }} onKeyUp={this.priceValidator} />
        <span className="value" >{this.props.ticket.price}</span>
      </td>

      <td className="text-center">
      <ul className="readonly-actions list-inline">
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
          <div className="ticket-type-container">
            { this.state && this.state.errorMsg }
            <div className="modal-footer">
              {this.state.popupType === "Delete-Confirmation" ? <Button className="btn btn-danger" loading={this.state.loading} onClick={this.deleteTicket} >Confirm</Button> : ""}
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
  updateTicket : (moduleType, ticket) => updateTicket(moduleType, ticket),
  addTicket : (moduleType, ticket) => addTicket(moduleType, ticket),
  deleteTicket : (moduleType, id) => deleteTicket(moduleType, id),
};

const mapStateToProps = (state) => ({ });
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(TicketList));
