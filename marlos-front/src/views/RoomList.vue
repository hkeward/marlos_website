<!-- RoomList.vue -->

<template>
    <div id="room-list">
        <div id="header-info">
            <div class="title">
                <h1>All Rooms</h1>
            </div>
        </div>
        <div id="interact-buttons">
            <div class="search-bar" >
                <input v-model="searchTerm"
                       placeholder="Search rooms"
                       onfocus="this.placeholder=''"
                       onblur="this.placeholder='Search rooms'"
                       v-on:keyup.escape="searchTerm=''"
                       id="search"
                />
            </div>
            <div>
                <button v-for="tag in tagFilters" v-bind:key="tagFilters.indexOf(tag)" @click="removeFilter(tag)" class="filter-button">
                    {{ "❌ " + tag }}
                </button>
                <button v-if="isAdminUser" @click="addRoom" id="create-room">Create new room</button>
            </div>
        </div>
        <p v-if="rooms.length < 1" class="empty-table">
            No rooms in database
        </p>
        <div v-else>
            <table>
                <thead>
                    <tr>
                        <th>Room</th>
                        <th>Type</th>
                        <th>Time (h)</th>
                        <th>Rating</th>
                        <th>Difficulty</th>
                        <th>Environment</th>
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

                        <td style="text-align: center">
                            {{ room.timeEstimate }}
                        </td>

                        <td>
                            {{ room.rating }}
                        </td>

                        <td>
                            {{ room.difficulty }}
                        </td>

                        <td>
                            {{ room.environment }}
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
            'getRoomData',
            'addRoom'
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

            // filter by tags
            if (filterArray.length == 0) {
                filteredRooms = rooms_array;
            } else {
                filteredRooms = rooms_array.filter(room => filterArray.every(tag => room.tags.toLowerCase().includes(tag)));
            }

            // filter by search term (check in roomName, type, tags)
            filteredRooms = filteredRooms.filter(room => {
                return ((room.roomName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) ||
                        (room.type.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) ||
                        (room.tags.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1));
            });

            return filteredRooms.sort((a, b) => {
                return a.roomName.toLowerCase() > b.roomName.toLowerCase() ? 1 : -1;
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

.title {
    display: flex;
    justify-content: flex-start;
}

h1 {
    margin-bottom: 5px;
}

.search-bar {
    display: flex;
    justify-content: flex-start;
    vertical-align: middle;
}

input {
    padding: 0.5rem;
    font-size: 0.9rem;
    border-radius: 3px;
    border-style: hidden;
}

#interact-buttons {
    margin: 10px 0 10px 0;
    display: flex;
    justify-content: space-between;
}

.filter-button {
    margin: 0 5px 0 0;
}

#create-room {
    background: #AAC97A;
    border-color: #AAC97A;
    color: #1F2430;
}

#create-room:hover {
    background: #1F2430;
    color: white;
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

table {
    margin-bottom: 3rem;
}

</style>
