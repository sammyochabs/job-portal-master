import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import Auth from "../store/reducers/auth";
import Master from "../store/reducers/master";

const reducers = combineReducers({
  auth: Auth,
  master: Master,
});

const store = createStore(reducers, applyMiddleware(thunk));

const AppProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

store.subscribe(() => {
  //console.log('subscribed for messanger actions', store.getState());
});

export default AppProvider;
