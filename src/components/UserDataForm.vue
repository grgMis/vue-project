<template>
	<div class="well__form">
		<form class="form">
			<table class="table" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Логин</th>
						<th>Пользователь</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="userData in userDataList" :key="userData.user_data_id">
						<td>{{ userData.user_data_login }}</td>
						<td>{{ userData.user_data_password }}</td>
						<td>
						<div class="td__btns">
							<VButton class="btns" type="button" @click="deleteDataUser(userData.user_data_id)" v-b-tooltip.hover title="Удалить пользователя">✖</VButton>
						</div>
					</td>
					</tr>
				</tbody>
			</table>
			<vInput ref="userDataLogin" placeholder="Логин"
				 @input="(dataUser.user_data_login = $event.target.value)">
			</vInput>
			<vInput ref="userDataPassword" placeholder="Пароль"
				 @input="(dataUser.user_data_password = $event.target.value)">
			</vInput>
			<vInput ref="userDataSecondPassword" placeholder="Подтвердите пароль"
				@input="(this.secondPassword = $event.target.value)">
			</vInput>
			<VButton type="button" class="btn__add" @click="addDataUser">Добавить пользователя</VButton>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';

export default {
	name: 'UserDataForm',
	data() {
		return {
			userDataList: [],
			checkUser: [],
			secondPassword: "",
			dataUser: 
			{
				user_data_login: "",
				user_data_password: ""
			}
		};
	},
	methods: {
		async loadUserDataList() {
			try {
				const response = await axios.get('http://localhost:8081/userData/userDataAll');
				this.userDataList = response.data;
				console.log(this.userDataList);
			} catch(e) {
				console.log('Error');
			}
		},
		async addDataUser() {
			this.checkUser = this.userDataList.filter(p => p.user_data_login === this.dataUser.user_data_login);

			if (this.dataUser.user_data_login === "" ||
			this.dataUser.user_data_password === "" ||
			this.secondPassword === "" ) {
				alert("Заполните все поля!");

			} else if (this.checkUser.length === 1) {
				alert("Пользователь с таким логином уже существует!");

			} else if (this.secondPassword !== this.dataUser.user_data_password) {
				alert("Пароли не совпадают.");

			} else {
				const response = await axios.post('http://localhost:8081/userData', this.dataUser);
				alert('Запись успешно сохранена');
				this.loadUserDataList();
			}
		},
		async deleteDataUser(data_user_id) {
			 if (confirm("Удалить выбранную запись?")){
					alert("Запись успешно удалена");
					const response = await axios.delete("http://localhost:8081/userData/"+data_user_id);
					this.loadUserDataList();
				} else {
					alert("Удаление отменено");
					this.loadUserDataList();
				}
		},
	},
	mounted() {
		this.loadUserDataList();
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

table {
padding: 5px;
margin-left: 200px;
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