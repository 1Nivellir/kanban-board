import axios, { AxiosError } from 'axios'
import type { Card } from '../types/types'
export const useGetCards = async (
	token: string
): Promise<Card[] | AxiosError> => {
	const url = 'https://trello.backend.tests.nekidaem.ru/api/v1/cards/'
	try {
		const response = await axios.get(url, {
			headers: {
				Authorization: `JWT ${token}`,
				'Content-Type': 'application/json',
			},
		})
		console.log(response)
		return response.data
	} catch (error: any) {
		console.log(error)
		return error
	}
}
