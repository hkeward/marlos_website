<!-- Navbar.vue -->

<template>
	<div id="navbar">
		<nav>
			<router-link to="/" class="navbar home" tag="button">Home</router-link>
			<router-link to="/about" class="navbar" tag="button">About</router-link>
			<router-link to="/rooms" class="navbar" tag="button">Rooms</router-link>
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'navbar',
	}

</script>

<style scoped>
#navbar {
	display: block;
	background-color: #1F1A6C;
}

nav button {
	font-size: 1.5rem;
	background: #514BB1;
	border: 1px solid #514BB1;
	color: white;
	border-radius: 4px;
	margin: 12px 5px 12px 5px;
	padding: 5px;
}

button:focus {
	outline: 0;
}
</style>