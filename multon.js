(() => {
    const pluginName = 'replaceAnimeTitleToCartoons';
    let replaced = false;
    let retryCount = 0;
    const maxRetries = 10;
    const retryDelay = 500;

    function log(...args) {
        console.log(`[${pluginName}]`, ...args);
    }

    function findMenuItems() {
        // Проверяем возможные места хранения меню
        if (Lampa.Plugins && Lampa.Plugins.menu && Array.isArray(Lampa.Plugins.menu.items)) {
            return Lampa.Plugins.menu.items;
        }
        if (Lampa.Menu && Array.isArray(Lampa.Menu.items)) {
            return Lampa.Menu.items;
        }
        // Можно добавить сюда другие варианты, если нужно
        return null;
    }

    function updateMenuUI() {
        try {
            // Пробуем вызвать перерисовку через известные методы
            if (Lampa.Activity && typeof Lampa.Activity.render === 'function') {
                Lampa.Activity.render();
                log('Вызвана перерисовка Lampa.Activity');
            } else {
                // Если такого метода нет, можно пробросить событие или сделать костыль
                Lampa.Listener.send('menu_reload');
                log('Отправлено событие menu_reload');
            }
        } catch (e) {
            log('Ошибка при обновлении UI:', e);
        }
    }

    function replaceTitle(menuItems) {
        try {
            if (replaced) return;

            const animeItem = menuItems.find(item => item.component === 'anime');

            if (animeItem) {
                if (animeItem.title !== 'Мультфильмы') {
                    animeItem.title = 'Мультфильмы';
                    replaced = true;
                    log('Заголовок пункта "anime" заменён на "Мультфильмы"');
                    updateMenuUI();
                } else {
                    log('Заголовок уже заменён');
                }
            } else {
                log('Пункт "anime" не найден в меню');
            }
        } catch (e) {
            log('Ошибка при замене заголовка:', e);
        }
    }

    function tryReplace() {
        if (replaced) return;

        const menuItems = findMenuItems();

        if (menuItems && menuItems.length) {
            replaceTitle(menuItems);
        } else {
            if (retryCount < maxRetries) {
                retryCount++;
                log(`Меню не найдено, попытка ${retryCount} из ${maxRetries}`);
                setTimeout(tryReplace, retryDelay);
            } else {
                log('Максимальное число попыток достигнуто, замена отменена');
            }
        }
    }

    // Ждём загрузки приложения
    Lampa.Listener.follow('app', function onAppLoad(e) {
        if (e.loaded) {
            log('Приложение загружено, запускаем замену...');
            tryReplace();
        }
    });

    if (Lampa.Plugins) {
        Lampa.Plugins[pluginName] = {
            name: 'Замена "Аниме" на "Мультфильмы"',
            version: '1.1',
            author: 'ChatGPT',
        };
    }
})();
