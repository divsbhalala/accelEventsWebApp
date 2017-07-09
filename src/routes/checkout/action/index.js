import axios from 'axios';
import {apiUrl as API_URL} from './../../../clientConfig';
let stripe_url = 'https://api.stripe.com/v1/';
let secret_key = 'pk_test_x9BXBdwFPlxaTKaWz1iv8Jzz';
export function createCardToken(stripeKey, cardNumber, expMonth, expYear, cvc) {
	let cardDetails = {
		"card[number]": cardNumber,
		"card[exp_month]": expMonth,
		"card[exp_year]": expYear,
		"card[cvc]": cvc
	};
	let formBody = [];
	for (let property in cardDetails) {
		let encodedKey = encodeURIComponent(property);
		let encodedValue = encodeURIComponent(cardDetails[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");
	return (dispatch) => {
		return axios({
			method: 'post',
			url: stripe_url + 'tokens',
			data: formBody,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer ' + stripeKey || secret_key
			}
		})
	}
}

export function getCardToken(stripeKey, cardNumber, expMonth, expYear, cvc) {
	let cardDetails = {
		"card[number]": cardNumber,
		"card[exp_month]": expMonth,
		"card[exp_year]": expYear,
		"card[cvc]": cvc
	};
	let formBody = [];
	for (let property in cardDetails) {
		let encodedKey = encodeURIComponent(property);
		let encodedValue = encodeURIComponent(cardDetails[property]);
		formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&");
	return (dispatch) => {
		return axios({
			method: 'post',
			url: stripe_url + 'tokens',
			data: formBody,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer ' + stripeKey || secret_key
			}
		}).then(resp=> {
			if (resp && resp.data && resp.data.id) {
				return resp.data;
			}
			else {
				return {error: "Invalid Data"};
			}
		})
			.catch(error=> {
				let respError = error && error.response && error.response.data && error.response.data.error && error.response.data.error;
				if (respError) {
					return {error: respError};
				}
				else {
					return {error: "Invalid Data"};
				}
			})
	}
}

export function orderTicket(eventurl, orderid, ticketBookingDto) {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: API_URL + 'events/' + eventurl + '/tickets/payment/order/' + orderid,
			data: ticketBookingDto,
			headers: {Authorization: localStorage.getItem('token')}
		})
	}
}
export function confirmAuctionBid(eventurl, itemIds, stripeToken) {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: API_URL + '/checkout/' + eventurl + '/auction/confirmBid?itemIds=' + itemIds + '&stripeToken=' + stripeToken,
			data: ticketBookingDto,
			headers: {Authorization: localStorage.getItem('token')}
		})
	}
}

export function getBidConfirmation(eventurl, userId, itemId) {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: API_URL + '/checkout/' + eventurl + '/auction/confirmBid/user/' + userId + 'item/' + itemId,
			headers: {Authorization: localStorage.getItem('token')}
		})
	}
}