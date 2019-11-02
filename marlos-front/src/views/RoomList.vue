<!-- RoomList.vue -->

<template>
    <div id="room-list">
        <div id="header-info">
            <div class="title">
                <h1>All Rooms</h1>
            </div>
            <div id="interact-buttons">
                <button v-for="tag in tagFilters" v-bind:key="tagFilters.indexOf(tag)" @click="removeFilter(tag)" class="filter-button">
                    {{ "❌ " + tag }}
                </button>
                <router-link v-if="isAdminUser" :to="{ name: 'create' }" tag="button" id="create-room">Create new room</router-link>
            </div>
        </div>
        <p v-if="rooms.length < 1" class="empty-table">
            No rooms in database
        </p>
        <div v-else>
            <div>
                <input v-model="searchTerm"/>
                <p>You entered {{ searchTerm }}</p>
            </div>
            <table>
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
                            <router-link tag="button" class="room-button" :to="{ name: 'room', params: { id : room.roomId}}">
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
    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'room-list',

    data() {
        return {
            tagFilters: [],
            searchTerm: ''
        }
    },

    methods: {
        ...mapActions([
            'getRoomData'
        ]),
        filterMode(tag) {
            if (!this.tagFilters.includes(tag)) {
                this.tagFilters.push(tag);
            }
        },

        removeFilter(tagToRemove) {
            this.tagFilters = this.tagFilters.filter(tag => tag != tagToRemove);
        },
    },

    computed: {
        filteredRooms: function() {
            const filterArray = Array.from(this.tagFilters);
            var rooms_array = Object.keys(this.rooms).map(key => this.rooms[key]);
            var filteredRooms;

            if (filterArray.length == 0) {
                filteredRooms = rooms_array;
            } else {
                filteredRooms = rooms_array.filter(room => filterArray.every(tag => room.tags.toLowerCase().includes(tag)));
            }

            return filteredRooms.sort((a, b) => {
                return a.roomName > b.roomName ? 1 : -1;
            });
        },
        ...mapState([
            'rooms',
            'isAdminUser'
        ])
    },

    mounted() {
        this.getRoomData();
    }
}
</script>

<style scoped>
#header-info {
    display: flex;
    justify-content: space-between;
}

#interact-buttons {
    margin: 30px 0 0 0;
    display: flex;
    justify-content: flex-end;
}

#interact-buttons button {
    margin: 30px 0 10px 5px;
}

#create-room {
    background: #AAC97A;
    border-color: #AAC97A;
    color: #1F2430;
    margin: 30px 0 10px 5px;
}

#create-room:hover {
    background: #1F2430;
    color: white;
}

.title {
    display: flex;
    justify-content: flex-start;
}

.room-button {
    width: 15rem;
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

</style>
