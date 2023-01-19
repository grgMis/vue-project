<template>
	<div class="table">
		<div class="table__header">
			<p>Нумерация оборудования</p>
			<p>Количество оборудования</p>
			<p>Дата внесения</p>
			<p>Начальная глубина</p>
			<p>Конечная глубина</p>
			<p>Номер оборудования</p>
			<p>Инвентарный номер</p>
		</div>
		<div class="table__body" v-for="actionEquip in actionEquipList" :key="actionEquip.action_equip_id">
			<p>{{ actionEquip.equip_no}}</p>
			<p>{{ actionEquip.equip_count}}</p>
			<p>{{ actionEquip.equip_date_entry}}</p>
			<p>{{ actionEquip.equip_depth_begin}}</p>
			<p>{{ actionEquip.equip_depth_end}}</p>
			<p>{{ actionEquip.equip_id.factory_number }}</p>
			<p>{{ actionEquip.equip_id.inventory_number }}</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios'; 

export default {
	data() {
		return {
			actionEquipList:[]
		}
	},
	methods: {
		async loadActionEquipList() {
			try {
				const response = await axios.get('http://localhost:8081/actionEquip/actionEquipAll');
				this.actionEquipList = response.data;
				console.log(this.actionEquipList);
			} catch(e) {
				console.log('Error');
			}
		}
	},
	mounted() {
		this.loadActionEquipList();
	}
}
</script>

<style>

 * {
	margin: 0px;
 }

 .table__header {
	display: flex;
	justify-content: space-around;
	border: 1px solid black;
 }

 .table {
	max-width: 1400px;
	margin: 0 auto;
	border: 1px solid black;
 }

 .table__body {
	display: flex;
	justify-content: space-around;
	border: 1px solid black;
 }

</style>