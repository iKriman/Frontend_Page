# GameStore - Evaluación Final Transversal

Proyecto final de **Desarrollo Frontend I (PFY2201)**. La aplicación simula una tienda online de videojuegos y fue desarrollada con HTML5, CSS3, JavaScript, Bootstrap 5 y React.

## Objetivo

El sitio permite visualizar un catálogo de videojuegos, filtrar el contenido por categoría, buscar productos, agregar o eliminar videojuegos durante la sesión y enviar un formulario de contacto con validaciones.

## Tecnologías utilizadas

- HTML5 con estructura semántica.
- CSS3 con Flexbox, CSS Grid y media queries.
- Bootstrap 5 para navegación, grilla responsiva, tarjetas, formularios, botones y utilidades.
- JavaScript ES6+ para la lógica y manipulación dinámica de datos.
- React con componentes funcionales, `useState`, `useEffect`, `useMemo` y props.
- Vite como entorno de desarrollo y compilación.
- JSON local para la carga inicial del catálogo.

## Funcionalidades

1. **Catálogo dinámico:** los videojuegos se cargan con `fetch` desde `public/data/videojuegos.json` y se convierten en objetos JavaScript.
2. **Tarjetas generadas dinámicamente:** `VideojuegoList` recorre el arreglo con `map()` y renderiza un componente `VideojuegoCard` por cada elemento.
3. **Filtro por categoría:** permite mostrar todos los juegos o solo una categoría específica.
4. **Buscador:** filtra por nombre, categoría y descripción.
5. **Gestión del catálogo:** el formulario de gestión permite agregar videojuegos al estado y cada tarjeta permite eliminarlos.
6. **Formulario de contacto:** valida nombre, email y mensaje antes de aceptar el envío.
7. **Diseño responsivo:** utiliza Bootstrap 5 y estilos personalizados para adaptarse a escritorio, tablet y móvil.
8. **Navegación responsiva:** barra Bootstrap con menú colapsable en pantallas pequeñas.

## Estructura principal

```text
src/
├── components/
│   ├── CatalogoForm.jsx
│   ├── ContactForm.jsx
│   ├── Filtros.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── VideojuegoCard.jsx
│   └── VideojuegoList.jsx
├── App.css
├── App.jsx
├── index.css
└── main.jsx
public/
├── data/videojuegos.json
└── images/
```

## Instalación y ejecución local

1. Clonar o descargar el repositorio.
2. Abrir una terminal en la carpeta del proyecto.
3. Instalar dependencias:

```bash
npm install
```

4. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

5. Abrir la dirección indicada por Vite en el navegador, normalmente `http://localhost:5173/Frontend_Page/`.

## Compilación de producción

```bash
npm run build
```

El resultado se genera en la carpeta `dist`.

## Validaciones del formulario de contacto

- Nombre: mínimo 3 caracteres.
- Email: debe tener un formato válido.
- Mensaje: mínimo 10 caracteres.
- Si existe un error, se muestra el mensaje correspondiente y no se procesa el envío.

## Pruebas recomendadas antes de entregar

| Prueba | Resultado esperado |
| --- | --- |
| Carga inicial | Se muestran todos los videojuegos del JSON. |
| Filtro por categoría | Solo aparecen juegos de la categoría elegida. |
| Buscador | El listado cambia mientras se escribe. |
| Agregar videojuego | Se crea una nueva tarjeta y aumenta el contador. |
| Eliminar videojuego | La tarjeta seleccionada desaparece del catálogo. |
| Contacto vacío | Se muestran mensajes de validación. |
| Contacto correcto | Aparece un mensaje de envío exitoso. |
| Vista móvil | Navbar colapsable y tarjetas en una sola columna. |
| Vista tablet/escritorio | La grilla cambia a dos o tres columnas según el ancho. |

## Despliegue en GitHub Pages

El proyecto mantiene la configuración de Vite para publicarse bajo `/Frontend_Page/`.

```bash
npm run deploy
```

Repositorio utilizado en el examen anterior: `https://github.com/iKriman/Frontend_Page`

## Autor

Ignacio Kriman
