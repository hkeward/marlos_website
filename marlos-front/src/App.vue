<!-- App.vue -->

<template>
  <div id="app">
    <navbar />

    <div class="container">
      <router-view :rooms="rooms" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    Navbar,
  },

  data() {
    return {
      rooms: []
    }
  },

  mounted() {
    this.getRoomData();
  },

  methods: {
    ...mapActions([
            'getRoomData'
    ]),
  },
}
</script>

<style>
</style>
