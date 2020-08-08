import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home'
import RoomList from './views/RoomList'
import About from './views/About'
import RoomView from './views/RoomView/RoomView'
import CreatureList from './views/CreatureList'
import CreatureView from './views/CreatureView/CreatureView'
import SpellList from './views/SpellList'

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
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomList
    },
    {
      path: '/rooms/:id',
      name: 'room',
      component: RoomView,
    },
    {
      path: '/creatures',
      name: 'creatures',
      component: CreatureList
    },
    {
      path: '/creatures/:id',
      name: 'creature',
      component: CreatureView
    },
    {
      path: '/spells',
      name: 'spells',
      component: SpellList
    }
  ]
})
