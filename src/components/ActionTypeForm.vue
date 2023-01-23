<template>
	<div class="action__type__form">
		<form class="form">
			<table cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Наименование типа события</th>
						<th>Краткое наименование типа события</th>
						<th>Наименование группы события</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="actionType in actionTypeList" :key="actionType.action_type_id">
						<td>{{ actionType.action_type_name }}</td>
						<td>{{ actionType.action_type_sname }}</td>
						<td>{{ actionType.action_group_id.action_group_name }}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="actionTypeName" placeholder="Наименование типа события"
				 @input="(dataActionType.action_type_name = $event.target.value)">
			</vInput>
			<vInput name="actionTypeSname" placeholder="Краткое наименование типа события"
				 @input="(dataActionType.action_type_sname = $event.target.value)">
			</vInput>
			<select name="actionGroup"
				v-model="selectedActionGroup" 
				@change="this.actionGroupId=$event.target.options.selectedIndex">
					<option disabled value="">Группа события</option>
					<option v-for="actionGroup in actionGroupList" :key="actionGroup.action_group_id">
						{{ actionGroup.action_group_name }}
					</option>
			</select>
			<VButton class="btn__add" @click="addActionType">Создать тип события</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'ActionTypeForm',
	data() {
		return {
			selectedActionGroup: "",
			actionGroupId: 0,
			actionGroupList: [],
			actionTypeList: [],
			dataActionType: 
			{
				action_group_name: "",
				action_group_sname: ""
			}
		};
	},
	methods: {
		async loadActionGroupList() {
			try {
				const response = await axios.get('http://localhost:8081/actionGroup/actionGroupAll');
				this.actionGroupList = response.data;
				console.log(this.actionGroupList);
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
		async addActionType() {
			try {
				const response = await axios.post('http://localhost:8081/actionType', this.dataActionType, {
					params: 
					{
						action_group_id: this.actionGroupId,
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
		this.loadActionTypeList();
		this.loadActionGroupList();
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