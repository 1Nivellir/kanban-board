<script lang="ts" setup>
import { useMyUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useCreateToken } from '../composables/CreateToken'
import { useCreateUser } from '../composables/CreateUser'
const router = useRouter()
const store = useMyUserStore()
const showForm = ref(false)
const user = ref({
	username: '',
	email: '',
	password: '',
})
const useCreate = useCreateToken()
const createUser = useCreateUser()

onMounted(() => {
	const token = localStorage.getItem('authToken')
	if (!token) {
		router.push('/')
	} else {
		store.setToken(token)
		router.push('/board')
	}
	watch(
		() => useCreate.value.token,
		(newToken) => {
			if (newToken !== '') {
				router.push('/board')
				store.setToken(newToken)
				localStorage.setItem('authToken', newToken)
			}
		}
	)
})
</script>
<template>
	<div class="container">
		<div class="form__wrapper">
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
				@submit.prevent="useCreate.createToken(user)"
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
