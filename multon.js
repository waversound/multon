(() => {
    const pluginName = 'multikMenuFinal';
    const menuId = 'menu_multik_final';

    function createMenuItem() {
        const item = document.createElement('div');
        item.className = 'menu__item selector';
        item.textContent = 'Мультфильмы';
        item.id = menuId;

        item.addEventListener('hover:enter', () => {
            try {
                Lampa.Activity.push({
                    url: '',
                    component: 'category',
                    name: 'Мультфильмы',
                    filter: {
                        genre: ['мультфильм'],
                        url: 'movie',
                        source: 'tmdb',
                        sort: 'year'
                    }
                });
            } catch (e) {
                console.error(`[${pluginName}] Ошибка при переходе в раздел мультфильмов:`, e);
                Lampa.Noty.show('Ошибка перехода в мультфильмы');
            }
        });

        return item;
    }

    function insertMenuItem() {
        if (document.getElementById(menuId)) return;

        const menu = document.querySelector('.menu__list, .menu, .layout__menu, nav');
        if (!menu) return;

        const newItem = createMenuItem();

        const insertBefore = [...menu.children].find(el =>
            el.textContent.trim().toLowerCase() === 'избранное'
        );

        if (insertBefore) {
            menu.insertBefore(newItem, insertBefore);
        } else {
            menu.appendChild(newItem);
        }

        console.log(`[${pluginName}] Пункт "Мультфильмы" добавлен`);
    }

    const observer = new MutationObserver(() => {
        insertMenuItem();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    insertMenuItem();

    if (Lampa?.Plugins) {
        Lampa.Plugins[pluginName] = {
            name: 'Меню "Мультфильмы"',
            version: '1.0',
            author: 'ChatGPT',
        };
    }
})();
