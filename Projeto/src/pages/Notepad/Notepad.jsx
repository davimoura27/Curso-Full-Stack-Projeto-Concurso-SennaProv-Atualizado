import { useState } from 'react';
import styles from "./notepad.module.css"
import { useNotepad } from '../../hooks/UseNotepad';

export function Notepad() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [editingNotes, setEditingNotes] = useState(null);
  const {listNotes,addNotes, removeNotes, editNotes} = useNotepad()
  

  const saveOrUpdateNota = () => {
    if(!title || !description){
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
    <div className={styles.container}>
      <div className={styles.notepad}>
        <h1>Bloco de Notas</h1>
        <div className={styles.containerButtonCreate}>
          <form onSubmit={saveOrUpdateNota}>
            <input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Titulo'
              required
            />
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite sua nota aqui..."
              required
            />
            <div className={styles.containerBlocoDeNotasButton}>
                <button type="submit" className={styles.notepadButton}>
                  {editingNotes ? 'Atualizar Nota' : 'Salvar Nota'}
                </button>
              {editingNotes && 
                <button className={styles.notepadButtonCancel} onClick={() => cancelEditNotes}>
                  Cancelar edição
                </button>
              }
            </div>
          </form>
        </div>
        <div>
          {listNotes.length === 0 ? (
            <p className={styles.notepadSave}>Não há notas salvas.</p>          
          ) : (
            <div>
              {listNotes.map((notes) => (
                <div key={notes.id} className={styles.notepadCard}>
                  <div className={styles.information}>
                    <p><strong>Titulo: </strong>{notes.title}</p>
                    <p><strong>Data de criação: </strong>{notes.createdAt}</p>
                    <div>
                      {notes.updatedAt &&
                      (<p><strong>Data de atualização: </strong>{notes.updatedAt}</p>
                    )}</div>
                  </div>
                    <p className={styles.description}>{notes.text}</p>
                  <div className={styles.containerButton}>
                    <button className={styles.editar} onClick={() => handleEditNotes(notes)}>Editar</button>
                    <button className={styles.excluir} onClick={() => excluirNota(notes.id)}>Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}