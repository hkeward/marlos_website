<template>
	<div class="room" :roomid="id" :room="room">
		<div id="room-header">
			<div id="title-info">

				<h1 v-if="editing === room.roomId" v-text="room.roomName" @blur="onEdit" class="room-name editing" contenteditable="true">
				</h1>

				<h1 v-else class="room-name" contenteditable="false">
					{{ room.roomName }}
				</h1>


				<h3 v-if="editing === room.roomId" v-text="room.type" @blur="onEdit" class="type editing" contenteditable="true">
				</h3>

				<h3 v-else class="type" contenteditable="false">
					{{ room.type }}
				</h3>

			</div>

			<div v-if="editing === room.roomId" class="edit-bar">

				<button @click="editRoom(room)" class="save-button">
					Save
				</button>

				<button @click="cancelEdit(room)" class="muted-button">
					Cancel
				</button>

			</div>

			<div v-else class="edit-bar">

				<button @click="editMode(room)" class="edit-button">
					Edit
				</button>

				<button @click="deleteRoom(room.roomId)" class="delete-button">
					Delete
				</button>

			</div>

		</div>

		<div id="room-contents">
			<p v-if="editing === room.roomId" v-text="room.description" @blur="onEdit" class="description editing" contenteditable="true">
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

		editMode(room) {
				this.cachedRoom = Object.assign({}, room);
				this.editing = room.roomId;            
		},

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

#room-contents {
	display: flex;
	justify-content: space-between;
}

.room-name, .type, .description {
	border: 1px solid transparent;
}

.room-name {
	font-weight: 900;
	margin-right: 1rem;
}

.type {
	font-weight: 400;
}

.description {
	white-space: pre-wrap;
}

.editing {
	background: #1F2430;
	border-radius: 3px;
}

.edit-bar {
	margin: 30px 0 0 0;
	display: flex;
	justify-content: flex-end;
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