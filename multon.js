"use strict";

(function () {
  var init = function () {
    var action = "mad_mult";
    var title = "Мультфильмы";

    // SVG Disney-иконка
    var menuIconSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
        viewBox="0 0 24 24" fill="none" stroke="currentColor" 
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="icon icon-tabler icons-tabler-outline icon-tabler-brand-disney">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3.22 5.838c-1.307 -.15 -1.22 -.578 -1.22 -.794c0 -.216 .424 -1.044 4.34 -1.044
          c4.694 0 14.66 3.645 14.66 10.042s-8.71 4.931 -10.435 4.52c-1.724 -.412 -5.565 -2.256
          -5.565 -4.174c0 -1.395 3.08 -2.388 6.715 -2.388c3.634 0 5.285 1.041 5.285 2c0 
          .5 -.074 1.229 -1 1.5" />
        <path d="M10.02 8a505.153 505.153 0 0 0 0 13" />
      </svg>
    `;

    var sources = ["tmdb", "cub"];
    var target = "[data-action=\"tv\"]"; // после сериалы

    var button = $(`
      <li class="menu__item selector" data-action="${action}">
        <div class="menu__ico">${menuIconSVG}</div>
        <div class="menu__text">${title}</div>
      </li>
    `);

    button.on("hover:enter", function () {
      var activity = Lampa.Activity.active();
      var currentSource = activity && activity.source;
      var useSource = sources.includes(currentSource) ? currentSource : sources[0];

      Lampa.Activity.push({
        url: "movie",
        title: `${title} - ${useSource.toUpperCase()}`,
        component: "category",
        genres: 16, // Жанр "мультфильмы" в TMDB
        id: 16,
        source: useSource,
        card_type: true,
        page: 1
      });
    });

    // Добавить новый пункт после "Сериалы"
    Lampa.Menu.render().find(target).after(button);

    // Удалить пункт "Аниме"
    Lampa.Menu.render().find('[data-action="anime"]').remove();
  };

  if (window.appready) {
    init();
  } else {
    Lampa.Listener.follow("app", function (e) {
      if (e.type === "ready") init();
    });
  }
})();
