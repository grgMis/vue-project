<template>
	<input
		class="input" 
		:value="modelValue"
		@input="updateInput"
		type="text"
		>
</template>

<script>

export default {
	name: 'vInput',
	props: {
		modelValue: [String, Number]
	},
	methods: {
		updateInput(event) {
			this.$emit('update:modelValue', event.target.value);
		}
	}
}
</script>

<style scoped>
.input {
	width: 400px;
	border: 1px solid black;
	padding: 10px 15px;
	margin-top: 15px;
}
</style>