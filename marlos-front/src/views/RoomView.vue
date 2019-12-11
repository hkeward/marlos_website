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

		<div id="more-info-section">
			<div v-if="infoExpanded" class="more-info">

				<button @click="toggleInfoExpanded" class="toggle-info">▼ Less</button>

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
				<button @click="toggleInfoExpanded" class="toggle-info">► More info</button>

			</div>
		</div>

		<div v-if="editing === currentRoom.roomId" class="editing">
			<editor-menu-bar class="editor-menu-bar" :editor="editor" v-slot="{ commands, isActive, getMarkAttrs }">
				<div>
					<div>
						<button :class="{ 'is-active': isActive.heading({ level: 1}) }" @click="commands.heading({ level: 1 })">
							<font-awesome-icon icon="heading"></font-awesome-icon>1
						</button>
						<button :class="{ 'is-active': isActive.heading({ level: 2}) }" @click="commands.heading({ level: 2 })">
							<font-awesome-icon icon="heading"></font-awesome-icon>2
						</button>
						<button :class="{ 'is-active': isActive.heading({ level: 3}) }" @click="commands.heading({ level: 3 })">
							<font-awesome-icon icon="heading"></font-awesome-icon>3
						</button>
						<button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
							<font-awesome-icon icon="bold"></font-awesome-icon>
						</button>
						<button :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
							<font-awesome-icon icon="underline"></font-awesome-icon>
						</button>
						<button :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
							<font-awesome-icon icon="italic"></font-awesome-icon>
						</button>
						<button :class="{ 'is-active': isActive.table() }" @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: true})">
							<font-awesome-icon icon="table"></font-awesome-icon>
						</button>
						<button :class="{ 'is-active': isActive.link() }" @click="showLinkPrompt(getMarkAttrs('link'))">
							<font-awesome-icon icon="link"></font-awesome-icon>
						</button>
						<button :class="{ 'is-active': isActive.image() }" @click="showImagePrompt()">
							<font-awesome-icon icon="image"></font-awesome-icon>
						</button>
					</div>
					<div>
						<span v-if="isActive.table()" class="secondary-menubar" :class="{ 'is-active': isActive.table() }">
							<button @click="commands.deleteTable">Delete table</button>
							<button @click="commands.addColumnBefore">Add column before</button>
							<button @click="commands.addColumnAfter">Add column after</button>
							<button @click="commands.deleteColumn">Delete column</button>
							<button @click="commands.addRowBefore">Add row before</button>
							<button @click="commands.addRowAfter">Add row after</button>
							<button @click="commands.deleteRow">Delete row</button>
						</span>
						<span v-else-if="newImageLink" class="secondary-menubar" :class="{ 'is-active': newImageLink }">
							<div>
								<form @submit.prevent="setImageUrl(commands.image, imageLinkUrl)">
									<input class="link-input" type="text" v-model="imageLinkUrl" placeholder="https://" ref="imageLinkInput"/>
									<button class="link-input update-add" @click="setImageUrl(commands.image, imageLinkUrl)">
										<span>Add image</span>
									</button>
								</form>
							</div>
						</span>
						<span v-else class="secondary-menubar" :class="{ 'is-active': isActive.link() || newLink }">
							<div>
								<form @submit.prevent="setLinkUrl(commands.link, linkUrl)">
									<input class="link-input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput"/>
									<button class="link-input update-add" @click="setLinkUrl(commands.link, linkUrl)">
										<span>{{ isActive.link() ? 'Update' : 'Add'}}</span>
									</button>
									<button v-if="isActive.link() && getMarkAttrs('link').href !== undefined" class="link-input" @click="setLinkUrl(commands.link, null)" type="button">
										Remove link
									</button>
								</form>
							</div>
						</span>
					</div>
				</div>
			</editor-menu-bar>
			<editor-content class="description" :editor="editor"></editor-content>
		</div>

		<div v-else class="description" v-html="currentRoom.description">
		</div>
	</div>
    <div v-else>
        <h1> No rooms with ID {{ this.$route.params.id }} found.</h1>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { Heading, Bold, Underline, Italic, Table, TableHeader, TableCell, TableRow, Link, Image } from 'tiptap-extensions';

export default {
	name: 'room',

	components: {
		EditorContent,
		EditorMenuBar,
	},

	props: {
		id: Number,
	},

	data() {
		return {
            currentRoom: {},
			cachedRoom: {},
            roomFound: true,
			editor: null,
			linkUrl: null,
			newLink: false,
			imageLinkUrl: null,
			newImageLink: false
		}
	},

	computed: {
		...mapState([
				'keycloak',
				'rooms',
				'editing',
				'isAdminUser',
				'infoExpanded',
				'isNewRoom'
		]),
	},

	methods: {
		...mapActions([
				'toggleEditing',
				'toggleInfoExpanded',
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

		onEdit(e) {
			const classes = Array.from(e.target.classList);
			const contents = e.target.innerText;
			if (classes.includes("room-name")) {
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
			this.currentRoom.__ob__.dep.notify();
			this.toggleEditing(false);
		},

		addBrToEmptyParagraph(html) {
			const emptyParagraphRegex = /<p><\/p>/g;
			return html.replace(emptyParagraphRegex, "<p><br></p>");
		},

		cleanDataColwidth(html) {
			const dataColwidthRegex = /data-colwidth/g;
			return html.replace(dataColwidthRegex, "width");
		},

		uncleanDataColwidth(html) {
			if (html == null) {
				return html;
			}
			const widthRegex = /width/g;
			return html.replace(widthRegex, "data-colwidth");
		},

		cleanLinkUrl(href) {
			const dotRegex = /\./;

			// prepend non-relative links with https://www.
			if (href.match(dotRegex)) {
				const badUrlPrefixRegex = /^(www\.|(?!(https?:\/\/www\.)))/;
				return href.replace(badUrlPrefixRegex, "https://www.");
			}

			return href;
		},

		showLinkPrompt(attrs) {
			this.linkUrl = attrs.href;
			if (!this.linkUrl) {
				this.newLink = true;
			}
			this.$nextTick(() => {
				this.$refs.linkInput.focus();
			})
		},

		setLinkUrl(command, url) {
			if (!url) {
				command({ href: url});
			} else {
				command({ href: this.cleanLinkUrl(url) });
			}
			this.linkUrl = null;
			this.newLink = false;
		},

		showImagePrompt() {
			if (!this.imageLinkUrl) {
				this.newImageLink = true;
			}
			this.$nextTick(() => {
				this.$refs.imageLinkInput.focus();
			})
		},

		setImageUrl(command, url) {
			if (url !== null) {
				command({ src: url });
			}
			this.imageLinkUrl = null;
			this.newImageLink = false;
		},
	},

	created() {
		this.getCurrentRoom(this.$route.params.id);
	},

	mounted() {
		this.editor = new Editor({
			extensions: [
				new Heading({
					levels: [1, 2, 3]
				}),
				new Bold(),
				new Underline(),
				new Italic(),
				new Table({
					resizable: true,
				}),
				new TableHeader(),
				new TableCell(),
				new TableRow(),
				new Link({
					openOnClick: false,
				}),
				new Image()
			],
			content: this.currentRoom.description,
			onUpdate: ({ getHTML }) => {
				const descriptionHTML = this.cleanDataColwidth(this.addBrToEmptyParagraph(getHTML()));
				this.currentRoom.description = descriptionHTML;
				this.$emit('input', descriptionHTML);
			},
		});
	},

	watch: {
		// populates the description when the room data is loaded
		currentRoom () {
			this.editor.setContent(this.uncleanDataColwidth(this.currentRoom.description));
		},

		'editor.isActive.link' (linkFn) {
			if (!linkFn()) {
				this.newLink = false;
				this.newImageLink = false;
			}
			this.linkUrl = this.editor.getMarkAttrs('link').href;
		}
	},

	beforeDestroy() {
		this.editor.destroy()
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

.editor-menu-bar {
	margin-bottom: 3px;
}

.editor-menu-bar button {
	/*margin-right: 3px;*/
	border: unset;
	border-radius: unset;
	border-left: 3px solid transparent;
	border-right: 1px solid white;
	background: transparent;
}

.editor-menu-bar button.is-active {
	background: #6d7392;
	border-left: 3px solid #6d7392;
}

.editor-menu-bar button:hover {
	background: #50596c;
}

.secondary-editor-menu-bar button {
	border-top: 2px double white;
	margin: 0;
}

.secondary-menubar {
	visibility: hidden;
}

.secondary-menubar.is-active {
	visibility: visible;
}

.link-input {
	width: unset;
	display: inline-block;
	background: #6d7392;
}

input.link-input {
	border-radius: 0;
	margin-left: 0.5rem;
	padding: 0rem 0.5rem;
	background: transparent;
	color: white;
	border: 1px solid white;
	min-width: 20rem;
}

button.link-input {
	border: none;
	border-radius: 3px;
	background: #6d7392;
	margin-left: 0.5rem;
	transition-duration: 0s;
}
</style>

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
</style>