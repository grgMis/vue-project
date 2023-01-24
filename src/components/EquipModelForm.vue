<template>
	<div class="action__form">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Наименование модели оборудования</th>
						<th>Краткое наименование модели оборудования</th>
						<th>Наименование класса оборудования</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="equipModel in equipModelList" :key="equipModel.equip_model_id">
						<td>{{ equipModel.equip_model_name }}</td>
						<td>{{ equipModel.equip_model_sname }}</td>
						<td>{{ equipModel.equip_class_id.equip_class_name}}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="equipModelName" placeholder="Наименование модели оборудования"
				 @input="(dataEquipModel.equip_model_name = $event.target.value)">
			</vInput>
			<vInput name="equipModelSname" placeholder="Краткое наименование модели оборудования"
				 @input="(dataEquipModel.equip_model_sname = $event.target.value)">
			</vInput>
			<select name="equipClass"
				v-model="selectedEqupClass" 
				@change="this.equipClassId=$event.target.options.selectedIndex">
					<option disabled value="">Наименование класса оборудования</option>
					<option v-for="equipClass in equipClassList" :key="equipClass.equip_class_id">
						{{ equipClass.equip_class_name }}
					</option>
			</select>
			<VButton class="btn__add" @click="addEquipModel">Добавить модель оборудования</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'EquipModelForm',
	data() {
		return {
			selectedEqupClass: "",
			equipClassId: 0,
			equipClassList: [],
			equipModelList: [],
			dataEquipModel:
			{
				equip_model_name: "",
				equip_model_sname: ""
			}
		};
	},
	methods: {
		async loadEquipClassList() {
			try {
				const response = await axios.get('http://localhost:8081/equipClass/equipClassAll');
				this.equipClassList = response.data;
				console.log(this.equipClassList);
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
		async addEquipModel() {
			try {
				const response = await axios.post('http://localhost:8081/equipModel', this.dataEquipModel, {
					params: 
					{
						equip_class_id: this.equipClassId
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
		this.loadEquipClassList();
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
	margin-top: 30px;
}

.btn__add {
	margin-top: 20px;
	color: black;
	border: 1px solid black;
}

</style>