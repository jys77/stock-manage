import axios from 'axios';
import {
  STOCK_IN_REQUEST,
  STOCK_IN_SUCCESS,
  STOCK_IN_FAIL,
  SELL_REQUEST,
  SELL_SUCCESS,
  SELL_FAIL,
} from '../constants';

export const stockIn = (time, items) => {
  const arr = [];
  const correctTime = new Date(time);
  for (let i = 0; i < items.length; i++) {
    arr.push({
      timeIn: correctTime,
      inventory: items[i].id,
      count: items[i].count,
      priceIn: items[i].price,
    });
  }
  return (dispatch, getState) => {
    dispatch({
      type: STOCK_IN_REQUEST,
      payload: arr,
    });
    const {
      login: { user },
    } = getState();
    Promise.all([
      arr.map((item) => {
        return axios.post('/api/in/' + item.inventory, item, {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        });
      }),
    ])
      .then((values) => {
        dispatch({
          type: STOCK_IN_SUCCESS,
          payload: values,
        });
      })
      .catch((err) => {
        dispatch({
          type: STOCK_IN_FAIL,
          payload: err,
        });
      });
  };
};

export const sell = (time, items) => {
  const arr = [];
  const correctTime = new Date(time);
  for (let i = 0; i < items.length; i++) {
    arr.push({
      timeOut: correctTime,
      inventory: items[i].id,
      count: items[i].count,
      priceOut: items[i].price,
    });
  }
  return (dispatch, getState) => {
    dispatch({
      type: SELL_REQUEST,
      payload: arr,
    });
    const {
      login: { user },
    } = getState();
    Promise.all([
      arr.map((item) => {
        return axios.post('/api/out/' + item.inventory, item, {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        });
      }),
    ])
      .then((values) => {
        dispatch({
          type: SELL_SUCCESS,
          payload: values,
        });
      })
      .catch((err) => {
        dispatch({
          type: SELL_FAIL,
          payload: err,
        });
      });
  };
};
