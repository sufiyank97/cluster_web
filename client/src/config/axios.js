import Axios from "axios";

const axios = Axios.create({
    // baseURL: "http://localhost:3004"
    baseURL: "/"
});
export default axios;
