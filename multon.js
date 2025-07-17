(() => {
    const plugin_id = 'plugin_menu_multmovie';
    const menu_id = 'multmovie';

    if (!Lampa.Menu.get(menu_id)) {
        Lampa.Menu.append({
            title: Lampa.Lang.translate('menu_multmovie') || 'Мультфильмы',
            component: 'category',
            id: menu_id,
            position: 3,
            url: 'movie',
            source: 'tmdb',
            filter: {
                genre: ['мультфильм']
            }
        });

        console.log(`[${plugin_id}] Пункт "Мультфильмы" добавлен через локализацию`);
    }

    if (window.Lampa?.Plugins) {
        Lampa.Plugins[plugin_id] = {
            name: 'Меню "Мультфильмы" (через локализацию)',
            version: '1.0',
            author: 'ChatGPT'
        };
    }
})();
