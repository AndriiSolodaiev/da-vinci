import customSelect from 'custom-select';

const header = document.querySelector('.header-bg');

window.addEventListener('scroll', function headerSquosh() {

  const scrollPosition = window.scrollY;
  if (scrollPosition > 20) {
    header.classList.add('scroll-down');
  } else {
    header.classList.remove('scroll-down');
  }
});

document.body.addEventListener('click', function(evt) {
  
  const close = evt.target.closest('[data-call-us-modal-close]');
  const form = evt.target.closest('[data-call-us-modal]');
  const btn = evt.target.closest('[data-call-us-btn]');
  const overflow = document.querySelector('[data-call-us__overflow]');
  const contactDropdown = evt.target.closest('.header-contacts-gen');
  const contactsContainer = document.querySelector('.header-contacts');
  const countryList = evt.target.closest('.iti__country-list');

  const btnUp = evt.target.closest("[data-btn-up]");

  const btnMenuTarget = evt.target.closest('[data-menu-button]');
  const btnMenu =document.querySelector('[data-menu]')
  const menu =document.querySelector('[data-menu]')
 if (btnMenuTarget) {
      menu.classList.toggle('hidden');
      header.classList.toggle('menu-is-open');
      return
  }
  if(btnUp){
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  if (btn) {
    if (overflow.classList.contains('hidden')) {
      
      return overflow.classList.remove('hidden');
    }
    return;
  }
  if (close) {
    return overflow.classList.add('hidden');
  }
  if ( evt.target === overflow) {
    return overflow.classList.add('hidden');
  }

  if(contactDropdown) {
    contactsContainer.classList.toggle('open');
  }
});


const loader = document.querySelector(".loader-wrap");

document.addEventListener('DOMContentLoaded', () => {
    window.onload = function () {
      window.setTimeout(() => {
        loader.classList.add("loaded")
      }, 1200)
    }
  })

  const inputs = document.querySelectorAll('[data-field-wrapper]')
  
  if(inputs.length) {
  inputs.forEach(field => {
   
  const input = field.querySelector('.form-field__input');
 if (!input) {
      console.warn('Поле не містить <input>', field);
      return;
    }
  input.addEventListener('focus', () => {
    field.classList.add('is-focused');
  });

  input.addEventListener('blur', () => {
    // прибирати фокус тільки якщо поле порожнє
    if (!input.value) {
      field.classList.remove('is-focused');
    }
  });
});}

 customSelect('.select');

document.querySelectorAll('.custom-select-container').forEach(el => {
  el.setAttribute('data-lenis-prevent', '')
})