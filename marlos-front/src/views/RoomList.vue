<!-- RoomList.vue -->

<template>
    <div id="room-list">
        <h1>All Rooms</h1>
        <div id="interact-buttons">
            <button v-for="tag in tagFilter" v-bind:key="tagFilter.indexOf(tag)" @click="removeFilter(tag)" class="remove-filter-button"> 
                {{ "❌ " + tag }}
            </button>
            <router-link :to="{ name: 'create', params: { rooms : rooms } }" tag="button" id="create-room">Create new room</router-link>
        </div>
        <p v-if="rooms.length < 1" class="empty-table">
            No rooms in database
        </p>
        <table v-else>
            <thead>
                <tr>
                    <th>Room</th>
                    <th>Type</th>
                    <th>Tags</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="room in filteredRooms" v-bind:key="room.roomId">
                    <td>
                        <router-link tag="button" class="room-button" :to="{ name: 'room', params: { id : room.roomId, room : room }}">
                            {{ room.roomName }}
                        </router-link>
                    </td>

                    <td>
                        {{ room.type }}
                    </td>
                    
                    <td>
                        <button @click="filterMode(room.tags.toLowerCase())" class="tag-button">
                            {{ "#" + room.tags.toLowerCase() }}
                        </button>
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
                tagFilter: [],
            }
        },

        methods: {
            filterMode(tag) {
                if (!this.tagFilter.includes(tag)) {
                    this.tagFilter.push(tag);
                }
            },

            removeFilter(tagToRemove) {
                this.tagFilter = this.tagFilter.filter(tag => tag != tagToRemove);
            },
        },

        computed: {
            filteredRooms: function() {
                const filterArray = Array.from(this.tagFilter);
                if (filterArray.length == 0) {
                    return this.rooms;
                } else {
                    return this.rooms.filter(room => filterArray.every(tag => room.tags.toLowerCase().includes(tag)));
                }
            }
        },
    }
</script>

<style scoped>

h1 {
    display: inline-block;
}

#interact-buttons {
    float: right;
}

#create-room {
    display: inline-block;
    float: right;
    background: #AAC97A;
    border-color: #AAC97A;
    color: #1F2430;
    font-weight: 8000;
}

#create-room:hover {
    background: #1F2430;
    color: white;
}

.room-button {
    width: 30%;
    margin-bottom: 0;
}

.tag-button {
    border: transparent;
    background: transparent;
    padding: 0.2rem;
    margin: 0;
}

.tag-button:hover {
    background: #1F2430;
}

.remove-filter-button {
}

</style>
