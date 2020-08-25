import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Menu from './components/Menu.vue';
import Order from './views/Orders.vue';
import Rewards from './views/Rewards.vue';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    }, 
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu,
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: Rewards
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: { 
        guest: true
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('./views/Registration.vue'),
      meta: { 
        guest: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
      meta: { 
        requiresAuth: true
      }
    }
  ],
});


router.beforeEach((to, from, next) => { 
  if (to.matched.some(record => record.meta.requiresAuth)) { 
    if (localStorage.getItem('jwt') == null) { 
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else { 
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) { 
    if (localStorage.getItem('jwt') == null) { 
      next()
    } else { 
      next({ name: 'dashboard' })
    }
  } else { 
    next()
  }
})

export default router