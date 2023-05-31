import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/postvideo',
    name: 'postVideo',
    component: () => import(/* webpackChunkName: "postvideo" */ '../views/PostVideo.vue')
  },
  {
    path: '/video/:videoID',
    name: 'showVideo',
    component: () => import(/* webpackChunkName: "postvideo" */ '../views/ShowVideo.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "postvideo" */ '../views/RegisterUser.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
