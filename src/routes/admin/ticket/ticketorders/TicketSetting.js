import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';
import s from './TicketSetting.css';
import {connect} from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import  {doGetOrderDetails} from './../action';
import OrderPenal from './../../../../components/OrderPanel';
class TicketSetting extends React.Component {
	static propTypes = {
		title: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			isModuleActive: true,
			isLoaded: false,
			auctionPageLoading: true,
			orderData: [],
			orderLimit: 10,
			orderOffset: 0,
		};
		this.getOrderDetails = this.getOrderDetails.bind();
	}

	getOrderDetails = () => {
		this.props.doGetOrderDetails(this.state.orderLimit, this.state.orderOffset).then(resp => {
			if (resp && resp.data) {
				if (resp.data && resp.data.orders.length < this.state.orderLimit) {
					this.setState({
						auctionPageLoading: false
					})
				}
				this.setState({
					orderData: _.uniq(this.state.orderData.concat(resp.data && resp.data.orders)),
					orderOffset: this.state.orderOffset + 1,
					isLoaded: true
				});
			}
			else {
				this.setState({
					auctionPageLoading: false
				})
			}
		}).catch(error => {
			let orderError = error && error.response && error.response.data;
			this.setState({
				auctionPageLoading: false,
				isModuleActive: false,
				isLoaded: true,
				developerMessage: "Please activate Event Ticketing to start selling tickets."
			});
		});
		setTimeout(() => {
			this.setState({
				totalAuction: []
			})
		}, 500);
	};

	componentWillMount() {
		this.getOrderDetails();
	}

// 6508666
	render() {
		return (
			<div id="content-wrapper" className="admin-content-wrapper">
				<style
					dangerouslySetInnerHTML={{__html: ".fa-ellipsis-v+.fa-ellipsis-v{margin-left:2px}.flex-col.dots-sign-column{max-width:12px}.flex-col.ticket-quantity-column{max-width:122px;text-align:center}.flex-col.ticket-price-column{max-width:130px;text-align:center}.flex-col.ticket-actions-column{max-width:100px}.data-wrap{margin-left:-5px;z-index:9;margin-right:-5px}.ticket-actions-column ul.list-inline{margin:0;display:inline-block;border-top:2px solid;border-left:2px solid;border-right:2px solid;border-top-left-radius:4px;border-top-right-radius:4px;border-color:#e7eaf0;background-color:#F8F8FA;padding:5px 5px 27px;z-index:10;position:absolute}.data{background-color:#f8f8f8;padding:10px 16px;border-top:2px solid;border-bottom:2px solid;border-color:#e7eaf0;z-index:1}.tiny{font-size:11px}span.blue{color:#04c}.table.tickets-table{border:2px solid #e7eaf0;padding:5px;border-radius:4px}.table.tickets-table .table-header{background-color:#eff2f5;margin:-5px -5px 5px;padding:5px}hr{margin-top:5px;border-width:2px}.fa-ellipsis-v{margin-top:12px;display:inline-block}.ticket-row .flex-row{padding-top:12px}.ticket-row .data-wrap{height:2px;overflow:hidden;transition:.3s all ease-in}.ticket-row ul.list-inline{cursor:pointer;border-width:0;background-color:transparent}.ticket-row.open .data-wrap{height:auto;overflow:hidden}.ticket-row.open ul.list-inline{border-width:2px;background-color:#f8f8f8}.info-fields-table{background-color:#f8f8f8;padding:5px;max-width:640px;margin:auto}.attendee-information-container{padding:0 40px}.attendee-information-container .form-group{padding-left:20px;position:relative}.form-control{border-width:1px}.all-orders{padding:0 30px}.all-orders .order-panel .order-panel-header{font-size:2em;color:#1abc9c;margin-bottom:5px}.all-orders .order-panel .order-panel-header .order-number{float:left}.all-orders .order-panel .order-panel-header .order-actions{float:right}.all-orders .order-panel .order-panel-header:after,.all-orders .order-panel .order-panel-header:before{content:\" \";display:table;clear:both}.order-ticket-details{margin-top:20px}.order-ticket-details thead{background:#777;color:#FFF}.order-ticket-details thead tr th{padding-top:15px;padding-bottom:15px}.ajax-msg-box{padding:10px;font-size:1.3em}.ajax-msg-box.text-success{background:#b7f2b8}.ajax-msg-box.text-danger{background:#f2b7b8}.form.create-event h5,.form.create-event label{font-weight:700;text-transform:uppercase}.order-panel-body .dropdown{min-width:200px;display:inline-block}.order-actions .dropdown .btn.dropdown-toggle,.order-panel-body .dropdown .btn.dropdown-toggle{background:#FFF;border:1px solid #BFBFBF;color:#000;border-radius:0}.discount-codes-table td:last-child{width:1px}.embed-event-code{border:1px solid #eee;padding:20px 30px;position:relative;word-wrap:break-word}.embed-event-code+button{position:absolute;top:0;right:0;margin:0;font-size:10px;width:50px;word-wrap:break-word;white-space:normal;background-color:#ececec;color:#000;border:0;border-radius:0;transition:.3s all ease-in}.embed-event-code+button:hover{background-color:#555;color:#FFF}"}}/>
				<div className="row">
					<div className="col-sm-12">
						<div className="row" style={{opacity: 1}}>
							<div className="col-lg-12">
								<div className="row">
									<div className="col-lg-12">
										<div id className="clearfix">
											<h1>
												Event Orders
											</h1>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12">
										{ !this.state.isModuleActive ? <div className="main-box no-header">
											<div className="all-orders">
												<div className="text-center" style={{marginTop: '30%'}}>
													<h1>Please activate Event Ticketing to start selling tickets.</h1>
													<a href="/AccelEventsWebApp/host/settings/account" role="button"
														 className="btn btn-warning btn-lg">
														Click Here to Get Started
													</a>
												</div>
											</div>
										</div> :
											<div>
												<div className="main-box no-header">
													{  this.state.orderData.length < 1 ? "You have not sold any tickets yet" :
														<InfiniteScroll
															style={{"overflow":"hidden"}}
															next={this.getOrderDetails}
															hasMore={this.state.auctionPageLoading}
															loader={<div className="text-center"><span
																className="fa fa-spinner fa-3x mrg-t-lg fa-pulse fa-fw"></span></div>}>
															<div className="all-orders">

																{
																	this.state.orderData.map((item, key) => <OrderPenal order={item} key={key}/>)
																}

															</div>
														</InfiniteScroll>}
												</div>

											</div>
										}
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


const mapDispatchToProps = {
	doGetOrderDetails: (limit, offset) => doGetOrderDetails(limit, offset),
	doGetHostSettings: (type) => doGetHostSettings(type),
	makePyment: (data) => makePyment(data),
	getCardToken: (stripeKey, cardNumber, expMonth, expYear, cvc) => getCardToken(stripeKey, cardNumber, expMonth, expYear, cvc),
};

const mapStateToProps = (state) => ({
	currencySymbol : (state.host && state.host.currencySymbol) || "$"
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(TicketSetting));
