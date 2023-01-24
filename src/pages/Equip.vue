<template>
	<div class="equip">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Инвентарный номер</th>
						<th>Заводской номер</th>
						<th>Модель</th>
						<th>Класс</th>
						<th>Категория</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="equip in equipList" :key="equip.equip_id">
						<td>{{ equip.inventory_number }}</td>
						<td>{{ equip.factory_number }}</td>
						<td>{{ equip.equip_model_id.equip_model_name}}</td>
						<td>{{ equip.equip_model_id.equip_class_id.equip_class_name }}</td>
						<td>{{ equip.equip_model_id.equip_class_id.equip_category_id.equip_category_name }}</td>
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
	name: 'Equip',
	data() {
		return {
			equipList: [],
		};
	},
	methods: {
		async loadEquipList() {
			try {
				const response = await axios.get('http://localhost:8081/equip/equipAll');
				this.equipList = response.data;
				console.log(this.equipList);
			} catch(e) {
				console.log('Error');
			}
		},
	},
	mounted() {
		this.loadEquipList();
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