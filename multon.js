(() => {
    const pluginName = 'addMultikItem';
    const targetComponent = 'anime'; // какой компонент открывать по нажатию
    const title = 'Мультфильмы';
    let added = false;

    function createMenuItem() {
        const item = document.createElement('div');
        item.className = 'menu__item selector';
        item.setAttribute('data-action', 'activity');
        item.setAttribute('data-component', targetComponent);
        item.textContent = title;
        return item;
    }

    function tryAddMenuItem() {
        if (added) return;

        // Пробуем найти контейнер бокового меню
        const menu = document.querySelector('.menu__list, .menu, nav, .sidebar, .layout__menu');

        if (menu && ![...menu.children].some(el => el.textContent.trim() === title)) {
            const newItem = createMenuItem();

            // Вставим перед пунктом "Избранное", если он есть
            const favoriteItem = [...menu.children].find(el => el.textContent.trim().toLowerCase() === 'избранное');

            if (favoriteItem) {
                menu.insertBefore(newItem, favoriteItem);
            } else {
                menu.appendChild(newItem);
            }

            added = true;
            console.log(`[${pluginName}] Пункт "${title}" добавлен в меню`);
        }
    }

    const observer = new MutationObserver(() => {
        tryAddMenuItem();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    tryAddMenuItem();

    if (Lampa && Lampa.Plugins) {
        Lampa.Plugins[pluginName] = {
            name: 'Добавление пункта "Мультфильмы"',
            version: '1.0',
            author: 'ChatGPT',
        };
    }
})();
