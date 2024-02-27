import { defineStore } from 'pinia'

export const useMyUserStore = defineStore({
	id: 'myUserStore',
	state: () => ({ user: null, token: null }),
	getters: {
		getUser: (state) => state.user,
		getToken: (state) => state.token,
	},
	actions: {
		setUser(user: any) {
			this.user = user
		},
		setToken(token: any) {
			this.token = token
		},
	},
})
