import { useState, useEffect } from "react";
import axios from "axios";

export function useConcursos(uf){
  const [concursos, setConcursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

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

