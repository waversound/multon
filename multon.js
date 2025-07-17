"use strict";

(function() {
  var menuSelector = '[data-action="mad_mult"]';
  var menuText = "Мультфильмы";
  var sources = ["tmdb", "cub"];
  var tvSelector = '[data-action="tv"]';

  // Вставка пункта меню после TV
  function insertMenuItem(menu) {
    // Создаём элемент пункта меню с твоей SVG-иконкой
    var menuItem = $(`
      <li class="menu__item selector" data-action="mad_mult">
        <div class="menu__ico">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z" />
            <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z" />
            <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          </svg>
        </div>
        <div class="menu__text">${menuText}</div>
      </li>
    `);

    // Обработчик выбора пункта меню
    menuItem.on("hover:enter", function() {
      var activeActivity = Lampa.Activity.active();
      var source = activeActivity.source;
      var usedSource = sources.includes(source) ? source : sources[0];

      Lampa.Activity.push({
        url: "movie",
        title: `${menuText} - ${usedSource.toUpperCase()}`,
        component: "category",
        genres: 16,
        id: 16,
        source: usedSource,
        card_type: true,
        page: 1
      });
    });

    // Вставляем пункт после ТВ
    Lampa.Menu.render().find(tvSelector).after(menuItem);
  }

  // Удаление пункта "Аниме"
  function removeAnime() {
    $('[data-action="anime"]').remove();
  }

  // Инициализация плагина после готовности приложения
  function init() {
    var menu = Lampa.Menu.render();

    // Удаляем аниме
    removeAnime();

    // Вставляем мультфильмы
    insertMenuItem(menu);
  }

  if (window.appready) {
    init();
  } else {
    Lampa.Listener.follow("app", function(event) {
      if (event.type === "ready") init();
    });
  }
})();
