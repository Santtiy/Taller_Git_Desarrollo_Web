// Requerimiento 5: Scripts en JavaScript (Usuario 5)

// Función para cambiar el tema (modo oscuro/claro)
function toggleTheme() {
    const body = document.body;
    const themeButton = document.getElementById('theme-toggle-btn');
    
    // Verificar si ya existe el atributo de tema oscuro
    const isDarkMode = body.getAttribute('data-theme') === 'dark';
    
    // Cambiar el tema
    if (isDarkMode) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeButton.textContent = '🌙 Modo Oscuro';
        themeButton.classList.remove('dark-mode');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeButton.textContent = '☀️ Modo Claro';
        themeButton.classList.add('dark-mode');
    }
}

// Cargar el tema guardado al iniciar
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeButton = document.getElementById('theme-toggle-btn');
    
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeButton.textContent = '☀️ Modo Claro';
        themeButton.classList.add('dark-mode');
    } else {
        themeButton.textContent = '🌙 Modo Oscuro';
        themeButton.classList.remove('dark-mode');
    }
}

// Función para mostrar/ocultar más información
function toggleExtraInfo(characteristicElement) {
    const extraInfo = characteristicElement.querySelector('.extra-info');
    const toggleBtn = characteristicElement.querySelector('.toggle-btn');
    
    if (extraInfo) {
        // Si el elemento tiene info extra, hacer toggle
        if (extraInfo.style.display === 'none' || !extraInfo.style.display) {
            extraInfo.style.display = 'block';
            extraInfo.classList.add('show');
            if (toggleBtn) {
                toggleBtn.textContent = '- Ocultar';
                toggleBtn.classList.add('active');
            }
        } else {
            extraInfo.style.display = 'none';
            extraInfo.classList.remove('show');
            if (toggleBtn) {
                toggleBtn.textContent = '+ Mostrar más';
                toggleBtn.classList.remove('active');
            }
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar tema guardado
    loadSavedTheme();

    function getExtraInfoHtml(title) {
        const normalized = (title || '').trim().toLowerCase();

        switch (normalized) {
            case 'hábitat':
                return `
                    <p>Además de las costas, algunas focas usan estuarios y bahías protegidas para descansar y alimentarse.</p>
                    <p><strong>Dato extra:</strong> suelen elegir zonas con acceso fácil al agua para escapar rápido ante amenazas.</p>
                `;
            case 'alimentación':
                return `
                    <p>Su dieta varía según la región y la disponibilidad de presas, por eso pueden cambiar lo que comen a lo largo del año.</p>
                    <p><strong>Dato extra:</strong> muchas especies cazan bajo el agua usando vibrisas (bigotes) muy sensibles para detectar movimientos.</p>
                `;
            case 'comportamiento':
                return `
                    <p>En el agua pueden pasar largos periodos nadando y buceando, y en tierra descansan para conservar energía.</p>
                    <p><strong>Dato extra:</strong> suelen ser más activas al amanecer o atardecer, cuando algunas presas están más disponibles.</p>
                `;
            case 'reproducción':
                return `
                    <p>El cuidado de las crías es intenso durante las primeras semanas, cuando necesitan ganar peso rápidamente.</p>
                    <p><strong>Dato extra:</strong> la lactancia suele ser corta pero muy eficiente por la alta energía de la leche.</p>
                `;
            case 'adaptaciones físicas':
                return `
                    <p>Su cuerpo es hidrodinámico y reduce la resistencia al nadar, lo que mejora su eficiencia en el agua.</p>
                    <p><strong>Dato extra:</strong> sus ojos y bigotes están adaptados para orientarse incluso con poca luz o agua turbia.</p>
                `;
            case 'desplazamiento':
                return `
                    <p>En tierra su movilidad es limitada, por eso suelen permanecer cerca del agua cuando descansan.</p>
                    <p><strong>Dato extra:</strong> bajo el agua pueden cambiar de dirección con rapidez usando sus aletas como timón.</p>
                `;
            case 'depredadores naturales':
                return `
                    <p>La presión de depredación puede influir en dónde descansan y en el tamaño de las colonias.</p>
                    <p><strong>Dato extra:</strong> en algunas zonas también enfrentan riesgos por actividades humanas (redes, contaminación y perturbación).</p>
                `;
            default:
                return `
                    <p>Información adicional para ampliar esta característica.</p>
                    <p><strong>Dato extra:</strong> las focas son excelentes buceadoras y pueden ajustar su comportamiento según el entorno.</p>
                `;
        }
    }
    
    // Agregar event listeners a los botones de toggle de información
    const characteristics = document.querySelectorAll('.characteristic');
    characteristics.forEach(characteristic => {
        // Agregar un botón de toggle si no existe
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toggle-btn';
        toggleBtn.textContent = '+ Mostrar más';
        toggleBtn.type = 'button';
        
        // Crear contenedor de info extra
        const extraInfo = document.createElement('div');
        extraInfo.className = 'extra-info';
        extraInfo.style.display = 'none';
        const titleEl = characteristic.querySelector('.characteristic-title');
        const titleText = titleEl ? titleEl.textContent : '';
        extraInfo.innerHTML = getExtraInfoHtml(titleText);
        
        // Insertar el botón y la info extra
        characteristic.appendChild(toggleBtn);
        characteristic.appendChild(extraInfo);
        
        // Agregar evento click
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleExtraInfo(characteristic);
        });
    });
});

// Agregar evento al botón de tema cuando se carga
window.addEventListener('load', function() {
    const themeButton = document.getElementById('theme-toggle-btn');
    if (themeButton) {
        themeButton.addEventListener('click', toggleTheme);
    }
});