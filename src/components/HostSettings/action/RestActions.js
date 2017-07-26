import {apiUrl as API_URL} from './../../../clientConfig';
import axios from 'axios';

export function updateHostSettings(moduleType, auctionDTO) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/'+moduleType+'/settings',
      data : auctionDTO,
      headers: {Authorization: localStorage.getItem('token')}
    })
  }
}

export function resetHostSettings(moduleType) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/'+moduleType+'/reset',
      headers: {Authorization: localStorage.getItem('token')}
    })
  }
}

export function getHostSettings(moduleType) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/'+moduleType+'/settings',
      headers: {Authorization: localStorage.getItem('token')}
    })
  }
}

export function getHostCategories(moduleType) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/'+moduleType+'/itemCategories',
      headers: {Authorization: localStorage.getItem('token')}
    })
  }
}

export function addHostCategory(moduleType, itemCategory) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/'+moduleType+'/itemCategory',
      data : itemCategory,
      headers: {Authorization: localStorage.getItem('token')}
    })
  }
}

export function removeHostCategory(moduleType, id) {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: API_URL + 'host/'+moduleType+'/itemCategory/'+ id,
      headers: {Authorization: localStorage.getItem('token')}
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
      headers: {Authorization: localStorage.getItem('token')}
    })
  }
}

export function getHostTickets(moduleType) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/'+moduleType+'/tickets',
      headers: {Authorization: localStorage.getItem('token')}
    })
  }
}

export function addTicket(moduleType, ticket) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/'+moduleType+'/ticket',
      data: ticket,
      headers: {Authorization: localStorage.getItem('token')}
    })
  }
}

export function updateTicket(moduleType, ticket) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/'+moduleType+'/ticket/'+ticket.id,
      data: ticket,
      headers: {Authorization: localStorage.getItem('token')}
    })
  }
}

export function deleteTicket(moduleType, id) {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: API_URL + 'host/'+moduleType+'/ticket/' + id,
      headers: {Authorization: localStorage.getItem('token')}
    })
  }
}
