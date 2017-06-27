import ReactDOM from 'react-dom';
import axios from 'axios';
import {sessionService, loadSession} from 'redux-react-session';

import {apiUrl as API_URL} from './../../../clientConfig';
export function doGetEventData(eventUrl) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl,
      data: {},
      headers: {Authorization: localStorage.getItem('token')}
    }).then(response => {
      dispatch(storeEventData(response.data));
      localStorage.setItem('eventsData', JSON.stringify(response.data));
      return response;

    })
      .catch(error => {
        console.log(error);
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}

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
      headers: {Authorization: localStorage.getItem('token')}

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
      headers: {Authorization: localStorage.getItem('token')}
    });
  }

}

export function doGeItemByCode(eventUrl, itemCode, type) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/' + type + '/item/' + itemCode,
      data: {},
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
    });
  }

}

export function doOrderTicket(eventUrl, dto) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'events/' + eventUrl + '/ticketing/order',
      data: dto,
      headers: {Authorization: localStorage.getItem('token')}
    });
  }
}

export function doGetOrderById(eventUrl, orderId) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/ticketing/order/'+orderId+'/formattributes',
      data: {},
      headers: {Authorization: localStorage.getItem('token')}
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
//*************  Volunteer   ****************//

export function getItemStatusByCode(eventUrl, itemCode) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/volunteer/prices/item/' + itemCode,
      headers: {Authorization: localStorage.getItem('token')}
    });
  }
}
//****** Auction Bid*******//
  export function getUserByEmail(eventUrl, email,modeltype) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/volunteer/loaduser/' + encodeURI(email) +'/module/'+modeltype,
      headers: {Authorization: localStorage.getItem('token')}
    });
  }
}
export function getAuctionItemStatusByCode(eventUrl, itemCode) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/volunteer/prices/item/' + itemCode,
      headers: {Authorization: localStorage.getItem('token')}
    });
  }
}
export function getAttendees(eventUrl) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/volunteer/allAttendees',
      headers: {Authorization: localStorage.getItem('token')}
    });
  }
}
export function setAttendees(eventUrl,barcode,status) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/volunteer/checkin/barcode/' + barcode + "/checkin/" + status,
      headers: {Authorization: localStorage.getItem('token')}
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
        localStorage.setItem('user', JSON.stringify(resp.data));
        localStorage.setItem('token', response.data.access_token);
        sessionService.saveSession(localStorage.getItem('token'));
        sessionService.saveUser(JSON.parse(localStorage.getItem('user')));
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
        localStorage.setItem('user', JSON.stringify(resp.data));
        localStorage.setItem('token', response.data.access_token);
        sessionService.saveSession(localStorage.getItem('token'));
        sessionService.saveUser(JSON.parse(localStorage.getItem('user')));
      }).catch(err => {
				return err;
      });
      return response;
    }).catch((error, code, status)=>{
				return error && error.response && error.response.data;
    });
  }
}

export function storeLoginData(data) {
  return {
    type: 'STORE_LOGIN_DATA',
    data
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
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
     headers: {Authorization: localStorage.getItem('token')}
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