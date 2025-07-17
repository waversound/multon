"use strict";
(function() {

  // SVG иконка "Мультфильмы"
  var iconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon">
      <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z"/>
      <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z"/>
      <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
    </svg>`;

  var addMultMenuItem = function() {
    var title = "Мультфильмы";
    var sources = ["tmdb", "cub"];
    var selector = '[data-action="movie"]'; // вставляем после "Фильмы"

    var menu = Lampa.Menu.render();

    // Удаляем пункт "Аниме", если есть
    menu.find('[data-action="anime"]').remove();

    // Проверяем, что пункта "Мультфильмы" нет, чтобы не дублировать
    if(menu.find('[data-action="mad_mult"]').length === 0){
      // Создаем пункт меню
      var item = $(`
        <li class="menu__item selector" data-action="mad_mult">
          <div class="menu__ico">${iconSvg}</div>
          <div class="menu__text">${title}</div>
        </li>
      `);

      // Обработчик выбора пункта
      item.on("hover:enter", function() {
        var activity = Lampa.Activity.active();
        var source = sources.includes(activity.source) ? activity.source : sources[0];

        Lampa.Activity.push({
          url: "movie",
          title: `${title} - ${source.toUpperCase()}`,
          component: "category",
          genres: 16,
          id: 16,
          source: source,
          card_type: true,
          page: 1
        });
      });

      // Вставляем пункт меню после "Фильмы"
      menu.find(selector).after(item);
    }

    // Теперь сделаем правильный порядок пунктов с "Мультфильмами" после "Фильмы" и перед "Лента"
    reorderMenu();
  };

  function reorderMenu() {
    var menu = Lampa.Menu.render();
    var items = menu.find('.menu__item .menu__text').map(function() {
      return $(this).text().trim();
    }).get();

    // Удалим "Мультфильмы" чтобы не было дубликатов
    items = items.filter(i => i !== "Мультфильмы");

    // Индексы
    var indexFilms = items.indexOf("Фильмы");
    var indexTape = items.indexOf("Лента");

    if(indexFilms !== -1){
      items.splice(indexFilms + 1, 0, "Мультфильмы");
    }
    else if(indexTape !== -1){
      items.splice(indexTape, 0, "Мультфильмы");
    }
    else {
      items.push("Мультфильмы");
    }

    Storage.set('menu_sort', items);

    if(typeof orderSort === "function"){
      orderSort();
    }
  }

  // Запуск после готовности приложения
  if (window.appready) {
    addMultMenuItem();
  } else {
    Lampa.Listener.follow("app", function(e) {
      if (e.type === "ready") addMultMenuItem();
    });
  }

})();
