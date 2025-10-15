import { useState, useEffect } from 'react';
import { favorites, getStoredUser } from '../services/ApiLogin/apiLogin';

export function useFavorites() {
  const[contest, setContest] = useState([])
  const[favoritesLink, setFavoritesLink] = useState([])
  const[user, setUser] = useState("")

  useEffect(() => {
    const storedUser = getStoredUser();
    if(storedUser){
      setUser(storedUser)
    }
  },[])

  useEffect(() => { 
    if(!user) return;

    const listFavoritos = async () =>{
      try {
          const response = await favorites.getFavorites();
          setContest(response.data.favorites)
          setFavoritesLink(response.data.favorites.map((c) => c.link))
        } catch (error){
          console.log("Lista não carregada", error.response)        
        }
      } 
    listFavoritos()

  },[user]);

  const addFavorites = async (newFavorites) => {
    try{
      const response = await favorites.createFavorites(newFavorites);
      const updateFavorites = response.data.favorites
      setContest(updateFavorites)
      const link = updateFavorites.map((fav) => fav.link)
      setFavoritesLink(link)
      console.log(updateFavorites)
    }catch(error){
      console.log("Erro:", error)
    }
  };

  const removeFavorites = async (id) => {
   try {
    const response = await favorites.deleteFavorites(id)
    const updatedFavorites = response.data.favorites;
    setContest(updatedFavorites)
    const link = updatedFavorites.map((fav) => fav.link)
    setFavoritesLink(link)
    console.log("Concurso deletado, nova lista:", updatedFavorites)
   } catch (error) {
    console.log("Erro ao deletar dos favoritos:", error.response)
   }
  };

  const isFavorites = (link) => favoritesLink.includes(link);
  
  return {contest,
          setContest,
          favoritesLink,
          setFavoritesLink,
          addFavorites,
          removeFavorites,
          isFavorites
  }
}