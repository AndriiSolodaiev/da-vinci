import Swiper, {  EffectCube, Navigation } from 'swiper';

import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import '../modules/helpers/imgParallax';



gsap.registerPlugin(ScrollTrigger, CustomEase);


  const swiperLeaders = new Swiper('.swiper-process', {
    
    speed: 600,
  
    spaceBetween: 20,
    loop: false,
    
    slidesPerView: 1.1,
    
    breakpoints: {
      768: {
        slidesPerView: 2.1,
        spaceBetween: 20,
      },
       1366: {
        spaceBetween: 20,
        slidesPerView: 2.3,
      }
    }
   
  });

  document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".academy-block__list-wrapper");

  wrappers.forEach(wrapper => {
    const toggle = wrapper.querySelector(".academy-block__list");
    const dropdown = wrapper.querySelector(".academy-block__dropdown");

    if (toggle && dropdown) {
      toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        dropdown.classList.toggle("open");
      });
    }
  });
});

const swiperDirection = new Swiper('[data-swiper="direction"]', {
    speed: 600,
    loop: false,
    slidesPerView: 0.9,
    breakpoints: {
      768: {
        slidesPerView: 1.4,
      },
       1366: {
        slidesPerView: 1.9,
      }
    }
   
  });

  const swiperDevelopment = new Swiper('[data-swiper="development"]', {
    speed: 600,
    loop: false,
    slidesPerView: 0.9,
    breakpoints: {
      768: {
        slidesPerView: 1.4,
      },
       1366: {
        slidesPerView: 1.9,
      }
    }
   
  });

  document.querySelectorAll("button.nav-item").forEach(btn => {
  btn.addEventListener("click", () => {
    // btn.classList.toggle("active");

    // let subMenu = btn.nextElementSibling;
    // if (subMenu && subMenu.classList.contains("sub-menu")) {
    //   subMenu.classList.toggle("open");
    // }
    const submenu = btn.nextElementSibling;
    if (!submenu) return;

    const isOpen = submenu.classList.contains('open');

    if (isOpen) {
      // Закриття
      // submenu.style.height = submenu.scrollHeight + 'px';
      // requestAnimationFrame(() => {
      //   submenu.style.height = '0px';
      // });
      submenu.style.height = '0px';
      submenu.classList.remove('open');
      btn.classList.remove('active');
    } else {
      // Відкриття
      submenu.style.height = submenu.scrollHeight + 'px';
      submenu.classList.add('open');
      btn.classList.add('active');
    }
  });
});