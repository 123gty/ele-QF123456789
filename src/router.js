import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
	{
	  path: '/yi',
	  name: 'yi',
	  component: () => import(/* webpackChunkName: "about" */ './views/yi/yi.vue')
	},
    {
      path: '/er',
      name: 'er',
      component: () => import(/* webpackChunkName: "about" */ './views/er/er.vue')
    },{
      path: '/san',
      name: 'san',
      component: () => import(/* webpackChunkName: "about" */ './views/san/san.vue')
    },
	{
	  path: '/si',
	  name: 'si',
	  component: () => import(/* webpackChunkName: "about" */ './views/si/si.vue')
	},
	{
	  path: '/wu',
	  name: 'wu',
	  component: () => import(/* webpackChunkName: "about" */ './views/wu/wu.vue')
	},
	{
	  path: '/liu',
	  name: 'liu',
	  component: () => import(/* webpackChunkName: "about" */ './views/liu/liu.vue')
	},
	{
	  path: '/qi',
	  name: 'qi',
	  component: () => import(/* webpackChunkName: "about" */ './views/qi/qi.vue')
	},{
	  path: '/ba',
	  name: 'ba',
	  component: () => import(/* webpackChunkName: "about" */ './views/ba/ba.vue')
	}
  ]
})
