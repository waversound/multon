(() => {
    const pluginName = 'replaceAnimeTitleDom';
    let replaced = false;

    function tryReplace() {
        if (replaced) return;

        try {
            // Поищем все элементы меню (обычно это li или div с классом)
            const menuElements = document.querySelectorAll('nav, .menu, .menu__item, .menu-item, li, div');

            for (const el of menuElements) {
                // Проверяем, есть ли текст "Аниме" в элементе (учитываем возможный регистр)
                if (el.textContent && el.textContent.trim().toLowerCase() === 'аниме') {
                    // Меняем текст на "Мультфильмы"
                    el.textContent = 'Мультфильмы';
                    replaced = true;
                    console.log(`[${pluginName}] Пункт меню "Аниме" заменён на "Мультфильмы"`);
                    break;
                }
            }
        } catch (e) {
            console.error(`[${pluginName}] Ошибка при замене текста:`, e);
        }
    }

    // Наблюдатель за изменениями в DOM (вся страница)
    const observer = new MutationObserver(() => {
        if (!replaced) {
            tryReplace();
        }
    });

    // Запускаем наблюдение за всем телом документа с отслеживанием изменений в поддеревьях
    observer.observe(document.body, { childList: true, subtree: true });

    // Попытка заменить сразу, если меню уже загружено
    tryReplace();

    // Регистрируем плагин в Lampa (если нужно)
    if (Lampa && Lampa.Plugins) {
        Lampa.Plugins[pluginName] = {
            name: 'Замена пункта "Аниме" на "Мультфильмы" (DOM)',
            version: '1.0',
            author: 'ChatGPT',
        };
    }
})();
