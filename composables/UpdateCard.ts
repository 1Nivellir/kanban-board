import axios from 'axios'
import { URL_API } from '~/config'
import type { Card } from '~/types/types'
export const useUpdateCard = async (
	token: string,
	data: Card
): Promise<Card | string> => {
	const url = `${URL_API}cards/${data.id}/`
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
		if (error.response.status === 401) {
			return 'Авторизуйтесь пожалуйста заново'
		}
		return error
	}
}
