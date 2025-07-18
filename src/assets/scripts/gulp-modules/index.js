import Swiper, { Autoplay, EffectCube, EffectFade, Navigation } from 'swiper';

import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import '../modules/helpers/imgParallax';


import { initSmoothScrolling } from '../modules/scroll/leniscroll';
import device from "current-device"
// initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

const currentEl = document.querySelector('.swiper-counter .current');
  const totalEl = document.querySelector('.swiper-counter .total');

  const swiper = new Swiper('.swiper-directions', {
    modules: [Navigation, EffectCube],
    speed: 700,
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: false,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    loop: false,
    navigation: {
      nextEl: '[data-directions-next-btn]',
      prevEl: '[data-directions-prev-btn]',
    },
    slidesPerView: 1,
    on: {
      init: function () {
        totalEl.textContent = this.slides.length;
        currentEl.textContent = this.realIndex + 1;
      },
      slideChange: function () {
        // Анімація: зменшення й зміна числа, потім збільшення
        gsap.to(currentEl, {
          duration: 0.2,
          y: -10,
          opacity: 0,
          onComplete: () => {
            currentEl.textContent = this.realIndex + 1;
            gsap.fromTo(currentEl, 
              { y: 10, opacity: 0 }, 
              { y: 0, opacity: 1, duration: 0.2 }
            );
          }
        });
      }
    }
  });

const paths = document.querySelectorAll('.values__svg-wrap svg path');
const blocks = document.querySelectorAll('.values__content .values-block');

// Анімація для кожного SVG + відповідного блоку
paths.forEach((path, index) => {
  const block = blocks[index];
  const length = path.getTotalLength();

  // Встановлення початкового стану для лінії
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: -length
  });

  // Початковий стан для блоку
  gsap.set(block, {
    opacity: 0,
    y: -40,
    scale: 0.97,
    filter: "blur(4px)"
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".values__help-wrap",
      start: "top 80%",
      toggleActions: "play none none none",
      once: true,
      markers: true
    }
  });

  tl
    .to(path, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.out",
      delay: index * 0.3 // затримка по черзі
    }, 0) // запуск у timeline одночасно
    .to(block, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.7,
      ease: "power3.out",
      delay: index * 0.3
    }, 0); // той самий час у timeline
});

 const swiperInerest = new Swiper('.swiper-interest', {
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
    
    loop: false,
    navigation: {
      nextEl: '[data-interest-next-btn]',
      prevEl: '[data-interest-prev-btn]',
    },
    slidesPerView: 1,
    
    breakpoints: {
      768: {
        // effect: "slide",
        // cubeEffect: undefined, 
        slidesPerView: 2,
        spaceBetween: 20,
      },
       1366: {
        // effect: "slide",
        // cubeEffect: undefined, 
        spaceBetween: 20,
        slidesPerView: 3,
      }
    }
   
  });

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

 