document.addEventListener('DOMContentLoaded', () => {
    // Animación de las tarjetas de reflexión
    anime({
        targets: '.animar-card',
        opacity: [0, 1],
        scale: [0.8, 1], // De pequeño a grande
        translateY: [40, 0], // Sube 40px
        delay: anime.stagger(200), // 200ms entre cada una
        duration: 1200,
        easing: 'easeOutElastic(1, .8)' // Un efecto de rebote sutil
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Animación para los items de la izquierda
    anime({
        targets: '.animar-timeline-izq',
        translateX: [-100, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutQuart',
        delay: anime.stagger(300)
    });

    // Animación para los items de la derecha
    anime({
        targets: '.animar-timeline-der',
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutQuart',
        delay: anime.stagger(300, {start: 150}) // Un pequeño desfase
    });
});