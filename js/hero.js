document.addEventListener('DOMContentLoaded', () => {
    const svgElement = document.querySelector('.hero-svg svg');
    const pathElement = svgElement.querySelector('.svg-path');

    svgElement.addEventListener('mouseover', () => {
        pathElement.setAttribute('fill', 'var(--primary-color)'); // Cambia al color primario
        
        // Animación de escalado
        svgElement.style.transform = 'scale(1.1)'; // Escala al pasar el mouse
        svgElement.style.transition = 'transform 0.3s ease'; // Añade la transición
    });

    svgElement.addEventListener('mouseout', () => {
        pathElement.setAttribute('fill', '#000000'); // Cambia de vuelta al color por defecto
        
        // Vuelve al tamaño original
        svgElement.style.transform = 'scale(1)'; // Regresa a la escala normal
        svgElement.style.transition = 'transform 0.3s ease'; // Añade la transición
    });
});
