"use strict";
(function() {
  var iconInactive = `...`; // твоя неактивная иконка SVG
  var iconActive = `...`;   // твоя активная иконка SVG

  var addMultMenuItem = function() {
    var title = "Мультфильмы";
    var sources = ["tmdb", "cub"];
    var selector = '[data-action="tv"]';

    var item = $(`
      <li class="menu__item selector" data-action="mad_mult">
        <div class="menu__ico">${iconInactive}</div>
        <div class="menu__text">${title}</div>
      </li>
    `);

    item.on("hover:focus", function() {
      $(this).find(".menu__ico").html(iconActive);
    });

    item.on("hover:blur", function() {
      $(this).find(".menu__ico").html(iconInactive);
    });

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

    Lampa.Menu.render().find(selector).after(item);
  };

  window.appready ? addMultMenuItem() : Lampa.Listener.follow("app", function(e) {
    if (e.type === "ready") addMultMenuItem();
  });
})();
