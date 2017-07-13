import ReactDOM from 'react-dom';
import axios from 'axios';
import {sessionService, loadSession} from 'redux-react-session';

import {apiUrl as API_URL} from './../../../../clientConfig';

export function eventsList(search) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'superadmin/events?offset=0&limit=305'  ,
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

