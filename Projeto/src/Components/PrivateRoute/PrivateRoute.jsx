import { Navigate } from 'react-router-dom';
import { authService, getStoredUser } from '../../services/ApiLogin/apiLogin';

// Componente para proteger rotas que requerem autenticação
const PrivateRoute = ({ children }) => {
  
  // Redireciona para login se não autenticado, ou renderiza o conteúdo protegido
  return getStoredUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
