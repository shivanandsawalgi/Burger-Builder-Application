import axios from 'axios';

const instance1 = axios.create({
    baseURL : 'https://react-burger-builder-cdd4e-default-rtdb.firebaseio.com/'
});

export default instance1;