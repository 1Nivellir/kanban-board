import axios, { AxiosError } from 'axios'
import { URL_API } from '~/config'
import type { Card } from '~/types/types'
export const useUpdateCard = async (
	token: string,
	data: Card
): Promise<Card | AxiosError> => {
	const url = `${URL_API}cards/${data.id}/`
	try {
		const response = await axios.patch(url, data, {
			headers: {
				Authorization: `JWT ${token}`,
				'Content-Type': 'application/json',
			},
		})
		return response.data
	} catch (error: any) {
		return error
	}
}
