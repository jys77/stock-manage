import {
  STOCK_IN_FAIL,
  STOCK_IN_SUCCESS,
  STOCK_IN_REQUEST,
  SELL_REQUEST,
  SELL_SUCCESS,
  SELL_FAIL,
  HISTORY_IN_REQUEST,
  HISTORY_IN_SUCCESS,
  HISTORY_IN_FAIL,
  HISTORY_OUT_REQUEST,
  HISTORY_OUT_SUCCESS,
  HISTORY_OUT_FAIL,
} from '../constants';

export const stockInReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_IN_REQUEST:
      return {
        loading: true,
        beforeSubmit: action.payload,
      };
    case STOCK_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: '入库记录添加成功！',
      };
    case STOCK_IN_FAIL:
      return {
        ...state,
        loading: false,
        error: '入库记录添加失败！',
      };
    default:
      return state;
  }
};

export const sellReducer = (state = {}, action) => {
  switch (action.type) {
    case SELL_REQUEST:
      return {
        loading: true,
        beforeSubmit: action.payload,
      };
    case SELL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: '售出记录添加成功！',
      };
    case SELL_FAIL:
      return {
        ...state,
        loading: false,
        error: '售出记录添加失败！',
      };
    default:
      return state;
  }
};

export const historyInReducer = (state = {}, action) => {
  switch (action.type) {
    case HISTORY_IN_REQUEST:
      return {
        loading: true,
      };
    case HISTORY_IN_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case HISTORY_IN_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const historyOutReducer = (state = {}, action) => {
  switch (action.type) {
    case HISTORY_OUT_REQUEST:
      return {
        loading: true,
      };
    case HISTORY_OUT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case HISTORY_OUT_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
