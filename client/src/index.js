import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './bootstrap.css'

import Cookies from 'js-cookie'
// import swal from 'sweetalert'
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import axios from "./config/axios";
import { accountUser } from "./actions/user";
const store = configureStore


// Get the Account Information
if (Cookies.get("token")) {
  axios
    .get("/users/account", {
      headers: {
        "x-auth": Cookies.get("token")
      }
    })
    .then(
      response => {
        if (response.data.errors) {
          window.alert(response.data);
        } else {
          const user = {
            username: response.data.username,
            email: response.data.email
          };
          store.dispatch(accountUser(user));
        }
      }
    )
    .catch(err => {
      // if (Cookies.get('token')) {
      // } else {
      //   history.push('/login')
      // }

      // swal('Error!', err.toString(), 'error')
      window.location.reload()
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
