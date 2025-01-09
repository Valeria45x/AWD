document.addEventListener('DOMContentLoaded', () => {
  // Create and append background element
  const storiesSection = document.querySelector('.stories');
  const background = document.createElement('div');
  background.className = 'stories__background';
  storiesSection.insertBefore(background, storiesSection.firstChild);

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const titleContainer = entry.target.querySelector('.title-container');
              const storyContent = entry.target.querySelector('.story-content');

              if (titleContainer) {
                  titleContainer.classList.add('fade-in-up');
              }
              if (storyContent) {
                  storyContent.classList.add('fade-in-up-delay');
              }

              // Keep observing for parallax effect
          }
      });
  }, {
      threshold: 0.2
  });

  // Observe the stories section
  if (storiesSection) {
      observer.observe(storiesSection);
  }

  // Smooth parallax effect on scroll
  let ticking = false;

  function updateParallax() {
      if (window.innerWidth <= 768) return;

      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;

      const titleContainer = document.querySelector('.title-container');
      const storyContent = document.querySelector('.story-content');

      if (titleContainer && titleContainer.classList.contains('fade-in-up')) {
          titleContainer.style.transform = `translateY(${-rate * 0.2}px) translateZ(0.2px)`;
      }

      if (storyContent && storyContent.classList.contains('fade-in-up-delay')) {
          storyContent.style.transform = `translateY(${-rate * 0.1}px) translateZ(0.1px)`;
      }
  }

  window.addEventListener('scroll', () => {
      if (!ticking) {
          window.requestAnimationFrame(() => {
              updateParallax();
              ticking = false;
          });
          ticking = true;
      }
  }, { passive: true });

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
          if (window.innerWidth <= 768) {
              const titleContainer = document.querySelector('.title-container');
              const storyContent = document.querySelector('.story-content');

              if (titleContainer) titleContainer.style.transform = '';
              if (storyContent) storyContent.style.transform = '';
          } else {
              updateParallax();
          }
      }, 250);
  });
});
