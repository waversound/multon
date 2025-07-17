"use strict";
(function() {

  // SVG иконка с размерами и стилями Lampa
  var iconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon">
      <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z"/>
      <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z"/>
      <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
    </svg>`;

  var addMultMenuItem = function() {
    var title = "Мультфильмы";
    var sources = ["tmdb", "cub"];
    var selector = '[data-action="movie"]'; // вставляем после "Фильмы"

    var item = $(`
      <li class="menu__item selector" data-action="mad_mult">
        <div class="menu__ico">${iconSvg}</div>
        <div class="menu__text">${title}</div>
      </li>
    `);

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

    var menu = Lampa.Menu.render();

    // Удаляем пункт "Аниме", если есть
    menu.find('[data-action="anime"]').remove();

    // Вставляем "Мультфильмы" после "Фильмы"
    menu.find(selector).after(item);
  };

  // Добавляем CSS для корректного размера иконки
  var style = document.createElement('style');
  style.textContent = `
    .menu__ico {
      width: 1.5em;
      height: 1.5em;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .menu__ico svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  `;
  document.head.appendChild(style);

  if (window.appready) {
    addMultMenuItem();
  } else {
    Lampa.Listener.follow("app", function(e) {
      if (e.type === "ready") addMultMenuItem();
    });
  }

})();
