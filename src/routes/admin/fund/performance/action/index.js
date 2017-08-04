import ReactDOM from 'react-dom';
import axios from 'axios';
import FileDownload from 'react-file-download';
import {apiUrl as API_URL} from './../../../../../clientConfig';

export function getPerformancefundANeedItem() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/fundANeed/items' ,
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
export function getPerformancefundANeedItemCSV(name) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/fundANeed/donor/CSV' ,
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
export function getPerformancefundANeedItemByItemCode(itemCode) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/fundANeed/pledges/itemCode/'+itemCode ,
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

export function deletePledge(pledgeId) {
  return (dispatch) => {
    return axios({
      method: 'DELETE',
      url: API_URL + 'host/performance/fundANeed/pledge/'+ pledgeId ,
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
export function markAsPaidPledge(pledgeId) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/performance/fundANeed/manuallyPay/pledge/'+ pledgeId,
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
export function requestPaymentPledge(pledgeId) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/performance/fundANeed/notify/checkout/pledge/'+ pledgeId,
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