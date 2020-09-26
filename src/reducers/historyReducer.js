import {
  STOCK_IN_FAIL,
  STOCK_IN_SUCCESS,
  STOCK_IN_REQUEST,
  SELL_REQUEST,
  SELL_SUCCESS,
  SELL_FAIL,
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
