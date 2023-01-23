<template>
	<div class="dialog" v-if="show">
		<div class="dialog__content">
			<VButton class="btn" 
			v-b-tooltip.hover title="Закрыть окно" 
			@click="hideDialog">X</VButton>
			<slot></slot>
		</div>
	</div>
</template>

<script>
import VButton from './v-button.vue';

export default {
    name: "vDialog",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit("update:show", false);
        }
    },
    components: { VButton }
}
</script>

<style scoped>
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
	width: 600px;
	padding: 20px;
	text-align: center;
}

.btn {
	position: absolute;
	margin-left: 250px;
	margin-top: -5px;
	color: black;
	border: 1px solid black;
}

</style>