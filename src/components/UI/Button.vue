<template>
	<button class="btn">
		<slot></slot>
	</button>
</template>

<script>
export default {

}
</script>

<style scoped>

.btn {
	padding: 10px 15px;
	margin: 10px;
	background: none;
	color: gainsboro;
	border: 1px solid black;
	color: black;
}

</style>