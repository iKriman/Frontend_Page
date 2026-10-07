import VideojuegoCard from './VideojuegoCard';

function VideojuegoList({ videojuegos, onEliminar }) {
  if (videojuegos.length === 0) {
    return (
      <div className="empty-state text-center py-5 border rounded-3 bg-white">
        <i className="bi bi-search fs-1 text-secondary" />
        <h3 className="h5 mt-3">No encontramos videojuegos</h3>
        <p className="text-secondary mb-0">Prueba con otra categoría o término de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
      {videojuegos.map((videojuego) => (
        <div className="col" key={videojuego.id}>
          <VideojuegoCard videojuego={videojuego} onEliminar={onEliminar} />
        </div>
      ))}
    </div>
  );
}

export default VideojuegoList;
