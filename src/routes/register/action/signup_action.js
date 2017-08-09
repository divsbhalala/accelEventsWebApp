import ReactDOM from 'react-dom';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../clientConfig';

export const STORE_LOGIN_DATA = 'STORE_LOGIN_DATA';
export function onFormSubmit(e) {
  alert('hello');
  let test = ReactDOM.findDOMNode(ref);
  alert(test);
  e.preventDefault();
  return false;
}

export function doRegister(email, password) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'u/signup/admin',
      data: {
				  email: email,
					password: password
      }
    }).then(response => {
      dispatch(storeLoginData(response.data));
      localStorage.setItem('user', JSON.stringify(response.data));
      return response;

    })
      .catch(error => {
        return error && error.response && error.response.data;
      });
  }

}

export function storeLoginData(data) {
  return {
    type: 'STORE_LOGIN_DATA',
    data
  }
}
