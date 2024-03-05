<script lang="ts" setup>
import { useMyCardsStore } from '#imports'
const cardStore = useMyCardsStore()
const open = () => {
	cardStore.toggleBurger()
}
</script>

<template>
	<header class="header">
		<h1 class="header__title">Kanban board</h1>
		<TheButtonLogout class="header__btn-media" />
		<button class="header__btn-open" @click="open">
			<Icon name="ic:outline-menu" size="40px" color="#fff" />
		</button>
	</header>
</template>

<style></style>
