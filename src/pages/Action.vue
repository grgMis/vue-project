<template>
	<div class="action">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Скважина</th>
						<th>Подразделение</th>
						<th>Тип подразделения</th>
						<th>Дата начала действия</th>
						<th>Дата окончания действия</th>
						<th>Тип действия</th>
						<th>Группа действия</th>
						<th>Действие</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="action in actionList" :key="action.action_id">
						<td>{{ action.well_id.well_name }}</td>
						<td>{{ action.well_id.dept_id.dept_name }}</td>
						<td>{{ action.well_id.dept_id.dept_type_id.dept_type_name }}</td>
						<td>{{ action.action_date_begin }}</td>
						<td>{{ action.action_date_end }}</td>
						<td>{{ action.action_type_id.action_type_name }}</td>
						<td>{{ action.action_type_id.action_group_id.action_group_name }}</td>
						<td>
							<div class="td__btns">
								<VButton class="btns" @click="deleteActionEquip(actionEquip.action_equip_id)" v-b-tooltip.hover title="Удалить запись">✖</VButton>
								<VButton class="btns" @click="this.selectedIdActionEquip=getIdActionEquip(actionEquip)" v-b-tooltip.hover title="Редактирование">✎</VButton>
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
import axios from 'axios';

export default {
	name: 'Action',
	data() {
		return {
			actionList: [],
		};
	},
	methods: {
		async loadActionList() {
			try {
				const response = await axios.get("http://localhost:8081/action/actionAll");
				this.actionList = response.data;
				console.log(this.actionList);
			} catch (e) {
				console.log("Error");
			}
		},
	},
	mounted() {
		this.loadActionList();
	},
	components: {
    VButton
}
}
</script>

<style scoped>

* {
	margin: 0px;
	font-family: Arial, Helvetica, sans-serif;
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