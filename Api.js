

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
    addCategoria: async (token,nome) => {
        const response = await fetch(`${BASE_API}/categorias`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({nome})
        });
        return response;
    },
    updateCategoria: async (token,id,nome) => {
        const response = await fetch(`${BASE_API}/categorias/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({nome})
        });
        return response;
    },
    getPagamentos: async (token) => {
        const response = await fetch(`${BASE_API}/pagamentos`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    addPagamento: async (token,nome) => {
        const response = await fetch(`${BASE_API}/pagamentos`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({nome})
        });
        return response;
    },
    updatePagamento: async (token,id,nome) => {
        const response = await fetch(`${BASE_API}/pagamentos/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({nome})
        });
        return response;
    },
    getTaxas: async (token) => {
        const response = await fetch(`${BASE_API}/taxas`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    addTaxa: async (token,bairro,valor) => {
        const response = await fetch(`${BASE_API}/taxas`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({bairro,valor})
        });
        return response;
    },
    updateTaxa: async (token,id,bairro,valor) => {
        const response = await fetch(`${BASE_API}/taxas/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({bairro,valor})
        });
        return response;
    },

    toggleStatus: async (token) => {
        const response = await fetch(`${BASE_API}/status`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    getHorarios: async (token) => {
        const response = await fetch(`${BASE_API}/horarios`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },/*
    addHorario: async (token,dia,horario) => {
        const response = await fetch(`${BASE_API}/horarios`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({dia,horario})
        });
        return response;
    },*/
    updateHorario: async (token,id,horario) => {
        const response = await fetch(`${BASE_API}/horarios/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({id,horario})
        });
        return response;
    },
    getObrigatorios: async (token) => {
        const response = await fetch(`${BASE_API}/obrigatorios`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getObrigatorioById: async (token,id) => {
        const response = await fetch(`${BASE_API}/obrigatorios/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    updateObrigatorios: async (token,id,nome,opcoes) => {
        const response = await fetch(`${BASE_API}/obrigatorios/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({nome,opcoes})
        });
        return response;
    },
    addObrigatorio: async (token,nome,opcoes) => {
        const response = await fetch(`${BASE_API}/obrigatorios`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({nome,opcoes})
        });
        return response;
    },
    getAdicionais: async (token) => {
        const response = await fetch(`${BASE_API}/adicionais`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    addAdicional: async (token,nome,valor) => {
        const response = await fetch(`${BASE_API}/adicionais`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({nome,valor})
        });
        return response;
    },
    updateAdicional: async (token,id,nome,valor) => {
        const response = await fetch(`${BASE_API}/adicionais/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({nome,valor})
        });
        return response;
    },
    getPedidos: async (token) => {
        const response = await fetch(`${BASE_API}/pedidos`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getPedido: async (token,id) => {
        const response = await fetch(`${BASE_API}/pedidos/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getStatus: async (token) => {
        const response = await fetch(`${BASE_API}/status`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },  
    addStatusLog: async (token,pedido_id,status_pedido_id) => {
        const response = await fetch(`${BASE_API}/statuslog`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({pedido_id,status_pedido_id})
        });
        return response;
    },
    updateProduto: async (token,id,nome,preco,ativo) => {
        const response = await fetch(`${BASE_API}/produtos/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({nome,preco,ativo})
        });
        return response;
    },

};

