<template>
	<div class="app">
		<vNavbar></vNavbar>
		<RouterView></RouterView>
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
	border: 1px solid black;
 }

 .columns {
	border: 1px solid black;
 }

</style>