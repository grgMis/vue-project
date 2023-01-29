<template>
	<VDialog v-model:show="visibleWellForm">
		<h4>Well</h4>
		<WellForm></WellForm>
	</VDialog>
	<VDialog v-model:show="visibleActionForm">
		<h4>Action</h4>
		<ActionForm></ActionForm>
	</VDialog>
	<VDialog v-model:show="visibleActionOperForm">
		<h4>Action Oper</h4>
		<ActionOperForm></ActionOperForm>
	</VDialog>
	<VDialog v-model:show="visibleEquipForm">
		<h4>Equip</h4>
		<EquipForm></EquipForm>
	</VDialog>
	<VDialog v-model:show="visibleWellEquip">
		<h4>Well Equip</h4>
		<WellEquipForm></WellEquipForm>
	</VDialog>
	<div class="app">
		<h1>Добро пожаловать! Пользователь: Оператор</h1>
		<h2>Выберите таблицу для взаимодействия:</h2>
		<div class="tables">
			<div class="table__block" id="block__action">
				<h3>Ремонт оборудования:</h3>
				<VButton class="btns" @click="goToActionEquip">Текущий ремонт</VButton>
				<VButton class="btns" @click="showActionForm">Действия[C]</VButton>
				<VButton class="btns" @click="showActionOperForm">Операции[C]</VButton>
			</div>
			<div class="table__block" id="block__equip">
				<h3>Оборудование:</h3>
				<VButton class="btns" @click="goToWellEquip">Оборудование скважин</VButton>
				<VButton class="btns" @click="showEquipForm">Оборудование[C]</VButton>
			</div>
			<div class="table__block" id="block__well">
				<h3>Скважины:</h3>
				<VButton class="btns" @click="showWellEquipForm">Оборудование скважин[C]</VButton>
				<VButton class="btns" @click="showWellForm">Скважины[C]</VButton>
			</div>
		</div>
	</div>
</template>

<script>
import router from '@/router/router';
import VButton from '@/components/UI/v-button.vue';
import WellForm from '@/components/WellForm.vue';
import ActionForm from '@/components/ActionForm.vue';
import ActionOperForm from '@/components/ActionOperForm.vue';
import EquipForm from '@/components/EquipForm.vue';
import VDialog from '@/components/UI/v-dialog.vue';
import WellEquipForm from '@/components/WellEquipForm.vue';


export default {
    components: {
    VButton,
    WellForm,
    ActionForm,
    ActionOperForm,
    EquipForm,
    VDialog,
    WellEquipForm,
},
	data() {
		return {
			visibleWellForm: false,
			visibleActionForm: false,
			visibleActionOperForm: false,
			visibleEquipForm: false,
			visibleWellEquip: false,
		}
	},
	methods: {
		goToActionEquip() {
			router.push('/actionEquip');
		},
		goToWellEquip() {
			router.push('/wellEquip');
		},
		showWellForm() {
			this.visibleWellForm = true;
		},
		showActionForm() {
			this.visibleActionForm = true;
		},
		showActionOperForm() {
			this.visibleActionOperForm = true;
		},
		showEquipForm() {
			this.visibleEquipForm = true;
		},
		showWellEquipForm() {
			this.visibleWellEquip = true;
		},
	}
}
</script>

<style scoped>

* {
margin: 0px;
font-family: Arial, Helvetica, sans-serif;
}

h3 {
	margin-bottom: 10px;
}

h4 {
	font-size: 30px;
}

#block__action {
	height: 170px;
}

#block__well {
	height: 170px;
}

#block__equip {
	height: 170px;
}

.app {
	align-items: center;
	margin-left: 100px;
	margin-top: 15px;
}
.btns {
	color: black;
	border: 1px solid black;
	cursor: pointer;
}

.table__block {
	margin: 20px;
	padding: 10px;
	width: 300px;
	height: 400px;
	text-align: center;
	float: left;
	border: 1px solid black;
}

.tables {
	margin-left: -40px;
	height: 300px;
	width: 1900px;
	float: left;
	justify-content: space-around;
}

</style>