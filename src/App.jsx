import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Filtros from './components/Filtros';
import VideojuegoList from './components/VideojuegoList';
import CatalogoForm from './components/CatalogoForm';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './App.css';

const normalizarVideojuego = (videojuego) => ({
  id: videojuego.id,
  nombre: videojuego.nombre,
  categoria: videojuego.categoria,
  precio: Number(videojuego.precio),
  descripcion: videojuego.descripcion,
  imagen: videojuego.imagen,
});

function App() {
  const [videojuegos, setVideojuegos] = useState([]);
  const [categoria, setCategoria] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState('');

  useEffect(() => {
    const cargarVideojuegos = async () => {
      try {
        const respuesta = await fetch(`${import.meta.env.BASE_URL}data/videojuegos.json`);

        if (!respuesta.ok) {
          throw new Error('No fue posible cargar el catálogo.');
        }

        const datos = await respuesta.json();
        setVideojuegos(datos.map(normalizarVideojuego));
      } catch (error) {
        console.error(error);
        setErrorCarga('No se pudo cargar el catálogo de videojuegos.');
      } finally {
        setCargando(false);
      }
    };

    cargarVideojuegos();
  }, []);

  const categorias = useMemo(() => {
    const categoriasDisponibles = videojuegos.map((videojuego) => videojuego.categoria);
    return ['Todas', ...new Set(categoriasDisponibles)];
  }, [videojuegos]);

  const videojuegosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return videojuegos.filter((videojuego) => {
      const coincideCategoria = categoria === 'Todas' || videojuego.categoria === categoria;
      const coincideBusqueda =
        termino === '' ||
        videojuego.nombre.toLowerCase().includes(termino) ||
        videojuego.descripcion.toLowerCase().includes(termino) ||
        videojuego.categoria.toLowerCase().includes(termino);

      return coincideCategoria && coincideBusqueda;
    });
  }, [videojuegos, categoria, busqueda]);

  const agregarVideojuego = (nuevoVideojuego) => {
    const videojuego = normalizarVideojuego({
      ...nuevoVideojuego,
      id: Date.now(),
    });

    setVideojuegos((actuales) => [...actuales, videojuego]);
    setCategoria('Todas');
    setBusqueda('');
  };

  const eliminarVideojuego = (id) => {
    setVideojuegos((actuales) => actuales.filter((videojuego) => videojuego.id !== id));
  };

  return (
    <div className="site-shell">
      <header id="inicio">
        <Navbar totalVideojuegos={videojuegos.length} />

        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">TIENDA ONLINE DE VIDEOJUEGOS</span>
              <h1>
                Tu próxima aventura
                <span> comienza aquí.</span>
              </h1>
              <p>
                Explora títulos para distintos estilos de juego, filtra por categoría y encuentra
                tu próxima experiencia favorita.
              </p>

              <div className="d-flex flex-wrap gap-2 mt-4">
                <a className="btn btn-dark btn-lg" href="#catalogo">
                  Ver catálogo
                </a>
                <a className="btn btn-outline-dark btn-lg" href="#contacto">
                  Contacto
                </a>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="controller-orbit">
                <i className="bi bi-controller" />
              </div>
              <span className="hero-chip chip-one">
                <i className="bi bi-stars" /> Catálogo dinámico
              </span>
              <span className="hero-chip chip-two">
                <i className="bi bi-funnel" /> Filtros por categoría
              </span>
            </div>
          </div>
        </section>
      </header>

      <main>
        <section id="catalogo" className="catalog-section section-space">
          <div className="container">
            <div className="section-heading d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3">
              <div>
                <span className="eyebrow">CATÁLOGO</span>
                <h2>Videojuegos disponibles</h2>
                <p>El contenido se genera de forma dinámica a partir del archivo JSON.</p>
              </div>

              <span className="catalog-counter" aria-live="polite">
                {videojuegosFiltrados.length} de {videojuegos.length} juegos
              </span>
            </div>

            <Filtros
              categorias={categorias}
              categoriaSeleccionada={categoria}
              onCategoriaChange={setCategoria}
              busqueda={busqueda}
              onBusquedaChange={setBusqueda}
            />

            {cargando ? (
              <div className="text-center py-5" role="status">
                <div className="spinner-border" aria-hidden="true" />
                <p className="mt-3 mb-0">Cargando videojuegos...</p>
              </div>
            ) : errorCarga ? (
              <div className="alert alert-danger" role="alert">
                {errorCarga}
              </div>
            ) : (
              <VideojuegoList
                videojuegos={videojuegosFiltrados}
                onEliminar={eliminarVideojuego}
              />
            )}
          </div>
        </section>

        <section id="gestion" className="management-section section-space">
          <div className="container">
            <div className="row g-4 align-items-stretch">
              <div className="col-lg-5">
                <div className="section-heading management-copy h-100">
                  <span className="eyebrow">REACT + STATE</span>
                  <h2>Gestiona el catálogo</h2>
                  <p>
                    Agrega un videojuego nuevo desde este formulario. También puedes eliminar
                    elementos directamente desde cada tarjeta del catálogo.
                  </p>

                  <div className="management-note">
                    <i className="bi bi-info-circle" />
                    <span>
                      Los cambios se mantienen durante la sesión y demuestran la actualización
                      dinámica del estado de React.
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <CatalogoForm onAgregar={agregarVideojuego} />
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="contact-section section-space">
          <div className="container">
            <div className="row g-4 align-items-start">
              <div className="col-lg-5">
                <div className="section-heading contact-copy">
                  <span className="eyebrow">CONTACTO</span>
                  <h2>¿Necesitas ayuda?</h2>
                  <p>
                    Completa el formulario y revisaremos tu mensaje. Todos los campos son
                    validados antes de permitir el envío.
                  </p>

                  <div className="contact-feature">
                    <i className="bi bi-check-circle-fill" />
                    <span>Validación de nombre, correo electrónico y mensaje.</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
