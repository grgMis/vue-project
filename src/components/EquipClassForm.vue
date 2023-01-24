<template>
	<div class="action__form">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Наименование класса оборудования</th>
						<th>Краткое наименование класса оборудования</th>
						<th>Наименование категории оборудования</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="equipClass in equipClassList" :key="equipClass.equip_class_id">
						<td>{{ equipClass.equip_class_name }}</td>
						<td>{{ equipClass.equip_class_sname }}</td>
						<td>{{ equipClass.equip_category_id.equip_category_name}}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="equipCategoryName" placeholder="Наименование класса оборудования"
				 @input="(dataEquipClass.equip_class_name = $event.target.value)">
			</vInput>
			<vInput name="equipCategorySname" placeholder="Краткое наименование класса оборудования"
				 @input="(dataEquipClass.equip_class_sname = $event.target.value)">
			</vInput>
			<select name="equipCategory"
				v-model="selectedEqupCategory" 
				@change="this.equipCategoryId=$event.target.options.selectedIndex">
					<option disabled value="">Наименование категории оборудования</option>
					<option v-for="equipCategory in equipCategoryList" :key="equipCategory.equip_category_id">
						{{ equipCategory.equip_category_name }}
					</option>
			</select>
			<VButton class="btn__add" @click="addEquipClass">Добавить класс оборудования</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'EquipClassForm',
	data() {
		return {
			selectedEqupCategory: "",
			equipCategoryId: 0,
			equipCategoryList: [],
			equipClassList: [],
			dataEquipClass:
			{
				equip_class_name: "",
				equip_class_sname: ""
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
		async loadEquipCategoryList() {
			try {
				const response = await axios.get('http://localhost:8081/equipCategory/equipCategoryAll');
				this.equipCategoryList = response.data;
				console.log(this.equipCategoryList);
			} catch(e) {
				console.log('Error');
			}
		},
		async addEquipClass() {
			try {
				const response = await axios.post('http://localhost:8081/equipClass', this.dataEquipClass, {
					params: 
					{
						equip_category_id: this.equipCategoryId
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
		this.loadEquipCategoryList();
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