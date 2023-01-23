<template>
	<div class="action__group__form">
		<form class="form">
			<table cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Наименование группы события</th>
						<th>Краткое наименование группы события</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="actionGroup in actionGroupList" :key="actionGroup.action_group_id">
						<td>{{ actionGroup.action_group_name }}</td>
						<td>{{ actionGroup.action_group_sname }}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="actionEquipName" placeholder="Наименование типа события"
				 @input="(dataActionGroup.action_group_name = $event.target.value)">
			</vInput>
			<vInput name="actionEquipSname" placeholder="Краткое наименование группы события"
				 @input="(dataActionGroup.action_group_sname = $event.target.value)">
			</vInput>
			<VButton class="btn__add" @click="addActionGroup">Создать группу события</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'ActionGroupForm',
	data() {
		return {
			actionGroupList: [],
			dataActionGroup: 
			{
				action_group_name: "",
				action_group_sname: ""
			}
		};
	},
	methods: {
		async loadActionGroupList() {
			try {
				const response = await axios.get("http://localhost:8081/actionGroup/actionGroupAll");
				this.actionGroupList = response.data;
				console.log(this.actionGroupList);
			} catch (e) {
				console.log("Error");
			}
		},
		async addActionGroup() {
			try {
				const response = await axios.post('http://localhost:8081/actionGroup', this.dataActionGroup);
				alert('Запись успешно сохранена');
			} catch (e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
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