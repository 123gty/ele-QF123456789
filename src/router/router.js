import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
   component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
   meta:{show:false}
    },
	{
	  path: '/yi',
	  name: 'yi',
	  component: () => import(/* webpackChunkName: "about" */ '../views/yi/yi.vue'),
	  meta:{show:true}

	},
    {
      path: '/er',
      name: 'er',
      component: () => import(/* webpackChunkName: "about" */ '../views/er/er.vue'),
	  meta:{show:true}

    },{
      path: '/san',
      name: 'san',
      component: () => import(/* webpackChunkName: "about" */ '../views/san/san.vue'),
	  meta:{show:true}

    },
	{
	  path: '/si',
	  name: 'si',
	  component: () => import(/* webpackChunkName: "about" */ '../views/si/si.vue'),
	  meta:{show:true}

	},
	{
	  path: '/wu',
	  name: 'wu',
	  component: () => import(/* webpackChunkName: "about" */ '../views/wu/wu.vue'),
	  meta:{show:true}

	},
	{
	  path: '/liu',
	  name: 'liu',
	  component: () => import(/* webpackChunkName: "about" */ '../views/liu/liu.vue'),
	  meta:{show:true}

	},
	{
	  path: '/qi',
	  name: 'qi',
	  component: () => import(/* webpackChunkName: "about" */ '../views/qi/qi.vue'),
	  meta:{show:true}

	},{
	  path: '/ba',
	  name: 'ba',
	  component: () => import(/* webpackChunkName: "about" */ '../views/ba/ba.vue'),
	  meta:{show:true}

	}
  ]
})
