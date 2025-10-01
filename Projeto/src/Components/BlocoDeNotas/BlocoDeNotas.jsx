import React, { useState, useEffect, useRef } from 'react';
import './BlocoDeNotas.css';

export function BlocoDeNotas() {
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const textareaRef = useRef(null);  

  useEffect(() => {
    const notasSalvas = JSON.parse(localStorage.getItem('notas'));
    if (notasSalvas) {
      setNotas(notasSalvas);
    }
  }, []);

  const handleNotaChange = (e) => {
    setNota(e.target.value);
  };

  const salvarNota = () => {
    if (nota.trim() === '') return;

    let novasNotas;
    if (editIndex !== null) {
      novasNotas = [...notas];
      novasNotas[editIndex] = nota;
      setEditIndex(null);
    } else {
      novasNotas = [...notas, nota];
    }

    setNotas(novasNotas);
    setNota('');
    localStorage.setItem('notas', JSON.stringify(novasNotas));
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
      <textarea
        ref={textareaRef}  
        value={nota}
        onChange={handleNotaChange}
        placeholder="Digite sua nota aqui..."
      />
      <button onClick={salvarNota} className="bloco-de-notas-button">
        {editIndex !== null ? 'Atualizar Nota' : 'Salvar Nota'}
      </button>
      <div>
        {notas.length > 0 ? (
          notas.map((nota, index) => (
            <div key={index} className="nota-card">
              <span>{nota}</span>
              <div>
                <button className="editar" onClick={() => editarNota(index)}>Editar</button>
                <button className="excluir" onClick={() => excluirNota(index)}>Excluir</button>
              </div>
            </div>
          ))
        ) : (
          <p className="NotasSalvas">Não há notas salvas.</p>
        )}
      </div>
    </div>
  );
}