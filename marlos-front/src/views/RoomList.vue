<!-- RoomList.vue -->

<template>
    <div id="room-list">
        <button><router-link :to="{ name: 'create', params: { rooms : rooms } }">Create new room</router-link></button>
        <p v-if="rooms.length < 1" class="empty-table">
            No rooms in database
        </p>
        <table v-else>
            <thead>
                <tr>
                    <th>Room</th>
                    <th>Type</th>
                    <th>Tags</th>
                    <!-- <th>Actions</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="room in rooms" v-bind:key="room.roomId">
                    <td v-if="editing === room.roomId">
                        <input type="text" v-model="room.roomName" />
                    </td>
                    <td v-else>
                        <router-link :to="{ name: 'room', params: { id : room.roomId, room : room }}">{{ room.roomName }}</router-link>
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

<!--                     <td v-if="editing === room.roomId">
                        <button @click="editRoom(room)" @keyup.enter="editRoom(room)">Save</button>
                        <button @click="cancelEdit(room)" class="muted-button">Cancel</button>
                    </td>
                    <td v-else>
                        <button @click="editMode(room)">Edit</button>
                        <button @click="deleteRoom(room.roomId)" class="delete-button">Delete</button>
                    </td> -->
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




    }
</script>

<style scoped>
button {
  margin: 10px 0 10px 0;
}
</style>