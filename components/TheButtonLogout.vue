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
	<button class="header__btn" @click.prevent="logout">
		<Icon name="ic:baseline-logout" size="30" />
		Выход
	</button>
</template>

<style></style>
