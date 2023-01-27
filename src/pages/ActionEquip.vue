<template>
		<vDialog v-model:show="dialogUpdateVisible">
			<ActionEquipDataForm :idActionEquip = "this.selectedIdActionEquip"></ActionEquipDataForm>
		</vDialog>
		<vDialog v-model:show="dialogAddVisible">
			<ActionEquipForm></ActionEquipForm>
		</vDialog>
	<div class="actions__form">
		<label class="header">Текущий ремонт</label>
		<select name="wellName"
			v-model="selectedWellName" 
			@change="wellId=$event.target.options.selectedIndex">
				<option disabled value="">Скважина</option>
				<option v-for="well in wellList" :key="well.well_id">
					{{ well.well_name }}
				</option>
		</select>
		<VButton class="btns" @click="filterWell" v-b-tooltip.hover title="Фильтр по скважине">✔</VButton>
		<VButton class="btns" @click="showDialog" v-b-tooltip.hover title="Добавить">✚</VButton>
	</div>
	<div class="table__style">
		<table class="table" cellpadding="0" cellspacing="0">
			<thead>
				<tr>
					<th @click="sortByWellName">Номер скважины</th>
					<th>Модель оборудование</th>
					<th>Категория оборудование</th>
					<th>Класс оборудования</th>
					<th>Инвентарный номер</th>
					<th>Тип операции</th>
					<th>Вид операции</th>
					<th>Группа операции</th>
					<th @click="sortByData" v-b-tooltip.hover title="Сортировать">Дата действия
					</th>
					<th>Дата завершения действия</th>
					<th>Действие</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="actionEquip in actionEquipList" :key="actionEquip.action_equip_id">
					<td>{{ actionEquip.well_equip_id.well_id.well_name }}</td>
					<td>{{ actionEquip.well_equip_id.equip_id.equip_model_id.equip_model_name }}</td>
					<td>{{ actionEquip.well_equip_id.equip_id.equip_model_id.equip_class_id.equip_category_id.equip_category_name }}</td>
					<td>{{ actionEquip.well_equip_id.equip_id.equip_model_id.equip_class_id.equip_class_name }}</td>
					<td>{{ actionEquip.well_equip_id.equip_id.inventory_number }}</td>
					<td>{{ actionEquip.action_oper_id.action_oper_type_id.action_oper_type_name }}</td>
					<td>{{ actionEquip.action_oper_id.action_id.action_type_id.action_type_name }}</td>
					<td>{{ actionEquip.action_oper_id.action_id.action_type_id.action_group_id.action_group_name}}</td>
					<td>{{ actionEquip.action_oper_id.action_id.action_date_begin }}</td>
					<td>{{ actionEquip.action_oper_id.action_id.action_date_end }}</td>
					<td>
						<div class="td__btns">
							<VButton class="btns" @click="deleteActionEquip(actionEquip.action_equip_id)" v-b-tooltip.hover title="Удалить запись">✖</VButton>
							<VButton class="btns" @click="this.selectedIdActionEquip=getIdActionEquip(actionEquip)" v-b-tooltip.hover title="Редактирование">✎</VButton>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import axios from 'axios'; 
import vDialog from '@/components/UI/v-dialog.vue'
import ActionEquipDataForm from '@/components/ActionEquipDataForm.vue';
import ActionEquipForm from '@/components/ActionEquipForm.vue';
import VButton from '@/components/UI/v-button.vue';
import VInput from '@/components/UI/v-input.vue';

export default {
    data() {
        return {
			selectedIdActionEquip: 0,
			dialogVisible: false,
            actionEquipList: [],
			wellList: [],
			selectedWellName: "",
			wellId: 0,
			dialogUpdateVisible: false,
			dialogAddVisible: false

        };
    },
    methods: {
		showDialog() {
			this.dialogAddVisible = true;
		},
		filterWell() {
			return this.actionEquipList
				.filter(actionEquipList => {
					return actionEquipList.well_equip_id.well_id.well_name === this.selectedWellName;
				})
		},
		sortByData() {
			this.actionEquipList.sort((a, b) => a.action_oper_id.action_id.action_date_begin.localeCompare(b.action_oper_id.action_id.action_date_begin));
		},
		sortByWellName() {
			this.actionEquipList.sort((a, b) => a.well_equip_id.well_id.well_name.localeCompare(b.well_equip_id.well_id.well_name));
		},
		getIdActionEquip(actionEquip){
			this.dialogUpdateVisible = true;
			return actionEquip.action_equip_id;
		},
        async loadActionEquipList() {
            try {
                const response = await axios.get("http://localhost:8081/actionEquip/actionEquipAll");
                this.actionEquipList = response.data;
                console.log(this.actionEquipList);
            }
            catch (e) {
                console.log("Error");
            }
        },
		async loadWellList() {
			try {
				const response = await axios.get("http://localhost:8081/well/wellAll");
				this.wellList = response.data;
				console.log(this.wellList);
			} catch (e) {
				console.log("Error");
			}
		},
        async deleteActionEquip(action_equip_id) {
            try {
                if (confirm("Удалить выбранную запись?")){
					alert("Запись успешно удалена");
					const response = await axios.delete("http://localhost:8081/actionEquip/"+action_equip_id);
					this.loadActionEquipList();
				} else {
					alert("Удаление отменено");
					this.loadActionEquipList();
				}
            }
            catch (e) {
                alert("Ошибка удаления");
                console.log("Error");
            }
        }
    },
    mounted() {
		this.loadWellList();
        this.loadActionEquipList();
    },
	computed: {
		
	},
    components: {
    VButton,
    vDialog,
    ActionEquipDataForm,
	ActionEquipForm,
    VInput
}
}
</script>

<style scoped>

 * {
	margin: 0px;
	font-family: Arial, Helvetica, sans-serif;
 }

 th {
	cursor: pointer;
 }
 
select {
	width: 160px;
	border: 1px solid black;
	padding: 10px 15px;
	margin-top: 15px;
	margin-right: 30px;
	margin: 10px;
	font-weight: bold;
}

.header {
	font-size: 25px;
	font-weight: bold;
	orientation: right;
	margin-left: 20px;
	margin-right: 1350px;
}

 .actions__form {
	margin: 10px;
	border: 1px solid black;
	float: center;
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
 
</style>