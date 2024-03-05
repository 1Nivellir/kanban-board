import { useCreateToken } from '#imports'
import { defineStore } from 'pinia'
import type { User } from '~/types/types'

export const useMyUserStore = defineStore({
	id: 'myUserStore',
	state: () => ({
		token: null as string | null,
		refreshToken: null as string | null,
		errors: [] as string[],
	}),
	getters: {
		getToken: (state) => state.token,
		getError: (state) => state.errors,
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
		async setToken(user: User) {
			const token = await useCreateToken(user)
			if (token instanceof Error || typeof token === 'string') {
				if (typeof token === 'string') {
					this.errors = [token]
				}
				const refresh = localStorage.getItem('refreshToken')
				if (!refresh) return
				const newRequest = await useRefreshToken(refresh)
				this.token = newRequest
				localStorage.setItem('token', newRequest)
			} else {
				this.errors = []
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
