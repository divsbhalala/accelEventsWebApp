import axios from 'axios';
let stripe_url = 'https://api.stripe.com/v1/';
let secret_key = 'pk_test_fu5aDnh3A784u3bIiAY80DQ1';
export function createCardToken(cardNumber, expMonth, expYear, cvc){
	let cardDetails = {
		"card[number]": cardNumber,
		"card[exp_month]": expMonth,
		"card[exp_year]": expYear,
		"card[cvc]": cvc
	};
	cardDetails = {
		"card[number]": '5555555555554444',
		"card[exp_month]": '01',
		"card[exp_year]": '2020',
		"card[cvc]": '123'
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
				'Authorization': 'Bearer ' + secret_key
			},
		})
	}
};