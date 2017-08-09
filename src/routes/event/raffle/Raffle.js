import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Raffle.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {doGetRaffleItemByCode,
  doGetEventData,
  doGetSettings,
  submitRaffleTickets,
  doSignUp,doValidateMobileNumber,
  purchaseTickets} from './../action/index';
import history from './../../../history';

import EventAside from './../../../components/EventAside/EventAside';
import {Carousel} from 'react-responsive-carousel';
import PopupModel from './../../../components/PopupModal';
import Button from 'react-bootstrap-button-loader';
import Link from '../../../components/Link';
import LoginModal from '../../../components/LoginModal/index';
import BuyRaffleTicketsModal from './../../../components/BuyRaffleTicketsModal'
class Raffle extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };
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
  }
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

    if (this.email.value && this.email.value.trim() === '') {
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

    if (this.password.value && this.password.value.trim() === '') {

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
    if ( this.firstName.value.trim() === '') {
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
  cardHolderValidateHandler = (e) => {

    this.setState({
      cardHolderFeedBack: true,
      cardHolderValue:this.cardHolder.value,
    });

    if (this.cardHolder.value && this.cardHolder.value.trim() === '') {

      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name is required and can't be empty",
      });
    } else if (!( this.cardHolder.value.trim().length >= 6 && this.cardHolder.value.trim().length <= 70 )) {
      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name must be more than 6 and less than 70 characters long ",
      });
    } else if(this.cardHolder.value.charAt(0) === ' ' || this.cardHolder.value.charAt(this.cardHolder.value.length-1) === ' '){
      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name can not start or end with white space",
      });
    } else {
      this.setState({
        cardHolder: true
      });
    }
    //this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});

  };
  cardNumberValidateHandler = (e) => {
    this.cardNumber.value=this.cardNumber.value.substr(0,16);
    this.setState({
      cardNumberFeedBack: true,
      cardNumberValue:this.cardNumber.value,
    });
    if (this.cardNumber.value && this.cardNumber.value.trim() === '') {
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
    this.cvv.value=this.cvv.value.substr(0,4);
    this.setState({
      cvvFeedBack: true,
      ccvValue:this.cvv.value.trim(),
    });

    if (this.cvv.value && this.cvv.value.trim() === '') {

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
    //this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});
  };
  phoneNumberValidateHandler(name, isValid, value, countryData, number, ext) {
    this.setState({
      phone: value,
      countryPhone:countryData.iso2,
      phoneNumberFeedBack: true,
      errorMsgPhoneNumber :"",
    },function afterChange () {
      this.checkIsValidBidData()
    });
    if (value === '') {
      this.setState({
        phoneNumber: false,
        errorMsgPhoneNumber: "phoneNumber is Require",
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    }else{
      this.props.doValidateMobileNumber(number).then(resp => {
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
  };
  expMonthValidateHandler = (e) => {
    this.setState({
      expMonthFeedBack: true,
      expMonthValue:this.expMonth.value.trim(),
    });
    if (this.expMonth.value && this.expMonth.value.trim() === '') {
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
    if (this.expYear.value && this.expYear.value.trim() === '') {
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

    let tickets=true;
    let errorMsgTickets="";
    if (this.tickets.value && this.tickets.value.trim() === '') {
      errorMsgTickets= "Number Of Tickets can't be empty";
      tickets=false;
    }else if ( this.state.raffleData.availableTickets  < this.tickets.value.trim() || this.tickets.value.trim() <= 0) {
      errorMsgTickets= "Tickets should be more than 0 and less then "+this.state.raffleData.availableTickets;
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
    if (this.raffleTicket.value && this.raffleTicket.value.trim() === '') {
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

  componentWillMount() {
    this.changePhone = this.phoneNumberValidateHandler.bind(this, 'phone');
    this.props.doGetEventData(this.props.params && this.props.params.params);
    this.props.doGetSettings(this.props.params && this.props.params.params, 'raffle').then(resp => {
      if(!resp.data.moduleActivated){
        this.setState({
          errorMsg:"Please activate this module to start accepting pledges.",
          popupHeader :'Failed',
          isError:true,
        });
      }
      this.setState({
        settings: resp && resp.data
      });
    }).catch(error => {
      history.push('/404');
    });
    this.props.doGetRaffleItemByCode(this.props.params && this.props.params.params, this.props.itemCode)
      .then(resp => {
        if (resp && resp.data) {
          this.setState({
            raffleData: resp.data
          })
        }
      }).catch(error => {
      history.push('/404');
    });
  };
  componentReRender() {
    this.props.doGetRaffleItemByCode(this.props.params && this.props.params.params, this.props.itemCode)
      .then(resp => {
        if (resp && resp.data) {
          this.setState({
            raffleData: resp.data
          })
        }
      }).catch(error => {
    });
  };

  buyRaffleTicket = (e) => {
    e.preventDefault();
  };
  submiteBuyTicket = (e) => {
    e.preventDefault();
    this.setState({
      loading:true,
    });
      const user = {
        itemCode: this.state.raffleData.code,
        submittedTickets: this.state.raffleTicketValue,
      };
      this.props.submitRaffleTickets(this.props.params && this.props.params.params, user)
        .then(resp => {
         let updateraffleData = Object.assign({},this.state.raffleData,{availableTickets : this.state.raffleData.availableTickets - this.state.raffleTicketValue});
          if (!resp.errorMessage) {
            this.setState({
              //showAlertPopup: true,
              errorMsg: resp.message,
              isError: false,
              popupHeader:"Success. ",
              raffleData: updateraffleData,
           })
          }else{
            this.setState({
            //  showAlertPopup: true,
              isError: true,
              errorMsg: resp.errorMessage,
              popupHeader:"Failed"
            });
          }
          this.setState({
            loading:false,
          })
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
    });
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
    //window.location.reload();
  };
  checkIsValidBidData = () =>{
    let valid1=true;
    let valid2=true;
    let flag=true;
    if(this.props.authenticated){
      if( this.props.user && this.props.user.firstName === null ){
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
    }, function afterStateChange() {
      let self = this;
      setTimeout(function() {
        self.successTasks();
      },3000);
      }
    );
  };
  showLoginModal = () => {
    this.setState({
      isShowLoginModal:true,
      showTicketsPopup: false,
    })
  };
  showBuyRaffleTicketsModal = () => {
    this.setState({
      isshowBuyRaffleTicketsModal: true
    })
  };
  hideBuyRaffleTicketsModal = () => {
    this.setState({
      isshowBuyRaffleTicketsModal: false
    })
  };
  successTasks = ()=> {
    this.props.doGetRaffleItemByCode(this.props.params && this.props.params.params, this.props.itemCode)
      .then(resp => {
        if (resp && resp.data) {
          this.setState({
            raffleData: resp.data
          })
        }
      }).catch(error => {

      history.push('/404');
    });
  };
  render() {
    let form_login = <form className="ajax-form validated fv-form fv-form-bootstrap" method="post" onSubmit={this.submiteBuyTicket}>

      { !this.props.authenticated || ( this.props.authenticated && this.props.user.firstName === null ) ?  <div
        className={cx("form-group", this.state.firstNameFeedBack && 'has-feedback', this.state.firstNameFeedBack && this.state.firstName && 'has-success', this.state.firstNameFeedBack && (!this.state.firstName) && 'has-error')}>
        <label className="control-label">First Name</label>
        <div className="input-group">
          <div className="input-group-addon">
            <i className="fa fa-user" aria-hidden="true"/>
          </div>
          <input type="text" className="form-control" name="firstname" placeholder="First Name"
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
        <small className="help-block" data-fv-result="NOT_VALIDATED">First Name is required.</small>}
      </div> : ""}
      { !this.props.authenticated || ( this.props.authenticated && this.props.user.lastName === null ) ?  <div
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
      </div> : '' }

      <div className="form-group has-feedback">
        <label className="control-label"> You have <span className="available-tickets">{this.state.raffleData && this.state.raffleData.availableTickets}</span> tickets
          remaining.</label>
        <div className="row">
          <div className="col-md-10 col-lg-10">
            <div
              className={cx("input-group", this.state.ticketsFeedBack && 'has-feedback', this.state.ticketsFeedBack && this.state.tickets && 'has-success', this.state.ticketsFeedBack && (!this.state.tickets) && 'has-error', this.state.raffleData && this.state.raffleData.availableTickets > 0 ? '' : 'disabled')}>
              <div className="input-group-addon"><i className="fa fa-ticket" aria-hidden="true"/></div>
              <input type="number"  name="itembid"  required="required"
                     className={cx("form-control")}
                     disabled={(this.state.raffleData && !this.state.raffleData.availableTickets <= 0) ? false : true}

                 ref={ref => {
                 this.tickets = ref;
              }}
                   onKeyUp={this.ticketsValidateHandler}
              />
              { this.state.ticketsFeedBack && this.state.tickets &&
              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
              { this.state.ticketsFeedBack && !this.state.tickets &&
              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
               </div>
            <small style={{color: 'red'}}
              data-fv-result="NOT_VALIDATED">{this.state.errorMsgTickets}</small>
          </div>
        </div>
      </div>
      <div className="row btn-row">
        <div className="col-md-5 col-lg-5">
          <Button bsStyle="primary" className={cx("btn-block text-uppercase")} style={{width:"100%"}} disabled={!this.state.isValidData } role="button"
                   type="submit"  loading={this.state.loading}> Submit Ticket </Button>

        </div>
        <div className="col-md-6 col-lg-5">
          <Link to={this.props.params && "/events/" + this.props.params.params + '#Raffle' } role="button" className="btn btn-success btn-block" >
              Go back to All Items
          </Link>
        </div>
      </div>
      <div className="row mrg-t-md">
        <div className="col-md-5 col-lg-10">
          <button role="button" className="btn btn-primary btn-block" data-toggle="modal" href="#info-modal"
                  type="button" onClick={this.showBuyRaffleTicketsModal} disabled={(this.state.settings && !this.state.settings.moduleActivated) || ( this.state.settings && this.state.settings.moduleEnded)}>Get Tickets</button>
        </div>
      </div>
    </form>;
    let form_normal = <div >
      <a role="button" className="btn btn-success btn-block" onClick={this.showLoginModal}  data-toggle="modal" data-form="login">Login</a>
      <button  role="button" className="btn btn-primary btn-block"    disabled={(this.state.settings && !this.state.settings.moduleActivated) || ( this.state.settings && this.state.settings.moduleEnded)}
         onClick={this.showBuyRaffleTicketsModal} >Get Tickets</button>
      <Link role="button" className="btn btn-success btn-block"
         to={this.props.params && "/events/" + this.props.params.params + '#Raffle' } >Go back to All Items</Link>
    </div>;
    return (
      <div className="row">
        <div className="col-lg-12">
          <div id="content-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">
                <EventAside activeTab={'Raffle'} eventData={this.props.eventData} settings={this.state.settings}
                  eventTicketData={this.props.eventTicketData}
                  activeCategory={false}
                  params={this.props.params}
                  successTask={this.successTasks}
                />
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8">
                <div className="main-box clearfix">
                  <h1 className="text-center mrg-t-lg"
                      id="item-name">{this.state.raffleData && this.state.raffleData.name }</h1>
                  <div className="row mrg-t-lg">
                    <div className="col-md-6">
                      <div className="pad-l-md pad-r-md">
                        <div className="item-image">
                          <Carousel axis="horizontal" showThumbs={false} showArrows={true} showStatus={false} >
                            {this.state.raffleData && this.state.raffleData.images.length > 0 ?
                              this.state.raffleData.images.map((item, index) =>
                                <ImageList key={index} item={item}
                                           imageUrl={item.imageUrl ? 'http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/' + item.imageUrl : "http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg"}/>
                              ) : <div className="item-image-inner" style={{
                                backgroundImage: 'url("http://v2-dev-images-public.s3-website-us-east-1.amazonaws.com/1-450x300/eee2f81b-92c8-4826-92b6-68a64fb696b7A_600x600.jpg")',
                                width: '',
                                transform: 'rotate(0deg)'
                              }}/>
                            }
                          </Carousel>
                        </div>
                      </div>
                      <div className="mrg-t-lg pad-l-md pad-r-md" dangerouslySetInnerHTML={ {__html: this.state.raffleData && this.state.raffleData.description } } >

                      </div>
                    </div>
                    <div className="col-md-6">
                      {this.state.errorMsg  &&  <div  className={cx("ajax-msg-box text-center mrg-b-lg", !this.state.isError  ? 'text-success':'text-danger')} >
                        { this.state.errorMsg }</div> }
                      { this.props.authenticated ? form_login : form_normal  }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PopupModel
          id="alertPopup"
          showModal={this.state.showAlertPopup}
          headerText={<p>{this.state.popupHeader}</p>}
          modelBody=''
          onCloseFunc={this.hidePopup}>
          <div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>
            { this.state.errorMsg }
            <div className="modal-footer">
              {/*{this.state.popupAlertHeader == "Success" ? <button className="btn btn-success" onClick={this.buyTicket} >Confirm</button> : ""}*/}
              {this.state.popupHeader === "Confirm" ? <Button loading={this.state.loading} className="btn btn-success" onClick={this.purchaseTicket} >Confirm</Button> : ""}
              <button className="btn btn-danger" onClick={this.hideAlertPopup}>Close</button>
            </div>
          </div>
        </PopupModel>
        <LoginModal
          showModal={this.state.isShowLoginModal}
          onCloseFunc={this.hideLoginModal}
          params={this.props.params }
          modelFooter={<button type="button" className="btn btn-info center-block" data-dismiss="modal" onClick={()=>{this.hideLoginModal()}}> Close </button>}
        />
        <BuyRaffleTicketsModal
          ticketPackages={this.state.settings && this.state.settings.ticketPackages}
          showModal={this.state.isshowBuyRaffleTicketsModal}
          headerText=""
          onCloseFunc={this.hideBuyRaffleTicketsModal}
          successTask={this.successTasks}
          params={this.props.params}
          ccRequiredForBidConfirm={this.props.eventData && this.props.eventData.ccRequiredForBidConfirm }
        />
      </div>
    );
  }
}
class ImageList extends React.Component {
  render() {
    let img = '';
    return (
      <div>
        <div className={cx("item-image-inner")}
             style={{"backgroundImage": "url(" + this.props.imageUrl + ")"}}></div>

      </div>

    );
  }
}

const mapDispatchToProps = {
  doGetEventData: (eventUrl) => doGetEventData(eventUrl),
  doGetRaffleItemByCode: (eventUrl, itemCode) => doGetRaffleItemByCode(eventUrl, itemCode),
  doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
  submitRaffleTickets: (eventUrl, userData) => submitRaffleTickets(eventUrl, userData),
  purchaseTickets: (eventUrl, userData) => purchaseTickets(eventUrl, userData),
  doSignUp: (eventUrl, userData) => doSignUp(eventUrl, userData),
  doValidateMobileNumber: (mobileNumber) => doValidateMobileNumber(mobileNumber),
};
const mapStateToProps = (state) => ({
  stripeKey: state.event && state.event.data && state.event.data.stripeKey,
  raffle_data: state.event && state.event.raffle_data,
  eventData: state.event && state.event.data,
  eventTicketData: state.event && state.event.ticket_data,
  user: state.session.user,
  authenticated: state.session.authenticated,
	currencySymbol: state.event && state.event.currencySymbol || "$",
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Raffle));
