<template>
	<div class="action__oper__type__form">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Наименование типа действия операции</th>
						<th>Краткое наименование типа действия операции</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="actionOperType in actionOperTypeList" :key="actionOperType.action_oper_type_id">
						<td>{{ actionOperType.action_oper_type_name }}</td>
						<td>{{ actionOperType.action_oper_type_sname }}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="actionOperTypeName" placeholder="Наименование типа действия операции"
				 @input="(dataActionOperTypeList.action_oper_type_name = $event.target.value)">
			</vInput>
			<vInput name="actionOperTypeSname" placeholder="Краткое наименование типа действия операции"
				 @input="(dataActionOperTypeList.action_oper_type_sname = $event.target.value)">
			</vInput>
			<VButton class="btn__add" @click="addActionOperType">Создать тип действия операции</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'ActionOperTypeForm',
	data() {
		return {
			actionOperTypeList: [],
			dataActionOperTypeList:
			{
				action_oper_type_name: "",
				action_oper_type_sname: ""
			}
		};
	},
	methods: {
		async loadActionOperTypeList() {
			try {
				const response = await axios.get("http://localhost:8081/actionOperType/actionOperTypeAll");
				this.actionOperTypeList = response.data;
				console.log(this.actionOperTypeList);
			} catch (e) {
				console.log("Error");
			}
		},
		async addActionOperType() {
			try {
				const response = await axios.post('http://localhost:8081/actionOperType', this.dataActionOperTypeList);
				alert('Запись успешно сохранена');
			} catch (e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
		this.loadActionOperTypeList();
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
	margin-left: 10px;
}

</style>