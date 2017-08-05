import ReactDOM from 'react-dom';
import FileDownload from 'react-file-download';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../../../clientConfig';

export function getPerformanceSale() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/ticketing/sale' ,

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
export function getPerformanceBuyerCSV(name) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/ticketing/buyer/CSV' ,
      responseType: 'blob',
    }).then(resp=>{
      if(resp && resp.data){
        FileDownload(resp.data, name);
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}export function getPerformanceHolderCSV(name) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/ticketing/holder/CSV' ,
      responseType: 'blob',
    }).then(resp=>{
      if(resp && resp.data){
        FileDownload(resp.data, name);
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}