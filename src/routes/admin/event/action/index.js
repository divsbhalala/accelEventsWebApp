import ReactDOM from 'react-dom';
import axios from 'axios';
import {sessionService, loadSession} from 'redux-react-session';

import {apiUrl as API_URL} from './../../../../clientConfig';

export function eventsList(offset,limit,search="") {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'superadmin/events?offset='+offset+'&limit='+limit +'&search[value]='+search,

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
export function whitLableEeventsList(label) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'whiteLabelURL/'+label+'/events',

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
export function createWhiteLabelUrl(label) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'superadmin/create/whitelabel/'+label,

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
export function whiteLabelUrl() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'superadmin/whiteLabelUrl'  ,

    }).then(resp=>{0
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function setWhiteLabelUrlEvents(eventId,whiteLabelURL) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'whiteLabelURL/'+whiteLabelURL+'/setEvent/'+ eventId ,

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
export function setEvents(eventId) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'superadmin/setEvent/'+ eventId  ,

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
export function setEventsByUrl(eventUrl) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'u/setEvent/eventUrl/'+ eventUrl  ,

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
export function getOrganizationSettings(whiteLabelURL) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'whiteLabelURL/'+ whiteLabelURL + '/settings',

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
export function setOrganizationSettings(whiteLabelURL,data) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'whiteLabelURL/'+ whiteLabelURL + '/settings',
      data:data,

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

//****** White Label user ******/

export function getUserManagementStaff(whiteLabelURL) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'whiteLabelURL/'+whiteLabelURL+'/users/staffs',
      data: {},

    })
  }
}
export function addUserManagementStaff(staff,whiteLabelURL) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'whiteLabelURL/'+whiteLabelURL+'/users/staff',
      data: staff,

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
export function deleteUserManagementStaff(staffId,whiteLabelURL) {
  return (dispatch) => {
    return axios({
      method: 'DELETE',
      url: API_URL + 'whiteLabelURL/'+whiteLabelURL+'/users/staff/'+staffId,
      data: {},

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

export function updatedUserManagementStaff(staffId,staff,whiteLabelURL) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'whiteLabelURL/'+whiteLabelURL+'/users/staff/'+staffId,
      data: staff,

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

export function resendInvitationUserManagementStaff(staffId,whiteLabelURL) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'whiteLabelURL/'+whiteLabelURL+'/users/resendConfirmation/staff/'+staffId,
      data: {},

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
export function storeWhiteLableSetting(data) {
  return {
    type: 'STORE_WHITE_LABLE_SETTING',
    data,
  }
}