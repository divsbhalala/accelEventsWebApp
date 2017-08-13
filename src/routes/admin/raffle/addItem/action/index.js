import ReactDOM from 'react-dom';
import axios from 'axios';
import FileDownload from 'react-file-download';
import { apiUrl as API_URL } from './../../../../../clientConfig';

export function getItemSheetPdf(name) {
  return dispatch => axios({
    method: 'get',
    url: `${API_URL}host/raffle/export/items/pdf`,
    headers: { Authorization: localStorage.getItem('token') },
    responseType: 'blob',
  }).then((resp) => {
    if (resp && resp.data) {
      FileDownload(resp.data, name);
      return resp.data;
    }
    return resp;
  }).catch((error, code, status) => error && error.response && error.response.data);
}
export function getItemCatalogPdf(name) {
  return dispatch => axios({
    method: 'get',
    url: `${API_URL}host/raffle/export/itemCatalog/pdf`,
    headers: { Authorization: localStorage.getItem('token') },
    responseType: 'blob',
  }).then((resp) => {
    if (resp && resp.data) {
      FileDownload(resp.data, name);
      return resp.data;
    }
    return resp;
  }).catch((error, code, status) => error && error.response && error.response.data);
}
export function getItemListCsv(name) {
  return dispatch => axios({
    method: 'get',
    url: `${API_URL}host/raffle/download/item/CSV`,
    headers: { Authorization: localStorage.getItem('token') },
    responseType: 'blob',
  }).then((resp) => {
    if (resp && resp.data) {
      FileDownload(resp.data, name);
      return resp.data;
    }
    return resp;
  }).catch((error, code, status) => error && error.response && error.response.data);
}

