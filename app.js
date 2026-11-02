// ==========================================================================
// PRÁCTICAS DE DESARROLLO WEB: MANIPULACIÓN DEL DOM Y ARREGLOS EN JAVASCRIPT
// Estudiante: Roberto Francisco Lemus Ramírez
//
// Este script implementa:
// - Paso 1: Creación del arreglo de objetos (nombre, precio, categoría).
// - Paso 2: Renderizado dinámico del HTML usando map().
// - Paso 3: Filtrado interactivo por categoría usando filter().
// - Paso 4: Filtrado dinámico por precio máximo usando filter().
// ==========================================================================

"use strict";

// ==========================================================================
// PASO 1: Crear el arreglo de productos
// Cada producto es un objeto con las propiedades: nombre, precio y categoria.
// (Se incluyen icono y descripción para mejorar la presentación visual).
// ==========================================================================

const productos = [
  {
    nombre: "Laptop Gamer UltraSlim",
    precio: 799.99,
    categoria: "Tecnología",
    descripcion: "Procesador Intel Core i7, 16 GB de RAM, SSD de 512 GB y pantalla FHD de 144 Hz.",
    icono: "💻"
  },
  {
    nombre: "Auriculares Bluetooth Pro",
    precio: 49.99,
    categoria: "Tecnología",
    descripcion: "Cancelación activa de ruido, micrófono HD integrado y hasta 30 horas de autonomía.",
    icono: "🎧"
  },
  {
    nombre: "Teclado Mecánico RGB",
    precio: 69.50,
    categoria: "Tecnología",
    descripcion: "Switches mecánicos táctiles, retroiluminación configurable y cable trenzado.",
    icono: "⌨️"
  },
  {
    nombre: "Smartwatch Deportivo",
    precio: 129.00,
    categoria: "Tecnología",
    descripcion: "GPS integrado, pulsómetro cardíaco, resistencia al agua y notificaciones inteligentes.",
    icono: "⌚"
  },
  {
    nombre: "Camiseta Deportiva Transpirable",
    precio: 19.99,
    categoria: "Ropa",
    descripcion: "Tejido técnico elástico con tecnología Dry-Fit para entrenamientos intensos.",
    icono: "👕"
  },
  {
    nombre: "Chaqueta Cortavientos Impermeable",
    precio: 54.99,
    categoria: "Ropa",
    descripcion: "Material térmico repelente al agua, capucha ajustable y bolsillos con cremallera.",
    icono: "🧥"
  },
  {
    nombre: "Zapatillas Running Trail",
    precio: 89.99,
    categoria: "Ropa",
    descripcion: "Suela de alto agarre todoterreno con amortiguación reactiva en el talón.",
    icono: "👟"
  },
  {
    nombre: "Cafetera de Goteo Programable",
    precio: 45.00,
    categoria: "Hogar",
    descripcion: "Jarra térmica de 1.5 litros, temporizador de 24 horas y apagado automático.",
    icono: "☕"
  },
  {
    nombre: "Lámpara de Escritorio LED Táctil",
    precio: 25.50,
    categoria: "Hogar",
    descripcion: "Brillo regulable en 3 tonalidades, brazo flexible y puerto de carga USB.",
    icono: "💡"
  },
  {
    nombre: "Set de Sábanas de Algodón",
    precio: 39.99,
    categoria: "Hogar",
    descripcion: "100% algodón suave de 300 hilos, incluye sábana bajera ajustable y fundas.",
    icono: "🛏️"
  },
  {
    nombre: "Balón de Fútbol Profesional",
    precio: 29.99,
    categoria: "Deportes",
    descripcion: "Construcción cosida con sellado térmico de alta durabilidad, tamaño oficial 5.",
    icono: "⚽"
  },
  {
    nombre: "Mochila de Senderismo 35L",
    precio: 42.00,
    categoria: "Deportes",
    descripcion: "Diseño ergonómico y transpirable, soporte para hidratación y funda impermeable.",
    icono: "🎒"
  }
];

// ==========================================================================
// VARIABLES DE ESTADO Y REFERENCIAS AL DOM
// ==========================================================================

// Estado actual de los filtros
let categoriaActiva = "todas";      // "todas" o el nombre de la categoría elegida
let precioMaximoActivo = null;       // null si no hay filtro de precio, o un número positivo
let vistaActual = "tarjetas";        // "tarjetas" o "tabla"

// Referencias a elementos del DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const contadorProductos = document.getElementById("contador-productos");
const contenedorCategorias = document.getElementById("contenedor-categorias");
const botonesCategorias = document.querySelectorAll(".btn-categoria");

const formFiltroPrecio = document.getElementById("form-filtro-precio");
const inputPrecioMaximo = document.getElementById("input-precio-maximo");
const btnLimpiarFiltros = document.getElementById("btn-limpiar-filtros");
const mensajeValidacion = document.getElementById("mensaje-validacion");
const chipsActivos = document.getElementById("chips-activos");

const btnVistaTarjetas = document.getElementById("btn-vista-tarjetas");
const btnVistaTabla = document.getElementById("btn-vista-tabla");
const btnTema = document.getElementById("btn-tema");
const temaIcono = document.getElementById("tema-icono");
const temaTexto = document.getElementById("tema-texto");
const toast = document.getElementById("toast");
const toastMensaje = document.getElementById("toast-mensaje");
let temporizadorToast = null;

// ==========================================================================
// PASO 2: Mostrar los productos en pantalla usando map()
// Los productos aparecen visibles al cargar la página y al aplicar filtros.
// ==========================================================================

/**
 * Función que recibe una lista de productos y actualiza el DOM
 * generando el HTML dinámicamente mediante el método map().
 * @param {Array} lista - Arreglo de objetos con los productos a mostrar
 */
function renderizarProductos(lista) {
  // Verificación: Si no hay productos que coincidan con los filtros
  if (lista.length === 0) {
    contenedorProductos.className = "contenedor-productos";
    contenedorProductos.innerHTML = `
      <div class="sin-resultados">
        <span class="sin-resultados__icono" aria-hidden="true">🔎</span>
        <h3 class="sin-resultados__titulo">No se encontraron productos</h3>
        <p class="sin-resultados__texto">
          Ningún producto coincide con la categoría 
          <strong>"${categoriaActiva}"</strong>
          ${precioMaximoActivo !== null ? ` y precio menor o igual a <strong>$${precioMaximoActivo.toFixed(2)}</strong>` : ""}.
        </p>
        <button type="button" class="btn btn--primario" onclick="restablecerFiltros()">
          Restablecer filtros
        </button>
      </div>
    `;
    actualizarBarraEstado(0, productos.length);
    return;
  }

  // Si la vista seleccionada es "tarjetas"
  if (vistaActual === "tarjetas") {
    contenedorProductos.className = "contenedor-productos vista-tarjetas";

    // Requerimiento Técnico: Uso explícito de map() para generar las tarjetas HTML
    const tarjetasHTML = lista.map((producto) => {
      const claseBadge = obtenerClaseBadge(producto.categoria);
      const precioFormateado = producto.precio.toFixed(2);

      return `
        <article class="tarjeta-producto" data-categoria="${producto.categoria}">
          <div class="tarjeta-producto__header">
            <div class="tarjeta-producto__icono-box" aria-hidden="true">
              ${producto.icono}
            </div>
            <span class="badge-categoria ${claseBadge}">${producto.categoria}</span>
          </div>
          
          <div class="tarjeta-producto__cuerpo">
            <h3 class="tarjeta-producto__nombre">${producto.nombre}</h3>
            <p class="tarjeta-producto__descripcion">${producto.descripcion}</p>
          </div>
          
          <div class="tarjeta-producto__footer">
            <div class="tarjeta-producto__precio-info">
              <span class="tarjeta-producto__precio-label">Precio</span>
              <span class="tarjeta-producto__precio">$${precioFormateado}</span>
            </div>
            <button 
              type="button" 
              class="btn btn--secundario" 
              onclick="agregarAlCarrito('${producto.nombre.replace(/'/g, "\\'")}', ${producto.precio})"
              aria-label="Agregar ${producto.nombre} al carrito"
            >
              🛒 Agregar
            </button>
          </div>
        </article>
      `;
    }).join(""); // Unimos las cadenas generadas por map()

    // Modificación del DOM
    contenedorProductos.innerHTML = tarjetasHTML;
  } else {
    // Si la vista seleccionada es "tabla"
    contenedorProductos.className = "contenedor-productos vista-tabla";

    // Requerimiento Técnico: Uso explícito de map() para generar las filas de la tabla
    const filasHTML = lista.map((producto, indice) => {
      const claseBadge = obtenerClaseBadge(producto.categoria);
      const precioFormateado = producto.precio.toFixed(2);

      return `
        <tr>
          <td><strong>#${indice + 1}</strong></td>
          <td>
            <div class="tabla-productos__item">
              <span class="tabla-productos__icono" aria-hidden="true">${producto.icono}</span>
              <div>
                <strong>${producto.nombre}</strong>
                <div style="font-size: 0.8rem; color: var(--color-texto-suave);">${producto.descripcion}</div>
              </div>
            </div>
          </td>
          <td>
            <span class="badge-categoria ${claseBadge}">${producto.categoria}</span>
          </td>
          <td class="tabla-productos__precio">$${precioFormateado}</td>
          <td>
            <button 
              type="button" 
              class="btn btn--secundario" 
              style="padding: 0.35rem 0.75rem; font-size: 0.82rem;"
              onclick="agregarAlCarrito('${producto.nombre.replace(/'/g, "\\'")}', ${producto.precio})"
            >
              🛒 Agregar
            </button>
          </td>
        </tr>
      `;
    }).join(""); // Unimos las filas generadas con map()

    // Ensamblamos la tabla completa e inyectamos al DOM
    contenedorProductos.innerHTML = `
      <table class="tabla-productos" role="table" aria-label="Tabla de productos">
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
    `;
  }

  // Actualizamos el contador dinámico en la barra de estado
  actualizarBarraEstado(lista.length, productos.length);
}

// ==========================================================================
// MOTOR DE FILTRADO (Combina Paso 3 y Paso 4 usando filter())
// ==========================================================================

/**
 * Función central de filtrado:
 * Aplica los criterios activos usando filter() sin recargar la página.
 */
function aplicarFiltros() {
  let resultado = productos;

  // Paso 3: Filtrar por categoría usando filter()
  if (categoriaActiva !== "todas") {
    resultado = resultado.filter((producto) => {
      return producto.categoria === categoriaActiva;
    });
  }

  // Paso 4: Filtrar por precio máximo usando filter()
  if (precioMaximoActivo !== null && !isNaN(precioMaximoActivo)) {
    resultado = resultado.filter((producto) => {
      return producto.precio <= precioMaximoActivo;
    });
  }

  // Renderizamos los productos filtrados en pantalla
  renderizarProductos(resultado);
  actualizarChipsActivos();
}

// ==========================================================================
// PASO 3: Filtrar por categoría
// Manejadores de eventos para los botones de categoría usando filter().
// ==========================================================================

/**
 * Función que filtra los productos por la categoría seleccionada.
 * Utiliza Array.prototype.filter().
 * @param {string} categoria - Nombre de la categoría o "todas"
 */
function filtrarPorCategoria(categoria) {
  categoriaActiva = categoria;

  // Actualizamos el estado visual y de accesibilidad de los botones en el DOM
  botonesCategorias.forEach((boton) => {
    const esElSeleccionado = boton.dataset.categoria === categoria;
    boton.classList.toggle("activo", esElSeleccionado);
    boton.setAttribute("aria-pressed", esElSeleccionado ? "true" : "false");
  });

  // Ejecutamos el filtrado con filter() y actualizamos el DOM
  aplicarFiltros();

  mostrarToast(`Categoría: ${categoria === "todas" ? "Todas las categorías" : categoria}`);
}

// Asignamos el evento 'click' a cada botón de categoría
botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", () => {
    const categoriaElegida = boton.dataset.categoria;
    filtrarPorCategoria(categoriaElegida);
  });
});

// ==========================================================================
// PASO 4: Filtrar por precio máximo
// Manejador del formulario de precio usando filter() sin recargar la página.
// ==========================================================================

/**
 * Función que filtra los productos por precio máximo usando filter().
 * @param {number} precioMaximo - Valor numérico tope
 */
function filtrarPorPrecioMaximo(precioMaximo) {
  precioMaximoActivo = precioMaximo;
  aplicarFiltros();
  mostrarToast(`Filtro aplicado: Precio ≤ $${precioMaximo.toFixed(2)}`);
}

// Escuchamos el evento submit del formulario de precio
formFiltroPrecio.addEventListener("submit", (evento) => {
  // Evitamos la recarga predeterminada del navegador
  evento.preventDefault();

  const valorTexto = inputPrecioMaximo.value.trim();

  // Validación: campo no vacío
  if (valorTexto === "") {
    mostrarMensajeValidacion("Por favor escribe un precio máximo en el campo.");
    inputPrecioMaximo.focus();
    return;
  }

  const precioIngresado = parseFloat(valorTexto);

  // Validación: número válido y mayor a 0
  if (isNaN(precioIngresado) || precioIngresado <= 0) {
    mostrarMensajeValidacion("Ingresa un número válido mayor a 0.");
    inputPrecioMaximo.focus();
    return;
  }

  // Limpiamos el mensaje de error si todo es correcto
  limpiarMensajeValidacion();

  // Ejecutamos el filtro por precio máximo (Paso 4)
  filtrarPorPrecioMaximo(precioIngresado);
});

// Limpieza automática del mensaje de validación mientras el usuario escribe
inputPrecioMaximo.addEventListener("input", () => {
  if (mensajeValidacion.textContent !== "") {
    limpiarMensajeValidacion();
  }
});

// ==========================================================================
// RESTABLECER Y LIMPIAR FILTROS
// ==========================================================================

/**
 * Restablece todos los filtros a sus valores originales y muestra la lista completa.
 */
function restablecerFiltros() {
  categoriaActiva = "todas";
  precioMaximoActivo = null;
  inputPrecioMaximo.value = "";
  limpiarMensajeValidacion();

  // Restablecer botones de categoría en el DOM
  botonesCategorias.forEach((boton) => {
    const esTodas = boton.dataset.categoria === "todas";
    boton.classList.toggle("activo", esTodas);
    boton.setAttribute("aria-pressed", esTodas ? "true" : "false");
  });

  // Mostramos el arreglo original completo generado con map()
  renderizarProductos(productos);
  actualizarChipsActivos();
  mostrarToast("Filtros restablecidos. Mostrando todos los productos.");
}

// Evento para el botón restablecer
btnLimpiarFiltros.addEventListener("click", restablecerFiltros);

// ==========================================================================
// SELECTOR DE VISTAS (Tarjetas vs Tabla)
// ==========================================================================

btnVistaTarjetas.addEventListener("click", () => {
  if (vistaActual !== "tarjetas") {
    vistaActual = "tarjetas";
    btnVistaTarjetas.classList.add("activo");
    btnVistaTarjetas.setAttribute("aria-pressed", "true");
    btnVistaTabla.classList.remove("activo");
    btnVistaTabla.setAttribute("aria-pressed", "false");
    aplicarFiltros();
  }
});

btnVistaTabla.addEventListener("click", () => {
  if (vistaActual !== "tabla") {
    vistaActual = "tabla";
    btnVistaTabla.classList.add("activo");
    btnVistaTabla.setAttribute("aria-pressed", "true");
    btnVistaTarjetas.classList.remove("activo");
    btnVistaTarjetas.setAttribute("aria-pressed", "false");
    aplicarFiltros();
  }
});

// ==========================================================================
// FUNCIONES AUXILIARES Y MANIPULACIÓN DEL DOM
// ==========================================================================

/**
 * Devuelve la clase CSS correspondiente para el badge según la categoría.
 * @param {string} categoria
 * @returns {string} Clase CSS
 */
function obtenerClaseBadge(categoria) {
  switch (categoria.toLowerCase()) {
    case "tecnología":
      return "badge-categoria--tecnologia";
    case "ropa":
      return "badge-categoria--ropa";
    case "hogar":
      return "badge-categoria--hogar";
    case "deportes":
      return "badge-categoria--deportes";
    default:
      return "badge-categoria--otra";
  }
}

/**
 * Actualiza el contador dinámico en la barra de estado del DOM.
 * @param {number} visibles - Cantidad de productos mostrados
 * @param {number} total - Total de productos en el catálogo
 */
function actualizarBarraEstado(visibles, total) {
  if (visibles === total) {
    contadorProductos.textContent = `Mostrando todos los productos (${visibles} disponibles)`;
  } else {
    contadorProductos.textContent = `Mostrando ${visibles} de ${total} productos`;
  }
}

/**
 * Muestra etiquetas dinámicas (chips) en el DOM indicando los filtros activos.
 */
function actualizarChipsActivos() {
  const chips = [];

  if (categoriaActiva !== "todas") {
    chips.push(`
      <span class="chip">
        Categoría: <strong>${categoriaActiva}</strong>
        <button type="button" class="chip__cerrar" onclick="filtrarPorCategoria('todas')" aria-label="Quitar filtro de categoría">✕</button>
      </span>
    `);
  }

  if (precioMaximoActivo !== null) {
    chips.push(`
      <span class="chip">
        Precio ≤ <strong>$${precioMaximoActivo.toFixed(2)}</strong>
        <button type="button" class="chip__cerrar" onclick="quitarFiltroPrecio()" aria-label="Quitar filtro de precio">✕</button>
      </span>
    `);
  }

  chipsActivos.innerHTML = chips.join("");
}

/**
 * Quita únicamente el filtro de precio máximo.
 */
function quitarFiltroPrecio() {
  precioMaximoActivo = null;
  inputPrecioMaximo.value = "";
  limpiarMensajeValidacion();
  aplicarFiltros();
  mostrarToast("Filtro de precio removido.");
}

/**
 * Muestra un mensaje de error o aviso en el área de validación del formulario.
 * @param {string} texto
 */
function mostrarMensajeValidacion(texto) {
  mensajeValidacion.textContent = texto;
  mensajeValidacion.classList.add("visible");
}

/**
 * Limpia el mensaje de error de validación.
 */
function limpiarMensajeValidacion() {
  mensajeValidacion.textContent = "";
  mensajeValidacion.classList.remove("visible");
}

/**
 * Muestra una notificación emergente (Toast) informativa.
 * @param {string} mensaje
 */
function mostrarToast(mensaje) {
  if (!toast || !toastMensaje) return;

  toastMensaje.textContent = mensaje;
  toast.classList.add("mostrar");
  toast.setAttribute("aria-hidden", "false");

  if (temporizadorToast) {
    clearTimeout(temporizadorToast);
  }

  temporizadorToast = setTimeout(() => {
    toast.classList.remove("mostrar");
    toast.setAttribute("aria-hidden", "true");
  }, 2600);
}

/**
 * Acción de interacción al presionar "Agregar" en una tarjeta o fila.
 * Demuestra la interactividad solicitada en los criterios de evaluación.
 * @param {string} nombre
 * @param {number} precio
 */
function agregarAlCarrito(nombre, precio) {
  mostrarToast(`¡"${nombre}" agregado por $${precio.toFixed(2)}!`);
}

// Hacemos las funciones accesibles globalmente para eventos en línea
window.restablecerFiltros = restablecerFiltros;
window.filtrarPorCategoria = filtrarPorCategoria;
window.quitarFiltroPrecio = quitarFiltroPrecio;
window.agregarAlCarrito = agregarAlCarrito;

// ==========================================================================
// CONTROL DEL TEMA CLARO / OSCURO
// ==========================================================================

const TEMA_KEY = "catalogo-tema-preferido";

function aplicarTema(tema) {
  if (tema === "oscuro") {
    document.body.classList.add("tema-oscuro");
    document.body.classList.remove("tema-claro");
    temaIcono.textContent = "☀️";
    temaTexto.textContent = "Modo claro";
    btnTema.setAttribute("aria-label", "Cambiar a modo claro");
  } else {
    document.body.classList.add("tema-claro");
    document.body.classList.remove("tema-oscuro");
    temaIcono.textContent = "🌙";
    temaTexto.textContent = "Modo oscuro";
    btnTema.setAttribute("aria-label", "Cambiar a modo oscuro");
  }
}

// Alternar tema al presionar el botón
btnTema.addEventListener("click", () => {
  const esOscuro = document.body.classList.contains("tema-oscuro");
  const nuevoTema = esOscuro ? "claro" : "oscuro";
  aplicarTema(nuevoTema);
  try {
    localStorage.setItem(TEMA_KEY, nuevoTema);
  } catch (error) {
    // Si localStorage está restringido, continúa en memoria
  }
});

// Cargar preferencia guardada o respetar la del sistema
function inicializarTema() {
  let temaGuardado = null;
  try {
    temaGuardado = localStorage.getItem(TEMA_KEY);
  } catch (error) {
    temaGuardado = null;
  }

  if (temaGuardado) {
    aplicarTema(temaGuardado);
  } else {
    const prefiereOscuro = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    aplicarTema(prefiereOscuro ? "oscuro" : "claro");
  }
}

// ==========================================================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA (DOMContentLoaded)
// Cumple con el Paso 2: "Los productos deben aparecer visibles en la página al cargar".
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  inicializarTema();

  // Paso 2: Renderizar los productos iniciales usando map()
  renderizarProductos(productos);
});

