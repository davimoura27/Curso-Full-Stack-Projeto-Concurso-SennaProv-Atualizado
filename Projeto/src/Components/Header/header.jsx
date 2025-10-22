import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { Sun, Moon, User, List } from "@phosphor-icons/react";
import styles from "./header.module.css";
import { Modal } from "../Modal/Modal";
import { useTheme } from "../../contexts/ThemeContext";
import { getStoredUser, logoutUser } from "../../services/ApiLogin/apiLogin"; 
import SignUp from "../SignUp/SignUp";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const {isDarkMode, toggleTheme } = useTheme();
 
  const navigate = useNavigate(); 
  
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const loadUser = () => {
      const storedUser = getStoredUser()
      if(storedUser){
        setIsLoggedIn(true);
        setUsername(storedUser.name)      
      }else{
        setIsLoggedIn(false)
        setUsername("")
      }  
    }
    loadUser()
    window.addEventListener("userChanged", loadUser)
    return () => {
      window.removeEventListener("userChanged", loadUser)
    }     
  }, []);

  // Função executada após login bem-sucedido
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
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
                <li>
                  {isLoggedIn ? (
                    <div className={styles.containerMenuLateral}>
                      <button onClick={handleLogout} className={styles.buttonLogout}>
                        <User weight="fill" size={20} />
                        <h5>{username}</h5>
                      </button>
                      <ul className={styles.menuLateralUsuario}>
                        <li><Link to="/bloco-de-notas">Bloco de Notas</Link></li>
                        <li><Link to="/ajuda-nos-estudos">Professores</Link></li>
                        <li><Link to="/favoritos">Favoritos</Link></li>
                      </ul>                

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
                <button className={styles.fecharButton} onClick={toggleMenu}>Fechar</button>
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
              <div className={styles.containerButtonLoginTheme}>                 
                <button onClick={toggleTheme} className={styles.themeToggle}>                
                  {isDarkMode ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
                </button>                 
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
