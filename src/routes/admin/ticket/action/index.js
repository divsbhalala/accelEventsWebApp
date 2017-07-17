import ReactDOM from 'react-dom';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../../clientConfig';
export function doGetTicketingSettings(type) {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: API_URL + 'host/ticketing/' + type || "settings",
			data: {},
			headers: {Authorization: localStorage.getItem('token')}
		})
	}
}
export function doPostTicketingSettings(type, data) {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: API_URL + 'host/ticketing/' + type || "settings",
			data: data,
			headers: {Authorization: localStorage.getItem('token')}
		})
	}
}

export function doGetTicketingCouponCodes() {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: API_URL + 'host/ticketing/couponCodes',
			data: {},
			headers: {Authorization: localStorage.getItem('token')}
		})
	}
}