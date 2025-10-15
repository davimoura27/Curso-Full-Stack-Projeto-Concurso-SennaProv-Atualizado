import { useFavorites } from '../../hooks/useFavorites';
import { RiDeleteBinLine } from 'react-icons/ri';
import './favorites.css'

export function Favorites() {
  const { contest, removeFavorites } = useFavorites();

  console.log('Favoritos:', contest);

  return (
    <div className="favoritos-container">
      <h1>Meus Concursos Favoritos</h1>
      {contest.length === 0 ? (
        <p>Você ainda não tem concursos registrados.</p>
      ) : (
        <div className="favoritos-grid">
          {contest.map((concurso) => (
            <div key={concurso.id} className="favorito-card">
              <div className="favorito-content">
                <a
                  href={concurso.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="favorito-link"
                >
                  <h3>{concurso.name}</h3>
                  <p>{concurso.banca}</p>
                  <p>{concurso.salario}</p>
                </a>
                <button
                  onClick={() => removeFavorites(concurso.id)}
                  className="remover-favorito"
                >
                  <RiDeleteBinLine className="delete-icon" />
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