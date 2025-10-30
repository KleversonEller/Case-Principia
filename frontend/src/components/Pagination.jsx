// src/components/Pagination.jsx
export default function Pagination({ pagina, totalPaginas, onPageChange }) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="flex justify-center mt-4 gap-2">
      <button
        disabled={pagina === 1}
        onClick={() => onPageChange(pagina - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="px-2">
        {pagina} / {totalPaginas}
      </span>
      <button
        disabled={pagina === totalPaginas}
        onClick={() => onPageChange(pagina + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );
}
