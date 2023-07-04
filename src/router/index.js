import Vue from 'vue'
import Router from 'vue-router'
import Example1 from '@/components/Example1'
import ECommerce from '@/components/E-Commerce'
import ParentArticle from '@/components/ParentArticle'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Example1',
      component: Example1
    },
    {
      path: '/ECommerce',
      name: 'ECommerce',
      component: ECommerce
    }
  ]
})
