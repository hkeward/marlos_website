<template>
    <div id="room-header">
        <div id="title-info">

            <h1 v-if="editing.room === currentRoom.id" v-text="currentRoom.name" @blur="$parent.onEdit" id="name" class="room-name editing" contenteditable="true">
            </h1>

            <h1 v-else class="room-name" contenteditable="false">
                {{ currentRoom.name }}
            </h1>


            <h3 v-if="editing.room === currentRoom.id" v-text="currentRoom.type" @blur="$parent.onEdit" id="type" class="type editing" contenteditable="true">
            </h3>

            <h3 v-else class="type" contenteditable="false">
                {{ currentRoom.type }}
            </h3>

        </div>

        <div v-if="editing.room === currentRoom.id && isAdminUser" class="edit-bar">

            <button @click="editRoom(currentRoom)" class="save-button">
                Save
            </button>

            <button @click="isNew.room ? deleteRoom(currentRoom.id) : cancelEdit()" class="muted-button">
                Cancel
            </button>

        </div>

        <div v-else-if="isAdminUser" class="edit-bar">

            <button @click="editMode(currentRoom)" class="edit-button">
                Edit
            </button>

            <button @click="deleteRoom(currentRoom.id)" class="delete-button">
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
           'isNew'
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
            this.toggleEditing({type: 'room', mode: room.id});
        },

        cancelEdit() {
            Object.assign(this.currentRoom, this.cachedRoom);
            this.currentRoom.__ob__.dep.notify();
            this.toggleEditing({type: 'room', mode: false});
        },
    },
}
</script>

<style scoped>
.delete-button, .edit-button, .save-button, .muted-button {
    margin: 30px 0 10px 5px;
}

#title-info {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
}

#room-header {
    display: flex;
    justify-content: space-between;
}

.room-name {
    font-weight: 900;
    margin-right: 1rem;
    border: 1px solid transparent;
}

.type {
    font-weight: 400;
    border: 1px solid transparent;
}

.save-button {
    background: #AAC97A;
    border-color: #AAC97A;
    color: #1F2430;
}

.save-button:hover {
    color: white;
}

.delete-button {
    background: #D33C40;
    border-color: #D33C40;
}

.muted-button {
    background: #6D7392;
    border-color: #6D7392;
}

.edit-bar {
	margin: 30px 0 0 0;
	display: flex;
	justify-content: flex-end;
}
</style>