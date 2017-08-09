import ReactDOM from 'react-dom';
import axios from 'axios';
import {sessionService, loadSession} from 'redux-react-session';

import {apiUrl as API_URL} from './../../../clientConfig';

export function getDashboard() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/home'  ,

    }).then(resp=>{
      if(resp && resp.data){
				dispatch(storeDashboardData(resp.data));
				//dispatch(storeCurrencySymbols(resp.data && resp.data.currencySymbol));
				return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function getStoreDesingData() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/eventDetails'  ,

    }).then(resp=>{
      if(resp && resp.data){
				//dispatch(storeDashboardData(resp.data));
				dispatch(storeCurrencySymbols(resp.data && resp.data.currencySymbol));
				dispatch(storeDesignData(resp.data));
				return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function updateLogo(logoImageUrl) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/design/updateLogo'  ,
      data: {logoImageUrl},
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
export function storeDashboardData(data) {
	return {
		type: 'STORE_HOST_DATA',
		data,
	}
}
export function storeCurrencySymbols(data) {
	return {
		type: 'STORE_CURRENCY_SYMBOLS',
		data,
	}
}
export function storeDesignData(data) {
	return {
		type: 'STORE_DESIGN_DATA',
		data,
	}
}

export function dashboardSubmitBid(countryCode,phoneNumber) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/auction/submitBid/countrycode/'+countryCode+'/phoneNumber/'+phoneNumber  ,

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

    }).then(resp => {
      //   dispatch(storeItemUpdate("getList","success"));
      return resp;
    }).catch(error => {

    })
  }
}
export function updateItemListPosition(type,item,topItem,topBottom) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/'+type+'/item/'+item+'/topItem/'+topItem+'/topBottom/'+topBottom  ,

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

    }).then(resp => {
      dispatch(storeItemUpdate(["Inserted","success"]));
      return resp;
    }).catch(error => {
      dispatch(storeItemUpdate(["Inserted","fail"]));

    })
  }
}

export function updateItemList(type,id,data) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/'+type+'/item/' + id,
      data : data,

    }).then(resp => {
      dispatch(storeItemUpdate(["Updated","success"]));
      return resp;
    }).catch(error => {
      dispatch(storeItemUpdate(["Updated","fail"]));

    })
  }
}
export function deleteItemList(type,id) {
  return (dispatch) => {
    return axios({
      method: 'DELETE',
      url: API_URL + 'host/'+type+'/item/' + id,

    }).then(resp => {
      dispatch(storeItemUpdate(["Deleted","success"]));
      return resp;
    }).catch(error => {
      dispatch(storeItemUpdate(["Deleted","fail"]));

    })
  }
}
export function getItemCategories(type) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/'+type+'/itemCategories',

    }).then(resp => {
      return resp;
    }).catch(error => {

    })
  }
}
export function enableModules(data) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/enableModules?'+data,

    }).then(resp => {
      return resp;
    }).catch(error => {

    })
  }
}
export function storeItemUpdate(data) {
  return {
    type: 'IS_ITEMADDED',
    data,
  }
}

