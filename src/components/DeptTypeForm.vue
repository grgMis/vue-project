<template>
	<div class="dept__type__form">
		<form class="form">
			<table cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Наименование типа отдела</th>
						<th>Краткое наименование типа отдела</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="deptType in deptTypeList" :key="deptType.action_dept_id">
						<td>{{ deptType.dept_type_name }}</td>
						<td>{{ deptType.dept_type_sname }}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="deptTypeName" placeholder="Наименование типа отдела"
				 @input="(dataDeptType.dept_type_name = $event.target.value)">
			</vInput>
			<vInput name="deptTypeSname" placeholder="Краткое наименование типа отдела"
				 @input="(dataDeptType.dept_type_sname = $event.target.value)">
			</vInput>
			<VButton class="btn__add" @click="addDeptType">Создать тип отдел</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'DeptTypeForm',
	data() {
		return {
			deptTypeList: [],
			dataDeptType: 
			{
				action_dept_name: "",
				action_dept_sname: ""
			}
		};
	},
	methods: {
		async loadDeptTypeList() {
			try {
				const response = await axios.get("http://localhost:8081/deptType/deptTypeAll");
				this.deptTypeList = response.data;
				console.log(this.deptTypeList);
			} catch (e) {
				console.log("Error");
			}
		},
		async addDeptType() {
			try {
				const response = await axios.post('http://localhost:8081/deptType', this.dataDeptType);
				alert('Запись успешно сохранена');
			} catch (e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
		this.loadDeptTypeList();
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
margin-left: 30px;
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
	margin-left: 10px;
}

</style>