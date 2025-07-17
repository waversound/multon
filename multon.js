(() => {
    const plugin_id = 'plugin_multik_menu';
    const menu_id = 'menu_item_multik';

    function createMenuItem() {
        const item = document.createElement('div');
        item.className = 'menu__item selector';
        item.textContent = 'Мультфильмы';
        item.id = menu_id;

        item.addEventListener('hover:enter', () => {
            try {
                Lampa.Activity.push({
                    component: 'category',
                    url: 'movie',
                    source: 'tmdb',
                    filter: {
                        genre: ['мультфильм']
                    },
                    page: 1,
                    name: 'Мультфильмы'
                });
            } catch (e) {
                console.error(`[${plugin_id}] Ошибка при открытии категории`, e);
                Lampa.Noty.show('Не удалось открыть мультфильмы');
            }
        });

        return item;
    }

    function insertMenuItem() {
        if (document.getElementById(menu_id)) return;

        const menu = document.querySelector('.menu__list') || document.querySelector('.menu');

        if (menu) {
            const item = createMenuItem();

            // Добавляем перед "Избранное", если оно есть
            const favorite = [...menu.children].find(el =>
                el.textContent.trim().toLowerCase() === 'избранное'
            );

            if (favorite) {
                menu.insertBefore(item, favorite);
            } else {
                menu.appendChild(item);
            }

            console.log(`[${plugin_id}] Пункт "Мультфильмы" добавлен`);
        }
    }

    const observer = new MutationObserver(insertMenuItem);
    observer.observe(document.body, { childList: true, subtree: true });

    insertMenuItem();

    // Регистрация плагина (для интерфейса Lampa)
    if (window.Lampa?.Plugins) {
        Lampa.Plugins[plugin_id] = {
            name: 'Меню Мультфильмы',
            version: '1.0',
            author: 'ChatGPT',
        };
    }
})();
