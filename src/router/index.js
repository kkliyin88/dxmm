import Vue from 'vue'
import Router from 'vue-router'
import INDEX from '@/components/INDEX'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'INDEX',
      component: INDEX,
      meta:{
        title:"丁香妈妈会员礼包"
      }
    }
  ]
})
