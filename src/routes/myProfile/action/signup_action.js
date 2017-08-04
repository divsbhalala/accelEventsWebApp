import ReactDOM from 'react-dom';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../clientConfig';
import {sessionService} from 'redux-react-session';

//let API_URL = 'http://35.161.147.220:3333/api/';
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
export function getProfileData() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + '/u/myprofile',
      data: {},


    })
  }
}
export function updateProfile(field,value) {
  return (dispatch) => {
    updateUserData(field,value);
    return axios({
      method: 'put',
      url: API_URL + 'u/myprofile/updatefield/field/'+field+'/value/'+value,
      })
  }
}
export function getUserAcivity() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'u/activity',
      data: {},
    })
  }
}
function updateUserData(field,value){
  if (!_.isEmpty(localStorage.getItem('user'))){
    var newUser = JSON.parse(localStorage.getItem('user'));
    newUser[field] = value;
    localStorage.setItem('user', JSON.stringify(newUser));
    sessionService.saveUser(JSON.parse(localStorage.getItem('user')));
  }
}