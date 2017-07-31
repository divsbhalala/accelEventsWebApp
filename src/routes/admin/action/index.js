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
				dispatch(storeDashboardData(resp.data));
				return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function storeDashboardData(data) {
	return {
		type: 'STORE_HOST_DATA',
		data,
	}
}

export function dashboardSubmitBid(countryCode,phoneNumber) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/auction/submitBid/countrycode/'+countryCode+'/phoneNumber/'+phoneNumber  ,
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
export function dashboardSubmitPledge(countryCode,phoneNumber) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/fundANeed/submitPledge/countrycode/'+countryCode+'/phoneNumber/'+phoneNumber  ,
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
export function dashboardRafflePurchaseTicket(countryCode,phoneNumber) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/raffle/purchaseTicket/countrycode/'+countryCode+'/phoneNumber/'+phoneNumber  ,
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

//******* Add Item *******/
export function getItemList(type) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/'+type+'/items',
      headers: {Authorization: localStorage.getItem('token')}
    }).then(resp => {
      //   dispatch(storeItemUpdate("getList","success"));
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
        dispatch(storeItemUpdate(["PositionChange","success"]));
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      dispatch(storeItemUpdate(["PositionChange","fail"]));
      return error && error.response && error.response.data;
    });
  }
}
export function addItemList(type,data) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/'+type+'/item',
      data : data,
      headers: {Authorization: localStorage.getItem('token')}
    }).then(resp => {
      dispatch(storeItemUpdate(["Inserted","success"]));
      return resp;
    }).catch(error => {
      dispatch(storeItemUpdate(["Inserted","fail"]));
      console.log(error);
    })
  }
}

export function updateItemList(type,id,data) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/'+type+'/item/' + id,
      data : data,
      headers: {Authorization: localStorage.getItem('token')}
    }).then(resp => {
      dispatch(storeItemUpdate(["Updated","success"]));
      return resp;
    }).catch(error => {
      dispatch(storeItemUpdate(["Updated","fail"]));
      console.log(error);
    })
  }
}
export function deleteItemList(type,id) {
  return (dispatch) => {
    return axios({
      method: 'DELETE',
      url: API_URL + 'host/'+type+'/item/' + id,
      headers: {Authorization: localStorage.getItem('token')}
    }).then(resp => {
      dispatch(storeItemUpdate(["Deleted","success"]));
      return resp;
    }).catch(error => {
      dispatch(storeItemUpdate(["Deleted","fail"]));
      console.log(error);
    })
  }
}
export function getItemCategories(type) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/'+type+'/itemCategories',
      headers: {Authorization: localStorage.getItem('token')}
    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}
export function enableModules(data) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/enableModules?'+data,
      headers: {Authorization: localStorage.getItem('token')}
    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}
export function storeItemUpdate(data) {
  return {
    type: 'IS_ITEMADDED',
    data,
  }
}

