import ReactDOM from 'react-dom';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../../../clientConfig';

export function getPerformanceSale() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/ticketing/sale' ,
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
export function getPerformanceBuyer(data) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/ticketing/buyer' ,
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
export function getPerformanceBuyerCSV() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/ticketing/buyer/CSV' ,
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
}export function getPerformanceHolderCSV() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/ticketing/holder/CSV' ,
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