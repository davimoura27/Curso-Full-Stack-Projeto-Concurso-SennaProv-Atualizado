import { useFavorites } from '../../hooks/useFavorites';
import { RiDeleteBinLine } from 'react-icons/ri';
import styles from './favorites.module.css'

export function Favorites() {
  const { contest, removeFavorites } = useFavorites();

  return (
    <div className={styles.container}>
    <h1>Meus Concursos Favoritos</h1>
      {contest.length === 0 ? (
        <p>Você ainda não tem concursos registrados.</p>
      ) : (
          <div className={styles.favoritesGrid}>
          {contest.map((concurso) => (
            <div key={concurso.id} className={styles.card}>
              <div className={styles.favoritesBody}>
                <a
                  href={concurso.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <h3>{concurso.name}</h3>
                </a>
                <button
                  onClick={() => removeFavorites(concurso.id)}
                  className={styles.removeButton}
                >
                  <RiDeleteBinLine className={styles.deleteIcon}/>
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}