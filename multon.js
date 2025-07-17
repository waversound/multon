(() => {
    try {
        const active = Lampa.Activity && Lampa.Activity.active;
        if (!active) {
            Lampa.Noty.show('Нет активного экрана');
            return;
        }

        // Пробуем взять пункты меню из активного экрана
        let menuItems = null;

        if (active.items && Array.isArray(active.items)) {
            menuItems = active.items;
        } else if (active.menu && Array.isArray(active.menu)) {
            menuItems = active.menu;
        }

        if (!menuItems) {
            Lampa.Noty.show('Пункты меню не найдены в активном экране');
            return;
        }

        let message = 'Пункты меню (активный экран):\n\n';
        menuItems.forEach((item, index) => {
            message += `${index + 1}. title: "${item.title}", component: "${item.component}"\n`;
        });

        Lampa.Noty.show(message, 10000); // Показываем уведомление 10 секунд
    } catch (e) {
        Lampa.Noty.show('Ошибка при получении меню');
    }
})();
