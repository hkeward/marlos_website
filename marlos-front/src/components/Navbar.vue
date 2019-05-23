<!-- Navbar.vue -->

<template>
	<div id="navbar">
		<nav>
			<router-link to="/" class="navbar">Home</router-link>
			<router-link to="/about" class="navbar">About</router-link>
			<router-link to="/rooms" class="navbar">Rooms</router-link>
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'navbar',
	}

</script>

<style scoped>
a.navbar {
	float: left;
    background-color: darkslategrey;
	width: 33.33%;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
}
nav {
	color: black;
    display: block;
}

a.navbar {
    padding: 8px 16px;
}

a:hover {
    background-color: cadetblue;
    color: aliceblue;
}

a:visited {
    color: white;
}

a:active {
    background-color: cadetblue;
    color: aliceblue;
}

a:visited {
    color: aliceblue;
}
</style>