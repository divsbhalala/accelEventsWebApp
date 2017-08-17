
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Auction.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {
  doGetEventData,
  doGetSettings,
  doGetAuctionItemByCode,
  doSignUp,
  submitAuctionBid,
  changeUserData,
  doValidateMobileNumber
} from './../action/index';
import {getCardToken} from './../../checkout/action/index';
import  history from './../../../history';
import  EventAside from './../../../components/EventAside/EventAside';
import {sessionService, loadSession} from 'redux-react-session';
import  {Carousel} from 'react-responsive-carousel';
import PopupModel from './../../../components/PopupModal';
import {parse, isValidNumber} from 'libphonenumber-js'
import Button from 'react-bootstrap-button-loader';
import Link from '../../../components/Link';
import IntlTelInput from './../../../components/IntTelInput';

class Auction extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      settings: null,
      showBookingTicketPopup: false,
      showMapPopup: true,
      isValidData: false,
      email: null,
      password: null,
      error: null,
      emailFeedBack: false,
      passwordFeedBack: false,
      auctionData: null,

      isValidBidData: true,

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
      popupHeader: null,

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
      passwordValue: null,
      phoneNumberValue: null,
      errorMsgCard: null,

      firstNameFeedBack: false,
      lastNameFeedBack: false,
      cardNumberFeedBack: false,
      cardHolderFeedBack: false,
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
      errorMsgPassword: null,
      showForgatePassword:false,
      showPopup: false,
      stripeToken:null,
      phone:null,
      countryPhone:null,
      loading:false,
    };
  }
  onBidFormClick = (e) => {
    this.setState({
      loading:true,
      firstNameFeedBack: true,
      lastNameFeedBack: true,
      cardNumberFeedBack: true,
      cardHolderFeedBack: true,
      amountFeedBack: true,
      cvvFeedBack: true,
      phoneNumberFeedBack: true,
    });
    e.preventDefault();
    if (!this.state.settings.moduleActivated || this.state.settings.moduleEnded && this.state.amount){
      this.setState({
        showPopup: true,
        loading:false,
        errorMsgCard: " Pledges are no longer being accepted for this auction." ,
        popupHeader:"Failed",
      })
    }else {
      if( this.props.authenticated && !this.props.eventData.ccRequiredForBidConfirm && this.amount.value ) {
        this.setState({
          loading:false,
          showPopup: true,
          errorMsgCard: " You are placing a bid of "+ this.props.currencySymbol+ this.state.amountValue  +" for " + this.state.auctionData.name ,
          popupHeader: "Confirm",
        })
      } else {
        if (this.state.cardNumber && this.state.cardHolder && this.state.amount && this.state.cvv) {
          const card = {
            number: this.cardNumber.value.trim(),
            cvc: this.cvv.value.trim(),
            exp_month: this.expMonth.value.trim(),
            exp_year: this.expYear.value.trim(),
          };
          this.props.getCardToken(this.props.stripeKey, this.cardNumber.value.trim(), this.expMonth.value.trim(), this.expYear.value.trim(), this.cvv.value.trim()).then(response=>{
            if (response.error) {
              this.setState({
                loading:false,
                showPopup: true,
                errorMsgCard: response.error.message,
                popupHeader:"Failed"
              });
            } else {
              this.setState({
                loading:false,
                showPopup: true,
                errorMsgCard: " Your card ending in " + this.state.cardNumberValue.slice( - 4)  + " will be charged " + this.props.currencySymbol +  this.state.amountValue  + " for  " +  this.state.auctionData.name ,
                popupHeader:"Success",
                stripeToken: response.id,})
            }
          });
        }else{
          this.setState({
            loading:false,
          });
        }
      }
    }
  };
  placeBid = () => {
    this.setState({
      loading:true,
    });
    const user = {
      email: this.props.user.email,
      countryCode: parse(this.state.phone).country,
      cellNumber: parse(this.state.phone).phone,
      firstname: this.state.firstNameValue,
      lastname: this.state.lastNameValue,
      paymenttype: 'CC',
      itemCode: this.state.auctionData.code,
      amount: this.state.amountValue,
      stripeToken: this.state.stripeToken,
    };
    this.submitAuctionBid( user);

  };
  placeBidByAmount = () => {
    this.setState({
      loading:true,
    });
    const user = {
      itemCode: this.state.auctionData.code,
      amount: this.state.amountValue,
      firstname: this.state.firstNameValue,
      lastname: this.state.lastNameValue,
    };
    this.submitAuctionBid(user);
  };
  submitAuctionBid = (user) => {
    this.props.submitAuctionBid(this.props.params && this.props.params.params, user)
      .then(resp => {
        if (resp && !resp.errorMessage) {
          this.setState({
            loading:true,
            showPopup: true,
            errorMsgCard:resp.message,
            popupHeader:"Successful Bid",
          });

          setTimeout(() => {
              this.setState({
                loading:false,
                showPopup: false,
                errorMsgCard:"",
                popupHeader:"",
              });
          },3000)
          this.props.changeUserData(this.props.user,user)
        }else{
          this.setState({
            loading:false,
            showPopup: true,
            errorMsgCard: resp.errorMessage,
            popupHeader:"Failed"
          });

          setTimeout(() => {
              this.setState({
                loading:false,
                showPopup: false,
                errorMsgCard:"",
                popupHeader:"",
              });
          },3000)

        }
        this.setState({
          loading:false,
        })
      });
  };
  signupForm = (e) => {
    e.preventDefault();
    this.setState({
      emailFeedBack:true,
      phoneNumberFeedBack:true,
      passwordFeedBack:true,
    });
    if (this.state.emailValue && this.state.passwordValue && this.state.phone) {
      this.setState({
        loading:true,
      });
      let userData={
        "countryCode": this.state.countryPhone,
        "email": this.state.emailValue,
        "password": this.state.passwordValue,
        "phoneNumber": this.state.phone,
      };
      this.props.doSignUp(this.props.params && this.props.params.params,userData ).then((resp)=>{
        if (resp && !resp.errorMessage) {
          this.setState({
            showPopup: true,
            errorMsgCard: "Thank you for Registration!",
            popupHeader:"Successful Registration",
            loading:false,
          });
          this.componentReRender();
        }
        else{
          this.setState({
           // showPopup: true,
            errorMsgCard: resp.errorMessage,
            popupHeader:"Failed",
            loading:false,
          });
          if(resp.errorMessage == 'Incorrect password'){
            this.setState({
              password:false,
              errorMsgPassword:'',
              showForgatePassword:true,
            });
          }
        }
      });
    }
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
    //this.setState({isValidData: !!(this.email.value.trim() && this.password.value.trim())});

  };
  passwordValidateHandler = (e) => {
    this.setState({
      passwordFeedBack: true,
      passwordValue: this.password.value.trim(),
    });
    if (this.password.value.trim() == '') {
      this.setState({
        password: false,
        errorMsgPassword: "Password can't be empty.",
      });
    } else {
      this.setState({
        password: true
      });
    }
    //this.setState({isValidData: !!(this.email.value.trim() && this.password.value.trim())});
  };
  firstNameValidateHandler = (e) => {
    this.setState({
      firstNameFeedBack: true,
      firstNameValue: this.firstName.value.trim()
    }, function afterStateChange() {
      this.checkIsValidBidData()
    });
    if (this.firstName.value.trim() == '') {
      this.setState({
        firstName: false
      }, function afterStateChange() {
        this.checkIsValidBidData()
      });
    } else {
      this.setState({
        firstName: true
      }, function afterStateChange() {
        this.checkIsValidBidData()
      });
    }
    //  this.setState({isValidBidData: !!(this.state.firstNameFeedBack && this.state.lastNameFeedBack && this.state.cardNumberFeedBack && this.state.cardHolderFeedBack && this.state.amountFeedBack && this.state.cvvFeedBack)});
  };
  lastNameValidateHandler = (e) => {
    this.setState({
      lastNameFeedBack: true,
      lastNameValue: this.lastName.value.trim(),
    }, function afterStateChange() {
      this.checkIsValidBidData()
    });
    if (this.lastName.value.trim() == '') {

      this.setState({
        lastName: false
      }, function afterStateChange() {
        this.checkIsValidBidData()
      });
    } else {
      this.setState({
        lastName: true
      }, function afterStateChange() {
        this.checkIsValidBidData()
      });
    }
    // this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});
  };
  cardHolderValidateHandler = (e) => {

    this.setState({
      cardHolderFeedBack: true,
      cardHolderValue: this.cardHolder.value.trim(),
    }, function afterStateChange() {
      this.checkIsValidBidData()
    });

    if (this.cardHolder.value.trim() == '') {

      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name is required and can't be empty",
      }, function afterStateChange() {
        this.checkIsValidBidData()
      });
    } else if (!( this.cardHolder.value.trim().length >= 6 && this.cardHolder.value.trim().length <= 70 )) {
      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name must be more than 6 and less than 70 characters long ",
      },function afterStateChange() {
        this.checkIsValidBidData()
      });
    } else if(this.cardHolder.value.charAt(0) === ' ' || this.cardHolder.value.charAt(this.cardHolder.value.length-1) === ' '){
      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name can not start or end with white space",
      },function afterStateChange() {
      this.checkIsValidBidData()
    });
    } else {
      this.setState({
        cardHolder: true
      }, function afterStateChange() {
        this.checkIsValidBidData()
      });
    }
    //  this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});

  };
  cardNumberValidateHandler = (e) => {
    this.cardNumber.value=this.cardNumber.value.substr(0,16);
    this.setState({
      cardNumberFeedBack: true,
      cardNumberValue: this.cardNumber.value.trim(),
    }, function afterStateChange() {
      this.checkIsValidBidData()
    });


    if (this.cardNumber.value.trim() == '') {

      this.setState({
        cardNumber: false,
        errorMsgcardNumber: "Enter Card Number ",
      }, function afterStateChange() {
        this.checkIsValidBidData()
      });
    } else if (this.cardNumber.value.trim().length !== 16 && this.cardNumber.value.trim().length !== 15) {
      this.setState({
        cardNumber: false,
        errorMsgcardNumber: " Please enter a Valid Card Number ",
      }, function afterStateChange() {
        this.checkIsValidBidData()
      });
    } else {
      this.setState({
        cardNumber: true
      });
    }
    this.checkIsValidBidData();
    //   this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});

  };
  amountValidateHandler = (e) => {
    let amount = true;
    let errorMsgAmount = "";
    if (this.amount.value && this.amount.value.trim() === '') {
      errorMsgAmount = "Bid Amount can't be empty";
      amount = false;
    } else if ((this.state.auctionData.currentBid + this.state.auctionData.bidIncrement) > this.amount.value.trim()) {
      errorMsgAmount = "Bids for this item must be placed in increments of at least "+ this.props.currencySymbol + this.state.auctionData.bidIncrement + ". Please enter a value of at least " + this.props.currencySymbol+ (this.state.auctionData.currentBid + this.state.auctionData.bidIncrement);
      amount = false;
    } else {
      amount = true;
    }
    this.setState({
      //isValidBidData: ( this.amount.value.trim() && amount),
      amount: amount,
      amountFeedBack: true,
      errorMsgAmount: errorMsgAmount,
      amountValue: this.amount.value.trim()
    }, function afterStateChange() {
      this.checkIsValidBidData()
    });
    //this.checkIsValidBidData();
  };
  cvvValidateHandler = (e) => {
    this.cvv.value=this.cvv.value.substr(0,4);
    this.setState({
      cvvFeedBack: true
    }, function afterStateChange() {
      this.checkIsValidBidData()
    });

    if (this.cvv.value && this.cvv.value.trim() === '') {

      this.setState({
        cvv: false,
        errorMsgcvv: "The CVV is required and can't be empty",
      }, function afterStateChange() {
        this.checkIsValidBidData()
      });
    } else if (!( 3 <= this.cvv.value.trim().length && 4 >= this.cvv.value.trim().length )) {
      this.setState({
        cvv: false,
        errorMsgcvv: "The CVV must be more than 4 and less than 3 characters long",
      }, function afterStateChange() {
        this.checkIsValidBidData()
      });
    } else {
      this.setState({
        cvv: true
      }, function afterStateChange() {
        this.checkIsValidBidData()
      });
    }
    this.checkIsValidBidData();
    // this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});
  };
  goBack = () =>{
    window.history.go(-1);
  }
  phoneNumberValidateHandler(name, isValid, value, countryData, number, ext) {

    this.setState({
      phone: value,
      countryPhone:countryData.iso2,
      phoneNumberFeedBack: true,
      errorMsgPhoneNumber :"",
    },function afterStateChange () {
      this.checkIsValidBidData()
    });
    if (value === '') {
      this.setState({
        phoneNumber: false,
        errorMsgPhoneNumber: "phoneNumber is Require",
      },function afterStateChange () {
        this.checkIsValidBidData()
      });
    }else{
      this.props.doValidateMobileNumber(number).then(resp => {
        this.setState({
          phoneNumber: !resp,
          errorMsgPhoneNumber: "Invalid phone number",
        },function afterStateChange () {
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
      expMonthValue:this.expMonth.value,
    },function afterStateChange () {
      this.checkIsValidBidData()
    });
    if (this.expMonth.value && this.expMonth.value.trim() === '') {
      this.setState({
        expMonth: false,
        errorMsgExpMonth: "Expire Month is Require",
      },function afterStateChange () {
        this.checkIsValidBidData()
      });
    }  else {
      this.setState({
        expMonth: true
      });
    } this.checkIsValidBidData();
    // this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});
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
        expYear: true});
    }
    this.checkIsValidBidData();
    // this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});
  };
  componentWillMount() {
    this.changePhone = this.phoneNumberValidateHandler.bind(this, 'phone');this.props.doGetEventData(this.props.params && this.props.params.params);
    this.props.doGetSettings(this.props.params && this.props.params.params, 'auction').then(resp => {
      if(!resp.data.moduleActivated || resp.data.moduleEnded){
        this.setState({
          errorMsgCard:"Please activate this module to start accepting pledges.",
          popupHeader :'Failed',
        })
      }
      this.setState({
        settings: resp && resp.data
      });
    }).catch(error => {
      history.push('/404');
    });
    this.props.doGetAuctionItemByCode(this.props.params && this.props.params.params, this.props.itemCode)
      .then(resp => {
        if (resp && resp.data) {
          this.setState({
            auctionData: resp.data
          })
        }
      }).catch(error => {
      history.push('/404');
    });
  };
  componentReRender = () => {
    this.props.doGetEventData(this.props.params && this.props.params.params);
    this.props.doGetSettings(this.props.params && this.props.params.params, 'auction').then(resp => {
      this.setState({
        settings: resp && resp.data
      });
    }).catch(error => {
      history.push('/404');
    });
    this.props.doGetAuctionItemByCode(this.props.params && this.props.params.params, this.props.itemCode)
      .then(resp => {
        if (resp && resp.data) {
          this.setState({
            auctionData: resp.data
          })
        }
      }).catch(error => {
    });
    this.setState({
      amountFeedBack:false,
    });
    if(this.props.authenticated){
      this.amount.value="";
    }
  };
  showPopup = () => {
    this.setState({
      showPopup: true
    })
  };
  hidePopup = () => {
    this.setState({
      showPopup: false
    });
    if(this.state.popupHeader !== "Failed"){
      this.componentReRender();
    }
  };
  reRender = ()=>{
    // window.location.reload();
  };
  checkIsValidBidData = () =>{

    let valid1=true;
    let valid2=true;
    let flag=true;
    if(this.props.authenticated){
      if( this.props.user && this.props.user.firstName == null ){
        valid1=!!(this.state.firstName && this.state.lastName && this.state.amount );
        flag=false;
      }
      if( this.props.user &&  this.props.eventData.ccRequiredForBidConfirm ){

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

  render() {
    let form_login = <div>
      <h4>Login or signup below</h4>
      <form className="ajax-form validated fv-form fv-form-bootstrap"
            autoComplete="off" method="POST"
            noValidate="novalidate"
            onSubmit={this.signupForm}>
        <div
          className={cx("form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
          <label className="control-label">Email Address</label>
          <div className="input-group">
            <div className="input-group-addon">
              <i className="fa fa-envelope" aria-hidden="true"/>
            </div>
            <input type="email" className="form-control login-email"
                   placeholder="Email"
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
          <small className="help-block">{this.state.errorMsgEmail}</small>}
        </div>
        <div className="row">
          <div className="col-md-12">
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
                  defaultCountry={this.props.country || ""}
                  value={ this.state.phone || ""}
                  onPhoneNumberChange={this.changePhone}
                />
                { this.state.phoneNumberFeedBack && this.state.phoneNumber &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
                <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
              </div>
              { this.state.phoneNumberFeedBack && !this.state.phoneNumber &&
              <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgPhoneNumber}</small>}
            </div>
          </div>
        </div>
        <div
          className={cx("form-group", this.state.passwordFeedBack && 'has-feedback', this.state.passwordFeedBack && this.state.password && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
          <label className="control-label login-password">Enter or Create Password</label>
          <div className="input-group">
            <div className="input-group-addon">
              <i className="fa fa-key" aria-hidden="true"/>
            </div>
            <input type="password" className="form-control zindex" name="password"
                   autoComplete="new-password"
                   placeholder="Enter or create a password"
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
          <small className="help-block">{this.state.errorMsgPassword}</small>}
          {this.state.showForgatePassword &&  <Link to="/u/password-reset" >Forgate Password</Link> }

        </div>
        <Button className={cx("btn btn-primary text-uppercase")}
                // disabled={!(this.state.emailValue && this.state.passwordValue && this.state.phone)} role="button"
                disabled={!( !(this.state.emailFeedBack && this.state.passwordFeedBack && this.state.phoneNumberFeedBack) || (this.state.email   && this.state.password   && this.state.phoneNumber ))} role="button"
                loading={this.state.loading} type="submit"
                data-loading-text="<i class='fa fa-spinner fa-spin'></i> Getting Started..">
          SUBMIT
        </Button>
      </form>
    </div>;
    let form_bid = <form className="ajax-form validated fv-form fv-form-bootstrap" method="post"
                         onSubmit={this.onBidFormClick}>
      <div className="form-group">
        <label className="control-label" style={{display: 'block'}}>Email Address</label>
        <div
          className="input-group">{this.props.user.email}</div>
      </div>
      <div className="form-group">
        <label className="control-label" style={{display: 'block'}}>Cell Number</label>
        <div
          className="input-group">{this.props.user.phonenumber}</div>
      </div>
      { !this.props.authenticated || ( this.props.authenticated && this.props.user.firstName == null ) ? <div
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
        <small className="help-block">First Name is required.</small>}
      </div> : ""}
      { !this.props.authenticated || ( this.props.authenticated && this.props.user.lastName == null ) ? <div
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
        <small className="help-block">Last Name is required.</small>}
      </div> : ''}
      <div
        className={cx("form-group", this.state.amountFeedBack && 'has-feedback', this.state.amountFeedBack && this.state.amount && 'has-success', this.state.amountFeedBack && (!this.state.amount) && 'has-error')}>
        <div className="row">
          <div className="col-md-6">
            <label className="control-label">Bid Amount</label>
            <div className="input-group">
              <div className="input-group-addon">{this.props.currencySymbol}</div>
              <input type="number" className="form-control" name="itembid" id="itembid"
                     placeholder="Amount"
                     ref={ref => {
                       this.amount = ref;
                     }}
                     onKeyUp={this.amountValidateHandler}/>
              { this.state.amountFeedBack && this.state.amount &&
              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
              { this.state.amountFeedBack && !this.state.amount &&
              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
            </div>
            { this.state.amountFeedBack && !this.state.amount &&
            <small className="help-block" data-fv-result="NOT_VALIDATED">{this.state.errorMsgAmount}</small>}
          </div>
        </div>
      </div>
      { !this.props.authenticated || ( this.props.authenticated && ( this.props.user &&   this.props.eventData && this.props.eventData.ccRequiredForBidConfirm ) ) ?
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
                <small className="help-block">{this.state.errorMsgcardNumber}.</small>}
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
                      }} onChange={this.expMonthValidateHandler}>
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
                              }} onChange={this.expYearValidateHandler}>
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
                      <input type="number" className="form-control field-cvv" maxLength="4" size={4}
                             data-stripe="cvc" id="cvv" placeholder="CVC/CVV" data-fv-field="cvv"
                             ref={ref => {
                               this.cvv = ref;
                             }}
                             onKeyUp={this.cvvValidateHandler} />
                      { this.state.cvvFeedBack && this.state.cvv &&
                      <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                      { this.state.cvvFeedBack && !this.state.cvv &&
                      <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                    </div>
                    { this.state.cvvFeedBack && !this.state.cvv &&
                    <small className="help-block">{ this.state.errorMsgcvv  }</small>}

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
          </div>
        </div> : "" }
      <div className="col-sm-3">
        <Button   loading={this.state.loading} className={cx("btn btn-primary text-uppercase")} disabled={!this.state.isValidBidData} role="button"
                  type="submit" >
          Submit bid
        </Button>
        &nbsp;&nbsp;
      </div>
      <div className="col-sm-6" style={{paddingLeft:5}}>
        <a role="button" className="btn btn-success btn-block" onClick={this.goBack}
           >
          Go back to All Items</a></div>
    </form>;
    let form_bid_only = <form className="ajax-form validated fv-form fv-form-bootstrap" method="post"
                              onSubmit={this.onBidFormClick}>
      <div className="form-group">
        <label className="control-label" style={{display: 'block'}}>Email Address</label>
        <div
          className="input-group">{this.props.user.email}</div>
      </div>
      <div className="form-group">
        <label className="control-label" style={{display: 'block'}}>Cell Number</label>
        <div
          className="input-group">{this.props.user.phonenumber}</div>
      </div>
      { !this.props.authenticated || ( this.props.authenticated && this.props.user.firstName == null ) ? <div
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
        <small className="help-block">First Name is required.</small>}
      </div> : ""}
      { !this.props.authenticated || ( this.props.authenticated && this.props.user.lastName == null ) ? <div
        className={cx("form-group", this.state.lastNameFeedBack && 'has-feedback', this.state.lastNameFeedBack && this.state.lastName && 'has-success', this.state.lastNameFeedBack && (!this.state.lastName) && 'has-error')}>
        <label className="control-label">Last Name</label>
        <div className="input-group">
          <div className="input-group-addon">
            <i className="fa fa-user" aria-hidden="true"/>
          </div>
          <input type="text" className="form-control" name="lastname"
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
        <small className="help-block">Last Name is required.</small>}
      </div> : ''}
      <div
        className={cx("form-group", this.state.amountFeedBack && 'has-feedback', this.state.amountFeedBack && this.state.amount && 'has-success', this.state.amountFeedBack && (!this.state.amount) && 'has-error')}>
        <div className="row">
          <div className="col-md-12">
            <label className="control-label">Bid Amount</label>
            <div className="input-group">
              <div className="input-group-addon">{this.props.currencySymbol}</div>
              <input type="number" className="form-control" name="itembid" id="itembid" style={{"width":"45%"}} 
                     placeholder="Amount"
                     ref={ref => {
                       this.amount = ref;
                     }}
                     onKeyUp={this.amountValidateHandler}/>
              { this.state.amountFeedBack && this.state.amount &&
              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
              { this.state.amountFeedBack && !this.state.amount &&
              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
            </div>
            { this.state.auctionData && this.state.amountValue && this.state.auctionData.buyItNowPrice > 0 && this.state.amountValue >= this.state.auctionData.buyItNowPrice &&
            <small className="text-success" >Your bid qualifies for this item's Buy it Now price</small>}
            { this.state.amountFeedBack && !this.state.amount &&
            <small className="help-block" >{this.state.errorMsgAmount}</small>}
          </div>
        </div>
      </div>
      { !this.props.authenticated || ( this.props.authenticated && ( this.props.user &&   this.props.eventData && this.props.eventData.ccRequiredForBidConfirm ) ) ?
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
                <small className="help-block">{this.state.errorMsgcardHolder}</small>}

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
                <small className="help-block">{this.state.errorMsgcardNumber}.</small>}
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group expiration-date has-feedback">
                    <label className="control-label">Expiration Date</label>
                    <div className="input-group">
                      <div className="input-group-addon field-exp_month"><i className="fa fa-calendar"
                                                                            aria-hidden="true"/></div>
                      <select className data-stripe="exp_month" id="exp-month" data-fv-field="expMonth" ref={ref => {
                        this.expMonth = ref;
                      }} onChange={this.expMonthValidateHandler}>
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
                              }} onChange={this.expYearValidateHandler}>
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
                    <small className="help-block">{ this.state.errorMsgcvv  }</small>}

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
          </div>
        </div> : "" }

      <div className="col-sm-3" style={{paddingLeft:0}}>
        <Button  loading={this.state.loading} className={cx("btn btn-primary text-uppercase")} disabled={!this.state.isValidBidData} role="button"
                 type="submit" >
          Submit bid
        </Button>
        &nbsp;&nbsp;
      </div>
      <div className="col-sm-5" style={{paddingLeft:0,marginLeft:-14,"width":"40%"}}>
        <a onClick={this.goBack} className="btn btn-success btn-block" >
          Go back to All Items
        </a>
      </div>
    </form>;
    let div_bid_close = <div className="alert alert-success text-center">Item Has Been Purchased for {this.props.currencySymbol}<span
      className="current-bid">400</span></div>;
    let bid_active = this.state.auctionData && this.state.auctionData.purchased;

    return (
      <div className="row">
        <div className="col-lg-12">
          <div id="content-wrapper" >
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">
                <EventAside activeTab={'Auction'} eventData={this.props.eventData} settings={this.state.settings}
                            eventTicketData={this.props.eventTicketData}
                            showMapPopup={this.showMapPopup} activeCategory={false}/>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8">
                <div className="main-box clearfix">
                  <h1 className="text-center mrg-t-lg"
                      id="item-name">{this.state.auctionData && this.state.auctionData.name}</h1>
                  <div className="row mrg-t-lg">
                    <div className="col-md-6">
                      <div className="pad-l-md pad-r-md">
                        <div className="item-image">
                          <Carousel axis="horizontal" showThumbs={false} showArrows={true} showStatus={false}>
                            {this.state.auctionData && this.state.auctionData.images.length > 0 ?
                              this.state.auctionData.images.map((item, index) =>
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
                      <div className="mrg-t-lg pad-l-md pad-r-md"
                           dangerouslySetInnerHTML={ {__html: this.state.auctionData && this.state.auctionData.description } }>

                      </div>
                    </div>
                    <div className="col-md-6" style={{paddingRight: 16,paddingBottom:10}}>
                      {this.state.errorMsgCard  &&  <div  className={cx("ajax-msg-box text-center mrg-b-lg", this.state.popupHeader !== 'Failed'  ? 'text-success':'text-danger')} >
                        { this.state.errorMsgCard }</div> }
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="curr-bid-number">{this.props.currencySymbol}<span
                            className="current-bid">{this.state.auctionData && this.state.auctionData.currentBid}</span>
                          </div>
                          <div className="curr-bid-text">Current Bid</div>
                        </div>
                        {this.state.auctionData && this.state.auctionData.buyItNowPrice > 0 &&
                        <div className="col-sm-4">
                          <div className="curr-bid-number">{this.props.currencySymbol}<span
                            className="current-bid">{this.state.auctionData.buyItNowPrice}</span></div>
                          <div className="curr-bid-text">BUY NOW PRICE</div>
                        </div>}
                        {this.state.auctionData && this.state.auctionData.marketValue > 0 && <div className="col-sm-4">
                          <div className="curr-bid-number">{this.props.currencySymbol}<span
                            className="current-bid">{this.state.auctionData.marketValue}</span></div>
                          <div className="curr-bid-text">MARKET VALUE</div>
                        </div>}
                      </div>
                      { bid_active ? div_bid_close : '' }
                      { !bid_active ? this.props.authenticated ? this.props.user ? form_bid_only : form_bid : form_login : '' }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PopupModel
          id="bookingPopup"
          showModal={this.state.showPopup}
          headerText={<p>{this.state.popupHeader}</p>}
          modelBody=''
          onCloseFunc={this.hidePopup}>
          <div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>
            { this.state && this.state.errorMsgCard }
            <div className="modal-footer">
              {this.state.popupHeader == 'Success' ? <Button
                className="btn btn-success" onClick={this.placeBid}
                loading={this.state.loading}
              >Confirm</Button> : ''}
              {this.state.popupHeader == 'Confirm' ? <Button
                className="btn btn-success" onClick={this.placeBidByAmount}
                loading={this.state.loading}
              >Confirm</Button> : ''}
              <button className="btn btn-danger" onClick={this.hidePopup}>Close</button>
            </div>
          </div>
        </PopupModel>
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
  doGetAuctionItemByCode: (eventUrl, itemCode) => doGetAuctionItemByCode(eventUrl, itemCode),
  doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
  doSignUp: (eventUrl, userData) => doSignUp(eventUrl, userData),
  submitAuctionBid: (eventUrl, userData) => submitAuctionBid(eventUrl, userData),
  changeUserData: (data, userData) => changeUserData(data, userData),
  doValidateMobileNumber: (mobileNumber) => doValidateMobileNumber(mobileNumber),
  getCardToken: (stripeKey, cardNumber, expMonth, expYear, cvc) => getCardToken(stripeKey, cardNumber, expMonth, expYear, cvc),
};
const mapStateToProps = (state) => ({
  stripeKey: state.event && state.event.data && state.event.data.stripeKey,
  eventData: state.event && state.event.data,
  eventTicketData: state.event && state.event.ticket_data,
  auction_data: state.event && state.event.auction_data,
  user: state.session.user,
  authenticated: state.session.authenticated,
	currencySymbol: state.event && state.event.currencySymbol || "$",
	country: state.location && state.location.data && state.location.data.country && state.location.data.country.toLowerCase(),
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Auction));
