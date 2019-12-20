<template>
	<div v-if="roomFound" class="room" :roomid="id">
		<room-title-info :currentRoom="currentRoom" />
		<advanced-room-info :currentRoom="currentRoom" />
		<room-description :currentRoom="currentRoom" />
	</div>

    <div v-else>
        <h1> No rooms with ID {{ this.$route.params.id }} found.</h1>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import AdvancedRoomInfo from './AdvancedRoomInfo.vue';
import RoomTitleInfo from './RoomTitleInfo.vue';
import RoomDescription from './RoomDescription.vue'

export default {
	name: 'room',

	components: {
		AdvancedRoomInfo,
		RoomTitleInfo,
		RoomDescription,
	},

	props: {
		id: Number,
	},

	data() {
		return {
            currentRoom: {},
            roomFound: true,
		}
	},

	computed: {
		...mapState([
				'keycloak',
				'rooms',
		]),
	},

	methods: {
		async getCurrentRoom (roomId) {
			if (roomId in this.rooms) {
				this.currentRoom = this.rooms[roomId];
			} else {
                try {
                    const response = await fetch(`https://heatherward.dev/rest/rooms/${roomId}`, {
                    headers: {'Authorization': 'Bearer ' + this.keycloak.token}
                });
                    this.currentRoom = await response.json();
                } catch (err) {
                    this.roomFound = false;
                }
            }
		},

		onEdit(e) {
			this.currentRoom[e.target.id] = e.target.innerText;
		},
	},

	created() {
		this.getCurrentRoom(this.$route.params.id);
	},
}
</script>

<style>
.description table {
	width: unset;
}

table p {
	margin: 0;
}

.description th {
	border: 1px solid white;
	padding: 0.5rem;
}

.description td {
	border: 1px solid white;
	padding-left: 0.5rem;
}

.resize-cursor {
	cursor: col-resize;
}

.editing {
	background: #1F2430;
	border-radius: 3px;
	min-width: 100px;
}
</style>