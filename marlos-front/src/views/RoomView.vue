<template>
	<div class="room" :roomid="id" :room="room">
		<div id="room-header">
			<h1 v-if="editing === room.roomId" v-text="room.roomName" @blur="onEdit" class="room-name editing" contenteditable="true">
				<!-- <input type="text" v-model="room.roomName"> -->
			</h1>
			<h1 v-else class="room-name" contenteditable="false">
				{{ room.roomName }}
			</h1>
			<h3 v-if="editing === room.roomId" v-text="room.type" @blur="onEdit" class="type editing" contenteditable="true">
				<!-- <input type="text" v-model="room.type"> -->
			</h3>
			<h3 v-else class="type" contenteditable="false">
			{{ room.type }}
			</h3>

			<div v-if="editing === room.roomId" class="edit-bar">
				<button @click="editRoom(room)" class="save-button">
					Save
				</button>
				<button @click="cancelEdit(room)" class="muted-button">
					Cancel
				</button>
			</div>
			<div v-else class="edit-bar">
				<button @click="editMode(room)">
					Edit
				</button>
				<button @click="deleteRoom(room.roomId)" class="delete-button">
					Delete
				</button>
			</div>
		</div>

		<div id="room-contents">
			<p v-if="editing === room.roomId" v-text="room.description" @blur="onEdit" class="description editing" contenteditable="true">
				<!-- <textarea v-model="room.description" class="description" /> -->
			</p>
			<p v-else v-text="room.description" class="description" contenteditable="false"></p>
		</div>
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

			onEdit(e) {
				const classes = Array.from(e.target.classList);
				const contents = e.target.innerText;
				if (classes.includes("description")) {
					this.room.description = contents;
				} else if (classes.includes("room-name")) {
					this.room.roomName = contents;
				} else if (classes.includes("type")) {
					this.room.type = contents;
				} else {
					console.error("onEdit called from an unexpected input location!");
				}
			},

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

		async deleteRoom(id) {
			try {
				const response = await fetch(`https://heatherward.dev/rest/rooms/${id}`, {
					method: 'DELETE'
				});
				const data = await response;
				if (data.status == 200) {
					this.$emit('delete:room', id);
					this.$router.push('/rooms');
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

button {
	margin: 10px 0 10px 5px;
}

#room-header {
	display: block;
	width: 100%;
}

#room-contents {
	display: block;
	width: 100%;
}

.room-name, .type, .description {
	border: 1px solid transparent;
}

.editing {
	background: #1F2430;
	border-radius: 3px;
}

.edit-bar {
	display: inline-block;
	float: right;
	margin: 30px 0 0 0;
}

.save-button {
	background: #AAC97A;
	border-color: #AAC97A;
	color: #1F2430;
}

.delete-button {
	background: #d33c40;
	border-color: #d33c40;
}

.muted-button {
	background: #6D7392;
	border-color: #6D7392;
}

.description textarea {
	min-height: 15rem;
}

</style>