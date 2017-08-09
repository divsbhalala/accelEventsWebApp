import axios from 'axios';
import {apiUrl as API_URL} from './../../../clientConfig';

export function doResetNewPassword(data, token) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'u/create/newPassword/token/' + token,
      data: data
    });
  }

}
