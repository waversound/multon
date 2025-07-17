(() => {
    try {
        let menuItems = null;

        if (Lampa.Plugins && Lampa.Plugins.menu && Array.isArray(Lampa.Plugins.menu.items)) {
            menuItems = Lampa.Plugins.menu.items;
        } else if (Lampa.Menu && Array.isArray(Lampa.Menu.items)) {
            menuItems = Lampa.Menu.items;
        }

        if (!menuItems) {
            Lampa.Noty.show('Меню не найдено');
            return;
        }

        let message = 'Пункты меню:\n\n';
        menuItems.forEach((item, index) => {
            message += `${index + 1}. title: "${item.title}", component: "${item.component}"\n`;
        });

        Lampa.Noty.show(message, 10000); // Показывает уведомление на 10 секунд
    } catch (e) {
        Lampa.Noty.show('Ошибка при получении меню');
    }
})();
