# Catálogo Dinámico de Productos – Vite + Vanilla JS

Proyecto de prácticas de desarrollo frontend implementado sobre la estructura de **Vite** (tomando como base `D:\beca_frontend\website-vite`), enfocado en la manipulación del DOM y el uso de **`map()`** y **`filter()`**.

- **Estudiante:** Roberto Francisco Lemus Ramírez
- **Entorno:** Vite + Vanilla JavaScript
- **Base del proyecto:** `D:\beca_frontend\website-vite`

---

## 🚀 Cómo Ejecutar la Aplicación

Para ejecutar el servidor de desarrollo local con Vite:

```bash
# 1. Asegúrate de estar en la carpeta del proyecto
cd D:\beca_frontend\website-vite
# (o cd D:\beca_frontend\Web_Sencilla)

# 2. Inicia el servidor de desarrollo
pnpm run dev
# o con npm:
npm run dev
```

Vite iniciará el servidor local (generalmente en `http://localhost:5173/`). Abre ese enlace en tu navegador.

---

## 📁 Estructura del Proyecto

```text
├── index.html           # Punto de entrada con <div id="app"></div>
├── package.json         # Configuración y scripts de Vite ("dev": "vite", etc.)
├── public/              # Íconos públicos (favicon.svg, icons.svg)
├── src/
│   ├── assets/          # Íconos de Vite, JavaScript y recursos visuales
│   ├── style.css        # Estilos modernos con paleta neón, glassmorphism y diseño responsivo
│   └── main.js          # Lógica de la aplicación: Paso 1, Paso 2 (map), Paso 3 (filter) y Paso 4 (filter)
└── README.md            # Documentación del proyecto
```

---

## 📝 Cumplimiento de los Requerimientos

### Paso 1: Crear el arreglo de productos
En `src/main.js` se define el arreglo `productos` con 12 artículos distribuidos en 4 categorías (`Tecnología`, `Ropa`, `Hogar`, `Deportes`). Cada elemento posee las propiedades:
- `nombre`: string
- `precio`: number
- `categoria`: string
*(Además de `icono` y `descripcion` para una interfaz rica).*

### Paso 2: Mostrar los productos en pantalla (`map()`)
- La función `renderizarProductos(lista)` utiliza **`lista.map(...)`** para generar el HTML tanto de las tarjetas interactivas como de la vista en tabla.
- Los productos se renderizan inmediatamente al cargar la aplicación.
- Se incluye un selector de vistas para alternar entre tarjetas y tabla con un solo clic.

### Paso 3: Filtrar por categoría (`filter()`)
- Se crearon botones para cada categoría (`Todas`, `Tecnología`, `Ropa`, `Hogar`, `Deportes`).
- Al presionar un botón, se ejecuta el filtrado con **`productos.filter(prod => prod.categoria === categoria)`**.
- El botón activo se resalta visualmente y actualiza el DOM de forma reactiva.

### Paso 4: Filtrar por precio máximo (`filter()`)
- Se implementó un formulario con un campo `<input type="number">` para el precio tope.
- Al enviar el formulario, `evento.preventDefault()` previene la recarga de página.
- Se valida que el valor sea numérico y positivo, y se filtra con **`productos.filter(prod => prod.precio <= precioMaximo)`**.

---

## 🏆 Criterios de Evaluación

- **Manipulación del DOM (3 pts):** Montaje en `#app`, modificación reactiva de contenido, clases activas, chips de filtros y toast flotante.
- **Interactividad (2.5 pts):** Filtros en tiempo real, validación de formulario, switch de vista (Tarjetas/Tabla), botón restablecer y feedback al presionar "Agregar".
- **Organización del código (2.5 pts):** Estructura estándar de Vite, separación de estilos (`style.css`), lógica (`main.js`) y componentes, código documentado y ordenado.
- **Uso correcto de `map` y `filter` (2 pts):** `map()` para la generación del HTML de tarjetas y tablas; `filter()` para categoría y precio máximo.
