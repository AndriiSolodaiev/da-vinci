import customSelect from 'custom-select';
import gsap from 'gsap';
import { initSmoothScrolling } from '../scroll/leniscroll';
import device from "current-device"
initSmoothScrolling();
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
  const isInsideContacts = evt.target.closest('.header-contacts');
  const contactsContainer = document.querySelector('.header-contacts');
  const countryList = evt.target.closest('.iti__country-list');

  const btnUp = evt.target.closest("[data-btn-up]");

  const btnMenuTarget = evt.target.closest('[data-menu-button]');
  const btnMenu =document.querySelector('[data-menu]')
  const menu =document.querySelector('[data-menu]')
 const header = document.querySelector('header'); // переконайся, що header є
const specialtyModal = document.querySelector('[data-specialty__overflow]');
  const select = document.querySelector('[data-field-spcialty] select');
  if (btnMenuTarget) {
    const isHidden = menu.classList.contains('hidden');
    
    if (isHidden) {
      menu.classList.remove('hidden');
      header.classList.add('menu-is-open');
      window.dispatchEvent(new Event('stop-scroll'));
      animateMenuIn(menu);
    } else {
      animateMenuOut(menu, () => {
        window.dispatchEvent(new Event('start-scroll'));
        menu.classList.add('hidden');
        header.classList.remove('menu-is-open');
      });
    }

    return;
  }
  if(btnUp){
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  if (btn) {
    const id = btn.dataset.specialtyId;

    // Закриваємо попередню модалку (specialty)
    if (specialtyModal && !specialtyModal.classList.contains('hidden')) {
      specialtyModal.classList.add('hidden');
    }

    // Відкриваємо форму
    if (overflow.classList.contains('hidden')) {
      overflow.classList.remove('hidden');
      window.dispatchEvent(new Event('stop-scroll'));
      document.body.style.overflow = 'hidden';
    }

    // Підставляємо значення в селект (тільки якщо id є і поле знайдено)
    if (id && select) {
      console.log("Заходить ")
      const valueToSelect = select.querySelector(`[data-specialty-id="${id}"]`).value;
      select.customSelect.value = valueToSelect;
      select.setAttribute('data-selected', id); // або як працює твій кастомний селект
      const option = select.querySelector(`[data-value="${id}"]`);
      if (option) {
        // Емуляція вибору опції (можна змінити залежно від логіки твого кастомного селекта)
        option.click();
      }
    }

    return;
  }
  if (close) {
    window.dispatchEvent(new Event('start-scroll'));
    document.body.style.overflow = "visible";
    return overflow.classList.add('hidden');
  }
  if ( evt.target === overflow) {
    window.dispatchEvent(new Event('start-scroll'));
    document.body.style.overflow = "visible";
    return overflow.classList.add('hidden');
  }

  if (contactDropdown) {
    contactsContainer.classList.toggle('open');
  } else if (!isInsideContacts && contactsContainer.classList.contains('open')) {
    // Якщо клік ЗЗОВНІ — закриваємо дропдаун
    contactsContainer.classList.remove('open');
  }
});

function animateMenuIn(menu) {
  const items = menu.querySelectorAll('.menu-item');
  const socials = menu.querySelectorAll('.social-item');
  const phone = menu.querySelector('.header-phone');
  const overlay = menu.querySelector('.menu-overlay');
  const container = menu.querySelector('.menu-container');

  // Початкові стани
  gsap.set([items, socials, phone], { opacity: 0, y: 30 });
  gsap.set(menu, { opacity: 0 });
  gsap.set(container, { scale: 0.95, opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(menu, { opacity: 1, duration: 0.2 })
    .to(container, { scale: 1, opacity: 1, duration: 0.3 }, "<")
    .to(items, { opacity: 1, y: 0, stagger: 0.05, duration: 0.35 }, "-=0.2")
    .to(socials, { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }, "-=0.3")
    .to(phone, { opacity: 1, y: 0, duration: 0.3 }, "-=0.25");
}

function animateMenuOut(menu, onComplete) {
  const items = menu.querySelectorAll('.menu-item');
  const socials = menu.querySelectorAll('.social-item');
  const phone = menu.querySelector('.header-phone');
  const container = menu.querySelector('.menu-container');

  const tl = gsap.timeline({
    defaults: { ease: "power3.in" },
    onComplete
  });

  tl.to([phone, ...socials, ...items], { opacity: 0, y: 30, stagger: 0.04, duration: 0.2 })
    .to(container, { scale: 0.95, opacity: 0, duration: 0.2 }, "-=0.2")
    .to(menu, { opacity: 0, duration: 0.2 }, "-=0.1");
}

// const loader = document.querySelector(".loader-wrap");

// document.addEventListener('DOMContentLoaded', () => {
//     window.onload = function () {
//       window.setTimeout(() => {
//         loader.classList.add("loaded")
//       }, 1200)
//     }
//   })

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






document.addEventListener("DOMContentLoaded", () => {
  const isLocal = location.hostname === "localhost"; // або твоя умова
  const modal = document.querySelector('[data-specialty__overflow]');
  const closeBtn = modal.querySelector('[data-specialty-modal-close]');
  const imgEl = modal.querySelector('.modal-frame__img-wrap img');
  const titleEl = modal.querySelector('.modal-frame__title');
  const listEl = modal.querySelector('.modal-frame__list');
  const applyBtn = modal.querySelector('[data-call-us-btn]');

  // 🔁 Дані з локального JSON, якщо потрібно
  const localData = [
  {
    id: "20",
    title: "Штурмовик",
    img: "./assets/images/soldiers/20.png",
    description: [
      "Ведення наступальних операцій",
      "Тактична підготовка",
      "Виконання бойових завдань"
    ]
  },
  {
    id: "14",
    title: "Оператор БПЛА",
    img: "./assets/images/soldiers/14.png",
    description: [
      "Управління безпілотними літальними апаратами",
      "Збір розвідувальної інформації",
      "Аналіз відео та фото даних"
    ]
  },
  {
    id: "1",
    title: "Водій мінометного взводу",
    img: "./assets/images/soldiers/1.png",
    description: [
      "Керування технікою",
      "Допомога підрозділу",
      "Забезпечення мобільності"
    ]
  },
  {
    id: "18",
    title: "Фахівець з РЕБ/РЕР",
    img: "./assets/images/soldiers/18.png",
    description: [
      "Електронна боротьба",
      "Протидія радіоелектронним загрозам",
      "Підтримка безпеки зв’язку"
    ]
  },
  {
    id: "2",
    title: "Діловод служби логістики",
    img: "./assets/images/soldiers/2.png",
    description: [
      "Організація документообігу",
      "Планування логістики",
      "Ведення обліку ресурсів"
    ]
  },
  {
    id: "3",
    title: "Діловод групи персоналу штабу",
    img: "./assets/images/soldiers/3.png",
    description: [
      "Ведення кадрової документації",
      "Підтримка зв’язку з персоналом",
      "Організація внутрішньої комунікації"
    ]
  },
  {
    id: "4",
    title: "Діловод підрозділу",
    img: "./assets/images/soldiers/4.png",
    description: [
      "Обробка документації підрозділу",
      "Забезпечення зв’язку з вищим штабом",
      "Контроль за дотриманням регламентів"
    ]
  },
  {
    id: "5",
    title: "Дизеліст",
    img: "./assets/images/soldiers/5.png",
    description: [
      "Обслуговування дизельної техніки",
      "Ремонт та діагностика двигунів",
      "Забезпечення надійності техніки"
    ]
  },
  {
    id: "6",
    title: "Електрик",
    img: "./assets/images/soldiers/6.png",
    description: [
      "Обслуговування електрообладнання",
      "Встановлення електропроводки",
      "Ремонт електросистем"
    ]
  },
  {
    id: "7",
    title: "Заступник ком. роти з МПЗ",
    img: "./assets/images/soldiers/7.png",
    description: [
      "Координація бойової підготовки",
      "Організація матеріально-технічного забезпечення",
      "Підтримка дисципліни"
    ]
  },
  {
    id: "8",
    title: "Зв’язківець (лінійний наглядач)",
    img: "./assets/images/soldiers/8.png",
    description: [
      "Забезпечення зв’язку в підрозділі",
      "Моніторинг ліній зв’язку",
      "Ремонт та обслуговування обладнання"
    ]
  },
  {
    id: "9",
    title: "Лікар медичного пункту",
    img: "./assets/images/soldiers/9.png",
    description: [
      "Надання першої медичної допомоги",
      "Проведення медичних оглядів",
      "Підтримка здоров’я особового складу"
    ]
  },
  {
    id: "10",
    title: "Режисер монтажу",
    img: "./assets/images/soldiers/10.png",
    description: [
      "Монтаж відео- та аудіоматеріалів",
      "Обробка медіадокументів",
      "Підготовка контенту для звітності"
    ]
  },
  {
    id: "11",
    title: "Моторист",
    img: "./assets/images/soldiers/11.png",
    description: [
      "Обслуговування моторної техніки",
      "Ремонт двигунів",
      "Підтримка технічної справності"
    ]
  },
  {
    id: "12",
    title: "Номер обслуги мінометного взводу",
    img: "./assets/images/soldiers/12.png",
    description: [
      "Участь у мінометній службі",
      "Підготовка і обслуговування зброї",
      "Виконання бойових завдань"
    ]
  },
  {
    id: "13",
    title: "Оператор БпАК літакового типу",
    img: "./assets/images/soldiers/13.png",
    description: [
      "Управління безпілотними апаратами",
      "Збір та аналіз розвідувальної інформації",
      "Підтримка авіаційних операцій"
    ]
  },
  {
    id: "15",
    title: "Оператор роти вогневої підтримки",
    img: "./assets/images/soldiers/15.png",
    description: [
      "Координація вогневої підтримки",
      "Управління вогнепальною зброєю",
      "Підтримка бойових операцій"
    ]
  },
  {
    id: "16",
    title: "PR-спеціаліст",
    img: "./assets/images/soldiers/16.png",
    description: [
      "Побудова іміджу підрозділу",
      "Організація комунікацій",
      "Взаємодія зі ЗМІ"
    ]
  },
  {
    id: "17",
    title: "Радіотелефоніст мінометного взводу",
    img: "./assets/images/soldiers/17.png",
    description: [
      "Забезпечення зв’язку мінометного взводу",
      "Обслуговування радіообладнання",
      "Підтримка комунікації в бою"
    ]
  },
  {
    id: "19",
    title: "Санітар медичного пункту",
    img: "./assets/images/soldiers/19.png",
    description: [
      "Допомога лікарю",
      "Підтримка санітарного порядку",
      "Надання першої допомоги"
    ]
  },
  {
    id: "21",
    title: "SMM-спеціаліст",
    img: "./assets/images/soldiers/21.png",
    description: [
      "Просування в соцмережах",
      "Створення контенту",
      "Аналіз аудиторії"
    ]
  },
  {
    id: "22",
    title: "Стрілець-санітар",
    img: "./assets/images/soldiers/22.png",
    description: [
      "Ведення бойових дій",
      "Надання медичної допомоги",
      "Підтримка поранених"
    ]
  },
  {
    id: "23",
    title: "Телефоніст взводу зв'язку",
    img: "./assets/images/soldiers/23.png",
    description: [
      "Обслуговування телефонного зв’язку",
      "Передача інформації",
      "Підтримка комунікації"
    ]
  },
  {
    id: "24",
    title: "Фельдшер медичного пункту",
    img: "./assets/images/soldiers/24.png",
    description: [
      "Надання медичної допомоги",
      "Обробка поранень",
      "Підтримка здоров’я особового складу"
    ]
  }
];

  // 📦 Функція підставляння даних у попап
  function fillModal(data) {
    imgEl.src = data.img || "";
    imgEl.alt = data.title || "specialty";
    titleEl.textContent = data.title || "";
    listEl.innerHTML = "";

    if (Array.isArray(data.description)) {
      data.description.forEach(item => {
        const li = document.createElement("li");
        li.className = "modal-frame__item";
        li.textContent = item;
        listEl.appendChild(li);
      });
    }

    applyBtn.setAttribute("data-specialty-id", data.id);
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open"); // якщо потрібно заблокувати прокрутку
  }

  // 🧠 Отримання даних з локального json
  function getLocalData(id) {
    return localData.find(item => item.id === id);
  }

  // 📤 Отримання даних із сервера
  function fetchData(id) {
    const fd = new FormData();
    fd.append("action", "specialty");
    fd.append("id", id);

    return axios
      .post("/wp-admin/admin-ajax.php", fd)
      .then(res => res.data)
      .catch(err => {
        console.error("AJAX error", err);
        return null;
      });
  }

  // 🧩 Обробка натискання на спеціальність
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-specialty__btn]");
    if (!btn) return;

    const id = btn.getAttribute("data-specialty-id");
    if (!id) return;

    let data;

    if (isLocal) {
      data = getLocalData(id);
    } else {
      data = await fetchData(id);
    }

    if (data) {
      fillModal(data.data);
    }
  });

 modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});

// ❌ Закриття по кнопці
closeBtn.addEventListener("click", () => {
  closeModal();
});

// 🔁 Універсальна функція закриття
function closeModal() {
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}
});