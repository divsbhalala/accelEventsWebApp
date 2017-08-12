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

const getUserDetails = (token) => {
  return axios({
    method: 'get',
    url: API_URL + 'u/userdetail/event/jkazarian0',
    headers: {Authorization: token}
  })
};

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
      dispatch(storeToken(response.data.access_token));
      getUserDetails(response.data.access_token).then(resp => {

        dispatch(storeLoginData(resp.data));
        localStorage.setItem('user', JSON.stringify(resp.data));
      }).catch(err => {
      });
      localStorage.setItem('token', response.data.access_token);
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

export function storeToken(data) {
  return {
    type: 'STORE_TOKEN',
    token: data
  }
}
