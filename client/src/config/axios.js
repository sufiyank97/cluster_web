import Axios from "axios";
// global axios api
const axios = Axios.create({
    baseURL: "http://localhost:3004"
    // baseURL: "/"
});
export default axios;
