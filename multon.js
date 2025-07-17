"use strict";

(function(){

  // Название нового пункта меню и действие
  const menuAction = "mad_mult";
  const menuTitle = "Мультфильмы";

  // HTML иконка (SVG) для пункта меню — можно вынести отдельно для читаемости
  const menuIconSVG = `
    <svg height="173" viewBox="0 0 180 173" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M126 3C126 18.464 109.435 31 89 31C68.5655 31 52 18.464 52 3C52 2.4505 52.0209 1.90466 52.0622 1.36298C21.3146 15.6761 0 46.8489 0 83C0 132.706 40.2944 173 90 173C139.706 173 180 132.706 180 83C180 46.0344 157.714 14.2739 125.845 0.421326C125.948 1.27051 126 2.13062 126 3ZM88.5 169C125.779 169 156 141.466 156 107.5C156 84.6425 142.314 64.6974 122 54.0966C116.6 51.2787 110.733 55.1047 104.529 59.1496C99.3914 62.4998 94.0231 66 88.5 66C82.9769 66 77.6086 62.4998 72.4707 59.1496C66.2673 55.1047 60.3995 51.2787 55 54.0966C34.6864 64.6974 21 84.6425 21 107.5C21 141.466 51.2208 169 88.5 169Z" fill="currentColor"></path>
      <path d="M133 121.5C133 143.315 114.196 161 91 161C67.804 161 49 143.315 49 121.5C49 99.6848 67.804 116.5 91 116.5C114.196 116.5 133 99.6848 133 121.5Z" fill="currentColor"></path>
      <path d="M72 81C72 89.8366 66.1797 97 59 97C51.8203 97 46 89.8366 46 81C46 72.1634 51.8203 65 59 65C66.1797 65 72 72.1634 72 81Z" fill="currentColor"></path>
      <path d="M131 81C131 89.8366 125.18 97 118 97C110.82 97 105 89.8366 105 81C105 72.1634 110.82 65 118 65C125.18 65 131 72.1634 131 81Z" fill="currentColor"></path>
    </svg>
  `;

  // Функция создания пункта меню через jQuery
  function createMenuItem() {
    return $(`
      <li class="menu__item selector" data-action="${menuAction}">
        <div class="menu__ico">${menuIconSVG}</div>
        <div class="menu__text">${menuTitle}</div>
      </li>
    `);
  }

  // Основная функция инициализации пункта меню
  function initMenuItem() {
    const menuItem = createMenuItem();

    // Обработчик события выбора пункта меню
    menuItem.on("hover:enter", () => {
      const activeActivity = Lampa.Activity.active();
      const source = activeActivity.source;
      // Источники, поддерживающие мультфильмы
      const supportedSources = ["tmdb", "cub"];
      const currentSource = supportedSources.includes(source) ? source : supportedSources[0];

      // Открываем активность с подборкой мультфильмов (genres:16 - пример)
      Lampa.Activity.push({
        url: "movie",
        title: `${menuTitle} - ${currentSource.toUpperCase()}`,
        component: "category",
        genres: 16,
        id: 16,
        source: currentSource,
        card_type: true,
        page: 1
      });
    });

    // Вставляем новый пункт меню сразу после пункта с data-action="tv" (Сериалы)
    const menuContainer = Lampa.Menu.render();
    menuContainer.find('[data-action="tv"]').after(menuItem);

    // Дополнительно: можно вставить с небольшой задержкой, если меню загружается асинхронно
    setTimeout(() => {
      menuContainer.find('[data-action="tv"]').after(menuItem);
    }, 2000);
  }

  // Запускаем функцию, когда приложение готово
  if(window.appready) {
    initMenuItem();
  } else {
    Lampa.Listener.follow("app", event => {
      if(event.type === "ready") initMenuItem();
    });
  }

})();
