document.addEventListener('DOMContentLoaded', () => {
    const boton = document.querySelector('.btn-ayudante');

    if (!boton) {
        console.error('No se encontró el botón del Ayudante de Biblioteca.');
        return;
    }

    // Evita crear más de una ventana.
    if (document.getElementById('ventana-ayudante')) return;

    let modalidad = null;
    let intentosFallidos = 0;
    let tamanoLetra = 16;
    let reconocimiento = null;

    const admiteVoz = (
        'speechSynthesis' in window &&
        ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    );

    const ventana = document.createElement('section');
    ventana.id = 'ventana-ayudante';
    ventana.className = 'ayudante-panel';
    ventana.setAttribute('role', 'dialog');
    ventana.setAttribute('aria-modal', 'false');
    ventana.setAttribute('aria-labelledby', 'titulo-ayudante');
    ventana.setAttribute('aria-label', 'Ayudante de Biblioteca');
    ventana.hidden = true;

    ventana.innerHTML = `
        <header class="ayudante-cabecera">
            <h2 id="titulo-ayudante">Ayudante de Biblioteca</h2>
            <button type="button" id="cerrar-ayudante"
                class="ayudante-boton-icono" aria-label="Cerrar ayudante">
                Cerrar ✕
            </button>
        </header>

        <div class="ayudante-herramientas" aria-label="Opciones de accesibilidad">
            <button type="button" id="letra-menor" class="ayudante-boton">
                A− Reducir letra
            </button>
            <button type="button" id="letra-mayor" class="ayudante-boton">
                A+ Aumentar letra
            </button>
            <button type="button" id="cambiar-modalidad" class="ayudante-boton">
                Cambiar modalidad
            </button>
        </div>

        <div id="mensajes-ayudante" class="ayudante-mensajes"
            aria-live="polite" aria-relevant="additions text">
        </div>

        <div id="opciones-modalidad" class="ayudante-opciones">
            <p>¡Hola! Bienvenido/a a la Biblioteca SaBré.</p>
            <p>Elegí cómo querés interactuar con el ayudante.</p>
            <button type="button" class="ayudante-boton ayudante-boton-principal"
                data-modalidad="voz">
                A. Interactuar por voz
            </button>
            <button type="button" class="ayudante-boton ayudante-boton-principal"
                data-modalidad="texto">
                B. Interactuar por texto
            </button>
            <p class="ayudante-nota">
                Podés cambiar de modalidad cuando quieras.
            </p>
        </div>

        <div id="zona-consulta" class="ayudante-consulta" hidden>
            <div id="menu-ayudante" class="ayudante-menu" hidden>
                <p>¿En qué te puedo ayudar? Elegí una opción:</p>
                <button type="button" class="ayudante-boton" data-opcion="A">
                    A. Buscar libros en el catálogo
                </button>
                <button type="button" class="ayudante-boton" data-opcion="B">
                    B. Consultar préstamos y devoluciones
                </button>
                <button type="button" class="ayudante-boton" data-opcion="C">
                    C. Consultar audiolibros
                </button>
                <button type="button" class="ayudante-boton" data-opcion="D">
                    D. Consultar recursos en braille
                </button>
                <button type="button" class="ayudante-boton" data-opcion="E">
                    E. Ayuda para usar la biblioteca virtual
                </button>
                <button type="button" class="ayudante-boton" data-opcion="F">
                    F. Consultar estado de turno
                </button>
                <button type="button" class="ayudante-boton" data-opcion="G">
                    G. Hablar con un ayudante humano
                </button>
                <button type="button" class="ayudante-boton" data-opcion="H">
                    H. Contactar por WhatsApp
                </button>
            </div>

            <div class="ayudante-microfono">
                <button type="button" id="activar-microfono"
                    class="ayudante-boton ayudante-boton-principal">
                    Hablar ahora
                </button>
                <p id="estado-microfono" class="ayudante-nota">
                    Para usar la voz, presioná «Hablar ahora» y autorizá el micrófono
                    si el navegador te lo solicita.
                </p>
            </div>

            <form id="formulario-ayudante" class="ayudante-formulario">
                <label for="entrada-ayudante">Escribí tu consulta</label>
                <div class="ayudante-fila">
                    <input id="entrada-ayudante" name="consulta" type="text"
                        autocomplete="off" required
                        placeholder="Ej.: buscar un libro">
                    <button type="submit"
                        class="ayudante-boton ayudante-boton-principal">
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(ventana);

    const mensajes = ventana.querySelector('#mensajes-ayudante');
    const opcionesModalidad = ventana.querySelector('#opciones-modalidad');
    const zonaConsulta = ventana.querySelector('#zona-consulta');
    const menu = ventana.querySelector('#menu-ayudante');
    const formulario = ventana.querySelector('#formulario-ayudante');
    const entrada = ventana.querySelector('#entrada-ayudante');
    const botonMicrofono = ventana.querySelector('#activar-microfono');
    const estadoMicrofono = ventana.querySelector('#estado-microfono');

    function agregarMensaje(autor, texto) {
        const parrafo = document.createElement('p');
        parrafo.className = 'ayudante-mensaje';
        parrafo.textContent = `${autor}: ${texto}`;
        mensajes.appendChild(parrafo);
        mensajes.scrollTop = mensajes.scrollHeight;

        return texto;
    }

    function hablar(texto) {
        if (modalidad !== 'voz' || !('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();

        const mensaje = new SpeechSynthesisUtterance(texto);
        mensaje.lang = 'es-AR';
        mensaje.rate = 0.95;

        window.speechSynthesis.speak(mensaje);
    }

    function responder(texto) {
        agregarMensaje('Ayudante', texto);
        hablar(texto);
    }

    function detenerReconocimiento() {
        if (reconocimiento) {
            reconocimiento.onresult = null;
            reconocimiento.onerror = null;
            reconocimiento.onend = null;

            try {
                reconocimiento.stop();
            } catch (error) {
                // Puede que el reconocimiento ya haya terminado.
            }

            reconocimiento = null;
        }

        botonMicrofono.disabled = false;
    }

    function elegirModalidad(nuevaModalidad) {
        detenerReconocimiento();

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        modalidad = nuevaModalidad;
        opcionesModalidad.hidden = true;
        zonaConsulta.hidden = false;
        menu.hidden = false;
        formulario.hidden = nuevaModalidad === 'voz';

        botonMicrofono.hidden = nuevaModalidad !== 'voz';

        if (nuevaModalidad === 'voz') {
            estadoMicrofono.textContent = admiteVoz
                ? 'Presioná «Hablar ahora» para hacer una consulta por voz.'
                : 'Este navegador no admite reconocimiento de voz. Podés escuchar las respuestas y usar el teclado para consultar.';

            responder(
                'Elegiste la modalidad por voz. Podés decir una letra de la A a la H o el nombre de la opción. Para hablar, presioná el botón del micrófono.'
            );

            entrada.blur();
            botonMicrofono.focus();
        } else {
            estadoMicrofono.textContent = 'Modalidad de texto activa.';
            agregarMensaje(
                'Ayudante',
                'Elegiste la modalidad de texto. Podés usar los botones o escribir una consulta.'
            );
            entrada.focus();
        }
    }

    function procesarOpcion(opcion) {
        const respuestas = {
            A: 'Para buscar libros, ingresá al catálogo de la biblioteca y buscá por título o autor. La búsqueda directa desde este ayudante todavía debe conectarse al catálogo.',
            B: 'Para consultar préstamos y devoluciones, revisá la sección correspondiente de la biblioteca. La consulta automática de préstamos todavía debe conectarse al sistema.',
            C: 'Podés explorar los audiolibros disponibles en la sección de recursos de audio. El catálogo de audiolibros todavía debe conectarse a este ayudante.',
            D: 'Consultá la sección Braille para conocer los recursos disponibles. El inventario específico debe conectarse para informar qué materiales hay.',
            E: 'Podés navegar por las secciones de la biblioteca virtual usando el menú principal. Si me indicás qué necesitás hacer, puedo orientarte.',
            F: 'La consulta de turnos todavía no está conectada al sistema. No puedo confirmar un turno ni consultar su estado desde aquí.',
            G: 'La derivación a un ayudante humano todavía debe conectarse con el sistema de atención. No se creó ningún caso ni se agregó una solicitud a una cola.',
            H: 'Para abrir WhatsApp necesitamos configurar el número oficial de atención de la biblioteca. No voy a abrir un contacto sin verificar.'
        };

        const respuesta = respuestas[opcion];

        if (!respuesta) return;

        const textoOpcion = menu.querySelector(`[data-opcion="${opcion}"]`);
        if (textoOpcion) {
            agregarMensaje('Vos', textoOpcion.textContent.trim());
        }

        responder(respuesta);

        if (opcion === 'G' || opcion === 'H' || opcion === 'F') {
            agregarMensaje(
                'Aviso',
                'Esta función necesita conectarse al sistema de la biblioteca para operar de forma real.'
            );
        }
    }

    function interpretarConsulta(texto) {
        const consulta = texto.toLocaleLowerCase('es-AR').trim();

        if (!consulta) return;

        agregarMensaje('Vos', texto);

        const letras = consulta.match(/^[a-h]$/i);
        if (letras) {
            procesarOpcion(letras[0].toUpperCase());
            return;
        }

        if (consulta.includes('préstamo') || consulta.includes('prestamo') ||
            consulta.includes('devolución') || consulta.includes('devolver')) {
            procesarOpcion('B');
        } else if (consulta.includes('catálogo') || consulta.includes('catalogo') ||
                   consulta.includes('libro') || consulta.includes('libros') ||
                   consulta.includes('autor')) {
            procesarOpcion('A');
        } else if (consulta.includes('audiolibro') || consulta.includes('audio libro') ||
                   consulta.includes('audio')) {
            procesarOpcion('C');
        } else if (consulta.includes('braille')) {
            procesarOpcion('D');
        } else if (consulta.includes('turno')) {
            procesarOpcion('F');
        } else if (consulta.includes('humano') || consulta.includes('persona') ||
                   consulta.includes('ayudante real') || consulta.includes('operador')) {
            procesarOpcion('G');
        } else if (consulta.includes('whatsapp')) {
            procesarOpcion('H');
        } else if (consulta.includes('hola') || consulta.includes('buenas')) {
            intentosFallidos = 0;
            responder('¡Hola! Puedo ayudarte con el catálogo, los préstamos, los audiolibros, el braille y la biblioteca virtual.');
        } else if (consulta.includes('ayuda') || consulta.includes('cómo') ||
                   consulta.includes('como')) {
            intentosFallidos = 0;
            responder('Podés elegir una opción del menú A a H o escribir qué necesitás consultar.');
        } else {
            intentosFallidos += 1;

            if (intentosFallidos >= 2) {
                responder('No pude identificar tu consulta dos veces. Podés elegir una opción del menú o solicitar atención humana. La derivación humana todavía no está conectada.');
                intentosFallidos = 0;
            } else {
                responder('No entendí la consulta. Probá con libros, préstamos, audiolibros, braille, turnos o atención humana.');
            }
        }
    }

    function escuchar() {
        const ConstructorVoz =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!ConstructorVoz) {
            estadoMicrofono.textContent =
                'El navegador no admite reconocimiento de voz. Usá el campo de texto.';
            return;
        }

        detenerReconocimiento();

        reconocimiento = new ConstructorVoz();
        reconocimiento.lang = 'es-AR';
        reconocimiento.continuous = false;
        reconocimiento.interimResults = false;
        reconocimiento.maxAlternatives = 1;

        reconocimiento.onstart = () => {
            botonMicrofono.disabled = true;
            estadoMicrofono.textContent = 'Te estoy escuchando. Hablá ahora.';
        };

        reconocimiento.onresult = (evento) => {
            const texto = evento.results[0][0].transcript;
            estadoMicrofono.textContent = `Escuché: ${texto}`;
            interpretarConsulta(texto);
        };

        reconocimiento.onerror = (evento) => {
            if (evento.error === 'not-allowed' || evento.error === 'service-not-allowed') {
                estadoMicrofono.textContent =
                    'No hay permiso para usar el micrófono. Revisá los permisos del navegador y volvé a intentarlo, o usá el texto.';
            } else if (evento.error === 'no-speech') {
                estadoMicrofono.textContent =
                    'No detecté voz. Presioná el botón y probá de nuevo.';
            } else {
                estadoMicrofono.textContent =
                    'No se pudo completar el reconocimiento de voz. Podés usar el texto.';
            }
        };

        reconocimiento.onend = () => {
            botonMicrofono.disabled = false;
            reconocimiento = null;
        };

        try {
            reconocimiento.start();
        } catch (error) {
            reconocimiento = null;
            botonMicrofono.disabled = false;
            estadoMicrofono.textContent =
                'No se pudo iniciar el micrófono. Revisá los permisos del navegador.';
        }
    }

    // Elegir modalidad inicial.
    opcionesModalidad.querySelectorAll('[data-modalidad]').forEach((botonModalidad) => {
        botonModalidad.addEventListener('click', () => {
            elegirModalidad(botonModalidad.dataset.modalidad);
        });
    });

    // Acciones del menú.
    menu.querySelectorAll('[data-opcion]').forEach((botonOpcion) => {
        botonOpcion.addEventListener('click', () => {
            procesarOpcion(botonOpcion.dataset.opcion);
        });
    });

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const consulta = entrada.value.trim();
        if (!consulta) return;

        entrada.value = '';
        interpretarConsulta(consulta);
    });

    botonMicrofono.addEventListener('click', escuchar);

    ventana.querySelector('#cambiar-modalidad').addEventListener('click', () => {
        detenerReconocimiento();

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        modalidad = null;
        zonaConsulta.hidden = true;
        opcionesModalidad.hidden = false;

        agregarMensaje(
            'Ayudante',
            'Podés elegir otra modalidad. Tu conversación anterior sigue visible.'
        );

        opcionesModalidad.querySelector('button').focus();
    });

    ventana.querySelector('#letra-mayor').addEventListener('click', () => {
        tamanoLetra = Math.min(tamanoLetra + 2, 28);
        ventana.style.setProperty('--ayudante-font-size', `${tamanoLetra}px`);
    });

    ventana.querySelector('#letra-menor').addEventListener('click', () => {
        tamanoLetra = Math.max(tamanoLetra - 2, 14);
        ventana.style.setProperty('--ayudante-font-size', `${tamanoLetra}px`);
    });

    function cerrarVentana() {
        detenerReconocimiento();

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        ventana.hidden = true;
        boton.focus();
    }

    ventana.querySelector('#cerrar-ayudante').addEventListener('click', cerrarVentana);

    ventana.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            cerrarVentana();
        }
    });

    boton.addEventListener('click', () => {
        ventana.hidden = !ventana.hidden;

        if (!ventana.hidden) {
            opcionesModalidad.querySelector('button').focus();
        } else {
            cerrarVentana();
        }
    });
});



/* Ventanas informativas del pie de página */
document.addEventListener('DOMContentLoaded', () => {
    const enlaces = document.querySelectorAll('[data-modal-abrir]');
    const modales = document.querySelectorAll('.modal-informativo');

    let elementoAnterior = null;

    function abrirModal(modal) {
        if (!modal) return;

        elementoAnterior = document.activeElement;
        modal.hidden = false;
        document.body.classList.add('modal-informativo-abierto');

        modal.querySelector('.modal-informativo-cerrar')?.focus();
    }

    function cerrarModal(modal) {
        if (!modal) return;

        modal.hidden = true;

        if (![...modales].some(m => !m.hidden)) {
            document.body.classList.remove('modal-informativo-abierto');
        }

        if (elementoAnterior?.isConnected) {
            elementoAnterior.focus();
        }
    }

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', evento => {
            evento.preventDefault();

            const nombreModal = enlace.dataset.modalAbrir;
            abrirModal(document.getElementById(`modal-${nombreModal}`));
        });
    });

    modales.forEach(modal => {
        const contenido = modal.querySelector('.modal-informativo-contenido');
        const botonMenor = modal.querySelector('.modal-letra-menor');
        const botonMayor = modal.querySelector('.modal-letra-mayor');
        const botonRestablecer = modal.querySelector('.modal-letra-restablecer');
        const indicador = modal.querySelector('.modal-accesibilidad-estado');

        if (!contenido || !botonMenor || !botonMayor ||
            !botonRestablecer || !indicador) return;

        let escala = 100;

        function actualizarTamano() {
            contenido.style.fontSize = `${escala}%`;
            indicador.textContent = `${escala} %`;
        }

        botonMenor.addEventListener('click', () => {
            escala = Math.max(80, escala - 10);
            actualizarTamano();
        });

        botonMayor.addEventListener('click', () => {
            escala = Math.min(150, escala + 10);
            actualizarTamano();
        });

        botonRestablecer.addEventListener('click', () => {
            escala = 100;
            actualizarTamano();
        });

        modal.querySelector('.modal-informativo-cerrar')
            ?.addEventListener('click', () => cerrarModal(modal));

        modal.addEventListener('click', evento => {
            if (evento.target === modal) cerrarModal(modal);
        });

        modal.addEventListener('keydown', evento => {
            if (evento.key === 'Escape') cerrarModal(modal);
        });
    });
});

// ==========================================================================
// MÓDULO 1: AYUDANTE VIRTUAL DE BIBLIOTECA (Interacción por voz y texto)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const boton = document.querySelector('.btn-ayudante');

    if (!boton) {
        console.error('No se encontró el botón del Ayudante de Biblioteca.');
        return;
    }

    // Evita crear más de una ventana.
    if (document.getElementById('ventana-ayudante')) return;

    let modalidad = null;
    let intentosFallidos = 0;
    let tamanoLetra = 16;
    let reconocimiento = null;

    const admiteVoz = (
        'speechSynthesis' in window &&
        ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    );

    const ventana = document.createElement('section');
    ventana.id = 'ventana-ayudante';
    ventana.className = 'ayudante-panel';
    ventana.setAttribute('role', 'dialog');
    ventana.setAttribute('aria-modal', 'false');
    ventana.setAttribute('aria-labelledby', 'titulo-ayudante');
    ventana.setAttribute('aria-label', 'Ayudante de Biblioteca');
    ventana.hidden = true;

    ventana.innerHTML = `
        <header class="ayudante-cabecera">
            <h2 id="titulo-ayudante">Ayudante de Biblioteca</h2>
            <button type="button" id="cerrar-ayudante"
                class="ayudante-boton-icono" aria-label="Cerrar ayudante">
                Cerrar ✕
            </button>
        </header>

        <div class="ayudante-herramientas" aria-label="Opciones de accesibilidad">
            <button type="button" id="letra-menor" class="ayudante-boton">
                A− Reducir letra
            </button>
            <button type="button" id="letra-mayor" class="ayudante-boton">
                A+ Aumentar letra
            </button>
            <button type="button" id="cambiar-modalidad" class="ayudante-boton">
                Cambiar modalidad
            </button>
        </div>

        <div id="mensajes-ayudante" class="ayudante-mensajes"
            aria-live="polite" aria-relevant="additions text">
        </div>

        <div id="opciones-modalidad" class="ayudante-opciones">
            <p>¡Hola! Bienvenido/a a la Biblioteca SaBré.</p>
            <p>Elegí cómo querés interactuar con el ayudante.</p>
            <button type="button" class="ayudante-boton ayudante-boton-principal"
                data-modalidad="voz">
                A. Interactuar por voz
            </button>
            <button type="button" class="ayudante-boton ayudante-boton-principal"
                data-modalidad="texto">
                B. Interactuar por texto
            </button>
            <p class="ayudante-nota">
                Podés cambiar de modalidad cuando quieras.
            </p>
        </div>

        <div id="zona-consulta" class="ayudante-consulta" hidden>
            <div id="menu-ayudante" class="ayudante-menu" hidden>
                <p>¿En qué te puedo ayudar? Elegí una opción:</p>
                <button type="button" class="ayudante-boton" data-opcion="A">
                    A. Buscar libros en el catálogo
                </button>
                <button type="button" class="ayudante-boton" data-opcion="B">
                    B. Consultar préstamos y devoluciones
                </button>
                <button type="button" class="ayudante-boton" data-opcion="C">
                    C. Consultar audiolibros
                </button>
                <button type="button" class="ayudante-boton" data-opcion="D">
                    D. Consultar recursos en braille
                </button>
                <button type="button" class="ayudante-boton" data-opcion="E">
                    E. Ayuda para usar la biblioteca virtual
                </button>
                <button type="button" class="ayudante-boton" data-opcion="F">
                    F. Consultar estado de turno
                </button>
                <button type="button" class="ayudante-boton" data-opcion="G">
                    G. Hablar con un ayudante humano
                </button>
                <button type="button" class="ayudante-boton" data-opcion="H">
                    H. Contactar por WhatsApp
                </button>
            </div>

            <div class="ayudante-microfono">
                <button type="button" id="activar-microfono"
                    class="ayudante-boton ayudante-boton-principal">
                    Hablar ahora
                </button>
                <p id="estado-microfono" class="ayudante-nota">
                    Para usar la voz, presioná «Hablar ahora» y autorizá el micrófono
                    si el navegador te lo solicita.
                </p>
            </div>

            <form id="formulario-ayudante" class="ayudante-formulario">
                <label for="entrada-ayudante">Escribí tu consulta</label>
                <div class="ayudante-fila">
                    <input id="entrada-ayudante" name="consulta" type="text"
                        autocomplete="off" required
                        placeholder="Ej.: buscar un libro">
                    <button type="submit"
                        class="ayudante-boton ayudante-boton-principal">
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(ventana);

    const mensajes = ventana.querySelector('#mensajes-ayudante');
    const opcionesModalidad = ventana.querySelector('#opciones-modalidad');
    const zonaConsulta = ventana.querySelector('#zona-consulta');
    const menu = ventana.querySelector('#menu-ayudante');
    const formulario = ventana.querySelector('#formulario-ayudante');
    const entrada = ventana.querySelector('#entrada-ayudante');
    const botonMicrofono = ventana.querySelector('#activar-microfono');
    const estadoMicrofono = ventana.querySelector('#estado-microfono');

    function agregarMensaje(autor, texto) {
        const parrafo = document.createElement('p');
        parrafo.className = 'ayudante-mensaje';
        parrafo.textContent = `${autor}: ${texto}`;
        mensajes.appendChild(parrafo);
        mensajes.scrollTop = mensajes.scrollHeight;

        return texto;
    }

    function hablar(texto) {
        if (modalidad !== 'voz' || !('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();

        const mensaje = new SpeechSynthesisUtterance(texto);
        mensaje.lang = 'es-AR';
        mensaje.rate = 0.95;

        window.speechSynthesis.speak(mensaje);
    }

    function responder(texto) {
        agregarMensaje('Ayudante', texto);
        hablar(texto);
    }

    function detenerReconocimiento() {
        if (reconocimiento) {
            reconocimiento.onresult = null;
            reconocimiento.onerror = null;
            reconocimiento.onend = null;

            try {
                reconocimiento.stop();
            } catch (error) {
                // El reconocimiento ya terminó.
            }

            reconocimiento = null;
        }

        botonMicrofono.disabled = false;
    }

    function elegirModalidad(nuevaModalidad) {
        detenerReconocimiento();

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        modalidad = nuevaModalidad;
        opcionesModalidad.hidden = true;
        zonaConsulta.hidden = false;
        menu.hidden = false;
        formulario.hidden = nuevaModalidad === 'voz';

        botonMicrofono.hidden = nuevaModalidad !== 'voz';

        if (nuevaModalidad === 'voz') {
            estadoMicrofono.textContent = admiteVoz
                ? 'Presioná «Hablar ahora» para hacer una consulta por voz.'
                : 'Este navegador no admite reconocimiento de voz. Podés escuchar las respuestas y usar el teclado para consultar.';

            responder(
                'Elegiste la modalidad por voz. Podés decir una letra de la A a la H o el nombre de la opción. Para hablar, presioná el botón del micrófono.'
            );

            entrada.blur();
            botonMicrofono.focus();
        } else {
            estadoMicrofono.textContent = 'Modalidad de texto activa.';
            agregarMensaje(
                'Ayudante',
                'Elegiste la modalidad de texto. Podés usar los botones o escribir una consulta.'
            );
            entrada.focus();
        }
    }

    function procesarOpcion(opcion) {
        const respuestas = {
            A: 'Para buscar libros, ingresá al catálogo de la biblioteca y buscá por título o autor.',
            B: 'Para consultar préstamos y devoluciones, revisá la sección correspondiente de la biblioteca.',
            C: 'Podés explorar los audiolibros disponibles en la sección de recursos de audio.',
            D: 'Consultá la sección Braille para conocer los recursos disponibles.',
            E: 'Podés navegar por las secciones de la biblioteca virtual usando el menú principal.',
            F: 'La consulta de turnos estará disponible próximamente.',
            G: 'Un representante se comunicará contigo a la brevedad.',
            H: 'Podés escribirnos directamente al correo de contacto o por WhatsApp.'
        };

        const respuesta = respuestas[opcion];

        if (!respuesta) return;

        const textoOpcion = menu.querySelector(`[data-opcion="${opcion}"]`);
        if (textoOpcion) {
            agregarMensaje('Vos', textoOpcion.textContent.trim());
        }

        responder(respuesta);
    }

    function interpretarConsulta(texto) {
        const consulta = texto.toLocaleLowerCase('es-AR').trim();

        if (!consulta) return;

        agregarMensaje('Vos', texto);

        const letras = consulta.match(/^[a-h]$/i);
        if (letras) {
            procesarOpcion(letras[0].toUpperCase());
            return;
        }

        if (consulta.includes('préstamo') || consulta.includes('prestamo') ||
            consulta.includes('devolución') || consulta.includes('devolver')) {
            procesarOpcion('B');
        } else if (consulta.includes('catálogo') || consulta.includes('catalogo') ||
                   consulta.includes('libro') || consulta.includes('libros') ||
                   consulta.includes('autor')) {
            procesarOpcion('A');
        } else if (consulta.includes('audiolibro') || consulta.includes('audio libro') ||
                   consulta.includes('audio')) {
            procesarOpcion('C');
        } else if (consulta.includes('braille')) {
            procesarOpcion('D');
        } else if (consulta.includes('turno')) {
            procesarOpcion('F');
        } else if (consulta.includes('humano') || consulta.includes('persona') ||
                   consulta.includes('ayudante real') || consulta.includes('operador')) {
            procesarOpcion('G');
        } else if (consulta.includes('whatsapp')) {
            procesarOpcion('H');
        } else if (consulta.includes('hola') || consulta.includes('buenas')) {
            intentosFallidos = 0;
            responder('¡Hola! Puedo ayudarte con el catálogo, los préstamos, los audiolibros, el braille y la biblioteca virtual.');
        } else if (consulta.includes('ayuda') || consulta.includes('cómo') ||
                   consulta.includes('como')) {
            intentosFallidos = 0;
            responder('Podés elegir una opción del menú A a H o escribir qué necesitás consultar.');
        } else {
            intentosFallidos += 1;

            if (intentosFallidos >= 2) {
                responder('No pude identificar tu consulta. Podés elegir una opción del menú de la A a la H.');
                intentosFallidos = 0;
            } else {
                responder('No entendí la consulta. Probá con libros, préstamos, audiolibros o braille.');
            }
        }
    }

    function escuchar() {
        const ConstructorVoz =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!ConstructorVoz) {
            estadoMicrofono.textContent =
                'El navegador no admite reconocimiento de voz. Usá el campo de texto.';
            return;
        }

        detenerReconocimiento();

        reconocimiento = new ConstructorVoz();
        reconocimiento.lang = 'es-AR';
        reconocimiento.continuous = false;
        reconocimiento.interimResults = false;
        reconocimiento.maxAlternatives = 1;

        reconocimiento.onstart = () => {
            botonMicrofono.disabled = true;
            estadoMicrofono.textContent = 'Te estoy escuchando. Hablá ahora.';
        };

        reconocimiento.onresult = (evento) => {
            const texto = evento.results[0][0].transcript;
            estadoMicrofono.textContent = `Escuché: ${texto}`;
            interpretarConsulta(texto);
        };

        reconocimiento.onerror = (evento) => {
            if (evento.error === 'not-allowed' || evento.error === 'service-not-allowed') {
                estadoMicrofono.textContent =
                    'No hay permiso para usar el micrófono. Revisá los permisos del navegador.';
            } else if (evento.error === 'no-speech') {
                estadoMicrofono.textContent =
                    'No detecté voz. Presioná el botón y probá de nuevo.';
            } else {
                estadoMicrofono.textContent =
                    'No se pudo completar el reconocimiento de voz. Podés usar el texto.';
            }
        };

        reconocimiento.onend = () => {
            botonMicrofono.disabled = false;
            reconocimiento = null;
        };

        try {
            reconocimiento.start();
        } catch (error) {
            reconocimiento = null;
            botonMicrofono.disabled = false;
            estadoMicrofono.textContent =
                'No se pudo iniciar el micrófono.';
        }
    }

    // Elegir modalidad inicial.
    opcionesModalidad.querySelectorAll('[data-modalidad]').forEach((botonModalidad) => {
        botonModalidad.addEventListener('click', () => {
            elegirModalidad(botonModalidad.dataset.modalidad);
        });
    });

    // Acciones del menú.
    menu.querySelectorAll('[data-opcion]').forEach((botonOpcion) => {
        botonOpcion.addEventListener('click', () => {
            procesarOpcion(botonOpcion.dataset.opcion);
        });
    });

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const consulta = entrada.value.trim();
        if (!consulta) return;

        entrada.value = '';
        interpretarConsulta(consulta);
    });

    botonMicrofono.addEventListener('click', escuchar);

    ventana.querySelector('#cambiar-modalidad').addEventListener('click', () => {
        detenerReconocimiento();

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        modalidad = null;
        zonaConsulta.hidden = true;
        opcionesModalidad.hidden = false;

        agregarMensaje(
            'Ayudante',
            'Podés elegir otra modalidad. Tu conversación anterior sigue visible.'
        );

        opcionesModalidad.querySelector('button').focus();
    });

    ventana.querySelector('#letra-mayor').addEventListener('click', () => {
        tamanoLetra = Math.min(tamanoLetra + 2, 28);
        ventana.style.setProperty('--ayudante-font-size', `${tamanoLetra}px`);
    });

    ventana.querySelector('#letra-menor').addEventListener('click', () => {
        tamanoLetra = Math.max(tamanoLetra - 2, 14);
        ventana.style.setProperty('--ayudante-font-size', `${tamanoLetra}px`);
    });

    function cerrarVentana() {
        detenerReconocimiento();

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        ventana.hidden = true;
        boton.focus();
    }

    ventana.querySelector('#cerrar-ayudante').addEventListener('click', cerrarVentana);

    ventana.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            cerrarVentana();
        }
    });

    boton.addEventListener('click', () => {
        ventana.hidden = !ventana.hidden;

        if (!ventana.hidden) {
            opcionesModalidad.querySelector('button').focus();
        } else {
            cerrarVentana();
        }
    });
});


// ==========================================================================
// MÓDULO 2: VENTANAS INFORMATIVAS Y MODALES DEL PIE DE PÁGINA
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const enlaces = document.querySelectorAll('[data-modal-abrir]');
    const modales = document.querySelectorAll('.modal-informativo');

    let elementoAnterior = null;

    function abrirModal(modal) {
        if (!modal) return;

        elementoAnterior = document.activeElement;
        modal.hidden = false;
        document.body.classList.add('modal-informativo-abierto');

        modal.querySelector('.modal-informativo-cerrar')?.focus();
    }

    function cerrarModal(modal) {
        if (!modal) return;

        modal.hidden = true;

        if (![...modales].some(m => !m.hidden)) {
            document.body.classList.remove('modal-informativo-abierto');
        }

        if (elementoAnterior?.isConnected) {
            elementoAnterior.focus();
        }
    }

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', evento => {
            evento.preventDefault();

            const nombreModal = enlace.dataset.modalAbrir;
            abrirModal(document.getElementById(`modal-${nombreModal}`));
        });
    });

    modales.forEach(modal => {
        const contenido = modal.querySelector('.modal-informativo-contenido');
        const botonMenor = modal.querySelector('.modal-letra-menor');
        const botonMayor = modal.querySelector('.modal-letra-mayor');
        const botonRestablecer = modal.querySelector('.modal-letra-restablecer');
        const indicador = modal.querySelector('.modal-accesibilidad-estado');

        if (!contenido || !botonMenor || !botonMayor ||
            !botonRestablecer || !indicador) return;

        let escala = 100;

        function actualizarTamano() {
            contenido.style.fontSize = `${escala}%`;
            indicador.textContent = `${escala} %`;
        }

        botonMenor.addEventListener('click', () => {
            escala = Math.max(80, escala - 10);
            actualizarTamano();
        });

        botonMayor.addEventListener('click', () => {
            escala = Math.min(150, escala + 10);
            actualizarTamano();
        });

        botonRestablecer.addEventListener('click', () => {
            escala = 100;
            actualizarTamano();
        });

        modal.querySelector('.modal-informativo-cerrar')
            ?.addEventListener('click', () => cerrarModal(modal));

        modal.addEventListener('click', evento => {
            if (evento.target === modal) cerrarModal(modal);
        });

        modal.addEventListener('keydown', evento => {
            if (evento.key === 'Escape') cerrarModal(modal);
        });
    });
});


// ==========================================================================
// MÓDULO 3: BARRA DE ACCESIBILIDAD GLOBAL (ZOOM COMPLETO Y LECTOR DE VOZ)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Control de Zoom Completo de la Pantalla (A+ / A-)
    let porcentajeZoom = 100;
    const pasoZoom = 10;
    const maxZoom = 160;
    const minZoom = 80;

    const btnAumentar = document.getElementById('btn-aumentar-letra');
    const btnReducir = document.getElementById('btn-reducir-letra');
    const btnRestablecer = document.getElementById('btn-restablecer-letra');

    if (btnAumentar && btnReducir && btnRestablecer) {
        btnAumentar.addEventListener('click', () => {
            if (porcentajeZoom < maxZoom) {
                porcentajeZoom += pasoZoom;
                aplicarZoomPantalla();
            }
        });

        btnReducir.addEventListener('click', () => {
            if (porcentajeZoom > minZoom) {
                porcentajeZoom -= pasoZoom;
                aplicarZoomPantalla();
            }
        });

        btnRestablecer.addEventListener('click', () => {
            porcentajeZoom = 100;
            aplicarZoomPantalla();
        });

        function aplicarZoomPantalla() {
            // Aplica el escalado visual a TODA la pantalla
            document.body.style.zoom = `${porcentajeZoom}%`;
        }
    }

    // 2. Lector de Pantalla Dinámico (Lectura por Voz)
    const btnLeer = document.getElementById('btn-leer-pagina');
    const btnDetener = document.getElementById('btn-detener-audio');

    if ('speechSynthesis' in window && btnLeer && btnDetener) {
        btnLeer.addEventListener('click', () => {
            window.speechSynthesis.cancel(); // Detener lecturas previas

            const contenidoPagina = document.querySelector('main') || document.body;
            const textoParaLeer = contenidoPagina.innerText;

            if (!textoParaLeer.trim()) return;

            const locucion = new SpeechSynthesisUtterance(textoParaLeer);
            locucion.lang = 'es-AR';
            locucion.rate = 0.95;

            locucion.onstart = () => {
                btnLeer.style.display = 'none';
                btnDetener.style.display = 'inline-flex';
            };

            locucion.onend = () => {
                btnLeer.style.display = 'inline-flex';
                btnDetener.style.display = 'none';
            };

            locucion.onerror = () => {
                btnLeer.style.display = 'inline-flex';
                btnDetener.style.display = 'none';
            };

            window.speechSynthesis.speak(locucion);
        });

        btnDetener.addEventListener('click', () => {
            window.speechSynthesis.cancel();
            btnLeer.style.display = 'inline-flex';
            btnDetener.style.display = 'none';
        });
    }
});