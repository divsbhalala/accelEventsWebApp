import {apiUrl as API_URL} from './../../../clientConfig';
import axios from 'axios';

export function updateHostSettings(moduleType, auctionDTO) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/'+moduleType+'/settings',
      data : auctionDTO,

    })
  }
}

export function resetHostSettings(moduleType) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/'+moduleType+'/reset',

    })
  }
}

export function getHostSettings(moduleType) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/'+moduleType+'/settings',

    })
  }
}

export function getHostCategories(moduleType) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/'+moduleType+'/itemCategories',

    })
  }
}

export function addHostCategory(moduleType, itemCategory) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/'+moduleType+'/itemCategory',
      data : itemCategory,

    })
  }
}

export function removeHostCategory(moduleType, id) {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: API_URL + 'host/'+moduleType+'/itemCategory/'+ id,

    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}

export function updateHostCategory(moduleType, id, itemCategory) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/'+moduleType+'/itemCategory/'+ id,
      data : itemCategory,

    })
  }
}

export function getHostTickets(moduleType) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/'+moduleType+'/tickets',

    })
  }
}

export function addTicket(moduleType, ticket) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/'+moduleType+'/ticket',
      data: ticket,

    })
  }
}

export function updateTicket(moduleType, ticket) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/'+moduleType+'/ticket/'+ticket.id,
      data: ticket,

    })
  }
}

export function deleteTicket(moduleType, id) {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: API_URL + 'host/'+moduleType+'/ticket/' + id,

    })
  }
}
