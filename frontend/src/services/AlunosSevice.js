import api from './api';

const getAlunos = async (filters = {}) => {
  const response = await api.get('/alunos', { params: filters });
  return response.data;
};

const createAluno = async (aluno) => {
  const response = await api.post('/alunos', aluno);
  return response.data;
};

const updateAluno = async (id, aluno) => {
  const response = await api.put(`/alunos/${id}`, aluno);
  return response.data;
};

const deleteAluno = async (id) => {
  const response = await api.delete(`/alunos/${id}`);
  return response.data;
};

const getAlunoById = async (id) => {
  const response = await api.get(`/alunos/${id}`);
  return response.data;
};

const searchAlunos = async (query) => {
  const response = await api.get(`/alunos/search`, {
    params: { q: query },
  });
  return response.data;
};

export const AlunosService = {
  getAlunos,
  createAluno,
  updateAluno,
  deleteAluno,
  getAlunoById,
  searchAlunos,
};
