tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-bright": "#38393b",
        "tertiary-container": "#ffdad6",
        "on-tertiary-fixed": "#410003",
        "surface-container-high": "#292a2c",
        "background": "#121315",
        "error-container": "#93000a",
        "on-secondary-fixed-variant": "#454747",
        "on-secondary": "#2f3131",
        "on-primary-fixed-variant": "#434b00",
        "on-tertiary-container": "#c22225",
        "secondary-fixed-dim": "#c6c6c7",
        "surface-container-highest": "#343537",
        "inverse-surface": "#e3e2e5",
        "outline": "#919378",
        "on-primary-container": "#606a00",
        "primary": "#ffffff",
        "secondary-fixed": "#e2e2e2",
        "on-secondary-fixed": "#1a1c1c",
        "on-background": "#e3e2e5",
        "tertiary": "#ffffff",
        "secondary-container": "#454747",
        "surface-container-low": "#1b1c1e",
        "surface-container-lowest": "#0d0e10",
        "primary-container": "#d9ef00",
        "surface-container": "#1f2022",
        "on-error": "#690005",
        "on-tertiary": "#680008",
        "on-surface": "#e3e2e5",
        "on-error-container": "#ffdad6",
        "surface-tint": "#bed100",
        "error": "#ffb4ab",
        "on-primary": "#2e3300",
        "surface": "#121315",
        "primary-fixed-dim": "#bed100",
        "inverse-on-surface": "#303033",
        "surface-dim": "#121315",
        "outline-variant": "#464832",
        "surface-variant": "#343537",
        "on-tertiary-fixed-variant": "#930010",
        "secondary": "#c6c6c7",
        "on-primary-fixed": "#1a1e00",
        "tertiary-fixed-dim": "#ffb3ac",
        "tertiary-fixed": "#ffdad6",
        "on-secondary-container": "#b4b5b5",
        "inverse-primary": "#5a6400",
        "on-surface-variant": "#c7c9ab",
        "primary-fixed": "#d9ef00"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "gutter-mobile": "1rem",
        "margin-mobile": "1rem",
        "space-xl": "3rem",
        "space-lg": "2rem",
        "space-xs": "0.375rem",
        "space-md": "1.25rem",
        "space-sm": "0.75rem",
        "gutter": "1.5rem",
        "margin": "2.5rem"
      },
      fontFamily: {
        "headline-md": ["Public Sans"],
        "headline-lg-mobile": ["Public Sans"],
        "label-uppercase": ["Public Sans"],
        "body-base": ["Public Sans"],
        "title-card": ["Public Sans"],
        "body-lg": ["Public Sans"],
        "button-text": ["Public Sans"],
        "headline-lg": ["Public Sans"],
        "display-hero": ["Public Sans"],
        "body-sm": ["Public Sans"]
      },
      fontSize: {
        "headline-md": ["20px", { "lineHeight": "28px", "letterSpacing": "0.02em", "fontWeight": "700" }],
        "headline-lg-mobile": ["22px", { "lineHeight": "28px", "letterSpacing": "0.05em", "fontWeight": "800" }],
        "label-uppercase": ["13px", { "lineHeight": "16px", "letterSpacing": "0.08em", "fontWeight": "800" }],
        "body-base": ["15px", { "lineHeight": "22px", "letterSpacing": "0", "fontWeight": "400" }],
        "title-card": ["18px", { "lineHeight": "24px", "letterSpacing": "0.01em", "fontWeight": "700" }],
        "body-lg": ["17px", { "lineHeight": "26px", "letterSpacing": "0.01em", "fontWeight": "400" }],
        "button-text": ["15px", { "lineHeight": "20px", "letterSpacing": "0.03em", "fontWeight": "800" }],
        "headline-lg": ["28px", { "lineHeight": "36px", "letterSpacing": "0.06em", "fontWeight": "800" }],
        "display-hero": ["44px", { "lineHeight": "52px", "letterSpacing": "0.04em", "fontWeight": "900" }],
        "body-sm": ["13px", { "lineHeight": "18px", "letterSpacing": "0.01em", "fontWeight": "500" }]
      }
    }
  }
};

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  const icon = button.querySelector('span');
  if (document.documentElement.classList.contains('dark')) {
    icon.textContent = 'dark_mode';
  } else {
    icon.textContent = 'light_mode';
  }
}

// Cambiar entre pestañas "Actuales" e "Historial"
function switchTab(tab) {
  const btnActuales = document.getElementById('tab-btn-actuales');
  const btnHistorial = document.getElementById('tab-btn-historial');
  const contentActuales = document.getElementById('tab-actuales');
  const contentHistorial = document.getElementById('tab-historial');

  if (tab === 'actuales') {
    btnActuales.className = 'flex-1 py-space-sm px-space-xs rounded-lg font-button-text text-button-text uppercase transition-all duration-200 flex items-center justify-center gap-space-xs bg-primary-container text-on-primary-fixed shadow-md';
    btnActuales.setAttribute('aria-selected', 'true');
    btnHistorial.className = 'flex-1 py-space-sm px-space-xs rounded-lg font-button-text text-button-text uppercase transition-all duration-200 flex items-center justify-center gap-space-xs bg-surface-container text-on-surface-variant hover:text-primary';
    btnHistorial.setAttribute('aria-selected', 'false');

    contentActuales.classList.remove('hidden');
    contentActuales.classList.add('flex');
    contentHistorial.classList.add('hidden');
    contentHistorial.classList.remove('flex');
  } else {
    btnHistorial.className = 'flex-1 py-space-sm px-space-xs rounded-lg font-button-text text-button-text uppercase transition-all duration-200 flex items-center justify-center gap-space-xs bg-primary-container text-on-primary-fixed shadow-md';
    btnHistorial.setAttribute('aria-selected', 'true');
    btnActuales.className = 'flex-1 py-space-sm px-space-xs rounded-lg font-button-text text-button-text uppercase transition-all duration-200 flex items-center justify-center gap-space-xs bg-surface-container text-on-surface-variant hover:text-primary';
    btnActuales.setAttribute('aria-selected', 'false');

    contentHistorial.classList.remove('hidden');
    contentHistorial.classList.add('flex');
    contentActuales.classList.add('hidden');
    contentActuales.classList.remove('flex');
  }
}

// Mostrar avisos flotantes (Toast)
function showToast(title, message, isError = false) {
  const toast = document.getElementById('action-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMsg = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  const iconWrapper = document.getElementById('toast-icon-wrapper');

  toastTitle.textContent = title;
  toastMsg.textContent = message;

  if (isError) {
    iconWrapper.className = 'w-9 h-9 rounded-md bg-error flex items-center justify-center shrink-0';
    toastIcon.className = 'material-symbols-outlined text-on-error text-[20px]';
    toastIcon.textContent = 'warning';
  } else {
    iconWrapper.className = 'w-9 h-9 rounded-md bg-primary-container flex items-center justify-center shrink-0';
    toastIcon.className = 'material-symbols-outlined text-on-primary-fixed text-[20px]';
    toastIcon.textContent = 'check';
  }

  toast.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3800);
}

// Manejador de acciones en libros
function handleAction(type, bookTitle) {
  if (type === 'renovar') {
    showToast('Préstamo Renovado', `Has renovado "${bookTitle}" por 14 días adicionales.`);
  } else if (type === 'devolver') {
    showToast('Devolución en Proceso', `Generado código QR para buzón de entrega de "${bookTitle}".`, true);
  } else if (type === 'ficha') {
    showToast('Ficha de Catálogo', `Consultando disponibilidad bibliográfica de "${bookTitle}".`);
  } else if (type === 're-pedir') {
    showToast('Solicitud Agregada', `"${bookTitle}" se ha reservado para retiro.`);
  }
}

// Cambiar entre las pestañas "Mi Perfil Cívico" y "Comunidad SaBré"
function switchMainTab(tab) {
  const btnPerfil = document.getElementById('tab-btn-perfil');
  const btnComunidad = document.getElementById('tab-btn-comunidad');
  const viewPerfil = document.getElementById('view-perfil');
  const viewComunidad = document.getElementById('view-comunidad');

  if (tab === 'perfil') {
    btnPerfil.classList.add('bg-primary-container', 'text-on-primary-fixed');
    btnPerfil.classList.remove('bg-surface-container', 'text-on-surface-variant');

    btnComunidad.classList.add('bg-surface-container', 'text-on-surface-variant');
    btnComunidad.classList.remove('bg-primary-container', 'text-on-primary-fixed');

    viewPerfil.classList.remove('hidden');
    viewComunidad.classList.add('hidden');
  } else {
    btnComunidad.classList.add('bg-primary-container', 'text-on-primary-fixed');
    btnComunidad.classList.remove('bg-surface-container', 'text-on-surface-variant');

    btnPerfil.classList.add('bg-surface-container', 'text-on-surface-variant');
    btnPerfil.classList.remove('bg-primary-container', 'text-on-primary-fixed');

    viewComunidad.classList.remove('hidden');
    viewPerfil.classList.add('hidden');
  }
}

// Editar alias comunitario
function editarAliasPrompt() {
  const aliasActual = document.getElementById('display-alias').textContent;
  const nuevoAlias = prompt('Ingresá tu nuevo alias comunitario:', aliasActual);

  if (nuevoAlias && nuevoAlias.trim() !== '') {
    const aliasLimpio = nuevoAlias.trim();

    document.getElementById('display-alias').textContent = aliasLimpio;
    document.getElementById('alias-firma').textContent = aliasLimpio;

    showProfileToast('Alias Comunitario actualizado correctamente');
  }
}

// Mensaje de confirmación para la pantalla de Perfil
function showProfileToast(mensaje) {
  const toast = document.getElementById('profile-toast');
  const toastMsg = document.getElementById('toast-msg');

  toastMsg.textContent = mensaje;

  toast.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 4500);
}

function enviarSugerencia(e) {
  e.preventDefault();
  const texto = document.getElementById('texto-propuesta').value;

  if (texto.trim()) {
    document.getElementById('sugerencia-form').reset();
    showProfileToast('¡Gracias! Tu propuesta comunitaria fue recibida con éxito.');
  }
}


function enviarSugerencia(e) {
  e.preventDefault();
  const texto = document.getElementById('texto-propuesta').value;

  if (texto.trim()) {
    document.getElementById('sugerencia-form').reset();
    showProfileToast('¡Gracias! Tu propuesta comunitaria fue recibida con éxito.');
  }
}

/* ==========================================================================
   Lógica específica de la pantalla: Catálogo y Audiolibros
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa los eventos interactivos solo si los elementos de esta pantalla existen en el DOM
  initCatalogoInteractions();
});

function initCatalogoInteractions() {
  const searchInput = document.getElementById('catalog-search-input');
  const clearBtn = document.getElementById('clear-search');
  const filterChips = document.querySelectorAll('.filter-chip');
  const tabAll = document.getElementById('tab-all');
  const tabAudio = document.getElementById('tab-audio');
  const bookCards = document.querySelectorAll('.book-card');
  
  // Reproductor Audio
  const playBtn = document.getElementById('player-play-btn');
  const playerIcon = document.getElementById('player-icon');
  const playerPing = document.getElementById('player-ping');
  const playerTitle = document.getElementById('player-title');
  const waveformBars = document.querySelectorAll('.waveform-bar');
  const speedBtn = document.getElementById('speed-btn');
  const sampleButtons = document.querySelectorAll('.play-sample-btn');

  // Diálogo Ayudante
  const helperBtn = document.getElementById('btn-helper');
  const helperDialog = document.getElementById('helper-dialog');
  const closeDialogBtn = document.getElementById('close-dialog');

  if (!searchInput && !tabAll && !helperBtn) {
    // Si no estamos en la pantalla de catálogo, no ejecuta los listeners
    return;
  }

  let isPlaying = false;
  let waveInterval = null;
  let currentSpeed = 1.0;

  // 1. Buscador en tiempo real
  if (searchInput && clearBtn) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      clearBtn.classList.toggle('hidden', query.length === 0);
      
      bookCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const matches = text.includes(query);
        card.style.display = matches ? 'flex' : 'none';
      });
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.classList.add('hidden');
      bookCards.forEach(card => card.style.display = 'flex');
      searchInput.focus();
    });
  }

  // 2. Filtros por Chips (Todos, Físico, Audiolibro, Braille, Macrotipo)
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('bg-primary-container', 'text-on-primary');
        c.classList.add('bg-surface-container-high', 'text-on-surface');
      });
      chip.classList.remove('bg-surface-container-high', 'text-on-surface');
      chip.classList.add('bg-primary-container', 'text-on-primary');

      const format = chip.getAttribute('data-format');
      bookCards.forEach(card => {
        if (format === 'todos') {
          card.style.display = 'flex';
        } else {
          const categories = card.getAttribute('data-category') || '';
          card.style.display = categories.includes(format) ? 'flex' : 'none';
        }
      });
    });
  });

  // 3. Control de Pestañas (Todos los Libros vs Audiolibros)
  if (tabAll && tabAudio) {
    tabAll.addEventListener('click', () => {
      tabAll.classList.add('bg-surface-container-high', 'text-primary-container');
      tabAll.classList.remove('text-on-surface-variant');
      tabAll.setAttribute('aria-selected', 'true');

      tabAudio.classList.remove('bg-surface-container-high', 'text-primary-container');
      tabAudio.classList.add('text-on-surface-variant');
      tabAudio.setAttribute('aria-selected', 'false');

      bookCards.forEach(c => c.style.display = 'flex');
    });

    tabAudio.addEventListener('click', () => {
      tabAudio.classList.add('bg-surface-container-high', 'text-primary-container');
      tabAudio.classList.remove('text-on-surface-variant');
      tabAudio.setAttribute('aria-selected', 'true');

      tabAll.classList.remove('bg-surface-container-high', 'text-primary-container');
      tabAll.classList.add('text-on-surface-variant');
      tabAll.setAttribute('aria-selected', 'false');

      bookCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        card.style.display = cat.includes('audio') ? 'flex' : 'none';
      });
    });
  }

  // 4. Control del Reproductor de Audio
  function togglePlayState(play, bookName = null) {
    isPlaying = play;
    if (bookName && playerTitle) playerTitle.textContent = bookName;

    if (isPlaying) {
      if (playerIcon) playerIcon.textContent = 'pause';
      if (playerPing) playerPing.classList.remove('hidden');
      clearInterval(waveInterval);
      waveInterval = setInterval(() => {
        waveformBars.forEach(bar => {
          const h = Math.floor(Math.random() * 24) + 4;
          bar.style.height = `${h}px`;
        });
      }, 180);
    } else {
      if (playerIcon) playerIcon.textContent = 'play_arrow';
      if (playerPing) playerPing.classList.add('hidden');
      clearInterval(waveInterval);
    }
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      togglePlayState(!isPlaying);
    });
  }

  sampleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-book');
      togglePlayState(true, title);
    });
  });

  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      const speeds = [1.0, 1.25, 1.5, 2.0];
      const idx = speeds.indexOf(currentSpeed);
      currentSpeed = speeds[(idx + 1) % speeds.length];
      speedBtn.textContent = `${currentSpeed.toFixed(1)}x`;
      speedBtn.setAttribute('aria-label', `Velocidad ${currentSpeed}x`);
    });
  }

  // 5. Modal / Drawer Asistente Accesible
  if (helperBtn && helperDialog) {
    helperBtn.addEventListener('click', () => {
      if (helperDialog.showModal) {
        helperDialog.showModal();
      } else {
        helperDialog.setAttribute('open', 'true');
      }
    });

    if (closeDialogBtn) {
      closeDialogBtn.addEventListener('click', () => {
        if (helperDialog.close) {
          helperDialog.close();
        } else {
          helperDialog.removeAttribute('open');
        }
      });
    }

    helperDialog.addEventListener('click', (e) => {
      const rect = helperDialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        if (helperDialog.close) helperDialog.close();
      }
    });
  }
}


/* ==========================================================================
   PANTALLA 5: BÚSQUEDA Y DETALLE DE LIBRO (INTERACCIONES)
   ========================================================================== */

function initDetalleLibroInteractions() {
  // Verificación estricta de que estamos en la pantalla de Detalle de Libro
  const searchInput = document.getElementById('detalle-search-input');
  const resultsContainer = document.getElementById('detalle-results-container');
  const detalleSection = document.getElementById('detalle-libro-section');

  if (!searchInput || !resultsContainer || !detalleSection) {
    return; // Si los elementos no existen en esta página, salir pacíficamente.
  }

  // BASE DE DATOS DE PROTOTIPO (Libros requeridos)
  const librosCatalogo = [
    {
      id: 'book-1',
      titulo: 'Don Quijote de la Mancha',
      autor: 'Miguel de Cervantes Saavedra',
      anio: '1605',
      genero: 'Narrativa',
      editorial: 'Fondo SaBré Accesible',
      isbn: '978-987-00-1234-5',
      signatura: 'LIT-QUI-01',
      disponible: true,
      ejemplares: '2 Libres',
      formatos: ['Papel', 'Braille', 'Audio DAISY'],
      portada: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2vrCoHFNUe24ot0lX0myI75-doI_2fc2oYm4rOIwjkbkvZ0MCOgaLj_WpyXwlxtZ8OQLNll-mvrOoQQs3od7M-iaLHp0kDqcTrj_dn3Z0z6ZJ3ZudYCaQYMsvH6WH4N98jL-x0KYvmynwkvR-hwLM8bxzOnEG-TyfQOxpHboVRi2YX3aVkNzvnsaTWUhy0fU9N4Z7bdToKWpn4d6GZkxLoCBiLrfvvc1d9W4PVOI_-vK5BGy1PYwYOg',
      accesibilidad: 'Transcripción táctil en 6 tomos braille de punto endurecido, archivo DAISY navegable y audiolibro narrado en voz humana.',
      sinopsis: 'Las célebres aventuras del hidalgo Alonso Quijano, quien pierde el juicio a causa de las novelas de caballería y decide recorrer España en busca de justicia, honra y la defensa de los desvalidos.'
    },
    {
      id: 'book-2',
      titulo: 'Economía Política',
      autor: 'Varios Autores',
      anio: '2021',
      genero: 'Economía',
      editorial: 'Ediciones Universitarias SaBré',
      isbn: '978-950-12-8890-1',
      signatura: 'ECO-POL-04',
      disponible: true,
      ejemplares: '4 Libres',
      formatos: ['Papel', 'PDF Accesible', 'Lectura de Pantalla'],
      portada: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      accesibilidad: 'Documento estructurado con etiquetas HTML5/PDF accesible, alto contraste de contraste tipográfico e interpretación de gráficos para lectores de pantalla NVDA y JAWS.',
      sinopsis: 'Tratado integral de los principios fundamentales de la economía política, valor, producción, distribución e instituciones económicas en el contexto moderno sudamericano.'
    },
    {
      id: 'book-3',
      titulo: 'Cien Años de Soledad',
      autor: 'Gabriel García Márquez',
      anio: '1967',
      genero: 'Narrativa',
      editorial: 'Editorial Sudamericana',
      isbn: '978-950-07-1012-3',
      signatura: 'LIT-GGM-02',
      disponible: false,
      ejemplares: 'En Préstamo (Reserva activa)',
      formatos: ['Papel', 'Audiolibro'],
      portada: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
      accesibilidad: 'Versión sonorizada con locución profesional humana en tono neutro y marcadores de capítulo navegables.',
      sinopsis: 'La épica historia de la familia Buendía a lo largo de siete generaciones en el deslumbrante y mágico pueblo de Macondo.'
    },
    {
      id: 'book-4',
      titulo: 'Poesía Completa',
      autor: 'Alfonsina Storni',
      anio: '1938',
      genero: 'Poesía',
      editorial: 'Fondo Poético SaBré',
      isbn: '978-987-15-4433-2',
      signatura: 'POE-STO-01',
      disponible: true,
      ejemplares: '1 Libre',
      formatos: ['Papel', 'Braille', 'Macroetiqueta'],
      portada: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
      accesibilidad: 'Edición en macrotipo (fuente 18pt) para baja visión y tomo completo embossing braille.',
      sinopsis: 'Compilación definitiva de la obra lírica de Alfonsina Storni, explorando la sensibilidad, la modernidad urbana, la naturaleza y la condición humana.'
    }
  ];

  // Elementos DOM de la pantalla
  const searchBtn = document.getElementById('detalle-search-btn');
  const clearBtn = document.getElementById('detalle-clear-btn');
  const resultsCount = document.getElementById('detalle-results-count');
  const resetListBtn = document.getElementById('detalle-reset-list-btn');
  const emptyState = document.getElementById('detalle-empty-state');
  const filterBtns = document.querySelectorAll('.detalle-filter-btn');

  // Elementos DOM del detalle
  const elPortada = document.getElementById('detalle-portada');
  const elTitulo = document.getElementById('detalle-titulo');
  const elAutor = document.getElementById('detalle-autor');
  const elAnio = document.getElementById('detalle-anio');
  const elGenero = document.getElementById('detalle-genero');
  const elEditorial = document.getElementById('detalle-editorial');
  const elIsbnTop = document.getElementById('detalle-isbn-top');
  const elSignatura = document.getElementById('detalle-signatura');
  const elDisponibilidadTexto = document.getElementById('detalle-disponibilidad-texto');
  const elEjemplaresCount = document.getElementById('detalle-ejemplares-count');
  const elAccesibilidadDesc = document.getElementById('detalle-accesibilidad-desc');
  const elSinopsis = document.getElementById('detalle-sinopsis');
  const elFormatosBadges = document.getElementById('detalle-formatos-badges');

  // Modal
  const modal = document.getElementById('detalle-modal-confirmacion');
  const modalTitulo = document.getElementById('detalle-modal-titulo');
  const modalMensaje = document.getElementById('detalle-modal-mensaje');
  const modalClose = document.getElementById('detalle-modal-close');
  const modalAccept = document.getElementById('detalle-modal-accept');

  // Botones de Acción
  const btnSolicitar = document.getElementById('detalle-btn-solicitar');
  const btnReservar = document.getElementById('detalle-btn-reservar');

  let libroSeleccionadoId = 'book-1'; // Don Quijote por defecto

  // Función para renderizar tarjetas de la lista de resultados
  function renderizarResultados(lista) {
    resultsContainer.innerHTML = '';

    if (lista.length === 0) {
      emptyState.classList.remove('hidden');
      resultsCount.textContent = '0 Obras Encontradas';
      return;
    }

    emptyState.classList.add('hidden');
    resultsCount.textContent = `${lista.length} ${lista.length === 1 ? 'Obra Encontrada' : 'Obras Disponibles'}`;

    lista.forEach(libro => {
      const isSelected = libro.id === libroSeleccionadoId;
      const card = document.createElement('article');
      card.className = `detalle-item-card bg-surface-container p-space-sm rounded-lg flex gap-space-sm items-center shadow-md cursor-pointer border ${isSelected ? 'selected-book border-primary-container' : 'border-transparent'}`;
      card.setAttribute('data-id', libro.id);

      card.innerHTML = `
        <img class="w-16 h-24 object-cover rounded-lg shrink-0 bg-surface-container-highest" src="${libro.portada}" alt="Portada de ${libro.titulo}">
        <div class="flex flex-col flex-1 min-w-0">
          <div class="flex items-center gap-space-xs mb-1">
            <span class="px-2 py-0.5 rounded-lg ${libro.disponible ? 'bg-primary-container text-on-primary' : 'bg-surface-container-highest text-on-surface-variant'} font-button-text text-[11px] uppercase tracking-wide">
              ${libro.disponible ? 'Disponible' : 'Consultar'}
            </span>
            <span class="font-body-sm text-body-sm text-on-surface-variant">${libro.signatura}</span>
          </div>
          <h2 class="font-title-card text-title-card text-primary truncate leading-tight">${libro.titulo}</h2>
          <p class="font-body-sm text-body-sm text-on-surface-variant truncate">${libro.autor} (${libro.anio})</p>
          <div class="flex items-center gap-space-xs mt-2">
            ${libro.formatos.map(f => `<span class="px-1.5 py-0.5 rounded bg-surface-container-high text-primary-container font-label-uppercase text-[11px]">${f}</span>`).join('')}
          </div>
        </div>
        <button type="button" aria-label="Ver detalle de ${libro.titulo}" class="w-10 h-10 rounded-lg ${isSelected ? 'bg-primary-container text-on-primary' : 'bg-surface-container-high text-primary'} flex items-center justify-center shrink-0 transition-colors">
          <span class="material-symbols-outlined text-[22px]">${isSelected ? 'check' : 'arrow_forward'}</span>
        </button>
      `;

      card.addEventListener('click', () => {
        seleccionarLibro(libro.id);
      });

      resultsContainer.appendChild(card);
    });
  }

  // Mostrar el detalle completo de un libro
  function seleccionarLibro(id) {
    const libro = librosCatalogo.find(l => l.id === id);
    if (!libro) return;

    libroSeleccionadoId = id;

    // Actualizar visualmente la selección en la lista
    document.querySelectorAll('.detalle-item-card').forEach(c => {
      if (c.getAttribute('data-id') === id) {
        c.classList.add('selected-book', 'border-primary-container');
        c.classList.remove('border-transparent');
      } else {
        c.classList.remove('selected-book', 'border-primary-container');
        c.classList.add('border-transparent');
      }
    });

    // Actualizar campos de la tarjeta de detalle
    elPortada.style.opacity = '0.3';
    setTimeout(() => {
      elPortada.src = libro.portada;
      elPortada.alt = `Portada de ${libro.titulo}`;
      elPortada.style.opacity = '1';
    }, 150);

    elTitulo.textContent = libro.titulo;
    elAutor.textContent = libro.autor;
    elAnio.textContent = libro.anio;
    elGenero.textContent = libro.genero;
    elEditorial.textContent = libro.editorial;
    elIsbnTop.textContent = `ISBN: ${libro.isbn}`;
    elSignatura.textContent = libro.signatura;
    elDisponibilidadTexto.textContent = libro.disponible ? 'Disponible en sala y préstamo' : 'En uso / Reserva activa';
    elEjemplaresCount.textContent = libro.ejemplares;
    elAccesibilidadDesc.textContent = libro.accesibilidad;
    elSinopsis.textContent = libro.sinopsis;

    // Actualizar Badges de formato
    elFormatosBadges.innerHTML = libro.formatos.map(f => `
      <span class="px-2.5 py-1 rounded-lg bg-surface-container-lowest/90 text-primary-container font-button-text text-body-sm uppercase tracking-wide shadow">
        ${f}
      </span>
    `).join('');

    // Habilitar/Deshabilitar botón de solicitar según disponibilidad
    if (!libro.disponible) {
      btnSolicitar.disabled = true;
      btnSolicitar.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      btnSolicitar.disabled = false;
      btnSolicitar.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    // Desplazar suavemente si es en pantalla pequeña
    if (window.innerWidth < 768) {
      detalleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Filtrar libros por término de búsqueda
  function ejecutarBusqueda() {
    const term = searchInput.value.trim().toLowerCase();
    
    if (term.length > 0) {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }

    const resultados = librosCatalogo.filter(libro => 
      libro.titulo.toLowerCase().includes(term) ||
      libro.autor.toLowerCase().includes(term) ||
      libro.genero.toLowerCase().includes(term) ||
      libro.isbn.toLowerCase().includes(term)
    );

    renderizarResultados(resultados);
  }

  // Event Listeners
  searchInput.addEventListener('input', ejecutarBusqueda);

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.add('hidden');
    renderizarResultados(librosCatalogo);
  });

  searchBtn.addEventListener('click', ejecutarBusqueda);

  resetListBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.add('hidden');
    filterBtns.forEach(b => b.classList.remove('active-filter', 'bg-primary-container', 'text-on-primary'));
    filterBtns[0].classList.add('active-filter', 'bg-primary-container', 'text-on-primary');
    renderizarResultados(librosCatalogo);
  });

  // Filtros por categoría
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active-filter');
        b.classList.replace('bg-primary-container', 'bg-surface-container-high');
        b.classList.replace('text-on-primary', 'text-on-surface');
      });

      btn.classList.add('active-filter');
      btn.classList.replace('bg-surface-container-high', 'bg-primary-container');
      btn.classList.replace('text-on-surface', 'text-on-primary');

      const filterCategory = btn.getAttribute('data-filter');
      if (filterCategory === 'todos') {
        renderizarResultados(librosCatalogo);
      } else {
        const filtrados = librosCatalogo.filter(l => l.genero.toLowerCase() === filterCategory.toLowerCase());
        renderizarResultados(filtrados);
      }
    });
  });

  // Modal handlers (Prototipo)
  function abrirModal(titulo, mensaje) {
    modalTitulo.textContent = titulo;
    modalMensaje.textContent = mensaje;
    modal.classList.remove('hidden');
  }

  function cerrarModal() {
    modal.classList.add('hidden');
  }

  modalClose.addEventListener('click', cerrarModal);
  modalAccept.addEventListener('click', cerrarModal);

  btnSolicitar.addEventListener('click', () => {
    const libro = librosCatalogo.find(l => l.id === libroSeleccionadoId);
    if (libro && libro.disponible) {
      abrirModal('Préstamo Solicitado', `Haz solicitado el libro "${libro.titulo}". Podrás retirarlo en el mostrador central de la Biblioteca SaBré presentándote con tu carnet.`);
    }
  });

  btnReservar.addEventListener('click', () => {
    const libro = librosCatalogo.find(l => l.id === libroSeleccionadoId);
    if (libro) {
      abrirModal('Reserva Confirmada', `Se ha registrado la reserva de "${libro.titulo}". Te avisaremos cuando tu ejemplar esté listo.`);
    }
  });

  // Inicialización por defecto
  renderizarResultados(librosCatalogo);
  seleccionarLibro('book-1');
}

// Ejecución al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  initDetalleLibroInteractions();
});


/* ==========================================================================
   PANTALLA 6: INTERACCIONES DE COMUNIDAD, VALORACIONES Y SUGERENCIAS
   ========================================================================== */

function initComunidadInteractions() {
  // Comprobación de que estamos en la pantalla de Comunidad
  const panelExp = document.getElementById('panel-experiencias');
  if (!panelExp) return;

  let currentSelectedScore = 0;

  // Toast propio de Comunidad
  const communityToast = document.getElementById('community-toast');
  const communityToastMessage = document.getElementById('community-toast-message');

  function showCommunityToastLocal(message) {
    if (!communityToast || !communityToastMessage) return;

    communityToastMessage.textContent = message;
    communityToast.classList.remove('hidden');
    communityToast.classList.add('flex');

    setTimeout(() => {
      communityToast.classList.add('hidden');
      communityToast.classList.remove('flex');
    }, 4000);
  }

  // 1. Pestañas: Experiencias, Valoraciones y Sugerencias
  const tabExp = document.getElementById('tab-community-exp');
  const tabVal = document.getElementById('tab-community-val');
  const tabSug = document.getElementById('tab-community-sug');

  const panelVal = document.getElementById('panel-valoraciones');
  const panelSug = document.getElementById('panel-sugerencias');

  function switchCommunityTabInternal(activeTab) {
    panelExp.classList.add('hidden');
    panelExp.classList.remove('flex');

    if (panelVal) {
      panelVal.classList.add('hidden');
      panelVal.classList.remove('flex');
    }

    if (panelSug) {
      panelSug.classList.add('hidden');
      panelSug.classList.remove('flex');
    }

    [tabExp, tabVal, tabSug].forEach(btn => {
      if (!btn) return;

      btn.setAttribute('aria-selected', 'false');
      btn.classList.remove('bg-primary-container', 'text-on-primary');
      btn.classList.add('bg-transparent', 'text-secondary');
    });

    if (activeTab === 'experiencias' && tabExp) {
      panelExp.classList.remove('hidden');
      panelExp.classList.add('flex');

      tabExp.setAttribute('aria-selected', 'true');
      tabExp.classList.add('bg-primary-container', 'text-on-primary');
      tabExp.classList.remove('bg-transparent', 'text-secondary');

    } else if (activeTab === 'valoraciones' && panelVal && tabVal) {
      panelVal.classList.remove('hidden');
      panelVal.classList.add('flex');

      tabVal.setAttribute('aria-selected', 'true');
      tabVal.classList.add('bg-primary-container', 'text-on-primary');
      tabVal.classList.remove('bg-transparent', 'text-secondary');

    } else if (activeTab === 'sugerencias' && panelSug && tabSug) {
      panelSug.classList.remove('hidden');
      panelSug.classList.add('flex');

      tabSug.setAttribute('aria-selected', 'true');
      tabSug.classList.add('bg-primary-container', 'text-on-primary');
      tabSug.classList.remove('bg-transparent', 'text-secondary');
    }
  }

  if (tabExp) {
    tabExp.addEventListener('click', () => {
      switchCommunityTabInternal('experiencias');
    });
  }

  if (tabVal) {
    tabVal.addEventListener('click', () => {
      switchCommunityTabInternal('valoraciones');
    });
  }

  if (tabSug) {
    tabSug.addEventListener('click', () => {
      switchCommunityTabInternal('sugerencias');
    });
  }

  // 2. Abrir y cerrar formulario para compartir experiencia
  const btnOpenShare = document.getElementById('btn-open-share-modal');
  const btnCloseShare = document.getElementById('btn-close-share-modal');
  const shareModalBox = document.getElementById('share-modal-box');

  if (btnOpenShare && shareModalBox) {
    btnOpenShare.addEventListener('click', () => {
      shareModalBox.classList.toggle('hidden');
      shareModalBox.classList.toggle('flex');
    });
  }

  if (btnCloseShare && shareModalBox) {
    btnCloseShare.addEventListener('click', () => {
      shareModalBox.classList.add('hidden');
      shareModalBox.classList.remove('flex');
    });
  }

  // 3. Publicar experiencia
  const btnPublishExp = document.getElementById('btn-publish-experience');

  if (btnPublishExp) {
    btnPublishExp.addEventListener('click', () => {
      const textInput = document.getElementById('experience-text');
      const categorySelect = document.getElementById('experience-category');

      const text = textInput ? textInput.value.trim() : '';
      const cat = categorySelect ? categorySelect.value : 'General';

      if (!text) {
        showCommunityToastLocal('Escribe tu comentario antes de publicar.');
        return;
      }

      const feed = document.getElementById('experience-feed');

      if (feed) {
        const newCard = document.createElement('article');

        newCard.className =
          'bg-surface-container-low p-space-sm rounded-xl flex flex-col space-y-space-xs shadow-sm';

        newCard.innerHTML = `
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-space-xs">
              <div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-on-primary text-[22px]">person</span>
              </div>

              <div class="flex flex-col">
                <span class="font-button-text text-button-text text-primary-container">
                  @LectorComunitario (Tú)
                </span>
                <span class="font-body-sm text-body-sm text-on-surface-variant">
                  Publicado ahora
                </span>
              </div>
            </div>

            <span class="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-label-uppercase text-label-uppercase">
              ${cat}
            </span>
          </div>

          <p class="font-body-base text-body-base text-on-surface pt-0.5">
            "${text}"
          </p>

          <div class="flex items-center justify-between pt-space-xs text-on-surface-variant">
            <button class="btn-like-post flex items-center gap-1 text-primary-container hover:opacity-80">
              <span class="material-symbols-outlined text-[18px]"
                    style="font-variation-settings: 'FILL' 1;">
                thumb_up
              </span>

              <span class="font-body-sm text-body-sm font-bold">
                <span class="like-count">1</span> coincidió
              </span>
            </button>

            <span class="font-body-sm text-body-sm text-secondary">
              Aporte Verificado
            </span>
          </div>
        `;

        feed.insertBefore(newCard, feed.firstChild);

        const newLikeBtn = newCard.querySelector('.btn-like-post');

        if (newLikeBtn) {
          newLikeBtn.addEventListener('click', function () {
            const countSpan = this.querySelector('.like-count');

            if (countSpan) {
              countSpan.textContent =
                parseInt(countSpan.textContent) + 1;
            }
          });
        }
      }

      if (textInput) {
        textInput.value = '';
      }

      if (shareModalBox) {
        shareModalBox.classList.add('hidden');
        shareModalBox.classList.remove('flex');
      }

      showCommunityToastLocal('¡Tu experiencia ha sido publicada con éxito!');
    });
  }

  // 4. Me gusta en publicaciones existentes
  const existingLikes = document.querySelectorAll('.btn-like-post');

  existingLikes.forEach(btn => {
    btn.addEventListener('click', function () {
      const countSpan = this.querySelector('.like-count');

      if (countSpan) {
        countSpan.textContent =
          parseInt(countSpan.textContent) + 1;
      }
    });
  });

  // 5. Selección de estrellas
  const starBtns = document.querySelectorAll('.star-btn');

  starBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      currentSelectedScore =
        parseInt(this.getAttribute('data-score')) || 0;

      starBtns.forEach((sBtn, index) => {
        const starIcon =
          sBtn.querySelector('.material-symbols-outlined');

        if (index < currentSelectedScore) {
          sBtn.classList.add('active-star');

          if (starIcon) {
            starIcon.style.fontVariationSettings = "'FILL' 1";
          }
        } else {
          sBtn.classList.remove('active-star');

          if (starIcon) {
            starIcon.style.fontVariationSettings = "'FILL' 0";
          }
        }
      });
    });
  });

  // 6. Enviar valoración
  const btnSubmitRating =
    document.getElementById('btn-submit-rating');

  if (btnSubmitRating) {
    btnSubmitRating.addEventListener('click', () => {
      const selectItem =
        document.getElementById('select-item-rating');

      const itemName =
        selectItem ? selectItem.value : 'el elemento elegido';

      if (currentSelectedScore === 0) {
        showCommunityToastLocal(
          'Por favor selecciona entre 1 y 5 estrellas.'
        );
        return;
      }

      showCommunityToastLocal(
        `¡Registraste ${currentSelectedScore} estrellas para "${itemName}"!`
      );
    });
  }

  // 7. Enviar sugerencia
  const btnSubmitSuggestion =
    document.getElementById('btn-submit-suggestion');

  if (btnSubmitSuggestion) {
    btnSubmitSuggestion.addEventListener('click', () => {
      const titleInput =
        document.getElementById('suggestion-title');

      const bodyInput =
        document.getElementById('suggestion-body');

      const title =
        titleInput ? titleInput.value.trim() : '';

      const body =
        bodyInput ? bodyInput.value.trim() : '';

      if (!title || !body) {
        showCommunityToastLocal(
          'Completa el título y detalle de la sugerencia.'
        );
        return;
      }

      if (titleInput) {
        titleInput.value = '';
      }

      if (bodyInput) {
        bodyInput.value = '';
      }

      showCommunityToastLocal(
        '¡Sugerencia recibida con éxito por el comité de biblioteca!'
      );
    });
  }

  // 8. Cerrar Toast
  const btnCloseToast =
    document.getElementById('btn-close-community-toast');

  if (btnCloseToast) {
    btnCloseToast.addEventListener('click', () => {
      if (communityToast) {
        communityToast.classList.add('hidden');
        communityToast.classList.remove('flex');
      }
    });
  }
}


// Inicializar solamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  initComunidadInteractions();
});

/* ==========================================================================
   PANTALLA 7: HISTORIAL Y ALERTAS DE PRÉSTAMO
   ========================================================================== */
(function () {
  'use strict';

  function initHistorialInteractions() {
    const mainHistorial = document.querySelector('main[data-pantalla="historial"]');
    
    // Si no estamos en la pantalla de Historial, detener ejecución
    if (!mainHistorial) return;

    // 1. CREACIÓN DEL TOAST EN EL DOM
    let toastElement = document.getElementById('historial-toast-notificacion');
    let toastTimer = null;

    if (!toastElement) {
      toastElement = document.createElement('div');
      toastElement.id = 'historial-toast-notificacion';
      toastElement.className = 'historial-toast-container';
      toastElement.setAttribute('role', 'status');
      toastElement.setAttribute('aria-live', 'polite');
      toastElement.innerHTML = `
        <span class="material-symbols-outlined historial-toast-icono">info</span>
        <span class="historial-toast-texto" id="historial-toast-mensaje"></span>
      `;
      document.body.appendChild(toastElement);
    }

    function mostrarToastHistorial(mensaje) {
      const textoElemento = document.getElementById('historial-toast-mensaje');
      if (textoElemento) {
        textoElemento.textContent = mensaje;
      }

      toastElement.classList.add('historial-toast-visible');

      if (toastTimer) {
        clearTimeout(toastTimer);
      }

      toastTimer = setTimeout(function () {
        toastElement.classList.remove('historial-toast-visible');
      }, 3000);
    }

    // 2. LÓGICA DE FILTROS
    const botonesFiltro = mainHistorial.querySelectorAll('[data-filtro]');
    const registrosPrestamo = mainHistorial.querySelectorAll('article[data-estado-prestamo]');

    botonesFiltro.forEach(function (boton) {
      boton.addEventListener('click', function () {
        const filtroSeleccionado = this.getAttribute('data-filtro');

        // Actualizar estilos de los botones de filtro
        botonesFiltro.forEach(function (btn) {
          btn.classList.remove('historial-filtro-btn-activo', 'bg-primary-container', 'text-on-primary-container');
          btn.classList.add('bg-surface-container', 'text-on-surface-variant');
        });

        this.classList.remove('bg-surface-container', 'text-on-surface-variant');
        this.classList.add('historial-filtro-btn-activo');

        // Ocultar / Mostrar registros según el filtro aplicado
        registrosPrestamo.forEach(function (registro) {
          const estadoRegistro = registro.getAttribute('data-estado-prestamo');

          if (filtroSeleccionado === 'todos' || estadoRegistro === filtroSeleccionado) {
            registro.classList.remove('historial-registro-oculto');
          } else {
            registro.classList.add('historial-registro-oculto');
          }
        });
      });
    });

    // 3. DELEGACIÓN DE EVENTOS PARA BOTONES DE ACCIÓN
    mainHistorial.addEventListener('click', function (evento) {
      const botonAccion = evento.target.closest('[data-accion]');
      if (!botonAccion) return;

      const tipoAccion = botonAccion.getAttribute('data-accion');
      const tituloLibro = botonAccion.getAttribute('data-libro-titulo') || 'el libro';

      if (tipoAccion === 'ver-prestamo') {
        mostrarToastHistorial('Consultando préstamo de "' + tituloLibro + '".');
      } else if (tipoAccion === 'renovar-prestamo') {
        mostrarToastHistorial('Solicitud de renovación enviada para "' + tituloLibro + '".');
      } else if (tipoAccion === 'ver-historial-completo') {
        mostrarToastHistorial('Consultando el historial completo de préstamos...');
      }
    });
  }

  // Inicializar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHistorialInteractions);
  } else {
    initHistorialInteractions();
  }
})();

// Menú lateral de Biblioteca SaBré
document.addEventListener('DOMContentLoaded', () => {
    const botonAbrir = document.getElementById('boton-menu');
    const botonCerrar = document.getElementById('cerrar-menu');
    const menu = document.getElementById('menu-lateral');
    const fondo = document.getElementById('fondo-menu');

    if (!botonAbrir || !botonCerrar || !menu || !fondo) return;

    function abrirMenu() {
        menu.classList.add('menu-abierto');
        fondo.hidden = false;
        menu.removeAttribute('inert');
        menu.setAttribute('aria-hidden', 'false');
        botonAbrir.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-bloqueo-scroll');
        botonCerrar.focus();
    }

    function cerrarMenu() {
        menu.classList.remove('menu-abierto');
        fondo.hidden = true;
        menu.setAttribute('inert', '');
        menu.setAttribute('aria-hidden', 'true');
        botonAbrir.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-bloqueo-scroll');
        botonAbrir.focus();
    }

    botonAbrir.addEventListener('click', abrirMenu);
    botonCerrar.addEventListener('click', cerrarMenu);
    fondo.addEventListener('click', cerrarMenu);

    document.addEventListener('keydown', evento => {
        if (evento.key === 'Escape' && menu.classList.contains('menu-abierto')) {
            cerrarMenu();
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const btnMenu = document.getElementById("btn-menu"); // Identificador del botón de las tres rayitas
    const menuLateral = document.getElementById("menu-lateral"); // Contenedor del menú desplegable
    const btnCerrar = document.getElementById("cerrar-menu"); // Botón 'X' para cerrar

    if (btnMenu && menuLateral) {
        btnMenu.addEventListener("click", function() {
            menuLateral.classList.toggle("activo"); // Cambia la clase para mostrarlo/ocultarlo
        });
    }

    if (btnCerrar && menuLateral) {
        btnCerrar.addEventListener("click", function() {
            menuLateral.classList.remove("activo");
        });
    }
});