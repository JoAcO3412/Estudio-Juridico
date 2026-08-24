document.addEventListener("DOMContentLoaded", () => {
    const waButton = document.getElementById('wa-btn');

    if (waButton) {
        waButton.addEventListener('click', (event) => {
            // Aquí podrías agregar lógica para Google Analytics o Facebook Pixel
            console.log("El usuario ha hecho clic para redirigirse a WhatsApp.");
            
            // Un pequeño efecto visual (opcional, el CSS ya maneja el hover)
            waButton.style.opacity = '0.5';
            setTimeout(() => {
                waButton.style.opacity = '1';
            }, 300);
        });
    }
});