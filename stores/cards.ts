import { defineStore } from 'pinia'
import { useCreateCard } from '~/composables/CreateCard'
import { useGetCards } from '~/composables/GetCards'
import type { Card, CreateCard } from '~/types/types'

export const useMyCardsStore = defineStore({
	id: 'myCardsStore',
	state: () => ({
		cards: [] as Card[],
	}),
	actions: {
		async getCards(token: string) {
			const cards = await useGetCards(token)
			if (cards instanceof Error) return
			this.cards = cards
		},
		async createCard(data: CreateCard, token: string) {
			const card = await useCreateCard(data, token)
			this.cards.push(card)
		},
		async updateCard(data: Card, token: string) {
			const card = await useUpdateCard(token, data)
			this.cards = this.cards.map((c) => (c.id === card.id ? card : c))
		},
	},
})
