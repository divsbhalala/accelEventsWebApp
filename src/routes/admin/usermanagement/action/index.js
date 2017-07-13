import ReactDOM from 'react-dom';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../../clientConfig';
export function getUserManagementStaff() {
	return (dispatch) => {
		return axios({
			method: 'get',
			url: API_URL + 'host/usermanagement/event/staffs',
			data: {},
			headers: {Authorization: localStorage.getItem('token')}
		})
	}

}