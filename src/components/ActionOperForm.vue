<template>
	<div class="action__form">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Дата действия операции</th>
						<th>Дата окончания операции</th>
						<th>Наименование операции</th>
						<th>Наименование типа действия операции</th>
						<th>Наименование типа подвески</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="actionOper in actionOperList" :key="actionOper.action_oper_id">
						<td>{{ actionOper.action_oper_date }}</td>
						<td>{{ actionOper.action_id.action_date_end }}</td>
						<td>{{ actionOper.action_id.action_type_id.action_type_name}}</td>
						<td>{{ actionOper.action_oper_type_id.action_oper_type_name }}</td>
						<td>{{ actionOper.hanger_type_id.hanger_type_name}}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="actionOperDate" type="date" placeholder="Дата действия операции"
				 @input="(dataActionOper.action_oper_date = $event.target.value)">
			</vInput>
			<select name="action"
				v-model="selectedAction" 
				@change="this.actionId=$event.target.options.selectedIndex">
					<option disabled value="">Наименование операции</option>
					<option v-for="action in actionList" :key="action.action_id">
						{{ action.action_type_id.action_type_name }}
					</option>
			</select>
			<select name="actionOperType"
				v-model="selectedActionOperType" 
				@change="this.actionOperTypeId=$event.target.options.selectedIndex">
					<option disabled value="">Наименование группы операции</option>
					<option v-for="actionOperType in actionOperTypeList" :key="actionOperType.action_oper_type_id">
						{{ actionOperType.action_oper_type_name }}
					</option>
			</select>
			<select name="hangerType"
				v-model="selectedHangerType" 
				@change="this.hangerTypeId=$event.target.options.selectedIndex">
					<option disabled value="">Наименование типа подвески</option>
					<option v-for="hangerType in hangerTypeList" :key="hangerType.hanger_type_id">
						{{ hangerType.hanger_type_name }}
					</option>
			</select>
			<VButton type="button" class="btn__add" @click="addActionOperList">Создать действие операции</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'ActionOperForm',
	data() {
		return {
			selectedAction: "",
			actionId: 0,
			selectedActionOperType: "",
			actionOperTypeId: 0,
			selectedHangerType: "",
			hangerTypeId: 0,
			actionList: [],
			actionOperTypeList: [],
			hangerTypeList: [],
			actionOperList: [],
			dataActionOper:
			{
				action_oper_date: "",
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
		async loadActionOperTypeList() {
			try {
				const response = await axios.get('http://localhost:8081/actionOperType/actionOperTypeAll');
				this.actionOperTypeList = response.data;
				console.log(this.actionOperTypeList);
			} catch(e) {
				console.log('Error');
			}
		},
		async loadHangerTypeList() {
			try {
				const response = await axios.get("http://localhost:8081/hangerType/hangerTypeAll");
				this.hangerTypeList = response.data;
				console.log(this.hangerTypeList);
			} catch (e) {
				console.log("Error");
			}
		},
		async loadActionOperList() {
			try {
				const response = await axios.get("http://localhost:8081/actionOper/actionOperAll");
				this.actionOperList = response.data;
				console.log(this.actionOperList);
			} catch (e) {
				console.log("Error");
			}
		},
		async addActionOperList() {
			try {
				const response = await axios.post('http://localhost:8081/actionOper', this.dataActionOper, {
					params: 
					{
						action_id: this.actionId,
						action_oper_type_id: this.actionOperTypeId,
						hanger_type_id: this.hangerTypeId,
					}
				});
				alert('Запись успешно сохранена');
				this.loadActionOperList();
			} catch (e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
		this.loadActionList();
		this.loadHangerTypeList();
		this.loadActionOperTypeList();
		this.loadActionOperList();
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