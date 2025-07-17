(() => {
    const pluginName = 'multikMenuWithFilter';
    const menuId = 'menu_multik_item_custom';

    // Проверка: если уже есть пункт, не добавляем снова
    if (document.getElementById(menuId)) return;

    function createMenuItem() {
        const item = document.createElement('div');
        item.className = 'menu__item selector';
        item.textContent = 'Мультфильмы';
        item.dataset.action = 'multik_action';
        item.id = menuId;

        item.addEventListener('hover:enter', () => {
            Lampa.Activity.push({
                url: 'movie',
                genres: ['мультфильм'],
                title: 'Мультфильмы',
                component: 'category',
                page: 1,
                source: 'tmdb',
                search: '',
                filter: {},
            });
        });

        return item;
    }

    function insertMenuItem() {
        const menu = document.querySelector('.menu__list, .menu, .layout__menu, nav');

        if (menu && !document.getElementById(menuId)) {
            const item = createMenuItem();

            // Добавим перед "Избранное", если он есть
            const target = [...menu.children].find(el => el.textContent.trim().toLowerCase() === 'избранное');

            if (target) {
                menu.insertBefore(item, target);
            } else {
                menu.appendChild(item);
            }

            console.log(`[${pluginName}] Пункт "Мультфильмы" добавлен`);
        }
    }

    // Следим за появлением меню
    const observer = new MutationObserver(() => {
        insertMenuItem();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    insertMenuItem();

    // Регистрируем плагин (необязательно, но полезно)
    if (window.Lampa?.Plugins) {
        Lampa.Plugins[pluginName] = {
            name: 'Пункт меню "Мультфильмы"',
            version: '1.0',
            author: 'ChatGPT',
        };
    }
})();
