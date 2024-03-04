<script lang="ts" setup>
import { useRouter } from 'vue-router'
const $router = useRouter()
const logout = () => {
	useMyUserStore().logout()
	useMyCardsStore().logout()
	$router.push('/')
}
</script>

<template>
	<header class="header">
		<h1 class="header__title">Kanban board</h1>
		<button class="header__btn" @click.prevent="logout">
			<Icon name="ic:baseline-logout" size="30" />
		</button>
	</header>
</template>

<style></style>
