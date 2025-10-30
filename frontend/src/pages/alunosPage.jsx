import React, { use, useEffect } from 'react';
import { useAlunosStore } from '../store/useAlunosStore';
import { getAlunos } from '../services/alunosSevice';

export default function AlunosPage() {
  const { alunos, setAlunos } = useAlunosStore();

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const data = await getAlunos();
        setAlunos(data);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };
    fetchAlunos();
  }, [setAlunos]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Lista de Alunos</h1>
      {alunos.length === 0 ? (
        <p>Nenhum aluno encontrado.</p>
      ) : (
        <ul>
        {alunos.alunos.map((aluno) => (
          <li key={aluno.id}>{aluno.nome}</li>
        ))}
      </ul>
      )}
    </div>
  );
}
