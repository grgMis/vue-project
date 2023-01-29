<template>
	<div class="well__form">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Наименование скважины</th>
						<th>Наименование отдела</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="well in wellList" :key="well.well_id">
						<td>{{ well.well_name }}</td>
						<td>{{ well.dept_id.dept_name}}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="wellName" placeholder="Наименование скважины"
				 @input="(dataWell.well_name = $event.target.value)">
			</vInput>
			<select name="deptType"
				v-model="selectedDept" 
				@change="this.deptId=$event.target.options.selectedIndex">
					<option disabled value="">Тип отдела</option>
					<option v-for="dept in deptList" :key="dept.dept_id">
						{{ dept.dept_name }}
					</option>
			</select>
			<VButton type="button" class="btn__add" @click="addWell">Добавить скважину</VButton>
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
			selectedDept: "",
			deptId: 0,
			deptList: [],
			wellList: [],
			dataWell:
			{
				well_name: ""
			}
		};
	},
	methods: {
		async loadDeptList() {
			try {
				const response = await axios.get('http://localhost:8081/dept/deptAll');
				this.deptList = response.data;
				console.log(this.deptList);
			} catch(e) {
				console.log('Error');
			}
		},
		async loadWellList() {
			try {
				const response = await axios.get("http://localhost:8081/well/wellAll");
				this.wellList = response.data;
				console.log(this.wellList);
			} catch (e) {
				console.log("Error");
			}
		},
		async addWell() {
			try {
				const response = await axios.post('http://localhost:8081/well', this.dataWell, {
					params: 
					{
						dept_id: this.deptId,
					}
				});
				alert('Запись успешно сохранена');
				this.loadWellList();
			} catch (e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
		this.loadDeptList();
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

table {
padding: 5px;
margin-left: 150px;
max-width: auto;
}

select {
	width: 160px;
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