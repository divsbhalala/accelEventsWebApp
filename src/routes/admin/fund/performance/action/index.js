import ReactDOM from 'react-dom';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../../../clientConfig';

export function getPerformancefundANeedItem() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/fundANeed/items' ,
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
export function getPerformancefundANeedItemCSV() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/fundANeed/donor/CSV' ,
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