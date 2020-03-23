import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'js',
      component: () => import(/* webpackChunkName: "js" */ './views/jsTemplate.vue')
    },
     {
      path: '/webpack',
      name: 'webpack',
      component: () => import(/* webpackChunkName: "js" */ './views/jsTemplate.vue')
    },
    {
      path: '/css',
      name: 'css',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "css" */ './views/cssTemplate.vue')
    },
  ]
})
