import ReactDOM from 'react-dom';
import axios from 'axios';

var API_URL = 'http://35.161.147.220:3333/api/';
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
      url: API_URL + 'users',
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
        console.log(error);
        return error;
      });
  }

}

export function storeLoginData(data) {
  return {
    type: 'STORE_LOGIN_DATA',
    data
  }
}
