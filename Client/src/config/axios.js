import axios from 'axios';

const ClienteAxios =  axios.create({
    baseURL : 'http://localhost:7777'
});
export default ClienteAxios;