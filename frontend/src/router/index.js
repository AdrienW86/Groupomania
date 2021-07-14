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
    component: () => import(/* webpackChunkName: "about" */'../views/Login.vue')
  },
  {
    path:'/profil',
    name: 'Profil',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profil.vue')
  },
  {
    path:'/messages',
    name:'Messages',
    component: () => import(/* webpackChunkName: "about" */ '../views/Messages.vue')
  },
  {
    path:'/messages/:id',
    name:'OneMessage',
    component: () => import(/* webpackChunkName: "about" */ '../views/OneMessage.vue')
  },
  {
    path:'/users',
    name:'Users',
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  },
  {
    path:'/users/:id',
    name:'OneUser',
    component: () =>  import(/* webpackChunkName: "about" */ '../views/OneUser.vue')
  }

    
]

const router = new VueRouter({
  routes
})

export default router
