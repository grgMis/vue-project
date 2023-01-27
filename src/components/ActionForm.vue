<template>
	<div class="action__form">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Дата начала события</th>
						<th>Дата окончания события</th>
						<th>Наименование типа события</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="action in actionList" :key="action.action_id">
						<td>{{ action.action_date_begin }}</td>
						<td>{{ action.action_date_end }}</td>
						<td>{{ action.action_type_id.action_type_name }}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="actionDateBegin" type="date" placeholder="Дата начала события"
				 @input="(dataAction.action_date_begin = $event.target.value)">
			</vInput>
			<vInput name="actionDateEnd" type="date" placeholder="Дата окончания события"
				 @input="(dataAction.action_date_end = $event.target.value)">
			</vInput>
			<select name="actionType"
				v-model="selectedActionType" 
				@change="this.actionTypeId=$event.target.options.selectedIndex">
					<option disabled value="">Наименование типа события</option>
					<option v-for="actionType in actionTypeList" :key="actionType.action_type_id">
						{{ actionType.action_type_name }}
					</option>
			</select>
			<VButton type="button" class="btn__add" @click="addAction">Создать событие</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'ActionForm',
	data() {
		return {
			selectedActionType: "",
			actionTypeId: 0,
			actionList: [],
			actionTypeList: [],
			dataAction: 
			{
				action_date_begin: "",
				action_date_end: ""
			}
		};
	},
	methods: {
		async loadActionList() {
			try {
				const response = await axios.get('http://localhost:8081/action/actionAll');
				this.actionList = response.data;
				console.log(this.actionList);
			} catch(e) {
				console.log('Error');
			}
		},
		async loadActionTypeList() {
			try {
				const response = await axios.get("http://localhost:8081/actionType/actionTypeAll");
				this.actionTypeList = response.data;
				console.log(this.actionTypeList);
			} catch (e) {
				console.log("Error");
			}
		},
		async addAction() {
			try {
				const response = await axios.post('http://localhost:8081/action', this.dataAction, {
					params: 
					{
						action_type_id: this.actionTypeId
					}
				});
				alert('Запись успешно сохранена');
				this.loadActionList();
			} catch (e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
		this.loadActionList();
		this.loadActionTypeList();
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