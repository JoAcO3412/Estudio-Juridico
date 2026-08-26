// Lógica simple para manejar el envío del formulario sin recargar la página por ahora
        document.getElementById('formContacto').addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue
            
            const boton = this.querySelector('button');
            const textoOriginal = boton.innerText;
            
            // Simulación de envío
            boton.innerText = 'Enviando...';
            boton.style.opacity = '0.7';
            
            setTimeout(() => {
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto a la brevedad.');
                this.reset(); // Limpia el formulario
                boton.innerText = textoOriginal;
                boton.style.opacity = '1';
            }, 1500);
            
        });

        // ==========================================
// 1. LÓGICA DEL HEADER DINÁMICO (SCROLL)
// ==========================================
const header = document.getElementById('mainHeader');
const hero = document.querySelector('.hero');
// Seleccionamos cualquier contenedor que tenga la clase 'zona-oscura' (como el contenedor de las tarjetas)
const zonasOscuras = document.querySelectorAll('.zona-oscura');

window.addEventListener('scroll', () => {
    // Obtenemos las posiciones actuales
    const headerRect = header.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();
    
    let sobreOscuro = false;
    
    // Verificamos si el header está pasando por encima de un contenedor oscuro
    zonasOscuras.forEach(zona => {
        const zonaRect = zona.getBoundingClientRect();
        
        // Si la base del header toca la zona oscura y no la ha pasado por completo
        if (headerRect.bottom > zonaRect.top && headerRect.top < zonaRect.bottom) {
            sobreOscuro = true;
        }
    });

    // Aplicamos las clases según dónde estemos
    if (sobreOscuro) {
        // Header está sobre la caja azul -> lo volvemos blanco
        header.className = 'header-light';
    } else if (headerRect.bottom > heroRect.bottom) {
        // Header ya pasó el hero y está en el fondo beige/blanco -> azul oscuro sólido
        header.className = 'header-solid-dark';
    } else {
        // Header está en la zona del hero (imagen inicial) -> vuelve a ser transparente
        header.className = '';
    }
});



// 2. LÓGICA DEL FORMULARIO DE CONTACTO

document.getElementById('formContacto').addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const boton = this.querySelector('button');
    const textoOriginal = boton.innerText;
    
    boton.innerText = 'Enviando...';
    boton.style.opacity = '0.7';
    
    setTimeout(() => {
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto a la brevedad.');
        this.reset(); 
        boton.innerText = textoOriginal;
        boton.style.opacity = '1';
    }, 1500);
});


const elementosAnimados = document.querySelectorAll('.fade-in');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        // Si el elemento entra en la pantalla
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible'); // Aparece suavemente
        } else {
            // Si el elemento sale de la pantalla, le quitamos la clase 
            // para que la animación se repita la próxima vez
            entrada.target.classList.remove('visible'); 
        }
    });
}, {
    threshold: 0.1, // Se activa cuando al menos el 10% del elemento es visible
    rootMargin: "0px 0px -50px 0px" // Dispara la animación un poquito antes de llegar al borde inferior
});

// Le indicamos al observador que vigile cada elemento
elementosAnimados.forEach((elemento) => {
    observador.observe(elemento);
});

const menuToggle = document.getElementById('menuToggle');
const headerInfo = document.querySelector('.header-info');

menuToggle.addEventListener('click', () => {
    // 1. Despliega el menú de enlaces
    headerInfo.classList.toggle('activo');
    
    // 2. Activa la animación de la "X" en las 3 barritas
    menuToggle.classList.toggle('abierto');
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    
    // Si bajamos más de 50 píxeles, le agrega la clase 'scrolled'
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});