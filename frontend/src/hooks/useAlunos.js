import { useEffect } from 'react';
import { useAlunosStore } from '../store/useAlunosStore';
import { getAlunos } from '../services/alunosService';

export const useAlunos = () => {
  const { alunos, setAlunos } = useAlunosStore();

  useEffect(() => {
    const fetchAlunos = async () => {
      const data = await getAlunos();
      setAlunos(data);
    };
    fetchAlunos();
  }, [setAlunos]);

  return { alunos };
};
