<template>
	<VDialog v-model:show="visibleActionGroupForm">
		<h4>Action Group</h4>
		<ActionGroupForm></ActionGroupForm>
	</VDialog>
	<VDialog v-model:show="visibleActionTypeForm">
		<h4>Action Type</h4>
		<ActionTypeForm></ActionTypeForm>
	</VDialog>
	<VDialog v-model:show="visibleDeptTypeForm">
		<h4>Dept Type</h4>
		<DeptTypeForm></DeptTypeForm>
	</VDialog>
	<VDialog v-model:show="visibleDeptForm">
		<h4>Dept</h4>
		<DeptForm></DeptForm>
	</VDialog>
	<VDialog v-model:show="visibleWellForm">
		<h4>Well</h4>
		<WellForm></WellForm>
	</VDialog>
	<VDialog v-model:show="visibleActionForm">
		<h4>Action</h4>
		<ActionForm></ActionForm>
	</VDialog>
	<VDialog v-model:show="visibleActionOperTypeForm">
		<h4>Action Oper Type</h4>
		<ActionOperTypeForm></ActionOperTypeForm>
	</VDialog>
	<VDialog v-model:show="visibleActionOperForm">
		<h4>Action Oper</h4>
		<ActionOperForm></ActionOperForm>
	</VDialog>
	<VDialog v-model:show="visibleHangerTypeForm">
		<h4>Hanger Type</h4>
		<HangerTypeForm></HangerTypeForm>
	</VDialog>
	<VDialog v-model:show="visibleEquipStateForm">
		<h4>Equip State</h4>
		<EquipStateForm></EquipStateForm>
	</VDialog>
	<VDialog v-model:show="visibleEquipCategoryForm">
		<h4>Equip Category</h4>
		<EquipCategoryForm></EquipCategoryForm>
	</VDialog>
	<VDialog v-model:show="visibleEquipClassForm">
		<h4>Equip Class</h4>
		<EquipClassForm></EquipClassForm>
	</VDialog>
	<VDialog v-model:show="visibleEquipModelForm">
		<h4>Equip Model</h4>
		<EquipModelForm></EquipModelForm>
	</VDialog>
	<VDialog v-model:show="visibleEquipForm">
		<h4>Equip</h4>
		<EquipForm></EquipForm>
	</VDialog>
	<div class="app">
		<h1>Добро пожаловать!</h1>
		<h2>Выберите таблицу для взаимодействия</h2>
		<div class="links">
			<VButton class="btns">
				<RouterLink to="/actionEquip">Action Equipment</RouterLink>
			</VButton>
			<VButton class="btns">
				<RouterLink to="/equip">Equipment</RouterLink>
			</VButton>
			<VButton class="btns">
				<RouterLink to="/well">Well</RouterLink>
			</VButton>
			<VButton class="btns">
				<RouterLink to="/action">Action</RouterLink>
			</VButton>
			<VButton class="btns">
				<RouterLink to="/actionOper">Action Oper</RouterLink>
			</VButton>
			<VButton class="btns" @click="showActionForm">Action</VButton>
			<VButton class="btns" @click="showActionGroupForm">Action Group</VButton>
			<VButton class="btns" @click="showActionTypeForm">Action Type</VButton>
			<VButton class="btns" @click="showActionOperTypeForm">Action Oper Type</VButton>
			<VButton class="btns" @click="showActionOperForm">Action Oper</VButton>
			<VButton class="btns" @click="showDeptTypeForm">Dept Type</VButton>
			<VButton class="btns" @click="showDeptForm">Dept</VButton>
			<VButton class="btns" @click="showEquipStateForm">Equip State</VButton>
			<VButton class="btns" @click="showEquipCategoryForm">Equip Category</VButton>
			<VButton class="btns" @click="showEquipClassForm">Equip Class</VButton>
			<VButton class="btns" @click="showEquipModelForm">Equip Model</VButton>
			<VButton class="btns" @click="showEquipForm">Equip</VButton>
			<VButton class="btns" @click="showWellForm">Well</VButton>
			<VButton class="btns" @click="showHangerTypeForm">Hanger Type</VButton>
		</div>
	</div>
</template>

<script>
import VButton from '@/components/UI/v-button.vue';
import ActionGroupForm from '@/components/ActionGroupForm.vue';
import ActionTypeForm from '@/components/ActionTypeForm.vue';
import DeptTypeForm from '@/components/DeptTypeForm.vue';
import DeptForm from '@/components/DeptForm.vue';
import WellForm from '@/components/WellForm.vue';
import ActionForm from '@/components/ActionForm.vue';
import ActionOperTypeForm from '@/components/ActionOperTypeForm.vue';
import ActionOperForm from '@/components/ActionOperForm.vue';
import HangerTypeForm from '@/components/HangerTypeForm.vue';
import EquipStateForm from '@/components/EquipStateForm.vue';
import EquipCategoryForm from '@/components/EquipCategoryForm.vue';
import EquipClassForm from '@/components/EquipClassForm.vue';
import EquipModelForm from '@/components/EquipModelForm.vue';
import EquipForm from '@/components/EquipForm.vue';
import VDialog from '@/components/UI/v-dialog.vue';


export default {
    components: {
		VButton,
		ActionGroupForm,
		ActionTypeForm,
		DeptTypeForm,
		DeptForm,
		WellForm,
		ActionForm,
		ActionOperTypeForm,
		ActionOperForm,
		HangerTypeForm,
		EquipStateForm,
		EquipCategoryForm,
		EquipClassForm,
		EquipModelForm,
		EquipForm,
		VDialog
},
	data() {
		return {
			visibleActionGroupForm: false,
			visibleActionTypeForm: false,
			visibleDeptTypeForm: false,
			visibleDeptForm: false,
			visibleWellForm: false,
			visibleActionForm: false,
			visibleActionOperTypeForm: false,
			visibleActionOperForm: false,
			visibleHangerTypeForm: false,
			visibleEquipStateForm: false,
			visibleEquipCategoryForm: false,
			visibleEquipClassForm: false,
			visibleEquipModelForm: false,
			visibleEquipForm: false
		}
	},
	methods: {
		showActionGroupForm() {
			this.visibleActionGroupForm = true;
		},
		showActionTypeForm() {
			this.visibleActionTypeForm = true;
		},
		showDeptTypeForm() {
			this.visibleDeptTypeForm = true;
		},
		showDeptForm() {
			this.visibleDeptForm = true;
		},
		showWellForm() {
			this.visibleWellForm = true;
		},
		showActionForm() {
			this.visibleActionForm = true;
		},
		showActionOperTypeForm() {
			this.visibleActionOperTypeForm = true;
		},
		showActionOperForm() {
			this.visibleActionOperForm = true;
		},
		showHangerTypeForm() {
			this.visibleHangerTypeForm = true;
		},
		showEquipStateForm() {
			this.visibleEquipStateForm = true;
		},
		showEquipCategoryForm() {
			this.visibleEquipCategoryForm = true;
		},
		showEquipClassForm() {
			this.visibleEquipClassForm = true;
		},
		showEquipModelForm() {
			this.visibleEquipModelForm = true;
		},
		showEquipForm() {
			this.visibleEquipForm = true;
		},
	}
}
</script>

<style scoped>

* {
margin: 0px;
font-family: Arial, Helvetica, sans-serif;
}

h4 {
	font-size: 30px;
}
.app {
	align-items: center;
	margin-left: 100px;
	margin-top: 15px;
}
.links {
	display: fixed;
	justify-content: space-around;
}

.btns {
	color: black;
	border: 1px solid black;
}

</style>