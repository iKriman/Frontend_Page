import { useState } from 'react';

const estadoInicial = {
  nombre: '',
  categoria: '',
  precio: '',
  descripcion: '',
  imagen: '',
};

function CatalogoForm({ onAgregar }) {
  const [formulario, setFormulario] = useState(estadoInicial);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const actualizarCampo = (event) => {
    const { name, value } = event.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
    setErrores((actual) => ({ ...actual, [name]: '' }));
    setMensaje('');
  };

  const validar = () => {
    const nuevosErrores = {};

    if (formulario.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'Ingresa un nombre válido.';
    }

    if (formulario.categoria.trim().length < 2) {
      nuevosErrores.categoria = 'Ingresa una categoría.';
    }

    if (!formulario.precio || Number(formulario.precio) <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor que cero.';
    }

    if (formulario.descripcion.trim().length < 10) {
      nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres.';
    }

    return nuevosErrores;
  };

  const manejarEnvio = (event) => {
    event.preventDefault();
    const nuevosErrores = validar();

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    onAgregar({
      ...formulario,
      precio: Number(formulario.precio),
      imagen: formulario.imagen.trim() || 'images/cover-default.svg',
      categoria: formulario.categoria.trim(),
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
    });

    setFormulario(estadoInicial);
    setErrores({});
    setMensaje('Videojuego agregado correctamente al catálogo.');
  };

  return (
    <form className="card border-0 shadow-sm management-form" onSubmit={manejarEnvio} noValidate>
      <div className="card-body p-4 p-md-5">
        <h3 className="h4 mb-4">Agregar videojuego</h3>

        {mensaje && (
          <div className="alert alert-success" role="status">
            {mensaje}
          </div>
        )}

        <div className="row g-3">
          <div className="col-md-7">
            <label className="form-label" htmlFor="game-name">Nombre</label>
            <input
              id="game-name"
              name="nombre"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              value={formulario.nombre}
              onChange={actualizarCampo}
              placeholder="Ej: Neon Horizon"
            />
            <div className="invalid-feedback">{errores.nombre}</div>
          </div>

          <div className="col-md-5">
            <label className="form-label" htmlFor="game-category">Categoría</label>
            <input
              id="game-category"
              name="categoria"
              className={`form-control ${errores.categoria ? 'is-invalid' : ''}`}
              value={formulario.categoria}
              onChange={actualizarCampo}
              placeholder="Ej: Aventura"
            />
            <div className="invalid-feedback">{errores.categoria}</div>
          </div>

          <div className="col-md-5">
            <label className="form-label" htmlFor="game-price">Precio CLP</label>
            <input
              id="game-price"
              name="precio"
              type="number"
              min="1"
              className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
              value={formulario.precio}
              onChange={actualizarCampo}
              placeholder="39990"
            />
            <div className="invalid-feedback">{errores.precio}</div>
          </div>

          <div className="col-md-7">
            <label className="form-label" htmlFor="game-image">Imagen (URL opcional)</label>
            <input
              id="game-image"
              name="imagen"
              type="url"
              className="form-control"
              value={formulario.imagen}
              onChange={actualizarCampo}
              placeholder="https://..."
            />
          </div>

          <div className="col-12">
            <label className="form-label" htmlFor="game-description">Descripción</label>
            <textarea
              id="game-description"
              name="descripcion"
              rows="3"
              className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
              value={formulario.descripcion}
              onChange={actualizarCampo}
              placeholder="Describe brevemente el videojuego."
            />
            <div className="invalid-feedback">{errores.descripcion}</div>
          </div>
        </div>

        <button className="btn btn-dark mt-4" type="submit">
          <i className="bi bi-plus-circle me-2" />
          Agregar al catálogo
        </button>
      </div>
    </form>
  );
}

export default CatalogoForm;
