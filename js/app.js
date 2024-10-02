const navbarToggle = document.getElementById('navbarToggle');
const links = document.querySelector('.navbar-links');

navbarToggle.addEventListener('click', function() {
    const isActive = links.classList.toggle('active');
    navbarToggle.setAttribute('aria-expanded', isActive);
});
