function Filtros({
  categorias,
  categoriaSeleccionada,
  onCategoriaChange,
  busqueda,
  onBusquedaChange,
}) {
  return (
    <div className="filter-panel mt-4 mb-4">
      <div className="row g-3 align-items-end">
        <div className="col-lg-7">
          <span className="filter-label">Filtrar por categoría</span>
          <div className="d-flex flex-wrap gap-2 mt-2" role="group" aria-label="Categorías de videojuegos">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                type="button"
                className={`btn btn-sm ${
                  categoriaSeleccionada === categoria ? 'btn-dark' : 'btn-outline-secondary'
                }`}
                onClick={() => onCategoriaChange(categoria)}
              >
                {categoria}
              </button>
            ))}
          </div>
        </div>

        <div className="col-lg-5">
          <label className="filter-label" htmlFor="busqueda-videojuegos">
            Buscar videojuego
          </label>
          <div className="input-group mt-2">
            <span className="input-group-text bg-white">
              <i className="bi bi-search" />
            </span>
            <input
              id="busqueda-videojuegos"
              type="search"
              className="form-control"
              placeholder="Nombre, categoría o descripción"
              value={busqueda}
              onChange={(event) => onBusquedaChange(event.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filtros;
