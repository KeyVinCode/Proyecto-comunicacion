// --- 3. LÓGICA DE TARJETAS EQUIPO (Expandir y Ver más) ---
    const tarjetasEquipo = document.querySelectorAll('.tarjeta-equipo');

    tarjetasEquipo.forEach(tarjeta => {
        const descElement = tarjeta.querySelector('.descripcion-equipo');
        
        // A. Lógica de acortar texto (> 150 caracteres)
        if (descElement) {
            const textoOriginal = descElement.textContent.trim();
            const limite = 500;

            if (textoOriginal.length > limite) {
                const textoCorto = textoOriginal.substring(0, limite) + '...';
                
                // Inyectamos el HTML con el texto corto, el largo oculto y el botón
                descElement.innerHTML = `
                    <span class="texto-visible">${textoCorto}</span>
                    <span class="texto-completo" style="display:none;">${textoOriginal}</span>
                    <span class="btn-ver-mas">Ver más</span>
                `;

                const btnVerMas = descElement.querySelector('.btn-ver-mas');
                const textoVisible = descElement.querySelector('.texto-visible');
                const textoCompleto = descElement.querySelector('.texto-completo');

                // Evento para el botón "Ver más"
                btnVerMas.addEventListener('click', (e) => {
                    e.stopPropagation(); // IMPORTANTE: Evita que el clic cierre la tarjeta entera
                    
                    if (textoCompleto.style.display === 'none') {
                        textoCompleto.style.display = 'inline';
                        textoVisible.style.display = 'none';
                        btnVerMas.textContent = ' Ver menos';
                    } else {
                        textoCompleto.style.display = 'none';
                        textoVisible.style.display = 'inline';
                        btnVerMas.textContent = ' Ver más';
                    }
                });
            }
        }

        // B. Lógica de expandir la tarjeta al hacer clic
        tarjeta.addEventListener('click', () => {
            // Opcional: Si quieres que al abrir una se cierren las demás
            tarjetasEquipo.forEach(t => {
                if(t !== tarjeta) {
                    t.classList.remove('expandida');
                }
            });

            // Alternar la clase en la tarjeta seleccionada
            tarjeta.classList.toggle('expandida');
        });
    });