import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AMap from '@/components/AMap'
import Input from '@/components/Input'
import tmp from '@/components/tmp'
import Search from '@/components/Search'
import WebSocket from '@/components/WebSocket'
import Edit from '@/components/Edit.vue'

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
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/webSocket',
      name: 'WebSocket',
      component: WebSocket
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    }
  ]
})
