document.addEventListener('DOMContentLoaded', () => {
    const tarjetas = document.querySelectorAll('.tarjeta-equipo');

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('click', () => {
            const estaExpandida = tarjeta.classList.contains('expandida');
            const desc = tarjeta.querySelector('.descripcion-full');

            // Cerramos cualquier otra tarjeta abierta antes
            tarjetas.forEach(t => {
                if (t !== tarjeta) {
                    t.classList.remove('expandida');
                    if(t.querySelector('.descripcion-full')) 
                        t.querySelector('.descripcion-full').style.display = 'none';
                }
            });

            if (!estaExpandida) {
                tarjeta.classList.add('expandida');
                desc.style.display = 'block';

                // ANIMACIÓN DE EXPANSIÓN
                anime({
                    targets: tarjeta,
                    width: ['28%', '100%'], // De pequeño a grande
                    easing: 'easeOutExpo',
                    duration: 800
                });

                anime({
                    targets: desc,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: 400,
                    duration: 600,
                    easing: 'easeOutQuad'
                });

            } else {
                // ANIMACIÓN DE CIERRE
                anime({
                    targets: tarjeta,
                    width: '28%',
                    duration: 500,
                    easing: 'easeInOutQuad',
                    complete: () => {
                        tarjeta.classList.remove('expandida');
                        desc.style.display = 'none';
                    }
                });
            }
        });
    });
});