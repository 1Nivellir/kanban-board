import { useCreateToken } from '#imports'
import { defineStore } from 'pinia'
export const useMyUserStore = defineStore({
	id: 'myUserStore',
	state: () => ({ token: null as string | null }),
	getters: {
		getToken: (state) => state.token,
	},
	actions: {
		createToken(token: string) {
			this.token = token
		},
		async setToken(user: any) {
			const token = await useCreateToken(user)
			if (token instanceof Error) return
			this.token = token
			localStorage.setItem('token', token)
		},
		logout() {
			this.token = null
			localStorage.removeItem('token')
		},
	},
})
