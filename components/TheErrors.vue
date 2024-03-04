<script lang="ts" setup>
const props = defineProps({
	error: {
		type: Array,
		default: null,
	},
})

const itemError = toRefs(props).error as any
</script>

<template>
	<div class="errors">
		<ul class="errors__list">
			<li class="errors__item" v-for="(error, index) in itemError" :key="index">
				{{ error }}
			</li>
		</ul>
	</div>
</template>

<style></style>
