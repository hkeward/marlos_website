import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import RoomList from './views/RoomList.vue'
import About from './views/About.vue'
import RoomView from './views/RoomView/RoomView.vue'

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '/',
      component: Home
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomList
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/rooms/:id',
      name: 'room',
      component: RoomView,
    },
  ]
})
