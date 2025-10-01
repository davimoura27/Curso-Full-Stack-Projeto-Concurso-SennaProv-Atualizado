import { Navigate } from 'react-router-dom';
import { authService } from '../../services/ApiLogin/apiLogin';

// Componente para proteger rotas que requerem autenticação
const PrivateRoute = ({ children }) => {
  // Verifica se o usuário está autenticado
  const isAuthenticated = authService.isAuthenticated();
  
  // Redireciona para login se não autenticado, ou renderiza o conteúdo protegido
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
