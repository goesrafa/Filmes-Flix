import axios from 'axios';
//URL da api dos filmes
//Base da URL :https://api.themoviedb.org/3/

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;