import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Auction.css';
import {apiUrl as API_URL} from './../../../clientConfig';
import axios from 'axios';
import fileDownload from 'react-file-download';

class Auction extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  render() {

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }
}

export function updateAuctionSettings(auctionDTO) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/auction/settings',
      data : auctionDTO,

    })
  }
}

export function resetAuctionSettings() {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/auction/reset',

    })
  }
}

export function getAuctionSettings() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/auction/settings',

    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}

export function getAuctionCategories() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/auction/itemCategories',

    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}

export function addAuctionCategory(itemCategory) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/auction/itemCategory',
      data : {itemCategoryDto:itemCategory},

    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}

export function removeAuctionCategory(id) {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: API_URL + 'host/auction/itemCategory/'+ id,

    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}

export function updateAuctionCategory(id, itemCategory) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/auction/itemCategory/'+ id,
      data : itemCategory,

    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}

export function getAuctionItems(page, size) {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/auction/items?page='+ page +'&size='+ size,

    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}

export function addAuctionItem(auctionDTO) {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: API_URL + 'host/auction/item',
      data : auctionDTO,

    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}

export function updateAuctionItem(id, auctionDTO) {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: API_URL + 'host/auction/item/' + id,
      data : auctionDTO,

    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}
export function getGeneralSettings() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/settings/general',

    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}

export function getItemCatalog() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/auction/export/itemCatalog/pdf',
      responseType:'blob',

    }).then(resp => {
      fileDownload(resp.data, 'catalog.pdf');
    }).catch(error => {
      console.log(error);
    })
  }
}

export function getItemsPDF() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/auction/export/items/pdf',
      responseType:'blob',

    }).then(resp => {
      fileDownload(resp.data, 'items.pdf');
    }).catch(error => {
      console.log(error);
    })
  }
}

export function getItemsCSV() {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: API_URL + 'host/auction/download/item/CSV',
      responseType:'blob',

    }).then(resp => {
      fileDownload(resp.data, 'items.csv');
    }).catch(error => {
      console.log(error);
    })
  }
}

export function removeItem(id) {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: API_URL + 'host/auction/item/'+ id,

    }).then(resp => {
      return resp;
    }).catch(error => {
      console.log(error);
    })
  }
}

export default withStyles(s)(Auction);
