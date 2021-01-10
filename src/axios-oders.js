import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-be372-default-rtdb.firebaseio.com/'
});

export default instance;