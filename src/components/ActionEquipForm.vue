<template>
	<div class="action__equip__form">
		<form class="form">
			<select name="actionOper"
				v-model="selectedActionOper"
				@change="this.actionOperId=$event.target.options.selectedIndex">
					<option disabled value="">Действие</option>
					<option v-for="actionOper in actionOperList" :key="actionOper.action_oper_id">
						{{ actionOper.action_id.action_type_id.action_type_name }}
					</option>
			</select>
			<select name="wellEquip"
				v-model="selectedWellEquip" 
				@change="this.wellEquipId=$event.target.options.selectedIndex">
					<option disabled value="">Оборудование</option>
					<option v-for="wellEquip in wellEquipList" :key="wellEquip.well_equip_id">
						{{ wellEquip.equip_id.equip_model_id.equip_model_name }}
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
			selectedWellEquip: "",
			wellEquipId: 0,
			actionOperList: [],
			wellEquipList: [],
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
		async loadWellEquipList() {
			try {
				const response = await axios.get('http://localhost:8081/wellEquip/wellEquipAll');
				this.wellEquipList = response.data;
				console.log(this.wellEquipList);
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
						well_equip_id: this.wellEquipId,
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
		this.loadWellEquipList();
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
	margin-right: 30px;
	margin: 10px;
	font-weight: bold;
}

.btn__add {
	margin-top: 20px;
	margin-left: 30px;
	color: black;
	border: 1px solid black;
}

.form {
	margin-top: 40px;
}
</style>