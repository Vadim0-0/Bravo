document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("header-menu-btn");
  const menu = document.getElementById("header-menu");
  const menuContent = document.getElementById("header-menu-content");

  // SVG-код для разных состояний
  const svgDefault = `
    <svg width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line y1="0.966406" x2="16" y2="0.966406" stroke="black" stroke-width="1.2"/>
      <line y1="5.96641" x2="11" y2="5.96641" stroke="black" stroke-width="1.2"/>
      <line y1="10.9664" x2="16" y2="10.9664" stroke="black" stroke-width="1.2"/>
    </svg>
  `;

  const svgActive = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0.8189" y1="12.8423" x2="12.5647" y2="1.09651" stroke="black" stroke-width="1.2"/>
    <line x1="12.565" y1="13.1801" x2="0.819165" y2="1.43429" stroke="black" stroke-width="1.2"/>
    </svg>
  `;

  // Функция для переключения меню и иконки
  function toggleMenu() {
    menu.classList.toggle("active");
    menuBtn.classList.toggle("active");
    menuBtn.innerHTML = `Меню ${menu.classList.contains("active") ? svgActive : svgDefault}`;
  }

  // Обработчик нажатия на кнопку
  menuBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleMenu();
  });

  // Обработчик клика вне меню
  document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !menuBtn.contains(event.target) && menu.classList.contains("active")) {
      menu.classList.remove("active");
      menuBtn.classList.remove("active");
      menuBtn.innerHTML = `Меню ${svgDefault}`;
    }
  });

  // Убираем класс active при уходе курсора из меню
  menuContent.addEventListener("mouseleave", function () {
    menu.classList.remove("active");
    menuBtn.classList.remove("active");
    menuBtn.innerHTML = `Меню ${svgDefault}`;
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const objectBtn = document.getElementById('object-btn');
  const objectList = document.getElementById('object-list');

  // Функция переключения класса active
  function toggleActive() {
      objectList.classList.toggle('active');
      objectBtn.classList.toggle('active');
  }

  // Добавление класса active по нажатию на кнопку
  objectBtn.addEventListener('click', function (event) {
      event.stopPropagation(); // Останавливаем всплытие события, чтобы избежать его у document
      toggleActive();
  });

  // Удаление класса active при клике вне блока object-list
  document.addEventListener('click', function (event) {
      if (!objectList.contains(event.target) && !objectBtn.contains(event.target)) {
          objectList.classList.remove('active');
          objectBtn.classList.remove('active');
      }
  });

  // Удаление класса active, если курсор покинул блок object-list
  objectList.addEventListener('mouseleave', function () {
      objectList.classList.remove('active');
      objectBtn.classList.remove('active');
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const openButton = document.getElementById("header-mobile-menu-open");
  const closeButton = document.getElementById("header-mobile-menu-close");
  const header = document.getElementById("header"); // Блок header
  const headerContent = document.getElementById("header-content");
  const body = document.body;

  function toggleActiveClass(add) {
      if (add) {
          header.classList.add("active"); // Добавляем класс active к header
          headerContent.classList.add("active");
          body.style.overflow = "hidden"; // Отключаем скролл для body
      } else {
          header.classList.remove("active"); // Убираем класс active у header
          headerContent.classList.remove("active");
          body.style.overflow = ""; // Возвращаем прокрутку для body
      }
  }

  // Проверка ширины экрана
  function checkScreenWidth() {
      return window.innerWidth <= 768;
  }

  // Назначение обработчиков клика, если ширина экрана <= 768px
  function setEventListeners() {
      if (checkScreenWidth()) {
          openButton.addEventListener("click", () => toggleActiveClass(true));
          closeButton.addEventListener("click", () => toggleActiveClass(false));
      } else {
          // Удаление классов active и восстановление прокрутки, если ширина экрана больше 768px
          header.classList.remove("active");
          headerContent.classList.remove("active");
          body.style.overflow = ""; // Возвращаем прокрутку для body
      }
  }

  // Пересчёт при изменении размера окна
  window.addEventListener("resize", setEventListeners);

  // Первоначальная установка обработчиков
  setEventListeners();
});







/* footer - открытие меню с объектами */
document.addEventListener('DOMContentLoaded', function () {
  const objectBtn = document.getElementById('footer-object-btn');
  const objectList = document.getElementById('footer-object-list');

  // Функция переключения класса active
  function toggleActive() {
      objectList.classList.toggle('active');
      objectBtn.classList.toggle('active');
  }

  // Добавление класса active по нажатию на кнопку
  objectBtn.addEventListener('click', function (event) {
      event.stopPropagation(); // Останавливаем всплытие события, чтобы избежать его у document
      toggleActive();
  });

  // Удаление класса active при клике вне блока object-list
  document.addEventListener('click', function (event) {
      if (!objectList.contains(event.target) && !objectBtn.contains(event.target)) {
          objectList.classList.remove('active');
          objectBtn.classList.remove('active');
      }
  });

  // Удаление класса active, если курсор покинул блок object-list
  objectList.addEventListener('mouseleave', function () {
      objectList.classList.remove('active');
      objectBtn.classList.remove('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const blocksContainer = document.querySelector('.index-hero__content-scroll__blocks');
  const blocks = Array.from(document.querySelectorAll('.index-hero__content-scroll__blocks-block'));
  const paginations = Array.from(document.querySelectorAll('.index-hero__content-scroll__controll-paginations span'));
  const btnPrev = document.getElementById('index-scroll-prev');
  const btnNext = document.getElementById('index-scroll-next');

  let currentIndex = 0;
  let blockWidth = blocks[0].offsetWidth;
  let blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
  let startX = 0;
  let endX = 0;

  // Функция для плавного ускорения и замедления (ease in-out quad)
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  function updatePagination() {
    paginations.forEach((pagination, index) => {
      pagination.classList.toggle('active', index === currentIndex);
    });
  }

  function updateDimensions() {
    blockWidth = blocks[0].offsetWidth;
    blockMarginRight = parseFloat(window.getComputedStyle(blocks[0]).marginRight);
    updateBlockPosition(0); // Обновляем позицию без анимации при изменении размера окна
  }

  // Анимация перехода с использованием easeInOutQuad
  function animateScroll(targetOffset) {
    const start = parseFloat(window.getComputedStyle(blocksContainer).transform.split(',')[4]) || 0; // Текущая позиция
    const distance = targetOffset - start;
    const duration = 500; // Длительность анимации в мс
    let startTime = null;

    function animationStep(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1); // Время, прошедшее с начала анимации
      const easedProgress = easeInOutQuad(progress); // Применение easing функции для плавности

      blocksContainer.style.transform = `translateX(${start + distance * easedProgress}px)`; // Сдвиг контейнера

      if (progress < 1) {
        requestAnimationFrame(animationStep); // Запрашиваем следующее кадро анимации
      }
    }

    requestAnimationFrame(animationStep); // Запуск анимации
  }

  function updateBlockPosition() {
    const targetOffset = -(blockWidth + blockMarginRight) * currentIndex;
    animateScroll(targetOffset);
  }

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateBlockPosition();
      updatePagination();
    }
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex < blocks.length - 1) {
      currentIndex++;
      updateBlockPosition();
      updatePagination();
    }
  });

  // Обработчики для свайпа
  blocksContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Начальная позиция пальца
  });

  blocksContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX; // Конечная позиция пальца
  });

  blocksContainer.addEventListener('touchend', () => {
    const swipeDistance = startX - endX; // Расстояние свайпа
    if (Math.abs(swipeDistance) > 50) { // Если свайп достаточно длинный
      if (swipeDistance > 0) {
        // Свайп влево (вперед)
        if (currentIndex < blocks.length - 1) {
          currentIndex++;
        }
      } else {
        // Свайп вправо (назад)
        if (currentIndex > 0) {
          currentIndex--;
        }
      }
      updateBlockPosition();
      updatePagination();
    }
  });

  window.addEventListener('resize', updateDimensions);

  updatePagination();
});

document.addEventListener("DOMContentLoaded", () => {
  const productLists = document.querySelectorAll('.scroll-list'); // Находим все элементы с этим классом
  const maxScrollStep = 40; // Максимальная длина шага прокрутки

  // Функция плавного скроллинга для одного элемента
  function startSmoothScroll(container, targetScrollPosition) {
    let isScrolling = false;
    let animationFrameId;

    function smoothScrollStep() {
      const currentScrollPosition = container.scrollLeft;
      const difference = targetScrollPosition - currentScrollPosition;

      if (Math.abs(difference) > 1) {
        const scrollStep = Math.sign(difference) * Math.min(maxScrollStep, Math.abs(difference));
        container.scrollLeft += scrollStep;
        animationFrameId = requestAnimationFrame(smoothScrollStep);
      } else {
        isScrolling = false;
        container.scrollLeft = targetScrollPosition;
        cancelAnimationFrame(animationFrameId);
      }
    }

    if (!isScrolling) {
      isScrolling = true;
      animationFrameId = requestAnimationFrame(smoothScrollStep);
    }
  }

  // Проверка переполнения контейнера
  function isOverflowing(container) {
    return container.scrollWidth > container.clientWidth;
  }

  // Добавление обработчиков событий для всех контейнеров
  productLists.forEach((container) => {
    let targetScrollPosition = 0;

    // Обработчик колеса мыши
    container.addEventListener('wheel', (event) => {
      if (isOverflowing(container)) {
        event.preventDefault();
        targetScrollPosition += event.deltaY;
        targetScrollPosition = Math.max(
          0,
          Math.min(targetScrollPosition, container.scrollWidth - container.clientWidth)
        );
        startSmoothScroll(container, targetScrollPosition);
      }
    });

    // Обработчик для свайпа на мобильных устройствах
    let startX;

    container.addEventListener('touchstart', (event) => {
      if (isOverflowing(container)) {
        startX = event.touches[0].clientX;
        cancelAnimationFrame(animationFrameId); // Останавливаем предыдущее движение
      }
    });

    container.addEventListener('touchmove', (event) => {
      if (isOverflowing(container) && startX) {
        const touchX = event.touches[0].clientX;
        const scrollDelta = startX - touchX;
        targetScrollPosition += scrollDelta;
        targetScrollPosition = Math.max(
          0,
          Math.min(targetScrollPosition, container.scrollWidth - container.clientWidth)
        );
        startX = touchX;
        startSmoothScroll(container, targetScrollPosition);
      }
    });

    container.addEventListener('touchend', () => {
      startX = null;
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const article = document.querySelector('.index-ourFacilities__content-info__article');
  const articleTop = document.querySelector('.index-ourFacilities__content-info__article-top');
  const expandBtn = document.querySelector('.index-ourFacilities__content-info__btn');

  if (window.innerWidth <= 768) {
    // Устанавливаем начальную высоту блока, равную высоте блока articleTop
    article.style.height = `${articleTop.offsetHeight}px`;

    // Функция для смены высоты блока и текста кнопки при клике
    expandBtn.addEventListener('click', function() {
      if (expandBtn.classList.contains('active')) {
        // Скрыть элементы - вернуть высоту к высоте блока articleTop
        article.style.height = `${articleTop.offsetHeight}px`;
        expandBtn.querySelector('p').textContent = 'Раскрыть'; // Меняем текст на "Раскрыть"
      } else {
        // Раскрыть элементы - установить высоту на "авто" для раскрытия всех вложенных элементов
        article.style.height = `${article.scrollHeight}px`;
        expandBtn.querySelector('p').textContent = 'Свернуть'; // Меняем текст на "Свернуть"
      }
      // Переключаем класс active на кнопке
      expandBtn.classList.toggle('active');
    });
  }
});






document.addEventListener("DOMContentLoaded", function () {
  // Элементы для навигации
  const btnVideo = document.getElementById("index-btn-stocks-stocks");
  const btnRead = document.getElementById("index-btn--stocks-news");
  const reviewsVideoBlocks = document.querySelector(".stocks-list");
  const reviewsReadBlocks = document.querySelector(".news-list");
  const btnPrev = document.getElementById("index-btn--stocks-prev");
  const btnNext = document.getElementById("index-btn--stocks-next");

  // Начальные настройки
  let activeBlock = reviewsVideoBlocks; // По умолчанию показываем reviewsVideoBlocks
  let cardWidth = activeBlock.querySelector("div").offsetWidth;
  let marginRight = parseInt(window.getComputedStyle(activeBlock.querySelector("div")).marginRight);
  let scrollWidth = cardWidth + marginRight;

  // Функция для переключения видимых блоков
  function toggleActiveBlock(showElement, hideElement, activeButton, inactiveButton) {
    // Показать нужный блок и скрыть другой
    showElement.style.display = "flex";
    hideElement.style.display = "none";

    // Обновляем активную кнопку
    activeButton.classList.add("active");
    inactiveButton.classList.remove("active");

    // Переназначаем активный блок для прокрутки
    activeBlock = showElement;

    // Обновление ширины карточек
    cardWidth = activeBlock.querySelector("div").offsetWidth;
    marginRight = parseInt(window.getComputedStyle(activeBlock.querySelector("div")).marginRight);
    scrollWidth = cardWidth + marginRight;

    activeBlock.scrollTo({ left: 0 }); // Сброс прокрутки
  }

  // Переключение блоков по клику на кнопки "Посмотреть" и "Прочитать"
  btnVideo.addEventListener("click", () => toggleActiveBlock(reviewsVideoBlocks, reviewsReadBlocks, btnVideo, btnRead));
  btnRead.addEventListener("click", () => toggleActiveBlock(reviewsReadBlocks, reviewsVideoBlocks, btnRead, btnVideo));

  // Функция для плавного скроллинга
  let isScrolling = false; // Флаг для предотвращения повторного нажатия

  function smoothScroll(direction) {
    if (isScrolling) return; // Если уже происходит скроллинг, выходим из функции
    isScrolling = true; // Устанавливаем флаг, что скроллинг начался

    activeBlock.scrollBy({
      left: direction * scrollWidth,
      behavior: "smooth"
    });

    // Сбрасываем флаг через небольшую задержку
    setTimeout(() => {
      isScrolling = false;
    }, 400); // Подождем 400 мс перед тем, как разрешить новый скроллинг
  }

  // Обработчики для кнопок "предыдущий" и "следующий"
  btnPrev.addEventListener("click", () => smoothScroll(-1));
  btnNext.addEventListener("click", () => smoothScroll(1));

  // Добавление свайпа для прокрутки на мобильных устройствах
  let startX = 0;
  let currentX = 0;

  activeBlock.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  activeBlock.addEventListener("touchmove", (e) => {
    currentX = e.touches[0].clientX;
  });

  activeBlock.addEventListener("touchend", () => {
    if (startX - currentX > 50) {
      smoothScroll(1); // Прокрутка вправо
    } else if (currentX - startX > 50) {
      smoothScroll(-1); // Прокрутка влево
    }
  });

});





