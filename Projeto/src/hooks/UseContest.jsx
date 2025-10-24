import { useState, useEffect } from "react";
import axios from "axios";

export function useContest(uf){
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
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
        
        const contestsId = response.data.map((contest, index) => ({
          ...contest,
          id: contest.id || `concurso-${index}`
        }));
        
        setContests(contestsId);
      } catch (error) {
        console.error("Erro ao buscar concursos:", error);
        setContests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, [uf]);

  return { contests, loading };
};

