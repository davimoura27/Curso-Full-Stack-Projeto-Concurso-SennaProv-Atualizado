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
        console.log("erro capturado", error.response)
        if(error.response && error.response.status === 401){
            if(error.config?.url?.includes("auth/login")){
                return Promise.reject(error)
            }
            localStorage.removeItem("userData")
            delete api.defaults.headers.common['Authorization']
            window.dispatchEvent(new Event("tokenExpired"))            
        }
        return Promise.reject(error)
    }
)
export const registerUser = async (name, telephone, age, email, password) => {
    try {
        const res = await api.post("users/register",{
          name,
          telephone,
          age,
          email,
          password  
        })
        return{success:true,
               data:res.data,
               error:false}
    } catch (error) {
        let data = error.response?.data;
        if(typeof data === "string"){
            return{success:false,
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
        if (response.status === 200 && response.data) {
            const userData = {
                name: response.data.name,
                email: response.data.email,
                token: response.data.token
            }
            localStorage.setItem("userData", JSON.stringify(userData))
            window.dispatchEvent(new Event("userChanged"))
            return {success:true,
                    data:userData,
                    error: null}
        }
    } catch (error) {
        console.log(error.response.data)
        return {success:false,
                data: null,
                error: error.response?.data};
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
    window.dispatchEvent(new Event("userChanged"))
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

