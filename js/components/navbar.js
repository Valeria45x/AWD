/**
 * Navbar Controller Module
 *
 * Manages the responsive navigation bar functionality including:
 * - Mobile menu toggle
 * - Smooth scroll to sections
 * - Outside click handling
 * - Responsive behavior
 * - Accessibility support
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configuration Constants
    const CONFIG = {
        MOBILE_BREAKPOINT: 768,
        MENU_TRANSITION_DURATION: 300,
        RESIZE_DEBOUNCE_DELAY: 250
    };

    // CSS Selectors
    const SELECTORS = {
        navbar: '.navbar',
        toggle: '.navbar__toggle',
        menu: '.navbar__menu',
        links: '.navbar__list a'
    };

    // DOM Elements
    const elements = {
        navbar: document.querySelector(SELECTORS.navbar),
        toggle: document.querySelector(SELECTORS.toggle),
        menu: document.querySelector(SELECTORS.menu),
        links: document.querySelectorAll(SELECTORS.links)
    };

    /**
     * Toggles the mobile menu state
     * @param {boolean|null} shouldOpen - Force menu to open/close state, or toggle if null
     */
    function toggleMenu(shouldOpen = null) {
        const isOpen = shouldOpen !== null ? shouldOpen : !elements.menu.classList.contains('active');

        // Update UI state
        elements.toggle.classList.toggle('active', isOpen);
        elements.menu.classList.toggle('active', isOpen);

        // Update accessibility
        elements.toggle.setAttribute('aria-expanded', isOpen.toString());

        // Manage body scroll
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    /**
     * Handles smooth scrolling to target sections
     * @param {string} targetId - The ID of the target section
     */
    function smoothScrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Close mobile menu first
            toggleMenu(false);

            // Wait for menu transition to complete
            setTimeout(() => {
                const navHeight = elements.navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, CONFIG.MENU_TRANSITION_DURATION);
        }
    }

    /**
     * Event Handlers
     */

    // Toggle button click handler
    elements.toggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Navigation links click handler
    elements.links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');

            if (targetId && targetId !== '#') {
                smoothScrollToSection(targetId);
            }
        });
    });

    // Outside click handler
    document.addEventListener('click', (e) => {
        const isMenuActive = elements.menu?.classList.contains('active');
        const isClickOutside = !elements.menu.contains(e.target) &&
                             !elements.toggle.contains(e.target);

        if (isMenuActive && isClickOutside) {
            toggleMenu(false);
        }
    });

    // Window resize handler with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const isMobileMenuActive = elements.menu?.classList.contains('active');
            const isAboveMobileBreakpoint = window.innerWidth > CONFIG.MOBILE_BREAKPOINT;

            if (isMobileMenuActive && isAboveMobileBreakpoint) {
                toggleMenu(false);
            }
        }, CONFIG.RESIZE_DEBOUNCE_DELAY);
    });
});
