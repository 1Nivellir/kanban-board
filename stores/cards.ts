import { useDeleteCard } from '#imports'
import { defineStore } from 'pinia'
import { useCreateCard } from '~/composables/CreateCard'
import { useGetCards } from '~/composables/GetCards'
import type { Card, CreateCard } from '~/types/types'

export const useMyCardsStore = defineStore({
	id: 'myCardsStore',
	state: () => ({
		cards: [] as Card[],
		errors: [] as string[],
	}),
	getters: {
		getError: (state) => state.errors,
	},
	actions: {
		async getCards(token: string) {
			const cards = await useGetCards(token)
			if (typeof cards === 'string') {
				this.errors.push(cards)
			} else {
				this.cards = cards
			}
		},
		async createCard(data: CreateCard, token: string) {
			const card = await useCreateCard(data, token)
			this.cards.push(card)
		},
		async updateCard(data: Card, token: string) {
			const card = await useUpdateCard(token, data)
			if (typeof card === 'string') {
				this.errors.push(card)
			} else {
				this.cards = this.cards.map((c) => (c.id === card.id ? card : c))
			}
		},
		async deleteCard(cardId: number, token: string) {
			const status = await useDeleteCard(cardId, token)
			if (status === 204) {
				this.cards = this.cards.filter((c) => c.id !== cardId)
			}
		},
		logout() {
			this.cards = []
		},
	},
})
