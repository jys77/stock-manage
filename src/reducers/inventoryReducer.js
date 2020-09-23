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
} from "../constants";

export const addItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return {
        loading: true,
      };
    case ADD_ITEM_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case ADD_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return {
        loading: true,
      };
    case GET_ITEMS_SUCCESS:
      return {
        loading: false,
        items: action.payload,
      };
    case GET_ITEMS_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getFilterReducer = (
  state = {
    cats: [],
    brands: [],
    names: [],
  },
  action
) => {
  switch (action.type) {
    case GET_ITEMS_CATS:
      return {
        ...state,
        cats: action.payload,
      };
    case GET_ITEMS_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
    case GET_ITEMS_NAMES:
      return {
        ...state,
        names: action.payload,
      };
    default:
      return state;
  }
};
