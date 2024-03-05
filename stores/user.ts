import { useCreateToken } from '#imports'
import { defineStore } from 'pinia'
export const useMyUserStore = defineStore({
	id: 'myUserStore',
	state: () => ({
		token: null as string | null,
		refreshToken: null as string | null,
	}),
	getters: {
		getToken: (state) => state.token,
	},
	actions: {
		createToken(token: string) {
			this.token = token
		},
		async refresh(refresh: string) {
			if (!refresh) return
			const newRequest = await useRefreshToken(refresh)
			this.token = newRequest
			localStorage.setItem('token', newRequest)
		},
		async setToken(user: any) {
			const token = await useCreateToken(user)
			console.log(token)
			if (token instanceof Error) {
				const refresh = localStorage.getItem('refreshToken')
				if (!refresh) return
				const newRequest = await useRefreshToken(refresh)
				this.token = newRequest
				localStorage.setItem('token', newRequest)
			} else {
				this.token = token.access
				this.refreshToken = token.refresh
				localStorage.setItem('refreshToken', token.refresh)
				localStorage.setItem('token', token.access)
			}
		},
		logout() {
			this.token = null
			localStorage.removeItem('token')
			localStorage.removeItem('refreshToken')
		},
	},
})
