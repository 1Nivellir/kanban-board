import axios from 'axios'
import type { Card } from '~/types/types'
export const useUpdateCard = async (
	token: string,
	data: Card
): Promise<Card> => {
	const url = `https://trello.backend.tests.nekidaem.ru/api/v1/cards/${data.id}/`
	try {
		const response = await axios.patch(url, data, {
			headers: {
				Authorization: `JWT ${token}`,
				'Content-Type': 'application/json',
			},
		})
		console.log(response.data)
		return response.data
	} catch (error: any) {
		console.log(error)
		return error
	}
}
