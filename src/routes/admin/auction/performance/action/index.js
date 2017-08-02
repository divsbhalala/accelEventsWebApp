import ReactDOM from 'react-dom';
import axios from 'axios';
import FileDownload from 'react-file-download';
import {apiUrl as API_URL} from './../../../../../clientConfig';

export function getPerformanceAuctionItem() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/auction/items' ,
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
export function getPerformanceAuctionItemByItemCode(itemCode) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/auction/bids/itemCode/'+itemCode ,
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
export function getPerformanceAuctionBidderCSV(name) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/auction/bidder/CSV' ,
      headers: {Authorization: localStorage.getItem('token')},
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
export function getPerformanceAuctionWinnerCSV(name) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/auction/winner/CSV' ,
      headers: {Authorization: localStorage.getItem('token')},
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
export function deleteAuctionbid(bid) {
  return (dispatch) => {
    return axios({
      method: 'DELETE',
      url: API_URL + 'host/performance/auction/bid/'+ bid ,
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
export function markAsPaidBid(bid) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/performance/auction/manuallyPay/bid/'+ bid ,
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
export function requestPaymentBid(bid) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/performance/auction/notify/payment/confirm/bid/'+ bid ,
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