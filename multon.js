"use strict";

(function () {
    function init() {
        const menuTitle = 'Мультфильмы';

        const svgIcon = `
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="100%" height="100%" viewBox="0 0 24 24"
                 fill="currentColor"
                 class="icon icon-tabler icon-tabler-mickey">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z" />
                <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z" />
                <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            </svg>`;

        const menuItem = $(`
            <li class="menu__item selector" data-action="mad_mult">
                <div class="menu__ico icon-mult-custom">${svgIcon}</div>
                <div class="menu__text">${menuTitle}</div>
            </li>
        `);

        menuItem.on("hover:enter", function () {
            Lampa.Activity.push({
                url: 'movie',
                title: `${menuTitle}`,
                component: 'category',
                genres: 16,
                id: 16,
                source: 'tmdb',
                card_type: true,
                page: 1
            });
        });

        // Добавляем пункт после "ТВ"
        const menu = Lampa.Menu.render();
        menu.find('[data-action="tv"]').after(menuItem);

        // Удаляем "Аниме"
        menu.find('[data-action="anime"]').remove();
    }

    if (window.appready) {
        init();
    } else {
        Lampa.Listener.follow("app", function (e) {
            if (e.type === "ready") init();
        });
    }
})();
