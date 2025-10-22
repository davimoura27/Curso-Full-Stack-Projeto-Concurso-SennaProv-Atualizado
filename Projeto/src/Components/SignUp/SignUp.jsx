import { useState } from 'react';
import styles from './SignUp.module.css';
import PropTypes from "prop-types";
import { registerUser } from '../../services/ApiLogin/apiLogin';

const SignUp = ({ isOpen, onClose, onToggle, onLoginSuccess }) => {
    const[name, setName] = useState("")
    const[telephone, setTelephone] = useState("")
    const[age, setAge] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("");
    const[ error, setError] = useState("")
    const[message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();        
            if(password === confirmPassword){
                const response = await registerUser(
                    name, 
                    telephone,
                    age,
                    email,
                    password
                )
                if(response.success){
                    setMessage("Usuario registrado! Faça login com suas credenciais.")
                }else{
                    setError(response.error)
                } 
            }else{
                setError("Confirmação de senha diferente da senha")
            }     
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                <h1 className={styles.title}>Crie sua conta</h1>
                <p className={styles.subtitle}>
                    Comece sua jornada de preparação conosco! Preencha os dados abaixo para criar sua conta.
                </p>
                {error ? <p className={styles.errorMessage}>{error}</p> : message && <p className={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Nome e sobrenome:</label>
                        <input
                            placeholder='Ex: Davi Moura'
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Telefone:</label>
                        <input
                            placeholder='DDD + numero'
                            type="tel"
                            id="telephone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="idade">Idade:</label>
                        <input                            
                            type="number"
                            id="idade"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Nome de usuário:</label>
                        <input
                            placeholder='Ex: davi123@gmail.com'
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                        />
                        <p>A senha deve conter pelo menos:
                            <br />
                            - 1 numero;
                            <br />
                            - 1 letra;
                            <br />
                            - 1 caracter;
                            <br />
                            - 8 digitos.
                        </p>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Confirmação de senha:</label>
                        <input
                            type="password"
                            id="ConfirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword( e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Criar conta
                    </button>
                </form>
                
                <div className={styles.divider}></div>
                <p className={styles.loginAccount}>
                    Já tem uma conta?{" "}
                    <a className={styles.loginAccountLink} href="#" onClick={onToggle}>
                        Faça login
                    </a>
                </p>
            </div>
        </div>
    );
};

SignUp.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onLoginSuccess:PropTypes.func.isRequired
};

export default SignUp;