import ReactDOM from 'react-dom';
import axios from 'axios';

export function storeEventData(data){
  return {
    type:'STORE_DASD',
    data,
  }
}