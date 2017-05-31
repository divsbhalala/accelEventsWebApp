import ReactDOM from 'react-dom';
import axios from 'axios';
var API_URL='http://api.stagingaccel.com:8080/AccelEventsWebApp/rest/';
export  function  doGetEventData( eventUrl) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl,
      data: {}
    }).then(response => {
      dispatch(storeEventData(response.data));
      localStorage.setItem('eventsData', JSON.stringify(response.data));
      return response;

    })
      .catch( error => {
        console.log(error);
        return error;
      });
  }

}

/*----------------Ticketing-------------*/
export  function  doGetEventTicketSetting( eventUrl) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/ticketing/settings',
      data: {}
    }).then(response => {
      dispatch(storeEventTicketData(response.data));
      return response;

    })
      .catch( error => {
        return error;
      });
  }

}

export  function  doGetEventTicketByOrderId( eventUrl, OrderId) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/ticketing/order/'+OrderId+'/getformattributes',
      data: {}
    }).then(response => {
      return response;

    })
      .catch( error => {
        return error;
      });
  }

}

/*----------------Auction-------------*/
export  function  doGetAuctionSetting( eventUrl) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/auction/settings',
      data: {}
    }).then(response => {
      return response;

    })
      .catch( error => {
        return error;
      });
  }

}
export  function  doGetAuctionItemByCode( eventUrl, itemCode) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/auction/items/'+itemCode,
      data: {}
    });
  }

}

export  function  doGetAuctionItemByLimit( eventUrl, page, size) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/auction/items/'+page+'/'+size,
      data: {}
    }).then(response => {
      dispatch(storeAuctionData(response.data));
      return response;

    })
      .catch( error => {
        return error;
      });
  }

}

/*----------------Donation-------------*/
export  function  doGetDonationSetting( eventUrl) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/donation/settings',
      data: {}
    }).then(response => {
      return response;

    })
      .catch( error => {
        return error;
      });
  }

}

/*----------------Fund A Need-------------*/
export  function  doGetFundANeedSetting( eventUrl) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/fundaneed/settings',
      data: {}
    }).then(response => {
      return response;

    })
      .catch( error => {
        return error;
      });
  }

}

export  function  doGetFundANeedItemByCode( eventUrl, itemCode) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/fundaneed/items/'+itemCode,
      data: {}
    })
    //     .then(response => {
    //   dispatch(storeEventTicketData(response.data));
    //   return response;
    //
    // })
    //   .catch( error => {
    //     return error;
    //   });
  }

}

export  function  doGetFundANeedItemByLimit( eventUrl, page, size) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/fundaneed/items/'+page+'/'+size,
      data: {}
    }).then(response => {
      dispatch(storeEventFundANeedData(response.data));
      return response;

    })
      .catch( error => {
        return error;
      });
  }

}

/*----------------Raffle-------------*/
export  function  doGetRaffleSetting( eventUrl) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/raffle/settings',
      data: {}
    }).then(response => {
      return response;

    })
      .catch( error => {
        return error;
      });
  }

}

export  function  doGetRaffleItemByCode( eventUrl, itemCode) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/raffle/items/'+itemCode,
      data: {}
    }).then(response => {
      dispatch(storeEventRaffleData(response.data));
      return response;

    })
      .catch( error => {
        return error;
      });
  }

}

export  function  doGetRaffleItemByLimit( eventUrl, page, size) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/raffle/items/'+page+'/'+size,
      data: {}
    }).then(response => {
      return response;

    })
      .catch( error => {
        return error;
      });
  }

}


export  function  doGetSettings( eventUrl, type) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/'+type+'/settings',
      data: {}
    });
  }

}

export  function  doGeItemByCode( eventUrl, itemCode, type) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/'+type+'/items/'+itemCode,
      data: {}
    });
  }

}

export  function  doGetItemByLimit( eventUrl, page, size, type) {
  return (dispatch)=>{
    return axios({
      method: 'get',
      url: API_URL+'events/'+eventUrl+'/'+type+'/items/'+page+'/'+size,
      data: {}
    });
  }

}

export function storeEventData(data){
  return {
    type:'STORE_EVENT',
    data,
  }
}

export function storeEventRaffleData(data){
  return {
    type:'STORE_EVENT_RAFFLE',
    data,
  }
}
export function storeEventFundANeedData(data){
  return {
    type:'STORE_EVENT_FUND_A_NEED',
    data,
  }
}
export function storeEventDonationData(data){
  return {
    type:'STORE_EVENT_TICKET_DONATION',
    data,
  }
}
export function storeEventTicketData(data){
  return {
    type:'STORE_EVENT_TICKET',
    data,
  }
}
export function storeAuctionData(data){
  return {
    type:'STORE_EVENT_AUCTION',
    data,
  }
}