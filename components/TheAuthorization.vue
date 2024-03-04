<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useCreateUser } from '../composables/CreateUser'
const router = useRouter()

const store = useMyUserStore()
const cardsStore = useMyCardsStore()
const showForm = ref(false)
const user = ref({
	username: '',
	email: '',
	password: '',
})
const createUser = useCreateUser()

const errors = computed(() => cardsStore.getError)

onMounted(async () => {
	const token = localStorage.getItem('token')
	if (token) {
		store.createToken(token)
		await useMyCardsStore().getCards(token)
		router.push('/board')
	}
})
watch(
	() => store.getToken,
	(newToken) => {
		if (newToken !== '') {
			router.push('/board')
		}
	}
)
</script>
<template>
	<div class="container">
		<div class="form__wrapper">
			<TheErrors :error="errors" />
			<form
				class="auth__form form"
				@submit.prevent="createUser.createUser(user)"
				v-if="!showForm"
			>
				<input
					type="text"
					placeholder="Username"
					class="form__input"
					v-model="user.username"
				/>
				<input
					type="email"
					placeholder="Email"
					class="form__input"
					v-model="user.email"
				/>
				<input
					type="password"
					name=""
					id=""
					placeholder="Password"
					class="form__input"
					v-model="user.password"
				/>
				<button class="form__btn" type="submit">Отправить</button>

				<button @click.prevent="showForm = !showForm" class="form__btn">
					Уже есть аккаунт?
				</button>
			</form>

			<form
				class="auth__form form"
				@submit.prevent="store.setToken(user)"
				v-if="showForm"
			>
				<input
					type="text"
					placeholder="Username"
					class="form__input"
					v-model="user.username"
				/>
				<input
					type="password"
					name=""
					id=""
					placeholder="Password"
					class="form__input"
					v-model="user.password"
				/>
				<button class="form__btn" type="submit">Отправить</button>

				<button @click.prevent="showForm = !showForm" class="form__btn">
					Завести аккаунт
				</button>
			</form>
		</div>
	</div>
</template>
<style></style>
