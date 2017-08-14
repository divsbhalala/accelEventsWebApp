import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Volunteer.css';
import cx from 'classnames';
import { connect } from 'react-redux';
import history from './../../../history';
// import {Button} from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import PopupModel from './../../../components/PopupModal/index';
import ProgressIndicator from './../../../components/ProgressIndicator';
import Moment from 'react-moment';
import moment from 'moment';
import IntlTelInput from './../../../components/IntTelInput';
import { doValidateMobileNumber, doGetEventData } from './../action/index';
import { getCardToken } from './../../checkout/action/index';
import NumericInput from 'react-numeric-input';
import TicketCheckout from './../../../components/TicketCheckout';

import {
  getItemStatusByCode,
  getUserByEmail,
  getAuctionItemStatusByCode,
  getAttendees,
  setAttendees,
  submitBids,
  submitPledge,
  sellTickets,
  submitTickets,
  submitDonate,
	isVolunteer,
  doOrderTicket,
  doGetSettings,
  getUserByMobile,
} from './../action/index';

class Volunteer extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeViews: 'select-action',
      phoneEnable: true,
      emailEnable: true,
      isValidData: false,
      isloaded: false,
      error: null,
      isLogin: false,
      itemCode: null,
      itemStatusMsg: null,
      itemData: null,
      firstName: null,
      lastName: null,
      cardNumber: null,
      cardHolder: null,
      amount: null,
      cvv: null,
      month: null,
      year: null,
      expMonth: null,
      expYear: null,
      availTickets: null,
      raffleTicket: null,

      errorReg: null,

      firstNameValue: null,
      lastNameValue: null,
      cardNumberValue: null,
      cardHolderValue: null,
      amountValue: null,
      cvvValue: null,
      monthValue: null,
      yearValue: null,
      expMonthValue: null,
      expYearValue: null,
      emailValue: null,
      itemCodeValue: null,
      phoneNumberValue: null,
      raffleTicketValue: null,
      submittedTickets: null,

      itemCodeFeedBack: false,
      firstNameFeedBack: false,
      lastNameFeedBack: false,
      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
      amountFeedBack: false,
      cvvFeedBack: false,
      availTicketsFeedBack: false,
      itemStatusFeedBack: false,
      raffleTicketFeedBack: false,

      errorMsgfirstName: null,
      errorMsglastName: null,
      errorMsgcardNumber: null,
      errorMsgcardHolder: null,
      errorMsgamount: null,
      errorMsgNumber: null,
      errorMsgcvv: null,
      errorMsgEmail: null,
      errorMsgAvailTickets: null,
      errorMsgRaffleTicket: null,
      errorMsgItemCode: null,

      auctionItemCode: null,
      userData: null,
      attendees: null,
      itemBarcodeCode: null,
      attendeesFilter: null,
      showPopup: false,
      popupHeader: null,
      totalTickets: [],
      countryPhone: null,
      phone: null,
      loading: false,
      stripeToken: null,
      paymentType: 'CC',
      totalTicketQty : 0,
    };
    this.setActiveView = this.setActiveView.bind(this);
    this.getAttendeesList = this.getAttendeesList.bind(this);
    this.doOrderTicket = this.doOrderTicket.bind(this);
    this.selectHandle = this.selectHandle.bind(this);
  }
  componentDidMount() {
   		if (this.props.params && this.props.params.params) {
     this.props.isVolunteer(this.props.params && this.props.params.params).then((resp) => {
       this.setState({
         isloaded: true,
       });
     });
   }		else {

   }
  }
  validateField = () => {
	  this.setState({
    itemCodeFeedBack: true,
    emailFeedBack: true,
    firstNameFeedBack: true,
    lastNameFeedBack: true,
    cardNumberFeedBack: true,
    cardHolderFeedBack: true,
    amountFeedBack: true,
    cvvFeedBack: true,
    availTicketsFeedBack: true,
    itemStatusFeedBack: true,
    raffleTicketFeedBack: true,
    phoneNumberFeedBack: true,
    loading: false,
    stripeToken: null,
      //expMonthValue:this.expMonth.value,
     // expYearValue:this.expYear.value,
  });
  };
  setActiveView = (view) => {
    if (view === 'event-ticketing' && this.state.attendees == null) {
      this.getAttendeesList();
    }
    let modeltype = 'auction';
    if (view === 'select-action') {
      modeltype = 'auction';
    }
    if (view === 'sell-raffle-tickets') {
      modeltype = 'raffle';
    }
    if (view === 'submit-raffle-tickets') {
      modeltype = 'raffle';
    }
    if (view === 'submit-pledge') {
      modeltype = 'fundANeed';
    }
    this.setState({
      modelType: modeltype,
      phoneEnable: true,
      emailEnable: true,
      activeViews: view,
      isValidData: false,
      error: null,
      isLogin: false,
      itemCode: null,
      itemStatusMsg: null,
      itemData: null,

      email: null,
      firstName: null,
      lastName: null,
      cardNumber: null,
      cardHolder: null,
      amount: null,
      cvv: null,
      month: null,
      year: null,
      expMonth: null,
      expYear: null,
      availTickets: null,

      errorReg: null,

      firstNameValue: null,
      lastNameValue: null,
      cardNumberValue: null,
      cardHolderValue: null,
      amountValue: null,
      cvvValue: null,
      monthValue: null,
      yearValue: null,
      expMonthValue: null,
      expYearValue: null,
      emailValue: null,
      itemCodeValue: null,
      phoneNumberValue: null,
      raffleTicketValue: null,

      emailFeedBack: false,
      firstNameFeedBack: false,
      lastNameFeedBack: false,
      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
      amountFeedBack: false,
      cvvFeedBack: false,
      availTicketsFeedBack: false,
      itemStatusFeedBack: false,
      phoneNumberFeedBack: false,
      expMonthFeedBack: false,

      itemCodeFeedBack: false,
      errorMsgfirstName: null,
      errorMsglastName: null,
      errorMsgcardNumber: null,
      errorMsgcardHolder: null,
      errorMsgamount: null,
      errorMsgNumber: null,
      errorMsgcvv: null,
      errorMsgEmail: null,
      errorMsgAvailTickets: null,
      errorMsgCard: null,

      auctionItemCode: null,
      userData: null,
			// attendees:null,
      itemBarcodeCode: null,
      attendeesFilter: null,
      showPopup: false,
      popupHeader: null,
      countryPhone: null,
      phone: null,
      phoneNumber: false,
      errorMsgEmailCheck: null,
      loading: false,
      stripeToken: null,
      paymentType: 'CC',
    });
  };
  itemCodeValidateHandler = (e) => {
    this.setState({
      itemStatusFeedBack: true,
      itemCodeValue: this.itemCode.value.trim(),
    });
    if (this.itemCode.value.trim().length == 3) {
      this.props.getItemStatusByCode(this.props.params && this.props.params.params, this.itemCode.value.trim(), this.state.modelType)
				.then((resp) => {
  if (resp && resp.data) {
    this.setState({
      itemStatusMsg: resp.data,
    });
  }
}).catch((error) => {
  this.setState({
    itemStatusMsg: null,
  });
});
    }
  };
  setAttendeesHandler = (view, index) => {
    const status = view.status === 'Checked In' ? 'false' : 'true';
    const statusValue = view.status === 'Checked In' ? 'Booked' : 'Checked In';
    this.props.setAttendees(this.props.params && this.props.params.params, view.barcode, status)
			.then((resp) => {
  if (resp && resp.data) {
    const attendees = this.state.attendees;
    attendees.attendees[index].status = statusValue;
    this.setState({ attendees });
  }
}).catch((error) => {
  this.setState({
    itemStatusMsg: null,
  });
});
  };
  attendeesFilterHandler = (e) => {
    this.setState({
      attendeesFilter: this.attendeesFilter.value.trim(),
    });
  };
  getAuctionItem = (e) => {
    this.setState({
      itemCodeValue: this.itemCode.value.trim(),
      itemCode: false,
      itemCodeFeedBack: true,
    });
    if (this.itemCode.value && this.itemCode.value.trim() === '') {
      this.setState({
        itemCode: false,
        itemCodeMsgEmail: 'Item is required.',
      });
    }
   	if (this.itemCode.value && this.itemCode.value.trim().length === 3) {
     this.props.getItemStatusByCode(this.props.params && this.props.params.params, this.itemCode.value.trim(), this.state.modelType)
				.then((resp) => {
          if (resp && resp.data) {
            this.setState({
              itemData: resp.data,
              itemStatusMsg: null,
              itemCode: true,
            });
          }
        }).catch((error) => {
          this.setState({
            itemStatusMsg: 0,
            itemCode: false,
          });
        });
      }
  };
  getAttendeesList() {
    this.props.getAttendees(this.props.params && this.props.params.params)
			.then((resp) => {
  if (resp && resp.data) {
    this.setState({
      attendees: resp.data,
    });
  }
}).catch((error) => {
});
  }
  checkAuctionUser = (e) => {
    if (this.state.email) {
      let modeltype = 'auction';
      if (this.state.activeViews === 'select-action') {
        modeltype = 'auction';
      }
      if (this.state.activeViews === 'sell-raffle-tickets') {
        modeltype = 'raffle';
      }
      if (this.state.activeViews === 'submit-raffle-tickets') {
        modeltype = 'raffle';
      }
      this.props.getUserByEmail(this.props.params && this.props.params.params, this.email.value.trim(), modeltype)
				.then((resp) => {
  if (resp && !resp.errorMessage) {
    this.setState({
      userData: resp,
      errorMsgEmail: null,
      firstNameValue: resp.firstName,
      lastNameValue: resp.lastName,
      phone: resp.phonenumber,
      countryPhone: resp.countryCode,
      errorMsgEmailCheck: '',
    });
    if (resp.firstName) { this.setState({ firstName: true }); }
    if (resp.lastName) { this.setState({ lastName: true }); }
    if (resp.phonenumber) { this.setState({ phoneNumber: true }); }
  } else {
    this.setState({
      phoneEnable: true,
      firstName: false,
      firstNameFeedBack: false,
      lastName: false,
      lastNameFeedBack: false,
      phoneNumber: false,
      phoneNumberFeedBack: false,
      userData: null,
             // phone:null,
      errorMsgEmailCheck: 'User Does Not Exists. Account Will be created.',
    });
  }
}).catch((error) => {
  this.setState({
    userData: null,
    errorMsgEmailCheck: 'User Does Not Exists. Account Will be created.',
  });
});
    }
  };
  checkMobileUser = (e) => {
    if (this.state.phone) {
      this.props.getUserByMobile(this.props.params && this.props.params.params, this.state.phone.trim(), this.state.countryPhone, this.state.modelType)
				.then((resp) => {
         	if (resp && !resp.errorMessage) {
           this.setState({
             userData: resp,
             firstNameValue: resp.firstName,
             lastNameValue: resp.lastName,
             phoneNumber: true,
             phone: resp.phonenumber,
             countryPhone: resp.countryCode,
             errorMsgEmailCheck: '',
             email: true,
           });
           this.email.value = resp.email;
           if (resp.firstName) { this.setState({ firstName: true }); }
           if (resp.lastName) { this.setState({ lastName: true }); }
           if (resp.phonenumber) { this.setState({ phoneNumber: true }); }
         } else {
           this.email.value = '';
           this.setState({
             firstName: false,
             firstNameFeedBack: false,
             lastName: false,
             lastNameFeedBack: false,
              // phoneNumber: false,
              // phoneNumberFeedBack: false,
             userData: null,
              // phone:null,
             errorMsgEmailCheck: 'User Does Not Exists. Account Will be created.',
           });
         }
}).catch((error) => {
  this.setState({
    userData: null,
    errorMsgEmailCheck: 'User Does Not Exists. Account Will be created.',
  });
});
    }
  };
  emailValidateHandler = (e) => {
    this.setState({
      emailFeedBack: true,
      emailValue: this.email.value.trim(),
    });
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.email.value && this.email.value.trim() === '') {
      this.setState({
        phoneEnable: true,
        email: false,
        errorMsgEmail: 'Bidder email can\'t be empty.',
      });
    }		else {
      this.setState({
        phoneEnable: false,
        email: re.test(this.email.value.trim()),
        errorMsgEmail: 'Invalid Email.',
      });
    }
    this.setState({ isValidData: !!(this.email.value.trim()) });
  };
  firstNameValidateHandler = (e) => {
    this.setState({
      firstNameFeedBack: true,
      firstNameValue: this.firstName.value.trim(),
    });
    if (this.firstName.value && this.firstName.value.trim() === '') {
      this.setState({
        firstName: false,
      });
    } else {
      this.setState({
        firstName: true,
      });
    }
  };
  lastNameValidateHandler = (e) => {
    this.setState({
      lastNameFeedBack: true,
      lastNameValue: this.lastName.value.trim(),
    });
    if (this.lastName.value && this.lastName.value.trim() === '') {
      this.setState({
        lastName: false,
      });
    } else {
      this.setState({
        lastName: true,
      });
    }
  };
  phoneNumberValidateHandler(name, isValid, value, countryData, number, ext) {
  	let isnum = /^\d+$/.test(value);
  	if(!isnum && value) return false;
    this.setState({
      phone: value,
      countryPhone: countryData.iso2,
      phoneNumberFeedBack: true,
      errorMsgPhoneNumber: '',
    });
    if (value === '') {
      this.setState({
        emailEnable: true,
        phoneNumber: false,
        errorMsgPhoneNumber: 'phoneNumber is Require',
      });
    } else {
      this.props.doValidateMobileNumber(number).then((resp) => {
        this.setState({
          phoneNumber: !resp,
          errorMsgPhoneNumber: 'Invalid phone number',
        });
      });
      this.setState({
        emailEnable: false,
      });
    }
    this.setState({
      phone: value,
    });
  }
  cardHolderValidateHandler = (e) => {
    this.setState({
      cardHolderFeedBack: true,
    });

		if (this.cardHolder.value && this.cardHolder.value.trim() === '') {

			this.setState({
				cardHolder: false,
				errorMsgcardHolder: "The card holder name is required and can't be empty",
			});
		} else if (!( this.cardHolder.value && this.cardHolder.value.trim().length >= 6 && this.cardHolder.value.trim().length <= 70 )) {
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
		if (this.cardNumber.value && this.cardNumber.value.trim() === '') {
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
	availTicketsValidateHandler = (value) => {
		let tickets = 0;
		tickets = this.state.userData && this.state.userData.availableTickets;
		this.setState({
			availTicketsFeedBack: true,
			submittedTickets: value
		});
		if (value === '' || value === null) {
			this.setState({
				availTickets: false,
				errorMsgAvailTickets: "",
			});
		}
		else if(this.state.userData){
       if (tickets === null ) {
         this.setState({
           availTickets: false,
           errorMsgAvailTickets: "Please enter Bidder email to submit tickets. ",
         });
       } else if(tickets === 0){
         this.setState({
           availTickets: false,
           errorMsgAvailTickets: "This user does not have any raffle tickets. Please purchase tickets.",
         });
       } else if (value > tickets) {
         this.setState({
           availTickets: false,
           errorMsgAvailTickets: " Please enter ticket less than or equal to " + tickets,
         });

       } else {
         this.setState({
           availTickets: true,
           errorMsgAvailTickets: "",
         });
       }
     }else {
       this.setState({
         availTickets: true,
         errorMsgAvailTickets: "",
       });
     }

	};
  submitPledgeAmountValidateHandler = (value) => {
    this.setState({
      amountFeedBack: true,
      amountValue: value
    });
    let bid = 0;
    bid = this.state.itemData && this.state.itemData.minPrice;

    if (value === '' || value === null) {
      this.setState({
        amount: false,
        errorMsgAmount: "",
      });
    } else if (bid > value) {
      this.setState({
        amount: false,
        errorMsgAmount: "Submitted pledge amount should be greater than or equal to the stated pledge amount.",
      });
    } else {
      this.setState({
        amount: true,
      });
    }
	};
	amountValidateHandler = (value) => {
    this.setState({
			amountFeedBack: true,
			amountValue: value
		});
		let bid = 0;
		bid = this.state.itemData && this.state.itemData.currentBid + 20;

    if (value === '' || value === null) {
      this.setState({
        amount: false,
        //errorMsgAmount: "Bid Amount can't be empty",
      });
    } else if (bid > value) {
      this.setState({
        amount: false,
        errorMsgAmount: `This bid is below the minimum bid amount. Bids must be placed in  ` + this.props.currencySymbol +` ` + bid + ` increments. ` + '   Bids for this item must be placed in increments of at least '+this.props.currencySymbol+'20',
      });
    } else {
      this.setState({
        amount: true,
      });
    }
  };
  cvvValidateHandler = (e) => {
    this.cvv.value = this.cvv.value.substr(0, 4);
    this.setState({
      cvvFeedBack: true,
    });

    if (this.cvv.value && this.cvv.value.trim() === '') {
      this.setState({
        cvv: false,
        errorMsgcvv: "The CVV is required and can't be empty",
      });
    } else if (!(this.cvv.value.trim().length >= 3 && this.cvv.value.trim().length <= 4)) {
      this.setState({
        cvv: false,
        errorMsgcvv: 'The CVV must be more than 4 and less than 3 characters long',
      });
    } else {
      this.setState({
        cvv: true,
      });
    }
  };
  raffleTicketValidateHandler = (e) => {
    this.setState({
      raffleTicketFeedBack: true,
      raffleTicketValue: this.raffleTicket.value && this.raffleTicket.value.trim(),
    });
    if (this.raffleTicket.value && this.raffleTicket.value.trim() === '') {
      this.setState({
        raffleTicket: false,
        errorMsgRaffleTicket: "Raffle Ticket required and can't be empty",
      });
    } else {
      this.setState({
        raffleTicket: true,
      });
    }
  };
  expMonthValidateHandler = (e) => {
    this.setState({
      expMonthFeedBack: true,
      expMonthValue: this.expMonth.value && this.expMonth.value.trim(),
    });
    if (this.expMonth.value && this.expMonth.value.trim() === '') {
      this.setState({
        expMonth: false,
        errorMsgExpMonth: 'Expire Month is Require',
      });
    } else {
      this.setState({
        expMonth: true,
      });
    }
    // this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});
  };
  expYearValidateHandler = (e) => {
    this.setState({
      expYearFeedBack: true,
      expYearValue: this.expYear.value && this.expYear.value.trim(),
    });
    if (this.expYear.value && this.expYear.value.trim() === '') {
      this.setState({
        expYear: false,
        errorMsgexpYear: 'Expire Year is Require',
      });
    } else {
      this.setState({
        expYear: true,
      });
    }
    // this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});
  };
  componentWillMount() {
    this.changePhone = this.phoneNumberValidateHandler.bind(this, 'phone');
    this.props.doGetEventData(this.props.params && this.props.params.params);
    this.props.doGetSettings(this.props.params && this.props.params.params, 'ticketing').then((resp) => {
      this.setState({
        settings: resp && resp.data,
      });
    }).catch((error) => {
      history.push('/404');
    });
  }
  showPopup = () => {
    this.setState({
      showPopup: true,
    });
  };
  hidePopup = () => {
    this.setState({
      showPopup: false,
    });
    if (this.state.popupHeader === 'Success') {
      this.setActiveView('select-action');
    }
  };
  submiteSilentAuctionBid = (e) => {
    e.preventDefault();
    this.validateField();
    this.setState({ loading: true });

    if (this.state.itemCode && this.props.eventData && this.props.eventData.ccRequiredForBidConfirm && this.state.cardNumber && this.state.cardHolder && this.state.amount && this.state.cvv) {
      this.props.getCardToken(this.props.stripeKey, this.cardNumber.value.trim(), this.expMonth.value.trim(), this.expYear.value.trim(), this.cvv.value.trim()).then((response) => {
        if (response.error) {
          this.setState({
            loading: false,
            showPopup: true,
            errorMsgCard: response.error.message });
        } else {
          const user = {
            email: this.state.emailValue,
            countryCode: this.state.countryPhone,
            cellNumber: this.state.phone,
            firstname: this.state.firstNameValue,
            lastname: this.state.lastNameValue,
            paymenttype: 'CC',
            itemCode: this.state.itemCodeValue,
            amount: this.state.amountValue,
            stripeToken: response.id,
          };
          this.submitBids(user);
        }
      });
    } else if (this.state.itemCode && this.state.amount && this.state.itemCode && this.state.itemCodeValue) {
      const user = {
        email: this.state.emailValue,
        countryCode: this.state.countryPhone,
        cellNumber: this.state.phone,
        firstname: this.state.firstNameValue,
        lastname: this.state.lastNameValue,
        paymenttype: 'CC',
        itemCode: this.state.itemCodeValue,
        amount: this.state.amountValue,
      };
      this.submitBids(user);
    } else {
      this.setState({ loading: false });
    }
  };
  submitBids = (user) => {
    this.props.submitBids(this.props.params && this.props.params.params, user)
      .then((resp) => {
        if (resp && resp.message) {
          this.setState({
            loading: false,
            itemStatusMsg: resp.message,
            errorMsgCard: resp.message,
            showPopup: true,
            popupHeader: 'Success',
          });
        } else {
          this.setState({
            loading: false,
            showPopup: true,
            errorMsgCard: resp.errorMessage,
            popupHeader: 'Failed',
          });
        }
      });
  };
  submitPledgeBid = (e) => {
    e.preventDefault();
    this.validateField();
    this.setState({ loading: true });
    if (this.state.paymentType === 'CC') {
      if (this.state.itemCode && this.state.email && this.state.phoneNumber && this.state.lastName && this.state.firstName && this.state.amount && this.state.cardNumber && this.state.cardHolder && this.state.cvv) {
        const card = {
          number: this.cardNumber.value.trim(),
          cvc: this.cvv.value.trim(),
          exp_month: this.expMonth.value.trim(),
          exp_year: this.expYear.value.trim(),
        };
        this.props.getCardToken(this.props.stripeKey, this.cardNumber.value.trim(), this.expMonth.value.trim(), this.expYear.value.trim(), this.cvv.value.trim()).then((response) => {
          if (response.error) {
            this.setState({
              loading: false,
              showPopup: true,
              errorMsgCard: response.error.message });
          } else {
            const user = {
              amount: this.state.amountValue,
              cellNumber: this.state.phone,
              countryCode: this.state.countryPhone,
              email: this.state.emailValue,
              firstname: this.state.firstNameValue,
              lastname: this.state.lastNameValue,
              paymenttype: this.state.paymentType,
              itemCode: this.state.itemCodeValue,
              stripeToken: response.id,
            };
            this.submitPledge(user);
          }
        });
      } else { this.setState({ loading: false }); }
    } else if (this.state.itemCode && this.state.email && this.state.phoneNumber && this.state.lastName && this.state.firstName) {
      const user = {
        amount: this.state.amountValue,
        cellNumber: this.state.phone,
        countryCode: this.state.countryPhone,
        email: this.state.emailValue,
        firstname: this.state.firstNameValue,
        lastname: this.state.lastNameValue,
        paymenttype: this.state.paymentType,
        itemCode: this.state.itemCodeValue,
        stripeToken: this.state.stripeToken };
      this.submitPledge(user);
    } else {
      this.setState({
        loading: false,
      });
    }
  };
  submitPledge = (user) => {
    this.props.submitPledge(this.props.params && this.props.params.params, user)
      .then((resp) => {
        if (resp && resp.data) {
          this.setState({
            loading: false,
            showPopup: true,
            errorMsgCard: 'Pledge Submit Successfully',
            popupHeader: 'Success' });
        } else {
          this.setState({
            loading: false,
            showPopup: true,
            errorMsgCard: resp.errorMessage,
            popupHeader: 'Failed',
          });
        }
      });
  };
  sellTicketsBid = (e) => {
    e.preventDefault();
    this.validateField();
    this.setState({ loading: true });
    if (this.state.paymentType === 'CC') {
      if (this.state.raffleTicketValue && this.state.email && this.state.phoneNumber && this.state.lastName && this.state.firstName && this.state.cardNumber && this.state.cardHolder && this.state.cvv) {
        const card = {
          number: this.cardNumber.value.trim(),
          cvc: this.cvv.value.trim(),
          exp_month: this.expMonth.value.trim(),
          exp_year: this.expYear.value.trim(),
        };
        this.props.getCardToken(this.props.stripeKey, this.cardNumber.value.trim(), this.expMonth.value.trim(), this.expYear.value.trim(), this.cvv.value.trim()).then((response) => {
          if (response.error) {
            this.setState({
              loading: false,
              showPopup: true,
              errorMsgCard: response.error.message });
          } else {
            const user = {
              email: this.state.emailValue,
              countryCode: this.state.countryPhone,
              cellNumber: this.state.phone,
              firstname: this.state.firstNameValue,
              lastname: this.state.lastNameValue,
              paymenttype: this.state.paymentType,
              itemCode: this.state.itemCodeValue,
              raffleTicketId: this.state.raffleTicketValue,
              stripeToken: response.id,
            };
            this.sellTickets(user);
          }
        });
      } else { this.setState({ loading: false }); }
    } else if (this.state.raffleTicketValue && this.state.email && this.state.phoneNumber && this.state.lastName && this.state.firstName) {
      const user = {
        email: this.state.emailValue,
        countryCode: this.state.countryPhone,
        cellNumber: this.state.phone,
        firstname: this.state.firstNameValue,
        lastname: this.state.lastNameValue,
        paymenttype: this.state.paymentType,
        itemCode: this.state.itemCodeValue,
        raffleTicketId: this.state.raffleTicketValue,
        stripeToken: this.state.stripeToken,
      };
      this.sellTickets(user);
    } else { this.setState({ loading: false }); }
  };
  sellTickets = (user) => {
    this.props.sellTickets(this.props.params && this.props.params.params, user)
      .then((resp) => {
        if (resp && resp.message) {
          this.setState({
            loading: false,
            showPopup: true,
            errorMsgCard: 'Ticket Purchased Successfully.',
            popupHeader: 'Success' });
        } else {
          this.setState({
            loading: false,
            showPopup: true,
            errorMsgCard: resp.errorMessage,
            popupHeader: 'Failed',
          });
        }
      });
  };
  submitTicketsbid = (e) => {
    e.preventDefault();
    this.validateField();
    this.setState({ loading: true });
    if (this.state.email && this.state.availTickets && this.state.itemCode) {
      const user = {
        email: this.state.emailValue,
        countryCode: this.state.countryPhone,
        cellNumber: this.state.phone,
        firstname: this.state.firstNameValue,
        lastname: this.state.lastNameValue,
        itemCode: this.state.itemCodeValue,
        submittedTickets: this.state.submittedTickets,
      };
      this.props.submitTickets(this.props.params && this.props.params.params, user)
            .then((resp) => {
              if (resp && resp.message) {
                this.setState({
                  loading: false,
                  showPopup: true,
                  errorMsgCard: resp.message,
                  popupHeader: 'Success' });
              } else {
                this.setState({
                  loading: false,
                  showPopup: true,
                  errorMsgCard: resp.errorMessage,
                  popupHeader: 'Failed',
                });
              }
            });
    } else { this.setState({ loading: false }); }
  };
  submitDonatebid = (e) => {
    e.preventDefault();
    this.validateField();
    this.setState({ loading: true });
    if (this.state.paymentType === 'CC') {
      if (this.state.email && this.state.phoneNumber && this.state.lastName && this.state.firstName && this.state.cardNumber && this.state.cardHolder && this.state.amount && this.state.cvv) {
        this.props.getCardToken(this.props.stripeKey, this.cardNumber.value.trim(), this.expMonth.value.trim(), this.expYear.value.trim(), this.cvv.value.trim()).then((resp) => {
          if (resp.error) {
            const user = {
              email: this.state.emailValue,
              countryCode: this.state.countryPhone,
              cellNumber: this.state.phone,
              firstname: this.state.firstNameValue,
              lastname: this.state.lastNameValue,
              paymenttype: this.state.paymentType,
              amount: this.state.amountValue,
              stripeToken: resp.data.id };
            this.submiteDonation(user);
          } else {
            this.setState({
              loading: false,
              showPopup: true,
              errorMsgCard: error.response.data.error.message,
              popupHeader: 'Failed',
            });
          }
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    } else if (this.state.email && this.state.phoneNumber && this.state.lastName && this.state.firstName && this.state.amount) {
      const user = {
        email: this.state.emailValue,
        countryCode: this.state.countryPhone,
        cellNumber: this.state.phone,
        firstname: this.state.firstNameValue,
        lastname: this.state.lastNameValue,
        paymenttype: this.state.paymentType,
        amount: this.state.amountValue,
        stripeToken: this.state.stripeToken };
      this.submiteDonation(user);
    } else {
      this.setState({
        loading: false,
      });
    }
  };
  submiteDonation = (user) => {
    this.props.submitDonate(this.props.params && this.props.params.params, user)
      .then((resp) => {
        if (resp && resp.message) {
          this.setState({
            loading: false,
            showPopup: true,
            errorMsgCard: resp.message,
            popupHeader: 'Success' });
        } else {
          this.setState({
            loading: false,
            showPopup: true,
            errorMsgCard: resp.errorMessage,
            popupHeader: 'Failed',
          });
        }
      });
  };
  doOrderTicket() {
    const Data = {};
    Data.clientDate = moment().format('DD/MM/YYYY hh:mm:ss');
    let ticketings = this.state.totalTickets;
    ticketings = ticketings.filter(n => n !== null);
    ticketings = ticketings.map(obj => ({ numberOfTicket: parseInt(obj.numberofticket), ticketTypeId: parseInt(obj.tickettypeid) }));
    Data.ticketings = ticketings;
    this.setState({
      orderTicket: null,
    });
    const eventUrl = this.props.params && this.props.params.params;
    this.props.doOrderTicket(eventUrl, Data)
      .then((resp) => {
        if (resp && resp.data && resp.data.orderId) {
          // history.push('/u/checkout/'+eventUrl+'/tickets/order/'+resp.data.orderId);
          this.setState({
						orderId: resp.data.orderId,
						eventUrl: eventUrl,
          }, ()=>{
            this.setState({
							activeViews: "purchase-event-tickets-checkout",
            });


          })
        } else {
          this.setState({
            formError: 'Error while Ordering Tickets',
            showFormError: true,
            showBookingTicketPopup: false,
          });
        }
      }).catch((error) => {
        this.setState({
          orderTicket: 'Error while Ordering Tickets',
          showFormError: true,
          showBookingTicketPopup: false,
          formError: (error && error.response && error.response.data && error.response.data.errors && error.response.data.errors[0] && error.response.data.errors[0].message) || 'Error while Ordering Tickets',
        });
      });
  }
  selectHandle(e) {
    const totalTickets = this.state.totalTickets;
    totalTickets[e.target.name] = {
      price: e.target.dataset && e.target.dataset.price,
      numberofticket: e.target.value.trim(),
      tickettypeid: e.target.name,
    };
    let totalPrice = 0;
    let totalNoTic = 0;
    let totalTicketQty = 0;
    totalTickets.map(item => {
      totalPrice += item.price * item.numberofticket;
      totalTicketQty += parseInt(item.numberofticket);
    });
    this.setState({
      totalTickets: totalTickets,
      totalTicketQty,
      totalTicketPrice: totalPrice,
    });
  }
  changePaymentType = (event) => {
    this.setState({
      paymentType: event.target.value,
      cardNumber: false,
      cardHolder: false,
      cvv: false,
      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
      cvvFeedBack: false,
      expMonthFeedBack: false,
      expYearFeedBack: false,
    });
  };
  render() {
    const makeItem = function (i) {
      const item = [];
      for (let j = 0; j <= i; j++) {
        item.push(<option value={j} key={i + Math.random()}>{j}</option>);
      }
      return item;
    };
    return (
      <div>
        { this.state.isloaded && this.props.is_volunteer &&
        <views>
          { this.state.activeViews === 'select-action' &&
          <view name="select-action" className={cx(this.state.activeViews === 'select-action' && s.active)}>
            <h4 className="text-center"><strong>Select an Action</strong></h4>
            <div className>
              {/* <button class="btn btn-block btn-info mrg-t-lg mrg-b-lg" data-switch-view="attendees-checkin">Check in attendees</button> */}
              <button
                className="btn btn-block btn-success mrg-t-lg mrg-b-lg" onClick={() => {
                  this.setActiveView('check-item-status');
                }}
              >Check
								Item Status
							</button>
              <button
                className="btn btn-block btn-info mrg-t-lg mrg-b-lg" onClick={() => {
                  this.setActiveView('submit-auction-bids');
                }}
              >Submit
								Silent Auction Bid
							</button>
              <button
                className="btn btn-block btn-success mrg-t-lg mrg-b-lg" onClick={() => {
                  this.setActiveView('submit-pledge');
                }}
              >Submit
								Pledge
							</button>
              <button
                className="btn btn-block btn-info mrg-t-lg mrg-b-lg" onClick={() => {
                  this.setActiveView('sell-raffle-tickets');
                }}
              >Sell
								Raffle Tickets
							</button>
              <button
                className="btn btn-block btn-success mrg-t-lg mrg-b-lg" onClick={() => {
                  this.setActiveView('submit-raffle-tickets');
                }}
              >
								Submit Raffle Tickets
							</button>
              <button
                className="btn btn-block btn-info mrg-t-lg mrg-b-lg" onClick={() => {
                  this.setActiveView('purchase-event-tickets');
                }}
              >
								Sell Event Tickets
							</button>
              <button
                className="btn btn-block btn-info mrg-t-lg mrg-b-lg" onClick={() => {
                  this.setActiveView('event-ticketing');
                }}
              >Check in
								Attendees
							</button>
            </div>
            <button
              className="btn btn-block btn-success mrg-t-lg mrg-b-lg" onClick={() => {
                this.setActiveView('donate');
              }} data-switch-view="donate"
            >Donate
						</button>
            <p className="text-center help-text mrg-t-lg">You can change options from the menu at any time</p>
          </view> }
          { this.state.activeViews === 'check-item-status' &&
          <view name="check-item-status" className={cx(this.state.activeViews === 'check-item-status' && s.active)}>
            <h4 className="text-center"><strong>Check Item Status</strong></h4>
            <div className="form-group">
              <input
                type="text" maxLength={3} name="itemCode" id="checkItemStatus" placeholder="Item Code"
                autoComplete="off" className="form-control mrg-t-lg alpha-only" ref={(ref) => {
                  this.itemCode = ref;
                }}
                onKeyUp={this.itemCodeValidateHandler}
              />
            </div>
            <div className="form-group text-center">
              <h5
                id="infoMessage"
                className={this.state.itemStatusMsg ? this.state.itemStatusMsg.message : 'text-danger'}
              > { this.state.itemStatusMsg ? this.state.itemStatusMsg.message : this.state.itemStatusFeedBack && 'Invalid Item Code' } </h5>
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-default" onClick={() => {
                  this.setActiveView('select-action');
                }}
              >Back
							</button>
            </div>
          </view> }
          { this.state.activeViews === 'submit-auction-bids' &&
          <view
            name="submit-auction-bids"
            className={cx(this.state.activeViews === 'submit-auction-bids' && s.active)}
          >
            <h4 className="text-center"><strong>Submit Silent Auction Bid</strong></h4>
            <form
              className="ajax-form validated fv-form fv-form-bootstrap" method="POST"
              action="/AccelEventsWebApp/events/jkazarian8/volunteer/submit-bids"
              data-validation-fields="getBidValidationFields" data-onsuccess="handleSubmitBidSuccess"
              data-validate-function="validateForm" data-has-cc-info="true" data-show-cc-confirm="false"
              data-confirm-message="getBidStripeConfirmMessage" data-switch-view="select-action"
              data-view-name="submit-auction-bids" noValidate="novalidate"
              onSubmit={this.submiteSilentAuctionBid}
            >
              <button type="submit" className="fv-hidden-submit" style={{ display: 'none', width: 0, height: 0 }} />
              <div className="ajax-msg-box text-center mrg-b-lg" style={{ display: 'none' }}><span
                className="fa fa-spinner fa-pulse fa-fw"
              /> <span className="resp-message" /></div>
              <div
                className={cx('form-group', this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}
              >
                <input
                  type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                  className="form-control mrg-t-lg bidder-email" data-fv-field="email" ref={(ref) => {
                    this.email = ref;
                  }}
                  onKeyUp={this.emailValidateHandler}
                  onBlur={this.checkAuctionUser}
                  disabled={!this.state.emailEnable}
                />
                { this.state.emailFeedBack && this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                { this.state.emailFeedBack && !this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                { this.state.emailFeedBack && !this.state.emailValue &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Bidder email can't be empty.</small>}
                { this.state.emailFeedBack && !this.state.email &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
                <small className="message text-success">{this.state.errorMsgEmailCheck}</small>
              </div>
              {  // this.state.userData && !this.state.userData.phonenumber &&
                <div className={cx('form-group', this.state.phoneNumberFeedBack && 'has-feedback', this.state.phoneNumberFeedBack && this.state.phoneNumber && 'has-success', this.state.phoneNumberFeedBack && (!this.state.phoneNumber) && 'has-error')}>
                  <label className="control-label">Cell Number</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-phone" aria-hidden="true" />
                    </div>
                    <IntlTelInput
                      css={['intl-tel-input', 'form-control intl-tel']}
                      utilsScript="./libphonenumber.js"
                      separateDialCode
                      autoPlaceholder={false}
                      placeholder={"Bidder Cell Number"}
                      value={this.state.phone || ''}
                      defaultCountry={this.props.country || ""}
                      onPhoneNumberChange={this.changePhone}
                      onPhoneNumberBlur={this.checkMobileUser}
                      disabled={!this.state.phoneEnable}
                    />
                    { this.state.phoneNumberFeedBack && this.state.phoneNumber &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                  </div>
                  { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                  <small
                    className="help-block"
                    data-fv-result="NOT_VALIDATED"
                  >{this.state.errorMsgPhoneNumber}</small>}
                  <small className="message text-success">{this.state.errorMsgEmailCheck}</small>
                </div> }
              { !this.state.userData && this.state.email &&
              <div>
                <div
                  className={cx('form-group', this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}
                >
                  <label className="control-label">First Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true" />
                    </div>
                    <input
                      type="text" className="form-control" name="firstname" placeholder="First Name"
                      ref={(ref) => {
                        this.firstName = ref;
                      }}
                      onKeyUp={this.firstNameValidateHandler}
                    />
                    { this.state.firstNameFeedBack && this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.firstNameFeedBack && !this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                  </div>
                  { this.state.firstNameFeedBack && !this.state.firstName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">First Name is required.</small>}
                </div>
                <div
                  className={cx('form-group', this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}
                >
                  <label className="control-label">Last Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true" />
                    </div>
                    <input
                      type="text" className="form-control" name="lastname" placeholder="Last Name"
                      ref={(ref) => {
                        this.lastName = ref;
                      }}
                      onKeyUp={this.lastNameValidateHandler}
                    />
                    { this.state.lastNameFeedBack && this.state.lastName &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.lastNameFeedBack && !this.state.lastName &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                  </div>
                  { this.state.lastNameFeedBack && !this.state.lastName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">Last Name is required.</small>}
                </div>
              </div> }

              { this.state.userData && !this.state.userData.firstName &&
              <div
                className={cx('form-group', this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}
              >
                <label className="control-label">First Name</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-user" aria-hidden="true" />
                  </div>
                  <input
                    type="text" className="form-control" name="firstname" placeholder="First Name"
                    ref={(ref) => {
                      this.firstName = ref;
                    }}
                    onKeyUp={this.firstNameValidateHandler}
                  />
                  { this.state.firstNameFeedBack && this.state.email &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.firstNameFeedBack && !this.state.email &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.firstNameFeedBack && !this.state.firstName &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">First Name is required.</small>}
              </div> }
              { this.state.userData && !this.state.userData.lastName &&
              <div
                className={cx('form-group', this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}
              >
                <label className="control-label">Last Name</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-user" aria-hidden="true" />
                  </div>
                  <input
                    type="text" className="form-control" name="lastname" placeholder="Last Name"
                    ref={(ref) => {
                      this.lastName = ref;
                    }}
                    onKeyUp={this.lastNameValidateHandler}
                  />
                  { this.state.lastNameFeedBack && this.state.lastName &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.lastNameFeedBack && !this.state.lastName &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.lastNameFeedBack && !this.state.lastName &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Last Name is required.</small>}
              </div> }
              <div className="form-group">
                {this.state.userData && this.state.userData.firstName &&
                <div className="text-xs" style={{ display: 'block' }}>Name: <span
                  className="bidder-name"
                >{this.state.userData.firstName}</span></div> }
                {this.state.userData && this.state.userData.email &&
                <div className="text-xs" style={{ display: 'block' }}>Email Id : <span
                  className="bidder-email"
                >{this.state.userData.email}</span></div> }
                {this.state.userData && this.state.userData.phonenumber &&
                <div className="text-xs" style={{ display: 'block' }}>Cell Number : <span
                  className="bidder-cell valueCustom"
                >{this.state.userData.phonenumber}</span></div> }
              </div>
              <div
                className={cx('form-group ', this.state.itemCodeFeedBack && 'has-feedback', this.state.itemCodeFeedBack && this.state.itemCode && 'has-success', this.state.itemCodeFeedBack && (!this.state.itemCode) && 'has-error')}
              >
                <input
                  className="form-control mrg-t-lg alpha-only"
                  type="text" maxLength={3} name="itemCodee" placeholder="Item Code" autoComplete="off"
                  ref={(ref) => {
                    this.itemCode = ref;
                  }}
                  onKeyUp={this.getAuctionItem}
                />
                { this.state.itemCodeFeedBack && this.state.itemCode &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                { this.state.itemCodeFeedBack && !this.state.itemCode &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                { this.state.itemCodeFeedBack && !this.state.itemCodeValue &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Item code is required.</small>}
							</div>
              <h5 id="infoMessage"
							    className='text-danger'> { this.state.itemStatusMsg == 0 && 'Invalid Item Code' } </h5>
							{ this.state.itemData &&
							<div className="form-group">
								<div className="text-xs">Item Name : <span className="item-name"/> {this.state.itemData.itemName} </div>
								<div className="text-xs">Current Bid: <span
									className="currency-symbol">{this.props.currencySymbol}</span> {this.state.itemData.currentBid ? this.state.itemData.currentBid : this.state.itemData.startingBid}<span
									className="current-bid"/></div>
								<div className="text-xs" style={{display: 'none'}}>Starting Bid: <span
									className="currency-symbol">{this.props.currencySymbol}</span> {this.state.itemData.itemName}<span className="starting-bid"/>
								</div>
								<div className="text-xs">Bid Increment: <span
									className="currency-symbol">{this.state.itemData.bidIncrement ? this.props.currencySymbol : ""}</span> {this.state.itemData.bidIncrement ? this.state.itemData.bidIncrement : "N/A"}<span
									className="bid-increment"/></div>
								<div className="text-xs">Buy It Now Price: <span
									className="currency-symbol">{this.state.itemData.buyItNow ? this.props.currencySymbol : ""}</span> {this.state.itemData.buyItNow ? this.state.itemData.buyItNow : "N/A"}<span
									className="buy-it-now"/></div>
							</div> }
							<div
								className={cx("form-group", this.state.amountFeedBack && 'has-feedback', this.state.amountFeedBack && this.state.amount && 'has-success', this.state.amountFeedBack && (!this.state.amount) && 'has-error')}>
								<div className="row">
									<div className="col-md-12">
										<div className="input-group">
											<div className="input-group-addon">{this.props.currencySymbol}</div>
                      <NumericInput className="form-control" name="itembid" id="itembid"
											       placeholder="Amount"
											       data-isprocessingfeestopurchaser="false" data-fv-field="itembid" style={ false }
                             onChange={this.amountValidateHandler}
                             value={ this.state.amountValue }/>
											{ this.state.amountFeedBack && this.state.amount &&
											<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
											{ this.state.amountFeedBack && !this.state.amount &&
											<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
										</div>
                    { this.state.amountFeedBack && !this.state.amountValue &&
                    <small className="help-block" data-fv-result="NOT_VALIDATED">Bid Amount can not be empty</small>}
										{ this.state.amountFeedBack && !this.state.amount &&
										<small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgAmount}</small>}
									</div>
								</div>
							</div>
              {  this.props.eventData && this.props.eventData.ccRequiredForBidConfirm  && <div className="cc-info">
								<style
									dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n"}}/>
								<div className="stripe-form">
									<div className="stripe-card-info">
										<div
											className={cx("form-group", this.state.cardHolderFeedBack && 'has-feedback', this.state.cardHolderFeedBack && this.state.cardHolder && 'has-success', this.state.cardHolderFeedBack && (!this.state.cardHolder) && 'has-error')}>
											<label className="control-label">Card Holder Name</label>
											<div className="input-group">
												<div className="input-group-addon"><i className="fa fa-user" aria-hidden="true"/></div>
												<input type="text" className="form-control" id="cardname" data-stripe="name"
												       placeholder="Name on the card" data-fv-field="cardholdername"
												       ref={ref => {
                                 this.cardHolder = ref;
                               }}
												       onKeyUp={this.cardHolderValidateHandler}/>
												{ this.state.cardHolderFeedBack && this.state.cardHolder &&
												<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
												{ this.state.cardHolderFeedBack && !this.state.cardHolder &&
												<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
											</div>
											{ this.state.cardHolderFeedBack && !this.state.cardHolder &&
											<small className="help-block"
											       data-fv-result="NOT_VALIDATED">{this.state.errorMsgcardHolder}</small>}

                    </div>
                    <div
                      className={cx('form-group', this.state.cardNumberFeedBack && 'has-feedback', this.state.cardNumberFeedBack && this.state.cardNumber && 'has-success', this.state.cardNumberFeedBack && (!this.state.cardNumber) && 'has-error')}
                    >
                      <label className="control-label">Credit Card Number</label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true" />
                        </div>
                        <input
                          type="number" className="form-control field-card_number" id="cardnumber"
                          placeholder="8888-8888-8888-8888" maxLength={16} data-stripe="number"
                          required="required" data-fv-field="cardnumber"
                          ref={(ref) => {
                            this.cardNumber = ref;
                          }}
                          onKeyUp={this.cardNumberValidateHandler}
                        />
                        { this.state.cardNumberFeedBack && this.state.cardNumber &&
                        <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                        { this.state.cardNumberFeedBack && !this.state.cardNumber &&
                        <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                      </div>
                      { this.state.cardNumberFeedBack && !this.state.cardNumber &&
                      <small
                        className="help-block"
                        data-fv-result="NOT_VALIDATED"
                      >{this.state.errorMsgcardNumber}.</small>}
                    </div>

                    <div className="row">
                      <div className="col-md-8">
                        <div
                          className={cx('form-group', this.state.expMonthFeedBack && 'has-feedback', this.state.expMonthFeedBack && this.state.expMonth && 'has-success', this.state.expMonthFeedBack && (!this.state.expMonth) && 'has-error')}
                        >
                          <label className="control-label">Expiration Date</label>
                          <div className="input-group">
                            <div className="input-group-addon field-exp_month"><i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            /></div>
                            <select
                              className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth" ref={(ref) => {
                                this.expMonth = ref;
                              }} onChange={this.expMonthValidateHandler}
                            >
                              <option defaultValue value="01">Jan (01)</option>
                              <option value="02">Feb (02)</option>
                              <option value="03">Mar (03)</option>
                              <option value="04">Apr (04)</option>
                              <option value="05">May (05)</option>
                              <option value="06">Jun (06)</option>
                              <option value="07">Jul (07)</option>
                              <option value="08">Aug (08)</option>
                              <option value="09">Sep (09)</option>
                              <option value="10">Oct (10)</option>
                              <option value="11">Nov (11)</option>
                              <option value="12">Dec (12)</option>
                            </select>
                            <select
                              className data-stripe="exp_year field-exp_year" id="exp-year" data-fv-field="expYear"
                              ref={(ref) => {
                                this.expYear = ref;
                              }} onChange={this.expYearValidateHandler}
                            >
                              <option value="2017">2017</option>
                              <option value="2018">2018</option>
                              <option value="2019">2019</option>
                              <option value="2020">2020</option>
                              <option value="2021">2021</option>
                              <option value="2022">2022</option>
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                              <option value="2025">2025</option>
                              <option value="2026">2026</option>
                              <option value="2027">2027</option>
                              <option value="2028">2028</option>
                              <option value="2029">2029</option>
                              <option value="2030">2030</option>
                              <option value="2031">2031</option>
                              <option value="2032">2032</option>
                              <option value="2033">2033</option>
                              <option value="2034">2034</option>
                              <option value="2035">2035</option>
                              <option value="2036">2036</option>
                              <option value="2037">2037</option>
                              <option value="2038">2038</option>
                              <option value="2039">2039</option>
                              <option value="2040">2040</option>
                              <option value="2041">2041</option>
                              <option value="2042">2042</option>
                              <option value="2043">2043</option>
                              <option value="2044">2044</option>
                              <option value="2045">2045</option>
                              <option value="2046">2046</option>
                              <option value="2047">2047</option>
                              <option value="2048">2048</option>
                              <option value="2049">2049</option>
                              <option value="2050">2050</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className={cx('input-group', this.state.cvvFeedBack && 'has-feedback', this.state.cvvFeedBack && this.state.cvv && 'has-success', this.state.cvvFeedBack && (!this.state.cvv) && 'has-error')}
                        >
                          <label className="control-label">CVV Number</label>
                          <div className="input-group">
                            <input
                              type="number" className="form-control field-cvv" maxLength={4} size={4}
                              data-stripe="cvc" id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"
                              ref={(ref) => {
                                this.cvv = ref;
                              }}
                              onKeyUp={this.cvvValidateHandler}
                            />
                            { this.state.cvvFeedBack && this.state.cvv &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                            { this.state.cvvFeedBack && !this.state.cvv &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                          </div>
                          { this.state.cvvFeedBack && !this.state.cvv &&
                          <small className="help-block" data-fv-result="NOT_VALIDATED">{ this.state.errorMsgcvv }</small>}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> }
              <div className="form-group">
                <Button loading={this.state.loading} type="submit" className="btn btn-block btn-success submit">Submit</Button>
              </div>
            </form>
            <div className="form-group text-center">
              <button
                className="btn btn-default" onClick={() => {
                  this.setActiveView('select-action');
                }}
              >Back
							</button>
            </div>
          </view> }
          { this.state.activeViews === 'submit-pledge' &&
          <view name="submit-pledge" className={cx(this.state.activeViews === 'submit-pledge' && s.active)}>
            <h4 className="text-center"><strong>Submit Pledge</strong></h4>
            <form
              className="ajax-form validated fv-form fv-form-bootstrap" method="POST"
              action="/AccelEventsWebApp/events/jkazarian8/volunteer/submit-pledge"
              data-validation-fields="getPledgeValidationFields" data-onsuccess="handleBidSuccess"
              data-validate-function="validateForm" data-switch-view="select-action" data-view-name="submit-pledge"
              noValidate="novalidate"
              onSubmit={this.submitPledgeBid}
            >
              <div
                className={cx('form-group', this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}
              >
                <input
                  type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                  className="form-control mrg-t-lg bidder-email" data-fv-field="email" ref={(ref) => {
                    this.email = ref;
                  }}
                  onKeyUp={this.emailValidateHandler}
                  onBlur={this.checkAuctionUser}
                  disabled={!this.state.emailEnable}
                />
                { this.state.emailFeedBack && this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                { this.state.emailFeedBack && !this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                { this.state.emailFeedBack && !this.state.emailValue &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Bidder email can't be empty.</small>}
                { this.state.emailFeedBack && !this.state.email &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
                <small className="message text-success">{this.state.errorMsgEmailCheck}</small>
              </div>

              <div className={cx('form-group', this.state.phoneNumberFeedBack && 'has-feedback', this.state.phoneNumberFeedBack && this.state.phoneNumber && 'has-success', this.state.phoneNumberFeedBack && (!this.state.phoneNumber) && 'has-error')}>
                <label className="control-label">Cell Number</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-phone" aria-hidden="true" />
                  </div>
                  <IntlTelInput
                    css={['intl-tel-input', 'form-control intl-tel']}
                    utilsScript="./libphonenumber.js"
                    separateDialCode
                    autoPlaceholder={false}
                    placeholder={"Bidder Cell Number"}
                    value={this.state.phone || ''}
                    defaultCountry={this.props.country || ""}
                    onPhoneNumberChange={this.changePhone}
                    onPhoneNumberBlur={this.checkMobileUser}
                    disabled={!this.state.phoneEnable}
                  />
                  { this.state.phoneNumberFeedBack && this.state.phoneNumber &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                <small
                  className="help-block"
                  data-fv-result="NOT_VALIDATED"
                >{this.state.errorMsgPhoneNumber}</small>}
                <small className="message text-success">{this.state.errorMsgEmailCheck}</small>
              </div>
              { !this.state.userData && this.state.email &&
              <div>
                <div
                  className={cx('form-group', this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}
                >
                  <label className="control-label">First Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true" />
                    </div>
                    <input
                      type="text" className="form-control" name="firstname" placeholder="First Name"
                      ref={(ref) => {
                        this.firstName = ref;
                      }}
                      onKeyUp={this.firstNameValidateHandler}
                    />
                    { this.state.firstNameFeedBack && this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.firstNameFeedBack && !this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                  </div>
                  { this.state.firstNameFeedBack && !this.state.firstName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">First Name is required.</small>}
                </div>
                <div
                  className={cx('form-group', this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}
                >
                  <label className="control-label">Last Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true" />
                    </div>
                    <input
                      type="text" className="form-control" name="lastname" placeholder="Last Name"
                      ref={(ref) => {
                        this.lastName = ref;
                      }}
                      onKeyUp={this.lastNameValidateHandler}
                    />
                    { this.state.lastNameFeedBack && this.state.lastName &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.lastNameFeedBack && !this.state.lastName &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                  </div>
                  { this.state.lastNameFeedBack && !this.state.lastName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">Last Name is required.</small>}
                </div>
              </div> }

              { this.state.userData && !this.state.userData.firstName &&
              <div
                className={cx('form-group', this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}
              >
                <label className="control-label">First Name</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-user" aria-hidden="true" />
                  </div>
                  <input
                    type="text" className="form-control" name="firstname" placeholder="First Name"
                    ref={(ref) => {
                      this.firstName = ref;
                    }}
                    onKeyUp={this.firstNameValidateHandler}
                  />
                  { this.state.firstNameFeedBack && this.state.email &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.firstNameFeedBack && !this.state.email &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.firstNameFeedBack && !this.state.firstName &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">First Name is required.</small>}
              </div> }
              { this.state.userData && !this.state.userData.lastName &&
              <div
                className={cx('form-group', this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}
              >
                <label className="control-label">Last Name</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-user" aria-hidden="true" />
                  </div>
                  <input
                    type="text" className="form-control" name="lastname" placeholder="Last Name"
                    ref={(ref) => {
                      this.lastName = ref;
                    }}
                    onKeyUp={this.lastNameValidateHandler}
                  />
                  { this.state.lastNameFeedBack && this.state.lastName &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.lastNameFeedBack && !this.state.lastName &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.lastNameFeedBack && !this.state.lastName &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Last Name is required.</small>}
              </div> }

              <div className="form-group">
                {this.state.userData && this.state.userData.firstName &&
                <div className="text-xs" style={{ display: 'block' }}>Name: <span
                  className="bidder-name"
                >{this.state.userData.firstName}</span></div> }
                {this.state.userData && this.state.userData.email &&
                <div className="text-xs" style={{ display: 'block' }}>Email Id : <span
                  className="bidder-email"
                >{this.state.userData.email}</span></div> }
                {this.state.userData && this.state.userData.phonenumber &&
                <div className="text-xs" style={{ display: 'block' }}>Cell Number : <span
                  className="bidder-cell valueCustom"
                >{this.state.userData.phonenumber}</span></div> }
              </div>
              <div
                className={cx('form-group ', this.state.itemCodeFeedBack && 'has-feedback', this.state.itemCodeFeedBack && this.state.itemCode && 'has-success', this.state.itemCodeFeedBack && (!this.state.itemCode) && 'has-error')}
              >
                <input
                  className="form-control mrg-t-lg alpha-only"
                  type="text" maxLength={3} name="itemCodee" placeholder="Item Code" autoComplete="off"
                  ref={(ref) => {
                    this.itemCode = ref;
                  }}
                  onKeyUp={this.getAuctionItem}
                />
                { this.state.itemCodeFeedBack && this.state.itemCode &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                { this.state.itemCodeFeedBack && !this.state.itemCode &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                { this.state.itemCodeFeedBack && !this.state.itemCodeValue &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Item code is required.</small>}
              </div>
              <h5
                id="infoMessage"
                className="text-danger"
              > { this.state.itemStatusMsg == 0 && 'Invalid Item Code' } </h5>
              { this.state.itemData &&
              <div className="form-group">
                <div className="text-xs">Item Name : <span className="item-name" /> {this.state.itemData.itemName} </div>
                <div className="text-xs">Minimum Price: <span
                  className="currency-symbol"
                >{this.props.currencySymbol}</span> {this.state.itemData.minPrice}<span
                  className="buy-it-now"
                /></div>
              </div> }
              <div onChange={this.changePaymentType} id="payment-type-selection" className="form-group text-center">
                <input type="radio" name="paymenttype" autoComplete="off" defaultValue="CC" defaultChecked="checked" />
								Credit Card &nbsp; &nbsp; &nbsp; &nbsp;
								<input type="radio" name="paymenttype" autoComplete="off" defaultValue="cash" /> Cash
							</div>
							<div
								className={cx("form-group", this.state.amountFeedBack && 'has-feedback', this.state.amountFeedBack && this.state.amount && 'has-success', this.state.amountFeedBack && (!this.state.amount) && 'has-error')}>
								<div className="row">
									<div className="col-md-12">
										<div className="input-group">
											<div className="input-group-addon">{this.props.currencySymbol}</div>
                      <NumericInput className="form-control" name="itembid" id="itembid"
											       placeholder="Amount" step = {1}
											       data-isprocessingfeestopurchaser="false" data-fv-field="itembid" style={ false }
                             onChange={this.submitPledgeAmountValidateHandler}
                             value={ this.state.amountValue }/>
											{ this.state.amountFeedBack && this.state.amount &&
											<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
											{ this.state.amountFeedBack && !this.state.amount &&
											<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
										</div>
                    { this.state.amountFeedBack && !this.state.amountValue &&
                    <small className="help-block" data-fv-result="NOT_VALIDATED">Submitted pledge Amount can not be empty</small>}
										{ this.state.amountFeedBack && !this.state.amount &&
										<small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgAmount}</small>}
									</div>
								</div>
							</div>
              {	this.state.paymentType == "CC" &&
              <div className="cc-info">
                <style
                  dangerouslySetInnerHTML={{ __html: '\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field="expMonth"] {\n    xdisplay: none !important;\n  }\n' }}
                />
                <div className="stripe-form">
                  <div className="stripe-card-info">
                    <div
                      className={cx('form-group', this.state.cardHolderFeedBack && 'has-feedback', this.state.cardHolderFeedBack && this.state.cardHolder && 'has-success', this.state.cardHolderFeedBack && (!this.state.cardHolder) && 'has-error')}
                    >
                      <label className="control-label">Card Holder Name</label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-user" aria-hidden="true" /></div>
                        <input
                          type="text" className="form-control" id="cardname" data-stripe="name"
                          placeholder="Name on the card" data-fv-field="cardholdername"
                          ref={(ref) => {
                            this.cardHolder = ref;
                          }}
                          onKeyUp={this.cardHolderValidateHandler}
                        />
                        { this.state.cardHolderFeedBack && this.state.cardHolder &&
                        <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                        { this.state.cardHolderFeedBack && !this.state.cardHolder &&
                        <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                      </div>
                      { this.state.cardHolderFeedBack && !this.state.cardHolder &&
                      <small
                        className="help-block"
                        data-fv-result="NOT_VALIDATED"
                      >{this.state.errorMsgcardHolder}</small>}

                    </div>
                    <div
                      className={cx('form-group', this.state.cardNumberFeedBack && 'has-feedback', this.state.cardNumberFeedBack && this.state.cardNumber && 'has-success', this.state.cardNumberFeedBack && (!this.state.cardNumber) && 'has-error')}
                    >
                      <label className="control-label">Credit Card Number</label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true" />
                        </div>
                        <input
                          type="number" className="form-control field-card_number" id="cardnumber"
                          placeholder="8888-8888-8888-8888" maxLength={16} data-stripe="number"
                          required="required" data-fv-field="cardnumber"
                          ref={(ref) => {
                            this.cardNumber = ref;
                          }}
                          onKeyUp={this.cardNumberValidateHandler}
                        />
                        { this.state.cardNumberFeedBack && this.state.cardNumber &&
                        <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                        { this.state.cardNumberFeedBack && !this.state.cardNumber &&
                        <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                      </div>
                      { this.state.cardNumberFeedBack && !this.state.cardNumber &&
                      <small
                        className="help-block"
                        data-fv-result="NOT_VALIDATED"
                      >{this.state.errorMsgcardNumber}.</small>}
                    </div>

                    <div className="row">
                      <div className="col-md-8">
                        <div
                          className={cx('form-group', this.state.expMonthFeedBack && 'has-feedback', this.state.expMonthFeedBack && this.state.expMonth && 'has-success', this.state.expMonthFeedBack && (!this.state.expMonth) && 'has-error')}
                        >
                          <label className="control-label">Expiration Date</label>
                          <div className="input-group">
                            <div className="input-group-addon field-exp_month"><i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            /></div>
                            <select
                              className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth" ref={(ref) => {
                                this.expMonth = ref;
                              }} onChange={this.expMonthValidateHandler}
                            >
                              <option defaultValue value="01">Jan (01)</option>
                              <option value="02">Feb (02)</option>
                              <option value="03">Mar (03)</option>
                              <option value="04">Apr (04)</option>
                              <option value="05">May (05)</option>
                              <option value="06">Jun (06)</option>
                              <option value="07">Jul (07)</option>
                              <option value="08">Aug (08)</option>
                              <option value="09">Sep (09)</option>
                              <option value="10">Oct (10)</option>
                              <option value="11">Nov (11)</option>
                              <option value="12">Dec (12)</option>
                            </select>
                            <select
                              className data-stripe="exp_year field-exp_year" id="exp-year" data-fv-field="expYear"
                              ref={(ref) => {
                                this.expYear = ref;
                              }} onChange={this.expYearValidateHandler}
                            >
                              <option value="2017">2017</option>
                              <option value="2018">2018</option>
                              <option value="2019">2019</option>
                              <option value="2020">2020</option>
                              <option value="2021">2021</option>
                              <option value="2022">2022</option>
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                              <option value="2025">2025</option>
                              <option value="2026">2026</option>
                              <option value="2027">2027</option>
                              <option value="2028">2028</option>
                              <option value="2029">2029</option>
                              <option value="2030">2030</option>
                              <option value="2031">2031</option>
                              <option value="2032">2032</option>
                              <option value="2033">2033</option>
                              <option value="2034">2034</option>
                              <option value="2035">2035</option>
                              <option value="2036">2036</option>
                              <option value="2037">2037</option>
                              <option value="2038">2038</option>
                              <option value="2039">2039</option>
                              <option value="2040">2040</option>
                              <option value="2041">2041</option>
                              <option value="2042">2042</option>
                              <option value="2043">2043</option>
                              <option value="2044">2044</option>
                              <option value="2045">2045</option>
                              <option value="2046">2046</option>
                              <option value="2047">2047</option>
                              <option value="2048">2048</option>
                              <option value="2049">2049</option>
                              <option value="2050">2050</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className={cx('input-group', this.state.cvvFeedBack && 'has-feedback', this.state.cvvFeedBack && this.state.cvv && 'has-success', this.state.cvvFeedBack && (!this.state.cvv) && 'has-error')}
                        >
                          <label className="control-label">CVV Number</label>
                          <div className="input-group">
                            <input
                              type="number" className="form-control field-cvv" maxLength={4} size={4}
                              data-stripe="cvc" id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"
                              ref={(ref) => {
                                this.cvv = ref;
                              }}
                              onKeyUp={this.cvvValidateHandler}
                            />
                            { this.state.cvvFeedBack && this.state.cvv &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                            { this.state.cvvFeedBack && !this.state.cvv &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                          </div>
                          { this.state.cvvFeedBack && !this.state.cvv &&
                          <small className="help-block" data-fv-result="NOT_VALIDATED">{ this.state.errorMsgcvv }</small>}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> }
              <div className="form-group">
                <Button loading={this.state.loading} type="submit" className="btn btn-block btn-success submit">Submit</Button>
              </div>
            </form>
            <div className="form-group text-center">
              <button
                className="btn btn-default" onClick={() => {
                  this.setActiveView('select-action');
                }}
              >Back
							</button>
            </div>
          </view> }
          { this.state.activeViews === 'sell-raffle-tickets' &&
          <view name="sell-raffle-tickets" className={cx(this.state.activeViews === 'sell-raffle-tickets' && s.active)}>
            <h4 className="text-center"><strong>Sell Raffle Tickets</strong></h4>
            <form
              className="ajax-form validated fv-form fv-form-bootstrap" method="POST"
              action="/AccelEventsWebApp/events/jkazarian8/volunteer/sell-tickets"
              data-validation-fields="getRafflePurchaseValidationFields" data-onsuccess="handleBidSuccess"
              data-validate-function="validateForm" data-switch-view="select-action"
              data-view-name="sell-raffle-tickets" noValidate="novalidate"
              onSubmit={this.sellTicketsBid}
            >
              <button type="submit" className="fv-hidden-submit" style={{ display: 'none', width: 0, height: 0 }} />
              <div
                className={cx('form-group', this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}
              >
                <input
                  type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                  className="form-control mrg-t-lg bidder-email" data-fv-field="email" ref={(ref) => {
                    this.email = ref;
                  }}
                  onKeyUp={this.emailValidateHandler}
                  onBlur={this.checkAuctionUser}
                  disabled={!this.state.emailEnable}
                />
                { this.state.emailFeedBack && this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                { this.state.emailFeedBack && !this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                { this.state.emailFeedBack && !this.state.emailValue &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Bidder email can't be empty.</small>}
                { this.state.emailFeedBack && !this.state.email &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
                <small className="message text-success">{this.state.errorMsgEmailCheck}</small>
              </div>
              {<div className={cx('form-group', this.state.phoneNumberFeedBack && 'has-feedback', this.state.phoneNumberFeedBack && this.state.phoneNumber && 'has-success', this.state.phoneNumberFeedBack && (!this.state.phoneNumber) && 'has-error')}>
                <label className="control-label">Cell Number</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-phone" aria-hidden="true" />
                  </div>
                  <IntlTelInput
                    css={['intl-tel-input', 'form-control intl-tel']}
                    utilsScript="./libphonenumber.js"
                    separateDialCode
                    autoPlaceholder={false}
                    placeholder={"Bidder Cell Number"}
                    value={this.state.phone || ''}
                    defaultCountry={this.props.country || ""}
                    onPhoneNumberChange={this.changePhone}
                    onPhoneNumberBlur={this.checkMobileUser}
                    disabled={!this.state.phoneEnable}
                  />
                  { this.state.phoneNumberFeedBack && this.state.phoneNumber &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                <small
                  className="help-block"
                  data-fv-result="NOT_VALIDATED"
                >{this.state.errorMsgPhoneNumber}</small>}
                <small className="message text-success">{this.state.errorMsgEmailCheck}</small>
              </div> }
              { !this.state.userData && this.state.email &&
              <div>
                <div
                  className={cx('form-group', this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}
                >
                  <label className="control-label">First Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true" />
                    </div>
                    <input
                      type="text" className="form-control" name="firstname" placeholder="First Name"
                      ref={(ref) => {
                        this.firstName = ref;
                      }}
                      onKeyUp={this.firstNameValidateHandler}
                    />
                    { this.state.firstNameFeedBack && this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.firstNameFeedBack && !this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                  </div>
                  { this.state.firstNameFeedBack && !this.state.firstName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">First Name is required.</small>}
                </div>
                <div
                  className={cx('form-group', this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}
                >
                  <label className="control-label">Last Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true" />
                    </div>
                    <input
                      type="text" className="form-control" name="lastname" placeholder="Last Name"
                      ref={(ref) => {
                        this.lastName = ref;
                      }}
                      onKeyUp={this.lastNameValidateHandler}
                    />
                    { this.state.lastNameFeedBack && this.state.lastName &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.lastNameFeedBack && !this.state.lastName &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                  </div>
                  { this.state.lastNameFeedBack && !this.state.lastName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">Last Name is required.</small>}
                </div>
              </div> }
              { this.state.userData && !this.state.userData.phonenumber &&
              <div className={cx('form-group', this.state.phoneNumberFeedBack && 'has-feedback', this.state.phoneNumberFeedBack && this.state.phoneNumber && 'has-success', this.state.phoneNumberFeedBack && (!this.state.phoneNumber) && 'has-error')}>
                <label className="control-label">Cell Number</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-phone" aria-hidden="true" />
                  </div>
                  <IntlTelInput
                    css={['intl-tel-input', 'form-control intl-tel']}
                    utilsScript="./libphonenumber.js"
                    separateDialCode
                    autoPlaceholder={false}
                    placeholder={"Bidder Cell Number"}
                    defaultCountry={this.props.country || ""}
                    value={this.state.phone || ''}
                    onPhoneNumberChange={this.changePhone}
                  />
                  { this.state.phoneNumberFeedBack && this.state.phoneNumber &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                <small
                  className="help-block"
                  data-fv-result="NOT_VALIDATED"
                >{this.state.errorMsgPhoneNumber}</small>}
              </div> }
              { this.state.userData && !this.state.userData.firstName &&
              <div
                className={cx('form-group', this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}
              >
                <label className="control-label">First Name</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-user" aria-hidden="true" />
                  </div>
                  <input
                    type="text" className="form-control" name="firstname" placeholder="First Name"
                    ref={(ref) => {
                      this.firstName = ref;
                    }}
                    onKeyUp={this.firstNameValidateHandler}
                  />
                  { this.state.firstNameFeedBack && this.state.email &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.firstNameFeedBack && !this.state.email &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.firstNameFeedBack && !this.state.firstName &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">First Name is required.</small>}
              </div> }
              { this.state.userData && !this.state.userData.lastName &&
              <div
                className={cx('form-group', this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}
              >
                <label className="control-label">Last Name</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-user" aria-hidden="true" />
                  </div>
                  <input
                    type="text" className="form-control" name="lastname" placeholder="Last Name"
                    ref={(ref) => {
                      this.lastName = ref;
                    }}
                    onKeyUp={this.lastNameValidateHandler}
                  />
                  { this.state.lastNameFeedBack && this.state.lastName &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.lastNameFeedBack && !this.state.lastName &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.lastNameFeedBack && !this.state.lastName &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Last Name is required.</small>}
              </div> }

              <div className="form-group">
                {this.state.userData && this.state.userData.firstName &&
                <div className="text-xs" style={{ display: 'block' }}>Name: <span
                  className="bidder-name"
                >{this.state.userData.firstName}</span></div> }
                {this.state.userData && this.state.userData.email &&
                <div className="text-xs" style={{ display: 'block' }}>Email Id : <span
                  className="bidder-email"
                >{this.state.userData.email}</span></div> }
                {this.state.userData && this.state.userData.phonenumber &&
                <div className="text-xs" style={{ display: 'block' }}>Cell Number : <span
                  className="bidder-cell valueCustom"
                >{this.state.userData.phonenumber}</span></div> }
                {this.state.userData && this.state.userData.phonenumber &&
                <div className="text-xs" style={{ display: 'block' }}>Available Tickets : <span
                  className="bidder-cell valueCustom"
                >{this.state.userData.availableTickets}</span></div> }
              </div>
              <div onChange={this.changePaymentType} id="payment-type-selection" className="form-group text-center">
                <input type="radio" name="paymenttype" autoComplete="off" defaultValue="CC" defaultChecked="checked" />
                Credit Card &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="radio" name="paymenttype" autoComplete="off" defaultValue="cash" /> Cash
              </div>
              <div className="form-group has-feedback">
                <label className="control-label">Number of tickets</label>
                <select
                  className="form-control" name="pkg" id="ticketpkgs" data-fv-field="ticketpkgs" ref={(ref) => {
                    this.raffleTicket = ref;
                  }} onChange={this.raffleTicketValidateHandler}

                >
                  <option value data-ticket={0} data-price={0}> -- Select Tickets --</option>
                  <option value={847} data-ticket={1} data-price={5}>
										1 Ticket For {this.props.currencySymbol} 5
									</option>
                  <option value={848} data-ticket={2} data-price={10}>
										2 Ticket For {this.props.currencySymbol} 10
									</option>
                  <option value={849} data-ticket={6} data-price={20}>
										6 Ticket For {this.props.currencySymbol} 20
									</option>
                  <option value={850} data-ticket={15} data-price={40}>
										15 Ticket For {this.props.currencySymbol} 40
									</option>
                  <option value={851} data-ticket={20} data-price={50}>
										20 Ticket For {this.props.currencySymbol} 50
									</option>
                  <option value={852} data-ticket={50} data-price={100}>
										50 Ticket For {this.props.currencySymbol} 100
									</option>
                </select>

                { this.state.raffleTicketFeedBack && !this.state.raffleTicket &&
                <small className="help-block" data-fv-result="NOT_VALIDATED"> Raffle Ticket required.</small>}
              </div>
              { this.state.paymentType == 'CC' &&
              <div className="cc-info">
                <style
                  dangerouslySetInnerHTML={{ __html: '\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field="expMonth"] {\n    xdisplay: none !important;\n  }\n' }}
                />
                <div className="stripe-form">
                  <div className="stripe-card-info">
                    <div
                      className={cx('form-group', this.state.cardHolderFeedBack && 'has-feedback', this.state.cardHolderFeedBack && this.state.cardHolder && 'has-success', this.state.cardHolderFeedBack && (!this.state.cardHolder) && 'has-error')}
                    >
                      <label className="control-label">Card Holder Name</label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-user" aria-hidden="true" /></div>
                        <input
                          type="text" className="form-control" id="cardname" data-stripe="name"
                          placeholder="Name on the card" data-fv-field="cardholdername"
                          ref={(ref) => {
                            this.cardHolder = ref;
                          }}
                          onKeyUp={this.cardHolderValidateHandler}
                        />
                        { this.state.cardHolderFeedBack && this.state.cardHolder &&
                        <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                        { this.state.cardHolderFeedBack && !this.state.cardHolder &&
                        <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                      </div>
                      { this.state.cardHolderFeedBack && !this.state.cardHolder &&
                      <small
                        className="help-block"
                        data-fv-result="NOT_VALIDATED"
                      >{this.state.errorMsgcardHolder}</small>}

                    </div>
                    <div
                      className={cx('form-group', this.state.cardNumberFeedBack && 'has-feedback', this.state.cardNumberFeedBack && this.state.cardNumber && 'has-success', this.state.cardNumberFeedBack && (!this.state.cardNumber) && 'has-error')}
                    >
                      <label className="control-label">Credit Card Number</label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true" />
                        </div>
                        <input
                          type="number" className="form-control field-card_number" id="cardnumber"
                          placeholder="8888-8888-8888-8888" maxLength={16} data-stripe="number"
                          required="required" data-fv-field="cardnumber"
                          ref={(ref) => {
                            this.cardNumber = ref;
                          }}
                          onKeyUp={this.cardNumberValidateHandler}
                        />
                        { this.state.cardNumberFeedBack && this.state.cardNumber &&
                        <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                        { this.state.cardNumberFeedBack && !this.state.cardNumber &&
                        <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                      </div>
                      { this.state.cardNumberFeedBack && !this.state.cardNumber &&
                      <small
                        className="help-block"
                        data-fv-result="NOT_VALIDATED"
                      >{this.state.errorMsgcardNumber}.</small>}
                    </div>

                    <div className="row">
                      <div className="col-md-8">
                        <div
                          className={cx('form-group', this.state.expMonthFeedBack && 'has-feedback', this.state.expMonthFeedBack && this.state.expMonth && 'has-success', this.state.expMonthFeedBack && (!this.state.expMonth) && 'has-error')}
                        >
                          <label className="control-label">Expiration Date</label>
                          <div className="input-group">
                            <div className="input-group-addon field-exp_month"><i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            /></div>
                            <select
                              className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth" ref={(ref) => {
                                this.expMonth = ref;
                              }} onChange={this.expMonthValidateHandler}
                            >
                              <option defaultValue value="01">Jan (01)</option>
                              <option value="02">Feb (02)</option>
                              <option value="03">Mar (03)</option>
                              <option value="04">Apr (04)</option>
                              <option value="05">May (05)</option>
                              <option value="06">Jun (06)</option>
                              <option value="07">Jul (07)</option>
                              <option value="08">Aug (08)</option>
                              <option value="09">Sep (09)</option>
                              <option value="10">Oct (10)</option>
                              <option value="11">Nov (11)</option>
                              <option value="12">Dec (12)</option>
                            </select>
                            <select
                              className data-stripe="exp_year field-exp_year" id="exp-year" data-fv-field="expYear"
                              ref={(ref) => {
                                this.expYear = ref;
                              }} onChange={this.expYearValidateHandler}
                            >
                              <option value="2017">2017</option>
                              <option value="2018">2018</option>
                              <option value="2019">2019</option>
                              <option value="2020">2020</option>
                              <option value="2021">2021</option>
                              <option value="2022">2022</option>
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                              <option value="2025">2025</option>
                              <option value="2026">2026</option>
                              <option value="2027">2027</option>
                              <option value="2028">2028</option>
                              <option value="2029">2029</option>
                              <option value="2030">2030</option>
                              <option value="2031">2031</option>
                              <option value="2032">2032</option>
                              <option value="2033">2033</option>
                              <option value="2034">2034</option>
                              <option value="2035">2035</option>
                              <option value="2036">2036</option>
                              <option value="2037">2037</option>
                              <option value="2038">2038</option>
                              <option value="2039">2039</option>
                              <option value="2040">2040</option>
                              <option value="2041">2041</option>
                              <option value="2042">2042</option>
                              <option value="2043">2043</option>
                              <option value="2044">2044</option>
                              <option value="2045">2045</option>
                              <option value="2046">2046</option>
                              <option value="2047">2047</option>
                              <option value="2048">2048</option>
                              <option value="2049">2049</option>
                              <option value="2050">2050</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className={cx('input-group', this.state.cvvFeedBack && 'has-feedback', this.state.cvvFeedBack && this.state.cvv && 'has-success', this.state.cvvFeedBack && (!this.state.cvv) && 'has-error')}
                        >
                          <label className="control-label">CVV Number</label>
                          <div className="input-group">
                            <input
                              type="number" className="form-control field-cvv" maxLength={4} size={4}
                              data-stripe="cvc" id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"
                              ref={(ref) => {
                                this.cvv = ref;
                              }}
                              onKeyUp={this.cvvValidateHandler}
                            />
                            { this.state.cvvFeedBack && this.state.cvv &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                            { this.state.cvvFeedBack && !this.state.cvv &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                          </div>
                          { this.state.cvvFeedBack && !this.state.cvv &&
                          <small className="help-block" data-fv-result="NOT_VALIDATED">{ this.state.errorMsgcvv }</small>}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> }
              <div className="form-group">
                <Button loading={this.state.loading} type="submit" className="btn btn-block btn-success submit">Submit</Button>
              </div>
            </form>
            <div className="form-group text-center">
              <button
                className="btn btn-default" onClick={() => {
                  this.setActiveView('select-action');
                }}
              >Back
							</button>
            </div>
          </view> }
          { this.state.activeViews === 'submit-raffle-tickets' &&
          <view
            name="submit-raffle-tickets"
            className={cx(this.state.activeViews === 'submit-raffle-tickets' && s.active)}
          >
            <h4 className="text-center"><strong>Submit Raffle Tickets</strong></h4>
            <form
              className="ajax-form validated fv-form fv-form-bootstrap"
              action="/AccelEventsWebApp/events/jkazarian8/volunteer/submit-tickets" method="POST"
              data-validation-fields="getRaffleSubmitValidationFields" data-onsuccess="handleBidSuccess"
              data-validate-function="validateForm" data-switch-view="select-action"
              data-view-name="submit-raffle-tickets" noValidate="novalidate"
              onSubmit={this.submitTicketsbid}
            >
              <div
                className={cx('form-group', this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}
              >
                <input
                  type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                  className="form-control mrg-t-lg bidder-email" data-fv-field="email" ref={(ref) => {
                    this.email = ref;
                  }}
                  onKeyUp={this.emailValidateHandler}
                  onBlur={this.checkAuctionUser}
                  disabled={!this.state.emailEnable}
                />
                { this.state.emailFeedBack && this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                { this.state.emailFeedBack && !this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                { this.state.emailFeedBack && !this.state.emailValue &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Bidder email can't be empty.</small>}
                { this.state.emailFeedBack && !this.state.email &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
                <small className="message text-success">{this.state.errorMsgEmailCheck}</small>
              </div>
              <div className={cx('form-group', this.state.phoneNumberFeedBack && 'has-feedback', this.state.phoneNumberFeedBack && this.state.phoneNumber && 'has-success', this.state.phoneNumberFeedBack && (!this.state.phoneNumber) && 'has-error')}>
                <label className="control-label">Cell Number</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-phone" aria-hidden="true" />
                  </div>
                  <IntlTelInput
                    css={['intl-tel-input', 'form-control intl-tel']}
                    utilsScript="./libphonenumber.js"
                    separateDialCode
                    autoPlaceholder={false}
                    placeholder={"Bidder Cell Number"}
                    defaultCountry={this.props.country || ""}
                    value={this.state.phone || ''}
                    onPhoneNumberChange={this.changePhone}
                    onPhoneNumberBlur={this.checkMobileUser}
                    disabled={!this.state.phoneEnable}
                  />
                  { this.state.phoneNumberFeedBack && this.state.phoneNumber &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                <small
                  className="help-block"
                  data-fv-result="NOT_VALIDATED"
                >{this.state.errorMsgPhoneNumber}</small>}
                <small className="message text-success">{this.state.errorMsgEmailCheck}</small>
              </div>
              { !this.state.userData && this.state.email &&
              <div>
                <div
                  className={cx('form-group', this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}
                >
                  <label className="control-label">First Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true" />
                    </div>
                    <input
                      type="text" className="form-control" name="firstname" placeholder="First Name"
                      ref={(ref) => {
                        this.firstName = ref;
                      }}
                      onKeyUp={this.firstNameValidateHandler}
                    />
                    { this.state.firstNameFeedBack && this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.firstNameFeedBack && !this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                  </div>
                  { this.state.firstNameFeedBack && !this.state.firstName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">First Name is required.</small>}
                </div>
                <div
                  className={cx('form-group', this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}
                >
                  <label className="control-label">Last Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true" />
                    </div>
                    <input
                      type="text" className="form-control" name="lastname" placeholder="Last Name"
                      ref={(ref) => {
                        this.lastName = ref;
                      }}
                      onKeyUp={this.lastNameValidateHandler}
                    />
                    { this.state.lastNameFeedBack && this.state.lastName &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.lastNameFeedBack && !this.state.lastName &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                  </div>
                  { this.state.lastNameFeedBack && !this.state.lastName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">Last Name is required.</small>}
                </div>
              </div> }

              { this.state.userData && !this.state.userData.firstName &&
              <div
                className={cx('form-group', this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}
              >
                <label className="control-label">First Name</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-user" aria-hidden="true" />
                  </div>
                  <input
                    type="text" className="form-control" name="firstname" placeholder="First Name"
                    ref={(ref) => {
                      this.firstName = ref;
                    }}
                    onKeyUp={this.firstNameValidateHandler}
                  />
                  { this.state.firstNameFeedBack && this.state.email &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.firstNameFeedBack && !this.state.email &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.firstNameFeedBack && !this.state.firstName &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">First Name is required.</small>}
              </div> }
              { this.state.userData && !this.state.userData.lastName &&
              <div
                className={cx('form-group', this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}
              >
                <label className="control-label">Last Name</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-user" aria-hidden="true" />
                  </div>
                  <input
                    type="text" className="form-control" name="lastname" placeholder="Last Name"
                    ref={(ref) => {
                      this.lastName = ref;
                    }}
                    onKeyUp={this.lastNameValidateHandler}
                  />
                  { this.state.lastNameFeedBack && this.state.lastName &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.lastNameFeedBack && !this.state.lastName &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.lastNameFeedBack && !this.state.lastName &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Last Name is required.</small>}
              </div> }

              <div className="form-group">
                {this.state.userData && this.state.userData.firstName &&
                <div className="text-xs" style={{ display: 'block' }}>Name: <span
                  className="bidder-name"
                >{this.state.userData.firstName}</span></div> }
                {this.state.userData && this.state.userData.email &&
                <div className="text-xs" style={{ display: 'block' }}>Email Id : <span
                  className="bidder-email"
                >{this.state.userData.email}</span></div> }
                {this.state.userData && this.state.userData.phonenumber &&
                <div className="text-xs" style={{ display: 'block' }}>Cell Number : <span
                  className="bidder-cell valueCustom"
                >{this.state.userData.phonenumber}</span></div> }
                {this.state.userData && this.state.userData.availableTickets &&
                <div className="text-xs" style={{ display: 'block' }}>Available Tickets : <span
                  className="bidder-cell valueCustom"
                >{this.state.userData.availableTickets}</span></div> }
              </div>
              <div
                className={cx('form-group ', this.state.itemCodeFeedBack && 'has-feedback', this.state.itemCodeFeedBack && this.state.itemCode && 'has-success', this.state.itemCodeFeedBack && (!this.state.itemCode) && 'has-error')}
              >
                <input
                  className="form-control mrg-t-lg alpha-only"
                  type="text" maxLength={3} name="itemCodee" placeholder="Item Code" autoComplete="off"
                  ref={(ref) => {
                    this.itemCode = ref;
                  }}
                  onKeyUp={this.getAuctionItem}
                />
                { this.state.itemCodeFeedBack && this.state.itemCode &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                { this.state.itemCodeFeedBack && !this.state.itemCode &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                { this.state.itemCodeFeedBack && !this.state.itemCodeValue &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Item code is required.</small>}
              </div>
              <h5
                id="infoMessage"
                className="text-danger"
              > { this.state.itemStatusMsg == 0 && 'Invalid Item Code' } </h5>
              { this.state.itemData &&
              <div className="form-group">
                <div className="text-xs">Item Name : <span className="item-name" /> {this.state.itemData.itemName} </div>
                <div className="text-xs"># Of Tickets Submitted: <span
                  className="currency-symbol"
                >{this.props.currencySymbol}</span> {this.state.itemData.buyItNow}<span
                  className="buy-it-now"
                /></div>
              </div> }

							<div
								className={cx("form-group", this.state.availTicketsFeedBack && 'has-feedback', this.state.availTicketsFeedBack && this.state.availTickets && 'has-success', this.state.availTicketsFeedBack && (!this.state.availTickets) && 'has-error')}>


                <NumericInput className="form-control" name="tickets" id="tickets"
                       placeholder="Number Of Ticket"
                       data-isprocessingfeestopurchaser="false" data-fv-field="tickets" style={ false }
                       onChange={this.availTicketsValidateHandler}
                       value={ this.state.submittedTickets }/>
                { this.state.availTicketsFeedBack && this.state.availTickets &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                { this.state.availTicketsFeedBack && !this.state.availTickets &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                { this.state.availTicketsFeedBack && !this.state.amountValue &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">Please enter tickets you want to submit.</small>}
                { this.state.availTicketsFeedBack && !this.state.availTickets &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgAvailTickets}</small>}
							</div>
							<div className="form-group">
								<Button loading={this.state.loading} type="submit" className="btn btn-block btn-success submit">Submit</Button>
							</div>
						</form>
						<div className="form-group text-center">
							<button className="btn btn-default" onClick={() => {
                this.setActiveView('select-action');
                }}
              >Back
              </button>
            </div>
          </view> }
          { this.state.activeViews === 'purchase-event-tickets' &&
          <view
            name="purchase-event-tickets"
            className={cx(this.state.activeViews === 'purchase-event-tickets' && s.active)}
          >
            <h4 className="text-center"><strong>Sell Event Tickets</strong></h4>
            <div className="order-form">
              <form method="POST">
                <div className="ticket-type-container">
                <label className="center-block text-center mrg-t-lg">Select payment option</label>
                    <div onChange={this.changePaymentType} id="payment-type-selection" className="form-group text-center">
                      <input type="radio" name="paymenttype" autoComplete="off" defaultValue="CC" defaultChecked="checked" />
      								Credit Card &nbsp; &nbsp; &nbsp; &nbsp;
      								<input type="radio" name="paymenttype" autoComplete="off" defaultValue="cash" /> Cash
      							</div>
                  {
                    this.state.settings && this.state.settings.tickeTypes && (this.state.settings.tickeTypes).map(item =>
                      <div className="sale-card" key={item.typeId.toString()}>
                        <div className="flex-row">
                          <div className="flex-col">
                            <div className="type-name"><strong>{item.name}</strong>
                              (<span className="type-cost txt-sm gray"> {this.props.currencySymbol}{item.price && item.price.toFixed(2)}</span>)
                              <div className="pull-right">
                                { item.remaniningTickets && item.remaniningTickets > 0 ?
                                  <select
                                    className="form-control" name={item.typeId} data-price={item.price}
                                    disabled={moment(item.endDate).diff(moment()) <= 0}
                                    onChange={this.selectHandle}
                                    value={this.state.totalTickets && this.state.totalTickets[item.typeId] && this.state.totalTickets[item.typeId].numberofticket ? this.state.totalTickets[item.typeId].numberofticket : 0}
                                  >
                                    {makeItem(item.remaniningTickets > 10 ? 10 : item.remaniningTickets).map(item => item)}
                                  </select> : ''}
                                {
                                  (!item.remaniningTickets || item.remaniningTickets <= 0) && <span className="sold-out-text"> SOLD OUT </span>
                                }
                              </div>
                            </div>
                            <div
                              className="sale-text txt-sm text-uppercase"
                            > {moment(item.endDate).diff(moment()) > 0 ? 'Available until ' : 'Sale Ended on '}
                              <Moment format="MMMM D YYYY">{item.endDate}</Moment></div>
                            {item.ticketsPerTable && item.ticketsPerTable > 0 ?
                              <div className="sale-text txt-sm text-uppercase">Each table has {item.ticketsPerTable}
                                tickets</div> : ''}
                            {item.enableTicketDescription && <div className="txt-sm gray type-desc">
                              {item.ticketTypeDescription}
                             </div>}
                          </div>
                        </div>
                      </div>,
                    )
                  }
                  <div className="status-bar clearfix mrg-t-lg">
                    <div className="pull-left">
                      <span> QTY:<span className="qty">{this.state.totalTicketQty}</span> </span>
                      <span
                        className="total-price"
                      >{this.state.totalTicketPrice ? this.props.currencySymbol : ''} {this.state.totalTicketPrice ? this.state.totalTicketPrice.toFixed(2) : 'FREE'}</span>
                    </div>
                    <div className="pull-right">
                      <button type="button" className="btn btn-success" id="checkout-tickets" onClick={this.doOrderTicket}>
                        PROCEED TO CHECKOUT
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="order-info" style={{ display: 'none' }}>
                <div className="content" />
              </div>
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-default" onClick={() => {
                  this.setActiveView('select-action');
                }}
              >Back
							</button>
            </div>
          </view> }
          { this.state.activeViews === 'purchase-event-tickets-checkout' &&
          <view
            name="purchase-event-tickets-checkout"
            className={cx(this.state.activeViews === 'purchase-event-tickets-checkout' && s.active)}
          >
            <h4 className="text-center"><strong>Sell Event Tickets</strong></h4>
            <TicketCheckout eventUrl={this.state.eventUrl} orderId={this.state.orderId} isVoluneer={true} />
            <div className="form-group text-center">
              <button
                className="btn btn-default" onClick={() => {
                  this.setActiveView('select-action');
                }}
              >Back
							</button>
            </div>
          </view> }
          { this.state.activeViews === 'ticket-checkout-tickets' &&
          <view
            name="ticket-checkout-tickets"
            className={cx(this.state.activeViews === 'ticket-checkout-tickets' && s.active)}
          >
            <div className="tickts" />
            <div className="form-group text-center">
              <button
                className="btn btn-default" onClick={() => {
                  this.setActiveView('select-action');
                }}
              >Back
							</button>
            </div>
          </view> }
          { this.state.activeViews === 'event-ticketing' &&
          <view name="event-ticketing" className={cx(this.state.activeViews === 'event-ticketing' && s.active)}>
            <h4 className="text-center"><strong>Check in attendees</strong></h4>
            <input
              type="text" className="filter-attendee input-lg form-control" placeholder="Search..."
              ref={(ref) => {
                this.attendeesFilter = ref;
              }}
              onKeyUp={this.attendeesFilterHandler}
            />
            {this.state.attendees ?  <ul className="list-group attendees-list">
              {this.state.attendees ?
								this.state.attendees.attendees.filter(({ firstName, lastName }) => (`${firstName} ${lastName}`).includes(this.state.attendeesFilter) || this.state.attendeesFilter == null || this.state.attendeesFilter == '').map((item, index) =>
  <AttendeesList
    key={index} index={index} items={item}
    setAttendeesClickHandler={this.setAttendeesHandler}
  />,
								) : 'Loading  ....'
							}
            </ul> : <div className="text-center"><span className="fa fa-spinner fa-3x mrg-t-lg fa-pulse fa-fw"/></div> }
            <div className="form-group text-center">
              <button
                className="btn btn-default" onClick={() => {
                  this.setActiveView('select-action');
                }}
              >Back
							</button>
            </div>
          </view> }
          { this.state.activeViews === 'donate' &&
          <view name="donate" className={cx(this.state.activeViews === 'donate' && s.active)}>
            <h4 className="text-center"><strong>Donate</strong></h4>
            <form
              className="ajax-form validated fv-form fv-form-bootstrap" method="POST"
              action="/AccelEventsWebApp/events/jkazarian8/volunteer/donate"
              data-validation-fields="getDonateValidationFields" data-onsuccess="handleBidSuccess"
              data-validate-function="validateForm" data-switch-view="select-action" data-view-name="donate"
              noValidate="novalidate"
              onSubmit={this.submitDonatebid}
            >
              <div
                className={cx('form-group', this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}
              >
                <input
                  type="text" name="email" placeholder="Bidder Email ID" autoComplete="off"
                  className="form-control mrg-t-lg bidder-email" data-fv-field="email" ref={(ref) => {
                    this.email = ref;
                  }}
                  onKeyUp={this.emailValidateHandler}
                  onBlur={this.checkAuctionUser}
                />
                { this.state.emailFeedBack && this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                { this.state.emailFeedBack && !this.state.email &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                { this.state.emailFeedBack && !this.state.emailValue &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Bidder email can't be empty.</small>}
                { this.state.emailFeedBack && !this.state.email &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
                <small className="message text-success">{this.state.errorMsgEmailCheck}</small>
              </div>

              { !this.state.userData &&
              <div>
                <div className={cx('form-group', this.state.phoneNumberFeedBack && 'has-feedback', this.state.phoneNumberFeedBack && this.state.phoneNumber && 'has-success', this.state.phoneNumberFeedBack && (!this.state.phoneNumber) && 'has-error')}>
                  <label className="control-label">Cell Number</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-phone" aria-hidden="true" />
                    </div>
                    <IntlTelInput
                      css={['intl-tel-input', 'form-control intl-tel']}
                      utilsScript="./libphonenumber.js"
                      separateDialCode
                      autoPlaceholder={false}
                      placeholder={"Bidder Cell Number"}
                      defaultCountry={this.props.country || ""}
                      value={this.state.phone || ''}
                      onPhoneNumberChange={this.changePhone}
                    />
                    { this.state.phoneNumberFeedBack && this.state.phoneNumber &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                  </div>
                  { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                  <small
                    className="help-block"
                    data-fv-result="NOT_VALIDATED"
                  >{this.state.errorMsgPhoneNumber}</small>}
                </div>
                <div
                  className={cx('form-group', this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}
                >
                  <label className="control-label">First Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true" />
                    </div>
                    <input
                      type="text" className="form-control" name="firstname" placeholder="First Name"
                      ref={(ref) => {
                        this.firstName = ref;
                      }}
                      onKeyUp={this.firstNameValidateHandler}
                    />
                    { this.state.firstNameFeedBack && this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                    { this.state.firstNameFeedBack && !this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                  </div>
                  { this.state.firstNameFeedBack && !this.state.firstName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">First Name is required.</small>}
                </div>
                <div
                  className={cx('form-group', this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}
                >
                  <label className="control-label">Last Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true"/>
                    </div>
                    <input type="text" className="form-control" name="lastname" placeholder="Last Name"
                           ref={ref => {
                             this.lastName = ref;
                           }}
                           onKeyUp={this.lastNameValidateHandler}/>
                    { this.state.lastNameFeedBack && this.state.lastName &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                    { this.state.lastNameFeedBack && !this.state.lastName &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                  </div>
                  { this.state.lastNameFeedBack && !this.state.lastName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">Last Name is required.</small>}
                </div>
              </div> }
              { this.state.userData && !this.state.userData.phonenumber &&
              <div className={cx('form-group', this.state.phoneNumberFeedBack && 'has-feedback', this.state.phoneNumberFeedBack && this.state.phoneNumber && 'has-success', this.state.phoneNumberFeedBack && (!this.state.phoneNumber) && 'has-error')}>
                <label className="control-label">Cell Number</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-phone" aria-hidden="true" />
                  </div>
                  <IntlTelInput
                    css={['intl-tel-input', 'form-control intl-tel']}
                    utilsScript="./libphonenumber.js"
                    separateDialCode
                    autoPlaceholder={false}
                    placeholder={"Bidder Cell Number"}
                    defaultCountry={this.props.country || ""}
                    value={this.state.phone || ''}
                    onPhoneNumberChange={this.changePhone}
                  />
                  { this.state.phoneNumberFeedBack && this.state.phoneNumber &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok" />}
                  { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove" />}
                </div>
                { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                <small
                  className="help-block"
                  data-fv-result="NOT_VALIDATED"
                >{this.state.errorMsgPhoneNumber}</small>}
              </div> }
              { this.state.userData && !this.state.userData.firstName &&
              <div
                className={cx('form-group', this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}
              >
                <label className="control-label">First Name</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-user" aria-hidden="true" />
                  </div>
                  <input
                    type="text" className="form-control" name="firstname" placeholder="First Name"
                    ref={(ref) => {
                      this.firstName = ref;
                    }}
                    onKeyUp={this.firstNameValidateHandler}
                  />
                  { this.state.firstNameFeedBack && this.state.email &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                  { this.state.firstNameFeedBack && !this.state.email &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                </div>
                { this.state.firstNameFeedBack && !this.state.firstName &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">First Name is required.</small>}
              </div> }
              { this.state.userData && !this.state.userData.lastName &&
              <div
                className={cx("form-group", this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}>
                <label className="control-label">Last Name</label>
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-user" aria-hidden="true"/>
                  </div>
                  <input type="text" className="form-control" name="lastname" placeholder="Last Name"
                         ref={ref => {
                           this.lastName = ref;
                         }}
                         onKeyUp={this.lastNameValidateHandler}/>
                  { this.state.lastNameFeedBack && this.state.lastName &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                  { this.state.lastNameFeedBack && !this.state.lastName &&
                  <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                </div>
                { this.state.lastNameFeedBack && !this.state.lastName &&
                <small className="help-block" data-fv-result="NOT_VALIDATED">Last Name is required.</small>}
              </div>  }

							<div className="form-group">
								{this.state.userData && this.state.userData.firstName &&
								<div className="text-xs" style={{display: 'block'}}>Name: <span
									className="bidder-name">{this.state.userData.firstName}</span></div> }
								{this.state.userData && this.state.userData.email &&
								<div className="text-xs" style={{display: 'block'}}>Email Id : <span
									className="bidder-email">{this.state.userData.email}</span></div> }
								{this.state.userData && this.state.userData.phonenumber &&
								<div className="text-xs" style={{display: 'block'}}>Cell Number : <span
									className="bidder-cell valueCustom">{this.state.userData.phonenumber}</span></div> }
							</div>
              <div onChange={this.changePaymentType} id="payment-type-selection" className="form-group text-center">
                <input type="radio" name="paymenttype" autoComplete="off" defaultValue="CC" defaultChecked="checked" />
                Credit Card &nbsp; &nbsp; &nbsp; &nbsp;
                <input type="radio" name="paymenttype" autoComplete="off" defaultValue="cash"  /> Cash
              </div>
							<div
								className={cx("form-group", this.state.amountFeedBack && 'has-feedback', this.state.amountFeedBack && this.state.amount && 'has-success', this.state.amountFeedBack && (!this.state.amount) && 'has-error')}>
								<div className="row">
									<div className="col-md-12">
										<div className="input-group">
											<div className="input-group-addon">{this.props.currencySymbol}</div>

                      <NumericInput className="form-control" name="itembid" id="itembid"
                             placeholder="Amount" precision={2} step={0.1}
                             data-isprocessingfeestopurchaser="false" data-fv-field="itembid" style={ false }
                             onChange={this.amountValidateHandler}
                             value={ this.state.amountValue }/>
											{ this.state.amountFeedBack && this.state.amount &&
											<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
											{ this.state.amountFeedBack && !this.state.amount &&
											<i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
										</div>
                    { this.state.amountFeedBack && !this.state.amountValue &&
                      <small className="help-block" data-fv-result="NOT_VALIDATED">Donation Amount can not be empty</small>}
										{ this.state.amountFeedBack && !this.state.amount &&
										<small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgAmount}</small>}
									</div>
								</div>
							</div>
              { this.state.paymentType == "CC" &&
                <div className="cc-info">
                  <style
                    dangerouslySetInnerHTML={{__html: "\n  .expiration-date .form-control-feedback {\n    xdisplay: inline !important;\n  }\n  .expiration-date .form-control-feedback[data-bv-field=\"expMonth\"] {\n    xdisplay: none !important;\n  }\n"}}/>
                  <div className="stripe-form">
                    <div className="stripe-card-info">
                      <div
                        className={cx("form-group", this.state.cardHolderFeedBack && 'has-feedback', this.state.cardHolderFeedBack && this.state.cardHolder && 'has-success', this.state.cardHolderFeedBack && (!this.state.cardHolder) && 'has-error')}>
                        <label className="control-label">Card Holder Name</label>
                        <div className="input-group">
                          <div className="input-group-addon"><i className="fa fa-user" aria-hidden="true"/></div>
                          <input type="text" className="form-control" id="cardname" data-stripe="name"
                                 placeholder="Name on the card" data-fv-field="cardholdername"
                                 ref={ref => {
                                   this.cardHolder = ref;
                                 }}
                                 onKeyUp={this.cardHolderValidateHandler}/>
                          { this.state.cardHolderFeedBack && this.state.cardHolder &&
                          <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                          { this.state.cardHolderFeedBack && !this.state.cardHolder &&
                          <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                        </div>
                        { this.state.cardHolderFeedBack && !this.state.cardHolder &&
                        <small className="help-block"
                               data-fv-result="NOT_VALIDATED">{this.state.errorMsgcardHolder}</small>}

                      </div>
                      <div
                        className={cx("form-group", this.state.cardNumberFeedBack && 'has-feedback', this.state.cardNumberFeedBack && this.state.cardNumber && 'has-success', this.state.cardNumberFeedBack && (!this.state.cardNumber) && 'has-error')}>
                        <label className="control-label">Credit Card Number</label>
                        <div className="input-group">
                          <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true"/>
                          </div>
                          <input type="number" className="form-control field-card_number" id="cardnumber"
                                 placeholder="8888-8888-8888-8888" maxLength={16} data-stripe="number"
                                 required="required" data-fv-field="cardnumber"
                                 ref={ref => {
                                   this.cardNumber = ref;
                                 }}
                                 onKeyUp={this.cardNumberValidateHandler}/>
                          { this.state.cardNumberFeedBack && this.state.cardNumber &&
                          <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                          { this.state.cardNumberFeedBack && !this.state.cardNumber &&
                          <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                        </div>
                        { this.state.cardNumberFeedBack && !this.state.cardNumber &&
                        <small className="help-block"
                               data-fv-result="NOT_VALIDATED">{this.state.errorMsgcardNumber}.</small>}
                      </div>

                      <div className="row">
                        <div className="col-md-8">
                          <div
                            className={cx("form-group", this.state.expMonthFeedBack && 'has-feedback', this.state.expMonthFeedBack && this.state.expMonth && 'has-success', this.state.expMonthFeedBack && (!this.state.expMonth) && 'has-error')}>
                            <label className="control-label">Expiration Date</label>
                            <div className="input-group">
                              <div className="input-group-addon field-exp_month"><i className="fa fa-calendar"
                                                                                    aria-hidden="true"/></div>
                              <select className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth" ref={ref => {
                                this.expMonth = ref;
                              }}  onChange={this.expMonthValidateHandler} >
                                <option defaultValue value="01">Jan (01)</option>
                                <option value="02">Feb (02)</option>
                                <option value="03">Mar (03)</option>
                                <option value="04">Apr (04)</option>
                                <option value="05">May (05)</option>
                                <option value="06">Jun (06)</option>
                                <option value="07">Jul (07)</option>
                                <option value="08">Aug (08)</option>
                                <option value="09">Sep (09)</option>
                                <option value="10">Oct (10)</option>
                                <option value="11">Nov (11)</option>
                                <option value="12">Dec (12)</option>
                              </select>
                              <select className data-stripe="exp_year field-exp_year" id="exp-year" data-fv-field="expYear"
                                      ref={ref => {
                                        this.expYear = ref;
                                      }} onChange={this.expYearValidateHandler} >
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                <option value="2031">2031</option>
                                <option value="2032">2032</option>
                                <option value="2033">2033</option>
                                <option value="2034">2034</option>
                                <option value="2035">2035</option>
                                <option value="2036">2036</option>
                                <option value="2037">2037</option>
                                <option value="2038">2038</option>
                                <option value="2039">2039</option>
                                <option value="2040">2040</option>
                                <option value="2041">2041</option>
                                <option value="2042">2042</option>
                                <option value="2043">2043</option>
                                <option value="2044">2044</option>
                                <option value="2045">2045</option>
                                <option value="2046">2046</option>
                                <option value="2047">2047</option>
                                <option value="2048">2048</option>
                                <option value="2049">2049</option>
                                <option value="2050">2050</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div
                            className={cx("input-group", this.state.cvvFeedBack && 'has-feedback', this.state.cvvFeedBack && this.state.cvv && 'has-success', this.state.cvvFeedBack && (!this.state.cvv) && 'has-error')}>
                            <label className="control-label">CVV Number</label>
                            <div className="input-group">
                              <input type="number" className="form-control field-cvv" maxLength={4} size={4}
                                     data-stripe="cvc" id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"
                                     ref={ref => {
                                       this.cvv = ref;
                                     }}
                                     onKeyUp={this.cvvValidateHandler}/>
                              { this.state.cvvFeedBack && this.state.cvv &&
                              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                              { this.state.cvvFeedBack && !this.state.cvv &&
                              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                            </div>
                            { this.state.cvvFeedBack && !this.state.cvv &&
                            <small className="help-block" data-fv-result="NOT_VALIDATED">{ this.state.errorMsgcvv  }</small>}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> }
							<div className="form-group">
								<Button loading={this.state.loading} type="submit" className="btn btn-block btn-success submit">Submit</Button>
							</div>
						</form>
						<div className="form-group text-center">
							<button className="btn btn-default" onClick={() => {
                this.setActiveView('select-action')
              }}>Back
							</button>
						</div>
					</view> }
				</views>}
				{this.state.isloaded && !this.props.is_volunteer && <div>
					<h3>This tab is only visible to event hosts and event volunteers</h3>
				</div>}
				<PopupModel
					id="bookingPopup"
					showModal={this.state.showPopup}
					headerText={<p>{this.state.popupHeader}</p>}
					modelBody=''
					onCloseFunc={this.hidePopup}
				>

					<div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>
						{ this.state && this.state.errorMsgCard }
						<div className="modal-footer">
							{/*<button className="btn btn-success">Confirm</button>*/}
							<button className="btn btn-success" onClick={this.hidePopup}>Close</button>
						</div>
					</div>

				</PopupModel>

        <ProgressIndicator showLoader={this.state.loading } />
			</div>
		);
	}
}
class AttendeesList extends React.Component {
	render() {
		return (
			<li className="list-group-item checked-in"
			    onClick={ ()=>{this.props.setAttendeesClickHandler(this.props.items,this.props.index)}}>
				<span className="name">{this.props.items.firstName + " " + this.props.items.lastName }</span>
				<span
					className={cx("status pull-right btn ", this.props.items && this.props.items.status === "Checked In" ? "btn-success" : 'btn-warning')}>{this.props.items && this.props.items.status === "Checked In" ? "Checked In" : "Registered"  }</span>
			</li>
		);
	}
}
const mapDispatchToProps = {
  doGetEventData: (eventUrl) => doGetEventData(eventUrl),
  getItemStatusByCode: (eventUrl, itemCode,module) => getItemStatusByCode(eventUrl, itemCode,module),
  getAttendees: (eventUrl) => getAttendees(eventUrl),
  getUserByEmail: (eventUrl, itemCode,modeltype) => getUserByEmail(eventUrl, itemCode,modeltype),
  getUserByMobile: (eventUrl, mobile,countryCode,modeltype) => getUserByMobile(eventUrl, mobile,countryCode,modeltype),
  setAttendees: (eventUrl, barcode,status) => setAttendees(eventUrl, barcode,status),
  getAuctionItemStatusByCode: (eventUrl, itemCode) => getAuctionItemStatusByCode(eventUrl, itemCode),
  submitBids: (eventUrl, userData) => submitBids(eventUrl, userData),
  submitPledge: (eventUrl, userData) => submitPledge(eventUrl, userData),
  sellTickets: (eventUrl, userData) => sellTickets(eventUrl, userData),
  submitTickets: (eventUrl, userData) => submitTickets(eventUrl, userData),
  submitDonate: (eventUrl, userData) => submitDonate(eventUrl, userData),
	isVolunteer: (eventUrl) => isVolunteer(eventUrl),
	doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
  doOrderTicket: (eventUrl, dto) => doOrderTicket(eventUrl, dto),
  doValidateMobileNumber: (mobileNumber) => doValidateMobileNumber(mobileNumber),
  getCardToken: (stripeKey, cardNumber, expMonth, expYear, cvc) => getCardToken(stripeKey, cardNumber, expMonth, expYear, cvc),
};
const mapStateToProps = (state) => ({
	is_volunteer : state.event && state.event.is_volunteer,
	stripeKey: state.event && state.event.data && state.event.data.stripeKey,
  eventData: state.event && state.event.data,
	currencySymbol: state.event && state.event.currencySymbol || "$",
	country: state.location && state.location.data && state.location.data.country && state.location.data.country.toLowerCase(),
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Volunteer));
