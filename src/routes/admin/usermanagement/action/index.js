import ReactDOM from 'react-dom';
import axios from 'axios';
import { apiUrl as API_URL } from './../../../../clientConfig';
export function getUserManagementStaff() {
  return dispatch => axios({
    method: 'get',
    url: `${API_URL}host/usermanagement/event/staffs`,
    data: {},
    headers: { Authorization: localStorage.getItem('token') },
  });
}
export function addUserManagementStaff(staff) {
  return dispatch => axios({
    method: 'post',
    url: `${API_URL}host/usermanagement/staff`,
    data: staff,
    headers: { Authorization: localStorage.getItem('token') },
  }).then((resp) => {
    if (resp && resp.data) {
      return resp.data;
    }
    return resp;
  }).catch((error, code, status) => error && error.response && error.response.data);
}
export function deleteUserManagementStaff(staffId) {
  return dispatch => axios({
    method: 'DELETE',
    url: `${API_URL}host/usermanagement/staff/${staffId}`,
    data: {},
    headers: { Authorization: localStorage.getItem('token') },
  }).then((resp) => {
    if (resp && resp.data) {
      return resp.data;
    }
    return resp;
  }).catch((error, code, status) => error && error.response && error.response.data);
}

export function updatedUserManagementStaff(staffId, staff) {
  return dispatch => axios({
    method: 'put',
    url: `${API_URL}host/usermanagement/staff/${staffId}`,
    data: staff,
    headers: { Authorization: localStorage.getItem('token') },
  }).then((resp) => {
    if (resp && resp.data) {
      return resp.data;
    }
    return resp;
  }).catch((error, code, status) => error && error.response && error.response.data);
}

export function resendInvitationUserManagementStaff(staffId) {
  return dispatch => axios({
    method: 'post',
    url: `${API_URL}host/usermanagement/resendmail/staff/${staffId}`,
    data: {},
    headers: { Authorization: localStorage.getItem('token') },
  }).then((resp) => {
    if (resp && resp.data) {
      return resp.data;
    }
    return resp;
  }).catch((error, code, status) => error && error.response && error.response.data);
}
