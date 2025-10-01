import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { MagnifyingGlass, Sun, Moon, User, List } from "@phosphor-icons/react";
import styles from "./header.module.css";
import { Modal } from "../Modal/Modal";
import { useTheme } from "../../contexts/ThemeContext";
import { authService } from "../../services/ApiLogin/apiLogin"; 

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Estados para controlar o modal de login, status de autenticação e nome do usuário
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());
  const [username, setUsername] = useState("");
  // Hook personalizado para gerenciar o tema (claro/escuro)
  const { isDarkMode, toggleTheme } = useTheme();

  const location = useLocation(); // Obtém a rota atual
  const navigate = useNavigate(); // Permite navegação programática
  const backButtonPages = ["/bloco-de-notas", "/ajuda-nos-estudos", "/favoritos"];
  
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const showBackButton = backButtonPages.includes(location.pathname); // Verifica se deve exibir o botão "Voltar"
  // Efeito para verificar o status de autenticação ao montar o componente
  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []);

  // Função executada após login bem-sucedido
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setIsModalOpen(false);
  };

  // Função para realizar o logout do usuário
  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className={styles.container}>
      {/* Logo com link para a página inicial */}
      <div className={styles.imagem}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      {/* Lista de navegação principal */}
      <ul className={styles.listHeader}>
        


       {/* Menu lateral (telas menores) */}
      <li>
        <div className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ""}`}>
          <nav className={styles.nav}>
            <ul>
              <li><Link to="/bloco-de-notas">Bloco de Notas</Link></li>
              <li><Link to="/ajuda-nos-estudos">Professores</Link></li>
              <li><Link to="/favoritos">Favoritos</Link></li>
              <li><button className={styles.loginButtonMenu} onClick={() => setIsModalOpen(true)}>
              Login
            </button></li>
              <li><button className={styles.fecharButton} onClick={toggleMenu}>Fechar</button></li>
            </ul>
          </nav>
        </div>
      </li>
      
        {/* Botão para alternar entre tema claro e escuro */}
      <li>
          <button onClick={toggleTheme} className={styles.menuButton}>
            {isDarkMode ? (
              <Sun size={20} weight="bold" />
            ) : (
              <Moon size={20} weight="bold" />
            )}
          </button>
        </li>

        {/* Botão do menu hambúrguer (para telas menores) */}
      <button className={styles.menuButton} onClick={toggleMenu} aria-label="Abrir menu">
        <List size={32} />
      </button>


        {/* Área de usuário: mostra informações do usuário ou botão de login */}
        {/* <li>
          {isLoggedIn ? (
            // Se estiver logado, mostra ícone e nome do usuário
            <div className={styles.userInfo} onClick={handleLogout}>
              <User size={24} weight="fill" className={styles.userIcon} />
              <span className={styles.username}>{username}</span>
            </div>
          ) : (
            // Se não estiver logado, mostra botão de login
            <button
              className={styles.loginButton}
              onClick={() => setIsModalOpen(true)}
            >
              Login
            </button>
          )}
        </li> */}
      </ul>




       {/* Menu de navegação padrão (telas maiores) */}
       <nav className={styles.navDesktop}>
        <ul>
          {/* Botão Voltar condicional */}
          {showBackButton && (
            <li>
              <button className={styles.sobreNoisButton} onClick={() => navigate(-1)}>
                Voltar
              </button>
            </li>
          )}
          <div className={styles.sobreNoisButton}>
          <li><Link to="/bloco-de-notas">Bloco de Notas</Link></li>
          </div>
          <div  className={styles.sobreNoisButton}>
          <li><Link to="/ajuda-nos-estudos">Professores</Link></li>
          </div>
          <div  className={styles.sobreNoisButton}>
          <li><Link to="/favoritos">Favoritos</Link></li>
          </div>
         
          <li>
            <button onClick={toggleTheme} className={styles.themeToggle}>
              {isDarkMode ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
            </button>
          </li>
          <li>
            <button className={styles.loginButton} onClick={() => setIsModalOpen(true)}>
              Login
            </button>
          </li>
        </ul>
      </nav>



      {/* Modal de login que é exibido quando isModalOpen é true */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
