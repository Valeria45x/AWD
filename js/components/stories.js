/**
 * Stories Animation Controller
 *
 * Manages the stories section animations including:
 * - Background element creation
 * - Fade-in animations using Intersection Observer
 * - Smooth parallax effects on scroll
 * - Responsive behavior
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuration Constants
  const CONFIG = {
      MOBILE_BREAKPOINT: 768,
      INTERSECTION_THRESHOLD: 0.2,
      RESIZE_DEBOUNCE_DELAY: 250,
      PARALLAX: {
          SCROLL_RATE: 0.5,
          TITLE_DEPTH: 0.2,
          CONTENT_DEPTH: 0.1
      }
  };

  // CSS Selectors
  const SELECTORS = {
      storiesSection: '.stories',
      titleContainer: '.title-container',
      storyContent: '.story-content'
  };

  // CSS Classes
  const CLASSES = {
      background: 'stories__background',
      fadeInUp: 'fade-in-up',
      fadeInUpDelay: 'fade-in-up-delay'
  };

  /**
   * Creates and appends the background element to the stories section
   */
  function initializeBackground() {
      const storiesSection = document.querySelector(SELECTORS.storiesSection);
      const background = document.createElement('div');
      background.className = CLASSES.background;
      storiesSection.insertBefore(background, storiesSection.firstChild);
      return storiesSection;
  }

  /**
   * Creates an Intersection Observer for fade-in animations
   * @returns {IntersectionObserver} Configured observer instance
   */
  function createAnimationObserver() {
      return new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const titleContainer = entry.target.querySelector(SELECTORS.titleContainer);
                  const storyContent = entry.target.querySelector(SELECTORS.storyContent);

                  if (titleContainer) {
                      titleContainer.classList.add(CLASSES.fadeInUp);
                  }
                  if (storyContent) {
                      storyContent.classList.add(CLASSES.fadeInUpDelay);
                  }
              }
          });
      }, {
          threshold: CONFIG.INTERSECTION_THRESHOLD
      });
  }

  /**
   * Updates parallax effect based on scroll position
   */
  function updateParallax() {
      if (window.innerWidth <= CONFIG.MOBILE_BREAKPOINT) return;

      const scrolled = window.pageYOffset;
      const rate = scrolled * CONFIG.PARALLAX.SCROLL_RATE;

      const titleContainer = document.querySelector(SELECTORS.titleContainer);
      const storyContent = document.querySelector(SELECTORS.storyContent);

      if (titleContainer?.classList.contains(CLASSES.fadeInUp)) {
          titleContainer.style.transform =
              `translateY(${-rate * CONFIG.PARALLAX.TITLE_DEPTH}px)
               translateZ(${CONFIG.PARALLAX.TITLE_DEPTH}px)`;
      }

      if (storyContent?.classList.contains(CLASSES.fadeInUpDelay)) {
          storyContent.style.transform =
              `translateY(${-rate * CONFIG.PARALLAX.CONTENT_DEPTH}px)
               translateZ(${CONFIG.PARALLAX.CONTENT_DEPTH}px)`;
      }
  }

  /**
   * Resets transform styles for mobile view
   */
  function resetMobileStyles() {
      const titleContainer = document.querySelector(SELECTORS.titleContainer);
      const storyContent = document.querySelector(SELECTORS.storyContent);

      if (titleContainer) titleContainer.style.transform = '';
      if (storyContent) storyContent.style.transform = '';
  }

  /**
   * Initialize the stories section
   */
  function init() {
      // Initialize background and observers
      const storiesSection = initializeBackground();
      const observer = createAnimationObserver();

      if (storiesSection) {
          observer.observe(storiesSection);
      }

      // Scroll handler with requestAnimationFrame for performance
      let ticking = false;
      window.addEventListener('scroll', () => {
          if (!ticking) {
              window.requestAnimationFrame(() => {
                  updateParallax();
                  ticking = false;
              });
              ticking = true;
          }
      }, { passive: true });

      // Resize handler with debounce
      let resizeTimeout;
      window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
              if (window.innerWidth <= CONFIG.MOBILE_BREAKPOINT) {
                  resetMobileStyles();
              } else {
                  updateParallax();
              }
          }, CONFIG.RESIZE_DEBOUNCE_DELAY);
      });
  }

  // Initialize the module
  init();
});
