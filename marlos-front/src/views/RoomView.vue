<template>
	<div class="room" :roomid="id" :room="room">
		<h1 v-if="editing === room.roomId">
			<input type="text" v-model="room.roomName">
		</h1>
		<h1 v-else>
			{{ room.roomName }}
		</h1>
		<h3 v-if="editing === room.roomId">
			<input type="text" v-model="room.type">
		</h3>
		<h3 v-else>
		{{ room.type }}
		</h3>

		<div v-if="editing === room.roomId" class = "edit">
			<button @click="editRoom(room)">
				Save
			</button>
			<button @click="cancelEdit(room)" class="muted-button">
				Cancel
			</button>
		</div>
		<div v-else class="edit">
			<button @click="editMode(room)">
				Edit
			</button>
			<button @click="deleteRoom(room.roomId)" class="delete-button">
				Delete
			</button>
		</div>

		<p v-if="editing === room.roomId" class="description">
			<textarea v-model="room.description" class="description" />
		</p>
		<p v-else class="description">
{{ room.description }}
		</p>
	</div>
</template>

<script>
export default {
	name: 'room',

	props: {
		id: Number,
		room: Object,
	},

	computed: {
		toNumber: function() {
			return Number(this.id);
		}
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

    // editRoom(room) {
    //     if (room.roomName === '') return;
    //     this.$emit('edit:room', room.roomId, room);
    //     this.editing = null;
    // },

    cancelEdit(room) {
        Object.assign(room, this.cachedRoom);
        this.editing = null;
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

    async editRoom(updatedRoom) {
      try {
        const response = await fetch(`https://heatherward.dev/rest/rooms/${updatedRoom.roomId}`, {
          method: 'PUT',
          body: JSON.stringify(updatedRoom),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
        const data = await response;
        if (data.status === 400) {
          const errorMessage = await data.json();
          console.error(errorMessage);
        } else if (data.status === 200) {
          // this.rooms = this.rooms.map(room => 
          //   room.roomId === updatedRoom.roomId ? updatedRoom : room);
          this.editing = null;
        }
      } catch (error) {
        console.error(error);
      }
    },
},
}
</script>

<style>
h1 {
	display: inline-block;
	padding: 0 20px 0 0;
	font-weight: 900;
}

h3 {
	display: inline-block;
	font-weight: 400;
}

.description {
	white-space: pre-wrap;
}

.edit {
	display: inline-block;
	float: right;
	margin: 30px 0 0 0;
}

button {
	margin: 10px 0 10px 5px;
}
.delete-button {
	background-color: #d33c40;
	border-color: #000000;
}

textarea.description {
	height: 700px;
}
</style>