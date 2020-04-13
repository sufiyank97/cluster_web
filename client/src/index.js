import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './bootstrap.css'

import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import axios from "./config/axios";
import { setUser } from "./actions/user";
const store = configureStore

if (localStorage.getItem("token")) {
  axios
    .get("/users/account", {
      headers: {
        "x-auth": localStorage.getItem("token")
      }
    })
    .then(
      response => {
        if (response.data.errors) {
          window.alert(response.data);
        }
        const user = response.data;
        store.dispatch(setUser(user));
      }
    )
    .catch(err => {
      window.alert(err);
    });
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
