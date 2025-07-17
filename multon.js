"use strict";
(function() {

  // SVG иконка неактивная (пример)
  var iconInactive = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
         stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-mickey">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z" />
      <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z" />
      <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    </svg>`;

  // SVG иконка активная (пример, можно заменить)
  var iconActive = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
         stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-mickey">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z" />
      <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z" />
      <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    </svg>`;

  var addMultMenuItem = function() {
    var title = "Мультфильмы";
    var sources = ["tmdb", "cub"];
    var selector = '[data-action="tv"]'; // после Сериалы вставим

    // Создаем пункт меню с нужной иконкой (неактивной)
    var item = $(`
      <li class="menu__item selector" data-action="mad_mult">
        <div class="menu__ico">${iconInactive}</div>
        <div class="menu__text">${title}</div>
      </li>
    `);

    // Смена иконки при фокусе (активная)
    item.on("hover:focus", function() {
      $(this).find(".menu__ico").html(iconActive);
    });

    // Возврат неактивной иконки при снятии фокуса
    item.on("hover:blur", function() {
      $(this).find(".menu__ico").html(iconInactive);
    });

    // При выборе пункта меню - переход на категорию "мультфильмы"
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

    // Вставляем пункт после "Сериалы"
    var menu = Lampa.Menu.render();

    // Удаляем пункт "Аниме", если есть
    menu.find('[data-action="anime"]').remove();

    // Вставляем "Мультфильмы"
    menu.find(selector).after(item);
  };

  // Запускаем после готовности приложения
  if (window.appready) {
    addMultMenuItem();
  } else {
    Lampa.Listener.follow("app", function(e) {
      if (e.type === "ready") addMultMenuItem();
    });
  }

})();
