<template>
	<vDialog v-model:show="dialogVisible">
		<ActionEquipForm></ActionEquipForm>
	</vDialog>
	<div class="navbar">
		<vButton class="btn" v-b-tooltip.hover title="Главная" @click="goToMain">◄</vButton>
		<div class="header">Текущее оборудование</div>
		<div class="navbar__btns">
			<vButton v-b-tooltip.hover title="Создать запись"
			@click="showDialog"
			>✚</vButton>
		</div>
	</div>
</template>

<script>
import vButton from './v-button.vue';
import vDialog from '@/components/UI/v-dialog.vue'
import ActionEquipForm from '@/components/ActionEquipForm.vue';
import router from '@/router/router';

export default {
	components: {
		vDialog,
		ActionEquipForm,
		vButton
	},
	name: 'vNavbar',
	data() {
		return {
			dialogVisible: false,
		}
	},
	methods: {
		showDialog() {
			this.dialogVisible = true;
		},
		goToMain() {
			router.push('/')
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
	color: white;
}

.btn {
	font-weight: bold;
	font-size: 15px;
}

</style>