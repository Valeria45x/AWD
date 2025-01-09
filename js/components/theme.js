/**
 * Theme Controller Module
 *
 * Manages the theme switching functionality including:
 * - Light/dark theme toggle
 * - System preference detection
 * - Theme persistence
 * - Keyboard accessibility
 * - Screen reader support
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configuration Constants
    const CONFIG = {
        THEMES: {
            LIGHT: 'light',
            DARK: 'dark'
        },
        STORAGE_KEY: 'preferred-theme',
        ANNOUNCEMENT_DURATION: 1000
    };

    // CSS Selectors and Attributes
    const SELECTORS = {
        themeToggle: '.theme-toggle',
        mediaQuery: '(prefers-color-scheme: dark)'
    };

    const ATTRIBUTES = {
        theme: 'data-theme',
        ariaLabel: 'aria-label',
        ariaPressed: 'aria-pressed',
        ariaLive: 'aria-live',
        role: 'role'
    };

    // Theme Icons
    const THEME_ICONS = {
        [CONFIG.THEMES.LIGHT]: '🌙',  // Moon for light mode (switches to dark)
        [CONFIG.THEMES.DARK]: '☀️'    // Sun for dark mode (switches to light)
    };

    // DOM Elements
    const elements = {
        themeToggles: document.querySelectorAll(SELECTORS.themeToggle)
    };

    /**
     * Sets the theme and updates UI elements
     * @param {string} theme - The theme to set ('light' or 'dark')
     */
    function setTheme(theme) {
        // Update document theme
        document.documentElement.setAttribute(ATTRIBUTES.theme, theme);

        // Persist theme preference
        localStorage.setItem(CONFIG.STORAGE_KEY, theme);

        // Update toggle buttons
        elements.themeToggles.forEach(button => {
            const isDark = theme === CONFIG.THEMES.DARK;

            // Update button state
            button.textContent = THEME_ICONS[theme];
            button.setAttribute(ATTRIBUTES.ariaPressed, isDark.toString());

            // Update accessibility label
            button.setAttribute(
                ATTRIBUTES.ariaLabel,
                `Switch to ${isDark ? CONFIG.THEMES.LIGHT : CONFIG.THEMES.DARK} theme`
            );
        });

        // Announce theme change
        announceThemeChange(theme);
    }

    /**
     * Creates and manages a screen reader announcement
     * @param {string} theme - The current theme
     */
    function announceThemeChange(theme) {
        const announcement = document.createElement('div');

        // Set accessibility attributes
        announcement.setAttribute(ATTRIBUTES.role, 'status');
        announcement.setAttribute(ATTRIBUTES.ariaLive, 'polite');
        announcement.className = 'visually-hidden';
        announcement.textContent = `Changed to ${theme} theme`;

        // Add and remove announcement
        document.body.appendChild(announcement);
        setTimeout(() => {
            announcement.remove();
        }, CONFIG.ANNOUNCEMENT_DURATION);
    }

    /**
     * Initializes theme based on stored preference or system settings
     */
    function initializeTheme() {
        const storedTheme = localStorage.getItem(CONFIG.STORAGE_KEY);

        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            const prefersDark = window.matchMedia(SELECTORS.mediaQuery).matches;
            setTheme(prefersDark ? CONFIG.THEMES.DARK : CONFIG.THEMES.LIGHT);
        }
    }

    /**
     * Sets up event listeners for theme toggling
     */
    function setupEventListeners() {
        // Click handlers
        elements.themeToggles.forEach(button => {
            button.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute(ATTRIBUTES.theme);
                const newTheme = currentTheme === CONFIG.THEMES.DARK
                    ? CONFIG.THEMES.LIGHT
                    : CONFIG.THEMES.DARK;
                setTheme(newTheme);
            });

            // Keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });

        // System theme change handler
        const systemThemeQuery = window.matchMedia(SELECTORS.mediaQuery);
        systemThemeQuery.addListener((e) => {
            if (!localStorage.getItem(CONFIG.STORAGE_KEY)) {
                setTheme(e.matches ? CONFIG.THEMES.DARK : CONFIG.THEMES.LIGHT);
            }
        });
    }

    /**
     * Initialize the theme controller
     */
    function init() {
        initializeTheme();
        setupEventListeners();
    }

    // Initialize the module
    init();
});
