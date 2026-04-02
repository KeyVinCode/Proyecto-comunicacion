document.addEventListener('DOMContentLoaded', () => {
    const opcionesNav = document.querySelector('.opcionesnav');
    const indicador = document.querySelector('.indicador');
    const enlaces = document.querySelectorAll('.opcionesnav a');

    // 1. Identificar en qué página estamos
    let paginaActual = window.location.pathname.split('/').pop();
    if (paginaActual === '') paginaActual = 'index.html';

    let enlaceActivo = null;

    // Buscar qué enlace coincide con la página y ponerle la clase 'activo'
    enlaces.forEach(enlace => {
        const href = enlace.getAttribute('href');
        if (paginaActual.includes(href)) {
            enlaceActivo = enlace;
            enlace.classList.add('activo');
        }
    });

    // 2. Función maestra para mover el rectángulo
    function moverRectangulo(elemento) {
        if (!elemento) return;
        
        // Copiamos el tamaño y la posición exacta de la palabra
        indicador.style.width = `${elemento.offsetWidth}px`;
        indicador.style.height = `${elemento.offsetHeight}px`;
        indicador.style.left = `${elemento.offsetLeft}px`;
        indicador.style.top = `${elemento.offsetTop}px`;
        indicador.style.opacity = '1'; // Lo hacemos visible
    }

    // 3. Posición inicial (Marcamos la página donde estamos)
    if (enlaceActivo) {
        // Un pequeño retraso para asegurar que la fuente cargó bien su tamaño
        setTimeout(() => {
            moverRectangulo(enlaceActivo);
        }, 100);
    }

    // 4. Perseguir al ratón
    enlaces.forEach(enlace => {
        enlace.addEventListener('mouseenter', (e) => {
            moverRectangulo(e.target);
        });
    });

    // 5. Regresar a la base cuando el ratón se va del menú
    opcionesNav.addEventListener('mouseleave', () => {
        if (enlaceActivo) {
            moverRectangulo(enlaceActivo); // Regresa a la página actual
        } else {
            indicador.style.opacity = '0'; // Si no hay página activa, desaparece
        }
    });
});

// Validaciones 
function Validacion(){
    const Nombre = document.getElementsByid('Nombre').value;

    if (Nombre==""){
        alert("El nombre no debe quedar vacio")
    }else if(Nombre.length<6){
        document.getElementById("R1").textContent="Nombre inferior a 6 letras"
    }
}
