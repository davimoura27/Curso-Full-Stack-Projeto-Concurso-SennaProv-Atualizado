import { useFavoritos } from '../../hooks/useFavoritos';
import { RiDeleteBinLine } from 'react-icons/ri';
import './favoritos.css'

export function Favoritos() {
  const { favoritos, removerFavorito } = useFavoritos();

  console.log('Favoritos:', favoritos);

  return (
    <div className="favoritos-container">
      <h1>Meus Concursos Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>Você ainda não tem concursos favoritos.</p>
      ) : (
        <div className="favoritos-grid">
          {favoritos.map((concurso) => (
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
                  onClick={() => removerFavorito(concurso.id)}
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