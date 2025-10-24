import { useEffect, useState } from "react";
import { blockNotes, getStoredUser } from "../services/ApiLogin/apiLogin";

export function useNotepad (){
const[listNotes, setListNotes] = useState([]);
const[user, setUser] = useState("");

    useEffect(() => {
        const storedUser = getStoredUser();
        if(storedUser){
            setUser(storedUser)
        }
    },[])
    useEffect(() => {
        if(!user) return

        const listNotes = async () =>{
            try {
                const response = await blockNotes.getBlockNotes();                
                setListNotes(response.data)

            } catch (error) {
                console.log("Erro na lista de notas", error.response)
            }
        }
        listNotes()         
    },[user])
    const addNotes = async (newNotes) =>{
        try {
            const response = await blockNotes.postBlockNotes(newNotes);
            setListNotes([...listNotes, response.data]);
        } catch (error) {
            console.log("Erro ao registrar nova nota:", error.response)
        }
    }
    const editNotes = async (id, note) =>{
        console.log("id notes", id)
        try {
            if(id){
                const response = await blockNotes.putBlockNotes(id, note)
                setListNotes(listNotes.map(prev => prev.id === response.data.id ? response.data : prev))
            }else{
                return
            }
        } catch (error) {
            console.log("Erro ao editar nota,", error.response)
        }
    }
    const removeNotes = async(id) => {
        try {
            const response = await blockNotes.deleteBlockNotes(id);
            console.log("ola", response.data)
            setListNotes(response.data)
        } catch (error) {
            console.log("Erro ao deletar nota,", error.response)
        }
    }    
    return {listNotes,
            addNotes,
            removeNotes,
            editNotes
    }
}