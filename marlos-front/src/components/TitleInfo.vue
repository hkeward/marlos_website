<template>
    <div id="title-info">

        <h1 v-if="editing === currentRoom.roomId" v-text="currentRoom.roomName" @blur="onEdit" id="roomName" class="room-name editing" contenteditable="true">
        </h1>

        <h1 v-else class="room-name" contenteditable="false">
            {{ currentRoom.roomName }}
        </h1>


        <h3 v-if="editing === currentRoom.roomId" v-text="currentRoom.type" @blur="onEdit" id="type" class="type editing" contenteditable="true">
        </h3>

        <h3 v-else class="type" contenteditable="false">
            {{ currentRoom.type }}
        </h3>

    </div>
</template>