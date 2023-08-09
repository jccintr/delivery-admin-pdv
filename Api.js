

//const BASE_API = 'localhost:8000/api';
//const BASE_API = 'http://192.168.0.117:8000/api';
const BASE_API = 'https://brazped-api.js-software.tech/api';

export default {
 // base_storage: 'http://192.168.0.117:8000/storage',
  base_storage: 'https://brazped-api.js-software.tech/storage',
 
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
    addTaxa: async (token,bairro,valor,ativo) => {
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
    updateTaxa: async (token,id,bairro,valor,ativo) => {
        const response = await fetch(`${BASE_API}/taxas/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({bairro,valor,ativo})
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
    updateEspera: async (token,tempo_espera) => {
        const response = await fetch(`${BASE_API}/espera`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({tempo_espera})
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
    updateProduto: async (token,id,nome,descricao,preco,categoria_id,ativo) => {
        const response = await fetch(`${BASE_API}/produtos/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({nome,descricao,preco,categoria_id,ativo})
        });
        return response;
    },
    updateImagemProduto: async (token,id,fd) => {
        const response = await fetch(`${BASE_API}/produtos/imagem/${id}`, {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + token},
            body: fd
        });
        return response;
    },
    getProduto: async (token,id) => {
        const response = await fetch(`${BASE_API}/produtos/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    addProduto: async (token,fd) => {
        const response = await fetch(`${BASE_API}/produtos`, {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + token},
            body: fd
        });
        return response;
    },
    AddProdutoObrigatorio: async (token,produto_id,obrigatorio_id) => {
        const response = await fetch(`${BASE_API}/produtoobrigatorio`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({produto_id,obrigatorio_id})
        });
        return response;
    },
    DeleteProdutoObrigatorio: async (token,id) => {
        const response = await fetch(`${BASE_API}/produtoobrigatorio/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
    AddProdutoAdicional: async (token,produto_id,adicional_id) => {
        const response = await fetch(`${BASE_API}/produtoadicional`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({produto_id,adicional_id})
        });
        return response;
    },
    DeleteProdutoAdicional: async (token,id) => {
        const response = await fetch(`${BASE_API}/produtoadicional/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
    addTenant: async (token,fd) => {
        const response = await fetch(`${BASE_API}/tenant`, {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + token},
            body: fd
        });
       return response;
    },
    storePushToken: async (token,push_token) => {
        const response = await fetch(`${BASE_API}/tenant/token`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({push_token})
        });
        return response;
    },
    getResumo: async (token) => {
        const response = await fetch(`${BASE_API}/pedidosresumo`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    changePassword: async (token,password) => {
        const response = await fetch(`${BASE_API}/changepassword`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({password})
        });
        return response;
    },
    
};

