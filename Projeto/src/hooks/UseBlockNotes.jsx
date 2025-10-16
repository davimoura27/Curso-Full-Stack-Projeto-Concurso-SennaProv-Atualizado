import { useEffect, useState } from "react";
import { blockNotes, getStoredUser } from "../services/ApiLogin/apiLogin";

export function useBlockNotes (){
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
    console.log(listNotes)
    return {listNotes,
            addNotes
    }

}