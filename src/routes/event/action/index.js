import ReactDOM from 'react-dom';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../clientConfig';
export function doGetEventData(eventUrl) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl,
      data: {}
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
      data: {}
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
      data: {}
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
      data: {}
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
      data: {}
    });
  }

}

export function doGetAuctionItemByLimit(eventUrl, page, size) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/auction/items/',
      data: {
        page:page,
        size:size
      }
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
      data: {}
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
      data: {}
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

export function doGetFundANeedItemByLimit(eventUrl, page, size) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/fundaneed/items/?page=' + page + '&size=' + size,
      data: {}
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
      headers: {Authorization: 'xcqp34BgOS1H3h955xRZqw=='}
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
      data: {}
    })
    //     .then(response => {
    //   dispatch(storeEventRaffleData(response.data));
    //   return response;
    //
    // })
    //   .catch( error => {
    //     return error;
    //   });
  }

}

export function doGetRaffleItemByLimit(eventUrl, page, size) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/raffle/items/?page=' + page + '&size=' + size,
      data: {}
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
      headers: {Authorization: 'xcqp34BgOS1H3h955xRZqw=='}
    });
  }

}

export function doGeItemByCode(eventUrl, itemCode, type) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/' + type + '/item/' + itemCode,
      data: {}
    });
  }

}

export function doGetItemByLimit(eventUrl, page, size, type) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'events/' + eventUrl + '/' + type + '/items/?page=' + page + '&size=' + size,
      data: {}
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