/**
 * Timeline Animation Controller
 *
 * Controls an animated timeline that responds to scroll position, including:
 * - Progress line animation
 * - Timeline point activation
 * - Responsive behavior
 * - Performance-optimized scroll and resize handling
 *
 * @requires jQuery
 */

(function($) {
    // Initialize when document is ready
    $(function() {
        // Configuration
        const SELECTORS = {
            timeline: '.js-timeline',
            timelineLine: '.js-timeline_line',
            timelineProgress: '.js-timeline_line-progress',
            timelinePoint: '.js-timeline-card_point-box',
            timelineItem: '.js-timeline_item',
            activeClass: 'js-ag-active'
        };

        // Cache DOM elements
        const elements = {
            timeline: $(SELECTORS.timeline),
            timelineLine: $(SELECTORS.timelineLine),
            timelineProgress: $(SELECTORS.timelineProgress),
            timelinePoint: $(SELECTORS.timelinePoint),
            timelineItems: $(SELECTORS.timelineItem),
            window: $(window)
        };

        // State variables
        let state = {
            lastScrollPosition: -1,
            windowHeight: elements.window.height(),
            windowOuterHeight: elements.window.outerHeight(),
            isAnimating: false
        };

        /**
         * Updates the timeline progress based on scroll position
         */
        function updateTimelineProgress() {
            const lastPointTop = elements.timelineItems.last()
                .find(SELECTORS.timelinePoint)
                .offset().top;

            const progressOffset = elements.timelineProgress.offset().top;
            const scrollTop = elements.window.scrollTop();

            // Calculate progress height
            let progressHeight = scrollTop - progressOffset + (state.windowOuterHeight / 2);
            const maxHeight = lastPointTop + scrollTop - elements.window.scrollTop();

            // Adjust progress height if reached the end
            if (maxHeight <= scrollTop + state.windowOuterHeight / 2) {
                progressHeight = maxHeight - progressOffset;
            }

            // Update progress line height
            elements.timelineProgress.css({ height: `${progressHeight}px` });

            // Update active states for timeline items
            elements.timelineItems.each(function() {
                const pointTop = $(this).find(SELECTORS.timelinePoint).offset().top;
                const activationPoint = pointTop + scrollTop - elements.window.scrollTop();

                $(this).toggleClass(
                    SELECTORS.activeClass,
                    activationPoint < scrollTop + (state.windowOuterHeight * 0.5)
                );
            });
        }

        /**
         * Updates the timeline line position
         */
        function updateTimelineLine() {
            const firstPoint = elements.timelineItems.first().find(SELECTORS.timelinePoint);
            const lastPoint = elements.timelineItems.last().find(SELECTORS.timelinePoint);

            elements.timelineLine.css({
                top: firstPoint.offset().top - elements.timelineItems.first().offset().top,
                bottom: elements.timeline.offset().top +
                       elements.timeline.outerHeight() -
                       lastPoint.offset().top
            });
        }

        /**
         * Main update function with requestAnimationFrame
         */
        function updateFrame() {
            if (!state.isAnimating) {
                requestAnimationFrame(() => {
                    updateTimelineLine();

                    if (state.lastScrollPosition !== elements.window.scrollTop()) {
                        state.lastScrollPosition = elements.window.scrollTop();
                        updateTimelineProgress();
                    }

                    state.isAnimating = false;
                });
            }
            state.isAnimating = true;
        }

        /**
         * Scroll event handler
         */
        function handleScroll() {
            updateFrame();
        }

        /**
         * Resize event handler
         */
        function handleResize() {
            state.windowHeight = elements.window.height();
            updateFrame();
        }

        /**
         * Initialize event listeners
         */
        function initializeEventListeners() {
            elements.window
                .on('scroll', handleScroll)
                .on('resize', handleResize);
        }

        // Initialize the timeline
        initializeEventListeners();
        updateFrame();
    });
})(jQuery);
