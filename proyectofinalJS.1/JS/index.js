// ── Carrusel de "Lo más visto" ───────────────────────────────────────────────
(function () {
  const track    = document.getElementById('carrusel-track');
  const slides   = document.querySelectorAll('.carrusel-slide');
  const btnPrev  = document.getElementById('carrusel-prev');
  const btnNext  = document.getElementById('carrusel-next');
  const dots     = document.querySelectorAll('.dot');

  let current   = 0;
  let autoTimer = null;
  const total   = slides.length;

  // Mueve el track al slide indicado
  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    // Actualiza los puntos
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  // Avanzar / retroceder
  btnNext.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  btnPrev.addEventListener('click', () => { goTo(current - 1); resetAuto(); });

  // Clic en un punto
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      resetAuto();
    });
  });

  // Auto-play cada 4 segundos
  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // Soporte swipe táctil
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  track.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
  });

  // Iniciar
  goTo(0);
  startAuto();
})();

window.onload = () => {
    if (typeof anime !== 'undefined') {
        console.log("%c✅ ¡Anime.js desde el link de internet funciona!", "color: green; font-size: 15px;");
        
        // Animación rápida para probar: el título aparecerá flotando
        anime({
            targets: 'h1',
            translateY: [-50, 0],
            opacity: [0, 1],
            duration: 1500,
            easing: 'easeOutExpo'
        });
    } else {
        console.log("%c❌ El link de la librería no cargó. Revisa tu internet.", "color: red; font-size: 15px;");
    }
};

// Aquí pega la función cambiarEquipo(id) que te di antes...
document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.btn-equipo');
    const items = document.querySelectorAll('.item');

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            // 1. QUITAR COLOR A TODOS LOS BOTONES Y DARSELO AL CLICADO
            botones.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');

            // 2. IDENTIFICAR QUÉ INTEGRANTE MOSTRAR
            const idAMostrar = boton.getAttribute('data-id');
            const itemAMostrar = document.getElementById(idAMostrar);
            const itemActual = document.querySelector('.item.active');

            if (itemActual === itemAMostrar) return;

            // 3. ANIMACIÓN CON ANIME.JS
            anime({
                targets: itemActual,
                opacity: 0,
                translateX: -20,
                duration: 300,
                easing: 'easeInOutQuad',
                complete: () => {
                    itemActual.classList.remove('active');
                    itemActual.style.display = 'none';

                    itemAMostrar.style.display = 'block';
                    itemAMostrar.classList.add('active');

                    anime({
                        targets: itemAMostrar,
                        opacity: [0, 1],
                        translateX: [20, 0],
                        duration: 500,
                        easing: 'easeOutQuad'
                    });
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. EFECTO AL HACER SCROLL (Aparecen las columnas)
    // ==========================================
    const columnas = document.querySelectorAll('.columna-animada');
    
    // El observador "vigila" cuándo haces scroll y llegas a la sección
    const observadorDeScroll = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Cuando la columna se ve en pantalla, activamos Anime.js
                anime({
                    targets: entrada.target,
                    opacity: [0, 1],
                    translateY: [50, 0], // Sube 50px suavemente
                    duration: 1200,
                    easing: 'easeOutExpo'
                });
                // Dejamos de vigilarla para que solo suceda la primera vez
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.1 }); // 0.1 significa "cuando se vea el 10% de la tarjeta"

    columnas.forEach(columna => observadorDeScroll.observe(columna));


    // ==========================================
    // 2. EFECTO STAGGER AL CLICAR LOS TÍTULOS
    // ==========================================
    const titulos = document.querySelectorAll('.titulo-link');

    titulos.forEach(titulo => {
        titulo.addEventListener('click', () => {
            // Buscamos qué lista debemos abrir usando el data-target
            const idLista = titulo.getAttribute('data-target');
            const itemsDeLaLista = document.querySelectorAll(`#${idLista} li`);

            // Reiniciamos a 0 por si el usuario clica varias veces
            itemsDeLaLista.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
            });

            // Animación en Cascada (Stagger)
            anime({
                targets: itemsDeLaLista,
                opacity: [0, 1],
                translateX: [-20, 0], // Vienen desde la izquierda
                delay: anime.stagger(150), // Magia de Anime: 150ms de retraso entre cada elemento
                duration: 800,
                easing: 'easeOutElastic(1, .8)' // Efecto como de "rebote" elástico
            });
        });
    });

});

// 1. La "Base de Datos" de textos (Asegúrate que las llaves coincidan con el HTML)
const infoPizarra = {
    agresivo: "Se anteponen los deseos propios. Lenguaje impositivo y falta de escucha activa.",
    pasivo: "Se evitan conflictos. No se expresan sentimientos por miedo al rechazo.",
    asertivo: "Estado ideal: expresión clara, directa y respetuosa de las ideas.",
    verbal: "Uso de palabras y signos lingüísticos para transmitir el mensaje.",
    "no-verbal": "Gestos y lenguaje corporal que complementan el mensaje.",
    formal: "Sigue protocolos y normas establecidas según la situación.",
    informal: "Comunicación relajada y directa sin protocolos estrictos."
};

// 2. Función para abrir/cerrar la tarjeta blanca (Acordeón)
window.toggleTarjeta = function(tituloElemento) {
    const contenido = tituloElemento.nextElementSibling;
    
    if (contenido.classList.contains('oculto-inicial')) {
        contenido.classList.remove('oculto-inicial');
        contenido.style.display = "flex"; // Forzamos a que exista en el diseño
        
        anime({
            targets: contenido,
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 500,
            easing: 'easeOutExpo'
        });
    } else {
        anime({
            targets: contenido,
            opacity: 0,
            translateY: -10,
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                contenido.classList.add('oculto-inicial');
                contenido.style.display = "none";
            }
        });
    }
};

// 3. Función para mostrar el cuadro azul/lila
window.seleccionarItem = function(li, clave, categoria) {
    // Quitar activo de otros items
    const lista = li.parentElement;
    lista.querySelectorAll('li').forEach(item => item.classList.remove('activo'));
    li.classList.add('activo');

    // Buscar el cuadro (IMPORTANTE: El ID en HTML debe ser detalle-tipos, detalle-formas, etc)
    const cuadro = document.getElementById(`detalle-${categoria}`);
    
    if (cuadro) {
        // ACTIVAR EL CUADRO (Esto es lo que faltaba)
        cuadro.style.display = "block";
        cuadro.classList.remove('oculto-inicial');

        // Animación de entrada
        anime({
            targets: cuadro,
            opacity: [0, 1],
            translateX: [20, 0],
            duration: 400,
            easing: 'easeOutQuad',
            begin: () => {
                // Inyectamos el texto de la base de datos
                cuadro.innerHTML = `<p style="margin:0;">${infoPizarra[clave] || "Información en desarrollo..."}</p>`;
            }
        });
    }
};

// ── Animación al hacer scroll para los bloques de información ──
document.addEventListener('DOMContentLoaded', () => {
    
    const bloques = document.querySelectorAll('.animar-bloque');

    // Configuramos el observador
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Cuando el bloque entra en pantalla, lo animamos con Anime.js
                anime({
                    targets: entrada.target,
                    opacity: [0, 1],
                    translateY: [50, 0], // Sube ligeramente
                    duration: 1000,
                    easing: 'easeOutExpo'
                });

                // Animamos los iconos de ese bloque específico
                anime({
                    targets: entrada.target.querySelectorAll('.icono-cuadro'),
                    scale: [0, 1],
                    duration: 800,
                    delay: anime.stagger(200, {start: 400}),
                    easing: 'easeOutBack'
                });

                // Dejamos de observar este bloque para que no se anime de nuevo al subir
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.2 // Se activa cuando el 20% del bloque es visible
    });

    // Empezamos a observar cada bloque
    bloques.forEach(bloque => {
        observador.observe(bloque);
    });
});

// secion 5 
document.addEventListener('DOMContentLoaded', () => {
    // Animación de las dos columnas principales
    anime({
        targets: '.animar-card',
        scale: [0.9, 1],
        rotateY: [-15, 0], // Rotación 3D sutil
        opacity: [0, 1],
        duration: 1500,
        delay: anime.stagger(400),
        easing: 'easeOutExpo'
    });

    // Animación de las funciones de Jakobson (una por una)
    anime({
        targets: '.funcion-card',
        translateX: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {start: 1200}), // Empieza después de las columnas
        easing: 'easeOutQuad'
    });

    // Pequeño efecto de pulso en los iconos al terminar
    anime({
        targets: '.icono-principal',
        scale: [1, 1.2, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: 2000,
        loop: false
    });
});