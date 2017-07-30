import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import s from './Event.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import history from './../../history';
import Moment from 'react-moment';
import moment from 'moment';

import EventAside from './../../components/EventAside/EventAside';
import EventAuctionBox from './../../components/EventAuctionBox/EventAuctionBox';
import EventTabCommonBox from './../../components/EventTabCommonBox/EventTabCommonBox';
import EventDonation from './../../components/EventDonation/EventDonation';
import PopupModel from './../../components/PopupModal';

import {
	doGetEventData,
	doGetEventTicketSetting,
	doGetSettings,
	doGeItemByCode,
	doGetItemByLimit,
	doGetAuctionItemByLimit,
	doGetRaffleItemByLimit,
	doGetFundANeedItemByLimit,
	storeActiveTabData,
	doOrderTicket,
	isVolunteer,
} from './action/index';
let ar = [1, 2, 3, 4, 5, 6, 7, 8];
class Event extends React.Component {
	static propTypes = {
		title: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			tab: 'The Event',
			formError: '',
			showFormError: false,
			totalAuction: ar,
			showBookingTicketPopup: false,
			showMapPopup: false,
			settings: null,
			orderTicket: null,
			auctionPageCount: 0,
			auctionPageLimit: 8,
			auctionPageItems: [],
			auctionPageLoading: true,
			auctionPageCategory: '',
			auctionPagesearchString: '',
			rafflePageCount: 0,
			rafflePageLimit: 8,
			rafflePageItems: [],
			rafflePageLoading: true,
			rafflePageCategory: '',
			rafflePageSearchString: '',
			fundANeedPageCount: 0,
			fundANeedPageLimit: 8,
			fundANeedPageItems: [],
			fundANeedPageLoading: true,
			fundANeedPageCategory: '',
			fundANeedPageSearchString: '',
			totalTicketQty: 0,
			totalTickets: [],
			totalTicketPrice: 0,
			selectedCategory: '',
			lastScrollPos: 0,
			activeEventTickets: true,
			activeFund: true,
			activeAuction: true,
			activeRaffle: true,
			activeDonation: true,
			center: {lat: 59.95, lng: 30.33},
			zoom: 11
		};
		this.doGetLoadMoreAuctionItem = this.doGetLoadMoreAuctionItem.bind(this);
		this.showBookingPopup = this.showBookingPopup.bind(this);
		this.hideBookingPopup = this.hideBookingPopup.bind(this);
		this.showMapPopup = this.showMapPopup.bind(this);
		this.hideMapPopup = this.hideMapPopup.bind(this);
		this.setActiveTabState = this.setActiveTabState.bind(this);
		this.doGetAuctionItemByLimit = this.doGetAuctionItemByLimit.bind(this);
		this.doGetAuctionItemBySearch = this.doGetAuctionItemBySearch.bind(this);
		this.doGetRaffleItemByLimit = this.doGetRaffleItemByLimit.bind(this);
		this.doGetFundANeedItemByLimit = this.doGetFundANeedItemByLimit.bind(this);
		this.selectHandle = this.selectHandle.bind(this);
		this.setFilterCategory = this.setFilterCategory.bind(this);
		this.setSearchString = this.setSearchString.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.doOrderTicket = this.doOrderTicket.bind(this);
		this.hideFormError = this.hideFormError.bind(this);
		this.onEventEnd = this.onEventEnd.bind(this);

	}

	componentWillReceiveProps() {
		if (this.props.authenticated) {
			// this.props.isVolunteer(this.props.params && this.props.params.params);
		}
	}

	componentWillMount() {
		this.props.doGetEventData(this.props.params && this.props.params.params).then(resp=> {
			this.setState({
				activeEventTickets: this.props.eventData && this.props.eventData.ticketingEnabled,
				activeAuction: this.props.eventData && this.props.eventData.causeAuctionEnabled,
				activeRaffle: this.props.eventData && this.props.eventData.raffleEnabled,
				activeFund: true,
				activeDonation: this.props.eventData && this.props.eventData.donationEnabled,
			});
			if (this.state.activeEventTickets) {
				this.setState({
					tab: 'The Event'
				})
			} else if (this.state.activeAuction) {
				this.setState({
					tab: 'Auction'
				})
			} else if (this.state.activeRaffle) {
				this.setState({
					tab: 'Raffle'
				})
			} else if (this.state.activeFund) {
				this.setState({
					tab: 'Fund a Need'
				})
			} else {
				this.setState({
					tab: 'donation'
				})
			}
			this.setActiveTabState(this.state.tab);

			if(this.props && this.props.query && this.props.query.tab){
				this.setState({
					tab: this.props.query.tab
				},function changeAfter(){
					this.setActiveTabState(this.props.query.tab)
				})
			}
		});
		//this.props.doGetEventTicketSetting(this.props.params && this.props.params.params);
		this.props.doGetSettings(this.props.params && this.props.params.params, 'ticketing').then(resp => {
			this.setState({
				settings: resp && resp.data
			});
		}).catch(error => {
			history.push('/404');
		});
		this.props.isVolunteer(this.props.params && this.props.params.params);
		if(this.props && this.props.query && this.props.query.tab){
			this.setState({
				tab: this.props.query.tab
			},function changeAfter(){
				this.setActiveTabState(this.props.query.tab)
			})
		}
	}

	componentDidMount() {
		this.setState({
			isLoaded: true
		});
		window.addEventListener('scroll', this.handleScroll);
	}

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
		this.setState({isValidData: !!(this.email.value.trim())});
	};
	firstNameValidateHandler = (e) => {
		this.setState({
			firstNameFeedBack: true,
			firstNameValue: this.firstName.value.trim(),
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
	};
	cardHolderValidateHandler = (e) => {

		this.setState({
			cardHolderFeedBack: true
		});

		if (this.cardHolder.value.trim() == '') {

			this.setState({
				cardHolder: false,
				errorMsgcardHolder: "The card holder name is required and can't be empty",
			});
		} else if (!( this.cardHolder.value.trim().length >= 6 && this.cardHolder.value.trim().length <= 70 )) {
			this.setState({
				cardHolder: false,
				errorMsgcardHolder: "The card holder name must be more than 6 and less than 70 characters long ",
			});
		} else {
			this.setState({
				cardHolder: true
			});
		}


	};
	cardNumberValidateHandler = (e) => {
    this.cardNumber.value=this.cardNumber.value.substr(0,16);
		this.setState({
			cardNumberFeedBack: true
		});
		if (this.cardNumber.value.trim() == '') {
			this.setState({
				cardNumber: false,
				errorMsgcardNumber: "Enter Card Number ",
			});
		} else if (this.cardNumber.value.trim().length !== 15 && this.cardNumber.value.trim().length !== 16) {
			this.setState({
				cardNumber: false,
				errorMsgcardNumber: " Please enter a Valid Card Number ",
			});
		} else {
			this.setState({
				cardNumber: true
			});
		}
	};
	amountValidateHandler = (e) => {
		this.setState({
			amountFeedBack: true,
			amountValue: this.amount.value.trim()
		});
		let bid = 0;
		bid = this.state.itemData && this.state.itemData.currentBid + 20;

		if (this.amount.value.trim() == '') {
			this.setState({
				amount: false,
				errorMsgAmount: "Bid Amount can't be empty",
			});
		} else if (bid > this.amount.value.trim()) {
			this.setState({
				amount: false,
				errorMsgAmount: "This bid is below the minimum bid amount. Bids must be placed in $" + bid + " increments. " + "   Bids for this item must be placed in increments of at least $20",
			});
		} else {
			this.setState({
				amount: true
			});
		}
	};
	cvvValidateHandler = (e) => {
    this.cvv.value=this.cvv.value.substr(0,4);
		this.setState({
			cvvFeedBack: true
		});

		if (this.cvv.value.trim() == '') {

			this.setState({
				cvv: false,
				errorMsgcvv: "The CVV is required and can't be empty",
			});
		} else if (!( 3 <= this.cvv.value.trim().length && 4 >= this.cvv.value.trim().length )) {
			this.setState({
				cvv: false,
				errorMsgcvv: "The CVV must not be more than 4 and less than 3 characters long",
			});
		} else {
			this.setState({
				cvv: true
			});
		}

	};
	doGetLoadMoreAuctionItem = () => {
		this.doGetAuctionItemByLimit(this.props.params && this.props.params.params);
		setTimeout(() => {
			this.setState({
				totalAuction: ar
			})
		}, 500);

	};
	doGetLoadMoreRaffleItem = () => {
		this.doGetRaffleItemByLimit(this.props.params && this.props.params.params);
		setTimeout(() => {
			this.setState({
				totalAuction: ar
			})
		}, 500);

	};
	doGetLoadMoreFundANeedItem = () => {
		this.doGetFundANeedItemByLimit(this.props.params && this.props.params.params);
		setTimeout(() => {
			this.setState({
				totalAuction: ar
			})
		}, 500);

	};
	showBookingPopup = (e) => {
		e.preventDefault();
		this.setState({
			showBookingTicketPopup: true
		})
	};
	hideBookingPopup = () => {
		this.setState({
			showBookingTicketPopup: false
		})
	};
	showMapPopup = (e) => {
		e.preventDefault();
		this.setState({
			showMapPopup: true
		})
	};
	hideMapPopup = () => {
		this.setState({
			showMapPopup: false
		})
	};
	hideFormError = () => {
		this.setState({
			showFormError: false
		})
	};
	setActiveTabState = (label) => {
		this.props.storeActiveTabData({tab: label, lastScrollPos: this.state.lastScrollPos});

		if (label && (label == 'Auction' || label == 'Raffle' || label == 'Fund a Need' || label == 'The Event' || label == 'Donate' )) {
			if (label == 'Auction') {
				label = 'auction';
				this.doGetAuctionItemByLimit(this.props.params && this.props.params.params);

			} else if (label == 'Raffle') {
				label = 'raffle';
				this.doGetRaffleItemByLimit(this.props.params && this.props.params.params);

			} else if (label == 'Fund a Need') {
				label = 'fundaneed';
				this.doGetFundANeedItemByLimit(this.props.params && this.props.params.params);

			} else if (label == 'The Event') {
				label = 'ticketing';
			} else if (label == 'Donate') {
				label = 'donation';
			}
			this.setState({tab: label});
			setTimeout(()=>{
				this.onEventEnd();
			},10);
		}
	};

	doGetAuctionItemByLimit(eventUrl) {
		this.props.doGetAuctionItemByLimit(eventUrl, this.state.auctionPageCount, this.state.auctionPageLimit, this.state.auctionPageCategory, this.state.auctionPageSearchString).then(resp => {
			if (resp && resp.data && resp.data.items) {
				if (resp.data && resp.data.items.length < this.state.auctionPageLimit) {
					this.setState({
						auctionPageLoading: false
					})
				}
				this.setState({
					auctionPageItems:this.state.auctionPageItems.concat(resp.data && resp.data.items) ,
					auctionPageCount: this.state.auctionPageCount + 1
				},function changeAfter(){
          let seenNames = {};
					let	array = this.state.auctionPageItems.filter(function(currentObject) {
						if (currentObject.id in seenNames) {
							return false;
						} else {
							seenNames[currentObject.id] = true;
							return true;
						}
					});
					this.setState({auctionPageItems:array,})
					}
				)}
			else {
				this.setState({
					auctionPageLoading: false
				})
			}
		}).catch(error => {
			this.setState({
				auctionPageLoading: false
			})
		})
	}

	doGetAuctionItemBySearch(eventUrl) {
		this.props.doGetAuctionItemByLimit(eventUrl, 0, this.state.auctionPageLimit, this.state.auctionPageCategory, this.state.auctionPageSearchString).then(resp => {
			if (resp && resp.data && resp.data.items && resp.data.items) {
				if (resp.data && resp.data.items.length < this.state.auctionPageLimit) {
					this.setState({
						auctionPageLoading: false
					})
				}
				this.setState({
					auctionPageItems: resp.data && resp.data.items,
				})
			}
			else {
				this.setState({
					auctionPageLoading: false
				})
			}
		}).catch(error => {
			this.setState({
				auctionPageLoading: false
			})
		})
	}

	doGetRaffleItemByLimit(eventUrl) {
		this.props.doGetRaffleItemByLimit(eventUrl, 0, this.state.rafflePageLimit, this.state.rafflePageCategory).then(resp => {
			if (resp && resp.data && resp.data.items) {
				if (resp.data && resp.data.items.length < this.state.rafflePageLimit) {
					this.setState({
						rafflePageLoading: false
					})
				}
				this.setState({
					rafflePageItems: this.state.rafflePageItems.concat(resp.data.items),
					rafflePageCount: this.state.rafflePageCount + 1
				},function changeAfter(){
          let seenNames = {};
          let	array = this.state.rafflePageItems.filter(function(currentObject) {
            if (currentObject.id in seenNames) {
              return false;
            } else {
              seenNames[currentObject.id] = true;
              return true;
            }
          });
          this.setState({rafflePageItems:array,})
        })
			}
			else {
				this.setState({
					rafflePageLoading: false
				})
			}
		}).catch(error => {
			this.setState({
				rafflePageLoading: false
			})
		})
	}

	doGetRaffleItemBySearch(eventUrl) {
		this.props.doGetRaffleItemByLimit(eventUrl, 0, this.state.rafflePageLimit, this.state.rafflePageCategory, this.state.rafflePageSearchString).then(resp => {
			if (resp && resp.data && resp.data.items) {
				if (resp.data && resp.data.items.length < this.state.rafflePageLimit) {
					this.setState({
						rafflePageLoading: false
					})
				}
				this.setState({
					rafflePageItems: resp.data.items,
				},function changeAfter(){
		          let seenNames = {};
		          let array = this.state.rafflePageItems.filter(function(currentObject) {
		            if (currentObject.id in seenNames) {
		              return false;
		            } else {
		              seenNames[currentObject.id] = true;
		              return true;
		            }
		          });
		          this.setState({rafflePageItems:array})
		        })
			}
			else {
				this.setState({
					rafflePageLoading: false
				})
			}
		}).catch(error => {
			this.setState({
				rafflePageLoading: false
			})
		})
	}

	doGetFundANeedItemByLimit(eventUrl) {
		this.props.doGetFundANeedItemByLimit(eventUrl, 0, this.state.fundANeedPageLimit, this.state.fundANeedPageCategory).then(resp => {
			if (resp && resp.data && resp.data.items) {
				if (resp.data && resp.data.items.length < this.state.fundANeedPageLimit) {
					this.setState({
						fundANeedPageLoading: false
					})
				}
				this.setState({
					fundANeedPageItems: this.state.fundANeedPageItems.concat(resp.data.items),
					fundANeedPageCount: this.state.fundANeedPageCount + 1
				},function changeAfter(){
          let seenNames = {};
          let	array = this.state.fundANeedPageItems.filter(function(currentObject) {
            if (currentObject.id in seenNames) {
              return false;
            } else {
              seenNames[currentObject.id] = true;
              return true;
            }
          });
          this.setState({fundANeedPageItems:array,})
        })
			}
			else {
				this.setState({
					fundANeedPageLoading: false
				})
			}
		}).catch(error => {
			this.setState({
				fundANeedPageLoading: false
			})
		})
	}

	doGetFundANeedItemBySearch(eventUrl) {
		this.props.doGetFundANeedItemByLimit(eventUrl, 0, this.state.fundANeedPageLimit, this.state.fundANeedPageCategory, this.state.fundANeedPageSearchString).then(resp => {
			if (resp && resp.data && resp.data.items) {
				if (resp.data && resp.data.items.length < this.state.fundANeedPageLimit) {
					this.setState({
						fundANeedPageLoading: false
					})
				}
				this.setState({
					fundANeedPageItems: resp.data.items,
				})
			}
			else {
				this.setState({
					fundANeedPageLoading: false
				})
			}
		}).catch(error => {
			this.setState({
				fundANeedPageLoading: false
			})
		})
	}
	selectHandle(e) {
		let totalTickets = this.state.totalTickets;
		totalTickets[e.target.name] = {
			price: e.target.dataset && e.target.dataset.price,
			numberofticket: e.target.value.trim(),
			tickettypeid: e.target.name
		};
		let totalPrice = 0;
		let totalNoTickets = 0;
		totalTickets.map(item => {
			totalPrice += item.price * item.numberofticket;
			totalNoTickets += (item.numberofticket ? parseInt(item.numberofticket) : 0);
		});
		this.setState({
			totalTickets: totalTickets,
			totalTicketQty: totalNoTickets,
			totalTicketPrice: totalPrice,
		});
	}
	setFilterCategory = (category)=> {
	  if (this.props.active_tab_data && this.props.active_tab_data.tab) {
			let label = this.props.active_tab_data && this.props.active_tab_data.tab;
			this.setState({
				selectedCategory: category
			})
			if (label == 'Auction') {
				this.setState({
					auctionPageCategory: category,
					auctionPageLoading: true,
					auctionPageCount: 0,
					auctionPageItems: [],
				});
				setTimeout(() => {
					this.doGetAuctionItemByLimit(this.props.params && this.props.params.params);
				}, 500);

			} else if (label == 'Raffle') {
				this.setState({
					rafflePageCategory: category,
					rafflePageLoading: true,
					rafflePageCount: 0,
					rafflePageItems: [],
				})
    		this.doGetRaffleItemByLimit(this.props.params && this.props.params.params);

			} else if (label == 'Fund a Need') {
				this.setState({
					fundANeedPageCategory: category,
					fundANeedPageCount: 0,
					fundANeedPageLoading: true,
					fundANeedPageItems: [],
				});
				this.doGetFundANeedItemByLimit(this.props.params && this.props.params.params);

			}
		}
	};
	setSearchString = (searchString)=> {
		if (this.props.active_tab_data && this.props.active_tab_data.tab) {
			let label = this.props.active_tab_data && this.props.active_tab_data.tab;
			this.setState({
				selectedSearchString: searchString
			});
			if (label == 'Auction') {
				this.setState({
					auctionPageSearchString: searchString,
				});
				setTimeout(() => {
					this.doGetAuctionItemBySearch(this.props.params && this.props.params.params);
				}, 500);

			} else if (label == 'Raffle') {
				this.setState({
					rafflePageSearchString: searchString,
				});
				setTimeout(() => {
					this.doGetRaffleItemBySearch(this.props.params && this.props.params.params);
				}, 500);
			} else if (label == 'Fund a Need') {
				this.setState({
					fundANeedPageSearchString: searchString,
				});
				setTimeout(() => {
					this.doGetFundANeedItemBySearch(this.props.params && this.props.params.params);
				}, 500);

			}
		}
	};
	handleScroll(event) {
		/*if(this.props.title && this.props.title=='Event Page'){
		 let body  = document.querySelector('body');
		 this.setState({
		 lastScrollPos:body.scrollTop,
		 });
		 console.log('this.props.active_tab_data && this.props.active_tab_data.tab',this.props.active_tab_data, this.props.active_tab_data && this.props.active_tab_data.tab)
		 this.props.storeActiveTabData({tab:this.props.active_tab_data && this.props.active_tab_data.tab,lastScrollPos:body.scrollTop});
		 }*/

	}
	doOrderTicket() {
		let Data = {};
		Data.clientDate = moment().format('DD/MM/YYYY hh:mm:ss');
		let ticketings = this.state.totalTickets;
		ticketings = ticketings.filter(function (n) {
			return n != null
		});
		ticketings = ticketings.map(function (obj) {
			return {"numberOfTicket": parseInt(obj.numberofticket), "ticketTypeId": parseInt(obj.tickettypeid)};
		});
		Data.ticketings = ticketings;
		this.setState({
			orderTicket: null
		});
		let eventUrl = this.props.params && this.props.params.params;
		this.props.doOrderTicket(eventUrl, Data)
			.then(resp => {
				if (resp && resp.data && resp.data.orderId) {
					history.push('/checkout/' + eventUrl + '/tickets/order/' + resp.data.orderId);
				}
				else {
					this.setState({
						formError: "Error while Ordering Tickets",
						showFormError: true,
						showBookingTicketPopup: false
					})
				}
			}).catch(error => {
			this.setState({
				orderTicket: "Error while Ordering Tickets",
				showFormError: true,
				showBookingTicketPopup: false,
				formError: (error && error.response && error.response.data && error.response.data.errors && error.response.data.errors[0] && error.response.data.errors[0].message) || "Error while Ordering Tickets"
			})
		})
	}
  successTask = ()=> {
    this.props.doGetSettings(this.props.params && this.props.params.params, 'raffle').then(resp => {
      this.setState({
        settings: resp && resp.data
      });
    }).catch(error => {
      history.push('/404');
    });
  };

	onEventEnd = ()=>{
		if(this.state.tab && this.props.params && this.props.params.params){
			this.props.doGetSettings(this.props.params && this.props.params.params, this.state.tab).then(resp => {
				this.setState({
					settings: resp && resp.data
				});
			})
				.catch(error => {
					console.log(error);
					// history.push('/404');
				});
		}
	};

	render() {
		let makeItem = function (i) {
			let item = [];
			for (let j = 0; j <= i; j++) {
				item.push(<option value={j} key={i + Math.random()}>{j}</option>)
			}
			return item;
		};
		return (
			<div className="event-wrap">
				{this.props.eventData && this.props.eventData.eventDesignDetail && this.props.eventData.eventDesignDetail.bannerImageEnabled &&
				<div className={cx("header-img", "text-center")}>
					<img
						src={ this.props.eventData && this.props.eventData.eventDesignDetail && this.props.eventData.eventDesignDetail.bannerImage ? "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/0-1900x300/" + this.props.eventData.eventDesignDetail.bannerImage : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/0-1900x300/d631f896-be71-4e95-9d29-9ce501f7a4b8_fall_formal_2015.png"}
						className={cx("img-responsive", "img-banner")} style={{width: "100%"}}/>
				</div>}
				<div id="content-wrapper" className="container">
					<div className="row">
						<div className={cx("col-lg-3", "col-md-4", "col-sm-4")}>
							<EventAside activeTab={(this.props.active_tab_data && this.props.active_tab_data.tab) || this.state.tab}
							            eventData={this.props.eventData}
							            settings={this.state.settings}
							            eventTicketData={this.props.eventTicketData}
							            showBookingPopup={this.showBookingPopup}
							            showMapPopup={this.showMapPopup} activeCategory={true}
							            authenticated={this.props.authenticated}
							            setFilterCategory={this.setFilterCategory}
							            selectedCategory={this.state.selectedCategory}
							            setSearchString={this.setSearchString}
													params={this.props.params}
													successTask={this.successTask}
													onEnd={this.onEventEnd}
							/>
						</div>
						<div className="col-lg-9 col-md-8 col-sm-8 ">
							{ this.state.tab && this.state.isLoaded && <div className="main-box">
								<Tabs onSelect={ (index, label) => {
                  this.setActiveTabState(label)
                } } selected={this.props.active_tab_data && this.props.active_tab_data.tab} className="tabs-wrapper">

									<Tab label="The Event" disabled={!this.state.activeEventTickets}>
										<div className={cx("row item-canvas")}>
											<div className={cx("mrg-t-lg mrg-b-lg pad-t-lg pad-r-lg pad-b-lg pad-l-lg event-description-display")}
                           dangerouslySetInnerHTML={ {__html:this.props.eventData && this.props.eventData.eventDesignDetail.descripation} }>
											</div>
										</div>
										<div className={cx("row text-center")}>
											<div className={cx("col-md-offset-3 col-md-6")}>
												<a onClick={this.showBookingPopup}
												   className={cx("btn btn-block btn-lg btn-orange ")}>&nbsp; &nbsp; &nbsp; &nbsp; Buy
													Tickets&nbsp; &nbsp; &nbsp; &nbsp; </a>
											</div>
										</div>
									</Tab>
									<Tab label="Auction" disabled={!this.state.activeAuction}>
										<div className="row" id="auction">
											{ !this.state.auctionPageItems.length && !this.state.auctionPageLoading &&
											<div className="no-items-container text-center">
												<span style={{fontSize: '2em'}}>No items were found</span><br /><br />
											</div>}

											<InfiniteScroll
												next={this.doGetLoadMoreAuctionItem}
												hasMore={this.state.auctionPageLoading}
												loader={<div className="text-center"><span
                          className="fa fa-spinner fa-3x mrg-t-lg fa-pulse fa-fw"></span></div>}>
												{
													this.state.auctionPageItems.map((item) =>
														<EventTabCommonBox key={item.id + Math.random().toString()}
														                   type="auction"
														                   headerText={item.name}
														                   itemCode={item.code}
														                   isSharable={this.state.settings && this.state.settings.socialSharingEnabled}
														                   data={
                                                 [
                                                   {
                                                     title: item.currentBid != 0 ? "CURRENT BID" : "Starting Bid",
                                                     value: item.currentBid != 0 ? '$' + item.currentBid : '$' + item.startingBid
                                                   }
                                                 ]
                                               }
														                   descText={item.excerpt}
														                   images={item.images}
														                   imageUrl={ item.images && item.images.length > 0 ? 'http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/' + item.images[0].imageUrl : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"}
														                   actionTitle={item.purchased ? null : (this.state.settings && moment(this.state.settings.endDate).diff(moment()) <= 0) ? "Bidding Closed" : "Bid"}
														                   actionClassName={ item.purchased || (this.state.settings && moment(this.state.settings.endDate).diff(moment()) <= 0) ? "btn btn-primary disabled" : "btn btn-success"}
														                   auctionPurchaseFor={ item.purchased}
														                   buyItNowPrice={ item.buyItNowPrice > 0 && (this.state.settings && moment(this.state.settings.endDate).diff(moment()) > 0) ? "Buy now $" + item.buyItNowPrice : null}
														                   auctionBuyNowTitle={ (item.purchased ? "Purchased for $" + item.currentBid : null)}
														                   auctionBuyNowClassName="item-link btn btn-success actionlinks"
														                   marketValue={item.marketValue > 0 ? '$' + item.marketValue : null}
														                   marketValueLabel={item.marketValue > 0 ? 'Market Value' : null}
														/>
													)
												}
											</InfiniteScroll>
										</div>
									</Tab>
									<Tab label="Raffle" disabled={!this.state.activeRaffle}>
										<div className="row" id="raffle">
											{ !this.state.rafflePageItems.length && !this.state.rafflePageLoading &&
											<div className="no-items-container text-center">
												<span style={{fontSize: '2em'}}>No items were found</span><br /><br />
											</div>}
											<InfiniteScroll
												next={this.doGetLoadMoreRaffleItem}
												hasMore={this.state.rafflePageLoading}
												loader={<div className="text-center"><span
                          className="fa fa-spinner fa-3x mrg-t-lg fa-pulse fa-fw"></span></div>}>
												{
													this.state.rafflePageItems.map((item) =>
														<EventTabCommonBox key={item.id + Math.random().toString()}
														                   type="raffle"
														                   headerText={item.name}
														                   itemCode={item.code}
														                   isSharable={this.state.settings && this.state.settings.socialSharingEnabled}
														                   data={
                                                 [
                                                   {
                                                     title: "TICKETS SUBMITTED",
                                                     value: item.ticketsSubmitted ? item.ticketsSubmitted : 0
                                                   }
                                                 ]
                                               }
														                   descText={item.excerpt}
														                   images={item.images}
														                   imageUrl={ item.images && item.images.length > 0 ? 'http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/' + item.images[0].imageUrl : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"}
														                   actionTitle={item.purchased ? null : (this.state.settings && moment(this.state.settings.endDate).diff(moment()) <= 0) ? "Raffle Closed" : "SUBMIT TICEKTS"}
														                   actionClassName={ item.purchased || (this.state.settings && moment(this.state.settings.endDate).diff(moment()) <= 0) ? "btn btn-primary disabled" : "btn btn-success"}
														/>
													)
												}
											</InfiniteScroll>
										</div>
									</Tab>
									<Tab label="Fund a Need" disabled={!this.state.activeFund}>
										<div className="row" id="causeauction">
											{ !this.state.fundANeedPageItems.length && !this.state.fundANeedPageLoading &&
											<div className="no-items-container text-center">
												<span style={{fontSize: '2em'}}>No items were found</span><br /><br />
											</div>}
											<InfiniteScroll
												next={this.doGetLoadMoreFundANeedItem}
												hasMore={this.state.fundANeedPageLoading}
												loader={<div className="text-center"><span
                          className="fa fa-spinner fa-3x mrg-t-lg fa-pulse fa-fw"></span></div>}>
												{
													this.state.fundANeedPageItems.map((item) =>
														<EventTabCommonBox key={item.id + Math.random().toString()}
														                   type="fund"
														                   headerText={item.name}
														                   itemCode={item.code}
														                   isSharable={this.state.settings && this.state.settings.socialSharingEnabled}
														                   data={
                                                 [
                                                   {
                                                     title: "MINIMUM PLEDGE",
                                                     value: item.pledgePrice ? item.pledgePrice : 0
                                                   }
                                                 ]
                                               }
														                   descText={item.excerpt}
														                   imageUrl={ item.images && item.images.length > 0 ? 'http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/' + item.images[0].imageUrl : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"}
														                   images={item.images}
														                   actionTitle={item.purchased ? null : (this.state.settings && moment(this.state.settings.endDate).diff(moment()) <= 0) ? "PLEDGing Closed" : "PLEDGE"}
														                   actionClassName={ item.purchased || (this.state.settings && moment(this.state.settings.endDate).diff(moment()) <= 0) ? "btn btn-primary disabled" : "btn btn-success"}

														/>
													)
												}
											</InfiniteScroll>
										</div>
									</Tab>
									<Tab label="Donate" disabled={!this.state.activeDonation}>
										<div className="row"><EventDonation eventUrl={this.props.params && this.props.params.params} donations={ this.state.settings && this.state.settings.donationAmounts} defaultSelectAmount={ this.state.settings && this.state.settings.defaultSelectAmount}/>
										</div>
									</Tab>
								</Tabs>
							</div>}

						</div>

					</div>
				</div>
				<PopupModel
					id="bookingPopup"
					showModal={this.state.showBookingTicketPopup}
					headerText={<p>Buy Tickets</p>}
					modelBody=''
					onCloseFunc={this.hideBookingPopup}
				>
					<form method="POST" id="buy-event-tickets">
						<div className="ticket-type-container">
							{
								this.state.settings && this.state.settings.tickeTypes && (this.state.settings.tickeTypes).map(item =>
									<div className="sale-card" key={item.typeId.toString()}>
										<div className="flex-row">
											<div className="flex-col">
												<div className="type-name"><strong style={{"fontWeight":700}}>{item.name} </strong>
													( <span className="type-cost txt-sm gray"> ${item.price} </span>)
													<div className="pull-right">
														{ item.remaniningTickets && item.remaniningTickets > 0 ?
															<select className="form-control all-select-values" name={item.typeId} data-price={item.price}
															        disabled={moment(item.endDate).diff(moment()) <= 0}
															        onChange={this.selectHandle}
															        value={this.state.totalTickets && this.state.totalTickets[item.typeId] && this.state.totalTickets[item.typeId].numberofticket ? this.state.totalTickets[item.typeId].numberofticket : 0}>
																{makeItem(item.remaniningTickets > 10 ? 10 : item.remaniningTickets).map(item => item)}
															</select>
															: ''}
														{
															!item.remaniningTickets && <span class="sold-out-text"> SOLD OUT </span>
														}
													</div>
												</div>
												<div
													className="sale-text txt-sm text-uppercase"> {moment(item.endDate).diff(moment()) > 0 ? "Available until " : "Sale Ended on "}
													<Moment format="MMMM D YYYY">{item.endDate}</Moment></div>
												{item.ticketsPerTable && item.ticketsPerTable > 0 ?
													<div className="sale-text txt-sm text-uppercase">Each table has {item.ticketsPerTable} tickets</div> : ''}
												{/*<div className="txt-sm gray type-desc">
												 sadfw
												 </div>*/}
											</div>
										</div>
									</div>
								)
							}
							{/*<div className="sale-card">
							 <div className="flex-row">
							 <div className="flex-col">
							 <div className="type-name">
							 <strong>First ticket type</strong>
							 (<span className="type-cost txt-sm gray"> $100.00 </span>)
							 <div className="pull-right">
							 <div className="col-md-7">No. Of Tickets</div>
							 <div className="col-md-5"> SOLD OUT </div>
							 </div>
							 </div>
							 <div className="sale-text txt-sm text-uppercase">Sale Ended on Apr 12, 2017</div>
							 </div>
							 </div>
							 </div>*/}
							<div className="status-bar clearfix mrg-t-lg">
								<div className="pull-left">
									<span> QTY:<span className="qty">{this.state.totalTicketQty}</span> </span>
                  <span
	                  className="total-price">{this.state.totalTicketPrice ? '$' + this.state.totalTicketPrice : 'FREE'}</span>
								</div>
								<div className="pull-right">
									<button type="button" className="btn btn-success" id="checkout-tickets" onClick={this.doOrderTicket}>
										checkout
									</button>
								</div>
							</div>
						</div>
					</form>
				</PopupModel>

				<PopupModel
					id="mapPopup"
					showModal={this.state.showMapPopup}
					headerText={<p>Event Location</p>}
					onCloseFunc={this.hideMapPopup}
				>
					<div><h1>Location</h1></div>
				</PopupModel>
				{ this.state.showFormError &&
				<PopupModel
					id="mapPopup"
					showModal={this.state.showFormError}
					headerText={<p>No Ticket Selected</p>}
					onCloseFunc={this.hideFormError}
					modelFooter={<button className="btn btn-green" data-dismiss="modal" onClick={()=>{this.hideFormError()}}>Close</button>}
				>
					<center>{ "At least one ticket is to be selected."}</center>
				</PopupModel> }
				<PopupModel
					id="mapPopup"
					showModal={false}
					headerText={<p>No Ticket Selected</p>}
					onCloseFunc={this.hideFormError}
					modelFooter={<button className="btn btn-green" data-dismiss="modal" onClick={()=>{this.hideFormError()}}>Close</button>}
				>
					<div className="relative min-h-300"><GMap initialCenter={initialCenter}/></div>
				</PopupModel>
			</div>
		);
	}
}
const AnyReactComponent = ({text}) => <div>{text}</div>;
const mapDispatchToProps = {
	doGetEventData: (eventUrl) => doGetEventData(eventUrl),
	doGetEventTicketSetting: (eventUrl) => doGetEventTicketSetting(eventUrl),
	doGeItemByCode: (eventUrl, itemCode, type) => doGeItemByCode(eventUrl, itemCode, type),
	doGetItemByLimit: (eventUrl, page, size, type) => doGetItemByLimit(eventUrl, page, size, type),
	doGetAuctionItemByLimit: (eventUrl, page, size, type, searchString) => doGetAuctionItemByLimit(eventUrl, page, size, type, searchString),
	doGetRaffleItemByLimit: (eventUrl, page, size, type, searchString) => doGetRaffleItemByLimit(eventUrl, page, size, type, searchString),
	doGetFundANeedItemByLimit: (eventUrl, page, size, type, searchString) => doGetFundANeedItemByLimit(eventUrl, page, size, type, searchString),
	doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
	storeActiveTabData: (tab) => storeActiveTabData(tab),
	doOrderTicket: (eventUrl, dto) => doOrderTicket(eventUrl, dto),
	isVolunteer: (eventUrl) => isVolunteer(eventUrl),
};
const mapStateToProps = (state) => ({
	eventData: state.event && state.event.data,
	eventTicketData: state.event && state.event.ticket_data,
	eventRaffleData: state.event && state.event.raffle_data,
	eventFundData: state.event && state.event.fund_data,
	eventDonationData: state.event && state.event.donation_data,
	user: state.session.user,
	authenticated: state.session.authenticated,
	active_tab_data: state.event && state.event.active_tab_data,
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Event));
//export default (withStyles(s)(Event));

let directionsDisplay = null;
let directionsService = null;
let map = null;
let marker = null;
let infowindow = null;

class GMap extends React.Component {
	state = {zoom: 10};

	static propTypes() {
		initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired
	}

	render() {
		return <div className="GMap">
			<div className='UpdatedText'>
				<p>Current Zoom: { this.state.zoom }</p>
			</div>
			<div className='GMap-canvas min-h-300' ref="mapCanvas">
			</div>
		</div>
	}

	componentDidMount() {
		// create the map, marker and infoWindow after the component has
		// been rendered because we need to manipulate the DOM for Google =(
		this.map = this.createMap();
		this.marker = this.createMarker();
		this.infoWindow = this.createInfoWindow();
		this.initMap();

		// have to define google maps event listeners here too
		// because we can't add listeners on the map until its created
		google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange());
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsService = new google.maps.DirectionsService();
		map = null;
		marker = null;
		infowindow = new google.maps.InfoWindow({
			size: new google.maps.Size(300, 50)
		});
	}

	// clean up event listeners when component unmounts
	componentDidUnMount() {
		google.maps.event.clearListeners(map, 'zoom_changed')
	}

	createMap() {
		let geocoder = new google.maps.Geocoder;
		geocoder.geocode({'address': '67-65 Main St, Flushing, NY 11367, USA'}, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				console.log("here", results)
			}
		})
		let mapOptions = {
			zoom: this.state.zoom,
			center: this.mapCenter()
		}
		return new google.maps.Map(this.refs.mapCanvas, mapOptions)
	}

	mapCenter() {
		return new google.maps.LatLng(
			this.props.initialCenter.lat,
			this.props.initialCenter.lng
		)
	}

	createMarker() {
		return new google.maps.Marker({
			position: this.mapCenter(),
			map: this.map
		})
	}

	createInfoWindow() {
		let html = '<div class="directions-container">' +
			'  <form action="javascript:getDirections()">' +
			'    <h4>Directions:</h4>' +
			'    <div class="form-group">' +
			'       <label>Start address:</label>' +
			'      <input class="form-control" type="text" name="saddr" id="saddr" value="">' +
			'    </div>' +
			'    <div class="form-group">' +
			'      <input class="btn btn-block btn-blue" value="Get Directions" type="button" onclick="getDirections()">' +
			'    </div>' +
			'    <div class="form-group">' +
			'      <input type="checkbox" name="walk" id="walk"> <label for="walk"> Walk</label>' +
			'      <input type="checkbox" name="highways" id="highways"> <label for="highways">Avoid Highways</label>' +
			'    </div>' +
			'  </form>' +
			'</div>';

		let contentString = html;
		return new google.maps.InfoWindow({
			map: this.map,
			anchor: this.marker,
			content: contentString
		})
	}

	handleZoomChange() {
		this.setState({
			zoom: this.map.getZoom()
		})
	}

	getDirections() {
		// ==== Set up the walk and avoid highways options ====
		let request = {};
		if (document.getElementById("walk").checked) {
			request.travelMode = google.maps.DirectionsTravelMode.WALKING;
		} else {
			request.travelMode = google.maps.DirectionsTravelMode.DRIVING;
		}

		if (document.getElementById("highways").checked) {
			request.avoidHighways = true;
		}
		// ==== set the start and end locations ====
		let saddr = document.getElementById("saddr").value.trim();
		let daddr = document.getElementById("daddr").value.trim();

		request.origin = saddr;
		request.destination = daddr;
		directionsService.route(request, function (response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			} else alert("Directions not found:" + status);
		});
	}

	myclick() {
		google.maps.event.trigger(markers, "click");
	}


	// functions that open the directions forms
	tohere() {
		infowindow.setContent(to_htmls);
		infowindow.open(map, markers);
	}

	fromhere() {
		infowindow.setContent(from_htmls);
		infowindow.open(map, markers);
	}

	initMap() {
		let geocoder = new google.maps.Geocoder;
		geocoder.geocode({'address': '67-65 Main St, Flushing, NY 11367, USA'}, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				let uluru = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
				map = new google.maps.Map(document.getElementById('location-map'), {
					zoom: 17,
					center: uluru
				});
				marker = new google.maps.Marker({
					position: uluru,
					map: map,
					animation: google.maps.Animation.DROP,
					title: 'Event Location'
				});
				directionsDisplay.setMap(map);
				directionsDisplay.setPanel(document.getElementById("directionsPanel"));
				google.maps.event.addListener(map, 'click', function () {
					infowindow.close();
				});

				let html = '<div class="directions-container">' +
					'  <form action="javascript:getDirections()">' +
					'    <h4>Directions:</h4>' +
					'    <div class="form-group">' +
					'       <label>Start address:</label>' +
					'      <input class="form-control" type="text" name="saddr" id="saddr" value="">' +
					'    </div>' +
					'    <div class="form-group">' +
					'      <input class="btn btn-block btn-blue" value="Get Directions" type="button" onclick={()=>{this.getDirections()}}>' +
					'    </div>' +
					'    <div class="form-group">' +
					'      <input type="checkbox" name="walk" id="walk"> <label for="walk"> Walk</label>' +
					'      <input type="checkbox" name="highways" id="highways"> <label for="highways">Avoid Highways</label>' +
					'    </div>' +
					'    <input type="hidden" id="daddr" value="' + uluru.lat + ',' + uluru.lng + '">' +
					'  </form>' +
					'</div>';
				let contentString = html;
				google.maps.event.addListener(marker, 'click', function () {
					map.setZoom(15);
					map.setCenter(marker.getPosition());
					infowindow.setContent(contentString);
					infowindow.open(map, marker);
				});
			}
		});
	}

}

let initialCenter = {lng: -90.1056957, lat: 29.9717272};
