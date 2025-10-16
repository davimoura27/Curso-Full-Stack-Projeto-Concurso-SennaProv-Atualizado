import React, { useState, useEffect, useRef } from 'react';
import './BlocoDeNotas.css';
import { useBlockNotes } from '../../hooks/UseBlockNotes';

export function BlocoDeNotas() {
  const[title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [notas, setNotas] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const{listNotes,addNotes} = useBlockNotes()

  const textareaRef = useRef(null);  

  const salvarNota = (event) => {
    event.preventDefault()
    console.log("Salvando nota...", { title, description });
      addNotes({title: title, text: description})
      setTitle('')
      setDescription('')
  };

  const editarNota = (index) => {
    setNota(notas[index]);
    setEditIndex(index);
    
    // Role até o campo de texto para edição
    textareaRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const excluirNota = (index) => {
    const novasNotas = notas.filter((_, i) => i !== index);
    setNotas(novasNotas);
    localStorage.setItem('notas', JSON.stringify(novasNotas));
  };

  return (
    <div className="bloco-de-notas">
      <h1>Bloco de Notas</h1>
      <div className='containerButtonCreate'>
        <form onSubmit={salvarNota}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Titulo'
          />
          <textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite sua nota aqui..."
          />
          <button type="submit" className="bloco-de-notas-button">
            {editIndex !== null ? 'Atualizar Nota' : 'Salvar Nota'}
          </button>
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
                  <p className='descricao'>{notes.text}</p>
                </div>
                <div>
                  <button className="editar" onClick={() => editarNota(index)}>Editar</button>
                  <button className="excluir" onClick={() => excluirNota(index)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}