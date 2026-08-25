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


// ==========================================
// 2. LÓGICA DEL FORMULARIO DE CONTACTO
// ==========================================
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