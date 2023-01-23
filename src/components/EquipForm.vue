<template>
	<div class="action__form">
		<form class="form">
			<table cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Заводской номер оборудования</th>
						<th>Инвентарный номер оборудования</th>
						<th>Наименование модели оборудования</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="equip in equipList" :key="equip.equip_id">
						<td>{{ equip.factory_number }}</td>
						<td>{{ equip.inventory_number }}</td>
						<td>{{ equip.equip_model_id.equip_model_name}}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="equipFactoryNumber" placeholder="Заводской номер оборудования"
				 @input="(dataEquip.factory_number = $event.target.value)">
			</vInput>
			<vInput name="equipIventoryNumber" placeholder="Инвентарный номер оборудования"
				 @input="(dataEquip.inventory_number = $event.target.value)">
			</vInput>
			<select name="equipModel"
				v-model="selectedEquipModel" 
				@change="this.equipModelId=$event.target.options.selectedIndex">
					<option disabled value="">Наименование модели оборудования</option>
					<option v-for="equipModel in equipModelList" :key="equipModel.equip_model_id">
						{{ equipModel.equip_model_name }}
					</option>
			</select>
			<VButton class="btn__add" @click="addEquip">Добавить оборудование</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'EquipForm',
	data() {
		return {
			selectedEquipModel: "",
			equipModelId: 0,
			equipModelList: [],
			equipList: [],
			dataEquip:
			{
				factory_number: "",
				inventory_number: ""
			}
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
		async loadEquipModelList() {
			try {
				const response = await axios.get('http://localhost:8081/equipModel/equipModelAll');
				this.equipModelList = response.data;
				console.log(this.equipModelList);
			} catch(e) {
				console.log('Error');
			}
		},
		async addEquip() {
			try {
				const response = await axios.post('http://localhost:8081/equip', this.dataEquip, {
					params: 
					{
						equip_model_id: this.equipModelId
					}
				});
				alert('Запись успешно сохранена');
			} catch (e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
		this.loadEquipList();
		this.loadEquipModelList();
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
	margin-top: 30px;
}

.btn__add {
	margin-top: 20px;
	color: black;
	border: 1px solid black;
}

</style>