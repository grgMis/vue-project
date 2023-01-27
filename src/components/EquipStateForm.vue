<template>
	<div class="action__group__form">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Наименование состояния оборудования</th>
						<th>Краткое наименование состояния оборудования</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="equipState in equipStateList" :key="equipState.equip_state_id">
						<td>{{ equipState.equip_state_name }}</td>
						<td>{{ equipState.equip_state_sname }}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="equipStateName" placeholder="Наименование состояния оборудования"
				 @input="(dataEquipState.equip_state_name = $event.target.value)">
			</vInput>
			<vInput name="equipStateSname" placeholder="Краткое наименование состояния оборудования"
				 @input="(dataEquipState.equip_state_sname = $event.target.value)">
			</vInput>
			<VButton type="button" class="btn__add" @click="addEquipState">Добавить состояние оборудования</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'EquipStateForm',
	data() {
		return {
			equipStateList: [],
			dataEquipState: 
			{
				equip_state_name: "",
				equip_state_sname: ""
			}
		};
	},
	methods: {
		async loadEquipStateList() {
			try {
				const response = await axios.get("http://localhost:8081/equipState/equipStateAll");
				this.equipStateList = response.data;
				console.log(this.equipStateList);
			} catch (e) {
				console.log("Error");
			}
		},
		async addEquipState() {
			try {
				const response = await axios.post('http://localhost:8081/equipState', this.dataEquipState);
				alert('Запись успешно сохранена');
				this.loadEquipStateList();
			} catch (e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
		this.loadEquipStateList();
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