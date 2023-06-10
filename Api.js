

//const BASE_API = 'localhost:8000/api';
const BASE_API = 'http://192.168.0.117:8000/api';

export default {
  base_storage: 'http://192.168.0.117:8000/storage',
 // base_storage: 'https://tripsun.tk/storage',
  //  base_storage: 'http://177.104.209.216:8000/storage',


    login: async (email, password) => {
        const response = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
       // const json = await req.json();
        return response;
    },
    getUser: async (token) => {
        const response = await fetch(`${BASE_API}/user`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getCategorias: async (token) => {
        const response = await fetch(`${BASE_API}/categorias`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
        

};

