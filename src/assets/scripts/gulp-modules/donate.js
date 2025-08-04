import Swiper, {  EffectCube, Navigation } from 'swiper';

import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import '../modules/helpers/imgParallax';



gsap.registerPlugin(ScrollTrigger, CustomEase);


  const swiperLeaders = new Swiper('.swiper-leaders', {
    modules: [Navigation, EffectCube],
    speed: 600,
    // effect: 'cube',
    // grabCursor: true,
    // cubeEffect: {
    //   shadow: false,
    //   slideShadows: true,
    //   shadowOffset: 20,
    //   shadowScale: 0.94,
    // },
    spaceBetween: 20,
    loop: false,
    navigation: {
      nextEl: '[data-leaders-next-btn]',
      prevEl: '[data-leaders-prev-btn]',
    },
    slidesPerView: 1,
    
    breakpoints: {
      768: {
        // effect: "slide",
        // cubeEffect: undefined, 
        slidesPerView: 1,
        spaceBetween: 20,
      },
       1366: {
        // effect: "slide",
        // cubeEffect: undefined, 
        spaceBetween: 20,
        
      }
    }
   
  });
