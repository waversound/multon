(() => {
    const pluginName = 'officialCartoonMenu';
    const menuId = 'multik_custom';

    // Проверка, чтобы не добавить повторно
    if (Lampa.Menu.get(menuId)) {
        console.log(`[${pluginName}] Пункт уже существует`);
        return;
    }

    Lampa.Menu.append({
        title: 'Мультфильмы',
        component: 'anime', // или другой компонент, если хочешь свой
        id: menuId,         // уникальный ID пункта
        position: 3         // позиция в списке (чем меньше, тем выше)
    });

    console.log(`[${pluginName}] Пункт "Мультфильмы" добавлен через Lampa.Menu`);

    // Регистрируем плагин (не обязательно, но красиво)
    if (Lampa.Plugins) {
        Lampa.Plugins[pluginName] = {
            name: 'Добавление "Мультфильмы" через Lampa.Menu',
            version: '1.0',
            author: 'ChatGPT',
        };
    }
})();
