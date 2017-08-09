import ReactDOM from 'react-dom';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../clientConfig';

export function onFormSubmit(e) {
  alert('hello');
  let test = ReactDOM.findDOMNode(ref);
  alert(test);
  e.preventDefault();
  return false;
}

export function doResetPassword(email) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'u/reset/password',
      data: {
				userEmailOrPhoneNumber: email,
      }
    });
  }

}
