"use strict";

(function () {
    function init() {
        const menuTitle = 'Мультфильмы';
        const sourcePriority = ['tmdb', 'cub'];

        const inactiveIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" 
                 width="24" height="24" viewBox="0 0 24 24" 
                 fill="none" stroke="#999" stroke-width="2" 
                 stroke-linecap="round" stroke-linejoin="round" 
                 class="icon icon-tabler icon-tabler-mickey">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z" />
                <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z" />
                <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            </svg>`;

        const activeIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" 
                 width="24" height="24" viewBox="0 0 24 24" 
                 fill="none" stroke="#fff" stroke-width="2" 
                 stroke-linecap="round" stroke-linejoin="round" 
                 class="icon icon-tabler icon-tabler-mickey">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z" />
                <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z" />
                <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            </svg>`;

        const menuItem = $(`
            <li class="menu__item selector" data-action="mad_mult">
                <div class="menu__ico">
                    <span class="icon-default">${inactiveIcon}</span>
                    <span class="icon-active" style="display:none;">${activeIcon}</span>
                </div>
                <div class="menu__text">${menuTitle}</div>
            </li>
        `);

        menuItem.on("hover:enter", function () {
            const active = Lampa.Activity.active();
            const source = sourcePriority.includes(active.source) ? active.source : sourcePriority[0];

            Lampa.Activity.push({
                url: 'movie',
                title: `${menuTitle} - ${source.toUpperCase()}`,
                component: 'category',
                genres: 16,
                id: 16,
                source: source,
                card_type: true,
                page: 1
            });
        });

        // Меняем иконку по фокусу
        menuItem.on('hover:focus', function () {
            menuItem.find('.icon-default').hide();
            menuItem.find('.icon-active').show();
        });

        menuItem.on('hover:blur', function () {
            menuItem.find('.icon-default').show();
            menuItem.find('.icon-active').hide();
        });

        // Вставка и удаление
        const menu = Lampa.Menu.render();
        menu.find('[data-action="tv"]').after(menuItem);
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
