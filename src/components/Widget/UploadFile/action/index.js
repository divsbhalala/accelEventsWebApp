import ReactDOM from 'react-dom';
import axios from 'axios';
import { apiUrl as API_URL } from '../../../../clientConfig';
import request from 'superagent';

export function uploadImage(file) {
  var data = new FormData();
  data.append('file', file);
  return dispatch => axios({
    method: 'post',
    url: `${API_URL}host/upload/image`,
    data : data,
    headers: { Authorization: localStorage.getItem('token') },
  }).then((resp) => {
    return resp;
  }).catch((error, code, status) => error && error.response && error.response.data);
}
