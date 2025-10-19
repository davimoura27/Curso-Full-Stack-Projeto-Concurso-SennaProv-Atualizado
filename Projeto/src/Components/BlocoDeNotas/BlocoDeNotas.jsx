import React, { useState, useEffect, useRef } from 'react';
import './BlocoDeNotas.css';
import { useBlockNotes } from '../../hooks/UseBlockNotes';

export function BlocoDeNotas() {
  const[title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [editingNotes, setEditingNotes] = useState(null);
  const{listNotes,addNotes, removeNotes, editNotes} = useBlockNotes()
  

  const saveOrUpdateNota = () => {
    if(!title || !description){
      console.log("Preencha os campso")
      return
    }
    try {
      if(editingNotes){                     
        editNotes(editingNotes.id, {title: title,text: description});
      }else{
        addNotes({title: title, text: description})
      }
      setTitle('');
      setDescription('');
      setEditingNotes(null)      
    } catch (error) {
        console.log("Erro ao atualizar ou criar nota", error.response)
    }
  };
  const handleEditNotes = (notesUpdate) => {
      setEditingNotes(notesUpdate)
      setTitle(notesUpdate.title)
      setDescription(notesUpdate.text) 
  }
  const cancelEditNotes = () => {
      setEditingNotes(null)
      setTitle('')
      setDescription('') 
  }

  const excluirNota = (id) => {
    removeNotes(id)
  };

  return (
    <div className="bloco-de-notas">
      <h1>Bloco de Notas</h1>
      <div className='containerButtonCreate'>
        <form onSubmit={saveOrUpdateNota}>
          <input
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Titulo'
          />
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite sua nota aqui..."
          />
          <div className='containerBlocoDeNotasButton'>
              <button type="submit" className="bloco-de-notas-button">
                {editingNotes ? 'Atualizar Nota' : 'Salvar Nota'}
              </button>
            { editingNotes && 
              <button className="bloco-de-notas-button-cancelar" onClick={() => cancelEditNotes}>
               Cancelar edição
              </button>
            }
          </div>
        </form>
      </div>
      <div>
        {listNotes.length === 0 ? (
          <p className="NotasSalvas">Não há notas salvas.</p>          
        ) : (
          <div>
            {listNotes.map((notes) => (
              <div key={notes.id} className="nota-card">
                <div className='informacao'>
                  <p><strong>Titulo: </strong>{notes.title}</p>
                  <p><strong>Data de criação: </strong>{notes.createdAt}</p>
                  <div>
                    {notes.updatedAt &&
                    (<p><strong>Data de atualização: </strong>{notes.updatedAt}</p>
                  )}</div>
                </div>
                  <p className='descricao'>{notes.text}</p>
                <div>
                  <button className="editar" onClick={() => handleEditNotes(notes)}>Editar</button>
                  <button className="excluir" onClick={() => excluirNota(notes.id)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}