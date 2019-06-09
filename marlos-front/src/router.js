import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RoomList from './views/RoomList.vue'
import About from './views/About.vue'
import RoomView from './views/RoomView.vue'
import RoomForm from './views/RoomForm.vue'

Vue.use(Router)

export default new Router({
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
    // 'create' has to go before 'room' or it will try to assign a room id of 'create'
    {
      path: '/rooms/create',
      name: 'create',
      component: RoomForm,
      props: true
    },
    {
      path: '/rooms/:id',
      name: 'room',
      component: RoomView,
      props: true
    },
  ]
})
