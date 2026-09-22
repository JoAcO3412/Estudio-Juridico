// 1. LÓGICA DEL HEADER DINÁMICO (SCROLL)
const header = document.getElementById('mainHeader');
const hero = document.querySelector('.hero');
// MODIFICACIÓN: Se agregó '.seccion-estadisticas' para que el header invierta sus colores al pasar por ahí
const zonasOscuras = document.querySelectorAll('.zona-oscura, .seccion-estadisticas');

window.addEventListener('scroll', () => {
    const headerRect = header.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();

    let sobreOscuro = false;

    zonasOscuras.forEach(zona => {
        const zonaRect = zona.getBoundingClientRect();

        if (headerRect.bottom > zonaRect.top && headerRect.top < zonaRect.bottom) {
            sobreOscuro = true;
        }
    });

    if (sobreOscuro) {
        header.className = 'header-light';
    } else if (headerRect.bottom > heroRect.bottom) {
        header.className = 'header-solid-dark';
    } else {
        header.className = '';
    }
});


// 3. ANIMACIONES AL HACER SCROLL (fade-in)
const elementosAnimados = document.querySelectorAll('.fade-in');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible'); 
        } else {
            entrada.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" 
});

elementosAnimados.forEach((elemento) => {
    observador.observe(elemento);
});


// 4. MENÚ HAMBURGUESA (MOBILE)
const menuToggle = document.getElementById('menuToggle');
const headerInfo = document.querySelector('.header-info');

menuToggle.addEventListener('click', () => {
    headerInfo.classList.toggle('activo');
    menuToggle.classList.toggle('abierto');
});


// 5. CLASE 'scrolled' AL BAJAR LA PÁGINA
window.addEventListener('scroll', () => {
    // Usamos la constante 'header' que ya está declarada al inicio del archivo
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// 6. CARRUSEL DE IMÁGENES DE FONDO DEL HERO
const heroSlides = document.querySelectorAll('.hero-bg-slide');
let indiceSlideActual = 0;
const duracionPorImagen = 5000; 
 
if (heroSlides.length > 1) {
    setInterval(() => {
        heroSlides[indiceSlideActual].classList.remove('activa');
        indiceSlideActual = (indiceSlideActual + 1) % heroSlides.length;
        heroSlides[indiceSlideActual].classList.add('activa');
    }, duracionPorImagen);
}

function actualizarAlturaHeader() {
    document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
}
 
actualizarAlturaHeader();
window.addEventListener('load', actualizarAlturaHeader);
window.addEventListener('resize', actualizarAlturaHeader);


// 7. ANIMACIÓN DE CONTADORES (MODIFICADA)
function animarContadores() {
    const contadores = document.querySelectorAll('.stat-numero');
    contadores.forEach(contador => {
        const target = parseInt(contador.getAttribute('data-target'), 10);
        const prefijo = contador.getAttribute('data-prefix') || '';
        const sufijo = contador.getAttribute('data-suffix') || '';
        
        // MODIFICACIÓN: Aumento de la duración a 3500ms (3.5 segundos) para hacerla más lenta
        const duracion = 3500; 
        let inicio = null;

        function paso(timestamp) {
            if (!inicio) inicio = timestamp;
            const tiempoTranscurrido = timestamp - inicio;
            const progreso = Math.min(tiempoTranscurrido / duracion, 1);
            
            // MODIFICACIÓN: Función Ease-out para que el contador desacelere al final en lugar de ir a velocidad constante
            const easeOutQuart = 1 - Math.pow(1 - progreso, 4);
            const valorActual = Math.floor(easeOutQuart * target);
            
            // MODIFICACIÓN: Envolver prefijo y sufijo en etiquetas <span> para poder alinearlos por separado desde el CSS
            let html = '';
            if (prefijo) html += `<span class="stat-prefix">${prefijo}</span>`;
            html += valorActual.toLocaleString('es-AR');
            if (sufijo) html += `<span class="stat-suffix">${sufijo}</span>`;
            
            contador.innerHTML = html;

            if (progreso < 1) {
                requestAnimationFrame(paso);
            } else {
                // Asegurar la carga del objetivo final con las etiquetas correspondientes
                let htmlFinal = '';
                if (prefijo) htmlFinal += `<span class="stat-prefix">${prefijo}</span>`;
                htmlFinal += target.toLocaleString('es-AR');
                if (sufijo) htmlFinal += `<span class="stat-suffix">${sufijo}</span>`;
                contador.innerHTML = htmlFinal;
            }
        }
        requestAnimationFrame(paso);
    });
}

const seccionStats = document.querySelector('.seccion-estadisticas');
if (seccionStats) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContadores();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(seccionStats);
}

// 8. ENVÍO DE FORMULARIO CON CARTEL DE ÉXITO INTEGRADO
const formContacto = document.getElementById('formContacto');
const mensajeExito = document.getElementById('mensajeExito');

if (formContacto) {
    formContacto.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const botonSubmit = this.querySelector('button[type="submit"]');
        const textoOriginal = botonSubmit.textContent;
        botonSubmit.textContent = 'Enviando...';
        botonSubmit.disabled = true;

        const formData = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // 1. Ocultamos el formulario
                formContacto.style.display = 'none';
                
                // 2. Mostramos el mensaje de éxito
                mensajeExito.style.display = 'block';
                
                // 3. Pequeño truco para que la animación de opacidad (fade) funcione
                setTimeout(() => {
                    mensajeExito.style.opacity = '1';
                }, 50);

                this.reset(); 
            } else {
                alert('Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.');
                botonSubmit.textContent = textoOriginal;
                botonSubmit.disabled = false;
            }
        })
        .catch(error => {
            alert('Error de conexión. Verifica tu internet e intenta nuevamente.');
            botonSubmit.textContent = textoOriginal;
            botonSubmit.disabled = false;
        });
    });
}