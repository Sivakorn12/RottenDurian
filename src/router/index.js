import Vue from 'vue'
import Router from 'vue-router'
import ListsMovie from '@/components/ListsMovie'
import Movie from '@/components/Movie'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListsMovie',
      component: ListsMovie
    },
    {
      path: '/movie/:id',
      name: 'Movie',
      component: Movie,
      props: true
    }
  ]
})
