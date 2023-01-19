<template>
	<div class="navbar">
		<div class="header">Текущее оборудование</div>
		<div class="navbar__btns">
			<vButton>Btn1</vButton>
			<vButton>Btn2</vButton>
		</div>
	</div>
</template>

<script>
import vButton from './v-button.vue';

export default {
	name: 'vNavbar',

    components: {
		vButton
	},
}
</script>

<style scoped>

.navbar {
	height: 50px;
	background-color: #65A5D1;
	box-shadow: 2px 2px 4px black;
	display: flex;
	align-items: center;
	padding: 0px 15px;
}

.navbar__btns {
	margin-left: auto;
}

.header {
	font-weight: bold;
	font-size: 20px;
	color: white;
	text-shadow: 2px 2px 4px black;
}
</style>