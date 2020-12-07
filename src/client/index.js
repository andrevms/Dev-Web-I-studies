//css
import './styles/base.scss'
import './styles/main.scss'
import './styles/cardTasks.scss'
import './styles/sideNav.scss'
import './styles/contextMenu.scss'
import './styles/login.scss'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

//images
import backgroundPhoto from './images/wattle-tree-5358904_1920.jpg'

//js
import { newEntry, postNewEntry, iconClickListener} from './js/newEntry'
import { openNav, closeNav } from './js/openNav'
import { login, openLogin, closeLogin, loadCards, createCard} from './js/login'

export {
    newEntry,
    postNewEntry,
    openNav,
    closeNav,
    login,
    openLogin,
    closeLogin,
    loadCards,
    iconClickListener,
    createCard
}