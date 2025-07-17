"use strict";
(function() {

  var iconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" 
         viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" 
         stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-mickey">
      <path d="M4.58 2.5a3 3 0 0 1 2.78 4.11a6 6 0 0 0 -2.07 1.83a3 3 0 1 1 -.71 -5.94z" />
      <path d="M15.42 2.5a3 3 0 1 1 -.71 5.94a6 6 0 0 0 -2.07 -1.83a3 3 0 0 1 2.78 -4.11z" />
      <path d="M10 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
    </svg>`;

  var addMultMenuItem = function() {
    var title = "Мультфильмы";
    var sources = ["tmdb", "cub"];

    var item = $(`
      <li class="menu__item selector" data-action="mad_mult">
        <div class="menu__ico">${iconSvg}</div>
        <div class="menu__text">${title}</div>
      </li>
    `);

    item.on("hover:focus", function() {});
    item.on("hover:blur", function() {});

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

    menu.find('[data-action="anime"]').remove();

    var filmItem = menu.find('.menu__item').filter(function() {
      return $(this).find('.menu__text').text().trim() === 'Фильмы';
    });

    if (filmItem.length) {
      filmItem.after(item);
    } else {
      menu.append(item);
    }
  };

  if (window.appready) {
    addMultMenuItem();
  } else {
    Lampa.Listener.follow("app", function(e) {
      if (e.type === "ready") addMultMenuItem();
    });
  }

})();
