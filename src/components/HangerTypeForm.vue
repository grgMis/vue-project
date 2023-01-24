<template>
	<div class="action__group__form">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Наименование типа подвески</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="hangerType in hangerTypeList" :key="hangerType.hanger_type_id">
						<td>{{ hangerType.hanger_type_name }}</td>
					</tr>
				</tbody>
			</table>
			<vInput name="hangerTypeName" placeholder="Наименование типа подвески"
				 @input="(dataHangerType.hanger_type_name = $event.target.value)">
			</vInput>
			<VButton class="btn__add" @click="addHangerType">Создать тип подвески</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'HangerTypeForm',
	data() {
		return {
			hangerTypeList: [],
			dataHangerType: 
			{
				hanger_type_name: ""
			}
		};
	},
	methods: {
		async loadHangerType() {
			try {
				const response = await axios.get("http://localhost:8081/hangerType/hangerTypeAll");
				this.hangerTypeList = response.data;
				console.log(this.hangerTypeList);
			} catch (e) {
				console.log("Error");
			}
		},
		async addHangerType() {
			try {
				const response = await axios.post('http://localhost:8081/hangerType', this.dataHangerType);
				alert('Запись успешно сохранена');
			} catch (e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
		this.loadHangerType();
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
margin-left: 170px;
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