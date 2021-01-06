import axios from 'axios';

const URL = 'http://169.254.182.194:3333/';

const api = axios.create({
    baseURL: URL
})


export { URL };
export default api;