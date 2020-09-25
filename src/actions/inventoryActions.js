import axios from 'axios';
import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL,
  GET_ITEMS_CATS,
  GET_ITEMS_BRANDS,
  GET_ITEMS_NAMES,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_FAIL,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from '../constants';

export const addItem = (newItem) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_ITEM_REQUEST,
    });
    const {
      login: { user },
    } = getState();
    axios
      .post('/api/inventories/add', newItem, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
      .then((res) => {
        dispatch({
          type: ADD_ITEM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        if (err.response) {
          const { data } = err.response;
          dispatch({
            type: ADD_ITEM_FAIL,
            payload: data,
          });
        }
      });
  };
};

export const getItems = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    const {
      login: { user },
    } = getState();
    axios
      .get('/api/inventories/', {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
      .then((res) => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        if (err.response) {
          const { data } = err.response;
          dispatch({
            type: GET_ITEMS_FAIL,
            payload: data,
          });
        }
      });
  };
};

export const getFilters = (filterName) => {
  return (dispatch) => {
    axios.get('/api/inventories/' + filterName).then((res) => {
      if (filterName === 'categories') {
        dispatch({
          type: GET_ITEMS_CATS,
          payload: res.data,
        });
      } else if (filterName === 'brands') {
        dispatch({
          type: GET_ITEMS_BRANDS,
          payload: res.data,
        });
      } else if (filterName === 'names') {
        dispatch({
          type: GET_ITEMS_NAMES,
          payload: res.data,
        });
      } else return;
    });
  };
};

export const updateItem = ({ _id, name, brand, model, stock, unit, category, valid }) => {
  return (dispatch, getState) => {
    const {
      login: { user },
    } = getState();
    dispatch({
      type: UPDATE_ITEM_REQUEST,
      payload: {
        _id,
        name,
        brand,
        model,
        stock,
        unit,
        category,
        valid,
      },
    });
    axios
      .put(
        '/api/inventories/' + _id,
        {
          name,
          brand,
          model,
          stock,
          unit,
          category,
          valid,
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: UPDATE_ITEM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        if (err.response) {
          const { data } = err.response;
          dispatch({
            type: UPDATE_ITEM_FAIL,
            payload: data,
          });
        }
      });
  };
};

export const searchItems = (keyword) => {
  return (dispatch, getState) => {
    const {
      login: { user },
    } = getState();
    dispatch({
      type: SEARCH_REQUEST,
    });
    axios
      .get('/api/search?keyword=' + keyword, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
      .then((res) => {
        dispatch({
          type: SEARCH_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        if (err.response) {
          const { data } = err.response;
          dispatch({
            type: SEARCH_FAIL,
            payload: data,
          });
        }
      });
  };
};
