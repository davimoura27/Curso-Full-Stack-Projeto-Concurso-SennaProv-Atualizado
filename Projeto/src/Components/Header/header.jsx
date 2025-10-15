import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { MagnifyingGlass, Sun, Moon, User, List } from "@phosphor-icons/react";
import styles from "./header.module.css";
import { Modal } from "../Modal/Modal";
import { useTheme } from "../../contexts/ThemeContext";
import { authService, logoutUser } from "../../services/ApiLogin/apiLogin"; 

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const {isDarkMode, toggleTheme } = useTheme();

  const location = useLocation(); 
  const navigate = useNavigate(); 
  const backButtonPages = ["/bloco-de-notas", "/ajuda-nos-estudos", "/favoritos"];
  
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const showBackButton = backButtonPages.includes(location.pathname); // Verifica se deve exibir o botão "Voltar"
  // Efeito para verificar o status de autenticação ao montar o componente
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"))
    if(storedUser){
      setIsLoggedIn(true);
      setUsername(storedUser.name)      
    }   
  }, []);

  // Função executada após login bem-sucedido
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.name);
    setIsModalOpen(false);    
  };

  // Função para realizar o logout do usuário
  const handleLogout = () => {
    logoutUser()
    setIsLoggedIn(false);
    setUsername("");
    navigate("/")

  };

  return (
    <div className={styles.container}>
      {/* Logo com link para a página inicial */}
      <div className={styles.imagem}>
        <div>
          <img src={logo} alt="logo" />
        </div>
      </div>

      {/* Lista de navegação principal */}
      <ul className={styles.listHeader}>
       {/* Menu lateral (telas menores) */}
      <li>
        <div className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ""}`}>
          <nav className={styles.nav}>
            <ul>              
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
      </ul>
       <nav className={styles.navDesktop}>
        <ul>         
          <li>
            {isLoggedIn ? (
              <div className={styles.containerMenu}>
                <ul className={styles.menuUsuario}>
                  <li><Link to="/bloco-de-notas">Bloco de Notas</Link></li>
                  <li><Link to="/ajuda-nos-estudos">Professores</Link></li>
                  <li><Link to="/favoritos">Favoritos</Link></li>
                </ul>
                <div className={styles.containerButtonClaroEscuro}>
                  <button onClick={toggleTheme} className={styles.themeToggle}>
                    {isDarkMode ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
                  </button>
                </div>
                <button onClick={handleLogout} className={styles.buttonLogout}>
                  <User weight="fill" size={20} />
                  <h5>{username}</h5>
                </button>
              </div>
            ) : (
              <div>
                <button className={styles.loginButton} onClick={() => setIsModalOpen(true)}>
                  Login
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
