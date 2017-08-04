import ReactDOM from 'react-dom';
import axios from 'axios';
import FileDownload from 'react-file-download';
import {apiUrl as API_URL} from './../../../../../clientConfig';

export function getPerformanceRaffleItem() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/raffle/items',
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
export function getPerformanceRaffleItemByItemCode(itemCode) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/raffle/data/itemCode/'+itemCode ,

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
export function getPerformanceRafflePurchasedTicketCSV(name) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/raffle/purchased/ticket/CSV' ,
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
export function getPerformanceRaffleParticipantTicketCSV(name) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/raffle/participant/ticket/CSV' ,
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
export function getPerformanceRaffleWinnerCSV(name) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/raffle/winner/CSV' ,

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