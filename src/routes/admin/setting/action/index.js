import ReactDOM from 'react-dom';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../../clientConfig';
export function doGetHostSettings(type) {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: API_URL + 'host/settings/' + type || "general",
			data: {},
			headers: {Authorization: localStorage.getItem('token')}
		})
	}

}