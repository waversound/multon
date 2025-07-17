(() => {
    const plugin = {
        name: 'multmovie_menu',
        version: '1.0',
        description: 'Добавляет пункт меню Мультфильмы вместо Аниме',

        init() {
            // Переопределяем меню
            Lampa.Listener.follow('menu', (event) => {
                if(event.action === 'ready') {
                    // Удаляем пункт Аниме из меню
                    event.instance.menu_items = event.instance.menu_items.filter(item => item.action !== 'anime');

                    // Добавляем пункт Мультфильмы
                    event.instance.menu_items.push({
                        title: Lampa.Lang.translate('menu_multmovie'),
                        action: 'multmovie',
                        icon: 'multmovie' // Можно заменить на иконку
                    });

                    // Обновляем отображение меню
                    event.instance.render();
                }

                // Обработка клика по новому пункту
                if(event.action === 'select' && event.item.action === 'multmovie') {
                    // Открываем подборку мультфильмов (здесь пример с категориями)
                    Lampa.Listener.trigger('content', {
                        type: 'collection',
                        collection: 'multmovie'
                    });
                    event.instance.close();
                }
            });
        }
    };

    Lampa.Plugins.add(plugin);
})();
