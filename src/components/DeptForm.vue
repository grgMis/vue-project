<template>
	<div class="dept__type__form">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Наименование отдела</th>
						<th>Краткое наименование отдела</th>
						<th>Номер отдела</th>
						<th>Номер основного отдела</th>
						<th>Наименование группы отдела</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="dept in deptList" :key="dept.dept_id">
						<td>{{ dept.dept_name }}</td>
						<td>{{ dept.dept_sname }}</td>
						<td>{{ dept.dept_number }}</td>
						<td>{{ dept.dept_parent_id }}</td>
						<td>{{ dept.dept_type_id.dept_type_name}}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="deptName" placeholder="Наименование отдела"
				 @input="(dataDept.dept_name = $event.target.value)">
			</vInput>
			<vInput name="deptSname" placeholder="Краткое наименование отдела"
				 @input="(dataDept.dept_sname = $event.target.value)">
			</vInput>
			<vInput name="deptNumber" placeholder="Номер отдела"
				 @input="(dataDept.dept_number = $event.target.value)">
			</vInput>
			<vInput name="deptParentId" placeholder="Номер основного отдела"
				 @input="(dataDept.dept_parent_id = $event.target.value)">
			</vInput>
			<select name="deptType"
				v-model="selectedDeptType" 
				@change="this.deptTypeId=$event.target.options.selectedIndex">
					<option disabled value="">Тип отдела</option>
					<option v-for="deptType in deptTypeList" :key="deptType.dept_type_id">
						{{ deptType.dept_type_name }}
					</option>
			</select>
			<VButton type="button" class="btn__add" @click="addDept">Создать отдел</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'DeptForm',
	data() {
		return {
			selectedDeptType: "",
			deptTypeId: 0,
			deptTypeList: [],
			deptList: [],
			dataDept: 
			{
				dept_name: "",
				dept_sname: "",
				dept_number: 0,
				dept_parent_id: 0
			}
		};
	},
	methods: {
		async loadDeptTypeList() {
			try {
				const response = await axios.get('http://localhost:8081/deptType/deptTypeAll');
				this.deptTypeList = response.data;
				console.log(this.deptTypeList);
			} catch(e) {
				console.log('Error');
			}
		},
		async loadDeptList() {
			try {
				const response = await axios.get("http://localhost:8081/dept/deptAll");
				this.deptList = response.data;
				console.log(this.deptList);
			} catch (e) {
				console.log("Error");
			}
		},
		async addDept() {
			try {
				const response = await axios.post('http://localhost:8081/dept', this.dataDept, {
					params: 
					{
						dept_type_id: this.deptTypeId,
					}
				});
				alert('Запись успешно сохранена');
				this.loadDeptList();
			} catch (e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
		this.loadDeptTypeList();
		this.loadDeptList();
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
font-size: 15px;
}

td {
text-align: center;
border: 1px solid black;
padding: 5px;
margin: 5px;
font-size: 15px;
}

table {
padding: 5px;
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