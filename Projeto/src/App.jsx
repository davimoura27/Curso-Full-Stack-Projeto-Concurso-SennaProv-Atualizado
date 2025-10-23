import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./Components/Header/header";
import { Home } from "./pages/home/Home";
import { Favorites } from "./pages/favorites/Favorites";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Notepad } from './pages/Notepad/Notepad';
import { Teacher } from './pages/Teacher/Teacher';
import { useEffect } from "react";


function App() {
  const navigate = useNavigate()
  useEffect(()=>{
    const handleTokenExpired = () => {
      alert("Sua sessão expirou. Faça login novamente");
      navigate("/")
    }
    window.addEventListener("tokenExpired", handleTokenExpired)
    return () => window.removeEventListener("tokenExpired", handleTokenExpired)
  },[])
  return (    
      <ThemeProvider>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/bloco-de-notas' element={<Notepad/>} />
            <Route path='/ajuda-nos-estudos' element={<Teacher/>} />
            <Route path="/favoritos" element={<Favorites />} 
            />
          </Routes>
      </ThemeProvider>   
  );
}
export default function Root(){
  return(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  )
}
