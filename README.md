# TechStore React

Tienda de tecnología construida con React + Vite.

La interfaz fue rediseñada tomando como referencia visual el tema Storefront de WooCommerce, pero adaptando su lenguaje a una tienda tecnológica: encabezado blanco, navegación limpia, hero claro, categorías, catálogo de productos, filtros, buscador y carrito lateral.

## Ejecutar

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
```

## Estructura principal

- `src/App.jsx`: layout general, buscador, filtros y estado del carrito.
- `src/components/ProductoList.jsx`: tarjetas del catálogo.
- `src/components/Carrito.jsx`: resumen y controles del carrito.
- `src/App.css`: estilos de la nueva interfaz.
- `public/data/productos.json`: catálogo de productos.
