import axios from "../config/axios";
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
export const startSetUser = formData => {
    return dispatch => {
        axios
            .post("/users/login", formData)
            .then(response => {
                if (response.data.errors) {
                    window.alert(response.data.errors);
                } else {
                    localStorage.setItem("token", response.data.token);
                    dispatch(setUser(response.data.user));
                }
            })
            .catch(err => {
                window.alert(err);
            });
    };
};

export const startRemoveUser = () => {
    return dispatch => {
        axios
            .delete("/users/logout", {
                headers: {
                    "x-auth": localStorage.getItem("token")
                }
            })
            .then(response => {
                localStorage.removeItem("token");
                dispatch(removeUser());
            })
            .catch(err => {
                window.alert(err);
            });
    };
};

export const startAccountUser = () => {
    return dispatch => {
        axios
            .get("/users/account", {
                headers: {
                    "x-auth": localStorage.getItem("token")
                }
            })
            .then(response => {
                const user = {
                    username: response.data.username,
                    email: response.data.email
                };
                // console.log(response.data);
                dispatch(accountUser(user));
            })
            .catch(err => {
                window.log(err);
            });
    };
};
