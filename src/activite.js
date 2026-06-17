import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import ActiviteApp from './ActiviteApp.vue'
import './styles/style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('./views/ActiviteList.vue') },
    { path: '/projecteur', component: () => import('./views/projecteur.vue') },
    { path: '/decorateur', component: () => import('./views/decorateur.vue') },
    { path: '/disque-d-or', component: () => import('./views/disque-d-or.vue') },
    { path: '/galerie', component: () => import('./views/galerie.vue') },
  ],
})

createApp(ActiviteApp).use(router).mount('#app')
