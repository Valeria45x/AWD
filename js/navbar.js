const navLinks = document.querySelectorAll('.navbar-links a');
const navbarToggle = document.getElementById('navbarToggle');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbarToggle.checked = false;
  });
});
