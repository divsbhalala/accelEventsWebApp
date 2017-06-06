import ReactDOM from 'react-dom';
import axios from 'axios';

var API_URL = 'http://35.161.147.220:3333/api/';
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
      url: API_URL + 'users/login',
      data: {
        email: email,
      }
    }).then(response => {
      return response;

    })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

}
