// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/assets/js/utils.js'//引入公共js
// import 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js'
import { Button } from 'vant';
Vue.use(Button)
Vue.config.productionTip = false

router.beforeEach((to,form,next) =>{
  /*路由变化修改title*/
  if(to.meta.title){
      document.title=to.meta.title
  }
  next();
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
