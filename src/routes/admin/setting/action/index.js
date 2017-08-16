import ReactDOM from 'react-dom';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../../clientConfig';
export function doGetHostSettings(type) {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: API_URL + 'host/settings/' + type || "general",
			data: {},

		})
	}
}
export function putGetHostSettings(type, data) {
	return (dispatch) => {
		return axios({
			method: 'put',
			url: API_URL + 'host/settings/' + type || "general",
			data: data,

		})
	}
}
export function makePyment(data) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/settings/billing' ,
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
export function disconnectStripeAccount() {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: API_URL + 'host/settings/disconnect/stripe',
		})
	}
}
export function connectStripe() {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: API_URL + 'host/settings/stripeConnect',
		})
	}
}
