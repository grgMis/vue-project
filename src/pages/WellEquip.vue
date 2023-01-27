<template>
	<VDialog v-model:show="dialogVisible">
		<WellEquipForm></WellEquipForm>
	</VDialog>
	<div class="wellEquip">
		<div class="well__equip__form">
			<label class="header">Оборудование скважин</label>
			<VButton class="btns" @click="showDialog" v-b-tooltip.hover title="Добавить">✚</VButton>
		</div>
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th @click="sortByWellName">Номер скважины</th>
						<th>Организация</th>
						<th>Модель</th>
						<th>Класс</th>
						<th>Категория</th>
						<th>Инвентарный номер</th>
						<th>Заводской номер</th>
						<th>Состояние</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="wellEquip in wellEquipList" :key="wellEquip.well_equip_id">
						<td>{{ wellEquip.well_id.well_name }}</td>
						<td>{{ wellEquip.well_id.dept_id.dept_name }}</td>
						<td>{{ wellEquip.equip_id.equip_model_id.equip_model_name}}</td>
						<td>{{ wellEquip.equip_id.equip_model_id.equip_class_id.equip_class_name }}</td>
						<td>{{ wellEquip.equip_id.equip_model_id.equip_class_id.equip_category_id.equip_category_name }}</td>
						<td>{{ wellEquip.equip_id.inventory_number }}</td>
						<td>{{ wellEquip.equip_id.factory_number }}</td>
						<td>{{ wellEquip.equip_id.equip_state_id.equip_state_name }}</td>	
						<td>
							<div class="td__btns">
								<VButton class="btns btn__delete" @click="deleteWellEquip(wellEquip.well_equip_id)" v-b-tooltip.hover title="Удалить запись">✖</VButton>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
</template>

<script>
import VButton from '@/components/UI/v-button.vue';
import VDialog from '@/components/UI/v-dialog.vue';
import WellEquipForm from '@/components/WellEquipForm.vue';
import axios from 'axios';

export default {
	name: 'Equip',
	data() {
		return {
			wellEquipList: [],
			dialogVisible: false
		};
	},
	methods: {
		sortByWellName() {
			this.wellEquipList.sort((a, b) => a.well_id.well_name.localeCompare(b.well_id.well_name));
		},
		showDialog() {
			this.dialogVisible = true;
		},
		async loadWellEquipList() {
			try {
				const response = await axios.get('http://localhost:8081/wellEquip/wellEquipAll');
				this.wellEquipList = response.data;
				console.log(this.wellEquipList);
			} catch(e) {
				console.log('Error');
			}
		},
		async deleteWellEquip(well_equip_id) {
            try {
                if (confirm("Удалить выбранную запись?")){
					alert("Запись успешно удалена");
					const response = await axios.delete("http://localhost:8081/wellEquip/"+well_equip_id);
					this.loadWellEquipList();
				} else {
					alert("Удаление отменено");
					this.loadWellEquipList();
				}
            }
            catch (e) {
                alert("Ошибка удаления");
                console.log("Error");
            }
        }
	},
	mounted() {
		this.loadWellEquipList();
	},
	components: {
    VButton,
    WellEquipForm,
    VDialog
}
}
</script>

<style scoped>

* {
	margin: 0px;
	font-family: Arial, Helvetica, sans-serif;
 }

 .form {
	padding: 10px;
 }

.table__style {
	padding: 10px;
}

 .table {
	width: 100%;
	display: fixed;
	margin-bottom: 20px;
	border-collapse: collapse; 
}

.table th {
	font-weight: bold;
	padding: 5px;
	background: #efefef;
	border: 1px solid #dddddd;
	cursor: pointer;
}
.table td {
	border: 1px solid #dddddd;
	padding: 5px;
	text-align: center;
	font-size: 15px;
}
.table tr td:first-child, .table tr th:first-child {
	border-left: none;
}
.table tr td:last-child, .table tr th:last-child {
	border-right: none;
}

 .btns {
	color: black;
	border: 1px solid black;
	font-weight: bold;
	font-size: 15px;
 }

 .td__btns {
	display: flex;
	justify-content: space-between;
 }

 .header {
	font-size: 25px;
	font-weight: bold;
	orientation: right;
	margin-left: 20px;
	margin-right: 1500px;
}

.well__equip__form {
	margin: 10px;
	border: 1px solid black;
	float: center;
}

.btn__delete {
	margin-left: 35px;
}

</style>