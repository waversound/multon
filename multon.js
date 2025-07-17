"use strict";
(function(){
  var a = "[data-action=\"mad_mult\"]",
      b = "\u041C\u0443\u043B\u044C\u0442\u0444\u0438\u043B\u044C\u043C\u044B",
      c = ["tmdb","cub"],
      d = "[data-action=\"tv\"]",
      e = function(a,b){
        return setTimeout(function(){
          return $(a).insertAfter($(b))
        }, 2000)
      },
      f = $(`
        <li class="menu__item selector" data-action="mad_mult">
          <div class="menu__ico">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z" />
              <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z" />
              <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            </svg>
          </div>
          <div class="menu__text">${b}</div>
        </li>
      `);

  f.on("hover:enter", function(){
    var a = Lampa.Activity.active(),
        d = a.source,
        e = c.includes(d) ? d : c[0];
    Lampa.Activity.push({
      url: "movie",
      title: `${b} - ${e.toUpperCase()}`,
      component: "category",
      genres: 16,
      id: 16,
      source: e,
      card_type: true,
      page: 1
    });
  });

  Lampa.Menu.render().find(d).after(f);
  e(a, d);
  // Убрали вставку аниме
  // e("[data-action=\"anime\"]", a);
})();
