<template>
	<div class="navbar">
		<vButton class="btn" v-b-tooltip.hover title="Главная" @click="goToMain">◄</vButton>
		<div class="header">Мониторинг оборудования</div>
	</div>
</template>

<script>
import vButton from './v-button.vue';
import router from '@/router/router';

export default {
	components: {
		vButton
	},
	name: 'vNavbar',
	data() {
		return {
		}
	},
	methods: {
		goToMain() {
			router.push('/main')
		}
	}
}
</script>

<style scoped>
* {
	margin: 0;
	font-family: Arial, Helvetica, sans-serif;
}

.navbar {
	height: 50px;
	background-color: black;
	display: flex;
	align-items: center;
	padding: 0px 15px;
}

.navbar__btns {
	margin-left: auto;
	font-weight: bold;
	font-size: 15px;
}

.header {
	font-weight: bold;
	font-size: 20px;
	margin-left: 30px;
	color: white;
}

.btn {
	font-weight: bold;
	font-size: 15px;
}

</style>