import ReactDOM from 'react-dom';
import axios from 'axios';
import { apiUrl as API_URL } from './../../../../../clientConfig';

export function getItemSheetPdf() {
  return dispatch => axios({
    method: 'get',
    url: `${API_URL}host/auction/export/items/pdf`,
    headers: { Authorization: localStorage.getItem('token') },
  }).then((resp) => {
    if (resp && resp.data) {
      return resp.data;
    }
    return resp;
  }).catch((error, code, status) => error && error.response && error.response.data);
}
export function getItemCatalogPdf() {
  return dispatch => axios({
    method: 'get',
    url: `${API_URL}host/auction/export/itemCatalog/pdf`,
    headers: { Authorization: localStorage.getItem('token') },
  }).then((resp) => {
    if (resp && resp.data) {
      return resp.data;
    }
    return resp;
  }).catch((error, code, status) => error && error.response && error.response.data);
}
export function getItemListCsv() {
  return dispatch => axios({
    method: 'get',
    url: `${API_URL}host/auction/download/item/CSV`,
    headers: { Authorization: localStorage.getItem('token') },
  }).then((resp) => {
    if (resp && resp.data) {
      return resp.data;
    }
    return resp;
  }).catch((error, code, status) => error && error.response && error.response.data);
}

