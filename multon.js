"use strict";

(function () {
    function init() {
        const menuSelector = '[data-action="mad_mult"]';
        const menuTitle = 'Мультфильмы';
        const sourcePriority = ['tmdb', 'cub'];

        $(menuSelector).remove(); // удаляем если уже есть

        // Иконки: неактивная и активная
        const iconInactive = `
            <svg class="icon-mult icon-inactive" xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z" />
                <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z" />
                <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            </svg>`;

        const iconActive = `
            <svg class="icon-mult icon-active" xmlns="http://www.w3.org/2000/svg" 
                width="24" height="24" viewBox="0 0 24 24" fill="none" 
                stroke="white" stroke-width="2" stroke-linecap="round" 
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5.5 3a3.5 3.5 0 0 1 3.25 4.8a7.017 7.017 0 0 0 -2.424 2.1a3.5 3.5 0 1 1 -.826 -6.9z" />
                <path d="M18.5 3a3.5 3.5 0 1 1 -.826 6.902a7.013 7.013 0 0 0 -2.424 -2.103a3.5 3.5 0 0 1 3.25 -4.799z" />
                <path d="M12 14m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            </svg>`;

        const item = $(`
            <li class="menu__item selector" data-action="mad_mult">
                <div class="menu__ico">
                    ${iconInactive}
                    ${iconActive}
                </div>
                <div class="menu__text">${menuTitle}</div>
            </li>
        `);

        // Действие при выборе
        item.on("hover:enter", function () {
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

        // Вставить пункт после "Сериалы"
        const menu = Lampa.Menu.render();
        menu.find('[data-action="tv"]').after(item);

        // Удалить "Аниме"
        menu.find('[data-action="anime"]').remove();
    }

    // Стили для переключения иконок
    const style = document.createElement('style');
    style.innerHTML = `
        .icon-active { display: none; }
        .icon-inactive { display: block; }

        .menu__item.focus[data-action="mad_mult"] .icon-inactive,
        .menu__item.active[data-action="mad_mult"] .icon-inactive {
            display: none;
        }

        .menu__item.focus[data-action="mad_mult"] .icon-active,
        .menu__item.active[data-action="mad_mult"] .icon-active {
            display: block;
        }
    `;
    document.head.appendChild(style);

    if (window.appready) {
        init();
    } else {
        Lampa.Listener.follow("app", function (e) {
            if (e.type === "ready") init();
        });
    }
})();
