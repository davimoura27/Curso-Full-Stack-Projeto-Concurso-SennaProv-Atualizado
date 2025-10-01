import styles from "./home.module.css";
import studying from "../../assets/img/8602650.png";
import ConcursoList from "../../Components/ConcursoList/ConcursoList";
import { useState } from "react";

export function Home() {
  const [uf, setUf] = useState("rj");

  return (
    <>
      <div className={styles.divider} />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Concursos Em todo o Brasil</h1>
          <p className={styles.description}>
            A gama de concursos que disponibilizamos para você é a mais completa
            do mercado.
          </p>
          <button className={styles.buttonCreate}>
            Garanta seu lugar no mercado
          </button>
        </div>
        <div className={styles.cardContainer}>
          <img src={studying} alt="Estudante se preparando para concurso" />
        </div>
      </div>
      <div>
        <ConcursoList uf={uf} setUf={setUf} />
      </div>
    </>
  );
}
