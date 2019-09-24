<!-- App.vue -->

<template>
  <div id="app">
    <navbar />

    <div class="container">
      <router-view :rooms="rooms" @add:room="addRoom" @delete:room="deleteRoom" /> 
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
      keycloak: this.$root.keycloak,
      keycloak_token: this.$root.keycloak.token
    }
  },

  mounted() {
    this.getRoomData();
  },

  methods: {
    async getRoomData() {
      try {
        const response = await fetch("https://heatherward.dev/rest/rooms", {
          headers: {'Authorization': 'Bearer ' + this.keycloak_token}
        });
        const data = await response.json();
        this.rooms = data;
      } catch (err) { 
        console.error(err.message);
      }
    },

    deleteRoom(id) {
      this.rooms = this.rooms.filter(room => room.roomId !== id);
    },

    async addRoom(room) {
      try {
        const response = await fetch('https://heatherward.dev/rest/rooms', {
          method: 'POST',
          body: JSON.stringify(room),
          headers: { 'Content-type': 'application/json; charset=UTF-8',
                      'Authorization': 'Bearer ' + this.keycloak_token}
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
