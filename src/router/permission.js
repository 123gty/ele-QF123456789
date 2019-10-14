import router from './router'
import { message } from 'element-ui'
  import { getToken } from '@/utils/auth'
  var isLogin = 1
router.beforeEach((to, from, next) => {
    if (getToken()=="mvsAN47Rso/tk+750W/XKw==") {
			next()
			
    } else {
        if (to.path === '/login') { //这就是跳出循环的关键
           next()
        } else {
            next('/login')
        }
    } 
})