const formatearMoneda = (valor) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(valor);
};

function Carrito({ carrito, quitarDelCarrito, vaciarCarrito }) {
  const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="cart-panel">
      <div className="cart-panel-header">
        <div>
          <span>RESUMEN</span>
          <h2>Mi carrito</h2>
        </div>
        <span className="cart-badge">{totalItems}</span>
      </div>

      <div className="cart-panel-body">
        {carrito.length === 0 ? (
          <div className="empty-cart">
            <i className="bi bi-bag" />
            <h3>Tu carrito está vacío</h3>
            <p>Agrega un producto y aparecerá aquí.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {carrito.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-main">
                    <strong>{item.nombre}</strong>
                    <span>{item.cantidad} × {formatearMoneda(item.precio)}</span>
                  </div>
                  <div className="cart-item-side">
                    <strong>{formatearMoneda(item.precio * item.cantidad)}</strong>
                    <button
                      type="button"
                      aria-label={`Quitar una unidad de ${item.nombre}`}
                      onClick={() => quitarDelCarrito(item.id)}
                    >
                      <i className="bi bi-dash" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <span>Total</span>
              <strong>{formatearMoneda(totalPrecio)}</strong>
            </div>

            <button type="button" className="checkout-button">
              Proceder al pago <i className="bi bi-arrow-right" />
            </button>
            <button type="button" className="clear-cart" onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Carrito;
