import ReactDOM from 'react-dom';
import axios from 'axios';
import { apiUrl as API_URL } from './../../../../../clientConfig';

export function getItemSheetPdf() {
    return dispatch => axios({
        method: 'get',
        url: `${API_URL}host/raffle/export/items/pdf`,
        headers: { Authorization: localStorage.getItem('token') },
    }).then((resp) => {
        if (resp && resp.data) {
            return resp.data;
        }
        return resp;
    }).catch((error, code, status) => error && error.response && error.response.data);
}
export function getItemCatalogPdf() {
    return dispatch => axios({
        method: 'get',
        url: `${API_URL}host/raffle/export/itemCatalog/pdf`,
        headers: { Authorization: localStorage.getItem('token') },
    }).then((resp) => {
        if (resp && resp.data) {
            return resp.data;
        }
        return resp;
    }).catch((error, code, status) => error && error.response && error.response.data);
}
export function getItemListCsv() {
    return dispatch => axios({
        method: 'get',
        url: `${API_URL}host/raffle/download/item/CSV`,
        headers: { Authorization: localStorage.getItem('token') },
    }).then((resp) => {
        if (resp && resp.data) {
            return resp.data;
        }
        return resp;
    }).catch((error, code, status) => error && error.response && error.response.data);
}

//******* Add Item *******/
export function getItemList(type) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/'+type+'/items',
      headers: {Authorization: localStorage.getItem('token')}
    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}
export function updateItemListPosition(type,item,topItem,topBottom) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/'+type+'/item/'+item+'/topItem/'+topItem+'/topBottom/'+topBottom  ,
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
//addFundANeedItem, updateFundANeedItem
export function addItemList(type,data) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/'+type+'/item',
      data : data,
      headers: {Authorization: localStorage.getItem('token')}
    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}

export function updateItemList(type,id,data) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/'+type+'/item/' + id,
      data : auctionDTO,
      headers: {Authorization: localStorage.getItem('token')}
    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}
