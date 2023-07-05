import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000"

axios.interceptors.request.use(request => {
    request.headers = {
        token: localStorage.getItem('token')
    }
    return request;
})

export { axios }