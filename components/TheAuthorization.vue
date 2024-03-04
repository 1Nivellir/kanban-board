<script lang="ts" setup>
import { useMyUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useCreateUser } from '../composables/CreateUser'
const router = useRouter()
const store = useMyUserStore()
const showForm = ref(false)
const user = ref({
	username: '',
	email: '',
	password: '',
})
const createUser = useCreateUser()

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
