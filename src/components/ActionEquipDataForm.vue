<template>
	<div class="action__equip__form">
		<form class="form">
			<select name="actionOper"
				v-model="selectedActionOper"
				@change="this.actionOperId=$event.target.options.selectedIndex">
					<option disabled value="">Дата операции</option>
					<option v-for="actionOper in actionOperList" :key="actionOper.action_oper_id">
						{{ actionOper.action_oper_date }}
					</option>
			</select>
			<select name="equipClass"
				v-model="selectedEquipClass"
				@change="this.equipClassId=$event.target.options.selectedIndex">
					<option disabled value="">Класс</option>
					<option v-for="equipClass in equipClassList" :key="equipClass.equip_class_id">
						{{ equipClass.equip_class_name }}
					</option>
			</select>
			<select name="equipModel" 
				v-model="selectedEquipModel" 
				@change="this.equipModelId=$event.target.options.selectedIndex">
					<option disabled value="">Модель</option>
					<option v-for="equipModel in equipModelList" :key="equipModel.equip_model_id">
						{{ equipModel.equip_model_name }}
					</option>
			</select>
			<select name="equipNumber"
				v-model="selectedEquipNumber" 
				@change="this.equipId=$event.target.options.selectedIndex">
					<option disabled value="">Инв. номер</option>
					<option v-for="equip in equipList" :key="equip.equip_id">
						{{ equip.inventory_number }}
					</option>
			</select>
			<div>
				<select name="equipState"
					v-model="selectedEquipState" 
					@change="this.equipStateId=$event.target.options.selectedIndex">
						<option disabled value="">Состояние</option>
						<option v-for="equipState in equipStateList" :key="equipState.equip_state_id">
							{{ equipState.equip_state_name }}
						</option>
				</select>
				<vButton class="btn__add" @click="updateEquipState(this.idActionEquip, this.equipStateId)" v-b-tooltip.hover title="Сохранить">✔</vButton>
			</div>
			<h4>Количество оборудования</h4>
			<vInput name="equipCount" placeholder="Количество оборудования"
				v-model="dataOneActionEquip.equip_count"
				@input="(dataActionEquip.equip_count = $event.target.value)">
			</vInput>
			<h4>Дата добавления</h4>
			<vInput name="equipDateEntry" type="date" placeholder="Дата"
				v-model="dataOneActionEquip.equip_date_entry"
				@input="(dataActionEquip.equip_date_entry = $event.target.value)">
			</vInput>
			<h4>Начальная глубина</h4>
			<vInput name="equipDepthBegin" placeholder="Начальная глубина"
				v-model="dataOneActionEquip.equip_depth_begin"
				@input="(dataActionEquip.equip_depth_begin = $event.target.value)">
			</vInput>
			<h4>Конечная глубина</h4>
			<vInput name="equipDepthEnd" placeholder="Конечная глубина"
				v-model="dataOneActionEquip.equip_depth_end"
				@input="(dataActionEquip.equip_depth_end = $event.target.value)">
			</vInput>
			<h4>Номер оборудования</h4>
			<vInput name="equipNo" placeholder="Номер слота"
				v-model="dataOneActionEquip.equip_no"
				@input="(dataActionEquip.equip_no = $event.target.value)">
			</vInput>
			<vButton class="btn__add" @click="updateActionEquip(this.idActionEquip)">Редактировать</vButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios'
import vSelect from '@/components/UI/v-select.vue'
import vInput from '@/components/UI/v-input.vue'
import vButton from '@/components/UI/v-button.vue'

export default {
	name: 'ActionEquipDataForm',
	components: {
		vSelect,
		vInput,
		vButton
	},
	props: {
		idActionEquip: {
			type: Number,
		}
	},
	data() {
		return {
			equipStateList: [],
			selectedEquipState: "",
			equipStateId: 0,
			actionEquipList: [],
			dataActionEquip:
			{
				equip_count: 0,
				equip_date_entry: "",
				equip_depth_begin: 0,
				equip_depth_end: 0,
				equip_no: 0
			},
			dataOneActionEquip: []
		}
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
		async getActionEquipData(idActionEquip) {
			try {
				const response = await axios.get('http://localhost:8081/actionEquip/'+idActionEquip);
				this.dataOneActionEquip = response.data;
				console.log(this.dataOneActionEquip);
			} catch(e) {
				console.log('Error');
			}
		},
		async updateActionEquip(idActionEquip) {
			try {
				const response = await axios.put('http://localhost:8081/actionEquip/'+idActionEquip, this.dataActionEquip);
				alert('Запись успешно изменена');
			} catch(e) {
				alert('Заполните поля для изменения!');
				console.log('Error');
			}
		},
		async updateEquipState(idActionEquip, idEquipState) {
			try {
				const response = await axios.put(`http://localhost:8081/actionEquip/updateActionEquip?action_equip_id=${idActionEquip}&equip_state_id=${idEquipState}`);
				alert('Запись успешно изменена');
			} catch(e) {
				console.log('Error');
				alert('Заполните поля для изменения!');
			}
		},
	},
	mounted() {
		this.getActionEquipData(this.idActionEquip);
		this.loadEquipStateList();
	}
}
</script>


<style scoped>
* {
	font-family: Arial, Helvetica, sans-serif
}

select {
	width: 160px;
	border: 1px solid black;
	padding: 10px 15px;
	margin-top: 15px;
	margin: 10px;
	font-weight: bold;
}

.btn__add {
	margin-top: 20px;
	color: black;
	border: 1px solid black;
}

.form {
	margin-top: 30px;
}

input {
	margin-top: 5px;
	margin-bottom: 20px;
}
</style>