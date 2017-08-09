import ReactDOM from 'react-dom';
import axios from 'axios';
import {sessionService, loadSession} from 'redux-react-session';

import {apiUrl as API_URL} from './../../../clientConfig';
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
export function doGetEventData(eventUrl) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl,
      data: {},
    }).then(response => {
      dispatch(storeEventData(response.data));
			dispatch(storeCurrencySymbols(response.data && response.data.currencySymbol));
			localStorage.setItem('eventsData', JSON.stringify(response.data));
      return response;

    })
      .catch(error => {

        return error;
      });
  }

}

/*----------------Ticketing-------------*/
export function doGetEventTicketSetting(eventUrl) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/ticketing/settings',
      data: {},
    }).then(response => {
      dispatch(storeEventTicketData(response.data));
      return response;

    })
      .catch(error => {
        return error;
      });
  }
}
export function doGetEventTicketByOrderId(eventUrl, OrderId) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/ticketing/order/' + OrderId + '/getformattributes',
      data: {},
    }).then(response => {
      return response;
    })
      .catch(error => {
        return error;
      });
  }
}
/*----------------Auction-------------*/
export function doGetAuctionSetting(eventUrl) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/auction/settings',
      data: {},
    }).then(response => {
      return response;
    })
      .catch(error => {
        return error;
      });
  }
}
export function doGetAuctionItemByCode(eventUrl, itemCode) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/auction/item/' + itemCode,
      data: {},
    });
  }

}

export function doGetAuctionItemByLimit(eventUrl, page, size, category,searchString) {
  return (dispatch) => {
    let query = '?page=' + page + '&size=' + size;
    if (category) {
      query += '&category=' + category;
    }if (searchString) {
      query += '&searchString=' + searchString;
    }
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/auction/items/' + query,
    }).then(response => {
      dispatch(storeAuctionData(response.data));
      return response;

    })
      .catch(error => {
        return error;
      });
  }

}

/*----------------Donation-------------*/
export function doGetDonationSetting(eventUrl) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/donation/settings',
      data: {},
    }).then(response => {
      return response;

    })
      .catch(error => {
        return error;
      });
  }

}

/*----------------Fund A Need-------------*/
export function doGetFundANeedSetting(eventUrl) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/fundaneed/settings',
      data: {},
    }).then(response => {
      return response;

    })
      .catch(error => {
        return error;
      });
  }

}
export function doGetFundANeedItemByCode(eventUrl, itemCode) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/fundaneed/item/' + itemCode,
      data: {},

    })
  }

}

export function doGetFundANeedItemByLimit(eventUrl, page, size, category,searchString) {
  return (dispatch) => {
    let query = '?page=' + page + '&size=' + size;
    if (category) {
      query += '&category=' + category;
    }if (searchString) {
      query += '&searchString=' + searchString;
    }
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/fundaneed/items/' + query,
      data: {},

    }).then(response => {
      dispatch(storeEventFundANeedData(response.data));
      return response;

    })
      .catch(error => {
        return error;
      });
  }

}

/*----------------Raffle-------------*/
export function doGetRaffleSetting(eventUrl) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/raffle/settings',
      data: {},

    }).then(response => {
      return response;

    })
      .catch(error => {
        return error;
      });
  }

}
export function getRaffleTickets() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/raffle/tickets',
      data: {},

    }).then(response => {
      return response;

    })
      .catch(error => {
        return error;
      });
  }
}

export function doGetRaffleItemByCode(eventUrl, itemCode) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/raffle/item/' + itemCode,
      data: {},


    })
  }

}

export function doGetRaffleItemByLimit(eventUrl, page, size, category,searchString) {
  return (dispatch) => {
    let query = '?page=' + page + '&size=' + size;
    if (category) {
      query += '&category=' + category;
    }
    if (searchString) {
      query += '&searchString=' + searchString;
    }
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/raffle/items/' + query,
      data: {},


    }).then(response => {
      return response;

    })
      .catch(error => {
        return error;
      });
  }

}


export function doGetSettings(eventUrl, type) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/' + type + '/settings',
      data: {},

    });
  }

}

export function doGeItemByCode(eventUrl, itemCode, type) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/' + type + '/item/' + itemCode,
      data: {},

    });
  }

}

export function doGetItemByLimit(eventUrl, page, size, type, category) {
  return (dispatch) => {
    let query = '?page=' + page + '&size=' + size;
    if (category) {
      query += '&category=' + category;
    }
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/' + type + '/items/' + query,
      data: {},

    });
  }

}

export function doOrderTicket(eventUrl, dto) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl + '/ticketing/order',
      data: dto,

    });
  }
}

export function doGetOrderById(eventUrl, orderId) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/ticketing/order/'+orderId+'/formattributes',
      data: {},

    }).then(resp=>{
      if(resp && resp.data){
        dispatch(storeOrderData(resp.data));
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}


export function storeEventData(data) {
  return {
    type: 'STORE_EVENT',
    data,
  }
}
export function storeCurrencySymbols(data) {
  return {
    type: 'STORE_EVENT_CURRENCY',
    data,
  }
}
export function storeEventRaffleData(data) {
  return {
    type: 'STORE_EVENT_RAFFLE',
    data,
  }
}
export function storeEventFundANeedData(data) {
  return {
    type: 'STORE_EVENT_FUND_A_NEED',
    data,
  }
}
export function storeEventDonationData(data) {
  return {
    type: 'STORE_EVENT_TICKET_DONATION',
    data,
  }
}
export function storeEventTicketData(data) {
  return {
    type: 'STORE_EVENT_TICKET',
    data,
  }
}
export function storeAuctionData(data) {
  return {
    type: 'STORE_EVENT_AUCTION',
    data,
  }
}
export function storeIsVolunteer(data) {
  return {
    type: 'IS_VOLUNTEER',
    data,
  }
}
//*************  Volunteer   ****************//

export function getItemStatusByCode(eventUrl, itemCode,module) {
  return (dispatch) => {
    return axios({
      method: 'get',
      //url: API_URL + 'events/' + eventUrl + '/volunteer/prices/item/' + itemCode,
      url: API_URL + 'events/' + eventUrl + '/volunteer/module/'+ module +'/prices/item/' + itemCode,

    });
  }
}
//****** Auction Bid*******//
export function getUserByEmail(eventUrl, email,modeltype) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/volunteer/loaduser/' + encodeURI(email) +'/module/'+modeltype,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function getUserByMobile(eventUrl, mobile,countryCode,modelType) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/volunteer/loaduser/' + mobile + '/'+ countryCode +'/module/'+modelType,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function getAuctionItemStatusByCode(eventUrl, itemCode) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/volunteer/prices/item/' + itemCode,

    });
  }
}
export function getAttendees(eventUrl) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/volunteer/allAttendees',

    });
  }
}
export function setAttendees(eventUrl,barcode,status) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/volunteer/checkin/barcode/' + barcode + "/checkin/" + status,

    });
  }
}

export function doLogin(email, password,rememberme=false) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'u/login',
      data: {
        username: email,
        password: password,
        rememberme:rememberme,
      }
    }).then(response => {
      dispatch(storeToken(response.data.access_token));
      getUserDetails(response.data.access_token).then(resp => {
        dispatch(storeLoginData(resp.data));
        localStorage.setItem('token', response.data.access_token);
        sessionService.saveSession(localStorage.getItem('token'));
        updateUserData(resp.data);
      }).catch(err => {
        return err;
      })
      return response;
    })
      .catch((error, code, status)=>{
        return error && error.response && error.response.data;
      });
  }
}
//********* Auction ************//
export function doSignUp(eventUrl,userData) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'u/loginsignup/' + eventUrl ,
      data:userData
    }).then(response => {
      dispatch(storeToken(response.data.access_token));
      getUserDetails(response.data && response.data.access_token).then(resp => {
        dispatch(storeLoginData(resp.data));
        localStorage.setItem('token', response.data.access_token);
        sessionService.saveSession(localStorage.getItem('token'));
        updateUserData(resp.data);

      }).catch(err => {
        return err;
      });
      return response;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}

function updateUserData(data){
  localStorage.setItem('user', JSON.stringify(data));
  sessionService.saveUser(JSON.parse(localStorage.getItem('user')));
}
export  function changeUserData(data,userData) {
  return (dispatch) => {
    let uData = data;
    if(userData.firstname !== null) {uData.firstName=userData.firstname;}
    if(userData.lastname !== null) {uData.lastName=userData.lastname;}
    updateUserData(uData);
  }
}
export function storeLoginData(data) {
  return {
    type: 'STORE_LOGIN_DATA',
    data
  }
}
export function changeLoginData(data) {
  return {
    type: 'CHANGE_LOGIN_DATA',
    data:data
  }
}
export function storeToken(data) {
  return {
    type: 'STORE_TOKEN',
    token: data
  }
}
const getUserDetails = (token) => {
  return axios({
    method: 'get',
    url: API_URL + 'u/userdetail/event/jkazarian0',
    headers: {Authorization: token}
  })
}

export function submitBids(eventUrl,userData) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl + '/volunteer/submitBids' ,
      data:userData,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function submitPledge(eventUrl,userData) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl + '/volunteer/submitPledge' ,
      data:userData,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function sellTickets(eventUrl,userData) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl + '/volunteer/sellTickets' ,
      data:userData,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function submitTickets(eventUrl,userData) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl + '/volunteer/submitTickets' ,
      data:userData,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function submitDonate(eventUrl,userData) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl + '/volunteer/donate' ,
      data:userData,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function submitAuctionBid(eventUrl,userData) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl + '/auction/bid' ,
      data:userData,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}

export function storeActiveTabData(data) {
  return {
    type: 'STORE_ACTIVE_TAB',
    data,
  }
}
export function storeOrderData(data) {
  return {
    type: 'STORE_ORDER_DATA',
    data,
  }
}
export function submitRaffleTickets(eventUrl,userData) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl + '/raffle/submittickets' ,
      data:userData,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function purchaseTickets(eventUrl,userData) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl + '/raffle/purchasetickets?uptodate=false' ,
      data:userData,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}

export function couponCode(eventurl, orderid, couponcode) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventurl + '/tickets/order/'+ orderid+'/coupon/'+couponcode,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function giveDonate(eventUrl,userData) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl + '/donation/donate' ,
      data:userData,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function fundaNeed(eventUrl,userData) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl + '/fundaneed/pledge' ,
      data:userData,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function getGoalData(eventUrl,type) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/'+type+'/goal' ,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function getScrollData(eventUrl,type) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/'+type+'/scroll' ,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function getTableData(eventUrl,type) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/'+type+'/table' ,

    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}

export function isVolunteer(eventUrl) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl +'/volunteer/isVolunteer' ,

    }).then(resp=>{
      dispatch(storeIsVolunteer(resp.data));
      return resp.data;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}

export function doContactSupport(eventUrl, contact) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl +'/contact' ,
      data: contact,

    });
  }
}
export function doValidateMobileNumber(mobileNumber) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: 'https://lookups.twilio.com/v1/PhoneNumbers/'+mobileNumber+'?Type=carrier&Type=caller-name&_=1498707522630',
      // data: contact,
      headers: {Authorization: "Basic QUMzYzk4NDBiZDE2OTgxOGQzZGU1MDUwNWI2Mzc4OWVlNDplYjU4NmE4Y2JkNzk4ZmE3OGM5ZGViNmY4ZTdkM2Q5NA=="}
    }).then(resp=>{
      return false;
    }).catch((error, code, status)=>{
      return true;
    });;
  }
}