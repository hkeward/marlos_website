<!-- App.vue -->

<template>
  <div id="app" class="small-container">
    <h1>Rooms</h1>

    <room-list v-bind:rooms="rooms" @delete:room="deleteRoom" @edit:room="editRoom" />
    <room-form @add:room="addRoom" />
  </div>
</template>

<script>
import RoomList from '@/components/RoomList.vue'
import RoomForm from '@/components/RoomForm.vue'

export default {
  name: 'app',
  components: {
    RoomList,
    RoomForm,
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

    async deleteRoom(id) {
      try {
        const response = await fetch(`https://heatherward.dev/rest/rooms/${id}`, {
          method: 'DELETE'
        });
        const data = await response;
        if (data.status == 200) {
          this.rooms = this.rooms.filter(room =>
          room.roomId !== id);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async editRoom(id, updatedRoom) {
      try {
        const response = await fetch(`https://heatherward.dev/rest/rooms/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedRoom),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        const data = await response;
        if (data.status === 400) {
          const errorMessage = await data.json();
          console.error(errorMessage);
        } else if (data.status === 200) {
          this.rooms = this.rooms.map(room => 
            room.roomId === id ? updatedRoom : room);
        }
      } catch (error) {
        console.error(error);
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

  .small-container {
    max-width: 680px;
  }
</style>
