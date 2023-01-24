<template>
	<div class="well">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Cкважина</th>
						<th>Номер подразделение</th>
						<th>Номер родительского подразделение</th>
						<th>Подразделение</th>
						<th>Тип подразделения</th>
						<th>Действие</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="well in wellList" :key="well.well_id">
						<td>{{ well.well_name }}</td>
						<td>{{ well.dept_id.dept_number }}</td>
						<td>{{ well.dept_id.dept_parent_id }}</td>
						<td>{{ well.dept_id.dept_name }}</td>
						<td>{{ well.dept_id.dept_type_id.dept_type_name }}</td>
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
	name: 'Well',
	data() {
		return {
			wellList: [],
		};
	},
	methods: {
		async loadWellList() {
			try {
				const response = await axios.get("http://localhost:8081/well/wellAll");
				this.wellList = response.data;
				console.log(this.wellList);
			} catch (e) {
				console.log("Error");
			}
		},
	},
	mounted() {
		this.loadWellList();
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