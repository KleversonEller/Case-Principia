// src/components/ModalAluno.jsx
import { useEffect, useState } from "react";
import { AlunosService } from "../services/AlunosSevice";

export default function ModalAluno({ idOrAction, pageInicial }) {
  const [aluno, setAluno] = useState({});
  const [loading, setLoading] = useState(false);

  const acao = idOrAction === "criar" ? "criar" : idOrAction;

  async function getAluno() {
    setLoading(true);
    try {
      const response = await AlunosService.getAlunoById(acao);
      setAluno(response || {});
    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (acao === "criar") {
        await AlunosService.createAluno(aluno);
        pageInicial();
      } else {
        await AlunosService.updateAluno(acao, aluno);
        pageInicial();
      }
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      alert("Ocorreu um erro ao salvar o aluno. Tente novamente.");
    }
  }

  useEffect(() => {
    if (acao !== "criar") {
      getAluno();
    }
  }, [acao]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
      {acao === 'criar' ? (
        <>
          <h1 className="text-2xl font-semibold mb-4">Criar Aluno</h1>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Nome:</label>
                <input
                  type="text"
                  onChange={(e) => setAluno({ ...aluno, nome: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">E-mail:</label>
                <input
                  type="text"
                  onChange={(e) => setAluno({ ...aluno, email: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={pageInicial}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          )}
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4">Editar Aluno</h1>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Nome:</label>
                <input
                  type="text"
                  value={aluno.nome || ""}
                  onChange={(e) => setAluno({ ...aluno, nome: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">E-mail:</label>
                <input
                  type="text"
                  value={aluno.email || ""}
                  onChange={(e) => setAluno({ ...aluno, email: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={pageInicial}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
