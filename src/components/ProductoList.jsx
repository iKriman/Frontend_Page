const formatearMoneda = (valor) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(valor);
};

function ProductoList({ productos, agregarAlCarrito, carrito }) {
  if (productos.length === 0) {
    return (
      <div className="empty-products">
        <i className="bi bi-search" />
        <h3>No encontramos productos</h3>
        <p>Prueba con otra búsqueda o vuelve a mostrar todas las categorías.</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {productos.map((producto) => {
        const enCarrito = carrito.some((item) => item.id === producto.id);

        return (
          <article className="product-card" key={producto.id}>
            <div className="product-image-wrap">
              <span className="product-category">{producto.categoria}</span>
              <img src={producto.imagen} alt={producto.nombre} className="product-image" />
            </div>

            <div className="product-content">
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>

              <div className="product-footer">
                <strong>{formatearMoneda(producto.precio)}</strong>
                <button
                  type="button"
                  className={`product-button ${enCarrito ? 'is-added' : ''}`}
                  onClick={() => agregarAlCarrito(producto)}
                >
                  <i className={`bi ${enCarrito ? 'bi-plus-lg' : 'bi-bag-plus'}`} />
                  {enCarrito ? 'Añadir' : 'Agregar'}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductoList;
