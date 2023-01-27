<template>
	<div class="dialog" v-if="show">
		<div class="dialog__content">
			<h4>Авторизация</h4>
			<AuthForm></AuthForm>
		</div>
	</div>
</template>

<script>
import AuthForm from '@/components/AuthForm.vue';
import VDialog from '@/components/UI/v-dialog.vue';

export default {
	components: {
		AuthForm,
		VDialog
	},
	data() {
		return {
			show: true
		}
	}
}
</script>

<style scoped>

* {
margin: 0px;
font-family: Arial, Helvetica, sans-serif;
}

h4 {
	font-size: 30px;
}

.form {
	width: 500px;
}

.dialog {
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	width: auto;
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	display: flex; 
}

.dialog__content {
	margin: auto;
	background: white;
	border-radius: 12px;
	width: 300px;
	height: 300px;
	padding: 20px;
	text-align: center;
}


</style>