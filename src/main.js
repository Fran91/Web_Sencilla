// ==========================================================================
// PRÁCTICA EVALUADA: CATÁLOGO DINÁMICO DE PRODUCTOS (VITE + VANILLA JS)
// Estudiante: Roberto Francisco Lemus Ramírez
//
// Proyecto basado en la plantilla Vite de D:\beca_frontend\website-vite
// Cumplimiento de requerimientos:
// - Paso 1: Arreglo de objetos (nombre, precio, categoría).
// - Paso 2: Generación dinámica del HTML en pantalla con map().
// - Paso 3: Filtrado por categoría con filter().
// - Paso 4: Filtrado por precio máximo con filter() sin recargar.
// ==========================================================================

import './style.css'
import viteLogo from './assets/vite.svg'
import jsLogo from './assets/javascript.svg'

// ==========================================================================
// PASO 1: Crear el arreglo de productos
// Cada producto es un objeto con: nombre, precio y categoria.
// ==========================================================================

const productos = [
  {
    id: 1,
    nombre: "Laptop Gamer UltraSlim",
    precio: 799.99,
    categoria: "Tecnología",
    descripcion: "Intel Core i7, 16 GB de RAM, SSD de 512 GB y pantalla FHD 144 Hz.",
    icono: "💻"
  },
  {
    id: 2,
    nombre: "Auriculares Bluetooth Pro",
    precio: 49.99,
    categoria: "Tecnología",
    descripcion: "Cancelación activa de ruido, micrófono HD y 30 horas de autonomía.",
    icono: "🎧"
  },
  {
    id: 3,
    nombre: "Teclado Mecánico RGB",
    precio: 69.50,
    categoria: "Tecnología",
    descripcion: "Switches mecánicos táctiles, retroiluminación personalizable.",
    icono: "⌨️"
  },
  {
    id: 4,
    nombre: "Smartwatch Deportivo",
    precio: 129.00,
    categoria: "Tecnología",
    descripcion: "GPS integrado, pulsómetro cardíaco y resistencia al agua 50m.",
    icono: "⌚"
  },
  {
    id: 5,
    nombre: "Camiseta Deportiva Dry-Fit",
    precio: 19.99,
    categoria: "Ropa",
    descripcion: "Tejido técnico elástico y transpirable para alto rendimiento.",
    icono: "👕"
  },
  {
    id: 6,
    nombre: "Chaqueta Cortavientos",
    precio: 54.99,
    categoria: "Ropa",
    descripcion: "Repelente al agua y al viento, con capucha y bolsillos térmicos.",
    icono: "🧥"
  },
  {
    id: 7,
    nombre: "Zapatillas Running Trail",
    precio: 89.99,
    categoria: "Ropa",
    descripcion: "Suela de alto agarre con amortiguación reactiva en el talón.",
    icono: "👟"
  },
  {
    id: 8,
    nombre: "Cafetera de Goteo Programable",
    precio: 45.00,
    categoria: "Hogar",
    descripcion: "Jarra térmica de 1.5L, temporizador de 24h y apagado automático.",
    icono: "☕"
  },
  {
    id: 9,
    nombre: "Lámpara LED Táctil",
    precio: 25.50,
    categoria: "Hogar",
    descripcion: "Brillo regulable en 3 tonalidades y puerto de carga USB.",
    icono: "💡"
  },
  {
    id: 10,
    nombre: "Set de Sábanas de Algodón",
    precio: 39.99,
    categoria: "Hogar",
    descripcion: "100% algodón suave de 300 hilos, sábana bajera y fundas.",
    icono: "🛏️"
  },
  {
    id: 11,
    nombre: "Balón de Fútbol Profesional",
    precio: 29.99,
    categoria: "Deportes",
    descripcion: "Construcción cosida con sellado térmico de alta durabilidad.",
    icono: "⚽"
  },
  {
    id: 12,
    nombre: "Mochila de Senderismo 35L",
    precio: 42.00,
    categoria: "Deportes",
    descripcion: "Espaldar ergonómico ventilado, múltiples correas y funda.",
    icono: "🎒"
  }
];

// ==========================================================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ==========================================================================
let categoriaActiva = "todas";      // "todas", "Tecnología", "Ropa", "Hogar", "Deportes"
let precioMaximoActivo = null;       // null o número tope
let vistaActual = "tarjetas";        // "tarjetas" o "tabla"
let temporizadorToast = null;

// ==========================================================================
// MONTAJE DEL CASCARÓN HTML EN EL DOM (#app)
// Estructura tipo Single Page Application característica de Vite
// ==========================================================================

const appContainer = document.querySelector('#app');

appContainer.innerHTML = `
  <!-- Encabezado con marcas de Vite y JS -->
  <header class="header">
    <div class="container header__inner">
      <div class="brand">
        <div class="brand__logos">
          <img src="${viteLogo}" class="brand__icon" alt="Vite" />
          <img src="${jsLogo}" class="brand__icon" alt="JavaScript" />
        </div>
        <div>
          <h1 class="brand__title">Catálogo Interactivo</h1>
          <span class="brand__badge">Vite • Manipulación del DOM</span>
        </div>
      </div>
      <div class="header__meta">
        <span>Estudiante: <strong>Roberto Francisco Lemus Ramírez</strong></span>
      </div>
    </div>
  </header>

  <!-- Banner / Hero -->
  <section class="hero">
    <div class="container hero__inner">
      <span class="eyebrow">Práctica Evaluada • Frontend</span>
      <h2 class="hero__title">Explora y Filtra Productos en Tiempo Real</h2>
      <p class="hero__text">
        Sitio web interactivo renderizado con <code>map()</code> y filtrado dinámico mediante <code>filter()</code> sin recargar la página.
      </p>
    </div>
  </section>

  <!-- Contenido Principal -->
  <main class="container">

    <!-- Sección de Filtros -->
    <section class="filtros-seccion" aria-label="Controles de búsqueda y filtros">
      <div class="filtros-grid">

        <!-- Paso 3: Filtrar por Categoría -->
        <article class="filtro-card">
          <div class="filtro-card__header">
            <span class="tag-paso">Paso 3</span>
            <h3 class="filtro-card__title">Filtrar por Categoría</h3>
          </div>
          <p class="filtro-card__hint">
            Presiona una categoría para filtrar con <code>filter()</code>:
          </p>
          <div class="categorias-wrap" id="contenedor-categorias" role="group">
            <button type="button" class="btn-cat activo" data-categoria="todas">✨ Todas</button>
            <button type="button" class="btn-cat" data-categoria="Tecnología">💻 Tecnología</button>
            <button type="button" class="btn-cat" data-categoria="Ropa">👕 Ropa</button>
            <button type="button" class="btn-cat" data-categoria="Hogar">🏡 Hogar</button>
            <button type="button" class="btn-cat" data-categoria="Deportes">⚽ Deportes</button>
          </div>
        </article>

        <!-- Paso 4: Filtrar por Precio Máximo -->
        <article class="filtro-card">
          <div class="filtro-card__header">
            <span class="tag-paso">Paso 4</span>
            <h3 class="filtro-card__title">Filtrar por Precio Máximo</h3>
          </div>
          <p class="filtro-card__hint">
            Muestra artículos con <code>precio &lt;= valor</code> (usa <code>filter()</code>):
          </p>
          <form id="form-filtro-precio" class="precio-form" novalidate>
            <div class="input-group">
              <span class="input-prefix" aria-hidden="true">$</span>
              <input 
                type="number" 
                id="input-precio-max" 
                class="input-precio" 
                placeholder="Ej. 50" 
                min="1" 
                step="any"
                aria-label="Precio máximo"
              />
            </div>
            <button type="submit" id="btn-precio-submit" class="btn btn--primary">
              Filtrar por precio
            </button>
            <button type="button" id="btn-limpiar" class="btn btn--ghost" title="Restablecer filtros">
              Restablecer
            </button>
          </form>
          <p id="msg-validacion" class="form-msg" aria-live="polite"></p>
        </article>

      </div>
    </section>

    <!-- Barra de Estado y Vistas -->
    <section class="status-bar" aria-label="Estado de resultados">
      <div class="status-bar__counter">
        <span class="glow-dot"></span>
        <span id="contador-productos">Cargando catálogo...</span>
      </div>

      <div id="chips-activos" class="status-bar__chips" aria-live="polite"></div>

      <div class="view-toggle" role="group" aria-label="Modo de vista">
        <button type="button" id="btn-vista-cards" class="btn-view activo" title="Vista en tarjetas">
          🗂️ Tarjetas
        </button>
        <button type="button" id="btn-vista-table" class="btn-view" title="Vista en tabla">
          📋 Tabla
        </button>
      </div>
    </section>

    <!-- Paso 2: Contenedor Dinámico generado con map() -->
    <section aria-label="Catálogo de productos">
      <div id="contenedor-productos" aria-live="polite">
        <!-- Renderizado dinámicamente con productos.map(...) -->
      </div>
    </section>

  </main>

  <!-- Toast de Notificación -->
  <aside id="toast" class="toast-box" role="status" aria-live="polite" aria-hidden="true">
    <span id="toast-icono">⚡</span>
    <span id="toast-texto">Operación completada</span>
  </aside>

  <!-- Pie de Página -->
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__info">
        <h3>Prácticas de Desarrollo Web • Beca Frontend</h3>
        <p>Aplicación Vite que demuestra dominio de métodos de arreglos y manipulación del DOM.</p>
        <p>Alumno: <strong>Roberto Francisco Lemus Ramírez</strong></p>
      </div>
      <div class="footer__checklist">
        <h4>Requerimientos Cumplidos</h4>
        <ul>
          <li>✔ <strong>Paso 1:</strong> Arreglo con objetos (nombre, precio, categoría).</li>
          <li>✔ <strong>Paso 2:</strong> Renderizado dinámico con <code>map()</code> al cargar.</li>
          <li>✔ <strong>Paso 3:</strong> Botones de categoría con <code>filter()</code>.</li>
          <li>✔ <strong>Paso 4:</strong> Filtrado por precio con <code>filter()</code> sin recargar.</li>
          <li>✔ <strong>DOM:</strong> Manipulación reactiva de elementos y estados.</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© 2026 Catálogo de Productos • Entorno Vite • Tarea Moodle</p>
    </div>
  </footer>
`;

// ==========================================================================
// REFERENCIAS A ELEMENTOS DEL DOM (Post-montaje)
// ==========================================================================
const contenedorProductos = document.getElementById("contenedor-productos");
const contadorProductos = document.getElementById("contador-productos");
const chipsActivos = document.getElementById("chips-activos");
const botonesCategorias = document.querySelectorAll(".btn-cat");

const formFiltroPrecio = document.getElementById("form-filtro-precio");
const inputPrecioMax = document.getElementById("input-precio-max");
const btnLimpiar = document.getElementById("btn-limpiar");
const msgValidacion = document.getElementById("msg-validacion");

const btnVistaCards = document.getElementById("btn-vista-cards");
const btnVistaTable = document.getElementById("btn-vista-table");
const toast = document.getElementById("toast");
const toastTexto = document.getElementById("toast-texto");

// ==========================================================================
// PASO 2: Mostrar los productos en pantalla usando map()
// Los productos aparecen visibles al cargar la página y se actualizan dinámicamente.
// ==========================================================================

/**
 * Función que transforma el arreglo de productos en marcado HTML utilizando map()
 * @param {Array} lista - Arreglo de productos a renderizar
 */
function renderizarProductos(lista) {
  // Manejo de estado vacío si ningún producto coincide con los filtros
  if (lista.length === 0) {
    contenedorProductos.innerHTML = `
      <div class="empty-state">
        <span class="empty-state__icon">🔍</span>
        <h3 class="empty-state__title">No se encontraron productos</h3>
        <p class="empty-state__text">
          No hay artículos con categoría <strong>"${categoriaActiva}"</strong>
          ${precioMaximoActivo !== null ? ` y precio menor o igual a <strong>$${precioMaximoActivo.toFixed(2)}</strong>` : ""}.
        </p>
        <button type="button" class="btn btn--primary" id="btn-reset-vacio">
          Restablecer filtros
        </button>
      </div>
    `;

    document.getElementById("btn-reset-vacio")?.addEventListener("click", restablecerFiltros);
    actualizarBarraEstado(0, productos.length);
    return;
  }

  // Vista en Tarjetas
  if (vistaActual === "tarjetas") {
    // REQUERIMIENTO TÉCNICO: Uso explícito de Array.prototype.map()
    const tarjetasHTML = lista.map((producto) => {
      const claseBadge = obtenerClaseBadge(producto.categoria);
      return `
        <article class="tarjeta-producto" data-categoria="${producto.categoria}">
          <div class="tarjeta-producto__header">
            <span class="tarjeta-producto__icono" aria-hidden="true">${producto.icono}</span>
            <span class="badge ${claseBadge}">${producto.categoria}</span>
          </div>

          <div class="tarjeta-producto__body">
            <h3 class="tarjeta-producto__titulo">${producto.nombre}</h3>
            <p class="tarjeta-producto__descripcion">${producto.descripcion}</p>
          </div>

          <div class="tarjeta-producto__footer">
            <div class="tarjeta-producto__precio-box">
              <span class="precio-label">Precio</span>
              <span class="precio-valor">$${producto.precio.toFixed(2)}</span>
            </div>
            <button 
              type="button" 
              class="btn btn--accion btn-agregar" 
              data-nombre="${producto.nombre}" 
              data-precio="${producto.precio}"
            >
              🛒 Agregar
            </button>
          </div>
        </article>
      `;
    }).join("");

    contenedorProductos.innerHTML = `<div class="catalogo-grid">${tarjetasHTML}</div>`;
  } else {
    // Vista en Tabla
    // REQUERIMIENTO TÉCNICO: Uso explícito de Array.prototype.map()
    const filasHTML = lista.map((producto, idx) => {
      const claseBadge = obtenerClaseBadge(producto.categoria);
      return `
        <tr>
          <td><strong>#${idx + 1}</strong></td>
          <td>
            <span style="font-size: 1.25rem; margin-right: 0.5rem;">${producto.icono}</span>
            <strong>${producto.nombre}</strong>
          </td>
          <td><span class="badge ${claseBadge}">${producto.categoria}</span></td>
          <td class="tabla-precio">$${producto.precio.toFixed(2)}</td>
          <td>
            <button 
              type="button" 
              class="btn btn--accion btn--sm btn-agregar" 
              data-nombre="${producto.nombre}" 
              data-precio="${producto.precio}"
            >
              🛒 Agregar
            </button>
          </td>
        </tr>
      `;
    }).join("");

    contenedorProductos.innerHTML = `
      <div class="catalogo-tabla-wrap">
        <table class="tabla-productos">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            ${filasHTML}
          </tbody>
        </table>
      </div>
    `;
  }

  // Asignar escuchadores a los botones de acción "Agregar" generados con map()
  document.querySelectorAll(".btn-agregar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nombre = btn.dataset.nombre;
      const precio = parseFloat(btn.dataset.precio);
      mostrarToast(`¡"${nombre}" agregado por $${precio.toFixed(2)}!`);
    });
  });

  actualizarBarraEstado(lista.length, productos.length);
}

// ==========================================================================
// MOTOR DE FILTRADO CON filter() (Paso 3 y Paso 4)
// ==========================================================================

/**
 * Función que filtra reactivamente los productos usando filter()
 * sin necesidad de recargar la página web.
 */
function aplicarFiltros() {
  let resultado = productos;

  // Paso 3: Filtrado por categoría usando filter()
  if (categoriaActiva !== "todas") {
    resultado = resultado.filter((prod) => prod.categoria === categoriaActiva);
  }

  // Paso 4: Filtrado por precio máximo usando filter()
  if (precioMaximoActivo !== null && !isNaN(precioMaximoActivo)) {
    resultado = resultado.filter((prod) => prod.precio <= precioMaximoActivo);
  }

  // Modificación del DOM para mostrar los resultados filtrados
  renderizarProductos(resultado);
  actualizarChips();
}

// ==========================================================================
// PASO 3: Filtrar por categoría
// Manejadores de los botones de categoría
// ==========================================================================

/**
 * Filtra el catálogo según la categoría elegida utilizando filter()
 * @param {string} categoria
 */
function filtrarPorCategoria(categoria) {
  categoriaActiva = categoria;

  botonesCategorias.forEach((b) => {
    b.classList.toggle("activo", b.dataset.categoria === categoria);
  });

  aplicarFiltros();
  mostrarToast(`Categoría: ${categoria === "todas" ? "Todas las categorías" : categoria}`);
}

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", () => {
    filtrarPorCategoria(boton.dataset.categoria);
  });
});

// ==========================================================================
// PASO 4: Filtrar por precio máximo
// Manejador del formulario de precio
// ==========================================================================

/**
 * Aplica el filtro de precio máximo usando filter()
 * @param {number} valorTope
 */
function filtrarPorPrecioMaximo(valorTope) {
  precioMaximoActivo = valorTope;
  aplicarFiltros();
  mostrarToast(`Filtro aplicado: Precio ≤ $${valorTope.toFixed(2)}`);
}

formFiltroPrecio.addEventListener("submit", (e) => {
  // Evitar recarga de página
  e.preventDefault();

  const texto = inputPrecioMax.value.trim();

  if (texto === "") {
    mostrarValidacion("Ingresa un precio máximo a filtrar.");
    inputPrecioMax.focus();
    return;
  }

  const num = parseFloat(texto);

  if (isNaN(num) || num <= 0) {
    mostrarValidacion("Por favor escribe un número mayor a cero.");
    inputPrecioMax.focus();
    return;
  }

  limpiarValidacion();
  filtrarPorPrecioMaximo(num);
});

inputPrecioMax.addEventListener("input", () => {
  if (msgValidacion.textContent !== "") limpiarValidacion();
});

// ==========================================================================
// RESTABLECER Y LIMPIAR FILTROS
// ==========================================================================

function restablecerFiltros() {
  categoriaActiva = "todas";
  precioMaximoActivo = null;
  inputPrecioMax.value = "";
  limpiarValidacion();

  botonesCategorias.forEach((b) => {
    b.classList.toggle("activo", b.dataset.categoria === "todas");
  });

  renderizarProductos(productos);
  actualizarChips();
  mostrarToast("Filtros restablecidos. Mostrando todos los productos.");
}

btnLimpiar.addEventListener("click", restablecerFiltros);

// ==========================================================================
// ALTERNANCIA DE VISTAS (Tarjetas vs Tabla)
// ==========================================================================

btnVistaCards.addEventListener("click", () => {
  if (vistaActual !== "tarjetas") {
    vistaActual = "tarjetas";
    btnVistaCards.classList.add("activo");
    btnVistaTable.classList.remove("activo");
    aplicarFiltros();
  }
});

btnVistaTable.addEventListener("click", () => {
  if (vistaActual !== "tabla") {
    vistaActual = "tabla";
    btnVistaTable.classList.add("activo");
    btnVistaCards.classList.remove("activo");
    aplicarFiltros();
  }
});

// ==========================================================================
// FUNCIONES AUXILIARES DE INTERFAZ (DOM)
// ==========================================================================

function obtenerClaseBadge(cat) {
  switch (cat.toLowerCase()) {
    case "tecnología":
      return "badge--tecnologia";
    case "ropa":
      return "badge--ropa";
    case "hogar":
      return "badge--hogar";
    case "deportes":
      return "badge--deportes";
    default:
      return "";
  }
}

function actualizarBarraEstado(visibles, total) {
  contadorProductos.textContent = visibles === total 
    ? `Mostrando todos los productos (${visibles} disponibles)` 
    : `Mostrando ${visibles} de ${total} productos`;
}

function actualizarChips() {
  const chips = [];

  if (categoriaActiva !== "todas") {
    chips.push(`
      <span class="chip">
        Categoría: <strong>${categoriaActiva}</strong>
        <button type="button" class="chip__del" id="del-cat-chip" aria-label="Quitar categoría">✕</button>
      </span>
    `);
  }

  if (precioMaximoActivo !== null) {
    chips.push(`
      <span class="chip">
        Precio ≤ <strong>$${precioMaximoActivo.toFixed(2)}</strong>
        <button type="button" class="chip__del" id="del-precio-chip" aria-label="Quitar precio">✕</button>
      </span>
    `);
  }

  chipsActivos.innerHTML = chips.join("");

  document.getElementById("del-cat-chip")?.addEventListener("click", () => filtrarPorCategoria("todas"));
  document.getElementById("del-precio-chip")?.addEventListener("click", () => {
    precioMaximoActivo = null;
    inputPrecioMax.value = "";
    limpiarValidacion();
    aplicarFiltros();
    mostrarToast("Filtro de precio removido.");
  });
}

function mostrarValidacion(txt) {
  msgValidacion.textContent = txt;
}

function limpiarValidacion() {
  msgValidacion.textContent = "";
}

function mostrarToast(txt) {
  if (!toast || !toastTexto) return;
  toastTexto.textContent = txt;
  toast.classList.add("mostrar");

  if (temporizadorToast) clearTimeout(temporizadorToast);
  temporizadorToast = setTimeout(() => {
    toast.classList.remove("mostrar");
  }, 2500);
}

// ==========================================================================
// INICIALIZACIÓN (Paso 2: Mostrar productos al cargar)
// ==========================================================================

renderizarProductos(productos);
console.log("Catálogo de Productos cargado exitosamente en entorno Vite.");

