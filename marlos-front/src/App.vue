<!-- App.vue -->

<template>
  <div id="app" class="small-container">
    <navbar />

<!--     <room-form @add:room="addRoom" /> -->
    <router-view :rooms="rooms" /> 
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar,
  },

  data() {
    return {
      rooms: [],
    }
  },

  mounted() {
    this.getRoomData();
  },

  methods: {
    async getRoomData() {
      try {
        const response = await fetch("https://heatherward.dev/rest/rooms");
        const data = await response.json();
        this.rooms = data;
      } catch (err) { 
        console.error(err.message);
      }
    },
  },
}

</script>

<style>
  button {
    background: #009435;
    border: 1px solid #009435;
  }
  body {
    font-family: 'Raleway', sans-serif;
    color: black;
  }

</style>
