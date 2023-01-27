<template>
	<div class="action__group__form">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Наименование категории оборудования</th>
						<th>Краткое наименование категории оборудования</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="equipCategory in equipCategoryList" :key="equipCategory.equip_category_id">
						<td>{{ equipCategory.equip_category_name }}</td>
						<td>{{ equipCategory.equip_category_sname }}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="equipCategoryName" placeholder="Наименование категории оборудования"
				 @input="(dataEquipCategory.equip_category_name = $event.target.value)">
			</vInput>
			<vInput name="equipCategorySname" placeholder="Краткое наименование категории оборудования"
				 @input="(dataEquipCategory.equip_category_sname = $event.target.value)">
			</vInput>
			<VButton type="button" class="btn__add" @click="addEquipCategory">Добавить категорию оборудования</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'EquipCategoryForm',
	data() {
		return {
			equipCategoryList: [],
			dataEquipCategory: 
			{
				equip_category_name: "",
				equip_category_sname: ""
			}
		};
	},
	methods: {
		async loadEquipCategoryList() {
			try {
				const response = await axios.get("http://localhost:8081/equipCategory/equipCategoryAll");
				this.equipCategoryList = response.data;
				console.log(this.equipCategoryList);
			} catch (e) {
				console.log("Error");
			}
		},
		async addEquipCategory() {
			try {
				const response = await axios.post('http://localhost:8081/equipCategory', this.dataEquipCategory);
				alert('Запись успешно сохранена');
				this.loadEquipCategoryList();
			} catch (e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
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
font-size: 20px;
}

table {
padding: 5px;
max-width: auto;
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