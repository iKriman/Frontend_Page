import { useState } from 'react';

const formularioInicial = {
  nombre: '',
  email: '',
  mensaje: '',
};

const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactForm() {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const actualizarCampo = (event) => {
    const { name, value } = event.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
    setErrores((actual) => ({ ...actual, [name]: '' }));
    setEnviado(false);
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (formulario.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'Ingresa un nombre de al menos 3 caracteres.';
    }

    if (!expresionEmail.test(formulario.email.trim())) {
      nuevosErrores.email = 'Ingresa un correo electrónico válido.';
    }

    if (formulario.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }

    return nuevosErrores;
  };

  const manejarEnvio = (event) => {
    event.preventDefault();
    const nuevosErrores = validarFormulario();

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setEnviado(false);
      return;
    }

    setErrores({});
    setEnviado(true);
    setFormulario(formularioInicial);
  };

  return (
    <form className="card border-0 shadow-sm contact-form" onSubmit={manejarEnvio} noValidate>
      <div className="card-body p-4 p-md-5">
        <h3 className="h4 mb-4">Envíanos un mensaje</h3>

        {enviado && (
          <div className="alert alert-success" role="status">
            <i className="bi bi-check-circle me-2" />
            Mensaje validado y enviado correctamente.
          </div>
        )}

        <div className="mb-3">
          <label className="form-label" htmlFor="contact-name">Nombre</label>
          <input
            id="contact-name"
            name="nombre"
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
            value={formulario.nombre}
            onChange={actualizarCampo}
            placeholder="Tu nombre"
          />
          <div className="invalid-feedback">{errores.nombre}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={`form-control ${errores.email ? 'is-invalid' : ''}`}
            value={formulario.email}
            onChange={actualizarCampo}
            placeholder="nombre@correo.cl"
          />
          <div className="invalid-feedback">{errores.email}</div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="contact-message">Mensaje</label>
          <textarea
            id="contact-message"
            name="mensaje"
            rows="5"
            className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
            value={formulario.mensaje}
            onChange={actualizarCampo}
            placeholder="Escribe tu consulta..."
          />
          <div className="invalid-feedback">{errores.mensaje}</div>
        </div>

        <button className="btn btn-primary px-4" type="submit">
          Enviar mensaje
          <i className="bi bi-send ms-2" />
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
