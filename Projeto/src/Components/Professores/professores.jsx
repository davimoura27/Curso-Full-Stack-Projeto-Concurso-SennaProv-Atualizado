import React from 'react';
import { FaYoutube } from 'react-icons/fa';
import styles from "./professores.module.css";

export function Professor() {
    const professores = [
        {
            nome: 'Professor Robson Liers',
            canal: 'https://www.youtube.com/@prof.robsonliers',
            descricao: 'Focado em Matemática para concursos públicos.'
        },
        {
            nome: 'Professora Boaro',
            canal: 'https://www.youtube.com/@professorboaro',
            descricao: 'Focado em Matemática e Física para concursos.'
        },
        {
            nome: 'Professor Noslean',
            canal: 'https://www.youtube.com/@ProfessorNoslen',
            descricao: 'Focado em Português e Interpretação de Texto para concursos.'
        },
        {
            nome: 'Professor Felippe Loureiro',
            canal: 'https://www.youtube.com/@FelippeLoureiroProf',
            descricao: 'Focado em Raciocínio Lógico para concursos.'
        },
        {
            nome: 'LAC concursos',
            canal: 'https://www.youtube.com/@LacConcursosCanal',
            descricao: 'Focado em Direito Constitucional, Direito Administrativo, Raciocínio Lógico.'
        },
        {
            nome: 'Professor Ricardo Dantas',
            canal: 'https://www.youtube.com/c/ProfessorRicardoMarc%C3%ADlio/featured',
            descricao: 'Focado em Direito Administrativo, Direito Constitucional, Direito Tributário e Direito Penal.'
        },
        {
            nome: 'Professor Sandro Curió',
            canal: 'https://www.youtube.com/@sandrocuriodicasdemat',
            descricao: 'Focado em  Raciocínio Lógico, Matemática para Concursos, Estratégias de Estudo.'
        },
        {
            nome: 'Professora Gis com Giz',
            canal: 'https://www.youtube.com/@Giscomgiz',
            descricao: 'Focado em Matemática, Raciocínio Lógico, Dicas para Concursos.'
        },
    ];

    return (
        <div className={styles.Box}>
            <header className={styles.BoxHeader}>
                <h1>Melhores Professores para Concursos</h1>
                <p>Confira alguns dos melhores professores para se preparar para concursos!</p>
                <div className={styles.professoreslist}>
                    {professores.map((professor) => (
                        <div key={professor.nome} className={styles.professor}>
                            <h3>{professor.nome}</h3>
                            <p>{professor.descricao}</p>
                            <a
                                href={professor.canal}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.youtubelink}
                            >
                                <FaYoutube /> Acessar Canal no YouTube
                            </a>
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
}