import axios from "../config/axios";
import Cookies from 'js-cookie'
export const setUser = user => {
    return {
        type: "SET_USER",
        payload: user
    };
};
// export const deleteUser = id => {
//   return {
//     type: "DELETE_USER",
//     payload: id
//   };
// };
export const accountUser = user => {
    return {
        type: "ACCOUNT_USER",
        payload: user
    };
};
export const removeUser = () => {
    return {
        type: "REMOVE_USER"
    };
};
// Login User
export const startSetUser = formData => {
    return dispatch => {
        axios
            .post("/users/login", formData)
            .then(response => {
                if (response.data.errors) {
                    window.alert(response.data.errors);
                } else {

                    // var date = new Date(new Date().getTime() + 2 * 60 * 1000);
                    Cookies.set("token", response.data.token, { expires: 1 / 24, path: '/' })
                    dispatch(setUser(response.data.user));
                }
            })
            .catch(err => {
                window.alert(err);
            });
    };
};
// Logout User
export const startRemoveUser = () => {
    return dispatch => {
        axios
            .delete("/users/logout", {
                headers: {
                    "x-auth": Cookies.get("token")
                }
            })
            .then(response => {
                Cookies.remove("token");
                dispatch(removeUser());
            })
            .catch(err => {
                window.alert(err);
            });
    };
};
