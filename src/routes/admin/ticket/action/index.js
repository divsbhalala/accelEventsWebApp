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

export function doTicketTypes(method, data) {
	return (dispatch) => {
		return axios({
			method: method ? method : "get",
			url: API_URL + "host/ticketing/ticketTypes",
			data: data ? data : {},
			headers: {Authorization: localStorage.getItem("token")}
		})
	}
}

export function doDeleteTicketTypes(id) {
	return (dispatch) => {
		return axios({
			method: "delete",
			url: API_URL + "host/ticketing/ticketType/"+id,
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

export function doGetOrderDetails(limit, offset) {
	offset = offset ? offset : 0;
	limit = limit ? limit : 10;
	return (dispatch) => {
		return axios({
			method: "get",
			url: API_URL + "host/ticketing/orders?page=" + offset + "&size=" + limit ,
			data: {},
			headers: {Authorization: localStorage.getItem("token")}
		});
	}
}
export function doGetHolderData(method, id, data) {
	return (dispatch) => {
		return axios({
			method: method ? method : "get",
			url: API_URL + "host/ticketing/holderData/holder/" + id ,
			data: data ? data : {},
			headers: {Authorization: localStorage.getItem("token")}
		});
	}
}

export function doGetRefundByOrderId(method, orderId, data) {
	return (dispatch) => {
		return axios({
			method: method ? method : "get",
			url: API_URL + "host/ticketing/refund/order/" + orderId ,
			data: data ? data : {},
			headers: {Authorization: localStorage.getItem("token")}
		});
	}
}
export function doTicketHolderDataById(method, ticketId, data) {
	return (dispatch) => {
		return axios({
			method: method ? method : "get",
			url: API_URL + "host/ticketing/holderData/ticket/" + ticketId ,
			data: data ? data : {},
			headers: {Authorization: localStorage.getItem("token")}
		});
	}
}

export function doResendOrderMailByOrderId(orderId) {
	return (dispatch) => {
		return axios({
			method: "get",
			url: API_URL + "host/ticketing/resendmail/order/" + orderId ,
			data: {},
			headers: {Authorization: localStorage.getItem("token")}
		});
	}
}
export function doResendOrderMailByOrderIdByTicketId(orderId, ticketId) {
	return (dispatch) => {
		return axios({
			method: "get",
			url: API_URL + "host/ticketing/resendmail/order/" + orderId + "ticketing" +  ticketId,
			data: {},
			headers: {Authorization: localStorage.getItem("token")}
		});
	}
}

