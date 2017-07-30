
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './fund.css';
import cx from 'classnames';
import {connect} from 'react-redux';
import {doGetEventData, doGetSettings,doSignUp,fundaNeed,doValidateMobileNumber, doGetFundANeedItemByCode} from './../action/index';
import {getCardToken} from './../../checkout/action/index';
import  history from './../../../history';

import PopupModel from './../../../components/PopupModal/index';
import LoginModal from '../../../components/LoginModal/index';
import  EventAside from './../../../components/EventAside/EventAside';

import  {Carousel} from 'react-responsive-carousel';
import Button from 'react-bootstrap-button-loader';
import Link from '../../../components/Link';
import IntlTelInput from 'react-intl-tel-input';

class Fund extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {
      isShowLoginModal:false,
      settings: null,
      showBookingTicketPopup: false,
      showMapPopup: false,

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
      errorMsgCard:null,

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
      showPopup: false,
      stripeToken:null,
      loading:false,
      countryPhone:null,
      phone:null,
    }

  };
  onFormClick = (e) => {
    e.preventDefault();
    if ( !this.state.settings.moduleActivated){
      this.setState({
        showMapPopup: true,
        errorMsg: " Pledges are no longer being accepted for this Need." ,
        popupHeader:"Failed",
      })
    }else{
      if(this.props.authenticated &&  this.props.user && this.props.eventData && !this.props.eventData.ccRequiredForBidConfirm && (this.props.user && this.props.user.linkedCard && this.props.user.linkedCard.stripeCards.length > 0 ) ){
        this.setState({
          showMapPopup: true,
          errorMsg: " Your card ending in " + this.props.user.linkedCard.stripeCards[0].last4  + " will be charged $ "+  this.state.amountValue  + " for  " +  this.state.fundData.name ,
          popupHeader:"Confirm",
        })
      }else{
        this.setState({
          showMapPopup: true,
          errorMsg: " Your card ending in " + this.state.cardNumberValue.slice( - 4)  + " will be charged $ "+  this.state.amountValue  + " for  " +  this.state.fundData.name ,
          popupHeader:"Confirm",
        })
      }
    }
  };
  submiteFundForm = () => {
    this.setState({
      loading: true,
    });
    if(!this.props.authenticated){
      let userData={
        "firstname":this.state.firstNameValue,
        "lastname":this.state.lastNameValue,
        "countryCode": this.state.countryPhone,
        "email": this.state.emailValue,
        "password": this.state.passwordValue,
        "phoneNumber": this.state.phone
      };
      this.props.doSignUp(this.props.params && this.props.params.params,userData ).then((resp)=>{
        if(!resp.error){
          const card = {
            number: this.cardNumber.value.trim(),
            cvc: this.cvv.value.trim(),
            exp_month: this.expMonth.value.trim(),
            exp_year: this.expYear.value.trim(),
          };
          this.props.getCardToken(this.props.stripeKey, this.cardNumber.value.trim(), this.expMonth.value.trim(), this.expYear.value.trim(), this.cvv.value.trim()).then(resp=>{
            if (resp.error) {
              this.setState({
                errorMsg: resp.error.message,
                isError:true,
                popupHeader:"Failed",
                loading:false,
              });
            } else {
              const user = {
                stripeToken : resp.id,
                amount: this.state.amountValue,
                itemCode: this.state.fundData.code,
              };
              this.fundaNeed(user);
            }
          });
        } else{
          this.setState({error:"Invalid Email or password"});
        }
      });
    }
    else if(  this.props.eventData && this.props.eventData.ccRequiredForBidConfirm || (this.props.user && this.props.user.linkedCard && this.props.user.linkedCard.stripeCards.length <= 0  )  ){
      const card = {
        number: this.cardNumber.value.trim(),
        cvc: this.cvv.value.trim(),
        exp_month: this.expMonth.value.trim(),
        exp_year: this.expYear.value.trim(),
      };
      this.props.getCardToken(this.props.stripeKey, this.cardNumber.value.trim(), this.expMonth.value.trim(), this.expYear.value.trim(), this.cvv.value.trim()).then(resp=>{
        if (resp.error) {
          this.setState({
            errorMsg: resp.error.message,
            isError:true,
            popupHeader:"Failed",
            loading:false,
          });
        } else {
          const user = {
            stripeToken : resp.id,
            amount: this.state.amountValue,
            email:this.props.user.email,
            itemCode: this.state.fundData.code,
            paymenttype:"CC",
          };
          this.fundaNeed(user);
        }
      });
    }
    else if(this.state.amountValue){
      const user = {
        amount: this.state.amountValue,
        email:this.props.user.email,
        paymenttype:"CC",
        itemCode: this.state.fundData.code,
      };
      this.fundaNeed(user);
    }else {
      this.setState({
        loading:false,
      })
    }
    this.setState({
      showDonationPopup:false,
    })
  };
  fundaNeed = (user) => {
    this.props.fundaNeed(this.props.params && this.props.params.params, user)
      .then(resp => {
        if (resp && resp.message) {
          this.setState({
            errorMsg: resp.message,
            isError:false,
            popupHeader:"Success",
            loading:false,
          }, function stateChange(){
            this.clearFormData();
          });
        }else{
          this.setState({
            errorMsg: resp.errorMessage,
            isError:true,
            popupHeader:"Failed",
            loading:false,
          });
        }
      });
  };
  clearFormData = () =>{
      this.setState({
      amountFeedBack:false,
      cardHolderFeedBack:false,
      cardNumberFeedBack:false,
      expMonthFeedBack:false,
      cvvFeedBack:false,
    });
    this.amount.value="";
    if(!this.props.authenticated || ( this.props.authenticated && (  this.props.eventData && this.props.eventData.ccRequiredForBidConfirm || (this.props.user && this.props.user.linkedCard && this.props.user.linkedCard.stripeCards.length <= 0  ) ) )){
      this.cardHolder.value="";
      this.cardNumber.value="";
      this.cvv.value="";
    }
  };
  emailValidateHandler = (e) => {
    this.setState({
      emailFeedBack: true,
      emailValue:this.email.value.trim(),
    },function afterTitleChange () {
      this.checkIsValidBidData()
    });
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.email.value.trim() == '') {
      this.setState({
        email: false,
        errorMsgEmail: "Email is required.",
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    }
    else {
      this.setState({
        email: re.test(this.email.value.trim()),
        errorMsgEmail: "Invalid Email.",
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    }
    this.setState({isValidData: !!(this.email.value.trim() && this.password.value.trim())});

  };
  passwordValidateHandler = (e) => {

    this.setState({
      passwordFeedBack: true,
      passwordValue:this.password.value.trim(),
    },function afterTitleChange () {
      this.checkIsValidBidData()
    });

    if (this.password.value.trim() == '') {

      this.setState({
        password: false
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    } else {
      this.setState({
        password: true
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    }
    this.setState({isValidData: !!(this.email.value.trim() && this.password.value.trim())});

  };

  firstNameValidateHandler = (e) => {
    this.setState({
      firstNameFeedBack: true,
      firstNameValue:this.firstName.value.trim()
    },function afterTitleChange () {
      this.checkIsValidBidData()
    });
    if (this.firstName.value.trim() == '') {
      this.setState({
        firstName: false
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    } else {
      this.setState({
        firstName: true
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    }
    //  this.setState({isValidBidData: !!(this.state.firstNameFeedBack && this.state.lastNameFeedBack && this.state.cardNumberFeedBack && this.state.cardHolderFeedBack && this.state.amountFeedBack && this.state.cvvFeedBack)});
  };
  lastNameValidateHandler = (e) => {
    this.setState({
      lastNameFeedBack: true,
      lastNameValue: this.lastName.value.trim(),
    },function afterTitleChange () {
      this.checkIsValidBidData()
    });
    if (this.lastName.value.trim() == '') {

      this.setState({
        lastName: false
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    } else {
      this.setState({
        lastName: true
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    }
    // this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});
  };
  cardHolderValidateHandler = (e) => {
    this.setState({
      cardHolderFeedBack: true,
      cardHolderValue:this.cardHolder.value.trim(),
    },function afterTitleChange () {
      this.checkIsValidBidData()
    });

    if (this.cardHolder.value.trim() == '') {

      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name is required and can't be empty",
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    } else if (!( this.cardHolder.value.trim().length >= 6 && this.cardHolder.value.trim().length <= 70 )) {
      this.setState({
        cardHolder: false,
        errorMsgcardHolder: "The card holder name must be more than 6 and less than 70 characters long ",
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    } else {
      this.setState({
        cardHolder: true
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    }
    //  this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});

  };
  cardNumberValidateHandler = (e) => {
    this.cardNumber.value=this.cardNumber.value.substr(0,16);
    this.setState({
      cardNumberFeedBack: true,
      cardNumberValue:this.cardNumber.value.trim(),
    },function afterTitleChange () {
      this.checkIsValidBidData()
    });


    if (this.cardNumber.value.trim() == '') {

      this.setState({
        cardNumber: false,
        errorMsgcardNumber: "Enter Card Number ",
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    } else if (this.cardNumber.value.trim().length !== 16 && this.cardNumber.value.trim().length !== 15) {
      this.setState({
        cardNumber: false,
        errorMsgcardNumber: " Please enter a Valid Card Number ",
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    } else {
      this.setState({
        cardNumber: true
      });
    } this.checkIsValidBidData();
    //   this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});

  };
  amountValidateHandler = (e) => {
    let amount=true;
    let errorMsgAmount="";
    if (this.amount.value.trim() == '') {
      errorMsgAmount= "Bid Amount can't be empty";
      amount=false
    }else if (this.state.fundData.pledgePrice  > this.amount.value.trim()) {
      errorMsgAmount= "Submitted pledge amount should be greater than or equal to the stated pledge amount.";
      amount=false
    } else {
      amount=true
    }
    this.setState({
      //isValidBidData: ( this.amount.value.trim() && amount),
      amount:amount,
      amountFeedBack: true,
      errorMsgAmount:errorMsgAmount,
      amountValue:this.amount.value.trim()
    },function afterTitleChange () {
      this.checkIsValidBidData()
    });
    //this.checkIsValidBidData();
  };
  cvvValidateHandler = (e) => {
    this.cvv.value=this.cvv.value.substr(0,4);
    this.setState({
      cvvFeedBack: true
    },function afterTitleChange () {
      this.checkIsValidBidData()
    });

    if (this.cvv.value.trim() == '') {

      this.setState({
        cvv: false,
        errorMsgcvv: "The CVV is required and can't be empty",
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    } else if (!( 3 <= this.cvv.value.trim().length && 4 >= this.cvv.value.trim().length )) {
      this.setState({
        cvv: false,
        errorMsgcvv: "The CVV must be more than 4 and less than 3 characters long",
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    } else {
      this.setState({
        cvv: true
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    }
    this.checkIsValidBidData();
    // this.setState({isValidBidData: !!(this.firstName.value.trim() && this.lastName.value.trim() && this.cardNumber.value.trim() && this.cardHolder.value.trim() && this.amount.value.trim() && this.cvv.value.trim())});
  };
  phoneNumberValidateHandler(name, isValid, value, countryData, number, ext) {
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
    },function afterTitleChange () {
      this.checkIsValidBidData()
    });
    if (this.expMonth.value.trim() == '') {
      this.setState({
        expMonth: false,
        errorMsgExpMonth: "Expire Month is Require",
      },function afterTitleChange () {
        this.checkIsValidBidData()
      });
    }  else {
      this.setState({
        expMonth: true
      });
    } this.checkIsValidBidData();
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
    } this.checkIsValidBidData();
    // this.setState({isValidBidData: !!(this.firstName.value && this.lastName.value && this.cardNumber.value && this.cardHolder.value && this.amount.value && this.cvv.value)});
  };

  checkIsValidBidData = () => {
    let valid1=true;
    let valid2=true;
    let flag=true;
    if(this.props.authenticated){
      if( this.props.user.firstName == null ){
        valid1=!!(this.state.firstName && this.state.lastName && this.state.amount );
        flag=false;
      }
      if(this.props.eventData && this.props.eventData.ccRequiredForBidConfirm || (this.props.user && this.props.user.linkedCard && this.props.user.linkedCard.stripeCards.length <= 0  ))
      {
        valid2=!!(this.state.amount && this.state.cardNumber && this.state.cardHolder  && this.state.cvv && this.expMonth && this.expYear);
        flag=false;
      }
      if(flag) {
        valid1=!!(this.state.amount);
        valid2=!!(this.state.amount);
      }
    } else {
      valid2=!!(this.state.phoneNumber && this.state.password && this.state.email && this.state.firstName && this.state.lastName && this.state.amount && this.state.cardNumber && this.state.cardHolder  && this.state.cvv && this.expMonth && this.expYear);
    }
    this.setState({isValidBidData: (valid1 && valid2)});
  };

  componentWillMount() {
    this.changePhone = this.phoneNumberValidateHandler.bind(this, 'phone');
    this.props.doGetEventData(this.props.params && this.props.params.params);
    this.props.doGetSettings(this.props.params && this.props.params.params, 'fundaneed').then(resp => {
      if(!resp.data.moduleActivated){
        this.setState({
          errorMsg:"Please activate this module to start accepting pledges.",
          popupHeader :'Failed',
        })
      }
      this.setState({
        settings: resp && resp.data,
      });
    }).catch(error => {
      history.push('/404');
    });
    this.props.doGetFundANeedItemByCode(this.props.params && this.props.params.params, this.props.itemCode)
      .then(resp => {
        if (resp && resp.data) {
          this.setState({
            fundData: resp.data
          })
        }
      }).catch(error => {
      history.push('/404');
    });
  };
  componentRernder() {
    this.clearFormData();
    this.props.doGetEventData(this.props.params && this.props.params.params);
    this.props.doGetSettings(this.props.params && this.props.params.params, 'auction').then(resp => {
      this.setState({
        settings: resp && resp.data
      });
    }).catch(error => {
      history.push('/404');
    });
    this.props.doGetFundANeedItemByCode(this.props.params && this.props.params.params, this.props.itemCode)
      .then(resp => {
        if (resp && resp.data) {
          this.setState({
            fundData: resp.data
          })
        }
      }).catch(error => {
      console.log(error)
    });
  };
  reRender = ()=>{
    // window.location.reload();
  };
  showPopup = () => {
    this.setState({
      showDonationPopup: true
    })
  };
  hidePopup = () => {
    this.setState({
      showMapPopup: false,
    })
    if(this.state.popupHeader == "Success" ){
      this.componentRernder();
    }
    if(this.state.popupHeader == "Confirm" ){
     this.setState({
       errorMsg:""
     });
    }
  };
  hideLoginModal  = () => {
    this.setState({
      isShowLoginModal:false,
    })
  };
  showLoginModal = () => {
    this.setState({
      isShowLoginModal:true,
    })
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div id="content-wrapper">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4">
                <EventAside activeTab={'Fund a Need'} eventData={this.props.eventData} settings={this.state.settings}
                            eventTicketData={this.props.eventTicketData}
                            activeCategory={false}/>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8">
                <div className="main-box clearfix">
                  <h1 className="text-center mrg-t-lg"
                      id="item-name">{this.state.fundData && this.state.fundData.name}</h1>
                  <div className="row mrg-t-lg">
                    <div className="col-md-6">
                      <div className="pad-l-md pad-r-md">
                        <div className="item-image">
                          <Carousel axis="horizontal" showThumbs={false} showArrows={true} showStatus={false} dynamicHeight emulateTouch>
                            {this.state.fundData && this.state.fundData.images.length > 0 ?
                              this.state.fundData.images.map((item, index) =>
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
                      <div className="mrg-t-lg pad-l-md pad-r-md" dangerouslySetInnerHTML={ {__html: this.state.fundData && this.state.fundData.description } } >

                      </div>
                    </div>
                    <div className="col-md-6" style={{paddingRight: 16}}>
                      <div className="row">
                        <div  className={cx("ajax-msg-box text-center mrg-b-lg", this.state.popupHeader !== 'Failed'  ? 'text-success':'text-danger')} >
                          { this.state.errorMsg }</div>
                        <div className="col-sm-6 col-md-6">
                          <h3 className="item-label ">Pledge Amount</h3>
                          <h4 className="item-bid-price">
                            $ <span
                            className="item-bid-price"> {this.state.fundData && this.state.fundData.pledgePrice} </span>
                          </h4>
                        </div>
                      </div>
                      <form className="ajax-form validated fv-form fv-form-bootstrap" method="post"
                            action="/AccelEventsWebApp/events/148/C/FAN/bid" data-has-cc-info="true"
                            data-show-cc-confirm="true" data-confirm-message="getCauseStripeConfirmMessage"
                            data-validate-function="validateCauseBidForm" data-onsuccess="handleCauseBidSubmit"
                            data-validation-fields="getCauseBidValidationFields" noValidate="novalidate"
                            onSubmit={this.onFormClick}>
                        <button type="submit" className="fv-hidden-submit"
                                style={{display: 'none', width: 0, height: 0}}/>
                        <div className="ajax-msg-box text-center mrg-b-lg" style={{display: 'none'}}><span
                          className="fa fa-spinner fa-pulse fa-fw"/> <span className="resp-message"/></div>
                        { !this.props.authenticated || ( this.props.authenticated && this.props.user.firstName == null ) ?  <div
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
                            { this.state.firstNameFeedBack && this.state.firstName &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                            { this.state.firstNameFeedBack && !this.state.firstName &&
                            <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                          </div>
                          { this.state.firstNameFeedBack && !this.state.firstName &&
                          <small className="help-block" data-fv-result="NOT_VALIDATED">First Name is required.</small>}
                        </div> : ""}
                        { !this.props.authenticated || ( this.props.authenticated && this.props.user.lastName == null ) ?  <div
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

                        { !this.props.authenticated &&
                        <div>
                          <h4><a role="button" href="#login-user" onClick={this.showLoginModal} data-toggle="modal" data-form="login">Log in</a> or Sign
                            up below</h4>
                          <div
                            className={cx("form-group", this.state.emailFeedBack && 'has-feedback', this.state.emailFeedBack && this.state.email && 'has-success', this.state.emailFeedBack && (!this.state.email) && 'has-error')}>
                            <label className="control-label">Email Address</label>
                            <div className="input-group">
                              <div className="input-group-addon">
                                <i className="fa fa-envelope" aria-hidden="true"/>
                              </div>
                              <input type="email" className="form-control login-email" name="email" placeholder="Email"
                                     data-fv-field="email"
                                     ref={ref => {
                                       this.email = ref;
                                     }}
                                     onKeyUp={this.emailValidateHandler}/>
                              { this.state.emailFeedBack && this.state.email &&
                              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                              { this.state.emailFeedBack && !this.state.email &&
                              <i className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                            </div>
                            { this.state.emailFeedBack && !this.state.email &&
                            <small className="help-block" data-fv-validator="emailAddress" data-fv-for="email"
                                   data-fv-result="NOT_VALIDATED">{this.state.errorMsgEmail}</small>}
                          </div>
                        </div> }
                        { !this.props.authenticated && <div className="row">
                          <div className="col-md-8">
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
                                  value={ this.state.phone || "" }
                                  maxLength={16} data-stripe="number"
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
                        </div> }
                        { !this.props.authenticated && <div
                          className={cx("form-group", this.state.passwordFeedBack && 'has-feedback', this.state.passwordFeedBack && this.state.password && 'has-success', this.state.passwordFeedBack && (!this.state.password) && 'has-error')}>
                          <label className="control-label login-password">Enter or Create
                            Password</label>
                          <div className="input-group">
                            <div className="input-group-addon">
                              <i className="fa fa-key" aria-hidden="true"/>
                            </div>
                            <input type="password" className="form-control zindex" name="password"
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

                        </div> }
                        { !this.props.authenticated || ( this.props.authenticated && (  this.props.eventData && this.props.eventData.ccRequiredForBidConfirm || (this.props.user && this.props.user.linkedCard && this.props.user.linkedCard.stripeCards.length <= 0  ) ) ) ?
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
                                  <label className="control-label">Credit Card Number </label>
                                  <div className="input-group">
                                    <div className="input-group-addon"><i className="fa fa-credit-card" aria-hidden="true"/>
                                    </div>
                                    <input type="number" className="form-control field-card_number" id="cardnumber"
                                           placeholder="8888-8888-8888-8888"  maxLength="16" data-stripe="number"
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
                           </div> : "" }
                        <div
                          className={cx("form-group", this.state.amountFeedBack && 'has-feedback', this.state.amountFeedBack && this.state.amount && 'has-success', this.state.amountFeedBack && (!this.state.amount) && 'has-error')}>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="input-group has-feedback">
                                <div className="input-group-addon">$</div>
                                <input type="number" className="form-control" name="itembid" id="itembid"
                                       placeholder="Pledge Amount" step required="required"
                                       data-isprocessingfeestopurchaser="false" data-fv-field="itembid"
                                       ref={ref => {
                                         this.amount = ref;
                                       }}
                                       onKeyUp={this.amountValidateHandler}/>
                                { this.state.amountFeedBack && this.state.amount && <i
                                  className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-ok"/>}
                                { this.state.amountFeedBack && !this.state.amount && <i
                                  className="form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove"/>}
                              </div>
                              { this.state.amountFeedBack && !this.state.amount &&
                              <small className="help-block" data-fv-validator="emailAddress" data-fv-for="email"
                                     data-fv-result="NOT_VALIDATED">{this.state.errorMsgAmount}</small>}
                            </div>
                          </div>
                        </div>
                        { !this.props.authenticated &&
                        <div className="form-group">
                          <div className="checkbox-nice">
                            <input type="checkbox" id="uptodate" name="uptodate" defaultChecked/> <label
                            htmlFor="uptodate">Stay up to date with Accelevents</label>
                          </div>
                        </div> }
                        <div className="row btn-row" >
                          <div className="col-sm-3">
                            <Button className={cx("btn btn-primary text-uppercase")}  disabled={!this.state.isValidBidData }
                                                             role="button" type="submit"
                                                             loading={this.state.loading} >
                            Submit Pledge
                          </Button></div>
                          <div className="col-sm-5"><Link to={this.props.params && "/event/" + this.props.params.params + '?tab=Fund a Need'} className="btn btn-success">
                            Go back to All Items
                          </Link></div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PopupModel
          id="mapPopup"
          showModal={this.state.showMapPopup}
          headerText= {<p>{this.state.popupHeader}</p>}
          modelBody='<div><h1>Location</h1></div>'
          onCloseFunc={this.hidePopup}
        >
          <div className="ticket-type-container"><input type="hidden" value="44" name="tickettypeid"/>
            { this.state && this.state.errorMsg }
            <div className="modal-footer">
              {/*{this.state.popupHeader == "Success" ? <button className="btn btn-success" onClick={this.submiteFundForm} >Confirm</button> : ""}*/}
              {this.state.popupHeader == "Confirm" ? <Button className="btn btn-success" loading={this.state.loading} onClick={this.submiteFundForm} >Confirm</Button> : ""}
              <button className="btn btn-danger" onClick={this.hidePopup}> Close </button>
            </div>
          </div>
        </PopupModel>
        <LoginModal showModal={this.state.isShowLoginModal}  	onCloseFunc={this.hideLoginModal}   params={this.props.params && this.props.params.params} modelFooter={<button className="btn btn-info center-block" data-dismiss="modal" onClick={() => {this.hideLoginModal()
           }}>Close</button>}/>
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
  doGetFundANeedItemByCode: (eventUrl, itemCode) => doGetFundANeedItemByCode(eventUrl, itemCode),
  doGetSettings: (eventUrl, type) => doGetSettings(eventUrl, type),
  fundaNeed: (eventUrl, data) => fundaNeed(eventUrl, data),
  doSignUp: (eventUrl, userData) => doSignUp(eventUrl, userData),
  doValidateMobileNumber: (mobileNumber) => doValidateMobileNumber(mobileNumber),
  getCardToken: (stripeKey, cardNumber, expMonth, expYear, cvc) => getCardToken(stripeKey, cardNumber, expMonth, expYear, cvc),
};
const mapStateToProps = (state) => ({
  stripeKey: state.event && state.event.data && state.event.data.stripeKey,
  eventData: state.event && state.event.data,
  eventTicketData: state.event && state.event.ticket_data,
  fundData: state.event && state.event.auction_data,
  user: state.session.user,
  authenticated: state.session.authenticated,
});

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Fund));
