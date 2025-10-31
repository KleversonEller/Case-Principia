// src/pages/AlunosPage.jsx
import { useEffect, useState } from "react";
import { AlunosService } from "../services/AlunosSevice";

import Pagination from "../components/Pagination";
import ModalAluno from "../components/ModalAluno";

export default function AlunosPage() {
  const [alunos, setAlunos] = useState([]);
  const [search, setSearch] = useState("");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [modalAluno, setModalAluno] = useState(null); // quando != null, mostra modal no lugar da tabela

  async function carregarAlunos() {
    setLoading(true);
    try {
      const response = await AlunosService.getAlunos({
        search,
        page: pagina,
        limit: limit,
      });
      setAlunos(response.alunos || []);
      setTotalPaginas(response.totalPages || 1);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function excluirAluno(id, nome) {
    const confirmar = window.confirm(`Deseja realmente excluir o aluno "${nome}"?`);
    if (!confirmar) return;
    setLoading(true);
    try {
      await AlunosService.deleteAluno(id);
      carregarAlunos();
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    } finally {
      setLoading(false);
    }
  }

  function abrirModalCriar() {
    setModalAluno('criar');
  }

  function abrirModalEditar(idAluno) {
    setModalAluno(idAluno);
  }

  useEffect(() => {
    carregarAlunos();
  }, [search , pagina, modalAluno, limit]);

  return (
    <div>
      {modalAluno ? (
        <ModalAluno
          idOrAction={modalAluno}
          pageInicial={() => setModalAluno(null)}
        />
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4">Lista de Alunos</h1>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Buscar aluno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-1 rounded"
            />
            <button
              onClick={abrirModalCriar}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              + Novo Aluno
            </button>
          </div>

          {loading ? (
            <p>Carregando...</p>
          ) : alunos.length === 0 ? (
            <p>Nenhum aluno encontrado.</p>
          ) : (
            <table className="w-full bg-white border rounded">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">ID</th>
                  <th className="p-2">Nome</th>
                  <th className="p-2">E-mail</th>
                  <th className="p-2 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => (
                  <tr key={aluno.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{aluno.id}</td>
                    <td className="p-2">{aluno.nome}</td>
                    <td className="p-2">{aluno.email}</td>
                    <td className="p-2 flex justify-center gap-2">
                      <button
                        className="bg-yellow-400 px-2 py-1 rounded text-sm"
                        onClick={() => abrirModalEditar(aluno.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                        onClick={() => excluirAluno(aluno.id, aluno.nome)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <Pagination
            pagina={pagina}
            totalPaginas={totalPaginas}
            onPageChange={setPagina}
            onLimitChange={setLimit}
          />
        </>
      )}
    </div>
  );
}
