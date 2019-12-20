<template>
    <div id="room-header">
        <div id="title-info">

            <h1 v-if="editing === currentRoom.roomId" v-text="currentRoom.roomName" @blur="$parent.onEdit" id="roomName" class="room-name editing" contenteditable="true">
            </h1>

            <h1 v-else class="room-name" contenteditable="false">
                {{ currentRoom.roomName }}
            </h1>


            <h3 v-if="editing === currentRoom.roomId" v-text="currentRoom.type" @blur="$parent.onEdit" id="type" class="type editing" contenteditable="true">
            </h3>

            <h3 v-else class="type" contenteditable="false">
                {{ currentRoom.type }}
            </h3>

        </div>

        <div v-if="editing === currentRoom.roomId && isAdminUser" class="edit-bar">

            <button @click="editRoom(currentRoom)" class="save-button">
                Save
            </button>

            <button @click="isNewRoom ? deleteRoom(currentRoom.roomId) : cancelEdit()" class="muted-button">
                Cancel
            </button>

        </div>

        <div v-else-if="isAdminUser" class="edit-bar">

            <button @click="editMode(currentRoom)" class="edit-button">
                Edit
            </button>

            <button @click="deleteRoom(currentRoom.roomId)" class="delete-button">
                Delete
            </button>
        </div>

        <div v-else class="edit-bar">
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'room-title-info',

    props: {
        currentRoom: Object,
    },

    data() {
        return {
            cachedRoom: {},
        }
    },

    computed: {
        ...mapState([
           'editing',
           'isAdminUser',
           'isNewRoom'
         ])
    },

    methods: {
        ...mapActions([
            'editRoom',
            'deleteRoom',
            'toggleEditing'
        ]),

        editMode(room) {
            this.cachedRoom = Object.assign({}, room);
            this.toggleEditing(room.roomId);
        },

        cancelEdit() {
            Object.assign(this.currentRoom, this.cachedRoom);
            this.currentRoom.__ob__.dep.notify();
            this.toggleEditing(false);
        },
    },
}
</script>

<style>

</style>