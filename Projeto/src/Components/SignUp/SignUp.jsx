import React, { useState } from 'react';
import styles from './SignUp.module.css';
import PropTypes from "prop-types";
import { api } from '../../services/ApiLogin/apiLogin';

const SignUp = ({ isOpen, onClose, onToggle }) => {
    const [formData, setFormData] = useState({
        name: '',
        idade: '',
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/register', formData);
            alert('Usuário registrado com sucesso!');
            onClose();
        } catch (error) {
            alert('Erro ao registrar usuário');
            console.error(error);
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

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Nome completo:</label>
                        <input
                            type="text"
                            id="name"
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="idade">Idade:</label>
                        <input
                            type="number"
                            id="idade"
                            onChange={e => setFormData({...formData, idade: e.target.value})}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Nome de usuário:</label>
                        <input
                            type="text"
                            id="username"
                            onChange={e => setFormData({...formData, username: e.target.value})}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={e => setFormData({...formData, password: e.target.value})}
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
};

export default SignUp;