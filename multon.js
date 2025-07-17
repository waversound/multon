(() => {
    const pluginName = 'replaceAnimeTitleToCartoons';

    // Флаг для предотвращения повторной замены
    let replaced = false;

    // Функция замены названия пункта меню
    function replaceTitle(menuItems) {
        try {
            if (replaced) return;

            // Найдём пункт с component 'anime'
            const animeItem = menuItems.find(item => item.component === 'anime');

            if (animeItem && animeItem.title !== 'Мультфильмы') {
                animeItem.title = 'Мультфильмы';
                replaced = true;

                // Можно опционально обновить UI, если меню уже отрисовано
                if (Lampa.Activity.active) {
                    // Если меню - это Lampa.Activity, можно вызвать обновление меню
                    // Например, повторная отрисовка или перерисовка
                    if (typeof Lampa.Activity.render === 'function') {
                        Lampa.Activity.render();
                    }
                }
            }
        } catch (e) {
            console.error(`[${pluginName}] Ошибка при замене заголовка:`, e);
        }
    }

    // Следим за загрузкой приложения
    Lampa.Listener.follow('app', function onAppLoad(e) {
        try {
            if (!e.loaded) return;

            // Получаем меню из Lampa.Plugins (обычно меню лежит в plugins['menu'] или в Lampa.Menu)
            let menuItems = null;

            if (Lampa.Plugins && Lampa.Plugins.menu && Array.isArray(Lampa.Plugins.menu.items)) {
                menuItems = Lampa.Plugins.menu.items;
            } else if (Lampa.Menu && Array.isArray(Lampa.Menu.items)) {
                menuItems = Lampa.Menu.items;
            }

            if (!menuItems) {
                // Если меню не найдено, подождём ещё, можно повторить попытку
                setTimeout(() => {
                    Lampa.Listener.follow('app', onAppLoad);
                }, 500);
                return;
            }

            replaceTitle(menuItems);

        } catch (e) {
            console.error(`[${pluginName}] Ошибка при обработке app load:`, e);
        }
    });

    // Регистрируем плагин в Lampa.Plugins (если нужно)
    if (Lampa.Plugins) {
        Lampa.Plugins[pluginName] = {
            name: 'Замена "Аниме" на "Мультфильмы"',
            version: '1.0',
            author: 'ChatGPT',
        };
    }
})();
