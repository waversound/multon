(() => {
    const pluginName = 'replaceAnimeTitleDomSafe';
    let replaced = false;

    function replaceTextInNode(node, searchText, replaceText) {
        for (let child of node.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                if (child.textContent.trim().toLowerCase() === searchText.toLowerCase()) {
                    child.textContent = replaceText;
                    return true;
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                if (replaceTextInNode(child, searchText, replaceText)) return true;
            }
        }
        return false;
    }

    function tryReplace() {
        if (replaced) return;

        try {
            // Выбираем все элементы меню (возможно, li, div с классами меню)
            const menuElements = document.querySelectorAll('nav, .menu, .menu__item, .menu-item, li, div');

            for (const el of menuElements) {
                if (replaceTextInNode(el, 'аниме', 'Мультфильмы')) {
                    replaced = true;
                    console.log(`[${pluginName}] Пункт меню "Аниме" заменён на "Мультфильмы"`);
                    break;
                }
            }
        } catch (e) {
            console.error(`[${pluginName}] Ошибка при замене текста:`, e);
        }
    }

    const observer = new MutationObserver(() => {
        if (!replaced) {
            tryReplace();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    tryReplace();

    if (Lampa && Lampa.Plugins) {
        Lampa.Plugins[pluginName] = {
            name: 'Безопасная замена пункта "Аниме" на "Мультфильмы" (DOM)',
            version: '1.0',
            author: 'ChatGPT',
        };
    }
})();
