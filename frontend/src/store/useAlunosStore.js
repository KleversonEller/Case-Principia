import { create } from 'zustand';

export const useAlunosStore = create((set) => ({
  alunos: [],
  setAlunos: (alunos) => set({ alunos }),
  addAluno: (aluno) => set((state) => ({ alunos: [...state.alunos, aluno] })),
}));
