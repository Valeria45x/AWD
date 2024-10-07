// Solo una vez en el archivo
const navbarToggle = document.getElementById('navbarToggle');
const links = document.querySelector('.navbar-links');

// Añadir un evento 'click' al botón de hamburguesa
navbarToggle.addEventListener('click', function() {
    const isActive = links.classList.toggle('active');
    navbarToggle.setAttribute('aria-expanded', isActive);
});
