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
        extraInfo.innerHTML = `<p>Información adicional sobre esta característica. Haz clic en "Mostrar más" para aprender detalles interesantes.</p>`;
        
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