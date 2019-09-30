<!-- Navbar.vue -->

<template>
	<div id="navbar">
		<div id="common">
			<router-link to="/" class="navbar" tag="button">Home</router-link>
			<router-link to="/about" class="navbar" tag="button">About</router-link>
			<router-link to="/rooms" class="navbar" tag="button">Rooms</router-link>
		</div>
		<div id="login-signup" :helpertext="helpertext">
<!--			<p class="helpertext"> {{ helpertext }} </p>-->
<!--			<button id="sign-up" @click="placeholderText()">Sign up</button>-->
<!--			<p id="user-banner">Welcome {{this.keycloak.idTokenParsed.preferred_username}}</p>-->
			<button id="log-out" @click="logout()">Log out</button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'navbar',

	data() {
		return {
			helpertext: ""
		}
	},

	computed: {
		...mapState([
				'keycloak'
		])
	},

	methods: {
		placeholderText() {
			if (this.helpertext == "") {
				this.helpertext = "These are currently nonfunctional placeholders; sorry!";
			} else {
				this.helpertext = "";
			}
		},
		logout() {
			this.keycloak.logout();
		},
		whoami() {
			console.log(this.keycloak.idTokenParsed.given_name);
		}
	},
}
</script>

<style scoped>
#navbar {
	border-top: 5px solid #7992C4;
	display: flex;
	background-color: #1F2430;
	justify-content: space-between;
}

button {
	background: #1F2430;
	color: white;
    border: 1px solid transparent;
	margin: 12px 5px 12px 5px;
}

button:focus, button:active {
	outline: 0;
}

#common button:hover {
	color: #7992C4;
	cursor: pointer;
}

#login-signup {
	padding-right: 0.2rem;
	display: flex;
	justify-content: flex-end;
}

.helpertext {
	font-size: 1.2rem;
}

#login {
	background: #7992C4;
	border: 1px solid #7992C4;
}

#login:hover {
	background: #6D7392;
	border: 1px solid #6D7392;
}

#sign-up,#log-out {
	border: 1px solid #7992C4;
}

#sign-up:hover {
	background: #7992C4;
}

#user-banner {
	margin-right: 2px;
}

</style>
