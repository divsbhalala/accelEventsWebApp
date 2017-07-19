import ReactDOM from 'react-dom';
import axios from 'axios';
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
export function getPerformanceAuctionBidderCSV() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/auction/bidder/CSV' ,
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
export function getPerformanceAuctionWinnerCSV() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/auction/winner/CSV' ,
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