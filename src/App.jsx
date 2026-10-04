import { useEffect, useMemo, useState } from 'react';
import ProductoList from './components/ProductoList';
import Carrito from './components/Carrito';
import hero from './assets/hero.png';
import './App.css';

const categoriasIniciales = ['Todas', 'Computación', 'Periféricos'];

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  useEffect(() => {
    fetch('/data/productos.json')
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch((error) => console.error('Error al cargar productos:', error));
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const existeEnCarrito = carritoActual.find((item) => item.id === producto.id);

      if (existeEnCarrito) {
        return carritoActual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        );
      }

      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const productosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return productos.filter((producto) => {
      const coincideBusqueda =
        !termino ||
        producto.nombre.toLowerCase().includes(termino) ||
        producto.categoria.toLowerCase().includes(termino) ||
        producto.descripcion.toLowerCase().includes(termino);

      const coincideCategoria = categoria === 'Todas' || producto.categoria === categoria;

      return coincideBusqueda && coincideCategoria;
    });
  }, [productos, busqueda, categoria]);

  const categorias = useMemo(() => {
    const dinamicas = [...new Set(productos.map((producto) => producto.categoria))];
    return [...new Set([...categoriasIniciales, ...dinamicas])];
  }, [productos]);

  const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div className="storefront-page">
      <header className="site-header">
        <div className="site-header-main container-storefront">
          <a className="site-branding" href="#inicio" aria-label="TechStore inicio">
            <span className="brand-mark"><i className="bi bi-cpu-fill" /></span>
            <span>
              <strong>TechStore</strong>
              <small>Tecnología que rinde</small>
            </span>
          </a>

          <div className="header-tools">
            <a className="account-link" href="#contacto">Mi cuenta</a>
            <label className="header-search" aria-label="Buscar productos">
              <i className="bi bi-search" />
              <input
                type="search"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="site-navigation container-storefront">
          <nav aria-label="Navegación principal">
            <a href="#inicio">Inicio</a>
            <a href="#catalogo">Tienda</a>
            <a href="#categorias">Categorías</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a className="header-cart" href="#carrito">
            <span>Mi carrito</span>
            <strong>{totalItemsCarrito} {totalItemsCarrito === 1 ? 'producto' : 'productos'}</strong>
            <i className="bi bi-bag" />
          </a>
        </div>
      </header>

      <main id="inicio">
        <section className="hero-storefront">
          <div className="container-storefront hero-content">
            <div className="hero-copy">
              <span className="eyebrow">TECNOLOGÍA · GAMING · COMPUTACIÓN</span>
              <h1>Haz que tu setup<br /><em>rinda más.</em></h1>
              <p>
                Periféricos y componentes elegidos para quienes quieren una experiencia rápida,
                cómoda y lista para jugar o trabajar.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#catalogo">Ver productos</a>
                <a className="button button-ghost" href="#categorias">Explorar categorías</a>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
              <img src={hero} alt="" className="hero-device" />
              <div className="tech-chip chip-top"><i className="bi bi-lightning-charge-fill" /> Rendimiento</div>
              <div className="tech-chip chip-bottom"><i className="bi bi-shield-check" /> Calidad seleccionada</div>
            </div>
          </div>
        </section>

        <section id="categorias" className="categories-section container-storefront">
          <div className="section-heading centered">
            <span>COMPRA A TU MANERA</span>
            <h2>Explora por categoría</h2>
          </div>

          <div className="category-grid">
            {categorias.filter((item) => item !== 'Todas').map((item) => {
              const cantidad = productos.filter((producto) => producto.categoria === item).length;
              const icono = item === 'Computación' ? 'bi-pc-display' : 'bi-keyboard';

              return (
                <button
                  type="button"
                  className={`category-card ${categoria === item ? 'is-active' : ''}`}
                  key={item}
                  onClick={() => {
                    setCategoria(item);
                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="category-icon"><i className={`bi ${icono}`} /></span>
                  <span>
                    <strong>{item}</strong>
                    <small>{cantidad} productos</small>
                  </span>
                  <i className="bi bi-arrow-right category-arrow" />
                </button>
              );
            })}
          </div>
        </section>

        <section id="catalogo" className="catalog-section container-storefront">
          <div className="catalog-heading">
            <div className="section-heading">
              <span>NUESTRO CATÁLOGO</span>
              <h2>Productos destacados</h2>
            </div>
            <div className="catalog-controls">
              <div className="category-tabs" aria-label="Filtrar por categoría">
                {categorias.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={categoria === item ? 'is-selected' : ''}
                    onClick={() => setCategoria(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <span className="product-count">{productosFiltrados.length} productos</span>
            </div>
          </div>

          <div className="catalog-layout">
            <div className="catalog-products">
              <ProductoList
                productos={productosFiltrados}
                agregarAlCarrito={agregarAlCarrito}
                carrito={carrito}
              />
            </div>
            <aside id="carrito" className="catalog-cart">
              <Carrito
                carrito={carrito}
                quitarDelCarrito={quitarDelCarrito}
                vaciarCarrito={vaciarCarrito}
              />
            </aside>
          </div>
        </section>
      </main>

      <footer id="contacto" className="site-footer">
        <div className="container-storefront footer-inner">
          <div>
            <strong>TechStore</strong>
            <p>Tu espacio para mejorar el setup.</p>
          </div>
          <span>Catálogo demo · Tecnología y periféricos</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
