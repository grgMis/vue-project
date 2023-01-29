<template>
	<router-view></router-view>
	<div class="auth__form">
		<form class="form">
			<vInput class="input" name="userDataLogin" placeholder="Логин"
				 @input="(this.login = $event.target.value)">
			</vInput>
			<vInput class="input secondInput" id="passwordInput" 
					name="userDataPassword" 
					type="text" placeholder="Пароль"
				 	@input="(this.password = $event.target.value)">
			</vInput>
			<VButton type="button" class="btn" @click="authUser($router)">Авторизоваться</VButton>
		</form>
	</div>
</template>

<script>
import router from '@/router/router';
import axios from 'axios';
import VButton from './UI/v-button.vue';
import vInput from './UI/v-input.vue';


export default {
	name: 'AuthForm',
	data() {
		return {
			userDataList: [],
			checkUser: [],
			login: "",
			password: ""
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
		authUser(router) {
			this.checkUser = this.userDataList.filter(p => p.user_data_login === this.login && p.user_data_password === this.password);
			console.log(this.checkUser);
			console.log(this.password);
			
			if (this.login === "" || this.password === "") {
				alert('Заполните все поля!');
			} else if (this.checkUser.length === 1) {
				if (this.login === 'admin') {
					router.push('/mainAdmin');
				} else {
					router.push('/mainOperator');
				}
			} else {
				alert('Пользователь не найден!')
			}
		}
	},
	mounted() {
		this.loadUserDataList();
	},
	components: {
		VButton,
		vInput,
	}
}
</script>

<style scoped>

* {
margin: 0px;
font-family: Arial, Helvetica, sans-serif;
}

.input {
	width: 150px;
	margin: 15px;
}

.form {
	margin-top: 30px;
	text-align: center;
	display: fixed;
	justify-content: space-between;
}

.btn {
	margin-top: 40px;
	color: black;
	border: 1px solid black;
}

.secondInput {
	margin-bottom: 20px;
}

</style>