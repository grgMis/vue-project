<template>
		<vDialog v-model:show="dialogVisible">
			<ActionEquipDataForm :idActionEquip = "this.selectedIdActionEquip"></ActionEquipDataForm>
		</vDialog>
	<div class="table__style">
		<table class="table" cellpadding="0" cellspacing="0">
			<thead>
				<tr>
					<th>Номер скважины</th>
					<th>Модель оборудование</th>
					<th>Категория подвески</th>
					<th>Класс оборудования</th>
					<th>Инвентарный номер</th>
					<th>Тип операции</th>
					<th>Вид операции</th>
					<th>Дата действия</th>
					<th>Состояние оборудования</th>
					<th>Начальная глубина</th>
					<th>Конечная глубина</th>
					<th>Действие</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="actionEquip in actionEquipList" :key="actionEquip.action_equip_id">
					<td>{{ actionEquip.action_oper_id.action_id.well_id.well_name }}</td>
					<td>{{ actionEquip.equip_id.equip_model_id.equip_model_name }}</td>
					<td>{{ actionEquip.equip_class_id.equip_category_id.equip_category_name }}</td>
					<td>{{ actionEquip.equip_class_id.equip_class_name }}</td>
					<td>{{ actionEquip.equip_id.inventory_number }}</td>
					<td>{{ actionEquip.action_oper_id.action_oper_type_id.action_oper_type_name }}</td>
					<td>{{ actionEquip.action_oper_id.action_id.action_type_id.action_type_name }}</td>
					<td>{{ actionEquip.action_oper_id.action_oper_date}}</td>
					<td>{{ actionEquip.equip_state_id.equip_state_name }}</td>
					<td>{{ actionEquip.equip_depth_begin }}</td>
					<td>{{ actionEquip.equip_depth_end }}</td>
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
import VButton from '@/components/UI/v-button.vue';

export default {
    data() {
        return {
			selectedIdActionEquip: 0,
			dialogVisible: false,
            actionEquipList: [],
        };
    },
    methods: {
		getIdActionEquip(actionEquip){
			this.dialogVisible = true;
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
        this.loadActionEquipList();
    },
    components: {
		VButton,
		vDialog,
		ActionEquipDataForm,
		VButton
	}
}
</script>

<style scoped>

 * {
	margin: 0px;
	font-family: Arial, Helvetica, sans-serif;
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