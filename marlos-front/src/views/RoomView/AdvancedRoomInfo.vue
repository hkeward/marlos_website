<template>
    <div id="more-info-section">
        <div v-if="infoExpanded" class="more-info">

            <button @click="toggleInfoExpanded" class="toggle-info">▼ Metadata</button>

            <div v-if="editing.room === currentRoom.id" id="advanced-editing">
                <div class="center-container">
                    <div id="darkvision-grid">
                        <div id="darkvision">
                            <input type="checkbox" id="darkvision" class="darkvision" v-model="currentRoom.darkvision" :true-value="1" :false-value="0">
                            <label for="darkvision">Darkvision required</label>
                        </div>
                        <div id="grid">
                            <input type="checkbox" id="grid" class="grid" v-model="currentRoom.grid" :true-value="1" :false-value="0">
                            <label for="grid">Grid required</label>
                        </div>
                    </div>

                    <div class="labeled-div">
                        <div>
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

                        <div>
                            <p v-text="currentRoom.rating" @blur="$parent.onEdit" id="rating" class="rating editing" contenteditable="true"></p>
                            <p v-text="currentRoom.quality" @blur="$parent.onEdit" id="quality" class="quality editing" contenteditable="true"></p>
                            <p v-text="currentRoom.difficulty" @blur="$parent.onEdit" id="difficulty" class="difficulty editing" contenteditable="true"></p>
                            <p v-text="currentRoom.environment" @blur="$parent.onEdit" id="environment" class="environment editing" contenteditable="true"></p>
                        </div>

                    </div>

                    <div>
                    </div>
                </div>

                <div id="tags">
                    Tags: {{ "#" + currentRoom.tags }}
                </div>

            </div>

            <div v-else id="advanced">

                <div class="center-container">
                    <div v-if="currentRoom.darkvision == 1 || currentRoom.grid == 1" id="darkvision-grid">
                        <ul>
                            <li v-if="currentRoom.darkvision == 1" id="darkvision" contenteditable="false">Darkvision required</li>
                            <li v-if="currentRoom.grid == 1" id="grid" contenteditable="false">Grid required</li>
                        </ul>
                    </div>

                    <div>
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
            <button @click="toggleInfoExpanded" class="toggle-info">► Metadata</button>

        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'advanced-room-info',

    props: {
        currentRoom: Object,
    },

    computed: {
        ...mapState([
            'editing',
            'infoExpanded'
        ])
    },

    methods: {
        ...mapActions([
            'toggleInfoExpanded'
        ]),
    }

}
</script>

<style>
.center-container {
    display: flex;
    justify-content: flex-start;
    padding: 10px;
}

.labeled-div {
    display: flex;
    justify-content: space-between;
    min-width: 25%;
}
</style>

<style scoped>
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

.editing {
    background: #1F2430;
    border-radius: 3px;
    min-width: 100px;
}
</style>
