<template>
	<div class="navbar">
		<div>Main Page</div>
		<div class="navbar__btns">
			<Button>Btn1</Button>
			<Button>Btn1</Button>
		</div>
	</div>
</template>

<script>
import Button from './Button.vue';

export default {
    components: {
		Button
	}
}
</script>

<style scoped>

.navbar {
	height: 50px;
	background-color: gainsboro;
	box-shadow: 2px 2px 4px black;
	display: flex;
	align-items: center;
	padding: 0px 15px;
}

.navbar__btns {
	margin-left: auto;
}
</style>