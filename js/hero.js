document.addEventListener('DOMContentLoaded', () => {
    const svgElement = document.querySelector('.hero-svg svg');
    const pathElement = svgElement.querySelector('.svg-path');

    svgElement.addEventListener('mouseover', () => {
        pathElement.setAttribute('fill', 'var(--primary-color)'); // Cambia al color primario
        console.log('Mouse over SVG'); // Para verificar que el evento se dispara
    });

    svgElement.addEventListener('mouseout', () => {
        pathElement.setAttribute('fill', '#000000'); // Cambia de vuelta al color por defecto
    });
});
