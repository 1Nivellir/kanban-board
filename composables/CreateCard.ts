import axios from 'axios'
import { URL_API } from '~/config'
import type { CreateCard } from '~/types/types'
export const useCreateCard = async (data: CreateCard, token: string) => {
	const url = `${URL_API}cards/`
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
		return response.data
	} catch (error: any) {
		return new Error(error)
	}
}
