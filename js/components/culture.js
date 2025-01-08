document.addEventListener('DOMContentLoaded', () => {
  var swiper = new Swiper('.swiper-container', {
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
  });

  const swiperContainer = document.querySelector('.swiper-container');
  let isSwiperInView = false;

  const handleScroll = (event) => {
      const rect = swiperContainer.getBoundingClientRect();
      isSwiperInView = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isSwiperInView) {
          event.preventDefault();
          const delta = Math.sign(event.deltaY);
          if (delta > 0) {
              if (!swiper.isEnd) {
                  swiper.slideNext();
              } else {
                  window.removeEventListener('wheel', handleScroll, { passive: false });
                  window.addEventListener('wheel', handleScrollEnd, { passive: false });
              }
          } else {
              if (!swiper.isBeginning) {
                  swiper.slidePrev();
              } else {
                  window.removeEventListener('wheel', handleScroll, { passive: false });
                  window.addEventListener('wheel', handleScrollUp, { passive: false });
              }
          }
      } else {
          window.removeEventListener('wheel', handleScroll, { passive: false });
          window.addEventListener('wheel', handleScroll, { passive: false });
      }
  };

  const handleScrollEnd = (event) => {
      const rect = swiperContainer.getBoundingClientRect();
      if (rect.top > 0 || rect.bottom < window.innerHeight) {
          window.removeEventListener('wheel', handleScrollEnd, { passive: false });
          window.addEventListener('wheel', handleScroll, { passive: false });
      }
  };

  const handleScrollUp = (event) => {
      const rect = swiperContainer.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
          event.preventDefault();
          const delta = Math.sign(event.deltaY);
          if (delta < 0) {
              if (!swiper.isBeginning) {
                  swiper.slidePrev();
              } else {
                  window.removeEventListener('wheel', handleScrollUp, { passive: false });
                  window.addEventListener('wheel', handleScroll, { passive: false });
              }
          }
      } else {
          window.removeEventListener('wheel', handleScrollUp, { passive: false });
          window.addEventListener('wheel', handleScroll, { passive: false });
      }
  };

  window.addEventListener('wheel', handleScroll, { passive: false });

  // Ensure swiper starts at correct position
  document.querySelector('#culture').scrollIntoView();
});
