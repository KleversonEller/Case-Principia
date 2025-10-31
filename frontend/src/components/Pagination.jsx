// src/components/Pagination.jsx
export default function Pagination({ pagina, totalPaginas, onPageChange, onLimitChange }) {
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
      <select
        value={undefined}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        className="ml-4 border rounded px-2 py-1"
      >
        {[5, 10, 15, 20, 25, 30, 35].map((limit) => (
          <option key={limit} value={limit}>
            {limit} por página
          </option>
        ))}
      </select>
    </div>
  );
}
