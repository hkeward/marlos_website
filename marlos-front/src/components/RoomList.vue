<!-- RoomList.vue -->

<template>
    <div id="room-list">
        <p v-if="rooms.length < 1" class="empty-table">
            No rooms in database
        </p>
        <table v-else>
            <thead>
                <tr>
                    <th>Room</th>
                    <th>Type</th>
                    <th>Tags</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="room in rooms" v-bind:key="room.roomId">
                    <td v-if="editing === room.roomId">
                        <input type="text" v-model="room.roomName" />
                    </td>
                    <td v-else>
                        {{ room.roomName }}
                    </td>

                    <td v-if="editing === room.roomId">
                        <input type="text" v-model="room.type" />
                    </td>
                    <td v-else>
                        {{ room.type }}
                    </td>
                    
                    <td v-if="editing === room.roomId">
                        <input type="text" v-model="room.tags" />
                    </td>
                    <td v-else>
                        {{ room.tags }}
                    </td>

                    <td v-if="editing === room.roomId">
                        <button @click="editRoom(room)">Save</button>
                        <button class="muted-button" @click="cancelEdit(room)">Cancel</button>
                    </td>
                    <td v-else>
                        <!-- <button @click="getRoomNames()">Get names</button> -->
                        <button @click="editMode(room)">Edit</button>
                        <button @click="$emit('delete:room', room.roomId)" class="delete-button">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
    export default {
        name: 'room-list',
        props: {
            rooms: Array,
        },
        data() {
            return {
                editing: null,
            }
        },
        methods: {
        //   getRoomNames() {
        //       console.log(this.rooms.map(room => room.roomName));
        //   },
            editMode(room) {
                this.cachedRoom = Object.assign({}, room);
                this.editing = room.roomId;            
            },

            editRoom(room) {
                if (room.roomName === '') return;
                this.$emit('edit:room', room.roomId, room);
                this.editing = null;
            },

            cancelEdit(room) {
                Object.assign(room, this.cachedRoom);
                this.editing = null;
            },
        },
    }
</script>

<style scoped>
  button {
    margin: 0 0.5rem 0 0;
  }
  .delete-button {
      background-color: #d33c40;
      border-color: #000000;
  }
</style>