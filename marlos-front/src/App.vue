<!-- App.vue -->

<template>
  <div id="app">
    <navbar />

<!--     <room-form @add:room="addRoom" /> -->
    <div class="container">
      <router-view :rooms="rooms" @add:room="addRoom" @delete:room="removeRoom" /> 
    </div>
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
    removeRoom(id) {
      this.rooms = this.rooms.filter(room => room.roomId !== id);
    },
    async addRoom(room) {
      try {
        const response = await fetch('https://heatherward.dev/rest/rooms', {
          method: 'POST',
          body: JSON.stringify(room),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        const data = await response;
        const roomId = await data.json();
        if (data.status === 200) {
          const newRoom = { ...room, roomId };
          this.rooms = [...this.rooms, newRoom];
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
}

</script>

<style>
</style>
