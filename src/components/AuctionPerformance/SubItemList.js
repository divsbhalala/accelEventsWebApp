import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//import s from './AuctionPerformance.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {getPerformanceAuctionItemByItemCode,deleteAuctionbid,markAsPaidBid,requestPaymentBid} from './../../routes/admin/auction/performance/action';
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
      bid:null,
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
    });
    if(this.state.popupHeader === "Success"){
    }
  };
  requestPaymentAction = (bid) =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to send a payment link to  "+ bid.bidderEmail +" ? ",
      popupHeader:"Please Confirm" ,
      popupType:"Please-Confirm" ,
      bid:bid.bidId,
    })
  };
  markAsPaidAction = (bid) =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to Mark As Paid ",
      popupHeader:"Mark As Paid Confirmation" ,
      popupType:"MarkAsPaid-Confirmation" ,
      bid:bid.bidId,
    })
  };
  deleteAction = (bid) =>{
    this.setState({
      showPopup: true,
      errorMsg: "Are you sure you want to delete Auction Bid of "+ this.props.currencySymbol + bid.bidAmount +" from "+ bid.bidderEmail +" ? ",
      popupHeader:"Delete Confirmation" ,
      popupType:"Delete-Confirmation" ,
      bid:bid.bidId,
    })
  };

  deleteAuctionbid = () =>{
    this.setState({loading:true});
	  this.props.deleteAuctionbid(this.state.bid).then(resp =>{
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
	  this.props.requestPaymentBid(this.state.bid).then(resp =>{
      if (resp.errorMessage) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsg: resp.errorMessage,
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
	  this.props.markAsPaidBid(this.state.bid).then(resp =>{
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
		<div>
      { this.props.itemList ? this.props.itemList.length ?
				<table className="table item-data">
					<tbody>
          {this.props.itemList.map((item,index) =>
						<tr className="data-row" key={index}>
							<td><span className="email">{item.bidderEmail}</span></td>
							<td><span className="phone">{item.bidderPhone}</span></td>
							<td><span className="name">{item.bidderFirstName}</span></td>
							<td><span className="name">{item.bidderLastName}</span></td>
							<td><span className="amount">{this.props.currencySymbol}{item.bidAmount}</span></td>

              {/* Condition for Request Payment */}
              { (
                  (
                    item.bidId === item.highestBid &&
                    item.eventEnded &&
                    !item.bidPaid &&
                    item.confirm
                  )
                  ||
								(
								  item.cardRequiredForBidConfirmartion &&
                  item.eventCardEnabled &&
                  item.eventEnded &&
                  !item.displayBuyItNowPrice &&
                  !item.bidPaid
                )
                  ||
								(
								  !item.cardRequiredForBidConfirmartion &&
                  !item.eventCardEnabled &&
                  item.eventEnded &&
                  !item.displayBuyItNowPrice &&
                  !item.bidPaid
                )||
								(
								  item.bidId === item.highestBid &&
                  item.eventCardEnabled &&
                  !item.displayBuyItNowPrice &&
                  !item.bidPaid
                )
              ) ?
              <td> <a className="delete-bid" onClick={()=>this.requestPaymentAction(item)}> Request Payment</a></td>
              : ""}


							{/* Condition for Request Confirmation */}
              { (
                item.cardRequiredForBidConfirmartion &&
                item.eventCardEnabled &&
                !item.bidderCardAvailble &&
                !item.eventEnded &&
                !item.displayBuyItNowPrice &&
                !item.bidPaid ) ?
              <td> <a className="delete-bid" onClick={()=>alert("Request Confirmation")}>Request Confirmation</a></td>
              : ""}


							{/* Condition for Request Name */}
							{ (
								( !item.cardRequiredForBidConfirmartion
                  && !item.eventCardEnabled &&
                  (!item.bidderFirstName || !item.bidderLastName) &&
                  !item.eventEnded &&
                  !item.displayBuyItNowPrice &&
                  !item.bidPaid )
                ||
								( !item.cardRequiredForBidConfirmartion &&
                  item.eventCardEnabled &&
								  (!item.bidderFirstName || !item.bidderLastName) &&
                  !item.eventEnded &&
                  !item.displayBuyItNowPrice &&
                  !item.bidPaid )
                ||
                ( !item.cardRequiredForBidConfirmartion &&
                  !item.eventCardEnabled &&
								  (!item.bidderFirstName || !item.bidderLastName) &&
                  item.displayBuyItNowPrice &&
                  !item.bidPaid )
							) ?
                <td> <a className="delete-bid" onClick={()=>alert("Request Name")}> Request Name</a></td>
								: ""}

							{/* Condition for Request Payment */}
							{ (item.bidId === item.highestBid &&
                  item.eventEnded &&
                  !item.bidPaid ) ?
                <td> <a className="delete-bid" onClick={()=>this.markAsPaidAction(item)}>Mark as Paid</a></td>
								: ""
							}
              {/*{!item.bidPaid && 	<td> <a className="delete-bid" onClick={()=>this.markAsPaidAction(item)}> Mark as Paid</a></td> }*/}
              {<td> <span className="actions">
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
        : "Nobody has bid on this item." :<span><i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"> </i>Loading...</span>
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
            {this.state.popupType === "MarkAsPaid-Confirmation" ? <Button className="btn btn-success" loading={this.state.loading} onClick={this.markAsPaid} >Confirm</Button> : ""}
            {this.state.popupType === "Please-Confirm" ? <Button className="btn btn-success" loading={this.state.loading} onClick={this.requestPayment} >Confirm</Button> : ""}
            {this.state.popupType === "Delete-Confirmation" ? <Button className="btn btn-danger" loading={this.state.loading} onClick={this.deleteAuctionbid} >Confirm</Button> : ""}
            <button className="btn btn-primary" onClick={this.hidePopup}>Close</button>
          </div>
        </div>
      </PopupModel>
		</div>
		);
	}
}

const mapDispatchToProps = {
  getPerformanceAuctionItemByItemCode: (ItemCode) => getPerformanceAuctionItemByItemCode(ItemCode),
  deleteAuctionbid: (bid) => deleteAuctionbid(bid),
  requestPaymentBid: (bid) => requestPaymentBid(bid),
  markAsPaidBid: (bid) => markAsPaidBid(bid),
};

const mapStateToProps = (state) => ({
	currencySymbol : (state.host && state.host.currencySymbol) || "$"
});
export default connect(mapStateToProps, mapDispatchToProps)(SubItemList);
