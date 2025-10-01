import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Hook personalizado para gerenciar a busca e estado dos concursos
 * @param {string} uf - Sigla do estado para filtrar os concursos
 * @returns {Object} Retorna um objeto contendo a lista de concursos e o estado de carregamento
 */
const useConcursos = (uf) => {
  const [concursos, setConcursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Função assíncrona para buscar os concursos da API
     * Adiciona IDs únicos aos concursos caso não existam
     * Gerencia estados de carregamento e tratamento de erros
     */
    const fetchConcursos = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        };
        
        const response = await axios.get(
          `http://localhost:8080/api/concursos${uf ? `?uf=${uf}` : ''}`,
          config
        );
        
        const concursosComId = response.data.map((concurso, index) => ({
          ...concurso,
          id: concurso.id || `concurso-${index}`
        }));
        
        setConcursos(concursosComId);
      } catch (error) {
        console.error("Erro ao buscar concursos:", error);
        setConcursos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConcursos();
  }, [uf]);

  return { concursos, loading };
};

export default useConcursos;
