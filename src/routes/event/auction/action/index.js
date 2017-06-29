import ReactDOM from 'react-dom';
import axios from 'axios';

let API_URL = 'http://35.161.147.220:3333/api/';
export function onFormSubmit(e) {
  alert('hello');
  let test = ReactDOM.findDOMNode(ref);
  alert(test);
  e.preventDefault();
  return false;
}

export function doLogin(email, password) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'users/login',
      data: {
        email: email,
        password: password
      }
    }).then(response => {
      dispatch(storeLoginData(response.data.userData));
      dispatch(storeToken(response.data.id));
      localStorage.setItem('user', JSON.stringify(response.data.userData));
      localStorage.setItem('token', JSON.stringify(response.data.id));
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
export function storeToken(data) {
  return {
    type: 'STORE_TOKEN',
    token: data
  }
}
