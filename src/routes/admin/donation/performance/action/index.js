import ReactDOM from 'react-dom';
import axios from 'axios';
import {apiUrl as API_URL} from './../../../../../clientConfig';

export function getPerformanceDonation() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/donations' ,
      headers: {Authorization: localStorage.getItem('token')}
    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}
export function getPerformanceDonationCSV() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/performance/donation/CSV' ,
      headers: {Authorization: localStorage.getItem('token')}
    }).then(resp=>{
      if(resp && resp.data){
        return resp.data;
      }
      return resp;
    }).catch((error, code, status)=>{
      return error && error.response && error.response.data;
    });
  }
}