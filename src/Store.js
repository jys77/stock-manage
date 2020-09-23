import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

import {
  loginReducer,
  addItemReducer,
  getItemsReducer,
  getFilterReducer,
} from "./reducers";

const user = Cookie.getJSON("user") || null;

const initialState = {
  login: { user },
};

const reducer = combineReducers({
  login: loginReducer,
  newAdd: addItemReducer,
  items: getItemsReducer,
  filter: getFilterReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
