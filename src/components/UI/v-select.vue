<template>
	<select class="select" v-model="modelValue">
		<option disabled value="">Выберите из списка</option>
		<option 
			v-for="option in options"
			:value="option.value"
			:key="option.value">
			{{ option.name }}
		</option>
	</select>
</template>

<script>
export default {
	name: 'vSelect',
	prop: {
		modelValue: {
			type: String
		}
	},
	props: {
		options: {
			type: Array,
			default: () => []
		}
	},
	method: {
	}
}
</script>

<style scoped>
.select {
	width: 200px;
	border: 1px solid black;
	padding: 10px 15px;
	margin-top: 15px;
	margin: 10px;
}

* {
	font-family: Arial, Helvetica, sans-serif
}
</style>