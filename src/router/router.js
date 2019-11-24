import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
	  {
	    path: '*',
	    redirect: '/yi',
	  },
	  {
	    path: '/',
	    redirect: '/yi',
	  },

    {
      path: '/login',
      name: 'login',
		component: () => import('../views/login.vue'),
		meta:{show:false}
    },
	
	{
	  path: '/yi',
	  name: 'yi',
	  component: () => import('../views/yi/yi.vue'),
	  meta:{show:true}

	},
    {
      path: '/er',
      name: 'er',
      component: () => import('../views/er/er.vue'),
	  meta:{show:true}

    },{
      path: '/san',
      name: 'san',
      component: () => import('../views/san/san.vue'),
	  meta:{show:true}

    },
	{
	  path: '/si',
	  name: 'si',
	  component: () => import('../views/si/si.vue'),
	  meta:{show:true}

	},
	{
	  path: '/wu',
	  name: 'wu',
	  component: () => import('../views/wu/wu.vue'),
	  meta:{show:true}

	},
	{
	  path: '/liu',
	  name: 'liu',
	  component: () => import('../views/liu/liu.vue'),
	  meta:{show:true}

	},
	{
	  path: '/qi',
	  name: 'qi',
	  component: () => import('../views/qi/qi.vue'),
	  meta:{show:true}

	},{
	  path: '/ba',
	  name: 'ba',
	  component: () => import('../views/ba/ba.vue'),
	  meta:{show:true}

	},{
	  path: '/jiu',
	  name: 'jiu',
	  component: () => import('../views/jiu/jiu.vue'),
	  meta:{show:true}
	},{
	  path: '/shi',
	  name: 'shi',
	  component: () => import( '../views/shi/shi.vue'),
	  meta:{show:true}
	},{
	  path: '/aaa',
	  name: 'aaa',
	  component: () => import( '../views/aaa/aaa.vue'),
	  meta:{show:true}
	},{
	  path: '/bbb',
	  name: 'bbb',
	  component: () => import( '../views/bbb/bbb.vue'),
	  meta:{show:true}
	}
  ]
})
