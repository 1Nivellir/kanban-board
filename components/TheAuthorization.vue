<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { CreateUser, User } from '~/types/types'
import { useCreateUser } from '../composables/CreateUser'
const router = useRouter()

const store = useMyUserStore()
const cardsStore = useMyCardsStore()
const showForm = ref(false)
const user = ref<User>({
	username: '',
	email: '',
	password: '',
})

const showFormHandler = () => {
	showForm.value = !showForm.value
	user.value.username = ''
	user.value.password = ''
	user.value.email = ''
}
const showCreateMessage = ref(false)
const showErrorMessage = ref(false)
const newUser = ref<CreateUser>({
	username: '',
	email: '',
})
const error = ref('')
const createUser = async (user: User) => {
	const store = await useCreateUser(user)
	if (store instanceof Error) {
		error.value = store.message
		showErrorMessage.value = true
	} else {
		showCreateMessage.value = true
		newUser.value = store
		user.username = ''
		user.password = ''
		user.email = ''
	}
}
const errors = computed(() => store.getError)

onMounted(async () => {
	const token = localStorage.getItem('token')
	if (token) {
		store.createToken(token)
		await cardsStore.getCards(token)
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
				@submit.prevent="createUser(user)"
				v-if="!showForm"
			>
				<p class="form__request" v-if="showCreateMessage">
					Пользователь: {{ newUser.username }} успешно зарегистрирован
				</p>
				<p class="form__request" v-if="showErrorMessage">
					Произошла ошибка: {{ error }}
				</p>
				<h2 class="form__title">Регистрация</h2>
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

				<button @click.prevent="showFormHandler" class="form__btn">
					Уже есть аккаунт?
				</button>
			</form>

			<form
				class="auth__form form"
				@submit.prevent="store.setToken(user)"
				v-if="showForm"
			>
				<h2 class="form__title">Авторизация</h2>
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

				<button @click.prevent="showFormHandler" class="form__btn">
					Завести аккаунт
				</button>
			</form>
		</div>
	</div>
</template>
<style></style>
