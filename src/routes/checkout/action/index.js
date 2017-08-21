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

		})
	}
}
export function confirmAuctionBid(eventurl, confirmBidDto) {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: API_URL + 'u/checkout/' + eventurl + '/auction/confirmBid',
			data: confirmBidDto,

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
export function getBidConfirmation(eventurl, userId, itemId) {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: API_URL + 'u/checkout/' + eventurl + '/auction/confirmBid/user/' + userId + '/item/' + itemId,

		})
	}
}
export function submiteBuyNow(eventurl, userId, itemId) {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: API_URL + 'u/checkout/' + eventurl + '/auction/confirmBid/user/' + userId + '/item/' + itemId,

		})
	}
}
export function geBuyNow(eventurl, userId, itemId) {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: API_URL + 'u/checkout/' + eventurl + '/auction/buynow/user/' + userId + '/item/' + itemId,

		})
	}
}
export function confirmRaffleCheckout(eventurl, raffleCheckoutDto) {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: API_URL + 'u/checkout/' + eventurl + '/raffle/buy/tickets',
			data: raffleCheckoutDto,

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

export function getRaffleCheckout(eventurl, userId) {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: API_URL + 'u/checkout/' + eventurl + '/raffle/user/' + userId ,

		})
	}
}
export function confirmfundANeedCheckout(eventurl, pledgeCheckoutDto) {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: API_URL + 'u/checkout/' + eventurl + '/fundANeed/payment',
			data: pledgeCheckoutDto,

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

export function getfundANeedCheckout(eventurl, userId) {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: API_URL + 'u/checkout/' + eventurl + '/fundANeed/user/' + userId ,

		})
	}
}
export function confirmDonationCheckout(eventurl, donationPurchaseDto) {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: API_URL + 'u/checkout/' + eventurl + '/donation/donate',
			data: donationPurchaseDto,

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
export function getdDonationCheckout(eventurl, userId) {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: API_URL + 'u/checkout/' + eventurl + '/donation/user/' + userId ,

		})
	}
}