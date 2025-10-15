import {useConcursos} from "../../hooks/UseConcurso";
import { useFavorites }  from "../../hooks/useFavorites";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import styles from "./ConcursoList.module.css";
import { useEffect, useState } from "react";
import { getStoredUser } from "../../services/ApiLogin/apiLogin";


const ConcursoList = ({uf, setUf}) => {

  const [user, setUser] = useState(null)
  const { concursos, loading } = useConcursos(uf);
  const { addFavorites, removeFavorites, isFavorites, contest } = useFavorites();

  useEffect(() => {
    const userExistent = getStoredUser();
    if(userExistent){
      setUser(userExistent)
    }
  },[])

  const handleFavorito = (concurso) => {
    const newContest = contest.find(c => c.link === concurso.link)
    console.log("newContest",newContest)
    if (newContest) {
      removeFavorites(newContest.id);
    } else {
      addFavorites({name: concurso.name, link: concurso.link});
    }
  };

  const isFavoritesConcurso = isFavorites(concursos.link)
  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Concursos</h1>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonUf} onClick={() => setUf("ac")}><div className={styles.topBar}></div>AC</button>
        <button className={styles.buttonUf} onClick={() => setUf("al")}>AL</button>
        <button className={styles.buttonUf} onClick={() => setUf("am")}>AM</button>
        <button className={styles.buttonUf} onClick={() => setUf("ap")}>AP</button>
        <button className={styles.buttonUf} onClick={() => setUf("ba")}>BA</button>
        <button className={styles.buttonUf} onClick={() => setUf("ce")}>CE</button>
        <button className={styles.buttonUf} onClick={() => setUf("df")}>DF</button>
        <button className={styles.buttonUf} onClick={() => setUf("es")}>ES</button>
        <button className={styles.buttonUf} onClick={() => setUf("go")}>GO</button>
        <button className={styles.buttonUf} onClick={() => setUf("ma")}>MA</button>
        <button className={styles.buttonUf} onClick={() => setUf("mg")}>MG</button>
        <button className={styles.buttonUf} onClick={() => setUf("ms")}>MS</button>
        <button className={styles.buttonUf} onClick={() => setUf("mt")}>MT</button>
        <button className={styles.buttonUf} onClick={() => setUf("pa")}>PA</button>
        <button className={styles.buttonUf} onClick={() => setUf("pb")}>PB</button>
        <button className={styles.buttonUf} onClick={() => setUf("pe")}>PE</button>
        <button className={styles.buttonUf} onClick={() => setUf("pi")}>PI</button>
        <button className={styles.buttonUf} onClick={() => setUf("pr")}>PR</button>
        <button className={styles.buttonUf} onClick={() => setUf("rj")}>RJ</button>
        <button className={styles.buttonUf} onClick={() => setUf("rn")}>RN</button>
        <button className={styles.buttonUf} onClick={() => setUf("ro")}>RO</button>
        <button className={styles.buttonUf} onClick={() => setUf("rr")}>RR</button>
        <button className={styles.buttonUf} onClick={() => setUf("rs")}>RS</button>
        <button className={styles.buttonUf} onClick={() => setUf("sc")}>SC</button>
        <button className={styles.buttonUf} onClick={() => setUf("se")}>SE</button>
        <button className={styles.buttonUf} onClick={() => setUf("sp")}>SP</button>
        <button className={styles.buttonUf} onClick={() => setUf("to")}>TO</button>
      </div>
      
      <div className={styles.concursoGrid}>
        {concursos.map((concurso, index) => (
          <div key={index} className={styles.concursoCard}>
            <div className={styles.cardContent}>
              <a
                href={concurso.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.concursoLink}
              >
                <h3 className={styles.concursoName}>{concurso.name}</h3>
              </a>
              {user &&
              <button
                onClick={() => handleFavorito(concurso)}
                className={`${styles.favoritoBtn} ${isFavorites(concurso.link) ? styles.favorito : "" }`}
                aria-label={isFavorites(concurso.link) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                  {isFavorites(concurso.link) ? (
                  <AiFillHeart className={styles.heartIcon} />
                 ) : ( 
                  <AiOutlineHeart className={styles.heartIconVazio} /> 
                )}
              </button> }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConcursoList;