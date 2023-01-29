<template>
<div class="action__form">
	<form class="form">
		<select name="equipState"
			v-model="selectedEquipState" 
			@change="this.equipStateId=$event.target.options.selectedIndex">
				<option disabled value="">Состояние</option>
				<option v-for="equipState in equipStateList" :key="equipState.equip_state_id">
					{{ equipState.equip_state_name}}
				</option>
		</select>
		<VButton class="btn__add" type="button" @click="updateEquipState(this.idEquip, this.equipStateId)" v-b-tooltip.hover title="Редактировать">Редактировать</VButton>
	</form>
</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import VInput from './UI/v-input.vue';

export default {
	components: {
    VInput,
    VButton
},
    name: "EquipDataForm",
    props: {
        idEquip: {
            type: Number,
        }
    },
    data() {
        return {
            selectedEquipState: "",
            equipStateId: 0,
            equipStateList: [],
        };
    },
    methods: {
        async loadEquipStateList() {
			try {
				const response = await axios.get('http://localhost:8081/equipState/equipStateAll');
				this.equipStateList = response.data;
				console.log(this.equipStateList);
			} catch(e) {
				console.log('Error');
			}
		},
        async updateEquipState(idEquip, equipStateId) {
            try {
                const response = await axios.put(`http://localhost:8081/equip/updateEquip?equip_id=${idEquip}&equip_state_id=${equipStateId}`);
                alert("Запись успешно изменена");
            }
            catch (e) {
                console.log("Error");
                alert("Заполните поля для изменения!");
            }
        },
	},
	mounted() {
		this.loadEquipStateList();
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