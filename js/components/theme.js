// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get all theme toggle buttons
  const themeToggles = document.querySelectorAll('.theme-toggle');

  // Function to set the theme
  function setTheme(theme) {
      // Set the theme attribute on the root element
      document.documentElement.setAttribute('data-theme', theme);

      // Store the theme preference
      localStorage.setItem('preferred-theme', theme);

      // Update all toggle buttons
      themeToggles.forEach(button => {
          // Update the button's aria-label for screen readers
          button.setAttribute('aria-label',
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
          );

          // Update the emoji
          button.textContent = theme === 'dark' ? '☀️' : '🌙';

          // Update the pressed state for accessibility
          button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      });

      // Announce theme change to screen readers
      announceThemeChange(theme);
  }

  // Function to announce theme changes to screen readers
  function announceThemeChange(theme) {
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'visually-hidden';
      announcement.textContent = `Changed to ${theme} theme`;
      document.body.appendChild(announcement);

      // Remove the announcement after it's been read
      setTimeout(() => {
          announcement.remove();
      }, 1000);
  }

  // Initialize theme based on stored preference or system preference
  function initializeTheme() {
      const storedTheme = localStorage.getItem('preferred-theme');
      if (storedTheme) {
          setTheme(storedTheme);
      } else {
          // Check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setTheme(prefersDark ? 'dark' : 'light');
      }
  }

  // Add click handlers to all theme toggles
  themeToggles.forEach(button => {
      button.addEventListener('click', () => {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          setTheme(newTheme);
      });
  });

  // Listen for system theme changes
  const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  systemThemeQuery.addListener((e) => {
      if (!localStorage.getItem('preferred-theme')) {
          setTheme(e.matches ? 'dark' : 'light');
      }
  });

  // Initialize the theme when the page loads
  initializeTheme();

  // Add keyboard support
  themeToggles.forEach(button => {
      button.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              button.click();
          }
      });
  });
});
