import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },  
  {
    path: '/sign',
    name: 'Sign',
    component: () => import(/* webpackChunkName: "about" */ '../components/Sign.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import(/* webpackChunkName: "about" */ '../components/Profil')
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import(/* webpackChunkName: "about" */ '../components/Messages')
  },
  {
    path: '/messages/:id(\\d+)',
    name: 'MessagesId',
    component: () => import(/* webpackChunkName: "about" */ '../components/MessagesId')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "about" */ '../components/Users')
  },
  {
    path: '/users/:id(\\d+)',
    name: 'UserId',
    component: () => import(/* webpackChunkName: "about" */ '../components/UserId')
  }
]

const router = new VueRouter({
  routes
})

export default router
