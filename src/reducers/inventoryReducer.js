import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
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
