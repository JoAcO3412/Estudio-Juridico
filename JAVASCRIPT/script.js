
// 1. LÓGICA DEL HEADER DINÁMICO (SCROLL)

const header = document.getElementById('mainHeader');
const hero = document.querySelector('.hero');
const zonasOscuras = document.querySelectorAll('.zona-oscura');

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
    const header = document.querySelector('header');

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});