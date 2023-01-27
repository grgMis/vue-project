<template>
	<div class="wellEquip">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Скважина</th>
						<th>Инвентарный номер оборудования</th>
						<th>Модель оборудования</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="wellEquip in wellEquipList" :key="wellEquip.well_equip_id">
						<td>{{ wellEquip.well_id.well_name }}</td>
						<td>{{ wellEquip.equip_id.inventory_number }}</td>
						<td>{{ wellEquip.equip_id.equip_model_id.equip_model_name }}</td>
					</tr>
				</tbody>
			</table>
			<select name="well"
				v-model="selectedWell" 
				@change="this.wellId=$event.target.options.selectedIndex">
					<option disabled value="">Номер скважины</option>
					<option v-for="well in wellList" :key="well.well_id">
						{{ well.well_name }}
					</option>
			</select>
			<select name="equip"
				v-model="selectedEquip" 
				@change="this.equipId=$event.target.options.selectedIndex">
					<option disabled value="">Наименование модели оборудования</option>
					<option v-for="equip in equipList" :key="equip.equip_id">
						{{ equip.equip_model_id.equip_model_sname }}
					</option>
			</select>
			<VButton type="button" class="btn__add" @click="addWellEquip">Добавить оборудование</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'WellForm',
	data() {
		return {
			selectedEquip: "",
			equipId: 0,
			equipList: [],
			selectedWell: "",
			wellId: 0,
			wellList: [],
			wellEquipList: [],
		};
	},
	methods: {
		async loadWellEquipList() {
			try {
				const response = await axios.get('http://localhost:8081/wellEquip/wellEquipAll');
				this.wellEquipList = response.data;
				console.log(this.wellEquipList);
			} catch(e) {
				console.log('Error');
			}
		},
		async loadEquipList() {
			try {
				const response = await axios.get('http://localhost:8081/equip/equipAll');
				this.equipList = response.data;
				console.log(this.equipList);
			} catch(e) {
				console.log('Error');
			}
		},
		async loadWellList() {
			try {
				const response = await axios.get('http://localhost:8081/well/wellAll');
				this.wellList = response.data;
				console.log(this.wellList);
			} catch(e) {
				console.log('Error');
			}
		},
		async addWellEquip() {
			try {
				const response = await axios.post(`http://localhost:8081/wellEquip?well_id=${this.wellId}&equip_id=${this.equipId}`);
				alert('Запись успешно сохранена');
				this.loadWellEquipList();
			} catch (e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
		this.loadWellEquipList();
		this.loadEquipList();
		this.loadWellList();
	},
	components: {
		VButton,
		vInput
	}
}
</script>

<style scoped>

* {
margin: 0px;
font-family: Arial, Helvetica, sans-serif;
}

th {
text-align: center;
border: 1px solid black;
padding: 5px;
margin: 5px;
}

td {
text-align: center;
border: 1px solid black;
padding: 5px;
margin: 5px;
font-size: 18px;
}

table {
padding: 5px;
margin-left: 5px;
max-width: auto;
}

select {
	width: auto;
	border: 1px solid black;
	padding: 10px 15px;
	margin-top: 15px;
	margin: 10px;
	font-weight: bold;
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

.form {
	margin-top: 50px;
}

.btn__add {
	margin-top: 20px;
	color: black;
	border: 1px solid black;
}


</style>