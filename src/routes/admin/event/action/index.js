import ReactDOM from 'react-dom';
import axios from 'axios';
import {sessionService, loadSession} from 'redux-react-session';

import {apiUrl as API_URL} from './../../../../clientConfig';

export function eventsList(search) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'superadmin/events?offset=0&limit=350'  ,
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
export function whitLableEeventsList(label) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'whiteLabelURL/'+label+'/events',
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
export function createWhiteLabelUrl(label) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'superadmin/create/whitelabel/'+label,
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
export function whiteLabelUrl() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'superadmin/whiteLabelUrl'  ,
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
export function setWhiteLabelUrlEvents(eventId,whiteLabelURL) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'whiteLabelURL/'+whiteLabelURL+'/setEvent/'+ eventId ,
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
export function setEvents(eventId) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'superadmin/setEvent/'+ eventId  ,
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

