function ready(){
    html.find('.selector').data('binded_events',true).on('hover:enter',(e)=>{
        let action = $(e.target).data('action')
        let type   = $(e.target).data('type')

        if(action == 'catalog') catalog()

        if(action == 'movie' || action == 'tv' || action == 'anime'){
            Activity.push({
                url: action,
                title: (action == 'movie' ? Lang.translate('menu_movies') : action == 'anime' ? Lang.translate('menu_anime') : Lang.translate('menu_tv')) + ' - ' + Storage.field('source').toUpperCase(),
                component: 'category',
                source: action == 'anime' ? 'cub' : Storage.field('source')
            })
        }

        if(prepared(action,['main'])){
            Activity.push({
                url: '',
                title: Lang.translate('title_main') + ' - ' + Storage.field('source').toUpperCase(),
                component: 'main',
                source: Storage.field('source')
            })
        }

        if(prepared(action,['myperson'])){
            Activity.push({
                title: Lang.translate('title_persons'),
                component: 'myperson'
            })
        }

        if(action == 'search')   Controller.toggle('search')
        if(action == 'settings'){
            ParentalControl.personal('settings',()=>{
                Controller.toggle('settings')
            }, false, true)
        } 
        if(action == 'about'){
            let about = Template.get('about')

            if(window.lampa_settings.white_use){
                about.find('.about__contacts > div:eq(1)').remove()
            }

            if(Platform.is('android')){
                about.find('.platform_android').removeClass('hide')
                about.find('.version_android').text(Platform.version('android'))
            }

            about.find('.version_app').text(Platform.version('app'))

            Modal.open({
                title: Lang.translate('title_about'),
                html: about,
                size: 'medium',
                onBack: ()=>{
                    Modal.close()
                    Controller.toggle('content')
                }
            })
        }

        if(action == 'favorite'){
            ParentalControl.personal('bookmarks',()=>{
                if(prepared('bookmarks',['bookmarks'])){
                    Activity.push({
                        url: '',
                        title: Lang.translate('settings_input_links'),
                        component: 'bookmarks',
                        page: 1
                    })
                }
            }, false, true)
        }

        if(action == 'history'){
            ParentalControl.personal('bookmarks',()=>{
                if(prepared('favorite',['favorite'])){
                    Activity.push({
                        url: '',
                        title: Lang.translate('title_history'),
                        component: 'favorite',
                        type: 'history',
                        page: 1
                    })
                }
            }, false, true)
        }

        if(action == 'subscribes'){
            Activity.push({
                url: '',
                title: Lang.translate('title_subscribes'),
                component: 'subscribes',
                page: 1
            })
        }

        if(prepared(action,['timetable'])){
            Activity.push({
                url: '',
                title: Lang.translate('title_timetable'),
                component: 'timetable',
                page: 1
            })
        }

        if(prepared(action,['feed'])){
            Activity.push({
                url: '',
                title: Lang.translate('menu_feed'),
                component: 'feed',
                page: 1
            })
        }

        if(prepared(action,['mytorrents'])){
            Activity.push({
                url: '',
                title: Lang.translate('title_mytorrents'),
                component: 'mytorrents',
                page: 1
            })
        }

        if(prepared(action,['relise'])){
            Activity.push({
                url: '',
                title: Lang.translate('title_relises'),
                component: 'relise',
                page: 1
            })
        }

        if(action == 'console'){
            Controller.toggle('console')
        }

        if(action == 'filter') Filter.show()

    }).on('hover:focus',(e)=>{
        last = e.target
        scroll.update($(e.target),true)
    }).on('hover:hover hover:touch',(e)=>{
        last = e.target
    })

    // Вызов функции перестановки пунктов меню
    reorderMenuItems()
}

// Функция перестановки пункта "Мультфильмы" после "Фильмы"
function reorderMenuItems() {
    let list = $('.menu__list:eq(0)', html)
    let movies = list.find('.menu__item:contains("Фильмы")')
    let cartoons = list.find('.menu__item:contains("Мультфильмы")')

    if(movies.length && cartoons.length) {
        cartoons.insertAfter(movies)
    }
}
