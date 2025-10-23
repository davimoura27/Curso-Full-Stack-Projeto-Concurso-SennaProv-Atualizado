
import { FaYoutube } from 'react-icons/fa';
import styles from "./teacher.module.css";

export function Teacher() {
    const teachers = [
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
        <div className={styles.box}>
            <div className={styles.boxHeader}>
                <h1>Melhores Professores para Concursos</h1>
                <h4>Confira alguns dos melhores professores para se preparar para concursos!</h4>
            </div>
                <div className={styles.teacherList}>
                    {teachers.map((teacher) => (
                        <div key={teacher.nome} className={styles.teacher}>
                            <h3>{teacher.nome}</h3>
                            <p>{teacher.descricao}</p>
                            <a
                                href={teacher.canal}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.youtubelink}
                            >
                                <FaYoutube /> Acessar Canal no YouTube
                            </a>
                        </div>
                    ))}
                </div>            
        </div>
    );
}