import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { Sun, Moon, User, List } from "@phosphor-icons/react";
import styles from "./header.module.css";
import { Modal } from "../Modal/Modal";
import { useTheme } from "../../contexts/ThemeContext";
import { getStoredUser, logoutUser } from "../../services/ApiLogin/apiLogin"; 

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
    window.addEventListener("tokenExpired",loadUser)
    return () => {
      window.removeEventListener("userChanged", loadUser)
      window.removeEventListener("tokenExpired", loadUser)
    }     
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);    
  };

  const handleLogout = () => {
    logoutUser()
    setIsLoggedIn(false);
    setUsername("");
    navigate("/")
  };

  return (
    <div className={styles.container}>
      <div className={styles.imagem}>
        <div>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <ul className={styles.listHeader}>
        <li>
          <div className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ""}`}>
            <nav className={styles.nav}>
              <ul>              
                  <li>
                    {isLoggedIn ? (
                      <div className={styles.sideMenuContainer}>
                        <button onClick={handleLogout} className={styles.buttonLogout}>
                          <User weight="fill" size={20} />
                          <h5>{username}</h5>
                        </button>
                        <ul className={styles.sideMenuUser}>
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
                <button className={styles.closeButton} onClick={toggleMenu}>Fechar</button>
            </nav>
          </div>
        </li>      
        <li>
          <button onClick={toggleTheme} className={styles.menuButton}>
            {isDarkMode ? (
              <Sun size={20} weight="bold" />
            ) : (
              <Moon size={20} weight="bold" />
            )}
          </button>
        </li>
          <button className={styles.menuButton} onClick={toggleMenu}>
            <List size={32} />
          </button>
      </ul>
       <nav className={styles.navDesktop}>  
          <div>                 
            {isLoggedIn ? (
              <div className={styles.containerMenu}>
                <ul className={styles.menuUser}>
                  <li><Link to="/bloco-de-notas">Bloco de Notas</Link></li>
                  <li><Link to="/ajuda-nos-estudos">Professores</Link></li>
                  <li><Link to="/favoritos">Favoritos</Link></li>
                </ul>
                <div className={styles.containerButtonTheme}>
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
        </div>
      </nav>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
