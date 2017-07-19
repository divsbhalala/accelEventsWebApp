import ReactDOM from "react-dom";
import axios from "axios";
import {apiUrl as API_URL} from "./../../../../clientConfig";
export function doGetTicketingSettings(type) {
	return (dispatch) => {
		return axios({
			method: "get",
			url: API_URL + "host/ticketing/" + type || "settings",
			data: {},
			headers: {Authorization: localStorage.getItem("token")}
		})
	}
}
export function doPostTicketingSettings(type, data) {
	return (dispatch) => {
		return axios({
			method: "post",
			url: API_URL + "host/ticketing/" + type || "settings",
			data: data,
			headers: {Authorization: localStorage.getItem("token")}
		})
	}
}

export function doGetTicketingCouponCodes() {
	return (dispatch) => {
		return axios({
			method: "get",
			url: API_URL + "host/ticketing/couponCodes",
			data: {},
			headers: {Authorization: localStorage.getItem("token")}
		})
	}
}

export function doGetTicketTypes() {
	return (dispatch) => {
		return axios({
			method: "get",
			url: API_URL + "host/ticketing/ticketTypes",
			data: {},
			headers: {Authorization: localStorage.getItem("token")}
		})
	}
}

export function doCreateCouponCode(data, code) {
	 code =  code ? "/" + code : "";
	return (dispatch) => {
		return axios({
			method: code ? "put" : "post",
			url: API_URL + "host/ticketing/couponCode" + code,
			data: data,
			headers: {Authorization: localStorage.getItem("token")}
		})
	}
}
export function doUpdateCouponCode(code, data) {
	return (dispatch) => {
		return axios({
			method: "Put",
			url: API_URL + "host/ticketing/couponCode/" + code ,
			data: {},
			headers: {Authorization: localStorage.getItem("token")}
		})
	}
}
export function doDeleteCouponCode(code) {
	return (dispatch) => {
		return axios({
			method: "Delete",
			url: API_URL + "host/ticketing/couponCode/" + code,
			data: {},
			headers: {Authorization: localStorage.getItem("token")}
		})
	}
}