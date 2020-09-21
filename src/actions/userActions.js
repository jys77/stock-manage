import axios from "axios";
import Cookie from "js-cookie";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../constants";

export const login = (username, password) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        username,
        password,
      },
    });
    axios
      .post("/api/users/login", {
        username,
        password,
      })
      .then((res) => {
        const data = res.data;
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
        Cookie.set("user", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          const { data } = err.response;
          dispatch({
            type: LOGIN_FAIL,
            payload: data,
          });
        }
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    Cookie.remove("user");
    dispatch({ type: LOGOUT });
  };
};
