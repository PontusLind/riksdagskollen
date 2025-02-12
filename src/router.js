import { createRouter, createWebHashHistory } from 'vue-router'

import AboutView from './views/AboutView.vue'
import HomeView from './views/HomeView.vue'
import MemberView from './views/MemberView.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            component: AboutView,
            path: '/about'
        },
        {
            component: MemberView,
            path: '/member'
        },
        {
            component: MemberView,
            path: '/member/:id'

        },
        {
            component: HomeView,
            path: '/'
        },
    ]
})
