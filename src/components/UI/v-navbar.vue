<template>
	<div class="navbar">
		<div class="header">Мониторинг оборудования</div>
		<vButton class="btn btn__auth" v-b-tooltip.hover title="Выйти" @click="goToAuth">Выйти</vButton>
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
		goToAuth() {
			if (confirm("Вы точно хотите выйти?")){
					router.push('/');
				}
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

.header {
	font-weight: bold;
	font-size: 20px;
	margin-left: 15px;
	color: white;
}

.btn {
	font-weight: bold;
	font-size: 15px;
	cursor: pointer;
}

.btn__auth {
	margin-left: auto;
	font-weight: bold;
	font-size: 15px;
}

</style>