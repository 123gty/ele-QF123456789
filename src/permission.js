import router from './router'
import { Message } from 'element-ui'
  import { getToken } from '@/utils/auth'
  var isLogin = 1
router.beforeEach((to, from, next) => {
    if (getToken()=="guoguoguo") {
		
			next()
		
		
    } else {
        //next('/error')
        if (to.path === '/login') { //这就是跳出循环的关键
           next()
        } else {
			console.log(getToken())
            next('/login')
        }
    } 
})