"use strict";
(function() {
  var iconInactive = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z"/>
      <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z"/>
      <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
    </svg>`;

  var iconActive = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <!-- сюда можешь вставить активную иконку, например с увеличенной толщиной stroke -->
      <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z"/>
      <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z"/>
      <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
    </svg>`;

  var a = function() {
    var b = "Мультфильмы";
    var c = ["tmdb", "cub"];
    var d = "[data-action=\"tv\"]";
    
    var f = $(`
      <li class="menu__item selector" data-action="mad_mult">
        <div class="menu__ico">${iconInactive}</div>
        <div class="menu__text">${b}</div>
      </li>
    `);

    // При активации пункта меню меняем иконку
    f.on("hover:focus", function() {
      $(this).find(".menu__ico").html(iconActive);
    });

    // При потере фокуса возвращаем неактивную иконку
    f.on("hover:blur", function() {
      $(this).find(".menu__ico").html(iconInactive);
    });

    f.on("hover:enter", function() {
      var a = Lampa.Activity.active(),
          e = a.source,
          source = c.includes(e) ? e : c[0];
      Lampa.Activity.push({
        url: "movie",
        title: `${b} - ${source.toUpperCase()}`,
        component: "category",
        genres: 16,
        id: 16,
        source: source,
        card_type: true,
        page: 1
      });
    });

    Lampa.Menu.render().find(d).after(f);
  };

  window.appready ? a() : Lampa.Listener.follow("app", function(b) {
    if(b.type === "ready") a();
  });
})();
