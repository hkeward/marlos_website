<template>
	<div v-if="roomFound" class="room" :roomid="id">
		<div id="room-header">
			<div id="title-info">

				<h1 v-if="editing === currentRoom.roomId" v-text="currentRoom.roomName" @blur="onEdit" class="room-name editing" contenteditable="true">
				</h1>

				<h1 v-else class="room-name" contenteditable="false">
					{{ currentRoom.roomName }}
				</h1>


				<h3 v-if="editing === currentRoom.roomId" v-text="currentRoom.type" @blur="onEdit" class="type editing" contenteditable="true">
				</h3>

				<h3 v-else class="type" contenteditable="false">
					{{ currentRoom.type }}
				</h3>

			</div>

			<div v-if="editing === currentRoom.roomId && isAdminUser" class="edit-bar">

				<button @click="editRoom(currentRoom)" class="save-button">
					Save
				</button>

				<button @click="cancelEdit" class="muted-button">
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

		<div id="more-info-section">
			<div v-if="info_expanded" class="more-info">

				<button @click="toggleInfo" class="toggle-info">▼ Less</button>

				<div v-if="editing === currentRoom.roomId" id="advanced-editing">
					<div id="center-container">
						<div id="darkvision-grid">
							<div id="darkvision">
								<p>Darkvision required?</p>
									<select v-model="currentRoom.darkvision" class="darkvision">
										<option value=1>Yes</option>
										<option value=0>No</option>
									</select>
							</div>
							<div id="grid">
								<p>Grid required?</p>
										<select v-model="currentRoom.grid" class="grid">
										<option value=1>Yes</option>
										<option value=0>No</option>
									</select>
							</div>
						</div>

						<div id="rate-qual-diff" class="rate-qual-diff">
							<div id="labels">
								<p>
									Rating
								</p>
								<p>
									Quality
								</p>
								<p>
									Difficulty
								</p>
								<p>
									Environment
								</p>
							</div>

							<div id="textboxes">
								<p v-text="currentRoom.rating" @blur="onEdit" class="rating editing" contenteditable="true"></p>
								<p v-text="currentRoom.quality" @blur="onEdit" class="quality editing" contenteditable="true"></p>
								<p v-text="currentRoom.difficulty" @blur="onEdit" class="difficulty editing" contenteditable="true"></p>
								<p v-text="currentRoom.environment" @blur="onEdit" class="environment editing" contenteditable="true"></p>
							</div>

						</div>

						<div id="empty-div">
						</div>
					</div>

						<div id="tags">
							Tags: {{ "#" + currentRoom.tags }}
						</div>

				</div>

				<div v-else id="advanced">

					<div id="center-container">
						<div id="darkvision-grid">
							<ul>
								<li v-if="currentRoom.darkvision == 1" id="darkvision" contenteditable="false">Darkvision required</li>
								<li v-if="currentRoom.grid == 1" id="grid" contenteditable="false">Grid required</li>
							</ul>
						</div>

						<div class="rate-qual-diff">
							<p v-if="currentRoom.rating">
								Rating: {{ currentRoom.rating }}
							</p>
							<p v-if="currentRoom.quality">
								Quality: {{ currentRoom.quality }}
							</p>
							<p v-if="currentRoom.difficulty">
								Difficulty: {{ currentRoom.difficulty }}
							</p>
							<p v-if="currentRoom.environment">
								Environment: {{ currentRoom.environment }}
							</p>
						</div>

					</div>

					<div id="tags">
						Tags: {{ "#" + currentRoom.tags }}
					</div>
				</div>
			</div>

			<div v-else class="more-info">
				<button @click="toggleInfo" class="toggle-info">► More info</button>

			</div>
		</div>

		<div id="room-contents">

			<p v-if="editing === currentRoom.roomId" v-text="currentRoom.description" @blur="onEdit" class="description editing" contenteditable="true">
			</p>

			<p v-else class="description" contenteditable="false">
{{ currentRoom.description }}
			</p>

		</div>
	</div>
    <div v-else>
        <h1> No rooms with ID {{ this.$route.params.id }} found.</h1>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	name: 'room',

	props: {
		id: Number,
	},

	data() {
		return {
            currentRoom: {},
            roomFound: true,
			info_expanded: false,
		}
	},

	computed: {
		...mapState([
				'keycloak',
				'rooms',
				'editing',
				'isAdminUser'
		])
	},

	methods: {
		...mapActions([
				'toggleEditing',
				'editRoom',
				'deleteRoom'
		]),

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

		toggleInfo() {
			this.info_expanded = !this.info_expanded;
		},

		onEdit(e) {
			const classes = Array.from(e.target.classList);
			const contents = e.target.innerText;
			if (classes.includes("description")) {
				this.currentRoom.description = contents;
			} else if (classes.includes("room-name")) {
				this.currentRoom.roomName = contents;
			} else if (classes.includes("type")) {
				this.currentRoom.type = contents;
			} else if (classes.includes("rating")) {
				this.currentRoom.rating = contents;
			} else if (classes.includes("quality")) {
				this.currentRoom.quality = contents;
			} else if (classes.includes("difficulty")) {
				this.currentRoom.difficulty = contents;
			} else if (classes.includes("environment")) {
				this.currentRoom.environment = contents;
			} else {
				console.error("onEdit called from an unexpected input location!");
			}
		},

		editMode(room) {
				this.cachedRoom = Object.assign({}, room);
				this.toggleEditing(room.roomId);
		},

		cancelEdit() {
				Object.assign(this.currentRoom, this.cachedRoom);
				this.toggleEditing(false);
		},
	},

	created() {
		this.getCurrentRoom(this.$route.params.id);
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

.toggle-info {
	width: 100%;
	text-align: left;
	background: transparent;
	border: 1px solid transparent;
	margin-left: 0;
	padding-left: 0;
}

.toggle-info:hover {
	background: transparent;
	border: 1px solid transparent;
}

.toggle-info:focus {
	background: transparent;
	border:1px solid transparent;
}

#darkvision-grid {
	padding-right: 1rem;
}

#advanced {
	background: #6D7392;
	border-radius: 4px;
	padding-bottom: 10px;
}

#tags {
	margin-left: 10px;
}

#center-container {
	display: flex;
	justify-content: flex-start;
}

#rate-qual-diff {
	display: flex;
	justify-content: space-between;
	min-width: 25%;
}

.rate-qual-diff {
	margin-left: 5rem;
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
	min-height: 100px;
	width: 100%;
}

.editing {
	background: #1F2430;
	border-radius: 3px;
	min-width: 100px;
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
	background: #D33C40;
	border-color: #D33C40;
}

.muted-button {
	background: #6D7392;
	border-color: #6D7392;
}

.description textarea {
	min-height: 15rem;
}

</style>
