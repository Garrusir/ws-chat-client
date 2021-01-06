import axios from 'axios';

const URL = 'https://stark-chamber-78897.herokuapp.com/';

const api = axios.create({
    baseURL: URL
})


export { URL };
export default api;
