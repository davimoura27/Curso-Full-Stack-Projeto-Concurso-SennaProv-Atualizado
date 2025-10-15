import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});
api.interceptors.request.use((config) => {
    const user = localStorage.getItem("userData");
    if(user){
        const {token} = JSON.parse(user);
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})
api.interceptors.response.use(
    (response) => response, (error) =>{
        if(error.response && (error.response.status === 401)){
            localStorage.removeItem("userData")
            delete api.defaults.headers.common['Authorization']
            setTimeout(() => {
                window.location.href = '/'
            })
            console.log("Token expirado, faça login novamente")
        }
        return Promise.reject(error)
    }
)

export const registerUser = async (name, age, telephone, email, password) => {
    try {
        const res = await api.post("users/register",{
          name,
          age,
          telephone,
          email,
          password  
        })
        return{sucess:true,
               data:res.data,
               error:false}
    } catch (error) {
        let data = error.response?.data;
        if(typeof data === "string"){
            return{sucess:false,
                   data: false,
                   error:data}
        }else if(typeof data === "object" && data !== null){
            const key = Object.keys(data)
            if(key.length >0){
                const errorMgs = data[key[0]]
                return{sucess:false,
                       data:false,
                       error:errorMgs}
            }
        }
    }
}
export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        if (response.status === 200 && response.data){
            const userData = {
                name: response.data.name,
                email: response.data.email,
                token: response.data.token
            }
            console.log(userData)
            localStorage.setItem("userData", JSON.stringify(userData))
            return userData
        }
    } catch (error) {
        console.log(error.response.data)
        return error;
    }
};
export const getStoredUser = () =>{
    try {
        const user = localStorage.getItem("userData")
        const userExist = JSON.parse(user)
        if (userExist) {
            return userExist
        } else {
            return null
        }        
    } catch (error) {
        console.log("Erro ao buscar usuario no banco:", error)
    }   
}
export const logoutUser = () => {
    localStorage.removeItem("userData")
    console.log("Usuraio removido")
}
export const favorites = {
    getFavorites: () => api.get("/favoritos/lista"),
    createFavorites:(newFavorites) => api.post("/favoritos/adicionar", newFavorites),
    deleteFavorites:(id)=> api.delete(`/favoritos/remove/${id}`)
}

export const blockNotes = {
    getBlockNotes: () => api.get("/notas/lista"),
    postBlockNotes: (blockNotes) => api.post("/notas/adicionar",blockNotes),
    putBlockNotes: (id, blockNotes) => api.put(`/notas/atualizar/${id}`, blockNotes),
    deleteBlockNotes: (id) => api.delete(`/notas/remove/${id}`)
}





/**
 * Serviço de autenticação que gerencia o token JWT
 * Contém métodos para:
 * - login: salva o token no localStorage e configura headers
 * - logout: remove o token e limpa headers
 * - isAuthenticated: verifica se existe um token válido
 */
export const authService = {
    login: (token) => {
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    
    logout: () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    },
    
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

/**
 * Função que realiza o login do usuário
 * @param {string} username - Nome de usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<Object>} Retorna um objeto com username e token em caso de sucesso
 * @throws {Error} Lança erro em caso de falha na autenticação
 */
