import axios from "axios";
import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
} from "../constants";

export const addItem = (newItem) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_ITEM_REQUEST,
    });
    const {
      login: { user },
    } = getState();
    axios
      .post("/api/inventories/add", newItem, {
        headers: {
          Authorization: "Bearer " + user.token,
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
