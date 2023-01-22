<template>
	<button class="btn">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'vButton',
}
</script>

<style scoped>

.btn {
	padding: 10px 15px;
	margin: 10px;
	background: none;
	color: gainsboro;
	border: 1px solid white;
	color: white;
}

</style>