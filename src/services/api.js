import axios from 'axios';

// Base url -> https://sujeitoprogramador.com/
// Filter -> https://sujeitoprogramador.com/r-api/?api=filmes

const api = axios.create({
    baseURL: 'https://sujeitoprogramador.com'
})

export default api;