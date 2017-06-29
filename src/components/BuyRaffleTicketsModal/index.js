import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';
import cx from 'classnames';
import {connect} from 'react-redux';
import s from './../../routes/login/Login.css';
import Link from './../Link';
import { doLogin,doSignUp,doValidateMobileNumber,purchaseTickets,doGetEventData,doGetSettings} from './../../routes/event/action/index';
import {Modal, Popover, OverlayTrigger, Tooltip} from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import IntlTelInput from 'react-intl-tel-input';
import PopupModel from '../../components/PopupModal';
import LoginModal from '../../components/LoginModal';

class BuyRaffleTicketsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'The Event',
      showBookingTicketPopup: false,
      showMapPopup: true,
      firstNameFeedBack: false,
      ticketsFeedBack: false,
      lastNameFeedBack: false,
      showAlertPopup : false,
      showTicketsPopup : false,
      errorMsgCard:null,
      isValidData: false,
      email: null,
      password: null,
      error: null,
      emailFeedBack: false,
      passwordFeedBack: false,
      auctionData: null,
      isValidBidData: false,
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
      phoneNumber: null,
      popupHeader:null,
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
      passwordValue:null,
      phoneNumberValue:null,
      tickets:null,
      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
      expYearFeedBack: false,
      expMonthFeedBack: false,
      amountFeedBack: false,
      cvvFeedBack: false,
      phoneNumberFeedBack: false,
      errorReg: null,
      errorMsgfirstName: null,
      errorMsglastName: null,
      errorMsgcardNumber: null,
      errorMsgcardHolder: null,
      errorMsgamount: null,
      errorMsgNumber: null,
      errorMsgcvv: null,
      errorMsgEmail: null,
      errorMsgPhoneNumber: null,
      errorMsg: null,
      errorMsgTickets:null,
      showPopup: false,
      stripeToken:null,
      submittedTickets:null,
      raffleTicketValue:null,
      popupTicketHeader: "Pay Now",
      loading:false,
      countryPhone:null,
      phone:null,
      isError:false,
    };
  //  this.purchaseTicket=this.purchaseTicket.bind(this);
   }
  componentWillMount() {
    this.changePhone = this.phoneNumberValidateHandler.bind(this, 'phone');
    Stripe.setPublishableKey(this.props.stripeKey || 'pk_test_VEOlEYJwVFMr7eSmMRhApnJs');
  }
  componentWillReceiveProps(){

       this.setState({
      showBookingTicketPopup: false,
      showMapPopup: true,
      firstNameFeedBack: false,
      ticketsFeedBack: false,
      lastNameFeedBack: false,
      showAlertPopup : false,
      showTicketsPopup : false,
      errorMsgCard:null,
      isValidData: false,
      email: null,
      password: null,
      error: null,
      emailFeedBack: false,
      passwordFeedBack: false,
      auctionData: null,
      isValidBidData: false,
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
      phoneNumber: null,
      popupHeader:null,
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
      passwordValue:null,
      phoneNumberValue:null,
      tickets:null,
      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
      expYearFeedBack: false,
      expMonthFeedBack: false,
      amountFeedBack: false,
      cvvFeedBack: false,
      phoneNumberFeedBack: false,
      errorReg: null,
      errorMsgfirstName: null,
      errorMsglastName: null,
      errorMsgcardNumber: null,
      errorMsgcardHolder: null,
      errorMsgamount: null,
      errorMsgNumber: null,
      errorMsgcvv: null,
      errorMsgEmail: null,
      errorMsgPhoneNumber: null,
      errorMsg: null,
      errorMsgTickets:null,
      showPopup: false,
      stripeToken:null,
      submittedTickets:null,
      raffleTicketValue:null,
      popupTicketHeader: "Pay Now",
      loading:false,
      countryPhone:null,
      phone:null,
      isError:false,
    })
  }

onFormClick = (e) => {
  e.preventDefault();

  if (this.state.isValidData) {
  }

};

emailValidateHandler = (e) => {

  this.setState({
    emailFeedBack: true,
    emailValue:this.email.value.trim(),
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
  this.setState({isValidData: !!(this.email.value.trim() && this.password.value.trim())});

};
passwordValidateHandler = (e) => {

  this.setState({
    passwordFeedBack: true,
    passwordValue:this.password.value.trim(),
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
    firstNameValue:this.firstName.value.trim()
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
  // this.setState({isValidBidData: !!(this.state.firstNameFeedBack && this.state.lastNameFeedBack && this.state.cardNumberFeedBack && this.state.cardHolderFeedBack && this.state.amountFeedBack && this.state.cvvFeedBack)});

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
cardHolderValidateHandler = (e) => {

  this.setState({
    cardHolderFeedBack: true,
    cardHolderValue:this.cardHolder.value,
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
  //this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});

};
cardNumberValidateHandler = (e) => {
  this.setState({
    cardNumberFeedBack: true,
    cardNumberValue:this.cardNumber.value,
  });
  if (this.cardNumber.value.trim() == '') {
    this.setState({
      cardNumber: false,
      errorMsgcardNumber: "Enter Card Number ",
    });
  } else if (this.cardNumber.value.trim().length !== 16 && this.cardNumber.value.trim().length !== 15) {
    this.setState({
      cardNumber: false,
      errorMsgcardNumber: " Please enter a Valid Card Number ",
    });
  } else {
    this.setState({
      cardNumber: true
    });
  }
  //  this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});
};
cvvValidateHandler = (e) => {

  this.setState({
    cvvFeedBack: true,
    cvvValue:this.cvv.value.trim(),
  });

  if (this.cvv.value.trim() == '') {

    this.setState({
      cvv: false,
      errorMsgcvv: "The CVV is required and can't be empty",
    });
  } else if (!( 3 <= this.cvv.value.trim().length && 4 >= this.cvv.value.trim().length )) {
    this.setState({
      cvv: false,
      errorMsgcvv: "The CVV must be more than 4 and less than 3 characters long",
    });
  } else {
    this.setState({
      cvv: true
    });
  }
  //this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});
};
phoneNumberValidateHandler(name, isValid, value, countryData, number, ext) {
  console.log(isValid, value, countryData, number, ext);
  this.setState({
    phone: value,
    countryPhone:countryData.iso2,
    phoneNumberFeedBack: true,
    errorMsgPhoneNumber :"",
  },function afterTitleChange () {
    this.checkIsValidBidData()
  });
  if (value == '') {
    this.setState({
      phoneNumber: false,
      errorMsgPhoneNumber: "phoneNumber is Require",
    },function afterTitleChange () {
      this.checkIsValidBidData()
    });
  }else{
    this.props.doValidateMobileNumber(number).then(resp => {
      console.log(resp)
      this.setState({
        phoneNumber: !resp,
        errorMsgPhoneNumber: "Invalid phone number",
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    })
  }
  this.setState({
    phone: value,
  });
}
expMonthValidateHandler = (e) => {
  this.setState({
    expMonthFeedBack: true,
    expMonthValue:this.expMonth.value.trim(),
  });
  if (this.expMonth.value.trim() == '') {
    this.setState({
      expMonth: false,
      errorMsgExpMonth: "Expire Month is Require",
    });
  }  else {
    this.setState({
      expMonth: true
    });
  }
  // this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});
};
expYearValidateHandler = (e) => {
  this.setState({
    expYearFeedBack: true,
    expYearValue:this.expYear.value.trim(),
  });
  if (this.expYear.value.trim() == '') {
    this.setState({
      expYear: false,
      errorMsgexpYear: "Expire Year is Require",
    });
  }  else {
    this.setState({
      expYear: true
    });
  }
  // this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});
};
ticketsValidateHandler = (e) => {

  let tickets=true
  let errorMsgTickets=""
  if (this.tickets.value.trim() == '') {
    errorMsgTickets= "Number Of Tickets can't be empty"
    tickets=false
  }else if ( this.state.raffleData.availableTickets  < this.tickets.value.trim() || this.tickets.value.trim() <= 0) {
    errorMsgTickets= "Tickets should br more than 0 and less then "+this.state.raffleData.availableTickets
    tickets=false
  } else {
    tickets=true
  }
  this.setState({
    isValidData: ( this.tickets.value.trim() && tickets),
    tickets:tickets,
    ticketsFeedBack: true,
    errorMsgTickets:errorMsgTickets,
    raffleTicketValue:this.tickets.value.trim()
  });
};
raffleTicketValidateHandler = (e) => {
  this.setState({
    raffleTicketFeedBack: true,
    raffleTicketValue: this.raffleTicket.value.trim(),
  });
  if (this.raffleTicket.value.trim() == '') {
    this.setState({
      raffleTicket: false,
      errorMsgRaffleTicket: "Raffle Ticket required and can't be empty",
    });
  }  else {
    this.setState({
      raffleTicket: true
    });
  }
};

showLoginPopup = () => {
    this.setState({
      showLoginPopup: true
    })
  };
  hideLoginPopup = () => {
    this.setState({
      showLoginPopup: false
    })
  };
  showLogin = () => {
    this.setState({
      toggle: true
    })
  };
  showRegister = () => {
    this.setState({
      toggle: false
    })
  };
  hideRegisterPopup = () => {
    this.setState({
      showLoginPopup: false,
    })
  }
  buyRaffleTicket = (e) => {
    e.preventDefault();
  };
  componentReRender() {
 }
  buyTicket = () => {
    this.setState({
      loading:true,
      emailFeedBack: true,
      passwordFeedBack:true,
      cardHolderFeedBack:true,
      cardNumberFeedBack:true,
      firstNameFeedBack:true,
      lastNameFeedBack:true,
      expMonthFeedBack:true,
      expYearFeedBack:true,
      popupHeader:"",
      errorMsg:"",
    })
    if (!this.props.authenticated && this.state.emailValue &&  this.state.passwordValue && this.state.phone &&  this.state.cardHolderValue &&  this.state.cardNumberValue && this.state.expYearValue && this.state.expMonthValue && this.state.cvvValue ) {
      let userData={
        "countryCode": this.state.countryPhone,
        "email": this.state.emailValue,
        "password": this.state.passwordValue,
        "phoneNumber": this.state.phone
      }
      this.props.doSignUp(this.props.params && this.props.params.params,userData ).then((resp)=>{
        if(!resp.errorMessage){
          this.setState({
            showAlertPopup:true,
            showTicketsPopup:false,
            errorMsg: " Your card ending in " + this.state.cardNumberValue.slice( - 4)  + " will be charged  " ,
            popupHeader:"Confirm",
            loading:false,
            isError:false,
          })
          //this.submiteBuyTicket();
        }
        else{
          this.setState({
            errorMsg:resp.errorMessage,
            loading:false,
            isError:true,
            popupHeader:"Failed",
          });
        }
        this.setState({
          loading:false,
        })
      });
    }else{
      if( this.props.authenticated &&  this.props.user && this.props.user.linkedCard && this.props.user.linkedCard.stripeCards.length == 0 ){
        if(this.state.cvv && this.state.cardHolder && this.state.cardNumber && this.state.expMonth && this.state.expYear){
          this.setState({
            showAlertPopup:true,
            showTicketsPopup:false,
            errorMsg: " Your card ending in " + this.state.cardNumberValue.slice( - 4)  + " will be charged  ",
            popupHeader:"Confirm",
            popupAlertHeader:"Confirm",
            loading:false,
          })
        }else {
          this.setState({
            loading:false,
          })
        }
      }else if(this.props.authenticated){
        this.purchaseTicket();
      }else{
        this.setState({
          loading:false,
        })
      }
      //this.submiteBuyTicket();
    }
  };
  purchaseTicket = (e) => {
    this.setState({
      loading:true,
    })
    if( this.props.authenticated &&  this.props.user && this.props.user.linkedCard && this.props.user.linkedCard.stripeCards.length > 0 ){
      const user = {
      //  compTicketCode: this.state.raffleData.code,
        raffleTicketId: this.state.raffleTicketValue,
      }
      this.props.purchaseTickets(this.props.params && this.props.params.params, user)
        .then(resp => {
          // let updateraffleData = Object.assign({},{availableTickets : this.state.raffleData.availableTickets - this.state.raffleTicketValue})
          if (resp && !resp.errorMessage) {
            this.setState({
              showPopup: true,
              errorMsg: resp.message,
              popupHeader:"Success",
              loading:false,
              popupTicketHeader:"Close",
              isError:false,
              //  raffleData: updateraffleData,
            })
            this.reRender();
          }else{
            this.setState({
              showPopup: true,
              errorMsg: resp.errorMessage,
              loading:false,
              popupHeader:'Failed',
              popupTicketHeader:"Close",
              isError:true,
            });
          }
        });
    } else {
      let self = this;
      //this.setState({isValidBidData: (this.state.cardNumber && this.state.cardHolder && this.state.amount && this.state.cvv)});
      if ( this.state.cardNumber && this.state.cardHolder && this.state.cvv) {
        const card = {
          number: this.state.cardNumberValue,
          cvc: this.state.cvvValue,
          exp_month: this.state.expMonthValue,
          exp_year: this.state.expYearValue,
        }
        Stripe.createToken(card, function (status, response) {
          if (response.error) {
            self.setState({
              showPopup: true,
              errorMsg: response.error.message,
              popupHeader:"Failed",
              loading:false,
            });
          } else {
            self.setState({
              showPopup: false,
              errorMsg: " ",
              //   popupHeader:"Success",
              stripeToken: response.id,
              loading:false,
            })
            self.byBid();
          }
        });
      }else {
        self.setState({
          loading:false,
        })
      }
    }
  };
  byBid = () => {
    const user = {
     // compTicketCode: this.state.raffleData.code,
      raffleTicketId: this.state.raffleTicketValue,
      stripeToken:this.state.stripeToken,
    }
    this.props.purchaseTickets(this.props.params && this.props.params.params, user)
      .then(resp => {
        if (!resp.errorMessage) {
          this.setState({
            showPopup: true,
            errorMsg:  resp.message,
            popupHeader:"Success",
            loading:false,
          })
        }else{
          this.setState({
            showPopup: true,
            errorMsg: resp.errorMessage,
            popupHeader:"Failed",
            loading:false,
          });
        }
      });
  };
  showAlertPopup = () => {
    this.setState({
      showPopup: true,
      showAlertPopup: true,

    })
  };
  hideAlertPopup = () => {
    this.setState({
      //  showPopup: false,
      showAlertPopup: false,
    })
    // this.reRender();
  };
  hideTicketsPopup = () => {
    this.setState({
      showTicketsPopup: false,
      popupTicketHeader: "Pay Now",
    })
    this.componentReRender();
  };
  showTicketsPopup = () => {
    this.setState({
      showTicketsPopup: true,
      errorMsg:"",
      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
      amountFeedBack: false,
      cvvFeedBack: false,
      phoneNumberFeedBack: false,
      firstNameFeedBack: false,
      ticketsFeedBack: false,
      lastNameFeedBack: false,
      errorMsgCard : false,
    })
  };
  reRender = ()=>{
    this.props.doGetEventData(this.props.params && this.props.params.params);
    this.props.doGetSettings(this.props.params && this.props.params.params, 'raffle').then(resp => {
      this.setState({
        settings: resp && resp.data
      });
    }).catch(error => {
      history.push('/404');
    });
  };
  checkIsValidBidData = () =>{
    console.log(" this.state.lastName ", this.state.lastName )
    let valid1=true;
    let valid2=true;
    let flag=true;
    if(this.props.authenticated){
      if( this.props.user.firstName == null ){
        valid1=!!(this.state.firstName && this.state.lastName && this.state.amount );
        flag=false;
      }
      if( this.props.user && this.props.user.linkedCard && this.props.user.linkedCard.stripeCards.length <= 0 &&  this.props.eventData.ccRequiredForBidConfirm )
      {
        valid2=!!(this.state.amount && this.state.cardNumber && this.state.cardHolder  && this.state.cvv && this.expMonth && this.expYear);
        flag=false;
      }
      if(flag) {
        valid1=!!(this.state.amount);
        valid2=!!(this.state.amount);
      }
    } else {
    }
    this.setState({isValidBidData: (valid1 && valid2)});
  };
  hideLoginModal  = () => {
    this.setState({
      isShowLoginModal:false,
    })
  };
  showLoginModal = () => {
    this.setState({
      isShowLoginModal:true,
      showTicketsPopup: false,
    })
  };
  close() {
    this.setState({showModal: false});
  }

  open() {
    this.setState({showModal: true});
  }
  render() {
    let event = this.props.params && this.props.params.params;
    return (
      <div >
        <Modal  show={this.props.showModal   ? true : false} onHide={this.props.onCloseFunc} >
          <Modal.Body>
            <Modal.Header closeButton>
              <h4 className="modal-title"><a role="button" onClick={this.showLoginModal} data-form="login">Log in</a> or Signup below</h4>
            </Modal.Header>

          <div className="main-box-body clearfix">
            <div className="payment-area collapse in">
              <form className="ajax-form validated fv-form fv-form-bootstrap" data-has-cc-info="true"
                    data-show-cc-confirm="true" data-confirm-message="getTicketsConfirmMessage" id="donate-payment-form"
                    data-validate-function="validateTicketsForm" data-onsuccess="handleTicketsSuccess" method="post"
                    data-validation-fields="getTicketsModalValidationFields" action="/AccelEventsWebApp/events/12/D"
                    noValidate="novalidate"
                    onSubmit={this.buyRaffleTicket} >

                <div  className={cx("ajax-msg-box text-center mrg-b-lg", this.state.popupHeader !== 'Failed'  ? 'text-success':'text-danger')} >
                  { this.state.errorMsgCard }
                  { this.state.errorMsg }</div>
                { !this.props.authenticated || ( this.props.authenticated && this.props.user.firstName == null ) ?  <div
                  className={cx("form-group", this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}>
                  <label className="control-label">First Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true"/>
                    </div>
                    <input type="text" className="form-control" name="firstname" data-fv-field="firstName"
                           ref={ref => {
                             this.firstName = ref;
                           }}
                           onKeyUp={this.firstNameValidateHandler}/>
                    { this.state.firstNameFeedBack && this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                    { this.state.firstNameFeedBack && !this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                  </div>
                  { this.state.firstNameFeedBack && !this.state.firstName &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">Firstname is required.</small>}
                </div> :""}
                { !this.props.authenticated || ( this.props.authenticated && this.props.user.lastName == null ) ?  <div
                  className={cx("form-group", this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}>
                  <label className="control-label">Last Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" aria-hidden="true"/>
                    </div>
                    <input type="text" className="form-control" name="lastname" data-fv-field="lastName"
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
                  <small className="help-block" data-fv-result="NOT_VALIDATED">Lastname is required.</small>}
                </div> :''}
                { !this.props.authenticated &&
                <div
                  className={cx("form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
                  <label className="control-label">Email Address</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-envelope" aria-hidden="true"/>
                    </div>
                    <input type="email" className="form-control login-email"
                           name="email" data-fv-field="email"
                           ref={ref => {
                             this.email = ref;
                           }}
                           onKeyUp={this.emailValidateHandler}
                    />
                    { this.state.emailFeedBack && this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                    { this.state.emailFeedBack && !this.state.email &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                  </div>
                  { this.state.emailFeedBack && !this.state.email &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
                </div>}
                { !this.props.authenticated &&
                <div
                  className={cx("form-group", this.state.phoneNumberFeedBack && 'has-feedback', this.state.phoneNumberFeedBack && this.state.phoneNumber && 'has-success', this.state.phoneNumberFeedBack && (!this.state.phoneNumber) && 'has-error')}>
                  <label className="control-label">Cell Number</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-phone" aria-hidden="true"/>
                    </div>
                    <IntlTelInput
                      css={['intl-tel-input', 'form-control intl-tel']}
                      utilsScript="./libphonenumber.js"
                      separateDialCode={true}
                      value={ this.state.phone }
                      onPhoneNumberChange={this.changePhone}
                    />
                    { this.state.phoneNumberFeedBack && this.state.phoneNumber &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                    { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                  </div>
                  { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgPhoneNumber}</small>}
                </div>}
                { !this.props.authenticated &&
                <div
                  className={cx("form-group", this.state.passwordFeedBack && 'has-feedback', this.state.passwordFeedBack && this.state.password && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
                  <label className="control-label login-password">Enter or Create
                    Password</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-key" aria-hidden="true"/>
                    </div>
                    <input type="password" className="form-control" name="password"
                           autoComplete="new-password"
                           placeholder="Enter or create a password"
                           data-fv-field="paswd"
                           ref={ref => {
                             this.password = ref;
                           }}
                           onKeyUp={this.passwordValidateHandler}
                    />
                    { this.state.passwordFeedBack && this.state.password &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                    { this.state.passwordFeedBack && !this.state.password &&
                    <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}

                  </div>
                  { this.state.passwordFeedBack && !this.state.password &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED">Password can't be empty.</small>}

                </div>}
                <div className="form-group has-feedback">
                  <label className="control-label">Number of tickets</label>
                  <select className="form-control" name="pkg" id="ticketpkgs" data-fv-field="ticketpkgs"  ref={ref => {
                    this.raffleTicket = ref;
                  }} onChange={this.raffleTicketValidateHandler}>
                    <option value data-ticket={0} data-price={0}> -- Select Tickets --</option>
                    <option value={847} data-ticket={1} data-price={5}>
                      1 Ticket For $ 5
                    </option>
                    <option value={848} data-ticket={2} data-price={10}>
                      2 Ticket For $ 10
                    </option>
                    <option value={849} data-ticket={6} data-price={20}>
                      6 Ticket For $ 20
                    </option>
                    <option value={850} data-ticket={15} data-price={40}>
                      15 Ticket For $ 40
                    </option>
                    <option value={851} data-ticket={20} data-price={50}>
                      20 Ticket For $ 50
                    </option>
                    <option value={852} data-ticket={50} data-price={100}>
                      50 Ticket For $ 100
                    </option>
                  </select>

                  { this.state.raffleTicketFeedBack && !this.state.raffleTicket &&
                  <small className="help-block" data-fv-result="NOT_VALIDATED"> Raffle Ticket required.</small>}
                </div>
                { !this.props.authenticated || ( this.props.authenticated && ( this.props.user && this.props.user.linkedCard && this.props.user.linkedCard.stripeCards.length == 0 )) ?
                  <div>
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
                          <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgcardHolder}</small>}

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
                          <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgcardNumber}.</small>}
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
                                  <option selected value="10">Jan (01)</option>
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
                    <div className="form-group">
                      <div className="checkbox-nice">
                        <input type="checkbox" id="uptodate" name="uptodate" defaultChecked/> <label
                        htmlFor="uptodate">Stay up to date with Accelevents</label>
                      </div>
                    </div></div> : "" }
                {this.state.popupTicketHeader == "Pay Now" ? <Button className="btn btn-success"  role="button" type="submit"  loading={this.state.loading} onClick={this.buyTicket} >Pay Now</Button>
                  : <button className="btn badge-danger" onClick={this.props.onCloseFunc}>Close</button> }
              </form>
            </div>
          </div>
          </Modal.Body>
        </Modal>
        <PopupModel
          id="alertPopup"
          showModal={this.state.showAlertPopup}
          headerText={<h4>{this.state.popupHeader}</h4>}
          modelBody=''
          onCloseFunc={this.hidePopup}>
          <div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>
            { this.state.errorMsg }
            <div className="modal-footer">
              {/*{this.state.popupAlertHeader == "Success" ? <button className="btn btn-success" onClick={this.buyTicket} >Confirm</button> : ""}*/}
              {this.state.popupHeader == "Confirm" ? <Button loading={this.state.loading} className="btn btn-success" onClick={this.purchaseTicket} >Confirm</Button> : ""}
              <button className="btn badge-danger" onClick={this.hideAlertPopup}>Close</button>
            </div>
          </div>
        </PopupModel>
        <LoginModal
          showModal={this.state.isShowLoginModal}
          onCloseFunc={this.hideLoginModal}
          params={this.props.params }
          modelFooter={<button type="button" className="btn btn-info center-block" data-dismiss="modal" onClick={()=>{this.hideLoginModal()}}>&nbsp; &nbsp; &nbsp; Close&nbsp; &nbsp; &nbsp; </button>}
        />
      </div>
    )
  };
}

const mapDispatchToProps = {
  doSignUp: (eventUrl, userData) => doSignUp(eventUrl, userData),
  doLogin: (email, password, rememberme) => doLogin(email, password, rememberme),
  doValidateMobileNumber: (mobileNumber) => doValidateMobileNumber(mobileNumber),
  purchaseTickets: (eventUrl, userData) => purchaseTickets(eventUrl, userData),

  doGetEventData: (eventUrl) => doGetEventData(eventUrl),
  doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
};

const mapStateToProps = (state) => ({
  isVolunteer : state.event && state.event.is_volunteer,
  user : state.session && state.session.user,
  authenticated : state.session && state.session.authenticated,
  stripeKey: state.event && state.event.data && state.event.data.stripeKey,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(BuyRaffleTicketsModal));