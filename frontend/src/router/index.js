import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign',
    name: 'Sign',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Sign.vue')
  },
  {
    path:'/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  },
  {
    path:'/profil',
    name: 'Profil',
    component: () => import( '../views/Profil.vue')
  },
    
]

const router = new VueRouter({
  routes
})

export default router
