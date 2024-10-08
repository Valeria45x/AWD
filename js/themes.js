// Selecciona el botón de alternancia de tema
const themeToggleBtn = document.getElementById('theme-toggle');

// Añade el evento 'click' para alternar el modo oscuro
themeToggleBtn.addEventListener('click', () => {
    // Alterna la clase 'dark-mode' en el cuerpo del documento
    document.body.classList.toggle('dark-mode');
    
    // Guarda la preferencia de tema del usuario en localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Verifica si hay una preferencia de tema guardada y aplícala
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}
