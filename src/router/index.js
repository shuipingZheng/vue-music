import Vue from 'vue'
import Router from 'vue-router'
import song from '@/components/page/song.vue'
import star from '@/components/page/star.vue'
import mv from '@/components/page/mv.vue'
import collection from '@/components/page/collection.vue'
import discover from '@/components/page/discover.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: song
    },{
      path: '/bang',
      name: 'song',
      component: song
    },{
      path: '/star',
      name: 'star',
      component: star
    },{
      path: '/collection',
      name: 'collection',
      component: collection
    },{
      path: '/mv',
      name: 'mv',
      component: mv
    },{
      path: '/discover',
      name: 'discover',
      component: discover
    }
  ]
})
