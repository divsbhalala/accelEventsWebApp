import ReactDOM from 'react-dom';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../../clientConfig';

export function getDesignSetting() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/design/setting' ,

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
export function getDesignDetails() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/eventDetails' ,

    }).then(resp=>{
      if(resp && resp.data){
				dispatch(storeDesignData(resp.data));
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function storeDesignData(data) {
	return {
		type: 'STORE_DESIGN_DATA',
		data,
	}
}
export function updateDesignSetting(data) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/design/setting' ,
      data:data,

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
  export function updateEventUrlDesingSetting(value) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/design/url/value/'+value ,

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