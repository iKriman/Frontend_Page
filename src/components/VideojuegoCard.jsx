const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(precio);

const obtenerRutaImagen = (imagen) => {
  if (/^https?:\/\//i.test(imagen)) {
    return imagen;
  }

  return `${import.meta.env.BASE_URL}${imagen}`;
};

function VideojuegoCard({ videojuego, onEliminar }) {
  return (
    <article className="card game-card h-100 shadow-sm">
      <div className="game-cover-wrap">
        <img
          src={obtenerRutaImagen(videojuego.imagen)}
          className="card-img-top game-cover"
          alt={`Portada de ${videojuego.nombre}`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = `${import.meta.env.BASE_URL}images/cover-default.svg`;
          }}
        />
        <span className="badge text-bg-dark game-category">{videojuego.categoria}</span>
      </div>

      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{videojuego.nombre}</h3>
        <p className="card-text text-secondary">{videojuego.descripcion}</p>

        <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center gap-3">
          <strong className="game-price">{formatearPrecio(videojuego.precio)}</strong>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => onEliminar(videojuego.id)}
            aria-label={`Eliminar ${videojuego.nombre} del catálogo`}
          >
            <i className="bi bi-trash3 me-1" />
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

export default VideojuegoCard;
