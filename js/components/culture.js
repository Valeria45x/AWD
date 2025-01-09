/**
 * Culture Swiper Module
 * Initializes and manages a Swiper instance with custom scroll behavior.
 * Features:
 * - Horizontal slide navigation
 * - Custom scroll handling for slide transitions
 * - Visibility-based activation
 * - Smooth transitions between slides
 */

document.addEventListener('DOMContentLoaded', () => {
    // Swiper Configuration
    const SWIPER_CONFIG = {
        direction: 'horizontal',
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        parallax: true,
        speed: 600,
        mousewheel: {
            forceToAxis: true,
        },
    };

    // Constants
    const ACTIVATION_THRESHOLD_PERCENTAGE = 0.4;

    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', SWIPER_CONFIG);

    // DOM Elements
    const swiperContainer = document.querySelector('.swiper-container');

    // State Management
    let isSwiperActive = false;

    /**
     * Calculates if the swiper should be active based on viewport position
     * @returns {boolean} Whether the swiper should be active
     */
    const shouldSwiperBeActive = () => {
        const rect = swiperContainer.getBoundingClientRect();
        const activationThreshold = window.innerHeight * ACTIVATION_THRESHOLD_PERCENTAGE;
        return rect.top < activationThreshold && rect.bottom > activationThreshold;
    };

    /**
     * Updates scroll event listeners based on current state
     * @param {string} currentHandler - The current scroll handler name
     * @param {string} newHandler - The new scroll handler to switch to
     */
    const updateScrollListener = (currentHandler, newHandler) => {
        const handlers = {
            handleScroll,
            handleScrollEnd,
            handleScrollUp
        };

        window.removeEventListener('wheel', handlers[currentHandler], { passive: false });
        window.addEventListener('wheel', handlers[newHandler], { passive: false });
    };

    /**
     * Main scroll handler for Swiper navigation
     * @param {WheelEvent} event - The wheel event object
     */
    const handleScroll = (event) => {
        isSwiperActive = shouldSwiperBeActive();

        if (isSwiperActive) {
            event.preventDefault();
            const delta = Math.sign(event.deltaY);

            if (delta > 0 && !swiper.isEnd) {
                swiper.slideNext();
            } else if (delta > 0 && swiper.isEnd) {
                updateScrollListener('handleScroll', 'handleScrollEnd');
            } else if (delta < 0 && !swiper.isBeginning) {
                swiper.slidePrev();
            } else if (delta < 0 && swiper.isBeginning) {
                updateScrollListener('handleScroll', 'handleScrollUp');
            }
        } else {
            updateScrollListener('handleScroll', 'handleScroll');
        }
    };

    /**
     * Handles scroll behavior when reaching the end of the Swiper
     * @param {WheelEvent} event - The wheel event object
     */
    const handleScrollEnd = (event) => {
        const rect = swiperContainer.getBoundingClientRect();
        if (rect.top > 0 || rect.bottom < window.innerHeight) {
            updateScrollListener('handleScrollEnd', 'handleScroll');
        }
    };

    /**
     * Handles scroll behavior when scrolling up from the beginning of the Swiper
     * @param {WheelEvent} event - The wheel event object
     */
    const handleScrollUp = (event) => {
        const rect = swiperContainer.getBoundingClientRect();

        if (rect.top > window.innerHeight) {
            event.preventDefault();
            const delta = Math.sign(event.deltaY);

            if (delta < 0 && !swiper.isBeginning) {
                swiper.slidePrev();
            } else if (delta < 0 && swiper.isBeginning) {
                updateScrollListener('handleScrollUp', 'handleScroll');
            }
        } else {
            updateScrollListener('handleScrollUp', 'handleScroll');
        }
    };

    // Initialize scroll event listener
    window.addEventListener('wheel', handleScroll, { passive: false });
});
