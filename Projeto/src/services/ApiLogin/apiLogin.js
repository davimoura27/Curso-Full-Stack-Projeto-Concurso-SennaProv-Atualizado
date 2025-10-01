import axios from 'axios';

// Cria uma instância do axios com configurações base para todas as requisições
export const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Interceptor que automaticamente adiciona o token de autenticação em todas as requisições
 * Verifica se existe um token no localStorage e o adiciona no header Authorization
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

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
export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        console.log(response.data);
        if (response.status === 200 && response.data) {
            // Salva apenas o token
            authService.login(response.data.token);
            return {
                username,
                token: response.data.token
            };
        }
        throw new Error('Falha na autenticação');
    } catch (error) {
        console.error('[Login]:', error.message);
        throw error;
    }
};