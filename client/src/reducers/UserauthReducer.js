// Reducers to update Users Data in Redux Object
const userAuthReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_USER": {
            return { ...action.payload };
        }
        case "REMOVE_USER": {
            return {};
        }
        case "ACCOUNT_USER": {
            return { ...action.payload };
        }
        default: {
            return { ...state };
        }
    }
};
export default userAuthReducer;
