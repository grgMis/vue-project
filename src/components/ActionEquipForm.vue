<template>
	<div class="action__equip__form">
		<form>
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
			<select name="equipState"
				v-model="selectedEquipState" 
				@change="this.equipStateId=$event.target.options.selectedIndex">
					<option disabled value="">Состояние</option>
					<option v-for="equipState in equipStateList" :key="equipState.equip_state_id">
						{{ equipState.equip_state_name }}
					</option>	
			</select>
			<vInput name="equipCount" placeholder="Количество оборудования"
				 @input="(dataActionEquip.equip_count = $event.target.value)">
			</vInput>
			<vInput name="equipDateEntry" type="date" placeholder="Дата"
				 @input="(dataActionEquip.equip_date_entry = $event.target.value)">
			</vInput>
			<vInput name="equipDepthBegin" placeholder="Начальная глубина"
				 @input="(dataActionEquip.equip_depth_begin = $event.target.value)">
			</vInput>
			<vInput name="equipDepthEnd" placeholder="Конечная глубина"
				 @input="(dataActionEquip.equip_depth_end = $event.target.value)">
			</vInput>
			<vInput name="equipNo" placeholder="Номер слота"
				 @input="(dataActionEquip.equip_no = $event.target.value)">
			</vInput>
			<vButton class="btn__add" @click="addActionEquip">Добавить запись</vButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios'
import vInput from '@/components/UI/v-input.vue'
import vButton from '@/components/UI/v-button.vue'


export default {
	name: 'ActionEquipForm',
	components: {
		vInput,
		vButton
	},
	data() {
		return {
			selectedActionOper: "",
			actionOperId: 0,
			selectedEquipClass: "",
			equipClassId: 0,
			selectedEquipModel: "",
			equipModelId: 0,
			selectedEquipNumber: "",
			equipId: 0,
			selectedEquipState: "",
			equipStateId: 0,
			actionOperList: [],
			equipClassList: [],
			equipModelList: [],
			equipList: [],
			equipStateList: [],
			dataActionEquip:
				{
					equip_count: 0,
					equip_date_entry: "",
					equip_depth_begin: 0,
					equip_depth_end: 0,
					equip_no: 0
				}
		}
	},
	methods: {
		async loadActionOperList() {
			try {
				const response = await axios.get('http://localhost:8081/actionOper/actionOperAll');
				this.actionOperList = response.data;
				console.log(this.actionOperList);
			} catch(e) {
				console.log('Error');
			}
		},
		async loadEquipClassList() {
			try {
				const response = await axios.get('http://localhost:8081/equipClass/equipClassAll');
				this.equipClassList = response.data;
				console.log(this.equipClassList);
			} catch(e) {
				console.log('Error');
			}
		},
		async loadEquipModelList() {
			try {
				const response = await axios.get('http://localhost:8081/equipModel/equipModelAll');
				this.equipModelList = response.data;
				console.log(this.equipModelList);
			} catch(e) {
				console.log('Error');
			}
		},
		async loadEquipList() {
			try {
				const response = await axios.get('http://localhost:8081/equip/equipAll');
				this.equipList = response.data;
				console.log(this.equipList);
			} catch(e) {
				console.log('Error');
			}
		},
		async loadEquipStateList() {
			try {
				const response = await axios.get('http://localhost:8081/equipState/equipStateAll');
				this.equipStateList = response.data;
				console.log(this.equipStateList);
			} catch(e) {
				console.log('Error');
			}
		},
		async addActionEquip() {
			try {
				const response = await axios.post('http://localhost:8081/actionEquip', this.dataActionEquip, {
					params: 
					{
						action_oper_id: this.actionOperId,
						equip_class_id: this.equipClassId,
						equip_model_id: this.equipModelId,
						equip_id: this.equipId,
						equip_state_id: this.equipStateId
					}
				});
				alert('Запись успешно сохранена');
			} catch(e) {
				alert('Заполните поля для добавления!');
				console.log('Error');
			}
		},
	},
	mounted() {
		this.loadEquipClassList();
		this.loadEquipModelList();
		this.loadEquipList();
		this.loadEquipStateList();
		this.loadActionOperList();
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
</style>