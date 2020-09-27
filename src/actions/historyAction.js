import axios from 'axios';
import {
  STOCK_IN_REQUEST,
  STOCK_IN_SUCCESS,
  STOCK_IN_FAIL,
  SELL_REQUEST,
  SELL_SUCCESS,
  SELL_FAIL,
  HISTORY_IN_REQUEST,
  HISTORY_IN_SUCCESS,
  HISTORY_IN_FAIL,
  HISTORY_OUT_REQUEST,
  HISTORY_OUT_SUCCESS,
  HISTORY_OUT_FAIL,
  GET_SELL_STATS_REQUEST,
  GET_SELL_STATS_SUCCESS,
  GET_SELL_STATS_FAIL,
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

export const historyIn = (start, end) => {
  return (dispatch, getState) => {
    dispatch({
      type: HISTORY_IN_REQUEST,
      payload: { start, end },
    });
    const {
      login: { user },
    } = getState();
    axios
      .get('/api/in?start=' + start + '&end=' + end, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
      .then((res) => {
        dispatch({
          type: HISTORY_IN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        if (err.response) {
          const { data } = err.response;
          dispatch({
            type: HISTORY_IN_FAIL,
            payload: data,
          });
        }
      });
  };
};

export const historyOut = (start, end) => {
  return (dispatch, getState) => {
    dispatch({
      type: HISTORY_OUT_REQUEST,
      payload: { start, end },
    });
    const {
      login: { user },
    } = getState();
    axios
      .get('/api/out?start=' + start + '&end=' + end, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
      .then((res) => {
        dispatch({
          type: HISTORY_OUT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        if (err.response) {
          const { data } = err.response;
          dispatch({
            type: HISTORY_OUT_FAIL,
            payload: data,
          });
        }
      });
  };
};

export const getSellStats = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_SELL_STATS_REQUEST,
    });
    const {
      login: { user },
    } = getState();
    axios
      .get('/api/out/stats', {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
      .then((res) => {
        dispatch({
          type: GET_SELL_STATS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        if (err.response) {
          const { data } = err.response;
          dispatch({
            type: GET_SELL_STATS_FAIL,
            payload: data,
          });
        }
      });
  };
};
