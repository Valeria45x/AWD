// Wait for the DOM to be fully loaded before attaching our event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Get references to our key elements
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.navbar__toggle');
  const navMenu = document.querySelector('.navbar__menu');
  const navLinks = document.querySelectorAll('.navbar__list a');

  // Function to handle opening and closing the mobile menu
  function toggleMenu(shouldOpen = null) {
      // If shouldOpen is provided, use that value; otherwise toggle based on current state
      const isOpen = shouldOpen !== null ? shouldOpen : !navMenu.classList.contains('active');

      // Update classes and attributes for accessibility
      navToggle.classList.toggle('active', isOpen);
      navMenu.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen.toString());

      // Prevent body scrolling when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  // Handle hamburger button clicks
  navToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
  });

  // Handle navigation link clicks
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');

          // Only proceed if it's a section link
          if (targetId && targetId !== '#') {
              const targetSection = document.querySelector(targetId);

              if (targetSection) {
                  // First, close the mobile menu
                  toggleMenu(false);

                  // Wait for the menu closing animation
                  setTimeout(() => {
                      // Calculate scroll position accounting for navbar height
                      const navHeight = navbar.offsetHeight;
                      const targetPosition = targetSection.offsetTop - navHeight;

                      // Smooth scroll to the target section
                      window.scrollTo({
                          top: targetPosition,
                          behavior: 'smooth'
                      });
                  }, 300); // This timing matches our CSS transition duration
              }
          }
      });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
      if (navMenu?.classList.contains('active') &&
          !navMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
          toggleMenu(false);
      }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
          // Close mobile menu if window is resized larger than mobile breakpoint
          if (window.innerWidth > 768 && navMenu?.classList.contains('active')) {
              toggleMenu(false);
          }
      }, 250);
  });
});
