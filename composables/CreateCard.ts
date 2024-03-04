import axios from 'axios'
import type { CreateCard } from '~/types/types'
export const useCreateCard = async (data: CreateCard, token: string) => {
	const url = 'https://trello.backend.tests.nekidaem.ru/api/v1/cards/'
	const card = {
		row: data.row,
		text: data.text,
	}
	try {
		const response = await axios.post(url, card, {
			headers: {
				Authorization: `JWT ${token}`,
				'Content-Type': 'application/json',
			},
		})
		console.log(response.data)
		return response.data
	} catch (error: any) {
		console.log(error)
		return new Error(error)
	}
}