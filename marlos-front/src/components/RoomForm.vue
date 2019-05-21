<!-- RoomForm.vue -->

<template>
    <div id="room-form">
        <form @submit.prevent="handleSubmit">
            <label>Room name</label>
            <input 
                ref="first"
                type="text"
                :class="{ 'has-error': submitting && invalidRoomName }"
                v-model="room.roomName" 
                @focus="clearStatus"
                @keypress="clearStatus"
                 />
            <label>Type</label>
            <input 
                type="text" 
                v-model="room.type" 
                @focus="clearStatus"
                />
            <label>Tags</label>
            <input 
                type="text" 
                v-model="room.tags" 
                @focus="clearStatus"
                />
            <p v-if="error && submitting" class="error-message">
                ❗ Please fill out all required fields
            </p>
            <p v-if="success" class="success-message">
                ✅ Room successfully added
            </p>
            <button>Add room</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'room-form',
        props: {
            rooms: Array,
        },
        data() {
            return {
                room: {
                    roomName: '',
                    type: '',
                    tags: ''
                },
                submitting: false,
                error: false,
                success: false,
            }
        },
        methods: {
            handleSubmit() {
                this.submitting = true;
                this.clearStatus();

                if (this.invalidRoomName) {
                    this.error = true;
                    return;
                }
                // we only emit the event if it is valid
                this.$emit('add:room', this.room);
                this.$refs.first.focus();
                this.room = {
                    roomName: '',
                    type: '',
                    tags: ''
                };
                this.error = false;
                this.success = true;
                this.submitting = false;
            },
            clearStatus() {
                this.success = false;
                this.error = false;
            },
        },
        computed: {
            invalidRoomName() {
               return (this.room.roomName === '');
        },
    },
}

</script>

<style scoped>
    form {
        margin-bottom: 2rem;
    }

    [class*='-message'] {
        font-weight: 500;
    }

    .error-message {
        color: #d33c40;
    }

    .success-message {
        color: #32a95d;
    }
</style>