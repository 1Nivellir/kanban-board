import { useCreateToken } from '#imports'
import { defineStore } from 'pinia'
export const useMyUserStore = defineStore({
	id: 'myUserStore',
	state: () => ({ user: null, token: null as string | null }),
	getters: {
		getUser: (state) => state.user,
		getToken: (state) => state.token,
	},
	actions: {
		setUser(user: any) {
			this.user = user
		},
		async setToken(user: any) {
			const token = await useCreateToken(user)
			if (token instanceof Error) return
			this.token = token
		},
		logout() {
			this.user = null
			this.token = null
		},
	},
})
