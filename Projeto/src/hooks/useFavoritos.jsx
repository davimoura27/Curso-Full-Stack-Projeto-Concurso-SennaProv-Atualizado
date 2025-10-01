import { useState, useEffect } from 'react';

export function useFavoritos() {
  // Estado para armazenar a lista de concursos favoritos
  const [favoritos, setFavoritos] = useState([]);

  // Efeito que carrega os favoritos do localStorage quando o componente é montado
  // Se houver dados salvos, tenta fazer o parse do JSON e atualiza o estado
  // Em caso de erro, limpa o localStorage
  useEffect(() => {
    const favoritosStorage = localStorage.getItem('concursos-favoritos');
    if (favoritosStorage) {
      try {
        const favoritosParsed = JSON.parse(favoritosStorage);
        console.log('Favoritos carregados:', favoritosParsed);
        setFavoritos(favoritosParsed);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        localStorage.removeItem('concursos-favoritos');
      }
    }
  }, []);

  // Função para adicionar um novo concurso aos favoritos
  // Verifica se o concurso já existe para evitar duplicatas
  // Atualiza o estado e salva no localStorage
  const adicionarFavorito = (concurso) => {
    console.log('Adicionando favorito:', concurso);
    setFavoritos(prevFavoritos => {
      if (prevFavoritos.some(fav => fav.id === concurso.id)) {
        return prevFavoritos;
      }
      const novosFavoritos = [...prevFavoritos, concurso];
      localStorage.setItem('concursos-favoritos', JSON.stringify(novosFavoritos));
      return novosFavoritos;
    });
  };

  // Função para remover um concurso dos favoritos pelo seu ID
  // Filtra o concurso específico e atualiza tanto o estado quanto o localStorage
  const removerFavorito = (id) => {
    console.log('Removendo favorito:', id);
    setFavoritos(prevFavoritos => {
      const novosFavoritos = prevFavoritos.filter(fav => fav.id !== id);
      localStorage.setItem('concursos-favoritos', JSON.stringify(novosFavoritos));
      return novosFavoritos;
    });
  };

  // Função auxiliar que verifica se um concurso específico já está nos favoritos
  // Retorna true se encontrar o concurso com o ID fornecido, false caso contrário
  const isFavorito = (id) => {
    return favoritos.some(fav => fav.id === id);
  };

  // Retorna um objeto com o estado dos favoritos e as funções para manipulá-los
  return {
    favoritos,
    adicionarFavorito,
    removerFavorito,
    isFavorito
  };
}