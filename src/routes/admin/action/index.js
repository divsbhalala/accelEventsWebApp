import ReactDOM from 'react-dom';
import axios from 'axios';
import {sessionService, loadSession} from 'redux-react-session';

import {apiUrl as API_URL} from './../../../clientConfig';

export function getDashboard() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/home'  ,
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

