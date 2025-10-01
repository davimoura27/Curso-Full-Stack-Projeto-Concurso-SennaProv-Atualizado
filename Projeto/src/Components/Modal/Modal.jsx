import styles from "./Modal.module.css";
import { useState } from "react";
import PropTypes from "prop-types";
import SignUp from "../SignUp/SignUp";
import { loginUser } from "../../services/ApiLogin/apiLogin";

/**
 * Componente Modal responsável pela interface de login do usuário
 * @param {boolean} isOpen - Controla se o modal está visível
 * @param {function} onClose - Função para fechar o modal
 * @param {function} onLoginSuccess - Callback executado após login bem-sucedido
 */
export function Modal({ isOpen, onClose, onLoginSuccess }) {
  // Estados para controlar os campos do formulário e estado do modal
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Manipula o envio do formulário de login
   * @param {Event} e - Evento do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Tenta realizar o login do usuário usando o serviço de API
      const data = await loginUser(username, password);
      console.log('[Modal] Dados do login:', data);
      
      // Limpa os campos após login bem-sucedido
      setUsername("");
      setPassword("");
      
      // Notifica o componente pai sobre o sucesso do login
      onLoginSuccess({
        ...data,
        username: data.username || username
      });
    } catch (error) {
      console.error("[Modal]:", error.message);
      // Exibe mensagem de erro apropriada para o usuário
      setError(
        error.response?.data?.message || 
        error.message || 
        'Erro ao fazer login. Verifique suas credenciais.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Alterna entre os modais de login e cadastro
   * Limpa os campos e mensagens de erro ao alternar
   */
  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
    setUsername("");
    setPassword("");
    setError("");
  };

  // Não renderiza nada se o modal estiver fechado
  if (!isOpen) return null;

  // Renderiza o componente de cadastro se showSignUp for true
  if (showSignUp) {
    return <SignUp isOpen={isOpen} onClose={onClose} onToggle={toggleSignUp} />;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h1 className={styles.title}>Entre na sua conta</h1>
        <p className={styles.subtitle}>
          Seja bem-vindo! É muito bom ter você aqui :) Pronto para começar sua
          preparação?
        </p>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Nome de usuário:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div className={styles.divider}></div>
        <p className={styles.createAccount}>
          Não tem uma conta?{" "}
          <a className={styles.createAccountLink} href="#" onClick={toggleSignUp}>
            Crie uma conta
          </a>
        </p>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};