import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//import s from './AuctionPerformance.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {deletePledge,markAsPaidPledge,requestPaymentPledge} from './../../routes/admin/fund/performance/action';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import PopupModel from './../PopupModal/index';
import Button from 'react-bootstrap-button-loader';

class SubItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupHeader:null,
      showPopup: false,
      popupType: "",
      isError:false,
      loading:false,
      pledgeId:null,
    }
  }
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
  requestPaymentAction = (pledge) =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to send a payment link to  "+ pledge.email +" ? ",
      popupHeader:"Please Confirm" ,
      popupType:"Please-Confirm" ,
      pledgeId:pledge.pledgeId,
    })
  };
  markAsPaidAction = (pledge) =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to Mark As Paid ",
      popupHeader:"Mark As Paid Confirmation" ,
      popupType:"MarkAsPaid-Confirmation" ,
      pledgeId:pledge.pledgeId,
    })
  };
  deleteAction = (pledge) =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to delete pledge of $"+ pledge.pledgeAmount +" from "+ pledge.email +" ? ",
      popupHeader:"Delete Confirmation" ,
      popupType:"Delete-Confirmation" ,
      pledgeId:pledge.pledgeId,
    })
  };

  deletePledge = () =>{
    this.setState({loading:true});
    this.props.deletePledge(this.state.pledgeId).then(resp =>{
      console.log("resp",resp);
      if (resp.errorMessage) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.errorMessage ,
          popupHeader:"Failed",
          popupType:"Delete-Confirmation-Failed",
        });
      } else {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.message ,
          popupHeader:"Success",
          popupType:"Delete-Confirmation-Success",
        })
      }
    });
  };
  requestPayment = () =>{
    this.setState({loading:true});
    this.props.requestPaymentPledge(this.state.pledgeId).then(resp =>{
      console.log("resp",resp);
      if (resp.errorMessage) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: "Bidder has been notified.",
          popupHeader:"Failed",
          popupType:"Delete-Confirmation-Failed",
        });
      } else {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.message ,
          popupHeader:"Success",
          popupType:"Delete-Confirmation-Success",
        })
      }
    });
  };
  markAsPaid = () =>{
    this.setState({loading:true});
    this.props.markAsPaidPledge(this.state.pledgeId).then(resp =>{
      console.log("resp",resp);
      if (resp.errorMessage) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.errorMessage ,
          popupHeader:"Failed",
          popupType:"MarkAsPaid-Failed",
        });
      } else {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.message ,
          popupHeader:"Success",
          popupType:"MarkAsPaid-Success",
        })
      }
    });
  };
  render() {
    return (
			<div> {console.log("this.props.itemList - >",this.props.itemList)}
        { this.props.itemList ? this.props.itemList.length ?
					<table className="table item-data">
						<tbody>
            {this.props.itemList.map((item,index) =>
							<tr className="data-row" key={index}>
								<td><span className="email">{item.email}</span></td>
								<td><span className="phone">{item.phone}</span></td>
								<td><span className="name">{item.firstName}</span></td>
								<td><span className="name">{item.lastName}</span></td>
								<td><span className="amount">${item.pledgeAmount}</span></td>
                {!item.pledgePaid && 	<td> <a className="delete-bid" onClick={()=>this.requestPaymentAction(item)}>Notify</a></td> }
                {!item.pledgePaid && 	<td> <a className="delete-bid" onClick={()=>this.markAsPaidAction(item)}> Mark as Paid</a></td> }
                {!item.pledgePaid && 	<td> <span className="actions">
                  <ul className="mrg-b-xs readonly-actions list-inline">
                    <li>
                      <a className="delete-bid" onClick={()=>this.deleteAction(item)} >Delete</a>
                    </li>
                  </ul>
                </span>
								</td> }
							</tr> ) }
						</tbody>
					</table>
          : "Nobody has bid on this item." :<span className="sr-only"><i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"> </i>Loading...</span>
        }
				<PopupModel
					id="mapPopup"
					showModal={this.state.showPopup}
					headerText= {<p>{this.state.popupHeader}</p>}
					modelBody='<div><h1>Location</h1></div>'
					onCloseFunc={this.hidePopup} >
					<div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>
            { this.state && this.state.errorMsg }
						<div className="modal-footer">
              {this.state.popupType == "MarkAsPaid-Confirmation" ? <Button className="btn btn-success" loading={this.state.loading} onClick={this.markAsPaid} >Confirm</Button> : ""}
              {this.state.popupType == "Please-Confirm" ? <Button className="btn btn-success" loading={this.state.loading} onClick={this.requestPayment} >Confirm</Button> : ""}
              {this.state.popupType == "Delete-Confirmation" ? <Button className="btn btn-danger" loading={this.state.loading} onClick={this.deletePledge} >Confirm</Button> : ""}
							<button className="btn btn-primary" onClick={this.hidePopup}>Close</button>
						</div>
					</div>
				</PopupModel>
			</div>
    );
  }
}

const mapDispatchToProps = {
  deletePledge: (pledgeId) => deletePledge(pledgeId),
  markAsPaidPledge: (pledgeId) => markAsPaidPledge(pledgeId),
  requestPaymentPledge: (pledgeId) => requestPaymentPledge(pledgeId),
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SubItemList);
