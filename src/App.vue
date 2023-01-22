<template>
	<div class="app">
		<vNavbar></vNavbar>
		<RouterView></RouterView>
		<div class="app"></div>
	</div>
</template>

<script>
import vNavbar from '@/components/UI/v-navbar.vue'

export default {
	components: {
		vNavbar
	}
}
</script>

<style>

 * {
	margin: 0px;
 }

 .table {
	border: 2px solid black;
 }

 .columns {
	border: 2px solid black;
 }

 .app {
	background-color: white;
 }

</style>