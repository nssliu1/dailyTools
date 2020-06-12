import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AMap from '@/components/AMap'
import Input from '@/components/Input'
import tmp from '@/components/tmp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/amap',
      name: 'AMap',
      component: AMap
    },
    {
      path: '/tmp',
      name: 'tmp',
      component: tmp
    }
  ]
})
